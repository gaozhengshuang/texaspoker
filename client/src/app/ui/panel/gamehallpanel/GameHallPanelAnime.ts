class GameHallPanelAnime extends BaseGameHallAnime
{
    public onEnable()
    {
        this.setEnterAnime();
    }
    public onDisable()
    {
        this.setOutAnime();
    }

    public setEnterAnime()
    {
        this.removeEnterAnime();
        this.target.userinfoGroup.top = -100;
        egret.Tween.get(this.target.userinfoGroup).to({ top: 0 }, 600, egret.Ease.backOut);
        this.target.rightMenu.right = -113;
        egret.Tween.get(this.target.rightMenu).to({ right: 0 }, 600, egret.Ease.backOut);
        this.target.ranking.left = -86;
        egret.Tween.get(this.target.ranking).to({ left: 0 }, 600, egret.Ease.backOut);
        this.target.gameButton.bottom = -250;
        egret.Tween.get(this.target.gameButton)
            .to({ bottom: 210 - (1295 - this.target.panelBottom.height) / 1280 * 210 }, 800, egret.Ease.backOut);
        this.target.bottomButton.bottom = -150;
        egret.Tween.get(this.target.bottomButton).to({ bottom: 0 }, 600, egret.Ease.backOut);
        this.target.dealerImg.alpha = 0;
        egret.Tween.get(this.target.dealerImg).to({ alpha: 1 }, 300).call(this.onEnterAnmComplete, this);
    }

    public setOutAnime()
    {
        this.removeEnterAnime();
        this.target.userinfoGroup.top = 0;
        egret.Tween.get(this.target.userinfoGroup).to({ top: -100 }, 600);
        this.target.rightMenu.right = 0;
        egret.Tween.get(this.target.rightMenu).to({ right: -113 }, 600);
        this.target.ranking.left = 0;
        egret.Tween.get(this.target.ranking).to({ left: -86 }, 600);
        this.target.gameButton.bottom = 210;
        egret.Tween.get(this.target.gameButton).to({ bottom: -250 }, 800);
        this.target.bottomButton.bottom = 0;
        egret.Tween.get(this.target.bottomButton).to({ bottom: -150 }, 600);
        this.target.dealerImg.alpha = 1;
        egret.Tween.get(this.target.dealerImg).to({ alpha: 0 }, 300).call(this.onCloseAnmComplete, this);
    }

    private removeEnterAnime()
    {
        egret.Tween.removeTweens(this.target.userinfoGroup);
        egret.Tween.removeTweens(this.target.rightMenu);
        egret.Tween.removeTweens(this.target.ranking);
        egret.Tween.removeTweens(this.target.gameButton);
        egret.Tween.removeTweens(this.target.bottomButton);
        egret.Tween.removeTweens(this.target.dealerImg);
    }

    private onEnterAnmComplete()
    {
        
    }

    protected onCloseAnmComplete()
    {
        UIManager.closePanel(this.target);
    }

    public setMoreEnterAnime()
    {
        this.removeMoreAnime();
        this.target.moreGroup.visible = true;
        this.target.moreGroup.alpha = 0;
        this.target.moreGroup.bottom = 0;
        egret.Tween.get(this.target.moreGroup).to({ alpha: 1, bottom: 72 }, 200, egret.Ease.cubicOut);
    }
    public setMoreOutAnime()
    {
        this.removeMoreAnime();
        this.target.moreGroup.alpha = 1;
        this.target.moreGroup.bottom = 72;
        egret.Tween.get(this.target.moreGroup)
            .to({ alpha: 0, bottom: 0 }, 200, egret.Ease.cubicOut)
            .call(() => { this.target.moreGroup.visible = false });
    }
    private removeMoreAnime()
    {
        egret.Tween.removeTweens(this.target.moreGroup);
    }


    public setRankEnterAnime(panelName: string)
    {
        if (panelName == UIModuleName.RankPanel)
        {
            this.removeRankAnime();
            this.target.ranking.left = -86;
            egret.Tween.get(this.target.ranking).to({ left: 0 }, 300, egret.Ease.backOut);
        }
    }
    public setRankOutAnime()
    {
        this.removeRankAnime();
        this.target.ranking.left = 0;
        egret.Tween.get(this.target.ranking).to({ left: -86 }, 300, egret.Ease.backOut);
    }

    private removeRankAnime()
    {
        egret.Tween.removeTweens(this.target.ranking);
    }
}