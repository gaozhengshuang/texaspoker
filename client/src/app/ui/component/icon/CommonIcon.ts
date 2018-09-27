/**
 * 通用组件
 */
class CommonIcon extends BaseComponent<any>
{
    public bgImg: eui.Image;
    public itemImg: eui.Image;
    public highLightImg: eui.Image;
    private readonly _defaultItemSize = 0.85;

    public init(sourse: string, size?: number, bg?: string, isHighLight?: boolean, hideBg?: boolean);
    public init(itemId: number, size?: number, bg?: string, isHighLight?: boolean, hideBg?: boolean);
    public init(awardDef: table.IAwardDefine, size?: number, bg?: string, isHighLight?: boolean, hideBg?: boolean);
    public init(item: any, size?: number, bg?: string, isHighLight?: boolean, hideBg?: boolean)
    {
        if (typeof item == "string")
        {
            this.itemImg.source = item;
        }
        else if (typeof item == "number")
        {
            let def: table.IItemBaseDataDefine = table.ItemBaseDataById[item];
            if (def)
            {
                this.itemImg.source = def.Icon + ResSuffixName.PNG;
            }
        }
        else if (item && (item as table.IAwardDefine).RewardId)
        {
            let id: number = item.RewardId[0];
            let def: table.IItemBaseDataDefine = table.ItemBaseDataById[id];
            if (def)
            {
                this.itemImg.source = def.Icon + ResSuffixName.PNG;
            }
        }
        if (size != undefined)
        {
            this.width = this.height = size;
            let scaleWidth: number = this._defaultItemSize * size / this.itemImg.width;
            let scaleHeight: number = this._defaultItemSize * size / this.itemImg.height;
            this.itemImg.scaleX = this.itemImg.scaleY = Math.min(scaleWidth, scaleHeight);
        }
        if (hideBg)
        {
            this.bgImg.visible = false;
        }
        else
        {
            this.bgImg.visible = true;
            if (bg != undefined)
            {
                this.bgImg.source = bg;
            }
            else
            {
                this.bgImg.source = SheetSubName.CommonItemBg;
            }
        }

        if (isHighLight != undefined)
        {
            this.highLightImg.visible = isHighLight;
        }
        else
        {
            this.highLightImg.visible = true;
        }
    }
}