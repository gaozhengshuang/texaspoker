


module Pay {
    const kMchId = "1495077762";
    const kAppId = "wx50a65298622b1651";
    const kAppSecret = "6934870a36e3d0e3f02e32ef9bd013cb";
    const kSecKey = "80a8c4a9d76c71e1701c001e3a41583e"; // 商户平台设置的密钥

    export function gen_sign(s: string) {
        let m = new md5();
        return m.hex_md5(s).toUpperCase();
    }

    function gen_trade_no() {
        return Date.now().toString();
    }

    /** svr 以临时login code换取session_key和openid
     * appid: 
     * appsecret: $
     * jscode: 客户端login所返回的临时login code
     */
    export async function get_open_id_and_session_key(jscode: string, callback) {
        var url = `https://api.weixin.qq.com/sns/jscode2session?appid=${kAppId}&secret=${kAppSecret}&js_code=${jscode}&grant_type=authorization_code`;

        console.log(url);
        let openid = null;
        let session_key = null;

        wx.request({
            url: url,
            data: {},
            header: { 'content-type': 'application/json' },
            method: "POST",
            dataType: "",
            success: (res) => {
                openid = res.data.openid;
                session_key = res.data.session_key;
                callback && callback(openid, session_key);
            },
            fail: (res) => console.log("请求失败", res),
            complete: null
        });


    }



    function gen_product_detail(goods) {
        var head = '{ "goods_detail":[';
        var tail = '] }';

        var str = "";
        for (let g of goods) {
            str += JSON.stringify(g) + ",";
        }

        return head + str + tail;
    }

    // 将订单信息转换成xml
    // 
    function unify_order_parms(detail: string,
        p: { appid, body, mch_id, notify_url, nonce_str, out_trade_no, spbill_create_ip, total_fee, trade_type, openid, session_key }) {

        var t1 = `appid=${p.appid}&body=${p.body}`
        var t2 = "";
        if (detail) {
            t2 = `&detail=${detail}`;
        }
        var t3 = `&mch_id=${p.mch_id}&nonce_str=${p.nonce_str}&notify_url=${p.notify_url}`;

        var t4 = "";
        if (p.openid) {
            t4 = `&openid=${p.openid}`;
        }
        var t5 = `&out_trade_no=${p.out_trade_no}&spbill_create_ip=${p.spbill_create_ip}&total_fee=${p.total_fee}&trade_type=${p.trade_type}`;
        var t6 = `&key=${kSecKey}`;
        var s = t1 + t2 + t3 + t4 + t5 + t6;

        var sign = gen_sign(s);

        var xml = `<xml>
   <appid>${p.appid}</appid>
   <body>${p.body}</body>
   <mch_id>${p.mch_id}</mch_id>
   <detail>${detail}</detail>
   <nonce_str>${p.nonce_str}</nonce_str>
   <notify_url>${p.notify_url}</notify_url>
   <openid>${p.openid}</openid>
   <out_trade_no>${p.out_trade_no}</out_trade_no>
   <spbill_create_ip>${p.spbill_create_ip}</spbill_create_ip>
   <total_fee>${p.total_fee}</total_fee>
   <trade_type>${p.trade_type}</trade_type>
   <sign>${sign}</sign>
</xml>`
        return xml;
    }


    export function push_order(openid: string, session_key: string, total_fee: number, goods) {
        let detail = gen_product_detail(goods);
        let out_trade_no = gen_trade_no();
        let notify_url = "http://bf.giantfun.cn";
        let spbill_create_ip = "127.0.0.1";
        let p = {
            appid: kAppId,
            mch_id: kMchId,
            session_key: session_key,
            body: "TEST JS PAY",
            nonce_str: "1add1a30ac87aa2db72f57a2375d8fec",  // 随机生成的字符串，主要保证结果不可预测性
            notify_url: notify_url,
            openid: openid,
            out_trade_no: out_trade_no,
            spbill_create_ip: spbill_create_ip,
            total_fee: total_fee,
            trade_type: "JSAPI",
        };

        let xml = unify_order_parms(detail, p);
        unify_order(xml);
        return xml;
    }

    function parsexml(xmlstr, name) {
        let s = xmlstr.indexOf(`<${name}>`);
        let e = xmlstr.indexOf(`</${name}>`);
        let str = xmlstr.substring(s + `<${name}>`.length, e);

        let ss = str.indexOf(`<![CDATA[`);
        let ee = str.lastIndexOf(`]]>`);

        return str.substring(ss + `<![CDATA[`.length, ee);
    }

    function gen_pay_sign(appid, nonceStr, prepay_id) {
        var s = 'appid=${appid}&nonceStr=${nonceStr}&prepay_id=${prepay_id}&signType=MD5&timeStamp=${Date.now()}&key=${kSecKey}'
        return gen_sign(s);
    }

    // 发起统一下单请求,获取微信后台返回的prepay_id
    function unify_order(xml: string) {
        wx.request({
            url: "https://api.mch.weixin.qq.com/pay/unifiedorder",
            data: xml,
            header: {},
            method: "POST",
            dataType: "application/json",
            success: (res) => {
                console.log("支付统一下单成功:", res.data)
                var xmldoc = egret.XML.parse(res.data);

                let appid = parsexml(res.data, 'appid');
                let nonce_str = parsexml(res.data, "nonce_str");
                let prepay_id = parsexml(res.data, "prepay_id");
                // let sign = parsexml(res.data,"sign");

                console.log(nonce_str, prepay_id);

                let paySign = gen_pay_sign(appid, nonce_str, prepay_id);

                console.log(paySign);

                // platform.pay(nonce_str,prepay_id,paySign);
                // let nonce_str = "";
                // let prepay_id = "";
                // let sign = "";

                // for(let c of xmldoc.children) {
                //     let ch = <egret.XML><any>c;
                //     console.log(ch);
                //     console.log(ch.attributes)
                //     console.log(ch.children);
                //     console.log('========================')
                //     if (ch.localName == 'nonce_str') {
                //         nonce_str = ch['$nonce_str']

                //     }
                //     if (ch.localName == 'prepay_id'){
                //         prepay_id = ch['$prepay_id'];
                //     }
                //     if (ch.localName == 'sign') {
                //         sign = ch['$sign'];
                //     }
                // }

            },
            fail: (res) => console.log("支付统一下单失败:", res),
            complete: null
        });
    }

    export function testWxMiniPrgmPay() {
        console.log("启动选项： ", wx.getLaunchOptionsSync());
        wx.getSystemInfo({
            success: (res) => console.log("获取系统信息成功：", res),
            fail: (res) => console.log("获取系统信息失败：", res),
            complete: null,
        });
        wx.onError(() => console.error("小程序出现错误"));

        wx.login({
            success: (res) => {
                console.log("微信登录成功", res);
                // 获取到openid和sessionkey
                Pay.get_open_id_and_session_key(res.code, (openid, session_key) => {
                    
                    console.log(openid, session_key)

                    let xml = Pay.push_order(openid,session_key, 1, [
                        { "goods_id": "iphone6s_16G", "wxpay_goods_id": "0001", "goods_name": "iPhone6s 16G", "quantity": 1, "price": 528800, "goods_category": "123456", "body": "苹果手机" },
                         { "goods_id": "iphone6s_32G", "wxpay_goods_id": "1002", "goods_name": "iPhone6s 32G", "quantity": 1, "price": 608800, "goods_category": "123789", "body": "苹果手机" }
                    ]
                    );
                    console.log(xml);
                });

            },
            fail: (res) => console.log("微信登陆失败", res),
            complete: null,
        });
        wx.getSetting({
            success: (res) => console.log("获取设置成功", res),
            fail: (res) => console.log("获取设置失败", res),
            complete: null,
        });


    }
    //---------------------------------------------------------------
    //===============================================
    // 米大师支付，针对于微信小游戏，只在ANDROID平台下有效
    // 如果使用微信小程序支付，请调用platform.pay
    // 如果米大师支付后台设置发生改变，必须重新发布沙箱
    //=================================================
    /**
     * 米大师支付中，钻石价格为0.1元，因此必须10个起售
     * NEED: cnt >= 10
     * 数量设置取值表为：
     *  10,30,60,80,120,180,250,300,400,450,500,600,680,
     *  730,780,880,980,1080,1180,1280,1480,1680,1880,
     *  1980,3280,6480
     */
    export function midasPay(cnt: number = 10, fnSuccess = null, fnFail = null) {
        wx.requestMidasPayment({
            mode: "game",
            env: 1, // 沙箱
            offerId: "1450016022",    // 米大师侧申请的应用ID    
            currencyType: "CNY",
            platform: "android",
            buyQuantity: cnt,    // 这里的价格，必须1CNY起，钻石价格为0.1 x 10 = 1CNY
            zoneId: "1",
            success: (res) => {
                console.log("米大师支付成功", res)
                fnSuccess && fnSuccess(res);
            },
            fail: (res) => {
                console.log("米大师支付失败", res);
                fnFail && fnFail(res);
            },
            complete: (res) => { },
        })



    }


}