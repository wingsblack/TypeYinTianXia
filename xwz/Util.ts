module xwz {
    export class Util {
        private static _time: Date = new Date();

        static toTime(timespan: number, format: string = "hh:mm") {
            


            this._time.setTime(timespan);
            var time = "";
            var tmp;
            tmp = this._time.getHours() + "";
            if (tmp.length == 1) tmp = "0" + tmp;
            var hh = tmp;

            tmp = this._time.getMinutes() + "";
            if (tmp.length == 1) tmp = "0" + tmp;
            time += tmp;

            var mm = tmp;
            var yyyy: any = this._time.getFullYear()
            var MM: any = this._time.getMonth() + 1;
            var dd: any = this._time.getDate();
            var ss: any = this._time.getSeconds();


            time = format.replace("hh", hh)
                .replace("dd", dd)
                .replace("MM", MM)
                .replace("mm", mm)
                .replace("yyyy", yyyy)
                .replace("mm", mm)
                .replace("ss", ss)


            return time;
        }



        static dialog(url: string, width: number, height: number, title: string, id: string) {
            if (!url) return false;
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
        }


        static ajaxGet(url: string, cb: Function) {
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    cb(data);
                }

            });
        }
    }
}

