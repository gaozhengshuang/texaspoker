module game {
	/**
	 * 引导管理器
	 */
	export class GuideManager {

		//注
		//当前已完成的最大引导步骤 在userinfo newplayerstep

		public init()
		{
			GuideExecutor.getInstance().init();
		}

		/**
		 * 请求设置引导步骤
		 */
		public reqSetGuideSetp(step: number, id:number) {
			if (step > 0) {
				let data = new msg.C2GW_ReqSetNewPlayerStep();
				data.index = id;
				data.step = step;
				sendMessage("msg.C2GW_ReqSetNewPlayerStep", msg.C2GW_ReqSetNewPlayerStep.encode(data));
			}
			else {
				Console.log("设置引导步骤参数非法！step:", step);
			}
		}

		/**
		 * 获取一组中第一步引导
		 */
		public getTGuideDefine(group: number): table.TGuideDefine {
			let defList: table.TGuideDefine[] = [];
			table.TGuide.forEach((value) => {
				if (value.Group == group) {
					defList.push(<table.TGuideDefine>value);
				}
			});

			while (defList.length > 0) {
				let def: table.TGuideDefine = defList.shift();
				let preDef = <table.TGuideDefine>table.TGuideById[def.PreId];
				if (preDef && preDef.Group != def.Group || !preDef) {
					return def;
				}
			}
			return null;
		}

		private static _instance: GuideManager;
		public static getInstance(): GuideManager {
			if (!GuideManager._instance) {
				GuideManager._instance = new GuideManager();
			}
			return GuideManager._instance;
		}
	}
}