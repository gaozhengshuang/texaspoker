/**
 * 筹码组件
 */
class ChipsShowComponent extends BaseComponent<any>
{
    /**
    * 静态数据配置
    */
    private static readonly _chipSelfHeight: number = 5.5;
    private static readonly _oneWidth: number = 33;
    private static readonly _offsetW: number = 8;
    private static readonly _winChipsSpeed: number = 1.8;

    public bgImg: eui.Image;
    public numLabel: eui.Label;
    public chipBar: eui.Group;
    private _allImgList: Array<Array<eui.Image>>;
    /**
     * 筹码容器
     */
    private _chipsCon: egret.DisplayObjectContainer;
    public get allImgList(): Array<Array<eui.Image>>
    {
        return this._allImgList;
    }

    private _lastPos: ChipsPosType;

    private _winCallBack: game.Delegate;
    private _betCallback: game.Delegate;
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this._chipsCon = new egret.DisplayObjectContainer();
        this._allImgList = new Array<Array<eui.Image>>();
        this.addChild(this._chipsCon);
    }
    public init(data: any)
    {
        super.init(data);
        this.initClear();
        this._chipsCon.removeChildren();

        this._betCallback = null;
        if (data.callback && data.thisObject)
        {
            this._betCallback = game.Delegate.getOut(data.callback, data.thisObject);
        }
        if (data.type != undefined)
        {
            this._lastPos = data.type;
            this.chipsShow(data.num, data.type);
        }
        else
        {
            if (this._lastPos == undefined)
            {
                this._lastPos = ChipsPosType.Left;
            }
            this.chipsShow(data.num, this._lastPos);
        }
        if (data.isNum != undefined)
        {
            this.chipBar.visible = data.isNum;
        }
        if (data.isChip != undefined)
        {
            this._chipsCon.visible = data.isChip;
        }
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        game.Tick.RemoveTimeoutInvoke(this.runWinCallBack, this);
    }
    protected rendererStart(event: egret.Event)
    {
        super.rendererStart(event);
        if (this._allImgList.length > 0 && this._allImgList[0].length > 0)
        {
            this._chipsCon.y = (this.height - this._allImgList[0][0].height) / 2;
        }
    }
    /**
     * 筹码组件
    */
    private chipsShow(data: number, pos: ChipsPosType)
    {
        this.numLabel.text = game.MathUtil.formatNum(data);
        if (this.bindData.isFixedWidth)
        {
            this.numLabel.width = 180;
            this.numLabel.horizontalCenter = 0;
        }
        else
        {
            this.numLabel.horizontalCenter = undefined;
        }
        this.bgImg.width = this.numLabel.width + ChipsShowComponent._oneWidth + ChipsShowComponent._offsetW;
        this.bgImg.x = 0;
        this.creatChips(data);
        if (pos == ChipsPosType.Left)
        {
            this.numLabel.x = ChipsShowComponent._oneWidth;
            this.numLabel.textAlign = egret.HorizontalAlign.LEFT;
        }
        else if (ChipsPosType.Right)
        {
            this.numLabel.x = ChipsShowComponent._offsetW;
            this.numLabel.textAlign = egret.HorizontalAlign.RIGHT;
        }
        if (this.bindData.isFixedWidth)
        {
            this.numLabel.textAlign = egret.HorizontalAlign.CENTER;
            this.numLabel.x = ChipsShowComponent._oneWidth - 25;
        }
        this.setInitValue(pos);
    }
    /**
     * 创建筹码数
     */
    protected creatChips(chipNum: number)
    {
        egret.Tween.removeTweens(this.chipBar);
        this.chipBar.alpha = 1;

        if (ChipsDefined.GetInstance().dataList)
        {
            let imgList: Array<eui.Image> = new Array<eui.Image>();
            let dataLen: number = ChipsDefined.GetInstance().dataList.length;
            let def: ChipsDefinition;
            for (let i: number = dataLen - 1; i >= 0; i--)
            {
                def = ChipsDefined.GetInstance().dataList[i];
                let imgNum: number = Math.floor(chipNum / def.phase);
                for (let j: number = 0; j < imgNum; j++)
                {
                    let img: eui.Image = ChipsPot.popImg(def.img + ResSuffixName.PNG);
                    imgList.push(img);
                }
                chipNum %= def.phase;
            }
            this._allImgList.push(imgList);
        }
    }
    /**
     * 设置初始值
    */
    protected setInitValue(pos: ChipsPosType)
    {
        let len: number = this._allImgList.length;
        if (len > 0)
        {
            let imgArray: Array<eui.Image> = this._allImgList[0];
            let imgLen: number = imgArray.length;

            let img: eui.Image;
            let yPos: number = -imgLen * ChipsShowComponent._chipSelfHeight * 2;
            if (yPos < -300)
            {
                yPos = -300;
            }
            else if (yPos > -80)
            {
                yPos = -80;
            }
            for (let m: number = 0; m < imgLen; m++)
            {
                img = imgArray[m];
                img.y = yPos;
                if (pos == ChipsPosType.Left)
                {
                    img.x = 0;
                }
                else if (pos == ChipsPosType.Right)
                {
                    img.x = this.bgImg.width - ChipsShowComponent._oneWidth + 3;
                }
                this._chipsCon.addChild(img);
            }
            this.createVerticalTween();
        }
    }
    /**
     * 设置下注动画
    */
    protected createVerticalTween()
    {
        let imgList: Array<eui.Image> = this._allImgList[0];
        let len: number = imgList.length;
        if (this.bindData.isTween)
        {
            for (let m: number = 0; m < len; m++)
            {
                if (m == len - 1)
                {
                    egret.Tween.get(imgList[m]).wait(m * 40).to({ y: -m * ChipsShowComponent._chipSelfHeight }, len * 50, egret.Ease.quintOut).call(this.betOver, this);
                }
                else
                {
                    egret.Tween.get(imgList[m]).wait(m * 40).to({ y: -m * ChipsShowComponent._chipSelfHeight }, len * 50, egret.Ease.quintOut);
                }
            }
        }
        else
        {
            for (let m: number = 0; m < len; m++) //直接显示组件
            {
                imgList[m].y = -m * ChipsShowComponent._chipSelfHeight;
            }
            this.betOver();
        }
    }
    private betOver()
    {
        if (this._betCallback)
        {
            this._betCallback.invoke(this);
            game.Delegate.putIn(this._betCallback);
            this._betCallback = null;
        }
    }
    /**
     * 赢取筹码动画
     */
    public winChipsTween(pointList: Array<egret.Point>, callBack?: Function, thisObj?: any)
    {
        this._winCallBack = undefined;
        if (callBack && thisObj)
        {
            this._winCallBack = game.Delegate.getOut(callBack, thisObj);
        }

        let pLen: number = pointList.length;
        let imgList: Array<eui.Image>;
        let dis: number;
        let time: number;
        if (this._allImgList.length > 0)
        {
            let point: egret.Point;
            for (let i: number = 0; i < pLen; i++)
            {
                point = pointList[i];
                dis = egret.Point.distance(point, new egret.Point(this._allImgList[0][0].x, this._allImgList[0][0].y));
                time = dis * ChipsShowComponent._winChipsSpeed;
                if (i == 0)
                {
                    this.toRunList(this._allImgList[0], point.x, point.y, true, time);
                }
                else
                {
                    imgList = this.cloneImgList(this._allImgList[0]); //处理 多人分配奖池的情况
                    this.toRunList(imgList, point.x, point.y, false, time);
                }
            }
        }
    }
    private toRunList(imgList: Array<eui.Image>, x: number, y: number, isAddCallBack: boolean, time: number)
    {
        let len: number = imgList.length;
        let waitTime: number = 0;
        let totalTime: number = 0;

        time = Math.floor(time);
        let waitProportion: number = 0.6;
        let alphaProportion: number = 0.4;
        let center: number = Math.floor(len / 2);
        for (let n: number = len - 1; n >= 0; n--)
        {
            if (n == center && isAddCallBack)
            {
                waitTime = (len - n) * 43;
                totalTime = waitTime + time;
                egret.Tween.get(imgList[n]).wait(totalTime * waitProportion).to({ alpha: 0 }, totalTime * alphaProportion);

                egret.Tween.get(imgList[n]).wait(waitTime).to({ x: x, y: y }, time, egret.Ease.quartInOut).call(this.remove, this);
            }
            else
            {
                waitTime = (len - n) * 43;
                totalTime = waitTime + time;
                egret.Tween.get(imgList[n]).wait(totalTime * waitProportion).to({ alpha: 0 }, totalTime * alphaProportion);

                egret.Tween.get(imgList[n]).wait(waitTime).to({ x: x, y: y }, time, egret.Ease.quartInOut);
            }
        }
        game.Tick.AddTimeoutInvoke(this.runWinCallBack, time, this);
    }
    private runWinCallBack()
    {
        if (this._winCallBack)
        {
            this._winCallBack.invoke();
            game.Delegate.putIn(this._winCallBack);
            this._winCallBack = null;
        }
    }
    /**
     * 获取图片列表 
     */
    private cloneImgList(sourceList: Array<eui.Image>): Array<eui.Image>
    {
        let imgList: Array<eui.Image> = new Array<eui.Image>();
        let imgLen: number = sourceList.length;
        let img: eui.Image;
        let sourceImg: eui.Image;
        for (let j: number = 0; j < imgLen; j++)
        {
            sourceImg = sourceList[j];
            img = ChipsPot.popImg(<string>sourceImg.source);
            img.x = sourceImg.x;
            img.y = sourceImg.y;
            img.alpha = 1;
            img.scaleX = sourceImg.scaleX;
            img.scaleY = sourceImg.scaleY;
            imgList.push(img);
            this._chipsCon.addChild(img);
        }
        this._allImgList.push(imgList);
        return imgList;
    }
    /**
     * 移除下注条
    */
    private remove()
    {
        egret.Tween.get(this.chipBar).to({ alpha: 0 }, 200, egret.Ease.sineIn).call(this.clear, this);
    }

    /**
     * 清除图片列表和移除子项
    */
    public clear()
    {
        this.initClear();
        ChipsPot.pushComponent(this);
    }
    private initClear()
    {
        let imgLen: number;
        let img: eui.Image;
        for (let imgList of this._allImgList)
        {
            imgLen = imgList.length;
            for (let i: number = 0; i < imgLen; i++)
            {
                img = imgList[i];
                egret.Tween.removeTweens(img);
                this._chipsCon.removeChild(img);

                ChipsPot.pushImg(img);
            }
            imgList.length = 0;
        }
        egret.Tween.removeTweens(this.chipBar);
        game.Tick.RemoveTimeoutInvoke(this.runWinCallBack, this);
        this._allImgList.length = 0;
        game.Delegate.putIn(this._winCallBack);
        this._winCallBack = null;
        this._betCallback = null;
    }
}

/**
 * 筹码位置
*/
enum ChipsPosType
{
    /**
     * 左边显示
     */
    Left = 1,
    /**
     * 右边显示
     */
    Right = 2
}
