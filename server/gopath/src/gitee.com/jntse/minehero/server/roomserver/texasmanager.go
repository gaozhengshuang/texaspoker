package main

// 德州扑克管理器
type TexasManager struct {
	rooms map[int64]IRoomBase	// 所有房间
	public map[int64]IRoomBase	// 公共房间
	private map[int64]IRoomBase	// 私有房间
}

func (t *TexasManager) Init() {
	t.rooms = make(map[int64]IRoomBase)
	t.public = make(map[int64]IRoomBase)
	t.private = make(map[int64]IRoomBase)
}

func (t *TexasManager) LoadDB() {
}

func (t *TexasManager) PackBin() {
}

func (t *TexasManager) Save() {
}

func (t *TexasManager) Tick(now int64) {
}

// 初始部分房间
func (t *TexasManager) InitRoom() {
}

func (t *TexasManager) AddNewRoom() {
}

