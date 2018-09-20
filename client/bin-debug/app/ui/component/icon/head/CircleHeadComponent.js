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
 * 圆形用户头像组件
 */
var CircleHeadComponent = (function (_super) {
    __extends(CircleHeadComponent, _super);
    function CircleHeadComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CircleHeadComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.group = new egret.DisplayObjectContainer();
        this.headMask = new egret.Bitmap();
        this.headMask.texture = RES.getRes(ResFixedFileName.HeadEarser);
        this.group.addChild(this.userImg);
        this.group.addChild(this.headMask);
        this.headMask.blendMode = egret.BlendMode.ERASE;
        this.touchChildren = false;
        this.bmp = new egret.Bitmap();
        this.addChildAt(this.bmp, 0);
    };
    CircleHeadComponent.prototype.init = function (data, size) {
        _super.prototype.init.call(this, data, size);
        this.headMask.width = this.headMask.height = this._size;
        this.group.width = this.group.height = this._size;
    };
    CircleHeadComponent.prototype.drawHead = function (idDefault) {
        var _this = this;
        _super.prototype.drawHead.call(this, idDefault);
        egret.callLater(function () {
            if (qin.StringUtil.isNullOrEmpty(_this.headPath)) {
                return;
            }
            if (idDefault) {
                if (!_this.renderTexture) {
                    _this.renderTexture = new egret.RenderTexture();
                }
                _this.renderTexture.drawToTexture(_this.group);
                _this.bmp.texture = _this.renderTexture;
                _this.bmp.width = _this.bmp.height = _this.size;
            }
            else {
                var cache = ResCacheManager.getRes(ResCacheType.CircleHead, _this.headPath);
                // if (HeadCache._circleheadCacheList.containsKey(this.headPath))
                if (cache) {
                    // this.bmp.texture = HeadCache._circleheadCacheList.getValue(this.headPath);
                    _this.bmp.texture = cache;
                    _this.bmp.width = _this.bmp.height = _this.size;
                }
                else {
                    var renderTexture = new egret.RenderTexture();
                    renderTexture.drawToTexture(_this.group);
                    _this.bmp.texture = renderTexture;
                    ResCacheManager.addRes(ResCacheType.CircleHead, _this.headPath, renderTexture);
                    // HeadCache._circleheadCacheList.add(this.headPath, renderTexture);
                }
            }
        }, this);
    };
    CircleHeadComponent.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.bmp.texture = null;
    };
    return CircleHeadComponent;
}(HeadComponent));
__reflect(CircleHeadComponent.prototype, "CircleHeadComponent");
//# sourceMappingURL=CircleHeadComponent.js.map