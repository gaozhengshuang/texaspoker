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
 * 动画
 */
var AnimationFactory = (function () {
    function AnimationFactory() {
    }
    /**
     * 获取卡牌动画
     */
    AnimationFactory.getCardFaceAnimation = function (type) {
        var animationHandler;
        switch (type) {
            case AnimationType.CardFaceBoardAppear:
                animationHandler = new CardFaceBoardAppear();
                break;
            case AnimationType.CardFaceBright:
                animationHandler = new CardFaceBright();
                break;
            case AnimationType.CardFaceMoveToPoint:
                animationHandler = new CardFaceMoveToPoint();
                break;
            case AnimationType.CardFaceTurnToFace:
                animationHandler = new CardFaceTurnToFace();
                break;
            case AnimationType.SelfCard1Appear:
                animationHandler = new SelfCard1Appear();
                break;
            case AnimationType.SelfCard2Appear:
                animationHandler = new SelfCard2Appear();
                break;
            case AnimationType.OmahaSelfCard1Appear:
                animationHandler = new OmahaSelfCard1Appear();
                break;
            case AnimationType.OmahaSelfCard2Appear:
                animationHandler = new OmahaSelfCard2Appear();
                break;
            case AnimationType.OmahaSelfCard3Appear:
                animationHandler = new OmahaSelfCard3Appear();
                break;
            case AnimationType.OmahaSelfCard4Appear:
                animationHandler = new OmahaSelfCard4Appear();
                break;
            default:
                break;
        }
        return animationHandler;
    };
    /**
     * 获取显示对象动画
     */
    AnimationFactory.getDisplayObjectContainerAnimation = function (type) {
        var animationHandler;
        switch (type) {
            case AnimationType.FlopCard:
                animationHandler = new FlopCardAnimation();
                break;
            case AnimationType.GamblingGameGroupMove:
                animationHandler = new GamblingGameGroupMove();
                break;
            case AnimationType.CommonMoveToPointByNowPos:
                animationHandler = new CommonMoveToPointByNowPos();
                break;
            case AnimationType.CommonMoveToRelativelyPos:
                animationHandler = new CommonMoveToRelativelyPos();
                break;
            case AnimationType.WinChips:
                animationHandler = new WinChipsAnim();
                break;
            case AnimationType.FoldCard:
                animationHandler = new FoldCardAnimation();
                break;
            case AnimationType.Alpha:
                animationHandler = new AlphaChangeAnimation();
                break;
            default:
                break;
        }
        return animationHandler;
    };
    /**
     * 获取粒子特效
     */
    AnimationFactory.getParticleEffect = function (type, parent, onComplete) {
        if (!AnimationFactory._particleList) {
            AnimationFactory._particleList = new qin.Dictionary();
        }
        if (!AnimationFactory._particleStateList) {
            AnimationFactory._particleStateList = new qin.Dictionary();
        }
        if (AnimationFactory._particleStateList.containsKey(type) && !AnimationFactory._particleStateList.getValue(type)) {
            return;
        }
        var effect = AnimationFactory._particleList.getValue(type);
        switch (type) {
            case AnimationType.GetCoin:
                AnimationFactory.resParticle(effect, ResFixedFileName.GetCoin_Json, ResFixedFileName.GetCoin_Img, 1000, parent, 0, 0, type, onComplete);
                break;
            case AnimationType.WinCard:
                AnimationFactory.resParticle(effect, ResFixedFileName.Win_Json, ResFixedFileName.Win_Img, 3000, parent, 25, -20, type, onComplete);
                break;
            case AnimationType.Allin0:
                AnimationFactory.resParticle(effect, ResFixedFileName.Allin_Json, ResFixedFileName.Win_Img, 400, parent, 43, 30, type, onComplete);
                break;
            case AnimationType.Allin1:
                AnimationFactory.resParticle(effect, ResFixedFileName.Allin_Json, ResFixedFileName.Win_Img, 400, parent, 136, 30, type, onComplete);
                break;
            case AnimationType.HundredWarPlayer:
                AnimationFactory.resParticle(effect, ResFixedFileName.Win_Json, ResFixedFileName.Win_Img, 2000, parent, 0, -100, type, onComplete);
                break;
            case AnimationType.HundredWarBanker:
                AnimationFactory.resParticle(effect, ResFixedFileName.Win_Json, ResFixedFileName.Win_Img, 1000, parent, 0, -70, type, onComplete);
                break;
            case AnimationType.HundredWarPool:
                AnimationFactory.resParticle(effect, ResFixedFileName.Win_Json, ResFixedFileName.Win_Img, 2000, parent, 120, -100, type, onComplete);
                break;
            case AnimationType.HundredWarPoolDes:
                AnimationFactory.resParticle(effect, ResFixedFileName.HundredWarPoolBoom_Json, ResFixedFileName.Win_Img, 400, parent, 150, 37, type, onComplete);
                break;
            case AnimationType.WinCard2:
                AnimationFactory.resParticle(effect, ResFixedFileName.Win_2_Json, ResFixedFileName.Win_Img, 300, parent, 0, 0, type, onComplete);
                break;
            case AnimationType.WinCard3:
                AnimationFactory.resParticle(effect, ResFixedFileName.Win_2_Json, ResFixedFileName.Win_Img, 300, parent, 100, 0, type, onComplete);
                break;
            case AnimationType.WinCard4:
                AnimationFactory.resParticle(effect, ResFixedFileName.Win_2_Json, ResFixedFileName.Win_Img, 300, parent, 200, 0, type, onComplete);
                break;
        }
    };
    AnimationFactory.resParticle = function (effect, json, img, time, parent, posX, posY, type, onComplete) {
        return __awaiter(this, void 0, void 0, function () {
            var config, texture, part;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!effect) return [3 /*break*/, 1];
                        if (parent.getChildIndex(effect) == -1) {
                            parent.addChild(effect);
                        }
                        effect.start(time);
                        return [3 /*break*/, 3];
                    case 1:
                        AnimationFactory._particleStateList.add(type, false);
                        return [4 /*yield*/, RES.getResAsync(ResPrefixPathName.Particle + json)];
                    case 2:
                        config = _a.sent();
                        texture = RES.getRes(img);
                        part = new particle.GravityParticleSystem(texture, config);
                        parent.addChild(part);
                        part.x = posX;
                        part.y = posY;
                        part.start(time);
                        onComplete(part);
                        AnimationFactory._particleList.add(type, part);
                        AnimationFactory._particleStateList.add(type, true);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AnimationFactory;
}());
__reflect(AnimationFactory.prototype, "AnimationFactory");
//# sourceMappingURL=AnimationFactory.js.map