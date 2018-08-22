module game {
    export class GameLayer extends eui.UILayer {
        /**
         * 场景层 如 战场、主城、副本战场之类的
         * @type {eui.UILayer}
         */
        static sceneLayer: eui.UILayer = new eui.UILayer();
        /**
         * 场景ui层
         */
        static sceneUiLayer: eui.UILayer = new eui.UILayer();
        /**
         * 面板层 如 设置、背包、装备之类的
         * @type {eui.UILayer}
         */
        static panelLayer: eui.UILayer = new eui.UILayer();
        /**
         * 挂件层
         */
        static diyLayer:eui.UILayer = new eui.UILayer();
        /**
         * 特效层 如 闪烁、飘字之类的
         * @type {eui.UILayer}
         */
        static effectLayer: eui.UILayer = new eui.UILayer();
        /**
         * 遮罩层
         * @type {eui.UILayer}
         */
        static maskLayer: eui.UILayer = new eui.UILayer();
        /**
         * 弹窗层 (提示框)
         */
        static alertLayer: eui.UILayer = new eui.UILayer();

        constructor() {
            super();
            this.init();
        }

        private init() {
            this.touchThrough = true;
            GameLayer.sceneLayer.touchEnabled = false;
            GameLayer.sceneUiLayer.touchEnabled = false;
            GameLayer.panelLayer.touchEnabled = false;
            GameLayer.diyLayer.touchEnabled = false;
            GameLayer.effectLayer.touchEnabled = false;
            GameLayer.maskLayer.touchEnabled = false;
            GameLayer.alertLayer.touchEnabled = false;

            GameLayer.sceneLayer.touchThrough = true;
            GameLayer.sceneUiLayer.touchThrough = true;
            GameLayer.panelLayer.touchThrough = true;
            GameLayer.diyLayer.touchThrough = true;
            GameLayer.effectLayer.touchThrough = true;
            GameLayer.maskLayer.touchThrough = true;
            GameLayer.alertLayer.touchThrough = true;

            this.addChild(GameLayer.sceneLayer);
            this.addChild(GameLayer.sceneUiLayer);
            this.addChild(GameLayer.panelLayer);
            this.addChild(GameLayer.diyLayer);
            this.addChild(GameLayer.effectLayer);
            this.addChild(GameLayer.maskLayer);
            this.addChild(GameLayer.alertLayer);
        }
    }
    /**
    * 面板层级枚举
     */
    export const enum PanelLayerType {
        Panel,
        Diy,
    }
}