/**
 * 跑马灯handler
*/
class MarqueeHandler
{
    /**
	 * 根据消息类型获得消息内容
	*/
    public getMsgByType(msgData: msg.GW2C_PushMessage): string
    {
        if (msgData.subtype == MarqueeMsgType.SystemMsg)
        {
            return msgData.txt;
        } else if (msgData.subtype == MarqueeMsgType.MTTMsg)
        {
            return this.getMTTMarqueeMsg(JSON.parse(msgData.txt), msgData.name);
        } else if (msgData.subtype == MarqueeMsgType.HundredWarMsg)
        {
            return this.getHundredMarqueeMsg(JSON.parse(msgData.txt));
        } else if (msgData.subtype == MarqueeMsgType.HornMag)
        {
            return msgData.name + "：" + msgData.txt;
        }
        else if (msgData.subtype == MarqueeMsgType.CardWin)
        {
            return this.getCardWinMarqueeMsg(JSON.parse(msgData.txt));
        }
        return null;
    }
    /**
     * 获得锦标赛跑马灯信息
    */
    private getMTTMarqueeMsg(marquee: Object, name: string): string
    {
        let marqueeDef: table.IMarqueeDefine = MarqueeDefined.GetInstance().getInfoByType(MarqueeMsgType.MTTMsg);
        let msg: string;
        if (marqueeDef)
        {
            let mttName: string;
            let awardName: string;
            msg = marqueeDef.Message;  //恭喜【{0}】在{1}中获得冠军，获得奖励{2}
            let mttDef: table.IChampionshipDefine = table.ChampionshipById[marquee["1"]];
            if (mttDef)
            {
                mttName = mttDef.Name;
            }
            awardName = AwardDefined.GetInstance().getAwardNameById(marquee["2"], true);
            if (awardName)
            {
                msg = game.StringUtil.format(msg, marquee["0"], mttName, awardName);
            }
        }
        return msg;
    }
    /**
     * 获得百人大战跑马灯信息
    */
    private getHundredMarqueeMsg(marquee: Object)
    {
        let marqueeDef: table.IMarqueeDefine = MarqueeDefined.GetInstance().getInfoByType(MarqueeMsgType.HundredWarMsg);
        let msg: string;
        msg = marqueeDef.Message;  //"百人大战{0}爆出奖池{1}，快来一起参与吧！"
        let hundredWarDef: table.IHundredWarDefine = table.HundredWarById[marquee["0"]];
        let hundredWarName: string;
        if (hundredWarDef)
        {
            hundredWarName = hundredWarDef.Name;
        }
        msg = game.StringUtil.format(msg, hundredWarName, marquee["1"] + "金币");
        return msg;
    }
    /**
     * 获取牌型赢取多少的跑马灯
     */
    private getCardWinMarqueeMsg(marquee: Object)
    {
        let marqueeDef: table.IMarqueeDefine = MarqueeDefined.GetInstance().getInfoByType(MarqueeMsgType.CardWin);
        let msg: string;
        msg = marqueeDef.Message;  //"恭喜【{0}】在{1}中获得{2}手牌，成功赢得{3}"

        let userName = marquee["0"];
        let roomName = PlayingFieldManager.getPatternName(marquee["1"]);
        let cardTypeName = CardTypeMatchUtil.getCardDes(marquee["2"]);
        let winGold = marquee["3"];
        msg = game.StringUtil.format(msg, userName, roomName, cardTypeName, winGold + "金币");
        return msg;
    }
    /**
	 * 获得跑马灯类型
	*/
    public getMarqueeType(marqueeMsg: string): MarqueeMsgType
    {
        let marquee: Object;
        try
        {
            marquee = JSON.parse(marqueeMsg);
        } catch (e)
        {
            game.Console.log(e);
        }
        if (marquee)
        {
            return marquee["type"];
        }
        return null;
    }
    /**
	 * 判断是否显示跑马灯内容
	*/
    public isShowMarqueeMsg(marquee: msg.GW2C_PushMessage): boolean
    {
        if (marquee)
        {
            let show: number;
            if (marquee.subtype == MarqueeMsgType.SystemMsg)
            {
                show = marquee.showtype;
            } else
            {
                let marqueeDef: table.IMarqueeDefine = MarqueeDefined.GetInstance().getInfoByType(marquee.subtype);
                if (marqueeDef)
                {
                    show = marqueeDef.Show;
                }
            }
            if (show == MarqueeMsgShowTime.All)
            {
                return true;
            } else if (show == MarqueeMsgShowTime.OnHundredWar)
            {
                if (SceneManager.sceneType == SceneType.HundredWar)
                {
                    return true;
                } else
                {
                    return false;
                }
            } else if (show == MarqueeMsgShowTime.OnGambling)
            {
                if (SceneManager.sceneType == SceneType.Game && !GamblingUtil.isMatch)
                {
                    return true;
                } else
                {
                    return false;
                }
            } else if (show == MarqueeMsgShowTime.OnMTT)
            {
                if (SceneManager.sceneType == SceneType.Game && GamblingUtil.isMatch)
                {
                    return true;
                } else
                {
                    return false;
                }
            } else if (show == MarqueeMsgShowTime.OnRoom)
            {
                if (SceneManager.sceneType == SceneType.Game || SceneManager.sceneType == SceneType.HundredWar)
                {
                    return false;
                } else
                {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * 设置跑马灯发送消息的用户名字和聊天内容类型
    */
    public setMsgSendUserName(chatInfo: ChatInfo, msg: string, name: string)
    {
        let marqueeType: MarqueeMsgType = ChatManager.marqueeHandler.getMarqueeType(msg);
        if (marqueeType == MarqueeMsgType.HornMag)
        {
            chatInfo.subType = ChatSubType.Horn;
            if (name)
            {
                chatInfo.name = name;
            }
        }
        else if (marqueeType == MarqueeMsgType.SystemMsg)
        {
            chatInfo.name = "系统广播";
        }
    }
}