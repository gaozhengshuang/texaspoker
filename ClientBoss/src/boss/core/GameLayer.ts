module game {
    export class GameLayer extends eui.UILayer {
        /**
         * 场景层 如 战场、主城、副本战场之类的
         * @type {eui.UILayer}
         */
        static sceneLayer: eui.UILayer = new eui.UILayer();
        /**
         * 弹窗层 如 设置、背包、装备之类的
         * @type {eui.UILayer}
         */
        static panelLayer: eui.UILayer = new eui.UILayer();
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

        constructor() {
            super();
            this.init();
        }

        private init() {
            this.touchThrough = true;

            GameLayer.sceneLayer.touchEnabled = false;
            GameLayer.panelLayer.touchEnabled = false;
            GameLayer.effectLayer.touchEnabled = false;
            GameLayer.maskLayer.touchEnabled = false;

            GameLayer.sceneLayer.touchThrough = true;
            GameLayer.panelLayer.touchThrough = true;
            GameLayer.effectLayer.touchThrough = true;
            GameLayer.maskLayer.touchThrough = true;

            this.addChild(GameLayer.sceneLayer);
            this.addChild(GameLayer.panelLayer);
            this.addChild(GameLayer.effectLayer);
            this.addChild(GameLayer.maskLayer);
        }
    }
}