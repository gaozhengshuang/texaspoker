/// [注：本文件为自动生成，不需要人为编辑，若有修改，请通过配置py脚本来重新生成.]
/// @author xiejian
/// @generate date: GENE_DATE

package tbl
import "gitee.com/jntse/minehero/server/tbl/excel"

type IBaseExcel interface {
	Load(filename string) error
	Reload() error
}

// --------------------------------------------------------------------------
/// @brief 为excel config 实例取一个别名
// --------------------------------------------------------------------------
var MusicBase = table.InsMusicBaseTable
var LevelBasee = table.InsLevelBaseeTable
var LoadingTextBase = table.InsLoadingTextBaseTable
var Activity_signinBase = table.InsActivity_signinBaseTable
var Activity_listBase = table.InsActivity_listBaseTable
var GiftProBase = table.InsGiftProBaseTable
var ProtoMsgIndex = table.InsProtoMsgIndexTable
var TBallGiftbase = table.InsTBallGiftbaseTable
var NoticeBase = table.InsNoticeBaseTable
var RechargeBase = table.InsRechargeBaseTable
var MapEventBase = table.InsMapEventBaseTable
var SignBase = table.InsSignBaseTable
var AwardBase = table.InsAwardBaseTable
var NameBase = table.InsNameBaseTable
var ChipsBase = table.InsChipsBaseTable
var MapEventRefreshBase = table.InsMapEventRefreshBaseTable
var TaskBase = table.InsTaskBaseTable
var BundleBase = table.InsBundleBaseTable
var CardBase = table.InsCardBaseTable
var ShopBase = table.InsShopBaseTable
var TexasRoomBase = table.InsTexasRoomBaseTable
var ItemBase = table.InsItemBaseTable

