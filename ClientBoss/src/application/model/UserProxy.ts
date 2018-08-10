/**
 * 用户代理
 * @author sunboy
 */
module game {

	export class UserProxy extends puremvc.Proxy implements puremvc.IProxy{
		public static NAME:string = "UserProxy";
		public constructor(){
			super(UserProxy.NAME);
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