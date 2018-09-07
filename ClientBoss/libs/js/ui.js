//opacity  transparent

var downPanelH,
zichanBtnW,zichanBtnH,
faxianBtnW,faxianBtnH,
homeBtnW,homeBtnH,
jiaoyiBtnW,jiaoyiBtnH,
wodeBtnW,wodeBtnH,
xiaoxiBtnW,xiaoxiBtnH,
dingweiBtnW,dingweiBtnH,
shouyiBtnW,shouyiBtnH,
buyHouseBtnW,buyHouseBtnH,
buyCarBtnW,buyCarBtnH,
fujinSwitchBtnW,fujinSwitchBtnH,
returnBtnW,returnBtnH,
returnTradeBtnW,returnTradeBtnH,
expeditionBtnW,expeditionBtnH,
expeditionInfoW,expeditionInfoH,
expeditionStateBtnW,expeditionStateBtnH,
expeditionStateBgW,expeditionStateBgH,
expeditionStateBtnBgW,expeditionStateBtnBgH,

gameCloseW,gameCloseH;

window.onload=function(){
    
    document.getElementById("maskBg").style.pointerEvents='none';
    document.getElementById("maskBg").style.backgroundColor='transparent';
   
    zichanBtnW=document.getElementById("zichanBtn").clientWidth;
    zichanBtnH=document.getElementById("zichanBtn").clientHeight;
    console.log(zichanBtnW,zichanBtnH);

    faxianBtnW=document.getElementById("faxianBtn").clientWidth;
    faxianBtnH=document.getElementById("faxianBtn").clientHeight;

    homeBtnW=document.getElementById("homeBtn").clientWidth;
    homeBtnH=document.getElementById("homeBtn").clientHeight;

    jiaoyiBtnW=document.getElementById("jiaoyiBtn").clientWidth;
    jiaoyiBtnH=document.getElementById("jiaoyiBtn").clientHeight;

    wodeBtnW=document.getElementById("wodeBtn").clientWidth;
    wodeBtnH=document.getElementById("wodeBtn").clientHeight;

    downPanelH=document.getElementById("downPanel").clientHeight;
    document.getElementById("downPanel").style.display='none';

    xiaoxiBtnW=document.getElementById("xiaoxiBtn").clientWidth;
    xiaoxiBtnH=document.getElementById("xiaoxiBtn").clientHeight;
    document.getElementById("xiaoxiBtn").style.display='none';

    dingweiBtnW=document.getElementById("dingweiBtn").clientWidth;
    dingweiBtnH=document.getElementById("dingweiBtn").clientHeight;
    document.getElementById("dingweiBtn").style.display='none';

    shouyiBtnW=document.getElementById("shouyiBtn").clientWidth;
    shouyiBtnH=document.getElementById("shouyiBtn").clientHeight;
    document.getElementById("shouyiBtn").style.display='none';

    buyHouseBtnW=document.getElementById("buyHouseBtn").clientWidth;
    buyHouseBtnH=document.getElementById("buyHouseBtn").clientHeight;
    document.getElementById("buyHouseBtn").style.display='none';

    buyCarBtnW=document.getElementById("buyCarBtn").clientWidth;
    buyCarBtnH=document.getElementById("buyCarBtn").clientHeight;
    document.getElementById("buyCarBtn").style.display='none';

    fujinSwitchBtnW=document.getElementById("fujinSwitchBtn").clientWidth;
    fujinSwitchBtnH=document.getElementById("fujinSwitchBtn").clientHeight;
    document.getElementById("fujinSwitchBtn").style.display='none';

    returnBtnW=document.getElementById("returnBtn").clientWidth;
    returnBtnH=document.getElementById("returnBtn").clientHeight;
    document.getElementById("returnBtn").style.display='none';

    gameCloseW=document.getElementById("gameCloseBtn").clientWidth;
    gameCloseH=document.getElementById("gameCloseBtn").clientHeight;
    document.getElementById("gameCloseBtn").style.display='none';

    returnTradeBtnW=document.getElementById("returnTradeBtn").clientWidth;
    returnTradeBtnH=document.getElementById("returnTradeBtn").clientHeight;
    document.getElementById("returnTradeBtn").style.display='none';

    expeditionBtnW=document.getElementById("expeditionBtn").clientWidth;
    expeditionBtnH=document.getElementById("expeditionBtn").clientHeight;
    document.getElementById("expeditionBtn").style.display='none';

    //---地图上5个按钮 暂用
    expeditionStateBtnW = document.getElementById("expeditionStateBtn_1").clientWidth;
    expeditionStateBtnH = document.getElementById("expeditionStateBtn_1").clientHeight;

    document.getElementById("expeditionStateBtn_1").style.display='none';
    document.getElementById("expeditionStateBtn_2").style.display='none';
    document.getElementById("expeditionStateBtn_3").style.display='none';
    document.getElementById("expeditionStateBtn_4").style.display='none';
    document.getElementById("expeditionStateBtn_5").style.display='none';
    

    expeditionStateBgW = document.getElementById("expeditionStateBg").clientWidth;
    expeditionStateBgH = document.getElementById("expeditionStateBg").clientHeight;
    document.getElementById("expeditionStateBg").style.display='none';
    document.getElementById("expeditionStateInfoLabel").style.display='none';

    

    expeditionStateBtnBgW = document.getElementById("expeditionStateBtn_1_Bg").clientWidth;
    expeditionStateBtnBgH = document.getElementById("expeditionStateBtn_1_Bg").clientHeight;

    document.getElementById("expeditionStateBtn_1_Bg").style.display='none';
    document.getElementById("expeditionStateBtn_2_Bg").style.display='none';
    document.getElementById("expeditionStateBtn_3_Bg").style.display='none';
    document.getElementById("expeditionStateBtn_4_Bg").style.display='none';
    document.getElementById("expeditionStateBtn_5_Bg").style.display='none';

    document.getElementById("expeditionStateBtn_1_Label").style.display='none';
    document.getElementById("expeditionStateBtn_2_Label").style.display='none';
    document.getElementById("expeditionStateBtn_3_Label").style.display='none';
    document.getElementById("expeditionStateBtn_4_Label").style.display='none';
    document.getElementById("expeditionStateBtn_5_Label").style.display='none';

    

}


function adaptive(scale){
    document.getElementById("downPanel").style.visibility='visible';
    document.getElementById("downPanel").style.display='block';
    document.getElementById("downPanel").style.height=downPanelH*scale+"px";
    let equalW= window.innerWidth/5;

    document.getElementById("homeBtn").style.width=homeBtnW*scale+"px";
    document.getElementById("homeBtn").style.height=homeBtnH*scale+"px";
    document.getElementById("homeBtn").style.top=(downPanelH*scale-homeBtnH*scale)/2+'px';
    let crucialX1=equalW/2;
    document.getElementById("homeBtn").style.left=(crucialX1-homeBtnW*scale/2)+'px';

    document.getElementById("zichanBtn").style.width=zichanBtnW*scale+"px";
    document.getElementById("zichanBtn").style.height=zichanBtnH*scale+"px";
    document.getElementById("zichanBtn").style.top=(downPanelH*scale-zichanBtnH*scale)/2+'px';
    let crucialX2=equalW*2-equalW/2;
    document.getElementById("zichanBtn").style.left=(crucialX2-zichanBtnW*scale/2)+'px';

    document.getElementById("zichanRedIcon").style.width=zichanBtnW*scale+"px";
    document.getElementById("zichanRedIcon").style.height=zichanBtnH*scale+"px";
    document.getElementById("zichanRedIcon").style.top=(downPanelH*scale-zichanBtnH*scale)/2+'px';
    document.getElementById("zichanRedIcon").style.left=(crucialX2-zichanBtnW*scale/2+5)+'px';
    document.getElementById("zichanRedIcon").style.pointerEvents = 'none';


    document.getElementById("faxianBtn").style.width=faxianBtnW*scale+"px";
    document.getElementById("faxianBtn").style.height=faxianBtnH*scale+"px";
    document.getElementById("faxianBtn").style.top=(downPanelH*scale-faxianBtnH*scale)/2+'px';
    let crucialX3=equalW*3-equalW/2;
    document.getElementById("faxianBtn").style.left=(crucialX3-faxianBtnW*scale/2)+'px';

    document.getElementById("jiaoyiBtn").style.width=jiaoyiBtnW*scale+"px";
    document.getElementById("jiaoyiBtn").style.height=jiaoyiBtnH*scale+"px";
    document.getElementById("jiaoyiBtn").style.top=(downPanelH*scale-jiaoyiBtnH*scale)/2+'px';
    let crucialX4=equalW*4-equalW/2;
    document.getElementById("jiaoyiBtn").style.left=(crucialX4-jiaoyiBtnW*scale/2)+'px';

    document.getElementById("wodeBtn").style.width=wodeBtnW*scale+"px";
    document.getElementById("wodeBtn").style.height=wodeBtnH*scale+"px";
    document.getElementById("wodeBtn").style.top=(downPanelH*scale-wodeBtnH*scale)/2+'px';
    let crucialX5=equalW*5-equalW/2;
    document.getElementById("wodeBtn").style.left=(crucialX5-wodeBtnW*scale/2)+'px';

    //document.getElementById("xiaoxiBtn").style.display='block';
    document.getElementById("xiaoxiBtn").style.width=xiaoxiBtnW*scale+"px";
    document.getElementById("xiaoxiBtn").style.height=xiaoxiBtnH*scale+"px";
    document.getElementById("xiaoxiBtn").style.top=(346*scale)+'px';
    document.getElementById("xiaoxiBtn").style.left=(40*scale)+'px';


    document.getElementById("dingweiBtn").style.display='block';
    document.getElementById("dingweiBtn").style.width=dingweiBtnW*scale+"px";
    document.getElementById("dingweiBtn").style.height=dingweiBtnH*scale+"px";
    let dingweiBottom=downPanelH*scale+70*scale;
    document.getElementById("dingweiBtn").style.bottom=dingweiBottom+'px';


    document.getElementById("shouyiBtn").style.display='block';
    document.getElementById("shouyiBtn").style.width=shouyiBtnW*scale+"px";
    document.getElementById("shouyiBtn").style.height=shouyiBtnH*scale+"px";
    document.getElementById("shouyiBtn").style.bottom=(dingweiBottom+20+shouyiBtnH*scale)+'px';


    document.getElementById("buyHouseBtn").style.display='block';
    document.getElementById("buyHouseBtn").style.width=buyHouseBtnW*scale+"px";
    document.getElementById("buyHouseBtn").style.height=buyHouseBtnH*scale+"px";
    document.getElementById("buyHouseBtn").style.bottom=dingweiBottom+'px';


    document.getElementById("buyCarBtn").style.display='block';
    document.getElementById("buyCarBtn").style.width=buyCarBtnW*scale+"px";
    document.getElementById("buyCarBtn").style.height=buyCarBtnH*scale+"px";
    document.getElementById("buyCarBtn").style.bottom=(dingweiBottom+20+buyCarBtnH*scale)+'px';



    //document.getElementById("fujinSwitchBtn").style.display='block';
    document.getElementById("fujinSwitchBtn").style.width=fujinSwitchBtnW*scale+"px";
    document.getElementById("fujinSwitchBtn").style.height=fujinSwitchBtnH*scale+"px";
    document.getElementById("fujinSwitchBtn").style.top=(window.innerHeight-fujinSwitchBtnH*scale)/2+'px';

    //document.getElementById("returnBtn").style.display='block';
    document.getElementById("returnBtn").style.width=returnBtnW*scale+"px";
    document.getElementById("returnBtn").style.height=returnBtnH*scale+"px";
    document.getElementById("returnBtn").style.left=(window.innerWidth-returnBtnW*scale)/2+'px';

    document.getElementById("gameCloseBtn").style.width=gameCloseW*scale+"px";
    document.getElementById("gameCloseBtn").style.height=gameCloseH*scale+"px";
    document.getElementById("gameCloseBtn").style.visibility='visible';

    document.getElementById("returnTradeBtn").style.display='block';
    console.log("returnTradeBtnW", returnTradeBtnW, "returnTradeBtnH", returnTradeBtnH);
    document.getElementById("returnTradeBtn").style.width=returnTradeBtnW*scale+"px";
    document.getElementById("returnTradeBtn").style.height=returnTradeBtnH*scale+"px";
    

    document.getElementById("expeditionBtn").style.display='block';
    document.getElementById("expeditionBtn").style.width=expeditionBtnW*scale+"px";
    document.getElementById("expeditionBtn").style.height=expeditionBtnH*scale+"px";
    //设置出征按钮默认图标
    document.getElementById("expeditionBtn").setAttribute("class", "expedition_default");

    //---地图上5个按钮 暂用----------------
    document.getElementById("expeditionStateBtn_1").style.display='block';
    document.getElementById("expeditionStateBtn_1").style.width = expeditionStateBtnW*scale+"px";
    document.getElementById("expeditionStateBtn_1").style.height= expeditionStateBtnH*scale+"px";
    
    document.getElementById("expeditionStateBtn_2").style.display='block';
    document.getElementById("expeditionStateBtn_2").style.width = expeditionStateBtnW*scale+"px";
    document.getElementById("expeditionStateBtn_2").style.height= expeditionStateBtnH*scale+"px";

    document.getElementById("expeditionStateBtn_3").style.display='block';
    document.getElementById("expeditionStateBtn_3").style.width = expeditionStateBtnW*scale+"px";
    document.getElementById("expeditionStateBtn_3").style.height= expeditionStateBtnH*scale+"px";

    document.getElementById("expeditionStateBtn_4").style.display='block';
    document.getElementById("expeditionStateBtn_4").style.width = expeditionStateBtnW*scale+"px";
    document.getElementById("expeditionStateBtn_4").style.height= expeditionStateBtnH*scale+"px";

    document.getElementById("expeditionStateBtn_5").style.display='block';
    document.getElementById("expeditionStateBtn_5").style.width = expeditionStateBtnW*scale+"px";
    document.getElementById("expeditionStateBtn_5").style.height= expeditionStateBtnH*scale+"px";


    document.getElementById("expeditionStateBtn_1_Bg").style.visibility='hidden';
    document.getElementById("expeditionStateBtn_2_Bg").style.visibility='hidden';
    document.getElementById("expeditionStateBtn_3_Bg").style.visibility='hidden';
    document.getElementById("expeditionStateBtn_4_Bg").style.visibility='hidden';
    document.getElementById("expeditionStateBtn_5_Bg").style.visibility='hidden';


    document.getElementById("expeditionStateBg").style.visibility='hidden';
    
    document.getElementById("expeditionStateBg").style.display='block';
    document.getElementById("expeditionStateBg").style.width = expeditionStateBgW*scale+"px";
    document.getElementById("expeditionStateBg").style.height= expeditionStateBgH*scale+"px";
    
    document.getElementById("expeditionStateInfoLabel").style.display='block';
    document.getElementById("expeditionStateInfoLabel").style.width = expeditionStateBgW*scale+"px";
    document.getElementById("expeditionStateInfoLabel").style.height= expeditionStateBgH*scale+"px";



    document.getElementById("expeditionStateBtn_1_Bg").style.display='block';
    document.getElementById("expeditionStateBtn_1_Bg").style.width = expeditionStateBtnBgW*scale+"px";
    document.getElementById("expeditionStateBtn_1_Bg").style.height= expeditionStateBtnBgH*scale+"px";

    document.getElementById("expeditionStateBtn_2_Bg").style.display='block';
    document.getElementById("expeditionStateBtn_2_Bg").style.width = expeditionStateBtnBgW*scale+"px";
    document.getElementById("expeditionStateBtn_2_Bg").style.height= expeditionStateBtnBgH*scale+"px";

    document.getElementById("expeditionStateBtn_3_Bg").style.display='block';
    document.getElementById("expeditionStateBtn_3_Bg").style.width = expeditionStateBtnBgW*scale+"px";
    document.getElementById("expeditionStateBtn_3_Bg").style.height= expeditionStateBtnBgH*scale+"px";
    

    document.getElementById("expeditionStateBtn_4_Bg").style.display='block';
    document.getElementById("expeditionStateBtn_4_Bg").style.width = expeditionStateBtnBgW*scale+"px";
    document.getElementById("expeditionStateBtn_4_Bg").style.height= expeditionStateBtnBgH*scale+"px";

    document.getElementById("expeditionStateBtn_5_Bg").style.display='block';
    document.getElementById("expeditionStateBtn_5_Bg").style.width = expeditionStateBtnBgW*scale+"px";
    document.getElementById("expeditionStateBtn_5_Bg").style.height= expeditionStateBtnBgH*scale+"px";


    document.getElementById("expeditionStateBtn_1_Label").style.display='block';
    document.getElementById("expeditionStateBtn_1_Label").style.width = expeditionStateBgW*scale+"px";
    document.getElementById("expeditionStateBtn_1_Label").style.height= expeditionStateBgW*scale+"px";

    document.getElementById("expeditionStateBtn_2_Label").style.display='block';
    document.getElementById("expeditionStateBtn_2_Label").style.width = expeditionStateBgW*scale+"px";
    document.getElementById("expeditionStateBtn_2_Label").style.height= expeditionStateBgW*scale+"px";
    
    document.getElementById("expeditionStateBtn_3_Label").style.display='block';
    document.getElementById("expeditionStateBtn_3_Label").style.width = expeditionStateBgW*scale+"px";
    document.getElementById("expeditionStateBtn_3_Label").style.height= expeditionStateBgW*scale+"px";
    
    document.getElementById("expeditionStateBtn_4_Label").style.display='block';
    document.getElementById("expeditionStateBtn_4_Label").style.width = expeditionStateBgW*scale+"px";
    document.getElementById("expeditionStateBtn_4_Label").style.height= expeditionStateBgW*scale+"px";

    document.getElementById("expeditionStateBtn_5_Label").style.display='block';
    document.getElementById("expeditionStateBtn_5_Label").style.width = expeditionStateBgW*scale+"px";
    document.getElementById("expeditionStateBtn_5_Label").style.height= expeditionStateBgW*scale+"px";
    //-------------------------------


    return downPanelH*scale;
}

var btnCallBackFun = null;
var btnCallBackBody = null;
var btnClicked_Expedition = false;
function setBtnCallbackFun(fun,body){
    btnCallBackFun=fun;
    btnCallBackBody=body;
    
    setDownBtn();

    setFujinSwitch();

    document.getElementById("xiaoxiBtn").addEventListener("mousedown", function (e) {
        console.log(e.type,e.target);
        if (btnCallBackFun != null) {
            btnCallBackFun('xiaoxi',btnCallBackBody);
        }
    });
    document.getElementById("dingweiBtn").addEventListener("mousedown", function (e) {
        console.log(e.type,e.target);
        if (btnCallBackFun != null) {
            btnCallBackFun('dingwei',btnCallBackBody);
        }
    });
    document.getElementById("shouyiBtn").addEventListener("mousedown", function (e) {
        console.log(e.type,e.target);
        if (btnCallBackFun != null) {
            btnCallBackFun('shouyi',btnCallBackBody);
        }
    });
    document.getElementById("buyHouseBtn").addEventListener("mousedown", function (e) {
        console.log(e.type,e.target);
        if (btnCallBackFun != null) {
            btnCallBackFun('buyHouse',btnCallBackBody);
        }
    });
    document.getElementById("buyCarBtn").addEventListener("mousedown", function (e) {
        console.log(e.type,e.target);
        if (btnCallBackFun != null) {
            btnCallBackFun('buyCar',btnCallBackBody);
        }
    });
    document.getElementById("returnBtn").addEventListener("mousedown", function (e) {
        console.log(e.type,e.target);
        if (btnCallBackFun != null) {
            btnCallBackFun('expReturnBtn',btnCallBackBody);
        }
    });

    document.getElementById("gameCloseBtn").addEventListener("mousedown", function (e) {
        console.log(e.type,e.target);
        if (btnCallBackFun != null) {
            btnCallBackFun('gameClose',btnCallBackBody);
        }
    });

    document.getElementById("returnTradeBtn").addEventListener("mousedown", function (e) {
        console.log(e.type,e.target);
        if (btnCallBackFun != null) {
            btnCallBackFun('returnTrade',btnCallBackBody);
        }
    });

    document.getElementById("expeditionBtn").addEventListener("mousedown", function (e) {
        resetDownBtn();
        console.log(e.type,e.target);
        if (btnCallBackFun != null) {
            if(!btnClicked_Expedition){
                e.target.setAttribute("class", "expedition_activate");    
            }
            else{
                e.target.setAttribute("class", "expedition_default");                    
            }
            btnClicked_Expedition = !btnClicked_Expedition;
            btnCallBackFun('expedition',btnCallBackBody);
        }
    });

    //--------------地图上出征车的5个按钮点击事件
    document.getElementById("expeditionStateBtn_1").addEventListener("mousedown", function (e) {
        if (btnCallBackFun != null) {
            btnCallBackFun('expeditionStateBtn',btnCallBackBody,expediitonInfos[0].data.id);
        }
    });
    document.getElementById("expeditionStateBtn_2").addEventListener("mousedown", function (e) {
        if (btnCallBackFun != null) {
            btnCallBackFun('expeditionStateBtn',btnCallBackBody,expediitonInfos[1].data.id);
        }
    });
    document.getElementById("expeditionStateBtn_3").addEventListener("mousedown", function (e) {
        if (btnCallBackFun != null) {
            btnCallBackFun('expeditionStateBtn',btnCallBackBody,expediitonInfos[2].data.id);
        }
    });
    document.getElementById("expeditionStateBtn_4").addEventListener("mousedown", function (e) {
        if (btnCallBackFun != null) {
            btnCallBackFun('expeditionStateBtn',btnCallBackBody,expediitonInfos[3].data.id);
        }
    });
    document.getElementById("expeditionStateBtn_5").addEventListener("mousedown", function (e) {
        if (btnCallBackFun != null) {
            btnCallBackFun('expeditionStateBtn',btnCallBackBody,expediitonInfos[4].data.id);
        }
    });
    //--------------
}
function setDownBtn(){
    document.getElementById("zichanBtn").addEventListener("mousedown", function (e) {
        resetDownBtn();
        console.log(e.type,e.target);
        if (btnCallBackFun != null) {
            e.target.setAttribute("class", "zichan_activate");
            btnCallBackFun('assets',btnCallBackBody);
        }
    });

    document.getElementById("faxianBtn").addEventListener("mousedown", function (e) {
        resetDownBtn();
        console.log(e.type,e.target);
        if (btnCallBackFun != null) {
            e.target.setAttribute("class", "faxian_activate");
            btnCallBackFun('discovery',btnCallBackBody);
        }
    });


    document.getElementById("homeBtn").addEventListener("mousedown", function (e) {
        resetDownBtn();
        console.log(e.type,e.target);
        if (btnCallBackFun != null) {
            e.target.setAttribute("class", "home_activate");
            btnCallBackFun('home',btnCallBackBody);
        }
    });


    document.getElementById("jiaoyiBtn").addEventListener("mousedown", function (e) {
        resetDownBtn();
        console.log(e.type,e.target);
        if (btnCallBackFun != null) {
            e.target.setAttribute("class", "jiaoyi_activate");
            btnCallBackFun('transaction',btnCallBackBody);
        }
    });

    document.getElementById("wodeBtn").addEventListener("mousedown", function (e) {
        resetDownBtn();
        console.log(e.type,e.target);
        if (btnCallBackFun != null) {
            e.target.setAttribute("class", "wode_activate");
            btnCallBackFun('mine',btnCallBackBody);
        }
    });
}

function showDownBtn(bool) {
    if(bool){
        document.getElementById("downPanel").style.visibility='visible';
    }else{
        document.getElementById("downPanel").style.visibility='hidden';
    }
}

function resetDownBtn() {
    document.getElementById("zichanBtn").setAttribute("class", "zichan_default");
    document.getElementById("faxianBtn").setAttribute("class", "faxian_default");
    document.getElementById("homeBtn").setAttribute("class", "home_default");
    document.getElementById("jiaoyiBtn").setAttribute("class", "jiaoyi_default");
    document.getElementById("wodeBtn").setAttribute("class", "wode_default");
}

function setFujinSwitch() {
    document.getElementById("fjJianzhuBtn").addEventListener("mousedown", function (e) {
        document.getElementById("fujinSwitchBtn").setAttribute("class", "fujinJianzhu");
        if (btnCallBackFun != null) {
                btnCallBackFun('fujinJianzhu',btnCallBackBody);
            }
    });

    document.getElementById("fjRenBtn").addEventListener("mousedown", function (e) {
        document.getElementById("fujinSwitchBtn").setAttribute("class", "fujinRen");
        if (btnCallBackFun != null) {
                btnCallBackFun('fujinRen',btnCallBackBody);
            }
    });
}

function updataMaskBg(color,alpha){
    if(alpha>0){
        document.getElementById("maskBg").style.backgroundColor=color;
        document.getElementById("maskBg").style.opacity=alpha;
    }
    else{
        document.getElementById("maskBg").style.backgroundColor='transparent';
    }
}

function exploreUI(isShow){
    if (isShow) {
        document.getElementById("returnBtn").style.display = 'block';

        document.getElementById("dingweiBtn").style.display = 'none';
        document.getElementById("fujinSwitchBtn").style.display = 'none';
        document.getElementById("xiaoxiBtn").style.display = 'none';
        document.getElementById("downPanel").style.display = 'none';
        
    }
    else {
        document.getElementById("returnBtn").style.display = 'none';

        document.getElementById("dingweiBtn").style.display = 'block';
        document.getElementById("fujinSwitchBtn").style.display = 'block';
        document.getElementById("xiaoxiBtn").style.display = 'block';
        document.getElementById("downPanel").style.display = 'block';
    }
}

function smallGameClose(isShow){
    if (isShow) {
        document.getElementById("gameCloseBtn").style.display = 'block';
    }
    else {
        document.getElementById("gameCloseBtn").style.display = 'none';
    }
}

function showAssetsRedIcon(isShow){
    if (isShow) {
        document.getElementById("zichanRedIcon").style.display='block';
    }
    else {
        document.getElementById("zichanRedIcon").style.display = 'none';
    }
}

function showShouyiIcon(isHas){
    if (isHas) {
        document.getElementById("shouyiBtn").setAttribute("class", "haveShouyi");
    }
    else {
        document.getElementById("shouyiBtn").setAttribute("class", "noShouyi");
    }
}
//返回交易面板按钮显隐
function returnTradeBtnClose(isShow){
    if (isShow) {
        document.getElementById("returnTradeBtn").style.visibility = 'visible';
    }
    else {
        document.getElementById("returnTradeBtn").style.visibility = 'hidden';
    }
}
//显示egret div
function showEgretDiv(isShow)
{
    if(isShow)
    {
        document.getElementsByClassName("egret-player")[0].style.display = 'block';
    }
    else
    {
        document.getElementsByClassName("egret-player")[0].style.display = 'none';
    }

}


//----------------------------地图上五个按钮 暂用
var expeditionStateBtnName = ["expeditionStateBtn_1","expeditionStateBtn_2","expeditionStateBtn_3","expeditionStateBtn_4","expeditionStateBtn_5"];
var carState = {Ready:1,Parking:2,Exped:3,Arrival:4,Robbing:5,Back:6}
var expediitonInfos = [];
function showExpeditionState(isShow,datas,timeStrs) //datas:msg.ICarData[]
{
    console.log("--------------showExpeditionState----------");
    if(!isShow){
        expeditionStateBtnName.forEach(str=>{
            let htmlElement = document.getElementById(str);
            htmlElement.parentElement.style.visibility = 'hidden';
            //htmlElement.style.visibility = 'hidden';
        });
    }
    else{
        if(datas){
            expediitonInfos = [];
            expeditionStateBtnName.forEach(
                (str,index,array)=>{
                    let htmlElement = document.getElementById(str);
                    let parentlElement = htmlElement.parentElement;
                    if(htmlElement && parentlElement){
                        if(datas.length > index)
                        {
                            //时间状态文本
                            let content = timeStrs[index];
                            if(content){
                                console.log(str);
                                console.log("htmlElement--->",htmlElement);
                                //parentlElement.innerText = content;
                                document.getElementById(str+"_Label").innerText = content;
                            }   
                            let carData = datas[index];
                            switch (carData.state) 
                            {
                                case carState.Exped:
                                    htmlElement.setAttribute("class", "expeditionState_speedUp");
                                break;
                                case carState.Arrival:
                                    htmlElement.setAttribute("class", "expeditionState_active");
                                break;
                                case carState.Robbing:
                                    htmlElement.setAttribute("class", "expeditionState_retract");
                                break;
                            }
                            //htmlElement.style.visibility = 'visible';
                            parentlElement.style.visibility = 'visible';
                            expediitonInfos.push({data:carData,content:content,element:str});
                        }
                        else
                        {
                            //htmlElement.style.visibility = 'hidden';
                            parentlElement.style.visibility = 'hidden';
                        }
                    }

            });
        }
    }
}
//更新一条车辆状态信息
function updateOneExpeditionInfo(data,timeStr)
{
    for(let info of expediitonInfos)
    {
        if(info.data && info.data.id==data.id)
        {
            info.data = data;
            info.content = timeStr
            if(info.element){
                let htmlElement = document.getElementById(info.element);
                switch (info.data.state) 
                {
                    case carState.Exped:
                        htmlElement.setAttribute("class", "expeditionState_speedUp");
                    break;
                    case carState.Arrival:
                        htmlElement.setAttribute("class", "expeditionState_active");
                    break;
                    case carState.Robbing:
                        htmlElement.setAttribute("class", "expeditionState_retract");
                    break;
                }
                if(info.content)
                { 
                    document.getElementById(info.element+"_Label").innerText = info.content;
                }
            }
            break;
        }
    }

}

function showExpeditionInfoTxt(isShow,content)
{
    let htmlElement = document.getElementById("expeditionStateInfoLabel");
   // document.getElementById("expeditionStateBg").style.visibility = isShow && 'visible' || 'hidden';
    //htmlElement.visibility = isShow && 'visible' || 'hidden';
    htmlElement.parentElement.style.visibility = isShow && 'visible' || 'hidden';
    if(!isShow) return;
    htmlElement.innerText =  content;
}



