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
     * 网页显示
     */
    var WebView = (function (_super) {
        __extends(WebView, _super);
        function WebView() {
            var _this = _super.call(this) || this;
            _this._iframe = document.createElement('iframe');
            _this.bindDom(_this._iframe);
            if (_this._iframe['attachEvent']) {
                _this._iframe['attachEvent']('onload', function () {
                    _this.hideLoading();
                });
            }
            else {
                _this._iframe.onload = function () {
                    _this.hideLoading();
                };
            }
            return _this;
        }
        WebView.getInstance = function () {
            if (WebView._instance == null) {
                WebView._instance = new WebView();
            }
            return WebView._instance;
        };
        Object.defineProperty(WebView.prototype, "src", {
            get: function () {
                return this._iframe.src;
            },
            set: function (value) {
                this._iframe.src = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebView.prototype, "scrolling", {
            get: function () {
                return this._iframe.scrolling;
            },
            set: function (value) {
                this._iframe.scrolling = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebView.prototype, "closeButton", {
            get: function () {
                return this._buttonImg != null && this._buttonImg.parentNode != null;
            },
            set: function (value) {
                if (value) {
                    if (this._buttonImg) {
                        this._divNode.appendChild(this._buttonImg);
                    }
                    else {
                        this._buttonImg = document.createElement('img');
                        this._buttonImg.style.position = 'absolute';
                        this._buttonImg.style.right = '4px';
                        this._buttonImg.style.top = '4px';
                        this._divNode.appendChild(this._buttonImg);
                        this._buttonImg.src = WebView.CloseImgData;
                        var thisObj_1 = this;
                        this._buttonImg.onclick = function () {
                            thisObj_1.parent.removeChild(thisObj_1);
                        };
                    }
                }
                else {
                    qin.WebNode.removeFromParent(this._buttonImg);
                }
            },
            enumerable: true,
            configurable: true
        });
        WebView.prototype.showLoading = function () {
            if (this._loadingDiv == null) {
                this._loadingDiv = document.createElement('div');
                this._loadingDiv.style.position = 'absolute';
                this._loadingDiv.style.color = '#333';
                this._loadingDiv.style.width = '100%';
                this._loadingDiv.style.textAlign = 'center';
                this._loadingDiv.style.top = '20px';
                this._loadingDiv.innerText = '正在加载...';
            }
            if (this._divNode && this._loadingDiv && this._loadingDiv.parentNode == null) {
                this._divNode.appendChild(this._loadingDiv);
            }
        };
        WebView.prototype.hideLoading = function () {
            qin.WebNode.removeFromParent(this._loadingDiv);
        };
        WebView.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            this.showLoading();
        };
        //------------------------------------------------------------------
        // 
        //------------------------------------------------------------------
        WebView.CloseImgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAAeCAYAAABzL3NnAAABaElEQVRYhe3YsY6CQBSF4X8nC9Og8UVMtEE0+vZGURMKeRIjkbEZttEtWINswb2b7JyGZoqTL4Qz+nE+nxv+eT4BptOpdg+1lGWJ0S7xFxIQCAhAQAACAhAQgMdEDp3tdov3nsVigbX27fm6rjkej0RRxGq1GryfyJvQNA3X65U8z7nf751nnXPkeU5VVXjvJerJIKRpSpIkVFXVCeGcY7/fc7vdGI1GpGkqUU8GwVpLlmWdEG2ALMuI41iintyHsQtCEwCE1+EVxOVyUQUAhYlsQ+x2O1UAULonWGuZzWYYY/DeY4xhPp+rAIASgnOOoii+Abz3FEXxdj6HijhC+yO4Xq97zeeQEUV4tQLPpyaEGELXDPa5RwwZEYQ+9wBNCBGEw+HQawbbEKfTSaKeDEIcx0wmk173gCfEeDwmiiKJejI/pZfL5a/OW2vZbDYDtfmZ8KcKAQEICEBAAAIC8FiHsiy1e6jmC5RF5dPrZYnoAAAAAElFTkSuQmCC';
        return WebView;
    }(qin.WebNode));
    qin.WebView = WebView;
    __reflect(WebView.prototype, "qin.WebView");
})(qin || (qin = {}));
//# sourceMappingURL=WebView.js.map