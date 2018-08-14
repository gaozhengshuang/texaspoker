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
            this.scaleX = this.scaleY = GameConfig.innerScale;
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
            this.bubble = ble;
            if (this.bubble) {
                this.roomTypeObj=table.THouseCellById[this.bubble.tid];
                //this.txt1.text = String(this.bubble.endCoin);
                this.refreshStatus(this.bubble.state);
            }
        }
        
        private refreshStatus(state) {
            this.txt2.text = "";
            switch (state) {
                case 0:
                    this.txt2.text = "生产中";
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
                    } else {
                        if (this.bubble.robers.length >= 3) {
                            this.txt2.text = "所剩无几";
                        } else {
                            if (this.bubble.robers.indexOf(this.roomView.selfIdNum) != -1) {
                                this.txt2.text = "已掠夺";
                            } else {
                                this.txt2.text = "可掠夺";
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
            }
            else {
                if (time >= body.endTime) {
                    if (body.roomView.selfIdNum == body.roomView.roomInfo.rUserId) {
                        body.txt2.text = "可领取";
                    } else {
                        body.txt2.text = "可掠夺";
                    }
                    body.bubble.state = 1;
                    body.txt1.text = body.roomTypeObj.ProduceGold+"/"+body.roomTypeObj.ProduceGold;
                }
                body.removeTimer();
            }
        }
        public removeTimer(): void {
            SysTimeEventManager.getInstance().delFunction(this.runningTimer, this);
        }
        /*public updatePlunder(ble:any,getNum:number) {
            if (this.bubble.state == 1 && this.bubble.robers.length < 3 &&
                this.bubble.robers.indexOf(this.roomView.selfIdNum) == -1) {
                this.bubble.endCoin -= getNum;
                this.txt1.text = String(this.bubble.endCoin);
                this.bubble.robers.push(pId);
                if (this.bubble.robers.length == 1) {
                    this.img.source = 'resource/assets2/qipaoIcon2.png';
                    this.txt2.text = "已掠夺";
                } else if (this.bubble.plunder.length == 2) {

                    this.img.source = 'resource/assets2/qipaoIcon3.png';
                    this.txt2.text = "不可掠夺";
                }
            }
        }*/
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