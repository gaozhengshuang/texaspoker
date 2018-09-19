package main
import (
	_"gitee.com/jntse/minehero/pbmsg"
)


// 德州扑克管理器
type TexasManager struct {
	rooms map[int64]IRoomBase	// 所有房间
}

func (t *TexasManager) Init() {
}

func (t *TexasManager) LoadDB() {
}

func (t *TexasManager) PackBin() {
}

func (t *TexasManager) Save() {
}

func (t *TexasManager) Tick(now int64) {
}

func (t *TexasManager) AddRoom(room IRoomBase) {
}

func (t *TexasManager) DelRoom(uid int64) {
}

