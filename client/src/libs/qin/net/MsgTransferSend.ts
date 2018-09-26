/**
 * 从网关发送到roomserver的协议
 */
class MsgTransferSend
{
	/**
	 * 发送房间的协议
	 * cmdId 房间子协议号 args子协议参数
	 */
	public static sendRoomProto(cmdId: string, args: any, onResult: Function, onError: Function, thisObj: any, sendFunc?: Function)
	{
		if (UserManager.userInfo)
		{
			let data: msg.C2RS_MsgTransfer = new msg.C2RS_MsgTransfer();
			data.name = cmdId;
			let cmdBody = egret.getDefinitionByName(cmdId);
			if (cmdBody)
			{
				data.buf = cmdBody.encode(args);
				data.uid = UserManager.userInfo.id;
				if (sendFunc)
				{
					sendFunc(Command.C2RS_MsgTransfer, msg.C2RS_MsgTransfer.encode(data), onResult, onError, thisObj);
				}
				else
				{
					SocketManager.call(Command.C2RS_MsgTransfer, msg.C2RS_MsgTransfer.encode(data), onResult, onError, thisObj, cmdId);
				}
			}
			else
			{
				game.Console.log("MsgTransferSend 消息体反射失败!cmdId:", cmdId);
			}
		}
		else
		{
			game.Console.log("MsgTransferSend 玩家数据未找到！");
		}
	}
}