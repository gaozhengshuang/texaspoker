
module game {

	export class CommandName {
		public static STARTUP: string = "startup";

		public static SCENE_SWITCH_LOGIN: string = "scene_switch_login";
		public static SCENE_SWITCH_MAP: string = "scene_switch_map";
		public static SCENE_SWITCH_DISCOVERY: string = "scene_switch_discovery";
		public static SCENE_SWITCH_TRADING: string = "scene_switch_trading";
		public static SCENE_SWITCH_MINE: string = "scene_switch_mine";
		public static GOTO_HOME_PAGE: string = "goto_home_page";

		public static SHOW_USER_INFO: string = "show_user_info";
		public static GET_SELF_COORDINSTE: string = "get_self_coordinate";
		public static UPDATE_USER_INFO: string = "update_user_info";
		public static MAP_POSITION: string = "map_position";

		public static PAGE_SWITCH_ROOM: string = "page_switch_room";
		public static PAGE_SWITCH_SMALL_GAME: string = "page_switch_small_game";
		public static REMOVE_SMALL_GAME_PAGE: string = "remove_small_game_page";

		public static REMOVE_POPUP: string = "remove_popup";


		/////////////////////
		/////请求服务器///////
		/////////////////////
		public static HTTP_REQ_LOGIN: string = "http_req_login";


		public static SOCKET_REQ_UPDATED_POINT: string = "socket_req_updated_point";
		public static SOCKET_REQ_GOIN_ROOM: string = "socket_req_goin_room";


		////////////////
		////错误消息////
		///////////////
		public static NET_CONNECTION_ERROR: string = "net_connection_error";

		
	}
}