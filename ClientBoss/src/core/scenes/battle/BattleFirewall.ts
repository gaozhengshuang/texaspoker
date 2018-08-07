module game {
    export class BattleFirewall extends BattleBody {
        public wallIndex: number;
        public channel: egret.SoundChannel;

        onCreate() {
            RES.getResAsync(`huoqiangloop_mp3`, (value: egret.Sound) => {
                if (!value) return;
                    let sound_eff = value;
                    sound_eff.type = egret.Sound.EFFECT;
                    let channel: egret.SoundChannel = sound_eff.play(0, -1);
                    channel.volume = 0.2;
                    this.channel = channel;
            }, this);

            this.touchEnabled = this.touchChildren = false;
        }

        onDestroy() {
            if (this.channel) {
                this.channel.stop();
            }
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