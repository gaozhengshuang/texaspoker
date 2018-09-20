namespace qin
{
	/**
	 * 网页显示
	 */
	export class WebView extends WebNode
	{
		private static _instance: WebView;
		public static getInstance(): WebView
		{
			if (WebView._instance == null)
			{
				WebView._instance = new WebView();
			}
			return WebView._instance;
		}

		//------------------------------------------------------------------
	    // 
	    //------------------------------------------------------------------

		private static CloseImgData:string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAAeCAYAAABzL3NnAAABaElEQVRYhe3YsY6CQBSF4X8nC9Og8UVMtEE0+vZGURMKeRIjkbEZttEtWINswb2b7JyGZoqTL4Qz+nE+nxv+eT4BptOpdg+1lGWJ0S7xFxIQCAhAQAACAhAQgMdEDp3tdov3nsVigbX27fm6rjkej0RRxGq1GryfyJvQNA3X65U8z7nf751nnXPkeU5VVXjvJerJIKRpSpIkVFXVCeGcY7/fc7vdGI1GpGkqUU8GwVpLlmWdEG2ALMuI41iintyHsQtCEwCE1+EVxOVyUQUAhYlsQ+x2O1UAULonWGuZzWYYY/DeY4xhPp+rAIASgnOOoii+Abz3FEXxdj6HijhC+yO4Xq97zeeQEUV4tQLPpyaEGELXDPa5RwwZEYQ+9wBNCBGEw+HQawbbEKfTSaKeDEIcx0wmk173gCfEeDwmiiKJejI/pZfL5a/OW2vZbDYDtfmZ8KcKAQEICEBAAAIC8FiHsiy1e6jmC5RF5dPrZYnoAAAAAElFTkSuQmCC';
		private _iframe: HTMLIFrameElement;
		private _buttonImg: HTMLImageElement;
		private _loadingDiv:HTMLElement;

		public constructor()
		{
			super();
			this._iframe = document.createElement('iframe');
			this.bindDom(this._iframe);
			if (this._iframe['attachEvent'])
			{
				this._iframe['attachEvent']('onload', ()=>{
					this.hideLoading();
				});
			}
			else
			{
				this._iframe.onload = ()=>{
					this.hideLoading();
				};
			}
		}
		public get src(): string
		{
			return this._iframe.src;
		}
		public set src(value: string)
		{
			this._iframe.src = value;
		}
		public get scrolling(): string
		{
			return this._iframe.scrolling;
		}
		public set scrolling(value: string)
		{
			this._iframe.scrolling = value;
		}
		public get closeButton(): boolean
		{
			return this._buttonImg != null && this._buttonImg.parentNode != null;
		}
		public set closeButton(value: boolean)
		{
			if (value)
			{
				if (this._buttonImg)
				{
					this._divNode.appendChild(this._buttonImg);
				}
				else
				{
					this._buttonImg = document.createElement('img');
					this._buttonImg.style.position = 'absolute';
					this._buttonImg.style.right = '4px';
					this._buttonImg.style.top = '4px';
					this._divNode.appendChild(this._buttonImg);
					this._buttonImg.src = WebView.CloseImgData;
					let thisObj: any = this;
					this._buttonImg.onclick = function ()
					{
						thisObj.parent.removeChild(thisObj);
					}
				}
			}
			else
			{
				WebNode.removeFromParent(this._buttonImg);
			}
		}
		private showLoading(): void
		{
			if(this._loadingDiv == null)
			{
				this._loadingDiv = document.createElement('div');
				this._loadingDiv.style.position = 'absolute';
				this._loadingDiv.style.color = '#333';
				this._loadingDiv.style.width = '100%';
				this._loadingDiv.style.textAlign = 'center';
				this._loadingDiv.style.top = '20px';
				this._loadingDiv.innerText = '正在加载...';
			}
			if (this._divNode && this._loadingDiv && this._loadingDiv.parentNode == null)
			{
				this._divNode.appendChild(this._loadingDiv);
			}
		}
		private hideLoading(): void
		{
			WebNode.removeFromParent(this._loadingDiv);
		}
		$onAddToStage(stage: egret.Stage, nestLevel: number): void
        {
            super.$onAddToStage(stage, nestLevel);
            this.showLoading();
        }
	}
}