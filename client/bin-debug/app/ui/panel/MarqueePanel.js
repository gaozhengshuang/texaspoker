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
 * 跑马灯界面
 */
var MarqueePanel = (function (_super) {
    __extends(MarqueePanel, _super);
    function MarqueePanel() {
        var _this = _super.call(this) || this;
        _this.isTween = false;
        _this.panelAlignType = PanelAlignType.Center_Top;
        _this.layer = UILayerType.Tips;
        _this.setTouchChildren(false);
        _this.setTouchEnable(false);
        _this.setSkinName(UIModuleName.MarqueePanel);
        return _this;
    }
    MarqueePanel.prototype.onAwake = function (event) {
        this.scroller.viewport = this.textGroup;
        _super.prototype.onAwake.call(this, event);
    };
    MarqueePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.setMarqueePos();
        egret.Tween.removeTweens(this.scroller.viewport);
        if (appendData) {
            this.textLabel.text = appendData;
        }
        if (!this.panelData) {
            UIManager.showFloatTips("跑马灯内容为空！");
            this.onTweenGroupComplete();
        }
    };
    MarqueePanel.prototype.onRender = function (event) {
        ChatManager.isOnMessage = true;
        this.move = new egret.Tween(this.scroller.viewport, null, null);
        var duration = this.textLabel.width * 20;
        var targetPos = this.textLabel.width;
        this.scroller.viewport.scrollH = -this.bgImg.width;
        if (duration < 10000) {
            duration = 10000;
        }
        this.move.to({ scrollH: targetPos }, duration).call(this.onTweenGroupComplete, this);
        this.move.play();
        // qin.QinLog.log("this.textLabel.textWidth", targetPos);
        _super.prototype.onRender.call(this, event);
    };
    MarqueePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        UIUtil.hideScrollerBar(this.scroller, true, true);
        SceneManager.onSwitchCompleteEvent.addListener(this.setMarqueePos, this);
    };
    MarqueePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        ChatManager.isOnMessage = false;
        egret.Tween.removeTweens(this.scroller.viewport);
        SceneManager.onSwitchCompleteEvent.removeListener(this.setMarqueePos, this);
    };
    MarqueePanel.prototype.onTweenGroupComplete = function () {
        egret.Tween.removeTweens(this.textGroup);
        this.onCloseBtnClickHandler(null);
        ChatManager.nextMarqueeMessage();
    };
    /**
     * 根据场景设计跑马灯的位置
    */
    MarqueePanel.prototype.setMarqueePos = function () {
        if (SceneManager.sceneType == SceneType.Game || SceneManager.sceneType == SceneType.HundredWar) {
            this.top = 0;
            if (SceneManager.sceneType == SceneType.Game) {
                var targetPanel = void 0;
                targetPanel = UIManager.panelDict.getValue(UIModuleName.GamblingPanel);
                if (targetPanel) {
                    this.marqueeGroup.horizontalCenter = targetPanel.gameGroup.x;
                }
            }
            else if (SceneManager.sceneType == SceneType.HundredWar) {
                var targetPanel = void 0;
                targetPanel = UIManager.panelDict.getValue(UIModuleName.HundredWarRoomPanel);
                if (targetPanel) {
                    this.marqueeGroup.horizontalCenter = targetPanel.gameGroup.x;
                }
            }
        }
        else {
            this.top = 150;
            this.marqueeGroup.horizontalCenter = 0;
        }
    };
    /**
     * 移动
    */
    MarqueePanel.prototype.onMoveing = function (x) {
        this.marqueeGroup.horizontalCenter = x;
    };
    /**
     * 移动结束
    */
    MarqueePanel.prototype.onMoveEnd = function (data) {
        if (data.showAnimate) {
            this.run(data.num);
        }
        else {
            this.marqueeGroup.horizontalCenter = data.num;
        }
    };
    MarqueePanel.prototype.run = function (num) {
        var tween = egret.Tween.get(this.marqueeGroup);
        tween.to({ horizontalCenter: num }, 200, egret.Ease.sineIn).call(this.runOver, this);
        tween.play();
    };
    MarqueePanel.prototype.runOver = function () {
        egret.Tween.removeTweens(this.marqueeGroup);
    };
    return MarqueePanel;
}(BasePanel));
__reflect(MarqueePanel.prototype, "MarqueePanel");
//# sourceMappingURL=MarqueePanel.js.map