/**
 * 邮件解析类型
 */
var MailResolveType;
(function (MailResolveType) {
    /**
     * 无解析
     */
    MailResolveType[MailResolveType["NONE"] = 0] = "NONE";
    /**
     * 解析附件
     */
    MailResolveType[MailResolveType["RosolveAnnex"] = 1] = "RosolveAnnex";
    /**
     * 解析服务器数据
     */
    MailResolveType[MailResolveType["RosolveServer"] = 2] = "RosolveServer";
    /**
     * 混合解析
     */
    MailResolveType[MailResolveType["MixRosolve"] = 3] = "MixRosolve";
})(MailResolveType || (MailResolveType = {}));
//# sourceMappingURL=MailEnum.js.map