/**
 * 声音音效管理
 */
class SoundManager
{
	/**
 	* 是否播放背景音乐
 	*/
	private static _bgEnabled: boolean;
	public static get bgEnabled(): boolean
	{
		if (SoundManager._bgEnabled != undefined)
		{
			return SoundManager._bgEnabled;
		}
		return PrefsManager.getBoolean(PrefsManager.Sound_Bg_Enable, true);
	}
	/**
	 * 是否播放背景音乐
	 */
	public static set bgEnabled(value: boolean)
	{
		SoundManager._bgEnabled = value;
		PrefsManager.setBoolean(PrefsManager.Sound_Bg_Enable, value);
		SoundManager.setBgMusicPlay();
	}
	/**
	 * 是否播放音效
	 */
	private static _effectEnabled: boolean;
	public static get effectEnabled(): boolean
	{
		if (SoundManager._effectEnabled != undefined)
		{
			return SoundManager._effectEnabled;
		}
		return PrefsManager.getBoolean(PrefsManager.Sound_Effect_Enable, true);
	}
	/**
	 * 音效值
	 */
	public static set effectEnabled(value: boolean)
	{
		SoundManager._effectEnabled = value;
		PrefsManager.setBoolean(PrefsManager.Sound_Effect_Enable, value);
	}

	/**
	 * 背景音乐声音值
	 */
	private static _bgVolume: number;
	public static get bgVolume(): number
	{
		if (SoundManager._bgVolume != undefined)
		{
			return SoundManager._bgVolume;
		}
		return PrefsManager.getNumber(PrefsManager.Sound_Bg_Volume, 0.7, true);
	}
	/**
	 * 音效值
	 */
	public static set bgVolume(value: number)
	{
		SoundManager._bgVolume = value;
	}

	private static _effectVolume: number;
	public static get effectVolume(): number
	{
		if (SoundManager._effectVolume != undefined)
		{
			return SoundManager._effectVolume;
		}
		return PrefsManager.getNumber(PrefsManager.Sound_Effect_Volume, 1, true);
	}
	/**
 	 * 音效值
     */
	public static set effectVolume(value: number)
	{
		SoundManager._effectVolume = value;
	}

	private static _lastBgSoundChannel: egret.SoundChannel;
	private static _lastBgSound: egret.Sound;
	private static _playTimes: number = 1;

	/**
	 * 声音加载
	 */
	public static soundCacheList: qin.Dictionary<string, SoundLoaderDecorator> = new qin.Dictionary<string, SoundLoaderDecorator>();
	/**
	 * 播放背景音乐
	 */
	public static playBgMusic()
	{
		if (!SoundManager.bgEnabled)
		{
			return;
		}
		SoundManager.stopBgMusic();
		let type: SceneType = SceneManager.sceneType;
		if (type == SceneType.None || type == SceneType.Login)
		{
			type = SceneType.Hall;
		}
		SoundManager._lastPos = 0;
		let url: string = ResPrefixPathName.Sound + MusicResEnum.getBgSoundRes(type) + ResSuffixName.MP3;

		let loader: SoundLoaderDecorator = SoundManager.soundCacheList.getValue(url);
		if (loader)
		{
			if (loader.sound)
			{
				SoundManager.switchBgSound(loader.sound);
			}
		}
		else
		{
			loader = SoundLoaderDecorator.get(url, egret.Sound.MUSIC, qin.Delegate.getOut(SoundManager.switchBgSound, this), false);
			loader.load();
		}
	}
	private static switchBgSound(sound: egret.Sound)
	{
		let soundChannel: egret.SoundChannel = sound.play(0, SoundManager._playTimes);
		soundChannel.volume = SoundManager.bgVolume;

		SoundManager._lastBgSound = sound;
		SoundManager._lastBgSoundChannel = soundChannel;
		soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
	}
	public static changeBgMusic(volume: number)
	{
		if (SoundManager._lastBgSoundChannel && volume != undefined && SoundManager.bgEnabled)
		{
			SoundManager._lastBgSoundChannel.volume = volume;
		}
	}
	private static _lastPos: number = 0;
	/**
	 * 设置音乐记忆播放
	 */
	public static setBgMusicPlay()
	{
		if (SoundManager._lastBgSoundChannel && SoundManager._lastBgSound)
		{
			if (!SoundManager._bgEnabled)
			{
				SoundManager._lastPos = SoundManager._lastBgSoundChannel.position;
			}
			SoundManager.stopBgMusic();
			if (SoundManager._bgEnabled)
			{
				SoundManager._lastBgSoundChannel = SoundManager._lastBgSound.play(SoundManager._lastPos, SoundManager._playTimes);
				SoundManager._lastBgSoundChannel.volume = SoundManager.bgVolume;
				SoundManager._lastBgSoundChannel.addEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
			}
		}
		else
		{
			if (SoundManager._bgEnabled)
			{
				SoundManager.playBgMusic();
			}
		}
	}
	/**
	 * 声音播放完毕
	 */
	private static onSoundPlayComplete(event: egret.Event)
	{
		let channel: egret.SoundChannel = event.target as egret.SoundChannel;
		channel.removeEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
		SoundManager.playBgMusic(); //循环播放
	}

	/**
	 * 停止背景音乐
	 */
	public static stopBgMusic()
	{
		if (SoundManager._lastBgSoundChannel)
		{
			SoundManager._lastBgSoundChannel.stop();
			SoundManager._lastBgSoundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
		}
	}
	private static _reload: qin.Delegate;
	/**
	 * 播放音效
	 */
	public static playEffect(action: string, sex?: number, pai?: number)
	{
		if (!SoundManager.effectEnabled)
		{
			return;
		}
		if (!sex)
		{
			if (UserManager.userInfo && UserManager.userInfo.sex)
			{
				sex = UserManager.userInfo.sex;
			}
			else
			{
				sex = Sex.Male;
			}
		}
		let url: string = MusicDefined.GetInstance().getSexMusicDefinition(sex, action, pai);
		if (!url)
		{
			qin.Console.logError("获取音效地址异常！" + "sex:" + sex + "action:" + action + "pai:" + pai);
			return;
		}
		url = ResPrefixPathName.Sound + url;
		let loader: SoundLoaderDecorator = SoundManager.soundCacheList.getValue(url);
		if (loader)
		{
			if (loader.sound)
			{
				SoundManager.effectLoadComplete(loader.sound);
			}
		}
		else
		{
			loader = SoundLoaderDecorator.get(url, egret.Sound.EFFECT, qin.Delegate.getOut(SoundManager.effectLoadComplete, this), false);
			loader.load();
		}
	}
	private static _effectChannelList: Array<egret.SoundChannel> = new Array<egret.SoundChannel>();
	private static effectLoadComplete(sound: egret.Sound)
	{
		let soundChannel: egret.SoundChannel = sound.play(0, 1);
		SoundManager._effectChannelList.push(soundChannel);
		soundChannel.volume = SoundManager.effectVolume;
		soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onEffectPlayComplete, this);
	}
	private static onEffectPlayComplete(event: egret.Event)
	{
		let channel: egret.SoundChannel = event.currentTarget as egret.SoundChannel;
		channel.stop();
		channel.removeEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onEffectPlayComplete, this);
		qin.ArrayUtil.RemoveItem(channel, SoundManager._effectChannelList);
		SoundManager.invokeReload();
	}
	/**
	 * 播放按钮音效
	 */
	public static playButtonEffect(target: any)
	{
		if (target instanceof eui.Button) //播放按钮音效
		{
			SoundManager.playEffect(MusicAction.buttonClick);
		}
	}
	public static playWinSoundEffect(type: CardType)
	{
		switch (type)
		{
			case CardType.Fullhouse:
			case CardType.FourOfAKind:
			case CardType.StraightFlush:
			case CardType.RoyalFlush:
				SoundManager.playEffect(MusicAction.bigWin);
				break;
			default:
				SoundManager.playEffect(MusicAction.win);
				break;
		}
	}
	public static playCardTypeSoundEffect(type: CardType)
	{
		switch (type)
		{
			case CardType.Fullhouse:
				SoundManager.playEffect(MusicAction.cardtype_hulu);
				break;
			case CardType.FourOfAKind:
				SoundManager.playEffect(MusicAction.cardtype_sitiao);
				break;
			case CardType.StraightFlush:
				SoundManager.playEffect(MusicAction.cardtype_tonghuashun);
				break;
			case CardType.RoyalFlush:
				SoundManager.playEffect(MusicAction.cardtype_huangjiatonghua);
				break;
		}
	}
	private static _tmpReload: qin.Delegate;
	public static clear(reload: qin.Delegate)
	{
		UIManager.showPanel(UIModuleName.LoadingSwitchPanel, false);
		SoundManager._tmpReload = reload;
		if (URLLoader.isLoading == true)
		{
			qin.Tick.AddSecondsInvoke(SoundManager.tryReload, this);
			qin.Tick.AddTimeoutInvoke(() =>
			{
				URLLoader.disposeLoader();
				SoundManager.tryReload(); //网络请求超时15S自动刷新
			}, 15000, this);
		}
		else
		{
			SoundManager.tryReload();
		}
	}
	private static tryReload()
	{
		if (URLLoader.isLoading == false)
		{
			qin.Tick.RemoveSecondsInvoke(SoundManager.tryReload, this);
			SoundManager._bgEnabled = false;
			SoundManager._effectEnabled = false;
			SoundManager._reload = SoundManager._tmpReload;
			SoundManager.stopBgMusic();
			qin.Tick.AddTimeoutInvoke(() =>
			{
				SoundManager.invokeReload();
			}, 1000, this); //兼容异常处理
		}
	}
	private static invokeReload()
	{
		if (SoundManager._reload)
		{
			let index: number = 0;
			for (let channel of SoundManager._effectChannelList) //清空所有正在播放的音效
			{
				channel.stop();
				channel.removeEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onEffectPlayComplete, this);
			}
			SoundManager._effectChannelList.length = 0;
			SoundManager._reload.invoke();
			qin.Delegate.putIn(SoundManager._reload);
			SoundManager._reload = null;
		}
	}
}
/**
 * 声音载入
 */
class SoundLoaderDecorator
{
	public static get(url: string, type: string, completeCallBack?: qin.Delegate, isAutoPlay: boolean = true): SoundLoaderDecorator
	{
		let loader: SoundLoaderDecorator = new SoundLoaderDecorator();
		loader.url = url;
		loader._isAutoPlay = isAutoPlay;
		loader._completeCallBack = completeCallBack;
		return loader;
	}
	/**
 	* 声音文件
 	*/
	public sound: egret.Sound;
	/**
	 * 路径
	 */
	public url: string;
	/**
	 * 下载完成回调
	 */
	private _completeCallBack: qin.Delegate;
	/**
	 * 下载完成是否自动播放
	 */
	private _isAutoPlay: boolean;
	/**
	 * 载入
	 */
	public async load()
	{
		let loader: SoundLoaderDecorator = SoundManager.soundCacheList.getValue(this.url);
		if (loader)
		{
			return;
		}
		SoundManager.soundCacheList.add(this.url, this);
		let data = await RES.getResAsync(this.url);
		this.loadComplete(data);
	}
	private loadComplete(sound: egret.Sound)
	{
		if (!sound)
		{
			qin.Console.logError("音乐加载异常！" + this.url);
			return;
		}
		this.sound = sound;

		if (this._isAutoPlay)
		{
			let channel: egret.SoundChannel = sound.play(0, 1);
			channel.volume = SoundManager.effectVolume;
		}

		if (this._completeCallBack)
		{
			this._completeCallBack.invoke(sound);
			qin.Delegate.putIn(this._completeCallBack);
		}
	}
}