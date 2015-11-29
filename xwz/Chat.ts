module xwz {


    
    export class Chat {



        static appendMessage(msg) {
            if (!xwz.isArray(msg)) msg = [msg];
            var emotionsDataMap = xwz.Project.emotionsDataMap;
            var html = '', len = msg.length;
            for (var i = 0; i < len; i++) {
                var message = msg[i];
              
                message.message = (message.message + '').replace(/\[@([^\]]+)]/g, function (a, b, c) {
                    var url = emotionsDataMap[b];
                    return '<img src="' + url + '" />';
                })
                if (message.messageType == "PUBLIC_CHAT")
                    html += this.getPublicHTML(message);
                else if (message.messageType == "HANDAN") {
                    html += this.getHandanHTML(message);
                } else if (message.messageType == "NEWS") {
                    html += this.getNewsHTML(message);
                }

            }

            $("#panel").append($(html)).scrollTop(Number.MAX_VALUE);


        }


        private static getPublicHTML(message) {
          

            return '<li>' +
            '<div class="time">' + message.time + '</div>' +
            '<img src="' + message.avatar + '">' +
            '<div class="sszbconhuifu" style="display:none"><div class="huifubox"><a href="#" class="huifuboxcon">对TA说</a></div></div>' +
            '<div class="namebox">' + message.nickName + '</div>' +
            '<div class="atext">' +
            message.message +
            '</div></li>';
        }

        private static getHandanHTML(message): string {

            var handan = message.handan;

            var handan_content = '喊单提醒' + '单号:' + handan.id + ' 交易商品【' + handan.goodsName + '】类型:' + handan.type + ' 开仓价:' + handan.openPrice + ' 止损价:' + handan.stopLosePrice + ' 止盈价:' + handan.stopWinPrice + '.(注：如本单为止损/止盈成交，实际成交时间以当时的点位为准)';

            return '<li>' +
                '<div class="time">' + message.time + '</div>' +
                '<img src="' + message.avatar + '">' +
                '<div class="sszbconhuifu" style="display:none"><div class="huifubox"><a href="#" class="huifuboxcon">对TA说</a></div></div>' +
                '<div class="namebox">' + message.nickName + '</div>' +
                '<div class="atext ahandan"><span class="ask-span">喊</span>' +
                handan_content +
                '<div class="handan-detail"><a " class="handan-detail" danhao="' +
                handan.id +
                '">查看喊单</a></div>'
                '</div></li>';

        }


        private static getNewsHTML(message): string {

            var handan = message.news;

            var handan_content = '喊单提醒' + '单号:' + handan.id + ' 交易商品【' + handan.goodsName + '】类型:' + handan.type + ' 开仓价:' + handan.openPrice + ' 止损价:' + handan.stopLosePrice + ' 止盈价:' + handan.stopWinPrice + '.(注：如本单为止损/止盈成交，实际成交时间以当时的点位为准)';

            return '<li>' +
                '<div class="time">' + message.time + '</div>' +
                '<img src="' + message.avatar + '">' +
                '<div class="sszbconhuifu" style="display:none"><div class="huifubox"><a href="#" class="huifuboxcon">对TA说</a></div></div>' +
                '<div class="namebox">' + message.nickName + '</div>' +
                '<div class="atext ahandan"><span class="ask-span">提</span>' +
                handan_content +
                '<div class="handan-detail"><a " class="handan-news-detail" danhao="' +
                handan.id +
                '">查看财经资讯</a></div>'
            '</div></li>';

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
                        messageType: message.messageType,
                        handan: message.handan
                    })
                }
                if (len == 0) return;
                Chat.appendMessage(msg);
                Chat.appendTip("以上是聊天历史");
            });

        }
    }
}