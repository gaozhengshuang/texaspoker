/**
 * 大厅面板按钮列表信息
 */
class GameHallBtnListInfo
{
    public priority: GameHallBtnPriority;
    public btn: eui.Button;
    public isShow: boolean;
    public constructor(priority: GameHallBtnPriority, btn: eui.Button)
    {
        this.priority = priority;
        this.btn = btn;
        this.isShow = true;
    }
}