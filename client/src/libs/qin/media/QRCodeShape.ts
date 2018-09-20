namespace qin
{
    /**
     * 二维码生成器 暂时没用到
     */
    /*
    export class QRCodeShape extends egret.Shape
    {
        private _qrcode:QRCode;
        public make(text: string, size: number = 256, color: number = 0x000000): void
        {
            if(!this._qrcode)
            {
                this._qrcode = new QRCode();
            }
            this._qrcode.makeCode(text);
            let points: Array<Array<boolean>> = this._qrcode.getPoints();
            this.graphics.clear();
            this.graphics.beginFill(color, 1);
            let length:number = points.length;
            for (let i: number = 0; i < length; i++)
            {
                let lines: Array<boolean> = points[i];
                for (let j: number = 0; j < lines.length; j++)
                {
                    if (lines[j])
                    {
                        this.graphics.drawRect(size / length * i, size / length * j, size / length, size / length);
                    }
                }
            }
            this.graphics.endFill();
        }
    }
    */
}