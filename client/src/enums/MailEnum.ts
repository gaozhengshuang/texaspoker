/**
 * 邮件解析类型
 */
enum MailResolveType
{
    /**
     * 无解析
     */
    NONE = 0,
    /**
     * 解析附件
     */
    RosolveAnnex = 1,
    /**
     * 解析服务器数据
     */
    RosolveServer = 2,
    /**
     * 混合解析
     */
    MixRosolve = 3,
}