/**
 * web版
 */
class Channel_web extends ChannelBase
{
	private _isWxConfig: boolean = false;

	private setWxConfig(callback: Function, debug: boolean = false): void
	{
		if (window['wx'])
		{
			if (this._isWxConfig == false)
			{
				let dUrl: string = ProjectDefined.getWxTicketUrl() + '?url=' + encodeURIComponent(window.location.href);
				URLLoader.downloadContent(dUrl, this, function (data: string)
				{
					let obj: Object = JSON.parse(data);
					if (obj['errcode'] && obj['errcode'] != 0)
					{
						UIManager.showFloatTips(obj['errmsg']);
					}
					else
					{
						obj['debug'] = debug;
						obj['jsApiList'] = ['chooseImage', 'uploadImage', 'downloadImage', 'getLocalImgData', 'onMenuShareTimeline', 'onMenuShareAppMessage'];
						obj["nonceStr"] = obj["noncestr"];

						delete obj["noncestr"];
						window['wx'].config(obj);
						window['wx'].ready(() =>
						{
							this._isWxConfig = true;
							callback();
						});
						window['wx'].error((res) =>
						{
							let resStr: string = JSON.stringify(res);
							UIManager.showFloatTips(resStr);
						});
					}
				}, null);
			}
			else
			{
				callback();
			}
		}
		else
		{
			AlertManager.showAlertByString('微信支付接口不存在');
		}
	}
	public Login(loginType: string, isAutoLogin: boolean)
	{
		if (loginType == ChannelLoginType.Account || ChannelManager.loginType == ChannelLoginType.IntranetAccount)
		{
			this.accountLogin(isAutoLogin);
		}
		else if (loginType == ChannelLoginType.Weixin)
		{
			//微信登录
			this.weixinLogin();
		}
		else
		{
			UIManager.showFloatTips("登录类型错误");
			ChannelManager.OnLoginFailed.dispatch();
		}
	}
	private accountLogin(isAutoLogin: boolean): void
	{
		let account: string = PrefsManager.getValue(PrefsManager.Login_Account);
		let password: string = PrefsManager.getValue(PrefsManager.Login_Password);
		if (isAutoLogin && account && password)
		{
			ChannelManager.DispatchAccountLoginSucceed(account, password);
		}
		else
		{
			if (!UIManager.isShowPanel(UIModuleName.LoginLocalPanel))
			{
				UIManager.showPanel(UIModuleName.LoginLocalPanel);
			}
		}
	}
	private weixinLogin(): void
	{
		let token: string = WebConfig.wxRefreshToken;
		if (token)
		{
			ChannelManager.OnTokenLoginSucceed.dispatch(WebConfig.wxAuthorizeType + '###2###' + token);
		}
		else if (game.System.isWeChat == false)
		{
			token = PrefsManager.getLoginToken();
			if (PrefsManager.getValue(PrefsManager.Login_LoginType) == ChannelLoginType.Weixin && token)
			{
				ChannelManager.OnTokenLoginSucceed.dispatch(WxAuthorizeType.Web + '###2###' + token);
			}
			else
			{
				//跳转到微信二维码登录
				let url: string = ProjectDefined.getWxQrconnectUrl();
				window.location.href = url + '?return_url=' + encodeURIComponent(window.location.href);
			}
		}
		else
		{
			AlertManager.showAlertByString('微信授权token为空');
		}
	}
	public PaySend(payState: number, awardId: number, serverId: number, orderId: string, price: number, productName: string)
	{
		AwardManager.Exchange(awardId, 1, true);//直接兑换 move todo
		return;
		if (VersionManager.isServerTest && (ChannelManager.loginType == ChannelLoginType.Account || ChannelManager.loginType == ChannelLoginType.IntranetAccount))
		{
			AwardManager.Exchange(awardId, 1, false);//直接兑换
		}
		else if (game.System.isWeChat)
		{
			//微信里打开使用jsapi支付
			let openId: string = WebConfig.wxOpenId;
			if (openId)
			{
				ChannelUtil.wxJsapiPay(openId, serverId, price, productName, awardId);
			}
			else
			{
				AlertManager.showAlertByString('微信授权openid为空');
			}
		}
		else
		{
			ChannelUtil.iframeWebPay(serverId, orderId, price, productName, awardId);
		}
	}

	public share(type: string, title: string, message: string, inviteCode?: string)
	{
		if (game.System.isWeChat)
		{
			this.setWxConfig(() =>
			{
				let url: string = ProjectDefined.getShareWebUrl(GameSetting.AppId, inviteCode);
				let imgUrl: string = ProjectDefined.getWebAppRootUrl(GameSetting.AppId) + "/" + BundleManager.getAppIconPng();
				UIManager.showPanel(UIModuleName.ShareGamePromptPanel);
				window['wx'].onMenuShareTimeline({
					title: title,
					link: url,
					imgUrl: imgUrl,
					success: this.onShareTimeLineSuccess,
					fail: this.onShareFail
				});
				window['wx'].onMenuShareAppMessage({
					title: title,
					desc: message,
					link: url,
					imgUrl: imgUrl,
					success: this.onShareMessageSuccess,
					fail: this.onShareFail
				});
			}, false);
		}
		else
		{
			UIManager.showFloatTips('当前打开方式不支持分享，请在微信里打开或使用App版本');
		}
	}
	private onShareTimeLineSuccess()
	{
		ChannelManager.OnShareSucceed.dispatch(ChannelShareType.WxTimeLine);
		UIManager.closePanel(UIModuleName.ShareGamePromptPanel);
	}
	private onShareMessageSuccess()
	{
		ChannelManager.OnShareSucceed.dispatch(ChannelShareType.WxMessage);
		UIManager.closePanel(UIModuleName.ShareGamePromptPanel);
	}
	private onShareFail(res: any)
	{
		UIManager.closePanel(UIModuleName.ShareGamePromptPanel);
		UIManager.showFloatTips(JSON.stringify(res));
	}
	public imageSelect(size: number, quality: number): void
	{
		if (game.System.isWeChat)
		{
			this.setWxConfig(() =>
			{
				window['wx'].chooseImage({
					count: 1,
					success: (res) =>
					{
						this.upload(res);
					}
				});
			});
		}
		else
		{
			game.WebImageSelect.browse(this, function (data: string)
			{
				ChannelManager.OnImageSelect.dispatch({ type: HeadUploadSystemType.web, data: data });
			}, function (msg: string)
				{
					AlertManager.showAlertByString(msg);
				});
		}
	}
	private upload(res)
	{
		let target = this;
		window['wx'].uploadImage({
			localId: res.localIds[0],
			success: (res) =>
			{
				target.downLoad(res.serverId);
			}
		});
	}
	private downLoad(serverId: string)
	{
		window['wx'].downloadImage({
			serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
			success: (res) =>
			{
				this.getImgLocal(res.localId); // 返回图片下载后的本地ID
			}
		});
	}
	private getImgLocal(localId: string)
	{
		window['wx'].getLocalImgData({
			localId: localId, // 图片的localID
			success: (res) =>
			{
				ChannelManager.OnImageSelect.dispatch({ type: HeadUploadSystemType.web, data: res.localData }); // localData是图片的base64数据，可以用img标签显示
			}
		});
	}
	public copyToPastboard(data: string)
	{
		var input = document.createElement("input");
		input.value = data;
		document.body.appendChild(input);
		input.readOnly = true;
		input.select();
		input.setSelectionRange(0, input.value.length);
		document.execCommand('Copy');
		document.body.removeChild(input);
		UIManager.showFloatTips("邀请码复制成功");
	}
}