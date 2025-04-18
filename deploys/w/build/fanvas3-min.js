/*
 * Tencent is pleased to support the open source community by making Fanvas available.
 * Copyright (C) 2015 THL A29 Limited, a Tencent company. All rights reserved.
 *
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 * http://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing permissions and limitations under the
 * License.
 */

this.fanvas = this.fanvas || {};
(function () {
    var b = [];
    fanvas.imageList = {};
    fanvas.indexOf = function (f, d) {
        for (var e = 0, c = f.length; e < c; e++) {
            if (d === f[e]) {
                return e;
            }
        }
        return -1;
    };
    fanvas.indexOfCanvas = function (f, d) {
        for (var e = 0, c = f.length; e < c; e++) {
            if (f[e].canvas && d === f[e].canvas) {
                return e;
            }
        }
        return -1;
    };
    fanvas.play = function (f, d, e) {
        if (fanvas.indexOfCanvas(b, f) >= 0 || !d) {
            return;
        }
        var j = function () {
            var k = {
                canvas: f,
                config: e,
                frame: 0,
            };
            b.push(k);
            k.stage = new fanvas.Stage(f, d, e);
            var i = function (l) {
                k.stage.update(l);
                k.frame++;
                if (e.onFrame) {
                    e.onFrame(k.frame);
                }
                if (e.autoPlay == false) {
                    k.timer.pause();
                    e.autoPlay = true;
                }
            };
            k.timer = new fanvas.Timer(d.frameRate, i);
            k.timer.start();
            i(0);
        };
        e = e || {};
        var c = e.imagePath || "";
        if (d.images) {
            var h = [];
            for (var g = 0; g < d.images.length; g++) {
                h.push(c + d.images[g]);
            }
            new fanvas.Preloader().load(
                h,
                fanvas.imageList,
                j,
                e.onPreloadProgress,
                e.onPreloadError,
            );
        } else {
            j();
        }
    };
    fanvas.replay = function (d) {
        var c = fanvas.indexOfCanvas(b, d);
        if (c >= 0) {
            b[c].frame = 0;
            b[c].stage.replay();
            b[c].timer.resume();
        }
    };
    fanvas.pause = function (d) {
        var c = fanvas.indexOfCanvas(b, d);
        if (c >= 0) {
            b[c].timer.pause();
        }
    };
    fanvas.resume = function (d) {
        var c = fanvas.indexOfCanvas(b, d);
        if (c >= 0) {
            b[c].timer.resume();
        }
    };
    var a = function (f, e, h) {
        var g = fanvas.indexOfCanvas(b, f);
        if (g >= 0) {
            b[g].timer.pause();
            if (e < b[g].frame) {
                b[g].stage.replay();
                b[g].frame = 0;
            }
            var c = e - b[g].frame - 1;
            for (var d = 0; d < c; d++) {
                b[g].stage.update(0, true);
            }
            if (c >= 0) {
                b[g].stage.update(0, false);
            }
            b[g].frame = e;
            if (!h) {
                b[g].timer.resume();
            }
        }
    };
    fanvas.gotoAndPlay = function (d, c) {
        a(d, c);
    };
    fanvas.gotoAndStop = function (d, c) {
        a(d, c, true);
    };
})();
this.fanvas = this.fanvas || {};
(function () {
    var a = function (d, c) {
        this.initialize(d, c);
    };
    var b = a.prototype;
    b.interval = 16;
    b.onFrame = null;
    b.paused = false;
    b._stop = false;
    b.initialize = function (d, c) {
        if (d <= 0 || !c) {
            throw "err";
        }
        this.interval = Math.floor(1000 / d);
        this.onFrame = c;
    };
    window.requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    b.start = function () {
        var e = Date.now(),
            d = Date.now(),
            f = this;
        var c = function () {
            if (f.paused) {
                f._stop = true;
                return;
            }
            var h = Date.now();
            var i = h - e;
            var g = h - d;
            if (window.requestAnimationFrame) {
                requestAnimationFrame(c);
                if (i > f.interval) {
                    e = h - (i % f.interval);
                    d = h;
                    f.onFrame(g);
                }
            } else {
                setTimeout(c, f.interval);
                e = h;
                f.onFrame(i);
            }
        };
        c();
    };
    b.pause = function () {
        this.paused = true;
    };
    b.resume = function () {
        if (this.paused) {
            this.paused = false;
            if (this._stop) {
                this._stop = false;
                this.start();
            }
        }
    };
    fanvas.Timer = a;
})();
this.fanvas = this.fanvas || {};
(function () {
    var b = function (c) {
        this.initialize(c);
    };
    var a = b.prototype;
    a.ctx = null;
    a.maxFPS = 0;
    a.minFPS = 99;
    a.frameCount = 0;
    a.totalDelta = 0;
    a.fps = 0;
    a.initialize = function (c) {
        this.ctx = c;
    };
    a.update = function (e) {
        this.totalDelta += e;
        this.frameCount++;
        if (this.totalDelta > 1000) {
            var d = (this.fps = this.frameCount);
            this.frameCount = this.totalDelta = 0;
            if (d > this.maxFPS) {
                this.maxFPS = d;
            }
            if (d < this.minFPS) {
                this.minFPS = d;
            }
        }
        var c = this.ctx;
        c.beginPath();
        c.rect(0, 0, 48, 48);
        c.fillStyle = "#000";
        c.fill();
        c.fillStyle = "#FFFFFF";
        c.fillText("FPS: " + this.fps, 5, 13);
        c.fillText("Max: " + this.maxFPS, 5, 27);
        c.fillText("Min: " + this.minFPS, 5, 41);
    };
    fanvas.Stats = b;
})();
this.fanvas = this.fanvas || {};
(function () {
    var a = function () {
        this.initialize();
    };
    var b = a.prototype;
    b._taskCount = 0;
    b._finishCount = 0;
    b._callback = null;
    b.initialize = function () {};
    b.load = function (h, c, j, l, f) {
        if (h.length == 0) {
            j();
        }
        this._taskCount = h.length;
        this._finishCount = 0;
        var g = this;
        var k = false;
        for (var e = 0; e < h.length; e++) {
            var d = document.createElement("img");
            d.onload = function () {
                g._finishCount++;
                l && l(g._finishCount / g._taskCount);
                if (g._finishCount == g._taskCount) {
                    j();
                }
            };
            d.onerror = function () {
                if (!k && f) {
                    f();
                }
            };
            d.src = h[e] + "?max_age=604800";
            c[h[e]] = d;
        }
    };
    fanvas.Preloader = a;
})();
this.fanvas = this.fanvas || {};
(function () {
    var b = function (h, f, j, i, g, e) {
        this.initialize(h, f, j, i, g, e);
    };
    var a = b.prototype;
    b.identity = null;
    b.DEG_TO_RAD = Math.PI / 180;
    a.a = 1;
    a.b = 0;
    a.c = 0;
    a.d = 1;
    a.tx = 0;
    a.ty = 0;
    a.alpha = 1;
    a.shadow = null;
    a.compositeOperation = null;
    a.visible = true;
    a.initialize = function (h, f, j, i, g, e) {
        this.a = h == null ? 1 : h;
        this.b = f || 0;
        this.c = j || 0;
        this.d = i == null ? 1 : i;
        this.tx = g || 0;
        this.ty = e || 0;
        return this;
    };
    a.prepend = function (m, l, k, j, i, g) {
        var f = this.tx;
        if (m != 1 || l != 0 || k != 0 || j != 1) {
            var e = this.a;
            var h = this.c;
            this.a = e * m + this.b * k;
            this.b = e * l + this.b * j;
            this.c = h * m + this.d * k;
            this.d = h * l + this.d * j;
        }
        this.tx = f * m + this.ty * k + i;
        this.ty = f * l + this.ty * j + g;
        return this;
    };
    a.append = function (n, l, k, j, i, g) {
        var f = this.a;
        var m = this.b;
        var h = this.c;
        var e = this.d;
        this.a = n * f + l * h;
        this.b = n * m + l * e;
        this.c = k * f + j * h;
        this.d = k * m + j * e;
        this.tx = i * f + g * h + this.tx;
        this.ty = i * m + g * e + this.ty;
        return this;
    };
    a.prependMatrix = function (c) {
        this.prepend(c.a, c.b, c.c, c.d, c.tx, c.ty);
        this.prependProperties(
            c.alpha,
            c.shadow,
            c.compositeOperation,
            c.visible,
        );
        return this;
    };
    a.appendMatrix = function (c) {
        this.append(c.a, c.b, c.c, c.d, c.tx, c.ty);
        this.appendProperties(
            c.alpha,
            c.shadow,
            c.compositeOperation,
            c.visible,
        );
        return this;
    };
    a.prependTransform = function (i, g, l, k, n, j, h, e, d) {
        if (n % 360) {
            var c = n * b.DEG_TO_RAD;
            var m = Math.cos(c);
            var f = Math.sin(c);
        } else {
            m = 1;
            f = 0;
        }
        if (e || d) {
            this.tx -= e;
            this.ty -= d;
        }
        if (j || h) {
            j *= b.DEG_TO_RAD;
            h *= b.DEG_TO_RAD;
            this.prepend(m * l, f * l, -f * k, m * k, 0, 0);
            this.prepend(
                Math.cos(h),
                Math.sin(h),
                -Math.sin(j),
                Math.cos(j),
                i,
                g,
            );
        } else {
            this.prepend(m * l, f * l, -f * k, m * k, i, g);
        }
        return this;
    };
    a.appendTransform = function (i, g, l, k, n, j, h, e, d) {
        if (n % 360) {
            var c = n * b.DEG_TO_RAD;
            var m = Math.cos(c);
            var f = Math.sin(c);
        } else {
            m = 1;
            f = 0;
        }
        if (j || h) {
            j *= b.DEG_TO_RAD;
            h *= b.DEG_TO_RAD;
            this.append(
                Math.cos(h),
                Math.sin(h),
                -Math.sin(j),
                Math.cos(j),
                i,
                g,
            );
            this.append(m * l, f * l, -f * k, m * k, 0, 0);
        } else {
            this.append(m * l, f * l, -f * k, m * k, i, g);
        }
        if (e || d) {
            this.tx -= e * this.a + d * this.c;
            this.ty -= e * this.b + d * this.d;
        }
        return this;
    };
    a.rotate = function (h) {
        var g = Math.cos(h);
        var e = Math.sin(h);
        var d = this.a;
        var f = this.c;
        var c = this.tx;
        this.a = d * g - this.b * e;
        this.b = d * e + this.b * g;
        this.c = f * g - this.d * e;
        this.d = f * e + this.d * g;
        this.tx = c * g - this.ty * e;
        this.ty = c * e + this.ty * g;
        return this;
    };
    a.skew = function (d, c) {
        d = d * b.DEG_TO_RAD;
        c = c * b.DEG_TO_RAD;
        this.append(Math.cos(c), Math.sin(c), -Math.sin(d), Math.cos(d), 0, 0);
        return this;
    };
    a.scale = function (c, d) {
        this.a *= c;
        this.d *= d;
        this.c *= c;
        this.b *= d;
        this.tx *= c;
        this.ty *= d;
        return this;
    };
    a.translate = function (c, d) {
        this.tx += c;
        this.ty += d;
        return this;
    };
    a.identity = function () {
        this.alpha = this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
        this.shadow = this.compositeOperation = null;
        this.visible = true;
        return this;
    };
    a.invert = function () {
        var d = this.a;
        var e = this.b;
        var f = this.c;
        var g = this.d;
        var c = this.tx;
        var h = d * g - e * f;
        this.a = g / h;
        this.b = -e / h;
        this.c = -f / h;
        this.d = d / h;
        this.tx = (f * this.ty - g * c) / h;
        this.ty = -(d * this.ty - e * c) / h;
        return this;
    };
    a.appendProperties = function (d, f, c, e) {
        this.alpha *= d;
        this.shadow = f || this.shadow;
        this.compositeOperation = c || this.compositeOperation;
        this.visible = this.visible && e;
        return this;
    };
    a.prependProperties = function (d, f, c, e) {
        this.alpha *= d;
        this.shadow = this.shadow || f;
        this.compositeOperation = this.compositeOperation || c;
        this.visible = this.visible && e;
        return this;
    };
    b.identity = new b();
    fanvas.Matrix2D = b;
})();
this.fanvas = this.fanvas || {};
(function () {
    var a = function (d, f, e, c) {
        this.initialize(d, f, e, c);
    };
    var b = a.prototype;
    b.x = 0;
    b.y = 0;
    b.width = 0;
    b.height = 0;
    b.initialize = function (d, f, e, c) {
        this.x = d || 0;
        this.y = f || 0;
        this.width = e || 0;
        this.height = c || 0;
        return this;
    };
    fanvas.Rectangle = a;
})();
this.fanvas = this.fanvas || {};
(function () {
    var b = function (d, c, f, e) {
        this.initialize(d, c, f, e);
    };
    var a = b.prototype;
    a.color = null;
    a.offsetX = 0;
    a.offsetY = 0;
    a.blur = 0;
    a.initialize = function (d, c, f, e) {
        this.color = d;
        this.offsetX = c || 0;
        this.offsetY = f || 0;
        this.blur = e;
    };
    b.identity = new b("transparent", 0, 0, 0);
    fanvas.Shadow = b;
})();
this.fanvas = this.fanvas || {};
(function () {
    var a = function () {
        this.initialize();
    };
    var b = a.prototype;
    b.alpha = 1;
    b.cacheCanvas = null;
    b.name = null;
    b.parent = null;
    b.root = null;
    b.regX = 0;
    b.regY = 0;
    b.rotation = 0;
    b.scaleX = 1;
    b.scaleY = 1;
    b.skewX = 0;
    b.skewY = 0;
    b.shadow = null;
    b.visible = true;
    b.x = 0;
    b.y = 0;
    b.rect = null;
    b.initFrame = -1;
    b.compositeOperation = null;
    b.filters = null;
    b.mask = null;
    b.clipDepth = 0;
    b.maskDepth = 0;
    b._cacheOffsetX = 0;
    b._cacheOffsetY = 0;
    b._cacheScale = 1;
    b._matrix = null;
    b.globalMatrix = null;
    b.dirtyRect = null;
    b.initialize = function () {
        this._matrix = new fanvas.Matrix2D();
        this.globalMatrix = new fanvas.Matrix2D();
    };
    b.isVisible = function () {
        return !!(
            this.visible &&
            this.alpha > 0 &&
            this.scaleX != 0 &&
            this.scaleY != 0 &&
            !this.clipDepth
        );
    };
    b.drawFromCache = function (e) {
        var f = this.cacheCanvas;
        if (!f) {
            return false;
        }
        var h = this._cacheScale,
            d = this._cacheOffsetX,
            c = this._cacheOffsetY,
            g;
        if ((g = this._applyFilterBounds(d, c, 0, 0))) {
            d = g.x;
            c = g.y;
        }
        e.drawImage(f, d, c, f.width / h, f.height / h);
        return true;
    };
    b.update = function () {};
    b.calculateDirtyRect = function () {
        var e = this;
        if (e.parent) {
            e.globalMatrix = new fanvas.Matrix2D();
            e.globalMatrix
                .appendTransform(
                    e.x,
                    e.y,
                    e.scaleX,
                    e.scaleY,
                    e.rotation,
                    e.skewX,
                    e.skewY,
                    e.regX,
                    e.regY,
                )
                .prependMatrix(e.parent.globalMatrix);
        }
        var c = e.rect;
        var d = e._applyFilterBounds(c.x, c.y, c.width, c.height);
        this.dirtyRect = e._transformBounds(d || c, e.globalMatrix);
        return this.dirtyRect;
    };
    b.presetContext = function (f) {
        var g,
            e = this.mask,
            h = this;
        if (e && e.graphics && !e.graphics.isEmpty()) {
            g = e.getMatrix(e._matrix);
            f.transform(g.a, g.b, g.c, g.d, g.tx, g.ty);
            e.graphics.drawAsPath(f);
            f.clip();
            g.invert();
            f.transform(g.a, g.b, g.c, g.d, g.tx, g.ty);
        }
        g = h._matrix
            .identity()
            .appendTransform(
                h.x,
                h.y,
                h.scaleX,
                h.scaleY,
                h.rotation,
                h.skewX,
                h.skewY,
                h.regX,
                h.regY,
            );
        var d = Math.round(g.tx),
            c = Math.round(g.ty);
        f.transform(g.a, g.b, g.c, g.d, d, c);
        f.globalAlpha *= h.alpha;
        if (h.compositeOperation) {
            f.globalCompositeOperation = h.compositeOperation;
        }
        if (h.shadow) {
            this._applyShadow(f, h.shadow);
        }
    };
    b.cache = function (d, g, e, c, f) {
        f = f || 1;
        if (!this.cacheCanvas) {
            this.cacheCanvas = document.createElement("canvas");
        }
        this._cacheWidth = e;
        this._cacheHeight = c;
        this._cacheOffsetX = d;
        this._cacheOffsetY = g;
        this._cacheScale = f;
        this.updateCache();
    };
    b.updateCache = function (f) {
        var d = this.cacheCanvas,
            c = this._cacheScale,
            k = this._cacheOffsetX * c,
            j = this._cacheOffsetY * c;
        var i = this._cacheWidth,
            e = this._cacheHeight,
            g;
        if (!d) {
            return;
        }
        var l = d.getContext("2d");
        if ((g = this._applyFilterBounds(k, j, i, e))) {
            k = g.x;
            j = g.y;
            i = g.width;
            e = g.height;
        }
        i = Math.ceil(i * c);
        e = Math.ceil(e * c);
        if (i != d.width || e != d.height) {
            d.width = i;
            d.height = e;
        } else {
            if (!f) {
                l.clearRect(0, 0, i + 1, e + 1);
            }
        }
        l.save();
        l.globalCompositeOperation = f;
        l.setTransform(c, 0, 0, c, -k, -j);
        this.draw(l, true);
        this._applyFilters();
        l.restore();
    };
    b.uncache = function () {
        this.cacheCanvas = null;
        this._cacheOffsetX = this._cacheOffsetY = 0;
        this._cacheScale = 1;
    };
    b.setTransform = function (g, e, j, i, k, h, f, d, c) {
        this.x = g || 0;
        this.y = e || 0;
        this.scaleX = j != 0 && !j ? 1 : j;
        this.scaleY = i != 0 && !i ? 1 : i;
        this.rotation = k || 0;
        this.skewX = h || 0;
        this.skewY = f || 0;
        this.regX = d || 0;
        this.regY = c || 0;
    };
    b.getMatrix = function (c) {
        var d = this;
        return (c ? c.identity() : new fanvas.Matrix2D())
            .appendTransform(
                d.x,
                d.y,
                d.scaleX,
                d.scaleY,
                d.rotation,
                d.skewX,
                d.skewY,
                d.regX,
                d.regY,
            )
            .appendProperties(d.alpha, d.shadow, d.compositeOperation);
    };
    b._applyShadow = function (c, d) {
        d = d || Shadow.identity;
        c.shadowColor = d.color;
        c.shadowOffsetX = d.offsetX;
        c.shadowOffsetY = d.offsetY;
        c.shadowBlur = d.blur;
    };
    b._applyFilters = function () {
        if (!this.filters || this.filters.length == 0 || !this.cacheCanvas) {
            return;
        }
        var e = this.filters.length;
        var d = this.cacheCanvas.getContext("2d");
        var c = this.cacheCanvas.width;
        var g = this.cacheCanvas.height;
        for (var f = 0; f < e; f++) {
            this.filters[f].applyFilter(d, 0, 0, c, g);
        }
    };
    b._applyFilterBounds = function (n, m, d, o) {
        var c,
            g,
            e = this.filters;
        if (!e || !(g = e.length)) {
            return null;
        }
        for (var h = 0; h < g; h++) {
            var j = this.filters[h];
            var k = j.getBounds && j.getBounds();
            if (!k) {
                continue;
            }
            if (!c) {
                c = new fanvas.Rectangle(n, m, d, o);
            }
            c.x += k.x;
            c.y += k.y;
            c.width += k.width;
            c.height += k.height;
        }
        return c;
    };
    b._transformBounds = function (d, n) {
        var o = d.x,
            l = d.y,
            f = d.width,
            r = d.height;
        var g = new fanvas.Matrix2D();
        g.appendMatrix(n);
        if (o || l) {
            g.append(1, 0, 0, 1, o, l);
        }
        var p = f * g.a,
            m = f * g.b;
        var s = r * g.c,
            q = r * g.d;
        var k = g.tx,
            j = g.ty;
        var i = k,
            e = k,
            h = j,
            c = j;
        if ((o = p + k) < i) {
            i = o;
        } else {
            if (o > e) {
                e = o;
            }
        }
        if ((o = p + s + k) < i) {
            i = o;
        } else {
            if (o > e) {
                e = o;
            }
        }
        if ((o = s + k) < i) {
            i = o;
        } else {
            if (o > e) {
                e = o;
            }
        }
        if ((l = m + j) < h) {
            h = l;
        } else {
            if (l > c) {
                c = l;
            }
        }
        if ((l = m + q + j) < h) {
            h = l;
        } else {
            if (l > c) {
                c = l;
            }
        }
        if ((l = q + j) < h) {
            h = l;
        } else {
            if (l > c) {
                c = l;
            }
        }
        return new fanvas.Rectangle(
            Math.round(i),
            Math.round(h),
            Math.round(e - i),
            Math.round(c - h),
        );
    };
    fanvas.DisplayObject = a;
})();
this.fanvas = this.fanvas || {};
(function () {
    function d(g, i, h) {
        this.f = g;
        this.params = i;
        this.isPath = Boolean(h);
    }
    d.prototype.exec = function (f) {
        this.f.apply(f, this.params);
    };
    var c = function (f) {
        this.initialize(f);
    };
    var e = c.prototype;
    c.BASE_64 = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
        F: 5,
        G: 6,
        H: 7,
        I: 8,
        J: 9,
        K: 10,
        L: 11,
        M: 12,
        N: 13,
        O: 14,
        P: 15,
        Q: 16,
        R: 17,
        S: 18,
        T: 19,
        U: 20,
        V: 21,
        W: 22,
        X: 23,
        Y: 24,
        Z: 25,
        a: 26,
        b: 27,
        c: 28,
        d: 29,
        e: 30,
        f: 31,
        g: 32,
        h: 33,
        i: 34,
        j: 35,
        k: 36,
        l: 37,
        m: 38,
        n: 39,
        o: 40,
        p: 41,
        q: 42,
        r: 43,
        s: 44,
        t: 45,
        u: 46,
        v: 47,
        w: 48,
        x: 49,
        y: 50,
        z: 51,
        0: 52,
        1: 53,
        2: 54,
        3: 55,
        4: 56,
        5: 57,
        6: 58,
        7: 59,
        8: 60,
        9: 61,
        "+": 62,
        "/": 63,
    };
    var b = document.createElement("canvas");
    if (b.getContext) {
        var a = (c._ctx = b.getContext("2d"));
        c.beginCmd = new d(a.beginPath, []);
        c.fillCmd = new d(a.fill, ["evenodd"]);
        c.strokeCmd = new d(a.stroke, []);
        b.width = b.height = 1;
    }
    e._imagePath = null;
    e._strokeInstructions = null;
    e._strokeStyleInstructions = null;
    e._fillInstructions = null;
    e._fillMatrix = null;
    e._instructions = null;
    e._activeInstructions = null;
    e._active = false;
    e._dirty = false;
    e.initialize = function (f) {
        this.clear();
        this._ctx = c._ctx;
        this._imagePath = f;
    };
    e.isEmpty = function () {
        return !(this._instructions.length || this._activeInstructions.length);
    };
    e.draw = function (h) {
        if (this._dirty) {
            this._updateInstructions();
        }
        var g = this._instructions;
        for (var j = 0, f = g.length; j < f; j++) {
            g[j].exec(h);
        }
    };
    e.drawAsPath = function (h) {
        if (this._dirty) {
            this._updateInstructions();
        }
        var g,
            j = this._instructions;
        for (var k = 0, f = j.length; k < f; k++) {
            if ((g = j[k]).isPath || k == 0) {
                g.exec(h);
            }
        }
    };
    e.moveTo = function (f, g) {
        this._activeInstructions.push(new d(this._ctx.moveTo, [f, g], true));
    };
    e.lineTo = function (f, g) {
        this._dirty = this._active = true;
        this._activeInstructions.push(new d(this._ctx.lineTo, [f, g], true));
    };
    e.quadraticCurveTo = function (h, g, f, i) {
        this._dirty = this._active = true;
        this._activeInstructions.push(
            new d(this._ctx.quadraticCurveTo, [h, g, f, i], true),
        );
    };
    e.bezierCurveTo = function (h, g, j, i, f, k) {
        this._dirty = this._active = true;
        this._activeInstructions.push(
            new d(this._ctx.bezierCurveTo, [h, g, j, i, f, k], true),
        );
    };
    e.closePath = function () {
        if (this._active) {
            this._dirty = true;
            this._activeInstructions.push(new d(this._ctx.closePath, [], true));
        }
    };
    e.clear = function () {
        this._instructions = [];
        this._activeInstructions = [];
        this._strokeStyleInstructions =
            this._strokeInstructions =
            this._fillInstructions =
            this._fillMatrix =
                null;
        this._active = this._dirty = false;
    };
    e.beginFill = function (f) {
        if (this._active) {
            this._newPath();
        }
        this._fillInstructions = f
            ? [new d(this._setProp, ["fillStyle", f])]
            : null;
        this._fillMatrix = null;
    };
    e.beginLinearGradientFill = function (f, n, j, q, g, p) {
        if (this._active) {
            this._newPath();
        }
        var h = this._ctx.createLinearGradient(j, q, g, p);
        for (var m = 0, k = f.length; m < k; m++) {
            h.addColorStop(n[m], f[m]);
        }
        this._fillInstructions = [new d(this._setProp, ["fillStyle", h])];
        this._fillMatrix = null;
    };
    e.beginRadialGradientFill = function (f, q, j, s, m, g, r, k) {
        if (this._active) {
            this._newPath();
        }
        var h = this._ctx.createRadialGradient(j, s, m, g, r, k);
        for (var p = 0, n = f.length; p < n; p++) {
            h.addColorStop(q[p], f[p]);
        }
        this._fillInstructions = [new d(this._setProp, ["fillStyle", h])];
        this._fillMatrix = null;
    };
    e.beginBitmapFill = function (g, f) {
        if (this._active) {
            this._newPath();
        }
        var h = fanvas.imageList[this._imagePath + g];
        var i = this._ctx.createPattern(h, "");
        this._fillInstructions = [
            new d(this._setProp, ["fillStyle", i], false),
        ];
        this._fillMatrix = f;
    };
    e.endFill = function () {
        this.beginFill();
    };
    e.setStrokeStyle = function (h, i, f, g) {
        if (this._active) {
            this._newPath();
        }
        this._strokeStyleInstructions = [
            new d(this._setProp, ["lineWidth", h == null ? "1" : h]),
            new d(this._setProp, ["lineCap", i == null ? "butt" : i]),
            new d(this._setProp, ["lineJoin", f == null ? "miter" : f]),
            new d(this._setProp, ["miterLimit", g == null ? "10" : g]),
        ];
        return this;
    };
    e.beginStroke = function (f) {
        if (this._active) {
            this._newPath();
        }
        this._strokeInstructions = f
            ? [new d(this._setProp, ["strokeStyle", f])]
            : null;
    };
    e.beginLinearGradientStroke = function (f, n, j, q, g, p) {
        if (this._active) {
            this._newPath();
        }
        var h = this._ctx.createLinearGradient(j, q, g, p);
        for (var m = 0, k = f.length; m < k; m++) {
            h.addColorStop(n[m], f[m]);
        }
        this._strokeInstructions = [new d(this._setProp, ["strokeStyle", h])];
    };
    e.beginRadialGradientStroke = function (f, q, j, s, m, g, r, k) {
        if (this._active) {
            this._newPath();
        }
        var h = this._ctx.createRadialGradient(j, s, m, g, r, k);
        for (var p = 0, n = f.length; p < n; p++) {
            h.addColorStop(q[p], f[p]);
        }
        this._strokeInstructions = [new d(this._setProp, ["strokeStyle", h])];
    };
    e.endStroke = function () {
        this.beginStroke();
    };
    e.decodePath = function (t) {
        var h = [
            this.moveTo,
            this.lineTo,
            this.quadraticCurveTo,
            this.bezierCurveTo,
            this.closePath,
        ];
        var g = [2, 2, 4, 6, 0];
        var v = 0,
            u = t.length;
        var C = [];
        var o = 0,
            m = 0;
        var j = c.BASE_64;
        while (v < u) {
            var B = t.charAt(v);
            var s = j[B];
            var q = s >> 3;
            var w = h[q];
            if (!w || s & 3) {
                throw "bad path data (@" + v + "): " + B;
            }
            var z = g[q];
            if (!q) {
                o = m = 0;
            }
            C.length = 0;
            v++;
            var A = ((s >> 2) & 1) + 2;
            for (var r = 0; r < z; r++) {
                var k = j[t.charAt(v)];
                var D = k >> 5 ? -1 : 1;
                k = ((k & 31) << 6) | j[t.charAt(v + 1)];
                if (A == 3) {
                    k = (k << 6) | j[t.charAt(v + 2)];
                }
                k = (D * k) / 10;
                if (r % 2) {
                    o = k += o;
                } else {
                    m = k += m;
                }
                C[r] = k;
                v += A;
            }
            w.apply(this, C);
        }
    };
    e.c = e.clear;
    e.f = e.beginFill;
    e.lf = e.beginLinearGradientFill;
    e.rf = e.beginRadialGradientFill;
    e.bf = e.beginBitmapFill;
    e.ef = e.endFill;
    e.ss = e.setStrokeStyle;
    e.s = e.beginStroke;
    e.ls = e.beginLinearGradientStroke;
    e.rs = e.beginRadialGradientStroke;
    e.es = e.endStroke;
    e.p = e.decodePath;
    e._updateInstructions = function () {
        this._instructions.push(c.beginCmd);
        this._appendInstructions(this._fillInstructions);
        if (this._strokeInstructions) {
            this._appendInstructions(this._strokeInstructions);
            this._appendInstructions(this._strokeStyleInstructions);
        }
        this._appendInstructions(this._activeInstructions);
        if (this._fillInstructions) {
            this._appendDraw(c.fillCmd, this._fillMatrix);
        }
        if (this._strokeInstructions) {
            this._instructions.push(c.strokeCmd);
        }
    };
    e._appendInstructions = function (f) {
        if (f) {
            this._instructions.push.apply(this._instructions, f);
        }
    };
    e._appendDraw = function (g, f) {
        if (!f) {
            this._instructions.push(g);
        } else {
            this._instructions.push(
                new d(this._ctx.save, [], false),
                new d(this._ctx.transform, f, false),
                g,
                new d(this._ctx.restore, [], false),
            );
        }
    };
    e._newPath = function () {
        if (this._dirty) {
            this._updateInstructions();
        }
        this._activeInstructions = [];
        this._active = this._dirty = false;
    };
    e._setProp = function (f, g) {
        this[f] = g;
    };
    fanvas.Graphics = c;
})();
this.fanvas = this.fanvas || {};
(function () {
    var b = function (c, d) {
        this.initialize(c, d);
    };
    var a = (b.prototype = new fanvas.DisplayObject());
    a.graphics = null;
    a.DisplayObject_initialize = a.initialize;
    a.initialize = function (c, d) {
        this.DisplayObject_initialize();
        if (c instanceof fanvas.Graphics) {
            this.graphics = c;
        } else {
            this.graphics = new fanvas.Graphics(d.imagePath || "");
            for (var e = 0; e < c.length; e++) {
                this.graphics[c[e][0]].apply(this.graphics, c[e].slice(1));
            }
        }
    };
    a.draw = function (d, c) {
        if (!c && this.drawFromCache(d)) {
            return true;
        }
        this.graphics.draw(d);
        return true;
    };
    fanvas.Shape = b;
})();
this.fanvas = this.fanvas || {};
(function () {
    var a = function () {
        this.initialize();
    };
    var b = (a.prototype = new fanvas.DisplayObject());
    b.children = null;
    b.DisplayObject_initialize = b.initialize;
    b.initialize = function () {
        this.DisplayObject_initialize();
        this.children = [];
    };
    b.DisplayObject_draw = b.draw;
    b.DisplayObject_update = b.update;
    b.draw = function (e, d) {
        if (!d && this.drawFromCache(e)) {
            return true;
        }
        var g = this.children.slice(0);
        for (var f = 0, c = g.length; f < c; f++) {
            var h = g[f];
            if (!h.isVisible()) {
                continue;
            }
            e.save();
            h.presetContext(e);
            h.draw(e, d);
            e.restore();
        }
        return true;
    };
    b.update = function () {
        this.DisplayObject_update();
        var e = this.children.slice(0);
        for (var d = 0, c = e.length; d < c; d++) {
            e[d].update();
        }
    };
    b.addChild = function (c) {
        this.addChildAt(c, this.children.length);
    };
    b.addChildAt = function (d, c) {
        if (c < 0 || c > this.children.length || d == null) {
            return;
        }
        if (d.parent) {
            d.parent.removeChild(d);
        }
        d.parent = this;
        d.root = this.root;
        this.children.splice(c, 0, d);
    };
    b.removeChild = function (c) {
        return this.removeChildAt(fanvas.indexOf(this.children, c));
    };
    b.removeChildAt = function (c) {
        if (c < 0 || c > this.children.length - 1) {
            return;
        }
        var d = this.children[c];
        if (d) {
            d.parent = null;
            d.uncache();
        }
        this.children.splice(c, 1);
    };
    b.removeAllChildren = function () {
        var c = this.children;
        while (c.length) {
            c.pop().parent = null;
        }
    };
    b.getChildAt = function (c) {
        return this.children[c];
    };
    b.getChildByName = function (e) {
        var d = this.children;
        for (var f = 0, c = d.length; f < c; f++) {
            if (d[f].name == e) {
                return d[f];
            }
        }
        return null;
    };
    b.getChildIndex = function (c) {
        return fanvas.indexOf(this.children, c);
    };
    b.getNumChildren = function () {
        return this.children.length;
    };
    b.contains = function (c) {
        while (c) {
            if (c == this) {
                return true;
            }
            c = c.parent;
        }
        return false;
    };
    fanvas.Container = a;
})();
this.fanvas = this.fanvas || {};
(function () {
    var b = function (e, c, d) {
        this.initialize(e, c, d);
    };
    var a = (b.prototype = new fanvas.Container());
    a.currentFrame = 0;
    a.totalFrames = 0;
    a.actionList = null;
    a.library = null;
    a.config = null;
    a._tweenList = null;
    a._remainList = null;
    a.Container_initialize = a.initialize;
    a.initialize = function (f, c, d) {
        this.Container_initialize();
        this.library = f;
        this.config = d;
        this.currentFrame = 0;
        var e = this.library[c];
        this.totalFrames = e.totalFrames;
        this.actionList = e.frameActionList;
        this._tweenList = [];
        this._remainList = [];
    };
    a.Container_draw = a.draw;
    a.Container_update = a.update;
    a.draw = function (d, c) {
        if (!c && this.drawFromCache(d)) {
            return true;
        }
        this.Container_draw(d, c);
        return true;
    };
    a.update = function () {
        this._updateTween();
        this._updateTimeline();
        this.Container_update();
    };
    a._updateTween = function () {
        var d = this._tweenList;
        var c;
        var h;
        var g;
        var f = this.root;
        for (var e = 0; e < d.length; e++) {
            c = d[e];
            h = c.target;
            g = c.duration;
            f.dirtyRectList.push(h.dirtyRect);
            for (var j in c.tweenData) {
                h[j] += (c.tweenData[j] - h[j]) / g;
            }
            f.dirtyRectList.push(h.calculateDirtyRect());
            c.duration--;
            if (c.duration == 0) {
                d.splice(e, 1);
                e--;
            }
        }
    };
    a._updateTimeline = function () {
        var d = this.currentFrame;
        if (d == 0 && this.totalFrames > 1) {
            var f;
            this._remainList.length > 0 && this._remainList.splice(0);
            while (this.getNumChildren() > 0) {
                f = this.getChildAt(0);
                if (f.initFrame == 0) {
                    this._remainList.push(f);
                }
                this.removeChildAt(0);
            }
            this._tweenList.splice(0);
        }
        var e = this._getCurrentAction();
        if (e != null && e instanceof Array) {
            for (var c = 0; c < e.length; c++) {
                this._exec(e[c]);
            }
        }
        d++;
        this.currentFrame = d == this.totalFrames ? 0 : d;
    };
    a._getCurrentAction = function () {
        for (var c = 0; c < this.actionList.length; c++) {
            if (this.actionList[c][0] == this.currentFrame) {
                return this.actionList[c].slice(1);
            }
        }
        return null;
    };
    a._exec = function (c) {
        this["_" + c[0]].apply(this, c.slice(1));
    };
    a._placeElement = function (f) {
        var e = this.getChildByName(f.n);
        if (!e) {
            if (
                f.id == undefined ||
                f.id == -1 ||
                f.id >= this.library.length
            ) {
                return;
            }
            var h = this.library[f.id];
            if (h == null) {
                return;
            }
            if (this.currentFrame == 0) {
                e = this._getFromList(f.n);
            }
            if (!e) {
                var n = h.rect;
                if (f.t == "MC") {
                    e = new fanvas.MovieClip(this.library, f.id, this.config);
                } else {
                    e = new fanvas.Shape(h.graphics, this.config);
                    var l = this.config.cache;
                    if (l) {
                        var g = this.root.canvas;
                        if (n.width > g.width || n.height > g.height) {
                            l = 1;
                        }
                        e.cache(n.x, n.y, n.width, n.height, l);
                    }
                    h.instance = e;
                }
                e.rect = n;
                e.name = f.n;
                e.initFrame = this.currentFrame;
            }
            e.clipDepth = f.cd || 0;
            e.maskDepth = f.md || 0;
            if (e.clipDepth) {
                this._updateMaskRelation(e);
            } else {
                if (e.maskDepth) {
                    e.mask = this._getMask(e);
                } else {
                    e.mask = null;
                }
            }
            this.addChildAt(e, f.d);
        } else {
            this.root.dirtyRectList.push(e.dirtyRect);
        }
        e.setTransform(f.x, f.y, f.sX, f.sY, 0, f.skX, f.skY);
        e.alpha = f.a != undefined ? f.a : 1;
        if (f.shadow) {
            e.shadow = new fanvas.Shadow(
                f.shadow.color,
                f.shadow.offsetX,
                f.shadow.offsetY,
                f.shadow.blur,
            );
        } else {
            if (e.shadow != null) {
                e.shadow = null;
            }
        }
        if (
            f.filters &&
            f.filters.length > 0 &&
            e.rect.width &&
            e.rect.height
        ) {
            var m;
            var c;
            var d = [];
            for (var k = 0; k < f.filters.length; k++) {
                m = f.filters[k];
                if (m.type == "CF") {
                    c = new fanvas.ColorFilter(
                        m.data[0],
                        m.data[1],
                        m.data[2],
                        m.data[3],
                        m.data[4],
                        m.data[5],
                        m.data[6],
                        m.data[7],
                    );
                    d.push(c);
                } else {
                    if (m.type == "CMF") {
                        c = new fanvas.ColorMatrixFilter(m.matrix);
                        d.push(c);
                    } else {
                        if (m.type == "BF") {
                            c = new fanvas.BlurFilter(
                                m.blurX,
                                m.blurY,
                                m.quality,
                            );
                            d.push(c);
                        }
                    }
                }
            }
            e.filters = d;
            var j = e.rect;
            e.cache(j.x, j.y, j.width, j.height);
        } else {
            if (e.filters && e.filters.length > 0) {
                e.uncache();
            }
        }
        this.root.dirtyRectList.push(e.calculateDirtyRect());
    };
    a._removeElement = function (c) {
        var d = this.getChildByName(c);
        this.removeChild(d);
        this.root.dirtyRectList.push(d.dirtyRect);
    };
    a._tweenElement = function (e, f, d) {
        var g = this.getChildByName(e);
        if (!g) {
            return;
        }
        var c = {};
        c.target = g;
        c.duration = f;
        c.tweenData = d;
        this._tweenList.push(c);
    };
    a._updateMaskRelation = function (c) {
        for (var d = 0; d < this.children.length; d++) {
            var f = this.children[d];
            if (c.clipDepth > f.maskDepth && c.maskDepth < f.maskDepth) {
                f.mask = c;
                this.root.dirtyRectList.push(f.dirtyRect);
                var e = f.calculateDirtyRect();
                this.root.dirtyRectList.push(e);
            }
        }
    };
    a._getMask = function (e) {
        for (var d = 0; d < this.children.length; d++) {
            var c = this.children[d];
            if (c.clipDepth > e.maskDepth && c.maskDepth < e.maskDepth) {
                return c;
            }
        }
        return null;
    };
    a._pE = a._placeElement;
    a._tE = a._tweenElement;
    a._rE = a._removeElement;
    a._getFromList = function (c) {
        for (var d = 0; d < this._remainList.length; d++) {
            if (this._remainList[d].name == c) {
                return this._remainList.splice(d, 1)[0];
            }
        }
        return null;
    };
    fanvas.MovieClip = b;
})();
this.fanvas = this.fanvas || {};
(function () {
    var b = function (e, c, d) {
        this.initialize(e, c, d);
    };
    var a = (b.prototype = new fanvas.Container());
    a.canvas = null;
    a.swfData = null;
    a.config = null;
    a.dirtyRectList = [];
    a.dirtyThresholdArea = 0;
    a.Container_initialize = a.initialize;
    a.initialize = function (e, c, d) {
        this.config = d;
        this.swfData = c;
        this.Container_initialize();
        var e = (this.canvas =
            typeof e == "string" ? document.getElementById(e) : e);
        if (c.bgColor) {
            this.canvas.setAttribute(
                "style",
                (this.canvas.getAttribute("style") || "") +
                    ";background-color:" +
                    c.bgColor,
            );
        }
        this.root = this;
        this._prebuildShapes(c.definitionPool);
        var f = new fanvas.MovieClip(c.definitionPool, 0, d);
        d.scale && (f.scaleX = f.scaleY = d.scale);
        e.width = c.stageWidth * f.scaleX;
        e.height = c.stageHeight * f.scaleY;
        this.dirtyThresholdArea = (e.width * e.height * 2) / 3;
        f.globalMatrix = f.getMatrix();
        this.addChild(f);
        d.showFPS &&
            (this.stats = new fanvas.Stats(this.canvas.getContext("2d")));
    };
    a.update = function (g, e) {
        if (!this.canvas) {
            return;
        }
        var f = this.getChildAt(0);
        var c = (this.dirtyRectList = []);
        f.update();
        if (e) {
            return;
        }
        if (c.length) {
            var d = this.canvas.getContext("2d");
            d.setTransform(1, 0, 0, 1, 0, 0);
            d.save();
            this._clear(d, c, f.currentFrame == 1 || !!this.config.clearAll);
            f.presetContext(d);
            f.draw(d, false);
            this.config.showDirtyRect && this._showDirtyRect(d, c, "#CC0000");
            d.restore();
        }
        this.config.showFPS && this.stats.update(g);
    };
    a._clear = function (d, c, e) {
        var h = function (m) {
            var k = 0;
            for (var j = 0; j < m.length; j++) {
                var l = m[j];
                k += l.width * l.height;
            }
            return k;
        };
        if (e || c.length > 30 || h(c) > this.dirtyThresholdArea) {
            d.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1);
        } else {
            for (var f = 0; f < c.length; f++) {
                var g = c[f];
                d.clearRect(g.x - 1, g.y - 1, g.width + 2, g.height + 2);
            }
            d.beginPath();
            for (var f = 0; f < c.length; f++) {
                var g = c[f];
                d.rect(g.x - 1, g.y - 1, g.width + 2, g.height + 2);
            }
            d.clip();
        }
    };
    a._prebuildShapes = function (d) {
        for (var f = 0; f < d.length; f++) {
            var e = d[f];
            if (e.graphics) {
                var c = new fanvas.Shape(e.graphics, this.config);
                e.graphics = c.graphics;
            }
        }
    };
    a._showDirtyRect = function (d, c, e) {
        d.beginPath();
        for (var f = 0; f < c.length; f++) {
            var g = c[f];
            d.rect(g.x, g.y, g.width, g.height);
        }
        d.lineWidth = 1;
        d.strokeStyle = e;
        d.stroke();
    };
    a.replay = function () {
        this.removeAllChildren();
        var c = new fanvas.MovieClip(
            this.swfData.definitionPool,
            0,
            this.config,
        );
        this.addChild(c);
        this.config.scale && (c.scaleX = c.scaleY = this.config.scale);
        c.globalMatrix = c.getMatrix();
    };
    fanvas.Stage = b;
})();
this.fanvas = this.fanvas || {};
(function () {
    var a = function () {
        this.initialize();
    };
    var b = a.prototype;
    b.initialize = function () {};
    b.getBounds = function () {
        return null;
    };
    b.applyFilter = function (e, d, j, g, c, i, h, f) {};
    fanvas.Filter = a;
})();
this.fanvas = this.fanvas || {};
(function () {
    var b = function (d, c, e) {
        this.initialize(d, c, e);
    };
    var a = (b.prototype = new fanvas.Filter());
    a.initialize = function (d, c, e) {
        if (isNaN(d) || d < 0) {
            d = 0;
        }
        this.blurX = d | 0;
        if (isNaN(c) || c < 0) {
            c = 0;
        }
        this.blurY = c | 0;
        if (isNaN(e) || e < 1) {
            e = 1;
        }
        this.quality = e | 0;
    };
    a.blurX = 0;
    a.blurY = 0;
    a.quality = 1;
    a.mul_table = [
        1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265,
        497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269,
        261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369,
        361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69,
        271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446,
        55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371,
        367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317,
        157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277,
        275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491,
        61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221,
        439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202,
        401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185,
        23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341,
        339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79,
        315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295,
        147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69,
        275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130,
        259, 129, 257, 1,
    ];
    a.shg_table = [
        0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14,
        14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15,
        15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15,
        12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14,
        16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16,
        16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16,
        14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16,
        15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16,
        17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16,
        17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15,
        16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17,
        17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17,
        16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14,
        17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16,
        17, 16, 17, 9,
    ];
    a.getBounds = function () {
        var c = Math.pow(this.quality, 0.6) * 0.5;
        return new fanvas.Rectangle(
            -this.blurX * c,
            -this.blurY * c,
            2 * this.blurX * c,
            2 * this.blurY * c,
        );
    };
    a.applyFilter = function (D, S, R, c, f, J, ag, af) {
        J = J || D;
        if (ag == null) {
            ag = S;
        }
        if (af == null) {
            af = R;
        }
        try {
            var Z = D.getImageData(S, R, c, f);
        } catch (ae) {
            return false;
        }
        var h = this.blurX / 2;
        if (isNaN(h) || h < 0) {
            return false;
        }
        h |= 0;
        var g = this.blurY / 2;
        if (isNaN(g) || g < 0) {
            return false;
        }
        g |= 0;
        if (h == 0 && g == 0) {
            return false;
        }
        var ab = this.quality;
        if (isNaN(ab) || ab < 1) {
            ab = 1;
        }
        ab |= 0;
        if (ab > 3) {
            ab = 3;
        }
        if (ab < 1) {
            ab = 1;
        }
        var r = Z.data;
        var S,
            R,
            ad,
            Y,
            z,
            C,
            t,
            o,
            q,
            I,
            X,
            w,
            L,
            H,
            d,
            O,
            T,
            A,
            v,
            s,
            B,
            E,
            F,
            N;
        var l = h + h + 1;
        var k = g + g + 1;
        var P = c << 2;
        var u = c - 1;
        var W = f - 1;
        var aa = h + 1;
        var Q = g + 1;
        var M = {
            r: 0,
            b: 0,
            g: 0,
            a: 0,
            next: null,
        };
        var V = M;
        for (ad = 1; ad < l; ad++) {
            V = V.next = {
                r: 0,
                b: 0,
                g: 0,
                a: 0,
                next: null,
            };
            if (ad == aa) {
                var n = V;
            }
        }
        V.next = M;
        var K = {
            r: 0,
            b: 0,
            g: 0,
            a: 0,
            next: null,
        };
        var U = K;
        for (ad = 1; ad < k; ad++) {
            U = U.next = {
                r: 0,
                b: 0,
                g: 0,
                a: 0,
                next: null,
            };
            if (ad == Q) {
                var m = U;
            }
        }
        U.next = K;
        var ac = null;
        while (ab-- > 0) {
            t = C = 0;
            var G = this.mul_table[h];
            var j = this.shg_table[h];
            for (R = f; --R > -1; ) {
                o = aa * (s = r[C]);
                q = aa * (B = r[C + 1]);
                I = aa * (E = r[C + 2]);
                X = aa * (F = r[C + 3]);
                V = M;
                for (ad = aa; --ad > -1; ) {
                    V.r = s;
                    V.g = B;
                    V.b = E;
                    V.a = F;
                    V = V.next;
                }
                for (ad = 1; ad < aa; ad++) {
                    Y = C + ((u < ad ? u : ad) << 2);
                    o += V.r = r[Y];
                    q += V.g = r[Y + 1];
                    I += V.b = r[Y + 2];
                    X += V.a = r[Y + 3];
                    V = V.next;
                }
                ac = M;
                for (S = 0; S < c; S++) {
                    r[C++] = (o * G) >>> j;
                    r[C++] = (q * G) >>> j;
                    r[C++] = (I * G) >>> j;
                    r[C++] = (X * G) >>> j;
                    Y = (t + ((Y = S + h + 1) < u ? Y : u)) << 2;
                    o -= ac.r - (ac.r = r[Y]);
                    q -= ac.g - (ac.g = r[Y + 1]);
                    I -= ac.b - (ac.b = r[Y + 2]);
                    X -= ac.a - (ac.a = r[Y + 3]);
                    ac = ac.next;
                }
                t += c;
            }
            G = this.mul_table[g];
            j = this.shg_table[g];
            for (S = 0; S < c; S++) {
                C = S << 2;
                o = Q * (s = r[C]);
                q = Q * (B = r[C + 1]);
                I = Q * (E = r[C + 2]);
                X = Q * (F = r[C + 3]);
                U = K;
                for (ad = 0; ad < Q; ad++) {
                    U.r = s;
                    U.g = B;
                    U.b = E;
                    U.a = F;
                    U = U.next;
                }
                z = c;
                for (ad = 1; ad <= g; ad++) {
                    C = (z + S) << 2;
                    o += U.r = r[C];
                    q += U.g = r[C + 1];
                    I += U.b = r[C + 2];
                    X += U.a = r[C + 3];
                    U = U.next;
                    if (ad < W) {
                        z += c;
                    }
                }
                C = S;
                ac = K;
                if (ab > 0) {
                    for (R = 0; R < f; R++) {
                        Y = C << 2;
                        r[Y + 3] = F = (X * G) >>> j;
                        if (F > 0) {
                            r[Y] = (o * G) >>> j;
                            r[Y + 1] = (q * G) >>> j;
                            r[Y + 2] = (I * G) >>> j;
                        } else {
                            r[Y] = r[Y + 1] = r[Y + 2] = 0;
                        }
                        Y = (S + ((Y = R + Q) < W ? Y : W) * c) << 2;
                        o -= ac.r - (ac.r = r[Y]);
                        q -= ac.g - (ac.g = r[Y + 1]);
                        I -= ac.b - (ac.b = r[Y + 2]);
                        X -= ac.a - (ac.a = r[Y + 3]);
                        ac = ac.next;
                        C += c;
                    }
                } else {
                    for (R = 0; R < f; R++) {
                        Y = C << 2;
                        r[Y + 3] = F = (X * G) >>> j;
                        if (F > 0) {
                            F = 255 / F;
                            r[Y] = ((o * G) >>> j) * F;
                            r[Y + 1] = ((q * G) >>> j) * F;
                            r[Y + 2] = ((I * G) >>> j) * F;
                        } else {
                            r[Y] = r[Y + 1] = r[Y + 2] = 0;
                        }
                        Y = (S + ((Y = R + Q) < W ? Y : W) * c) << 2;
                        o -= ac.r - (ac.r = r[Y]);
                        q -= ac.g - (ac.g = r[Y + 1]);
                        I -= ac.b - (ac.b = r[Y + 2]);
                        X -= ac.a - (ac.a = r[Y + 3]);
                        ac = ac.next;
                        C += c;
                    }
                }
            }
        }
        J.putImageData(Z, ag, af);
        return true;
    };
    fanvas.BlurFilter = b;
})();
this.fanvas = this.fanvas || {};
(function () {
    var a = function (f, d, e, c) {
        this.initialize(f, d, e, c);
    };
    var b = a.prototype;
    a.DELTA_INDEX = [
        0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.11, 0.12, 0.14,
        0.15, 0.16, 0.17, 0.18, 0.2, 0.21, 0.22, 0.24, 0.25, 0.27, 0.28, 0.3,
        0.32, 0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5, 0.53, 0.56,
        0.59, 0.62, 0.65, 0.68, 0.71, 0.74, 0.77, 0.8, 0.83, 0.86, 0.89, 0.92,
        0.95, 0.98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6,
        1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75,
        2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7,
        7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10,
    ];
    a.IDENTITY_MATRIX = [
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        1,
    ];
    a.LENGTH = a.IDENTITY_MATRIX.length;
    b.initialize = function (f, d, e, c) {
        this.reset();
        this.adjustColor(f, d, e, c);
        return this;
    };
    b.reset = function () {
        return this.copyMatrix(a.IDENTITY_MATRIX);
    };
    b.adjustColor = function (f, d, e, c) {
        this.adjustHue(c);
        this.adjustContrast(d);
        this.adjustBrightness(f);
        return this.adjustSaturation(e);
    };
    b.adjustBrightness = function (c) {
        if (c == 0 || isNaN(c)) {
            return this;
        }
        c = this._cleanValue(c, 255);
        this._multiplyMatrix([
            1,
            0,
            0,
            0,
            c,
            0,
            1,
            0,
            0,
            c,
            0,
            0,
            1,
            0,
            c,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
        ]);
        return this;
    };
    b.adjustContrast = function (d) {
        if (d == 0 || isNaN(d)) {
            return this;
        }
        d = this._cleanValue(d, 100);
        var c;
        if (d < 0) {
            c = 127 + (d / 100) * 127;
        } else {
            c = d % 1;
            if (c == 0) {
                c = a.DELTA_INDEX[d];
            } else {
                c =
                    a.DELTA_INDEX[d << 0] * (1 - c) +
                    a.DELTA_INDEX[(d << 0) + 1] * c;
            }
            c = c * 127 + 127;
        }
        this._multiplyMatrix([
            c / 127,
            0,
            0,
            0,
            0.5 * (127 - c),
            0,
            c / 127,
            0,
            0,
            0.5 * (127 - c),
            0,
            0,
            c / 127,
            0,
            0.5 * (127 - c),
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
        ]);
        return this;
    };
    b.adjustSaturation = function (f) {
        if (f == 0 || isNaN(f)) {
            return this;
        }
        f = this._cleanValue(f, 100);
        var c = 1 + (f > 0 ? (3 * f) / 100 : f / 100);
        var e = 0.3086;
        var d = 0.6094;
        var g = 0.082;
        this._multiplyMatrix([
            e * (1 - c) + c,
            d * (1 - c),
            g * (1 - c),
            0,
            0,
            e * (1 - c),
            d * (1 - c) + c,
            g * (1 - c),
            0,
            0,
            e * (1 - c),
            d * (1 - c),
            g * (1 - c) + c,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
        ]);
        return this;
    };
    b.adjustHue = function (f) {
        if (f == 0 || isNaN(f)) {
            return this;
        }
        f = (this._cleanValue(f, 180) / 180) * Math.PI;
        var h = Math.cos(f);
        var e = Math.sin(f);
        var d = 0.213;
        var c = 0.715;
        var g = 0.072;
        this._multiplyMatrix([
            d + h * (1 - d) + e * -d,
            c + h * -c + e * -c,
            g + h * -g + e * (1 - g),
            0,
            0,
            d + h * -d + e * 0.143,
            c + h * (1 - c) + e * 0.14,
            g + h * -g + e * -0.283,
            0,
            0,
            d + h * -d + e * -(1 - d),
            c + h * -c + e * c,
            g + h * (1 - g) + e * g,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
        ]);
        return this;
    };
    b.concat = function (c) {
        c = this._fixMatrix(c);
        if (c.length != a.LENGTH) {
            return this;
        }
        this._multiplyMatrix(c);
        return this;
    };
    b.toArray = function () {
        var c = [];
        for (var e = 0, d = a.LENGTH; e < d; e++) {
            c[e] = this[e];
        }
        return c;
    };
    b.copyMatrix = function (d) {
        var c = a.LENGTH;
        for (var e = 0; e < c; e++) {
            this[e] = d[e];
        }
        return this;
    };
    b._multiplyMatrix = function (d) {
        var f = [];
        for (var g = 0; g < 5; g++) {
            for (var e = 0; e < 5; e++) {
                f[e] = this[e + g * 5];
            }
            for (var e = 0; e < 5; e++) {
                var h = 0;
                for (var c = 0; c < 5; c++) {
                    h += d[e + c * 5] * f[c];
                }
                this[e + g * 5] = h;
            }
        }
    };
    b._cleanValue = function (d, c) {
        return Math.min(c, Math.max(-c, d));
    };
    b._fixMatrix = function (c) {
        if (c instanceof a) {
            c = c.toArray();
        }
        if (c.length < a.LENGTH) {
            c = c
                .slice(0, c.length)
                .concat(a.IDENTITY_MATRIX.slice(c.length, a.LENGTH));
        } else {
            if (c.length > a.LENGTH) {
                c = c.slice(0, a.LENGTH);
            }
        }
        return c;
    };
    fanvas.ColorMatrix = a;
})();
this.fanvas = this.fanvas || {};
(function () {
    var a = function (d, j, h, i, g, f, c, e) {
        this.initialize(d, j, h, i, g, f, c, e);
    };
    var b = (a.prototype = new fanvas.Filter());
    b.redMultiplier = 1;
    b.greenMultiplier = 1;
    b.blueMultiplier = 1;
    b.alphaMultiplier = 1;
    b.redOffset = 0;
    b.greenOffset = 0;
    b.blueOffset = 0;
    b.alphaOffset = 0;
    b.initialize = function (d, j, h, i, g, f, c, e) {
        this.redMultiplier = d != null ? d : 1;
        this.greenMultiplier = j != null ? j : 1;
        this.blueMultiplier = h != null ? h : 1;
        this.alphaMultiplier = i != null ? i : 1;
        this.redOffset = g || 0;
        this.greenOffset = f || 0;
        this.blueOffset = c || 0;
        this.alphaOffset = e || 0;
    };
    b.applyFilter = function (r, p, n, f, q, d, o, m) {
        d = d || r;
        if (o == null) {
            o = p;
        }
        if (m == null) {
            m = n;
        }
        try {
            var c = r.getImageData(p, n, f, q);
        } catch (k) {
            return false;
        }
        var j = c.data;
        var g = j.length;
        for (var h = 0; h < g; h += 4) {
            j[h] = j[h] * this.redMultiplier + this.redOffset;
            j[h + 1] = j[h + 1] * this.greenMultiplier + this.greenOffset;
            j[h + 2] = j[h + 2] * this.blueMultiplier + this.blueOffset;
            j[h + 3] = j[h + 3] * this.alphaMultiplier + this.alphaOffset;
        }
        d.putImageData(c, o, m);
        return true;
    };
    fanvas.ColorFilter = a;
})();
this.fanvas = this.fanvas || {};
(function () {
    var a = function (c) {
        this.initialize(c);
    };
    var b = (a.prototype = new fanvas.Filter());
    b.matrix = null;
    b.initialize = function (c) {
        this.matrix = c;
    };
    b.applyFilter = function (h, m, k, c, d, j, T, R) {
        j = j || h;
        if (T == null) {
            T = m;
        }
        if (R == null) {
            R = k;
        }
        try {
            var v = h.getImageData(m, k, c, d);
        } catch (P) {
            return false;
        }
        var Q = v.data;
        var E = Q.length;
        var p, M, S, U;
        var f = this.matrix;
        var O = f[0],
            N = f[1],
            L = f[2],
            K = f[3],
            H = f[4];
        var F = f[5],
            C = f[6],
            A = f[7],
            w = f[8],
            t = f[9];
        var I = f[10],
            G = f[11],
            D = f[12],
            B = f[13],
            z = f[14];
        var u = f[15],
            s = f[16],
            q = f[17],
            o = f[18],
            n = f[19];
        for (var J = 0; J < E; J += 4) {
            p = Q[J];
            M = Q[J + 1];
            S = Q[J + 2];
            U = Q[J + 3];
            Q[J] = p * O + M * N + S * L + U * K + H;
            Q[J + 1] = p * F + M * C + S * A + U * w + t;
            Q[J + 2] = p * I + M * G + S * D + U * B + z;
            Q[J + 3] = p * u + M * s + S * q + U * o + n;
        }
        j.putImageData(v, T, R);
        return true;
    };
    fanvas.ColorMatrixFilter = a;
})();
