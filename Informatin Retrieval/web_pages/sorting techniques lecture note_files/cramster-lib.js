var bIsShowingRequest = false;
var nTimerId = null;
var nInactiveTimerId = null;
var sChatRoomIdList;
var bIsIE = (navigator.userAgent.indexOf('MSIE') >= 0);
var bIsFF = (navigator.userAgent.indexOf('Firefox') >= 0);
var bIsAccepted = false;
var objLastDate = new Date();
var bMadeInactive = false;
var sReopenChatRoomURL;
var iIterations = 0;
var nMasterChatRoomId = 0;
var sChatURL = "";
var bIsAutoconnect = 0;
$(document).ready(function () {
    if (typeof bIsOnline === "boolean" && bIsOnline) {
        BeginCheckInterval();
        VerifyActivity();
    }
    $("body").keydown(function () {
        objLastDate = new Date();
        // reactivate if had been inactive
        if (bMadeInactive) {
            bMadeInactive = false;
            UpdateChatStatus(true, bIsFbStatus);
            VerifyActivity();
        }
    }).mousedown(function () {
        objLastDate = new Date();
        // reactivate if had been inactive
        if (bMadeInactive) {
            bMadeInactive = false;
            UpdateChatStatus(true, bIsFbStatus);
            VerifyActivity();
        }
    });
    $("#lnkGoOffline").click(function () {
        UpdateChatStatus(false, false);
    });
    $("#lnkGoOfflineFB").click(function () {
        // UpdateChatStatusWebservice(false, true);
        UpdateChatStatus(false, true);
    });
    $("#lnkGoOnline").click(function () {
        // UpdateChatStatusWebservice(true, false);
        UpdateChatStatus(true, false);
    });
    $("#lnkGoOnlineFB").click(function () {
        UpdateChatStatus(true, true);
    });
    $("#cmdReopenChatRoom").click(function () {
        ReOpenChatRoom();
    });
    $("#imgClose").click(function () {
        $("#divChatAlreadyAccepted").hide();
    });
    $("#imgConfirmJoinPromptClose").click(function () {
        $("#divChatAlreadyAccepted").hide();
    });
    $("#imgGoOfflineClose").click(function () {
        $("#divGoOffline").hide();
    });
    $("#imgGoOfflineCloseButton").click(function () {
        $("#divGoOffline").hide();
    });
    $("#imgStayOpted").click(function () {
        $("#optOnline").click();
        $("#divGoOffline").hide();
    });
    $("#cmdCloseChatRoomPopup").click(function () {
        $("#divPopupWarning").hide();
    });
    $("#cmdYesFBLink").click(function () {
        LoginPopUp(nStudentId);
    });
    $("#cmdNoFBLink").click(function () {
        Redirect();
    });
    $("#lnkStudyBlog").mouseover(function () {
        StudyBlogTabMouseOver();
    }).mouseout(function () {
        StudyBlogTabMouseOut();
    });
    $("#lnkFbInviteStudyGroup").click(function () {
        showInviteModalStudyGroup();
    });
    $("#divModalPageLogin").keydown(function (evt) {
        if (evt.keyCode == 13) {
            evt.cancelBubble = true;
            evt.returnValue = false;
            $("#cmdLogin").click();
        }
        else if (evt.keyCode == 27) {
            hideLoginModal();
        }
    });
    
    $("#wucTop1_liTabMyCramster").mouseover(function () {
        $("#divDropdown").show();
    });
    $("#wucTop1_liTabMyCramster").mouseout(function () {
        $("#divDropdown").hide();
    });
    // lstChapter On change function
    $("#lstChapter").change(function () {
        var objChapter = $("#lstChapter");
        var iIndex = objChapter.attr("selectedIndex");
        if (iIndex != 0) {
            //web service call to load problems based on chapter id
            // alert("selectedIndex");
            $("#divAjaxSpinner").show();
            $("#divlstProblem").hide();
            var objBookProblem = {};
            objBookProblem.nStudentId = nStudentId;
            objBookProblem.nChapterId = objChapter.attr("value");
            var DTO = {
                "objBookProblem": objBookProblem
            };
            $.ajax({
                type: "POST",
                url: "/WebService/ChatService.asmx/GetBookProblems",
                data: JSON.stringify(DTO),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    //alert("xc");
                    $("#divAjaxSpinner").hide();
                    $("#divlstProblem").show();
                    $("#lstProblem").html(msg.d);
                    $("#lstProblem").show();
                }
            });
        }
    });
    //lstProblem On change function
    $("#lstProblem").change(function () {
        var objProblem = $("#lstProblem");
        var iIndex = objProblem.attr("selectedIndex");
        if (iIndex != 0) {
            //web service call to get problem_id based on solution_problem_id
            var objSolutionProblem = {};
            objSolutionProblem.sSolutionProblemId = objProblem.attr("value");
            var DTO = {
                "objSolutionProblem": objSolutionProblem
            };
            $.ajax({
                type: "POST",
                url: "/WebService/ChatService.asmx/GetSolutionProblemId",
                data: JSON.stringify(DTO),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    $("#txtProblemID").val(msg.d);
                    $("#txtProblemID").show();
                }
            });
        }
    });
});

// ----------------------------------------
// Live Person
// ----------------------------------------
function BeginCheckInterval() {
    if (nTimerId == null) nTimerId = window.setInterval(function () {
        ChatRequestPulse();
    }, nChatCheckPulseTimeInSeconds);
}
function ToggleInterval(bStart) {
    if (bStart) BeginCheckInterval();
    else {
        clearInterval(nTimerId);
        nTimerId = null;
    }
}
function ChatRequestPulse() {
    $.ajax({
        type: "POST",
        url: "/WebService/ChatService.asmx/CheckChat",
        data: "{'nStudentId':'" + nStudentId.toString() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d.nStudentId != 0) {
                // Replace modal dialog with floating div
                //                $.sound.play("/Flash/chat/ding.wav",{timeout:1000
                //                });
                //                window.setTimeout(,timeInMilliseconds);
                nMasterChatRoomId = msg.d.nChatRoomId;
                bIsAutoconnect = msg.d.bIsAutoConnect
                $("#divPanelChatRequest").html(msg.d.sRequestHtml);
                $("#divChatRequest").show();
                bIsShowingRequest = true;
                ToggleInterval(false);
                var oldTitle = document.title;
                var msg = "CramChat request received!";
                var timeoutId = setInterval(function () {
                    document.title = document.title == msg ? ' ' : msg;
                }, 1000);
                window.onmousemove = function () {
                    clearInterval(timeoutId);
                    document.title = oldTitle;
                    window.onmousemove = null;
                };
                window.onfocus = function () {
                    clearInterval(timeoutId);
                    document.title = oldTitle;
                    window.onmousemove = null;
                };
                // Start pulsing to check for cancelled/lost out request.
                BeginInactiveInterval();
            }
        },
        error: function (msg) {
            //alert(msg.responseText);
        }
    });
}
function BeginInactiveInterval() {
    iIterations = 0; // initialize variable used for timed out requests
    if (nInactiveTimerId == null) nInactiveTimerId = window.setInterval(function () {
        RequestInactivePulse();
    }, nChatCheckPulseTimeInSeconds);
}
function ToggleInactiveInterval(bStart) {
    if (bStart) BeginInactiveInterval();
    else {
        clearInterval(nInactiveTimerId);
        nInactiveTimerId = null;
    }
}
function RequestInactivePulse() {
    iIterations++;
    if (iIterations * nChatCheckPulseTimeInSeconds > MAX_WITHOUT_ACTIVITY * 1000) {
        // request timed out
        UpdateChatRequest(nMasterChatRoomId, nStudentId, 3, 0);
    }
    else {
        $.ajax({
            type: "POST",
            url: "/WebService/ChatService.asmx/CheckChat",
            data: "{'nStudentId':'" + nStudentId.toString() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d == 4) {
                    // either lost out on chat request or student cancelled request
                    $("#divPanelChatRequest").html("");
                    $("#divChatRequest").hide();
                    bIsShowingRequest = false;
                    // stop checking inactive
                    ToggleInactiveInterval(false);
                    // start checking for new chat requests again
                    ToggleInterval(true);
                }
            }
        });
    }
}
// Switch an expert online/offline
function UpdateChatStatus(bGoOnline, bIsFacebook) {
    var ChatStatus = {};
    ChatStatus.nStudentId = nStudentId;
    ChatStatus.bIsOnline = bGoOnline;
    var DTO = {
        "objChatStatus": ChatStatus
    };
    $.ajax({
        type: "POST",
        url: "/WebService/ChatService.asmx/ChatStatusUpdate",
        data: JSON.stringify(DTO),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            // Update status of expert (go online/offline)
            bIsOnline = bGoOnline;
            if (bIsFacebook) {
                bIsOnline ? $("#wucTop1_divFBChatLoggedIn").show() : $("#wucTop1_divFBChatLoggedIn").hide();
                bIsOnline ? $("#wucTop1_divFBChatLoggedOut").hide() : $("#wucTop1_divFBChatLoggedOut").show();
                $("#wucTop1_divChatLoggedIn").hide();
                $("#wucTop1_divChatLoggedOut").hide();
            }
            else {
                bIsOnline ? $("#wucTop1_divChatLoggedIn").show() : $("#wucTop1_divChatLoggedIn").hide();
                bIsOnline ? $("#wucTop1_divChatLoggedOut").hide() : $("#wucTop1_divChatLoggedOut").show();
                $("#wucTop1_divFBChatLoggedIn").hide();
                $("#wucTop1_divFBChatLoggedOut").hide();
            }
            // Check if going offline and if so hide any open chat requests
            if (!bIsOnline) {
                ToggleInactiveInterval(false);
                $("#divPanelChatRequest").html("");
                $("#divChatRequest").hide();
                bIsShowingRequest = false;
            }
            // Start/stop polling for chat requests
            ToggleInterval(bIsOnline);
        }
    });
}
// Activity Check
function VerifyActivity() {
    var objCurrentDate = new Date(); // current date and time
    var nDifference = ((objCurrentDate - objLastDate) / (1000));
    if ((nDifference > MAX_WITHOUT_ACTIVITY) && (!bIsShowingRequest)) {
        bMadeInactive = true;
        UpdateChatStatus(false);
    }
    else setTimeout("VerifyActivity()", 10000);
}
// Popup Warning
function ReOpenChatRoom() {
    if (sReopenChatRoomURL == null || sReopenChatRoomURL == "" || sReopenChatRoomURL == "undefined") return;
    $("#divPopupWarning").hide();
    OpenChatPopupNoResize(sReopenChatRoomURL, 990, 700);
}
function OpenChatPopupNoResize(URL, nWidth, nHeight) {
    sReopenChatRoomURL = URL;
    id = new Date().getTime();
    // try taking chat roomid if possible
    try {
        var popup = window.open(URL, 'ChatPopup' + id, 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=' + nWidth + ',height=' + nHeight);
        if (popup == null) ShowPopupBlockWarning();
        if (window.opera) {
            if (!popup.opera) ShowPopupBlockWarning();
        }
    }
    catch (err) {
        // ShowPopupBlockWarning();
        // Check whether to call or not
        return false;
    }
}
function ShowPopupBlockWarning() {
    var formHeight;
    if ((document.getElementById("form1") == null) || (document.getElementById("form1") == "undefined")) formHeight = document.getElementById("Form1").scrollHeight;
    else formHeight = document.getElementById("form1").scrollHeight;
    var modalBackground = document.getElementById("divPopupWarningBackground");
    modalBackground.style.height = formHeight + "px";
    $("#divPopupWarning").show();
}
// ----------------------------------------
// Book Edition Choose
// ----------------------------------------
function checkSelectedValue() {
    var formHeight;
    var lstChapterValue = $("#lstChapter").val();
    var lstProblemValue = $("#lstProblem").val();
    if ((document.getElementById("form1") == null) || (document.getElementById("form1") == "undefined")) formHeight = document.getElementById("Form1").scrollHeight;
    else formHeight = document.getElementById("form1").scrollHeight;
    if (lstChapterValue == 0) {
        $("#spanChapter").show();
        $("#spanProblem").hide();
    }
    else {
        if ((lstProblemValue == 0) || (lstProblemValue == undefined)) {
            $("#spanProblem").show();
            $("#spanChapter").hide();
        }
    }
    $("#modalBookEditionPopup").show();
    document.getElementById("modalBookEditionBackground").style.height = formHeight + "px";
    if ((lstChapterValue != 0) && (lstProblemValue != 0) && (lstProblemValue != undefined)) {
        $("#spanChapter").hide();
        $("#spanProblem").hide();
        $("#modalBookEditionPopup").hide();
        var ProblemId = $("#txtProblemID").val();
        var sProblemId = String(ProblemId);
        var strLen = sProblemId.length;
        var sFind = sProblemId.charAt(strLen - 1);
        var sArray;
        window.location = sRootWeb + 'solution-problem.aspx?problem_id=' + lstProblemValue;
    }
}
function hideBookEditionPPCPopup() {
    $("#modalBookEditionPopup").hide();
}
// ----------------------------------------
// Chat Request
// ----------------------------------------
function OpenChatRoom(nChatRoomId, sURL) {
    // Update chat room and chat request to accept
    sChatURL = sURL;
    $("#divPanelChatRequest").html("");
    $("#divChatRequest").hide();
    bIsAccepted = true;
    var DTO = {
        "nChatRoomId": nChatRoomId
    };
    $.ajax({
        type: "POST",
        url: "/WebService/ChatService.asmx/GetChatRoomStatusId",
        data: JSON.stringify(DTO),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d.nChatRoomStatusId == 1) {
                OpenChatPopupNoResize(sChatURL, 990, 700);
            }
            else {
                if (bIsAutoconnect == true) {
                    ChatAlreadyAcceptedPrompt();
                }
            }
        }
    });
    //OpenChatPopupNoResize(sChatURL, 990, 700);
    //UpdateChatRequest(nChatRoomId, nStudentId, 1, 0);
}
function BlockUser(nChatRoomId, nToStudentId) {
    UpdateChatRequest(nChatRoomId, nStudentId, 0, nToStudentId);
}
function ClearChatRequest(nChatRoomId) {
    UpdateChatRequest(nChatRoomId, nStudentId, 2, 0);
}
function UpdateChatRequest(nChatRoomId, nStudentId, iOption, nBlockedStudentId) {
    // iOption = 0 :  decline chat request and block user
    // iOption = 1 :  accept chat request
    // iOption = 2 :  decline chat request
    // iOption = 3 :  timed out
    // iOption = 4 :  lost out  - this option should not be called from here
    var objChatRequestStatus = {};
    objChatRequestStatus.nStudentId = nStudentId;
    objChatRequestStatus.nChatRoomId = nChatRoomId;
    objChatRequestStatus.iOption = iOption;
    objChatRequestStatus.nBlockedStudentId = nBlockedStudentId;
    var DTO = {
        "objChatRequestStatus": objChatRequestStatus
    };
    $.ajax({
        type: "POST",
        url: "/WebService/ChatService.asmx/ChatRequestUpdate",
        data: JSON.stringify(DTO),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d != 0) {
                // accept or rejection successful
                $("#divPanelChatRequest").html("");
                $("#divChatRequest").hide();
                bIsShowingRequest = false;
                if (iOption == 1) bIsAccepted = true;
                else bIsAccepted = false;
                // stop checking inactive
                ToggleInactiveInterval(false);
                // start checking for new chat requests again
                ToggleInterval(true);
                if (bIsAccepted) OpenChatPopupNoResize(sChatURL, 990, 700);
            }
            else {
                // chat request cancelled by other user or other expert accepted first
                $("#divPanelChatRequest").html("");
                $("#divChatRequest").hide();
                bIsShowingRequest = false;
                bIsAccepted = false;
                // stop checking inactive
                ToggleInactiveInterval(false);
                // start checking for new chat requests again
                ToggleInterval(true);
            }
        }
    });
}
function ChatAlreadyAcceptedPrompt() {
    var divAcceptedPrompt = $("#divChatAlreadyAccepted");
    ShowModal(divAcceptedPrompt, true);
}
function ChatOfflinePopup() {
    var divGoOffline = $("#divGoOffline");
    ShowModal(divGoOffline, true);
}
function ShowModal(div, bShow) {
    if (bShow) {
        div.show();
        div.css("margin-left", "-" + parseInt(div.outerWidth() / 2).toString() + "px");
        div.css("margin-top", "-" + parseInt(div.outerHeight() / 2).toString() + "px");
    }
    else {
        div.hide();
    }
}
function popup(URL, width, height) {
    day = new Date();
    id = day.getTime();
    eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=' + width + ',height=' + height + '');");
}
function pupupSSL(URL, width, height) {
    window.open(URL, 'verisign_ssl', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=' + width + ',height=' + height + '');
}
function popupnoresize(URL, width, height) {
    day = new Date();
    id = day.getTime();
    eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=' + width + ',height=' + height + '');");
}
function popupcenterednoresize(URL, width, height) {
    day = new Date();
    id = day.getTime();
    var left = Math.floor((screen.availWidth - width) / 2);
    var top = Math.floor((screen.availHeight - height) / 2);
    eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=' + width + ',height=' + height + ',left='+left+',top='+top+'');");
}
function popupwithscroll(URL, width, height) {
    day = new Date();
    id = day.getTime();
    eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=' + width + ',height=' + height + '');");
}
function testEnterKey(evt, name1) {
    if (evt.keyCode == 13 || evt.charCode == 13) {
        evt.cancelBubble = true;
        evt.returnValue = false;
        document.getElementById(name1).click();
        return false; // NEW!
    }
}
function showHide(show, hide) {
    showHideHelper(hide, "none");
    showHideHelper(show, "block");
}
function showHideInline(show, hide) {
    showHideHelper(hide, "none");
    showHideHelper(show, (document.all && !window.opera) ? 'inline' : 'table-row');
}
function showHideHelper(elems, val) {
    if (elems == null) return;
    if (elems.length) {
        for (var i = 0; i < elems.length; i++) {
            showHideHelper2(elems[i], val);
        }
    }
    else {
        showHideHelper2(elems, val);
    }
}
function showHideHelper2(elem, val) {
    if (document.getElementById(elem)) document.getElementById(elem).style.display = val;
    if (document.getElementById(elem)) document.getElementById(elem).style.visibility = (val == 'none' ? 'hidden' : 'visible');
}
function ChangeSearchHelpText() {
    var el = getElemRefs('WucTop1_lstSearch');
    if (el.value == '1') {
        document.getElementById("TemplateSearchHelp").innerHTML = "Enter author's last name, title, or ISBN."
    }
    else if (el.value == '2') {
        document.getElementById("TemplateSearchHelp").innerHTML = "Enter a keyword or phrase above."
    }
    else if (el.value == '3') {
        document.getElementById("TemplateSearchHelp").innerHTML = "Enter a keyword or phrase above."
    }
    else if (el.value == '5') {
        document.getElementById("TemplateSearchHelp").innerHTML = "Enter a phrase like 'quadratic equation'."
    }
    else {
        document.getElementById("TemplateSearchHelp").innerHTML = "Enter a user's nickname above."
    }
}
function getElemRefs(id) {
    var el = (document.getElementById) ? document.getElementById(id) : (document.all) ? document.all[id] : (document.layers) ? document.layers[id] : null;
    if (el) el.css = (el.style) ? el.style : el;
    return el;
}
// clear items in specified listbox    
function clearlistbox(lb) {
    for (var i = lb.options.length - 1; i >= 1; i--) {
        lb.options[i] = null;
    }
    lb.selectedIndex = 0;
}
function StudyBlogTabMouseOver() {
    // nShowUnreadCount = <%=m_nShowUnreadCount %>;
    //TODO:  Drop nShowUnreadCount on wucTop in PageLoad
    if (nShowUnreadCount == 1) $("#divStudyBlogUnreadCount").hide();
}
function StudyBlogTabMouseOut() {
    // nShowUnreadCount = <%=m_nShowUnreadCount %>;
    //TODO:  Drop nShowUnreadCount on wucTop in PageLoad
    if (nShowUnreadCount == 1) $("#divStudyBlogUnreadCount").show();
}
function showConfirmModal() {
    // ClearControls();
    var formHeight;
    if ((document.getElementById("form1") == null) || (document.getElementById("form1") == "undefined")) formHeight = document.getElementById("Form1").scrollHeight;
    else formHeight = document.getElementById("form1").scrollHeight;
    var modalBackgroundConfirm = document.getElementById("divModalBackgroundConfirm");
    modalBackgroundConfirm.style.height = formHeight + "px";
    $("#wucTop1_divModalPageConfirm").show();
}
function showInviteModal() {
    //ClearControls();
    var formHeight;
    if ((document.getElementById("form1") == null) || (document.getElementById("form1") == "undefined")) formHeight = document.getElementById("Form1").scrollHeight;
    else formHeight = document.getElementById("form1").scrollHeight;
    var modalBackgroundConfirm = document.getElementById("divModalBackgroundInvite");
    modalBackgroundConfirm.style.height = formHeight + "px";
    $("#wucTop1_divModalPageInvite").show();
}
function showInviteModalStudyGroup() {
    //ClearControls();
    var formHeight;
    if ((document.getElementById("frmStudyGroup") == null) || (document.getElementById("frmStudyGroup") == "undefined")) formHeight = document.getElementById("frmStudyGroup").scrollHeight;
    else formHeight = document.getElementById("frmStudyGroup").scrollHeight;
    var modalBackgroundConfirm = document.getElementById("divModalBackgroundInviteStudyGroup");
    modalBackgroundConfirm.style.height = formHeight + "px";
    $("#divModalPageInviteStudyGroup").show();
}
function showLoginModal() {
    // ClearControls();
    var formHeight;
    if ((document.getElementById("form1") == null) || (document.getElementById("form1") == "undefined")) formHeight = document.getElementById("Form1").scrollHeight;
    else formHeight = document.getElementById("form1").scrollHeight;
    var modalBackground = document.getElementById("divModalBackground");
    modalBackground.style.height = formHeight + "px";
    $("#wucTop1_divModalPageLogin").show();
}
function PageLogin() {
    if (nStudentId == 0) {
        showConfirmModal();
    }
    else {
        var sURL = window.location.href;
        window.location.href = sURL;
    }
}
function hideLoginModal() {
    $("#wucTop1_divModalPageLogin").hide();
    // ClearControls();
}
function ClearControls() {
    // TODO:  Drop below Id's on page
    $("#" + sEmailId).val("");
    $("#" + sPasswordId).val("");
    $("#" + sLblErrorId).html("");
}
function LoginPopUp(student) {
    $("#wucTop1_divModalPageConfirm").hide();
    if (student == 0) {
        showLoginModal();
    }
}
// ----------------------------------------
// Facebook
// ----------------------------------------
// deprecated
function Redirect() {}
// deprecated
function ShowForgotPassword() {} 
// deprecated
function RefreshPageLogin() {}
// deprecated
function RefreshPageLogout() {}
// deprecated
function feed () {}
// ----------------------------------------
// Search
// TOOD - deprecate
// ----------------------------------------
function clearText(param) {
    if (param.value == 'enter your search') param.value = '';
}
function setDefaultText(param) {
    if (param.value.length == 0) param.value = 'enter your search';
}
// ----------------------------------------
// Misc
// ----------------------------------------
function removeUnsafeChars(param) {
    if ((param == null) || (param == undefined)) return;
    var sReturn = param;
    sReturn = sReturn.replace(/</g, '');
    sReturn = sReturn.replace(/>/g, '');
    sReturn = sReturn.replace("'", '');
    sReturn = sReturn.replace('"', '');
    sReturn = sReturn.replace('(', '');
    sReturn = sReturn.replace(')', '');
    sReturn = sReturn.replace('[', '');
    sReturn = sReturn.replace(']', '');
    sReturn = sReturn.replace(/{/g, '');
    sReturn = sReturn.replace(/}/g, '');
    sReturn = sReturn.replace(/|/g, '');
    sReturn = sReturn.replace(/@/g, '');
    sReturn = sReturn.replace(/#/g, '');
    return sReturn;
}
function UpdateChatRating(param, nChatRoomId, nCourseId, nToStudentId, nModeratorStudentId, nChatGroupId) {
    var nRating = $(param).prev().prev().val();
    // var objErr = $("#DataGridChat tr.grid_header").children(":last");
    var objErr = $(param).next().next();
    if ((nRating == 0) || (nRating == undefined)) {
        objErr.empty();
        objErr.text("Please select rating and update");
        return;
    }
    // Web service call to submit rating for chat session
    var objSubmitRating = {};
    objSubmitRating.nStudentId = nToStudentId;
    objSubmitRating.iRating = nRating;
    objSubmitRating.nChatRoomId = nChatRoomId;
    objSubmitRating.nCourseId = nCourseId;
    objSubmitRating.nChatGroupId = nChatGroupId;
    objSubmitRating.nModeratorStudentId = nModeratorStudentId;
    var DTO = {
        "objSubmitRating": objSubmitRating
    };
    $.ajax({
        type: "POST",
        url: "/WebService/ChatService.asmx/UpdateRating",
        data: JSON.stringify(DTO),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            // On success, close chat window.
            objErr.text("Rating updated...");
        }
    });
}