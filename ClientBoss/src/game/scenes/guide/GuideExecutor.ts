module game {

	/**
	 * 引导执行器
	 */
    export class GuideExecutor {

        private _runStartTime: number;
        /**
         * 引导超时时间
         */
        private _timeOut: number = 100000000;
        /**
         * 侦听器列表
         */
        private _listeners: egret.DisplayObject[] = [];

        /**
         * 该步引导点击任何地方可以关闭
         */
        private _anyStr: string = "any";
        /**
         * 该引导步骤不需要点击组件 需要协议返回
         */
        private _none: string = "none";

        private _isOnGuide: boolean;
        public get isOnGuide(): boolean {
            return this._isOnGuide;
        }

        private _guideStepDef: table.TGuideDefine;

        public init() {
            //对引导组进行升序排序
            table.TGuide.sort((a: table.TGuideDefine, b: table.TGuideDefine) => {
                if (a.Group > b.Group) {
                    return 1;
                }
                else if (a.Group < b.Group) {
                    return -1;
                }
                else if (a.Group == b.Group) {
                    return 0;
                }
            });
            NotificationCenter.addObserver(this, this.onDataInit, PlayerModel.PLAYERMODEL_DATA_INIT);
            NotificationCenter.addObserver(this, this.onUserInfo, CommandName.UPDATE_USER_INFO);
            NotificationCenter.addObserver(this, this.onPanelOpen, PanelOpenNotification);
            TickUtil.AddSecondsInvoke(this.onTick, this);
        }

        private onTick() {
            if (this._isOnGuide) {
                if (Date.now() - this._runStartTime > this._timeOut) {
                    for (let target of this._listeners) {
                        target.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEleClick, this);
                    }
                    this._listeners.length = 0;
                    this.finishGuide();
                }
            }
        }
        /**
         * 初始化定位需要执行哪一步引导
         */
        private onDataInit() {
            NotificationCenter.removeObserver(this, PlayerModel.PLAYERMODEL_DATA_INIT);
            let group = DataManager.playerModel.userInfo.newplayerstep + 1;
            if (group > 1) {
                this._guideStepDef = GuideManager.getInstance().getTGuideDefine(group);
            }
        }
        /**
         * 用户信息
         */
        private onUserInfo(key: number) {
            if (key == msg.UserInfoType.NewPlayerStep) {
                if (DataManager.playerModel.userInfo.newplayerstep == 1) //第一步引导特殊处理
                {
                    this.onDataInit();
                    this.tryRun();
                }
            }
        }
        private tryRun() {
            let data = null;
            if (this._guideStepDef.TriggerParams) {
                data = this._guideStepDef.TriggerParams.split(',');
            }
            this.run(data);
        }
        private onPanelOpen(panel: PanelType) {
            this.tryTriggerGuide(GuideTriggerType.OpenPanel, [panel]);
        }

        /**
         * 尝试触发引导
         */
        private tryTriggerGuide(triggerType: GuideTriggerType, params: any[]) {
            if (this._isOnGuide) {
                return;
            }
            if (!params) {
                Console.log("引导检测参数异常！params:", params);
                return;
            }
            if (this._guideStepDef && this._guideStepDef.TriggerType == triggerType) {
                let paramsArr: any[];
                if (this._guideStepDef.TriggerParams) {
                    paramsArr = this._guideStepDef.TriggerParams.split(',');
                    for (let i: number = 0; i < params.length; i++) {
                        let typeStr = typeof params[i];
                        switch (typeStr) {
                            case "number":
                                if (parseInt(paramsArr[i]) != params[i]) {
                                    Console.log("引导触发失败！参数不满足 params:", params);
                                    return;
                                }
                                break;
                            default:
                                if (paramsArr[i] != params[i]) {
                                    Console.log("引导触发失败！参数不满足 params:", params);
                                    return;
                                }
                                break;
                        }

                    }
                    this.run(paramsArr);
                }
                else {
                    this.run(null); //如果没有触发参数直接执行
                }
            }
        }

        /**
         * 执行引导
         */
        private run(paramsArr: any[]) {
            let rect: egret.Rectangle;
            let finishArr = this._guideStepDef.FinishParams.split(',');
            switch (this._guideStepDef.TriggerType) {
                case GuideTriggerType.None: //上一步完成 立即执行的引导
                    let tmpeParamsArr = this._guideStepDef.TriggerParams.split(',');
                    rect = this.getRect(tmpeParamsArr, finishArr);
                    if (!rect) {
                        return;
                    }
                    break;
                case GuideTriggerType.OpenPanel: //打开面板 执行的引导
                    if (paramsArr && paramsArr.length > 1) {
                        rect = this.getRect(paramsArr, finishArr);
                    }
                    if (!rect) {
                        return;
                    }
                    break;
            }
            GameConfig.showDownBtnFun(false);

            openPanel(PanelType.GuidePanel);
            GuidePanel.getInstance().setData(this._guideStepDef, rect);
            this._runStartTime = Date.now();
            this._isOnGuide = true;
            if (this._guideStepDef.AutoFinishFlag == 1) {
                GuideManager.getInstance().reqSetGuideSetp(this._guideStepDef.Group, this._guideStepDef.Id);
            }
            this.addFinishLisener(finishArr);
        }

        /**
         * 添加完成监听
         */
        private addFinishLisener(paramsArr: any[]) {
            switch (this._guideStepDef.FinishType) {
                case GuideFinishType.ClickEle:
                    if (paramsArr[0] == this._anyStr) {
                        GuidePanel.getInstance().bitmap.pixelHitTest = false;
                        GuidePanel.getInstance().bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgClick, this)
                    }
                    else {
                        let panel: PanelComponent = getPanel(parseInt(paramsArr[0]));
                        if (panel) {
                            let tempArr = paramsArr.slice(1);
                            let targetEle: egret.DisplayObject = getTreeProperty(panel, tempArr);
                            if (targetEle) {
                                targetEle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEleClick, this);
                                this._listeners.push(targetEle);
                            }
                            else {
                                Console.log("完成参数 元素参数异常！" + paramsArr);
                            }
                        }
                        else {
                            Console.log("完成参数 面板参数异常！" + paramsArr);
                        }
                    }
                    break;
                case GuideFinishType.ReceiveMsg:
                    NotificationCenter.addObserver(this, this.onReceiveMsg, paramsArr[0]);
                    break;
            }
        }

        /**
         * 完成引导
         */
        public finishGuide() {
            this._isOnGuide = false;
            if (this._guideStepDef.FinishFlag == 1 && this._guideStepDef.AutoFinishFlag != 1) {
                GuideManager.getInstance().reqSetGuideSetp(this._guideStepDef.Group, this._guideStepDef.Id);
            }
            let isHaveNext = this._guideStepDef.NextId > 0;

            if (this._guideStepDef.EndFlag == 1) {
                let group = this._guideStepDef.Group + 1;
                //引导步骤从2开始
                group = Math.max(2, group);
                this._guideStepDef = GuideManager.getInstance().getTGuideDefine(group);
                GameConfig.showDownBtnFun(true);
            }
            else {
                this._guideStepDef = <table.TGuideDefine>table.TGuideById[this._guideStepDef.NextId];
            }
            GuidePanel.getInstance().remove();
            if (this._guideStepDef) {
                let isImmediatelyRun = this._guideStepDef.TriggerType == GuideTriggerType.None || isHaveNext;
                if (isImmediatelyRun) {
                    this.tryRun();
                }
            }
        }

        /**
         * 点击任何地方
         */
        private onBgClick() {
            GuidePanel.getInstance().bitmap.pixelHitTest = true;
            GuidePanel.getInstance().bitmap.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgClick, this);
            this.finishGuide();
        }
        /**
         * 接受消息
         */
        private onReceiveMsg(data: any) {
            let finishArr = this._guideStepDef.FinishParams.split(',');
            if (finishArr) {
                NotificationCenter.removeObserver(this, finishArr[0]);
                this.finishGuide();
            }
        }

        private onEleClick(event: egret.TouchEvent) {
            let target = event.currentTarget;
            target.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEleClick, this);
            this._listeners.splice(this._listeners.indexOf(target), 1);
            this.finishGuide();
        }

        private getRect(paramsArr: any[], finishArr: any[]): egret.Rectangle {
            let rect;
            if (paramsArr.length < 1) {
                Console.log("引导触发异常！引导指向区域配置长度错误", paramsArr);
                return;
            }
            if (paramsArr[1] == this._none) {
                if (paramsArr.length >= 6) {
                    rect = egret.Rectangle.create();
                    rect.x = parseInt(paramsArr[2]);
                    rect.y = parseInt(paramsArr[3]);
                    rect.width = parseInt(paramsArr[4]);
                    rect.height = parseInt(paramsArr[5]);
                }
                else {
                    Console.log("引导触发异常！引导指向区域配置长度错误：", paramsArr);
                }
            }
            else {
                let panel: PanelComponent = getPanel(parseInt(paramsArr[0]));
                if (panel) {
                    let targetEle: eui.Component = panel[finishArr[1]];
                    if (targetEle) {
                        let p = targetEle.localToGlobal();
                        rect = egret.Rectangle.create();
                        rect.x = p.x;
                        rect.y = p.y;

                        // if (isNaN(targetEle.verticalCenter) == false) {
                        //     let globalP = toGlobalPoint(targetEle);
                        //     rect.y = globalP.y + targetEle.parent.height / 2 + targetEle.verticalCenter - targetEle.height / 2;
                        // }
                        // if (isNaN(targetEle.horizontalCenter) == false) {
                        //     let globalP = toGlobalPoint(targetEle);
                        //     rect.x = globalP.x + targetEle.parent.width / 2 + targetEle.horizontalCenter - targetEle.width / 2;
                        // }

                        rect.width = targetEle.width;
                        rect.height = targetEle.height;

                        if (rect.width <= 0 || rect.height <= 0) {
                            let bounds = targetEle.getBounds();
                            rect.width = bounds.width;
                            rect.height = bounds.height;
                        }
                    }
                    else {
                        Console.log("引导触发异常！未找到指向的原件：", finishArr[1]);
                        return;
                    }
                }
                else {
                    Console.log("引导触发异常！未找到引导面板：", paramsArr[0]);
                    return;
                }
            }
            return rect;
        }

        private static _instance: GuideExecutor;
        public static getInstance(): GuideExecutor {
            if (!GuideExecutor._instance) {
                GuideExecutor._instance = new GuideExecutor();
            }
            return GuideExecutor._instance;
        }
    }

	/**
	 * 引导触发类型
	 */
    export enum GuideTriggerType {
        None = 0,
    	/**
		 * 面板打开
		 */
        OpenPanel = 1,
    }

    /**
     * 单步引导完成类型
     */
    export enum GuideFinishType {
        None = 0,
        /**
         * 点击面板元素
         */
        ClickEle = 1,
        /**
         * 接受消息
         */
        ReceiveMsg = 2,
    }
    /**
     * 引导手指方向
     */
    export enum GuideFingerOrientation {
        None = 0,
        Up = 1,
        Down = 2,
        Left = 3,
        Right = 4
    }
}