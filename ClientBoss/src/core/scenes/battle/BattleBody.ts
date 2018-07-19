module game {
    export class BattleBody extends GameComponent implements PoolItem {
        battleBodyType: BattleBodyType;

        onCreate() {
        }

        onDestroy() {
        }

        onRecycle() {
        }

        onMoveout(){
            this.x = -1000;
            this.y = -1000;
        }
    }
}