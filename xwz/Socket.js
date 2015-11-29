var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var xwz;
(function (xwz) {
    var Socket = (function (_super) {
        __extends(Socket, _super);
        function Socket(url) {
            _super.call(this);
            this.isConnection = false;
            this._socket = new SockJS(url);
            this._client = Stomp.over(this._socket);
            this._listen = [];
        }
        Socket.prototype.connect = function (name, pass) {
            var _this = this;
            this._client.connect(name, pass, function () {
                console.log("成功连接");
                _this.isConnection = true;
                _this._ListenChat();
                $("#ytx-loading").hide();
            }, function () {
                console.log("断开连接");
                //$("#ytx-loading").show();
                _this.isConnection = false;
                _this.timer = setTimeout(function () {
                    this.connect(name, pass);
                }.bind(_this), 1000);
            });
        };
        Socket.prototype._ListenChat = function () {
            var chat;
            while ((chat = this._listen.shift()) != null) {
                this._client.subscribe(chat.API, chat.onMessage);
            }
        };
        Socket.prototype.removeChat = function (api, method) {
            this._client.unsubscribe(api, method);
        };
        Socket.prototype.RegisteredChat = function (chat) {
            this._listen.push(chat);
            if (this.isConnection)
                this._ListenChat();
        };
        Socket.prototype.send = function (api, obj, text) {
            this._client.send(api, obj, text);
        };
        return Socket;
    })(xwz.EventDispatcher);
    xwz.Socket = Socket;
})(xwz || (xwz = {}));
//# sourceMappingURL=Socket.js.map