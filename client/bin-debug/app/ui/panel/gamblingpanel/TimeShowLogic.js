var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 时间控制显示
 */
var TimeShowLogic = (function () {
    function TimeShowLogic(label) {
        this.timeLabel = label;
        this.timeLabel.text = qin.StringConstants.Empty;
    }
    Object.defineProperty(TimeShowLogic.prototype, "waitTime", {
        get: function () {
            return this._waitTime;
        },
        set: function (value) {
            this._waitTime = value;
            if (value == undefined) {
                this._waitTimeGroup.visible = false;
            }
            else {
                this.refreshTime();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeShowLogic.prototype, "nowTotal", {
        get: function () {
            return this._nowTotal;
        },
        set: function (value) {
            this._nowTotal = value;
            this.refreshTime();
        },
        enumerable: true,
        configurable: true
    });
    TimeShowLogic.prototype.setWaitTimeGroup = function (group) {
        this._waitTimeGroup = group;
        // this._imgList = list;
    };
    TimeShowLogic.prototype.onEnable = function () {
        qin.Tick.AddSecondsInvoke(this.refreshTime, this);
    };
    TimeShowLogic.prototype.onDisable = function () {
        qin.Tick.RemoveSecondsInvoke(this.refreshTime, this);
    };
    TimeShowLogic.prototype.refreshTime = function () {
        if (this.nowTotal != undefined) {
            this._offsetTime = Math.round(this.nowTotal - TimeManager.GetServerUtcTimestamp());
            if (this._offsetTime >= 0) {
                this.timeLabel.text = qin.DateTimeUtil.formatCountdown(this._offsetTime);
                // SceneManager.gameScene.gameProcesser.tryPutCardOut(this._offsetTime);
            }
        }
        else {
            this.timeLabel.text = qin.StringConstants.Empty;
        }
        /**
         * 等待时间倒计时
         */
        if (this.waitTime != undefined && this.waitTime != NaN) {
            this._offsetTime = Math.round(this.waitTime - TimeManager.GetServerUtcTimestamp());
            if (this._offsetTime >= 0) {
                this._waitTimeGroup.visible = true;
                // let min: number = Math.floor(this._offsetTime / 60);
                // let seconds: number = Math.floor(this._offsetTime - min * 60);
                // let minStr: string = qin.StringUtil.timeStringFormat(min);
                // let index: number = 0;
                // let img: eui.Image;
                // for (let i: number = 0; i < minStr.length; i++)
                // {
                // 	img = this._imgList[index];
                // 	img.source = UIUtil.getNumImg(parseInt(minStr.substr(i, 1)), NumResType.Yellow);
                // 	index++;
                // }
                // let secondsStr: string = qin.StringUtil.timeStringFormat(seconds);
                // img = this._imgList[index]; //冒号
                // img.source = ImageSource.Yellow_MaoHao;
                // for (let i: number = 0; i < secondsStr.length; i++)
                // {
                // 	index++;
                // 	img = this._imgList[index];
                // 	img.source = UIUtil.getNumImg(parseInt(secondsStr.substr(i, 1)), NumResType.Yellow);
                // }
            }
            else {
                this._waitTimeGroup.visible = false;
            }
        }
        else {
            this._waitTimeGroup.visible = false;
        }
    };
    return TimeShowLogic;
}());
__reflect(TimeShowLogic.prototype, "TimeShowLogic");
//# sourceMappingURL=TimeShowLogic.js.map