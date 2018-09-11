module game {

	/**
	 * 引导执行器
	 */
    export class GuideExecutor {

        private _runStartTime: number;
        /**
         * 引导超时时间
         */
        private _timeOut: number = 10000;
        /**
         * 侦听器列表
         */
        private _listeners: egret.DisplayObject[] = [];

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
                        if (paramsArr[i] != params[i]) {
                            return;//引导触发失败 参数不满足
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
                    openPanel(PanelType.GuidePanel);
                    GuidePanel.getInstance().setData(this._guideStepDef, rect);
                    break;
            }
            this._runStartTime = Date.now();
            this._isOnGuide = true;
            this.addFinishLisener(finishArr);
        }

        /**
         * 添加完成监听
         */
        private addFinishLisener(paramsArr: any[]) {
            switch (this._guideStepDef.FinishType) {
                case GuideFinishType.ClickEle:
                    if (paramsArr[0] == "any") {
                        GuidePanel.getInstance().bitmap.pixelHitTest = false;
                        GuidePanel.getInstance().bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgClick, this)
                    }
                    else {
                        let panel: PanelComponent = getPanel(paramsArr[0]);
                        if (panel) {
                            let targetEle: egret.DisplayObject = panel[paramsArr[1]];
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
            }
        }

        /**
         * 完成引导
         */
        public finishGuide() {
            this._isOnGuide = false;
            if (this._guideStepDef.FinishFlag == 1) {
                GuideManager.getInstance().reqSetGuideSetp(this._guideStepDef.Group);
            }
            if (this._guideStepDef.EndFlag == 1) {
                let group = this._guideStepDef.Group + 1;
                //引导步骤从2开始
                group = Math.min(2, group);
                this._guideStepDef = GuideManager.getInstance().getTGuideDefine(group);
            }
            else {
                this._guideStepDef = <table.TGuideDefine>table.TGuideById[this._guideStepDef.NextId];
            }
            GuidePanel.getInstance().remove();
            if (this._guideStepDef) {
                let isImmediatelyRun = this._guideStepDef.TriggerType == GuideTriggerType.None;
                if (isImmediatelyRun) {
                    this.run(null);
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

        private onEleClick(event: egret.TouchEvent) {
            let target = event.currentTarget;
            target.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEleClick, this);
            this._listeners.splice(this._listeners.indexOf(target), 1);
            this.finishGuide();
        }

        private getRect(paramsArr: any[], finishArr: any[]): egret.Rectangle {
            let rect;
            let panel: PanelComponent = getPanel(paramsArr[0]);
            if (panel) {
                let targetEle: egret.DisplayObject = panel[finishArr[0]];
                if (targetEle) {
                    let p = targetEle.localToGlobal();
                    rect = egret.Rectangle.create();
                    rect.x = p.x;
                    rect.y = p.y;
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
    * 引导步骤类型
    */
    export enum GuideStepType {
        None = 0,
    	/**
		 * 元素点击
		 */
        ClickElement = 1,
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
    }
}