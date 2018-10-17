
/**
 * 资源配置文件
 */
declare var resJsonUrl;

class Main extends eui.UILayer
{
    protected createChildren(): void
    {
        super.createChildren();
        if (RELEASE)
        {
            egret.Logger.logLevel = egret.Logger.ERROR;
        }
        game.Console.enabled = DEBUG || URLOption.getBoolean(URLOption.Log) || game.System.isLocalhost;
        // game.Console.enabled = false;
        //
        this.stage.setContentSize(GameSetting.StageWidth, GameSetting.StageHeight);
        if (egret.Capabilities.isMobile == false && game.System.isWeb && game.System.isEditor == false)
        {
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            this.stage.orientation = egret.OrientationMode.AUTO;
        }
        if (game.RuntimeTypeName.getCurrentName() == game.RuntimeTypeName.WindowsPhone || game.RuntimeTypeName.getCurrentName() == game.RuntimeTypeName.WindowsPC)
        {
            egret.TextField.default_fontFamily = 'Microsoft YaHei';
        }
        RES.setMaxLoadingThread(game.System.isMicro ? 8 : 4);
        I18n.initSystem(PrefsManager.getValue(PrefsManager.Language), OperatePlatform.getLangs());
        //注入自定义的素材解析器
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //初始化Resource资源加载库
        this.startLoadConfig();
    }
    private async startLoadConfig()
    {
        if (game.System.isWeb || game.System.isMicro)
        {
            await RES.loadConfig(resJsonUrl, 'resource/');
        }
        else
        {
            await RES.loadConfig(PathName.Default_res_json, 'resource/');
        }
        this.onConfigComplete();
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     */
    private async onConfigComplete()
    {
        if (I18n.isDefault)
        {
            this.loadAssetText();
        }
        else
        {
            if (DEBUG)
            {
                await RES.getResByUrl(PathName.LangDirectory + I18n.lang + AssetsSuffixName.JSON, this.onLangComplete, this);
            }
            else
            {
                let langName = ResPrefixPathName.Lang + I18n.lang + ResSuffixName.ZIP;
                // langName = ResPrefixPathName.Lang + "zh-tw" + ResSuffixName.ZIP;
                await RES.getResAsync(langName, this.onLangZipComplete, this);
            }
        }
    }
    private onLangComplete(data: any)
    {
        if (data)
        {
            I18n.initMap(data);
        }
        this.loadAssetText();
    }
    private async onLangZipComplete(data: any)
    {
        JSZip.loadAsync(data).then(function (zip)
        {
            return zip.file(I18n.lang + ".json").async("text");
        }).then(function (text)
        {
            this.onLangComplete(text);
        });
    }
    private async loadAssetText()
    {
        let name = I18n.isDefault ? ResGroupName.Text : ResGroupName.Text + game.StringConstants.UnderLine + I18n.lang;
        await RES.loadGroup(name);
        await this.loadTheme();
        await RES.loadGroup(ResGroupName.Login);
        egret.ImageLoader.crossOrigin = "anonymous"; //本机跨域访问问题
        this.createScene();
    }
    private async loadTheme()
    {
        let thmUrl: string = '';
        if (game.System.isWeb || game.System.isMicro)
        {
            thmUrl = WebConfig.resUrl + WebConfig.defaultThmJson;
        }
        else
        {
            thmUrl = PathName.Default_thm_json;
        }
        return new Promise((resolve, reject) =>
        {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme(thmUrl, this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () =>
            {
                resolve();
            }, this);

        });
    }

    private createScene()
    {
        this.setLoadingText('正在进入游戏...');
        this.configInitialize();
        GameManager.initialize(this.stage, this);
        UIManager.initialize(this.stage);
        game.Tick.initialize(this.stage);
        SceneManager.initialize();
        ChannelManager.OnInitComplete.addListener(this.OnChannelInitComplete, this);
        ChannelManager.initialize();
    }
    private configInitialize()
    {
        TextDefined.GetInstance().initialize();
        ActivityDefined.GetInstance().initialize();
        MorePlayDefined.GetInstance().initialize();
    }
    private OnChannelInitComplete()
    {
        this.closeLoading();
        ChannelManager.OnInitComplete.removeListener(this.OnChannelInitComplete, this);
        SceneManager.switcScene(SceneType.Login);
    }
    private setLoadingText(text: string): void
    {
        if (game.System.isWeb)
        {
            WebLoading.setText(text);
        }
    }
    private closeLoading(): void
    {
        if (game.System.isWeb)
        {
            WebLoading.hide();
        }
        else if (game.System.isMicro)
        {
            //关闭启动页,egret微端提供的方法
            if (window['closeLoadingView'])
            {
                window['closeLoadingView']();
            }
        }
    }
}