class GamblingPanelAllinAnime
{
    private panel: GamblingPanel;
    private readonly _ceilTime: number = 40;
    /**
    * allin特效
     */
    private _allinEffect0: particle.GravityParticleSystem;
    private _allinEffect1: particle.GravityParticleSystem;

    public constructor(panel: GamblingPanel)
    {
        this.panel = panel;
    }

    public playAllinAnime()
    {
        this.removeAllinAnime(this.panel.allInAnimeGroup);
        this.panel.ordinaryRoomGroup.addChild(this.panel.allInAnimeGroup);
        this.setAllinAnime(this.panel.img0, 0, 1, this.setAllinEffect0, this);
        this.setAllinAnime(this.panel.img1, 4, 0.85);
        this.setAllinAnime(this.panel.img2, 8, 0.7);
        this.setAllinAnime(this.panel.img3, 12, 0.55, this.setAllinEffect1, this);
        this.setAllinAnime(this.panel.img4, 16, 0.4, this.onEffectOver, this, 1000);
    }

    private setAllinAnime(obj: egret.DisplayObject, wait: number, speed: number, call?: Function, thisObj?: Object, callwait = 0)
    {
        let tween: egret.Tween = egret.Tween.get(obj);
        tween.set({ scaleX: 0, scaleY: 0, alpha: 0 })
            .wait(wait * this._ceilTime).to({ scaleX: 0.7, scaleY: 0.7, alpha: 0.33 }, speed * this._ceilTime)
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 2 * speed * this._ceilTime)
            .to({ scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 3 * speed * this._ceilTime)
            .to({ scaleX: 1.2, scaleY: 1.2, alpha: 1 }, speed * this._ceilTime)
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 2 * speed * this._ceilTime).wait(callwait).call(() =>
            {
                if (call)
                {
                    game.FuncUtil.invoke(call, thisObj);
                }
            });
    }
    private removeAllinAnime(group: eui.Group)
    {
        for (let i: number = 0; i < group.numChildren; i++)
        {
            if (group.getChildAt(i))
            {
                egret.Tween.removeTweens(group.getChildAt(i));
            }
        }
    }

    private setAllinEffect0()
    {
        this.setAllinEffect(this._allinEffect0, AnimationType.Allin0, this.panel.allInAnimeGroup);
    }
    private setAllinEffect1()
    {
        this.setAllinEffect(this._allinEffect1, AnimationType.Allin1, this.panel.allInAnimeGroup);
    }
    private onEffectOver()
    {
        this.hideWinEffect(this._allinEffect0);
        this.hideWinEffect(this._allinEffect1);
        if (this.panel.allInAnimeGroup.parent)
        {
            this.panel.allInAnimeGroup.parent.removeChild(this.panel.allInAnimeGroup);
        }
    }
	/**
	 * 显示allin特效
	 */
    private setAllinEffect(effect: particle.GravityParticleSystem, type: AnimationType, parent: eui.Group)
    {
        AnimationFactory.getParticleEffect(type, parent, (ptc) =>
        {
            effect = ptc;
        });
    }
	/**
	 * 隐藏allin特效
 	*/
    private hideWinEffect(effect: particle.GravityParticleSystem)
    {
        if (effect && effect.parent)
        {
            effect.stop();
            effect.parent.removeChild(effect);
        }
    }

}