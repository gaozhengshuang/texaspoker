module game {
    export class CartList extends PanelComponent {
       

        protected getSkinName() {
            return CartListSkin;
        }

      
        private static _instance: CartList;

        public static getInstance(): CartList {
            if (!CartList._instance) {
                CartList._instance = new CartList();
            }
            return CartList._instance;
        }
    }
}