module game {
	/**
	 * 简单回调
	 */
	export class CallBackHandler {
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
}