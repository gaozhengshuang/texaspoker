module game {
    export class EquipInfo extends eui.Component {
        public constructor() {
            super();
        }

        protected partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }


        protected childrenCreated(): void {
            super.childrenCreated();
        }

        window["game.EquipInfo"] = game.EquipInfo;
    }
}