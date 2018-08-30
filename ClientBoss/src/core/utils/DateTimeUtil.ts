module game
{
	/**
	 * 时间处理工具
	 */
	export class DateTimeUtil 
	{
		public static Format_Standard_Full: string = "yyyy-MM-dd hh:mm:ss";
		public static Format_Standard_Date: string = "yyyy-MM-dd";
		public static Format_Standard_Time: string = "hh:mm:ss";
		public static Format_Standard_NoSecond: string = "yyyy-MM-dd hh:mm";
		public static Format_Standard_NoSecondAndYear: string = "MM-dd hh:mm";
		public static Format_China_Full: string = "yyyy年MM月dd日 hh时mm分ss秒";
		public static Format_China_Date: string = "yyyy年MM月dd日";
		public static Format_China_Time: string = "hh时mm分ss秒";
		public static Format_China_NoSecond: string = "yyyy年MM月dd日 hh时mm分";
		public static Format_China_MonthDay: string = "MM月dd日";


		private static baseDateFormat(date: Date, format: string, tpl: Object): string
		{
			if (/(y+)/i.test(format))
			{
				format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
			}
			for (var k in tpl)
			{
				if (new RegExp("(" + k + ")").test(format))
				{
					format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? tpl[k] : ("00" + tpl[k]).substr(("" + tpl[k]).length));
				}
			}
			return format;
		}
		/**
		 * 把Date对象格式化为yyyy-MM-dd h:m:s格式的日期时间
		 * 参数date不填则为当前日期时间
		 */
		public static formatDate(date?: Date, format?: string): string
		{
			if (!date)
			{
				date = new Date();
			}
			if (!format)
			{
				format = DateTimeUtil.Format_Standard_Full;
			}
			let tpl: Object = {
				'M+': date.getMonth() + 1,
				'd+': date.getDate(),
				'h+': date.getHours(),
				'm+': date.getMinutes(),
				's+': date.getSeconds(),
				'q+': Math.floor((date.getMonth() + 3) / 3),
				'S+': date.getMilliseconds()
			};
			return DateTimeUtil.baseDateFormat(date, format, tpl);
		}
		/**
		 * 把时间戳（秒）格式化为yyyy-MM-dd h:m:s格式的日期时间
		 * 参数timestamp不填则为当前日期时间
		 */
		public static formatTimestamp(timestamp?: number, format?: string): string
		{
			var date = new Date();
			if (timestamp != undefined && timestamp != null)
			{
				date.setTime(timestamp * 1000);
			}
			return DateTimeUtil.formatDate(date, format);
		};
		/**
		 * 把yyyy-MM-dd h:m:s格式的日期时间转为时间戳(秒)
		 * 如果不填则获取当前时间戳(秒)
		 */
		public static toTimestamp(unixTime?: string): number
		{
			let date = unixTime ? new Date(unixTime) : new Date();
			return Math.round(date.getTime() / 1000);
		}
		/**
		 * 格式化倒计时
		 */
		public static formatCountdown(num: number): string
		{
			if (num >= 10)
			{
				return num.toString();
			}
			else
			{
				return "0" + num.toString();
			}
		}
		/**
		 * 倒计时格式化
		*/
		public static countDownFormat(number: number, isShowH: boolean)
		{
			let h: string;
			let m: string;
			let s: string;
			h = DateTimeUtil.formatCountdown(Math.floor(number / 3600));
			m = DateTimeUtil.formatCountdown(Math.floor((number % 3600) / 60));
			s = DateTimeUtil.formatCountdown(number % 60);
			if (isShowH)
			{
				return h + ":" + m + ":" + s;
			} else
			{
				return m + ":" + s;
			}
		}
		/**
		 * 字符串转日期格式
		 */
		public static stringToDate(str: string): Date
		{
			let array: Array<number> = StringUtil.toIntArray(str);
			if (array)
			{
				return new Date(array[0], array[1], array[2], array[3], array[4], array[5]);
			}
			return null;
		}
		/**
		 * 秒数转date
		 */
		public static secondes2Date(time: number): Date
		{
			if (time >= 0)
			{
				return new Date(time * 1000);
			}
			return null;
		}
		/**
		* 计算剩余时间
		 */
		public static GetLefttimeText(leftTime: number, isHour?: boolean, isShowHour: boolean = false): string
		{
			let result: string;
			let leftT: number = Math.floor(leftTime / 86400);
			if (isShowHour && leftT <= 0)
			{
				result = StringUtil.format("{0}小时", Math.floor(leftTime / 3600));
			} else
			{
				result = StringUtil.format("{0}天", Math.floor(leftTime / 86400));
			}
			if (isHour)
			{
				leftTime %= 86400;
				result += StringUtil.format("{0}小时", Math.floor(leftTime / 3600));
			}
			return result;
		}
	}
}