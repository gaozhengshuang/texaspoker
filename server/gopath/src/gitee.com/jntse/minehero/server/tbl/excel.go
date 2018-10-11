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
var GiftShopBase = table.InsGiftShopBaseTable
var MusicBase = table.InsMusicBaseTable
var LevelBasee = table.InsLevelBaseeTable
var PayListBase = table.InsPayListBaseTable
var TextBase = table.InsTextBaseTable
var TChampionshipPrize = table.InsTChampionshipPrizeTable
var LoadingTextBase = table.InsLoadingTextBaseTable
var Activity_signinBase = table.InsActivity_signinBaseTable
var MailBase = table.InsMailBaseTable
var TSystemTime = table.InsTSystemTimeTable
var Activity_listBase = table.InsActivity_listBaseTable
var GiftProBase = table.InsGiftProBaseTable
var GoldenBeanAwardBase = table.InsGoldenBeanAwardBaseTable
var ProtoMsgIndex = table.InsProtoMsgIndexTable
var TTimeAward = table.InsTTimeAwardTable
var TBallGiftbase = table.InsTBallGiftbaseTable
var NoticeBase = table.InsNoticeBaseTable
var TexasAI = table.InsTexasAITable
var RechargeBase = table.InsRechargeBaseTable
var MapEventBase = table.InsMapEventBaseTable
var TexasFRC = table.InsTexasFRCTable
var AwardBase = table.InsAwardBaseTable
var NameBase = table.InsNameBaseTable
var TChampionship = table.InsTChampionshipTable
var ChipsBase = table.InsChipsBaseTable
var MapEventRefreshBase = table.InsMapEventRefreshBaseTable
var BankruptBase = table.InsBankruptBaseTable
var RankBase = table.InsRankBaseTable
var TaskBase = table.InsTaskBaseTable
var TChampionshipBlind = table.InsTChampionshipBlindTable
var BundleBase = table.InsBundleBaseTable
var CardBase = table.InsCardBaseTable
var ShopBase = table.InsShopBaseTable
var TexasRoomBase = table.InsTexasRoomBaseTable
var ItemBase = table.InsItemBaseTable

