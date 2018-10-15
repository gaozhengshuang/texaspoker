package main

type UserManager struct {
	users map[int64]int
}

func (um *UserManager) Init() {
	um.users = make(map[int64]int)
}

func (um *UserManager) AddUser(uid int64, gid int) {
	um.users[uid] = gid
}

func (um *UserManager) RemoveUser(uid int64, gid int) {
	delete(um.users, uid)
}

func (um *UserManager) GetGidById(uid int64) int {
	if _, ok := um.users[uid]; ok {
		return um.users[uid]
	}
	return 0
}
