namespace qin
{
	export class ColorUtil
	{
		/**
		 * 颜色字符串转颜色数字
		 */
		public static colorToNumber(color:string):number
		{
			if(/^(rgb|RGB)/.test(color))
			{
				let rgbList = color.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
				let strHex = "0x";
				for(let i=0; i<rgbList.length; i++)
				{
					let hex:string = Number(rgbList[i]).toString(16);
					if(hex.length == 1)
					{
						hex = '0'+hex;
					}
					strHex += hex;
				}
				return parseInt(strHex);
			}
			else if(/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color))
			{
				var hex = color.replace(/#/,'').split('');
				if(hex.length === 6)
				{
					return parseInt('0x'+hex.join(''));
				}
				else if(hex.length === 3)
				{
					var strHex = '0x';
					for(var i=0; i<hex.length; i++)
					{
						strHex += (hex[i]+hex[i]);
					}
					return parseInt(strHex);
				}
			}
			else if(/^0x([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color))
			{
				return parseInt(color);
			}
			else
			{
				return parseInt('0x'+color);
			}
		}
	}
}