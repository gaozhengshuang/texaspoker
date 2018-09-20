var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 面板基类
 **/
var BasePanel = (function (_super) {
    __extends(BasePanel, _super);
    function BasePanel() {
        var _this = _super.call(this) || this;
        /*所在层级*/
        _this.layer = UILayerType.Module;
        /*面板对齐方式*/
        _this.panelAlignType = PanelAlignType.Center_Center;
        /*横向偏移*/
        _this.offsetH = 0;
        /*纵向偏移*/
        _this.offsetV = 0;
        /*
         * 是否缓动打开
         */
        _this.isTween = true;
        /*
         * 是否关闭按钮缓动打开
         */
        _this.isCloseButtonTween = false;
        /*是否是第一次执行缓动*/
        _this.isFirstTween = false;
        /*exml是否加载完成*/
        _this.isLoadComplete = false;
        /**
         * 面板缓动效果结束
         */
        _this.isTweenOver = false;
        /**
         * 是否正在播放关闭的缓动动画
         */
        _this.isTweenCloseing = false;
        /**
         * 遮罩点击是否关闭
         */
        _this._isMaskClickClose = false;
        /**
         * 遮罩alpha值
         */
        _this._maskAlpha = 0.5;
        /**
         * 是否忽略自适应
         */
        _this.isIgnoreAdaptation = false;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onAwake, _this);
        _this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, _this.onEnable, _this);
        _this.setTouchEnable(true);
        _this.setTouchChildren(true);
        _this.width = GameSetting.StageWidth;
        return _this;
        // this.height = GameSetting.StageHeight;
        // this.skinName = xxxxxx; tips 注：子面板 给面板添加皮肤的这句代码要放在构造函数最下面 因为赋值了的话就触发了加载---->执行onawake
    }
    Object.defineProperty(BasePanel.prototype, "isMaskClickClose", {
        /**
         * 点击遮罩层是否关闭 不支持立即生效，需重新打开面板生效
         */
        set: function (value) {
            this._isMaskClickClose = value;
            if (value) {
                this.setGrayMask(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePanel.prototype, "maskAlpha", {
        /**
         * 遮罩alpha值
         */
        set: function (value) {
            this._maskAlpha = value;
            this.setGrayMask(true);
            this.grayMask.alpha = value;
        },
        enumerable: true,
        configurable: true
    });
    BasePanel.prototype.setSkinName = function (name) {
        this.skinName = PathName.SkinsPanelDirectory + name + '.exml';
    };
    /**
     * 直接把skinName设置为exml文件的路径。这种方式要注意的是:
     * 在 createChildren 的时候，是获取不到内部组件的，因为此时 exml 文件还没有加载完成，
     * 要通过监听 eui.UIEvent.COMPLETE 这个事件获取组件创建完成的消息。
     * 会先执行 createChildren 再执行 onAwake
     * 另外需要注意的是:如果已经在主题中加载了 EXML 文件，会先执行 onAwake 再执行 createChildren
     */
    BasePanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 皮肤文件加载完成时调用，仅面板初始化调用一次
     * */
    BasePanel.prototype.onAwake = function (event) {
        this.isLoadComplete = true;
        if (this.isTween) {
            this.isTweenOver = false;
            this.isFirstTween = true;
            this.onTween();
        }
        if (this.tweenGroup) {
            this.tweenGroup.maxWidth = GameSetting.StageWidth;
            // this.tweenGroup.maxHeight = GameSetting.StageHeight;
        }
        else {
            this.maxWidth = GameSetting.StageWidth;
            // this.maxHeight = GameSetting.StageHeight;
        }
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onAwake, this);
    };
    /**
     * 面板内容初始化，每次执行showpanel都会执行
     * tips:不要在init函数里面做面板打开关闭的处理，这个时候面板都还没有显示，有可能导致打开关闭的操作无效
     */
    BasePanel.prototype.init = function (appendData) {
        if (this.isTween && this.isLoadComplete && !this.isFirstTween) {
            this.isTweenOver = false;
            this.onTween();
        }
        if (appendData && appendData.prevPanelName) {
            this.prevPanelName = appendData.prevPanelName;
        }
        this.panelData = appendData;
        this.isTweenCloseing = false;
    };
    /**
     * 面板添加到舞台时调用,每次打开都会调用 注意：事件不一定每次都会执行，
     * 因为面板正在显示的时候，有可能一直触发显示(showpanel)，则此时触发不了onEnable事件
     * 如果需要每次触发的功能需求 需写在init函数里面
     * 如果没有必要，面板的所有事件需写在此方法内
     */
    BasePanel.prototype.onEnable = function (event) {
        if (this.closeButton && this.isCloseButtonTween) {
            egret.Tween.removeTweens(this.closeButton);
            var enter = egret.Tween.get(this.closeButton);
            var sx = this.closeButton.scaleX;
            var sy = this.closeButton.scaleY;
            this.closeButton.scaleX = 0;
            this.closeButton.scaleY = 0;
            enter.wait(300).to({ scaleX: sx, scaleY: sy }, 200);
        }
        if (this.closeButton) {
            this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClickHandler, this);
        }
        if (this._isMaskClickClose) {
            this.grayMask.touchEnabled = true;
            this.grayMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClickHandler, this);
        }
        this.addEventListener(egret.Event.RENDER, this.onRender, this);
        this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    /**
     * 如果没有必要，面板的所有事件移除需写在此方法内
     */
    BasePanel.prototype.onDisable = function (event) {
        this.prevPanelName = null;
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onAwake, this);
        this.removeEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
        if (this.closeButton) {
            this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClickHandler, this);
        }
        if (this.tweenGroup) {
            egret.Tween.removeTweens(this.tweenGroup);
        }
        if (this.grayMask && this.grayMask.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.grayMask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClickHandler, this);
        }
        this.removeEventListener(egret.Event.RENDER, this.onRender, this);
    };
    /**
     * 渲染，在本帧末即将开始渲染的前一刻触发调用。
     * 可以对可视列表里面的任意元素进行操作 可在此方法内做刷新UI的操作
     */
    BasePanel.prototype.onRender = function (event) {
        this.removeEventListener(egret.Event.RENDER, this.onRender, this);
    };
    BasePanel.prototype.onTween = function () {
        if (this.tweenGroup) {
            if (this.grayMask && this.grayMask.parent) {
                this.grayMask.alpha = this._maskAlpha;
            }
            egret.Tween.removeTweens(this.tweenGroup);
            this.tweenGroup.scaleX = 0.5;
            this.tweenGroup.scaleY = 0.5;
            this.tweenGroup.alpha = 1;
            this.tweenObj = new egret.Tween(this.tweenGroup, null, null);
            this.tweenObj.to({ scaleX: 1.03, scaleY: 1.03 }, 200).to({ scaleX: 1, scaleY: 1 }, 120, egret.Ease.backIn).wait(120).call(this.onTweenOver, this);
            this.tweenObj.play();
        }
    };
    BasePanel.prototype.onTweenOver = function () {
        this.isFirstTween = false;
        this.tweenObj = null;
        this.isTweenOver = true;
    };
    BasePanel.prototype.onCloseBtnClickHandler = function (event) {
        if (event) {
            if (event.target instanceof eui.Button) {
                SoundManager.playEffect(MusicAction.close);
            }
        }
        if (this.isTween && this.tweenGroup) {
            if (!this.isTweenCloseing) {
                this.onTweenOver(); //打开面板动画，还未播放完毕，就触发了关闭 则清除打开状态
                this.isTweenCloseing = true;
                egret.Tween.removeTweens(this.tweenGroup);
                this.tweenObj = new egret.Tween(this.tweenGroup, { onChange: this.onCloseTweenChange.bind(this) }, null);
                this.tweenObj.to({ scaleX: 0.5, scaleY: 0.5, alpha: 0.1 }, 200, egret.Ease.quadInOut).call(this.tweenClose, this);
                this.tweenObj.play();
            }
        }
        else {
            this.tweenClose();
        }
    };
    BasePanel.prototype.onCloseTweenChange = function () {
        if (this.grayMask && this.grayMask.parent && this.tweenGroup.alpha < this._maskAlpha) {
            this.grayMask.alpha = this.tweenGroup.alpha;
        }
    };
    BasePanel.prototype.tweenClose = function () {
        if (this.tweenGroup) {
            egret.Tween.removeTweens(this.tweenGroup);
            this.isTweenCloseing = false;
        }
        UIManager.closePanel(this);
    };
    /**
     * 设置对齐方式 如果不设置则默认居中显示
     */
    BasePanel.prototype.setAlignInfo = function (type, h, v) {
        if (type === void 0) { type = PanelAlignType.Center_Center; }
        if (h === void 0) { h = 0; }
        if (v === void 0) { v = 0; }
        this.panelAlignType = type;
        this.offsetH = h;
        this.offsetV = v;
    };
    BasePanel.prototype.setTouchEnable = function (enable) {
        this.touchEnabled = enable;
    };
    BasePanel.prototype.setTouchChildren = function (enable) {
        this.touchChildren = enable;
    };
    /**
     * 设置灰色底层遮罩 默认显示 需要在onawake时调用
     */
    BasePanel.prototype.setGrayMask = function (enable) {
        if (enable === void 0) { enable = true; }
        if (this.grayMask) {
            if (enable) {
                this.addChildAt(this.grayMask, 0);
            }
            else {
                if (this.grayMask.parent) {
                    this.grayMask.parent.removeChild(this.grayMask);
                }
            }
        }
        else {
            if (enable) {
                this.createGrayMask();
                this.addChildAt(this.grayMask, 0);
            }
        }
    };
    BasePanel.prototype.createGrayMask = function () {
        if (!this.grayMask) {
            this.grayMask = new eui.Image();
            this.grayMask.source = SheetSubName.GrayBg;
            this.grayMask.scale9Grid = new egret.Rectangle(1, 1, 10, 10);
            this.grayMask.top = 0;
            this.grayMask.bottom = 0;
            this.grayMask.left = 0;
            this.grayMask.right = 0;
        }
    };
    BasePanel.prototype.showPrePanelName = function () {
        if (this.prevPanelName && this.prevPanelName != UIModuleName.None) {
            UIManager.showPanel(this.prevPanelName);
        }
    };
    BasePanel.prototype.destroy = function () {
        this.onDisable(null);
        this.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onEnable, this);
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onAwake, this);
    };
    return BasePanel;
}(eui.Component));
__reflect(BasePanel.prototype, "BasePanel");
//# sourceMappingURL=BasePanel.js.map