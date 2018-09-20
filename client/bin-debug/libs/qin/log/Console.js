var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * 日志
     */
    var Console = (function () {
        function Console() {
        }
        Console.formatArgs = function (args) {
            if (args) {
                var str = '';
                for (var i = 0; i < args.length; i++) {
                    str += ' | ' + args[i];
                }
                if (Console.roleId !== undefined && Console.roleId !== null) {
                    str = ' | self-roleId:' + Console.roleId + str;
                }
                return qin.DateTimeUtil.formatDate() + str;
            }
            else {
                if (Console.roleId !== undefined && Console.roleId !== null) {
                    return qin.DateTimeUtil.formatDate() + ' | self-roleId:' + Console.roleId + ' | ' + args;
                }
                else {
                    return qin.DateTimeUtil.formatDate() + ' | ' + args;
                }
            }
        };
        Console.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (Console.enabled) {
                var result = Console.formatArgs(args);
                console.log(result);
            }
        };
        Console.logError = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (Console.enabled) {
                var err = new Error();
                var result = Console.formatArgs(args);
                console.log(result + ' | ' + err.stack);
            }
        };
        Console.logSocket = function (msg) {
            if (Console.enabled) {
                Console.log('qin.SocketMessageType.' + msg.type + ': code[' + msg.errorCode + '] message[' + msg.message + ']');
            }
        };
        Console.enabled = false;
        return Console;
    }());
    qin.Console = Console;
    __reflect(Console.prototype, "qin.Console");
})(qin || (qin = {}));
//# sourceMappingURL=Console.js.map