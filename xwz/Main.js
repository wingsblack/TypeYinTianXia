xwz.Global.socket = new xwz.Socket(xwz.Project.API_SOCKET_SERVER);
$(function () {
    var socket = xwz.Global.socket;
    var user = xwz.Global.user = new xwz.User();
    var Project = xwz.Project;
    socket.connect(Project.CONST_LOGIN, Project.CONST_PASS_CODE);
    xwz.Chat.getChatHistory();
    xwz.User.getAllUser();
    //右键菜单
    xwz.dropdown.init();
    var publicChat = new xwz.PublicChat();
    socket.RegisteredChat(publicChat);
    socket.RegisteredChat(user);
    user.check();
    user.RegisteredEvent();
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
        xwz.Util.dialog(xwz.Project.API_RILI_LIST, 800, 500, "财经日历", 'handan');
    });
});
//# sourceMappingURL=Main.js.map