//opacity  transparent

var downPanelH,
zichanBtnW,zichanBtnH,
faxianBtnW,faxianBtnH,
homeBtnW,homeBtnH,
jiaoyiBtnW,jiaoyiBtnH,
wodeBtnW,wodeBtnH,
xiaoxiBtnW,xiaoxiBtnH,
dingweiBtnW,dingweiBtnH,
fujinSwitchBtnW,fujinSwitchBtnH,
returnBtnW,returnBtnH,
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

    fujinSwitchBtnW=document.getElementById("fujinSwitchBtn").clientWidth;
    fujinSwitchBtnH=document.getElementById("fujinSwitchBtn").clientHeight;
    document.getElementById("fujinSwitchBtn").style.display='none';

    returnBtnW=document.getElementById("returnBtn").clientWidth;
    returnBtnH=document.getElementById("returnBtn").clientHeight;
    document.getElementById("returnBtn").style.display='none';

    gameCloseW=document.getElementById("gameCloseBtn").clientWidth;
    gameCloseH=document.getElementById("gameCloseBtn").clientHeight;
    document.getElementById("gameCloseBtn").style.display='none';

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

    document.getElementById("xiaoxiBtn").style.display='block';
    document.getElementById("xiaoxiBtn").style.width=xiaoxiBtnW*scale+"px";
    document.getElementById("xiaoxiBtn").style.height=xiaoxiBtnH*scale+"px";
    document.getElementById("xiaoxiBtn").style.top=(346*scale)+'px';
    document.getElementById("xiaoxiBtn").style.left=(40*scale)+'px';


    document.getElementById("dingweiBtn").style.display='block';
    document.getElementById("dingweiBtn").style.width=dingweiBtnW*scale+"px";
    document.getElementById("dingweiBtn").style.height=dingweiBtnH*scale+"px";
    document.getElementById("dingweiBtn").style.bottom=(downPanelH*scale+70*scale)+'px';

    document.getElementById("fujinSwitchBtn").style.display='block';
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

    return downPanelH*scale;
}

var btnCallBackFun = null;
var btnCallBackBody = null;
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


