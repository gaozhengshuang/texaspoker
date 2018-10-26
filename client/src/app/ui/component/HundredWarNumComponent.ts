/**
 * 百人大战数字组件
 */
class HundredWarNumComponent extends BaseComponent<string>
{
    public numGroup: eui.Group;
    public numList: Array<eui.Image>;
    private type: NumResType;
    public init(str: string, type: NumResType = NumResType.HundredWar, gap?: number)
    {
        if (!this.numList)
        {
            this.numList = new Array<eui.Image>();
        }
        this.reset();
        this.type = type;
        for (let i: number = 0; i < str.length; i++)
        {
            let char: string = str.charAt(i);
            this.setNum(char);
        }
        if (gap)
        {
            let Hlayer: eui.HorizontalLayout = this.numGroup.layout as eui.HorizontalLayout;
            Hlayer.gap = gap;
        }
    }

    private setNum(char: string)
    {
        let numImg: eui.Image;
        for (let num of this.numList)
        {
            if (!num.visible)
            {
                num.visible = true;
                numImg = num;
                break;
            }
        }
        if (!numImg)
        {
            numImg = new eui.Image();
            this.numList.push(numImg);
            this.numGroup.addChild(numImg);

        }
        let prefixName: string;
        if (this.type == NumResType.HundredWar)
        {
            prefixName = ResPrefixName.HundredWarNum;
        }
        else if (this.type == NumResType.HundredWar2)
        {
            prefixName = ResPrefixName.HundredWarNum2;
        }
        if (prefixName)
        {
            switch (char)
            {
                case ",":
                    numImg.source = prefixName + "10" + ResSuffixName.PNG;
                    break;
                case "$":
                    numImg.source = prefixName + "s" + ResSuffixName.PNG;
                    break;
                default:
                    numImg.source = prefixName + parseInt(char) + ResSuffixName.PNG;
                    break;
            }
        }
        else
        {
            game.Console.logError("数字类型错误！   type：" + this.type);
        }

        numImg.scaleX = numImg.scaleY = 1;//this.height / numImg.texture.textureHeight; // move todo
        // numImg.scaleX = numImg.scaleY = this.height / numImg.texture.textureHeight;
    }
    private reset()
    {
        for (let num of this.numList)
        {
            num.visible = false;
        }
        this.type = null;
    }
}