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
var GiftProBase = table.InsGiftProBaseTable
var RechargeBase = table.InsRechargeBaseTable
var LevelBasee = table.InsLevelBaseeTable
var Activity_listBase = table.InsActivity_listBaseTable
var MapEventBase = table.InsMapEventBaseTable
var LoadingTextBase = table.InsLoadingTextBaseTable
var ProtoMsgIndex = table.InsProtoMsgIndexTable
var AwardBase = table.InsAwardBaseTable
var TaskBase = table.InsTaskBaseTable
var NameBase = table.InsNameBaseTable
var MusicBase = table.InsMusicBaseTable
var Activity_signinBase = table.InsActivity_signinBaseTable
var BundleBase = table.InsBundleBaseTable
var CardBase = table.InsCardBaseTable
var TBallGiftbase = table.InsTBallGiftbaseTable
var NoticeBase = table.InsNoticeBaseTable
var ChipsBase = table.InsChipsBaseTable
var ShopBase = table.InsShopBaseTable
var TexasRoomBase = table.InsTexasRoomBaseTable
var ItemBase = table.InsItemBaseTable
var MapEventRefreshBase = table.InsMapEventRefreshBaseTable

