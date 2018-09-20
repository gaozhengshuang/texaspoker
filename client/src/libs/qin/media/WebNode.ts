module qin
{
    /**
     * 显示到 egret 中的 DOM 元件
     */
    export abstract class WebNode extends egret.DisplayObject
    {
        private static initElementStyle(element: HTMLElement): void
        {
            element.style.position = "relative";
            element.style.border = "0";
            element.style.left = "0";
            element.style.top = "0";
        }
        public static removeFromParent(element: HTMLElement):boolean
        {
            if (element && element.parentNode)
            {
                element.parentNode.removeChild(element);
                return true;
            }
            return false;
        }
        //
        protected _divNode: HTMLDivElement;
        private _playerNode: HTMLElement;
        private _canvasNode: HTMLCanvasElement;
        private _element: HTMLElement;
        private _lastWidth: number = 0;
        private _lastHeight: number = 0;
        private _lastX: number = 0;
        private _lastY: number = 0;

        public get backgroundColor()
        {
            return this._divNode ? this._divNode.style.backgroundColor : '';
        }
        public set backgroundColor(value: string)
        {
            if (value === '' || value === undefined)
            {
                value = null;
            }
            this._divNode.style.backgroundColor = value;
        }
        public constructor()
        {
            super();
            this.$renderNode = new egret.sys.RenderNode();
            this._divNode = document.createElement("div");
            WebNode.initElementStyle(this._divNode);
        }
        /**
         * 绑定一个 DOM 元件
         * @element DOM 元件，不要修改此元件的 style 的位置、旋转、缩放、边框等属性
         */
        public bindDom(element: HTMLElement): void
        {
            this.unbindDom();
            this._element = element;
            this._element.style.width = "100%";
            this._element.style.height = "100%";
            WebNode.initElementStyle(this._element);
            this._divNode.appendChild(element);
        }
        /**
         * 解绑 DOM 元件
         */
        public unbindDom(): void
        {
            WebNode.removeFromParent(this._element);
            this._element = null;
        }
        $onAddToStage(stage: egret.Stage, nestLevel: number): void
        {
            super.$onAddToStage(stage, nestLevel);
            //显示dom
            if (!this._playerNode)
            {
                this._playerNode = <HTMLElement>stage.$screen['container'];
                this._canvasNode = <HTMLCanvasElement>stage.$screen['canvas'];
            }
            this._playerNode.appendChild(this._divNode);
        }
        $onRemoveFromStage(): void
        {
            super.$onRemoveFromStage();
            //隐藏dom
            WebNode.removeFromParent(this._divNode);
        }
        $update(dirtyRegionPolicy: string, bounds?: egret.Rectangle): boolean
        {
            // let result = super.$update(dirtyRegionPolicy, bounds);
            // let visible = this.updateVisible();
            // if (result && visible && this.stage)
            // {
            //     this.updateScale();
            // }
            // return result;
            return true;
        }
        private updateVisible(): boolean
        {
            // if (this.$renderNode.renderVisible = false || this.$renderNode.renderAlpha == 0)
            // {
            //     if (WebNode.removeFromParent(this._element))
            //     {
            //         return false;
            //     }
            // }
            // else
            // {
            //     if (this._element && this._element.parentNode == null)
            //     {
            //         this._divNode.appendChild(this._element);
            //     }
            // }
            return true;
        }
        private updateScale(): void
        {
            let playerRect = this._playerNode.getBoundingClientRect();
            let canvasRect = this._canvasNode.getBoundingClientRect();
            let shouldRotate = false;
            let orientation: string = this.stage.orientation;
            if (orientation != egret.OrientationMode.AUTO)
            {
                shouldRotate = orientation != egret.OrientationMode.PORTRAIT && playerRect.height > playerRect.width
                    || orientation == egret.OrientationMode.PORTRAIT && playerRect.width > playerRect.height;
            }
            let domScaleX;
            let domScaleY;
            if (shouldRotate)
            {
                domScaleX = canvasRect.width / this.stage.stageHeight;
                domScaleY = canvasRect.height / this.stage.stageWidth;
            }
            else
            {
                domScaleX = canvasRect.width / this.stage.stageWidth;
                domScaleY = canvasRect.height / this.stage.stageHeight;
            }
            // this._divNode.style.transformOrigin = "0% 0% 0px";
            // this._divNode.style.transform = this._canvasNode.style.transform + " scale(" + domScaleX + "," + domScaleY + ")";
            let width: number = canvasRect.width;
            if (this._lastWidth != width)
            {
                this._divNode.style.width = this.$getWidth() * domScaleX + "px";
                this._lastWidth = width;
            }
            let height: number = canvasRect.height;
            if (this._lastHeight != height)
            {
                this._divNode.style.height = this.$getHeight() * domScaleX + "px";
                this._lastHeight = height;
            }
            let x: number = this.$getX();
            if (this._lastX != x)
            {
                this._divNode.style.left = x + "px";
                this._lastX = x;
            }
            let y: number = this.$getY();
            if (this._lastY != y)
            {
                this._divNode.style.top = y + "px";
                this._lastY = y;
            }
        }
    }
}