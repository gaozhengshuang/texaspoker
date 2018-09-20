/**
 * 图片数字组件
 */
class ImageNumComponent extends BaseComponent<NumContentInfo>
{
    public numGroup: eui.Group;
    private _imgList: Array<eui.Image> = new Array<eui.Image>();
    /**
     * 数字字符串
     */
    private static _numStr: string = "0123456789";
    private static _wordStr: string = "万亿";
    public _numWidth;
    public _numHeight;
    public _wordWidth;
    public _wordHeight;
    public init(data: NumContentInfo)
    {
        this.clear();
        this._numWidth = data.numWidth;
        this._numHeight = data.numHeight;
        this._wordWidth = data.wordWidth;
        this._wordHeight = data.wordHeight;
        let totalWidth: number = 0;
        let img: eui.Image;
        let index: number = 0;
        (this.numGroup.layout as eui.HorizontalLayout).gap = data.gap;
        let str: string;
        for (let i: number = 0; i < data.content.length; i++)
        {
            str = data.content.substr(i, 1);
            if (ImageNumComponent._numStr.indexOf(str) != -1) //缓存图片
            {
                img = this.getImg(index);
            }
            else
            {
                img = new eui.Image();
                this._imgList.push(img);
            }
            img.source = this.getSource(str, data.preFix);
            this.numGroup.addChild(img);
            totalWidth += img.width;
            index++;
        }
        this.checkWidth(totalWidth, data.limtiWidth);
    }
    /**
     * 获取图片
     */
    private getImg(index: number): eui.Image
    {
        let img: eui.Image;
        if (index < this._imgList.length)
        {
            img = this._imgList[index];
            this.resetImg(img);
            return img;
        }
        img = new eui.Image();
        this._imgList.push(img);
        return img;
    }
    /**
     * 创建图片
     */
    private getSource(str: string, resName: string)
    {
        switch (str)
        {
            case "万":
                return SheetSubName.Achieve_Million;
            case "亿":
                return SheetSubName.Achieve_Billion;
            case ":":
                return SheetSubName.CountDown_Colon;
            default:
                if (str != game.StringConstants.Empty && str != undefined)
                {
                    return resName + str + "_png";
                }
                else
                {
                    return game.StringConstants.Empty;
                }
        }
    }
    /**
     * 检查是否缩放
     */
    private checkWidth(width: number, limit: number)
    {
        if (width > limit)
        {
            for (let img of this._imgList)
            {
                let temp = parseFloat((limit / width).toFixed(2));
                img.width *= temp;
                img.height *= temp;
            }
        }
    }

    public clear()
    {
        this.numGroup.removeChildren();
        game.ArrayUtil.Clear(this._imgList);

    }
    public destroy()
    {
        super.destroy();
        this.clear();
    }
    /**
     * 还原图片缩放
     */
    public resetImg(img: eui.Image)
    {
        if (img.source == SheetSubName.Achieve_Million || img.source == SheetSubName.Achieve_Billion)
        {
            img.width = this._wordWidth;
            img.height = this._wordHeight;
        }
        else
        {
            img.width = this._numWidth;
            img.height = this._numHeight;
        }
    }
}
/**
 * 数字内容信息(一定要设置图片素材大小)
 */
class NumContentInfo
{
    /**
     * 内容
     */
    public content: string;
    /**
     * 数字水平间距
     */
    public gap: number = 0;
    /**
     * 资源前缀
     */
    public preFix: string;
    /**
     * 限制宽度
     */
    public limtiWidth: number;

    public numWidth: number;
    public numHeight: number;
    public wordWidth: number;
    public wordHeight: number;
    /**
     * 设置图片大小
     */
    public setImgWidHei(numWidth: number, numHeight: number, wordWidth: number, wordHeight: number)
    {
        this.numWidth = numWidth;
        this.numHeight = numHeight;
        this.wordWidth = wordWidth;
        this.wordHeight = wordHeight;
    }
}