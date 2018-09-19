module game {
	/**
	 * 简单回调
	 */
	export class CallBackHandler {
		constructor(target: any, selector: Function, params?: any) {
			this.target = target;
			this.selector = selector;
			this.params = params;
		}
		/**
 		* 是否相等
 		*/
		public equals2(method: Function, target: any) {
			if (this.selector == method && this.target == target) {
				return true;
			}
			return false;
		}
		//执行域
		target: any;
		//回调
		selector: Function;
		//参数
		params?: any
	}
	/**
	 * 执行callback
	 */
	export function runCallBackHandler(obs: CallBackHandler) {
		if (obs && obs.selector) {
			if (obs.params) {
				obs.selector.call(obs.target, obs.params);
			}
			else {
				obs.selector.call(obs.target);
			}
		}
	}
	/**
	 * 带参数执行callback 
	 */
	export function runCallBackHandlerWith(obs: CallBackHandler, params: any) {
		if (obs && obs.selector) {
			obs.selector.call(obs.target, params);
		}
	}
}