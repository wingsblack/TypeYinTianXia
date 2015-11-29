module xwz {


    
    export class Chat {



        static appendMessage(msg) {
            if (!xwz.isArray(msg)) msg = [msg];
            var emotionsDataMap = xwz.Project.emotionsDataMap;
            var html = '', len = msg.length;
            for (var i = 0; i < len; i++) {
                var message = msg[i];
                if (message.messageType !== "PUBLIC_CHAT") continue;

                message.message = (message.message + '').replace(/\[@([^\]]+)]/g, function (a, b, c) {
                    var url = emotionsDataMap[b];
                    return '<img src="' + url + '" />';
                })

                html += '<li>' +
                '<div class="time">' + message.time + '</div>' +
                '<img src="' + message.avatar + '">' +
                '<div class="sszbconhuifu" style="display:none"><div class="huifubox"><a href="#" class="huifuboxcon">对TA说</a></div></div>' +
                '<div class="namebox">' + message.nickName + '</div>' +
                '<div class="atext">' +
                message.message +
                '</div></li>';
            }

            $("#panel").append($(html)).scrollTop(Number.MAX_VALUE);


        }

        static appendTip(text) {
            var html = '<li><div class="sszbtip"><span>' + text + '</span></div></li>';
            $("#panel").append($(html));
        }


        static getChatHistory() {

            xwz.Util.ajaxGet(xwz.Project.API_CHAT_HISTORY, function (data) {
                var msg = [], len = data.length;
                for (var i = len; i--; i >= 0) {
                    var message = data[i];
                    msg.push({
                        time: xwz.Util.toTime(message.sendTime),
                        avatar: message.senderAvatar,
                        nickName: message.senderName,
                        message: message.message,
                        messageType: message.messageType
                    })
                }
                if (len == 0) return;
                Chat.appendMessage(msg);
                Chat.appendTip("以上是聊天历史");
            });

        }
    }
}