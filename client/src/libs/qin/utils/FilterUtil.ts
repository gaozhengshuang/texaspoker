namespace qin
{
	/**
	 * 滤镜工具
	 */
	export class FilterUtil
	{
		private static _grayMatrix: Array<number> = [
			0.3, 0.6, 0, 0, 0,
			0.3, 0.6, 0, 0, 0,
			0.3, 0.6, 0, 0, 0,
			0, 0, 0, 1, 0
		];
		private static _grayFilter: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(FilterUtil._grayMatrix);
		private static _grayArray: Array<egret.ColorMatrixFilter> = [FilterUtil._grayFilter];
		private static get grayArray(): Array<egret.ColorMatrixFilter>
		{
			return FilterUtil._grayArray;
		}
		private static _defaultMatrix: Array<number> = [
			1, 0, 0, 0, 0,
			0, 1, 0, 0, 0,
			0, 0, 1, 0, 0,
			0, 0, 0, 1, 0
		];
		private static _defaultColorFilter: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(FilterUtil._defaultMatrix);
		private static _defaultArray: Array<egret.ColorMatrixFilter> = [FilterUtil._defaultColorFilter];
		public static defaultArray(): Array<egret.ColorMatrixFilter>
		{
			return FilterUtil._defaultArray;
		}
		/*灰度*/
		private static setGray(target: egret.DisplayObject)
		{
			target.filters = FilterUtil._grayArray;
		}
		/*默认*/
		private static setDefault(target: egret.DisplayObject)
		{
			target.filters = FilterUtil._defaultArray;
		}

		/**
		 * 阴影配置
		 */
		private static _shadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(2, 103, 0x4e0801, 1, 10, 10,
			0.65, egret.BitmapFilterQuality.LOW, false, false);
		private static _shadowArray: Array<egret.DropShadowFilter> = [FilterUtil._shadowFilter];
		/**
		 * 设置投影
		 */
		public static setShadow(target: egret.DisplayObject)
		{
			return;
			// let distance: number = 6;           /// 阴影的偏移距离，以像素为单位
			// let angle: number = 45;              /// 阴影的角度，0 到 360 度
			// let color: number = 0x000000;        /// 阴影的颜色，不包含透明度
			// let alpha: number = 0.7;             /// 光晕的颜色透明度，是对 color 参数的透明度设定
			// let blurX: number = 16;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
			// let blurY: number = 16;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
			// let strength: number = 0.65;                /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
			// let quality: number = egret.BitmapFilterQuality.LOW;              /// 应用滤镜的次数，暂无实现
			// let inner: boolean = false;            /// 指定发光是否为内侧发光
			// let knockout: boolean = false;            /// 指定对象是否具有挖空效果
			target.filters = FilterUtil._shadowArray;
		}

		private static _greenShadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(2, 103, 0x000000, 0.75, 4, 4,
			0.65, egret.BitmapFilterQuality.LOW, false, false);
		private static _greenShadowArray: Array<egret.DropShadowFilter> = [FilterUtil._greenShadowFilter];
		/**
		 * 设置绿色阴影
		 */
		public static setGreenShadow(target: egret.DisplayObject)
		{
			return;
			target.filters = FilterUtil._greenShadowArray;
		}
		/**
		 * 设置颜色滤镜 只能设置纯白色的图片
		 */
		public static setColorFilters(target: egret.DisplayObject, color: number)
		{
			// return;
			let colorMatrix: number[] = [
				1, 0, 0, 0, 0,
				0, 1, 0, 0, 0,
				0, 0, 1, 0, 0,
				0, 0, 0, 1, 0];
			let r: number = color >> 16 & 0xff;
			let g: number = color >> 8 & 0xff;
			let b: number = color & 0xff;
			colorMatrix[0] = r / 0xff;
			colorMatrix[6] = g / 0xff;
			colorMatrix[12] = b / 0xff;
			target.filters = [new egret.ColorMatrixFilter(colorMatrix)];
		}
	}
}