module game {

    export class ElementData {
        public id: string = "";     //元素唯一ID编号
        public icon: string = "";     //元素ICON纹理所对应的纹理ID
        public resNames: string[] = null;   //当前元素所包含的资源ID，资源ID来自于纹理集中的资源ID
        public type: string = "";     //元素类型,head：头发，cloth：上衣，pants：裤子，shoe：鞋子，all：整套服装
    }


    export class SkinData {
        private _eleData: ElementData[] = null;   //服装数据
        private _groupData: ElementData[] = null;   //组数据
        private _allData: ElementData[] = null;   //全身服装数据

        //设置服装数据
        public setEleData(val: ElementData[]) {
            this._eleData = val;
        }

        //获取服装数据
        public get eleData(): ElementData[] {
            return this._eleData;
        }

        //设置组数据
        public setGroupData(val: ElementData[]) {
            this._groupData = val;
        }

        //获取组数据
        public get groupData(): ElementData[] {
            return this._groupData;
        }

        //设置全身服装数据
        public setAllData(val: ElementData[]) {
            this._allData = val;
        }

        //获取全身服装数据
        public get allData(): ElementData[] {
            return this._allData;
        }

        //通过ID获取其资源中的resNames数据项
        public getResNamesDataByID(id: string): string[] {
            var len: number = this._eleData.length;
            for (var i: number = 0; i < len; i++) {
                if (this._eleData[i].id == id) {
                    return this._eleData[i].resNames;
                }
            }
            return null;
        }

        //通过type类型，获取element数据
        public getEleDataByType(type: string): ElementData[] {
            if (type == "all") {
                return this._allData;
            }
            var eles: ElementData[] = [];
            var len: number = this._eleData.length;
            for (var i: number = 0; i < len; i++) {
                if (this._eleData[i].type == type) {
                    eles.push(this._eleData[i]);
                }
            }
            return eles;
        }

        //根据ID搜索全身服装中的资源名
        public getResNamesDataByIDWithAll(id: string): string[][] {
            var eleids: string[];
            var len: number = this._allData.length;
            for (var i: number = 0; i < len; i++) {
                if (this._allData[i].id == id) {
                    eleids = this._allData[i].resNames;
                    break;
                }
            }

            var strs: string[][] = [];
            len = eleids.length;
            for (var i: number = 0; i < len; i++) {
                strs.push(this.getResNamesDataByID(eleids[i]));
            }
            return strs;
        }
    }


    export class SkinParse {
        //解析数据
        //data为加载的自定义格式json数据
        //dataC为数据容器，所解析后的数据放入到dataC中
        public static parse(data: any, dataC: SkinData) {
            SkinParse.parseEles(data.eles, dataC);
            SkinParse.parseAll(data.all, dataC);
            SkinParse.parseGroup(data.group, dataC);
        }

        //解析服装元素数据
        private static parseEles(data: any, dataC: SkinData) {
            var eles: ElementData[] = [];
            var len: number = data.length;
            for (var i: number = 0; i < len; i++) {
                var d: ElementData = new ElementData();
                d.id = data[i].id;
                d.type = data[i].type;
                d.icon = data[i].icon;
                d.resNames = data[i].resNames;
                eles.push(d);
            }
            dataC.setEleData(eles);
        }

        //解析整套服装数据
        private static parseAll(data: any, dataC: SkinData) {
            var eles: ElementData[] = [];
            var len: number = data.length;
            for (var i: number = 0; i < len; i++) {
                var d: ElementData = new ElementData();
                d.id = data[i].id;
                d.icon = data[i].icon;
                d.resNames = data[i].resNames;
                d.type = "all";
                eles.push(d);
            }
            dataC.setAllData(eles);
        }

        //解析组数据
        private static parseGroup(data: any, dataC: SkinData) {
            var eles: ElementData[] = [];
            var len: number = data.length;
            for (var i: number = 0; i < len; i++) {
                var d: ElementData = new ElementData();
                d.id = data[i].id;
                d.icon = data[i].icon;
                d.type = data[i].type;
                eles.push(d);
            }
            dataC.setGroupData(eles);
        }
    }

}