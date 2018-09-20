/**
 * Created by d8q8 on 2015/5/25.
 * @class JSZip
 * @constructor
 **/
interface JSZip {
    file(path:string): JSZipObject;
    file(path:RegExp): JSZipObject[];
    file(path:string, data:any, options?:JSZipFileOptions): JSZip;
    folder(name:string): JSZip;
    folder(name:RegExp): JSZipObject[];
    filter(predicate:(relativePath:string, file:JSZipObject) => boolean): JSZipObject[];
    remove(path:string): JSZip;
    generate(options?:JSZipGeneratorOptions): any;
    load(data:any, options:JSZipLoadOptions): JSZip;
}

interface JSZipObject {
    name: string;
    dir: boolean;
    date: Date;
    comment: string;
    options: JSZipObjectOptions;

    asText(): string;
    asBinary(): string;
    asArrayBuffer(): ArrayBuffer;
    asUint8Array(): Uint8Array;
    asNodeBuffer(): Buffer;
}

interface JSZipFileOptions extends JSZipObjectOptions {
    compressionOptions?:Object;
    comment?: string;
    optimizedBinaryString?: boolean;
    createFolders?: boolean;
    unixPermissions?:number;
    dosPermissions?:number;
}

interface JSZipObjectOptions {
    base64?: boolean;
    binary?: boolean;
    dir?: boolean;
    date?: Date;
    compression?: string;
}

interface JSZipGeneratorOptions {
    base64?: boolean;
    compression?: string;
    compressionOptions?:Object;
    type?: string;
    comment?: string;
    mimeType?:string;
    platform?:string;
}

interface JSZipLoadOptions {
    base64?: boolean;
    checkCRC32?: boolean;
    optimizedBinaryString?: boolean;
    createFolders?: boolean;
}

interface JSZipSupport {
    arraybuffer: boolean;
    uint8array: boolean;
    blob: boolean;
    nodebuffer: boolean;
}

interface Buffer {
    data?:any;
    encoding?:string;
}

interface DEFLATE {
    compress(input:string, compressionOptions:{level:number}): Uint8Array;
    compress(input:number[], compressionOptions:{level:number}): Uint8Array;
    compress(input:Uint8Array, compressionOptions:{level:number}): Uint8Array;

    uncompress(input:string): Uint8Array;
    uncompress(input:number[]): Uint8Array;
    uncompress(input:Uint8Array): Uint8Array;
}

declare var JSZip:{
    (): JSZip;
    (data:any, options?:JSZipLoadOptions): JSZip;
    new (): JSZip;
    new (data:any, options?:JSZipLoadOptions): JSZip;

    prototype: JSZip;
    support: JSZipSupport;
    compressions: {
        DEFLATE: DEFLATE;
    }
}

declare module "jszip" {
    export = JSZip;
}

interface FileSaver {
    (data:Blob, filename:string): void
}

declare var saveAs:FileSaver;
// Type definitions for D:/egret/worckspace/trunk/libsrc/BigInteger/src/BigInteger.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped
/**
 * 
 */
declare class bigInt {

	constructor(v: number | any, radix?: any);
	/**
	 * 
	 * @param a 
	 * @param b 
	 * @return  
	 */
	max(a: number, b: any): number;

	/**
	 * 
	 * @param a 
	 * @param b 
	 * @return  
	 */
	min(a: number, b: any): number;

	/**
	 * 
	 * @param a 
	 * @param b 
	 * @return  
	 */
	gcd(a: any, b: any): any;

	/**
	 * 
	 * @param a 
	 * @param b 
	 */
	lcm(a: any, b: any): void;

	/**
	 * 
	 * @param x 
	 * @return  
	 */
	isInstance(x: any): boolean;

	/**
	 * 
	 * @param a 
	 * @param b 
	 */
	randBetween(a: number, b: any): void;

	/**
	 * 
	 * @param v 
	 * @return  
	 */
	add(v: any): any;

	/**
	 * 
	 * @param v 
	 * @return  
	 */
	subtract(v: any): any;

	/**
	 * 
	 * @return  
	 */
	negate(): any;

	/**
	 * 
	 * @return  
	 */
	abs(): any;

	/**
	 * 
	 * @param a 
	 * @return  
	 */
	_multiplyBySmall(a: any): any;

	/**
	 * 
	 * @param v 
	 * @return  
	 */
	multiply(v: number): any;

	/**
	 * 
	 * @return  
	 */
	square(): any;

	/**
	 * 
	 * @param v 
	 * @return  
	 */
	divmod(v: number | any):any;

	/**
	 * 
	 * @param v 
	 * @return  
	 */
	divide(v: number): any;

	/**
	 * 
	 * @param v 
	 * @return  
	 */
	mod(v: any): any;

	/**
	 * 
	 * @param v 
	 * @return  
	 */
	pow(v: any): any;

	/**
	 * 
	 * @param exp 
	 * @param mod 
	 * @return  
	 */
	modPow(exp: any, mod: any): any;

	/**
	 * 
	 * @param v 
	 * @return  
	 */
	compareAbs(v: number | any): number;

	/**
	 * 
	 * @param v 
	 * @return  
	 */
	compare(v: any): number;

	/**
	 * 
	 * @param v 
	 * @return  
	 */
	equals(v: any): boolean;

	/**
	 * 
	 * @param v 
	 * @return  
	 */
	notEquals(v: any): boolean;

	/**
	 * 
	 * @param v 
	 * @return  
	 */
	greater(v: any): boolean;

	/**
	 * 
	 * @param v 
	 * @return  
	 */
	lesser(v: any): boolean;

	/**
	 * 
	 * @param v 
	 * @return  
	 */
	greaterOrEquals(v: any): boolean;

	/**
	 * 
	 * @param v 
	 * @return  
	 */
	lesserOrEquals(v: any): boolean;

	/**
	 * 
	 * @return  
	 */
	isEven(): boolean;

	/**
	 * 
	 * @return  
	 */
	isOdd(): boolean;

	/**
	 * 
	 * @return  
	 */
	isPositive(): boolean;

	/**
	 * 
	 * @return  
	 */
	isNegative(): any;

	/**
	 * 
	 * @return  
	 */
	isUnit(): boolean;

	/**
	 * 
	 * @return  
	 */
	isZero(): boolean;

	/**
	 * 
	 * @param v 
	 * @return  
	 */
	isDivisibleBy(v: any): boolean;

	/**
	 * 
	 * @return  
	 */
	isPrime(): boolean;

	/**
	 * 
	 * @param iterations 
	 * @return  
	 */
	isProbablePrime(iterations: any): boolean;

	/**
	 * 
	 * @param n 
	 * @return  
	 */
	modInv(n: any): any;

	/**
	 * 
	 * @return  
	 */
	next(): any;

	/**
	 * 
	 * @return  
	 */
	prev(): any;

	/**
	 * 
	 * @param n 
	 * @return  
	 */
	shiftLeft(n: number): any;

	/**
	 * 
	 * @param n 
	 * @return  
	 */
	shiftRight(n: number): any;

	/**
	 * 
	 */
	not(): any;

	/**
	 * 
	 * @param n 
	 */
	and(n: any): any;

	/**
	 * 
	 * @param n 
	 */
	or(n: any): any;

	/**
	 * 
	 * @param n 
	 */
	xor(n: any): any;

	/**
	 * 
	 * @param radix 
	 * @return  
	 */
	toString(radix: number): string;

	/**
	 * 
	 * @return  
	 */
	value: number;
}

// Type definitions for D:/egret/crypt/base64/trunk/base64.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 * export Base64
 */
declare namespace Base64 {

	/**
	 * 
	 */
	export var VERSION: string;

	/**
	 * 
	 * @param a 
	 * @return  
	 */
	function atob(a: string): string;

	/**
	 * 
	 * @param b 
	 * @return  
	 */
	function btoa(b: string): string;

	/**
	 * 
	 * @param a 
	 * @return  
	 */
	function fromBase64(a: string): string;

	/**
	 * 
	 * @param u 
	 * @param urisafe 
	 * @return  
	 */
	function toBase64(u: string, urisafe?: boolean): string;

	/**
	 * 
	 * @param u 
	 * @return  
	 */
	function utob(u: string): string;

	/**
	 * 
	 * @param u 
	 * @return  
	 */
	function encodeURI(u: any): string;

	/**
	 * 
	 * @param b 
	 * @return  
	 */
	function btou(b: string): string;

	/**
	 *  Base64 
	 * @return  
	 */
	function noConflict():  any;

	/**
	 * 
	 */
	function extendString(): void;

	/**
	 *  Base64.toBase64
	 */
	function encode(u: string, urisafe?: boolean): string;

	/**
	 * Base64.fromBase64 
	 */
	function decode(a: string): string;
}

/**
 * 
 */
declare namespace Base64 {

	/**
	 * 
	 */
	interface String {

		/**
		 * 
		 */
		prototype: {

			/**
			 * 
			 * @return  
			 */
			fromBase64(): string;

			/**
			 *  String.prototype.fromBase64
			 */
			toBase64(urisafe?:boolean): string;

			/**
			 *  String.prototype.fromBase64 
			 */
			toBase64URI(): string;
		}
	}
}

// Type definitions for D:/egret/network/sproto/trunk/sproto.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped
declare namespace Sproto {
	// Sproto.createNew.!0

	/**
	 * 
	 */
	interface CreateNew {

		/**
		 * 
		 */
		buf: Array<number>;

		/**
		 * 
		 */
		sz: number;
	}
}
declare namespace Sproto {
	// Sproto.createNew.!ret

	/**
	 * 
	 */
	interface CreateNewRet {

		/**
		 * 
		 */
		type_n: number;

		/**
		 *  Sproto.createNew.!ret.type.<i> 
		 */
		type: Array<any>;

		/**
		 * 
		 */
		protocol_n: number;
		/**
		 * 推送协议的数量
		 */
		s2cProtocol_n:number;
		/**
		 *  Sproto.createNew.!ret.type.<i> 
		 */
		proto: Array<any>;
		/**
		 * 推送协议结合
		 */
		s2cProto:Array<any>;
		/**
		 *  Sproto.createNew.!ret.type.<i> 
		 *  header_tmp 
		 * @param type 
		 * @param indata 
		 * @return  
		 */
		encode(type: string | any, indata: any): Sproto.CreateNewRet.EncodeRet;

		/**
		 * Sproto.createNew.!ret.type.<i> 
		 * Sproto.createNew.!ret.unpack.!ret 
		 * Sproto.createNew.!ret.type.<i> 
		 * @param type 
		 * @param inbuf 
		 * @return  
		 */
		decode(type: any | string, inbuf: any): any;

		/**
		 * 
		 * @param inbuf 
		 * @return  
		 */
		pack(inbuf: any): Sproto.CreateNewRet.PackRet;

		/**
		 * 
		 * @param inbuf 
		 * @return  
		 */
		unpack(inbuf: any): Sproto.CreateNewRet.UnpackRet;

		/**
		 * Sproto.createNew.!ret.type.<i> 
		 * Sproto.createNew.!ret.type.<i>
		 * @param proto 
		 * @param what 
		 * @return  
		 */
		protocol(proto: number | any, what: number): any;

		/**
		 * Sproto.createNew.!ret.pack.!ret
		 * @param type 
		 * @param buf 
		 * @return  
		 */
		pencode(type: any, buf: any): any;

		/**
		 * Sproto.createNew.!ret.type.<i> 
		 * @param type 
		 * @param buf 
		 * @return  
		 */
		pdecode(type: any, buf: any): any;

		/**
		 *  [Sproto.createNew.!ret.type.<i> 
		 *  bool]
		 */
		__session: any | any;

		/**
		 * 
		 * @param packagename 
		 */
		host(packagename: any): void;

		/**
		 * 
		 * @return  
		 */
		attach(): Sproto.CreateNewRet.AttachRet;

		/**
		 * 
		 * @param buf 
		 * @param req_cb 
		 * @param rsp_cb 
		 */
		dispatch(buf: any, req_cb: any, rsp_cb: any): void;
	}
}
declare namespace Sproto.CreateNewRet {
	// Sproto.createNew.!ret.encode.!ret

	/**
	 * 
	 */
	interface EncodeRet {

		/**
		 * 
		 */
		buf: Array<number>;

		/**
		 * 
		 */
		sz: number;
	}
}
declare namespace Sproto.CreateNewRet {
	// Sproto.createNew.!ret.pack.!ret

	/**
	 * 
	 */
	interface PackRet {

		/**
		 * 
		 */
		buf: Array<number>;

		/**
		 * 
		 */
		sz: number;
	}
}
declare namespace Sproto.CreateNewRet {
	// Sproto.createNew.!ret.unpack.!ret

	/**
	 * 
	 */
	interface UnpackRet {

		/**
		 * 
		 */
		sz: number;

		/**
		 *  Sproto.createNew.!0.buf 
		 */
		buf: any;
	}
}
declare namespace Sproto.CreateNewRet {
	// Sproto.createNew.!ret.attach.!ret  Sproto.createNew.!ret.pack.!ret 
	type AttachRet = ((name: any, args: any, session: any) => any);
}

/**
 * 
 */
declare namespace Sproto {

	/**
	 * 
	 * @param binsch 
	 * @return  
	 */
	function createNew(binsch: Sproto.CreateNew): Sproto.CreateNewRet;
}

/**
 * 
 * @param array 
 * @return  
 */
declare function array2arraybuffer(array: any): ArrayBuffer;

/**
 * 
 * @param buffer 
 * @return  
 */
declare function arraybuffer2array(buffer: any): Array<number>;

// Type definitions for D:/egret/crypt/base64/trunk/aes.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped
declare namespace aesjs.ModeOfOperation.cfb {
	// aesjs.ModeOfOperation.cfb.prototype.encrypt.!0

	/**
	 * 
	 */
	interface Encrypt {
	}
}
declare namespace aesjs.ModeOfOperation.cfb {
	// aesjs.ModeOfOperation.cfb.prototype.decrypt.!ret

	/**
	 * 
	 */
	interface DecryptRet {
	}
}
declare namespace aesjs.ModeOfOperation.ofb {
	// aesjs.ModeOfOperation.ofb.prototype.encrypt.!0

	/**
	 * 
	 */
	interface Encrypt {
	}
}
declare namespace aesjs.ModeOfOperation.ctr {
	// aesjs.ModeOfOperation.ctr.prototype.encrypt.!0

	/**
	 * 
	 */
	interface Encrypt {
	}
}
declare namespace aesjs.utils.hex {
	// aesjs.utils.hex.toBytes.!ret
	type ToBytesRet = Array<number>;
}
declare namespace aesjs.utils.utf8 {
	// aesjs.utils.utf8.toBytes.!ret
	type ToBytesRet = Array<number>;
}

/**
 * The block cipher
 */
declare namespace aesjs {

	/**
	 * 
	 */
	class AES {

		/**
		 * 
		 * @param key 
		 */
		constructor(key: any);

		/**
		 * 
		 */
		_prepare(): void;

		/**
		 * 
		 * @param plaintext 
		 * @return  
		 */
		encrypt(plaintext: aesjs.Counter | number): Float32Array;

		/**
		 * 
		 * @param ciphertext 
		 * @return  
		 */
		decrypt(ciphertext: Float32Array): Float32Array;
	}

	/**
	 * Counter object for CTR common mode of operation
	 */
	class Counter {

		/**
		 * 
		 * @param initialValue 
		 */
		constructor(initialValue: number | aesjs.Counter);

		/**
		 * 
		 * @param value 
		 */
		setValue(value: number): void;

		/**
		 * 
		 * @param bytes 
		 */
		setBytes(bytes: number | aesjs.Counter): void;

		/**
		 * 
		 */
		increment(): void;
	}

	/**
	 * 
	 */
	namespace ModeOfOperation {

		/**
		 * Mode Of Operation - Electonic Codebook (ECB)
		 */
		class ecb {

			/**
			 * 
			 * @param key 
			 */
			constructor(key: any);
			/**
			 * 
			 * @param plaintext 
			 * @return  
			 */
			encrypt(plaintext: any): Float32Array;

			/**
			 * 
			 * @param ciphertext 
			 * @return  
			 */
			decrypt(ciphertext: any): Float32Array;
		}

		/**
		 * Mode Of Operation - Cipher Block Chaining (CBC)
		 */
		class cbc {

			/**
			 * 
			 * @param key 
			 * @param iv 
			 */
			constructor(key: any, iv: Float32Array);

			/**
			 * 
			 * @param plaintext 
			 * @return  
			 */
			encrypt(plaintext: any): Float32Array;

			/**
			 * 
			 * @param ciphertext 
			 * @return  
			 */
			decrypt(ciphertext: any): Float32Array;
		}

		/**
		 * Mode Of Operation - Cipher Feedback (CFB)
		 */
		class cfb {

			/**
			 * 
			 * @param key 
			 * @param iv 
			 * @param segmentSize 
			 */
			constructor(key: any, iv: Float32Array, segmentSize: number);

			/**
			 * 
			 * @param plaintext 
			 * @return  
			 */
			encrypt(plaintext: any): any;

			/**
			 * 
			 * @param ciphertext 
			 * @return  
			 */
			decrypt(ciphertext: any): any;
		}

		/**
		 * Mode Of Operation - Output Feedback (OFB)
		 */
		class ofb {

			/**
			 * 
			 * @param key 
			 * @param iv 
			 */
			constructor(key: any, iv: Float32Array);

			/**
			 * Decryption is symetric
			 * @param plaintext 
			 * @return  
			 */
			encrypt(plaintext: any): any;

			/**
			 * aesjs.ModeOfOperation.ofb.prototype.encrypt 
			 */
			decrypt: any;
		}

		/**
		 * Mode Of Operation - Counter (CTR)
		 */
		class ctr {

			/**
			 * 
			 * @param key 
			 * @param counter 
			 */
			constructor(key: any, counter: aesjs.Counter);

			/**
			 * Decryption is symetric
			 * @param plaintext 
			 * @return  
			 */
			encrypt(plaintext: any): any;

			/**
			 * aesjs.ModeOfOperation.ctr.prototype.encrypt 
			 */
			decrypt: any;
		}
	}

	/**
	 * 
	 */
	namespace utils {

		/**
		 * 
		 */
		namespace hex {

			/**
			 * 
			 * @param text 
			 * @return  
			 */
			function toBytes(text: any): aesjs.utils.hex.ToBytesRet;

			/**
			 * 
			 * @param bytes 
			 * @return  
			 */
			function fromBytes(bytes: any): string;
		}

		/**
		 * 
		 */
		namespace utf8 {

			/**
			 * 
			 * @param text 
			 * @return  
			 */
			function toBytes(text: string): aesjs.utils.utf8.ToBytesRet;

			/**
			 * 
			 * @param bytes 
			 * @return  
			 */
			function fromBytes(bytes: any): string;
		}
	}

	/**
	 * 
	 */
	namespace padding {

		/**
		 * 
		 */
		namespace pkcs7 {

			/**
			 * 
			 * @param data 
			 * @return  
			 */
			function pad(data: any): Float32Array;

			/**
			 * 
			 * @param data 
			 * @return  
			 */
			function strip(data: any): Float32Array;
		}
	}

	/**
	 * 
	 */
	namespace _arrayTest {

		/**
		 * 
		 * @param arg 
		 * @param copy 
		 * @return  
		 */
		function coerceArray(arg: Array<number> | Float32Array, copy: boolean): Array<number> | Float32Array;

		/**
		 * 
		 * @param length 
		 * @return  
		 */
		function createArray(length: number): Float32Array;

		/**
		 * 
		 * @param sourceArray 
		 * @param targetArray 
		 * @param targetStart 
		 * @param sourceStart 
		 * @param sourceEnd 
		 */
		function copyArray(sourceArray: Float32Array, targetArray: Float32Array, targetStart: number, sourceStart: number, sourceEnd: number): void;
	}

	/**
	 * aesjs 
	 */
	export var _aesjs: any;
}

/**
 * 
 */
declare namespace aesjs {

	/**
	 * 
	 */
	class Float32Array {
	}
}

// Type definitions for D:/egret/worckspace/trunk/libsrc/hmacsha1/src/hmacsha1.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 * Computes a HMAC-SHA1 code.
 * 
 * @param {string} k Secret key.
 * @param {string} d Data to be hashed.
 * @return {string} The hashed string.
 * @param k 
 * @param d 
 * @param _p 
 * @param _z 
 * @return  
 */
declare function b64_hmac_sha1(k: string, d: string, _p?: string, _z?: number): string;

// Type definitions for D:/egret/crypt/pak-dh-client.git/trunk/src/pakdh-client.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 * PAK allows two parties to authenticate themselves
 * while performing the Diffie-Hellman exchange.
 * 
 * See http://tools.ietf.org/html/rfc5683
 */
declare class PAKDHClient {

	/**
	 * 
	 * @param password 
	 * @param group 
	 */
	constructor(password: any, group?: number);

	/**
	 * Generates Ra, A's random secret exponent.
	 */
	generategRa(): any;

	/**
	 * Generates Rb, B's random secret exponent.
	 */
	generategRb(): any;

	/**
	 * Calculates g ^ x mod N
	 * @param x 
	 */
	modPow(x: any): any;

	/**
	 * X = H1(A|B|PW)*(g^Ra)
	 * @param A 
	 * @param B 
	 * @param gRa 
	 */
	calculateX(A: any, B: any, gRa: any): any;

	/**
	 * Xab = Q / H1(A|B|PW)
	 * @param A 
	 * @param B 
	 * @param Q 
	 */
	calculateXab(A: any, B: any, Q: any): any;

	/**
	 * Y = H2(A|B|PW)*(g^Rb)
	 * @param A 
	 * @param B 
	 * @param gRb 
	 */
	calculateY(A: any, B: any, gRb: any): any;

	/**
	 * Yba = Y / H2(A|B|PW)
	 * @param A 
	 * @param B 
	 * @param Y 
	 */
	calculateYba(A: any, B: any, Y: any): any;

	/**
	 * S1 = H3(A|B|PW|Xab|g^Rb|(Xab)^Rb)
	 * @param A 
	 * @param B 
	 * @param gRa 
	 * @param gRb 
	 */
	calculateS1(A: any, B: any, gRa: any, gRb: any): any;

	/**
	 * S2 = H4(A|B|PW|g^Ra|Yba|(Yba)^Ra)
	 * @param A 
	 * @param B 
	 * @param gRa 
	 * @param gRb 
	 */
	calculateS2(A: any, B: any, gRa: any, gRb: any): any;

	/**
	 * K = H5(A|B|PW|g^Ra|Yba|(Yba)^Ra)
	 * @param A 
	 * @param B 
	 * @param gRa 
	 * @param gRb 
	 */
	calculateK(A: any, B: any, gRa: any, gRb: any): any;

	/**
	 * Generate a 384-bit random exponent.
	 */
	random(): any;
	lsb128(tmp: any): any;
	H1(string: any): any;
	H2(string: any): any;
	H3(string: any): any;
	H4(string: any): any;
	H5(string: any): any;
	HA(string: any, type: any): any;
	HB(string: any, type: any): any;
}

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
        private relativeContentBounds;
        private _emitterX;
        private _emitterY;
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
        constructor(texture: egret.Texture, emissionRate: number);
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
        $render(): void;
        private appendTransform(matrix, x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY);
    }
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
        constructor(texture: egret.Texture, config: any);
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
