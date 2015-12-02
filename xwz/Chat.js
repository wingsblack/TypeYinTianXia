var xwz;
(function (xwz) {
    var Chat = (function () {
        function Chat() {
        }
        Chat.appendMessage = function (msg) {
            if (!xwz.isArray(msg))
                msg = [msg];
            var emotionsDataMap = xwz.Project.emotionsDataMap;
            var html = '', len = msg.length;
            for (var i = 0; i < len; i++) {
                var message = msg[i];
                message.message = (message.message + '').replace(/\[@([^\]]+)]/g, function (a, b, c) {
                    var url = emotionsDataMap[b];
                    return '<img src="' + url + '" />';
                });
                if (message.messageType == "PUBLIC_CHAT") {
                    var messageStatus = message.messageStatus;
                    var id = message.senderId;
                    var slefMessage = xwz.Global.user.id == id;
                    //梦游消息
                    if (messageStatus == "-2") {
                        if (!(slefMessage || xwz.Global.user.isAdmin))
                            continue;
                    }
                    else if (messageStatus == "1") {
                        if (slefMessage) { }
                        else if (!xwz.Global.user.isAdmin) {
                            continue;
                        }
                        else {
                            message.message += '<button msgid="' + message.id + '" class="auditmsgbtn">审核通过</button>';
                        }
                    }
                    else if (messageStatus == "2") {
                        if (!(slefMessage || xwz.Global.user.isAdmin))
                            continue;
                    }
                    else if (messageStatus == "3") {
                        if (slefMessage || xwz.Global.user.isAdmin)
                            continue;
                    }
                    html += this.getPublicHTML(message);
                }
                else if (message.messageType == "HANDAN") {
                    html += this.getHandanHTML(message);
                }
                else if (message.messageType == "NEWS") {
                    html += this.getNewsHTML(message);
                }
            }
            $("#panel").append($(html)).scrollTop(Number.MAX_VALUE);
        };
        Chat.getPublicHTML = function (message) {
            return '<li>' +
                '<div class="time">' + message.time + '</div>' +
                '<img src="' + message.avatar + '">' +
                '<div class="sszbconhuifu" style="display:none"><div class="huifubox"><a href="#" class="huifuboxcon">对TA说</a></div></div>' +
                '<div class="namebox">' + message.nickName + '</div>' +
                '<div class="atext">' +
                message.message +
                '</div></li>';
        };
        Chat.getHandanHTML = function (message) {
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
                '">查看喊单</a></div>';
            '</div></li>';
        };
        Chat.getNewsHTML = function (message) {
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
                '">查看财经资讯</a></div>';
            '</div></li>';
        };
        Chat.appendTip = function (text) {
            var html = '<li><div class="sszbtip"><span>' + text + '</span></div></li>';
            $("#panel").append($(html));
        };
        Chat.getChatHistory = function () {
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
                        handan: message.handan,
                        id: message.id,
                        messageStatus: message.messageStatus,
                        senderId: message.senderId
                    });
                }
                if (len == 0)
                    return;
                Chat.appendMessage(msg);
                Chat.appendTip("以上是聊天历史");
            });
        };
        return Chat;
    })();
    xwz.Chat = Chat;
})(xwz || (xwz = {}));
//# sourceMappingURL=Chat.js.map