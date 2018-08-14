module game {
    export class QipaoPanel extends eui.Component {
        private img: eui.Image;
        private txt1: eui.Label;
        private txt2: eui.Label;;

        public bubble: any;
        private roomView: GameRoomView;
        private is
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
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        }
        private onClickFun() {
            if (this.bubble && this.bubble.status==2) {
                if (this.roomView.selfIdNum == this.roomView.roomInfo.rUserId) {
                    this.receiveCoin();
                } else {
                    this.plunderCoin();
                }
            }
        }
        private receiveCoin() {
            if (this.bubble) {
                this.roomView.receiveCoin(this.bubble.id);
            }
        }
        private plunderCoin() {
            if (this.bubble) {
                if (this.bubble.plunder.length >= 2) {
                    this.roomView.plunderCoinError(125);
                    return;
                }
                if (this.bubble.plunder.indexOf(this.roomView.selfIdNum) != -1) {
                    this.roomView.plunderCoinError(126);
                    return;
                }
                this.roomView.plunderCoin(this.bubble.id);
            }
        }
        public updataInfo(ble: any) {
            this.bubble = ble;
            if (this.bubble) {
                this.txt1.text = String(this.bubble.endCoin);
                this.refreshStatus(this.bubble.status);
            }
        }
        private refreshStatus(status) {
            this.txt2.text = "";
            console.log(status);
            switch (status) {
                case 1:
                    let zeroTime: Date = new Date(new Date(SysTimeEventManager.
                        getInstance().systimeNum * 1000).setHours(0, 0, 0, 0));
                    let endTime: number = Math.floor(zeroTime.getTime() / 1000) + this.bubble.time;
                    console.log(new Date(endTime * 1000));
                    this.endTime = endTime;
                    SysTimeEventManager.getInstance().addFunction(this.runningTimer, this);
                    this.runningTimer(SysTimeEventManager.getInstance().systimeNum, this);
                    break;
                case 2:
                    if (this.roomView.selfIdNum == this.roomView.roomInfo.rUserId) {
                        this.txt2.text = "可领取";
                    } else {
                        if (this.bubble.plunder.length >= 2) {
                            this.txt2.text = "不可掠夺";
                        } else {
                            if (this.bubble.plunder.indexOf(this.roomView.selfIdNum) != -1) {
                                this.txt2.text = "已掠夺";
                            } else {
                                this.txt2.text = "可掠夺";
                            }
                        }
                    }
                    if(this.bubble.plunder.length<=0){
                        this.img.source='resource/assets2/qipaoIcon1.png';

                    }else if(this.bubble.plunder.length==1){
                        this.img.source='resource/assets2/qipaoIcon2.png';
                    }else{
                        this.img.source='resource/assets2/qipaoIcon3.png';
                    }

                    break;
                case 3:
                    break;
            }
        }
        private endTime: number;
        private runningTimer(time: number, body: any): void {
            if (time < body.endTime) {
                body.txt2.text = SysTimeEventManager.getInstance().
                    getHourMinutesTime(body.endTime - time, true, false);
            }
            else {
                if (time >= body.endTime) {
                    if (body.roomView.selfIdNum == body.roomView.roomInfo.rUserId) {
                        body.txt2.text = "可领取";
                    } else {
                        body.txt2.text = "可掠夺";
                    }
                    body.bubble.status = 2;
                }
                body.removeTimer();
            }
        }
        public removeTimer(): void {
            SysTimeEventManager.getInstance().delFunction(this.runningTimer, this);
        }
        public updatePlunder(pId: number,getNum:number) {
            if (this.bubble.status == 2 && this.bubble.plunder.length < 2 &&
                this.bubble.plunder.indexOf(this.roomView.selfIdNum) == -1) {
                this.bubble.endCoin -= getNum;
                this.txt1.text = String(this.bubble.endCoin);
                this.bubble.plunder.push(pId);
                if (this.bubble.plunder.length == 1) {
                    this.img.source = 'resource/assets2/qipaoIcon2.png';
                    this.txt2.text = "已掠夺";
                } else if (this.bubble.plunder.length == 2) {

                    this.img.source = 'resource/assets2/qipaoIcon3.png';
                    this.txt2.text = "不可掠夺";
                }
            }
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