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
 * 用户头像组件
 */
var HeadComponent = (function (_super) {
    __extends(HeadComponent, _super);
    function HeadComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DefaultSize = 150;
        return _this;
    }
    HeadComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.userImg = new egret.Bitmap();
        this.addChildAt(this.userImg, 0);
    };
    HeadComponent.prototype.init = function (data, size) {
        _super.prototype.init.call(this, data);
        this.touchChildren = false;
        if (this.headPath != this.bindData.head || this.headPath == undefined) {
            this.headPath = this.bindData.head;
            this.loadHead(this.bindData.head);
        }
        if (size != this._size || this._size == undefined) {
            this._size = size == undefined ? this.DefaultSize : size;
            this.userImg.width = this._size;
            this.userImg.height = this._size;
            this.width = this.height = this._size;
        }
    };
    HeadComponent.prototype.loadHead = function (head) {
        var _this = this;
        if (!head) {
            qin.Console.log("头像为空");
            this.userImg.texture = null;
            this.drawHead(true);
            return;
        }
        //本地开发加载默认头像，不从网络上载
        if (qin.System.isLocalhost) {
            head = SheetSubName.getdefaultHead(this.bindData.sex);
        }
        //默认头像
        if (UploadHeadManager.isDefaultHead(head)) {
            this.userImg.texture = RES.getRes(head);
            this.drawHead(true);
        }
        else {
            var result_1 = ProjectDefined.GetInstance().getStorageHost() + head;
            var cache = ResCacheManager.getRes(ResCacheType.Head, result_1);
            if (cache) {
                this.userImg.texture = cache;
                this.drawHead(false);
                return;
            }
            RES.getResByUrl(result_1, function (data, url) {
                var img = data;
                if (img instanceof egret.Texture) {
                    _this.userImg.texture = img;
                    _this.drawHead(false);
                    ResCacheManager.addRes(ResCacheType.Head, result_1, img);
                }
                else {
                    var headTex = new egret.Texture();
                    try {
                        var bd = egret.BitmapData.create('base64', data);
                        if (bd) {
                            headTex.bitmapData = bd;
                            _this.userImg.texture = headTex;
                            _this.drawHead(false);
                            //HeadCache._headCacheList.add(result, headTex);
                            ResCacheManager.addRes(ResCacheType.Head, result_1, img);
                        }
                        else {
                            _this.userImg.texture = RES.getRes(SheetSubName.getdefaultHead(_this.bindData.sex)); //转换失败则用默认的头像
                            _this.drawHead(true);
                            qin.Console.logError("头像数据转换失败！头像路径：" + head);
                        }
                    }
                    catch (e) {
                        _this.userImg.texture = RES.getRes(SheetSubName.getdefaultHead(_this.bindData.sex)); //转换失败则用默认的头像
                        _this.drawHead(true);
                        qin.Console.logError("头像数据转换失败！头像路径：" + head);
                    }
                }
            }, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    Object.defineProperty(HeadComponent.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置头像显示
     */
    HeadComponent.prototype.setHeadVisible = function (flag) {
        if (this.userImg) {
            this.userImg.visible = flag;
        }
    };
    HeadComponent.prototype.clear = function () {
        this.headPath = undefined;
        this.userImg.texture = null;
    };
    HeadComponent.prototype.drawHead = function (idDefault) {
    };
    return HeadComponent;
}(BaseComponent));
__reflect(HeadComponent.prototype, "HeadComponent");
//# sourceMappingURL=HeadComponent.js.map