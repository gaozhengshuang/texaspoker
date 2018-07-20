module game {
    export class RoleDress extends PanelComponent {
       

        protected getSkinName() {
            return RoleDressSkin;
        }

      
        private static _instance: RoleDress;

        public static getInstance(): RoleDress {
            if (!RoleDress._instance) {
                RoleDress._instance = new RoleDress();
            }
            return RoleDress._instance;
        }
    }
}