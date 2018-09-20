namespace qin
{
    export class ExternalInterface
    {
        /**
         * 调用 functionName，并将value传入到native中。
         * 包装一次移到帧尾执行
         */
        public static call(functionName: string, value: string = ''): void
        {
            egret.callLater(function(){
                egret.ExternalInterface.call(functionName, value);
            }, ExternalInterface);
        }
        /**
         * 监听 functionName 回调，需要在native中有调用 functionName 这个字段，而不是 此类的call。
         * 包装一次移到帧尾执行
         */
        public static addCallback(functionName: string, listener: (value: string) => void): void
        {
            egret.ExternalInterface.addCallback(functionName, (value: string) => {
                egret.callLater(function(){
                    if(listener){
                        listener(value);
                    }
                }, ExternalInterface);
            });
        }
    }
}