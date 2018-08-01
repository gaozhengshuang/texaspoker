module game {
    import wallCollisionGroup = gameConfig.wallCollisionGroup;
    import ballCollisionGroup = gameConfig.ballCollisionGroup;

    export class BattleScene extends SceneComponent {
        touchGroup: eui.Group;
        showGroup: eui.Group;
        ballGroup: eui.Group;
        ballButton1: IconButton;
        ballButton2: IconButton;
        luckyButton: IconButton;
        userButton: IconButton;
        rechargeButton: IconButton;
        bagButton: IconButton;
        backButton: IconButton;
        scoreLabel: eui.Label;
        ball1Price: eui.Label;
        ball2Price: eui.Label;
        hitLabel: eui.Label;
        topImage: eui.Image;
        noticeLabel: eui.Label;
        brickInfoGroup: eui.Group;
        paddleGroup: eui.Group;
        penetrationGroup: eui.Group;
        penetrationLabel: eui.Label;
        buffGroup: eui.Group;
        guideGroup: eui.Group;
        penetrationBallImage: eui.Image;
        doubleGroup: eui.Group;
        light1: eui.Image;
        light2: eui.Image;
        light3: eui.Image;
        doubleAnim: egret.tween.TweenGroup;
        topBg: eui.Image;
        mainGroup: eui.Group;
        moreFireImg: eui.Image;
        badbuffPanel: BadBuff;

        private _nowSp: number = 0;
        private _spCool: number = 0;
        private _nowEvent: number = 0;
        private _goodBuff: ProInfo[];
        private _badBuff: ProInfo[];

        private _boomBrick: Array<BattleBrick>;
        private _doubleTime: number;
        private _world: p2.World;
        private _wallTopShape: p2.Plane;
        private _wallLeftShape: p2.Plane;
        private _wallRightShape: p2.Plane;
        private _paddleMaterial: p2.Material;
        private _missionId: number;
        private _missionMapData: Array<MapGridInfo>;
        private _brickPool: ObjectPool<BattleBrick>;
        private _ballPool: ObjectPool<BattleBall>;
        private _paddlePool: ObjectPool<BattlePaddle>;
        private _buffPool: ObjectPool<BattleBuff>;
        private _battleTextPool: ObjectPool<egret.TextField>;
        private _breakPool: ObjectPool<BattleBrickBreak>;
        private _rewardBallPool: ObjectPool<BattleRewardBall>;
        private _blackHolePool: ObjectPool<BattleBlackHole>;
        private _boomPool: ObjectPool<BattleBoom>;
        private _timeBoomPool: ObjectPool<BattleTimeBoom>;
        private _firewallPool: ObjectPool<BattleFirewall>;
        private _icePool: ObjectPool<BattleIce>;

        private _paddle: BattlePaddle;

        private _lastTime: number;
        private _halfWidth: number;
        private _diedY: number;

        private _breakCount: number;
        public ballMaterial: p2.Material;
        private _buffList: BattleBuff[];
        private _diedMaxX: number;
        private _diedMinX: number;

        public hitCount: number;
        private curSpaceFire: number = 0;
        private curScoreTimeSp: number = 0;
        private _breakBad: number;

        private buffLootList: Array<table.ITBirckItemDefine>;
        //private brickList: BattleBrick[];

        //private _noticeList: string[];
        //private _onNoticeRun: boolean = false;

        //private _debugDraw: p2DebugDraw;
        debugGroup: eui.Group;
        private _currentFrame: number;
        private _badbuffDeltaTime:number;
        private _lootList;
        private _topColumn: number[];
        private _blackHoleList: BattleBlackHole[];
        private _idleLeftFirewall: number[];
        private _idleRightFirewall: number[];
        private _leftFirewall: number[];
        private _rightFirewall: number[];

        // 缓存同步金币时的状态
        private _curStage;
        private _curBoomInfo;
        private _curGoldSharkScore;

        protected init() {
            if (gameConfig.isIphoneX()) {
                this.mainGroup.y = 86;
                this.topBg.height = 172;
                this.scoreLabel.y = 110;
                this.backButton.y = 80;
            }
            this._lootList = {};
            for (let i = 0; i < table.TBirckRefresh.length; i++) {
                let info = table.TBirckRefresh[i];
                this._lootList[info.Max] = [];
                let pros = splitStringToNumberArray(info.Pro, ";", "-");
                for (let v of pros) {
                    this._lootList[info.Max].push({ Id: v[0], pro: v[1], limit: info.Limitnum });
                }
            }

            this._goodBuff = [];
            this._badBuff = [];
            for (let i = 0; i < table.TBirckInfo.length; i++) {
                let info = table.TBirckInfo[i];
                if (info.Pro != 0 && info.kind == 1) {
                    this._goodBuff.push({ id: info.Id, pro: info.Pro / 10000 });
                }
                if (info.Pro != 0 && info.kind == 2) {
                    this._badBuff.push({ id: info.Id, pro: info.Pro / 10000 });
                }
            }

            //this._noticeList = [];
            //this.brickList = [];
            this.buffLootList = table.TBirckItem;
            this._buffList = [];
            this.userButton.icon = "ui_json.userGo";
            this.rechargeButton.icon = "ui_json.rechargeGo";
            this.luckyButton.icon = "lucky_json.luckyGo";
            this.bagButton.icon = "ui_json.bagGo";
            this.backButton.icon = "ui_json.gameBack";
            this.ballButton1.icon = "ball_json.1";
            this.ballButton2.icon = "ball_json.2";
            this.ball1Price.text = `价值:${table.TBallById[1].Price}炮弹`;
            this.ball2Price.text = `价值:${table.TBallById[2].Price}炮弹`;

            this._brickPool = new ObjectPool<BattleBrick>(BattleBrick);
            this._ballPool = new ObjectPool<BattleBall>(BattleBall);
            this._paddlePool = new ObjectPool<BattlePaddle>(BattlePaddle);
            this._buffPool = new ObjectPool<BattleBuff>(BattleBuff);
            this._battleTextPool = new ObjectPool<egret.TextField>(egret.TextField);
            this._breakPool = new ObjectPool<BattleBrickBreak>(BattleBrickBreak);
            this._rewardBallPool = new ObjectPool<BattleRewardBall>(BattleRewardBall);
            this._blackHolePool = new ObjectPool<BattleBlackHole>(BattleBlackHole);
            this._boomPool = new ObjectPool<BattleBoom>(BattleBoom);
            this._timeBoomPool = new ObjectPool<BattleTimeBoom>(BattleTimeBoom);
            this._firewallPool = new ObjectPool<BattleFirewall>(BattleFirewall);
            this._icePool = new ObjectPool<BattleIce>(BattleIce);

            for (let brickInfo of table.TBirckInfo) {
                if (!brickInfo.Bullet) continue;
                let p = splitStringToNumberArray(brickInfo.Info, ";", "-");
                for (let i = 0; i < p.length; i++) {
                    let info = new BattleBrickInfo();
                    info.setData(brickInfo.Brickid, p[i], brickInfo.Bullet);
                    this.brickInfoGroup.addChild(info);
                }
            }
            this.initWorld();
            this.initNetHandle();
            //this.showGroup.top = this.paddleGroup.top = this.debugGroup.top = gameConfig.curHeight() * 0.1;
        }

        private initNetHandle() {
            NotificationCenter.addObserver(this, this.OnBT_RetLaunchBullet, "msg.BT_RetLaunchBullet");
            NotificationCenter.addObserver(this, this.onBT_RetStepOnBomb, "msg.BT_RetStepOnBomb");  // 定时炸弹
            NotificationCenter.addObserver(this, this.onBT_RetCrushSuperBrick, "msg.BT_RetCrushSuperBrick");  // 定时炸弹
        }

        protected getSkinName() {
            return BattleSceneSkin;
        }

        private _leftWall: BattleWall;
        private _rightWall: BattleWall;

        private initWorld() {
            const stageWidth = gameConfig.curWidth();
            const stageHeight = gameConfig.curHeight();
            this._halfWidth = stageWidth / 2;

            this._world = new p2.World({ gravity: [0, 0] });

            this._wallTopShape = new p2.Plane();
            this._wallTopShape.collisionGroup = wallCollisionGroup;
            this._wallTopShape.collisionMask = ballCollisionGroup;
            const wallTopBody: p2.Body = new p2.Body({
                position: [0, (stageHeight - 876) / 2 / gameConfig.factor],
                mass: 1
            });
            wallTopBody.type = p2.Body.STATIC;
            wallTopBody.addShape(this._wallTopShape);
            wallTopBody.displays = [new BattleWall()];
            this._world.addBody(wallTopBody);

            this._wallLeftShape = new p2.Plane();
            this._wallLeftShape.collisionGroup = wallCollisionGroup;
            this._wallLeftShape.collisionMask = ballCollisionGroup;
            this._wallLeftShape.angle = 90 * Math.PI / 180;
            const wallLeftBody: p2.Body = new p2.Body({
                position: [0, stageHeight / 2 / gameConfig.factor],
                mass: 1
            });
            wallLeftBody.type = p2.Body.STATIC;
            wallLeftBody.addShape(this._wallLeftShape);
            this._leftWall = new BattleWall();
            wallLeftBody.displays = [this._leftWall];
            this._world.addBody(wallLeftBody);
            this._wallLeftShape.angle = -90 * Math.PI / 180;

            this._wallRightShape = new p2.Plane();
            this._wallRightShape.collisionGroup = wallCollisionGroup;
            this._wallRightShape.collisionMask = ballCollisionGroup;
            this._wallRightShape.angle = -90 * Math.PI / 180;
            const wallRightBody: p2.Body = new p2.Body({
                position: [stageWidth / gameConfig.factor, stageHeight / 2 / gameConfig.factor],
                mass: 1
            });
            wallRightBody.type = p2.Body.STATIC;
            wallRightBody.addShape(this._wallRightShape);
            this._rightWall = new BattleWall();
            wallRightBody.displays = [this._rightWall];
            this._world.addBody(wallRightBody);
            this._wallRightShape.angle = 90 * Math.PI / 180;

            this._paddleMaterial = new p2.Material(1);
            this.ballMaterial = new p2.Material(2);
            let contact = new p2.ContactMaterial(this._paddleMaterial, this.ballMaterial);
            contact.restitution = 1;
            contact.friction = 0;
            this._world.addContactMaterial(contact);

            this._world.sleepMode = p2.World.BODY_SLEEPING;

            this._wallTopShape.material = this._paddleMaterial;
            this._wallLeftShape.material = this._paddleMaterial;
            this._wallRightShape.material = this._paddleMaterial;

            //let sprite = new egret.Sprite();
            //this._debugDraw = new p2DebugDraw(this._world, sprite);
            //this.debugGroup.addChild(sprite);
        }

        // 定时炸弹
        public showTimeBoom(brick: BattleBrick) {
            brick.needCountdown = false;
            brick.countdownLabel.visible = true;
            brick.countdownLabel.text = "alarm";

            this._world.removeBody(brick.body);
            egret.Tween.get(brick).to({ y: gameConfig.curHeight() }, 1000).call(() => {
                let cost = _boomUseScore;
                this._curBoomInfo = { brick: brick, cost: cost };

                sendMessage("msg.BT_StepOnBomb", msg.BT_StepOnBomb.encode({ userid: DataManager.playerModel.getUserId() }));
            })
        }

        private onBT_RetStepOnBomb() {
            let brick = this._curBoomInfo.brick;
            let cost = this._curBoomInfo.cost;

            this.showBoom(brick);
            DataManager.playerModel.useScore(cost);
            this.destroyBrick(brick);
            this.playTimeBoom(brick.x);
            this.showBattleText(-cost, brick, 1, -10, this._rewardBallPool.createObject(), true);
        }



        private async playTimeBoom(x: number) {
            SoundManager.playEffect("zhadan", 0.5);
            let timeBoom = this._timeBoomPool.createObject();
            timeBoom.x = x - 100;
            timeBoom.y = gameConfig.curHeight() - 100;
            this.addChild(timeBoom);
            await timeBoom.play();
            this._timeBoomPool.destroyObject(timeBoom);
        }

        public setData(missionId: number) {
            this._missionId = missionId;
        }

        async loadRes() {
            //this._missionMapData = await RES.getResAsync(`map/${this._missionId}`);
            let test = await RES.getResAsync("test_json");
            testP1 = test.number.choushui;
            testP2 = test.number.fantan;
            testSpeed = test.speed.ballspd;
        }

        protected beforeShow() {
            this.curSpaceFire = _spaceFire + DataManager.playerModel.getScore();
            let paddle = this._paddlePool.createObject();
            paddle.setData(1);
            paddle.resetPosition(this.mainGroup.y);
            this.paddleGroup.addChild(paddle);
            this._paddle = paddle;
            this._diedY = this._paddle.y + this._paddle.height / 2;
            this._diedMinX = -14;
            this._diedMaxX = 720 + 14;
            this._nowSp = 0;
            this.updateSp();

            this.doubleGroup.visible = false;
            this._leftFirewall = [];
            this._rightFirewall = [];
            this._idleLeftFirewall = [];
            this._idleRightFirewall = [];
            for (let i = 1; i <= 15; i += 4) {
                this._idleLeftFirewall.push(i);
                this._idleRightFirewall.push(i);
            }
            this._blackHoleList = [];
            this._spCool = 0;
            this._topColumn = [];
            for (let i = 0; i < 20; i += 2) {
                this._topColumn.push(i);
            }
            this._boomBrick = [];
            this._doubleTime = 0;
            this._currentFrame = 0;
            this._breakBad = 0;
            //this.brickList = [];
            this._breakCount = 0;
            this._touchEvent = [
                { target: this.ballButton1, callBackFunc: this.ballHandle },
                { target: this.ballButton2, callBackFunc: this.ballHandle },
                { target: this.userButton, callBackFunc: this.userGoHandle },
                { target: this.luckyButton, callBackFunc: this.luckyGoHandle },
                { target: this.rechargeButton, callBackFunc: this.rechargeGoHandle },
                { target: this.bagButton, callBackFunc: this.bagGoHandle },
                { target: this.backButton, callBackFunc: this.backHandle },
            ];
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
                    callBackFunc: this.addNotice,
                    notifyName: PlayerModel.ADD_OR_USE_GOLD,
                    execute: false
                },
                {
                    source: DataManager.playerModel,
                    target: this,
                    callBackFunc: this.updatePenetration,
                    notifyName: PlayerModel.PENETRATION_UPDATE,
                    execute: true
                }
            ];
            // for (let brickData of this._missionMapData) {
            //     let brick = this._brickPool.createObject();
            //     brick.setData(brickData, this._paddleMaterial);
            //     this.showGroup.addChild(brick);
            //     this._world.addBody(brick.body);
            // }

            this.touchGroup.touchEnabled = false;
            this.ballGroup.visible = false;
            this.moreFireImg.visible = false;

            this.touchGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);

            for (let i = 0; i <= 7; i++) {
                this.generateBrick(15 - i * 2);
            }
            if (DataManager.playerModel.guideFinish()) {
                this.guideGroup.visible = false;
                this.startGame();
            } else {
                this.guideGroup.visible = true;
                this.guideGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.finishGuide, this);
            }

            //初始化消除事件进度条
            this.badbuffPanel.initView();
        }

        private finishGuide() {
            egret.localStorage.setItem("guide", "finish");
            this.guideGroup.visible = false;
            this.startGame();
        }

        private sendSpMsg(totalGold: number | Long = 0) {
            sendMessage("msg.BT_UseUltimateSkil", msg.BT_UseUltimateSkil.encode({
                userid: DataManager.playerModel.getUserId(),
                gold: <number>totalGold
            }))
        }


        // 大招
        public useSp() {
            if (this._spCool > 0) return;
            SoundManager.playEffect("dazhao", 0.5);
            this._paddle.playBoom();
            for (let b of this._brickPool.list) {
                if (!b.isGoldShark()) { //大招对黄金鲨无效
                    this._boomBrick.push(b);
                }
            }

            this._nowSp = 0;
            this.updateSp();
        }

        public showBigFire() {
            this._spCool = 500;
            this._paddle.setSp(-1);

            this.moreFireImg.scaleX = 2;
            this.moreFireImg.scaleY = 2;
            this.moreFireImg.visible = true;
            egret.Tween.get(this.moreFireImg).to({ scaleX: 0.5, scaleY: 0.5 }, 300)
                .to({ scaleX: 1, scaleY: 1 }, 400).wait(500).call(() => {
                    this.moreFireImg.visible = false;
                });
        }

        private updatePenetration() {
            this._paddle.updatePenetrationNum(DataManager.playerModel.penetration);
        }

        private touchHandle(event: egret.TouchEvent) {
            this._curStage = { x: event.stageX, y: event.stageY - 88 }
            this.sendLaunchBulletMsg();

        }

        private OnBT_RetLaunchBullet(data: msg.BT_RetLaunchBullet) {
            // let x = event.stageX;
            // let y = event.stageY - 88;
            let x = this._curStage.x;
            let y = this._curStage.y;
            if (y >= this._paddle.y) return;
            this._nowSp = <number>data.energy;
            // console.log('服务器返回的能量数据：',data,this);
            if (DataManager.playerModel.getScore() < _paddlePrice) {
                showDialog("您的金币不足!", "充值", function () {
                    // this.rechargeGoHandle();
                    openPanel(PanelType.pay);
                    // showTips("暂未开放,敬请期待...", true);
                });
                return;
            }
            if (this._spCool == 0) { //无限火力不扣子弹
                DataManager.playerModel.useScore(_paddlePrice/*, `购买弹球扣除${price}元宝!`*/);
                this.addSp();
            }
            //更新能量
            let maxSp = Math.ceil(_maxSp * SkillManager.getInstance().SkillAddition(SkillType.BigBoom));
            if (this._nowSp < maxSp) {
                this.updateSp();
            }
            let angle = Math.atan2(x - this._paddle.x, this._paddle.y - y);
            let rotation = angle * 180 / Math.PI;
            let sin = Math.sin(angle);
            let cos = Math.cos(angle);
            let newX = 153 * sin + this._paddle.x;
            let newY = -153 * cos + this._paddle.y;
            let v = 20;
            let vX = sin * v;
            let vY = -cos * v;
            this._paddle.setImageRotation(rotation);
            this.addBall(2, [newX, newY, vX, vY], data.bulletid);
            SoundManager.playEffect("fashe", 0.6);
            this._paddle.playShot();
        }

        private sendLaunchBulletMsg() {
            sendMessage("msg.BT_ReqLaunchBullet", msg.BT_ReqLaunchBullet.encode({ userid: DataManager.playerModel.getUserId() }));
        }

        private noticeFinish() {
            // this._onNoticeRun = false;
            // if (this._noticeList.length > 0) {
            //     this.noticeRun();
            // }
        }

        private noticeTimeout: number;

        private addNotice(str: Array<egret.ITextElement>) {
            this.noticeLabel.visible = true;
            if (this.noticeTimeout) {
                egret.clearTimeout(this.noticeTimeout);
                this.noticeTimeout = null;
            }
            this.noticeLabel.textFlow = str;
            this.noticeTimeout = egret.setTimeout(() => {
                this.noticeLabel.visible = false;
                this.noticeTimeout = null;
            }, this, 1000);
            // this._noticeList.push(str);
            // if (!this._onNoticeRun) {
            //     this.noticeRun();
            // }
            //showTips(str, false, 0, 105, gameConfig.TextColors.orangeYellow);
        }

        private noticeRun() {
            // let notice = this._noticeList[0];
            // if (notice) {
            //     this._noticeList.splice(0, 1);
            //     this.noticeLabel.visible = true;
            //     this.noticeLabel.text = notice;
            //     this._onNoticeRun = true;
            //     this.noticeAnim.play(0);
            // }
        }

        private updateScore() {
            let gold = DataManager.playerModel.getScore();
            // console.log("更新金币", gold)
            this.scoreLabel.textFlow = [
                { text: "金币", style: { bold: true } },
                { text: `:${gold}`, style: { fontFamily: "DynoBold" } },
            ]

            if (gold >= this.curSpaceFire) {
                this.curSpaceFire += _spaceFire;
                this._paddle.updateWuxianPao(true);
                this.showBigFire();
            }
        }

        private ballHandle(ballButton: IconButton) {
            // let ballType: number = 0;
            // switch (ballButton) {
            //     case this.ballButton1:
            //         ballType = 1;
            //         break;
            //     case this.ballButton2:
            //         ballType = 2;
            //         break;
            // }
            // let price = table.TBallById[ballType].Price + 0 * DataManager.playerModel.ballCount;
            // if (DataManager.playerModel.getGold() < price) {
            //     showTips("您的元宝不足!", true);
            //     return;
            // }
            // DataManager.playerModel.ballCount++;
            // DataManager.playerModel.useGold(price, `购买弹球扣除${price}元宝!`);
            // this._ballList = [];
            // this.addBall(ballType, 0);
            //
            // this.ballGroup.visible = false;
            // this.touchGroup.touchEnabled = true;
            // this.hitCount = 0;
            // this.hitLabel.text = "连击数:0";
            // this.ball2Price.text = `价值:${table.TBallById[2].Price + 0 * DataManager.playerModel.ballCount}元宝`;
            // this.startGame();
        }

        private addBall(ballType: number, info: number[], id: number | Long = 0) {
            let isPenetration: boolean = false;
            if (DataManager.playerModel.penetration > 0) {
                isPenetration = true;
                DataManager.playerModel.usePenetration(1);
            }
            let ball = this._ballPool.createObject();
            ball.setData(ballType, this.ballMaterial, isPenetration);
            id && (ball.id = id);
            ball.resetPosition(info);
            this.showGroup.addChild(ball);
            this._world.addBody(ball.body);
            ball.body.velocity = [info[2], info[3]];
        }

        private startGame() {
            this.touchGroup.touchEnabled = true;
            this._world.on("impact", this.contactHandle.bind(this));
            this._lastTime = egret.getTimer();
            egret.startTick(this.updateView, this);
        }

        public addBuff(brick: BattleBrick, buffData: table.ITBirckItemDefine) {
            let buff = this._buffPool.createObject();
            buff.setData(buffData, brick.x, brick.y, this._paddleMaterial);
            this.showGroup.addChild(buff);
            this._world.addBody(buff.body);
            buff.body.velocity = [0, 8];
            this._buffList.push(buff);
        }

        private _onLight: boolean = false;

        private showLight() {
            if (this._onLight) return;
            this._onLight = true;
            this.doubleAnim.play(0);
        }

        private hideLight() {
            if (!this._onLight) return;
            this._onLight = false;
            this.doubleAnim.stop();
            this.doubleGroup.alpha = 1;
        }

        private _onDouble: boolean = false;

        private showDouble() {
            if (this._onDouble) return;
            this._onDouble = true;
            this.doubleGroup.visible = true;
            this.doubleGroup.alpha = 1;
            this.light1.y = 0;
            this.light2.y = 775;
            this.light3.y = 1550;
            let time = 15000;
            egret.Tween.get(this.light1, { loop: true }).to({ y: -775 }, time).to({ y: 1550 }, 0).to({ y: 775 }, time).to({ y: 0 }, time);
            egret.Tween.get(this.light2, { loop: true }).to({ y: 0 }, time).to({ y: -775 }, time).to({ y: 1550 }, 0).to({ y: 775 }, time);
            egret.Tween.get(this.light3, { loop: true }).to({ y: 775 }, time).to({ y: 0 }, time).to({ y: -775 }, time).to({ y: 1550 }, 0);
        }

        private stopDouble() {
            if (!this._onDouble) return;
            this._onDouble = false;
            this.doubleGroup.visible = false;
            egret.Tween.removeTweens(this.light1);
            egret.Tween.removeTweens(this.light2);
            egret.Tween.removeTweens(this.light3);
        }

        private updateView(timeStamp: number) {
            if (this._spCool > 0) {
                this._spCool--;
                if (this._spCool == 0) {
                    this.updateSp();
                    this._paddle.updateWuxianPao(false);
                } else {
                    this._paddle.setBigBoomTime(this._spCool);
                }
            }

            //临时代码
            for (let i = 0; i < _eventCdByMoney.length; i++) {
                if (i < _eventCdByMoney.length - 1) {
                    if (DataManager.playerModel.getScore() > _eventCdByMoney[i] && DataManager.playerModel.getScore() <= _eventCdByMoney[i + 1]) {
                        this.curScoreTimeSp = i;
                        break;
                    }
                } else {
                    this.curScoreTimeSp = _eventCdByMoney.length - 1;
                }
            }
            //临时代码

            if (this._doubleTime > 0) {
                this._doubleTime--;
                if (this._doubleTime <= 180) {
                    this.showLight();
                } else {
                    this.hideLight();
                }
                this.showDouble();
            } else {
                this.stopDouble();
            }

            if (this._boomBrick.length > 0) {
                let totalGold = 0;
                for (let i = this._boomBrick.length - 1; i >= 0; i--) {
                    let b = this._boomBrick[i];
                    this._boomBrick.splice(i, 1);
                    totalGold += this.destroyBrick(b);
                }
                this.sendSpMsg(totalGold);
            }
            if(this._badbuffDeltaTime>0)
            {
                this._badbuffDeltaTime--;
            }
            
            this._currentFrame++;
            this.moveBrick();
            if (this._currentFrame == 120) {
                this._currentFrame = 0;
                this.generateBrick();
            }
            let s = gameFrame;
            //let s = (timeStamp - this._lastTime) / 1000;
            //this._debugDraw.drawDebug();
            this._lastTime = timeStamp;
            for (let i = this._ballPool.list.length - 1; i >= 0; i--) {
                let ball = this._ballPool.list[i];
                ball.updateView();
                if (this._blackHoleList.length > 0) {
                    for (let hole of this._blackHoleList) {
                        if (!hole.isCheck(ball, timeStamp)) {
                            let r = hole.checkMeet(ball.x, ball.y);
                            if (r) {
                                hole.meetBall(ball, timeStamp);
                                ball.updateView();
                                break;
                            }
                        }
                    }
                }
                if (ball.y >= this._diedY/* || ball.x >= this._diedMaxX || ball.x <= this._diedMinX*/) {
                    this._ballPool.recycleObject(ball);
                }
                if (ball.meetFire) {
                    this._ballPool.destroyObject(ball);
                }
            }
            for (let buff of this._buffList) {
                buff.updateView();
            }
            this._world.step(s);
            // if (DataManager.playerModel.getScore() < _paddlePrice && this._ballPool.list.length == 0) { --金钱不够可以充值
            //     this.gameEnd();
            // }
            return true;
        }

        private moveBrick() {
            for (let i = this._brickPool.list.length - 1; i >= 0; i--) {
                let brick = this._brickPool.list[i];
                if (brick.needCountdown) {
                    brick.minusCountdown();
                }
                if (!brick.canMove) continue;
                if (brick.direction == 0) {
                    if (brick.x >= 720) {
                        this.cleanBrick(brick);
                    } else {
                        brick.x += brick.speed;
                        brick.resetPosition();
                    }
                } else {
                    if (brick.x <= -72) {
                        this.cleanBrick(brick);
                    } else {
                        brick.x -= brick.speed;
                        brick.resetPosition();
                    }
                }
            }
        }

        private eventBrick(score: number) {
            let event = [];
            if (this._nowEvent >= _maxEvent) {
                let eventType = EventBuffType.goodBuff;
                if (Math.random() <= _eventDifferent) {
                    eventType = EventBuffType.goodBuff;
                } else {
                    eventType = EventBuffType.badBuff;
                }

                if (DataManager.playerModel.getScore() < _eventAddMin) {
                    eventType = EventBuffType.goodBuff;
                }

                let _goodBuffNum = 0;
                let _badBuffNum = 0;
                switch (eventType) {
                    case EventBuffType.goodBuff://增益BUFF
                        _goodBuffNum = lootEvent(_goodBuffPro);
                        for (let i = 0; i < _goodBuffNum; i++) {
                            event.push(lootPro(this._goodBuff));
                        }
                        break;
                    case EventBuffType.badBuff://减益BUFF
                        _badBuffNum = lootEvent(_badBuffPro);
                        for (let i = 0; i < _badBuffNum; i++) {
                            event.push(lootPro(this._badBuff));
                        }
                        break;
                }
            }
            return event;
        }

        private generateBrick(colume: number = 0) {
            let score = DataManager.playerModel.getScore();
            let eventList = this.eventBrick(score);
            let lootList;
            let ll;
            for (let i in this._lootList) {
                if (this._lootList.hasOwnProperty(i)) {
                    if (score <= Number(i)) {
                        lootList = this._lootList[i];
                        break;
                    }
                    ll = this._lootList[i];
                }
            }
            if (!lootList) {
                lootList = ll;
            }
            let limitNum = lootList[0].limit;
            for (let i = 0; i < 15; i++) {
                if (Math.random() > 0.3) continue;
                let brickId = 0;
                if (eventList.length > 0) {
                    for (let i = 0; i < eventList.length; i++) {
                        brickId = eventList[i];
                        eventList.splice(i, 1);
                        break;
                    }
                    if (eventList.length == 0) {
                        this._nowEvent = 0;
                    }
                } else {
                    let brickInfo = loot(lootList);
                    brickId = brickInfo.Id;
                }

                let infoData = table.TBirckInfoById[brickId];
                let type = infoData.Type;
                let mapGridInfo: MapGridInfo = {
                    id: this._brickPool.list.length,
                    type: brickId,
                    row: i + 1,
                    column: i % 2 == 0 ? -2 + colume : 22 - colume
                };
                switch (type) {
                    case BrickType.timeBoom:
                    case BrickType.blackHole:
                    case BrickType.fireWall:
                    case BrickType.ice:
                        if(this._badbuffDeltaTime>0) return;
                        if (this._topColumn.length <= (10 - limitNum)) return;
                        mapGridInfo.row = 0;
                        let index = Math.floor(Math.random() * this._topColumn.length);
                        mapGridInfo.column = this._topColumn[index];
                        this._topColumn.splice(index, 1);
                        this._badbuffDeltaTime = _eventBadBuffDeltaTime * SkillManager.getInstance().SkillAddition(SkillType.BadBuffDeltaTime);
                        break;
                }

                let brick = this._brickPool.createObject();
                brick.setData(mapGridInfo, this._paddleMaterial, i % 2, infoData, type);
                this.showGroup.addChild(brick);
                this._world.addBody(brick.body);
            }
        }

        public addFire(brick: BattleBrick) {
            if (Math.random() < 0.5) {
                if (this._idleLeftFirewall.length > 0) {
                    let index = Math.floor(Math.random() * this._idleLeftFirewall.length);
                    let id = this._idleLeftFirewall[index];
                    let firewall = this._firewallPool.createObject();
                    firewall.setData(id);
                    this.paddleGroup.addChild(firewall);
                    firewall.x = brick.x;
                    firewall.y = brick.y;
                    firewall.scaleY = 0.5;
                    this._idleLeftFirewall.splice(index, 1);
                    this._leftFirewall.push(id);
                    brick.leftFirewall.push(firewall);
                    egret.Tween.get(firewall).to({
                        x: 0,
                        y: id * gameConfig.perBrickSize,
                    }, 300);
                    egret.Tween.get(firewall).wait(300).to({ scaleY: 1 }, 250);
                }
            } else {
                if (this._idleRightFirewall.length > 0) {
                    let index = Math.floor(Math.random() * this._idleRightFirewall.length);
                    let id = this._idleRightFirewall[index];
                    let firewall = this._firewallPool.createObject();
                    firewall.setData(id);
                    this.paddleGroup.addChild(firewall);
                    firewall.x = brick.x;
                    firewall.y = brick.y;
                    firewall.scaleY = 0.5;
                    this._idleRightFirewall.splice(index, 1);
                    this._rightFirewall.push(id);
                    brick.rightFirewall.push(firewall);
                    egret.Tween.get(firewall).to({
                        x: 698,
                        y: id * gameConfig.perBrickSize,
                    }, 300);
                    egret.Tween.get(firewall).wait(300).to({ scaleY: 1 }, 250);
                }
            }
        }

        public async addIce(brick: BattleBrick) {
            for (let b of this._brickPool.list) {
                if (Math.random() < 0.5) {
                    b.frozen(brick);
                }
            }
            let iceAnim = this._icePool.createObject();
            iceAnim.x = brick.x;
            iceAnim.y = brick.y;
            this.paddleGroup.addChild(iceAnim);
            await iceAnim.play();
            this._icePool.destroyObject(iceAnim);
        }

        private gameEnd() {
            egret.stopTick(this.updateView, this);
            DataManager.playerModel.battleEnd();
            this._firewallPool.destroyAllObject();
        }

        private contactHandle(e: any) {
            let bodyA = e.bodyA;
            let bodyB = e.bodyB;
            let displayA: BattleBody = bodyA.displays[0];
            let displayB: BattleBody = bodyB.displays[0];
            let aType = displayA.battleBodyType;
            let bType = displayB.battleBodyType;
            if (aType == BattleBodyType.ball || bType == BattleBodyType.ball) {
                if (aType == BattleBodyType.ball) {
                    (<BattleBall>displayA).addHitCount();
                    if (displayB == this._rightWall && this._rightFirewall.length > 0) {
                        let meet = this.checkMeetFire(displayA.y, this._rightFirewall);
                        if (meet) {
                            this.playBreakBallAnim(<BattleBall>displayA);
                            (<BattleBall>displayA).meetFire = true;
                            return;
                        }
                    } else if (displayB == this._leftWall && this._leftFirewall.length > 0) {
                        let meet = this.checkMeetFire(displayA.y, this._leftFirewall);
                        if (meet) {
                            this.playBreakBallAnim(<BattleBall>displayA);
                            (<BattleBall>displayA).meetFire = true;
                            return;
                        }
                    }
                } else {
                    (<BattleBall>displayB).addHitCount();
                    if (displayA == this._rightWall && this._rightFirewall.length > 0) {
                        let meet = this.checkMeetFire(displayB.y, this._rightFirewall);
                        if (meet) {
                            this.playBreakBallAnim(<BattleBall>displayB);
                            (<BattleBall>displayB).meetFire = true;
                            return;
                        }
                    } else if (displayA == this._leftWall && this._leftFirewall.length > 0) {
                        let meet = this.checkMeetFire(displayB.y, this._leftFirewall);
                        if (meet) {
                            this.playBreakBallAnim(<BattleBall>displayB);
                            (<BattleBall>displayB).meetFire = true;
                            return;
                        }
                    }
                }
                if (bType == BattleBodyType.brick) {
                    if ((<BattleBall>displayA).isPenetration && !(<BattleBrick>displayB).isGoldShark()) { //贯穿弹对黄金鲨无效
                        (<BattleBall>displayA).resetV();
                        (<BattleBrick>displayB).hitByBall(<BattleBall>displayA, this._lastTime, true);
                    } else {
                        (<BattleBrick>displayB).hitByBall(<BattleBall>displayA, this._lastTime);
                    }
                } else if (aType == BattleBodyType.brick) {
                    if ((<BattleBall>displayB).isPenetration && !(<BattleBrick>displayA).isGoldShark()) {  //贯穿弹对黄金鲨无效
                        (<BattleBall>displayB).resetV();
                        (<BattleBrick>displayA).hitByBall(<BattleBall>displayB, this._lastTime, true);
                    } else {
                        (<BattleBrick>displayA).hitByBall(<BattleBall>displayB, this._lastTime);
                    }
                }
            }
            // if (aType == BattleBodyType.buff || bType == BattleBodyType.buff) {
            //     if (bType == BattleBodyType.paddle) {
            //         this.runBuff(<BattleBuff>displayA, this._lastTime);
            //     } else if (aType == BattleBodyType.paddle) {
            //         this.runBuff(<BattleBuff>displayB, this._lastTime);
            //     }
            // }
        }

        private checkMeetFire(ballY: number, list: number[]) {
            let meet = false;
            let ballIndex = Math.floor(ballY / gameConfig.perBrickSize);
            for (let i = 0; i < list.length; i++) {
                let startIndex = list[i];
                let endIndex = startIndex + 4;
                if (ballIndex >= startIndex && ballIndex <= endIndex) {
                    meet = true;
                    break;
                }
            }
            return meet;
        }

        private addSp() {
            let maxSp = Math.ceil(_maxSp * SkillManager.getInstance().SkillAddition(SkillType.BigBoom));        
            if (this._spCool > 0) return;
            if (this._nowSp < maxSp) {
                this._nowSp += 1;
                this.updateSp();
            }
        }

        private runBuff(buff: BattleBuff, time: number) {
            if (buff.now == time) return;
            buff.now = time;
            let index = this._buffList.indexOf(buff);
            if (index == -1) return;
            this._buffList.splice(index, 1);
            switch (buff.buffId) {
                case 1:
                    //this.addBallBuff();
                    break;
                case 2:
                    //this.addPaddleLengthBuff();
                    break;
                case 3:
                    //this.addGoldBuff();
                    break;
            }
            this._buffPool.destroyObject(buff);
        }

        private addBallBuff() {
            // if (this._ballList.length > 1) return;
            // for (let i = this._ballList.length - 1; i >= 0; i--) {
            //     let ball = this._ballList[i];
            //     for (let i = 0; i < 2; i++) {
            //         this.addBall(ball.ballId, 0, ball);
            //     }
            // }
        }

        private addGoldBuff() {
            //this.showBattleText(1, this._paddle, 1, -30);
            //DataManager.playerModel.addGold(1, "接住元宝奖励1元宝");
        }

        public getCurScoreTimeSp() {
            return this.curScoreTimeSp;
        }

        private updateSp() {
            let maxSp = Math.ceil(_maxSp * SkillManager.getInstance().SkillAddition(SkillType.BigBoom));        
            this._nowSp = Math.min(this._nowSp, maxSp);
            //console.log('更新SP：', this._nowSp,maxSp, this._nowSp/maxSp,this);
            this._paddle.setSp(this._nowSp / maxSp);
        }

        public addHit(brick: BattleBrick, ball: BattleBall) {
            SoundManager.playEffect("pengzhuang", 0.8);
            let score = brick.getScore();
            if (score) {
                if (this._doubleTime > 0) {
                    score *= 2;
                }
                this.showBattleText(score, brick, 2, -10);
                DataManager.playerModel.addScore(score);
                this._nowEvent += score;
            }
            ball.incLifeValue(score);
            this.hitCount++;
            this.hitLabel.text = `连击数:${this.hitCount}`;
        }

        protected beforeRemove() {
            this._doubleTime = 0;
            this._icePool.destroyAllObject();
            this._brickPool.destroyAllObject();
            this._ballPool.destroyAllObject();
            this._paddlePool.destroyAllObject();
            this._buffPool.destroyAllObject();
            this._battleTextPool.destroyAllObject();
            this._breakPool.destroyAllObject();
            this._rewardBallPool.destroyAllObject();
            this._blackHolePool.destroyAllObject();
            this._boomPool.destroyAllObject();
            this._timeBoomPool.destroyAllObject();
            this._firewallPool.destroyAllObject();
            this.touchGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);
            egret.stopTick(this.updateView, this);
        }

        public async showBoom(battleBrick: BattleBrick, isSmall: boolean = false) {
            SoundManager.playEffect("zhadan", 0.5);
            let boom = this._boomPool.createObject();
            boom.x = battleBrick.x;
            boom.y = battleBrick.y;
            this.showGroup.addChild(boom);
            await boom.play();
            this._boomPool.destroyObject(boom);
        }

        public showBattleText(damage: number, brick: BattleBody, type: number = 1, y: number = 0, rewardBallItem: BattleRewardBall = null, timeBoom: boolean = false) {
            let self = this;
            let effectTips;
            if (rewardBallItem) {
                rewardBallItem.setData(damage);
                effectTips = rewardBallItem;
                if (timeBoom) {
                    effectTips.scaleX = effectTips.scaleY = 3;
                    effectTips.y = gameConfig.curHeight() - 350;
                    effectTips.x = gameConfig.curWidth() / 2 - effectTips.width * 3 / 2;
                } else {
                    effectTips.scaleX = effectTips.scaleY = 1;
                    effectTips.y = brick.y + y;
                    effectTips.x = brick.x + brick.width / 2 - effectTips.width / 2;
                }
            } else {
                effectTips = self._battleTextPool.createObject();
                effectTips.size = 22;
                effectTips.y = brick.y + y;
                effectTips.alpha = 0;

                effectTips.textColor = gameConfig.TextColors.pinkRed;
                effectTips.text = `${damage > 0 ? "+" : ""}${damage}`;
                effectTips.fontFamily = "DynoBold";

                if (brick.battleBodyType == BattleBodyType.brick) {
                    effectTips.x = brick.x + brick.width / 2 - effectTips.width / 2;
                } else {
                    effectTips.x = brick.x - effectTips.width / 2;
                }

                effectTips.textAlign = egret.HorizontalAlign.CENTER;
            }

            if (timeBoom) {
                if (!this.contains(effectTips)) {
                    this.addChild(effectTips);
                }
            } else {
                if (!this.showGroup.contains(effectTips)) {
                    this.showGroup.addChild(effectTips);
                }
            }

            let onComplete2: Function = function () {
                if (timeBoom) {
                    if (this.contains(effectTips)) {
                        this.removeChild(effectTips);
                        if (rewardBallItem) {
                            self._rewardBallPool.destroyObject(rewardBallItem);
                        } else {
                            self._battleTextPool.destroyObject(effectTips);
                        }
                    }
                } else {
                    if (this.showGroup.contains(effectTips)) {
                        this.showGroup.removeChild(effectTips);
                        if (rewardBallItem) {
                            self._rewardBallPool.destroyObject(rewardBallItem);
                        } else {
                            self._battleTextPool.destroyObject(effectTips);
                        }
                    }
                }
            };

            effectTips.visible = true;
            egret.Tween.get(effectTips).to({
                alpha: 1
            }, 300).to({ alpha: 0 }, 1000).call(onComplete2, this);
            egret.Tween.get(effectTips).to({
                y: effectTips.y - 20,
            }, 1300, egret.Ease.backOut);
        }

        public destroyBrick(brick: BattleBrick, ball: BattleBall = null) {
            if (brick.getBuffType() == BrickType.ice) {
                for (let b of this._brickPool.list) {
                    if (b.frozenBrick && b.frozenBrick == brick) {
                        b.unFrozen();
                    }
                }
            }
            if (brick.rightFirewall.length > 0) {
                for (let i = brick.rightFirewall.length - 1; i >= 0; i--) {
                    let wall = brick.rightFirewall[i];
                    let index = this._rightFirewall.indexOf(wall.wallIndex);
                    this._rightFirewall.splice(index, 1);
                    this._idleRightFirewall.push(wall.wallIndex);
                    brick.rightFirewall.splice(i, 1);
                    this._firewallPool.destroyObject(wall);
                }
            }
            if (brick.leftFirewall.length > 0) {
                for (let i = brick.leftFirewall.length - 1; i >= 0; i--) {
                    let wall = brick.leftFirewall[i];
                    let index = this._leftFirewall.indexOf(wall.wallIndex);
                    this._leftFirewall.splice(index, 1);
                    this._idleLeftFirewall.push(wall.wallIndex);
                    brick.leftFirewall.splice(i, 1);
                    this._firewallPool.destroyObject(wall);
                }
            }
            if (brick.blackHoleList.length > 0) {
                for (let i = brick.blackHoleList.length - 1; i >= 0; i--) {
                    let hole = brick.blackHoleList[i];
                    this._blackHolePool.destroyObject(hole);
                    this._blackHoleList.splice(this._blackHoleList.indexOf(hole), 1);
                }
            }
            SoundManager.playEffect("posui");
            this._breakCount++;
            let price = brick.getRewardBall();
            let score = brick.getBreakScore();
            let type = brick.getBuffType();
            if (price) {
                // DataManager.playerModel.addDiamond(price);   这是打碎砖块给奖励的地方(目前没有奖励)
                // let y = score ? -70 : -40;
                // this.showBattleText(price, brick, 1, y, this._rewardBallPool.createObject());
            }
            if (score) {
                if (this._doubleTime > 0) {
                    score *= 2;
                }
                //TODO: 发送黄金鲨统计
                // DataManager.playerModel.addScore(score);
                // this.showBattleText(score, brick, 1, -40);
            }

            switch (type) {
                case BrickType.doubleScore:
                    this._doubleTime = 60 * 15 + SkillManager.getInstance().SkillAddition(SkillType.DoubleScore);
                    break;
                case BrickType.boom:
                    // let minX = brick.x - brick.width * 3;
                    // let maxX = brick.x + brick.width * 3;
                    // let minY = brick.y - brick.height * 3;
                    // let maxY = brick.y + brick.height * 3;
                    // for (let b of this._brickPool.list) {
                    //     if (b.x >= minX && b.x <= maxX && b.y >= minY && b.y <= maxY) {
                    //         if (this._boomBrick.indexOf(b) == -1)
                    //             this._boomBrick.push(b);
                    //     }
                    // } 炸弹3*3范围

                    //炸弹全部范围破碎
                    for (let b of this._brickPool.list) {
                        if (b.buffType == BrickType.normal) {   //炸弹只对砖块有影响
                            b.hitBySp();
                        }
                    }
                    this.showBoom(brick, false);
                    break;
                case BrickType.penetration:
                    this._paddle.playChangeAnim();
                    DataManager.playerModel.addPenetration(SkillManager.getInstance().SkillAddition(SkillType.Penetration));
                    break;
                case BrickType.goldShark:
                    this._curGoldSharkScore = score;
                    this.sendGoldSharkStats(score);
                    this.showBattleText(score, brick, 1, -40);
                    break;

            }
            if (brick.brickInfo.row == 0) {
                this._topColumn.push(brick.brickInfo.column);
            }

            if (brick.isBadBuff()) {
                this._breakBad += 1;
                this.showBadPower();
            }

            this.playBreakAnim(brick);
            this.cleanBrick(brick);

            score =  Math.floor(score*SkillManager.getInstance().SkillAddition(SkillType.BreakGoldGet)) ;
            return score;
        }
        //TODO: 发送黄金鲨分数统计到服务器
        private sendGoldSharkStats(score) {
            // console.log('发送黄金鲨消息', score)
            sendMessage("msg.BT_ReqCrushSuperBrick", msg.BT_ReqCrushSuperBrick.encode({
                userid: DataManager.playerModel.getUserId()
            }));
        }
        // 接收服务器返回消息
        private onBT_RetCrushSuperBrick(data: msg.BT_RetCrushSuperBrick) {
            let score = this._curGoldSharkScore;
            DataManager.playerModel.addScore(score);
        }

        private async playBreakAnim(brick: BattleBrick) {
            let breakItem = this._breakPool.createObject();
            breakItem.setData(brick);
            this.showGroup.addChild(breakItem);
            await breakItem.play();
            this._breakPool.destroyObject(breakItem);
        }

        private async playBreakBallAnim(ball: BattleBall) {
            let breakItem = this._boomPool.createObject();
            this.showGroup.addChild(breakItem);
            breakItem.x = ball.x - 40;
            breakItem.y = ball.y - 10;
            await breakItem.playBall();
            this._boomPool.destroyObject(breakItem);
        }

        private cleanBrick(brick: BattleBrick) {
            this._brickPool.recycleObject(brick);
        }

        public addBlackHole(brick: BattleBrick) {
            if (this._blackHoleList.length > 10) return;
            let blackHole1 = this._blackHolePool.createObject();
            let blackHole2 = this._blackHolePool.createObject();
            blackHole1.setLink(blackHole2);
            blackHole2.setLink(blackHole1);
            blackHole1.x = blackHole2.x = brick.x;
            blackHole1.y = blackHole2.y = brick.y;
            this.buffGroup.addChild(blackHole1);
            this.buffGroup.addChild(blackHole2);
            let end1X = Math.floor(Math.random() * 19) * gameConfig.perBrickSize;
            let end1Y = (Math.floor(Math.random() * 18) + 1) * gameConfig.perBrickSize;
            let end2X = Math.floor(Math.random() * 19) * gameConfig.perBrickSize;
            let end2Y = (Math.floor(Math.random() * 18) + 1) * gameConfig.perBrickSize;
            blackHole1.showAnim.play(0);
            blackHole2.showAnim.play(0);
            this._blackHoleList.push(blackHole1, blackHole2);
            brick.blackHoleList.push(blackHole1, blackHole2);
            egret.Tween.get(blackHole1).to({ x: end1X, y: end1Y }, 300);
            egret.Tween.get(blackHole2).to({ x: end2X, y: end2Y }, 300);
        }

        private showBadPower() {
            if (this._breakBad > _breakBadBuffMax) {
                this._breakBad = _breakBadBuffMax;
            }
            this.badbuffPanel.refreshView(this._breakBad);
        }

        public openBadBox(_score: number) {
            let goldImg = new eui.Image();
            goldImg.source = `lucky2_json.goldAni_0000`;
            this.addChild(goldImg);

            goldImg.anchorOffsetX = goldImg.width / 2;
            goldImg.anchorOffsetY = goldImg.height / 2;
            goldImg.x = gameConfig.curWidth() / 2;
            goldImg.y = gameConfig.curHeight() / 2 - 150;

            let goldTxt = new eui.Label();
            goldTxt.text = `${_score}金币`;
            goldTxt.textColor = 0xfffb83;
            goldTxt.strokeColor = 0xf47606;
            goldTxt.stroke = 3;
            goldTxt.textAlign = egret.HorizontalAlign.CENTER;
            goldTxt.size = 36;
            goldTxt.bold = true;
            this.addChild(goldTxt);

            goldTxt.anchorOffsetX = goldTxt.width / 2;
            goldTxt.anchorOffsetY = goldTxt.height / 2;
            goldTxt.x = gameConfig.curWidth() / 2;
            goldTxt.y = gameConfig.curHeight() / 2 - 90;
            goldTxt.scaleX = 0;
            goldTxt.scaleY = 0;

            let _currentIndex = 0;
            let _playInterval = egret.setInterval(() => {
                _currentIndex++;
                if (_currentIndex > 7) {
                    egret.setTimeout(() => {
                        this.removeChild(goldImg);
                        this.removeChild(goldTxt);
                    }, this, 700);
                    egret.clearInterval(_playInterval);
                    _playInterval = null;
                } else {
                    goldImg.source = `lucky2_json.goldAni_000${_currentIndex}`;
                }
            }, this, 150);

            egret.Tween.get(goldTxt).to({ scaleX: 1.2, scaleY: 1.2 }, 500).to({ scaleX: 1, scaleY: 1 }, 200);
        }

        public setBadPower(power: number) {
            this._breakBad = power;
        }

        private userGoHandle() {
            openPanel(PanelType.user);
        }

        private luckyGoHandle() {
            if (this.canOpenLuckyPanel()) {
                openPanel(PanelType.lucky);
            } else {
                showTips("游戏状态中，无法进行抽奖！", true);
            }

            // egret.stopTick(this.updateView,this)
        }

        private canOpenLuckyPanel() {
            return this._ballPool.list.length <= 0;
        }

        private rechargeGoHandle() {
            openPanel(PanelType.pay);
        }

        private bagGoHandle() {
            openPanel(PanelType.bag);
        }

        private backHandle() {
            let backFunc: Function = function () {
                egret.stopTick(this.updateView, this);

                sendMessage("msg.BT_ReqQuitGameRoom", msg.BT_ReqQuitGameRoom.encode({
                    roomid: BattleManager.getInstance().getRoomId(),
                    userid: DataManager.playerModel.getUserId(),
                    gold: DataManager.playerModel.getScore(),
                }));

                SceneManager.changeScene(SceneType.main);
            }.bind(this);
            let maxSp = Math.ceil(_maxSp * SkillManager.getInstance().SkillAddition(SkillType.BigBoom));            
            if (this._nowSp >= maxSp / 2 || this._breakBad >= _breakBadBuffMax) {
                showDialog("现在退出游戏，能量将不保存哦！", "确定", function () {
                    backFunc();
                });
            } else {
                backFunc();
            }
        }

        private static _instance: BattleScene;

        public static getInstance(): BattleScene {
            if (!BattleScene._instance) {
                BattleScene._instance = new BattleScene();
            }
            return BattleScene._instance;
        }
    }

    export interface MapGridInfo {
        row: number;
        column: number;
        type: number;
        id: number;
    }

    export const enum BattleBodyType {
        ball = 1,
        paddle,
        brick,
        wall,
        buff
    }

    export const enum EventBuffType {
        goodBuff = 1,
        badBuff,
    }

    export interface ProInfo {
        id: number;
        pro: number;
    }
}