var xwz;
(function (xwz) {
    var Project = (function () {
        function Project() {
        }
        Project.setConfig = function (config) {
            for (var e in config) {
                if (this.hasOwnProperty(e)) {
                    this[e] = config[e];
                }
                else {
                    this.Config[e] = config[e];
                }
            }
        };
        Object.defineProperty(Project, "API_PUBLIC_CHAT", {
            //static API_HOST = "http://xiaowu.com:8080"  //小伍
            //static API_HOST = "http://dizhu.com:8080" //地主
            //公聊接口
            get: function () {
                return '/public/chat/' + this.COMPANY_ID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Project, "API_MEM_LIST", {
            //会员列表
            get: function () {
                return this.API_HOST + '/home/allman';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Project, "API_USER_EVENT", {
            //用户事件
            get: function () {
                return '/public/user/' + this.COMPANY_ID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Project, "HANDAN_DETAIL", {
            //喊单详情
            get: function () {
                return this.API_HOST + '/handan/detail';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Project, "HANDAN_QUICK", {
            get: function () {
                return this.API_HOST + '/handan/quick';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Project, "API_KICK", {
            get: function () {
                return this.API_HOST + "/gm/users/kick/";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Project, "NEWS_DETAIL", {
            //新闻详情
            get: function () {
                return this.API_HOST + '/home/tradeDetail/';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Project, "API_CHAT_HISTORY", {
            //聊天历史
            get: function () {
                return this.API_HOST + '/chat/history';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Project, "API_SOCKET_SERVER", {
            //socket服务器
            get: function () {
                return this.API_HOST + '/socket';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Project, "API_USER_LOGIN", {
            get: function () {
                return this.API_HOST + "/account/ajaxLogin";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Project, "API_RILI_LIST", {
            get: function () {
                return this.API_HOST + '/finance_calendar/list';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Project, "emotionsData", {
            get: function () {
                return this._emotionsData;
            },
            set: function (list) {
                this._emotionsData = list;
                var len = list.length;
                for (var i = 0; i < len; i++) {
                    var tmp = list[i];
                    this.emotionsDataMap[tmp[0]] = tmp[1];
                }
            },
            enumerable: true,
            configurable: true
        });
        Project.Config = {};
        //websocket服务器
        Project.API_HOST = "http://1818.sfbtcn.com";
        Project.API_PRIVATE_CHAT = '/app/private/chat/';
        Project.API_PRIVATE_CHAT_GET = '/private/chat/';
        Project.isLoginDownload = false;
        //登陆密码
        Project.CONST_LOGIN = 'admin';
        //登陆信息
        Project.CONST_PASS_CODE = 'password';
        Project.COMPANY_ID = null;
        Project.API_PUBLIC_CHAT_SEND = "/app/chat/";
        Project.emotionsDataMap = {};
        return Project;
    })();
    xwz.Project = Project;
})(xwz || (xwz = {}));
//# sourceMappingURL=Project.js.map