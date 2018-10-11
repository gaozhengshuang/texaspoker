/**
 * 音乐音效配置表
 */
class MusicDefined
{
	private static _instance: MusicDefined;
	public static GetInstance(): MusicDefined
	{
		if (MusicDefined._instance == null)
		{
			MusicDefined._instance = new MusicDefined();
		}
		return MusicDefined._instance;
	}
	/**
	 * 根据性别、行为、牌、获取一个音效，随机
	 */
	public getSexMusicDefinition(sex: number, action: string, pai?: number): string
	{
		let def: table.IMusicDefine = this.getMusicDefinition(action, pai);
		if (def)
		{
			let index: number = 0;
			if (sex == Sex.Female && def.Girl)
			{
				index = game.MathUtil.getRandom(0, def.Girl.length - 1);
				return def.Girl[index];
			}
			else if (sex == Sex.Male && def.Boy)
			{
				index = game.MathUtil.getRandom(0, def.Boy.length - 1);
				return def.Boy[index];
			}
			else
			{
				if (def.Boy)
				{
					index = game.MathUtil.getRandom(0, def.Boy.length - 1);
					return def.Boy[index];
				}
			}
		}
		return game.StringConstants.Empty;
	}
	/**
	 * 获取音效定义 
	 */
	public getMusicDefinition(action: string, pai?: number): table.IMusicDefine
	{
		let def: table.IMusicDefine;
		if (action == "any")//MusicAction.pai
		{
			if (pai != undefined)
			{
				for (let def of table.Music)
				{
					if (def.Id == pai)
					{
						return def;
					}
				}
			}
		}
		else
		{
			for (let def of table.Music)
			{
				if (def.Action == action)
				{
					return def;
				}
			}
		}
	}
}