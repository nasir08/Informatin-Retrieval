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
        //document.all[name1].click();
        //VAM_GetById(name1).click(); // REPLACEMENT
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
    //showHideHelper(show, "inline");
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