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
 * 邀请活动领取金豆渲染项
 */
var InviteImazamoxItemRenderer = (function (_super) {
    __extends(InviteImazamoxItemRenderer, _super);
    function InviteImazamoxItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.InviteImazamoxItemRenderer;
        return _this;
    }
    InviteImazamoxItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        if (this.bindData) {
            var date = new Date(this.bindData.time * 1000);
            this.timeLabel.text = (date.getMonth() + 1) + "-" + date.getDate();
            this.nameLabel.text = this.bindData.name;
            this.setDes();
            this.idLabel.text = this.bindData.roleId.toString();
        }
    };
    InviteImazamoxItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    /**
     *设置是否完成描述文字
    */
    InviteImazamoxItemRenderer.prototype.setDes = function () {
        var str;
        if (this.bindData.done) {
            str = "已完成";
            this.desLabel.textColor = ColorEnum.Invite_Finish_Blue;
        }
        else {
            str = "未完成";
            this.desLabel.textColor = ColorEnum.Invite_NotFinish_Red;
        }
        this.desLabel.text = str;
    };
    return InviteImazamoxItemRenderer;
}(BaseItemRenderer));
__reflect(InviteImazamoxItemRenderer.prototype, "InviteImazamoxItemRenderer");
//# sourceMappingURL=InviteImazamoxItemRenderer.js.map