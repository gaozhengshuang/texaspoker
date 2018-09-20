/**
 * 道具种类
*/
var ItemType;
(function (ItemType) {
    /**
     * 数值道具和vip
    */
    ItemType[ItemType["Property"] = 1] = "Property";
    /**
     * 门票
    */
    ItemType[ItemType["Ticket"] = 2] = "Ticket";
    /**
     * 兑奖券
    */
    ItemType[ItemType["Raffle"] = 3] = "Raffle";
    /**
     * 小喇叭
    */
    ItemType[ItemType["Horn"] = 4] = "Horn";
})(ItemType || (ItemType = {}));
//# sourceMappingURL=ItemEnum.js.map