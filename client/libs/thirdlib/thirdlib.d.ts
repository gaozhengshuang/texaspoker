// Type definitions for JSZip 3.1
// Project: http://stuk.github.com/jszip/
// Definitions by: mzeiher <https://github.com/mzeiher>, forabi <https://github.com/forabi>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

// <reference types="node" />

interface JSZipSupport {
    arraybuffer: boolean
    uint8array: boolean
    blob: boolean
    // nodebuffer: boolean
}

type Compression = 'STORE' | 'DEFLATE'

interface Metadata {
    percent: number
    currentFile: string
}

type OnUpdateCallback = (metadata: Metadata) => void

interface InputByType {
    base64: string
    string: string
    text: string
    binarystring: string
    array: number[]
    uint8array: Uint8Array
    arraybuffer: ArrayBuffer
    blob: Blob
    // stream: NodeJS.ReadableStream
}

interface OutputByType {
    base64: string
    text: string
    binarystring: string
    array: number[]
    uint8array: Uint8Array
    arraybuffer: ArrayBuffer
    blob: Blob
    // nodebuffer: Buffer
}

type InputFileFormat = InputByType[keyof InputByType]

declare namespace JSZip {
    type InputType = keyof InputByType

    type OutputType = keyof OutputByType

    interface JSZipObject {
        name: string
        dir: boolean
        date: Date
        comment: string
        /** The UNIX permissions of the file, if any. */
        unixPermissions: number | string | null
        /** The UNIX permissions of the file, if any. */
        dosPermissions: number | null
        options: JSZipObjectOptions

        /**
         * Prepare the content in the asked type.
         * @param type the type of the result.
         * @param onUpdate a function to call on each internal update.
         * @return Promise the promise of the result.
         */
        async<T extends OutputType>(
            type: T,
            onUpdate?: OnUpdateCallback
        ): Promise<OutputByType[T]>
        // nodeStream(
        //     type?: 'nodestream',
        //     onUpdate?: OnUpdateCallback
        // ): NodeJS.ReadableStream
    }

    interface JSZipFileOptions {
        /** Set to `true` if the data is `base64` encoded. For example image data from a `<canvas>` element. Plain text and HTML do not need this option. */
        base64?: boolean
        /**
         * Set to `true` if the data should be treated as raw content, `false` if this is a text. If `base64` is used,
         * this defaults to `true`, if the data is not a `string`, this will be set to `true`.
         */
        binary?: boolean
        /**
         * The last modification date, defaults to the current date.
         */
        date?: Date
        compression?: string
        comment?: string
        /** Set to `true` if (and only if) the input is a "binary string" and has already been prepared with a `0xFF` mask. */
        optimizedBinaryString?: boolean
        /** Set to `true` if folders in the file path should be automatically created, otherwise there will only be virtual folders that represent the path to the file. */
        createFolders?: boolean
        /** Set to `true` if this is a directory and content should be ignored. */
        dir?: boolean

        /** 6 bits number. The DOS permissions of the file, if any. */
        dosPermissions?: number | null
        /**
         * 16 bits number. The UNIX permissions of the file, if any.
         * Also accepts a `string` representing the octal value: `"644"`, `"755"`, etc.
         */
        unixPermissions?: number | string | null
    }

    interface JSZipObjectOptions {
        compression: Compression
    }

    interface JSZipGeneratorOptions<T extends OutputType> {
        compression?: Compression
        compressionOptions?: null | {
            level: number
        }
        type?: T
        comment?: string
        /**
         * mime-type for the generated file.
         * Useful when you need to generate a file with a different extension, ie: “.ods”.
         * @default 'application/zip'
         */
        mimeType?: string
        encodeFileName?(filename: string): string
        /** Stream the files and create file descriptors */
        streamFiles?: boolean
        /** DOS (default) or UNIX */
        platform?: 'DOS' | 'UNIX'
    }

    interface JSZipLoadOptions {
        base64?: boolean
        checkCRC32?: boolean
        optimizedBinaryString?: boolean
        createFolders?: boolean
    }
}

interface JSZip {
    files: { [key: string]: JSZip.JSZipObject }

    /**
     * Get a file from the archive
     *
     * @param Path relative path to file
     * @return File matching path, null if no file found
     */
    file(path: string): JSZip.JSZipObject

    /**
     * Get files matching a RegExp from archive
     *
     * @param path RegExp to match
     * @return Return all matching files or an empty array
     */
    file(path: RegExp): JSZip.JSZipObject[]

    /**
     * Add a file to the archive
     *
     * @param path Relative path to file
     * @param data Content of the file
     * @param options Optional information about the file
     * @return JSZip object
     */
    file<T extends JSZip.InputType>(
        path: string,
        data: InputByType[T] | Promise<InputByType[T]>,
        options?: JSZip.JSZipFileOptions
    ): this
    file<T extends JSZip.InputType>(
        path: string,
        data: null,
        options?: JSZip.JSZipFileOptions & { dir: true }
    ): this

    /**
     * Returns an new JSZip instance with the given folder as root
     *
     * @param name Name of the folder
     * @return New JSZip object with the given folder as root or null
     */
    folder(name: string): JSZip

    /**
     * Returns new JSZip instances with the matching folders as root
     *
     * @param name RegExp to match
     * @return New array of JSZipFile objects which match the RegExp
     */
    folder(name: RegExp): JSZip.JSZipObject[]

    /**
     * Call a callback function for each entry at this folder level.
     *
     * @param callback function
     */
    forEach(
        callback: (relativePath: string, file: JSZip.JSZipObject) => void
    ): void

    /**
     * Get all files which match the given filter function
     *
     * @param predicate Filter function
     * @return Array of matched elements
     */
    filter(
        predicate: (relativePath: string, file: JSZip.JSZipObject) => boolean
    ): JSZip.JSZipObject[]

    /**
     * Removes the file or folder from the archive
     *
     * @param path Relative path of file or folder
     * @return Returns the JSZip instance
     */
    remove(path: string): JSZip

    /**
     * Generates a new archive asynchronously
     *
     * @param options Optional options for the generator
     * @param onUpdate The optional function called on each internal update with the metadata.
     * @return The serialized archive
     */
    generateAsync<T extends JSZip.OutputType>(
        options?: JSZip.JSZipGeneratorOptions<T>,
        onUpdate?: OnUpdateCallback
    ): Promise<OutputByType[T]>

    /**
     * Generates a new archive asynchronously
     *
     * @param options Optional options for the generator
     * @param onUpdate The optional function called on each internal update with the metadata.
     * @return A Node.js `ReadableStream`
     */
    // generateNodeStream(
    //     options?: JSZip.JSZipGeneratorOptions<'nodebuffer'>,
    //     onUpdate?: OnUpdateCallback
    // ): NodeJS.ReadableStream

    /**
     * Deserialize zip file asynchronously
     *
     * @param data Serialized zip file
     * @param options Options for deserializing
     * @return Returns promise
     */
    loadAsync(
        data: InputFileFormat,
        options?: JSZip.JSZipLoadOptions
    ): Promise<JSZip>

    /**
     * Create JSZip instance
     */

    /**
     * Create JSZip instance
     * If no parameters given an empty zip archive will be created
     *
     * @param data Serialized zip archive
     * @param options Description of the serialized zip archive
     */
    new (data?: InputFileFormat, options?: JSZip.JSZipLoadOptions): this

    (): JSZip

    prototype: JSZip
    support: JSZipSupport
    external: {
        Promise: PromiseConstructorLike
    }
    version: string
}

declare var JSZip: JSZip
interface FileSaver {
    (data: Blob, filename: string): void
}

declare var saveAs: FileSaver;
// export = JSZip

declare module particle {
    class Particle {
        /**
         * 表示 Particle 实例相对于父级本地坐标的 x 坐标。
         * @member {number} particle.Particle#x
         */
        x: number;
        /**
         * 表示粒子实例相对于父级本地坐标的 y 坐标。
         * @member {number} particle.Particle#y
         */
        y: number;
        /**
         * 表示从注册点开始应用的对象的缩放比例（百分比）。
         * @member {number} particle.Particle#scale
         * @default 1
         */
        scale: number;
        /**
         * 表示 Particle 实例距其原始方向的旋转程度，以度为单位
         * @member {number} particle.Particle#rotation
         * @default 0
         */
        rotation: number;
        /**
         * 表示粒子的 Alpha 透明度值
         * @member {number} particle.Particle#alpha
         * @default 1
         */
        alpha: number;
        /**
         * 表示粒子当前存活时间，以毫秒为单位，取值范围(0,Number.MAX_VALUE]，该值超过 totalTime 时，粒子将会被销毁
         * @member {number} particle.Particle#currentTime
         * @default 0
         */
        currentTime: number;
        /**
         * 表示粒子的存活总时间，以毫秒为单位，取值范围(0,Number.MAX_VALUE]
         * @member {number} particle.Particle#totalTime
         * @default 1000
         */
        totalTime: number;
        /**
         * 表示粒子的混合模式
         * @member {number} particle.Particle#blendMode
         */
        blendMode: number;
        constructor();
        reset(): void;
        private matrix;
        $getMatrix(regX: number, regY: number): egret.Matrix;
    }
}
declare module particle {
    class ParticleSystem extends egret.DisplayObject {
        private _pool;
        private frameTime;
        private particles;
        private _emitterBounds;
        protected relativeContentBounds: egret.Rectangle;
        protected _emitterX: number;
        protected _emitterY: number;
        /**
         * 表示粒子出现总时间，单位毫秒，取值范围(0,Number.MAX_VALUE]，-1表示无限时间
         * @member {number} particle.ParticleSystem#emissionTime
         * @default -1
         */
        emissionTime: number;
        /**
         * 表示粒子出现间隔，单位毫秒，取值范围(0,Number.MAX_VALUE]
         * @member {number} particle.ParticleSystem#emissionRate
         */
        emissionRate: number;
        /**
         * 表示粒子所使用的纹理
         * @member {egret.Texture} particle.ParticleSystem#texture
         */
        texture: egret.Texture;
        /**
         * 表示粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
         * @member {number} particle.ParticleSystem#maxParticles
         * @default 200
         */
        maxParticles: number;
        /**
         * 当前粒子数
         * @member {number} particle.ParticleSystem#numParticles
         */
        private numParticles;
        /**
         * 表示粒子类，如果设置创建粒子时将创建该类
         * @member {number} particle.ParticleSystem#particleClass
         */
        particleClass: any;
        $particleConfig: any;
        constructor(texture: egret.Texture, emissionRate: number);
        protected createNativeNode(): void;
        initConfig(emissionRate: number, emitterX: number, emitterY: number): void;
        private getParticle();
        private removeParticle(particle);
        initParticle(particle: Particle): void;
        /**
         * 更新当前显示对象坐标系下的边框界限
         * @param emitterRect {egret.Rectangle} 相对发射点坐标系下的界限
         */
        private updateRelativeBounds(emitterRect);
        /**
         * 表示当前粒子系统中发射粒子的渲染边界范围，使用以发射点为基准的坐标系
         * @member {egret.Rectangle} particle.ParticleSystem#emitterBounds
         */
        emitterBounds: egret.Rectangle;
        onPropertyChanges(): void;
        /**
         * 表示粒子出现点X坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.ParticleSystem#emitterX
         * @default 0
         */
        emitterX: number;
        /**
         * 表示粒子出现点Y坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.ParticleSystem#emitterY
         * @default 0
         */
        emitterY: number;
        /**
         * 开始创建粒子
         * @param duration {number} 粒子出现总时间
         */
        start(duration?: number): void;
        /**
         * 停止创建粒子
         * @param clear {boolean} 是否清除掉现有粒子
         */
        stop(clear?: boolean): void;
        private timeStamp;
        private update(timeStamp);
        private particleMeasureRect;
        private transformForMeasure;
        private lastRect;
        $measureContentBounds(bounds: egret.Rectangle): void;
        setCurrentParticles(num: number): void;
        /**
         * 更换粒子纹理
         * @param texture {egret.Texture} 新的纹理
         */
        changeTexture(texture: egret.Texture): void;
        private clear();
        private addOneParticle();
        advanceParticle(particle: Particle, dt: number): void;
        private bitmapNodeList;
        $updateRenderNode(): void;
        private appendTransform(matrix, x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY);
    }
}
declare let regionPool: Region[];
/**
 * @private
 */
declare class Region {
    /**
     * @private
     * 释放一个Region实例到对象池
     */
    static release(region: Region): void;
    /**
     * @private
     * 从对象池中取出或创建一个新的Region对象。
     * 建议对于一次性使用的对象，均使用此方法创建，而不是直接new一个。
     * 使用完后调用对应的release()静态方法回收对象，能有效减少对象创建数量造成的性能开销。
     */
    static create(): Region;
    /**
     * @private
     */
    minX: number;
    /**
     * @private
     */
    minY: number;
    /**
     * @private
     */
    maxX: number;
    /**
     * @private
     */
    maxY: number;
    /**
     * @private
     */
    width: number;
    /**
     * @private
     */
    height: number;
    /**
     * @private
     */
    area: number;
    /**
     * @private
     */
    private setEmpty();
    /**
     * @private
     */
    updateRegion(bounds: egret.Rectangle, matrix: egret.Matrix): void;
}
declare module particle {
    class GravityParticle extends Particle {
        startX: number;
        startY: number;
        velocityX: number;
        velocityY: number;
        radialAcceleration: number;
        tangentialAcceleration: number;
        rotationDelta: number;
        scaleDelta: number;
        alphaDelta: number;
        reset(): void;
    }
}
declare module particle {
    class GravityParticleSystem extends ParticleSystem {
        /**
         * 表示粒子初始坐标 x 差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#emitterXVariance
         */
        private emitterXVariance;
        /**
         * 表示粒子初始坐标 y 差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#emitterYVariance
         */
        private emitterYVariance;
        /**
         * 表示粒子存活时间，单位毫秒，取值范围(0,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#lifespan
         */
        private lifespan;
        /**
         * 表示粒子存活时间差值，单位毫秒，取值范围(0,Number.MAX_VALUE]且不大于 lifespan
         * @member {number} particle.GravityParticleSystem#lifespanVariance
         */
        private lifespanVariance;
        /**
         * 表示粒子出现时大小，取值范围(0,Number.MAX_VALUE]，粒子将会在存活时间内由 startSize 慢慢变为 endSize
         * @member {number} particle.GravityParticleSystem#startSize
         */
        private startSize;
        /**
         * 表示粒子出现时大小差值，取值范围(0,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#startSizeVariance
         */
        private startSizeVariance;
        /**
         * 表示粒子消失时大小，取值范围(0,Number.MAX_VALUE]，粒子将会在存活时间内由 startSize慢慢变为 endSize
         * @member {number} particle.GravityParticleSystem#endSize
         */
        private endSize;
        /**
         * 表示粒子消失时大小差值，取值范围(0,Number.MAX_VALUE]，且不大于endSize
         * @member {number} particle.GravityParticleSystem#endSizeVariance
         */
        private endSizeVariance;
        /**
         * 表示粒子出现时的角度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#emitAngle
         */
        private emitAngle;
        /**
         * 表示粒子出现时的角度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#emitAngleVariance
         */
        private emitAngleVariance;
        /**
         * 表示粒子出现时旋转值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startRotation 慢慢变为 endRotation
         * @member {number} particle.GravityParticleSystem#startRotation
         */
        private startRotation;
        /**
         * 表示粒子出现时旋转值差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#startRotationVariance
         */
        private startRotationVariance;
        /**
         * 表示粒子消失时旋转值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startRotation 慢慢变为 endRotation
         * @member {number} particle.GravityParticleSystem#endRotation
         */
        private endRotation;
        /**
         * 表示粒子消失时旋转值差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#endRotationVariance
         */
        private endRotationVariance;
        /**
         * 表示粒子出现时速度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#speed
         */
        private speed;
        /**
         * 表示粒子出现时速度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#speedVariance
         */
        private speedVariance;
        /**
         * 表示粒子水平重力，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#gravityX
         */
        private gravityX;
        /**
         * 表示粒子垂直重力，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#gravityX
         */
        private gravityY;
        /**
         * 表示粒子径向加速度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#radialAcceleration
         */
        private radialAcceleration;
        /**
         * 表示粒子径向加速度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#radialAccelerationVariance
         */
        private radialAccelerationVariance;
        /**
         * 表示粒子切向加速度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#tangentialAcceleration
         */
        private tangentialAcceleration;
        /**
         * 表示粒子切向加速度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#tangentialAccelerationVariance
         */
        private tangentialAccelerationVariance;
        /**
         * 表示粒子出现时的 Alpha 透明度值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startAlpha 慢慢变为 endAlpha
         * @member {number} particle.GravityParticleSystem#startAlpha
         */
        private startAlpha;
        /**
         * 表示粒子出现时的 Alpha 透明度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#startAlphaVariance
         */
        private startAlphaVariance;
        /**
         * 表示粒子消失时的 Alpha 透明度值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startAlpha 慢慢变为 endAlpha
         * @member {number} particle.GravityParticleSystem#endAlpha
         */
        private endAlpha;
        /**
         * 表示粒子消失时的 Alpha 透明度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#endAlphaVariance
         */
        private endAlphaVariance;
        /**
         * 表示粒子使用的混合模式
         * @member {number} particle.GravityParticleSystem#blendMode
         */
        private particleBlendMode;
        /**
         * 是否完成解析json数据
         */
        private $init;
        constructor(texture: egret.Texture, config: any);
        start(duration?: number): void;
        setCurrentParticles(num: number): void;
        onPropertyChanges(): void;
        private parseConfig(config);
        initParticle(particle: Particle): void;
        private static getValue(base, variance);
        advanceParticle(particle: Particle, dt: number): void;
    }
}

declare class md5 {
    constructor();
    private hexcase;
    private b64pad;
    hex_md5(s: any): string;
    private b64_md5(s);
    private any_md5(s, e);
    private hex_hmac_md5(k, d);
    private b64_hmac_md5(k, d);
    private any_hmac_md5(k, d, e);
    private md5_vm_test();
    private rstr_md5(s);
    private rstr_hmac_md5(key, data);
    private rstr2hex(input);
    private rstr2b64(input);
    private rstr2any(input, encoding);
    private str2rstr_utf8(input);
    private str2rstr_utf16le(input);
    private str2rstr_utf16be(input);
    private rstr2binl(input);
    private binl2rstr(input);
    private binl_md5(x, len);
    private md5_cmn(q, a, b, x, s, t);
    private md5_ff(a, b, c, d, x, s, t);
    private md5_gg(a, b, c, d, x, s, t);
    private md5_hh(a, b, c, d, x, s, t);
    private md5_ii(a, b, c, d, x, s, t);
    private safe_add(x, y);
    private bit_rol(num, cnt);
}
