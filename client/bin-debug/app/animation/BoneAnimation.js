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
 * 龙骨动画
 */
var BoneAnimation = (function () {
    function BoneAnimation() {
    }
    /**
     * 加载动画资源
     */
    BoneAnimation.resBoneAnime = function (info, config, img, name, parent, posX, posY, onComplete) {
        return __awaiter(this, void 0, void 0, function () {
            var info_1, boneConfig, boneImg, movie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!info) return [3 /*break*/, 1];
                        if (parent && parent.getChildIndex(info.movie) == -1) {
                            parent.addChild(info.movie);
                        }
                        else {
                            qin.Console.log("parent对象出错");
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        info_1 = new BoneAnimeInfo();
                        BoneAnimation._boneList.add(name, info_1);
                        return [4 /*yield*/, RES.getResAsync(ResPrefixPathName.Bone + config)];
                    case 2:
                        boneConfig = _a.sent();
                        return [4 /*yield*/, RES.getResAsync(ResPrefixPathName.Bone + img)];
                    case 3:
                        boneImg = _a.sent();
                        dragonBones.addMovieGroup(boneConfig, boneImg);
                        movie = dragonBones.buildMovie(name);
                        movie.x = posX;
                        movie.y = posY;
                        parent.addChild(movie);
                        info_1.movie = movie;
                        info_1.isLoaded = true;
                        onComplete(info_1);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取缓存bone动画
     */
    BoneAnimation.getFastAnimeByName = function (name) {
        if (BoneAnimation._boneList && BoneAnimation._boneList.containsKey(name)) {
            return BoneAnimation._boneList.getValue(name);
        }
        return null;
    };
    return BoneAnimation;
}());
__reflect(BoneAnimation.prototype, "BoneAnimation");
/**
 * 龙骨动画信息
 */
var BoneAnimeInfo = (function () {
    function BoneAnimeInfo() {
        /**
         * 是否加载完毕
         */
        this.isLoaded = false;
        /**
         * 播放状态
         */
        this.state = BonePlayState.Play;
    }
    /**
     * 播放
     */
    BoneAnimeInfo.prototype.play = function (name, times, timeScale) {
        if (!this.isLoaded) {
            qin.Console.log("资源未加载完成");
            return;
        }
        this.movie.timeScale = timeScale;
        if (this.state == BonePlayState.Play) {
            this.movie.play(name, times);
        }
    };
    /**
     * 停止播放
     */
    BoneAnimeInfo.prototype.stop = function () {
        if (this.movie) {
            this.movie.stop();
        }
    };
    return BoneAnimeInfo;
}());
__reflect(BoneAnimeInfo.prototype, "BoneAnimeInfo");
var BonePlayState;
(function (BonePlayState) {
    BonePlayState[BonePlayState["Play"] = 1] = "Play";
    BonePlayState[BonePlayState["Stop"] = 2] = "Stop";
})(BonePlayState || (BonePlayState = {}));
//# sourceMappingURL=BoneAnimation.js.map