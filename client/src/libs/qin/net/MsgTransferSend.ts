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
				let writer:protobuf.Writer = cmdBody.encode(args);
				let buffer = writer.finish();
				data.buf = buffer;
				data.uid = UserManager.userInfo.roleId;
				if (sendFunc)
				{
					sendFunc(Command.C2RS_MsgTransfer, data, onResult, onError, thisObj, cmdId);
				}
				else
				{
					SocketManager.call(Command.C2RS_MsgTransfer, data, onResult, onError, thisObj, cmdId);
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
	/**
	 * 发送房间的协议
	 * cmdId 房间子协议号 args子协议参数
	 */
	public static sendMTTRoomProto(cmdId: string, args: any, onResult: Function, onError: Function, thisObj: any, sendFunc?: Function)
	{
		if (UserManager.userInfo)
		{
			let data: msg.C2MTT_MsgTransfer = new msg.C2MTT_MsgTransfer();
			data.name = cmdId;
			let cmdBody = egret.getDefinitionByName(cmdId);
			if (cmdBody)
			{
				let writer:protobuf.Writer = cmdBody.encode(args);
				let buffer = writer.finish();
				data.buf = buffer;
				data.uid = UserManager.userInfo.roleId;
				if (sendFunc)
				{
					sendFunc(Command.C2MTT_MsgTransfer, data, onResult, onError, thisObj, cmdId);
				}
				else
				{
					SocketManager.call(Command.C2MTT_MsgTransfer, data, onResult, onError, thisObj, cmdId);
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