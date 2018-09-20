/*! FileSaver.js
 *  A saveAs() FileSaver implementation.
 *  2014-01-24
 *
 *  By Eli Grey, http://eligrey.com
 *  License: X11/MIT
 *    See LICENSE.md
 */
/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs = saveAs
    || (typeof navigator !== "undefined" &&
        navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
    || (function (view) {
        "use strict";
        // IE <10 is explicitly unsupported
        if (typeof navigator !== "undefined" &&
            /MSIE [1-9]\./.test(navigator.userAgent)) {
            return;
        }
        var doc = view.document, get_URL = function () {
            return view.URL || view.webkitURL || view;
        }, URL = view.URL || view.webkitURL || view, save_link = (doc && doc.createElementNS("http://www.w3.org/1999/xhtml", "a")) || {}, can_use_save_link = !view.externalHost && "download" in save_link, click = function (node) {
            var event = doc.createEvent("MouseEvents");
            event.initMouseEvent("click", true, false, view, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            node.dispatchEvent(event);
        }, webkit_req_fs = view.webkitRequestFileSystem, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem, throw_outside = function (ex) {
            (view.setImmediate || view.setTimeout)(function () {
                throw ex;
            }, 0);
        }, force_saveable_type = "application/octet-stream", fs_min_size = 0, deletion_queue = [], process_deletion_queue = function () {
            var i = deletion_queue.length;
            while (i--) {
                var file = deletion_queue[i];
                if (typeof file === "string") {
                    URL.revokeObjectURL(file);
                }
                else {
                    file.remove();
                }
            }
            deletion_queue.length = 0; // clear queue
        }, dispatch = function (filesaver, event_types, event) {
            event_types = [].concat(event_types);
            var i = event_types.length;
            while (i--) {
                var listener = filesaver["on" + event_types[i]];
                if (typeof listener === "function") {
                    try {
                        listener.call(filesaver, event || filesaver);
                    }
                    catch (ex) {
                        throw_outside(ex);
                    }
                }
            }
        }, FileSaver = function (blob, name) {
            // First try a.download, then web filesystem, then object URLs
            var filesaver = this, type = blob.type, blob_changed = false, object_url, target_view, get_object_url = function () {
                var object_url = get_URL().createObjectURL(blob);
                deletion_queue.push(object_url);
                return object_url;
            }, dispatch_all = function () {
                dispatch(filesaver, "writestart progress write writeend".split(" "));
            }, fs_error = function () {
                // don't create more object URLs than needed
                if (blob_changed || !object_url) {
                    object_url = get_object_url(blob);
                }
                if (target_view) {
                    target_view.location.href = object_url;
                }
                else {
                    window.open(object_url, "_blank");
                }
                filesaver.readyState = filesaver.DONE;
                dispatch_all();
            }, abortable = function (func) {
                return function () {
                    if (filesaver.readyState !== filesaver.DONE) {
                        return func.apply(this, arguments);
                    }
                };
            }, create_if_not_found = { create: true, exclusive: false }, slice;
            filesaver.readyState = filesaver.INIT;
            if (!name) {
                name = "download";
            }
            if (can_use_save_link) {
                object_url = get_object_url(blob);
                // FF for Android has a nasty garbage collection mechanism
                // that turns all objects that are not pure javascript into 'deadObject'
                // this means `doc` and `save_link` are unusable and need to be recreated
                // `view` is usable though:
                doc = view.document;
                save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a");
                save_link.href = object_url;
                save_link.download = name;
                var event = doc.createEvent("MouseEvents");
                event.initMouseEvent("click", true, false, view, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                save_link.dispatchEvent(event);
                filesaver.readyState = filesaver.DONE;
                dispatch_all();
                return;
            }
            // Object and web filesystem URLs have a problem saving in Google Chrome when
            // viewed in a tab, so I force save with application/octet-stream
            // http://code.google.com/p/chromium/issues/detail?id=91158
            if (view.chrome && type && type !== force_saveable_type) {
                slice = blob.slice || blob.webkitSlice;
                blob = slice.call(blob, 0, blob.size, force_saveable_type);
                blob_changed = true;
            }
            // Since I can't be sure that the guessed media type will trigger a download
            // in WebKit, I append .download to the filename.
            // https://bugs.webkit.org/show_bug.cgi?id=65440
            if (webkit_req_fs && name !== "download") {
                name += ".download";
            }
            if (type === force_saveable_type || webkit_req_fs) {
                target_view = view;
            }
            if (!req_fs) {
                fs_error();
                return;
            }
            fs_min_size += blob.size;
            req_fs(view.TEMPORARY, fs_min_size, abortable(function (fs) {
                fs.root.getDirectory("saved", create_if_not_found, abortable(function (dir) {
                    var save = function () {
                        dir.getFile(name, create_if_not_found, abortable(function (file) {
                            file.createWriter(abortable(function (writer) {
                                writer.onwriteend = function (event) {
                                    target_view.location.href = file.toURL();
                                    deletion_queue.push(file);
                                    filesaver.readyState = filesaver.DONE;
                                    dispatch(filesaver, "writeend", event);
                                };
                                writer.onerror = function () {
                                    var error = writer.error;
                                    if (error.code !== error.ABORT_ERR) {
                                        fs_error();
                                    }
                                };
                                "writestart progress write abort".split(" ").forEach(function (event) {
                                    writer["on" + event] = filesaver["on" + event];
                                });
                                writer.write(blob);
                                filesaver.abort = function () {
                                    writer.abort();
                                    filesaver.readyState = filesaver.DONE;
                                };
                                filesaver.readyState = filesaver.WRITING;
                            }), fs_error);
                        }), fs_error);
                    };
                    dir.getFile(name, { create: false }, abortable(function (file) {
                        // delete file if it already exists
                        file.remove();
                        save();
                    }), abortable(function (ex) {
                        if (ex.code === ex.NOT_FOUND_ERR) {
                            save();
                        }
                        else {
                            fs_error();
                        }
                    }));
                }), fs_error);
            }), fs_error);
        }, FS_proto = FileSaver.prototype, saveAs = function (blob, name) {
            return new FileSaver(blob, name);
        };
        FS_proto.abort = function () {
            var filesaver = this;
            filesaver.readyState = filesaver.DONE;
            dispatch(filesaver, "abort");
        };
        FS_proto.readyState = FS_proto.INIT = 0;
        FS_proto.WRITING = 1;
        FS_proto.DONE = 2;
        FS_proto.error =
            FS_proto.onwritestart =
                FS_proto.onprogress =
                    FS_proto.onwrite =
                        FS_proto.onabort =
                            FS_proto.onerror =
                                FS_proto.onwriteend =
                                    null;
        view.addEventListener && view.addEventListener("unload", process_deletion_queue, false);
        saveAs.unload = function () {
            process_deletion_queue();
            view.removeEventListener("unload", process_deletion_queue, false);
        };
        return saveAs;
    }(typeof self !== "undefined" && self
        || typeof window !== "undefined" && window
        || this.content));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window
if (typeof module !== "undefined")
    module.exports = saveAs;
/*! FileSaver.js
 *  A saveAs() FileSaver implementation.
 *  2014-01-24
 *
 *  By Eli Grey, http://eligrey.com
 *  License: X11/MIT
 *    See LICENSE.md
 */
/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs = saveAs
    || (typeof navigator !== "undefined" &&
        navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
    || (function (view) {
        "use strict";
        // IE <10 is explicitly unsupported
        if (typeof navigator !== "undefined" &&
            /MSIE [1-9]\./.test(navigator.userAgent)) {
            return;
        }
        var doc = view.document, get_URL = function () {
            return view.URL || view.webkitURL || view;
        }, URL = view.URL || view.webkitURL || view, save_link = (doc && doc.createElementNS("http://www.w3.org/1999/xhtml", "a")) || {}, can_use_save_link = !view.externalHost && "download" in save_link, click = function (node) {
            var event = doc.createEvent("MouseEvents");
            event.initMouseEvent("click", true, false, view, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            node.dispatchEvent(event);
        }, webkit_req_fs = view.webkitRequestFileSystem, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem, throw_outside = function (ex) {
            (view.setImmediate || view.setTimeout)(function () {
                throw ex;
            }, 0);
        }, force_saveable_type = "application/octet-stream", fs_min_size = 0, deletion_queue = [], process_deletion_queue = function () {
            var i = deletion_queue.length;
            while (i--) {
                var file = deletion_queue[i];
                if (typeof file === "string") {
                    URL.revokeObjectURL(file);
                }
                else {
                    file.remove();
                }
            }
            deletion_queue.length = 0; // clear queue
        }, dispatch = function (filesaver, event_types, event) {
            event_types = [].concat(event_types);
            var i = event_types.length;
            while (i--) {
                var listener = filesaver["on" + event_types[i]];
                if (typeof listener === "function") {
                    try {
                        listener.call(filesaver, event || filesaver);
                    }
                    catch (ex) {
                        throw_outside(ex);
                    }
                }
            }
        }, FileSaver = function (blob, name) {
            // First try a.download, then web filesystem, then object URLs
            var filesaver = this, type = blob.type, blob_changed = false, object_url, target_view, get_object_url = function () {
                var object_url = get_URL().createObjectURL(blob);
                deletion_queue.push(object_url);
                return object_url;
            }, dispatch_all = function () {
                dispatch(filesaver, "writestart progress write writeend".split(" "));
            }, fs_error = function () {
                // don't create more object URLs than needed
                if (blob_changed || !object_url) {
                    object_url = get_object_url(blob);
                }
                if (target_view) {
                    target_view.location.href = object_url;
                }
                else {
                    window.open(object_url, "_blank");
                }
                filesaver.readyState = filesaver.DONE;
                dispatch_all();
            }, abortable = function (func) {
                return function () {
                    if (filesaver.readyState !== filesaver.DONE) {
                        return func.apply(this, arguments);
                    }
                };
            }, create_if_not_found = { create: true, exclusive: false }, slice;
            filesaver.readyState = filesaver.INIT;
            if (!name) {
                name = "download";
            }
            if (can_use_save_link) {
                object_url = get_object_url(blob);
                // FF for Android has a nasty garbage collection mechanism
                // that turns all objects that are not pure javascript into 'deadObject'
                // this means `doc` and `save_link` are unusable and need to be recreated
                // `view` is usable though:
                doc = view.document;
                save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a");
                save_link.href = object_url;
                save_link.download = name;
                var event = doc.createEvent("MouseEvents");
                event.initMouseEvent("click", true, false, view, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                save_link.dispatchEvent(event);
                filesaver.readyState = filesaver.DONE;
                dispatch_all();
                return;
            }
            // Object and web filesystem URLs have a problem saving in Google Chrome when
            // viewed in a tab, so I force save with application/octet-stream
            // http://code.google.com/p/chromium/issues/detail?id=91158
            if (view.chrome && type && type !== force_saveable_type) {
                slice = blob.slice || blob.webkitSlice;
                blob = slice.call(blob, 0, blob.size, force_saveable_type);
                blob_changed = true;
            }
            // Since I can't be sure that the guessed media type will trigger a download
            // in WebKit, I append .download to the filename.
            // https://bugs.webkit.org/show_bug.cgi?id=65440
            if (webkit_req_fs && name !== "download") {
                name += ".download";
            }
            if (type === force_saveable_type || webkit_req_fs) {
                target_view = view;
            }
            if (!req_fs) {
                fs_error();
                return;
            }
            fs_min_size += blob.size;
            req_fs(view.TEMPORARY, fs_min_size, abortable(function (fs) {
                fs.root.getDirectory("saved", create_if_not_found, abortable(function (dir) {
                    var save = function () {
                        dir.getFile(name, create_if_not_found, abortable(function (file) {
                            file.createWriter(abortable(function (writer) {
                                writer.onwriteend = function (event) {
                                    target_view.location.href = file.toURL();
                                    deletion_queue.push(file);
                                    filesaver.readyState = filesaver.DONE;
                                    dispatch(filesaver, "writeend", event);
                                };
                                writer.onerror = function () {
                                    var error = writer.error;
                                    if (error.code !== error.ABORT_ERR) {
                                        fs_error();
                                    }
                                };
                                "writestart progress write abort".split(" ").forEach(function (event) {
                                    writer["on" + event] = filesaver["on" + event];
                                });
                                writer.write(blob);
                                filesaver.abort = function () {
                                    writer.abort();
                                    filesaver.readyState = filesaver.DONE;
                                };
                                filesaver.readyState = filesaver.WRITING;
                            }), fs_error);
                        }), fs_error);
                    };
                    dir.getFile(name, { create: false }, abortable(function (file) {
                        // delete file if it already exists
                        file.remove();
                        save();
                    }), abortable(function (ex) {
                        if (ex.code === ex.NOT_FOUND_ERR) {
                            save();
                        }
                        else {
                            fs_error();
                        }
                    }));
                }), fs_error);
            }), fs_error);
        }, FS_proto = FileSaver.prototype, saveAs = function (blob, name) {
            return new FileSaver(blob, name);
        };
        FS_proto.abort = function () {
            var filesaver = this;
            filesaver.readyState = filesaver.DONE;
            dispatch(filesaver, "abort");
        };
        FS_proto.readyState = FS_proto.INIT = 0;
        FS_proto.WRITING = 1;
        FS_proto.DONE = 2;
        FS_proto.error =
            FS_proto.onwritestart =
                FS_proto.onprogress =
                    FS_proto.onwrite =
                        FS_proto.onabort =
                            FS_proto.onerror =
                                FS_proto.onwriteend =
                                    null;
        view.addEventListener && view.addEventListener("unload", process_deletion_queue, false);
        saveAs.unload = function () {
            process_deletion_queue();
            view.removeEventListener("unload", process_deletion_queue, false);
        };
        return saveAs;
    }(typeof self !== "undefined" && self
        || typeof window !== "undefined" && window
        || this.content));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window
if (typeof module !== "undefined")
    module.exports = saveAs;
/*!

JSZip - A Javascript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2014 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/
!function (a) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = a();
    else if ("function" == typeof define && define.amd)
        define([], a);
    else {
        var b;
        "undefined" != typeof __global ? b = __global : "undefined" != typeof window ? b = window : "undefined" != typeof global ? b = global : "undefined" != typeof self && (b = self), b.JSZip = a();
    }
}(function () {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i)
                        return i(g, !0);
                    if (f)
                        return f(g, !0);
                    throw new Error("Cannot find module '" + g + "'");
                }
                var j = c[g] = { exports: {} };
                b[g][0].call(j.exports, function (a) { var c = b[g][1][a]; return e(c ? c : a); }, j, j.exports, a, b, c, d);
            }
            return c[g].exports;
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++)
            e(d[g]);
        return e;
    }({ 1: [function (a, b, c) {
                "use strict";
                var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                c.encode = function (a) {
                    for (var b, c, e, f, g, h, i, j = "", k = 0; k < a.length;)
                        b = a.charCodeAt(k++), c = a.charCodeAt(k++), e = a.charCodeAt(k++), f = b >> 2, g = (3 & b) << 4 | c >> 4, h = (15 & c) << 2 | e >> 6, i = 63 & e, isNaN(c) ? h = i = 64 : isNaN(e) && (i = 64), j = j + d.charAt(f) + d.charAt(g) + d.charAt(h) + d.charAt(i);
                    return j;
                }, c.decode = function (a) {
                    var b, c, e, f, g, h, i, j = "", k = 0;
                    for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); k < a.length;)
                        f = d.indexOf(a.charAt(k++)), g = d.indexOf(a.charAt(k++)), h = d.indexOf(a.charAt(k++)), i = d.indexOf(a.charAt(k++)), b = f << 2 | g >> 4, c = (15 & g) << 4 | h >> 2, e = (3 & h) << 6 | i, j += String.fromCharCode(b), 64 != h && (j += String.fromCharCode(c)), 64 != i && (j += String.fromCharCode(e));
                    return j;
                };
            }, {}], 2: [function (a, b) {
                "use strict";
                function c() { this.compressedSize = 0, this.uncompressedSize = 0, this.crc32 = 0, this.compressionMethod = null, this.compressedContent = null; }
                c.prototype = { getContent: function () { return null; }, getCompressedContent: function () { return null; } }, b.exports = c;
            }, {}], 3: [function (a, b, c) {
                "use strict";
                c.STORE = { magic: "\x00\x00", compress: function (a) { return a; }, uncompress: function (a) { return a; }, compressInputType: null, uncompressInputType: null }, c.DEFLATE = a("./flate");
            }, { "./flate": 8 }], 4: [function (a, b) {
                "use strict";
                var c = a("./utils"), d = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
                b.exports = function (a, b) {
                    if ("undefined" == typeof a || !a.length)
                        return 0;
                    var e = "string" !== c.getTypeOf(a);
                    "undefined" == typeof b && (b = 0);
                    var f = 0, g = 0, h = 0;
                    b = -1 ^ b;
                    for (var i = 0, j = a.length; j > i; i++)
                        h = e ? a[i] : a.charCodeAt(i), g = 255 & (b ^ h), f = d[g], b = b >>> 8 ^ f;
                    return -1 ^ b;
                };
            }, { "./utils": 21 }], 5: [function (a, b) {
                "use strict";
                function c() { this.data = null, this.length = 0, this.index = 0; }
                var d = a("./utils");
                c.prototype = { checkOffset: function (a) { this.checkIndex(this.index + a); }, checkIndex: function (a) {
                        if (this.length < a || 0 > a)
                            throw new Error("End of data reached (data length = " + this.length + ", asked index = " + a + "). Corrupted zip ?");
                    }, setIndex: function (a) { this.checkIndex(a), this.index = a; }, skip: function (a) { this.setIndex(this.index + a); }, byteAt: function () { }, readInt: function (a) {
                        var b, c = 0;
                        for (this.checkOffset(a), b = this.index + a - 1; b >= this.index; b--)
                            c = (c << 8) + this.byteAt(b);
                        return this.index += a, c;
                    }, readString: function (a) { return d.transformTo("string", this.readData(a)); }, readData: function () { }, lastIndexOfSignature: function () { }, readDate: function () { var a = this.readInt(4); return new Date((a >> 25 & 127) + 1980, (a >> 21 & 15) - 1, a >> 16 & 31, a >> 11 & 31, a >> 5 & 63, (31 & a) << 1); } }, b.exports = c;
            }, { "./utils": 21 }], 6: [function (a, b, c) {
                "use strict";
                c.base64 = !1, c.binary = !1, c.dir = !1, c.createFolders = !1, c.date = null, c.compression = null, c.compressionOptions = null, c.comment = null, c.unixPermissions = null, c.dosPermissions = null;
            }, {}], 7: [function (a, b, c) {
                "use strict";
                var d = a("./utils");
                c.string2binary = function (a) { return d.string2binary(a); }, c.string2Uint8Array = function (a) { return d.transformTo("uint8array", a); }, c.uint8Array2String = function (a) { return d.transformTo("string", a); }, c.string2Blob = function (a) { var b = d.transformTo("arraybuffer", a); return d.arrayBuffer2Blob(b); }, c.arrayBuffer2Blob = function (a) { return d.arrayBuffer2Blob(a); }, c.transformTo = function (a, b) { return d.transformTo(a, b); }, c.getTypeOf = function (a) { return d.getTypeOf(a); }, c.checkSupport = function (a) { return d.checkSupport(a); }, c.MAX_VALUE_16BITS = d.MAX_VALUE_16BITS, c.MAX_VALUE_32BITS = d.MAX_VALUE_32BITS, c.pretty = function (a) { return d.pretty(a); }, c.findCompression = function (a) { return d.findCompression(a); }, c.isRegExp = function (a) { return d.isRegExp(a); };
            }, { "./utils": 21 }], 8: [function (a, b, c) {
                "use strict";
                var d = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, e = a("pako");
                c.uncompressInputType = d ? "uint8array" : "array", c.compressInputType = d ? "uint8array" : "array", c.magic = "\b\x00", c.compress = function (a, b) { return e.deflateRaw(a, { level: b.level || -1 }); }, c.uncompress = function (a) { return e.inflateRaw(a); };
            }, { pako: 24 }], 9: [function (a, b) {
                "use strict";
                function c(a, b) {
                    return this instanceof c ? (this.files = {}, this.comment = null, this.root = "", a && this.load(a, b), void (this.clone = function () {
                        var a = new c;
                        for (var b in this)
                            "function" != typeof this[b] && (a[b] = this[b]);
                        return a;
                    })) : new c(a, b);
                }
                var d = a("./base64");
                c.prototype = a("./object"), c.prototype.load = a("./load"), c.support = a("./support"), c.defaults = a("./defaults"), c.utils = a("./deprecatedPublicUtils"), c.base64 = { encode: function (a) { return d.encode(a); }, decode: function (a) { return d.decode(a); } }, c.compressions = a("./compressions"), b.exports = c;
            }, { "./base64": 1, "./compressions": 3, "./defaults": 6, "./deprecatedPublicUtils": 7, "./load": 10, "./object": 13, "./support": 17 }], 10: [function (a, b) {
                "use strict";
                var c = a("./base64"), d = a("./zipEntries");
                b.exports = function (a, b) {
                    var e, f, g, h;
                    for (b = b || {}, b.base64 && (a = c.decode(a)), f = new d(a, b), e = f.files, g = 0; g < e.length; g++)
                        h = e[g], this.file(h.fileName, h.decompressed, { binary: !0, optimizedBinaryString: !0, date: h.date, dir: h.dir, comment: h.fileComment.length ? h.fileComment : null, unixPermissions: h.unixPermissions, dosPermissions: h.dosPermissions, createFolders: b.createFolders });
                    return f.zipComment.length && (this.comment = f.zipComment), this;
                };
            }, { "./base64": 1, "./zipEntries": 22 }], 11: [function (a, b) {
                (function (a) {
                    "use strict";
                    b.exports = function (b, c) { return new a(b, c); }, b.exports.test = function (b) { return a.isBuffer(b); };
                }).call(this, "undefined" != typeof Buffer ? Buffer : void 0);
            }, {}], 12: [function (a, b) {
                "use strict";
                function c(a) { this.data = a, this.length = this.data.length, this.index = 0; }
                var d = a("./uint8ArrayReader");
                c.prototype = new d, c.prototype.readData = function (a) { this.checkOffset(a); var b = this.data.slice(this.index, this.index + a); return this.index += a, b; }, b.exports = c;
            }, { "./uint8ArrayReader": 18 }], 13: [function (a, b) {
                "use strict";
                var c = a("./support"), d = a("./utils"), e = a("./crc32"), f = a("./signature"), g = a("./defaults"), h = a("./base64"), i = a("./compressions"), j = a("./compressedObject"), k = a("./nodeBuffer"), l = a("./utf8"), m = a("./stringWriter"), n = a("./uint8ArrayWriter"), o = function (a) {
                    if (a._data instanceof j && (a._data = a._data.getContent(), a.options.binary = !0, a.options.base64 = !1, "uint8array" === d.getTypeOf(a._data))) {
                        var b = a._data;
                        a._data = new Uint8Array(b.length), 0 !== b.length && a._data.set(b, 0);
                    }
                    return a._data;
                }, p = function (a) { var b = o(a), e = d.getTypeOf(b); return "string" === e ? !a.options.binary && c.nodebuffer ? k(b, "utf-8") : a.asBinary() : b; }, q = function (a) { var b = o(this); return null === b || "undefined" == typeof b ? "" : (this.options.base64 && (b = h.decode(b)), b = a && this.options.binary ? D.utf8decode(b) : d.transformTo("string", b), a || this.options.binary || (b = d.transformTo("string", D.utf8encode(b))), b); }, r = function (a, b, c) { this.name = a, this.dir = c.dir, this.date = c.date, this.comment = c.comment, this.unixPermissions = c.unixPermissions, this.dosPermissions = c.dosPermissions, this._data = b, this.options = c, this._initialMetadata = { dir: c.dir, date: c.date }; };
                r.prototype = { asText: function () { return q.call(this, !0); }, asBinary: function () { return q.call(this, !1); }, asNodeBuffer: function () { var a = p(this); return d.transformTo("nodebuffer", a); }, asUint8Array: function () { var a = p(this); return d.transformTo("uint8array", a); }, asArrayBuffer: function () { return this.asUint8Array().buffer; } };
                var s = function (a, b) {
                    var c, d = "";
                    for (c = 0; b > c; c++)
                        d += String.fromCharCode(255 & a), a >>>= 8;
                    return d;
                }, t = function () {
                    var a, b, c = {};
                    for (a = 0; a < arguments.length; a++)
                        for (b in arguments[a])
                            arguments[a].hasOwnProperty(b) && "undefined" == typeof c[b] && (c[b] = arguments[a][b]);
                    return c;
                }, u = function (a) { return a = a || {}, a.base64 !== !0 || null !== a.binary && void 0 !== a.binary || (a.binary = !0), a = t(a, g), a.date = a.date || new Date, null !== a.compression && (a.compression = a.compression.toUpperCase()), a; }, v = function (a, b, c) {
                    var e, f = d.getTypeOf(b);
                    if (c = u(c), "string" == typeof c.unixPermissions && (c.unixPermissions = parseInt(c.unixPermissions, 8)), c.unixPermissions && 16384 & c.unixPermissions && (c.dir = !0), c.dosPermissions && 16 & c.dosPermissions && (c.dir = !0), c.dir && (a = x(a)), c.createFolders && (e = w(a)) && y.call(this, e, !0), c.dir || null === b || "undefined" == typeof b)
                        c.base64 = !1, c.binary = !1, b = null, f = null;
                    else if ("string" === f)
                        c.binary && !c.base64 && c.optimizedBinaryString !== !0 && (b = d.string2binary(b));
                    else {
                        if (c.base64 = !1, c.binary = !0, !(f || b instanceof j))
                            throw new Error("The data of '" + a + "' is in an unsupported format !");
                        "arraybuffer" === f && (b = d.transformTo("uint8array", b));
                    }
                    var g = new r(a, b, c);
                    return this.files[a] = g, g;
                }, w = function (a) { "/" == a.slice(-1) && (a = a.substring(0, a.length - 1)); var b = a.lastIndexOf("/"); return b > 0 ? a.substring(0, b) : ""; }, x = function (a) { return "/" != a.slice(-1) && (a += "/"), a; }, y = function (a, b) { return b = "undefined" != typeof b ? b : !1, a = x(a), this.files[a] || v.call(this, a, null, { dir: !0, createFolders: b }), this.files[a]; }, z = function (a, b, c) { var f, g = new j; return a._data instanceof j ? (g.uncompressedSize = a._data.uncompressedSize, g.crc32 = a._data.crc32, 0 === g.uncompressedSize || a.dir ? (b = i.STORE, g.compressedContent = "", g.crc32 = 0) : a._data.compressionMethod === b.magic ? g.compressedContent = a._data.getCompressedContent() : (f = a._data.getContent(), g.compressedContent = b.compress(d.transformTo(b.compressInputType, f), c))) : (f = p(a), (!f || 0 === f.length || a.dir) && (b = i.STORE, f = ""), g.uncompressedSize = f.length, g.crc32 = e(f), g.compressedContent = b.compress(d.transformTo(b.compressInputType, f), c)), g.compressedSize = g.compressedContent.length, g.compressionMethod = b.magic, g; }, A = function (a, b) { var c = a; return a || (c = b ? 16893 : 33204), (65535 & c) << 16; }, B = function (a) { return 63 & (a || 0); }, C = function (a, b, c, g, h) { var i, j, k, m, n = (c.compressedContent, d.transformTo("string", l.utf8encode(b.name))), o = b.comment || "", p = d.transformTo("string", l.utf8encode(o)), q = n.length !== b.name.length, r = p.length !== o.length, t = b.options, u = "", v = "", w = ""; k = b._initialMetadata.dir !== b.dir ? b.dir : t.dir, m = b._initialMetadata.date !== b.date ? b.date : t.date; var x = 0, y = 0; k && (x |= 16), "UNIX" === h ? (y = 798, x |= A(b.unixPermissions, k)) : (y = 20, x |= B(b.dosPermissions, k)), i = m.getHours(), i <<= 6, i |= m.getMinutes(), i <<= 5, i |= m.getSeconds() / 2, j = m.getFullYear() - 1980, j <<= 4, j |= m.getMonth() + 1, j <<= 5, j |= m.getDate(), q && (v = s(1, 1) + s(e(n), 4) + n, u += "up" + s(v.length, 2) + v), r && (w = s(1, 1) + s(this.crc32(p), 4) + p, u += "uc" + s(w.length, 2) + w); var z = ""; z += "\n\x00", z += q || r ? "\x00\b" : "\x00\x00", z += c.compressionMethod, z += s(i, 2), z += s(j, 2), z += s(c.crc32, 4), z += s(c.compressedSize, 4), z += s(c.uncompressedSize, 4), z += s(n.length, 2), z += s(u.length, 2); var C = f.LOCAL_FILE_HEADER + z + n + u, D = f.CENTRAL_FILE_HEADER + s(y, 2) + z + s(p.length, 2) + "\x00\x00\x00\x00" + s(x, 4) + s(g, 4) + n + u + p; return { fileRecord: C, dirRecord: D, compressedObject: c }; }, D = { load: function () { throw new Error("Load method is not defined. Is the file jszip.json-load.js included ?"); }, filter: function (a) {
                        var b, c, d, e, f = [];
                        for (b in this.files)
                            this.files.hasOwnProperty(b) && (d = this.files[b], e = new r(d.name, d._data, t(d.options)), c = b.slice(this.root.length, b.length), b.slice(0, this.root.length) === this.root && a(c, e) && f.push(e));
                        return f;
                    }, file: function (a, b, c) {
                        if (1 === arguments.length) {
                            if (d.isRegExp(a)) {
                                var e = a;
                                return this.filter(function (a, b) { return !b.dir && e.test(a); });
                            }
                            return this.filter(function (b, c) { return !c.dir && b === a; })[0] || null;
                        }
                        return a = this.root + a, v.call(this, a, b, c), this;
                    }, folder: function (a) {
                        if (!a)
                            return this;
                        if (d.isRegExp(a))
                            return this.filter(function (b, c) { return c.dir && a.test(b); });
                        var b = this.root + a, c = y.call(this, b), e = this.clone();
                        return e.root = c.name, e;
                    }, remove: function (a) {
                        a = this.root + a;
                        var b = this.files[a];
                        if (b || ("/" != a.slice(-1) && (a += "/"), b = this.files[a]), b && !b.dir)
                            delete this.files[a];
                        else
                            for (var c = this.filter(function (b, c) { return c.name.slice(0, a.length) === a; }), d = 0; d < c.length; d++)
                                delete this.files[c[d].name];
                        return this;
                    }, generate: function (a) {
                        a = t(a || {}, { base64: !0, compression: "STORE", compressionOptions: null, type: "base64", platform: "DOS", comment: null, mimeType: "application/zip" }), d.checkSupport(a.type), ("darwin" === a.platform || "freebsd" === a.platform || "linux" === a.platform || "sunos" === a.platform) && (a.platform = "UNIX"), "win32" === a.platform && (a.platform = "DOS");
                        var b, c, e = [], g = 0, j = 0, k = d.transformTo("string", this.utf8encode(a.comment || this.comment || ""));
                        for (var l in this.files)
                            if (this.files.hasOwnProperty(l)) {
                                var o = this.files[l], p = o.options.compression || a.compression.toUpperCase(), q = i[p];
                                if (!q)
                                    throw new Error(p + " is not a valid compression method !");
                                var r = o.options.compressionOptions || a.compressionOptions || {}, u = z.call(this, o, q, r), v = C.call(this, l, o, u, g, a.platform);
                                g += v.fileRecord.length + u.compressedSize, j += v.dirRecord.length, e.push(v);
                            }
                        var w = "";
                        w = f.CENTRAL_DIRECTORY_END + "\x00\x00\x00\x00" + s(e.length, 2) + s(e.length, 2) + s(j, 4) + s(g, 4) + s(k.length, 2) + k;
                        var x = a.type.toLowerCase();
                        for (b = "uint8array" === x || "arraybuffer" === x || "blob" === x || "nodebuffer" === x ? new n(g + j + w.length) : new m(g + j + w.length), c = 0; c < e.length; c++)
                            b.append(e[c].fileRecord), b.append(e[c].compressedObject.compressedContent);
                        for (c = 0; c < e.length; c++)
                            b.append(e[c].dirRecord);
                        b.append(w);
                        var y = b.finalize();
                        switch (a.type.toLowerCase()) {
                            case "uint8array":
                            case "arraybuffer":
                            case "nodebuffer": return d.transformTo(a.type.toLowerCase(), y);
                            case "blob": return d.arrayBuffer2Blob(d.transformTo("arraybuffer", y), a.mimeType);
                            case "base64": return a.base64 ? h.encode(y) : y;
                            default: return y;
                        }
                    }, crc32: function (a, b) { return e(a, b); }, utf8encode: function (a) { return d.transformTo("string", l.utf8encode(a)); }, utf8decode: function (a) { return l.utf8decode(a); } };
                b.exports = D;
            }, { "./base64": 1, "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./defaults": 6, "./nodeBuffer": 11, "./signature": 14, "./stringWriter": 16, "./support": 17, "./uint8ArrayWriter": 19, "./utf8": 20, "./utils": 21 }], 14: [function (a, b, c) {
                "use strict";
                c.LOCAL_FILE_HEADER = "PK", c.CENTRAL_FILE_HEADER = "PK", c.CENTRAL_DIRECTORY_END = "PK", c.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK", c.ZIP64_CENTRAL_DIRECTORY_END = "PK", c.DATA_DESCRIPTOR = "PK\b";
            }, {}], 15: [function (a, b) {
                "use strict";
                function c(a, b) { this.data = a, b || (this.data = e.string2binary(this.data)), this.length = this.data.length, this.index = 0; }
                var d = a("./dataReader"), e = a("./utils");
                c.prototype = new d, c.prototype.byteAt = function (a) { return this.data.charCodeAt(a); }, c.prototype.lastIndexOfSignature = function (a) { return this.data.lastIndexOf(a); }, c.prototype.readData = function (a) { this.checkOffset(a); var b = this.data.slice(this.index, this.index + a); return this.index += a, b; }, b.exports = c;
            }, { "./dataReader": 5, "./utils": 21 }], 16: [function (a, b) {
                "use strict";
                var c = a("./utils"), d = function () { this.data = []; };
                d.prototype = { append: function (a) { a = c.transformTo("string", a), this.data.push(a); }, finalize: function () { return this.data.join(""); } }, b.exports = d;
            }, { "./utils": 21 }], 17: [function (a, b, c) {
                (function (a) {
                    "use strict";
                    if (c.base64 = !0, c.array = !0, c.string = !0, c.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, c.nodebuffer = "undefined" != typeof a, c.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer)
                        c.blob = !1;
                    else {
                        var b = new ArrayBuffer(0);
                        try {
                            c.blob = 0 === new Blob([b], { type: "application/zip" }).size;
                        }
                        catch (d) {
                            try {
                                var e = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, f = new e;
                                f.append(b), c.blob = 0 === f.getBlob("application/zip").size;
                            }
                            catch (d) {
                                c.blob = !1;
                            }
                        }
                    }
                }).call(this, "undefined" != typeof Buffer ? Buffer : void 0);
            }, {}], 18: [function (a, b) {
                "use strict";
                function c(a) { a && (this.data = a, this.length = this.data.length, this.index = 0); }
                var d = a("./dataReader");
                c.prototype = new d, c.prototype.byteAt = function (a) { return this.data[a]; }, c.prototype.lastIndexOfSignature = function (a) {
                    for (var b = a.charCodeAt(0), c = a.charCodeAt(1), d = a.charCodeAt(2), e = a.charCodeAt(3), f = this.length - 4; f >= 0; --f)
                        if (this.data[f] === b && this.data[f + 1] === c && this.data[f + 2] === d && this.data[f + 3] === e)
                            return f;
                    return -1;
                }, c.prototype.readData = function (a) {
                    if (this.checkOffset(a), 0 === a)
                        return new Uint8Array(0);
                    var b = this.data.subarray(this.index, this.index + a);
                    return this.index += a, b;
                }, b.exports = c;
            }, { "./dataReader": 5 }], 19: [function (a, b) {
                "use strict";
                var c = a("./utils"), d = function (a) { this.data = new Uint8Array(a), this.index = 0; };
                d.prototype = { append: function (a) { 0 !== a.length && (a = c.transformTo("uint8array", a), this.data.set(a, this.index), this.index += a.length); }, finalize: function () { return this.data; } }, b.exports = d;
            }, { "./utils": 21 }], 20: [function (a, b, c) {
                "use strict";
                for (var d = a("./utils"), e = a("./support"), f = a("./nodeBuffer"), g = new Array(256), h = 0; 256 > h; h++)
                    g[h] = h >= 252 ? 6 : h >= 248 ? 5 : h >= 240 ? 4 : h >= 224 ? 3 : h >= 192 ? 2 : 1;
                g[254] = g[254] = 1;
                var i = function (a) {
                    var b, c, d, f, g, h = a.length, i = 0;
                    for (f = 0; h > f; f++)
                        c = a.charCodeAt(f), 55296 === (64512 & c) && h > f + 1 && (d = a.charCodeAt(f + 1), 56320 === (64512 & d) && (c = 65536 + (c - 55296 << 10) + (d - 56320), f++)), i += 128 > c ? 1 : 2048 > c ? 2 : 65536 > c ? 3 : 4;
                    for (b = e.uint8array ? new Uint8Array(i) : new Array(i), g = 0, f = 0; i > g; f++)
                        c = a.charCodeAt(f), 55296 === (64512 & c) && h > f + 1 && (d = a.charCodeAt(f + 1), 56320 === (64512 & d) && (c = 65536 + (c - 55296 << 10) + (d - 56320), f++)), 128 > c ? b[g++] = c : 2048 > c ? (b[g++] = 192 | c >>> 6, b[g++] = 128 | 63 & c) : 65536 > c ? (b[g++] = 224 | c >>> 12, b[g++] = 128 | c >>> 6 & 63, b[g++] = 128 | 63 & c) : (b[g++] = 240 | c >>> 18, b[g++] = 128 | c >>> 12 & 63, b[g++] = 128 | c >>> 6 & 63, b[g++] = 128 | 63 & c);
                    return b;
                }, j = function (a, b) {
                    var c;
                    for (b = b || a.length, b > a.length && (b = a.length), c = b - 1; c >= 0 && 128 === (192 & a[c]);)
                        c--;
                    return 0 > c ? b : 0 === c ? b : c + g[a[c]] > b ? c : b;
                }, k = function (a) {
                    var b, c, e, f, h = a.length, i = new Array(2 * h);
                    for (c = 0, b = 0; h > b;)
                        if (e = a[b++], 128 > e)
                            i[c++] = e;
                        else if (f = g[e], f > 4)
                            i[c++] = 65533, b += f - 1;
                        else {
                            for (e &= 2 === f ? 31 : 3 === f ? 15 : 7; f > 1 && h > b;)
                                e = e << 6 | 63 & a[b++], f--;
                            f > 1 ? i[c++] = 65533 : 65536 > e ? i[c++] = e : (e -= 65536, i[c++] = 55296 | e >> 10 & 1023, i[c++] = 56320 | 1023 & e);
                        }
                    return i.length !== c && (i.subarray ? i = i.subarray(0, c) : i.length = c), d.applyFromCharCode(i);
                };
                c.utf8encode = function (a) { return e.nodebuffer ? f(a, "utf-8") : i(a); }, c.utf8decode = function (a) {
                    if (e.nodebuffer)
                        return d.transformTo("nodebuffer", a).toString("utf-8");
                    a = d.transformTo(e.uint8array ? "uint8array" : "array", a);
                    for (var b = [], c = 0, f = a.length, g = 65536; f > c;) {
                        var h = j(a, Math.min(c + g, f));
                        b.push(e.uint8array ? k(a.subarray(c, h)) : k(a.slice(c, h))), c = h;
                    }
                    return b.join("");
                };
            }, { "./nodeBuffer": 11, "./support": 17, "./utils": 21 }], 21: [function (a, b, c) {
                "use strict";
                function d(a) { return a; }
                function e(a, b) {
                    for (var c = 0; c < a.length; ++c)
                        b[c] = 255 & a.charCodeAt(c);
                    return b;
                }
                function f(a) {
                    var b = 65536, d = [], e = a.length, f = c.getTypeOf(a), g = 0, h = !0;
                    try {
                        switch (f) {
                            case "uint8array":
                                String.fromCharCode.apply(null, new Uint8Array(0));
                                break;
                            case "nodebuffer": String.fromCharCode.apply(null, j(0));
                        }
                    }
                    catch (i) {
                        h = !1;
                    }
                    if (!h) {
                        for (var k = "", l = 0; l < a.length; l++)
                            k += String.fromCharCode(a[l]);
                        return k;
                    }
                    for (; e > g && b > 1;)
                        try {
                            d.push("array" === f || "nodebuffer" === f ? String.fromCharCode.apply(null, a.slice(g, Math.min(g + b, e))) : String.fromCharCode.apply(null, a.subarray(g, Math.min(g + b, e)))), g += b;
                        }
                        catch (i) {
                            b = Math.floor(b / 2);
                        }
                    return d.join("");
                }
                function g(a, b) {
                    for (var c = 0; c < a.length; c++)
                        b[c] = a[c];
                    return b;
                }
                var h = a("./support"), i = a("./compressions"), j = a("./nodeBuffer");
                c.string2binary = function (a) {
                    for (var b = "", c = 0; c < a.length; c++)
                        b += String.fromCharCode(255 & a.charCodeAt(c));
                    return b;
                }, c.arrayBuffer2Blob = function (a, b) {
                    c.checkSupport("blob"), b = b || "application/zip";
                    try {
                        return new Blob([a], { type: b });
                    }
                    catch (d) {
                        try {
                            var e = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, f = new e;
                            return f.append(a), f.getBlob(b);
                        }
                        catch (d) {
                            throw new Error("Bug : can't construct the Blob.");
                        }
                    }
                }, c.applyFromCharCode = f;
                var k = {};
                k.string = { string: d, array: function (a) { return e(a, new Array(a.length)); }, arraybuffer: function (a) { return k.string.uint8array(a).buffer; }, uint8array: function (a) { return e(a, new Uint8Array(a.length)); }, nodebuffer: function (a) { return e(a, j(a.length)); } }, k.array = { string: f, array: d, arraybuffer: function (a) { return new Uint8Array(a).buffer; }, uint8array: function (a) { return new Uint8Array(a); }, nodebuffer: function (a) { return j(a); } }, k.arraybuffer = { string: function (a) { return f(new Uint8Array(a)); }, array: function (a) { return g(new Uint8Array(a), new Array(a.byteLength)); }, arraybuffer: d, uint8array: function (a) { return new Uint8Array(a); }, nodebuffer: function (a) { return j(new Uint8Array(a)); } }, k.uint8array = { string: f, array: function (a) { return g(a, new Array(a.length)); }, arraybuffer: function (a) { return a.buffer; }, uint8array: d, nodebuffer: function (a) { return j(a); } }, k.nodebuffer = { string: f, array: function (a) { return g(a, new Array(a.length)); }, arraybuffer: function (a) { return k.nodebuffer.uint8array(a).buffer; }, uint8array: function (a) { return g(a, new Uint8Array(a.length)); }, nodebuffer: d }, c.transformTo = function (a, b) {
                    if (b || (b = ""), !a)
                        return b;
                    c.checkSupport(a);
                    var d = c.getTypeOf(b), e = k[d][a](b);
                    return e;
                }, c.getTypeOf = function (a) { return "string" == typeof a ? "string" : "[object Array]" === Object.prototype.toString.call(a) ? "array" : h.nodebuffer && j.test(a) ? "nodebuffer" : h.uint8array && a instanceof Uint8Array ? "uint8array" : h.arraybuffer && a instanceof ArrayBuffer ? "arraybuffer" : void 0; }, c.checkSupport = function (a) {
                    var b = h[a.toLowerCase()];
                    if (!b)
                        throw new Error(a + " is not supported by this browser");
                }, c.MAX_VALUE_16BITS = 65535, c.MAX_VALUE_32BITS = -1, c.pretty = function (a) {
                    var b, c, d = "";
                    for (c = 0; c < (a || "").length; c++)
                        b = a.charCodeAt(c), d += "\\x" + (16 > b ? "0" : "") + b.toString(16).toUpperCase();
                    return d;
                }, c.findCompression = function (a) {
                    for (var b in i)
                        if (i.hasOwnProperty(b) && i[b].magic === a)
                            return i[b];
                    return null;
                }, c.isRegExp = function (a) { return "[object RegExp]" === Object.prototype.toString.call(a); };
            }, { "./compressions": 3, "./nodeBuffer": 11, "./support": 17 }], 22: [function (a, b) {
                "use strict";
                function c(a, b) { this.files = [], this.loadOptions = b, a && this.load(a); }
                var d = a("./stringReader"), e = a("./nodeBufferReader"), f = a("./uint8ArrayReader"), g = a("./utils"), h = a("./signature"), i = a("./zipEntry"), j = a("./support"), k = a("./object");
                c.prototype = { checkSignature: function (a) {
                        var b = this.reader.readString(4);
                        if (b !== a)
                            throw new Error("Corrupted zip or bug : unexpected signature (" + g.pretty(b) + ", expected " + g.pretty(a) + ")");
                    }, readBlockEndOfCentral: function () { this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2), this.zipComment = this.reader.readString(this.zipCommentLength), this.zipComment = k.utf8decode(this.zipComment); }, readBlockZip64EndOfCentral: function () {
                        this.zip64EndOfCentralSize = this.reader.readInt(8), this.versionMadeBy = this.reader.readString(2), this.versionNeeded = this.reader.readInt(2), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
                        for (var a, b, c, d = this.zip64EndOfCentralSize - 44, e = 0; d > e;)
                            a = this.reader.readInt(2), b = this.reader.readInt(4), c = this.reader.readString(b), this.zip64ExtensibleData[a] = { id: a, length: b, value: c };
                    }, readBlockZip64EndOfCentralLocator: function () {
                        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), this.disksCount > 1)
                            throw new Error("Multi-volumes zip are not supported");
                    }, readLocalFiles: function () {
                        var a, b;
                        for (a = 0; a < this.files.length; a++)
                            b = this.files[a], this.reader.setIndex(b.localHeaderOffset), this.checkSignature(h.LOCAL_FILE_HEADER), b.readLocalPart(this.reader), b.handleUTF8(), b.processAttributes();
                    }, readCentralDir: function () {
                        var a;
                        for (this.reader.setIndex(this.centralDirOffset); this.reader.readString(4) === h.CENTRAL_FILE_HEADER;)
                            a = new i({ zip64: this.zip64 }, this.loadOptions), a.readCentralPart(this.reader), this.files.push(a);
                    }, readEndOfCentral: function () {
                        var a = this.reader.lastIndexOfSignature(h.CENTRAL_DIRECTORY_END);
                        if (-1 === a) {
                            var b = !0;
                            try {
                                this.reader.setIndex(0), this.checkSignature(h.LOCAL_FILE_HEADER), b = !1;
                            }
                            catch (c) { }
                            throw new Error(b ? "Can't find end of central directory : is this a zip file ? If it is, see http://stuk.github.io/jszip.json/documentation/howto/read_zip.html" : "Corrupted zip : can't find end of central directory");
                        }
                        if (this.reader.setIndex(a), this.checkSignature(h.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === g.MAX_VALUE_16BITS || this.diskWithCentralDirStart === g.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === g.MAX_VALUE_16BITS || this.centralDirRecords === g.MAX_VALUE_16BITS || this.centralDirSize === g.MAX_VALUE_32BITS || this.centralDirOffset === g.MAX_VALUE_32BITS) {
                            if (this.zip64 = !0, a = this.reader.lastIndexOfSignature(h.ZIP64_CENTRAL_DIRECTORY_LOCATOR), -1 === a)
                                throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator");
                            this.reader.setIndex(a), this.checkSignature(h.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(h.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
                        }
                    }, prepareReader: function (a) { var b = g.getTypeOf(a); this.reader = "string" !== b || j.uint8array ? "nodebuffer" === b ? new e(a) : new f(g.transformTo("uint8array", a)) : new d(a, this.loadOptions.optimizedBinaryString); }, load: function (a) { this.prepareReader(a), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles(); } }, b.exports = c;
            }, { "./nodeBufferReader": 12, "./object": 13, "./signature": 14, "./stringReader": 15, "./support": 17, "./uint8ArrayReader": 18, "./utils": 21, "./zipEntry": 23 }], 23: [function (a, b) {
                "use strict";
                function c(a, b) { this.options = a, this.loadOptions = b; }
                var d = a("./stringReader"), e = a("./utils"), f = a("./compressedObject"), g = a("./object"), h = 0, i = 3;
                c.prototype = { isEncrypted: function () { return 1 === (1 & this.bitFlag); }, useUTF8: function () { return 2048 === (2048 & this.bitFlag); }, prepareCompressedContent: function (a, b, c) { return function () { var d = a.index; a.setIndex(b); var e = a.readData(c); return a.setIndex(d), e; }; }, prepareContent: function (a, b, c, d, f) {
                        return function () {
                            var a = e.transformTo(d.uncompressInputType, this.getCompressedContent()), b = d.uncompress(a);
                            if (b.length !== f)
                                throw new Error("Bug : uncompressed data size mismatch");
                            return b;
                        };
                    }, readLocalPart: function (a) {
                        var b, c;
                        if (a.skip(22), this.fileNameLength = a.readInt(2), c = a.readInt(2), this.fileName = a.readString(this.fileNameLength), a.skip(c), -1 == this.compressedSize || -1 == this.uncompressedSize)
                            throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize == -1 || uncompressedSize == -1)");
                        if (b = e.findCompression(this.compressionMethod), null === b)
                            throw new Error("Corrupted zip : compression " + e.pretty(this.compressionMethod) + " unknown (inner file : " + this.fileName + ")");
                        if (this.decompressed = new f, this.decompressed.compressedSize = this.compressedSize, this.decompressed.uncompressedSize = this.uncompressedSize, this.decompressed.crc32 = this.crc32, this.decompressed.compressionMethod = this.compressionMethod, this.decompressed.getCompressedContent = this.prepareCompressedContent(a, a.index, this.compressedSize, b), this.decompressed.getContent = this.prepareContent(a, a.index, this.compressedSize, b, this.uncompressedSize), this.loadOptions.checkCRC32 && (this.decompressed = e.transformTo("string", this.decompressed.getContent()), g.crc32(this.decompressed) !== this.crc32))
                            throw new Error("Corrupted zip : CRC32 mismatch");
                    }, readCentralPart: function (a) {
                        if (this.versionMadeBy = a.readInt(2), this.versionNeeded = a.readInt(2), this.bitFlag = a.readInt(2), this.compressionMethod = a.readString(2), this.date = a.readDate(), this.crc32 = a.readInt(4), this.compressedSize = a.readInt(4), this.uncompressedSize = a.readInt(4), this.fileNameLength = a.readInt(2), this.extraFieldsLength = a.readInt(2), this.fileCommentLength = a.readInt(2), this.diskNumberStart = a.readInt(2), this.internalFileAttributes = a.readInt(2), this.externalFileAttributes = a.readInt(4), this.localHeaderOffset = a.readInt(4), this.isEncrypted())
                            throw new Error("Encrypted zip are not supported");
                        this.fileName = a.readString(this.fileNameLength), this.readExtraFields(a), this.parseZIP64ExtraField(a), this.fileComment = a.readString(this.fileCommentLength);
                    }, processAttributes: function () { this.unixPermissions = null, this.dosPermissions = null; var a = this.versionMadeBy >> 8; this.dir = 16 & this.externalFileAttributes ? !0 : !1, a === h && (this.dosPermissions = 63 & this.externalFileAttributes), a === i && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileName.slice(-1) || (this.dir = !0); }, parseZIP64ExtraField: function () {
                        if (this.extraFields[1]) {
                            var a = new d(this.extraFields[1].value);
                            this.uncompressedSize === e.MAX_VALUE_32BITS && (this.uncompressedSize = a.readInt(8)), this.compressedSize === e.MAX_VALUE_32BITS && (this.compressedSize = a.readInt(8)), this.localHeaderOffset === e.MAX_VALUE_32BITS && (this.localHeaderOffset = a.readInt(8)), this.diskNumberStart === e.MAX_VALUE_32BITS && (this.diskNumberStart = a.readInt(4));
                        }
                    }, readExtraFields: function (a) {
                        var b, c, d, e = a.index;
                        for (this.extraFields = this.extraFields || {}; a.index < e + this.extraFieldsLength;)
                            b = a.readInt(2), c = a.readInt(2), d = a.readString(c), this.extraFields[b] = { id: b, length: c, value: d };
                    }, handleUTF8: function () {
                        if (this.useUTF8())
                            this.fileName = g.utf8decode(this.fileName), this.fileComment = g.utf8decode(this.fileComment);
                        else {
                            var a = this.findExtraFieldUnicodePath();
                            null !== a && (this.fileName = a);
                            var b = this.findExtraFieldUnicodeComment();
                            null !== b && (this.fileComment = b);
                        }
                    }, findExtraFieldUnicodePath: function () {
                        var a = this.extraFields[28789];
                        if (a) {
                            var b = new d(a.value);
                            return 1 !== b.readInt(1) ? null : g.crc32(this.fileName) !== b.readInt(4) ? null : g.utf8decode(b.readString(a.length - 5));
                        }
                        return null;
                    }, findExtraFieldUnicodeComment: function () {
                        var a = this.extraFields[25461];
                        if (a) {
                            var b = new d(a.value);
                            return 1 !== b.readInt(1) ? null : g.crc32(this.fileComment) !== b.readInt(4) ? null : g.utf8decode(b.readString(a.length - 5));
                        }
                        return null;
                    } }, b.exports = c;
            }, { "./compressedObject": 2, "./object": 13, "./stringReader": 15, "./utils": 21 }], 24: [function (a, b) {
                "use strict";
                var c = a("./lib/utils/common").assign, d = a("./lib/deflate"), e = a("./lib/inflate"), f = a("./lib/zlib/constants"), g = {};
                c(g, d, e, f), b.exports = g;
            }, { "./lib/deflate": 25, "./lib/inflate": 26, "./lib/utils/common": 27, "./lib/zlib/constants": 30 }], 25: [function (a, b, c) {
                "use strict";
                function d(a, b) {
                    var c = new s(b);
                    if (c.push(a, !0), c.err)
                        throw c.msg;
                    return c.result;
                }
                function e(a, b) { return b = b || {}, b.raw = !0, d(a, b); }
                function f(a, b) { return b = b || {}, b.gzip = !0, d(a, b); }
                var g = a("./zlib/deflate.js"), h = a("./utils/common"), i = a("./utils/strings"), j = a("./zlib/messages"), k = a("./zlib/zstream"), l = 0, m = 4, n = 0, o = 1, p = -1, q = 0, r = 8, s = function (a) {
                    this.options = h.assign({ level: p, method: r, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: q, to: "" }, a || {});
                    var b = this.options;
                    b.raw && b.windowBits > 0 ? b.windowBits = -b.windowBits : b.gzip && b.windowBits > 0 && b.windowBits < 16 && (b.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new k, this.strm.avail_out = 0;
                    var c = g.deflateInit2(this.strm, b.level, b.method, b.windowBits, b.memLevel, b.strategy);
                    if (c !== n)
                        throw new Error(j[c]);
                    b.header && g.deflateSetHeader(this.strm, b.header);
                };
                s.prototype.push = function (a, b) {
                    var c, d, e = this.strm, f = this.options.chunkSize;
                    if (this.ended)
                        return !1;
                    d = b === ~~b ? b : b === !0 ? m : l, e.input = "string" == typeof a ? i.string2buf(a) : a, e.next_in = 0, e.avail_in = e.input.length;
                    do {
                        if (0 === e.avail_out && (e.output = new h.Buf8(f), e.next_out = 0, e.avail_out = f), c = g.deflate(e, d), c !== o && c !== n)
                            return this.onEnd(c), this.ended = !0, !1;
                        (0 === e.avail_out || 0 === e.avail_in && d === m) && this.onData("string" === this.options.to ? i.buf2binstring(h.shrinkBuf(e.output, e.next_out)) : h.shrinkBuf(e.output, e.next_out));
                    } while ((e.avail_in > 0 || 0 === e.avail_out) && c !== o);
                    return d === m ? (c = g.deflateEnd(this.strm), this.onEnd(c), this.ended = !0, c === n) : !0;
                }, s.prototype.onData = function (a) { this.chunks.push(a); }, s.prototype.onEnd = function (a) { a === n && (this.result = "string" === this.options.to ? this.chunks.join("") : h.flattenChunks(this.chunks)), this.chunks = [], this.err = a, this.msg = this.strm.msg; }, c.Deflate = s, c.deflate = d, c.deflateRaw = e, c.gzip = f;
            }, { "./utils/common": 27, "./utils/strings": 28, "./zlib/deflate.js": 32, "./zlib/messages": 37, "./zlib/zstream": 39 }], 26: [function (a, b, c) {
                "use strict";
                function d(a, b) {
                    var c = new m(b);
                    if (c.push(a, !0), c.err)
                        throw c.msg;
                    return c.result;
                }
                function e(a, b) { return b = b || {}, b.raw = !0, d(a, b); }
                var f = a("./zlib/inflate.js"), g = a("./utils/common"), h = a("./utils/strings"), i = a("./zlib/constants"), j = a("./zlib/messages"), k = a("./zlib/zstream"), l = a("./zlib/gzheader"), m = function (a) {
                    this.options = g.assign({ chunkSize: 16384, windowBits: 0, to: "" }, a || {});
                    var b = this.options;
                    b.raw && b.windowBits >= 0 && b.windowBits < 16 && (b.windowBits = -b.windowBits, 0 === b.windowBits && (b.windowBits = -15)), !(b.windowBits >= 0 && b.windowBits < 16) || a && a.windowBits || (b.windowBits += 32), b.windowBits > 15 && b.windowBits < 48 && 0 === (15 & b.windowBits) && (b.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new k, this.strm.avail_out = 0;
                    var c = f.inflateInit2(this.strm, b.windowBits);
                    if (c !== i.Z_OK)
                        throw new Error(j[c]);
                    this.header = new l, f.inflateGetHeader(this.strm, this.header);
                };
                m.prototype.push = function (a, b) {
                    var c, d, e, j, k, l = this.strm, m = this.options.chunkSize;
                    if (this.ended)
                        return !1;
                    d = b === ~~b ? b : b === !0 ? i.Z_FINISH : i.Z_NO_FLUSH, l.input = "string" == typeof a ? h.binstring2buf(a) : a, l.next_in = 0, l.avail_in = l.input.length;
                    do {
                        if (0 === l.avail_out && (l.output = new g.Buf8(m), l.next_out = 0, l.avail_out = m), c = f.inflate(l, i.Z_NO_FLUSH), c !== i.Z_STREAM_END && c !== i.Z_OK)
                            return this.onEnd(c), this.ended = !0, !1;
                        l.next_out && (0 === l.avail_out || c === i.Z_STREAM_END || 0 === l.avail_in && d === i.Z_FINISH) && ("string" === this.options.to ? (e = h.utf8border(l.output, l.next_out), j = l.next_out - e, k = h.buf2string(l.output, e), l.next_out = j, l.avail_out = m - j, j && g.arraySet(l.output, l.output, e, j, 0), this.onData(k)) : this.onData(g.shrinkBuf(l.output, l.next_out)));
                    } while (l.avail_in > 0 && c !== i.Z_STREAM_END);
                    return c === i.Z_STREAM_END && (d = i.Z_FINISH), d === i.Z_FINISH ? (c = f.inflateEnd(this.strm), this.onEnd(c), this.ended = !0, c === i.Z_OK) : !0;
                }, m.prototype.onData = function (a) { this.chunks.push(a); }, m.prototype.onEnd = function (a) { a === i.Z_OK && (this.result = "string" === this.options.to ? this.chunks.join("") : g.flattenChunks(this.chunks)), this.chunks = [], this.err = a, this.msg = this.strm.msg; }, c.Inflate = m, c.inflate = d, c.inflateRaw = e, c.ungzip = d;
            }, { "./utils/common": 27, "./utils/strings": 28, "./zlib/constants": 30, "./zlib/gzheader": 33, "./zlib/inflate.js": 35, "./zlib/messages": 37, "./zlib/zstream": 39 }], 27: [function (a, b, c) {
                "use strict";
                var d = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
                c.assign = function (a) {
                    for (var b = Array.prototype.slice.call(arguments, 1); b.length;) {
                        var c = b.shift();
                        if (c) {
                            if ("object" != typeof c)
                                throw new TypeError(c + "must be non-object");
                            for (var d in c)
                                c.hasOwnProperty(d) && (a[d] = c[d]);
                        }
                    }
                    return a;
                }, c.shrinkBuf = function (a, b) { return a.length === b ? a : a.subarray ? a.subarray(0, b) : (a.length = b, a); };
                var e = { arraySet: function (a, b, c, d, e) {
                        if (b.subarray && a.subarray)
                            return void a.set(b.subarray(c, c + d), e);
                        for (var f = 0; d > f; f++)
                            a[e + f] = b[c + f];
                    }, flattenChunks: function (a) {
                        var b, c, d, e, f, g;
                        for (d = 0, b = 0, c = a.length; c > b; b++)
                            d += a[b].length;
                        for (g = new Uint8Array(d), e = 0, b = 0, c = a.length; c > b; b++)
                            f = a[b], g.set(f, e), e += f.length;
                        return g;
                    } }, f = { arraySet: function (a, b, c, d, e) {
                        for (var f = 0; d > f; f++)
                            a[e + f] = b[c + f];
                    }, flattenChunks: function (a) { return [].concat.apply([], a); } };
                c.setTyped = function (a) { a ? (c.Buf8 = Uint8Array, c.Buf16 = Uint16Array, c.Buf32 = Int32Array, c.assign(c, e)) : (c.Buf8 = Array, c.Buf16 = Array, c.Buf32 = Array, c.assign(c, f)); }, c.setTyped(d);
            }, {}], 28: [function (a, b, c) {
                "use strict";
                function d(a, b) {
                    if (65537 > b && (a.subarray && g || !a.subarray && f))
                        return String.fromCharCode.apply(null, e.shrinkBuf(a, b));
                    for (var c = "", d = 0; b > d; d++)
                        c += String.fromCharCode(a[d]);
                    return c;
                }
                var e = a("./common"), f = !0, g = !0;
                try {
                    String.fromCharCode.apply(null, [0]);
                }
                catch (h) {
                    f = !1;
                }
                try {
                    String.fromCharCode.apply(null, new Uint8Array(1));
                }
                catch (h) {
                    g = !1;
                }
                for (var i = new e.Buf8(256), j = 0; 256 > j; j++)
                    i[j] = j >= 252 ? 6 : j >= 248 ? 5 : j >= 240 ? 4 : j >= 224 ? 3 : j >= 192 ? 2 : 1;
                i[254] = i[254] = 1, c.string2buf = function (a) {
                    var b, c, d, f, g, h = a.length, i = 0;
                    for (f = 0; h > f; f++)
                        c = a.charCodeAt(f), 55296 === (64512 & c) && h > f + 1 && (d = a.charCodeAt(f + 1), 56320 === (64512 & d) && (c = 65536 + (c - 55296 << 10) + (d - 56320), f++)), i += 128 > c ? 1 : 2048 > c ? 2 : 65536 > c ? 3 : 4;
                    for (b = new e.Buf8(i), g = 0, f = 0; i > g; f++)
                        c = a.charCodeAt(f), 55296 === (64512 & c) && h > f + 1 && (d = a.charCodeAt(f + 1), 56320 === (64512 & d) && (c = 65536 + (c - 55296 << 10) + (d - 56320), f++)), 128 > c ? b[g++] = c : 2048 > c ? (b[g++] = 192 | c >>> 6, b[g++] = 128 | 63 & c) : 65536 > c ? (b[g++] = 224 | c >>> 12, b[g++] = 128 | c >>> 6 & 63, b[g++] = 128 | 63 & c) : (b[g++] = 240 | c >>> 18, b[g++] = 128 | c >>> 12 & 63, b[g++] = 128 | c >>> 6 & 63, b[g++] = 128 | 63 & c);
                    return b;
                }, c.buf2binstring = function (a) { return d(a, a.length); }, c.binstring2buf = function (a) {
                    for (var b = new e.Buf8(a.length), c = 0, d = b.length; d > c; c++)
                        b[c] = a.charCodeAt(c);
                    return b;
                }, c.buf2string = function (a, b) {
                    var c, e, f, g, h = b || a.length, j = new Array(2 * h);
                    for (e = 0, c = 0; h > c;)
                        if (f = a[c++], 128 > f)
                            j[e++] = f;
                        else if (g = i[f], g > 4)
                            j[e++] = 65533, c += g - 1;
                        else {
                            for (f &= 2 === g ? 31 : 3 === g ? 15 : 7; g > 1 && h > c;)
                                f = f << 6 | 63 & a[c++], g--;
                            g > 1 ? j[e++] = 65533 : 65536 > f ? j[e++] = f : (f -= 65536, j[e++] = 55296 | f >> 10 & 1023, j[e++] = 56320 | 1023 & f);
                        }
                    return d(j, e);
                }, c.utf8border = function (a, b) {
                    var c;
                    for (b = b || a.length, b > a.length && (b = a.length), c = b - 1; c >= 0 && 128 === (192 & a[c]);)
                        c--;
                    return 0 > c ? b : 0 === c ? b : c + i[a[c]] > b ? c : b;
                };
            }, { "./common": 27 }], 29: [function (a, b) {
                "use strict";
                function c(a, b, c, d) {
                    for (var e = 65535 & a | 0, f = a >>> 16 & 65535 | 0, g = 0; 0 !== c;) {
                        g = c > 2e3 ? 2e3 : c, c -= g;
                        do
                            e = e + b[d++] | 0, f = f + e | 0;
                        while (--g);
                        e %= 65521, f %= 65521;
                    }
                    return e | f << 16 | 0;
                }
                b.exports = c;
            }, {}], 30: [function (a, b) { b.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 }; }, {}], 31: [function (a, b) {
                "use strict";
                function c() {
                    for (var a, b = [], c = 0; 256 > c; c++) {
                        a = c;
                        for (var d = 0; 8 > d; d++)
                            a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
                        b[c] = a;
                    }
                    return b;
                }
                function d(a, b, c, d) {
                    var f = e, g = d + c;
                    a = -1 ^ a;
                    for (var h = d; g > h; h++)
                        a = a >>> 8 ^ f[255 & (a ^ b[h])];
                    return -1 ^ a;
                }
                var e = c();
                b.exports = d;
            }, {}], 32: [function (a, b, c) {
                "use strict";
                function d(a, b) { return a.msg = G[b], b; }
                function e(a) { return (a << 1) - (a > 4 ? 9 : 0); }
                function f(a) {
                    for (var b = a.length; --b >= 0;)
                        a[b] = 0;
                }
                function g(a) { var b = a.state, c = b.pending; c > a.avail_out && (c = a.avail_out), 0 !== c && (C.arraySet(a.output, b.pending_buf, b.pending_out, c, a.next_out), a.next_out += c, b.pending_out += c, a.total_out += c, a.avail_out -= c, b.pending -= c, 0 === b.pending && (b.pending_out = 0)); }
                function h(a, b) { D._tr_flush_block(a, a.block_start >= 0 ? a.block_start : -1, a.strstart - a.block_start, b), a.block_start = a.strstart, g(a.strm); }
                function i(a, b) { a.pending_buf[a.pending++] = b; }
                function j(a, b) { a.pending_buf[a.pending++] = b >>> 8 & 255, a.pending_buf[a.pending++] = 255 & b; }
                function k(a, b, c, d) { var e = a.avail_in; return e > d && (e = d), 0 === e ? 0 : (a.avail_in -= e, C.arraySet(b, a.input, a.next_in, e, c), 1 === a.state.wrap ? a.adler = E(a.adler, b, e, c) : 2 === a.state.wrap && (a.adler = F(a.adler, b, e, c)), a.next_in += e, a.total_in += e, e); }
                function l(a, b) {
                    var c, d, e = a.max_chain_length, f = a.strstart, g = a.prev_length, h = a.nice_match, i = a.strstart > a.w_size - jb ? a.strstart - (a.w_size - jb) : 0, j = a.window, k = a.w_mask, l = a.prev, m = a.strstart + ib, n = j[f + g - 1], o = j[f + g];
                    a.prev_length >= a.good_match && (e >>= 2), h > a.lookahead && (h = a.lookahead);
                    do
                        if (c = b, j[c + g] === o && j[c + g - 1] === n && j[c] === j[f] && j[++c] === j[f + 1]) {
                            f += 2, c++;
                            do
                                ;
                            while (j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && m > f);
                            if (d = ib - (m - f), f = m - ib, d > g) {
                                if (a.match_start = b, g = d, d >= h)
                                    break;
                                n = j[f + g - 1], o = j[f + g];
                            }
                        }
                    while ((b = l[b & k]) > i && 0 !== --e);
                    return g <= a.lookahead ? g : a.lookahead;
                }
                function m(a) {
                    var b, c, d, e, f, g = a.w_size;
                    do {
                        if (e = a.window_size - a.lookahead - a.strstart, a.strstart >= g + (g - jb)) {
                            C.arraySet(a.window, a.window, g, g, 0), a.match_start -= g, a.strstart -= g, a.block_start -= g, c = a.hash_size, b = c;
                            do
                                d = a.head[--b], a.head[b] = d >= g ? d - g : 0;
                            while (--c);
                            c = g, b = c;
                            do
                                d = a.prev[--b], a.prev[b] = d >= g ? d - g : 0;
                            while (--c);
                            e += g;
                        }
                        if (0 === a.strm.avail_in)
                            break;
                        if (c = k(a.strm, a.window, a.strstart + a.lookahead, e), a.lookahead += c, a.lookahead + a.insert >= hb)
                            for (f = a.strstart - a.insert, a.ins_h = a.window[f], a.ins_h = (a.ins_h << a.hash_shift ^ a.window[f + 1]) & a.hash_mask; a.insert && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[f + hb - 1]) & a.hash_mask, a.prev[f & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = f, f++, a.insert--, !(a.lookahead + a.insert < hb));)
                                ;
                    } while (a.lookahead < jb && 0 !== a.strm.avail_in);
                }
                function n(a, b) {
                    var c = 65535;
                    for (c > a.pending_buf_size - 5 && (c = a.pending_buf_size - 5);;) {
                        if (a.lookahead <= 1) {
                            if (m(a), 0 === a.lookahead && b === H)
                                return sb;
                            if (0 === a.lookahead)
                                break;
                        }
                        a.strstart += a.lookahead, a.lookahead = 0;
                        var d = a.block_start + c;
                        if ((0 === a.strstart || a.strstart >= d) && (a.lookahead = a.strstart - d, a.strstart = d, h(a, !1), 0 === a.strm.avail_out))
                            return sb;
                        if (a.strstart - a.block_start >= a.w_size - jb && (h(a, !1), 0 === a.strm.avail_out))
                            return sb;
                    }
                    return a.insert = 0, b === K ? (h(a, !0), 0 === a.strm.avail_out ? ub : vb) : a.strstart > a.block_start && (h(a, !1), 0 === a.strm.avail_out) ? sb : sb;
                }
                function o(a, b) {
                    for (var c, d;;) {
                        if (a.lookahead < jb) {
                            if (m(a), a.lookahead < jb && b === H)
                                return sb;
                            if (0 === a.lookahead)
                                break;
                        }
                        if (c = 0, a.lookahead >= hb && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + hb - 1]) & a.hash_mask, c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart), 0 !== c && a.strstart - c <= a.w_size - jb && (a.match_length = l(a, c)), a.match_length >= hb)
                            if (d = D._tr_tally(a, a.strstart - a.match_start, a.match_length - hb), a.lookahead -= a.match_length, a.match_length <= a.max_lazy_match && a.lookahead >= hb) {
                                a.match_length--;
                                do
                                    a.strstart++, a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + hb - 1]) & a.hash_mask, c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart;
                                while (0 !== --a.match_length);
                                a.strstart++;
                            }
                            else
                                a.strstart += a.match_length, a.match_length = 0, a.ins_h = a.window[a.strstart], a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + 1]) & a.hash_mask;
                        else
                            d = D._tr_tally(a, 0, a.window[a.strstart]), a.lookahead--, a.strstart++;
                        if (d && (h(a, !1), 0 === a.strm.avail_out))
                            return sb;
                    }
                    return a.insert = a.strstart < hb - 1 ? a.strstart : hb - 1, b === K ? (h(a, !0), 0 === a.strm.avail_out ? ub : vb) : a.last_lit && (h(a, !1), 0 === a.strm.avail_out) ? sb : tb;
                }
                function p(a, b) {
                    for (var c, d, e;;) {
                        if (a.lookahead < jb) {
                            if (m(a), a.lookahead < jb && b === H)
                                return sb;
                            if (0 === a.lookahead)
                                break;
                        }
                        if (c = 0, a.lookahead >= hb && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + hb - 1]) & a.hash_mask, c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart), a.prev_length = a.match_length, a.prev_match = a.match_start, a.match_length = hb - 1, 0 !== c && a.prev_length < a.max_lazy_match && a.strstart - c <= a.w_size - jb && (a.match_length = l(a, c), a.match_length <= 5 && (a.strategy === S || a.match_length === hb && a.strstart - a.match_start > 4096) && (a.match_length = hb - 1)), a.prev_length >= hb && a.match_length <= a.prev_length) {
                            e = a.strstart + a.lookahead - hb, d = D._tr_tally(a, a.strstart - 1 - a.prev_match, a.prev_length - hb), a.lookahead -= a.prev_length - 1, a.prev_length -= 2;
                            do
                                ++a.strstart <= e && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + hb - 1]) & a.hash_mask, c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart);
                            while (0 !== --a.prev_length);
                            if (a.match_available = 0, a.match_length = hb - 1, a.strstart++, d && (h(a, !1), 0 === a.strm.avail_out))
                                return sb;
                        }
                        else if (a.match_available) {
                            if (d = D._tr_tally(a, 0, a.window[a.strstart - 1]), d && h(a, !1), a.strstart++, a.lookahead--, 0 === a.strm.avail_out)
                                return sb;
                        }
                        else
                            a.match_available = 1, a.strstart++, a.lookahead--;
                    }
                    return a.match_available && (d = D._tr_tally(a, 0, a.window[a.strstart - 1]), a.match_available = 0), a.insert = a.strstart < hb - 1 ? a.strstart : hb - 1, b === K ? (h(a, !0), 0 === a.strm.avail_out ? ub : vb) : a.last_lit && (h(a, !1), 0 === a.strm.avail_out) ? sb : tb;
                }
                function q(a, b) {
                    for (var c, d, e, f, g = a.window;;) {
                        if (a.lookahead <= ib) {
                            if (m(a), a.lookahead <= ib && b === H)
                                return sb;
                            if (0 === a.lookahead)
                                break;
                        }
                        if (a.match_length = 0, a.lookahead >= hb && a.strstart > 0 && (e = a.strstart - 1, d = g[e], d === g[++e] && d === g[++e] && d === g[++e])) {
                            f = a.strstart + ib;
                            do
                                ;
                            while (d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && f > e);
                            a.match_length = ib - (f - e), a.match_length > a.lookahead && (a.match_length = a.lookahead);
                        }
                        if (a.match_length >= hb ? (c = D._tr_tally(a, 1, a.match_length - hb), a.lookahead -= a.match_length, a.strstart += a.match_length, a.match_length = 0) : (c = D._tr_tally(a, 0, a.window[a.strstart]), a.lookahead--, a.strstart++), c && (h(a, !1), 0 === a.strm.avail_out))
                            return sb;
                    }
                    return a.insert = 0, b === K ? (h(a, !0), 0 === a.strm.avail_out ? ub : vb) : a.last_lit && (h(a, !1), 0 === a.strm.avail_out) ? sb : tb;
                }
                function r(a, b) {
                    for (var c;;) {
                        if (0 === a.lookahead && (m(a), 0 === a.lookahead)) {
                            if (b === H)
                                return sb;
                            break;
                        }
                        if (a.match_length = 0, c = D._tr_tally(a, 0, a.window[a.strstart]), a.lookahead--, a.strstart++, c && (h(a, !1), 0 === a.strm.avail_out))
                            return sb;
                    }
                    return a.insert = 0, b === K ? (h(a, !0), 0 === a.strm.avail_out ? ub : vb) : a.last_lit && (h(a, !1), 0 === a.strm.avail_out) ? sb : tb;
                }
                function s(a) { a.window_size = 2 * a.w_size, f(a.head), a.max_lazy_match = B[a.level].max_lazy, a.good_match = B[a.level].good_length, a.nice_match = B[a.level].nice_length, a.max_chain_length = B[a.level].max_chain, a.strstart = 0, a.block_start = 0, a.lookahead = 0, a.insert = 0, a.match_length = a.prev_length = hb - 1, a.match_available = 0, a.ins_h = 0; }
                function t() { this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = Y, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new C.Buf16(2 * fb), this.dyn_dtree = new C.Buf16(2 * (2 * db + 1)), this.bl_tree = new C.Buf16(2 * (2 * eb + 1)), f(this.dyn_ltree), f(this.dyn_dtree), f(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new C.Buf16(gb + 1), this.heap = new C.Buf16(2 * cb + 1), f(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new C.Buf16(2 * cb + 1), f(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0; }
                function u(a) { var b; return a && a.state ? (a.total_in = a.total_out = 0, a.data_type = X, b = a.state, b.pending = 0, b.pending_out = 0, b.wrap < 0 && (b.wrap = -b.wrap), b.status = b.wrap ? lb : qb, a.adler = 2 === b.wrap ? 0 : 1, b.last_flush = H, D._tr_init(b), M) : d(a, O); }
                function v(a) { var b = u(a); return b === M && s(a.state), b; }
                function w(a, b) { return a && a.state ? 2 !== a.state.wrap ? O : (a.state.gzhead = b, M) : O; }
                function x(a, b, c, e, f, g) {
                    if (!a)
                        return O;
                    var h = 1;
                    if (b === R && (b = 6), 0 > e ? (h = 0, e = -e) : e > 15 && (h = 2, e -= 16), 1 > f || f > Z || c !== Y || 8 > e || e > 15 || 0 > b || b > 9 || 0 > g || g > V)
                        return d(a, O);
                    8 === e && (e = 9);
                    var i = new t;
                    return a.state = i, i.strm = a, i.wrap = h, i.gzhead = null, i.w_bits = e, i.w_size = 1 << i.w_bits, i.w_mask = i.w_size - 1, i.hash_bits = f + 7, i.hash_size = 1 << i.hash_bits, i.hash_mask = i.hash_size - 1, i.hash_shift = ~~((i.hash_bits + hb - 1) / hb), i.window = new C.Buf8(2 * i.w_size), i.head = new C.Buf16(i.hash_size), i.prev = new C.Buf16(i.w_size), i.lit_bufsize = 1 << f + 6, i.pending_buf_size = 4 * i.lit_bufsize, i.pending_buf = new C.Buf8(i.pending_buf_size), i.d_buf = i.lit_bufsize >> 1, i.l_buf = 3 * i.lit_bufsize, i.level = b, i.strategy = g, i.method = c, v(a);
                }
                function y(a, b) { return x(a, b, Y, $, _, W); }
                function z(a, b) {
                    var c, h, k, l;
                    if (!a || !a.state || b > L || 0 > b)
                        return a ? d(a, O) : O;
                    if (h = a.state, !a.output || !a.input && 0 !== a.avail_in || h.status === rb && b !== K)
                        return d(a, 0 === a.avail_out ? Q : O);
                    if (h.strm = a, c = h.last_flush, h.last_flush = b, h.status === lb)
                        if (2 === h.wrap)
                            a.adler = 0, i(h, 31), i(h, 139), i(h, 8), h.gzhead ? (i(h, (h.gzhead.text ? 1 : 0) + (h.gzhead.hcrc ? 2 : 0) + (h.gzhead.extra ? 4 : 0) + (h.gzhead.name ? 8 : 0) + (h.gzhead.comment ? 16 : 0)), i(h, 255 & h.gzhead.time), i(h, h.gzhead.time >> 8 & 255), i(h, h.gzhead.time >> 16 & 255), i(h, h.gzhead.time >> 24 & 255), i(h, 9 === h.level ? 2 : h.strategy >= T || h.level < 2 ? 4 : 0), i(h, 255 & h.gzhead.os), h.gzhead.extra && h.gzhead.extra.length && (i(h, 255 & h.gzhead.extra.length), i(h, h.gzhead.extra.length >> 8 & 255)), h.gzhead.hcrc && (a.adler = F(a.adler, h.pending_buf, h.pending, 0)), h.gzindex = 0, h.status = mb) : (i(h, 0), i(h, 0), i(h, 0), i(h, 0), i(h, 0), i(h, 9 === h.level ? 2 : h.strategy >= T || h.level < 2 ? 4 : 0), i(h, wb), h.status = qb);
                        else {
                            var m = Y + (h.w_bits - 8 << 4) << 8, n = -1;
                            n = h.strategy >= T || h.level < 2 ? 0 : h.level < 6 ? 1 : 6 === h.level ? 2 : 3, m |= n << 6, 0 !== h.strstart && (m |= kb), m += 31 - m % 31, h.status = qb, j(h, m), 0 !== h.strstart && (j(h, a.adler >>> 16), j(h, 65535 & a.adler)), a.adler = 1;
                        }
                    if (h.status === mb)
                        if (h.gzhead.extra) {
                            for (k = h.pending; h.gzindex < (65535 & h.gzhead.extra.length) && (h.pending !== h.pending_buf_size || (h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), g(a), k = h.pending, h.pending !== h.pending_buf_size));)
                                i(h, 255 & h.gzhead.extra[h.gzindex]), h.gzindex++;
                            h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), h.gzindex === h.gzhead.extra.length && (h.gzindex = 0, h.status = nb);
                        }
                        else
                            h.status = nb;
                    if (h.status === nb)
                        if (h.gzhead.name) {
                            k = h.pending;
                            do {
                                if (h.pending === h.pending_buf_size && (h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), g(a), k = h.pending, h.pending === h.pending_buf_size)) {
                                    l = 1;
                                    break;
                                }
                                l = h.gzindex < h.gzhead.name.length ? 255 & h.gzhead.name.charCodeAt(h.gzindex++) : 0, i(h, l);
                            } while (0 !== l);
                            h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), 0 === l && (h.gzindex = 0, h.status = ob);
                        }
                        else
                            h.status = ob;
                    if (h.status === ob)
                        if (h.gzhead.comment) {
                            k = h.pending;
                            do {
                                if (h.pending === h.pending_buf_size && (h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), g(a), k = h.pending, h.pending === h.pending_buf_size)) {
                                    l = 1;
                                    break;
                                }
                                l = h.gzindex < h.gzhead.comment.length ? 255 & h.gzhead.comment.charCodeAt(h.gzindex++) : 0, i(h, l);
                            } while (0 !== l);
                            h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), 0 === l && (h.status = pb);
                        }
                        else
                            h.status = pb;
                    if (h.status === pb && (h.gzhead.hcrc ? (h.pending + 2 > h.pending_buf_size && g(a), h.pending + 2 <= h.pending_buf_size && (i(h, 255 & a.adler), i(h, a.adler >> 8 & 255), a.adler = 0, h.status = qb)) : h.status = qb), 0 !== h.pending) {
                        if (g(a), 0 === a.avail_out)
                            return h.last_flush = -1, M;
                    }
                    else if (0 === a.avail_in && e(b) <= e(c) && b !== K)
                        return d(a, Q);
                    if (h.status === rb && 0 !== a.avail_in)
                        return d(a, Q);
                    if (0 !== a.avail_in || 0 !== h.lookahead || b !== H && h.status !== rb) {
                        var o = h.strategy === T ? r(h, b) : h.strategy === U ? q(h, b) : B[h.level].func(h, b);
                        if ((o === ub || o === vb) && (h.status = rb), o === sb || o === ub)
                            return 0 === a.avail_out && (h.last_flush = -1), M;
                        if (o === tb && (b === I ? D._tr_align(h) : b !== L && (D._tr_stored_block(h, 0, 0, !1), b === J && (f(h.head), 0 === h.lookahead && (h.strstart = 0, h.block_start = 0, h.insert = 0))), g(a), 0 === a.avail_out))
                            return h.last_flush = -1, M;
                    }
                    return b !== K ? M : h.wrap <= 0 ? N : (2 === h.wrap ? (i(h, 255 & a.adler), i(h, a.adler >> 8 & 255), i(h, a.adler >> 16 & 255), i(h, a.adler >> 24 & 255), i(h, 255 & a.total_in), i(h, a.total_in >> 8 & 255), i(h, a.total_in >> 16 & 255), i(h, a.total_in >> 24 & 255)) : (j(h, a.adler >>> 16), j(h, 65535 & a.adler)), g(a), h.wrap > 0 && (h.wrap = -h.wrap), 0 !== h.pending ? M : N);
                }
                function A(a) { var b; return a && a.state ? (b = a.state.status, b !== lb && b !== mb && b !== nb && b !== ob && b !== pb && b !== qb && b !== rb ? d(a, O) : (a.state = null, b === qb ? d(a, P) : M)) : O; }
                var B, C = a("../utils/common"), D = a("./trees"), E = a("./adler32"), F = a("./crc32"), G = a("./messages"), H = 0, I = 1, J = 3, K = 4, L = 5, M = 0, N = 1, O = -2, P = -3, Q = -5, R = -1, S = 1, T = 2, U = 3, V = 4, W = 0, X = 2, Y = 8, Z = 9, $ = 15, _ = 8, ab = 29, bb = 256, cb = bb + 1 + ab, db = 30, eb = 19, fb = 2 * cb + 1, gb = 15, hb = 3, ib = 258, jb = ib + hb + 1, kb = 32, lb = 42, mb = 69, nb = 73, ob = 91, pb = 103, qb = 113, rb = 666, sb = 1, tb = 2, ub = 3, vb = 4, wb = 3, xb = function (a, b, c, d, e) { this.good_length = a, this.max_lazy = b, this.nice_length = c, this.max_chain = d, this.func = e; };
                B = [new xb(0, 0, 0, 0, n), new xb(4, 4, 8, 4, o), new xb(4, 5, 16, 8, o), new xb(4, 6, 32, 32, o), new xb(4, 4, 16, 16, p), new xb(8, 16, 32, 32, p), new xb(8, 16, 128, 128, p), new xb(8, 32, 128, 256, p), new xb(32, 128, 258, 1024, p), new xb(32, 258, 258, 4096, p)], c.deflateInit = y, c.deflateInit2 = x, c.deflateReset = v, c.deflateResetKeep = u, c.deflateSetHeader = w, c.deflate = z, c.deflateEnd = A, c.deflateInfo = "pako deflate (from Nodeca project)";
            }, { "../utils/common": 27, "./adler32": 29, "./crc32": 31, "./messages": 37, "./trees": 38 }], 33: [function (a, b) {
                "use strict";
                function c() { this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1; }
                b.exports = c;
            }, {}], 34: [function (a, b) {
                "use strict";
                var c = 30, d = 12;
                b.exports = function (a, b) {
                    var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C;
                    e = a.state, f = a.next_in, B = a.input, g = f + (a.avail_in - 5), h = a.next_out, C = a.output, i = h - (b - a.avail_out), j = h + (a.avail_out - 257), k = e.dmax, l = e.wsize, m = e.whave, n = e.wnext, o = e.window, p = e.hold, q = e.bits, r = e.lencode, s = e.distcode, t = (1 << e.lenbits) - 1, u = (1 << e.distbits) - 1;
                    a: do {
                        15 > q && (p += B[f++] << q, q += 8, p += B[f++] << q, q += 8), v = r[p & t];
                        b: for (;;) {
                            if (w = v >>> 24, p >>>= w, q -= w, w = v >>> 16 & 255, 0 === w)
                                C[h++] = 65535 & v;
                            else {
                                if (!(16 & w)) {
                                    if (0 === (64 & w)) {
                                        v = r[(65535 & v) + (p & (1 << w) - 1)];
                                        continue b;
                                    }
                                    if (32 & w) {
                                        e.mode = d;
                                        break a;
                                    }
                                    a.msg = "invalid literal/length code", e.mode = c;
                                    break a;
                                }
                                x = 65535 & v, w &= 15, w && (w > q && (p += B[f++] << q, q += 8), x += p & (1 << w) - 1, p >>>= w, q -= w), 15 > q && (p += B[f++] << q, q += 8, p += B[f++] << q, q += 8), v = s[p & u];
                                c: for (;;) {
                                    if (w = v >>> 24, p >>>= w, q -= w, w = v >>> 16 & 255, !(16 & w)) {
                                        if (0 === (64 & w)) {
                                            v = s[(65535 & v) + (p & (1 << w) - 1)];
                                            continue c;
                                        }
                                        a.msg = "invalid distance code", e.mode = c;
                                        break a;
                                    }
                                    if (y = 65535 & v, w &= 15, w > q && (p += B[f++] << q, q += 8, w > q && (p += B[f++] << q, q += 8)), y += p & (1 << w) - 1, y > k) {
                                        a.msg = "invalid distance too far back", e.mode = c;
                                        break a;
                                    }
                                    if (p >>>= w, q -= w, w = h - i, y > w) {
                                        if (w = y - w, w > m && e.sane) {
                                            a.msg = "invalid distance too far back", e.mode = c;
                                            break a;
                                        }
                                        if (z = 0, A = o, 0 === n) {
                                            if (z += l - w, x > w) {
                                                x -= w;
                                                do
                                                    C[h++] = o[z++];
                                                while (--w);
                                                z = h - y, A = C;
                                            }
                                        }
                                        else if (w > n) {
                                            if (z += l + n - w, w -= n, x > w) {
                                                x -= w;
                                                do
                                                    C[h++] = o[z++];
                                                while (--w);
                                                if (z = 0, x > n) {
                                                    w = n, x -= w;
                                                    do
                                                        C[h++] = o[z++];
                                                    while (--w);
                                                    z = h - y, A = C;
                                                }
                                            }
                                        }
                                        else if (z += n - w, x > w) {
                                            x -= w;
                                            do
                                                C[h++] = o[z++];
                                            while (--w);
                                            z = h - y, A = C;
                                        }
                                        for (; x > 2;)
                                            C[h++] = A[z++], C[h++] = A[z++], C[h++] = A[z++], x -= 3;
                                        x && (C[h++] = A[z++], x > 1 && (C[h++] = A[z++]));
                                    }
                                    else {
                                        z = h - y;
                                        do
                                            C[h++] = C[z++], C[h++] = C[z++], C[h++] = C[z++], x -= 3;
                                        while (x > 2);
                                        x && (C[h++] = C[z++], x > 1 && (C[h++] = C[z++]));
                                    }
                                    break;
                                }
                            }
                            break;
                        }
                    } while (g > f && j > h);
                    x = q >> 3, f -= x, q -= x << 3, p &= (1 << q) - 1, a.next_in = f, a.next_out = h, a.avail_in = g > f ? 5 + (g - f) : 5 - (f - g), a.avail_out = j > h ? 257 + (j - h) : 257 - (h - j), e.hold = p, e.bits = q;
                };
            }, {}], 35: [function (a, b, c) {
                "use strict";
                function d(a) { return (a >>> 24 & 255) + (a >>> 8 & 65280) + ((65280 & a) << 8) + ((255 & a) << 24); }
                function e() { this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new r.Buf16(320), this.work = new r.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0; }
                function f(a) { var b; return a && a.state ? (b = a.state, a.total_in = a.total_out = b.total = 0, a.msg = "", b.wrap && (a.adler = 1 & b.wrap), b.mode = K, b.last = 0, b.havedict = 0, b.dmax = 32768, b.head = null, b.hold = 0, b.bits = 0, b.lencode = b.lendyn = new r.Buf32(ob), b.distcode = b.distdyn = new r.Buf32(pb), b.sane = 1, b.back = -1, C) : F; }
                function g(a) { var b; return a && a.state ? (b = a.state, b.wsize = 0, b.whave = 0, b.wnext = 0, f(a)) : F; }
                function h(a, b) { var c, d; return a && a.state ? (d = a.state, 0 > b ? (c = 0, b = -b) : (c = (b >> 4) + 1, 48 > b && (b &= 15)), b && (8 > b || b > 15) ? F : (null !== d.window && d.wbits !== b && (d.window = null), d.wrap = c, d.wbits = b, g(a))) : F; }
                function i(a, b) { var c, d; return a ? (d = new e, a.state = d, d.window = null, c = h(a, b), c !== C && (a.state = null), c) : F; }
                function j(a) { return i(a, rb); }
                function k(a) {
                    if (sb) {
                        var b;
                        for (p = new r.Buf32(512), q = new r.Buf32(32), b = 0; 144 > b;)
                            a.lens[b++] = 8;
                        for (; 256 > b;)
                            a.lens[b++] = 9;
                        for (; 280 > b;)
                            a.lens[b++] = 7;
                        for (; 288 > b;)
                            a.lens[b++] = 8;
                        for (v(x, a.lens, 0, 288, p, 0, a.work, { bits: 9 }), b = 0; 32 > b;)
                            a.lens[b++] = 5;
                        v(y, a.lens, 0, 32, q, 0, a.work, { bits: 5 }), sb = !1;
                    }
                    a.lencode = p, a.lenbits = 9, a.distcode = q, a.distbits = 5;
                }
                function l(a, b, c, d) { var e, f = a.state; return null === f.window && (f.wsize = 1 << f.wbits, f.wnext = 0, f.whave = 0, f.window = new r.Buf8(f.wsize)), d >= f.wsize ? (r.arraySet(f.window, b, c - f.wsize, f.wsize, 0), f.wnext = 0, f.whave = f.wsize) : (e = f.wsize - f.wnext, e > d && (e = d), r.arraySet(f.window, b, c - d, e, f.wnext), d -= e, d ? (r.arraySet(f.window, b, c - d, d, 0), f.wnext = d, f.whave = f.wsize) : (f.wnext += e, f.wnext === f.wsize && (f.wnext = 0), f.whave < f.wsize && (f.whave += e))), 0; }
                function m(a, b) {
                    var c, e, f, g, h, i, j, m, n, o, p, q, ob, pb, qb, rb, sb, tb, ub, vb, wb, xb, yb, zb, Ab = 0, Bb = new r.Buf8(4), Cb = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                    if (!a || !a.state || !a.output || !a.input && 0 !== a.avail_in)
                        return F;
                    c = a.state, c.mode === V && (c.mode = W), h = a.next_out, f = a.output, j = a.avail_out, g = a.next_in, e = a.input, i = a.avail_in, m = c.hold, n = c.bits, o = i, p = j, xb = C;
                    a: for (;;)
                        switch (c.mode) {
                            case K:
                                if (0 === c.wrap) {
                                    c.mode = W;
                                    break;
                                }
                                for (; 16 > n;) {
                                    if (0 === i)
                                        break a;
                                    i--, m += e[g++] << n, n += 8;
                                }
                                if (2 & c.wrap && 35615 === m) {
                                    c.check = 0, Bb[0] = 255 & m, Bb[1] = m >>> 8 & 255, c.check = t(c.check, Bb, 2, 0), m = 0, n = 0, c.mode = L;
                                    break;
                                }
                                if (c.flags = 0, c.head && (c.head.done = !1), !(1 & c.wrap) || (((255 & m) << 8) + (m >> 8)) % 31) {
                                    a.msg = "incorrect header check", c.mode = lb;
                                    break;
                                }
                                if ((15 & m) !== J) {
                                    a.msg = "unknown compression method", c.mode = lb;
                                    break;
                                }
                                if (m >>>= 4, n -= 4, wb = (15 & m) + 8, 0 === c.wbits)
                                    c.wbits = wb;
                                else if (wb > c.wbits) {
                                    a.msg = "invalid window size", c.mode = lb;
                                    break;
                                }
                                c.dmax = 1 << wb, a.adler = c.check = 1, c.mode = 512 & m ? T : V, m = 0, n = 0;
                                break;
                            case L:
                                for (; 16 > n;) {
                                    if (0 === i)
                                        break a;
                                    i--, m += e[g++] << n, n += 8;
                                }
                                if (c.flags = m, (255 & c.flags) !== J) {
                                    a.msg = "unknown compression method", c.mode = lb;
                                    break;
                                }
                                if (57344 & c.flags) {
                                    a.msg = "unknown header flags set", c.mode = lb;
                                    break;
                                }
                                c.head && (c.head.text = m >> 8 & 1), 512 & c.flags && (Bb[0] = 255 & m, Bb[1] = m >>> 8 & 255, c.check = t(c.check, Bb, 2, 0)), m = 0, n = 0, c.mode = M;
                            case M:
                                for (; 32 > n;) {
                                    if (0 === i)
                                        break a;
                                    i--, m += e[g++] << n, n += 8;
                                }
                                c.head && (c.head.time = m), 512 & c.flags && (Bb[0] = 255 & m, Bb[1] = m >>> 8 & 255, Bb[2] = m >>> 16 & 255, Bb[3] = m >>> 24 & 255, c.check = t(c.check, Bb, 4, 0)), m = 0, n = 0, c.mode = N;
                            case N:
                                for (; 16 > n;) {
                                    if (0 === i)
                                        break a;
                                    i--, m += e[g++] << n, n += 8;
                                }
                                c.head && (c.head.xflags = 255 & m, c.head.os = m >> 8), 512 & c.flags && (Bb[0] = 255 & m, Bb[1] = m >>> 8 & 255, c.check = t(c.check, Bb, 2, 0)), m = 0, n = 0, c.mode = O;
                            case O:
                                if (1024 & c.flags) {
                                    for (; 16 > n;) {
                                        if (0 === i)
                                            break a;
                                        i--, m += e[g++] << n, n += 8;
                                    }
                                    c.length = m, c.head && (c.head.extra_len = m), 512 & c.flags && (Bb[0] = 255 & m, Bb[1] = m >>> 8 & 255, c.check = t(c.check, Bb, 2, 0)), m = 0, n = 0;
                                }
                                else
                                    c.head && (c.head.extra = null);
                                c.mode = P;
                            case P:
                                if (1024 & c.flags && (q = c.length, q > i && (q = i), q && (c.head && (wb = c.head.extra_len - c.length, c.head.extra || (c.head.extra = new Array(c.head.extra_len)), r.arraySet(c.head.extra, e, g, q, wb)), 512 & c.flags && (c.check = t(c.check, e, q, g)), i -= q, g += q, c.length -= q), c.length))
                                    break a;
                                c.length = 0, c.mode = Q;
                            case Q:
                                if (2048 & c.flags) {
                                    if (0 === i)
                                        break a;
                                    q = 0;
                                    do
                                        wb = e[g + q++], c.head && wb && c.length < 65536 && (c.head.name += String.fromCharCode(wb));
                                    while (wb && i > q);
                                    if (512 & c.flags && (c.check = t(c.check, e, q, g)), i -= q, g += q, wb)
                                        break a;
                                }
                                else
                                    c.head && (c.head.name = null);
                                c.length = 0, c.mode = R;
                            case R:
                                if (4096 & c.flags) {
                                    if (0 === i)
                                        break a;
                                    q = 0;
                                    do
                                        wb = e[g + q++], c.head && wb && c.length < 65536 && (c.head.comment += String.fromCharCode(wb));
                                    while (wb && i > q);
                                    if (512 & c.flags && (c.check = t(c.check, e, q, g)), i -= q, g += q, wb)
                                        break a;
                                }
                                else
                                    c.head && (c.head.comment = null);
                                c.mode = S;
                            case S:
                                if (512 & c.flags) {
                                    for (; 16 > n;) {
                                        if (0 === i)
                                            break a;
                                        i--, m += e[g++] << n, n += 8;
                                    }
                                    if (m !== (65535 & c.check)) {
                                        a.msg = "header crc mismatch", c.mode = lb;
                                        break;
                                    }
                                    m = 0, n = 0;
                                }
                                c.head && (c.head.hcrc = c.flags >> 9 & 1, c.head.done = !0), a.adler = c.check = 0, c.mode = V;
                                break;
                            case T:
                                for (; 32 > n;) {
                                    if (0 === i)
                                        break a;
                                    i--, m += e[g++] << n, n += 8;
                                }
                                a.adler = c.check = d(m), m = 0, n = 0, c.mode = U;
                            case U:
                                if (0 === c.havedict)
                                    return a.next_out = h, a.avail_out = j, a.next_in = g, a.avail_in = i, c.hold = m, c.bits = n, E;
                                a.adler = c.check = 1, c.mode = V;
                            case V: if (b === A || b === B)
                                break a;
                            case W:
                                if (c.last) {
                                    m >>>= 7 & n, n -= 7 & n, c.mode = ib;
                                    break;
                                }
                                for (; 3 > n;) {
                                    if (0 === i)
                                        break a;
                                    i--, m += e[g++] << n, n += 8;
                                }
                                switch (c.last = 1 & m, m >>>= 1, n -= 1, 3 & m) {
                                    case 0:
                                        c.mode = X;
                                        break;
                                    case 1:
                                        if (k(c), c.mode = bb, b === B) {
                                            m >>>= 2, n -= 2;
                                            break a;
                                        }
                                        break;
                                    case 2:
                                        c.mode = $;
                                        break;
                                    case 3: a.msg = "invalid block type", c.mode = lb;
                                }
                                m >>>= 2, n -= 2;
                                break;
                            case X:
                                for (m >>>= 7 & n, n -= 7 & n; 32 > n;) {
                                    if (0 === i)
                                        break a;
                                    i--, m += e[g++] << n, n += 8;
                                }
                                if ((65535 & m) !== (m >>> 16 ^ 65535)) {
                                    a.msg = "invalid stored block lengths", c.mode = lb;
                                    break;
                                }
                                if (c.length = 65535 & m, m = 0, n = 0, c.mode = Y, b === B)
                                    break a;
                            case Y: c.mode = Z;
                            case Z:
                                if (q = c.length) {
                                    if (q > i && (q = i), q > j && (q = j), 0 === q)
                                        break a;
                                    r.arraySet(f, e, g, q, h), i -= q, g += q, j -= q, h += q, c.length -= q;
                                    break;
                                }
                                c.mode = V;
                                break;
                            case $:
                                for (; 14 > n;) {
                                    if (0 === i)
                                        break a;
                                    i--, m += e[g++] << n, n += 8;
                                }
                                if (c.nlen = (31 & m) + 257, m >>>= 5, n -= 5, c.ndist = (31 & m) + 1, m >>>= 5, n -= 5, c.ncode = (15 & m) + 4, m >>>= 4, n -= 4, c.nlen > 286 || c.ndist > 30) {
                                    a.msg = "too many length or distance symbols", c.mode = lb;
                                    break;
                                }
                                c.have = 0, c.mode = _;
                            case _:
                                for (; c.have < c.ncode;) {
                                    for (; 3 > n;) {
                                        if (0 === i)
                                            break a;
                                        i--, m += e[g++] << n, n += 8;
                                    }
                                    c.lens[Cb[c.have++]] = 7 & m, m >>>= 3, n -= 3;
                                }
                                for (; c.have < 19;)
                                    c.lens[Cb[c.have++]] = 0;
                                if (c.lencode = c.lendyn, c.lenbits = 7, yb = { bits: c.lenbits }, xb = v(w, c.lens, 0, 19, c.lencode, 0, c.work, yb), c.lenbits = yb.bits, xb) {
                                    a.msg = "invalid code lengths set", c.mode = lb;
                                    break;
                                }
                                c.have = 0, c.mode = ab;
                            case ab:
                                for (; c.have < c.nlen + c.ndist;) {
                                    for (; Ab = c.lencode[m & (1 << c.lenbits) - 1], qb = Ab >>> 24, rb = Ab >>> 16 & 255, sb = 65535 & Ab, !(n >= qb);) {
                                        if (0 === i)
                                            break a;
                                        i--, m += e[g++] << n, n += 8;
                                    }
                                    if (16 > sb)
                                        m >>>= qb, n -= qb, c.lens[c.have++] = sb;
                                    else {
                                        if (16 === sb) {
                                            for (zb = qb + 2; zb > n;) {
                                                if (0 === i)
                                                    break a;
                                                i--, m += e[g++] << n, n += 8;
                                            }
                                            if (m >>>= qb, n -= qb, 0 === c.have) {
                                                a.msg = "invalid bit length repeat", c.mode = lb;
                                                break;
                                            }
                                            wb = c.lens[c.have - 1], q = 3 + (3 & m), m >>>= 2, n -= 2;
                                        }
                                        else if (17 === sb) {
                                            for (zb = qb + 3; zb > n;) {
                                                if (0 === i)
                                                    break a;
                                                i--, m += e[g++] << n, n += 8;
                                            }
                                            m >>>= qb, n -= qb, wb = 0, q = 3 + (7 & m), m >>>= 3, n -= 3;
                                        }
                                        else {
                                            for (zb = qb + 7; zb > n;) {
                                                if (0 === i)
                                                    break a;
                                                i--, m += e[g++] << n, n += 8;
                                            }
                                            m >>>= qb, n -= qb, wb = 0, q = 11 + (127 & m), m >>>= 7, n -= 7;
                                        }
                                        if (c.have + q > c.nlen + c.ndist) {
                                            a.msg = "invalid bit length repeat", c.mode = lb;
                                            break;
                                        }
                                        for (; q--;)
                                            c.lens[c.have++] = wb;
                                    }
                                }
                                if (c.mode === lb)
                                    break;
                                if (0 === c.lens[256]) {
                                    a.msg = "invalid code -- missing end-of-block", c.mode = lb;
                                    break;
                                }
                                if (c.lenbits = 9, yb = { bits: c.lenbits }, xb = v(x, c.lens, 0, c.nlen, c.lencode, 0, c.work, yb), c.lenbits = yb.bits, xb) {
                                    a.msg = "invalid literal/lengths set", c.mode = lb;
                                    break;
                                }
                                if (c.distbits = 6, c.distcode = c.distdyn, yb = { bits: c.distbits }, xb = v(y, c.lens, c.nlen, c.ndist, c.distcode, 0, c.work, yb), c.distbits = yb.bits, xb) {
                                    a.msg = "invalid distances set", c.mode = lb;
                                    break;
                                }
                                if (c.mode = bb, b === B)
                                    break a;
                            case bb: c.mode = cb;
                            case cb:
                                if (i >= 6 && j >= 258) {
                                    a.next_out = h, a.avail_out = j, a.next_in = g, a.avail_in = i, c.hold = m, c.bits = n, u(a, p), h = a.next_out, f = a.output, j = a.avail_out, g = a.next_in, e = a.input, i = a.avail_in, m = c.hold, n = c.bits, c.mode === V && (c.back = -1);
                                    break;
                                }
                                for (c.back = 0; Ab = c.lencode[m & (1 << c.lenbits) - 1], qb = Ab >>> 24, rb = Ab >>> 16 & 255, sb = 65535 & Ab, !(n >= qb);) {
                                    if (0 === i)
                                        break a;
                                    i--, m += e[g++] << n, n += 8;
                                }
                                if (rb && 0 === (240 & rb)) {
                                    for (tb = qb, ub = rb, vb = sb; Ab = c.lencode[vb + ((m & (1 << tb + ub) - 1) >> tb)], qb = Ab >>> 24, rb = Ab >>> 16 & 255, sb = 65535 & Ab, !(n >= tb + qb);) {
                                        if (0 === i)
                                            break a;
                                        i--, m += e[g++] << n, n += 8;
                                    }
                                    m >>>= tb, n -= tb, c.back += tb;
                                }
                                if (m >>>= qb, n -= qb, c.back += qb, c.length = sb, 0 === rb) {
                                    c.mode = hb;
                                    break;
                                }
                                if (32 & rb) {
                                    c.back = -1, c.mode = V;
                                    break;
                                }
                                if (64 & rb) {
                                    a.msg = "invalid literal/length code", c.mode = lb;
                                    break;
                                }
                                c.extra = 15 & rb, c.mode = db;
                            case db:
                                if (c.extra) {
                                    for (zb = c.extra; zb > n;) {
                                        if (0 === i)
                                            break a;
                                        i--, m += e[g++] << n, n += 8;
                                    }
                                    c.length += m & (1 << c.extra) - 1, m >>>= c.extra, n -= c.extra, c.back += c.extra;
                                }
                                c.was = c.length, c.mode = eb;
                            case eb:
                                for (; Ab = c.distcode[m & (1 << c.distbits) - 1], qb = Ab >>> 24, rb = Ab >>> 16 & 255, sb = 65535 & Ab, !(n >= qb);) {
                                    if (0 === i)
                                        break a;
                                    i--, m += e[g++] << n, n += 8;
                                }
                                if (0 === (240 & rb)) {
                                    for (tb = qb, ub = rb, vb = sb; Ab = c.distcode[vb + ((m & (1 << tb + ub) - 1) >> tb)], qb = Ab >>> 24, rb = Ab >>> 16 & 255, sb = 65535 & Ab, !(n >= tb + qb);) {
                                        if (0 === i)
                                            break a;
                                        i--, m += e[g++] << n, n += 8;
                                    }
                                    m >>>= tb, n -= tb, c.back += tb;
                                }
                                if (m >>>= qb, n -= qb, c.back += qb, 64 & rb) {
                                    a.msg = "invalid distance code", c.mode = lb;
                                    break;
                                }
                                c.offset = sb, c.extra = 15 & rb, c.mode = fb;
                            case fb:
                                if (c.extra) {
                                    for (zb = c.extra; zb > n;) {
                                        if (0 === i)
                                            break a;
                                        i--, m += e[g++] << n, n += 8;
                                    }
                                    c.offset += m & (1 << c.extra) - 1, m >>>= c.extra, n -= c.extra, c.back += c.extra;
                                }
                                if (c.offset > c.dmax) {
                                    a.msg = "invalid distance too far back", c.mode = lb;
                                    break;
                                }
                                c.mode = gb;
                            case gb:
                                if (0 === j)
                                    break a;
                                if (q = p - j, c.offset > q) {
                                    if (q = c.offset - q, q > c.whave && c.sane) {
                                        a.msg = "invalid distance too far back", c.mode = lb;
                                        break;
                                    }
                                    q > c.wnext ? (q -= c.wnext, ob = c.wsize - q) : ob = c.wnext - q, q > c.length && (q = c.length), pb = c.window;
                                }
                                else
                                    pb = f, ob = h - c.offset, q = c.length;
                                q > j && (q = j), j -= q, c.length -= q;
                                do
                                    f[h++] = pb[ob++];
                                while (--q);
                                0 === c.length && (c.mode = cb);
                                break;
                            case hb:
                                if (0 === j)
                                    break a;
                                f[h++] = c.length, j--, c.mode = cb;
                                break;
                            case ib:
                                if (c.wrap) {
                                    for (; 32 > n;) {
                                        if (0 === i)
                                            break a;
                                        i--, m |= e[g++] << n, n += 8;
                                    }
                                    if (p -= j, a.total_out += p, c.total += p, p && (a.adler = c.check = c.flags ? t(c.check, f, p, h - p) : s(c.check, f, p, h - p)), p = j, (c.flags ? m : d(m)) !== c.check) {
                                        a.msg = "incorrect data check", c.mode = lb;
                                        break;
                                    }
                                    m = 0, n = 0;
                                }
                                c.mode = jb;
                            case jb:
                                if (c.wrap && c.flags) {
                                    for (; 32 > n;) {
                                        if (0 === i)
                                            break a;
                                        i--, m += e[g++] << n, n += 8;
                                    }
                                    if (m !== (4294967295 & c.total)) {
                                        a.msg = "incorrect length check", c.mode = lb;
                                        break;
                                    }
                                    m = 0, n = 0;
                                }
                                c.mode = kb;
                            case kb:
                                xb = D;
                                break a;
                            case lb:
                                xb = G;
                                break a;
                            case mb: return H;
                            case nb:
                            default: return F;
                        }
                    return a.next_out = h, a.avail_out = j, a.next_in = g, a.avail_in = i, c.hold = m, c.bits = n, (c.wsize || p !== a.avail_out && c.mode < lb && (c.mode < ib || b !== z)) && l(a, a.output, a.next_out, p - a.avail_out) ? (c.mode = mb, H) : (o -= a.avail_in, p -= a.avail_out, a.total_in += o, a.total_out += p, c.total += p, c.wrap && p && (a.adler = c.check = c.flags ? t(c.check, f, p, a.next_out - p) : s(c.check, f, p, a.next_out - p)), a.data_type = c.bits + (c.last ? 64 : 0) + (c.mode === V ? 128 : 0) + (c.mode === bb || c.mode === Y ? 256 : 0), (0 === o && 0 === p || b === z) && xb === C && (xb = I), xb);
                }
                function n(a) {
                    if (!a || !a.state)
                        return F;
                    var b = a.state;
                    return b.window && (b.window = null), a.state = null, C;
                }
                function o(a, b) { var c; return a && a.state ? (c = a.state, 0 === (2 & c.wrap) ? F : (c.head = b, b.done = !1, C)) : F; }
                var p, q, r = a("../utils/common"), s = a("./adler32"), t = a("./crc32"), u = a("./inffast"), v = a("./inftrees"), w = 0, x = 1, y = 2, z = 4, A = 5, B = 6, C = 0, D = 1, E = 2, F = -2, G = -3, H = -4, I = -5, J = 8, K = 1, L = 2, M = 3, N = 4, O = 5, P = 6, Q = 7, R = 8, S = 9, T = 10, U = 11, V = 12, W = 13, X = 14, Y = 15, Z = 16, $ = 17, _ = 18, ab = 19, bb = 20, cb = 21, db = 22, eb = 23, fb = 24, gb = 25, hb = 26, ib = 27, jb = 28, kb = 29, lb = 30, mb = 31, nb = 32, ob = 852, pb = 592, qb = 15, rb = qb, sb = !0;
                c.inflateReset = g, c.inflateReset2 = h, c.inflateResetKeep = f, c.inflateInit = j, c.inflateInit2 = i, c.inflate = m, c.inflateEnd = n, c.inflateGetHeader = o, c.inflateInfo = "pako inflate (from Nodeca project)";
            }, { "../utils/common": 27, "./adler32": 29, "./crc32": 31, "./inffast": 34, "./inftrees": 36 }], 36: [function (a, b) {
                "use strict";
                var c = a("../utils/common"), d = 15, e = 852, f = 592, g = 0, h = 1, i = 2, j = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], k = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], l = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], m = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
                b.exports = function (a, b, n, o, p, q, r, s) {
                    var t, u, v, w, x, y, z, A, B, C = s.bits, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = null, O = 0, P = new c.Buf16(d + 1), Q = new c.Buf16(d + 1), R = null, S = 0;
                    for (D = 0; d >= D; D++)
                        P[D] = 0;
                    for (E = 0; o > E; E++)
                        P[b[n + E]]++;
                    for (H = C, G = d; G >= 1 && 0 === P[G]; G--)
                        ;
                    if (H > G && (H = G), 0 === G)
                        return p[q++] = 20971520, p[q++] = 20971520, s.bits = 1, 0;
                    for (F = 1; G > F && 0 === P[F]; F++)
                        ;
                    for (F > H && (H = F), K = 1, D = 1; d >= D; D++)
                        if (K <<= 1, K -= P[D], 0 > K)
                            return -1;
                    if (K > 0 && (a === g || 1 !== G))
                        return -1;
                    for (Q[1] = 0, D = 1; d > D; D++)
                        Q[D + 1] = Q[D] + P[D];
                    for (E = 0; o > E; E++)
                        0 !== b[n + E] && (r[Q[b[n + E]]++] = E);
                    if (a === g ? (N = R = r, y = 19) : a === h ? (N = j, O -= 257, R = k, S -= 257, y = 256) : (N = l, R = m, y = -1), M = 0, E = 0, D = F, x = q, I = H, J = 0, v = -1, L = 1 << H, w = L - 1, a === h && L > e || a === i && L > f)
                        return 1;
                    for (var T = 0;;) {
                        T++, z = D - J, r[E] < y ? (A = 0, B = r[E]) : r[E] > y ? (A = R[S + r[E]], B = N[O + r[E]]) : (A = 96, B = 0), t = 1 << D - J, u = 1 << I, F = u;
                        do
                            u -= t, p[x + (M >> J) + u] = z << 24 | A << 16 | B | 0;
                        while (0 !== u);
                        for (t = 1 << D - 1; M & t;)
                            t >>= 1;
                        if (0 !== t ? (M &= t - 1, M += t) : M = 0, E++, 0 === --P[D]) {
                            if (D === G)
                                break;
                            D = b[n + r[E]];
                        }
                        if (D > H && (M & w) !== v) {
                            for (0 === J && (J = H), x += F, I = D - J, K = 1 << I; G > I + J && (K -= P[I + J], !(0 >= K));)
                                I++, K <<= 1;
                            if (L += 1 << I, a === h && L > e || a === i && L > f)
                                return 1;
                            v = M & w, p[v] = H << 24 | I << 16 | x - q | 0;
                        }
                    }
                    return 0 !== M && (p[x + M] = D - J << 24 | 64 << 16 | 0), s.bits = H, 0;
                };
            }, { "../utils/common": 27 }], 37: [function (a, b) {
                "use strict";
                b.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
            }, {}], 38: [function (a, b, c) {
                "use strict";
                function d(a) {
                    for (var b = a.length; --b >= 0;)
                        a[b] = 0;
                }
                function e(a) { return 256 > a ? gb[a] : gb[256 + (a >>> 7)]; }
                function f(a, b) { a.pending_buf[a.pending++] = 255 & b, a.pending_buf[a.pending++] = b >>> 8 & 255; }
                function g(a, b, c) { a.bi_valid > V - c ? (a.bi_buf |= b << a.bi_valid & 65535, f(a, a.bi_buf), a.bi_buf = b >> V - a.bi_valid, a.bi_valid += c - V) : (a.bi_buf |= b << a.bi_valid & 65535, a.bi_valid += c); }
                function h(a, b, c) { g(a, c[2 * b], c[2 * b + 1]); }
                function i(a, b) {
                    var c = 0;
                    do
                        c |= 1 & a, a >>>= 1, c <<= 1;
                    while (--b > 0);
                    return c >>> 1;
                }
                function j(a) { 16 === a.bi_valid ? (f(a, a.bi_buf), a.bi_buf = 0, a.bi_valid = 0) : a.bi_valid >= 8 && (a.pending_buf[a.pending++] = 255 & a.bi_buf, a.bi_buf >>= 8, a.bi_valid -= 8); }
                function k(a, b) {
                    var c, d, e, f, g, h, i = b.dyn_tree, j = b.max_code, k = b.stat_desc.static_tree, l = b.stat_desc.has_stree, m = b.stat_desc.extra_bits, n = b.stat_desc.extra_base, o = b.stat_desc.max_length, p = 0;
                    for (f = 0; U >= f; f++)
                        a.bl_count[f] = 0;
                    for (i[2 * a.heap[a.heap_max] + 1] = 0, c = a.heap_max + 1; T > c; c++)
                        d = a.heap[c], f = i[2 * i[2 * d + 1] + 1] + 1, f > o && (f = o, p++), i[2 * d + 1] = f, d > j || (a.bl_count[f]++, g = 0, d >= n && (g = m[d - n]), h = i[2 * d], a.opt_len += h * (f + g), l && (a.static_len += h * (k[2 * d + 1] + g)));
                    if (0 !== p) {
                        do {
                            for (f = o - 1; 0 === a.bl_count[f];)
                                f--;
                            a.bl_count[f]--, a.bl_count[f + 1] += 2, a.bl_count[o]--, p -= 2;
                        } while (p > 0);
                        for (f = o; 0 !== f; f--)
                            for (d = a.bl_count[f]; 0 !== d;)
                                e = a.heap[--c], e > j || (i[2 * e + 1] !== f && (a.opt_len += (f - i[2 * e + 1]) * i[2 * e], i[2 * e + 1] = f), d--);
                    }
                }
                function l(a, b, c) {
                    var d, e, f = new Array(U + 1), g = 0;
                    for (d = 1; U >= d; d++)
                        f[d] = g = g + c[d - 1] << 1;
                    for (e = 0; b >= e; e++) {
                        var h = a[2 * e + 1];
                        0 !== h && (a[2 * e] = i(f[h]++, h));
                    }
                }
                function m() {
                    var a, b, c, d, e, f = new Array(U + 1);
                    for (c = 0, d = 0; O - 1 > d; d++)
                        for (ib[d] = c, a = 0; a < 1 << _[d]; a++)
                            hb[c++] = d;
                    for (hb[c - 1] = d, e = 0, d = 0; 16 > d; d++)
                        for (jb[d] = e, a = 0; a < 1 << ab[d]; a++)
                            gb[e++] = d;
                    for (e >>= 7; R > d; d++)
                        for (jb[d] = e << 7, a = 0; a < 1 << ab[d] - 7; a++)
                            gb[256 + e++] = d;
                    for (b = 0; U >= b; b++)
                        f[b] = 0;
                    for (a = 0; 143 >= a;)
                        eb[2 * a + 1] = 8, a++, f[8]++;
                    for (; 255 >= a;)
                        eb[2 * a + 1] = 9, a++, f[9]++;
                    for (; 279 >= a;)
                        eb[2 * a + 1] = 7, a++, f[7]++;
                    for (; 287 >= a;)
                        eb[2 * a + 1] = 8, a++, f[8]++;
                    for (l(eb, Q + 1, f), a = 0; R > a; a++)
                        fb[2 * a + 1] = 5, fb[2 * a] = i(a, 5);
                    kb = new nb(eb, _, P + 1, Q, U), lb = new nb(fb, ab, 0, R, U), mb = new nb(new Array(0), bb, 0, S, W);
                }
                function n(a) {
                    var b;
                    for (b = 0; Q > b; b++)
                        a.dyn_ltree[2 * b] = 0;
                    for (b = 0; R > b; b++)
                        a.dyn_dtree[2 * b] = 0;
                    for (b = 0; S > b; b++)
                        a.bl_tree[2 * b] = 0;
                    a.dyn_ltree[2 * X] = 1, a.opt_len = a.static_len = 0, a.last_lit = a.matches = 0;
                }
                function o(a) { a.bi_valid > 8 ? f(a, a.bi_buf) : a.bi_valid > 0 && (a.pending_buf[a.pending++] = a.bi_buf), a.bi_buf = 0, a.bi_valid = 0; }
                function p(a, b, c, d) { o(a), d && (f(a, c), f(a, ~c)), E.arraySet(a.pending_buf, a.window, b, c, a.pending), a.pending += c; }
                function q(a, b, c, d) { var e = 2 * b, f = 2 * c; return a[e] < a[f] || a[e] === a[f] && d[b] <= d[c]; }
                function r(a, b, c) {
                    for (var d = a.heap[c], e = c << 1; e <= a.heap_len && (e < a.heap_len && q(b, a.heap[e + 1], a.heap[e], a.depth) && e++, !q(b, d, a.heap[e], a.depth));)
                        a.heap[c] = a.heap[e], c = e, e <<= 1;
                    a.heap[c] = d;
                }
                function s(a, b, c) {
                    var d, f, i, j, k = 0;
                    if (0 !== a.last_lit)
                        do
                            d = a.pending_buf[a.d_buf + 2 * k] << 8 | a.pending_buf[a.d_buf + 2 * k + 1], f = a.pending_buf[a.l_buf + k], k++, 0 === d ? h(a, f, b) : (i = hb[f], h(a, i + P + 1, b), j = _[i], 0 !== j && (f -= ib[i], g(a, f, j)), d--, i = e(d), h(a, i, c), j = ab[i], 0 !== j && (d -= jb[i], g(a, d, j)));
                        while (k < a.last_lit);
                    h(a, X, b);
                }
                function t(a, b) {
                    var c, d, e, f = b.dyn_tree, g = b.stat_desc.static_tree, h = b.stat_desc.has_stree, i = b.stat_desc.elems, j = -1;
                    for (a.heap_len = 0, a.heap_max = T, c = 0; i > c; c++)
                        0 !== f[2 * c] ? (a.heap[++a.heap_len] = j = c, a.depth[c] = 0) : f[2 * c + 1] = 0;
                    for (; a.heap_len < 2;)
                        e = a.heap[++a.heap_len] = 2 > j ? ++j : 0, f[2 * e] = 1, a.depth[e] = 0, a.opt_len--, h && (a.static_len -= g[2 * e + 1]);
                    for (b.max_code = j, c = a.heap_len >> 1; c >= 1; c--)
                        r(a, f, c);
                    e = i;
                    do
                        c = a.heap[1], a.heap[1] = a.heap[a.heap_len--], r(a, f, 1), d = a.heap[1], a.heap[--a.heap_max] = c, a.heap[--a.heap_max] = d, f[2 * e] = f[2 * c] + f[2 * d], a.depth[e] = (a.depth[c] >= a.depth[d] ? a.depth[c] : a.depth[d]) + 1, f[2 * c + 1] = f[2 * d + 1] = e, a.heap[1] = e++, r(a, f, 1);
                    while (a.heap_len >= 2);
                    a.heap[--a.heap_max] = a.heap[1], k(a, b), l(f, j, a.bl_count);
                }
                function u(a, b, c) {
                    var d, e, f = -1, g = b[1], h = 0, i = 7, j = 4;
                    for (0 === g && (i = 138, j = 3), b[2 * (c + 1) + 1] = 65535, d = 0; c >= d; d++)
                        e = g, g = b[2 * (d + 1) + 1], ++h < i && e === g || (j > h ? a.bl_tree[2 * e] += h : 0 !== e ? (e !== f && a.bl_tree[2 * e]++, a.bl_tree[2 * Y]++) : 10 >= h ? a.bl_tree[2 * Z]++ : a.bl_tree[2 * $]++, h = 0, f = e, 0 === g ? (i = 138, j = 3) : e === g ? (i = 6, j = 3) : (i = 7, j = 4));
                }
                function v(a, b, c) {
                    var d, e, f = -1, i = b[1], j = 0, k = 7, l = 4;
                    for (0 === i && (k = 138, l = 3), d = 0; c >= d; d++)
                        if (e = i, i = b[2 * (d + 1) + 1], !(++j < k && e === i)) {
                            if (l > j) {
                                do
                                    h(a, e, a.bl_tree);
                                while (0 !== --j);
                            }
                            else
                                0 !== e ? (e !== f && (h(a, e, a.bl_tree), j--), h(a, Y, a.bl_tree), g(a, j - 3, 2)) : 10 >= j ? (h(a, Z, a.bl_tree), g(a, j - 3, 3)) : (h(a, $, a.bl_tree), g(a, j - 11, 7));
                            j = 0, f = e, 0 === i ? (k = 138, l = 3) : e === i ? (k = 6, l = 3) : (k = 7, l = 4);
                        }
                }
                function w(a) {
                    var b;
                    for (u(a, a.dyn_ltree, a.l_desc.max_code), u(a, a.dyn_dtree, a.d_desc.max_code), t(a, a.bl_desc), b = S - 1; b >= 3 && 0 === a.bl_tree[2 * cb[b] + 1]; b--)
                        ;
                    return a.opt_len += 3 * (b + 1) + 5 + 5 + 4, b;
                }
                function x(a, b, c, d) {
                    var e;
                    for (g(a, b - 257, 5), g(a, c - 1, 5), g(a, d - 4, 4), e = 0; d > e; e++)
                        g(a, a.bl_tree[2 * cb[e] + 1], 3);
                    v(a, a.dyn_ltree, b - 1), v(a, a.dyn_dtree, c - 1);
                }
                function y(a) {
                    var b, c = 4093624447;
                    for (b = 0; 31 >= b; b++, c >>>= 1)
                        if (1 & c && 0 !== a.dyn_ltree[2 * b])
                            return G;
                    if (0 !== a.dyn_ltree[18] || 0 !== a.dyn_ltree[20] || 0 !== a.dyn_ltree[26])
                        return H;
                    for (b = 32; P > b; b++)
                        if (0 !== a.dyn_ltree[2 * b])
                            return H;
                    return G;
                }
                function z(a) { pb || (m(), pb = !0), a.l_desc = new ob(a.dyn_ltree, kb), a.d_desc = new ob(a.dyn_dtree, lb), a.bl_desc = new ob(a.bl_tree, mb), a.bi_buf = 0, a.bi_valid = 0, n(a); }
                function A(a, b, c, d) { g(a, (J << 1) + (d ? 1 : 0), 3), p(a, b, c, !0); }
                function B(a) { g(a, K << 1, 3), h(a, X, eb), j(a); }
                function C(a, b, c, d) { var e, f, h = 0; a.level > 0 ? (a.strm.data_type === I && (a.strm.data_type = y(a)), t(a, a.l_desc), t(a, a.d_desc), h = w(a), e = a.opt_len + 3 + 7 >>> 3, f = a.static_len + 3 + 7 >>> 3, e >= f && (e = f)) : e = f = c + 5, e >= c + 4 && -1 !== b ? A(a, b, c, d) : a.strategy === F || f === e ? (g(a, (K << 1) + (d ? 1 : 0), 3), s(a, eb, fb)) : (g(a, (L << 1) + (d ? 1 : 0), 3), x(a, a.l_desc.max_code + 1, a.d_desc.max_code + 1, h + 1), s(a, a.dyn_ltree, a.dyn_dtree)), n(a), d && o(a); }
                function D(a, b, c) { return a.pending_buf[a.d_buf + 2 * a.last_lit] = b >>> 8 & 255, a.pending_buf[a.d_buf + 2 * a.last_lit + 1] = 255 & b, a.pending_buf[a.l_buf + a.last_lit] = 255 & c, a.last_lit++, 0 === b ? a.dyn_ltree[2 * c]++ : (a.matches++, b--, a.dyn_ltree[2 * (hb[c] + P + 1)]++, a.dyn_dtree[2 * e(b)]++), a.last_lit === a.lit_bufsize - 1; }
                var E = a("../utils/common"), F = 4, G = 0, H = 1, I = 2, J = 0, K = 1, L = 2, M = 3, N = 258, O = 29, P = 256, Q = P + 1 + O, R = 30, S = 19, T = 2 * Q + 1, U = 15, V = 16, W = 7, X = 256, Y = 16, Z = 17, $ = 18, _ = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], ab = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], bb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], cb = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], db = 512, eb = new Array(2 * (Q + 2));
                d(eb);
                var fb = new Array(2 * R);
                d(fb);
                var gb = new Array(db);
                d(gb);
                var hb = new Array(N - M + 1);
                d(hb);
                var ib = new Array(O);
                d(ib);
                var jb = new Array(R);
                d(jb);
                var kb, lb, mb, nb = function (a, b, c, d, e) { this.static_tree = a, this.extra_bits = b, this.extra_base = c, this.elems = d, this.max_length = e, this.has_stree = a && a.length; }, ob = function (a, b) { this.dyn_tree = a, this.max_code = 0, this.stat_desc = b; }, pb = !1;
                c._tr_init = z, c._tr_stored_block = A, c._tr_flush_block = C, c._tr_tally = D, c._tr_align = B;
            }, { "../utils/common": 27 }], 39: [function (a, b) {
                "use strict";
                function c() { this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0; }
                b.exports = c;
            }, {}] }, {}, [9])(9);
});

var bigInt = (function (undefined) {
    "use strict";
    var BASE = 1e7, LOG_BASE = 7, MAX_INT = 9007199254740992, MAX_INT_ARR = smallToArray(MAX_INT), LOG_MAX_INT = Math.log(MAX_INT);
    function Integer(v, radix) {
        if (typeof v === "undefined")
            return Integer[0];
        if (typeof radix !== "undefined")
            return +radix === 10 ? parseValue(v) : parseBase(v, radix);
        return parseValue(v);
    }
    function BigInteger(value, sign) {
        this.value = value;
        this.sign = sign;
        this.isSmall = false;
    }
    BigInteger.prototype = Object.create(Integer.prototype);
    function SmallInteger(value) {
        this.value = value;
        this.sign = value < 0;
        this.isSmall = true;
    }
    SmallInteger.prototype = Object.create(Integer.prototype);
    function isPrecise(n) {
        return -MAX_INT < n && n < MAX_INT;
    }
    function smallToArray(n) {
        if (n < 1e7)
            return [n];
        if (n < 1e14)
            return [n % 1e7, Math.floor(n / 1e7)];
        return [n % 1e7, Math.floor(n / 1e7) % 1e7, Math.floor(n / 1e14)];
    }
    function arrayToSmall(arr) {
        trim(arr);
        var length = arr.length;
        if (length < 4 && compareAbs(arr, MAX_INT_ARR) < 0) {
            switch (length) {
                case 0: return 0;
                case 1: return arr[0];
                case 2: return arr[0] + arr[1] * BASE;
                default: return arr[0] + (arr[1] + arr[2] * BASE) * BASE;
            }
        }
        return arr;
    }
    function trim(v) {
        var i = v.length;
        while (v[--i] === 0)
            ;
        v.length = i + 1;
    }
    function createArray(length) {
        var x = new Array(length);
        var i = -1;
        while (++i < length) {
            x[i] = 0;
        }
        return x;
    }
    function truncate(n) {
        if (n > 0)
            return Math.floor(n);
        return Math.ceil(n);
    }
    function add(a, b) {
        var l_a = a.length, l_b = b.length, r = new Array(l_a), carry = 0, base = BASE, sum, i;
        for (i = 0; i < l_b; i++) {
            sum = a[i] + b[i] + carry;
            carry = sum >= base ? 1 : 0;
            r[i] = sum - carry * base;
        }
        while (i < l_a) {
            sum = a[i] + carry;
            carry = sum === base ? 1 : 0;
            r[i++] = sum - carry * base;
        }
        if (carry > 0)
            r.push(carry);
        return r;
    }
    function addAny(a, b) {
        if (a.length >= b.length)
            return add(a, b);
        return add(b, a);
    }
    function addSmall(a, carry) {
        var l = a.length, r = new Array(l), base = BASE, sum, i;
        for (i = 0; i < l; i++) {
            sum = a[i] - base + carry;
            carry = Math.floor(sum / base);
            r[i] = sum - carry * base;
            carry += 1;
        }
        while (carry > 0) {
            r[i++] = carry % base;
            carry = Math.floor(carry / base);
        }
        return r;
    }
    BigInteger.prototype.add = function (v) {
        var value, n = parseValue(v);
        if (this.sign !== n.sign) {
            return this.subtract(n.negate());
        }
        var a = this.value, b = n.value;
        if (n.isSmall) {
            return new BigInteger(addSmall(a, Math.abs(b)), this.sign);
        }
        return new BigInteger(addAny(a, b), this.sign);
    };
    BigInteger.prototype.plus = BigInteger.prototype.add;
    SmallInteger.prototype.add = function (v) {
        var n = parseValue(v);
        var a = this.value;
        if (a < 0 !== n.sign) {
            return this.subtract(n.negate());
        }
        var b = n.value;
        if (n.isSmall) {
            if (isPrecise(a + b))
                return new SmallInteger(a + b);
            b = smallToArray(Math.abs(b));
        }
        return new BigInteger(addSmall(b, Math.abs(a)), a < 0);
    };
    SmallInteger.prototype.plus = SmallInteger.prototype.add;
    function subtract(a, b) {
        var a_l = a.length, b_l = b.length, r = new Array(a_l), borrow = 0, base = BASE, i, difference;
        for (i = 0; i < b_l; i++) {
            difference = a[i] - borrow - b[i];
            if (difference < 0) {
                difference += base;
                borrow = 1;
            }
            else
                borrow = 0;
            r[i] = difference;
        }
        for (i = b_l; i < a_l; i++) {
            difference = a[i] - borrow;
            if (difference < 0)
                difference += base;
            else {
                r[i++] = difference;
                break;
            }
            r[i] = difference;
        }
        for (; i < a_l; i++) {
            r[i] = a[i];
        }
        trim(r);
        return r;
    }
    function subtractAny(a, b, sign) {
        var value, isSmall;
        if (compareAbs(a, b) >= 0) {
            value = subtract(a, b);
        }
        else {
            value = subtract(b, a);
            sign = !sign;
        }
        value = arrayToSmall(value);
        if (typeof value === "number") {
            if (sign)
                value = -value;
            return new SmallInteger(value);
        }
        return new BigInteger(value, sign);
    }
    function subtractSmall(a, b, sign) {
        var l = a.length, r = new Array(l), carry = -b, base = BASE, i, difference;
        for (i = 0; i < l; i++) {
            difference = a[i] + carry;
            carry = Math.floor(difference / base);
            difference %= base;
            r[i] = difference < 0 ? difference + base : difference;
        }
        r = arrayToSmall(r);
        if (typeof r === "number") {
            if (sign)
                r = -r;
            return new SmallInteger(r);
        }
        return new BigInteger(r, sign);
    }
    BigInteger.prototype.subtract = function (v) {
        var n = parseValue(v);
        if (this.sign !== n.sign) {
            return this.add(n.negate());
        }
        var a = this.value, b = n.value;
        if (n.isSmall)
            return subtractSmall(a, Math.abs(b), this.sign);
        return subtractAny(a, b, this.sign);
    };
    BigInteger.prototype.minus = BigInteger.prototype.subtract;
    SmallInteger.prototype.subtract = function (v) {
        var n = parseValue(v);
        var a = this.value;
        if (a < 0 !== n.sign) {
            return this.add(n.negate());
        }
        var b = n.value;
        if (n.isSmall) {
            return new SmallInteger(a - b);
        }
        return subtractSmall(b, Math.abs(a), a >= 0);
    };
    SmallInteger.prototype.minus = SmallInteger.prototype.subtract;
    BigInteger.prototype.negate = function () {
        return new BigInteger(this.value, !this.sign);
    };
    SmallInteger.prototype.negate = function () {
        var sign = this.sign;
        var small = new SmallInteger(-this.value);
        small.sign = !sign;
        return small;
    };
    BigInteger.prototype.abs = function () {
        return new BigInteger(this.value, false);
    };
    SmallInteger.prototype.abs = function () {
        return new SmallInteger(Math.abs(this.value));
    };
    function multiplyLong(a, b) {
        var a_l = a.length, b_l = b.length, l = a_l + b_l, r = createArray(l), base = BASE, product, carry, i, a_i, b_j;
        for (i = 0; i < a_l; ++i) {
            a_i = a[i];
            for (var j = 0; j < b_l; ++j) {
                b_j = b[j];
                product = a_i * b_j + r[i + j];
                carry = Math.floor(product / base);
                r[i + j] = product - carry * base;
                r[i + j + 1] += carry;
            }
        }
        trim(r);
        return r;
    }
    function multiplySmall(a, b) {
        var l = a.length, r = new Array(l), base = BASE, carry = 0, product, i;
        for (i = 0; i < l; i++) {
            product = a[i] * b + carry;
            carry = Math.floor(product / base);
            r[i] = product - carry * base;
        }
        while (carry > 0) {
            r[i++] = carry % base;
            carry = Math.floor(carry / base);
        }
        return r;
    }
    function shiftLeft(x, n) {
        var r = [];
        while (n-- > 0)
            r.push(0);
        return r.concat(x);
    }
    function multiplyKaratsuba(x, y) {
        var n = Math.max(x.length, y.length);
        if (n <= 30)
            return multiplyLong(x, y);
        n = Math.ceil(n / 2);
        var b = x.slice(n), a = x.slice(0, n), d = y.slice(n), c = y.slice(0, n);
        var ac = multiplyKaratsuba(a, c), bd = multiplyKaratsuba(b, d), abcd = multiplyKaratsuba(addAny(a, b), addAny(c, d));
        var product = addAny(addAny(ac, shiftLeft(subtract(subtract(abcd, ac), bd), n)), shiftLeft(bd, 2 * n));
        trim(product);
        return product;
    }
    // The following function is derived from a surface fit of a graph plotting the performance difference
    // between long multiplication and karatsuba multiplication versus the lengths of the two arrays.
    function useKaratsuba(l1, l2) {
        return -0.012 * l1 - 0.012 * l2 + 0.000015 * l1 * l2 > 0;
    }
    BigInteger.prototype.multiply = function (v) {
        var value, n = parseValue(v), a = this.value, b = n.value, sign = this.sign !== n.sign, abs;
        if (n.isSmall) {
            if (b === 0)
                return Integer[0];
            if (b === 1)
                return this;
            if (b === -1)
                return this.negate();
            abs = Math.abs(b);
            if (abs < BASE) {
                return new BigInteger(multiplySmall(a, abs), sign);
            }
            b = smallToArray(abs);
        }
        if (useKaratsuba(a.length, b.length))
            return new BigInteger(multiplyKaratsuba(a, b), sign);
        return new BigInteger(multiplyLong(a, b), sign);
    };
    BigInteger.prototype.times = BigInteger.prototype.multiply;
    function multiplySmallAndArray(a, b, sign) {
        if (a < BASE) {
            return new BigInteger(multiplySmall(b, a), sign);
        }
        return new BigInteger(multiplyLong(b, smallToArray(a)), sign);
    }
    SmallInteger.prototype._multiplyBySmall = function (a) {
        if (isPrecise(a.value * this.value)) {
            return new SmallInteger(a.value * this.value);
        }
        return multiplySmallAndArray(Math.abs(a.value), smallToArray(Math.abs(this.value)), this.sign !== a.sign);
    };
    BigInteger.prototype._multiplyBySmall = function (a) {
        if (a.value === 0)
            return Integer[0];
        if (a.value === 1)
            return this;
        if (a.value === -1)
            return this.negate();
        return multiplySmallAndArray(Math.abs(a.value), this.value, this.sign !== a.sign);
    };
    SmallInteger.prototype.multiply = function (v) {
        return parseValue(v)._multiplyBySmall(this);
    };
    SmallInteger.prototype.times = SmallInteger.prototype.multiply;
    function square(a) {
        var l = a.length, r = createArray(l + l), base = BASE, product, carry, i, a_i, a_j;
        for (i = 0; i < l; i++) {
            a_i = a[i];
            for (var j = 0; j < l; j++) {
                a_j = a[j];
                product = a_i * a_j + r[i + j];
                carry = Math.floor(product / base);
                r[i + j] = product - carry * base;
                r[i + j + 1] += carry;
            }
        }
        trim(r);
        return r;
    }
    BigInteger.prototype.square = function () {
        return new BigInteger(square(this.value), false);
    };
    SmallInteger.prototype.square = function () {
        var value = this.value * this.value;
        if (isPrecise(value))
            return new SmallInteger(value);
        return new BigInteger(square(smallToArray(Math.abs(this.value))), false);
    };
    function divMod1(a, b) {
        var a_l = a.length, b_l = b.length, base = BASE, result = createArray(b.length), divisorMostSignificantDigit = b[b_l - 1], 
        // normalization
        lambda = Math.ceil(base / (2 * divisorMostSignificantDigit)), remainder = multiplySmall(a, lambda), divisor = multiplySmall(b, lambda), quotientDigit, shift, carry, borrow, i, l, q;
        if (remainder.length <= a_l)
            remainder.push(0);
        divisor.push(0);
        divisorMostSignificantDigit = divisor[b_l - 1];
        for (shift = a_l - b_l; shift >= 0; shift--) {
            quotientDigit = base - 1;
            if (remainder[shift + b_l] !== divisorMostSignificantDigit) {
                quotientDigit = Math.floor((remainder[shift + b_l] * base + remainder[shift + b_l - 1]) / divisorMostSignificantDigit);
            }
            // quotientDigit <= base - 1
            carry = 0;
            borrow = 0;
            l = divisor.length;
            for (i = 0; i < l; i++) {
                carry += quotientDigit * divisor[i];
                q = Math.floor(carry / base);
                borrow += remainder[shift + i] - (carry - q * base);
                carry = q;
                if (borrow < 0) {
                    remainder[shift + i] = borrow + base;
                    borrow = -1;
                }
                else {
                    remainder[shift + i] = borrow;
                    borrow = 0;
                }
            }
            while (borrow !== 0) {
                quotientDigit -= 1;
                carry = 0;
                for (i = 0; i < l; i++) {
                    carry += remainder[shift + i] - base + divisor[i];
                    if (carry < 0) {
                        remainder[shift + i] = carry + base;
                        carry = 0;
                    }
                    else {
                        remainder[shift + i] = carry;
                        carry = 1;
                    }
                }
                borrow += carry;
            }
            result[shift] = quotientDigit;
        }
        // denormalization
        remainder = divModSmall(remainder, lambda)[0];
        return [arrayToSmall(result), arrayToSmall(remainder)];
    }
    function divMod2(a, b) {
        // Performs faster than divMod1 on larger input sizes.
        var a_l = a.length, b_l = b.length, result = [], part = [], base = BASE, guess, xlen, highx, highy, check;
        while (a_l) {
            part.unshift(a[--a_l]);
            trim(part);
            if (compareAbs(part, b) < 0) {
                result.push(0);
                continue;
            }
            xlen = part.length;
            highx = part[xlen - 1] * base + part[xlen - 2];
            highy = b[b_l - 1] * base + b[b_l - 2];
            if (xlen > b_l) {
                highx = (highx + 1) * base;
            }
            guess = Math.ceil(highx / highy);
            do {
                check = multiplySmall(b, guess);
                if (compareAbs(check, part) <= 0)
                    break;
                guess--;
            } while (guess);
            result.push(guess);
            part = subtract(part, check);
        }
        result.reverse();
        return [arrayToSmall(result), arrayToSmall(part)];
    }
    function divModSmall(value, lambda) {
        var length = value.length, quotient = createArray(length), base = BASE, i, q, remainder, divisor;
        remainder = 0;
        for (i = length - 1; i >= 0; --i) {
            divisor = remainder * base + value[i];
            q = truncate(divisor / lambda);
            remainder = divisor - q * lambda;
            quotient[i] = q | 0;
        }
        return [quotient, remainder | 0];
    }
    function divModAny(self, v) {
        var value, n = parseValue(v);
        var a = self.value, b = n.value;
        var quotient;
        if (b === 0)
            throw new Error("Cannot divide by zero");
        if (self.isSmall) {
            if (n.isSmall) {
                return [new SmallInteger(truncate(a / b)), new SmallInteger(a % b)];
            }
            return [Integer[0], self];
        }
        if (n.isSmall) {
            if (b === 1)
                return [self, Integer[0]];
            if (b == -1)
                return [self.negate(), Integer[0]];
            var abs = Math.abs(b);
            if (abs < BASE) {
                value = divModSmall(a, abs);
                quotient = arrayToSmall(value[0]);
                var remainder = value[1];
                if (self.sign)
                    remainder = -remainder;
                if (typeof quotient === "number") {
                    if (self.sign !== n.sign)
                        quotient = -quotient;
                    return [new SmallInteger(quotient), new SmallInteger(remainder)];
                }
                return [new BigInteger(quotient, self.sign !== n.sign), new SmallInteger(remainder)];
            }
            b = smallToArray(abs);
        }
        var comparison = compareAbs(a, b);
        if (comparison === -1)
            return [Integer[0], self];
        if (comparison === 0)
            return [Integer[self.sign === n.sign ? 1 : -1], Integer[0]];
        // divMod1 is faster on smaller input sizes
        if (a.length + b.length <= 200)
            value = divMod1(a, b);
        else
            value = divMod2(a, b);
        quotient = value[0];
        var qSign = self.sign !== n.sign, mod = value[1], mSign = self.sign;
        if (typeof quotient === "number") {
            if (qSign)
                quotient = -quotient;
            quotient = new SmallInteger(quotient);
        }
        else
            quotient = new BigInteger(quotient, qSign);
        if (typeof mod === "number") {
            if (mSign)
                mod = -mod;
            mod = new SmallInteger(mod);
        }
        else
            mod = new BigInteger(mod, mSign);
        return [quotient, mod];
    }
    BigInteger.prototype.divmod = function (v) {
        var result = divModAny(this, v);
        return {
            quotient: result[0],
            remainder: result[1]
        };
    };
    SmallInteger.prototype.divmod = BigInteger.prototype.divmod;
    BigInteger.prototype.divide = function (v) {
        return divModAny(this, v)[0];
    };
    SmallInteger.prototype.over = SmallInteger.prototype.divide = BigInteger.prototype.over = BigInteger.prototype.divide;
    BigInteger.prototype.mod = function (v) {
        return divModAny(this, v)[1];
    };
    SmallInteger.prototype.remainder = SmallInteger.prototype.mod = BigInteger.prototype.remainder = BigInteger.prototype.mod;
    BigInteger.prototype.pow = function (v) {
        var n = parseValue(v), a = this.value, b = n.value, value, x, y;
        if (b === 0)
            return Integer[1];
        if (a === 0)
            return Integer[0];
        if (a === 1)
            return Integer[1];
        if (a === -1)
            return n.isEven() ? Integer[1] : Integer[-1];
        if (n.sign) {
            return Integer[0];
        }
        if (!n.isSmall)
            throw new Error("The exponent " + n.toString() + " is too large.");
        if (this.isSmall) {
            if (isPrecise(value = Math.pow(a, b)))
                return new SmallInteger(truncate(value));
        }
        x = this;
        y = Integer[1];
        while (true) {
            if (b & 1 === 1) {
                y = y.times(x);
                --b;
            }
            if (b === 0)
                break;
            b /= 2;
            x = x.square();
        }
        return y;
    };
    SmallInteger.prototype.pow = BigInteger.prototype.pow;
    BigInteger.prototype.modPow = function (exp, mod) {
        exp = parseValue(exp);
        mod = parseValue(mod);
        if (mod.isZero())
            throw new Error("Cannot take modPow with modulus 0");
        var r = Integer[1], base = this.mod(mod);
        while (exp.isPositive()) {
            if (base.isZero())
                return Integer[0];
            if (exp.isOdd())
                r = r.multiply(base).mod(mod);
            exp = exp.divide(2);
            base = base.square().mod(mod);
        }
        return r;
    };
    SmallInteger.prototype.modPow = BigInteger.prototype.modPow;
    function compareAbs(a, b) {
        if (a.length !== b.length) {
            return a.length > b.length ? 1 : -1;
        }
        for (var i = a.length - 1; i >= 0; i--) {
            if (a[i] !== b[i])
                return a[i] > b[i] ? 1 : -1;
        }
        return 0;
    }
    BigInteger.prototype.compareAbs = function (v) {
        var n = parseValue(v), a = this.value, b = n.value;
        if (n.isSmall)
            return 1;
        return compareAbs(a, b);
    };
    SmallInteger.prototype.compareAbs = function (v) {
        var n = parseValue(v), a = Math.abs(this.value), b = n.value;
        if (n.isSmall) {
            b = Math.abs(b);
            return a === b ? 0 : a > b ? 1 : -1;
        }
        return -1;
    };
    BigInteger.prototype.compare = function (v) {
        // See discussion about comparison with Infinity:
        // https://github.com/peterolson/BigInteger.js/issues/61
        if (v === Infinity) {
            return -1;
        }
        if (v === -Infinity) {
            return 1;
        }
        var n = parseValue(v), a = this.value, b = n.value;
        if (this.sign !== n.sign) {
            return n.sign ? 1 : -1;
        }
        if (n.isSmall) {
            return this.sign ? -1 : 1;
        }
        return compareAbs(a, b) * (this.sign ? -1 : 1);
    };
    BigInteger.prototype.compareTo = BigInteger.prototype.compare;
    SmallInteger.prototype.compare = function (v) {
        if (v === Infinity) {
            return -1;
        }
        if (v === -Infinity) {
            return 1;
        }
        var n = parseValue(v), a = this.value, b = n.value;
        if (n.isSmall) {
            return a == b ? 0 : a > b ? 1 : -1;
        }
        if (a < 0 !== n.sign) {
            return a < 0 ? -1 : 1;
        }
        return a < 0 ? 1 : -1;
    };
    SmallInteger.prototype.compareTo = SmallInteger.prototype.compare;
    BigInteger.prototype.equals = function (v) {
        return this.compare(v) === 0;
    };
    SmallInteger.prototype.eq = SmallInteger.prototype.equals = BigInteger.prototype.eq = BigInteger.prototype.equals;
    BigInteger.prototype.notEquals = function (v) {
        return this.compare(v) !== 0;
    };
    SmallInteger.prototype.neq = SmallInteger.prototype.notEquals = BigInteger.prototype.neq = BigInteger.prototype.notEquals;
    BigInteger.prototype.greater = function (v) {
        return this.compare(v) > 0;
    };
    SmallInteger.prototype.gt = SmallInteger.prototype.greater = BigInteger.prototype.gt = BigInteger.prototype.greater;
    BigInteger.prototype.lesser = function (v) {
        return this.compare(v) < 0;
    };
    SmallInteger.prototype.lt = SmallInteger.prototype.lesser = BigInteger.prototype.lt = BigInteger.prototype.lesser;
    BigInteger.prototype.greaterOrEquals = function (v) {
        return this.compare(v) >= 0;
    };
    SmallInteger.prototype.geq = SmallInteger.prototype.greaterOrEquals = BigInteger.prototype.geq = BigInteger.prototype.greaterOrEquals;
    BigInteger.prototype.lesserOrEquals = function (v) {
        return this.compare(v) <= 0;
    };
    SmallInteger.prototype.leq = SmallInteger.prototype.lesserOrEquals = BigInteger.prototype.leq = BigInteger.prototype.lesserOrEquals;
    BigInteger.prototype.isEven = function () {
        return (this.value[0] & 1) === 0;
    };
    SmallInteger.prototype.isEven = function () {
        return (this.value & 1) === 0;
    };
    BigInteger.prototype.isOdd = function () {
        return (this.value[0] & 1) === 1;
    };
    SmallInteger.prototype.isOdd = function () {
        return (this.value & 1) === 1;
    };
    BigInteger.prototype.isPositive = function () {
        return !this.sign;
    };
    SmallInteger.prototype.isPositive = function () {
        return this.value > 0;
    };
    BigInteger.prototype.isNegative = function () {
        return this.sign;
    };
    SmallInteger.prototype.isNegative = function () {
        return this.value < 0;
    };
    BigInteger.prototype.isUnit = function () {
        return false;
    };
    SmallInteger.prototype.isUnit = function () {
        return Math.abs(this.value) === 1;
    };
    BigInteger.prototype.isZero = function () {
        return false;
    };
    SmallInteger.prototype.isZero = function () {
        return this.value === 0;
    };
    BigInteger.prototype.isDivisibleBy = function (v) {
        var n = parseValue(v);
        var value = n.value;
        if (value === 0)
            return false;
        if (value === 1)
            return true;
        if (value === 2)
            return this.isEven();
        return this.mod(n).equals(Integer[0]);
    };
    SmallInteger.prototype.isDivisibleBy = BigInteger.prototype.isDivisibleBy;
    function isBasicPrime(v) {
        var n = v.abs();
        if (n.isUnit())
            return false;
        if (n.equals(2) || n.equals(3) || n.equals(5))
            return true;
        if (n.isEven() || n.isDivisibleBy(3) || n.isDivisibleBy(5))
            return false;
        if (n.lesser(25))
            return true;
        // we don't know if it's prime: let the other functions figure it out
    }
    BigInteger.prototype.isPrime = function () {
        var isPrime = isBasicPrime(this);
        if (isPrime !== undefined)
            return isPrime;
        var n = this.abs(), nPrev = n.prev();
        var a = [2, 3, 5, 7, 11, 13, 17, 19], b = nPrev, d, t, i, x;
        while (b.isEven())
            b = b.divide(2);
        for (i = 0; i < a.length; i++) {
            x = bigInt(a[i]).modPow(b, n);
            if (x.equals(Integer[1]) || x.equals(nPrev))
                continue;
            for (t = true, d = b; t && d.lesser(nPrev); d = d.multiply(2)) {
                x = x.square().mod(n);
                if (x.equals(nPrev))
                    t = false;
            }
            if (t)
                return false;
        }
        return true;
    };
    SmallInteger.prototype.isPrime = BigInteger.prototype.isPrime;
    BigInteger.prototype.isProbablePrime = function (iterations) {
        var isPrime = isBasicPrime(this);
        if (isPrime !== undefined)
            return isPrime;
        var n = this.abs();
        var t = iterations === undefined ? 5 : iterations;
        // use the Fermat primality test
        for (var i = 0; i < t; i++) {
            var a = bigInt.randBetween(2, n.minus(2));
            if (!a.modPow(n.prev(), n).isUnit())
                return false; // definitely composite
        }
        return true; // large chance of being prime
    };
    SmallInteger.prototype.isProbablePrime = BigInteger.prototype.isProbablePrime;
    BigInteger.prototype.modInv = function (n) {
        var t = bigInt.zero, newT = bigInt.one, r = parseValue(n), newR = this.abs(), q, lastT, lastR;
        while (!newR.equals(bigInt.zero)) {
            q = r.divide(newR);
            lastT = t;
            lastR = r;
            t = newT;
            r = newR;
            newT = lastT.subtract(q.multiply(newT));
            newR = lastR.subtract(q.multiply(newR));
        }
        if (!r.equals(1))
            throw new Error(this.toString() + " and " + n.toString() + " are not co-prime");
        if (t.compare(0) === -1) {
            t = t.add(n);
        }
        if (this.isNegative()) {
            return t.negate();
        }
        return t;
    };
    SmallInteger.prototype.modInv = BigInteger.prototype.modInv;
    BigInteger.prototype.next = function () {
        var value = this.value;
        if (this.sign) {
            return subtractSmall(value, 1, this.sign);
        }
        return new BigInteger(addSmall(value, 1), this.sign);
    };
    SmallInteger.prototype.next = function () {
        var value = this.value;
        if (value + 1 < MAX_INT)
            return new SmallInteger(value + 1);
        return new BigInteger(MAX_INT_ARR, false);
    };
    BigInteger.prototype.prev = function () {
        var value = this.value;
        if (this.sign) {
            return new BigInteger(addSmall(value, 1), true);
        }
        return subtractSmall(value, 1, this.sign);
    };
    SmallInteger.prototype.prev = function () {
        var value = this.value;
        if (value - 1 > -MAX_INT)
            return new SmallInteger(value - 1);
        return new BigInteger(MAX_INT_ARR, true);
    };
    var powersOfTwo = [1];
    while (powersOfTwo[powersOfTwo.length - 1] <= BASE)
        powersOfTwo.push(2 * powersOfTwo[powersOfTwo.length - 1]);
    var powers2Length = powersOfTwo.length, highestPower2 = powersOfTwo[powers2Length - 1];
    function shift_isSmall(n) {
        return ((typeof n === "number" || typeof n === "string") && +Math.abs(n) <= BASE) ||
            (n instanceof BigInteger && n.value.length <= 1);
    }
    BigInteger.prototype.shiftLeft = function (n) {
        if (!shift_isSmall(n)) {
            throw new Error(String(n) + " is too large for shifting.");
        }
        n = +n;
        if (n < 0)
            return this.shiftRight(-n);
        var result = this;
        while (n >= powers2Length) {
            result = result.multiply(highestPower2);
            n -= powers2Length - 1;
        }
        return result.multiply(powersOfTwo[n]);
    };
    SmallInteger.prototype.shiftLeft = BigInteger.prototype.shiftLeft;
    BigInteger.prototype.shiftRight = function (n) {
        var remQuo;
        if (!shift_isSmall(n)) {
            throw new Error(String(n) + " is too large for shifting.");
        }
        n = +n;
        if (n < 0)
            return this.shiftLeft(-n);
        var result = this;
        while (n >= powers2Length) {
            if (result.isZero())
                return result;
            remQuo = divModAny(result, highestPower2);
            result = remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
            n -= powers2Length - 1;
        }
        remQuo = divModAny(result, powersOfTwo[n]);
        return remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
    };
    SmallInteger.prototype.shiftRight = BigInteger.prototype.shiftRight;
    function bitwise(x, y, fn) {
        y = parseValue(y);
        var xSign = x.isNegative(), ySign = y.isNegative();
        var xRem = xSign ? x.not() : x, yRem = ySign ? y.not() : y;
        var xBits = [], yBits = [];
        var xStop = false, yStop = false;
        while (!xStop || !yStop) {
            if (xRem.isZero()) {
                xStop = true;
                xBits.push(xSign ? 1 : 0);
            }
            else if (xSign)
                xBits.push(xRem.isEven() ? 1 : 0); // two's complement for negative numbers
            else
                xBits.push(xRem.isEven() ? 0 : 1);
            if (yRem.isZero()) {
                yStop = true;
                yBits.push(ySign ? 1 : 0);
            }
            else if (ySign)
                yBits.push(yRem.isEven() ? 1 : 0);
            else
                yBits.push(yRem.isEven() ? 0 : 1);
            xRem = xRem.over(2);
            yRem = yRem.over(2);
        }
        var result = [];
        for (var i = 0; i < xBits.length; i++)
            result.push(fn(xBits[i], yBits[i]));
        var sum = bigInt(result.pop()).negate().times(bigInt(2).pow(result.length));
        while (result.length) {
            sum = sum.add(bigInt(result.pop()).times(bigInt(2).pow(result.length)));
        }
        return sum;
    }
    BigInteger.prototype.not = function () {
        return this.negate().prev();
    };
    SmallInteger.prototype.not = BigInteger.prototype.not;
    BigInteger.prototype.and = function (n) {
        return bitwise(this, n, function (a, b) { return a & b; });
    };
    SmallInteger.prototype.and = BigInteger.prototype.and;
    BigInteger.prototype.or = function (n) {
        return bitwise(this, n, function (a, b) { return a | b; });
    };
    SmallInteger.prototype.or = BigInteger.prototype.or;
    BigInteger.prototype.xor = function (n) {
        return bitwise(this, n, function (a, b) { return a ^ b; });
    };
    SmallInteger.prototype.xor = BigInteger.prototype.xor;
    var LOBMASK_I = 1 << 30, LOBMASK_BI = (BASE & -BASE) * (BASE & -BASE) | LOBMASK_I;
    function roughLOB(n) {
        // SmallInteger: return Min(lowestOneBit(n), 1 << 30)
        // BigInteger: return Min(lowestOneBit(n), 1 << 14) [BASE=1e7]
        var v = n.value, x = typeof v === "number" ? v | LOBMASK_I : v[0] + v[1] * BASE | LOBMASK_BI;
        return x & -x;
    }
    function max(a, b) {
        a = parseValue(a);
        b = parseValue(b);
        return a.greater(b) ? a : b;
    }
    function min(a, b) {
        a = parseValue(a);
        b = parseValue(b);
        return a.lesser(b) ? a : b;
    }
    function gcd(a, b) {
        a = parseValue(a).abs();
        b = parseValue(b).abs();
        if (a.equals(b))
            return a;
        if (a.isZero())
            return b;
        if (b.isZero())
            return a;
        var c = Integer[1], d, t;
        while (a.isEven() && b.isEven()) {
            d = Math.min(roughLOB(a), roughLOB(b));
            a = a.divide(d);
            b = b.divide(d);
            c = c.multiply(d);
        }
        while (a.isEven()) {
            a = a.divide(roughLOB(a));
        }
        do {
            while (b.isEven()) {
                b = b.divide(roughLOB(b));
            }
            if (a.greater(b)) {
                t = b;
                b = a;
                a = t;
            }
            b = b.subtract(a);
        } while (!b.isZero());
        return c.isUnit() ? a : a.multiply(c);
    }
    function lcm(a, b) {
        a = parseValue(a).abs();
        b = parseValue(b).abs();
        return a.divide(gcd(a, b)).multiply(b);
    }
    function randBetween(a, b) {
        a = parseValue(a);
        b = parseValue(b);
        var low = min(a, b), high = max(a, b);
        var range = high.subtract(low);
        if (range.isSmall)
            return low.add(Math.round(Math.random() * range));
        var length = range.value.length - 1;
        var result = [], restricted = true;
        for (var i = length; i >= 0; i--) {
            var top = restricted ? range.value[i] : BASE;
            var digit = truncate(Math.random() * top);
            result.unshift(digit);
            if (digit < top)
                restricted = false;
        }
        result = arrayToSmall(result);
        return low.add(typeof result === "number" ? new SmallInteger(result) : new BigInteger(result, false));
    }
    var parseBase = function (text, base) {
        var val = Integer[0], pow = Integer[1], length = text.length;
        if (2 <= base && base <= 36) {
            if (length <= LOG_MAX_INT / Math.log(base)) {
                return new SmallInteger(parseInt(text, base));
            }
        }
        base = parseValue(base);
        var digits = [];
        var i;
        var isNegative = text[0] === "-";
        for (i = isNegative ? 1 : 0; i < text.length; i++) {
            var c = text[i].toLowerCase(), charCode = c.charCodeAt(0);
            if (48 <= charCode && charCode <= 57)
                digits.push(parseValue(c));
            else if (97 <= charCode && charCode <= 122)
                digits.push(parseValue(c.charCodeAt(0) - 87));
            else if (c === "<") {
                var start = i;
                do {
                    i++;
                } while (text[i] !== ">");
                digits.push(parseValue(text.slice(start + 1, i)));
            }
            else
                throw new Error(c + " is not a valid character");
        }
        digits.reverse();
        for (i = 0; i < digits.length; i++) {
            val = val.add(digits[i].times(pow));
            pow = pow.times(base);
        }
        return isNegative ? val.negate() : val;
    };
    function stringify(digit) {
        var v = digit.value;
        if (typeof v === "number")
            v = [v];
        if (v.length === 1 && v[0] <= 35) {
            return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(v[0]);
        }
        return "<" + v + ">";
    }
    function toBase(n, base) {
        base = bigInt(base);
        if (base.isZero()) {
            if (n.isZero())
                return "0";
            throw new Error("Cannot convert nonzero numbers to base 0.");
        }
        if (base.equals(-1)) {
            if (n.isZero())
                return "0";
            if (n.isNegative())
                return new Array(1 - n).join("10");
            return "1" + new Array(+n).join("01");
        }
        var minusSign = "";
        if (n.isNegative() && base.isPositive()) {
            minusSign = "-";
            n = n.abs();
        }
        if (base.equals(1)) {
            if (n.isZero())
                return "0";
            return minusSign + new Array(+n + 1).join(1);
        }
        var out = [];
        var left = n, divmod;
        while (left.isNegative() || left.compareAbs(base) >= 0) {
            divmod = left.divmod(base);
            left = divmod.quotient;
            var digit = divmod.remainder;
            if (digit.isNegative()) {
                digit = base.minus(digit).abs();
                left = left.next();
            }
            out.push(stringify(digit));
        }
        out.push(stringify(left));
        return minusSign + out.reverse().join("");
    }
    BigInteger.prototype.toString = function (radix) {
        if (radix === undefined)
            radix = 10;
        if (radix !== 10)
            return toBase(this, radix);
        var v = this.value, l = v.length, str = String(v[--l]), zeros = "0000000", digit;
        while (--l >= 0) {
            digit = String(v[l]);
            str += zeros.slice(digit.length) + digit;
        }
        var sign = this.sign ? "-" : "";
        return sign + str;
    };
    SmallInteger.prototype.toString = function (radix) {
        if (radix === undefined)
            radix = 10;
        if (radix != 10)
            return toBase(this, radix);
        return String(this.value);
    };
    BigInteger.prototype.valueOf = function () {
        return +this.toString();
    };
    BigInteger.prototype.toJSNumber = BigInteger.prototype.valueOf;
    SmallInteger.prototype.valueOf = function () {
        return this.value;
    };
    SmallInteger.prototype.toJSNumber = SmallInteger.prototype.valueOf;
    function parseStringValue(v) {
        if (isPrecise(+v)) {
            var x = +v;
            if (x === truncate(x))
                return new SmallInteger(x);
            throw "Invalid integer: " + v;
        }
        var sign = v[0] === "-";
        if (sign)
            v = v.slice(1);
        var split = v.split(/e/i);
        if (split.length > 2)
            throw new Error("Invalid integer: " + split.join("e"));
        if (split.length === 2) {
            var exp = split[1];
            if (exp[0] === "+")
                exp = exp.slice(1);
            exp = +exp;
            if (exp !== truncate(exp) || !isPrecise(exp))
                throw new Error("Invalid integer: " + exp + " is not a valid exponent.");
            var text = split[0];
            var decimalPlace = text.indexOf(".");
            if (decimalPlace >= 0) {
                exp -= text.length - decimalPlace - 1;
                text = text.slice(0, decimalPlace) + text.slice(decimalPlace + 1);
            }
            if (exp < 0)
                throw new Error("Cannot include negative exponent part for integers");
            text += (new Array(exp + 1)).join("0");
            v = text;
        }
        var isValid = /^([0-9][0-9]*)$/.test(v);
        if (!isValid)
            throw new Error("Invalid integer: " + v);
        var r = [], max = v.length, l = LOG_BASE, min = max - l;
        while (max > 0) {
            r.push(+v.slice(min, max));
            min -= l;
            if (min < 0)
                min = 0;
            max -= l;
        }
        trim(r);
        return new BigInteger(r, sign);
    }
    function parseNumberValue(v) {
        if (isPrecise(v)) {
            if (v !== truncate(v))
                throw new Error(v + " is not an integer.");
            return new SmallInteger(v);
        }
        return parseStringValue(v.toString());
    }
    function parseValue(v) {
        if (typeof v === "number") {
            return parseNumberValue(v);
        }
        if (typeof v === "string") {
            return parseStringValue(v);
        }
        return v;
    }
    // Pre-define numbers in range [-999,999]
    for (var i = 0; i < 1000; i++) {
        Integer[i] = new SmallInteger(i);
        if (i > 0)
            Integer[-i] = new SmallInteger(-i);
    }
    // Backwards compatibility
    Integer.one = Integer[1];
    Integer.zero = Integer[0];
    Integer.minusOne = Integer[-1];
    Integer.max = max;
    Integer.min = min;
    Integer.gcd = gcd;
    Integer.lcm = lcm;
    Integer.isInstance = function (x) { return x instanceof BigInteger || x instanceof SmallInteger; };
    Integer.randBetween = randBetween;
    return Integer;
})();
// Node.js check
if (typeof module !== "undefined" && module.hasOwnProperty("exports")) {
    module.exports = bigInt;
}

/*
 * $Id: base64.js,v 2.15 2014/04/05 12:58:57 dankogai Exp dankogai $
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 */
(function (global) {
    'use strict';
    // existing version for noConflict()
    var _Base64 = global.Base64;
    var version = "2.1.9";
    // if node.js, we use Buffer
    var buffer;
    if (typeof module !== 'undefined' && module.exports) {
        try {
            buffer = require('buffer').Buffer;
        }
        catch (err) { }
    }
    // constants
    var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var b64tab = function (bin) {
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++)
            t[bin.charAt(i)] = i;
        return t;
    }(b64chars);
    var fromCharCode = String.fromCharCode;
    // encoder stuff
    var cb_utob = function (c) {
        if (c.length < 2) {
            var cc = c.charCodeAt(0);
            return cc < 0x80 ? c
                : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
                    + fromCharCode(0x80 | (cc & 0x3f)))
                    : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
                        + fromCharCode(0x80 | ((cc >>> 6) & 0x3f))
                        + fromCharCode(0x80 | (cc & 0x3f)));
        }
        else {
            var cc = 0x10000
                + (c.charCodeAt(0) - 0xD800) * 0x400
                + (c.charCodeAt(1) - 0xDC00);
            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
                + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
                + fromCharCode(0x80 | ((cc >>> 6) & 0x3f))
                + fromCharCode(0x80 | (cc & 0x3f)));
        }
    };
    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var utob = function (u) {
        return u.replace(re_utob, cb_utob);
    };
    var cb_encode = function (ccc) {
        var padlen = [0, 2, 1][ccc.length % 3], ord = ccc.charCodeAt(0) << 16
            | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
            | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)), chars = [
            b64chars.charAt(ord >>> 18),
            b64chars.charAt((ord >>> 12) & 63),
            padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
            padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
        ];
        return chars.join('');
    };
    var btoa = global.btoa ? function (b) {
        return global.btoa(b);
    } : function (b) {
        return b.replace(/[\s\S]{1,3}/g, cb_encode);
    };
    var _encode = buffer ? function (u) {
        return (u.constructor === buffer.constructor ? u : new buffer(u))
            .toString('base64');
    }
        : function (u) { return btoa(utob(u)); };
    var encode = function (u, urisafe) {
        return !urisafe
            ? _encode(String(u))
            : _encode(String(u)).replace(/[+\/]/g, function (m0) {
                return m0 == '+' ? '-' : '_';
            }).replace(/=/g, '');
    };
    var encodeURI = function (u) { return encode(u, true); };
    // decoder stuff
    var re_btou = new RegExp([
        '[\xC0-\xDF][\x80-\xBF]',
        '[\xE0-\xEF][\x80-\xBF]{2}',
        '[\xF0-\xF7][\x80-\xBF]{3}'
    ].join('|'), 'g');
    var cb_btou = function (cccc) {
        switch (cccc.length) {
            case 4:
                var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                    | ((0x3f & cccc.charCodeAt(1)) << 12)
                    | ((0x3f & cccc.charCodeAt(2)) << 6)
                    | (0x3f & cccc.charCodeAt(3)), offset = cp - 0x10000;
                return (fromCharCode((offset >>> 10) + 0xD800)
                    + fromCharCode((offset & 0x3FF) + 0xDC00));
            case 3:
                return fromCharCode(((0x0f & cccc.charCodeAt(0)) << 12)
                    | ((0x3f & cccc.charCodeAt(1)) << 6)
                    | (0x3f & cccc.charCodeAt(2)));
            default:
                return fromCharCode(((0x1f & cccc.charCodeAt(0)) << 6)
                    | (0x3f & cccc.charCodeAt(1)));
        }
    };
    var btou = function (b) {
        return b.replace(re_btou, cb_btou);
    };
    var cb_decode = function (cccc) {
        var len = cccc.length, padlen = len % 4, n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
            | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
            | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0)
            | (len > 3 ? b64tab[cccc.charAt(3)] : 0), chars = [
            fromCharCode(n >>> 16),
            fromCharCode((n >>> 8) & 0xff),
            fromCharCode(n & 0xff)
        ];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join('');
    };
    var atob = global.atob ? function (a) {
        return global.atob(a);
    } : function (a) {
        return a.replace(/[\s\S]{1,4}/g, cb_decode);
    };
    var _decode = buffer ? function (a) {
        return (a.constructor === buffer.constructor
            ? a : new buffer(a, 'base64')).toString();
    }
        : function (a) { return btou(atob(a)); };
    var decode = function (a) {
        return _decode(String(a).replace(/[-_]/g, function (m0) { return m0 == '-' ? '+' : '/'; })
            .replace(/[^A-Za-z0-9\+\/]/g, ''));
    };
    var noConflict = function () {
        var Base64 = global.Base64;
        global.Base64 = _Base64;
        return Base64;
    };
    // export Base64
    global.Base64 = {
        VERSION: version,
        atob: atob,
        btoa: btoa,
        fromBase64: decode,
        toBase64: encode,
        utob: utob,
        encode: encode,
        encodeURI: encodeURI,
        btou: btou,
        decode: decode,
        noConflict: noConflict
    };
    // if ES5 is available, make Base64.extendString() available
    if (typeof Object.defineProperty === 'function') {
        var noEnum = function (v) {
            return { value: v, enumerable: false, writable: true, configurable: true };
        };
        global.Base64.extendString = function () {
            Object.defineProperty(String.prototype, 'fromBase64', noEnum(function () {
                return decode(this);
            }));
            Object.defineProperty(String.prototype, 'toBase64', noEnum(function (urisafe) {
                return encode(this, urisafe);
            }));
            Object.defineProperty(String.prototype, 'toBase64URI', noEnum(function () {
                return encode(this, true);
            }));
        };
    }
    // that's it!
    if (global['Meteor']) {
        Base64 = global.Base64; // for normal export in Meteor.js
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports.Base64 = global.Base64;
    }
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function () { return global.Base64; });
    }
})(typeof self !== 'undefined' ? self
    : typeof window !== 'undefined' ? window
        : typeof global !== 'undefined' ? global
            : this);

var Sproto = {
    createNew: function (binsch) {
        var sproto = {};
        var result = new Object();
        var __session = new Array();
        var enbuffer;
        var SPROTO_TARRAY = 0x80;
        var SPROTO_TINTEGER = 0;
        var SPROTO_TBOOLEAN = 1;
        var SPROTO_TSTRING = 2;
        var SPROTO_TSTRUCT = 3;
        var SIZEOF_LENGTH = 4;
        var SIZEOF_HEADER = 2;
        var SIZEOF_FIELD = 2;
        var ENCODE_DEEPLEVEL = 64;
        var SPROTO_REQUEST = 0;
        var SPROTO_RESPONSE = 1;
        function array_concat(a1, a2) {
            var b = new Array();
            for (var i = 0; i < a1.sz; i++) {
                b[i] = a1.buf[i];
            }
            for (var j = a1.sz; j < a1.sz + a2.sz; j++) {
                b[j] = a2.buf[j - a1.sz];
            }
            return { buf: b, sz: a1.sz + a2.sz };
        }
        function toword(stream) {
            return v = (stream[0] & 0xff) | (stream[1] & 0xff) << 8;
        }
        function todword(stream) {
            return (stream[0] & 0xff) | (stream[1] & 0xff) << 8 | (stream[2] & 0xff) << 16 | (stream[3] & 0xff) << 24;
        }
        function decode_integer(stream, sz) {
            var original = todword(stream);
            if (original < 0 && sz <= SIZEOF_LENGTH) {
                return original;
            }
            var total = new bigInt(0);
            // if (stream[0] == 0) { //添加负数处理
            //     for (var i = 1; i < sz; i++) {
            //         if (stream[i] == 0) {
            //             break;
            //         }
            //         var tmp = new bigInt(stream[i]);
            //         tmp = tmp.shiftLeft((i - 1) * 8);
            //         total = total.add(tmp);
            //     }
            //     total = total.add(-127);
            //     return -parseInt(total.toString(10));
            // }
            // else {
            for (var i = 0; i < sz; i++) {
                // if (stream[i] == 0) {
                //     break;
                // }
                var tmp = new bigInt(stream[i]);
                tmp = tmp.shiftLeft(i * 8);
                total = total.add(tmp);
            }
            return parseInt(total.toString(10));
            // }
        }
        function count_array(stream) {
            var length = todword(stream);
            var n = 0;
            stream = stream.slice(SIZEOF_LENGTH);
            while (length > 0) {
                var nsz;
                if (length < SIZEOF_LENGTH) {
                    return -1;
                }
                nsz = todword(stream);
                nsz += SIZEOF_LENGTH;
                if (nsz > length) {
                    return -1;
                }
                ++n;
                stream = stream.slice(nsz);
                length -= nsz;
            }
            return n;
        }
        function struct_field(stream, sz) {
            var field, fn, header, i;
            if (sz < SIZEOF_LENGTH) {
                return -1;
            }
            fn = toword(stream);
            header = SIZEOF_HEADER + SIZEOF_FIELD * fn;
            if (sz < header) {
                return -1;
            }
            field = stream.slice(SIZEOF_HEADER);
            sz -= header;
            stream = stream.slice(header);
            for (i = 0; i < fn; i++) {
                var value = toword(field.slice(i * SIZEOF_FIELD + SIZEOF_HEADER));
                var dsz;
                if (value != 0) {
                    continue;
                }
                if (sz < SIZEOF_LENGTH) {
                    return -1;
                }
                dsz = todword(stream);
                if (sz < SIZEOF_LENGTH + dsz) {
                    return -1;
                }
                stream = stream.slice(SIZEOF_LENGTH + dsz);
                sz -= SIZEOF_LENGTH + dsz;
            }
            return fn;
        }
        function import_string(stream) {
            var str = "";
            arr = stream.slice(SIZEOF_LENGTH, SIZEOF_LENGTH + todword(stream));
            for (var i = 0; i < arr.length; i++) {
                str += String.fromCharCode(arr[i]);
            }
            return str;
        }
        function import_field(f, stream) {
            var sz, result, fn, i;
            var array = 0;
            var tag = -1;
            f.tag = -1;
            f.type = -1;
            f.name = null;
            f.st = null;
            f.key = -1;
            sz = todword(stream);
            stream = stream.slice(SIZEOF_LENGTH);
            result = stream.slice(sz);
            fn = struct_field(stream, sz);
            if (fn < 0) {
                return null;
            }
            stream = stream.slice(SIZEOF_HEADER);
            for (i = 0; i < fn; i++) {
                var value;
                ++tag;
                value = toword(stream.slice(SIZEOF_FIELD * i));
                if (value & 1 != 0) {
                    tag += Math.floor(value / 2);
                    continue;
                }
                if (tag == 0) {
                    if (value != 0) {
                        return null;
                    }
                    f.name = import_string(stream.slice(fn * SIZEOF_FIELD));
                    continue;
                }
                if (value == 0) {
                    return null;
                }
                value = Math.floor(value / 2) - 1;
                switch (tag) {
                    case 1:
                        if (value >= SPROTO_TSTRUCT) {
                            return null;
                        }
                        f.type = value;
                        break;
                    case 2:
                        if (value >= sproto.type_n) {
                            return null;
                        }
                        if (f.type >= 0) {
                            return null;
                        }
                        f.type = SPROTO_TSTRUCT;
                        f.st = value;
                        break;
                    case 3:
                        f.tag = value;
                        break;
                    case 4:
                        if (value != 0) {
                            array = SPROTO_TARRAY;
                        }
                        break;
                    case 5:
                        f.key = value;
                        break;
                    default:
                        return null;
                }
            }
            if (f.tag < 0 || f.type < 0 || f.name == null) {
                return null;
            }
            f.type |= array;
            return result;
        }
        function import_type(t, stream) {
            var result, i, fn, n, maxn, last;
            var sz = todword(stream);
            stream = stream.slice(SIZEOF_LENGTH);
            result = stream.slice(sz);
            fn = struct_field(stream, sz);
            if (fn <= 0 || fn > 2) {
                return null;
            }
            for (i = 0; i < fn * SIZEOF_FIELD; i += SIZEOF_FIELD) {
                var v = toword(stream.slice(SIZEOF_HEADER + i));
                if (v != 0) {
                    return null;
                }
            }
            stream = stream.slice(SIZEOF_HEADER + fn * SIZEOF_FIELD);
            t.name = import_string(stream);
            if (fn == 1) {
                return result;
            }
            stream = stream.slice(todword(stream) + SIZEOF_LENGTH);
            n = count_array(stream);
            if (n < 0) {
                return null;
            }
            stream = stream.slice(SIZEOF_LENGTH);
            maxn = n;
            last = -1;
            t.n = n;
            t.f = new Array();
            for (i = 0; i < n; i++) {
                var tag;
                t.f[i] = new Object();
                var f = t.f[i];
                stream = import_field(f, stream);
                if (stream == null) {
                    alert("导入字段失败：  " + f.name);
                    return null;
                }
                tag = f.tag;
                if (tag < last) {
                    return null;
                }
                if (tag > last + 1) {
                    ++maxn;
                }
                last = tag;
            }
            t.maxn = maxn;
            t.base = t.f[0].tag;
            n = t.f[n - 1].tag - t.base + 1;
            if (n != t.n) {
                t.base = -1;
            }
            return result;
        }
        function import_protocol(p, stream) {
            var result, sz, fn, i, tag;
            sz = todword(stream);
            stream = stream.slice(SIZEOF_LENGTH);
            result = stream.slice(sz);
            fn = struct_field(stream, sz);
            stream = stream.slice(SIZEOF_HEADER);
            p.name = null;
            p.tag = -1;
            p.p = new Array();
            p.p[SPROTO_REQUEST] = null;
            p.p[SPROTO_RESPONSE] = null;
            tag = 0;
            for (i = 0; i < fn; i++, tag++) {
                var value = toword(stream.slice(SIZEOF_FIELD * i));
                if (value & 1) {
                    tag += (value - 1) / 2;
                    continue;
                }
                value = value / 2 - 1;
                switch (i) {
                    case 0:
                        if (value != -1) {
                            return null;
                        }
                        p.name = import_string(stream.slice(SIZEOF_FIELD * fn));
                        break;
                    case 1:
                        if (value < 0) {
                            return null;
                        }
                        p.tag = value;
                        break;
                    case 2:
                        if (value < 0 || value >= sproto.type_n) {
                            return null;
                        }
                        p.p[SPROTO_REQUEST] = sproto.type[value];
                        break;
                    case 3:
                        if (value < 0 || value >= sproto.type_n) {
                            return null;
                        }
                        p.p[SPROTO_RESPONSE] = sproto.type[value];
                        break;
                    default:
                        return null;
                }
            }
            if (p.name == null || p.tag < 0) {
                return null;
            }
            return result;
        }
        function create_from_bundle(stream, sz) {
            var conetnt, typedata, protocoldata;
            var fn = struct_field(stream, sz);
            var i;
            if (fn < 0) {
                return null;
            }
            stream = stream.slice(SIZEOF_HEADER);
            content = stream.slice(fn * SIZEOF_FIELD);
            for (i = 0; i < fn; i++) {
                var value = toword(stream.slice(i * SIZEOF_FIELD));
                var n;
                if (value != 0) {
                    return null;
                }
                n = count_array(content);
                if (n < 0) {
                    return null;
                }
                if (i == 0) {
                    typedata = content.slice(SIZEOF_LENGTH);
                    sproto.type_n = n;
                    sproto.type = new Array();
                }
                else {
                    protocoldata = content.slice(SIZEOF_LENGTH);
                    sproto.protocol_n = n;
                    sproto.proto = new Array();
                    sproto.s2cProto = new Array();
                    sproto.s2cProtocol_n = 0;
                }
                content = content.slice(todword(content) + SIZEOF_LENGTH);
            }
            for (i = 0; i < sproto.type_n; i++) {
                sproto.type[i] = new Object();
                typedata = import_type(sproto.type[i], typedata);
                if (typedata == null) {
                    return null;
                }
            }
            for (i = 0; i < sproto.protocol_n; i++) {
                sproto.proto[i] = new Object();
                protocoldata = import_protocol(sproto.proto[i], protocoldata);
                if (protocoldata == null) {
                    return null;
                }
            }
            return sproto;
        }
        function decode_array_object(cb, args, stream, sz) {
            var hsz;
            var index = 1;
            while (sz > 0) {
                if (sz < SIZEOF_LENGTH) {
                    return -1;
                }
                hsz = todword(stream);
                stream = stream.slice(SIZEOF_LENGTH);
                sz -= SIZEOF_LENGTH;
                if (hsz > sz) {
                    return -1;
                }
                args.index = index;
                args.value = stream;
                args.length = hsz;
                if (cb(args) != 0) {
                    return -1;
                }
                sz -= hsz;
                stream = stream.slice(hsz);
                ++index;
            }
            return 0;
        }
        function decode_array(cb, args, stream) {
            var sz = todword(stream);
            var type = args.type;
            var i;
            stream = stream.slice(SIZEOF_LENGTH);
            switch (type) {
                case SPROTO_TINTEGER: {
                    var len;
                    if (sz < 1) {
                        return -1;
                    }
                    len = stream[0];
                    stream = stream.slice(1);
                    --sz;
                    if (len <= 8) {
                        if (sz % 4 != 0) {
                            return -1;
                        }
                        for (i = 0; i < Math.floor(sz / len); i++) {
                            var value = decode_integer(stream.slice(i * len), len); //modified
                            // var value = todword(stream.slice(i * 8)); 
                            args.index = i + 1;
                            args.value = value;
                            args.length = 8;
                            cb(args);
                        }
                    }
                    else {
                        alert("only support 7 bytes integer");
                        return -1;
                    }
                    break;
                }
                case SPROTO_TBOOLEAN:
                    for (i = 0; i < sz; i++) {
                        var value = stream[i];
                        args.index = i + 1;
                        args.value = value;
                        args.length = 8;
                        cb(args);
                    }
                    break;
                case SPROTO_TSTRING:
                case SPROTO_TSTRUCT:
                    return decode_array_object(cb, args, stream, sz);
                default:
                    return -1;
            }
            return 0;
        }
        function findtag(st, tag) {
            var begin, end;
            if (st.base >= 0) {
                tag -= st.base;
                if (tag < 0 || tag >= st.n) {
                    return null;
                }
                return st.f[tag];
            }
            begin = 0;
            end = st.n;
            while (begin < end) {
                var mid = (begin + end) / 2;
                mid = parseInt(mid);
                var f = st.f[mid];
                var t = f.tag;
                if (t == tag) {
                    return f;
                }
                if (tag > t) {
                    begin = mid + 1;
                }
                else {
                    end = mid;
                }
            }
            return null;
        }
        function sproto_type(typename) {
            var i;
            for (i = 0; i < sproto.type_n; i++) {
                if (typeof typename == "string") {
                    if (typename == sproto.type[i].name) {
                        return sproto.type[i];
                    }
                }
                if (typeof typename == "object") {
                    if (typename == sproto.type[i]) {
                        return sproto.type[i];
                    }
                }
            }
            return null;
        }
        function sproto_protoquery_name(name) {
            for (var i = 0; i < sproto.protocol_n; i++) {
                if (typeof name == "string") {
                    if (sproto.proto[i].name == name) {
                        return sproto.proto[i];
                    }
                }
                if (typeof name == "object") {
                    if (sproto.proto[i] == name) {
                        return sproto.proto[i];
                    }
                }
            }
            return null;
        }
        function sproto_protoquery(proto, what) {
            if (what < 0 || what > 1) {
                return null;
            }
            var begin, end, p;
            p = null;
            begin = 0;
            end = sproto.s2cProtocol_n;
            while (begin < end) {
                var mid = (begin + end) / 2;
                mid = parseInt(mid); //modified by zmd mid 有可能是0.5
                var t = sproto.s2cProto[mid].tag;
                if (t == proto) {
                    p = sproto.s2cProto[mid];
                }
                if (proto > t) {
                    begin = mid + 1;
                }
                else {
                    end = mid;
                }
                if (p != null) {
                    return p; //modified by zmd 返回的p要用到.p属性，所以需要返回p不是p.p[what]
                }
            }
            return null;
        }
        function sproto_decode(st, data, size, cb, ud) {
            var args = new Object();
            var total = size;
            var stream, datastream, fn, i, tag;
            if (size < SIZEOF_HEADER) {
                return -1;
            }
            stream = data.slice(0);
            fn = toword(stream);
            stream = stream.slice(SIZEOF_HEADER);
            size -= SIZEOF_HEADER;
            if (size < fn * SIZEOF_FIELD) {
                return -1;
            }
            datastream = stream.slice(fn * SIZEOF_FIELD);
            size -= fn * SIZEOF_FIELD;
            args.ud = ud;
            tag = -1;
            for (i = 0; i < fn; i++) {
                var currentdata;
                var f;
                var value = toword(stream.slice(i * SIZEOF_FIELD));
                ++tag;
                if ((value & 1) != 0) {
                    tag += Math.floor(value / 2);
                    continue;
                }
                value = Math.floor(value / 2) - 1;
                currentdata = datastream.slice(0);
                if (value < 0) {
                    var sz;
                    if (size < SIZEOF_LENGTH) {
                        return -1;
                    }
                    sz = todword(datastream);
                    if (size < sz + SIZEOF_LENGTH) {
                        return -1;
                    }
                    datastream = datastream.slice(sz + SIZEOF_LENGTH);
                    size -= sz + SIZEOF_LENGTH;
                }
                f = findtag(st, tag);
                if (f == null) {
                    continue;
                }
                args.tagname = f.name;
                args.tagid = f.tag;
                args.type = f.type & ~SPROTO_TARRAY;
                if (f.st != null) {
                    args.subtype = sproto.type[f.st];
                }
                else {
                    args.subtype = null;
                }
                args.index = 0;
                if (value < 0) {
                    if ((f.type & SPROTO_TARRAY) != 0) {
                        if (decode_array(cb, args, currentdata) != 0) {
                            continue; //modified by zmd 如果是空数组则继续往下解包
                        }
                    }
                    else {
                        switch (f.type) {
                            case SPROTO_TINTEGER: {
                                var sz = todword(currentdata);
                                if (sz <= 8) {
                                    var v = decode_integer(currentdata.slice(SIZEOF_LENGTH), sz); //modified
                                    // var v = todword(currentdata.slice(SIZEOF_LENGTH)); 
                                    args.value = v;
                                    args.length = 4;
                                    cb(args);
                                }
                                else {
                                    alert("only support 56bit integer");
                                    return -1;
                                }
                                break;
                            }
                            case SPROTO_TSTRING:
                            case SPROTO_TSTRUCT: {
                                var sz = todword(currentdata);
                                args.value = currentdata.slice(SIZEOF_LENGTH);
                                args.length = sz;
                                if (cb(args) != 0) {
                                    return -1;
                                }
                                break;
                            }
                            default:
                                return -1;
                        }
                    }
                }
                else if (f.type != SPROTO_TINTEGER && f.type != SPROTO_TBOOLEAN) {
                    return -1;
                }
                else {
                    var v = value;
                    args.value = v;
                    args.length = 8;
                    cb(args);
                }
            }
            return total - size;
        }
        function decode(args) {
            var self = args.ud;
            var value;
            if (self.deep >= ENCODE_DEEPLEVEL) {
                alert("The table is too deep");
            }
            if (args.index > 0) {
                if (args.tagname != self.array_tag) {
                    self.array_tag = args.tagname;
                    self.result[args.tagname] = new Array();
                }
            }
            switch (args.type) {
                case SPROTO_TINTEGER:
                case SPROTO_TBOOLEAN:
                    value = args.value;
                    break;
                case SPROTO_TSTRING:
                    value = "";
                    for (var i = 0; i < args.length; i++) {
                        value += String.fromCharCode(args.value[i]);
                    }
                    value = decodeURIComponent(escape(value)); //modified by zmd 处理中文乱码问题
                    break;
                case SPROTO_TSTRUCT:
                    var sub, r;
                    sub = new Object();
                    sub.deep = self.deep + 1;
                    sub.array_tag = null;
                    sub.result = new Object();
                    r = sproto_decode(args.subtype, args.value, args.length, decode, sub);
                    if (r < 0 || r != args.length) {
                        return r;
                    }
                    value = sub.result;
                    break;
                default:
                    alert("invalid type");
            }
            if (args.index > 0) {
                self.result[args.tagname][args.index - 1] = value; //modified by zmd index -1是因为 index > 0 才是数组
            }
            else {
                self.result[args.tagname] = value;
            }
            return 0;
        }
        function sproto_encode(type, buffer_idx, cb, ud) {
            var args = new Object();
            var header_idx = buffer_idx;
            var data_idx = buffer_idx;
            var st = type;
            var header_sz = SIZEOF_HEADER + st.maxn * SIZEOF_FIELD;
            var i, index, lasttag, datasz;
            function fill_size(data_idx, sz) {
                enbuffer[data_idx] = sz & 0xff;
                enbuffer[data_idx + 1] = (sz >> 8) & 0xff;
                enbuffer[data_idx + 2] = (sz >> 16) & 0xff;
                enbuffer[data_idx + 3] = (sz >> 24) & 0xff;
                return sz + SIZEOF_LENGTH;
            }
            function encode_integer(v, data_idx) {
                // enbuffer[data_idx + 4] = v & 0xff;
                // enbuffer[data_idx + 5] = (v >>> 8) & 0xff;
                // enbuffer[data_idx + 6] = (v >>> 16) & 0xff;
                // enbuffer[data_idx + 7] = (v >>> 24) & 0xff;
                // var initV = v;
                // if (v < 0) {
                //     enbuffer[data_idx + 4] = 0;
                //     v = Math.abs(v);
                // }
                // else {
                //     enbuffer[data_idx + 4] = 1;
                // }
                var big = new bigInt(v);
                var twoByte = new bigInt("ff", 16);
                var byteList = new Array();
                var size = 8;
                if (v < 0) {
                    size = 4;
                }
                for (var j = 0; j < size; j++) {
                    byteList[j] = big.shiftRight(j * 8).and(twoByte);
                    // if (initV < 0) {
                    //     enbuffer[data_idx + 4 + j + 1] = byteList[j].value;
                    // }
                    // else {
                    enbuffer[data_idx + 4 + j] = byteList[j].value;
                    // }
                }
                return fill_size(data_idx, j);
            }
            function encode_object(cb, args, data_idx) {
                var sz;
                args.value = data_idx + SIZEOF_LENGTH;
                // args.length = size - SIZEOF_LENGTH;
                sz = cb(args);
                if (sz <= 0) {
                    if (args.type == SPROTO_TSTRING) {
                        return sz;
                    }
                    return fill_size(data_idx, sz);
                    // return sz;
                }
                if (args.type == SPROTO_TSTRING) {
                    --sz;
                }
                return fill_size(data_idx, sz);
            }
            function encode_integer_array(cb, args, buffer_idx) {
                var header_idx = buffer_idx;
                var intlen;
                var index;
                buffer_idx++;
                intlen = 8;
                index = 1;
                for (;;) {
                    var sz;
                    args.value = null;
                    args.length = 4;
                    args.index = index;
                    sz = cb(args);
                    if (sz < 0) {
                        return null;
                    }
                    if (sz == 0) {
                        break;
                    }
                    if (sz <= 8) {
                        var v = args.value;
                        // enbuffer[buffer_idx] = v & 0xff;
                        // enbuffer[buffer_idx + 1] = (v >> 8) & 0xff;
                        // enbuffer[buffer_idx + 2] = (v >> 16) & 0xff;
                        // enbuffer[buffer_idx + 3] = (v >> 24) & 0xff;
                        var big = new bigInt(v);
                        var twoByte = new bigInt("ff", 16);
                        var byteList = new Array();
                        for (i = 0; i < sz; i++) {
                            enbuffer[buffer_idx + i] = big.shiftRight(i * 8).and(twoByte).value;
                        }
                    }
                    else {
                        alert("support 56bit integer only");
                    }
                    buffer_idx += intlen;
                    index++;
                }
                if (buffer_idx == header_idx + 1) {
                    return header_idx;
                }
                enbuffer[header_idx] = intlen & 0xff;
                return buffer_idx;
            }
            function encode_array(cb, args, data_idx) {
                var buffer_idx;
                var sz;
                buffer_idx = data_idx + SIZEOF_LENGTH;
                switch (args.type) {
                    case SPROTO_TINTEGER:
                        buffer_idx = encode_integer_array(cb, args, buffer_idx);
                        if (buffer_idx == null) {
                            return -1;
                        }
                        break;
                    case SPROTO_TBOOLEAN:
                        args.index = 1;
                        for (;;) {
                            var v = 0;
                            args.value = v;
                            args.length = 4;
                            sz = cb(args);
                            if (sz < 0) {
                                return -1;
                            }
                            if (sz == 0) {
                                break;
                            }
                            enbuffer[buffer_idx] = v ? 1 : 0;
                            buffer_idx += 1;
                            ++args.index;
                        }
                        break;
                    default:
                        args.index = 1;
                        for (;;) {
                            args.value = buffer_idx + SIZEOF_LENGTH;
                            // args.length = size;
                            sz = cb(args);
                            if (sz == 0) {
                                break;
                            }
                            if (sz < 0) {
                                return -1;
                            }
                            if (args.type == SPROTO_TSTRING) {
                                --sz;
                            }
                            fill_size(buffer_idx, sz);
                            buffer_idx += SIZEOF_LENGTH + sz;
                            ++args.index;
                        }
                        break;
                }
                sz = buffer_idx - (data_idx + SIZEOF_LENGTH);
                if (sz == 0) {
                    return 0;
                }
                return fill_size(data_idx, sz);
            }
            args.ud = ud;
            data_idx = header_idx + header_sz;
            index = 0;
            lasttag = -1;
            for (i = 0; i < st.n; i++) {
                var f = st.f[i];
                var type = f.type;
                var value = 0;
                var sz = -1;
                args.tagname = f.name;
                args.tagid = f.tag;
                if (f.st != null) {
                    args.subtype = sproto.type[f.st];
                }
                else {
                    args.subtype = null;
                }
                if (type & SPROTO_TARRAY) {
                    args.type = type & ~SPROTO_TARRAY;
                    sz = encode_array(cb, args, data_idx);
                }
                else {
                    args.type = type;
                    args.index = 0;
                    switch (type) {
                        case SPROTO_TINTEGER:
                        case SPROTO_TBOOLEAN:
                            args.value = 0;
                            args.length = 4;
                            sz = cb(args);
                            if (sz < 0) {
                                return -1;
                            }
                            if (sz == 0) {
                                continue;
                            }
                            if (sz <= 8) {
                                // if (args.value < 0) {
                                //     args.value -= 127; //modified 因为-1到-127由于字节压缩关系无法正常解析，暂时这样处理
                                //     sz = encode_integer(args.value, data_idx);
                                // }
                                // else 
                                if (args.value < 0) {
                                    sz = encode_integer(args.value, data_idx);
                                }
                                else if (args.value < 0x7fff) {
                                    value = (args.value + 1) * 2;
                                    sz = 2;
                                }
                                else {
                                    sz = encode_integer(args.value, data_idx);
                                }
                            }
                            else {
                                alert("support 56bits integer only");
                                return -1;
                            }
                            break;
                        case SPROTO_TSTRUCT:
                        case SPROTO_TSTRING:
                            sz = encode_object(cb, args, data_idx);
                            break;
                    }
                }
                if (sz < 0) {
                    return -1;
                }
                if (sz > 0) {
                    var record_idx, tag;
                    if (value == 0) {
                        data_idx += sz;
                    }
                    record_idx = header_idx + SIZEOF_HEADER + SIZEOF_FIELD * index;
                    tag = f.tag - lasttag - 1;
                    if (tag > 0) {
                        tag = (tag - 1) * 2 + 1;
                        if (tag > 0xffff) {
                            return -1;
                        }
                        enbuffer[record_idx] = tag & 0xff;
                        enbuffer[record_idx + 1] = (tag >> 8) & 0xff;
                        ++index;
                        record_idx += SIZEOF_FIELD;
                    }
                    ++index;
                    enbuffer[record_idx] = value & 0xff;
                    enbuffer[record_idx + 1] = (value >> 8) & 0xff;
                    lasttag = f.tag;
                }
            }
            enbuffer[header_idx] = index & 0xff;
            enbuffer[header_idx + 1] = (index >> 8) & 0xff;
            datasz = data_idx - (header_idx + header_sz);
            data_idx = header_idx + header_sz;
            if (index != st.maxn) {
                var v = enbuffer.slice(data_idx, data_idx + datasz);
                for (var s = 0; s < v.length; s++) {
                    enbuffer[header_idx + SIZEOF_HEADER + index * SIZEOF_FIELD + s] = v[s];
                }
            }
            return SIZEOF_HEADER + index * SIZEOF_FIELD + datasz;
        }
        function encode(args) {
            var self = args.ud;
            if (self.deep >= ENCODE_DEEPLEVEL) {
                alert("table is too deep");
                return -1;
            }
            if (self.indata[args.tagname] == null) {
                return 0;
            }
            if (args.index > 0) {
                if (args.tagname != self.array_tag) {
                    self.array_tag = args.tagname;
                }
                if (self.indata[args.tagname][args.index - 1] == null) {
                    return 0;
                }
            }
            switch (args.type) {
                case SPROTO_TINTEGER:
                case SPROTO_TBOOLEAN:
                    if (args.index == 0) {
                        args.value = self.indata[args.tagname];
                    }
                    else {
                        args.value = self.indata[args.tagname][args.index - 1];
                    }
                    return 8;
                case SPROTO_TSTRING:
                    var str;
                    if (args.index == 0) {
                        str = self.indata[args.tagname];
                    }
                    else {
                        str = self.indata[args.tagname][args.index - 1];
                    }
                    str = unescape(encodeURIComponent(str)); //modified by zmd 处理中文乱码问题
                    for (var i = 0; i < str.length; i++) {
                        enbuffer[args.value + i] = str.charCodeAt(i);
                    }
                    return str.length + 1;
                case SPROTO_TSTRUCT:
                    var sub = new Object();
                    var r;
                    sub.st = args.subtype;
                    sub.deep = self.deep + 1;
                    if (args.index == 0) {
                        sub.indata = self.indata[args.tagname];
                    }
                    else {
                        sub.indata = self.indata[args.tagname][args.index - 1];
                    }
                    r = sproto_encode(args.subtype, args.value, encode, sub);
                    return r;
                default:
                    return -1;
            }
        }
        function gen_response(response, session) {
            return function (args) {
                header_tmp = {};
                header_tmp.type = null;
                header_tmp.session = session;
                var header = sproto.encode(sproto.__package, header_tmp);
                if (response) {
                    var content = sproto.encode(response, args);
                    return sproto.pack(array_concat(header, content));
                }
                else {
                    return sproto.pack(header);
                }
            };
        }
        sproto.encode = function (type, indata) {
            var self = new Object();
            var st = sproto_type(type);
            var tbl_index = 2;
            enbuffer = new Array();
            self.st = st;
            self.tbl_index = tbl_index;
            self.indata = indata;
            for (;;) {
                var r;
                self.array_tag = null;
                self.array_index = 0;
                self.deep = 0;
                self.iter_index = tbl_index + 1;
                if (sproto_encode(st, 0, encode, self) < 0) {
                    return null;
                }
                else {
                    return { buf: enbuffer, sz: enbuffer.length };
                }
            }
        };
        function objlen(type, inbuf) {
            var ud = new Object();
            ud.array_tag = null;
            ud.deep = 0;
            ud.result = new Object();
            return sproto_decode(sproto_type(type), inbuf.buf, inbuf.sz, decode, ud);
        }
        sproto.decode = function (type, inbuf) {
            var buffer = inbuf.buf;
            var sz = inbuf.sz;
            var ud = new Object();
            ud.array_tag = null;
            ud.deep = 0;
            ud.result = new Object();
            if (sproto_decode(sproto_type(type), buffer, sz, decode, ud) == null) {
                return null;
            }
            else {
                return ud.result;
            }
        };
        sproto.pack = function (inbuf) {
            var tmp = new Array();
            var i, ff_srcstart, ff_desstart;
            ff_srcstart = new Array();
            var ff_srcstart_idx = 0;
            var ff_n = 0;
            var size = 0;
            var src = inbuf.buf;
            var buffer = new Array();
            var srcsz = inbuf.sz;
            var src_idx = 0;
            var buffer_idx = 0;
            var bufsz = 1 << 30;
            function write_ff(src, des_idx, nn, tail) {
                var i;
                var align8_n = (nn + 7) & (~7);
                buffer[des_idx] = 0xff;
                buffer[des_idx + 1] = align8_n / 8 - 1;
                for (i = 0; i < nn; i++) {
                    buffer[des_idx + 2 + i] = src[i];
                }
                for (i = 0; i < align8_n - nn; i++) {
                    buffer[des_idx + nn + 2 + i] = 0;
                }
                //从某一索引起到最后都是满字节 由于pack_seg里面的b_idx一开始就++的，
                //所以buffer的索引下标到达了des_idx + 2 + nn,
                //但是write_ff的i从0开始，导致压缩字节时这种情况(到最后满子节)会多出来一个的字节
                //所以要剔除此类多余的字节
                if (tail && nn % 8 == 0 && buffer[des_idx + 2 + nn] != undefined) {
                    buffer.splice(des_idx + 2 + nn - 1, 1);
                }
            }
            function pack_seg(s_idx, b_idx, sz, nn) {
                var header = 0;
                var notzero = 0;
                var i;
                var obuffer_idx = b_idx;
                b_idx++;
                sz--;
                if (sz < 0) {
                    obuffer_idx = null;
                }
                for (i = 0; i < 8; i++) {
                    if (src[s_idx + i] != 0) {
                        notzero++;
                        header |= 1 << i;
                        if (sz > 0) {
                            buffer[b_idx] = src[s_idx + i];
                            ++b_idx;
                            --sz;
                        }
                    }
                }
                if ((notzero == 7 || notzero == 6) && nn > 0) {
                    notzero = 8;
                }
                if (notzero == 8) {
                    if (nn > 0) {
                        return 8;
                    }
                    else {
                        return 10;
                    }
                }
                if (obuffer_idx != null) {
                    buffer[obuffer_idx] = header;
                }
                return notzero + 1;
            }
            for (i = 0; i < srcsz; i += 8) {
                var n;
                var padding = i + 8 - srcsz;
                if (padding > 0) {
                    var j;
                    for (var k = 0; k < 8 - padding; k++) {
                        tmp[k] = src[src_idx + k];
                    }
                    for (j = 0; j < padding; j++) {
                        tmp[7 - j] = 0;
                    }
                    src = tmp;
                    src_idx = 0;
                }
                n = pack_seg(src_idx, buffer_idx, bufsz, ff_n);
                bufsz -= n;
                if (n == 10) {
                    ff_srcstart = src.slice(src_idx);
                    ff_srcstart_idx = src_idx;
                    ff_desstart = buffer_idx;
                    ff_n = 1;
                }
                else if (n == 8 && ff_n > 0) {
                    ++ff_n;
                    if (ff_n == 256) {
                        if (bufsz >= 0) {
                            write_ff(ff_srcstart, ff_desstart, 256 * 8);
                        }
                        ff_n = 0;
                    }
                }
                else {
                    if (ff_n > 0) {
                        if (bufsz >= 0) {
                            write_ff(ff_srcstart, ff_desstart, ff_n * 8);
                        }
                        ff_n = 0;
                    }
                }
                src_idx += 8;
                buffer_idx += n;
                size += n;
            }
            if (bufsz >= 0) {
                if (ff_n == 1) {
                    write_ff(ff_srcstart, ff_desstart, 8, true); //尾部 modified by zmd
                }
                else if (ff_n > 1) {
                    write_ff(ff_srcstart, ff_desstart, srcsz - ff_srcstart_idx, true); //尾部 modified by zmd
                }
            }
            return { buf: buffer, sz: size };
        };
        sproto.unpack = function (inbuf) {
            var srcv = inbuf.buf;
            var srcsz = inbuf.sz;
            var bufferv = new Array();
            var bufsz = 1 << 30;
            var src = srcv;
            var src_idx = 0;
            var buffer = bufferv;
            var buffer_idx = 0;
            var size = 0;
            while (srcsz > 0) {
                var header = src[src_idx];
                --srcsz;
                ++src_idx;
                if (header == 0xff) {
                    var n;
                    if (srcsz < 0) {
                        return null;
                    }
                    n = (src[src_idx] + 1) * 8;
                    if (srcsz < n + 1) {
                        return null;
                    }
                    srcsz -= n + 1;
                    src_idx++;
                    if (bufsz >= n) {
                        for (var i = 0; i < n; i++) {
                            buffer[buffer_idx + i] = src[src_idx + i];
                        }
                    }
                    bufsz -= n;
                    buffer_idx += n;
                    src_idx += n;
                    size += n;
                }
                else {
                    var i;
                    for (i = 0; i < 8; i++) {
                        var nz = (header >>> i) & 1;
                        if (nz != 0) {
                            if (srcsz < 0) {
                                return null;
                            }
                            if (bufsz > 0) {
                                buffer[buffer_idx] = src[src_idx];
                                --bufsz;
                                ++buffer_idx;
                            }
                            ++src_idx;
                            --srcsz;
                        }
                        else {
                            if (bufsz > 0) {
                                buffer[buffer_idx] = 0;
                                --bufsz;
                                ++buffer_idx;
                            }
                        }
                        ++size;
                    }
                }
            }
            return { buf: buffer, sz: size };
        };
        sproto.protocol = sproto_protoquery;
        sproto.pencode = function (type, buf) {
            var o = sproto.encode(type, buf);
            if (o == null) {
                return null;
            }
            return sproto.pack(o);
        };
        sproto.pdecode = function (type, buf) {
            var o = sproto.unpack(buf);
            if (o == null) {
                return null;
            }
            return sproto.decode(type, o);
        };
        sproto.host = function (packagename) {
            sproto.__package = packagename;
            sproto.__session = new Array();
        };
        sproto.attach = function () {
            return function (name, args, session) {
                var proto = sproto_protoquery_name(name);
                var header_tmp = {};
                header_tmp.type = proto.tag;
                header_tmp.session = session;
                var header = sproto.encode(sproto.__package, header_tmp);
                if (session) {
                    if (proto.p[SPROTO_RESPONSE]) {
                        sproto.__session[session] = { data: proto.p[SPROTO_RESPONSE], isNoResponse: false };
                    }
                    else {
                        sproto.__session[session] = { isNoResponse: true, name: name };
                    }
                }
                if (args) {
                    var content = sproto.encode(proto.p[SPROTO_REQUEST].name, args);
                    return sproto.pack(array_concat(header, content));
                }
                else {
                    return sproto.pack(header);
                }
            };
        };
        sproto.dispatch = function (buf, req_cb, rsp_cb) {
            var bin = sproto.unpack(buf);
            var header = sproto.decode(sproto.__package, bin);
            var len = objlen(sproto.__package, bin);
            var content = bin.buf.slice(len);
            if (header.type) {
                var proto = sproto.protocol(header.type, SPROTO_REQUEST);
                var result;
                if (proto.p[SPROTO_REQUEST]) {
                    result = sproto.decode(proto.p[SPROTO_REQUEST], { buf: content, sz: content.length });
                }
                if (header.session) {
                    if (!header.error) {
                        header.error = 0;
                    }
                    return req_cb(proto.name, result, header.session, header.error); //gen_response(proto.p[SPROTO_RESPONSE], header.session) modified by zmd 不知道干什么用的
                }
                else {
                    return req_cb(proto.name, result, null, null);
                }
            }
            else {
                if (!header.session) {
                    alert("session not found"); //todo暂时先屏蔽
                    console.log("session not found");
                }
                session = header.session;
                if (!sproto.__session[session]) {
                    alert("session not found"); //todo暂时先屏蔽
                    console.log("session not found"); //todo暂时先屏蔽
                }
                response = sproto.__session[session];
                sproto.__session[session] = null;
                if (response) {
                    if (response.isNoResponse == true) {
                        return rsp_cb(response.name, null, session, header.error);
                    }
                    else {
                        var result = sproto.decode(response.data.name, { buf: content, sz: content.length });
                        result.error = header.error; //modified by zmd 添加错误码
                        return rsp_cb(response.data.name.substring(0, response.data.name.indexOf(".")), result, session, header.error);
                    }
                }
            }
        };
        return create_from_bundle(binsch.buf, binsch.sz);
    }
};
function array2arraybuffer(array) {
    var b = new ArrayBuffer(array.length);
    var v = new DataView(b, 0);
    for (var i = 0; i < array.length; i++) {
        v.setUint8(i, array[i]);
    }
    return b;
}
function arraybuffer2array(buffer) {
    var v = new DataView(buffer, 0);
    var a = new Array();
    for (var i = 0; i < v.byteLength; i++) {
        a[i] = v.getUint8(i);
    }
    return a;
}

"use strict";
(function (root) {
    function checkInt(value) {
        return (parseInt(value) === value);
    }
    function checkInts(arrayish) {
        if (!checkInt(arrayish.length)) {
            return false;
        }
        for (var i = 0; i < arrayish.length; i++) {
            if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
                return false;
            }
        }
        return true;
    }
    function coerceArray(arg, copy) {
        // ArrayBuffer view
        if (arg.buffer && ArrayBuffer.isView(arg) && arg.name === 'Uint8Array') {
            if (copy) {
                if (arg.slice) {
                    arg = arg.slice();
                }
                else {
                    arg = Array.prototype.slice.call(arg);
                }
            }
            return arg;
        }
        // It's an array; check it is a valid representation of a byte
        if (Array.isArray(arg)) {
            if (!checkInts(arg)) {
                throw new Error('Array contains invalid value: ' + arg);
            }
            return new Uint8Array(arg);
        }
        // Something else, but behaves like an array (maybe a Buffer? Arguments?)
        if (checkInt(arg.length) && checkInts(arg)) {
            return new Uint8Array(arg);
        }
        throw new Error('unsupported array-like object');
    }
    function createArray(length) {
        return new Uint8Array(length);
    }
    function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
        if (sourceStart != null || sourceEnd != null) {
            if (sourceArray.slice) {
                sourceArray = sourceArray.slice(sourceStart, sourceEnd);
            }
            else {
                sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
            }
        }
        targetArray.set(sourceArray, targetStart);
    }
    var convertUtf8 = (function () {
        function toBytes(text) {
            var result = [], i = 0;
            text = encodeURI(text);
            while (i < text.length) {
                var c = text.charCodeAt(i++);
                // if it is a % sign, encode the following 2 bytes as a hex value
                if (c === 37) {
                    result.push(parseInt(text.substr(i, 2), 16));
                    i += 2;
                }
                else {
                    result.push(c);
                }
            }
            return coerceArray(result);
        }
        function fromBytes(bytes) {
            var result = [], i = 0;
            while (i < bytes.length) {
                var c = bytes[i];
                if (c < 128) {
                    result.push(String.fromCharCode(c));
                    i++;
                }
                else if (c > 191 && c < 224) {
                    result.push(String.fromCharCode(((c & 0x1f) << 6) | (bytes[i + 1] & 0x3f)));
                    i += 2;
                }
                else {
                    result.push(String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)));
                    i += 3;
                }
            }
            return result.join('');
        }
        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        };
    })();
    var convertHex = (function () {
        function toBytes(text) {
            var result = [];
            for (var i = 0; i < text.length; i += 2) {
                result.push(parseInt(text.substr(i, 2), 16));
            }
            return result;
        }
        // http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html
        var Hex = '0123456789abcdef';
        function fromBytes(bytes) {
            var result = [];
            for (var i = 0; i < bytes.length; i++) {
                var v = bytes[i];
                result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
            }
            return result.join('');
        }
        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        };
    })();
    // Number of rounds by keysize
    var numberOfRounds = { 16: 10, 24: 12, 32: 14 };
    // Round constant words
    var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];
    // S-box and Inverse S-box (S is for Substitution)
    var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
    var Si = [0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d];
    // Transformations for encryption
    var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];
    var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];
    var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];
    var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c];
    // Transformations for decryption
    var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];
    var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];
    var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];
    var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0];
    // Transformations for decryption key expansion
    var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];
    var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];
    var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];
    var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];
    function convertToInt32(bytes) {
        var result = [];
        for (var i = 0; i < bytes.length; i += 4) {
            result.push((bytes[i] << 24) |
                (bytes[i + 1] << 16) |
                (bytes[i + 2] << 8) |
                bytes[i + 3]);
        }
        return result;
    }
    var AES = function (key) {
        if (!(this instanceof AES)) {
            throw Error('AES must be instanitated with `new`');
        }
        Object.defineProperty(this, 'key', {
            value: coerceArray(key, true)
        });
        this._prepare();
    };
    AES.prototype._prepare = function () {
        var rounds = numberOfRounds[this.key.length];
        if (rounds == null) {
            throw new Error('invalid key size (must be 16, 24 or 32 bytes)');
        }
        // encryption round keys
        this._Ke = [];
        // decryption round keys
        this._Kd = [];
        for (var i = 0; i <= rounds; i++) {
            this._Ke.push([0, 0, 0, 0]);
            this._Kd.push([0, 0, 0, 0]);
        }
        var roundKeyCount = (rounds + 1) * 4;
        var KC = this.key.length / 4;
        // convert the key into ints
        var tk = convertToInt32(this.key);
        // copy values into round key arrays
        var index;
        for (var i = 0; i < KC; i++) {
            index = i >> 2;
            this._Ke[index][i % 4] = tk[i];
            this._Kd[rounds - index][i % 4] = tk[i];
        }
        // key expansion (fips-197 section 5.2)
        var rconpointer = 0;
        var t = KC, tt;
        while (t < roundKeyCount) {
            tt = tk[KC - 1];
            tk[0] ^= ((S[(tt >> 16) & 0xFF] << 24) ^
                (S[(tt >> 8) & 0xFF] << 16) ^
                (S[tt & 0xFF] << 8) ^
                S[(tt >> 24) & 0xFF] ^
                (rcon[rconpointer] << 24));
            rconpointer += 1;
            // key expansion (for non-256 bit)
            if (KC != 8) {
                for (var i = 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }
            }
            else {
                for (var i = 1; i < (KC / 2); i++) {
                    tk[i] ^= tk[i - 1];
                }
                tt = tk[(KC / 2) - 1];
                tk[KC / 2] ^= (S[tt & 0xFF] ^
                    (S[(tt >> 8) & 0xFF] << 8) ^
                    (S[(tt >> 16) & 0xFF] << 16) ^
                    (S[(tt >> 24) & 0xFF] << 24));
                for (var i = (KC / 2) + 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }
            }
            // copy values into round key arrays
            var i = 0, r, c;
            while (i < KC && t < roundKeyCount) {
                r = t >> 2;
                c = t % 4;
                this._Ke[r][c] = tk[i];
                this._Kd[rounds - r][c] = tk[i++];
                t++;
            }
        }
        // inverse-cipher-ify the decryption round key (fips-197 section 5.3)
        for (var r = 1; r < rounds; r++) {
            for (var c = 0; c < 4; c++) {
                tt = this._Kd[r][c];
                this._Kd[r][c] = (U1[(tt >> 24) & 0xFF] ^
                    U2[(tt >> 16) & 0xFF] ^
                    U3[(tt >> 8) & 0xFF] ^
                    U4[tt & 0xFF]);
            }
        }
    };
    AES.prototype.encrypt = function (plaintext) {
        if (plaintext.length != 16) {
            throw new Error('invalid plaintext size (must be 16 bytes)');
        }
        var rounds = this._Ke.length - 1;
        var a = [0, 0, 0, 0];
        // convert plaintext to (ints ^ key)
        var t = convertToInt32(plaintext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Ke[0][i];
        }
        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T1[(t[i] >> 24) & 0xff] ^
                    T2[(t[(i + 1) % 4] >> 16) & 0xff] ^
                    T3[(t[(i + 2) % 4] >> 8) & 0xff] ^
                    T4[t[(i + 3) % 4] & 0xff] ^
                    this._Ke[r][i]);
            }
            t = a.slice();
        }
        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Ke[rounds][i];
            result[4 * i] = (S[(t[i] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (S[(t[(i + 1) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (S[(t[(i + 2) % 4] >> 8) & 0xff] ^ (tt >> 8)) & 0xff;
            result[4 * i + 3] = (S[t[(i + 3) % 4] & 0xff] ^ tt) & 0xff;
        }
        return result;
    };
    AES.prototype.decrypt = function (ciphertext) {
        if (ciphertext.length != 16) {
            throw new Error('invalid ciphertext size (must be 16 bytes)');
        }
        var rounds = this._Kd.length - 1;
        var a = [0, 0, 0, 0];
        // convert plaintext to (ints ^ key)
        var t = convertToInt32(ciphertext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Kd[0][i];
        }
        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T5[(t[i] >> 24) & 0xff] ^
                    T6[(t[(i + 3) % 4] >> 16) & 0xff] ^
                    T7[(t[(i + 2) % 4] >> 8) & 0xff] ^
                    T8[t[(i + 1) % 4] & 0xff] ^
                    this._Kd[r][i]);
            }
            t = a.slice();
        }
        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Kd[rounds][i];
            result[4 * i] = (Si[(t[i] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (Si[(t[(i + 3) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (Si[(t[(i + 2) % 4] >> 8) & 0xff] ^ (tt >> 8)) & 0xff;
            result[4 * i + 3] = (Si[t[(i + 1) % 4] & 0xff] ^ tt) & 0xff;
        }
        return result;
    };
    /**
     *  Mode Of Operation - Electonic Codebook (ECB)
     */
    var ModeOfOperationECB = function (key) {
        if (!(this instanceof ModeOfOperationECB)) {
            throw Error('AES must be instanitated with `new`');
        }
        this.description = "Electronic Code Block";
        this.name = "ecb";
        this._aes = new AES(key);
    };
    ModeOfOperationECB.prototype.encrypt = function (plaintext) {
        plaintext = coerceArray(plaintext);
        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }
        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);
        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);
            block = this._aes.encrypt(block);
            copyArray(block, ciphertext, i);
        }
        return ciphertext;
    };
    ModeOfOperationECB.prototype.decrypt = function (ciphertext) {
        ciphertext = coerceArray(ciphertext);
        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }
        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);
        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);
            copyArray(block, plaintext, i);
        }
        return plaintext;
    };
    /**
     *  Mode Of Operation - Cipher Block Chaining (CBC)
     */
    var ModeOfOperationCBC = function (key, iv) {
        if (!(this instanceof ModeOfOperationCBC)) {
            throw Error('AES must be instanitated with `new`');
        }
        this.description = "Cipher Block Chaining";
        this.name = "cbc";
        if (!iv) {
            iv = createArray(16);
        }
        else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }
        this._lastCipherblock = coerceArray(iv, true);
        this._aes = new AES(key);
    };
    ModeOfOperationCBC.prototype.encrypt = function (plaintext) {
        plaintext = coerceArray(plaintext);
        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }
        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);
        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);
            for (var j = 0; j < 16; j++) {
                block[j] ^= this._lastCipherblock[j];
            }
            this._lastCipherblock = this._aes.encrypt(block);
            copyArray(this._lastCipherblock, ciphertext, i);
        }
        return ciphertext;
    };
    ModeOfOperationCBC.prototype.decrypt = function (ciphertext) {
        ciphertext = coerceArray(ciphertext);
        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }
        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);
        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);
            for (var j = 0; j < 16; j++) {
                plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
            }
            copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
        }
        return plaintext;
    };
    /**
     *  Mode Of Operation - Cipher Feedback (CFB)
     */
    var ModeOfOperationCFB = function (key, iv, segmentSize) {
        if (!(this instanceof ModeOfOperationCFB)) {
            throw Error('AES must be instanitated with `new`');
        }
        this.description = "Cipher Feedback";
        this.name = "cfb";
        if (!iv) {
            iv = createArray(16);
        }
        else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 size)');
        }
        if (!segmentSize) {
            segmentSize = 1;
        }
        this.segmentSize = segmentSize;
        this._shiftRegister = coerceArray(iv, true);
        this._aes = new AES(key);
    };
    ModeOfOperationCFB.prototype.encrypt = function (plaintext) {
        if ((plaintext.length % this.segmentSize) != 0) {
            throw new Error('invalid plaintext size (must be segmentSize bytes)');
        }
        var encrypted = coerceArray(plaintext, true);
        var xorSegment;
        for (var i = 0; i < encrypted.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);
            for (var j = 0; j < this.segmentSize; j++) {
                encrypted[i + j] ^= xorSegment[j];
            }
            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }
        return encrypted;
    };
    ModeOfOperationCFB.prototype.decrypt = function (ciphertext) {
        if ((ciphertext.length % this.segmentSize) != 0) {
            throw new Error('invalid ciphertext size (must be segmentSize bytes)');
        }
        var plaintext = coerceArray(ciphertext, true);
        var xorSegment;
        for (var i = 0; i < plaintext.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);
            for (var j = 0; j < this.segmentSize; j++) {
                plaintext[i + j] ^= xorSegment[j];
            }
            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }
        return plaintext;
    };
    /**
     *  Mode Of Operation - Output Feedback (OFB)
     */
    var ModeOfOperationOFB = function (key, iv) {
        if (!(this instanceof ModeOfOperationOFB)) {
            throw Error('AES must be instanitated with `new`');
        }
        this.description = "Output Feedback";
        this.name = "ofb";
        if (!iv) {
            iv = createArray(16);
        }
        else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }
        this._lastPrecipher = coerceArray(iv, true);
        this._lastPrecipherIndex = 16;
        this._aes = new AES(key);
    };
    ModeOfOperationOFB.prototype.encrypt = function (plaintext) {
        var encrypted = coerceArray(plaintext, true);
        for (var i = 0; i < encrypted.length; i++) {
            if (this._lastPrecipherIndex === 16) {
                this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
                this._lastPrecipherIndex = 0;
            }
            encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
        }
        return encrypted;
    };
    // Decryption is symetric
    ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;
    /**
     *  Counter object for CTR common mode of operation
     */
    var Counter = function (initialValue) {
        if (!(this instanceof Counter)) {
            throw Error('Counter must be instanitated with `new`');
        }
        // We allow 0, but anything false-ish uses the default 1
        if (initialValue !== 0 && !initialValue) {
            initialValue = 1;
        }
        if (typeof (initialValue) === 'number') {
            this._counter = createArray(16);
            this.setValue(initialValue);
        }
        else {
            this.setBytes(initialValue);
        }
    };
    Counter.prototype.setValue = function (value) {
        if (typeof (value) !== 'number' || parseInt(value) != value) {
            throw new Error('invalid counter value (must be an integer)');
        }
        // We cannot safely handle numbers beyond the safe range for integers
        if (value > Number.MAX_SAFE_INTEGER) {
            throw new Error('integer value out of safe range');
        }
        for (var index = 15; index >= 0; --index) {
            this._counter[index] = value % 256;
            value = parseInt(value / 256);
        }
    };
    Counter.prototype.setBytes = function (bytes) {
        bytes = coerceArray(bytes, true);
        if (bytes.length != 16) {
            throw new Error('invalid counter bytes size (must be 16 bytes)');
        }
        this._counter = bytes;
    };
    Counter.prototype.increment = function () {
        for (var i = 15; i >= 0; i--) {
            if (this._counter[i] === 255) {
                this._counter[i] = 0;
            }
            else {
                this._counter[i]++;
                break;
            }
        }
    };
    /**
     *  Mode Of Operation - Counter (CTR)
     */
    var ModeOfOperationCTR = function (key, counter) {
        if (!(this instanceof ModeOfOperationCTR)) {
            throw Error('AES must be instanitated with `new`');
        }
        this.description = "Counter";
        this.name = "ctr";
        if (!(counter instanceof Counter)) {
            counter = new Counter(counter);
        }
        this._counter = counter;
        this._remainingCounter = null;
        this._remainingCounterIndex = 16;
        this._aes = new AES(key);
    };
    ModeOfOperationCTR.prototype.encrypt = function (plaintext) {
        var encrypted = coerceArray(plaintext, true);
        for (var i = 0; i < encrypted.length; i++) {
            if (this._remainingCounterIndex === 16) {
                this._remainingCounter = this._aes.encrypt(this._counter._counter);
                this._remainingCounterIndex = 0;
                this._counter.increment();
            }
            encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
        }
        return encrypted;
    };
    // Decryption is symetric
    ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;
    ///////////////////////
    // Padding
    // See:https://tools.ietf.org/html/rfc2315
    function pkcs7pad(data) {
        data = coerceArray(data, true);
        var padder = 16 - (data.length % 16);
        var result = createArray(data.length + padder);
        copyArray(data, result);
        for (var i = data.length; i < result.length; i++) {
            result[i] = padder;
        }
        return result;
    }
    function pkcs7strip(data) {
        data = coerceArray(data, true);
        if (data.length < 16) {
            throw new Error('PKCS#7 invalid length');
        }
        var padder = data[data.length - 1];
        if (padder > 16) {
            throw new Error('PKCS#7 padding byte out of range');
        }
        var length = data.length - padder;
        for (var i = 0; i < padder; i++) {
            if (data[length + i] !== padder) {
                throw new Error('PKCS#7 invalid padding byte');
            }
        }
        var result = createArray(length);
        copyArray(data, result, 0, 0, length);
        return result;
    }
    ///////////////////////
    // Exporting
    // The block cipher
    var aesjs = {
        AES: AES,
        Counter: Counter,
        ModeOfOperation: {
            ecb: ModeOfOperationECB,
            cbc: ModeOfOperationCBC,
            cfb: ModeOfOperationCFB,
            ofb: ModeOfOperationOFB,
            ctr: ModeOfOperationCTR
        },
        utils: {
            hex: convertHex,
            utf8: convertUtf8
        },
        padding: {
            pkcs7: {
                pad: pkcs7pad,
                strip: pkcs7strip
            }
        },
        _arrayTest: {
            coerceArray: coerceArray,
            createArray: createArray,
            copyArray: copyArray,
        }
    };
    // node.js
    if (typeof exports !== 'undefined') {
        module.exports = aesjs;
    }
    else if (typeof (define) === 'function' && define.amd) {
        define(aesjs);
    }
    else {
        // If there was an existing library at "aesjs" make sure it's still available
        if (root.aesjs) {
            aesjs._aesjs = root.aesjs;
        }
        root.aesjs = aesjs;
    }
})(this);

/* OAuthSimple
* A simpler version of OAuth
*
* author:     jr conlin
* mail:       src@anticipatr.com
* copyright:  unitedHeroes.net
* version:    1.0
* url:        http://unitedHeroes.net/OAuthSimple
*
* Copyright (c) 2009, unitedHeroes.net
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of the unitedHeroes.net nor the
*       names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY UNITEDHEROES.NET ''AS IS'' AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL UNITEDHEROES.NET BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/**
* Computes a HMAC-SHA1 code.
*
* @param {string} k Secret key.
* @param {string} d Data to be hashed.
* @return {string} The hashed string.
*/
function b64_hmac_sha1(k, d, _p, _z) {
    // heavily optimized and compressed version of http://pajhome.org.uk/crypt/md5/sha1.js
    // _p = b64pad, _z = character size; not used here but I left them available just in case
    if (!_p) {
        _p = '=';
    }
    if (!_z) {
        _z = 8;
    }
    function _f(t, b, c, d) { if (t < 20) {
        return (b & c) | ((~b) & d);
    } if (t < 40) {
        return b ^ c ^ d;
    } if (t < 60) {
        return (b & c) | (b & d) | (c & d);
    } return b ^ c ^ d; }
    function _k(t) { return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514; }
    function _s(x, y) { var l = (x & 0xFFFF) + (y & 0xFFFF), m = (x >> 16) + (y >> 16) + (l >> 16); return (m << 16) | (l & 0xFFFF); }
    function _r(n, c) { return (n << c) | (n >>> (32 - c)); }
    function _c(x, l) { x[l >> 5] |= 0x80 << (24 - l % 32); x[((l + 64 >> 9) << 4) + 15] = l; var w = [80], a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, e = -1009589776; for (var i = 0; i < x.length; i += 16) {
        var o = a, p = b, q = c, r = d, s = e;
        for (var j = 0; j < 80; j++) {
            if (j < 16) {
                w[j] = x[i + j];
            }
            else {
                w[j] = _r(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            }
            var t = _s(_s(_r(a, 5), _f(j, b, c, d)), _s(_s(e, w[j]), _k(j)));
            e = d;
            d = c;
            c = _r(b, 30);
            b = a;
            a = t;
        }
        a = _s(a, o);
        b = _s(b, p);
        c = _s(c, q);
        d = _s(d, r);
        e = _s(e, s);
    } return [a, b, c, d, e]; }
    function _b(s) { var b = [], m = (1 << _z) - 1; for (var i = 0; i < s.length * _z; i += _z) {
        b[i >> 5] |= (s.charCodeAt(i / 8) & m) << (32 - _z - i % 32);
    } return b; }
    function _h(k, d) { var b = _b(k); if (b.length > 16) {
        b = _c(b, k.length * _z);
    } var p = [16], o = [16]; for (var i = 0; i < 16; i++) {
        p[i] = b[i] ^ 0x36363636;
        o[i] = b[i] ^ 0x5C5C5C5C;
    } var h = _c(p.concat(_b(d)), 512 + d.length * _z); return _c(o.concat(h), 512 + 160); }
    function _n(b) { var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = ''; for (var i = 0; i < b.length * 4; i += 3) {
        var r = (((b[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((b[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((b[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > b.length * 32) {
                s += _p;
            }
            else {
                s += t.charAt((r >> 6 * (3 - j)) & 0x3F);
            }
        }
    } return s; }
    function _x(k, d) { return _n(_h(k, d)); }
    return _x(k, d);
}

/*
 * PAK allows two parties to authenticate themselves
 * while performing the Diffie-Hellman exchange.
 *
 * See http://tools.ietf.org/html/rfc5683
 */
PAKDHClient = function (password, group) {
    "use strict";
    var sjcl = { cipher: {}, hash: {}, keyexchange: {}, mode: {}, misc: {}, codec: {}, exception: { corrupt: function (a) { this.toString = function () { return "CORRUPT: " + this.message; }; this.message = a; }, invalid: function (a) { this.toString = function () { return "INVALID: " + this.message; }; this.message = a; }, bug: function (a) { this.toString = function () { return "BUG: " + this.message; }; this.message = a; }, notReady: function (a) { this.toString = function () { return "NOT READY: " + this.message; }; this.message = a; } } };
    sjcl.cipher.aes = function (a) {
        this.s[0][0][0] || this.O();
        var b, c, d, e, f = this.s[0][4], g = this.s[1];
        b = a.length;
        var h = 1;
        if (4 !== b && 6 !== b && 8 !== b)
            throw new sjcl.exception.invalid("invalid aes key size");
        this.b = [d = a.slice(0), e = []];
        for (a = b; a < 4 * b + 28; a++) {
            c = d[a - 1];
            if (0 === a % b || 8 === b && 4 === a % b)
                c = f[c >>> 24] << 24 ^ f[c >> 16 & 255] << 16 ^ f[c >> 8 & 255] << 8 ^ f[c & 255], 0 === a % b && (c = c << 8 ^ c >>> 24 ^ h << 24, h = h << 1 ^ 283 * (h >> 7));
            d[a] = d[a - b] ^ c;
        }
        for (b = 0; a; b++, a--)
            c = d[b & 3 ? a : a - 4], e[b] = 4 >= a || 4 > b ? c : g[0][f[c >>> 24]] ^ g[1][f[c >> 16 & 255]] ^ g[2][f[c >> 8 & 255]] ^ g[3][f[c &
                255]];
    };
    sjcl.cipher.aes.prototype = { encrypt: function (a) { return t(this, a, 0); }, decrypt: function (a) { return t(this, a, 1); }, s: [[[], [], [], [], []], [[], [], [], [], []]], O: function () {
            var a = this.s[0], b = this.s[1], c = a[4], d = b[4], e, f, g, h = [], k = [], l, n, m, p;
            for (e = 0; 0x100 > e; e++)
                k[(h[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
            for (f = g = 0; !c[f]; f ^= l || 1, g = k[g] || 1)
                for (m = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4, m = m >> 8 ^ m & 255 ^ 99, c[f] = m, d[m] = f, n = h[e = h[l = h[f]]], p = 0x1010101 * n ^ 0x10001 * e ^ 0x101 * l ^ 0x1010100 * f, n = 0x101 * h[m] ^ 0x1010100 * m, e = 0; 4 > e; e++)
                    a[e][f] = n = n << 24 ^ n >>> 8, b[e][m] = p = p << 24 ^ p >>> 8;
            for (e =
                0; 5 > e; e++)
                a[e] = a[e].slice(0), b[e] = b[e].slice(0);
        } };
    function t(a, b, c) {
        if (4 !== b.length)
            throw new sjcl.exception.invalid("invalid aes block size");
        var d = a.b[c], e = b[0] ^ d[0], f = b[c ? 3 : 1] ^ d[1], g = b[2] ^ d[2];
        b = b[c ? 1 : 3] ^ d[3];
        var h, k, l, n = d.length / 4 - 2, m, p = 4, r = [0, 0, 0, 0];
        h = a.s[c];
        a = h[0];
        var q = h[1], v = h[2], w = h[3], x = h[4];
        for (m = 0; m < n; m++)
            h = a[e >>> 24] ^ q[f >> 16 & 255] ^ v[g >> 8 & 255] ^ w[b & 255] ^ d[p], k = a[f >>> 24] ^ q[g >> 16 & 255] ^ v[b >> 8 & 255] ^ w[e & 255] ^ d[p + 1], l = a[g >>> 24] ^ q[b >> 16 & 255] ^ v[e >> 8 & 255] ^ w[f & 255] ^ d[p + 2], b = a[b >>> 24] ^ q[e >> 16 & 255] ^ v[f >> 8 & 255] ^ w[g & 255] ^ d[p + 3], p += 4, e = h, f = k, g = l;
        for (m =
            0; 4 > m; m++)
            r[c ? 3 & -m : m] = x[e >>> 24] << 24 ^ x[f >> 16 & 255] << 16 ^ x[g >> 8 & 255] << 8 ^ x[b & 255] ^ d[p++], h = e, e = f, f = g, g = b, b = h;
        return r;
    }
    sjcl.bitArray = { bitSlice: function (a, b, c) { a = sjcl.bitArray.$(a.slice(b / 32), 32 - (b & 31)).slice(1); return void 0 === c ? a : sjcl.bitArray.clamp(a, c - b); }, extract: function (a, b, c) { var d = Math.floor(-b - c & 31); return ((b + c - 1 ^ b) & -32 ? a[b / 32 | 0] << 32 - d ^ a[b / 32 + 1 | 0] >>> d : a[b / 32 | 0] >>> d) & (1 << c) - 1; }, concat: function (a, b) { if (0 === a.length || 0 === b.length)
            return a.concat(b); var c = a[a.length - 1], d = sjcl.bitArray.getPartial(c); return 32 === d ? a.concat(b) : sjcl.bitArray.$(b, d, c | 0, a.slice(0, a.length - 1)); }, bitLength: function (a) {
            var b = a.length;
            return 0 ===
                b ? 0 : 32 * (b - 1) + sjcl.bitArray.getPartial(a[b - 1]);
        }, clamp: function (a, b) { if (32 * a.length < b)
            return a; a = a.slice(0, Math.ceil(b / 32)); var c = a.length; b = b & 31; 0 < c && b && (a[c - 1] = sjcl.bitArray.partial(b, a[c - 1] & 2147483648 >> b - 1, 1)); return a; }, partial: function (a, b, c) { return 32 === a ? b : (c ? b | 0 : b << 32 - a) + 0x10000000000 * a; }, getPartial: function (a) { return Math.round(a / 0x10000000000) || 32; }, equal: function (a, b) {
            if (sjcl.bitArray.bitLength(a) !== sjcl.bitArray.bitLength(b))
                return !1;
            var c = 0, d;
            for (d = 0; d < a.length; d++)
                c |= a[d] ^ b[d];
            return 0 ===
                c;
        }, $: function (a, b, c, d) { var e; e = 0; for (void 0 === d && (d = []); 32 <= b; b -= 32)
            d.push(c), c = 0; if (0 === b)
            return d.concat(a); for (e = 0; e < a.length; e++)
            d.push(c | a[e] >>> b), c = a[e] << 32 - b; e = a.length ? a[a.length - 1] : 0; a = sjcl.bitArray.getPartial(e); d.push(sjcl.bitArray.partial(b + a & 31, 32 < b + a ? c : d.pop(), 1)); return d; }, i: function (a, b) { return [a[0] ^ b[0], a[1] ^ b[1], a[2] ^ b[2], a[3] ^ b[3]]; }, byteswapM: function (a) { var b, c; for (b = 0; b < a.length; ++b)
            c = a[b], a[b] = c >>> 24 | c >>> 8 & 0xff00 | (c & 0xff00) << 8 | c << 24; return a; } };
    sjcl.codec.utf8String = { fromBits: function (a) { var b = "", c = sjcl.bitArray.bitLength(a), d, e; for (d = 0; d < c / 8; d++)
            0 === (d & 3) && (e = a[d / 4]), b += String.fromCharCode(e >>> 24), e <<= 8; return decodeURIComponent(escape(b)); }, toBits: function (a) { a = unescape(encodeURIComponent(a)); var b = [], c, d = 0; for (c = 0; c < a.length; c++)
            d = d << 8 | a.charCodeAt(c), 3 === (c & 3) && (b.push(d), d = 0); c & 3 && b.push(sjcl.bitArray.partial(8 * (c & 3), d)); return b; } };
    sjcl.codec.hex = { fromBits: function (a) { var b = "", c; for (c = 0; c < a.length; c++)
            b += ((a[c] | 0) + 0xf00000000000).toString(16).substr(4); return b.substr(0, sjcl.bitArray.bitLength(a) / 4); }, toBits: function (a) { var b, c = [], d; a = a.replace(/\s|0x/g, ""); d = a.length; a = a + "00000000"; for (b = 0; b < a.length; b += 8)
            c.push(parseInt(a.substr(b, 8), 16) ^ 0); return sjcl.bitArray.clamp(c, 4 * d); } };
    sjcl.codec.base32 = { B: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", X: "0123456789ABCDEFGHIJKLMNOPQRSTUV", BITS: 32, BASE: 5, REMAINING: 27, fromBits: function (a, b, c) { var d = sjcl.codec.base32.BASE, e = sjcl.codec.base32.REMAINING, f = "", g = 0, h = sjcl.codec.base32.B, k = 0, l = sjcl.bitArray.bitLength(a); c && (h = sjcl.codec.base32.X); for (c = 0; f.length * d < l;)
            f += h.charAt((k ^ a[c] >>> g) >>> e), g < d ? (k = a[c] << d - g, g += e, c++) : (k <<= d, g -= d); for (; f.length & 7 && !b;)
            f += "="; return f; }, toBits: function (a, b) {
            a = a.replace(/\s|=/g, "").toUpperCase();
            var c = sjcl.codec.base32.BITS, d = sjcl.codec.base32.BASE, e = sjcl.codec.base32.REMAINING, f = [], g, h = 0, k = sjcl.codec.base32.B, l = 0, n, m = "base32";
            b && (k = sjcl.codec.base32.X, m = "base32hex");
            for (g = 0; g < a.length; g++) {
                n = k.indexOf(a.charAt(g));
                if (0 > n) {
                    if (!b)
                        try {
                            return sjcl.codec.base32hex.toBits(a);
                        }
                        catch (p) { }
                    throw new sjcl.exception.invalid("this isn't " + m + "!");
                }
                h > e ? (h -= e, f.push(l ^ n >>> h), l = n << c - h) : (h += d, l ^= n << c - h);
            }
            h & 56 && f.push(sjcl.bitArray.partial(h & 56, l, 1));
            return f;
        } };
    sjcl.codec.base32hex = { fromBits: function (a, b) { return sjcl.codec.base32.fromBits(a, b, 1); }, toBits: function (a) { return sjcl.codec.base32.toBits(a, 1); } };
    sjcl.codec.base64 = { B: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", fromBits: function (a, b, c) { var d = "", e = 0, f = sjcl.codec.base64.B, g = 0, h = sjcl.bitArray.bitLength(a); c && (f = f.substr(0, 62) + "-_"); for (c = 0; 6 * d.length < h;)
            d += f.charAt((g ^ a[c] >>> e) >>> 26), 6 > e ? (g = a[c] << 6 - e, e += 26, c++) : (g <<= 6, e -= 6); for (; d.length & 3 && !b;)
            d += "="; return d; }, toBits: function (a, b) {
            a = a.replace(/\s|=/g, "");
            var c = [], d, e = 0, f = sjcl.codec.base64.B, g = 0, h;
            b && (f = f.substr(0, 62) + "-_");
            for (d = 0; d < a.length; d++) {
                h = f.indexOf(a.charAt(d));
                if (0 > h)
                    throw new sjcl.exception.invalid("this isn't base64!");
                26 < e ? (e -= 26, c.push(g ^ h >>> e), g = h << 32 - e) : (e += 6, g ^= h << 32 - e);
            }
            e & 56 && c.push(sjcl.bitArray.partial(e & 56, g, 1));
            return c;
        } };
    sjcl.codec.base64url = { fromBits: function (a) { return sjcl.codec.base64.fromBits(a, 1, 1); }, toBits: function (a) { return sjcl.codec.base64.toBits(a, 1); } };
    sjcl.hash.sha256 = function (a) { this.b[0] || this.O(); a ? (this.F = a.F.slice(0), this.A = a.A.slice(0), this.l = a.l) : this.reset(); };
    sjcl.hash.sha256.hash = function (a) { return (new sjcl.hash.sha256).update(a).finalize(); };
    sjcl.hash.sha256.prototype = { blockSize: 512, reset: function () { this.F = this.Y.slice(0); this.A = []; this.l = 0; return this; }, update: function (a) {
            "string" === typeof a && (a = sjcl.codec.utf8String.toBits(a));
            var b, c = this.A = sjcl.bitArray.concat(this.A, a);
            b = this.l;
            a = this.l = b + sjcl.bitArray.bitLength(a);
            if (0x1fffffffffffff < a)
                throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits");
            if ("undefined" !== typeof Uint32Array) {
                var d = new Uint32Array(c), e = 0;
                for (b = 512 + b - (512 + b & 0x1ff); b <= a; b += 512)
                    u(this, d.subarray(16 * e, 16 * (e + 1))), e += 1;
                c.splice(0, 16 * e);
            }
            else
                for (b = 512 + b - (512 + b & 0x1ff); b <= a; b += 512)
                    u(this, c.splice(0, 16));
            return this;
        }, finalize: function () { var a, b = this.A, c = this.F, b = sjcl.bitArray.concat(b, [sjcl.bitArray.partial(1, 1)]); for (a = b.length + 2; a & 15; a++)
            b.push(0); b.push(Math.floor(this.l / 0x100000000)); for (b.push(this.l | 0); b.length;)
            u(this, b.splice(0, 16)); this.reset(); return c; }, Y: [], b: [], O: function () {
            function a(a) { return 0x100000000 * (a - Math.floor(a)) | 0; }
            for (var b = 0, c = 2, d, e; 64 > b; c++) {
                e = !0;
                for (d = 2; d * d <= c; d++)
                    if (0 === c % d) {
                        e =
                            !1;
                        break;
                    }
                e && (8 > b && (this.Y[b] = a(Math.pow(c, .5))), this.b[b] = a(Math.pow(c, 1 / 3)), b++);
            }
        } };
    function u(a, b) {
        var c, d, e, f = a.F, g = a.b, h = f[0], k = f[1], l = f[2], n = f[3], m = f[4], p = f[5], r = f[6], q = f[7];
        for (c = 0; 64 > c; c++)
            16 > c ? d = b[c] : (d = b[c + 1 & 15], e = b[c + 14 & 15], d = b[c & 15] = (d >>> 7 ^ d >>> 18 ^ d >>> 3 ^ d << 25 ^ d << 14) + (e >>> 17 ^ e >>> 19 ^ e >>> 10 ^ e << 15 ^ e << 13) + b[c & 15] + b[c + 9 & 15] | 0), d = d + q + (m >>> 6 ^ m >>> 11 ^ m >>> 25 ^ m << 26 ^ m << 21 ^ m << 7) + (r ^ m & (p ^ r)) + g[c], q = r, r = p, p = m, m = n + d | 0, n = l, l = k, k = h, h = d + (k & l ^ n & (k ^ l)) + (k >>> 2 ^ k >>> 13 ^ k >>> 22 ^ k << 30 ^ k << 19 ^ k << 10) | 0;
        f[0] = f[0] + h | 0;
        f[1] = f[1] + k | 0;
        f[2] = f[2] + l | 0;
        f[3] = f[3] + n | 0;
        f[4] = f[4] + m | 0;
        f[5] = f[5] + p | 0;
        f[6] = f[6] + r | 0;
        f[7] =
            f[7] + q | 0;
    }
    sjcl.mode.ccm = { name: "ccm", G: [], listenProgress: function (a) { sjcl.mode.ccm.G.push(a); }, unListenProgress: function (a) { a = sjcl.mode.ccm.G.indexOf(a); -1 < a && sjcl.mode.ccm.G.splice(a, 1); }, fa: function (a) { var b = sjcl.mode.ccm.G.slice(), c; for (c = 0; c < b.length; c += 1)
            b[c](a); }, encrypt: function (a, b, c, d, e) {
            var f, g = b.slice(0), h = sjcl.bitArray, k = h.bitLength(c) / 8, l = h.bitLength(g) / 8;
            e = e || 64;
            d = d || [];
            if (7 > k)
                throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");
            for (f = 2; 4 > f && l >>> 8 * f; f++)
                ;
            f < 15 - k && (f = 15 - k);
            c = h.clamp(c, 8 * (15 - f));
            b = sjcl.mode.ccm.V(a, b, c, d, e, f);
            g = sjcl.mode.ccm.C(a, g, c, b, e, f);
            return h.concat(g.data, g.tag);
        }, decrypt: function (a, b, c, d, e) {
            e = e || 64;
            d = d || [];
            var f = sjcl.bitArray, g = f.bitLength(c) / 8, h = f.bitLength(b), k = f.clamp(b, h - e), l = f.bitSlice(b, h - e), h = (h - e) / 8;
            if (7 > g)
                throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");
            for (b = 2; 4 > b && h >>> 8 * b; b++)
                ;
            b < 15 - g && (b = 15 - g);
            c = f.clamp(c, 8 * (15 - b));
            k = sjcl.mode.ccm.C(a, k, c, l, e, b);
            a = sjcl.mode.ccm.V(a, k.data, c, d, e, b);
            if (!f.equal(k.tag, a))
                throw new sjcl.exception.corrupt("ccm: tag doesn't match");
            return k.data;
        }, na: function (a, b, c, d, e, f) { var g = [], h = sjcl.bitArray, k = h.i; d = [h.partial(8, (b.length ? 64 : 0) | d - 2 << 2 | f - 1)]; d = h.concat(d, c); d[3] |= e; d = a.encrypt(d); if (b.length)
            for (c = h.bitLength(b) / 8, 65279 >= c ? g = [h.partial(16, c)] : 0xffffffff >= c && (g = h.concat([h.partial(16, 65534)], [c])), g = h.concat(g, b), b = 0; b < g.length; b += 4)
                d = a.encrypt(k(d, g.slice(b, b + 4).concat([0, 0, 0]))); return d; }, V: function (a, b, c, d, e, f) {
            var g = sjcl.bitArray, h = g.i;
            e /= 8;
            if (e % 2 || 4 > e || 16 < e)
                throw new sjcl.exception.invalid("ccm: invalid tag length");
            if (0xffffffff < d.length || 0xffffffff < b.length)
                throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data");
            c = sjcl.mode.ccm.na(a, d, c, e, g.bitLength(b) / 8, f);
            for (d = 0; d < b.length; d += 4)
                c = a.encrypt(h(c, b.slice(d, d + 4).concat([0, 0, 0])));
            return g.clamp(c, 8 * e);
        }, C: function (a, b, c, d, e, f) {
            var g, h = sjcl.bitArray;
            g = h.i;
            var k = b.length, l = h.bitLength(b), n = k / 50, m = n;
            c = h.concat([h.partial(8, f - 1)], c).concat([0, 0, 0]).slice(0, 4);
            d = h.bitSlice(g(d, a.encrypt(c)), 0, e);
            if (!k)
                return { tag: d, data: [] };
            for (g = 0; g < k; g += 4)
                g > n && (sjcl.mode.ccm.fa(g /
                    k), n += m), c[3]++, e = a.encrypt(c), b[g] ^= e[0], b[g + 1] ^= e[1], b[g + 2] ^= e[2], b[g + 3] ^= e[3];
            return { tag: d, data: h.clamp(b, l) };
        } };
    sjcl.mode.ocb2 = { name: "ocb2", encrypt: function (a, b, c, d, e, f) {
            if (128 !== sjcl.bitArray.bitLength(c))
                throw new sjcl.exception.invalid("ocb iv must be 128 bits");
            var g, h = sjcl.mode.ocb2.S, k = sjcl.bitArray, l = k.i, n = [0, 0, 0, 0];
            c = h(a.encrypt(c));
            var m, p = [];
            d = d || [];
            e = e || 64;
            for (g = 0; g + 4 < b.length; g += 4)
                m = b.slice(g, g + 4), n = l(n, m), p = p.concat(l(c, a.encrypt(l(c, m)))), c = h(c);
            m = b.slice(g);
            b = k.bitLength(m);
            g = a.encrypt(l(c, [0, 0, 0, b]));
            m = k.clamp(l(m.concat([0, 0, 0]), g), b);
            n = l(n, l(m.concat([0, 0, 0]), g));
            n = a.encrypt(l(n, l(c, h(c))));
            d.length && (n = l(n, f ? d : sjcl.mode.ocb2.pmac(a, d)));
            return p.concat(k.concat(m, k.clamp(n, e)));
        }, decrypt: function (a, b, c, d, e, f) {
            if (128 !== sjcl.bitArray.bitLength(c))
                throw new sjcl.exception.invalid("ocb iv must be 128 bits");
            e = e || 64;
            var g = sjcl.mode.ocb2.S, h = sjcl.bitArray, k = h.i, l = [0, 0, 0, 0], n = g(a.encrypt(c)), m, p, r = sjcl.bitArray.bitLength(b) - e, q = [];
            d = d || [];
            for (c = 0; c + 4 < r / 32; c += 4)
                m = k(n, a.decrypt(k(n, b.slice(c, c + 4)))), l = k(l, m), q = q.concat(m), n = g(n);
            p = r - 32 * c;
            m = a.encrypt(k(n, [0, 0, 0, p]));
            m = k(m, h.clamp(b.slice(c), p).concat([0,
                0, 0]));
            l = k(l, m);
            l = a.encrypt(k(l, k(n, g(n))));
            d.length && (l = k(l, f ? d : sjcl.mode.ocb2.pmac(a, d)));
            if (!h.equal(h.clamp(l, e), h.bitSlice(b, r)))
                throw new sjcl.exception.corrupt("ocb: tag doesn't match");
            return q.concat(h.clamp(m, p));
        }, pmac: function (a, b) {
            var c, d = sjcl.mode.ocb2.S, e = sjcl.bitArray, f = e.i, g = [0, 0, 0, 0], h = a.encrypt([0, 0, 0, 0]), h = f(h, d(d(h)));
            for (c = 0; c + 4 < b.length; c += 4)
                h = d(h), g = f(g, a.encrypt(f(h, b.slice(c, c + 4))));
            c = b.slice(c);
            128 > e.bitLength(c) && (h = f(h, d(h)), c = e.concat(c, [-2147483648, 0, 0, 0]));
            g = f(g, c);
            return a.encrypt(f(d(f(h, d(h))), g));
        }, S: function (a) { return [a[0] << 1 ^ a[1] >>> 31, a[1] << 1 ^ a[2] >>> 31, a[2] << 1 ^ a[3] >>> 31, a[3] << 1 ^ 135 * (a[0] >>> 31)]; } };
    sjcl.mode.gcm = { name: "gcm", encrypt: function (a, b, c, d, e) { var f = b.slice(0); b = sjcl.bitArray; d = d || []; a = sjcl.mode.gcm.C(!0, a, f, d, c, e || 128); return b.concat(a.data, a.tag); }, decrypt: function (a, b, c, d, e) { var f = b.slice(0), g = sjcl.bitArray, h = g.bitLength(f); e = e || 128; d = d || []; e <= h ? (b = g.bitSlice(f, h - e), f = g.bitSlice(f, 0, h - e)) : (b = f, f = []); a = sjcl.mode.gcm.C(!1, a, f, d, c, e); if (!g.equal(a.tag, b))
            throw new sjcl.exception.corrupt("gcm: tag doesn't match"); return a.data; }, ka: function (a, b) {
            var c, d, e, f, g, h = sjcl.bitArray.i;
            e = [0, 0,
                0, 0];
            f = b.slice(0);
            for (c = 0; 128 > c; c++) {
                (d = 0 !== (a[Math.floor(c / 32)] & 1 << 31 - c % 32)) && (e = h(e, f));
                g = 0 !== (f[3] & 1);
                for (d = 3; 0 < d; d--)
                    f[d] = f[d] >>> 1 | (f[d - 1] & 1) << 31;
                f[0] >>>= 1;
                g && (f[0] ^= -0x1f000000);
            }
            return e;
        }, j: function (a, b, c) { var d, e = c.length; b = b.slice(0); for (d = 0; d < e; d += 4)
            b[0] ^= 0xffffffff & c[d], b[1] ^= 0xffffffff & c[d + 1], b[2] ^= 0xffffffff & c[d + 2], b[3] ^= 0xffffffff & c[d + 3], b = sjcl.mode.gcm.ka(b, a); return b; }, C: function (a, b, c, d, e, f) {
            var g, h, k, l, n, m, p, r, q = sjcl.bitArray;
            m = c.length;
            p = q.bitLength(c);
            r = q.bitLength(d);
            h = q.bitLength(e);
            g = b.encrypt([0, 0, 0, 0]);
            96 === h ? (e = e.slice(0), e = q.concat(e, [1])) : (e = sjcl.mode.gcm.j(g, [0, 0, 0, 0], e), e = sjcl.mode.gcm.j(g, e, [0, 0, Math.floor(h / 0x100000000), h & 0xffffffff]));
            h = sjcl.mode.gcm.j(g, [0, 0, 0, 0], d);
            n = e.slice(0);
            d = h.slice(0);
            a || (d = sjcl.mode.gcm.j(g, h, c));
            for (l = 0; l < m; l += 4)
                n[3]++, k = b.encrypt(n), c[l] ^= k[0], c[l + 1] ^= k[1], c[l + 2] ^= k[2], c[l + 3] ^= k[3];
            c = q.clamp(c, p);
            a && (d = sjcl.mode.gcm.j(g, h, c));
            a = [Math.floor(r / 0x100000000), r & 0xffffffff, Math.floor(p / 0x100000000), p & 0xffffffff];
            d = sjcl.mode.gcm.j(g, d, a);
            k = b.encrypt(e);
            d[0] ^= k[0];
            d[1] ^= k[1];
            d[2] ^= k[2];
            d[3] ^= k[3];
            return { tag: q.bitSlice(d, 0, f), data: c };
        } };
    sjcl.misc.hmac = function (a, b) { this.W = b = b || sjcl.hash.sha256; var c = [[], []], d, e = b.prototype.blockSize / 32; this.w = [new b, new b]; a.length > e && (a = b.hash(a)); for (d = 0; d < e; d++)
        c[0][d] = a[d] ^ 909522486, c[1][d] = a[d] ^ 1549556828; this.w[0].update(c[0]); this.w[1].update(c[1]); this.R = new b(this.w[0]); };
    sjcl.misc.hmac.prototype.encrypt = sjcl.misc.hmac.prototype.mac = function (a) { if (this.aa)
        throw new sjcl.exception.invalid("encrypt on already updated hmac called!"); this.update(a); return this.digest(a); };
    sjcl.misc.hmac.prototype.reset = function () { this.R = new this.W(this.w[0]); this.aa = !1; };
    sjcl.misc.hmac.prototype.update = function (a) { this.aa = !0; this.R.update(a); };
    sjcl.misc.hmac.prototype.digest = function () { var a = this.R.finalize(), a = (new this.W(this.w[1])).update(a).finalize(); this.reset(); return a; };
    sjcl.misc.pbkdf2 = function (a, b, c, d, e) { c = c || 1E4; if (0 > d || 0 > c)
        throw new sjcl.exception.invalid("invalid params to pbkdf2"); "string" === typeof a && (a = sjcl.codec.utf8String.toBits(a)); "string" === typeof b && (b = sjcl.codec.utf8String.toBits(b)); e = e || sjcl.misc.hmac; a = new e(a); var f, g, h, k, l = [], n = sjcl.bitArray; for (k = 1; 32 * l.length < (d || 1); k++) {
        e = f = a.encrypt(n.concat(b, [k]));
        for (g = 1; g < c; g++)
            for (f = a.encrypt(f), h = 0; h < f.length; h++)
                e[h] ^= f[h];
        l = l.concat(e);
    } d && (l = n.clamp(l, d)); return l; };
    sjcl.prng = function (a) { this.c = [new sjcl.hash.sha256]; this.m = [0]; this.P = 0; this.H = {}; this.N = 0; this.U = {}; this.Z = this.f = this.o = this.ha = 0; this.b = [0, 0, 0, 0, 0, 0, 0, 0]; this.h = [0, 0, 0, 0]; this.L = void 0; this.M = a; this.D = !1; this.K = { progress: {}, seeded: {} }; this.u = this.ga = 0; this.I = 1; this.J = 2; this.ca = 0x10000; this.T = [0, 48, 64, 96, 128, 192, 0x100, 384, 512, 768, 1024]; this.da = 3E4; this.ba = 80; };
    sjcl.prng.prototype = { randomWords: function (a, b) {
            var c = [], d;
            d = this.isReady(b);
            var e;
            if (d === this.u)
                throw new sjcl.exception.notReady("generator isn't seeded");
            if (d & this.J) {
                d = !(d & this.I);
                e = [];
                var f = 0, g;
                this.Z = e[0] = (new Date).valueOf() + this.da;
                for (g = 0; 16 > g; g++)
                    e.push(0x100000000 * Math.random() | 0);
                for (g = 0; g < this.c.length && (e = e.concat(this.c[g].finalize()), f += this.m[g], this.m[g] = 0, d || !(this.P & 1 << g)); g++)
                    ;
                this.P >= 1 << this.c.length && (this.c.push(new sjcl.hash.sha256), this.m.push(0));
                this.f -= f;
                f > this.o && (this.o =
                    f);
                this.P++;
                this.b = sjcl.hash.sha256.hash(this.b.concat(e));
                this.L = new sjcl.cipher.aes(this.b);
                for (d = 0; 4 > d && (this.h[d] = this.h[d] + 1 | 0, !this.h[d]); d++)
                    ;
            }
            for (d = 0; d < a; d += 4)
                0 === (d + 1) % this.ca && y(this), e = z(this), c.push(e[0], e[1], e[2], e[3]);
            y(this);
            return c.slice(0, a);
        }, setDefaultParanoia: function (a, b) { if (0 === a && "Setting paranoia=0 will ruin your security; use it only for testing" !== b)
            throw new sjcl.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing"); this.M = a; }, addEntropy: function (a, b, c) {
            c = c || "user";
            var d, e, f = (new Date).valueOf(), g = this.H[c], h = this.isReady(), k = 0;
            d = this.U[c];
            void 0 === d && (d = this.U[c] = this.ha++);
            void 0 === g && (g = this.H[c] = 0);
            this.H[c] = (this.H[c] + 1) % this.c.length;
            switch (typeof a) {
                case "number":
                    void 0 === b && (b = 1);
                    this.c[g].update([d, this.N++, 1, b, f, 1, a | 0]);
                    break;
                case "object":
                    c = Object.prototype.toString.call(a);
                    if ("[object Uint32Array]" === c) {
                        e = [];
                        for (c = 0; c < a.length; c++)
                            e.push(a[c]);
                        a = e;
                    }
                    else
                        for ("[object Array]" !== c && (k = 1), c = 0; c < a.length && !k; c++)
                            "number" !== typeof a[c] &&
                                (k = 1);
                    if (!k) {
                        if (void 0 === b)
                            for (c = b = 0; c < a.length; c++)
                                for (e = a[c]; 0 < e;)
                                    b++, e = e >>> 1;
                        this.c[g].update([d, this.N++, 2, b, f, a.length].concat(a));
                    }
                    break;
                case "string":
                    void 0 === b && (b = a.length);
                    this.c[g].update([d, this.N++, 3, b, f, a.length]);
                    this.c[g].update(a);
                    break;
                default: k = 1;
            }
            if (k)
                throw new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string");
            this.m[g] += b;
            this.f += b;
            h === this.u && (this.isReady() !== this.u && A("seeded", Math.max(this.o, this.f)), A("progress", this.getProgress()));
        },
        isReady: function (a) { a = this.T[void 0 !== a ? a : this.M]; return this.o && this.o >= a ? this.m[0] > this.ba && (new Date).valueOf() > this.Z ? this.J | this.I : this.I : this.f >= a ? this.J | this.u : this.u; }, getProgress: function (a) { a = this.T[a ? a : this.M]; return this.o >= a ? 1 : this.f > a ? 1 : this.f / a; }, startCollectors: function () {
            if (!this.D) {
                this.a = { loadTimeCollector: B(this, this.ma), mouseCollector: B(this, this.oa), keyboardCollector: B(this, this.la), accelerometerCollector: B(this, this.ea), touchCollector: B(this, this.qa) };
                if (window.addEventListener)
                    window.addEventListener("load", this.a.loadTimeCollector, !1), window.addEventListener("mousemove", this.a.mouseCollector, !1), window.addEventListener("keypress", this.a.keyboardCollector, !1), window.addEventListener("devicemotion", this.a.accelerometerCollector, !1), window.addEventListener("touchmove", this.a.touchCollector, !1);
                else if (document.attachEvent)
                    document.attachEvent("onload", this.a.loadTimeCollector), document.attachEvent("onmousemove", this.a.mouseCollector), document.attachEvent("keypress", this.a.keyboardCollector);
                else
                    throw new sjcl.exception.bug("can't attach event");
                this.D = !0;
            }
        }, stopCollectors: function () {
            this.D && (window.removeEventListener ? (window.removeEventListener("load", this.a.loadTimeCollector, !1), window.removeEventListener("mousemove", this.a.mouseCollector, !1), window.removeEventListener("keypress", this.a.keyboardCollector, !1), window.removeEventListener("devicemotion", this.a.accelerometerCollector, !1), window.removeEventListener("touchmove", this.a.touchCollector, !1)) : document.detachEvent && (document.detachEvent("onload", this.a.loadTimeCollector), document.detachEvent("onmousemove", this.a.mouseCollector), document.detachEvent("keypress", this.a.keyboardCollector)), this.D = !1);
        }, addEventListener: function (a, b) { this.K[a][this.ga++] = b; }, removeEventListener: function (a, b) { var c, d, e = this.K[a], f = []; for (d in e)
            e.hasOwnProperty(d) && e[d] === b && f.push(d); for (c = 0; c < f.length; c++)
            d = f[c], delete e[d]; }, la: function () { C(this, 1); }, oa: function (a) { var b, c; try {
            b = a.x || a.clientX || a.offsetX || 0, c = a.y || a.clientY || a.offsetY || 0;
        }
        catch (d) {
            c = b = 0;
        } 0 != b && 0 != c && this.addEntropy([b, c], 2, "mouse"); C(this, 0); }, qa: function (a) {
            a =
                a.touches[0] || a.changedTouches[0];
            this.addEntropy([a.pageX || a.clientX, a.pageY || a.clientY], 1, "touch");
            C(this, 0);
        }, ma: function () { C(this, 2); }, ea: function (a) { a = a.accelerationIncludingGravity.x || a.accelerationIncludingGravity.y || a.accelerationIncludingGravity.z; if (window.orientation) {
            var b = window.orientation;
            "number" === typeof b && this.addEntropy(b, 1, "accelerometer");
        } a && this.addEntropy(a, 2, "accelerometer"); C(this, 0); } };
    function A(a, b) { var c, d = sjcl.random.K[a], e = []; for (c in d)
        d.hasOwnProperty(c) && e.push(d[c]); for (c = 0; c < e.length; c++)
        e[c](b); }
    function C(a, b) { "undefined" !== typeof window && window.performance && "function" === typeof window.performance.now ? a.addEntropy(window.performance.now(), b, "loadtime") : a.addEntropy((new Date).valueOf(), b, "loadtime"); }
    function y(a) { a.b = z(a).concat(z(a)); a.L = new sjcl.cipher.aes(a.b); }
    function z(a) { for (var b = 0; 4 > b && (a.h[b] = a.h[b] + 1 | 0, !a.h[b]); b++)
        ; return a.L.encrypt(a.h); }
    function B(a, b) { return function () { b.apply(a, arguments); }; }
    sjcl.random = new sjcl.prng(6);
    a: try {
        var D, E, F, G;
        if (G = "undefined" !== typeof module && module.exports) {
            var H;
            try {
                H = require("crypto");
            }
            catch (a) {
                H = null;
            }
            G = E = H;
        }
        if (G && E.randomBytes)
            D = E.randomBytes(128), D = new Uint32Array((new Uint8Array(D)).buffer), sjcl.random.addEntropy(D, 1024, "crypto['randomBytes']");
        else if ("undefined" !== typeof window && "undefined" !== typeof Uint32Array) {
            F = new Uint32Array(32);
            if (window.crypto && window.crypto.getRandomValues)
                window.crypto.getRandomValues(F);
            else if (window.msCrypto && window.msCrypto.getRandomValues)
                window.msCrypto.getRandomValues(F);
            else
                break a;
            sjcl.random.addEntropy(F, 1024, "crypto['getRandomValues']");
        }
    }
    catch (a) {
        "undefined" !== typeof window && window.console && (console.log("There was an error collecting entropy from the browser:"), console.log(a));
    }
    sjcl.json = { defaults: { v: 1, iter: 1E4, ks: 128, ts: 64, mode: "ccm", adata: "", cipher: "aes" }, ja: function (a, b, c, d) {
            c = c || {};
            d = d || {};
            var e = sjcl.json, f = e.g({ iv: sjcl.random.randomWords(4, 0) }, e.defaults), g;
            e.g(f, c);
            c = f.adata;
            "string" === typeof f.salt && (f.salt = sjcl.codec.base64.toBits(f.salt));
            "string" === typeof f.iv && (f.iv = sjcl.codec.base64.toBits(f.iv));
            if (!sjcl.mode[f.mode] || !sjcl.cipher[f.cipher] || "string" === typeof a && 100 >= f.iter || 64 !== f.ts && 96 !== f.ts && 128 !== f.ts || 128 !== f.ks && 192 !== f.ks && 0x100 !== f.ks || 2 > f.iv.length ||
                4 < f.iv.length)
                throw new sjcl.exception.invalid("json encrypt: invalid parameters");
            "string" === typeof a ? (g = sjcl.misc.cachedPbkdf2(a, f), a = g.key.slice(0, f.ks / 32), f.salt = g.salt) : sjcl.ecc && a instanceof sjcl.ecc.elGamal.publicKey && (g = a.kem(), f.kemtag = g.tag, a = g.key.slice(0, f.ks / 32));
            "string" === typeof b && (b = sjcl.codec.utf8String.toBits(b));
            "string" === typeof c && (f.adata = c = sjcl.codec.utf8String.toBits(c));
            g = new sjcl.cipher[f.cipher](a);
            e.g(d, f);
            d.key = a;
            f.ct = "ccm" === f.mode && sjcl.arrayBuffer && sjcl.arrayBuffer.ccm &&
                b instanceof ArrayBuffer ? sjcl.arrayBuffer.ccm.encrypt(g, b, f.iv, c, f.ts) : sjcl.mode[f.mode].encrypt(g, b, f.iv, c, f.ts);
            return f;
        }, encrypt: function (a, b, c, d) { var e = sjcl.json, f = e.ja.apply(e, arguments); return e.encode(f); }, ia: function (a, b, c, d) {
            c = c || {};
            d = d || {};
            var e = sjcl.json;
            b = e.g(e.g(e.g({}, e.defaults), b), c, !0);
            var f, g;
            f = b.adata;
            "string" === typeof b.salt && (b.salt = sjcl.codec.base64.toBits(b.salt));
            "string" === typeof b.iv && (b.iv = sjcl.codec.base64.toBits(b.iv));
            if (!sjcl.mode[b.mode] || !sjcl.cipher[b.cipher] || "string" ===
                typeof a && 100 >= b.iter || 64 !== b.ts && 96 !== b.ts && 128 !== b.ts || 128 !== b.ks && 192 !== b.ks && 0x100 !== b.ks || !b.iv || 2 > b.iv.length || 4 < b.iv.length)
                throw new sjcl.exception.invalid("json decrypt: invalid parameters");
            "string" === typeof a ? (g = sjcl.misc.cachedPbkdf2(a, b), a = g.key.slice(0, b.ks / 32), b.salt = g.salt) : sjcl.ecc && a instanceof sjcl.ecc.elGamal.secretKey && (a = a.unkem(sjcl.codec.base64.toBits(b.kemtag)).slice(0, b.ks / 32));
            "string" === typeof f && (f = sjcl.codec.utf8String.toBits(f));
            g = new sjcl.cipher[b.cipher](a);
            f = "ccm" ===
                b.mode && sjcl.arrayBuffer && sjcl.arrayBuffer.ccm && b.ct instanceof ArrayBuffer ? sjcl.arrayBuffer.ccm.decrypt(g, b.ct, b.iv, b.tag, f, b.ts) : sjcl.mode[b.mode].decrypt(g, b.ct, b.iv, f, b.ts);
            e.g(d, b);
            d.key = a;
            return 1 === c.raw ? f : sjcl.codec.utf8String.fromBits(f);
        }, decrypt: function (a, b, c, d) { var e = sjcl.json; return e.ia(a, e.decode(b), c, d); }, encode: function (a) {
            var b, c = "{", d = "";
            for (b in a)
                if (a.hasOwnProperty(b)) {
                    if (!b.match(/^[a-z0-9]+$/i))
                        throw new sjcl.exception.invalid("json encode: invalid property name");
                    c += d + '"' +
                        b + '":';
                    d = ",";
                    switch (typeof a[b]) {
                        case "number":
                        case "boolean":
                            c += a[b];
                            break;
                        case "string":
                            c += '"' + escape(a[b]) + '"';
                            break;
                        case "object":
                            c += '"' + sjcl.codec.base64.fromBits(a[b], 0) + '"';
                            break;
                        default: throw new sjcl.exception.bug("json encode: unsupported type");
                    }
                }
            return c + "}";
        }, decode: function (a) {
            a = a.replace(/\s/g, "");
            if (!a.match(/^\{.*\}$/))
                throw new sjcl.exception.invalid("json decode: this isn't json!");
            a = a.replace(/^\{|\}$/g, "").split(/,/);
            var b = {}, c, d;
            for (c = 0; c < a.length; c++) {
                if (!(d = a[c].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i)))
                    throw new sjcl.exception.invalid("json decode: this isn't json!");
                null != d[3] ? b[d[2]] = parseInt(d[3], 10) : null != d[4] ? b[d[2]] = d[2].match(/^(ct|adata|salt|iv)$/) ? sjcl.codec.base64.toBits(d[4]) : unescape(d[4]) : null != d[5] && (b[d[2]] = "true" === d[5]);
            }
            return b;
        }, g: function (a, b, c) { void 0 === a && (a = {}); if (void 0 === b)
            return a; for (var d in b)
            if (b.hasOwnProperty(d)) {
                if (c && void 0 !== a[d] && a[d] !== b[d])
                    throw new sjcl.exception.invalid("required parameter overridden");
                a[d] = b[d];
            } return a; }, sa: function (a, b) { var c = {}, d; for (d in a)
            a.hasOwnProperty(d) && a[d] !== b[d] && (c[d] = a[d]); return c; }, ra: function (a, b) { var c = {}, d; for (d = 0; d < b.length; d++)
            void 0 !== a[b[d]] && (c[b[d]] = a[b[d]]); return c; } };
    sjcl.encrypt = sjcl.json.encrypt;
    sjcl.decrypt = sjcl.json.decrypt;
    sjcl.misc.pa = {};
    sjcl.misc.cachedPbkdf2 = function (a, b) { var c = sjcl.misc.pa, d; b = b || {}; d = b.iter || 1E3; c = c[a] = c[a] || {}; d = c[d] = c[d] || { firstSalt: b.salt && b.salt.length ? b.salt.slice(0) : sjcl.random.randomWords(2, 0) }; c = void 0 === b.salt ? d.firstSalt : b.salt; d[c] = d[c] || sjcl.misc.pbkdf2(a, c, b.iter); return { key: d[c].slice(0), salt: c.slice(0) }; };
    "undefined" !== typeof module && module.exports && (module.exports = sjcl);
    "function" === typeof define && define([], function () { return sjcl; });
    // Verify presence of password.
    if (!password)
        throw 'Missing password.';
    // Store password.
    this.password = password;
    // Retrieve initialization values.
    var group = group || 1024;
    var initVal = this.initVals[group];
    // Set N and g from initialization values.
    this.N = new bigInt(initVal.N, 16);
    this.g = new bigInt(initVal.g, 16);
    // Convenience big integer objects for 1 and 2.
    this.one = new bigInt("1", 16);
    this.two = new bigInt("2", 16);
};
/*
 * Implementation of an PAK-DH client conforming
 * to the protocol described in RFC 5683.
 */
PAKDHClient.prototype = {
    // Generates Ra, A's random secret exponent.
    generategRa: function () {
        return this.modPow(this.random());
    },
    // Generates Rb, B's random secret exponent.
    generategRb: function () {
        return this.modPow(this.random());
    },
    // Calculates g ^ x mod N
    modPow: function (x) {
        if (!x)
            throw 'Missing parameter.';
        return this.g.modPow(x, this.N);
    },
    // X = H1(A|B|PW)*(g^Ra)
    calculateX: function (A, B, gRa) {
        if (!A || !B || !gRa)
            throw 'Missing parameters.';
        var str = A + B + this.password;
        return this.H1(str).multiply(gRa);
    },
    // Xab = Q / H1(A|B|PW)
    calculateXab: function (A, B, Q) {
        if (!A || !B || !Q)
            throw 'Missing parameter(s).';
        if (Q.toString() == '0')
            throw 'X should not be equal to 0.';
        var str = A + B + this.password;
        return Q.divide(this.H1(str));
    },
    // Y = H2(A|B|PW)*(g^Rb)
    calculateY: function (A, B, gRb) {
        if (!A || !B || !gRb)
            throw 'Missing parameter(s).';
        var str = A + B + this.password;
        var Y = this.H2(str).multiply(gRb);
        if (Y.toString() == '0')
            throw 'Y should not be equal to 0.';
        return Y;
    },
    // Yba = Y / H2(A|B|PW)
    calculateYba: function (A, B, Y) {
        if (!A || !B || !Y)
            throw 'Missing parameter(s).';
        //var Y = this.calculateY(A, B, gRb);
        var str = A + B + this.password;
        return Y.divide(this.H2(str));
    },
    // S1 = H3(A|B|PW|Xab|g^Rb|(Xab)^Rb)
    calculateS1: function (A, B, gRa, gRb) {
        if (!A || !B || !gRa || !gRb)
            throw 'Missing parameter(s).';
        var AB = this.modPow(gRa.multiply(gRb));
        return this.H3(this.password +
            gRa.toString(16) +
            gRb.toString(16) +
            AB.toString(16));
    },
    // S2 = H4(A|B|PW|g^Ra|Yba|(Yba)^Ra)
    calculateS2: function (A, B, gRa, gRb) {
        if (!A || !B || !gRa || !gRb)
            throw 'Missing parameter(s).';
        var AB = this.modPow(gRa.multiply(gRb));
        return this.H4(A + B +
            this.password +
            gRa.toString(16) +
            gRb.toString(16) +
            AB.toString(16));
    },
    // K = H5(A|B|PW|g^Ra|Yba|(Yba)^Ra)
    calculateK: function (A, B, gRa, gRb) {
        if (!A || !B || !gRa || !gRb)
            throw 'Missing parameter(s).';
        var AB = this.modPow(gRa.multiply(gRb));
        return this.H5(A + B +
            this.password +
            gRa.toString(16) +
            gRb.toString(16) +
            AB.toString(16));
    },
    /*
     * Helper functions for random number
     * generation and format conversion.
     */
    // Generate a 384-bit random exponent.
    random: function () {
        var words = sjcl.random.randomWords(12, 0);
        var hex = sjcl.codec.hex.fromBits(words);
        if (hex.length * 4 != 384)
            throw 'Invalid random exponent size.';
        return new bigInt(hex, 16);
    },
    /*
     * Hashing and random functions.
     *
     * See Bellare, M. and P. Rogaway, "Random
     * Oracles are Practical: A Paradigm for
     * Designing Efficient Protocols", 1998.
     */
    H1: function (string) {
        return this.HA(string, 1);
    },
    H2: function (string) {
        return this.HA(string, 2);
    },
    // SHA-1(t|1|z) mod 2^128 |...|
    // SHA-1(t|9|z) mod 2^128
    HA: function (string, type) {
        var hash = '';
        for (var i = 1; i < 10; i++) {
            var tmp = sjcl.hash.sha256.hash(type.toString() + i.toString() + string);
            var lsB = this.lsb128(tmp);
            hash += sjcl.codec.hex.fromBits(lsB);
        }
        // Verify hash is 1152 bits.
        if (hash.length * 4 != 1152)
            throw 'Invalid hash size.';
        return new bigInt(hash, 16);
    },
    H3: function (string) {
        return this.HB(string, 3);
    },
    H4: function (string) {
        return this.HB(string, 4);
    },
    H5: function (string) {
        return this.HB(string, 5);
    },
    // SHA-1(t|len(z)|z|z) mod 2^128
    HB: function (string, type) {
        var type = type.toString();
        var len = string.length.toString();
        var tmp = sjcl.hash.sha256.hash(type + len + string + string);
        var lsB = this.lsb128(tmp);
        return new bigInt(lsB, 256);
    },
    // Return the 128 least significant bits of a
    // SHA-256 hash represented as an array of 8
    // 32-bit integers (i.e. the 4 left elements).
    lsb128: function (tmp) {
        return tmp.splice(tmp.length / 2, tmp.length);
    },
    /*
     * Initialization values for g and p used in this protocol.
     *
     * For the moment, only a 1024-bit official value is publisherd;
     * however, a larger prime (e.g., 2048 bits long, or even larger)
     * will definitely provide better protection.
     *
     * See TIA, "Over-the-Air Service Provisioning of Mobile
     * Stations in Spread Spectrum Systems", TIA-683-D, 2006.
     */
    initVals: {
        1024: {
            N: 'FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E08' +
                '8A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B' +
                '302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9' +
                'A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE6' +
                '49286651ECE65381FFFFFFFFFFFFFFFF',
            g: '13'
        }
    }
};

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var particle;
(function (particle) {
    var Particle = (function () {
        function Particle() {
            this.matrix = new egret.Matrix();
            this.reset();
        }
        Particle.prototype.reset = function () {
            this.x = 0;
            this.y = 0;
            this.scale = 1;
            this.rotation = 0;
            this.alpha = 1;
            this.currentTime = 0;
            this.totalTime = 1000;
        };
        Particle.prototype.$getMatrix = function (regX, regY) {
            var matrix = this.matrix;
            matrix.identity();
            if (this.rotation % 360) {
                var r = this.rotation;
                var cos = egret.NumberUtils.cos(r);
                var sin = egret.NumberUtils.sin(r);
            }
            else {
                cos = 1;
                sin = 0;
            }
            matrix.append(cos * this.scale, sin * this.scale, -sin * this.scale, cos * this.scale, this.x, this.y);
            if (regX || regY) {
                matrix.tx -= regX * matrix.a + regY * matrix.c;
                matrix.ty -= regX * matrix.b + regY * matrix.d;
            }
            return matrix;
        };
        return Particle;
    }());
    particle.Particle = Particle;
    __reflect(Particle.prototype, "particle.Particle");
})(particle || (particle = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var particle;
(function (particle_1) {
    var ParticleSystem = (function (_super) {
        __extends(ParticleSystem, _super);
        function ParticleSystem(texture, emissionRate) {
            var _this = _super.call(this) || this;
            _this._pool = [];
            _this.frameTime = 0;
            _this.particles = [];
            _this._emitterX = 0;
            _this._emitterY = 0;
            /**
             * 表示粒子出现总时间，单位毫秒，取值范围(0,Number.MAX_VALUE]，-1表示无限时间
             * @member {number} particle.ParticleSystem#emissionTime
             * @default -1
             */
            _this.emissionTime = -1;
            /**
             * 表示粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#maxParticles
             * @default 200
             */
            _this.maxParticles = 200;
            /**
             * 当前粒子数
             * @member {number} particle.ParticleSystem#numParticles
             */
            _this.numParticles = 0;
            /**
             * 表示粒子类，如果设置创建粒子时将创建该类
             * @member {number} particle.ParticleSystem#particleClass
             */
            _this.particleClass = null;
            _this.particleMeasureRect = new egret.Rectangle();
            _this.transformForMeasure = new egret.Matrix();
            _this.bitmapNodeList = [];
            _this.emissionRate = emissionRate;
            _this.texture = texture;
            _this.$renderNode = new egret.sys.GroupNode();
            //不清除绘制数据
            _this.$renderNode.cleanBeforeRender = function () { };
            return _this;
        }
        ParticleSystem.prototype.getParticle = function () {
            var result;
            if (this._pool.length) {
                result = this._pool.pop();
            }
            else if (this.particleClass) {
                result = new this.particleClass();
            }
            else {
                result = new particle_1.Particle();
            }
            return result;
        };
        ParticleSystem.prototype.removeParticle = function (particle) {
            var index = this.particles.indexOf(particle);
            if (index != -1) {
                particle.reset();
                this.particles.splice(index, 1);
                this._pool.push(particle);
                this.numParticles--;
                if (this.bitmapNodeList.length > this.numParticles) {
                    this.bitmapNodeList.length = this.numParticles;
                    this.$renderNode.drawData.length = this.numParticles;
                }
                return true;
            }
            else {
                return false;
            }
        };
        ParticleSystem.prototype.initParticle = function (particle) {
            particle.x = this.emitterX;
            particle.y = this.emitterY;
            particle.currentTime = 0;
            particle.totalTime = 1000;
        };
        /**
         * 更新当前显示对象坐标系下的边框界限
         * @param emitterRect {egret.Rectangle} 相对发射点坐标系下的界限
         */
        ParticleSystem.prototype.updateRelativeBounds = function (emitterRect) {
            if (emitterRect) {
                if (this.relativeContentBounds == null) {
                    this.relativeContentBounds = new egret.Rectangle();
                }
                this.relativeContentBounds.copyFrom(emitterRect);
                this.relativeContentBounds.x += this.emitterX;
                this.relativeContentBounds.y += this.emitterY;
            }
            else {
                this.relativeContentBounds = null;
            }
            this.mask = this.relativeContentBounds;
        };
        Object.defineProperty(ParticleSystem.prototype, "emitterBounds", {
            get: function () {
                return this._emitterBounds;
            },
            /**
             * 表示当前粒子系统中发射粒子的渲染边界范围，使用以发射点为基准的坐标系
             * @member {egret.Rectangle} particle.ParticleSystem#emitterBounds
             */
            set: function (rect) {
                this._emitterBounds = rect;
                this.updateRelativeBounds(rect);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "emitterX", {
            get: function () {
                return this._emitterX;
            },
            /**
             * 表示粒子出现点X坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#emitterX
             * @default 0
             */
            set: function (value) {
                this._emitterX = value;
                this.updateRelativeBounds(this.emitterBounds);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "emitterY", {
            get: function () {
                return this._emitterY;
            },
            /**
             * 表示粒子出现点Y坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#emitterY
             * @default 0
             */
            set: function (value) {
                this._emitterY = value;
                this.updateRelativeBounds(this.emitterBounds);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 开始创建粒子
         * @param duration {number} 粒子出现总时间
         */
        ParticleSystem.prototype.start = function (duration) {
            if (duration === void 0) { duration = -1; }
            if (this.emissionRate != 0) {
                this.emissionTime = duration;
                this.timeStamp = egret.getTimer();
                egret.startTick(this.update, this);
            }
        };
        /**
         * 停止创建粒子
         * @param clear {boolean} 是否清除掉现有粒子
         */
        ParticleSystem.prototype.stop = function (clear) {
            if (clear === void 0) { clear = false; }
            this.emissionTime = 0;
            if (clear) {
                this.clear();
                egret.stopTick(this.update, this);
            }
        };
        ParticleSystem.prototype.update = function (timeStamp) {
            var dt = timeStamp - this.timeStamp;
            this.timeStamp = timeStamp;
            //粒子数很少的时候可能会错过添加粒子的时机
            if (this.emissionTime == -1 || this.emissionTime > 0) {
                this.frameTime += dt;
                while (this.frameTime > 0) {
                    if (this.numParticles < this.maxParticles) {
                        this.addOneParticle();
                    }
                    this.frameTime -= this.emissionRate;
                }
                if (this.emissionTime != -1) {
                    this.emissionTime -= dt;
                    if (this.emissionTime < 0) {
                        this.emissionTime = 0;
                    }
                }
            }
            var particle;
            var particleIndex = 0;
            while (particleIndex < this.numParticles) {
                particle = this.particles[particleIndex];
                if (particle.currentTime < particle.totalTime) {
                    this.advanceParticle(particle, dt);
                    particle.currentTime += dt;
                    particleIndex++;
                }
                else {
                    this.removeParticle(particle);
                }
            }
            this.$invalidateContentBounds();
            if (this.numParticles == 0 && this.emissionTime == 0) {
                egret.stopTick(this.update, this);
                this.dispatchEventWith(egret.Event.COMPLETE);
            }
            return false;
        };
        ParticleSystem.prototype.$measureContentBounds = function (bounds) {
            //如果设置了固定的区域边界则直接使用这个边界，否则进行自动的内容边界测量
            if (this.relativeContentBounds) {
                bounds.copyFrom(this.relativeContentBounds);
                return;
            }
            if (this.numParticles > 0) {
                var texture = this.texture;
                var textureW = Math.round(texture.$getScaleBitmapWidth());
                var textureH = Math.round(texture.$getScaleBitmapHeight());
                var totalRect = egret.Rectangle.create();
                var particle;
                for (var i = 0; i < this.numParticles; i++) {
                    particle = this.particles[i];
                    this.transformForMeasure.identity();
                    this.appendTransform(this.transformForMeasure, particle.x, particle.y, particle.scale, particle.scale, particle.rotation, 0, 0, textureW / 2, textureH / 2);
                    this.particleMeasureRect.setEmpty();
                    this.particleMeasureRect.width = textureW;
                    this.particleMeasureRect.height = textureH;
                    var tmpRegion = egret.sys.Region.create();
                    tmpRegion.updateRegion(this.particleMeasureRect, this.transformForMeasure);
                    if (i == 0) {
                        totalRect.setTo(tmpRegion.minX, tmpRegion.minY, tmpRegion.maxX - tmpRegion.minX, tmpRegion.maxY - tmpRegion.minY);
                    }
                    else {
                        var l = Math.min(totalRect.x, tmpRegion.minX);
                        var t = Math.min(totalRect.y, tmpRegion.minY);
                        var r = Math.max(totalRect.right, tmpRegion.maxX);
                        var b = Math.max(totalRect.bottom, tmpRegion.maxY);
                        totalRect.setTo(l, t, r - l, b - t);
                    }
                    egret.sys.Region.release(tmpRegion);
                }
                //console.log(totalRect.x + "," + totalRect.y + "," + totalRect.width + "," + totalRect.height);
                this.lastRect = totalRect;
                bounds.setTo(totalRect.x, totalRect.y, totalRect.width, totalRect.height);
                egret.Rectangle.release(totalRect);
            }
            else {
                if (this.lastRect) {
                    totalRect = this.lastRect;
                    bounds.setTo(totalRect.x, totalRect.y, totalRect.width, totalRect.height);
                    egret.Rectangle.release(totalRect);
                    this.lastRect = null;
                }
            }
        };
        ParticleSystem.prototype.setCurrentParticles = function (num) {
            for (var i = this.numParticles; i < num && this.numParticles < this.maxParticles; i++) {
                this.addOneParticle();
            }
        };
        /**
         * 更换粒子纹理
         * @param texture {egret.Texture} 新的纹理
         */
        ParticleSystem.prototype.changeTexture = function (texture) {
            if (this.texture != texture) {
                this.texture = texture;
                //todo 这里可以优化
                this.bitmapNodeList.length = 0;
                this.$renderNode.drawData.length = 0;
            }
        };
        ParticleSystem.prototype.clear = function () {
            while (this.particles.length) {
                this.removeParticle(this.particles[0]);
            }
            this.numParticles = 0;
            this.$renderNode.drawData.length = 0;
            this.bitmapNodeList.length = 0;
            this.$invalidateContentBounds();
        };
        ParticleSystem.prototype.addOneParticle = function () {
            //todo 这里可能需要返回成功与否
            var particle = this.getParticle();
            this.initParticle(particle);
            if (particle.totalTime > 0) {
                this.particles.push(particle);
                this.numParticles++;
            }
        };
        ParticleSystem.prototype.advanceParticle = function (particle, dt) {
            particle.y -= dt / 6;
        };
        ParticleSystem.prototype.$render = function () {
            if (this.numParticles > 0) {
                //todo 考虑不同粒子使用不同的texture，或者使用egret.SpriteSheet
                var texture = this.texture;
                var textureW = Math.round(texture.$getScaleBitmapWidth());
                var textureH = Math.round(texture.$getScaleBitmapHeight());
                var offsetX = texture._offsetX;
                var offsetY = texture._offsetY;
                var bitmapX = texture._bitmapX;
                var bitmapY = texture._bitmapY;
                var bitmapWidth = texture._bitmapWidth;
                var bitmapHeight = texture._bitmapHeight;
                var particle;
                for (var i = 0; i < this.numParticles; i++) {
                    particle = this.particles[i];
                    var setAlphaNode;
                    var bitmapNode;
                    if (!this.bitmapNodeList[i]) {
                        bitmapNode = new egret.sys.BitmapNode();
                        this.bitmapNodeList[i] = bitmapNode;
                        this.$renderNode.addNode(this.bitmapNodeList[i]);
                        bitmapNode.image = texture._bitmapData;
                        bitmapNode.imageWidth = texture._sourceWidth;
                        bitmapNode.imageHeight = texture._sourceHeight;
                        bitmapNode.drawImage(bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureW, textureH);
                    }
                    bitmapNode = this.bitmapNodeList[i];
                    bitmapNode.matrix = particle.$getMatrix(textureW / 2, textureH / 2);
                    bitmapNode.blendMode = particle.blendMode;
                    bitmapNode.alpha = particle.alpha;
                }
            }
        };
        ParticleSystem.prototype.appendTransform = function (matrix, x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
            if (rotation % 360) {
                var r = rotation; // * Matrix.DEG_TO_RAD;
                var cos = egret.NumberUtils.cos(r);
                var sin = egret.NumberUtils.sin(r);
            }
            else {
                cos = 1;
                sin = 0;
            }
            if (skewX || skewY) {
                // TODO: can this be combined into a single append?
                //                skewX *= Matrix.DEG_TO_RAD;
                //                skewY *= Matrix.DEG_TO_RAD;
                matrix.append(egret.NumberUtils.cos(skewY), egret.NumberUtils.sin(skewY), -egret.NumberUtils.sin(skewX), egret.NumberUtils.cos(skewX), x, y);
                matrix.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
            }
            else {
                matrix.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
            }
            if (regX || regY) {
                // prepend the registration offset:
                matrix.tx -= regX * matrix.a + regY * matrix.c;
                matrix.ty -= regX * matrix.b + regY * matrix.d;
            }
            return matrix;
        };
        return ParticleSystem;
    }(egret.DisplayObject));
    particle_1.ParticleSystem = ParticleSystem;
    __reflect(ParticleSystem.prototype, "particle.ParticleSystem");
})(particle || (particle = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var particle;
(function (particle) {
    var GravityParticle = (function (_super) {
        __extends(GravityParticle, _super);
        function GravityParticle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GravityParticle.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.startX = 0;
            this.startY = 0;
            this.velocityX = 0;
            this.velocityY = 0;
            this.radialAcceleration = 0;
            this.tangentialAcceleration = 0;
            this.rotationDelta = 0;
            this.scaleDelta = 0;
        };
        return GravityParticle;
    }(particle.Particle));
    particle.GravityParticle = GravityParticle;
    __reflect(GravityParticle.prototype, "particle.GravityParticle");
})(particle || (particle = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var particle;
(function (particle_2) {
    var GravityParticleSystem = (function (_super) {
        __extends(GravityParticleSystem, _super);
        function GravityParticleSystem(texture, config) {
            var _this = _super.call(this, texture, 200) || this;
            _this.parseConfig(config);
            _this.emissionRate = _this.lifespan / _this.maxParticles;
            _this.particleClass = particle_2.GravityParticle;
            return _this;
        }
        GravityParticleSystem.prototype.parseConfig = function (config) {
            this.emitterX = getValue(config.emitter.x);
            this.emitterY = getValue(config.emitter.y);
            this.emitterXVariance = getValue(config.emitterVariance.x);
            this.emitterYVariance = getValue(config.emitterVariance.y);
            this.gravityX = getValue(config.gravity.x);
            this.gravityY = getValue(config.gravity.y);
            if (config.useEmitterRect == true) {
                var bounds = new egret.Rectangle();
                bounds.x = getValue(config.emitterRect.x);
                bounds.y = getValue(config.emitterRect.y);
                bounds.width = getValue(config.emitterRect.width);
                bounds.height = getValue(config.emitterRect.height);
                this.emitterBounds = bounds;
            }
            this.maxParticles = getValue(config.maxParticles);
            this.speed = getValue(config.speed);
            this.speedVariance = getValue(config.speedVariance);
            this.lifespan = Math.max(0.01, getValue(config.lifespan));
            this.lifespanVariance = getValue(config.lifespanVariance);
            this.emitAngle = getValue(config.emitAngle);
            this.emitAngleVariance = getValue(config.emitAngleVariance);
            this.startSize = getValue(config.startSize);
            this.startSizeVariance = getValue(config.startSizeVariance);
            this.endSize = getValue(config.endSize);
            this.endSizeVariance = getValue(config.endSizeVariance);
            this.startRotation = getValue(config.startRotation);
            this.startRotationVariance = getValue(config.startRotationVariance);
            this.endRotation = getValue(config.endRotation);
            this.endRotationVariance = getValue(config.endRotationVariance);
            this.radialAcceleration = getValue(config.radialAcceleration);
            this.radialAccelerationVariance = getValue(config.radialAccelerationVariance);
            this.tangentialAcceleration = getValue(config.tangentialAcceleration);
            this.tangentialAccelerationVariance = getValue(config.tangentialAccelerationVariance);
            this.startAlpha = getValue(config.startAlpha);
            this.startAlphaVariance = getValue(config.startAlphaVariance);
            this.endAlpha = getValue(config.endAlpha);
            this.endAlphaVariance = getValue(config.endAlphaVariance);
            this.particleBlendMode = config.blendMode;
            function getValue(value) {
                if (typeof value == "undefined") {
                    return 0;
                }
                return value;
            }
        };
        GravityParticleSystem.prototype.initParticle = function (particle) {
            var locParticle = particle;
            var lifespan = GravityParticleSystem.getValue(this.lifespan, this.lifespanVariance);
            locParticle.currentTime = 0;
            locParticle.totalTime = lifespan > 0 ? lifespan : 0;
            if (lifespan <= 0) {
                return;
            }
            locParticle.x = GravityParticleSystem.getValue(this.emitterX, this.emitterXVariance);
            locParticle.y = GravityParticleSystem.getValue(this.emitterY, this.emitterYVariance);
            locParticle.startX = this.emitterX;
            locParticle.startY = this.emitterY;
            var angle = GravityParticleSystem.getValue(this.emitAngle, this.emitAngleVariance);
            var speed = GravityParticleSystem.getValue(this.speed, this.speedVariance);
            locParticle.velocityX = speed * egret.NumberUtils.cos(angle);
            locParticle.velocityY = speed * egret.NumberUtils.sin(angle);
            locParticle.radialAcceleration = GravityParticleSystem.getValue(this.radialAcceleration, this.radialAccelerationVariance);
            locParticle.tangentialAcceleration = GravityParticleSystem.getValue(this.tangentialAcceleration, this.tangentialAccelerationVariance);
            var startSize = GravityParticleSystem.getValue(this.startSize, this.startSizeVariance);
            if (startSize < 0.1) {
                startSize = 0.1;
            }
            var endSize = GravityParticleSystem.getValue(this.endSize, this.endSizeVariance);
            if (endSize < 0.1) {
                endSize = 0.1;
            }
            var textureWidth = this.texture.textureWidth;
            locParticle.scale = startSize / textureWidth;
            locParticle.scaleDelta = ((endSize - startSize) / lifespan) / textureWidth;
            var startRotation = GravityParticleSystem.getValue(this.startRotation, this.startRotationVariance);
            var endRotation = GravityParticleSystem.getValue(this.endRotation, this.endRotationVariance);
            locParticle.rotation = startRotation;
            locParticle.rotationDelta = (endRotation - startRotation) / lifespan;
            var startAlpha = GravityParticleSystem.getValue(this.startAlpha, this.startAlphaVariance);
            var endAlpha = GravityParticleSystem.getValue(this.endAlpha, this.endAlphaVariance);
            locParticle.alpha = startAlpha;
            locParticle.alphaDelta = (endAlpha - startAlpha) / lifespan;
            locParticle.blendMode = this.particleBlendMode;
        };
        GravityParticleSystem.getValue = function (base, variance) {
            return base + variance * (Math.random() * 2 - 1);
        };
        GravityParticleSystem.prototype.advanceParticle = function (particle, dt) {
            var locParticle = particle;
            dt = dt / 1000;
            var restTime = locParticle.totalTime - locParticle.currentTime;
            dt = restTime > dt ? dt : restTime;
            locParticle.currentTime += dt;
            var distanceX = locParticle.x - locParticle.startX;
            var distanceY = locParticle.y - locParticle.startY;
            var distanceScalar = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (distanceScalar < 0.01) {
                distanceScalar = 0.01;
            }
            var radialX = distanceX / distanceScalar;
            var radialY = distanceY / distanceScalar;
            var tangentialX = radialX;
            var tangentialY = radialY;
            radialX *= locParticle.radialAcceleration;
            radialY *= locParticle.radialAcceleration;
            var temp = tangentialX;
            tangentialX = -tangentialY * locParticle.tangentialAcceleration;
            tangentialY = temp * locParticle.tangentialAcceleration;
            locParticle.velocityX += dt * (this.gravityX + radialX + tangentialX);
            locParticle.velocityY += dt * (this.gravityY + radialY + tangentialY);
            locParticle.x += locParticle.velocityX * dt;
            locParticle.y += locParticle.velocityY * dt;
            locParticle.scale += locParticle.scaleDelta * dt * 1000;
            if (locParticle.scale < 0) {
                locParticle.scale = 0;
            }
            locParticle.rotation += locParticle.rotationDelta * dt * 1000;
            locParticle.alpha += locParticle.alphaDelta * dt * 1000;
        };
        return GravityParticleSystem;
    }(particle_2.ParticleSystem));
    particle_2.GravityParticleSystem = GravityParticleSystem;
    __reflect(GravityParticleSystem.prototype, "particle.GravityParticleSystem");
})(particle || (particle = {}));

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
* A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
* Digest Algorithm, as defined in RFC 1321.
* Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
* Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
* Distributed under the BSD License
* See http://pajhome.org.uk/crypt/md5 for more info.
*/
/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var md5 = (function () {
    function md5() {
        this.hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
        this.b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
    }
    /*
     * These are the privates you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    md5.prototype.hex_md5 = function (s) { return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(s))); };
    md5.prototype.b64_md5 = function (s) { return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(s))); };
    md5.prototype.any_md5 = function (s, e) { return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(s)), e); };
    md5.prototype.hex_hmac_md5 = function (k, d) { return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); };
    md5.prototype.b64_hmac_md5 = function (k, d) { return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); };
    md5.prototype.any_hmac_md5 = function (k, d, e) { return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e); };
    /*
     * Perform a simple self-test to see if the VM is working
     */
    md5.prototype.md5_vm_test = function () {
        return this.hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
    };
    /*
     * Calculate the MD5 of a raw string
     */
    md5.prototype.rstr_md5 = function (s) {
        return this.binl2rstr(this.binl_md5(this.rstr2binl(s), s.length * 8));
    };
    /*
     * Calculate the HMAC-MD5, of a key and some data (raw strings)
     */
    md5.prototype.rstr_hmac_md5 = function (key, data) {
        var bkey = this.rstr2binl(key);
        if (bkey.length > 16)
            bkey = this.binl_md5(bkey, key.length * 8);
        var ipad = Array(16), opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        var hash = this.binl_md5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
        return this.binl2rstr(this.binl_md5(opad.concat(hash), 512 + 128));
    };
    /*
     * Convert a raw string to a hex string
     */
    md5.prototype.rstr2hex = function (input) {
        try {
            this.hexcase;
        }
        catch (e) {
            this.hexcase = 0;
        }
        var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var output = "";
        var x;
        for (var i = 0; i < input.length; i++) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F)
                + hex_tab.charAt(x & 0x0F);
        }
        return output;
    };
    /*
     * Convert a raw string to a base-64 string
     */
    md5.prototype.rstr2b64 = function (input) {
        try {
            this.b64pad;
        }
        catch (e) {
            this.b64pad = '';
        }
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var output = "";
        var len = input.length;
        for (var i = 0; i < len; i += 3) {
            var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
            for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > input.length * 8)
                    output += this.b64pad;
                else
                    output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
            }
        }
        return output;
    };
    /*
     * Convert a raw string to an arbitrary string encoding
     */
    md5.prototype.rstr2any = function (input, encoding) {
        var divisor = encoding.length;
        var i, j, q, x, quotient;
        /* Convert to an array of 16-bit big-endian values, forming the dividend */
        var dividend = Array(Math.ceil(input.length / 2));
        for (i = 0; i < dividend.length; i++) {
            dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
        }
        /*
         * Repeatedly perform a long division. The binary array forms the dividend,
         * the length of the encoding is the divisor. Once computed, the quotient
         * forms the dividend for the next step. All remainders are stored for later
         * use.
         */
        var full_length = Math.ceil(input.length * 8 /
            (Math.log(encoding.length) / Math.log(2)));
        var remainders = Array(full_length);
        for (j = 0; j < full_length; j++) {
            quotient = Array();
            x = 0;
            for (i = 0; i < dividend.length; i++) {
                x = (x << 16) + dividend[i];
                q = Math.floor(x / divisor);
                x -= q * divisor;
                if (quotient.length > 0 || q > 0)
                    quotient[quotient.length] = q;
            }
            remainders[j] = x;
            dividend = quotient;
        }
        /* Convert the remainders to the output string */
        var output = "";
        for (i = remainders.length - 1; i >= 0; i--)
            output += encoding.charAt(remainders[i]);
        return output;
    };
    /*
     * Encode a string as utf-8.
     * For efficiency, this assumes the input is valid utf-16.
     */
    md5.prototype.str2rstr_utf8 = function (input) {
        var output = "";
        var i = -1;
        var x, y;
        while (++i < input.length) {
            /* Decode utf-16 surrogate pairs */
            x = input.charCodeAt(i);
            y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
            if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                i++;
            }
            /* Encode output as utf-8 */
            if (x <= 0x7F)
                output += String.fromCharCode(x);
            else if (x <= 0x7FF)
                output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
            else if (x <= 0xFFFF)
                output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
            else if (x <= 0x1FFFFF)
                output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
        }
        return output;
    };
    /*
     * Encode a string as utf-16
     */
    md5.prototype.str2rstr_utf16le = function (input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
        return output;
    };
    md5.prototype.str2rstr_utf16be = function (input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
        return output;
    };
    /*
     * Convert a raw string to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    md5.prototype.rstr2binl = function (input) {
        var output = Array(input.length >> 2);
        for (var i = 0; i < output.length; i++)
            output[i] = 0;
        for (var i = 0; i < input.length * 8; i += 8)
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        return output;
    };
    /*
     * Convert an array of little-endian words to a string
     */
    md5.prototype.binl2rstr = function (input) {
        var output = "";
        for (var i = 0; i < input.length * 32; i += 8)
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        return output;
    };
    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    md5.prototype.binl_md5 = function (x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = this.safe_add(a, olda);
            b = this.safe_add(b, oldb);
            c = this.safe_add(c, oldc);
            d = this.safe_add(d, oldd);
        }
        return [a, b, c, d];
    };
    /*
     * These privates implement the four basic operations the algorithm uses.
     */
    md5.prototype.md5_cmn = function (q, a, b, x, s, t) {
        return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
    };
    md5.prototype.md5_ff = function (a, b, c, d, x, s, t) {
        return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    };
    md5.prototype.md5_gg = function (a, b, c, d, x, s, t) {
        return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    };
    md5.prototype.md5_hh = function (a, b, c, d, x, s, t) {
        return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
    };
    md5.prototype.md5_ii = function (a, b, c, d, x, s, t) {
        return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    };
    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    md5.prototype.safe_add = function (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    };
    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    md5.prototype.bit_rol = function (num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    };
    return md5;
}());
__reflect(md5.prototype, "md5");
