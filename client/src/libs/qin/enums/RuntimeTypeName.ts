module qin
{
    export class RuntimeTypeName
    {
        public static readonly Web: string = 'web';
        public static readonly Ios: string = 'ios';
        public static readonly Android: string = 'android';
        public static readonly WindowsPhone: string = 'wphone';
        public static readonly WindowsPC: string = 'wpc';
        /**
         * 运行类型名（Web和Native混一起区分，如果要获取运行的系统名，请使用getOSName()）
         */
        public static getCurrentName()
        {
            if (System.isMicro)
            {
                return RuntimeTypeName.getOSName();
            }
            else
            {
                return RuntimeTypeName.Web;
            }
        }

        /**
         * 获取终端系统名
         */
        public static getOSName(): string
        {
            let os: string = egret.Capabilities.os.toLowerCase();
            if (os == 'ios')
            {
                return RuntimeTypeName.Ios;
            }
            else if (os == 'android')
            {
                return RuntimeTypeName.Android;
            }
            else if (os == 'windows phone')
            {
                return RuntimeTypeName.WindowsPhone;
            }
            else if (os == 'windows pc')
            {
                return RuntimeTypeName.WindowsPC;
            }
            else
            {
                return StringConstants.Empty;
            }
        }
    }
}