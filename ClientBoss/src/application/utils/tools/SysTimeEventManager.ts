module game {
	export class SysTimeEventManager extends egret.EventDispatcher {
		private static instance: SysTimeEventManager;
		public constructor() {
			super();
			if (SysTimeEventManager.instance == null) SysTimeEventManager.instance = this;
		}
		private _systimeNum: number = 0;
		private timer: egret.Timer;
		private functionArr: any[];

		/**
		 * 类的实例引用
		 */

		public static getInstance(): SysTimeEventManager {
			if (this.instance == null) {
				this.instance = new SysTimeEventManager();
			}
			return this.instance;
		}
		public startupTimer(): void {
			if (this.timer == null) {
				this.functionArr = [];
				this.timer = new egret.Timer(1000);
			}
			if (!this.timer.running) {
				this.timer.start();
				this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
			}

		}
		public stopTimer(): void {
			if (this.timer && this.timer.running) {
				this.timer.stop();
				this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
			}
		}
		////////////////////////////////////////////
		public set systimeNum(num: number) {
			this._systimeNum = num;
			this.startupTimer();
		}
		public get systimeNum(): number {
			return this._systimeNum;
		}
		public getDateStr(): string {
			return String(this._systimeNum);
		}
		private timerHandler(eve: egret.TimerEvent): void {
			this._systimeNum += 1;
			this.runFunction(this._systimeNum);
		}
		public addFunction(fun: Function, body: any): void {
			//this.functionArr.push(fun);
			var index: number = -1;
			var lengh: number = this.functionArr.length;
			for (var i: number = 0; i < lengh; i++) {
				if (this.functionArr[i].fun == fun && this.functionArr[i].body == body) {
					index = i;
				}
			}
			if (index == -1) {
				this.functionArr.push({ fun: fun, body: body });
			}
		}
		public delFunction(fun: Function, body: any): void {
			/*var index:number = this.functionArr.indexOf(fun);
			if (index > -1)
			{
				//functionArr.splice(index, 1);
				this.functionArr[index] = null;
			}*/
			var index: number = -1;
			if (this.functionArr && this.functionArr.length > 0) {
				var lengh: number = this.functionArr.length;
				for (var i: number = 0; i < lengh; i++) {
					if (this.functionArr[i].fun == fun && this.functionArr[i].body == body) {
						index = i;
					}
				}
				if (index > -1) {
					this.functionArr.splice(index, 1);
				}
			}


		}
		public delAllFunction(): void {
			if(this.functionArr!=null){
				this.functionArr.length = 0;
			}
			
		}
		private runFunction(time: Number): void {
			if (this.functionArr && this.functionArr.length > 0) {
				var lengh: number = this.functionArr.length;
				for (var i: number = 0; i < lengh; i++) {
					if (this.functionArr[i] != null) {
						var fun: Function = this.functionArr[i].fun as Function;
						fun(time, this.functionArr[i].body);
					}
				}
			}
		}


		//显示xx:xx:xx时间格式 showZero:是否用零补位 notShowHour:是否不显示小时
		public getHourMinutesTime(time: number, showZero: boolean = true, notShowHour: boolean = true): string {
			var hour: number;
			var minute: number;
			var second: number;

			hour = Math.floor(time / (60 * 60));
			time = time % (60 * 60);
			minute = Math.floor(time / (60));
			time = time % (60);
			second = Math.floor(time);

			if (showZero) {
				var hourStr: string = hour < 10 ? "0" + hour : String(hour);
				var minuteStr: string = minute < 10 ? "0" + minute : String(minute);
				var secondStr: string = second < 10 ? "0" + second : String(second);
				if (notShowHour) {
					return [minuteStr, secondStr].join(":");
				} else {
					return [hourStr, minuteStr, secondStr].join(":");
				}
			} else {
				if (notShowHour) {
					return [minute, second].join(":");
				} else {
					return [hour, minute, second].join(":");
				}
			}
		}
	}
}