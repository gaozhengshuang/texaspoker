/**
 * 动画接口
 */
interface IAnimationHandler<T> {
	/**
	 * 动画目标
	 */
	target: T;
	setTarget(target: T);
	reset();
	run(...args);
	runOver(...args);
	clear();
}