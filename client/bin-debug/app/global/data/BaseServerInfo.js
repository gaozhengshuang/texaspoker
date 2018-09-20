var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 与服务器通信的数据体 注：类里面定义的属性字段需要和 协议工具平台一致;继承此类的对象，不要写协议对象里面没有属性的寄存器，因为寄存器会被拷贝覆盖掉
 */
var BaseServerValueInfo = (function () {
    function BaseServerValueInfo(data) {
        this.reset();
        if (data) {
            this.copyValueFrom(data);
        }
    }
    BaseServerValueInfo.prototype.reset = function () {
        for (var key in this) {
            if (this[key] instanceof Function == false) {
                this[key] = undefined;
            }
        }
    };
    /**
     * 注：此拷贝方法，很简单，仅为一维拷贝，会将原对象的强类型对象属性，变为动态对象类型属性，如：对象里面有指定对象的属性 拷贝之后对象属性的类型为Object
     * 如果要拷贝二级对象，则重写此方法
     */
    BaseServerValueInfo.prototype.copyValueFrom = function (data) {
        if (data) {
            for (var key in data) {
                var property = this[key];
                if (!(property instanceof Function)) {
                    if (data[key] == undefined) {
                        if (typeof this[key] == "number") {
                            this[key] = 0;
                        }
                        else if (typeof this[key] == "string") {
                            this[key] = qin.StringConstants.Empty;
                        }
                    }
                    else {
                        this[key] = data[key];
                    }
                }
            }
        }
    };
    /**
     * 根据所需要的属性拷贝
     */
    BaseServerValueInfo.prototype.copyValueFromThis = function (data) {
        if (data) {
            for (var key in this) {
                var property = data[key];
                if (!(property instanceof Function)) {
                    this[key] = data[key];
                }
            }
        }
    };
    return BaseServerValueInfo;
}());
__reflect(BaseServerValueInfo.prototype, "BaseServerValueInfo");
//# sourceMappingURL=BaseServerInfo.js.map