var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    var WebImageSelect = (function () {
        function WebImageSelect() {
        }
        /**
         * 浏览本地文件
         */
        WebImageSelect.browse = function (thisObject, complete, error) {
            if (error === void 0) { error = null; }
            if (WebImageSelect._input == null) {
                WebImageSelect._input = document.getElementById(WebImageSelect.ID);
                if (WebImageSelect._input == null) {
                    WebImageSelect._input = document.createElement('input');
                    WebImageSelect._input.id = WebImageSelect.ID;
                    WebImageSelect._input.type = 'file';
                    WebImageSelect._input.style.display = 'none';
                }
            }
            //
            WebImageSelect._input.onchange = function () {
                WebImageSelect._input.onchange = null;
                if (!WebImageSelect._input.files || WebImageSelect._input.files.length <= 0) {
                    qin.FuncUtil.invoke(error, thisObject, qin.I18n.getText('未选择任何图片'));
                    return;
                }
                var file = WebImageSelect._input.files[0];
                if ((/^image\//i).test(file.type) == false) {
                    qin.FuncUtil.invoke(error, thisObject, qin.I18n.getText('图片类型不正确'));
                    return;
                }
                if (file.size > WebImageSelect.MaxSize) {
                    qin.FuncUtil.invoke(error, thisObject, qin.I18n.getText('图片不能大于') + WebImageSelect.MaxSize / 1024 + 'KB');
                    return;
                }
                var reader = new FileReader();
                reader.onload = function () {
                    reader.onload = null;
                    qin.FuncUtil.invoke(complete, thisObject, reader.result);
                };
                reader.readAsDataURL(file);
            };
            WebImageSelect._input.click();
        };
        WebImageSelect.ID = 'input_image_select';
        /**
         * 允许上传文件大小最大值
         */
        WebImageSelect.MaxSize = 512000;
        return WebImageSelect;
    }());
    qin.WebImageSelect = WebImageSelect;
    __reflect(WebImageSelect.prototype, "qin.WebImageSelect");
})(qin || (qin = {}));
//# sourceMappingURL=WebImageSelect.js.map