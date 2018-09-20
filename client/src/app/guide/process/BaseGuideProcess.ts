/**
 * 引导步骤处理器
 */
abstract class BaseGuideProcess<T extends IBaseDefintion>
{
    public parent: BaseGuideProcess<IBaseDefintion>;

    public definition: T;

    public comleteEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    public init(definition: T, par: BaseGuideProcess<IBaseDefintion>)
    {
        this.definition = definition;
        this.parent = par;
        if (!this.definition)
        {
            game.Console.logError("新手引导步骤处理数据配置异常！类：" + egret.getQualifiedClassName(this));
        }
    }
    abstract run();
    abstract clear();

    public complete()
    {
        this.comleteEvent.dispatch(this);
    }
}