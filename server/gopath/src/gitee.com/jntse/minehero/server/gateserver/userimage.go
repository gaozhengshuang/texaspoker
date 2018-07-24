package main
import (
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)

// --------------------------------------------------------------------------
/// @brief 换装形象
// --------------------------------------------------------------------------
type UserImage struct {
	female 	map[uint32]*msg.ItemData
	male	map[uint32]*msg.ItemData
	owner   *GateUser
}

func (this *UserImage) Init(user *GateUser) {
	this.male = make(map[uint32]*msg.ItemData)
	this.female = make(map[uint32]*msg.ItemData)
	this.owner = user
}

func (this *UserImage) LoadBin(bin *msg.Serialize) {
	for _, image := range bin.GetBase().Images.Lists {
		for _, item := range image.Clothes {
			if image.GetSex() == int32(msg.Sex_Female) {
				this.female[item.GetId()] = item
			}else if image.GetSex() == int32(msg.Sex_Male) {
				this.male[item.GetId()] = item
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
	this.male = make(map[uint32]*msg.ItemData)
	this.female = make(map[uint32]*msg.ItemData)
}

func (this *UserImage) DressClothes() {
}
