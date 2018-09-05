module game {
    export class GameMissile extends eui.Component {
        line: eui.Image;
        Aim: eui.Image;
        itemImg: eui.Image;

        missileGroup: eui.Group;

        public constructor() {
			super();
			this.skinName = GameMissileSkin;
		}

        public setImageRotation(r: number) {
            this.missileGroup.rotation = r;
        }
    }
}