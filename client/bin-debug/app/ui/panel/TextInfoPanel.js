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
 * 文本信息面板
 */
var TextInfoPanel = (function (_super) {
    __extends(TextInfoPanel, _super);
    function TextInfoPanel(isNewSkin) {
        var _this = _super.call(this) || this;
        _this._txtCount = 24;
        _this._contentList = new Array();
        if (!isNewSkin) {
            _this.setSkinName(UIModuleName.TextInfoPanel);
        }
        return _this;
    }
    TextInfoPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
        this.txtGroupScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
    };
    TextInfoPanel.prototype.init = function (appendData) {
        if (this._lastShowContainer) {
            if (appendData == this.panelData) {
                this._lastShowContainer.visible = true;
            }
            else {
                this._lastShowContainer.visible = false;
            }
        }
        else {
            this.txtList.visible = false;
            this.txtGroup.visible = false;
        }
        _super.prototype.init.call(this, appendData);
        if (this.panelData instanceof TextDefinition) {
            this._def = this.panelData;
        }
        else if (typeof this.panelData == "number") {
            this._def = TextDefined.GetInstance().getDefinition(this.panelData);
        }
        this.contentContainerOper();
    };
    TextInfoPanel.prototype.contentContainerOper = function () {
        if (this._def) {
            if (this._def.isRichTxt) {
                this.txtGroupScroller.viewport = this.txtGroup;
            }
            else {
                this.txtGroupScroller.viewport = this.txtList;
            }
        }
    };
    TextInfoPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        UIUtil.hideScrollerBar(this.txtGroupScroller, true, false);
        if (this._def) {
            if (this._def.url) {
                this.titleImg.source = this._def.url;
            }
            else {
                if (this.titleLabel) {
                    this.titleLabel.text = this._def.title;
                }
            }
            if (!this._def.isRichTxt) {
                this.txtList.visible = true;
                this._lastShowContainer = this.txtList;
                this.contentOper();
                UIUtil.listRenderer(this.txtList, this.txtGroupScroller, TextRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, this._contentList, true);
            }
            else {
                this.txtLabel.textFlow = qin.TextUtil.parse(this._def.text);
                this.txtGroup.visible = true;
                this._lastShowContainer = this.txtGroup;
            }
        }
        this.txtGroupScroller.stopAnimation();
        this.txtGroupScroller.viewport.scrollV = 0;
    };
    TextInfoPanel.prototype.contentOper = function () {
        qin.ArrayUtil.Clear(this._contentList);
        var str = this._def.text;
        var splitStr = "\n";
        // if (this._def.isRichTxt)
        // {
        // 	splitStr = "<br/>"
        // }
        if (str.indexOf(splitStr) == -1) {
            this._contentList.push(str);
        }
        else {
            var index = 0;
            var tmpStr = qin.StringConstants.Empty;
            var line = 0;
            var oneStr = void 0;
            var reaLine = void 0;
            while (str.length > 0) {
                index = str.indexOf(splitStr);
                if (index != -1) {
                    // if (this._def.isRichTxt)
                    // {
                    // 	oneStr = str.slice(0, index + 5);
                    // 	str = str.slice(index + 5, str.length);
                    // }
                    // else
                    // {
                    oneStr = str.slice(0, index + 1);
                    str = str.slice(index + 1, str.length);
                    // }
                    if (oneStr.length > this._txtCount) {
                        while (oneStr.length > 0) {
                            tmpStr = oneStr.slice(0, this._txtCount) + splitStr;
                            this._contentList.push(tmpStr);
                            oneStr = oneStr.substring(this._txtCount, oneStr.length);
                        }
                    }
                    else {
                        this._contentList.push(oneStr);
                    }
                }
                else {
                    this._contentList.push(str);
                    break;
                }
            }
        }
    };
    TextInfoPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    TextInfoPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    return TextInfoPanel;
}(BasePanel));
__reflect(TextInfoPanel.prototype, "TextInfoPanel");
//# sourceMappingURL=TextInfoPanel.js.map