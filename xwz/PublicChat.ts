module xwz {
    export class PublicChat implements ISocketListen {

        constructor() {
            this.API = Project.API_PUBLIC_CHAT;
        }

        API: string;

        onMessage(frame) {
            var body = eval("(" + frame.body + ")");

            var time = Util.toTime(body.createTime);
            var avatar = body.messageFrom.avatar;
            var message = eval("(" + body.textMessage + ")");
            if (message == null) message = { message: "" }
            var msg = {
                time: time,
                avatar: avatar,
                nickName: body.messageFrom.nickName,
                message: message.message,
                messageType: body.eventType,
                handan: message,
                messageFrom: body.messageFrom,
                id: message.id,
                messageStatus: message.messageStatus,
                senderId: message.senderId,
                roleCode: body.messageFrom.roleCode

            }

            Chat.appendMessage(msg);
        }


    }


}