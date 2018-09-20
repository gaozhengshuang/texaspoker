class GameHallButtonAnime extends BaseGameHallAnime
{
    public onEnable()
    {
        super.onEnable();
        this.setButtonAnime(this.target.pokerBtn);
        this.setButtonAnime(this.target.matchBtn);
        this.setButtonAnime(this.target.hundredBattle);
        this.setButtonAnime(this.target.morePlayBtn);
    }
    public onDisable()
    {
        super.onDisable();
    }

    private setButtonAnime(button: egret.DisplayObject)
    {
        this.removeButtonAnime(button);
        switch (button)
        {
            case this.target.pokerBtn:
                this.setStarAnime(button["star0"], 0);
                this.setStarAnime(button["star1"], 5000);
                this.setHighlightAnime(button["highLight"], 3600);
                this.setButtonImgAnime(button["animeImg"], 0);
                break;
            case this.target.hundredBattle:
                this.setStarAnime(button["star0"], 2000);
                this.setStarAnime(button["star1"], 7000);
                this.setHighlightAnime(button["highLight"], 6000);
                this.setButtonImgAnime(button["animeImg"], 2400);
                break;
            case this.target.matchBtn:
                this.setStarAnime(button["star0"], 4000);
                this.setStarAnime(button["star1"], 1000);
                this.setHighlightAnime(button["highLight"], 1200);
                this.setButtonImgAnime(button["animeImg"], 4800);
                break;
            case this.target.morePlayBtn:
                for (let i: number = 0; i < 6; i++)
                {
                    let obj = button["star" + i];
                    if (obj)
                    {
                        this.setMorePlayAnime(obj, i * 4000);
                    }
                }
                break;
        }
    }

    private setStarAnime(star: egret.DisplayObject, wait: number)
    {
        egret.Tween.get(star, { loop: true })
            .set({ scaleX: 0.5, scaleY: 0.5, rotation: 0 })
            .wait(wait).to({ scaleX: 1.5, scaleY: 1.5, rotation: 180 }, 2000)
            .to({ scaleX: 0.5, scaleY: 0.5, rotation: 360 }, 2000)
            .wait(8000 - wait);
    }

    private setHighlightAnime(highLight: egret.DisplayObject, wait: number)
    {
        egret.Tween.get(highLight, { loop: true })
            .set({ alpha: 0, rotation: 30 })
            .wait(wait).to({ alpha: 1, rotation: 90 }, 500)
            .to({ alpha: 0, rotation: 180 }, 500)
            .wait(6000 - wait);
    }

    private setButtonImgAnime(img: egret.DisplayObject, wait: number)
    {
        egret.Tween.get(img, { loop: true })
            .set({ alpha: 0, scaleX: 1, scaleY: 1 })
            .wait(wait).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200)
            .to({ alpha: 0, scaleX: 1.25, scaleY: 1.25 }, 800)
            .wait(6000 - wait);
    }

    private removeButtonAnime(button: egret.DisplayObject)
    {
        for (let i: number = 0; i < 6; i++)
        {
            if (button["star" + i])
            {
                egret.Tween.removeTweens(button["star" + i]);
            }
        }
        if (button["highLight"])
        {
            egret.Tween.removeTweens(button["highLight"]);
        }
        if (button["animeImg"])
        {
            egret.Tween.removeTweens(button["animeImg"]);
        }
    }

    private setMorePlayAnime(obj: egret.DisplayObject, wait: number)
    {
        egret.Tween.get(obj, { loop: true })
            .set({ scaleX: 0, scaleY: 0, rotation: 0 })
            .wait(wait).to({ scaleX: 2, scaleY: 2, rotation: 180 }, 2000)
            .to({ scaleX: 0, scaleY: 0, rotation: 360 }, 2000)
            .wait(24000 - wait);
    }
}