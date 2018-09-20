module qin
{
	/**
	 * 对象池
	 */
	export class PoolUtil
	{
		private static _map: Dictionary<string, Array<IPoolObject>> = new Dictionary<string, Array<IPoolObject>>();

		/**
		 * 从对象池中获取对象
		 */
		public static GetObject<T extends IPoolObject>(instance: { new (): T; }): T
		{
			let clsName: string = egret.getQualifiedClassName(instance);
			let pool: Array<T> = PoolUtil.GetPool<T>(clsName);
			let obj: T = pool.pop();
			if (obj)
			{
				return obj;
			}
			else
			{
				return new instance();
			}
		}
		/**
		 * 把重置并放入对象池
		 */
		public static PutObject<T extends IPoolObject>(obj: T, maxCount:number=10)
		{
			if (obj)
			{
				let clsName: string = egret.getQualifiedClassName(obj);
				let pool: Array<T> = PoolUtil.GetPool<T>(clsName);
				if(pool.length < maxCount)
				{
					obj.reset();
					pool.push(obj);
				}
			}
		}
		private static GetPool<T extends IPoolObject>(clsName: string): Array<T>
		{
			let pool: Array<T> = null;
			if (clsName)
			{
				pool = PoolUtil._map.getValue(clsName) as Array<T>;
				if (pool == null)
				{
					pool = new Array<T>();
					PoolUtil._map.add(clsName, pool);
				}
			}
			else
			{
				pool = new Array<T>();
			}
			return pool;
		}
	}
	/**
	 * 对象池的缓存接口
	 */
	export interface IPoolObject extends Object
	{
		reset();
	}
}