var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 滑动栏分页请求类
 */
var ReqScroller = (function () {
    function ReqScroller(scroller, list, reqNum, reqCallback) {
        /**
         * 索引值
         */
        this.index = 0;
        /**
         * 倒序拉其实startId
        */
        this.startId = 0;
        /**
         * 是否已把数据请求完毕到底
         */
        this._isReqFinish = false;
        this._scroller = scroller;
        this._list = list;
        this.reqNum = reqNum;
        this.reqCallback = reqCallback;
        this._bottom = new ReqScrollerbotton(list.width, UIComponentSkinName.ReqScrollerbotton);
        this._scroller.addChild(this._bottom);
        this._bottom.bottom = 0;
        this._bottom.visible = false;
        this._scroller.addEventListener(eui.UIEvent.CHANGE_END, this.checkForReq, this);
    }
    /**
     * 清除状态
     */
    ReqScroller.prototype.Clear = function () {
        this.index = 0;
        this.startId = 0;
        this._isReqFinish = false;
        if (this._dpList) {
            this._dpList.removeAll();
        }
        this._bottom.visible = false;
    };
    /**
     * 填充数据源
     */
    ReqScroller.prototype.init = function (list, isReqFinish) {
        this._isReqFinish = isReqFinish;
        if (list) {
            if (this.index != 0) {
                for (var i = 0; i < list.source.length; i++) {
                    this._dpList.addItem(list.source[i]);
                }
            }
            else if (this.index == 0) {
                this._dpList = new eui.ArrayCollection(list.source.concat());
            }
            this._list.dataProvider = this._dpList;
            this.index += this.reqNum;
            var startSource = list.source[list.source.length - 1];
            if (startSource && startSource.id) {
                this.startId = startSource.id;
            }
        }
        else {
            qin.Console.logError("数据源为空！");
        }
    };
    /**
     * 检查是否拉取数据
     */
    ReqScroller.prototype.checkForReq = function () {
        if (this.checkIsBottom()) {
            if (!this._isReqFinish) {
                this.reqCallback();
            }
            this._bottom.init(this._isReqFinish);
            this._bottom.setAnime();
        }
    };
    /**
     * 根据判断是否拉到底
     */
    ReqScroller.prototype.checkIsBottom = function () {
        if (this._dpList) {
            var lastItem = this._dpList.source[this._dpList.source.length - 1];
            for (var i = 0; i < this._list.numChildren; i++) {
                var itemRender = this._list.getChildAt(i);
                if (itemRender.bindData === lastItem) {
                    return true;
                }
            }
        }
        return false;
    };
    return ReqScroller;
}());
__reflect(ReqScroller.prototype, "ReqScroller");
//# sourceMappingURL=ReqScroller.js.map