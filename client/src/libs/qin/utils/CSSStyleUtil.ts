namespace qin
{
	export class CSSStyleUtil
	{
		/**
		 * 获取指定href的css样式规则列表
		 * (html页面直接写的<style>的href为null)
		 */
		public static getCSSStyleRules(href:string):CSSRuleList
		{
			if(System.isWeb || System.isMicro)
			{
				for(let i:number = 0; i < document.styleSheets.length; i++)
				{
					let sheet:CSSStyleSheet = document.styleSheets[i] as CSSStyleSheet;
					if(sheet && sheet.href == href)
					{
						let rules:CSSRuleList = sheet.cssRules || sheet.rules;
						return rules;
					}
				}
			}
			return null;
		}
		/**
		 * 获取指定href里的指定selectorText的CSSStyleDeclaration
         * (html页面直接写的<style>的href为null)
		 */
		public static getCSSStyleDeclaration(href:string, selectorText:string):CSSStyleDeclaration
		{
			let rules:CSSRuleList = CSSStyleUtil.getCSSStyleRules(href);
			if(rules)
			{
				for(let i:number = 0; i < rules.length; i++)
				{
					let rule:CSSStyleRule = rules[i] as CSSStyleRule;
					if(CSSStyleUtil.ruleIndexOf(rule, selectorText))
					{
						return rule.style;
					}
				}
			}
			return null;
		}
		private static ruleIndexOf(rule:CSSStyleRule, selectorText:string):boolean
		{
			let list:string[] = rule.selectorText.split(',');
			for(let i in list)
			{
				list[i] = list[i].trim();
			}
			return list.indexOf(selectorText) >= 0;
		}
	}
}