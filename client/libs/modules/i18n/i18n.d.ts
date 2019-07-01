/**
 * 国际化
 */
declare class I18n {
    /**
     * 默认语言
     */
    static readonly DefaultLang: string;
    private static _langs;
    /**
     * 当前支持的语言列表(第一位为默认语言，当使用未支持的语言时候，使用此语言)
     */
    static langs(): string[];
    private static _lang;
    /**
     * 当前语言
     */
    static readonly lang: string;
    /**
     * 当前是否是默认语言
     */
    static readonly isDefault: boolean;
    private static _map;
    /**
     * 初始化系统
     */
    static initSystem(uslang: string, langs: string[]): void;
    /**
     * 初始化映射表
     */
    static initMap(data: string): void;
    /**
     * 清空映射
     */
    static clear(): void;
    /**
     * 获取语言文本
     */
    static getText(key: string): string;
}
