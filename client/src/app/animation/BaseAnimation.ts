/**
 * 动画基类
 */
abstract class BaseAnimation<T>{
	public callBack: game.Delegate;
	public target: T;
	public setTarget(target: T)
	{
		this.target = target;
	}
	public reset()
	{
		this.clear();
	}
	public run(...args)
	{
		this.reset();
	}
	public runOver()
	{
		this.clear();
	}
	public clear()
	{
		egret.Tween.removeTweens(this.target);
	}
}