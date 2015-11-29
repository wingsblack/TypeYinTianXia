module xwz {

    var _menus = { length: 0 }

    export class dropdown {

        static add(menus) {
            this.elm.empty();

            _menus = {
                length: menus.length
            };

            var html = '';
            for (var i = 0; i < menus.length; i++) {
                var menu = menus[i];
                _menus["menu" + i] = menu;
                html += '  <li data-id="menu' + i + '"><a  class="' + menu._class + '" >' + menu.text + '</a></li>'
            }
            this.elm.html(html);
        }

        static target;

        static show(postion) {
            var _this = this;
            this.elm.css(postion);
            this.elm.children().each(function () {
                var $this = $(this);
                var menu = _menus[$this.attr("data-id")];
                menu.onShow && menu.onShow(_this.target, $(this));
                var $a = $this.children("a");
                $a.html(menu.text);
                $a.addClass(menu._class);


            })
            this.elm.show();
        }
        static elm: JQuery;

        static init() {
            this.elm = $("#dropdown");

            this.initEvent();
        }

        static initEvent() {
            var _this = this;
            this.elm.delegate("li", 'click', function () {
                var $this = $(this);
                var menu = _menus[$this.attr("data-id")];
                menu.validuser = _this.target.attr("data-validuser");
                menu.user = _this.target.attr("data-user");
                menu.sleepwalk = _this.target.attr("data-sleepwalk");


                return menu.click(_this.target, $this);
            })
        }


    }



}