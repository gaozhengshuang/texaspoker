module game {
    export class QipaoPanel extends eui.Component {
        private img: eui.Image;
        private txt1: eui.Label;
        private txt2: eui.Label;;

        public bubble: any;
        public roomTypeObj:any;
        private roomView: GameRoomView;
        public constructor(rView: GameRoomView) {
            super();
            this.roomView = rView
            this.skinName = "resource/skins/QipaoPanelSkin.exml";
            this.adaptive();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickFun, this);
        }
        private adaptive() {
            this.touchChildren = false;
            this.touchEnabled = true;
            //this.scaleX = this.scaleY = GameConfig.innerScale;
            //this.anchorOffsetX = this.width / 2;
            //this.anchorOffsetY = this.height / 2;
        }
        private onClickFun() {
            if (this.bubble && this.bubble.state==1) {
                if (this.roomView.selfIdNum == this.roomView.roomInfo.ownerid) {
                    this.receiveCoin();
                } else {
                    this.plunderCoin();
                }
            }
        }
        private receiveCoin() {
            if (this.bubble) {
                this.roomView.receiveCoin(this.bubble.index);
            }
        }
        private plunderCoin() {
            if (this.bubble) {
                if (this.bubble.robers.length >= 3) {
                    this.roomView.plunderCoinError(125);
                    return;
                }
                if (this.bubble.robers.indexOf(this.roomView.selfIdNum) != -1) {
                    this.roomView.plunderCoinError(126);
                    return;
                }
                this.roomView.plunderCoin(this.bubble.index);
            }
        }
        public updataInfo(ble: any) {
            this.removeTimer();
            this.bubble = ble;
            if (this.bubble) {
                this.roomTypeObj=table.THouseCellById[this.bubble.tid];
                //this.txt1.text = String(this.bubble.endCoin);
                this.refreshStatus(this.bubble.state);
            }
        }
        
        private refreshStatus(state) {
            this.img.alpha=0.6;
            this.txt2.text = "";
            switch (state) {
                case 0:
                    this.txt2.text = "生产中";
                    this.changeWordcolor(2,this);
                    let endTime: number = this.bubble.tmproduce + this.roomTypeObj.ProduceTime;
                    console.log(new Date(endTime * 1000));
                    this.endTime = endTime;
                    SysTimeEventManager.getInstance().addFunction(this.runningTimer, this);
                    this.runningTimer(SysTimeEventManager.getInstance().systimeNum, this);
                    break;
                case 1:
                    this.txt1.text = this.bubble.gold+"/"+this.roomTypeObj.ProduceGold;
                    if (this.roomView.selfIdNum == this.roomView.roomInfo.ownerid) {
                        this.txt2.text = "可领取";
                        this.changeWordcolor(1,this);
                        this.img.alpha=1;
                    } else {
                        if (this.bubble.robers.length >= 3) {
                            this.txt2.text = "所剩无几";
                            this.changeWordcolor(3,this);
                            this.img.alpha=0.6;
                        } else {
                            if (this.bubble.robers.indexOf(this.roomView.selfIdNum) != -1) {
                                this.txt2.text = "已掠夺";
                                this.changeWordcolor(4,this);
                                this.img.alpha=1;
                            } else {
                                this.txt2.text = "可掠夺";
                                this.changeWordcolor(4,this);
                                this.img.alpha=1;
                            }
                        }
                    }
                    break;
            }
            console.log("cccccc",state);
        }
        private endTime: number;
        private runningTimer(time: number, body: any): void {
            if (time < body.endTime) {
                body.txt1.text = SysTimeEventManager.getInstance().
                    getHourMinutesTime(body.endTime - time, true, false);
                    body.txt2.text = "生产中";
                    body.changeWordcolor(2,body);
                    body.img.alpha=0.6;
            }
            else {
                if (time >= body.endTime) {
                    if (body.roomView.selfIdNum == body.roomView.roomInfo.ownerid) {
                        body.txt2.text = "可领取";
                        body.changeWordcolor(1,body);
                        body.img.alpha=1;
                    } else {
                        body.txt2.text = "可掠夺";
                        body.changeWordcolor(4,body);
                        body.img.alpha=1;
                    }
                    body.bubble.state = 1;
                    body.txt1.text = body.roomTypeObj.ProduceGold+"/"+body.roomTypeObj.ProduceGold;
                }
                body.removeTimer();
            }
        }
        private changeWordcolor(status:number,body:any){
            let color:number=0x000000;
            switch(status)
            {
                //可领取
                case 1:
                     color= 0xe29313; 
                break;
                //生产中
                case 2:
                    color= 0x2cbc25;
                break;
                //所剩无几
                case 3:
                    color= 0x4e416d;
                break;
                //可掠夺
                case 4:
                    color= 0xff4c4c;
                break;
            }
            body.txt2.strokeColor=color;
            body.txt1.strokeColor=color;
        }
        public removeTimer(): void {
            SysTimeEventManager.getInstance().delFunction(this.runningTimer, this);
        }
        public hideTxt2(){
            this.txt2.visible=false;
        }
        public removePanel(){
            this.removeTimer();
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickFun, this);
            this.parent.removeChild(this);

        }

    }
}