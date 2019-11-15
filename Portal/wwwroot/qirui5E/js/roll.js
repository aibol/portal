(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.Roll = factory(root);
    }
})(this, function (root) {
    'use strict';
    var Roll = function (options) {
        options = options || {
            callback: function () {}
        };
        this._init(options);
    };
    Roll._count = 0;
    Roll._count2 = 0;
    Roll.isHidden = function (element) {
        return (element.offsetParent === null);
    };
    Roll.inView = function (element, view) {
        if (Roll.isHidden(element)) {
            return false;
        }
        var box = element.getBoundingClientRect();
        return (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b);
    };
    Roll.optionToInt = function (opt, fallback) {
        return parseInt(opt || fallback, 10);
    };
    Roll.prototype._init = function (opts) {
        opts = opts || {};
        this.offset = undefined;
        this.pollTimer = undefined;
        this.delay = undefined;
        this.useDebounce = undefined;
        this.id = "LYN_roll_";
        this.options = opts;
        var that = this,
            offsetAll = opts.offset || 0,
            offsetVertical = opts.offsetVertical || offsetAll,
            offsetHorizontal = opts.offsetHorizontal || offsetAll;
        this.offset = {
            t: Roll.optionToInt(opts.offsetTop, offsetVertical),
            b: Roll.optionToInt(opts.offsetBottom, offsetVertical),
            l: Roll.optionToInt(opts.offsetLeft, offsetHorizontal),
            r: Roll.optionToInt(opts.offsetRight, offsetHorizontal)
        };
        this.delay = Roll.optionToInt(opts.throttle, 100);
        this.useDebounce = typeof opts.debounce !== 'undefined' ? !!opts.debounce : true;
        this.rollEles = [];
        var that = this;
        var eventFn = function () {
            var rollEles = that.rollEles;
            var len = rollEles.length;
            if (len === 0) {
                return;
            }
            if (that.useDebounce) {
                clearTimeout(that.pollTimer);
                that.pollTimer = setTimeout(function () {
                    for (var i = 0; i < len; i++) {
                        that.execute(rollEles[i]);
                    }
                    clearTimeout(that.pollTimer);
                }, that.delay);
            } else {
                for (var i = 0; i < len; i++) {
                    that.execute(rollEles[i]);
                }
            }
        }
        this._eventFn = eventFn;
        if (document.addEventListener) {
            root.addEventListener('scroll', eventFn, false);
            root.addEventListener('resize', eventFn, false);
            root.addEventListener('load', eventFn, false);
        } else {
            root.attachEvent('onscroll', eventFn);
            root.attachEvent('onresize', eventFn);
            root.attachEvent('onload', eventFn);
        }
    };
    Roll.prototype.push = function (ele, cb, options) {
        if (!ele || !ele.nodeName) {
            console.error('push方法第一个参数必须是一个dom元素');
            return;
        }
        if (!options) {
            options = {};
        }
        if (typeof options.immediate === 'undefined') {
            options.immediate = true;
        }
        if (typeof cb === 'function') {
            options.callback = cb;
        }
        let id = this.id + (++Roll._count2);
        let obj = {
            id: id,
            el: ele,
            options: options
        };
        ele.setAttribute('data-rull-id', id);
        this.rollEles.push(obj);
        if (options.immediate) {
            this.execute(obj);
        }
        obj = null;
        return this;
    }
    Roll.prototype.execute = function (rollItem) {
        if (typeof rollItem === 'undefined' || typeof rollItem.el === 'undefined') {
            return;
        }
        var options = this.options,
            offsetAll = options.offset || 0,
            offsetVertical = options.offsetVertical || offsetAll,
            offsetHorizontal = options.offsetHorizontal || offsetAll;
        var that = this,
            elem = rollItem.el,
            elOption = rollItem.options,
            view = {
                l: 0 - that.offset.r,
                t: 0 - that.offset.b,
                b: (root.innerHeight || document.documentElement.clientHeight) + that.offset.t,
                r: (root.innerWidth || document.documentElement.clientWidth) + that.offset.l
            };
        if (typeof elOption.offsetTop !== 'undefined') {
            view.b = (root.innerHeight || document.documentElement.clientHeight) + Roll.optionToInt(elOption.offsetTop,
                offsetVertical);
        }
        if (typeof elOption.offsetLeft !== 'undefined') {
            view.r = (root.innerWidth || document.documentElement.clientWidth) + Roll.optionToInt(elOption.offsetLeft,
                offsetHorizontal);
        }
        if (typeof elOption.offsetBottom !== 'undefined') {
            view.t = 0 - Roll.optionToInt(elOption.offsetBottom, offsetVertical);
        }
        if (typeof elOption.offsetRight !== 'undefined') {
            view.l = 0 - Roll.optionToInt(elOption.offsetRight, offsetHorizontal);
        }
        if (Roll.inView(elem, view)) {
            if (!elem._done) {
                if (!elem._pause) {
                    if (typeof elOption.callback === 'function') {
                        elOption.callback.call(elem, this, this.done);
                    }
                    if (typeof options.callback === 'function') {
                        options.callback.call(elem, this, this.done);
                    }
                }
            }
        }
        return this;
    };
    Roll.prototype.destroy = function () {
        if (document.removeEventListener) {
            root.removeEventListener('scroll', this._eventFn);
            root.removeEventListener('resize', this._eventFn);
            root.removeEventListener('load', this._eventFn);
        } else {
            root.detachEvent('onscroll', this._eventFn);
            root.detachEvent('onresize', this._eventFn);
            root.detachEvent('onload', this._eventFn);
        }
        this.offset = null;
        this.options = null;
        this.offset = null;
        this.rollEles = null;
        this._eventFn = null;
        clearTimeout(this.pollTimer);
        this.pollTimer = null;
    };
    Roll.prototype.done = function (elem, context) {
        if (!elem || !elem.nodeName) {
            return;
        }
        if (!(this instanceof Roll) && !(context instanceof Roll)) {
            console.log('检测到done方法内的this不是Roll实例！done(elem, context)方法需要context参数，context参数必须是Roll实例');
            return;
        } else if (!(context instanceof Roll) && (this instanceof Roll)) {
            context = this;
        }
        var rollId = elem.getAttribute('data-rull-id');
        var rollEles = context.rollEles;
        var index = getIndex(rollEles, function (item) {
            return item.id == rollId;
        });
        if (index > -1) {
            rollEles.splice(index, 1);
        }
        console.log('完成操作')
        elem._done = true;
        elem.setAttribute('data-done', 'true');
        elem = null;
    };

    function getIndex(arr, fn) {
        if (!arr || arr.length === 0 || !fn || (typeof fn !== 'function')) {
            return -1;
        }
        if (arr.findIndex) {
            return arr.findIndex(fn);
        }
        var len = arr.length;
        var i = 0;
        var index = -1;
        for (; i < len; i++) {
            let item = arr[i];
            if (fn(item, index, arr) === true) {
                index = i;
                break;
            }
        }
        return index;
    }
    return Roll;
});