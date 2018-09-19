/**
 * Created by sunboy on 2015/4/8.
 */
module game
{
    export class BasicEvent extends egret.Event
    {
        public EventObj:any;
        public constructor(type: string,obj?:any, bubbles?: boolean, cancelable?: boolean)
        {
            super(type,bubbles,cancelable)
            this.EventObj=obj
        }
    }
}