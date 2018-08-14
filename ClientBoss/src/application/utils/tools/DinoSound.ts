module game {
	/**
	 * 声音类
	 * @author sunboy
	 */
	export class DinoSound {
		private static _isPlaySound:boolean = true;
		//private static _isPlayBgSound:boolean = false;
		//private static _bgSoundChannel:egret.SoundChannel;
		private static _soundChannel:egret.SoundChannel;
		private static _soundVolume:number=1;
		//private static _bgSound:egret.Sound;
		//private static _bgSoundUrl:string;
		private static _func:Function;
		public constructor() {
		}
		////////////////////设置或取得--音效是否播放////////////////////////////
		public static set isPlaySound(value:boolean)
		{
			this._isPlaySound = value;
			if (this._soundChannel != null)this._soundChannel.volume = value?this._soundVolume:0;
		}
		public static get isPlaySound():boolean
		{
			return this._isPlaySound;
		}
		//////////////////////设置或取得--背景音乐是否播放/////////////////////
		/*public static set isPlayBgSound(value:boolean)
		{
			if (this._isPlayBgSound != value)
			{
				this._isPlayBgSound = value;
				if (this._isPlayBgSound) {
					if (this._bgSound != null) {
						this._bgSoundChannel.stop();
						this._bgSoundChannel = this._bgSound.play();
						this._bgSoundChannel.volume = 0.5;
					}else {
						this.playBgSound(this._bgSoundUrl);
					}
				}else {
					if (this._bgSoundChannel != null) {
						this._bgSoundChannel.stop();
					}
				}
			}
		}
		public static get isPlayBgSound():boolean
		{
			return this._isPlayBgSound;
		}
		/////////////////////设置背景音乐地址////////////////////
		public static setBgSoundUrl(url:string):void
		{
			this._bgSoundUrl = url;
			if(this._bgSoundChannel!=null)
			{
				this._bgSoundChannel.stop();
				this._bgSoundChannel = null;
				this._bgSound = null;
			}
			this._isPlayBgSound = false;
		}
		///////////////////////////////////////////////////////////
		private static playBgSound(url:string):void
		{
			if (this._bgSoundUrl != null && this._bgSoundUrl != "") {
				try{
					this._bgSound = new egret.Sound();
					this._bgSound.load(url);
					this._bgSoundChannel = this._bgSound.play(0,0);
					this._bgSoundChannel.volume = 0.5;
				}catch (e) {
					console.log("背景音乐出错");
					return;
				}
				//_bgSoundChannel.addEventListener(Event.SOUND_COMPLETE,SoundCompleteHandler);
			}
			
		}
		private static SoundCompleteHandler(event:Event):void {
            console.log("soundCompleteHandler: " + event);
        }*/
		/////////////////载入音效//////////////////////
		public static playSound(url:string):void
		{
			try{
				if (url.length <= 0)
				{
					return;
				}
				if (this._isPlaySound) {
					var sound:egret.Sound = RES.getRes(url);
					//sound.load(url);
					this._soundChannel = sound.play(0, 1);
					this._soundChannel.volume=this._soundVolume;
					if(this._func!=null)this._soundChannel.addEventListener(egret.Event.COMPLETE, this.sound_copplete,this);
				}
			}catch (e) {
				console.log("声音出错");
			}
		}
		public static set PlaySoundVolume(value:number)
		{
			this._soundVolume = value;
		}
		public static get PlaySoundVolume():number
		{
			return this._soundVolume;
		}
		public static startsound($func:Function,$url:string):void
		{
			this._func = $func;
			this.playSound($url);
		}
		private static sound_copplete(e:Event):void
		{
			if (this._func != null)
			{
				this._func();
				this._func = null;
				this._soundChannel.removeEventListener(egret.Event.COMPLETE, this.sound_copplete,this);
			}
		}
	}
}