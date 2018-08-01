module game {
    export class BattleFirewall extends BattleBody {
        public wallIndex: number;
        public channel: egret.SoundChannel;

        onCreate() {
            let sound_eff = RES.getRes("huoqiangloop_mp3");
            sound_eff.type = egret.Sound.EFFECT;
            let channel: egret.SoundChannel = sound_eff.play(0, -1);
            channel.volume = 0.2;
            this.channel = channel;
            this.touchEnabled = this.touchChildren = false;
        }

        onDestroy() {
            this.channel.stop();
            this.removeFromParent();
        }

        protected getSkinName() {
            return BattleFirewallSkin;
        }

        public setData(index: number) {
            this.wallIndex = index;
        }
    }
}