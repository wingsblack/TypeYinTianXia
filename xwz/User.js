var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var xwz;
(function (xwz) {
    var userlist = {};
    var dialog;
    var User = (function (_super) {
        __extends(User, _super);
        function User() {
            _super.call(this);
            this.isLogin = false;
            this.isAdmin = false;
            this.forceBindMobile = false;
            this.sex = 1;
            this.API = xwz.Project.API_USER_EVENT;
        }
        User.prototype.onMessage = function (frame) {
            var c = JSON.parse(frame.body);
            var nickName = c.messageFrom.nickName;
            var uid = c.messageFrom.id;
            var identityIcon = c.messageFrom.identityIcon;
            var messageFrom = c.messageFrom;
            if (c.eventType == "USER_ONLINE") {
                xwz.Chat.appendTip(nickName + "上线了");
                userlist[messageFrom.id] = messageFrom;
                var len = $("#onlist").children("li[data-user=" + messageFrom.id + "]").length;
                if (len == 0) {
                    User.appendUser(messageFrom);
                }
            }
            else if (c.eventType == "USER_OFFLINE") {
                $("#onlist").children("li[data-user=" + uid + "]").remove();
                xwz.Chat.appendTip(nickName + "下线了");
            }
            else if (c.eventType == "USER_KICKED") {
                $("#onlist").children("li[data-user=" + uid + "]").remove();
                xwz.Chat.appendTip(nickName + "下线了");
            }
        };
        User.getAllUser = function () {
            var _this = this;
            xwz.Util.ajaxGet(xwz.Project.API_MEM_LIST, function (data) {
                _this.appendUser(data.rows);
            });
        };
        User.appendUser = function (rows) {
            rows = xwz.isArray(rows) ? rows : [rows];
            if (rows.length == 0)
                return;
            var html = '';
            for (var i = 0; i < rows.length; i++) {
                var user = rows[i];
                userlist[user.id] = user;
                var sleepWalk = user.sleepWalk == "1" ? "style='display:block'" : "";
                var time = xwz.Util.toTime(user.lastLoginOn, "yyyy-MM-dd hh:mm");
                html += '<li data-user="' + user.id + '" data-sleepWalk="' + user.sleepWalk + '" data-validUser="' + user.validUser + '">' +
                    '<img class="avatar" src="' + user.avatar + '"/>' +
                    '<div class="keabout"><div class="namelevel clearFix">' +
                    '<span class="name">' + user.nickName + '</span>' +
                    '<span class="level level3">LV&nbsp;' + user.identity + '</span>' +
                    '<span class="sleepWalk"  ' + sleepWalk + '></span>' +
                    '</div>' +
                    '<div class="time">' + time + '</div></div></li>';
            }
            $("#onlist").prepend($(html));
        };
        User.getUser = function (id) {
            return userlist[id];
        };
        User.prototype.login = function (loginName, password) {
            var _this = this;
            $.post(xwz.Project.API_USER_LOGIN, "loginName=" + loginName + "&password=" + password, function (data) {
                if (data.code == 0) {
                    //data = {
                    //    id: "ea3af0f050a4589e0150a929e7e30149",
                    //    roleCode: "service",
                    //    nickName: "天才",
                    //    sex: "",
                    //    identityIcon: "member_1.png",
                    //    avatar: "01",
                    //    isBindPhone: false
                    //}
                    _this.data = data.data;
                    dialog.close();
                    //socket.reConnection();
                    _this._onLogin(_this.data);
                }
                else {
                    $("#login-alert-error").html("<span>" + data.message + "</span>");
                }
            });
        };
        User.prototype._onLogin = function (data) {
            this.isLogin = true;
            this.id = data.id;
            this.nickName = data.nickName;
            this.avatar = data.avatar;
            this.isBindPhone = data.mobileBinded;
            this.roleCode = data.roleCode;
            $("#zbzhuce").hide();
            $("#login-info").show();
            $("#ytx-fayan").removeClass("disabled");
            $("#ytx-input").removeAttr("disabled").val("");
            $("#login-info .person_info_box").children().eq(0).html("昵称：" + this.nickName);
            $("#login-info .person_control").children().eq(0).html(this.nickName);
            $("img.data-avatar").attr("src", "/images/avatar/t3/32/" + this.avatar + ".png");
            if (this.isBindPhone)
                $("#bind_mobile").hide();
            this.isAdmin = data.roleCode == "super_admin" || data.roleCode == "service" || data.roleCode == "emcee" || data.roleCode == 'service' || false;
            if (this.isAdmin) {
                $("#editor-bar").show();
                $("#ytx-fayan .ask").hide();
            }
            else {
                $("#editor-bar").hide();
                $("#ytx-fayan .ask").show();
                $("#login-info .func_btn > div:eq(3)").hide();
            }
            if (this.roleCode == "super_admin" || this.roleCode == "admin") {
                $("#login-info .func_btn > div:eq(4)").show();
            }
            this.setMenu();
            this.RegisteredPrivateChat();
        };
        User.prototype._onLogout = function () {
            this.isLogin = false;
            $("#ytx-fayan").addClass("disabled");
            $("#ytx-input").attr("disabled", "disabled").val("请登陆后在发言");
            $("#zbzhuce").show();
            $("#login-info").hide();
            //Global.socket.removeChat(PrivateChat.API, PrivateChat.onMessage);
        };
        User.prototype.RegisteredPrivateChat = function () {
            xwz.PrivateChat.API = xwz.Project.API_PRIVATE_CHAT_GET + this.id;
            xwz.Global.socket.RegisteredChat(xwz.PrivateChat);
        };
        User.prototype.setMenu = function () {
            var _this;
            var menus = [];
            xwz.dropdown.setGlobalShow(function (li, menu) {
                menu.dataUser = li.attr('data-user');
                menu.validuser = li.attr("data-validuser");
                if (xwz.Global.user.id == menu.dataUser)
                    this.disable = true;
                else if (menu.validuser == "false")
                    this.disable = true;
                else if (!xwz.Global.user.isAdmin)
                    this.disable = true;
                else
                    this.disable = false;
            });
            menus.push({
                text: "发信息",
                click: function (li, menu) {
                    var uid = li.attr("data-user");
                    xwz.PrivateChat.talkto(uid, {
                        uid: uid,
                        name: li.find(".name").html()
                    });
                }
            });
            menus.push({
                text: "永久踢出",
                click: function (li) {
                    var uid = li.attr("data-user");
                    $.ajax({
                        url: xwz.Project.API_KICK + uid,
                        type: "POST",
                        data: {
                            uid: uid
                        },
                        success: function (data) {
                        },
                        error: function () {
                        }
                    });
                },
                onShow: function (li, menu) {
                }
            });
            //menus.push({
            //    text: "用户标记",
            //    click: function () {
            //    }
            //});
            menus.push({
                text: "用户等级",
                click: function (li, menu) {
                    var dataUser = li.attr("data-user");
                    art.dialog({
                        content: document.getElementById('user_lvl'),
                        id: 'EF893L',
                        title: '用户等级',
                        width: 350,
                        zIndex: 1500,
                        lock: true,
                        button: [
                            {
                                name: '确定',
                                callback: function () {
                                    var imgurl = $("#user_lvl_wrap input[name=userlevel]:checked").attr('imgurl');
                                    var imgarray = imgurl.split('/');
                                    var imgname = imgarray[imgarray.length - 1];
                                    // /app/account/updatebyadmin
                                    var uid = $("#user_lvl_uid").val();
                                    $.post(xwz.Project.API_HOST + '/app/account/updatebyadmin', { uid: dataUser, identity: imgname }, function (data) {
                                    });
                                    //$(".col2 #" + uid).find(".usergroup").empty();
                                    //$(".col2 #" + uid).find(".usergroup").html('<img width="19px" height="16px" src="' + imgurl + '">');
                                    return true;
                                },
                                focus: true
                            },
                            {
                                name: '取消'
                            }
                        ]
                    });
                },
                onShow: function (li, menu) {
                }
            });
            //menus.push({
            //    text: "取消标记",
            //    click: function () {
            //    }
            //});
            menus.push({
                text: "设置梦游",
                onShow: function (li, menu) {
                    this.text = li.attr("data-sleepwalk") == "0" ? "设置梦游" : "取消梦游";
                },
                click: function (li, menu) {
                    var sleepwalk = li.attr("data-sleepwalk");
                    var data = {
                        uid: this.user,
                        sleepwalk: sleepwalk == "0" ? "1" : "0"
                    };
                    $.post(xwz.Project.API_HOST + '/app/account/updatebyadmin', data, function () {
                        li.attr("data-sleepwalk", data.sleepwalk);
                        li.find(".sleepWalk").toggle(data.sleepwalk == "1");
                    });
                }
            });
            if (!this.isAdmin) {
                menus.length = 1;
                menus[0].disable = true;
            }
            xwz.dropdown.add(menus);
        };
        User.prototype.send = function (text, obj) {
            if (obj === void 0) { obj = {}; }
            xwz.Global.socket.send(xwz.Project.API_PUBLIC_CHAT_SEND + xwz.Project.COMPANY_ID, obj, text);
        };
        User.prototype.check = function () {
            xwz.Util.ajaxGet(xwz.Project.API_HOST + '/home/me', function (data) {
                if (data.code == 0 && data.data != null) {
                    this.data = data.data;
                    this._onLogin(this.data);
                }
                else {
                    $("#zbzhuce").show();
                }
            }.bind(this));
        };
        User.prototype.RegisteredEvent = function () {
            var _this = this;
            var faceOpen = false, selectOpen = false;
            //顶部注册登陆按钮
            $(".topzhuce").click(function () {
                dialog = art.dialog({
                    content: document.getElementById('user_login_fincebox'),
                    id: 'EF893L',
                    width: 388,
                    lock: true
                });
            });
            //登陆提交事件
            $('#login_form').on("submit", function () {
                var loginName = $("#name").val();
                if (loginName.length == 0) {
                    $("#login-alert-error").html("<span>用户名不能为空</span>");
                    return false;
                }
                var password = $("#password").val();
                if (password.length == 0) {
                    $("#login-alert-error").html("<span>密码不能为空</span>");
                    return false;
                }
                xwz.Global.user.login(loginName, password);
                return false;
            });
            //登陆住切换
            $("#show_quick_register_btn").click(function () {
                $("#user-login-wrap1").hide();
                $("#user-regitster-wrap-step1").show();
                $("#register-alert-error").hide();
            });
            $("#show_quick_login_btn").click(function () {
                $("#user-login-wrap1").show();
                $("#user-regitster-wrap-step1").hide();
                $("#register-alert-error").hide();
            });
            //快速注册第一步
            $("#new-login-btn").click(function () {
                var username = $("#new-register-form").find(".username_input").val();
                //console.log(username);
                if (username.length < 6 || username.length > 30) {
                    $("#new-register-form").find("#register-alert-error").find("span").html("用户名长度在6-30位之间");
                    $("#new-register-form").find("#register-alert-error").show();
                    return false;
                }
                var reg = /\w+/;
                if (!reg.test(username)) {
                    $("#new-register-form").find("#register-alert-error").find("span").html("用户名只能是数字和英文的组合");
                    $("#new-register-form").find("#register-alert-error").show();
                    return false;
                }
                var nickname = $("#new-register-form").find(".nickname_input").val();
                if (nickname == "") {
                    $("#new-register-form").find("#register-alert-error").find("span").html("请填写昵称");
                    $("#new-register-form").find("#register-alert-error").show();
                    return false;
                }
                var pwd = $("#new-register-form").find(".pwd_input").val();
                if (pwd == "") {
                    $("#new-register-form").find("#register-alert-error").find("span").html("请填写密码");
                    $("#new-register-form").find("#register-alert-error").show();
                    return false;
                }
                var repwd = $("#new-register-form").find(".repwd_input").val();
                if (pwd != repwd) {
                    $("#new-register-form").find("#register-alert-error").find("span").html("两次输入的密码不一致");
                    $("#new-register-form").find("#register-alert-error").show();
                    return false;
                }
                //login=a12341&password=123123&nickName=haohao
                var newregisterform = $("#new-register-form");
                newregisterform.find("#register-alert-error").hide();
                newregisterform.find(".username_input").val('');
                newregisterform.find(".nickname_input").val('');
                newregisterform.find('.pwd_input').val('');
                newregisterform.find('.repwd_input').val('');
                $.ajax({
                    url: xwz.Project.API_HOST + '/account/register',
                    data: 'login=' + username + '&nickName=' + nickname + '&password=' + pwd,
                    type: 'POST',
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 0) {
                            _this.data = data.data;
                            dialog.close();
                            _this._onLogin(data.data);
                        }
                        else {
                            $("#new-register-form").find("#register-alert-error").find("span").html(data.message);
                            $("#new-register-form").find("#register-alert-error").show();
                        }
                    }
                });
            });
            //退出登陆
            $("#btn_logout").click(function () {
                $.ajax({
                    url: xwz.Project.API_HOST + '/account/logout',
                    success: function (data) {
                        location.reload();
                        //_this._onLogout();
                    }
                });
            });
            //发言按钮
            $('#send_msg_btn').click(function () {
                var user = xwz.Global.user;
                if (!user.isLogin)
                    return;
                var text = $("#ytx-input").val();
                if (text) {
                    var c = $("[name=robot-chat]").prop("checked");
                    var robot = $("#SimulationSelect .SimulationText").attr("value");
                    if (robot && c) {
                        //机器人发言
                        user.send(text, { 'uid': robot, 'role': 'robot' });
                    }
                    else {
                        user.send(text);
                    }
                    $("#ytx-input").val("");
                }
                else {
                    alert("聊天信息不能为空");
                }
                return false;
            });
            //生成表情
            var emotionsData = xwz.Project.emotionsData;
            var ytxPopfaceTitle = '', ytxPopfaceBox = '', lastTitle = '', curTd = 0;
            var emotionsDataMap = xwz.Project.emotionsDataMap = {};
            for (var i = 0; i < emotionsData.length; i++) {
                if (i == 60) {
                    i = 60;
                }
                var tmp = emotionsData[i];
                if (lastTitle != tmp[2]) {
                    if (curTd != 0) {
                        curTd = 13 - curTd;
                        while (--curTd > 0) {
                            ytxPopfaceBox += '\t\t<td></td>\n';
                        }
                        ytxPopfaceBox += '\t</tr>\n';
                    }
                    if (lastTitle != "")
                        ytxPopfaceBox += '</table></div>\n';
                    lastTitle = tmp[2];
                    ytxPopfaceTitle += '<span>' + lastTitle + '</span>';
                    ytxPopfaceBox += ' <div class="ytx-popface-box" >' +
                        ' <table class="ytx-emotion-table">\n';
                }
                if (curTd == 12) {
                    ytxPopfaceBox += '\t</tr>\n';
                    curTd = 0;
                }
                if (curTd == 0)
                    ytxPopfaceBox += '\t<tr>\n';
                ytxPopfaceBox += '\t\t<td><a title="' + tmp[0] + '" mtype="face" class="undefined"><img src="' + tmp[1] + '" width="22" height="22"></a></td>\n';
                if (emotionsData.length == (i + 1) && curTd != 0) {
                    curTd = 13 - curTd;
                    while (--curTd > 0) {
                        ytxPopfaceBox += '\t\t<td></td>\n';
                    }
                    ytxPopfaceBox += '\t</tr>\n';
                }
                emotionsDataMap[tmp[0]] = tmp[1];
                curTd++;
            }
            $("#ytx-popface .ytx-popface-title").html(ytxPopfaceTitle);
            $("#ytxPopfaceBoxList").html(ytxPopfaceBox);
            $("#ytxPopfaceBoxList .ytx-popface-box:eq(0)").show();
            $("#ytx-popface .ytx-popface-title span").click(function () {
                var index = $(this).index();
                $(this).addClass("current").siblings().removeClass("current");
                $("#ytxPopfaceBoxList").children(".ytx-popface-box").hide().eq(index).show();
                return false;
            }).eq(0).addClass("current");
            $("#ytx-popface").delegate("a[mtype=face]", "click", function () {
                $("#ytx-popface").hide();
                var val = $("#ytx-input").val();
                $("#ytx-input").val(val + "[@" + this.getAttribute("title") + "]");
            });
            $(document).click(function () {
                if (faceOpen) {
                    $("#ytx-popface").hide();
                    faceOpen = false;
                }
                if (selectOpen) {
                    faceOpen = false;
                    $("#SimulationSelect .SimulationOptions").hide();
                }
                $("#dropdown").hide();
            });
            $("#ytx-fayan-toolbar .toolbar-icon-face").click(function () {
                if (!xwz.Global.user.isLogin)
                    return;
                faceOpen = true;
                $("#ytx-popface").show();
                return false;
            });
            $("#ytx-fayan-toolbar").delegate("a[data-msg]", "click", function () {
                if (!xwz.Global.user.isLogin)
                    return;
                var text = $(this).attr("data-msg");
                xwz.Global.user.send(text);
            });
            //机器人下拉框模拟
            $("#SimulationSelect > .SimulationText").click(function () {
                $(this).next(".SimulationOptions").show();
                selectOpen = true;
                return false;
            });
            $("#SimulationSelect").delegate("a", "click", function () {
                var $this = $(this);
                var $target = $("#SimulationSelect > .SimulationText");
                $target.html($this.html()).attr("value", $this.attr("value"));
                $("#SimulationSelect .SimulationOptions").hide();
                $this.addClass("selected").siblings().removeClass("selected");
            });
            //右侧公告点击
            $("#ytx-guangbo").delegate(".ytx-guangbo-title span", "click", function () {
                var index = $(this).index();
                $(this).addClass("current").siblings().removeClass("current");
                $("#ytx-guangbo").children(".ytx-guangbo-context").hide().eq(index).show();
            });
            //顶部用户信息查看
            $(".login-info").mouseover(function (event) {
                $(".person_info_box").show();
            }).mouseleave(function (event) {
                $(".person_info_box").hide();
            });
            //手机绑定
            $("#bind_mobile").click(function () {
                $(".zui_dialog").find('.close').click();
                art.dialog({
                    content: document.getElementById('user_bind_mobile_fincebox'),
                    id: 'EF893L',
                    width: 388,
                    lock: true,
                    esc: false,
                    init: function () {
                        if (xwz.Global.user.forceBindMobile == true) {
                            $("#user_bind_mobile_fincebox").parents(".aui_dialog").find(".aui_close").remove();
                        }
                    }
                });
            });
            $("#find_pwd_findcebox .getsmscode").click(function () {
                findPwdAlertDiv.hide();
                var mobile = $("#find_pwd_findcebox #find_pwd_mobile").val();
                var reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
                if (mobile == "") {
                    $("#find_pwd_findcebox  .find_pwd_s1 .alert span").html("请填写手机号码");
                    findPwdAlertDiv.show();
                    return false;
                }
                else if (!reg.test(mobile)) {
                    $("#find_pwd_findcebox  .find_pwd_s1 .alert span").html("请填写正确的手机号码");
                    findPwdAlertDiv.show();
                    return false;
                }
                var captcha_v = $("#find_pwd_captcha").val();
                if (captcha_v == "") {
                    $("#find_pwd_findcebox  .find_pwd_s1 .alert span").html("请填写验证码");
                    findPwdAlertDiv.show();
                    return false;
                }
                $("#find_pwd_findcebox .getsmscode").attr('disabled', true);
                $.ajax({
                    url: xwz.Project.API_HOST + '/account/getSmsCode?newUser=false&captcha=' + captcha_v + '&mobile=' + mobile,
                    type: 'POST',
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 0) {
                            daojishi2($("#find_pwd_findcebox .getsmscode"));
                        }
                        else {
                            $("#find_pwd_findcebox  .find_pwd_s1 .alert span").html(data.message);
                            findPwdAlertDiv.show();
                            $("#find_pwd_findcebox .getsmscode").removeAttr('disabled');
                            $("#find_pwd_findcebox .getsmscode").attr('disabled', false);
                        }
                    }
                });
            });
            var _onlistTop = $("#onlist").offset().top;
            //绑定左侧用户右键
            $("#onlist").on('click', 'li', function (e) {
                if (!xwz.Global.user.isLogin)
                    return;
                var dataValiduser = $(this).attr("data-validuser");
                var offset = {
                    left: e.clientX + 10,
                    top: e.clientY
                };
                xwz.dropdown.target = $(this);
                xwz.dropdown.show({
                    left: offset.left,
                    top: offset.top
                });
                return false;
            });
            $(document).on('click', '.ask a', function () {
                art.dialog({
                    title: '提交问题',
                    content: document.getElementById('demoCode_content_DOM2'),
                    id: 'EF893L2',
                    okVal: '提交问题',
                    ok: function () {
                        alert('问题已经提交');
                    }
                });
            });
            $(document).on('click', '.handan-btn', function () {
                xwz.Util.dialog(xwz.Project.HANDAN_QUICK, 1000, 200, "发布喊单", 'handan_fabu');
            });
            //审核通过
            $(document).on('click', '.auditmsgbtn', function () {
                var msgid = $(this).attr('msgid');
                var self = $(this);
                $.post(xwz.Project.API_HOST + '/chat/approve/' + msgid, function (data) {
                    if (data.code == 0) {
                        self.remove();
                    }
                }, 'json');
            });
        };
        return User;
    })(xwz.EventDispatcher);
    xwz.User = User;
})(xwz || (xwz = {}));
//# sourceMappingURL=User.js.map