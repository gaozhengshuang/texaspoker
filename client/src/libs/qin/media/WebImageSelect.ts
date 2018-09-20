module qin
{
	export class WebImageSelect
	{
		private static readonly ID: string = 'input_image_select';
		/**
		 * 允许上传文件大小最大值
		 */
		public static readonly MaxSize: number = 512000;
		private static _input: HTMLInputElement;
		/**
		 * 浏览本地文件
		 */
		public static browse(thisObject: any, complete: Function, error: Function = null)
		{
			if (WebImageSelect._input == null)
			{
				WebImageSelect._input = <HTMLInputElement>document.getElementById(WebImageSelect.ID);
				if (WebImageSelect._input == null)
				{
					WebImageSelect._input = <HTMLInputElement>document.createElement('input');
					WebImageSelect._input.id = WebImageSelect.ID;
					WebImageSelect._input.type = 'file';
					WebImageSelect._input.style.display = 'none';
				}
			}
			//
			WebImageSelect._input.onchange = () =>
			{
				WebImageSelect._input.onchange = null;
				if (!WebImageSelect._input.files || WebImageSelect._input.files.length <= 0)
				{
					FuncUtil.invoke(error, thisObject, I18n.getText('未选择任何图片'));
					return;
				}
				let file = WebImageSelect._input.files[0];
				if ((/^image\//i).test(file.type) == false)
				{
					FuncUtil.invoke(error, thisObject, I18n.getText('图片类型不正确'));
					return;
				}
				if (file.size > WebImageSelect.MaxSize)
				{
					FuncUtil.invoke(error, thisObject, I18n.getText('图片不能大于') + WebImageSelect.MaxSize / 1024 + 'KB');
					return;
				}
				let reader: FileReader = new FileReader();
				reader.onload = () =>
				{
					reader.onload = null;
					FuncUtil.invoke(complete, thisObject, reader.result);
				}
				reader.readAsDataURL(file);
			};
			WebImageSelect._input.click();
		}
	}
}