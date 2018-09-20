/**
 * 成就/任务进度信息基类
 */
abstract class BaseAchieveProcessInfo
{
    public constructor(group: number)
    {
        this.group = group;
        this.process = 0;
        this.achieveList = new Array<AchievementInfo>();
        for (let info of UserManager.userInfo.allAchieveList)
        {
            if (info.definition && info.definition.group == this.group)
            {
                this.achieveList.push(info);
                let curInfo: AchievementInfo = AchievementManager.getAchieveInfoById(UserManager.userInfo.allAchieveList, info.id);
                let preInfo: AchievementInfo = AchievementManager.getAchieveInfoById(UserManager.userInfo.allAchieveList, info.definition.preId);
                if ((!preInfo || preInfo.isComplete) && !curInfo.isComplete)
                {
                    this.step = curInfo.id;
                }
            }
        }
        if (this.achieveList.length > 0)
        {
            let achieveDef = this.achieveList[0].definition;
            if (achieveDef)
            {
                this.type = achieveDef.type;
                this.tag = achieveDef.tag;
                this.dailyQuest = achieveDef.dailyQuest;
            }
        }
    }
    /**
     * 任务组
     */
    public group: number;
    /**
     * 任务列表
     */
    public achieveList: Array<AchievementInfo>;
    /**
     * 进度
     */
    private _process: number;

    public set process(value: number)
    {
        if (this._process != undefined && value != undefined && this._process != value && this.tag == AchieveTag.Quest)
        {
            AchieveProcessManager.processUpdateEvent.dispatch();
        }
        if (this.achieveList)
        {
            for (let info of this.achieveList)
            {
                if (info.definition)
                {
                    if (info.definition.para1 <= value)
                    {
                        info.isComplete = true;
                    }
                    else
                    {
                        this.step = info.id;
                        break;
                    }
                }
            }
        }
        this._process = value;
    }
    public get process(): number
    {
        return this._process;
    }
    /**
     * 步骤数（现已完成到哪一个任务）
     */
    public step: number;
    /**
     * 领取奖励的步骤数（现该领取哪个任务的奖励）
     */
    public get takeStep(): number
    {
        for (let i: number = 0; i < this.achieveList.length; i++)
        {
            if (!this.achieveList[i].isTake)
            {
                return this.achieveList[i].id;
            }
        }
        return undefined;
    }

    public get isTakeComplete(): boolean
    {
        return this.takeStep == undefined;
    }
    /**
     * 监听类型
     */
    public type: number;
    /**
     * 任务大类
     */
    public tag: number;
    /**
     * 重置类型
     */
    public dailyQuest: number;

    public init(process: number)
    {
        this.process = process;
    }

    /**
     * 更新进度
     */
    public onProcessUpdate(param?: any)
    {

    }

    /**
     * 获得当前步骤的任务信息
     */
    public getCurrentAchieveInfo(): AchievementInfo
    {
        for (let info of this.achieveList)
        {
            if (info.id == this.step)
            {
                return info;
            }
        }
        return null;
    }
    /**
     * 重置任务进度
     */
    public resetProcess()
    {
        this.process = 0;
        for (let info of this.achieveList)
        {
            info.isComplete = false;
            info.isTake = false;
        }
        if (this.achieveList.length > 0)
        {
            this.step = this.achieveList[0].id;
        }
    }

    public destroy()
    {
    }
}