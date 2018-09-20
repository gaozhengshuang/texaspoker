/**
 * 比赛消息处理
 */
class MatchNewsLogic
{
    private _blindAddVc: number = undefined;
    private _alertTop: number = undefined;
    private _alertList: Array<number>;
    private _isShow: boolean;

    private _target: GamblingPanel;

    constructor(target: GamblingPanel)
    {
        this._target = target;
    }
    public initialize()
    {
        let isChangeRoom: boolean = false;
        this._isShow = undefined;

        let state: GamblingPanelMatchState = this._target.panelState;

        let blindComponent: GamblingMatchBlindComponent = state.getCompoent<GamblingMatchBlindComponent>(GamblingMatchBlindComponent);
        if (this._blindAddVc == undefined)
        {
            this._blindAddVc = blindComponent.blindAddAlertGroup.verticalCenter;
        }
        egret.Tween.removeTweens(blindComponent.championshipAlertGroup);
        egret.Tween.removeTweens(blindComponent.blindAddAlertGroup);
        if (blindComponent.blindAddAlertGroup.parent)
        {
            blindComponent.blindAddAlertGroup.parent.removeChild(blindComponent.blindAddAlertGroup);
        }
        blindComponent.championshipAlertGroup.touchEnabled = false;
        blindComponent.championshipAlertGroup.touchChildren = false;
        blindComponent.championshipAlertGroup.visible = false;
        this.clearAllAlert();
    }
    private showTween(text: string)
    {
        let state: GamblingPanelMatchState = this._target.panelState;
        let blindComponent: GamblingMatchBlindComponent = state.getCompoent<GamblingMatchBlindComponent>(GamblingMatchBlindComponent);


        egret.Tween.removeTweens(blindComponent.championshipAlertGroup);
        blindComponent.championshipAlertGroup.visible = false;
        this._isShow = true;
        blindComponent.championshipAlertLabel.text = text;
        blindComponent.championshipAlertGroup.visible = true;
        if (this._alertTop == undefined)
        {
            this._alertTop = blindComponent.championshipAlertGroup.top;
        }
        let moveDis: number = this._alertTop - blindComponent.championshipAlertGroup.height;
        blindComponent.championshipAlertGroup.top = moveDis;
        egret.Tween.removeTweens(blindComponent.championshipAlertGroup);
        let tween = egret.Tween.get(blindComponent.championshipAlertGroup);
        tween.to({ top: this._alertTop }, 400).wait(4000).to({ top: moveDis }, 400).call(this.onMyTweenOver, this);
        tween.play();
    }
    public onDisable()
    {
        let state: GamblingPanelMatchState = this._target.panelState;
        let blindComponent: GamblingMatchBlindComponent = state.getCompoent<GamblingMatchBlindComponent>(GamblingMatchBlindComponent);
        egret.Tween.removeTweens(blindComponent.championshipAlertGroup);
        egret.Tween.removeTweens(blindComponent.blindAddAlertGroup);
        this.clearAllAlert();
    }
    private onMyTweenOver()
    {
        this._isShow = false
        let text: string = this.checkShow();
        if (text)
        {
            this.showTween(text);
        }
        else
        {
            let state: GamblingPanelMatchState = this._target.panelState;
            let blindComponent: GamblingMatchBlindComponent = state.getCompoent<GamblingMatchBlindComponent>(GamblingMatchBlindComponent);
            blindComponent.championshipAlertGroup.visible = false;
        }
    }

    public clearAllAlert(isHide: boolean = true)
    {
        qin.ArrayUtil.Clear(this._alertList);
        if (isHide)
        {
            let state: GamblingPanelMatchState = this._target.panelState;
            let blindComponent: GamblingMatchBlindComponent = state.getCompoent<GamblingMatchBlindComponent>(GamblingMatchBlindComponent);
            blindComponent.championshipAlertGroup.visible = false;
            egret.Tween.removeTweens(blindComponent.championshipAlertGroup);
            egret.Tween.removeTweens(blindComponent.blindAddAlertGroup);
        }
    }
    public showAlert(type: number, text: string = undefined)
    {
        if (!type)
        {
            return;
        }
        if (!this._isShow)
        {
            let text: string = this.getNewsText(type);
            if (!text)
            {
                return;
            }
            this.showTween(text);
        }
        else
        {
            if (!this._alertList)
            {
                this._alertList = new Array<number>();
            }
            this._alertList.push(type);
            this._alertList.sort(this.sortAlert);
        }
    }
    private checkShow(): string
    {
        if (this._alertList)
        {
            let num = this._alertList.length;
            for (let i: number = 0; i < num; i++)
            {
                if (this._alertList.length <= 0)
                {
                    return null;
                }
                let type: number = this._alertList[0];
                this._alertList.splice(0, 1);
                let text: string = this.getNewsText(type);
                if (text)
                {
                    return text;
                }
            }
        }
        return null;
    }
    private getNewsText(type: number): string
    {
        switch (type)
        {
            case ChampionshipRoomUIAlertType.InAward:
                return "恭喜您进入奖励圈";
            case ChampionshipRoomUIAlertType.InFinals:
                return "恭喜您进入比赛最终桌,继续加油哦";
            case ChampionshipRoomUIAlertType.LeftNumChange:
                if (GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.leftJoin)
                {
                    let time: number = Math.round((TimeManager.GetServerUtcTimestamp() - GamblingManager.matchRoomInfo.startTime) / 60);
                    return qin.StringUtil.format("比赛进行{0}分钟,剩余比赛人数:{1}", time, GamblingManager.matchRoomInfo.leftJoin);
                }
            case ChampionshipRoomUIAlertType.ChangeRoom:
                return "为了公平起见,已为您重新配桌";
        }
        return null
    }
    private sortAlert(a: number, b: number): number
    {
        if (a > b)
        {
            return 1;
        }
        if (a < b)
        {
            return -1;
        }
        return 0;
    }

    public showAddBlind(text: string)
    {
        let state: GamblingPanelMatchState = this._target.panelState;

        let blindComponent: GamblingMatchBlindComponent = state.getCompoent<GamblingMatchBlindComponent>(GamblingMatchBlindComponent);
        blindComponent.blindAddLabel.text = text;
        egret.Tween.removeTweens(blindComponent.blindAddAlertGroup);
        let tween = egret.Tween.get(blindComponent.blindAddAlertGroup);
        blindComponent.blindAddAlertGroup.verticalCenter = this._blindAddVc;
        blindComponent.blindAddAlertGroup.alpha = 1;
        blindComponent.blindAddAlertImage.width = blindComponent.blindAddLabel.width + 30;
        blindComponent.addChild(blindComponent.blindAddAlertGroup);
        tween.wait(1700).to({ verticalCenter: this._blindAddVc - 70, alpha: 0 }, 1300).call(() => 
        {
            if (blindComponent.blindAddAlertGroup.parent)
            {
                blindComponent.blindAddAlertGroup.parent.removeChild(blindComponent.blindAddAlertGroup);
            }
        });
    }
}