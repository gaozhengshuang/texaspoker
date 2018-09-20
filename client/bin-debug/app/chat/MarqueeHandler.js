var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 跑马灯handler
*/
var MarqueeHandler = (function () {
    function MarqueeHandler() {
    }
    /**
     * 根据消息类型获得消息内容
    */
    MarqueeHandler.prototype.getMsgByType = function (marqueeMsg, name) {
        var marquee;
        try {
            marquee = JSON.parse(marqueeMsg);
        }
        catch (e) {
            qin.Console.log(e);
        }
        if (marquee) {
            if (marquee["type"] == MarqueeMsgType.SystemMsg) {
                return marquee["msg"];
            }
            else if (marquee["type"] == MarqueeMsgType.MTTMsg) {
                return this.getMTTMarqueeMsg(marquee, name);
            }
            else if (marquee["type"] == MarqueeMsgType.HundredWarMsg) {
                return this.getHundredMarqueeMsg(marquee);
            }
            else if (marquee["type"] == MarqueeMsgType.HornMag) {
                return name + "：" + marquee["msg"];
            }
        }
        return null;
    };
    /**
     * 获得锦标赛跑马灯信息
    */
    MarqueeHandler.prototype.getMTTMarqueeMsg = function (marquee, name) {
        var marqueeDef = MarqueeDefined.GetInstance().getInfoByType(marquee["type"]);
        var msg;
        if (marqueeDef) {
            var mttName = void 0;
            var awardName = void 0;
            msg = marqueeDef.message; //恭喜【{0}】在{1}中获得冠军，获得奖励{2}
            var mttDef = ChampionshipDefined.GetInstance().getDefinition(marquee["id"]);
            if (mttDef) {
                mttName = mttDef.name;
            }
            awardName = AwardDefined.GetInstance().getAwardNameById(marquee["aid"], true);
            if (awardName) {
                msg = qin.StringUtil.format(msg, name, mttName, awardName);
            }
        }
        return msg;
    };
    /**
     * 获得百人大战跑马灯信息
    */
    MarqueeHandler.prototype.getHundredMarqueeMsg = function (marquee) {
        var marqueeDef = MarqueeDefined.GetInstance().getInfoByType(marquee["type"]);
        var msg;
        msg = marqueeDef.message; //"百人大战{0}爆出奖池{1}，快来一起参与吧！"
        var hundredWarDef = HundredWarDefined.GetInstance().getDefinition(marquee["id"]);
        var hundredWarName;
        if (hundredWarDef) {
            hundredWarName = hundredWarDef.name;
        }
        msg = qin.StringUtil.format(msg, hundredWarName, marquee["gold"] + "金币");
        return msg;
    };
    /**
     * 获得跑马灯类型
    */
    MarqueeHandler.prototype.getMarqueeType = function (marqueeMsg) {
        var marquee;
        try {
            marquee = JSON.parse(marqueeMsg);
        }
        catch (e) {
            qin.Console.log(e);
        }
        if (marquee) {
            return marquee["type"];
        }
        return null;
    };
    /**
     * 判断是否显示跑马灯内容
    */
    MarqueeHandler.prototype.isShowMarqueeMsg = function (marqueeMsg) {
        var marquee;
        try {
            marquee = JSON.parse(marqueeMsg);
        }
        catch (e) {
            qin.Console.log(e);
        }
        if (marquee) {
            var show = void 0;
            if (marquee["type"] == MarqueeMsgType.SystemMsg) {
                show = marquee["show"];
            }
            else {
                var marqueeDef = MarqueeDefined.GetInstance().getInfoByType(marquee["type"]);
                if (marqueeDef) {
                    show = marqueeDef.show;
                }
            }
            if (show == MarqueeMsgShowTime.All) {
                return true;
            }
            else if (show == MarqueeMsgShowTime.OnHundredWar) {
                if (SceneManager.sceneType == SceneType.HundredWar) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (show == MarqueeMsgShowTime.OnGambling) {
                if (SceneManager.sceneType == SceneType.Game && !GamblingUtil.isMatch) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (show == MarqueeMsgShowTime.OnMTT) {
                if (SceneManager.sceneType == SceneType.Game && GamblingUtil.isMatch) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (show == MarqueeMsgShowTime.OnRoom) {
                if (SceneManager.sceneType == SceneType.Game || SceneManager.sceneType == SceneType.HundredWar) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 设置跑马灯发送消息的用户名字和聊天内容类型
    */
    MarqueeHandler.prototype.setMsgSendUserName = function (chatInfo, msg, name) {
        var marqueeType = ChatManager.marqueeHandler.getMarqueeType(msg);
        if (marqueeType == MarqueeMsgType.HornMag) {
            chatInfo.subType = ChatSubType.Horn;
            if (name) {
                chatInfo.name = name;
            }
        }
        else if (marqueeType == MarqueeMsgType.SystemMsg) {
            chatInfo.name = "系统广播";
        }
    };
    return MarqueeHandler;
}());
__reflect(MarqueeHandler.prototype, "MarqueeHandler");
//# sourceMappingURL=MarqueeHandler.js.map