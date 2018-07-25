package main
import (
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)

// --------------------------------------------------------------------------
/// @brief 换装形象
// --------------------------------------------------------------------------
type UserImage struct {
	female 	map[int32]*msg.ItemData
	male		map[int32]*msg.ItemData
	//clothes 	map[int32]map[int32]*msg.ItemData
	owner   	*GateUser
}

func (this *UserImage) Init(user *GateUser) {
	this.male = make(map[int32]*msg.ItemData)
	this.female = make(map[int32]*msg.ItemData)
	//this.clothes = make(map[int32]map[int32]*msg.ItemData)
	//this.clothes[int32(msg.Sex_Female] = make(map[int32]*msg.ItemData)
	//this.clothes[int32(msg.Sex_Male] = make(map[int32]*msg.ItemData)
	this.owner = user
}

func (this *UserImage) LoadBin(bin *msg.Serialize) {
	for _, image := range bin.GetBase().Images.Lists {
		for _, item := range image.Clothes {
			if image.GetSex() == int32(msg.Sex_Female) {
				this.female[item.GetPos()] = item
			}else if image.GetSex() == int32(msg.Sex_Male) {
				this.male[item.GetPos()] = item
			}
		}
	}
}

func (this *UserImage) PackBin(bin *msg.Serialize) {
	bin.Base.Images = &msg.PersonalImage{ Lists:make([]*msg.ImageData,2) }
	bin.Base.Images.Lists[0] = &msg.ImageData{Sex:pb.Int32(int32(msg.Sex_Female))}
	bin.Base.Images.Lists[0].Clothes = make([]*msg.ItemData, 0)

	bin.Base.Images.Lists[1] = &msg.ImageData{Sex:pb.Int32(int32(msg.Sex_Male))}
	bin.Base.Images.Lists[1].Clothes = make([]*msg.ItemData, 0)

	for _, item := range this.female {
		bin.Base.Images.Lists[0].Clothes = append(bin.Base.Images.Lists[0].Clothes, item)
	}

	for _, item := range this.male {
		bin.Base.Images.Lists[1].Clothes = append(bin.Base.Images.Lists[1].Clothes, item)
	}
}

func (this *UserImage) Clean() {
	this.male = make(map[int32]*msg.ItemData)
	this.female = make(map[int32]*msg.ItemData)
}

func (this *UserImage) GetClothesByPos(pos int32) *msg.ItemData {
	if this.owner.Sex() == int32(msg.Sex_Female) {
		if item, find := this.female[pos]; find == true { return item }
	}else if this.owner.Sex() == int32(msg.Sex_Female) {
		if item, find := this.male[pos]; find == true { return item }
	}
	return nil
}

func (this *UserImage) SendShowImage() {
	send := &msg.GW2C_SendShowImage{Images:&msg.ImageData{Sex:pb.Int32(this.owner.Sex()), Clothes:make([]*msg.ItemData,0)} }
	if this.owner.Sex() == int32(msg.Sex_Female) {
		for _, item := range this.female { 
			send.Images.Clothes = append(send.Images.Clothes, item) 
		}
	}else if this.owner.Sex() == int32(msg.Sex_Male) {
		for _, item := range this.male { 
			send.Images.Clothes = append(send.Images.Clothes, item) 
		}
	}

	this.owner.SendMsg(send)
}

func (this *UserImage) DressClothes(pos int32, itemid int32) {
	newEquip := this.owner.bag.FindById(uint32(itemid))
	if newEquip == nil {
		this.owner.SendNotify("找不到穿戴的服装")
		return
	}

	equipbase := newEquip.EquipBase()
	if equipbase == nil {
		this.owner.SendNotify("只能穿戴服装道具")
		return 
	}

	if equipbase.Pos != pos {
		this.owner.SendNotify("不能穿戴这个位置")
		return
	}

	// 
	copyItem := pb.Clone(newEquip.Bin()).(*msg.ItemData)
	copyItem.Pos = pb.Int32(pos)
	

	if this.owner.Sex() == int32(msg.Sex_Female) {
		this.female[pos] = copyItem
	}else if this.owner.Sex() == int32(msg.Sex_Male) {
		this.male[pos] = copyItem
	}

	this.SendShowImage()
	//send := &msg.GW2C_UpdateItemPos{Items:make([]*msg.ItemData,0)}
	//send.Items = append(send.Items, pb.Clone(newEquip.Bin()).(*msg.ItemData))
	//this.owner.SendMsg(send)
}

// 脱下服装
func (this *UserImage) UnDressClothes(pos int32, syn bool) {
	if clothes := this.GetClothesByPos(pos); clothes == nil {
		this.owner.SendNotify("没有需要脱下的服装")
		return
	}

	if this.owner.Sex() == int32(msg.Sex_Female) {
		delete(this.female, pos)
	}else if this.owner.Sex() == int32(msg.Sex_Male) {
		delete(this.male, pos)
	}

	if syn { this.SendShowImage() }
}

func (this *UserImage) UnDressAll(syn bool) {
	if this.owner.Sex() == int32(msg.Sex_Female) {
		this.female = make(map[int32]*msg.ItemData)
	}else if this.owner.Sex() == int32(msg.Sex_Male) {
		this.male = make(map[int32]*msg.ItemData)
	}
	if syn { this.SendShowImage() }
}

