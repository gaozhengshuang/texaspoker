
module game {

	export class CommandName {
		public static STARTUP: string = "startup";

		public static SCENE_SWITCH_LOGIN: string = "scene_switch_login";
		public static SCENE_SWITCH_MAP: string = "scene_switch_map";
		public static SCENE_SWITCH_DISCOVERY: string = "scene_switch_discovery";
		public static SCENE_SWITCH_TRADING: string = "scene_switch_trading";
		public static SCENE_SWITCH_MINE: string = "scene_switch_mine";
		public static SCENE_MAIN_ASSETS: string = "scene_main_assets";
		public static GOTO_HOME_PAGE: string = "goto_home_page";

		public static SHOW_USER_INFO: string = "show_user_info";
		public static GET_SELF_COORDINSTE: string = "get_self_coordinate";
		public static UPDATE_USER_INFO: string = "update_user_info";
		public static UPDATE_ROOM_INFO: string = "update_room_info";
		public static UPDATE_TILI_TIME: string = "update_tili_time";
		public static MAP_POSITION: string = "map_position";
		public static HAVE_NEW_DONGTAI: string = "have_new_dongtai";

		public static PAGE_SWITCH_ROOM: string = "page_switch_room";
		public static PAGE_SWITCH_NEW_HOUSE: string = "page_switch_new_house";
		
		public static PAGE_SWITCH_SMALL_GAME: string = "page_switch_small_game";
		public static REMOVE_SMALL_GAME_PAGE: string = "remove_small_game_page";
		public static REMOVE_ROOM_PAGE: string = "remove_room_page";

		public static POPUP_WELCOME: string = "popup_welcome";
		public static POPUP_ROOM_NEIGHBOR: string = "popup_room_neighbor";
		public static POPUP_ROOM_DONGTAI: string = "popup_room_dongtai";
		public static POPUP_NEW_HOUSE_HUXING: string = "popup_new_house_huxing";
		public static POPUP_NEW_MAP_BUILDING: string = "popup_map_building";
		public static POPUP_BUILDING_ZHUFU: string = "popup_building_zhufu";
		public static POPUP_NEARBY_INFO: string = "popup_nearby_info";
		public static POPUP_NEARBY_ASSES: string = "popup_nearby_asses";
		public static REMOVE_POPUP: string = "remove_popup";
		public static REMOVE_POPUP_NEW_HOUSE: string = "remove_popup_new_house";
		public static ERROR_ALERT: string = "error_alert";
		public static REMOVE_ALERT_ERROR: string = "remove_error_alert";
		

		public static SHOW_TOP_ROOM_INFO: string = "show_top_room_info";
		public static SHOW_TOP_ROOM_NUM: string = "show_top_room_num";
		public static SHOW_TOP_ROOM_BG: string = "show_top_room_bg";
		public static PLUNDER_SUCCESS: string = "plunder_success";
		public static RECEIVE_SUCCESS: string = "receive_success";
		public static HOUSE_LEVEL_SUCCESS: string = "house_level_success";
		public static ROOM_LEVEL_SUCCESS: string = "room_level_success";
		public static ROOM_PARKINGLOT_UPDATE : string = "roome_parkinglot_update";
		public static MAIN_ASSETS_UPDATE : string = "main_assets_update";
		public static MAP_ACTION: string = "map_action";
		public static MAP_BUILDING_INFO: string = "map_building_info";
		public static MAP_FUJIN_SWITCH: string = "map_fujin_switch";
		public static MAP_AREA_TOTAL: string = "map_area_total";

		/////////////////////
		/////请求服务器///////
		/////////////////////
		public static HTTP_REQ_LOGIN: string = "http_req_login";


		public static SOCKET_REQ_UPDATED_POINT: string = "socket_req_updated_point";
		public static SOCKET_REQ_GOIN_ROOM: string = "socket_req_goin_room";
		public static SOCKET_REQ_ASSETS_LIST: string = "socket_req_assets_list";
		public static SOCKET_REQ_ALLOT_ROOM: string = "socket_req_allot_room";
		public static SOCKET_REQ_PLUNDER: string = "socket_req_plunder";
		public static SOCKET_REQ_NEIGHBOR_LIST: string = "socket_req_neighbor_list";
		public static SOCKET_REQ_RECEIVE: string = "socket_req_receive";
		public static SOCKET_REQ_LEVEL: string = "socket_req_level";


		////////////////
		////错误消息////
		///////////////
		public static NET_CONNECTION_ERROR: string = "net_connection_error";

		
	}
}