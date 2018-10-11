/**
 * 领取奖励面板
 */
class BringAwardComPanel extends BasePanel
{
    public bringBtn: eui.Button;
    public iconImg: CommonIcon;
    public goldNumLabel: eui.Label;
    public titleLabel: eui.Label;

    private _awardDef: table.IAwardDefine;
    private _callback: Function;
    private _thisObj: any;
    private _iconSize: number = 48;
    private _itemDef: table.IItemBaseDataDefine;
    private _itemCount: number;
    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.BringAwardComPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        if (appendData)
        {
            if (appendData.awardId)
            {
                let awardDef: table.IAwardDefine = table.AwardById[appendData.awardId];
                this._awardDef = awardDef;
            }
            if (appendData.des)
            {
                this.titleLabel.text = appendData.des;
            }
            if (appendData.callback)
            {
                this._callback = appendData.callback;
            }
            if (appendData.thisObj)
            {
                this._thisObj = appendData.thisObj;
            }
            if (appendData.size)
            {
                this._iconSize = appendData.size;
            }
            if (appendData.itemId)
            {
                this._itemDef = table.ItemBaseDataById[appendData.itemId];
            }
            if (appendData.itemCount)
            {
                this._itemCount = appendData.itemCount;
            }
        }
        if (this._awardDef && this._awardDef.RewardId.length > 0)
        {
            this.iconImg.init(this._awardDef, this._iconSize, null, false, true);
            this.goldNumLabel.text = this._awardDef.RewardNum[0].toString();
        }
        if (this._itemDef && this._itemCount)
        {
            this.iconImg.init(this._itemDef.Id, this._iconSize, null, false, true);
            this.goldNumLabel.text = this._itemCount.toString();
        }
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.clear();
        this.bringBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bringBtnClick, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.bringBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bringBtnClick, this);
    }
    /**
     * 领取金币按钮点击执行事件
    */
    private bringBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this._callback)
        {
            game.FuncUtil.invoke(this._callback, this._thisObj);
        }
        super.onCloseBtnClickHandler(null);
    }

    private clear()
    {
        this._awardDef = null;
        this._callback = null;
        this._itemCount = null;
        this._itemDef = null;
        this._thisObj = null;
    }
}