/// <reference path="../../index.html" />


var socket  = xwz.Socket.getInstance(xwz.API_SOCKET_SERVER);;
var dialog;

$(function () {
 
   
    //聊天历史
    xwz.Chat.getChatHistory();

   
   

    socket.connect(xwz.CONST_LOGIN, xwz.CONST_PASS_CODE);

    //公聊处理
    var chat = new xwz.Chat.PublicChat();

    //注册公聊事件
    socket.RegisteredChat(chat);


    //chat.message({
    //    body: "{\"eventType\":\"PUBLIC_CHAT\",\"messageFrom\":{\"id\":\"4028911849970e79014997112c860004\",\"login\":null,\"email\":null,\"status\":null,\"nickName\":\"虚拟用户8\",\"sex\":1,\"qq\":null,\"avatar\":\"/images/avatar/t3/32/19.png\",\"roleId\":null,\"roleIcon\":null,\"roleCode\":\"normal\",\"identityIcon\":\"/front/assets2/identity/member_1.png\"},\"textMessage\":\"{\\\"id\\\":null,\\\"messageType\\\":null,\\\"senderId\\\":null,\\\"senderAvatar\\\":null,\\\"senderName\\\":null,\\\"senderSex\\\":null,\\\"senderRoleIcon\\\":null,\\\"identityIcon\\\":null,\\\"message\\\":\\\"太背了\\\",\\\"sendTime\\\":null,\\\"gag\\\":null,\\\"messageStatus\\\":null,\\\"handan\\\":null}\",\"createTime\":1444521924294}"
    //});

    //右键菜单
    xwz.dropdown.init();

    //用户
    xwz.User.getAllUser();
    
    var user = new xwz.User();
    user.check();
    user.RegisteredEvent();
    xwz.dropdown.user = user;
    //注册用户事件
    socket.RegisteredChat(user);
    
   


    
    $("#soft-download").click(function () {
        //开户判断是否需要登录
        if (xwz.Project.isLoginDownload && !user.isLogin) {
            $(".topzhuce").click();
            return false;
        }
        art.dialog({
            content: document.getElementById('downloadlist'),
            id: 'EF893L',
            title: '软件下载',
            width: 820,
            zIndex: 1500,
            lock: true
        });
    });

    $('#cjrl').unbind('click').bind('click', function () {
       
        Util.dialog(xwz.API_RILI_LIST, 800, 500, "财经日历", 'handan');
    });


    $("#send_siliao_btn").unbind("click").bind("click", function (event) {
        // var text = $.trim($("#siliao_content").val());

        var text = su.getContent();
        if (text) {
            if (nowTalkUid) {
                client.send(API.PRIVATE_CHAT_SEND + nowTalkUid, {}, text);
                var nowtime = Util.formatDate((new Date()).valueOf());
                var sex;
                if (xwz.User.getInstance().sex == 1) {
                    sex = "man";
                } else {
                    sex = "woman";
                }
                var message = '<div class="liaotian-div mymsg"><div class="liaotian-sender">';
                message += '<img width="25" height="25" src="/images/avatar/t3/32/' + User.avatar + '.png">';
                message += '<i class="name">' + User.nickName + '</i><i><img class="identicon"  src="/front/assets2/identity/' + User.identityIcon + '">';
                message += '</i><i><img width="16px" height="16px" src="/front/assets2/img/' + sex + '.png"></i>';
                message += '<i class="time">' + nowtime + '</i></div><div class="liaotian-content"><em>';
                message += '</em><div class="message">' + text + '</div><div class="clr"></div></div></div>';

                $("#siliao_diallog").find("#chat_windows").find(".active").append(message);
                $("#siliao_diallog").find("#chat_windows").find(".active")[0].scrollTop = 1e8;
                // $("#siliao_content").val("");
                su.setContent("");
            } else {
                alert("请选择聊天对象");
            }
        } else {
            alert("聊天信息不能为空");
        }
        return false;
    });

});






