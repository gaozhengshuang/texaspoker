package main

import (
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/pbmsg"
	_"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	_"strconv"
	"strings"
)

type UserTask struct {
	tasks map[int32]*msg.TaskData
	owner *GateUser
}

func (u *UserTask) Init(owner *GateUser) {
	u.owner = owner
	u.tasks = make(map[int32]*msg.TaskData)
}

func (u *UserTask) LoadBin(bin *msg.Serialize) {
	taskbin := bin.GetBase().GetTask()
	if taskbin == nil {
		return
	}
	for _, data := range taskbin.GetTasks() {
		u.tasks[data.GetId()] = data
	}
}

func (u *UserTask) PackBin(bin *msg.Serialize) {
	bin.GetBase().Task = &msg.UserTask{Tasks: make([]*msg.TaskData, 0)}
	taskbin := bin.GetBase().GetTask()
	for _, data := range u.tasks {
		taskbin.Tasks = append(taskbin.Tasks, data)
	}
}

func (u *UserTask) TaskFinish(id int32) {
	task, find := u.tasks[id]
	if find == false {
		task = &msg.TaskData{Id: pb.Int32(id), Progress: pb.Int32(0), Completed: pb.Int32(1)}
		u.tasks[id] = task
	} else {
		if task.GetCompleted() == 1 {
			log.Info("玩家[%s %d] 重复完成任务[%d]", u.owner.Name(), u.owner.Id(), id)
			return
		}
		task.Completed = pb.Int32(1)
	}

	u.GiveTaskReward(id)
	log.Info("玩家[%s %d] 完成任务[%d]", u.owner.Name(), u.owner.Id(), id)
}

func (u *UserTask) GetTaskProgress(id int32) int32 {
	task, find := u.tasks[id]
	if find == false {
		return 0
	}
	return task.GetProgress()
}

func (u *UserTask) SetTaskProgress(id, progress int32) {
	task, find := u.tasks[id]
	if find == false {
		task = &msg.TaskData{Id: pb.Int32(id), Progress: pb.Int32(progress), Completed: pb.Int32(0)}
		u.tasks[id] = task
		return
	}
	task.Progress = pb.Int32(progress)
}

func (u *UserTask) SendTaskList() {
	send := &msg.GW2C_SendTaskList{Tasks: make([]*msg.TaskData, 0)}
	for _, task := range u.tasks {
		send.Tasks = append(send.Tasks, task)
	}
	u.owner.SendMsg(send)
}

func (u *UserTask) IsTaskFinish(id int32) bool {
	task, find := u.tasks[id]
	if find && task.GetCompleted() == 1 {
		return true
	}
	return false
}

func (u *UserTask) GiveTaskReward(id int32) {
	taskbase, find := tbl.TaskBase.TTaskById[int32(id)]
	if find == false {
		log.Error("玩家[%s %d] 找不到任务配置[%d]", u.owner.Name(), u.owner.Id(), id)
		return
	}

	// 任务奖励
	rewardpair := strings.Split(taskbase.Reward, "-")
	if len(rewardpair) != 2 {
		log.Error("玩家[%s %d] 解析任务奖励失败[%d]", u.owner.Name(), u.owner.Id(), id)
		return
	}
	//reward, _ := strconv.ParseInt(rewardpair[0], 10, 32)
	//count, _ := strconv.ParseInt(rewardpair[1], 10, 32)

	//
	if id == int32(msg.TaskId_RegistAccount) || id == int32(msg.TaskId_RegisterTopScore) || id == int32(msg.TaskId_InviteeTopScore) {
		//def.HttpWechatCompanyPay(u.owner.OpenId(), count, taskbase.Desc)
	}
}
