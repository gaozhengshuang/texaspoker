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
     * 时钟
     */
    var Tick = (function () {
        function Tick() {
        }
        Tick.initialize = function (stage) {
            Tick._secondsTime = egret.getTimer();
            stage.addEventListener(egret.Event.ENTER_FRAME, Tick.OnEnterFrame, this);
        };
        Tick.OnEnterFrame = function (event) {
            if (Tick._frameList.length > 0) {
                for (var _i = 0, _a = Tick._frameList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.invoke();
                }
            }
            var delta = egret.getTimer() - Tick._secondsTime;
            if (delta >= 1000) {
                Tick._secondsTime = egret.getTimer();
                if (Tick._secondsList.length > 0) {
                    for (var _b = 0, _c = Tick._secondsList; _b < _c.length; _b++) {
                        var item = _c[_b];
                        item.invoke();
                    }
                }
            }
            if (Tick._timeoutList.length > 0) {
                var count = Tick._timeoutList.length;
                for (var i = count - 1; i >= 0; i--) {
                    var info = Tick._timeoutList[i];
                    if (egret.getTimer() >= info.time) {
                        Tick._timeoutList.splice(i, 1);
                        info.invoke(info.params);
                        if (Tick._timeoutList.length < count) {
                            i -= (count - Tick._timeoutList.length);
                        }
                    }
                }
            }
        };
        /**
         * 添加帧调用
         */
        Tick.addFrameInvoke = function (method, thisObject) {
            if (method == null || Tick.isExists(Tick._frameList, method, thisObject)) {
                return;
            }
            Tick._frameList.push(new qin.Delegate(method, thisObject));
        };
        /**
         * 移除帧调用
         */
        Tick.removeFrameInvoke = function (method, thisObject) {
            Tick.removeMethod(Tick._frameList, method, thisObject);
        };
        /**
         * 添加秒调用
         */
        Tick.AddSecondsInvoke = function (method, thisObject) {
            if (method == null || Tick.isExists(Tick._secondsList, method, thisObject)) {
                return;
            }
            Tick._secondsList.push(new qin.Delegate(method, thisObject));
        };
        /**
         * 移除秒调用
         */
        Tick.RemoveSecondsInvoke = function (method, thisObject) {
            Tick.removeMethod(Tick._secondsList, method, thisObject);
        };
        /**
         * 添加超时触发 单位：毫秒
         */
        Tick.AddTimeoutInvoke = function (method, delay, thisObject, params) {
            if (delay <= 0 || method == null || Tick.isExists(Tick._timeoutList, method, thisObject)) {
                return 0;
            }
            var info = new TickInfo(method, thisObject, params);
            info.id = Tick._hashCode++;
            info.time = egret.getTimer() + delay;
            Tick._timeoutList.push(info);
            return info.id;
        };
        /**
         * 移除超时触发
         */
        Tick.RemoveTimeoutInvoke = function (method, thisObject) {
            Tick.removeMethod(Tick._timeoutList, method, thisObject);
        };
        /**
         * 移除指定id的超时触发
         */
        Tick.RemoveTimeoutInvokeById = function (id) {
            for (var i = 0; i < Tick._timeoutList.length; i++) {
                if (Tick._timeoutList[i].id == id) {
                    Tick._timeoutList.splice(i, 1);
                    break;
                }
            }
        };
        Tick.isExists = function (list, method, thisObject) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var item = list_1[_i];
                if (item.equals2(method, thisObject)) {
                    return true;
                }
            }
            return false;
        };
        Tick.removeMethod = function (list, method, thisObject) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].equals2(method, thisObject)) {
                    list.splice(i, 1);
                    break;
                }
            }
        };
        Tick._frameList = new Array(); //每帧更新
        Tick._secondsList = new Array(); //1秒更新
        Tick._timeoutList = new Array();
        Tick._hashCode = 0;
        return Tick;
    }());
    qin.Tick = Tick;
    __reflect(Tick.prototype, "qin.Tick");
    /**
     * 时间信息
     */
    var TickInfo = (function (_super) {
        __extends(TickInfo, _super);
        function TickInfo(method, time, params) {
            var _this = _super.call(this, method, time) || this;
            _this.params = params;
            return _this;
        }
        return TickInfo;
    }(qin.Delegate));
    __reflect(TickInfo.prototype, "TickInfo");
})(qin || (qin = {}));
//# sourceMappingURL=Tick.js.map