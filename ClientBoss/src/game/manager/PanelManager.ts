module game {
    export function openPanel(panelType: PanelType, data: any = null) {
        let panel: PanelComponent;
        switch (panelType) {
            case PanelType.win:
                panel = WinScene.getInstance();
                break;
            case PanelType.rank:
                panel = RankPanel.getInstance();
                break;
            case PanelType.lucky:
                panel = BattleLucky.getInstance();
                break;
            case PanelType.bag:
                panel = BattleBag.getInstance();
                break;
            case PanelType.register:
                panel = RegisterPanel.getInstance();
                break;
            case PanelType.user:
                panel = UserPanel.getInstance();
                break;
            case PanelType.history:
                panel = HistoryMoneyPanel.getInstance();
                break;
            case PanelType.delivery:
                panel = DeliveryPanel.getInstance();
                break;
            case PanelType.deliverySetting:
                panel = DeliverySetting.getInstance();
                break;
            case PanelType.pay:
                panel = BattlePay.getInstance();
                break;
            case PanelType.dress:
                panel = RoleDress.getInstance();
                break;
            case PanelType.dressShopCarts:
                panel = RoleDressShopCart.getInstance();
                break;
            case PanelType.battle:
                panel = BattleScene.getInstance();
                break;
            case PanelType.carDetail:
                panel = CarDetailView.getInstance();
                break;
            case PanelType.carPublicLot:
                panel = CarPublicParkingLotManager.getInstance();
                break;
            case PanelType.GameSceneAssetsView:
                panel = GameSceneAssetsView.getInstance();
                break;
            case PanelType.GameDiscoveryView:
                panel = GameDiscoveryView.getInstance();
                break;
            case PanelType.GameMineView:
                panel = GameMineView.getInstance();
                break;
            case PanelType.GameRoomView:
                panel = GameRoomView.getInstance();
                break;
        }
        if (panel) {
            panel.show();
        }
    }

    export const enum PanelType {
        win = 1,
        rank,
        lucky,
        bag,
        register,
        user,
        history,
        delivery,
        deliverySetting,
        pay,
        dress,
        dressShopCarts,
        battle,
        carDetail,
        carPublicLot,
        GameSceneAssetsView,
        GameDiscoveryView,
        GameMineView,
        GameRoomView
    }
}