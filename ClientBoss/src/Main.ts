//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////


import GameLayer = game.GameLayer;

declare var resUrl;

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        this.addChild(new game.GameLayer());

        RES.setMaxLoadingThread(6);

        egret.lifecycle.onPause = () => {
            //egret.ticker.pause();
            game.leaveTime = new Date().getTime();
            game.SoundManager.hideBgSound();
        };

        egret.lifecycle.onResume = () => {
            //egret.ticker.resume();
            game.leaveTime = null;
            game.SoundManager.showBgSound();
        };

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        
        await this.loadResource();
        game.run();
    }

    private async loadLoding() {
        const loadingView = new game.LoadingUI();
        GameLayer.loadLayer.addChild(loadingView);
    }

    private async loadResource() {
        try {
            // try {
            //     if (typeof (resUrl) != "undefined") {
            //         game.$isWx = false;
            //         await RES.loadConfig(`${resUrl}?v=${Math.random()}`, "resource/");
            //     } else {
            //         game.$isWx = true;
            //         await RES.loadConfig(`default.res.json`, "resource/");
            //     }
            // } catch (e) {
            //     console.log("load config 出错");
            // }
            // console.log(dragonBones.DragonBones.VERSION)
            {
                const remoteUrl = "https://tantanle.giantfun.cn/egret_remote/resource/";
                // const remoteUrl = "https://210.73.214.68/egret_remote/resource/";

            //     egret.ImageLoader.crossOrigin = "anonymous";
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, (e) => { console.log("加载资源成功"); }, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, (e) => { console.log("加载资源出错！", e); }, this);
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, (e) => { console.log("加载资源项出错", e); }, this);
                RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, (e) => { console.log("配置项出错", e); }, this);

                // VL: NOTE: 相同文件不可多次加载
                await RES.loadConfig("default.res.json", "resource/");
                await this.loadLoding();
                try {
                    await RES.loadConfig("default.res.json", remoteUrl);
                } catch (e) {
                    console.warn("加载远端文件失败：", remoteUrl, "default.res.json", e);
                }
            }

            await this.loadTheme();

            await RES.loadGroup("preload", 0);
            if (document && document.getElementById("preloading")) {
                document.getElementById("preloading").style.display = "none";
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }
}
