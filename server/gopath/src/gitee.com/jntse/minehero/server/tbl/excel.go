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
var TCarStarAttrBase = table.InsTCarStarAttrBaseTable
var MapEventBase = table.InsMapEventBaseTable
var TStarupCarBase = table.InsTStarupCarBaseTable
var TCharacterLevelBase = table.InsTCharacterLevelBaseTable
var TbirckInfobase = table.InsTbirckInfobaseTable
var GiftProBase = table.InsGiftProBaseTable
var CarShopBase = table.InsCarShopBaseTable
var TBirckBase = table.InsTBirckBaseTable
var TLevelCarPartBase = table.InsTLevelCarPartBaseTable
var ProtoMsgIndex = table.InsProtoMsgIndexTable
var TBallGiftbase = table.InsTBallGiftbaseTable
var NoticeBase = table.InsNoticeBaseTable
var TCarModelBase = table.InsTCarModelBaseTable
var THouseBase = table.InsTHouseBaseTable
var TSupermarketBase = table.InsTSupermarketBaseTable
var RechargeBase = table.InsRechargeBaseTable
var TBirckItembase = table.InsTBirckItembaseTable
var SignBase = table.InsSignBaseTable
var THouseCellBase = table.InsTHouseCellBaseTable
var TCarBase = table.InsTCarBaseTable
var NameBase = table.InsNameBaseTable
var TCarPartBase = table.InsTCarPartBaseTable
var TCarPartLevelupBase = table.InsTCarPartLevelupBaseTable
var TBallBase = table.InsTBallBaseTable
var MapEventRefreshBase = table.InsMapEventRefreshBaseTable
var MapStoreBase = table.InsMapStoreBaseTable
var TCarBrandBase = table.InsTCarBrandBaseTable
var TEquipBase = table.InsTEquipBaseTable
var TCitysBase = table.InsTCitysBaseTable
var TaskBase = table.InsTaskBaseTable
var TSkillpBase = table.InsTSkillpBaseTable
var TBuildingsBase = table.InsTBuildingsBaseTable
var TParkingBase = table.InsTParkingBaseTable
var ShopBase = table.InsShopBaseTable
var TbirckRefreshbase = table.InsTbirckRefreshbaseTable
var LevelMaidBase = table.InsLevelMaidBaseTable
var ItemBase = table.InsItemBaseTable

