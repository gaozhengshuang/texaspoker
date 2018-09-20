module game
{
	/**
	 * 编码工具
	 */
	export class CodeUtil
	{
		/**
		 * base64 to ArrayBuffer
		 */
		public static base64ToArrayBuffer(base64: string): ArrayBuffer
		{
			var binary_string = atob(base64);
			var len = binary_string.length;
			var bytes = new Uint8Array(len);
			for (var i = 0; i < len; i++)
			{
				bytes[i] = binary_string.charCodeAt(i);
			}
			return bytes.buffer;
		}
		/**
		 * ArrayBuffer to base64
		 */
		public static arrayBuffer2Base64(buf: ArrayBuffer): string
		{
			let dv: DataView = new DataView(buf);
			let a: Array<number> = [];
			for (var i = 0; i < dv.byteLength; i++)
			{
				a[i] = dv.getUint8(i);
			}
			return CodeUtil.byteArray2String(a);
		}
		/**
		 * 字节数组转字符串
		 */
		public static byteArray2String(arr: Array<number>): string
		{
			let result: string = StringConstants.Empty;
			for (let i: number = 0; i < arr.length; i++)
			{
				result += String.fromCharCode(arr[i]);
			}
			return result;
		}
		/**
		 * 获取字符串占字节长度
		*/
		public static getStringByteLength(str: string): number
		{
			let byteSize: number = 0;
			for (let i: number = 0; i < str.length; i++)
			{
				let code: number = str.charCodeAt(i);
				if (0x00 <= code && code <= 0x7f)
				{
					byteSize += 1;
				} else if (0x80 <= code && code <= 0x7ff)
				{
					byteSize += 2;
				} else if ((0x800 <= code && code <= 0xd7ff)
					|| (0xe000 <= code && code <= 0xffff))
				{
					byteSize += 3;
				}
			}
			return byteSize;
		}
	}
}