var xwz;
(function (xwz) {
    var PublicChat = (function () {
        function PublicChat() {
            this.API = xwz.Project.API_PUBLIC_CHAT;
        }
        PublicChat.prototype.onMessage = function (frame) {
            var body = eval("(" + frame.body + ")");
            var time = xwz.Util.toTime(body.createTime);
            var avatar = body.messageFrom.avatar;
            if (body.eventType == "NEWS")
                return;
            var message = eval("(" + body.textMessage + ")");
            if (message == null)
                message = { message: "" };
            var msg = {
                time: time,
                avatar: avatar,
                nickName: body.messageFrom.nickName,
                message: message.message,
                messageType: body.eventType,
                handan: message
            };
            xwz.Chat.appendMessage(msg);
        };
        return PublicChat;
    })();
    xwz.PublicChat = PublicChat;
})(xwz || (xwz = {}));
//# sourceMappingURL=PublicChat.js.map