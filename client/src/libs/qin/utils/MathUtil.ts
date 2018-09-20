module qin
{
	export class MathUtil
	{
		/**
		 * 弧度转角度计量值
		 */
		public static readonly Radian2Angle: number = 180 / Math.PI;
		/**
		 * 角度转弧度
		 */
		public static readonly Angle2Radian: number = Math.PI / 180;
		/**
		 * 数字以逗号分割时的数位: 123,456,789
		 */
		public static readonly CommaNum = 3;

		// Obtient une valeur comprise dans un interval
		public static clamp(value, min, max): number
		{
			if (value < min)
			{
				return min;
			}
			else if (value > max)
			{
				return max;
			}
			return value;
		};
		// Obtient une interpolation linéaire entre 2 valeurs
		public static lerp(value1, value2, amount): number
		{
			amount = amount < 0 ? 0 : amount;
			amount = amount > 1 ? 1 : amount;
			return value1 + (value2 - value1) * amount;
		}
		/**
		 * 获取一个随机值含头尾
		 */
		public static getRandom(start: number, end: number): number
		{
			return Math.round(Math.random() * (end - start)) + start;
		}
		/**
		 * 将大于一万的数转换为数字加“万”或“亿”
		*/
		public static formatNum(num: number): string
		{
			let str: string;
			if (num < 10000)
			{
				str = num.toString();
				return str;
			}
			if (num >= 10000 && num < 100000000)
			{
				if (num % 10000 < 100)
				{
					str = (num / 10000).toString();
				}
				else if (num % 1000 < 100)
				{
					str = MathUtil.fixedFloor(num / 10000, 1);
				}
				else
				{
					str = MathUtil.fixedFloor(num / 10000, 2);
				}
				str = MathUtil.subStrFour(str);
				return str + "万";
			}
			if (num >= 100000000)
			{
				if (num % 100000000 < 1000000)
				{
					str = (num / 100000000).toString();
				}
				else if (num % 10000000 < 1000000)
				{
					str = MathUtil.fixedFloor(num / 100000000, 1);
				}
				else
				{
					str = MathUtil.fixedFloor(num / 100000000, 2);
				}
				str = MathUtil.subStrFour(str);
				return str + "亿";
			}
		}
		/**
		 * 将数字用逗号以 MathUtil.CommaNum 进行分割(用于Label 显示空间大,数值有变化)
		 * 当 MathUtil.CommaNum=3 :1234567=1,234,567
		 * num 为小数时向下取整,支持负数
		 */
		public static numAddSpace(num: number): string
		{
			num = Math.floor(num);
			let isNegative: boolean = false;
			if (num < 0)
			{
				isNegative = true;
				num *= -1;
			}
			let str: string = num.toString();
			if (str.length <= MathUtil.CommaNum || MathUtil.CommaNum < 1)
			{
				if (isNegative)
				{
					return "-" + str;
				}
				return str;
			}
			let len = str.length % MathUtil.CommaNum;
			let strResult: string = "";
			if (isNegative)
			{
				strResult = "-"
			}
			let strList: Array<string> = new Array<string>();
			for (let i: number = 0; i < str.length;)
			{
				if (i == 0 && len > 0)
				{
					let index = i + len;
					if (index > str.length)
					{
						index = str.length;
					}
					strResult += str.substring(i, index);
					i += len;
				}
				else
				{
					let index = i + MathUtil.CommaNum;
					if (index > str.length)
					{
						index = str.length;
					}
					strResult += str.substring(i, index);
					i += MathUtil.CommaNum;
				}
				if (i <= str.length - MathUtil.CommaNum)
				{
					strResult += ",";
				}
			}
			return strResult;
		}

		public static fixedFloor(num: number, fractionDigits?: number): string
		{
			if (!fractionDigits)
			{
				fractionDigits = 0;
			}
			let str: string = num.toString();
			if (str.indexOf(".") + fractionDigits + 1 > str.length)
			{
				return str;
			}
			else
			{
				return str.substring(0, str.indexOf(".") + fractionDigits + 1);
			}

		}
		/**
		 * 剪切前4位数字（不包括小数点）
		 */
		public static subStrFour(str: string): string
		{
			let result: string;
			if (str.indexOf(".") > 3)
			{
				result = str.substr(0, 4);
			}
			else
			{
				result = str.substr(0, 5);
			}
			return result;
		}
		/**
		 * 根据3个点，产生一个贝塞尔曲线点 t[0-1]
		 */
		public static besselPoint(t: number, p0: egret.Point, p1: egret.Point, p2: egret.Point, movePoint: egret.Point)
		{
			if (t < 0 || t > 1 || !p0 || !p1 || !p2 || !movePoint)
			{
				qin.Console.log("贝塞尔曲线参数不合法");
				return;
			}
			let x: number;
			let y: number;
			movePoint.x = (1 - t) * (1 - t) * p0.x + 2 * t * (1 - t) * p1.x + t * t * p2.x;
			movePoint.y = (1 - t) * (1 - t) * p0.y + 2 * t * (1 - t) * p1.y + t * t * p2.y;
		}
	}
}