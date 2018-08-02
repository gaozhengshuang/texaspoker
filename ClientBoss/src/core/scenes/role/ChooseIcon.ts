module game {
	export class ChooseIcon extends eui.Component implements eui.UIComponent {
		bg			: eui.Image;
		chose		: eui.Image;
		icon		: eui.Image;
		radioButton : eui.RadioButton;

		posType		: msg.ItemPos;

		constructor() {
			super();
			this.skinName = ChooseIconSkin;
		}
		
		public setData(data:{Type,iconPath})
		{
			this.radioButton.group =  RoleDress.getInstance().partRadioBtnGroup;
			this.icon.source = data.iconPath;
			this.posType = data.Type;
		}

		public setIcon(src:string) {
			this.icon.source = src;
		}

		public radioChangeHandler()
		{
			this.chose.visible = this.radioButton.selected;
		}
	}

	
}