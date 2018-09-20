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
var qin;
(function (qin) {
    /**
     * 显示到 egret 中的 DOM 元件
     */
    var WebNode = (function (_super) {
        __extends(WebNode, _super);
        function WebNode() {
            var _this = _super.call(this) || this;
            _this._lastWidth = 0;
            _this._lastHeight = 0;
            _this._lastX = 0;
            _this._lastY = 0;
            _this.$renderNode = new egret.sys.RenderNode();
            _this._divNode = document.createElement("div");
            WebNode.initElementStyle(_this._divNode);
            return _this;
        }
        WebNode.initElementStyle = function (element) {
            element.style.position = "relative";
            element.style.border = "0";
            element.style.left = "0";
            element.style.top = "0";
        };
        WebNode.removeFromParent = function (element) {
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
                return true;
            }
            return false;
        };
        Object.defineProperty(WebNode.prototype, "backgroundColor", {
            get: function () {
                return this._divNode ? this._divNode.style.backgroundColor : '';
            },
            set: function (value) {
                if (value === '' || value === undefined) {
                    value = null;
                }
                this._divNode.style.backgroundColor = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 绑定一个 DOM 元件
         * @element DOM 元件，不要修改此元件的 style 的位置、旋转、缩放、边框等属性
         */
        WebNode.prototype.bindDom = function (element) {
            this.unbindDom();
            this._element = element;
            this._element.style.width = "100%";
            this._element.style.height = "100%";
            WebNode.initElementStyle(this._element);
            this._divNode.appendChild(element);
        };
        /**
         * 解绑 DOM 元件
         */
        WebNode.prototype.unbindDom = function () {
            WebNode.removeFromParent(this._element);
            this._element = null;
        };
        WebNode.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            //显示dom
            if (!this._playerNode) {
                this._playerNode = stage.$screen['container'];
                this._canvasNode = stage.$screen['canvas'];
            }
            this._playerNode.appendChild(this._divNode);
        };
        WebNode.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            //隐藏dom
            WebNode.removeFromParent(this._divNode);
        };
        WebNode.prototype.$update = function (dirtyRegionPolicy, bounds) {
            // let result = super.$update(dirtyRegionPolicy, bounds);
            // let visible = this.updateVisible();
            // if (result && visible && this.stage)
            // {
            //     this.updateScale();
            // }
            // return result;
            return true;
        };
        WebNode.prototype.updateVisible = function () {
            // if (this.$renderNode.renderVisible = false || this.$renderNode.renderAlpha == 0)
            // {
            //     if (WebNode.removeFromParent(this._element))
            //     {
            //         return false;
            //     }
            // }
            // else
            // {
            //     if (this._element && this._element.parentNode == null)
            //     {
            //         this._divNode.appendChild(this._element);
            //     }
            // }
            return true;
        };
        WebNode.prototype.updateScale = function () {
            var playerRect = this._playerNode.getBoundingClientRect();
            var canvasRect = this._canvasNode.getBoundingClientRect();
            var shouldRotate = false;
            var orientation = this.stage.orientation;
            if (orientation != egret.OrientationMode.AUTO) {
                shouldRotate = orientation != egret.OrientationMode.PORTRAIT && playerRect.height > playerRect.width
                    || orientation == egret.OrientationMode.PORTRAIT && playerRect.width > playerRect.height;
            }
            var domScaleX;
            var domScaleY;
            if (shouldRotate) {
                domScaleX = canvasRect.width / this.stage.stageHeight;
                domScaleY = canvasRect.height / this.stage.stageWidth;
            }
            else {
                domScaleX = canvasRect.width / this.stage.stageWidth;
                domScaleY = canvasRect.height / this.stage.stageHeight;
            }
            // this._divNode.style.transformOrigin = "0% 0% 0px";
            // this._divNode.style.transform = this._canvasNode.style.transform + " scale(" + domScaleX + "," + domScaleY + ")";
            var width = canvasRect.width;
            if (this._lastWidth != width) {
                this._divNode.style.width = this.$getWidth() * domScaleX + "px";
                this._lastWidth = width;
            }
            var height = canvasRect.height;
            if (this._lastHeight != height) {
                this._divNode.style.height = this.$getHeight() * domScaleX + "px";
                this._lastHeight = height;
            }
            var x = this.$getX();
            if (this._lastX != x) {
                this._divNode.style.left = x + "px";
                this._lastX = x;
            }
            var y = this.$getY();
            if (this._lastY != y) {
                this._divNode.style.top = y + "px";
                this._lastY = y;
            }
        };
        return WebNode;
    }(egret.DisplayObject));
    qin.WebNode = WebNode;
    __reflect(WebNode.prototype, "qin.WebNode");
})(qin || (qin = {}));
//# sourceMappingURL=WebNode.js.map