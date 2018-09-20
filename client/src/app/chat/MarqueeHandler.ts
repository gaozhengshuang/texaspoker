/**
 * 跑马灯handler
*/
class MarqueeHandler
{
    /**
	 * 根据消息类型获得消息内容
	*/
    public getMsgByType(marqueeMsg: string, name: string): string
    {
        let marquee: Object;
        try
        {
            marquee = JSON.parse(marqueeMsg);
        }
        catch (e)
        {
            qin.Console.log(e);
        }
        if (marquee)
        {
            if (marquee["type"] == MarqueeMsgType.SystemMsg)
            {
                return marquee["msg"];
            } else if (marquee["type"] == MarqueeMsgType.MTTMsg)
            {

                return this.getMTTMarqueeMsg(marquee, name);
            } else if (marquee["type"] == MarqueeMsgType.HundredWarMsg)
            {
                return this.getHundredMarqueeMsg(marquee);
            } else if (marquee["type"] == MarqueeMsgType.HornMag)
            {
                return name + "：" + marquee["msg"];
            }
        }
        return null;
    }
    /**
     * 获得锦标赛跑马灯信息
    */
    private getMTTMarqueeMsg(marquee: Object, name: string): string
    {
        let marqueeDef: MarqueeDefinition = MarqueeDefined.GetInstance().getInfoByType(marquee["type"]);
        let msg: string;
        if (marqueeDef)
        {
            let mttName: string;
            let awardName: string;
            msg = marqueeDef.message;  //恭喜【{0}】在{1}中获得冠军，获得奖励{2}
            let mttDef: ChampionshipDefinition = ChampionshipDefined.GetInstance().getDefinition(marquee["id"]);
            if (mttDef)
            {
                mttName = mttDef.name;
            }
            awardName = AwardDefined.GetInstance().getAwardNameById(marquee["aid"], true);
            if (awardName)
            {
                msg = qin.StringUtil.format(msg, name, mttName, awardName);
            }
        }
        return msg;
    }
    /**
     * 获得百人大战跑马灯信息
    */
    private getHundredMarqueeMsg(marquee: Object)
    {
        let marqueeDef: MarqueeDefinition = MarqueeDefined.GetInstance().getInfoByType(marquee["type"]);
        let msg: string;
        msg = marqueeDef.message;  //"百人大战{0}爆出奖池{1}，快来一起参与吧！"
        let hundredWarDef: HundredWarDefinition = HundredWarDefined.GetInstance().getDefinition(marquee["id"]);
        let hundredWarName: string;
        if (hundredWarDef)
        {
            hundredWarName = hundredWarDef.name;
        }
        msg = qin.StringUtil.format(msg, hundredWarName, marquee["gold"] + "金币");
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
            qin.Console.log(e);
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
    public isShowMarqueeMsg(marqueeMsg: string): boolean
    {
        let marquee: Object;
        try
        {
            marquee = JSON.parse(marqueeMsg);
        } catch (e)
        {
            qin.Console.log(e);
        }
        if (marquee)
        {
            let show: number;
            if (marquee["type"] == MarqueeMsgType.SystemMsg)
            {
                show = marquee["show"];
            } else
            {
                let marqueeDef: MarqueeDefinition = MarqueeDefined.GetInstance().getInfoByType(marquee["type"]);
                if (marqueeDef)
                {
                    show = marqueeDef.show;
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