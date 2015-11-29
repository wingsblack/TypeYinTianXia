(function () {

    if (!Function.prototype.bind) {
        Function.prototype.bind = function () {
            var _this = this;
            return function () {
                _this.apply(arguments);
            }
        }
    }

    var xwz = window.xwz = {};
    xwz.EmptyFn = function () { };

    /*
        @source 源对象
        @copy 被复制对象
    */
    xwz.apply = function (source, copy) {
        for (var a in copy) {
            if (copy.hasOwnProperty(a)) source[a] = copy[a];
        }
        return source;
    }


    var ObjectPrototype = Object.prototype;
    xwz.apply(xwz, {
        isArray: function (obj) {
            return ObjectPrototype.toString.call(obj) === "[object Array]"
        }
    })

   
}());