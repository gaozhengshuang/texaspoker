module game {
    export class BattlePay extends PanelComponent {

        public luckyGroup: eui.Group;
        public gift_1: PayItem;
        public gift_2: PayItem;
        public gift_3: PayItem;
        public gift_4: PayItem;
        public gift_5: PayItem;
        public gift_6: PayItem;
        public closeButton: IconButton;
        public startButton: IconButton;
        public bagButton: IconButton;
        public allChangeButton: IconButton;

        public goldCnt: eui.Label;
        public curDiamond_txt: eui.Label;

        private _playInterval: number;
        private _giftPro: number[];
        private _isStart: boolean;
        private _lightIndex: number;
        private _giftIndex: number;

        private _gifts;
        private _checkedItemIndex: number = 1;

        protected getSkinName() {
            return BattlePaySkin;
        }

        protected init() {
            this.closeButton && (this.closeButton.icon = "lucky_json.leftBack");
            this.startButton && (this.startButton.icon = "ui_json.b-recharge");
            this.allChangeButton && (this.allChangeButton.icon = "ui_json.changeMoneyAll");

            let testGifts = [
                { rmb: 6, gold: 600 },
                { rmb: 30, gold: 3000 },
                { rmb: 98, gold: 9800 },
                { rmb: 128, gold: 23800 },
                { rmb: 328, gold: 32800 },
                { rmb: 648, gold: 64800 },
            ]
            let goldCnt = 0;
            this.setGift(testGifts);

            this._notify = [
                {
                    source: DataManager.playerModel,
                    target: this,
                    callBackFunc: this.updateScore,
                    notifyName: PlayerModel.SCORE_UPDATE,
                    execute: true
                },
                {
                    source: DataManager.playerModel,
                    target: this,
                    callBackFunc: this.updateDiamond,
                    notifyName: PlayerModel.DIAMOND_UPDATE,
                    execute: true
                },
            ]

            this.setGoldCnt(DataManager.playerModel.getDiamond());
            this.updateDiamond();
        }

        private updateScore() {
            this.setGoldCnt(DataManager.playerModel.getDiamond());
        }

        private updateDiamond() {
            this.curDiamond_txt.text = `可兑换：${DataManager.playerModel.getDiamond()}金币`;
        }

        protected setGoldCnt(n) {
            this.goldCnt && (this.goldCnt.text = `${n}`);
        }

        protected beforeShow() {
            this._isStart = false;
            this._lightIndex = 0;
            this._giftIndex = 0;

            this._touchEvent = [
                { target: this.closeButton, callBackFunc: this.backHandle },
                { target: this.startButton, callBackFunc: this.payHandle },
                { target: this.allChangeButton, callBackFunc: this.changeHandle },
            ];
            this.addTouchEvent();
            this.registerEvent();

        }
        private addTouchEvent() {
            this.gift_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.giftHandle1, this);
            this.gift_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.giftHandle2, this);
            this.gift_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.giftHandle3, this);
            this.gift_4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.giftHandle4, this);
            this.gift_5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.giftHandle5, this);
            this.gift_6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.giftHandle6, this);
        }

        private giftHandle1() { this.uncheckAllGifts(); this.checkGift(1); };
        private giftHandle2() { this.uncheckAllGifts(); this.checkGift(2); };
        private giftHandle3() { this.uncheckAllGifts(); this.checkGift(3); };
        private giftHandle4() { this.uncheckAllGifts(); this.checkGift(4); };
        private giftHandle5() { this.uncheckAllGifts(); this.checkGift(5); };
        private giftHandle6() { this.uncheckAllGifts(); this.checkGift(6); };


        // protected beforeRemove() {
        //     if (this._playInterval) {
        //         egret.clearInterval(this._playInterval);
        //         this._playInterval = null;
        //     }
        //     this.removeEvent()
        // }

        private registerEvent() {
            // NotificationCenter.addObserver(this, this.OnGW2C_LuckyDrawHit, "msg.GW2C_LuckyDrawHit");
        }

        // private removeEvent() {
        //     NotificationCenter.removeObserver(this, "msg.GW2C_LuckyDrawHit");
        // }

        private setGift(gifts, defaultCheck: number = 1) {
            this._gifts = gifts;

            let i = 0;
            for (let g of gifts) {
                ++i;
                // this[`gift_${i}`].regEvent(`giftHandle${i}`,this);
                this[`gift_${i}`].setItem(g.rmb, g.gold);

                if (i == defaultCheck) {
                    this[`gift_${i}`].setChecked(true);
                } else {
                    this[`gift_${i}`].setChecked(false);
                }

            }
        }

        public uncheckAllGifts() {
            this.gift_1.setChecked(false);
            this.gift_2.setChecked(false);
            this.gift_3.setChecked(false);
            this.gift_4.setChecked(false);
            this.gift_5.setChecked(false);
            this.gift_6.setChecked(false);
        }
        public checkGift(i: number) {
            this[`gift_${i}`].setChecked(true);
            this._checkedItemIndex = i;
        }

        private backHandle() {
            this.remove();
        }

        private payHandle() {
            // console.log(this._checkedItemIndex, this._gifts)
            let g = this._gifts[this._checkedItemIndex - 1];

            let zuanshi = g.rmb * 10 || 60;
            let os = loginOs;

            console.warn("the os is:", os);

            if (os.match(/android/gi)) {
                Pay.midasPay(zuanshi, () => {
                    // DataManager.playerModel.incScore(zuanshi);

                    sendMessage("msg.C2GW_PlatformRechargeDone", msg.C2GW_PlatformRechargeDone.encode({ userid: DataManager.playerModel.getUserId() }));
                }, () => {
                    showDialog("支付失败，请重试", "确定", null);
                })
            } else if (os.match(/ios/gi)) {
                showDialog("IOS暂时不支持内购，敬请期待...", "确定", null);
            }
        }

        private changeHandle() {
            sendMessage("msg.C2GW_GoldExchange", msg.C2GW_GoldExchange.encode({userid: DataManager.playerModel.getUserId(), diamonds: DataManager.playerModel.getDiamond()}));
        }

        private static _instance: BattlePay;

        public static getInstance(): BattlePay {
            if (!BattlePay._instance) {
                BattlePay._instance = new BattlePay();
            }
            return BattlePay._instance;
        }


    }
}