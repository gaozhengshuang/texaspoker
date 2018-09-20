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
 * ui工具类
 */
var UIUtil = (function () {
    function UIUtil() {
    }
    /**
     * 绑定列表数据源
     */
    UIUtil.bindRender = function (group, render, dataSource) {
        if (!group || !render) {
            return;
        }
        if (dataSource != undefined) {
            var bingData = new eui.ArrayCollection(dataSource);
            group.dataProvider = bingData;
        }
        if (!group.itemRenderer) {
            if (render instanceof String) {
                group.itemRendererSkinName = render;
            }
            else if (render instanceof Function) {
                group.itemRenderer = render;
            }
        }
    };
    /**
     * 列表项渲染
     */
    UIUtil.listRenderer = function (list, scroller, renderer, dir, operation, data, useVirtualLayout) {
        if (useVirtualLayout === void 0) { useVirtualLayout = false; }
        if (!list || !scroller || !renderer) {
            qin.Console.log("初始化失败！绑定的组件对象不能为空！");
            return;
        }
        if (dir != undefined && operation != undefined) {
            scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            scroller.scrollPolicyV = eui.ScrollPolicy.OFF;
            if (dir == ScrollViewDirection.Horizontal_L_R) {
                scroller.scrollPolicyH = operation;
            }
            else if (dir == ScrollViewDirection.Vertical_T_D) {
                scroller.scrollPolicyV = operation;
            }
        }
        else {
            scroller.scrollPolicyH = eui.ScrollPolicy.AUTO;
            scroller.scrollPolicyV = eui.ScrollPolicy.AUTO;
        }
        UIUtil.bindRender(list, renderer, data);
        list.useVirtualLayout = useVirtualLayout;
        scroller.viewport = list;
    };
    /**
     * 滚动到指定的索引
     */
    UIUtil.scrollToIndex = function (scroller, itemSize, selectIndex) {
        if (scroller && scroller.viewport) {
            var v = itemSize * selectIndex;
            if (scroller.scrollPolicyH != eui.ScrollPolicy.OFF) {
                scroller.viewport.scrollH = v;
            }
            if (scroller.scrollPolicyV != eui.ScrollPolicy.OFF) {
                scroller.viewport.scrollV = v;
            }
        }
    };
    /**
     * 隐藏滚动条
     */
    UIUtil.hideScrollerBar = function (scroller, h, v) {
        if (h === void 0) { h = true; }
        if (v === void 0) { v = true; }
        if (h && scroller && scroller.horizontalScrollBar) {
            scroller.horizontalScrollBar.autoVisibility = false;
            scroller.horizontalScrollBar.visible = false;
        }
        if (v && scroller && scroller.verticalScrollBar) {
            scroller.verticalScrollBar.autoVisibility = false;
            scroller.verticalScrollBar.visible = false;
        }
    };
    /**
     * 获取水平布局
     */
    UIUtil.getHTileLayout = function (hGap, reqRc, align) {
        if (reqRc === void 0) { reqRc = 1; }
        if (align === void 0) { align = egret.HorizontalAlign.LEFT; }
        var ly = new eui.TileLayout();
        ly.horizontalAlign = align;
        if (hGap != undefined) {
            ly.horizontalGap = hGap;
        }
        if (reqRc != undefined) {
            ly.requestedRowCount = reqRc;
        }
        return ly;
    };
    /**
     * 获取垂直布局
     */
    UIUtil.getVTileLayout = function (vGap, reqCc, align) {
        if (reqCc === void 0) { reqCc = 1; }
        if (align === void 0) { align = egret.VerticalAlign.TOP; }
        var ly = new eui.TileLayout();
        ly.verticalAlign = align;
        if (vGap != undefined) {
            ly.verticalGap = vGap;
        }
        if (reqCc != undefined) {
            ly.requestedColumnCount = reqCc;
        }
        return ly;
    };
    /**
     * 获取网格布局
     */
    UIUtil.getTileLayout = function (hGap, vGap, reqRc, reqCc, hAlign, vAlign) {
        var ly = new eui.TileLayout();
        if (hGap != undefined) {
            ly.horizontalGap = hGap;
        }
        if (vGap != undefined) {
            ly.verticalGap = vGap;
        }
        if (reqRc != undefined) {
            ly.requestedRowCount = reqRc;
        }
        if (reqCc != undefined) {
            ly.requestedColumnCount = reqCc;
        }
        if (hAlign != undefined) {
            ly.horizontalAlign = hAlign;
        }
        if (vAlign != undefined) {
            ly.verticalAlign = vAlign;
        }
        return ly;
    };
    /**
     * 获取性别图片资源
     */
    UIUtil.getSexImgSource = function (sex) {
        if (sex == Sex.Female) {
            return SheetSubName.FemaleImg;
        }
        else if (sex == Sex.Male) {
            return SheetSubName.MaleImg;
        }
        return qin.StringConstants.Empty;
    };
    /**
     * 对容器进行子项重排
     */
    UIUtil.refreshSortContainer = function (list, container) {
        if (container && list) {
            for (var i = 0; i < list.length; i++) {
                container.addChild(list[i]);
            }
        }
    };
    /**
     * 图片缓存处理
     */
    UIUtil.containerImgOper = function (container) {
        qin.ArrayUtil.Clear(UIUtil._imgList);
        var numImg;
        for (var i = 0; i < container.numChildren; i++) {
            numImg = container.getChildAt(i);
            if (numImg instanceof eui.Image) {
                numImg.source = "";
                UIUtil._imgList.push(numImg);
            }
        }
        container.removeChildren();
    };
    UIUtil.getExistImg = function (scaleX, scaleY) {
        if (scaleX === void 0) { scaleX = 1; }
        if (scaleY === void 0) { scaleY = 1; }
        var img = UIUtil._imgList.pop();
        if (!img) {
            img = new eui.Image();
        }
        img.scaleX = scaleX;
        img.scaleY = scaleY;
        return img;
    };
    /**
     * 获取数字颜色资源
     */
    UIUtil.getNumImg = function (num, type) {
        if (type === void 0) { type = NumResType.Red; }
        if (num >= 0 && num <= 9) {
            switch (type) {
                case NumResType.Red:
                    return ResPrefixName.NumRed + num.toString() + ResSuffixName.PNG;
                case NumResType.Green:
                    return ResPrefixName.NumGreen + num.toString() + ResSuffixName.PNG;
                case NumResType.Yellow:
                    return ResPrefixName.NumYellow + num.toString() + ResSuffixName.PNG;
            }
        }
    };
    /**
     * 显示头像
     */
    UIUtil.ShowHead = function (img, source) {
        if (img) {
            if (source) {
                img.source = source;
            }
            else {
                img.source = SheetSubName.Default_Head_Male;
            }
        }
    };
    UIUtil.setGlowerFilter = function (img) {
        if (!UIUtil.colorFilterList) {
            UIUtil.colorFilterList = new Array();
        }
        if (!UIUtil.colorFilter) {
            var colorMatrix = [
                1, 0, 0, 0, 10,
                0, 1, 0, 0, 10,
                0, 0, 1, 0, 10,
                0, 0, 0, 1, 0
            ];
            UIUtil.colorFilter = new egret.ColorMatrixFilter(colorMatrix);
            UIUtil.colorFilterList[0] = UIUtil.colorFilter;
        }
        if (img) {
            img.filters = UIUtil.colorFilterList;
        }
    };
    UIUtil.clearFilters = function (img) {
        if (img) {
            img.filters = UIUtil.emptyFilterList;
        }
    };
    /**
    * 添加通知信息 该通知消息独占类型,类型不能重复,项目中仅能添加一次
    * target 附加红点的目标容器;
    * type 通知类型;
    *  top,right,红点相对位置，不填默认右上角
    */
    UIUtil.addSingleNotify = function (target, type, top, right) {
        UIUtil.addNotify(target, type, undefined, top, right);
    };
    /**
    * 添加带参数的通知信息 通常该通知信息 同类型有多个红点，但是附加参数不一样
    * target 附加红点的目标容器;
    * type 通知类型;
    * params 红点的附加参数;
    * top,right,红点相对位置，不填默认右上角
     */
    UIUtil.addMultiNotify = function (target, type, params, top, right) {
        UIUtil.addNotify(target, type, params, top, right);
    };
    UIUtil.addNotify = function (target, type, params, top, right) {
        if (!type) {
            AlertManager.showAlert("添加红点类型不能为空！");
            return;
        }
        var info = new NotifyInfo();
        info.attachObject = target;
        info.top = top;
        info.right = right;
        info.type = type;
        info.params = params;
        var appendName = params ? type.toString() + "_" + params : type.toString();
        var searchName = "redPointComponent_unique" + appendName;
        var notifyComponent = UIUtil._notifyComponentMap.getValue(searchName);
        if (!notifyComponent) {
            notifyComponent = new NotifyComponent(UIComponentSkinName.NotifyComponent);
            UIUtil._notifyComponentMap.add(searchName, notifyComponent);
        }
        notifyComponent.init(info);
    };
    /**
     * 设置有原形边框按钮 的边框变色
     */
    UIUtil.setCircleBorderButtonFilter = function (target, color) {
        if (target["btnImg"]) {
            qin.FilterUtil.setColorFilters(target["btnImg"], color);
        }
    };
    /**
     * 设置刷新列表项信息
    */
    UIUtil.setListDpInfo = function (dp, newSource, propertyName, sort) {
        if (newSource && newSource.length > 0) {
            for (var i = 0; i < dp.source.length; i++) {
                var flag = true;
                for (var j = 0; j < newSource.length; j++) {
                    if (newSource[j][propertyName] == dp.source[i][propertyName]) {
                        dp.source[i] = newSource[j]; //更新旧数据在新数据中有的
                        flag = false;
                    }
                }
                if (flag) {
                    dp.source.splice(i, 1); //去除旧数据在新数据中没有的
                }
            }
            for (var i = 0; i < newSource.length; i++) {
                var flag = true;
                for (var j = 0; j < dp.source.length; j++) {
                    if (dp.source[j][propertyName] == newSource[i][propertyName]) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    dp.source.push(newSource[i]); //写入新数据在旧数据中没有的
                }
            }
        }
        else {
            dp.source = [];
        }
        if (sort) {
            dp.source.sort(sort); //排序
        }
        dp.refresh();
    };
    /**
     * 写入列表项数据
    */
    UIUtil.writeListInfo = function (list, newSource, propertyName, isShareList, sort) {
        if (isShareList === void 0) { isShareList = false; }
        if (!list.dataProvider) {
            if (sort) {
                list.dataProvider = new eui.ArrayCollection(newSource.sort(sort));
            }
            else {
                list.dataProvider = new eui.ArrayCollection(newSource);
            }
        }
        else {
            var listArray = list.dataProvider;
            if (!propertyName) {
                listArray.source = newSource;
                listArray.refresh();
                return;
            }
            if (isShareList) {
                listArray.source = [];
            }
            UIUtil.setListDpInfo(listArray, newSource, propertyName, sort);
        }
    };
    /**
     * 播放龙骨动画
     */
    UIUtil.playBoneAnime = function (name, parent, times, timeScale) {
        if (times === void 0) { times = 0; }
        if (timeScale === void 0) { timeScale = 1; }
        var info = BoneAnimation.getFastAnimeByName(name);
        if (!info) {
            var oncomplete = function (info) {
                info.play(name, times, timeScale);
            };
            BoneAnimationCreater.CreateBoneAnimation(name, parent, times, timeScale, oncomplete);
        }
        else {
            info.state = BonePlayState.Play;
            info.play(name, times, timeScale);
        }
    };
    /**
     * 停止龙骨动画
     */
    UIUtil.stopBoneAnime = function (name) {
        var info = BoneAnimation.getFastAnimeByName(name);
        if (info) {
            info.state = BonePlayState.Stop;
            info.stop();
        }
    };
    /**
    * 加载背景
    */
    UIUtil.loadBg = function (url, img) {
        var _this = this;
        if (!url || !img) {
            qin.Console.logError("加载背景异常！" + "url:" + url + "img:" + img);
            return;
        }
        url = ResPrefixPathName.Bg + url;
        var loadFunc = function (url, img) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RES.getResAsync(url)];
                    case 1:
                        data = _a.sent();
                        img.source = data;
                        return [2 /*return*/];
                }
            });
        }); };
        loadFunc(url, img);
    };
    /**
     * 清理布局属性
     */
    UIUtil.clearLayout = function (target) {
        target.top = NaN;
        target.bottom = NaN;
        target.left = NaN;
        target.right = NaN;
        target.horizontalCenter = NaN;
        target.verticalCenter = NaN;
    };
    UIUtil._imgList = new Array();
    UIUtil.emptyFilterList = [];
    UIUtil._notifyComponentMap = new qin.Dictionary();
    return UIUtil;
}());
__reflect(UIUtil.prototype, "UIUtil");
//# sourceMappingURL=UIUtil.js.map