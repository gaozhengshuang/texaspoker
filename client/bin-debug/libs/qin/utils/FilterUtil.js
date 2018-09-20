var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * 滤镜工具
     */
    var FilterUtil = (function () {
        function FilterUtil() {
        }
        Object.defineProperty(FilterUtil, "grayArray", {
            get: function () {
                return FilterUtil._grayArray;
            },
            enumerable: true,
            configurable: true
        });
        FilterUtil.defaultArray = function () {
            return FilterUtil._defaultArray;
        };
        /*灰度*/
        FilterUtil.setGray = function (target) {
            target.filters = FilterUtil._grayArray;
        };
        /*默认*/
        FilterUtil.setDefault = function (target) {
            target.filters = FilterUtil._defaultArray;
        };
        /**
         * 设置投影
         */
        FilterUtil.setShadow = function (target) {
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
        };
        /**
         * 设置绿色阴影
         */
        FilterUtil.setGreenShadow = function (target) {
            return;
            target.filters = FilterUtil._greenShadowArray;
        };
        /**
         * 设置颜色滤镜 只能设置纯白色的图片
         */
        FilterUtil.setColorFilters = function (target, color) {
            // return;
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var r = color >> 16 & 0xff;
            var g = color >> 8 & 0xff;
            var b = color & 0xff;
            colorMatrix[0] = r / 0xff;
            colorMatrix[6] = g / 0xff;
            colorMatrix[12] = b / 0xff;
            target.filters = [new egret.ColorMatrixFilter(colorMatrix)];
        };
        FilterUtil._grayMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        FilterUtil._grayFilter = new egret.ColorMatrixFilter(FilterUtil._grayMatrix);
        FilterUtil._grayArray = [FilterUtil._grayFilter];
        FilterUtil._defaultMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        FilterUtil._defaultColorFilter = new egret.ColorMatrixFilter(FilterUtil._defaultMatrix);
        FilterUtil._defaultArray = [FilterUtil._defaultColorFilter];
        /**
         * 阴影配置
         */
        FilterUtil._shadowFilter = new egret.DropShadowFilter(2, 103, 0x4e0801, 1, 10, 10, 0.65, 1 /* LOW */, false, false);
        FilterUtil._shadowArray = [FilterUtil._shadowFilter];
        FilterUtil._greenShadowFilter = new egret.DropShadowFilter(2, 103, 0x000000, 0.75, 4, 4, 0.65, 1 /* LOW */, false, false);
        FilterUtil._greenShadowArray = [FilterUtil._greenShadowFilter];
        return FilterUtil;
    }());
    qin.FilterUtil = FilterUtil;
    __reflect(FilterUtil.prototype, "qin.FilterUtil");
})(qin || (qin = {}));
//# sourceMappingURL=FilterUtil.js.map