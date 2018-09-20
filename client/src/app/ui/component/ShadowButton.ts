/**
 * 带有文字阴影的按钮
 */
class ShadowButton extends eui.Button
{
    protected createChildren()
    {
        let label: eui.Label = this.labelDisplay as eui.Label;
        if (label)
        {
            game.FilterUtil.setShadow(label);
        }
    }
}
/**
 * 绿色阴影按钮
 */
class GreenShadowButton extends eui.Button
{
    protected createChildren()
    {
        let label: eui.Label = this.labelDisplay as eui.Label;
        if (label)
        {
            game.FilterUtil.setGreenShadow(label);
        }
    }
}