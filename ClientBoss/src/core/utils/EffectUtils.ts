module effectUtils {

    // 存储旋转对象
    let rotationArr: Array<any> = [];
    //对象旋转特效
    //obj   旋转对象
    //time  旋转一周用时，毫秒
    export function rotationEffect(obj: egret.DisplayObject, time: number = 1000): void {
        if (this.rotationArr == null) {
            this.rotationArr = [];
        }
        if (this.rotationArr[obj.hashCode]) {
            return;
        }
        if ((this.rotationArr[obj.hashCode] == null) || !this.rotationArr[obj.hashCode]) {
            this.rotationArr[obj.hashCode] = true;
        }
        let onComplete1: Function = function () {
            if (this.rotationArr[obj.hashCode] && (obj != null)) {
                obj.rotation = 0;
                egret.Tween.get(obj).to({rotation: 360}, time).call(onComplete1, this);
            }
        };
        obj.rotation = 0;
        egret.Tween.get(obj).to({rotation: 360}, time).call(onComplete1, this);
    }

    //取消对象旋转
    //obj    旋转对象
    export function removeRotationEffect(obj: egret.DisplayObject): void {
        if (this.rotationArr == null) {
            this.rotationArr = [];
        }
        this.rotationArr[obj.hashCode] = false;
    }

    //抖动对象特效
    //类似ios密码输入错误的特效
    export function shakeObj(obj: egret.DisplayObject): void {
        let shakeNum = 80;
        let oldX: number = obj.x;
        egret.Tween.get(obj).to({x: obj.x - 10}, shakeNum);

        egret.setTimeout(function () {
            egret.Tween.get(obj).to({x: obj.x + 20}, shakeNum);
        }, this, shakeNum * 2);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({x: obj.x - 20}, shakeNum);
        }, this, shakeNum * 3);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({x: obj.x + 20}, shakeNum);
        }, this, shakeNum * 4);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({x: oldX}, shakeNum);
        }, this, shakeNum * 5);
    }


    //抖动对象特效
    // 1：抖动  2：震动
    export function shakeScreen(panel: egret.DisplayObject, effectType: number = 1): void {
        let shakeNum = 40;
        let oldX: number = panel.x;
        let oldY: number = panel.y;

        if (effectType == 1) {
            egret.Tween.get(panel).to({x: panel.x - 10}, shakeNum);

            egret.setTimeout(function () {
                egret.Tween.get(panel).to({x: panel.x + 20}, shakeNum);
            }, this, shakeNum * 2);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({x: panel.x - 20}, shakeNum);
            }, this, shakeNum * 3);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({x: panel.x + 20}, shakeNum);
            }, this, shakeNum * 4);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({x: oldX}, shakeNum);
            }, this, shakeNum * 5);
        } else {
            egret.Tween.get(panel).to({x: panel.x - 10, y: panel.y}, shakeNum);

            egret.setTimeout(function () {
                egret.Tween.get(panel).to({x: panel.x + 20, y: panel.y}, shakeNum);
            }, this, shakeNum * 2);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({x: panel.x, y: panel.y + 15}, shakeNum);
            }, this, shakeNum * 3);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({x: panel.x, y: panel.y - 20}, shakeNum);
            }, this, shakeNum * 4);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({x: panel.x, y: panel.y + 10}, shakeNum);
            }, this, shakeNum * 5);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({x: oldX, y: oldY}, shakeNum);
            }, this, shakeNum * 6);
        }
    }

    let isPlayEffectPlay: Boolean = false;

    /**
     * 给显示对象增加特效
     * obj           对象
     * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
     */
    export function playEffect(obj: egret.DisplayObject, cartoonType: number = 1): void {
        if (this.isPlayEffectPlay) {
            return;
        }
        this.isPlayEffectPlay = true;
        let onComplete2: Function = function () {
            this.isPlayEffectPlay = false;
        };
        let onComplete1: Function = function () {
            if (cartoonType == 1) {
                egret.Tween.get(obj).to({
                    scaleX: 1,
                    scaleY: 1,
                    x: obj.x - obj.width / 4,
                    y: obj.y - obj.height / 4
                }, 500, egret.Ease.elasticOut).call(onComplete2, this);
            } else if (cartoonType == 2) {
                egret.Tween.get(obj).to({
                    scaleX: 1,
                    scaleY: 1,
                    x: obj.x - obj.width / 4,
                    y: obj.y - obj.height / 4
                }, 500, egret.Ease.backOut).call(onComplete2, this);
            } else if (cartoonType == 3) {
                egret.Tween.get(obj).to({
                    scaleX: 1,
                    scaleY: 1,
                    x: obj.x - obj.width / 4,
                    y: obj.y - obj.height / 4
                }, 100).call(onComplete2, this);
            }
        };
        egret.Tween.get(obj).to({
            scaleX: 0.5,
            scaleY: 0.5,
            x: obj.x + obj.width / 4,
            y: obj.y + obj.height / 4
        }, 100, egret.Ease.sineIn).call(onComplete1, this);
    }


    /**
     * 给显示对象增加持续放大特效
     * obj           对象
     */
    export function playScaleEffect(obj: egret.DisplayObject): void {
        let onComplete1: Function = function () {
            if (obj != null) {
                let onComplete2: Function = function () {
                    obj.scaleX = 1;
                    obj.scaleY = 1;
                    egret.Tween.get(obj).to({alpha: 1}, 1000).call(onComplete1, self)
                };
                obj.alpha = 1;
                egret.Tween.get(obj).to({scaleX: 1.5, scaleY: 1.5, alpha: 0}, 1000).call(onComplete2, self)
            }
        };

        onComplete1();

    }

    /**
     * 显示对象上线浮动特效
     * obj           对象
     * time          浮动时间 毫秒
     * space         浮动高度
     */
    export function flyObj(obj: egret.DisplayObject, time = 300, space: number = 10): void {
        let onComplete1: Function = function () {
            if (obj != null) {
                let onComplete2: Function = function () {
                    egret.Tween.get(obj).to({y: obj.y - space}, time).call(onComplete1, this);
                };
                egret.Tween.get(obj).to({y: obj.y + space}, time).call(onComplete2, this);
            }
        };
        onComplete1();
    }

    /**
     * 显示对象摇头特效
     * obj           对象
     * time          浮动时间 毫秒
     * space         摇头幅度
     */
    export function rockObj(obj: egret.DisplayObject, time, space: number = 20): void {
        let onComplete1: Function = function () {
            if (obj != null) {
                let onComplete2: Function = function () {
                    egret.Tween.get(obj).to({rotation: -space}, time).call(onComplete1, this);
                };
                egret.Tween.get(obj).to({rotation: space}, time).call(onComplete2, this);
            }
        };
        onComplete1();
    }

    /**
     * 文字打字机效果
     * obj           文本对象
     * content       文字
     * interval      打字间隔 毫秒
     */
    export function typerEffect(obj: egret.TextField, content: string = "", interval: number = 200): void {
        let strArr: Array<any> = content.split("");
        let len: number = strArr.length;
        for (let i = 0; i < len; i++) {
            egret.setTimeout(function () {
                obj.appendText(strArr[Number(this)]);
            }, i, interval * i);
        }
    }

    /**
     * 播放动画方法
     * isLoop     是否需要循环播放
     */
    export function playAnimation(target:egret.tween.TweenGroup, isLoop:boolean):void
    {
        if(isLoop)
        {
            for(var key in target.items)
            {
                target.items[key].props = {loop:true};
            }
        }
        target.play();
    }
    /**
     * 对目标对象做一次 曲线运动 p0起点 p1中间点 p2终点 duration运动持续时间 rotation 旋转角度步长值
     */
    export function besselCurveAnimation(target:egret.DisplayObject, p0:egret.Point, p1:egret.Point, p2:egret.Point, duration:number, rotation?:number)
    {
        let obj = {factor:0};
        let movePoint = new egret.Point();
        let tween = egret.Tween.get(obj, {onChange:()=>{
            		game.besselPoint(obj.factor, p0,p1, p2, movePoint);
	            	target.x = movePoint.x;
	            	target.y = movePoint.y;
                    if(rotation != undefined)
                    {
                         target.rotation += rotation;
                    }
        }});
		tween.to({ factor: 1 }, duration);
    }
}