module game {
    export function openPanel(panelType: PanelType, data: any = null) {
        let panel = getPanel(panelType);
        if (panel) {
            panel.show();
        }
    }
    export function panelIsShow(panelType: PanelType): boolean {
        let panel = getPanel(panelType);
        if (panel && panel.parent) {
            return true;
        }
        return false;
    }
    function getPanel(panelType: PanelType): PanelComponent {
        let panel: PanelComponent;
        switch (panelType) {
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
                panel = BattlePanel.getInstance();
                break;
            case PanelType.battle2:
                panel = SuperMartPanel.getInstance();
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
            case PanelType.GameUserInfoPanel:
                panel = GameUserInfoPanel.getInstance();
                break;
            case PanelType.WelcomeNewPlayersPanel:
                panel = WelcomeNewPlayersPanel.getInstance();
                break;
            case PanelType.SimpleLoadingPanel:
                panel = SimpleLoadingPanel.getInstance();
                break;
            case PanelType.LoadingScenePanel:
                panel = LoadingScenePanel.getInstance();
                break;
            case PanelType.PageNewHouseView:
                panel = PageNewHouseView.getInstance();
                break;
            case PanelType.PageNewHouseHuxingView:
                panel = PageNewHouseHuxingView.getInstance();
                break;
            case PanelType.CarShop:
                panel = CarShop.getInstance();
                break;
            case PanelType.MapBuildingPopupPanel:
                panel = MapBuildingPopupPanel.getInstance();
                break;
            case PanelType.TradePanel:
                panel = TradePanel.getInstance();
                break;
            case PanelType.TradeRecordPanel:
                panel = TradeRecordPanel.getInstance();
                break;
            case PanelType.TradeMyAssetsPanel:
                panel = TradeMyAssetsPanel.getInstance();
                break;
            case PanelType.TradeHouseBuyPanel:
                panel = TradeHouseBuyPanel.getInstance();
                break;
            case PanelType.TradeHouseSellPanel:
                panel = TradeHouseSellPanel.getInstance();
                break;
            case PanelType.MaidLevelUp:
                panel = RoleLevelUpPanel.getInstance();
                break;
            case PanelType.TradeCarBuyPanel:
                panel = TradeCarBuyPanel.getInstance();
                break;
            case PanelType.TradeCarSellPanel:
                panel = TradeCarSellPanel.getInstance();
                break;
            case PanelType.TradeItemBuyPanel:
                panel = TradeItemBuyPanel.getInstance();
                break;
            case PanelType.TradeMyItemPanel:
                panel = TradeMyItemPanel.getInstance();
                break;
            case PanelType.TradeItemSellPanel:
                panel = TradeItemSellPanel.getInstance();
                break;
            case PanelType.TradeItemBackPanel:
                panel = TradeItemBackPanel.getInstance();
                break;
            case PanelType.MapzhuhuListPopupPanel:
                panel = MapzhuhuListPopupPanel.getInstance();
                break;
            case PanelType.MapEventsShopPanel:
                panel = MapEventsShopPanel.getInstance();
                break;
            case PanelType.NearbyPlayersPopupPanel:
                panel = NearbyPlayersPopupPanel.getInstance();
                break;
            case PanelType.NearbyAssesListPopupPanel:
                panel = NearbyAssesListPopupPanel.getInstance();
                break;
            case PanelType.PageUserInfoView:
                panel = PageUserInfoView.getInstance();
                break;
            case PanelType.CarExpeditionPanel:
                panel = CarExpeditionPanel.getInstance();
                break;
            case PanelType.CarExpeditionInfoPanel:
                panel = CarExpeditionInfoPanel.getInstance();
                break;
            default:
                Console.log("未找到面板！面板名：", panelType);
                break;
        }
        return panel;
    }
    export const enum PanelType {
        rank = 1,
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
        battle2,
        carDetail,
        carPublicLot,
        GameSceneAssetsView,
        GameDiscoveryView,
        GameMineView,
        GameRoomView,
        PageNewHouseView,
        GameUserInfoPanel,
        WelcomeNewPlayersPanel,
        SimpleLoadingPanel,
        LoadingScenePanel,
        CarShop,
        PageNewHouseHuxingView,
        MapBuildingPopupPanel,
        TradePanel,
        TradeRecordPanel,
        TradeMyAssetsPanel,
        TradeHouseBuyPanel,
        TradeHouseSellPanel,
        MaidLevelUp,
        TradeCarBuyPanel,
        TradeCarSellPanel,
        TradeItemBuyPanel,
        TradeMyItemPanel,
        TradeItemSellPanel,
        TradeItemBackPanel,
        MapzhuhuListPopupPanel,
        MapEventsShopPanel,
        NearbyPlayersPopupPanel,
        NearbyAssesListPopupPanel,
        PageUserInfoView
        CarExpeditionPanel,
        CarExpeditionInfoPanel,
    }
}
