module xwz {

    export class Project {

        static Config: Object = {};

        static setConfig(config: Object): void {
            for (var e in config) {
                if (this.hasOwnProperty(e)) {
                    this[e] = config[e];
                } else {
                    this.Config[e] = config[e];
                }
            }
        }

      
        //websocket服务器
        static API_HOST = "http://1818.sfbtcn.com"
        //static API_HOST = "http://xiaowu.com:8080"  //小伍
        //static API_HOST = "http://dizhu.com:8080" //地主

        //公聊接口
        static get API_PUBLIC_CHAT() {
            return '/public/chat/' + this.COMPANY_ID;
        } 
        static API_PRIVATE_CHAT = '/app/private/chat/';
        static API_PRIVATE_CHAT_GET = '/private/chat/';
        //会员列表
        static get API_MEM_LIST(): string {
            return this.API_HOST + '/home/allman';
        } 
        //用户事件
        static get API_USER_EVENT() {
            return '/public/user/' + this.COMPANY_ID
        } 

        //喊单详情
        static get HANDAN_DETAIL() {
            return this.API_HOST + '/handan/detail';
        } 
        static get HANDAN_QUICK() {
            return this.API_HOST + '/handan/quick';
        }

        static get API_KICK() {
            return this.API_HOST + "/gm/users/kick/";
        }

        //新闻详情
        static get NEWS_DETAIL() {
            return this.API_HOST + '/home/tradeDetail/'
        }


        //聊天历史
        static get API_CHAT_HISTORY() {
            return this.API_HOST + '/chat/history';
        } 
        //socket服务器
        static get API_SOCKET_SERVER() {
            return this.API_HOST + '/socket';
        }

        static isLoginDownload: boolean = false;

        //登陆密码
        static CONST_LOGIN = 'admin';
        //登陆信息
        static CONST_PASS_CODE = 'password';

        static COMPANY_ID = null;

        static get API_USER_LOGIN() {
            return this.API_HOST + "/account/ajaxLogin";
        }

        static API_PUBLIC_CHAT_SEND = "/app/chat/";


        static get API_RILI_LIST() {
            return this.API_HOST + '/finance_calendar/list';
        } 

        static emotionsDataMap: Object = {};


        private static _emotionsData;

        static set emotionsData(list: string[]) {
            this._emotionsData = list;
            var len: number = list.length;
            for (var i = 0; i < len; i++) {
                var tmp = list[i];
                this.emotionsDataMap[tmp[0]] = tmp[1];
            }
        }

        static get emotionsData() {
            return this._emotionsData;
        }
    }

}