var xwz;
(function (xwz) {
    var Util = (function () {
        function Util() {
        }
        Util.toTime = function (timespan, format) {
            if (format === void 0) { format = "hh:mm"; }
            this._time.setTime(timespan);
            var time = "";
            var tmp;
            tmp = this._time.getHours() + "";
            if (tmp.length == 1)
                tmp = "0" + tmp;
            var hh = tmp;
            tmp = this._time.getMinutes() + "";
            if (tmp.length == 1)
                tmp = "0" + tmp;
            time += tmp;
            var mm = tmp;
            var yyyy = this._time.getFullYear();
            var MM = this._time.getMonth() + 1;
            var dd = this._time.getDate();
            var ss = this._time.getSeconds();
            time = format.replace("hh", hh)
                .replace("dd", dd)
                .replace("MM", MM)
                .replace("mm", mm)
                .replace("yyyy", yyyy)
                .replace("mm", mm)
                .replace("ss", ss);
            return time;
        };
        Util.dialog = function (url, width, height, title, id) {
            if (!url)
                return false;
            width = width || 800;
            height = height || 388;
            title = title || "标题";
            id = "3F67";
            art.dialog.open(url, {
                id: id,
                drag: false,
                lock: true,
                width: width,
                height: height,
                title: title
            });
        };
        Util.ajaxGet = function (url, cb) {
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    cb(data);
                }
            });
        };
        Util._time = new Date();
        return Util;
    })();
    xwz.Util = Util;
})(xwz || (xwz = {}));
//# sourceMappingURL=Util.js.map