var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 邮件管理
 */
var MailManager = (function () {
    function MailManager() {
    }
    /**
     * 重置数据
     */
    MailManager.Reset = function () {
        MailManager.unReadCount = 0;
        qin.ArrayUtil.Clear(MailManager.mailList);
        SocketManager.AddCommandListener(Command.Mail_Push_New_2024, MailManager.OnMailNewNofityFromServer, this);
    };
    /**
     * 新邮件的通知协议
     */
    MailManager.OnMailNewNofityFromServer = function (result) {
        MailManager.unReadCount++;
        MailManager.RequestMailList(0, 1);
    };
    MailManager.initialize = function (result, isPush) {
        if (result.data["MailList"]) {
            for (var _i = 0, _a = result.data["MailList"]; _i < _a.length; _i++) {
                var def = _a[_i];
                var mail = new MailInfo();
                mail.copyValueFrom(def);
                if (mail.attaJson) {
                    mail.attaList = new Array();
                    try {
                        var obj = JSON.parse(mail.attaJson);
                        for (var _b = 0, obj_1 = obj; _b < obj_1.length; _b++) {
                            var atta = obj_1[_b];
                            var award = new AwardInfoDefinition();
                            award.id = atta["Id"];
                            award.type = atta["Type"];
                            award.count = atta["Count"];
                            mail.attaList.push(award);
                        }
                    }
                    catch (e) {
                        qin.Console.logError("解析邮件json失败！    mailId：" + mail.Id);
                    }
                }
                if (mail.SubType) {
                    var def_1 = MailDefined.GetInstance().getDefinition(mail.SubType);
                    if (def_1) {
                        mail.Title = def_1.title;
                        var content = def_1.content;
                        if (def_1.type == MailResolveType.RosolveAnnex) {
                            if (mail.attaList && mail.attaList.length > 0) {
                                var itemDef = ItemDefined.GetInstance().getDefinition(mail.attaList[0].id);
                                content = content.replace("{" + 0 + "}", itemDef.name);
                            }
                        }
                        else if (def_1.type == MailResolveType.RosolveServer) {
                            if (mail.Content) {
                                var paramStr = mail.Content.split(qin.StringConstants.VerticalLine);
                                for (var i = 0; i < paramStr.length; i++) {
                                    content = content.replace("{" + i + "}", paramStr[i]);
                                }
                            }
                        }
                        else if (def_1.type == MailResolveType.MixRosolve) {
                            if (mail.attaJson && mail.attaJson.length > 0) {
                                if (mail.attaList[0].id == ItemFixedId.gold) {
                                    content = content.replace("{" + 0 + "}", mail.attaList[0].count.toString());
                                }
                                else if (mail.attaList[0].id == ItemFixedId.vip) {
                                    content = content.replace("{" + 0 + "}", mail.attaList[0].count + "个月VIP");
                                }
                                else if (mail.attaList[0].id == ItemFixedId.yearVip) {
                                    content = content.replace("{" + 0 + "}", "年费VIP");
                                }
                                else {
                                    var itemDef = ItemDefined.GetInstance().getDefinition(mail.attaList[0].id);
                                    var itemDes = " * " + mail.attaList[0].count;
                                    content = content.replace("{" + 0 + "}", itemDef.name + itemDes);
                                }
                            }
                            if (mail.Content) {
                                var paramStr = mail.Content.split(qin.StringConstants.VerticalLine);
                                for (var i = 0; i < paramStr.length; i++) {
                                    var index = i + 1;
                                    content = content.replace("{" + index + "}", paramStr[i]);
                                }
                            }
                        }
                        mail.Content = content;
                    }
                }
                MailManager.addOneMail(mail, isPush);
            }
            MailManager.getMailListEvent.dispatch();
        }
    };
    MailManager.unshiftList = function (result) {
        MailManager.initialize(result, false);
    };
    /**
     * 添加一封邮件（isPush：true为向后添加，false为向前添加）
     */
    MailManager.addOneMail = function (info, isPush) {
        if (isPush) {
            MailManager.mailList.push(info);
            if (MailManager.mailList.length > GameSetting.MaxMailNum) {
                MailManager.mailList.shift();
            }
        }
        else {
            MailManager.mailList.unshift(info);
            if (MailManager.mailList.length > GameSetting.MaxMailNum) {
                MailManager.mailList.pop();
            }
        }
    };
    /**
     * 请求邮件列表
     */
    MailManager.RequestMailList = function (startId, count) {
        SocketManager.call(Command.Mail_GetList_3097, { "StartId": startId, "Count": count }, MailManager.unshiftList, null, this);
    };
    /**
     *  获取列表中最大邮件id
     */
    MailManager.getMaxMailId = function () {
        if (MailManager.mailList) {
            var maxId = 0;
            for (var i = 0; i < MailManager.mailList.length; i++) {
                if (MailManager.mailList[i].Id > maxId) {
                    maxId = MailManager.mailList[i].Id;
                }
            }
            return maxId;
        }
        return undefined;
    };
    /**
     * 根据类型获取列表
     */
    MailManager.getListByType = function (type) {
        if (MailManager.mailList) {
            var list = new Array();
            for (var _i = 0, _a = MailManager.mailList; _i < _a.length; _i++) {
                var mailInfo = _a[_i];
                if (mailInfo.Type == type) {
                    list.push(mailInfo);
                }
            }
            return list;
        }
        return null;
    };
    /**
     * 某种类型是否存在未领取邮件
     */
    MailManager.isHaveNotTakeMailByType = function (type) {
        var list = MailManager.getListByType(type);
        if (list) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var mailInfo = list_1[_i];
                if (mailInfo.isHavePrize && !mailInfo.IsGot) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };
    MailManager.mailList = new Array();
    /**
     * 未读邮件数量
     */
    MailManager.unReadCount = 0;
    /**
     * 拉取邮件完成事件
     */
    MailManager.getMailListEvent = new qin.DelegateDispatcher();
    /**
     * 领取邮件附件事件
     */
    MailManager.getMailPrizeEvent = new qin.DelegateDispatcher();
    return MailManager;
}());
__reflect(MailManager.prototype, "MailManager");
//# sourceMappingURL=MailManager.js.map