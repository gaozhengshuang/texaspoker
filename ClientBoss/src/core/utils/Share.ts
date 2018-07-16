module game {
    export function shareAppMsg() {
        console.log("分享APP消息")
         let sharecode = genShareCode();
        // return new Promise((resolve, reject)=>{
        wx.shareAppMessage({
            title: "一起来，弹弹乐",
            imageUrl: "http://jump.cdn.giantfun.cn/ttlshare.png",
             query: `inviteCode=${sharecode}`, 
            success: (res) => {
                console.log("分享APP消息成功", res);
                resolve(res);
            },
            fail: (res) => {
                console.log("分享APP消息失败", res)
                reject(res);
            },
            complete: null,
        })
        // })
    }

    export function genShareCode() {
        return `TJ${DataManager.playerModel.getUserId()}`;
    }

    export function showShareMenu() {
        console.log("显示分享菜单")
        // return new Promise((resolve, reject) => {
        wx.onShareAppMessage( ()=> {
            let sharecode = genShareCode();
            return {
                title: '一起来，弹弹乐',
                imageUrl: "http://jump.cdn.giantfun.cn/ttlshare.png",
                query: `inviteCode=${sharecode}`, // 设置邀请码
                success(res) {
                    // console.log(res.shareTickets[0]);
                    showTips("恭喜您，分享成功！",res);
                }
            }
        })

        wx.showShareMenu({
            withShareTicket: true,
            success: (res) => {
                console.log("显示分享菜单成功", res);
                // wx.getShareInfo({
                //     shareTicket:"",
                //     success: (res)=>{
                //         console.log(res)
                //     },
                //     fail: (res) =>{
                //         console.log(res)
                //     },
                //     complete: (res)=>{}
                // })
                resolve(res);
            },
            fail: (res) => {
                console.log("显示分享菜单失败", res);
                reject(res);
            },
            complete: (res) => { }
        })
        //   })  
    }

    export function onLoginByShare() {
        // wx.getShareInfo()
    }

}