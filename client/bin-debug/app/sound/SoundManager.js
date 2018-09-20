var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 声音音效管理
 */
var SoundManager = (function () {
    function SoundManager() {
    }
    Object.defineProperty(SoundManager, "bgEnabled", {
        get: function () {
            if (SoundManager._bgEnabled != undefined) {
                return SoundManager._bgEnabled;
            }
            return PrefsManager.getBoolean(PrefsManager.Sound_Bg_Enable, true);
        },
        /**
         * 是否播放背景音乐
         */
        set: function (value) {
            SoundManager._bgEnabled = value;
            PrefsManager.setBoolean(PrefsManager.Sound_Bg_Enable, value);
            SoundManager.setBgMusicPlay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager, "effectEnabled", {
        get: function () {
            if (SoundManager._effectEnabled != undefined) {
                return SoundManager._effectEnabled;
            }
            return PrefsManager.getBoolean(PrefsManager.Sound_Effect_Enable, true);
        },
        /**
         * 音效值
         */
        set: function (value) {
            SoundManager._effectEnabled = value;
            PrefsManager.setBoolean(PrefsManager.Sound_Effect_Enable, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager, "bgVolume", {
        get: function () {
            if (SoundManager._bgVolume != undefined) {
                return SoundManager._bgVolume;
            }
            return PrefsManager.getNumber(PrefsManager.Sound_Bg_Volume, 0.7, true);
        },
        /**
         * 音效值
         */
        set: function (value) {
            SoundManager._bgVolume = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager, "effectVolume", {
        get: function () {
            if (SoundManager._effectVolume != undefined) {
                return SoundManager._effectVolume;
            }
            return PrefsManager.getNumber(PrefsManager.Sound_Effect_Volume, 1, true);
        },
        /**
         * 音效值
         */
        set: function (value) {
            SoundManager._effectVolume = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 播放背景音乐
     */
    SoundManager.playBgMusic = function () {
        if (!SoundManager.bgEnabled) {
            return;
        }
        SoundManager.stopBgMusic();
        var type = SceneManager.sceneType;
        if (type == SceneType.None || type == SceneType.Login) {
            type = SceneType.Hall;
        }
        SoundManager._lastPos = 0;
        var url = ResPrefixPathName.Sound + MusicResEnum.getBgSoundRes(type) + ResSuffixName.MP3;
        var loader = SoundManager.soundCacheList.getValue(url);
        if (loader) {
            if (loader.sound) {
                SoundManager.switchBgSound(loader.sound);
            }
        }
        else {
            loader = SoundLoaderDecorator.get(url, egret.Sound.MUSIC, qin.Delegate.getOut(SoundManager.switchBgSound, this), false);
            loader.load();
        }
    };
    SoundManager.switchBgSound = function (sound) {
        var soundChannel = sound.play(0, SoundManager._playTimes);
        soundChannel.volume = SoundManager.bgVolume;
        SoundManager._lastBgSound = sound;
        SoundManager._lastBgSoundChannel = soundChannel;
        soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
    };
    SoundManager.changeBgMusic = function (volume) {
        if (SoundManager._lastBgSoundChannel && volume != undefined && SoundManager.bgEnabled) {
            SoundManager._lastBgSoundChannel.volume = volume;
        }
    };
    /**
     * 设置音乐记忆播放
     */
    SoundManager.setBgMusicPlay = function () {
        if (SoundManager._lastBgSoundChannel && SoundManager._lastBgSound) {
            if (!SoundManager._bgEnabled) {
                SoundManager._lastPos = SoundManager._lastBgSoundChannel.position;
            }
            SoundManager.stopBgMusic();
            if (SoundManager._bgEnabled) {
                SoundManager._lastBgSoundChannel = SoundManager._lastBgSound.play(SoundManager._lastPos, SoundManager._playTimes);
                SoundManager._lastBgSoundChannel.volume = SoundManager.bgVolume;
                SoundManager._lastBgSoundChannel.addEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
            }
        }
        else {
            if (SoundManager._bgEnabled) {
                SoundManager.playBgMusic();
            }
        }
    };
    /**
     * 声音播放完毕
     */
    SoundManager.onSoundPlayComplete = function (event) {
        var channel = event.target;
        channel.removeEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
        SoundManager.playBgMusic(); //循环播放
    };
    /**
     * 停止背景音乐
     */
    SoundManager.stopBgMusic = function () {
        if (SoundManager._lastBgSoundChannel) {
            SoundManager._lastBgSoundChannel.stop();
            SoundManager._lastBgSoundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
        }
    };
    /**
     * 播放音效
     */
    SoundManager.playEffect = function (action, sex, pai) {
        if (!SoundManager.effectEnabled) {
            return;
        }
        if (!sex) {
            if (UserManager.userInfo && UserManager.userInfo.sex) {
                sex = UserManager.userInfo.sex;
            }
            else {
                sex = Sex.Male;
            }
        }
        var url = MusicDefined.GetInstance().getSexMusicDefinition(sex, action, pai);
        if (!url) {
            qin.Console.logError("获取音效地址异常！" + "sex:" + sex + "action:" + action + "pai:" + pai);
            return;
        }
        url = ResPrefixPathName.Sound + url;
        var loader = SoundManager.soundCacheList.getValue(url);
        if (loader) {
            if (loader.sound) {
                SoundManager.effectLoadComplete(loader.sound);
            }
        }
        else {
            loader = SoundLoaderDecorator.get(url, egret.Sound.EFFECT, qin.Delegate.getOut(SoundManager.effectLoadComplete, this), false);
            loader.load();
        }
    };
    SoundManager.effectLoadComplete = function (sound) {
        var soundChannel = sound.play(0, 1);
        SoundManager._effectChannelList.push(soundChannel);
        soundChannel.volume = SoundManager.effectVolume;
        soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onEffectPlayComplete, this);
    };
    SoundManager.onEffectPlayComplete = function (event) {
        var channel = event.currentTarget;
        channel.stop();
        channel.removeEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onEffectPlayComplete, this);
        qin.ArrayUtil.RemoveItem(channel, SoundManager._effectChannelList);
        SoundManager.invokeReload();
    };
    /**
     * 播放按钮音效
     */
    SoundManager.playButtonEffect = function (target) {
        if (target instanceof eui.Button) {
            SoundManager.playEffect(MusicAction.buttonClick);
        }
    };
    SoundManager.playWinSoundEffect = function (type) {
        switch (type) {
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
    };
    SoundManager.playCardTypeSoundEffect = function (type) {
        switch (type) {
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
    };
    SoundManager.clear = function (reload) {
        UIManager.showPanel(UIModuleName.LoadingSwitchPanel, false);
        SoundManager._tmpReload = reload;
        if (URLLoader.isLoading == true) {
            qin.Tick.AddSecondsInvoke(SoundManager.tryReload, this);
            qin.Tick.AddTimeoutInvoke(function () {
                URLLoader.disposeLoader();
                SoundManager.tryReload(); //网络请求超时15S自动刷新
            }, 15000, this);
        }
        else {
            SoundManager.tryReload();
        }
    };
    SoundManager.tryReload = function () {
        if (URLLoader.isLoading == false) {
            qin.Tick.RemoveSecondsInvoke(SoundManager.tryReload, this);
            SoundManager._bgEnabled = false;
            SoundManager._effectEnabled = false;
            SoundManager._reload = SoundManager._tmpReload;
            SoundManager.stopBgMusic();
            qin.Tick.AddTimeoutInvoke(function () {
                SoundManager.invokeReload();
            }, 1000, this); //兼容异常处理
        }
    };
    SoundManager.invokeReload = function () {
        if (SoundManager._reload) {
            var index = 0;
            for (var _i = 0, _a = SoundManager._effectChannelList; _i < _a.length; _i++) {
                var channel = _a[_i];
                channel.stop();
                channel.removeEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onEffectPlayComplete, this);
            }
            SoundManager._effectChannelList.length = 0;
            SoundManager._reload.invoke();
            qin.Delegate.putIn(SoundManager._reload);
            SoundManager._reload = null;
        }
    };
    SoundManager._playTimes = 1;
    /**
     * 声音加载
     */
    SoundManager.soundCacheList = new qin.Dictionary();
    SoundManager._lastPos = 0;
    SoundManager._effectChannelList = new Array();
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
/**
 * 声音载入
 */
var SoundLoaderDecorator = (function () {
    function SoundLoaderDecorator() {
    }
    SoundLoaderDecorator.get = function (url, type, completeCallBack, isAutoPlay) {
        if (isAutoPlay === void 0) { isAutoPlay = true; }
        var loader = new SoundLoaderDecorator();
        loader.url = url;
        loader._isAutoPlay = isAutoPlay;
        loader._completeCallBack = completeCallBack;
        return loader;
    };
    /**
     * 载入
     */
    SoundLoaderDecorator.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loader, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loader = SoundManager.soundCacheList.getValue(this.url);
                        if (loader) {
                            return [2 /*return*/];
                        }
                        SoundManager.soundCacheList.add(this.url, this);
                        return [4 /*yield*/, RES.getResAsync(this.url)];
                    case 1:
                        data = _a.sent();
                        this.loadComplete(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    SoundLoaderDecorator.prototype.loadComplete = function (sound) {
        if (!sound) {
            qin.Console.logError("音乐加载异常！" + this.url);
            return;
        }
        this.sound = sound;
        if (this._isAutoPlay) {
            var channel = sound.play(0, 1);
            channel.volume = SoundManager.effectVolume;
        }
        if (this._completeCallBack) {
            this._completeCallBack.invoke(sound);
            qin.Delegate.putIn(this._completeCallBack);
        }
    };
    return SoundLoaderDecorator;
}());
__reflect(SoundLoaderDecorator.prototype, "SoundLoaderDecorator");
//# sourceMappingURL=SoundManager.js.map