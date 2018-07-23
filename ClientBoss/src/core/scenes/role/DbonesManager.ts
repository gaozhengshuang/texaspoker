
module game {
    export class DbonesManage {
 

        private _armature: dragonBones.Armature;
        public isReady: boolean = false;


        async loadDbones(skeJson: string = "man_json",texJson:string = "texture_json",texPng:string = "texture_png") {

            let skeName = "man";
            let testAnim = "runFront";

            console.log(RES.hasRes(skeJson), RES.hasRes(texJson), RES.hasRes(texPng));

            let dbData = null;
            let texData = null;
            let tex = null;

            await RES.getResAsync(skeJson).then((res) => { dbData = res; })
            await RES.getResAsync(texJson).then((res) => { texData = res; });
            await RES.getResAsync(texPng).then((res) => { tex = res; })



            // let dbdata = RES.getRes(skeJson);
            // let texturedata = RES.getRes(texJson);
            // let texture = RES.getRes(texPng);

            console.log("加载龙骨：", dbData, texData, tex);

            var dbf: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
            dbf.parseDragonBonesData(dbData);
            dbf.parseTextureAtlasData(texData, tex);

            // dbf.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(dbdata));
            // dbf.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, texturedata));


            var arm: dragonBones.Armature = dbf.buildArmature(skeName);

            arm.animation.play(testAnim,0);
            dragonBones.WorldClock.clock.add(arm);

            this._armature = arm;
            egret.startTick(this.dbrun, this);
        }

        public  adjust(e: egret.DisplayObjectContainer) {
            this.display.x = e.width * .5;
            this.display.y = e.height;
        }

        //由tick驱动，刷新DragonBones世界时钟
        private dbrun(timeStamp: number): boolean {
            dragonBones.WorldClock.clock.advanceTime(0.01);
            return true;
        }

        //获取骨架中的display显示对象
        public get display(): egret.DisplayObject {
            return this._armature.display;
        }

        //设置头发slot
        //参数为即将替换的纹理集ID
        public setHead(val: string[]): void {
            this.setNewSlot("Atoufa", val[0]);
        }

        //设置上衣
        //参数为即将替换的纹理集ID
        public setCloth(val: string[]): void {
            this.setNewSlot("Ayifu", val[0]);
            this.setNewSlot("Axiuzi11", val[1]);
            this.setNewSlot("Axiuzi21", val[2]);
            this.setNewSlot("Axiuzi12", val[3]);
            this.setNewSlot("Axiuzi22", val[4]);
        }

        //设置裤子
        //参数为即将替换的纹理集ID
        public setPants(val: string[]): void {
            this.setNewSlot("Akuzi", val[0]);
            this.setNewSlot("Akuzi12", val[1]);
            this.setNewSlot("Akuzi22", val[2]);
            this.setNewSlot("Akuzi11", val[3]);
            this.setNewSlot("Akuzi21", val[4]);
        }

        //设置鞋子
        //参数为即将替换的纹理集ID
        public setShoe(val: string[]): void {
            this.setNewSlot("Axiezi1", val[0]);
            this.setNewSlot("Axiezi2", val[1]);
        }

        //设置整套服装
        //参数为即将替换的整套服装的资源ID，数据为二维数组，第一维顺序依次表示，头发，上衣，裤子，鞋子
        public setAll(val: string[][]): void {
            this.setHead(val[0]);
            this.setCloth(val[1]);
            this.setPants(val[2]);
            this.setShoe(val[3]);
        }

        //针对slot设置其新内容
        private setNewSlot(slotName: string, textureName: string) {
            //方法1
            var slot: dragonBones.Slot = this._armature.getSlot(slotName);
            var b: egret.Bitmap = new egret.Bitmap();
            b.texture = RES.getRes(textureName);
            b.x = slot.display.x;
            b.y = slot.display.y;
            b.anchorOffsetX = b.width / 2;
            b.anchorOffsetY = b.height / 2;
            slot.setDisplay(b);

            //方法2，仅限于slot中内容为Bitmap
            //var slot:dragonBones.Slot = this._armature.getSlot(slotName);
            //slot.display.texture = RES.getRes(textureName);
        }
    }
}