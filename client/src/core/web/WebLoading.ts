/**
 * web版专有loading
 */
class WebLoading
{
    private static _element:HTMLElement;
    private static getElement():HTMLElement
    {
        if(game.System.isWeb)
        {
            if(WebLoading._element == null)
            {
                WebLoading._element = <HTMLElement>document.getElementsByClassName('web-loading')[0];
            }
            return WebLoading._element;
        }
        return null;
    }
    public static show():void
    {
        if(WebLoading.getElement())
        {
            WebLoading.getElement().style.display = 'block';
        }
    }
    public static hide():void
    {
        if(WebLoading.getElement())
        {
            WebLoading.getElement().style.display = 'none';
        }
    }
    public static setText(text:string):void
    {
        if(WebLoading.getElement())
        {
            WebLoading.getElement().innerHTML = text;
        }
    }
}