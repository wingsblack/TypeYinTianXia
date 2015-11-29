module xwz {
    export class Socket extends xwz.EventDispatcher {

        isConnection: boolean = false;
        private _listen: ISocketListen[];
        private _socket: any;
        private _client: any;
        private timer: number;
        public constructor(url: string) {
            super();

            this._socket = new SockJS(url);
            this._client = Stomp.over(this._socket);
            this._listen = [];
        }

        connect(name: string, pass: string) {
            this._client.connect(name, pass,()=> {
                console.log("成功连接")
                this.isConnection = true;
                this._ListenChat();
                $("#ytx-loading").hide();
            },  () =>{
                console.log("断开连接")
                //$("#ytx-loading").show();
                this.isConnection = false;
                this.timer = setTimeout(function () {
                    this.connect(name, pass);
                }.bind(this), 1000);

            })
        }


        private _ListenChat() {
            var chat: ISocketListen;

            while ((chat = this._listen.shift()) != null) {
                this._client.subscribe(chat.API, chat.onMessage);                
            }
        }



        removeChat(api: string, method: any) {
            this._client.unsubscribe(api, method);
        }

        RegisteredChat(chat: ISocketListen) {
            this._listen.push(chat);
            if (this.isConnection) this._ListenChat();
        }

        send(api: string, obj: Object, text: string) {
            this._client.send(api, obj, text);
        }
    }
}