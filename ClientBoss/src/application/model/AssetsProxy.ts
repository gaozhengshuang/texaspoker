/**
 * 房产代理
 * @author sunboy
 */
module game {

	export class AssetsProxy extends puremvc.Proxy implements puremvc.IProxy{
		public static NAME:string = "AssetsProxy";
		public constructor(){
			super(AssetsProxy.NAME);
		}

		private _userInfo:UserVO=new UserVO();

		public setUserInfo(obj:any):void
		{
			this._userInfo.setObject(obj);
		}

		public getUserInfo():UserVO
		{
			return this._userInfo;
		}

		public renameTime: number = 5;

		public isGaming:boolean = false;

	}
}