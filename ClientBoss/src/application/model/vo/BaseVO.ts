/**
 * Created by sunboy on 2015/3/27.
 *
 *
 */
module game
{
    export class BaseVO
    {
        public constructor(obj:any=null)
        {
            this.enumerable();
            //this.setObject(obj);
        }
        private enumerable():void
        {

        }
        public setObject(obj:any):void
        {
            for (var name in obj)
            {
                this[name] = obj[name];
            }
        }
    }
}