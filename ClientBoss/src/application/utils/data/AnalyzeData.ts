// TypeScript file
module game {
    /**
     * 分析某个玩家房屋列表是否可收
     */
    export function AnalyzeUserGold(houseList: HouseVO[], type: number = 1, userid: number = 0): boolean {
        let bool: boolean = false;
        if (houseList && houseList.length > 0) {
            for (let i: number = 0; i < houseList.length; i++) {
                let house: HouseVO = houseList[i];
                if (house && house.housecells && house.housecells.length > 0) {
                    for (let k: number = 0; k < house.housecells.length; k++) {
                        if (type == 1) {
                            if (house.housecells[k].state == 1) {
                                bool = true;
                                return bool;
                            }
                        } else {
                            if (house.housecells[k].state == 1
                                && house.housecells[k].robers.length < 3
                                && house.housecells[k].indexOf(userid) == -1) {
                                bool = true;
                                return bool;
                            }
                        }
                    }
                }
            }
        }
        return bool;
    }
    /**
     * 分析某个房屋是否可收
     */
    export function AnalyzeHouseGold(house: HouseVO, type: number = 1, userid: number = 0): boolean {
        let bool: boolean = false;
        if (house && house.housecells && house.housecells.length > 0) {
                    for (let k: number = 0; k < house.housecells.length; k++) {
                        if (type == 1) {
                            if (house.housecells[k].state == 1) {
                                bool = true;
                                return bool;
                            }
                        } else {
                            if (house.housecells[k].state == 1
                                && house.housecells[k].robers.length < 3
                                && house.housecells[k].indexOf(userid) == -1) {
                                bool = true;
                                return bool;
                            }
                        }
                    }
                }
        return bool;
    }

}