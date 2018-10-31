/// [注：本文件为自动生成，不需要人为编辑，若有修改，请通过配置py脚本来重新生成.]
/// @author xiejian
/// @generate date: GENE_DATE

package tbl
import "os"
import "path/filepath"
import "encoding/json"
import "gitee.com/jntse/gotoolkit/log"
import "gitee.com/jntse/gotoolkit/net"

// --------------------------------------------------------------------------
/// @brief 配置管理器
// --------------------------------------------------------------------------
type TblLoader struct {
	confpath network.TablePathConf
	tbls map[string]IBaseExcel
	jsons map[string]IBaseJson
}

func NewTblLoader(conf network.TablePathConf) *TblLoader {
	loader := new(TblLoader)
	loader.confpath = conf
	loader.tbls = make(map[string]IBaseExcel)
	loader.jsons= make(map[string]IBaseJson)
	loader.Init()
	return loader
}
 
func (this *TblLoader) Reload() {
	log.Info("重新加载tbl配置")
	this.ReloadExcel()
	this.ReloadJson()
}

func (this *TblLoader) LoadExcel(conf IBaseExcel, file string) {
	fullpath := this.confpath.Excel + file
	err := conf.Load(fullpath)
	if err != nil { panic(err) }
	log.Info("加载配置文件[%s]", fullpath)
	this.tbls[fullpath] = conf
}

func (this *TblLoader) ReloadExcel() {
	for k, v := range this.tbls {
		if err := v.Reload(); err != nil {
			panic(err)
		}
		log.Info("加载配置文件[%s]", k)
	}
}

func (this *TblLoader) LoadJson(conf IBaseJson, file string) {
	fullpath := this.confpath.Json + file
	ifile, err := os.Open(fullpath)
	if err != nil  { panic(err) }
	defer ifile.Close()

	fileinfo, _:= ifile.Stat()
	buf := make([]byte, fileinfo.Size())
	ifile.Read(buf)
	//buflen, _:= ifile.Read(buf)
	//log.Info("file=%s buflen=%d buf=\n%v\n", file, buflen, string(buf))
	if err := json.Unmarshal(buf, conf); err != nil {
		panic(err)
	}
	this.jsons[fullpath] = conf
	log.Info("加载配置文件[%s]", fullpath)
}

func (this *TblLoader) ReloadJson() {
	for f, v := range this.jsons {
		this.LoadJson(v, filepath.Base(f))
	}
}

func (this *TblLoader) Init() {

	// load excels
    this.LoadExcel(GiftShopBase, "giftshopbase.json")
	this.LoadExcel(MusicBase, "music.json")
	this.LoadExcel(LevelBasee, "levelbase.json")
	this.LoadExcel(PayListBase, "paylistbase.json")
	this.LoadExcel(TextBase, "textbase.json")
	this.LoadExcel(TChampionshipPrize, "championshipprize.json")
	this.LoadExcel(LoadingTextBase, "loadingtext.json")
	this.LoadExcel(VipBase, "vipbase.json")
	this.LoadExcel(Activity_signinBase, "activity_signinbase.json")
	this.LoadExcel(MailBase, "mailbase.json")
	this.LoadExcel(TSystemTime, "systemtime.json")
	this.LoadExcel(Activity_listBase, "activity_listbase.json")
	this.LoadExcel(GiftProBase, "giftprobase.json")
	this.LoadExcel(HundredWarCardTypeBase, "hundredwarcardtypebase.json")
	this.LoadExcel(TMarquee, "marquee.json")
	this.LoadExcel(PayBagBase, "paybagbase.json")
	this.LoadExcel(GoldenBeanAwardBase, "goldenbeanawardbase.json")
	this.LoadExcel(MorePlayBase, "moreplaybase.json")
	this.LoadExcel(ProtoMsgIndex, "proto_index.json")
	this.LoadExcel(HundredWarBase, "hundredwarbase.json")
	this.LoadExcel(TTimeAward, "timeaward.json")
	this.LoadExcel(TBallGiftbase, "ballgiftbase.json")
	this.LoadExcel(NoticeBase, "noticebase.json")
	this.LoadExcel(TexasAI, "texasai.json")
	this.LoadExcel(RechargeBase, "recharge.json")
	this.LoadExcel(MapEventBase, "mapevent.json")
	this.LoadExcel(TexasFRC, "texasfrc.json")
	this.LoadExcel(AwardBase, "awardbase.json")
	this.LoadExcel(NameBase, "namebase.json")
	this.LoadExcel(TChampionship, "championship.json")
	this.LoadExcel(AchieveBase, "achievebase.json")
	this.LoadExcel(HoleCards, "holecards.json")
	this.LoadExcel(ChipsBase, "chips.json")
	this.LoadExcel(LuckyTaskBase, "luckytaskbase.json")
	this.LoadExcel(MapEventRefreshBase, "mapeventrefresh.json")
	this.LoadExcel(BankruptBase, "bankruptbase.json")
	this.LoadExcel(RankBase, "rankbase.json")
	this.LoadExcel(TaskBase, "taskbase.json")
	this.LoadExcel(TChampionshipBlind, "championshipblind.json")
	this.LoadExcel(BundleBase, "bundle.json")
	this.LoadExcel(CardBase, "card.json")
	this.LoadExcel(ShopBase, "shopbase.json")
	this.LoadExcel(TexasRoomBase, "texasroom.json")
	this.LoadExcel(ItemBase, "itembase.json")
	

	// load jsons
    this.LoadJson(Room, "room.json")
	this.LoadJson(Global, "global.json")
	this.LoadJson(HongBaoAPI, "hongbao.json")
	this.LoadJson(Delivery, "delivery.json")
	this.LoadJson(Game, "game.json")
	this.LoadJson(Wechat, "wechat.json")
	this.LoadJson(Mysql, "mysql.json")
	
}

