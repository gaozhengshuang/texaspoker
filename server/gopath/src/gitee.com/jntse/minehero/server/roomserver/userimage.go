package main
//import (
//	"strconv"
//	"gitee.com/jntse/minehero/pbmsg"
//	"gitee.com/jntse/minehero/server/tbl"
//	pb "github.com/gogo/protobuf/proto"
//)
//
// --------------------------------------------------------------------------
/// @brief 换装形象
// --------------------------------------------------------------------------
//type UserImage struct {
//	clothes 	map[int32]map[int32]*msg.ItemData
//	owner   	*RoomUser
//}
//
//func (ui *UserImage) Init(user *RoomUser) {
//	ui.clothes = make(map[int32]map[int32]*msg.ItemData)
//	ui.clothes[int32(msg.Sex_Female)] = make(map[int32]*msg.ItemData)
//	ui.clothes[int32(msg.Sex_Male)] = make(map[int32]*msg.ItemData)
//	ui.owner = user
//}
//
//func (ui *UserImage) LoadBin(bin *msg.Serialize) {
//	for _, image := range bin.GetBase().Images.Lists {
//		for _, item := range image.Clothes {
//			ui.clothes[image.GetSex()][item.GetPos()] = item
//		}
//	}
//}
//
//func (ui *UserImage) PackBin(bin *msg.Serialize) {
//	bin.Base.Images = &msg.PersonalImage{ Lists:make([]*msg.ImageData,2) }
//	bin.Base.Images.Lists[0] = &msg.ImageData{Sex:pb.Int32(int32(msg.Sex_Female))}
//	bin.Base.Images.Lists[0].Clothes = make([]*msg.ItemData, 0)
//
//	bin.Base.Images.Lists[1] = &msg.ImageData{Sex:pb.Int32(int32(msg.Sex_Male))}
//	bin.Base.Images.Lists[1].Clothes = make([]*msg.ItemData, 0)
//
//	for sex, image := range ui.clothes {
//		for _, item := range image {
//			if sex == int32(msg.Sex_Female) {
//				bin.Base.Images.Lists[0].Clothes = append(bin.Base.Images.Lists[0].Clothes, item)
//			}else if sex == int32(msg.Sex_Male) {
//				bin.Base.Images.Lists[1].Clothes = append(bin.Base.Images.Lists[1].Clothes, item)
//			}
//		}
//	}
//}
//
//func (ui *UserImage) Clean() {
//	ui.clothes = make(map[int32]map[int32]*msg.ItemData)
//	ui.clothes[int32(msg.Sex_Female)] = make(map[int32]*msg.ItemData)
//	ui.clothes[int32(msg.Sex_Male)] = make(map[int32]*msg.ItemData)
//
//}
//
//func (ui *UserImage) GetClothesByPos(pos int32) *msg.ItemData {
//	image, find := ui.clothes[ui.owner.Sex()]
//	if find == false {
//		return nil
//	}
//
//	if item, find := image[pos]; find == true {
//		return item
//	}
//
//	return nil
//}
//
//func (ui *UserImage) SendShowImage() {
//	send := &msg.GW2C_SendShowImage{ Images:&msg.ImageData{Sex:pb.Int32(ui.owner.Sex()), Clothes:make([]*msg.ItemData,0)} }
//	if image, find := ui.clothes[ui.owner.Sex()]; find == true {
//		for _, item := range image { send.Images.Clothes = append(send.Images.Clothes, item)  }
//	}
//	ui.owner.SendMsg(send)
//}
//
//func (ui *UserImage) DressClothes(pos int32, itemid int32) {
//	newEquip := ui.owner.bag.FindById(int32(itemid))
//	if newEquip == nil {
//		ui.owner.SendNotify("找不到穿戴的服装")
//		return
//	}
//
//	equipbase := newEquip.EquipBase()
//	if equipbase == nil {
//		ui.owner.SendNotify("只能穿戴服装道具")
//		return 
//	}
//
//	if equipbase.Pos != pos {
//		ui.owner.SendNotify("不能穿戴这个位置")
//		return
//	}
//
//	if equipbase.Sex != int32(msg.Sex_Neutral) && equipbase.Sex != ui.owner.Sex() {
//		ui.owner.SendNotify("性别不符合")
//		return
//	}
//
//	copyItem := pb.Clone(newEquip.Bin()).(*msg.ItemData)
//	copyItem.Pos = pb.Int32(pos)
//	ui.clothes[ui.owner.Sex()][pos] = copyItem
//	ui.SendShowImage()
//}
//
//// 脱下服装
//func (ui *UserImage) UnDressClothes(pos int32, syn bool) {
//	if clothes := ui.GetClothesByPos(pos); clothes == nil {
//		return
//	}
//
//	delete(ui.clothes[ui.owner.Sex()], pos)
//	if syn { 
//		ui.SendShowImage() 
//	}
//}
//
//// 脱下全部
//func (ui *UserImage) UnDressAll(syn bool) {
//	ui.clothes[ui.owner.Sex()] = make(map[int32]*msg.ItemData)
//	if syn { 
//		ui.SendShowImage() 
//	}
//}
//
//
////
//func (ui *UserImage) IsHaveDressSuit() bool {
//	clothes := ui.clothes[ui.owner.Sex()]
//	for _, v := range clothes {
//		if v.GetPos() == int32(msg.ItemPos_Suit) {
//			return true 
//		}
//	}
//	return false
//}
//
//func (ui *UserImage) GetEquipSkills() []int32 {
//	clothes, find := ui.clothes[ui.owner.Sex()]
//	if find == false {
//		return nil
//	}
//
//	skills := make([]int32, 0, 10)
//	for _, item := range clothes {
//		equip, find := tbl.TEquipBase.EquipById[int32(item.GetId())]
//		if find == false { continue }
//		for _, skill := range equip.Skill { 
//			iskill, _ := strconv.ParseInt(skill, 10, 32)
//			skills = append(skills, int32(iskill))
//		}
//	}
//
//	return skills
//}
//
//
