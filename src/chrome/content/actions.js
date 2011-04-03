var status, tabbox;
Components.utils.import("resource://gre/modules/Services.jsm");

function onLoad() { }

function confirmQuit() {
    if (!confirm("Really quit JAET?")) // TODO: use .properties
        return false;

    var cancelQuit = Cc["@mozilla.org/supports-PRBool;1"].createInstance(Ci.nsISupportsPRBool);
    cancelQuit.data = false;
    Services.obs.notifyObservers(cancelQuit, "quit-application-requested", null);
    return !cancelQuit.data;
}

function quit() {
    if (confirmQuit())
        doQuit(false);
}

function doQuit(aForceQuit) {
    var appStartup = Cc['@mozilla.org/toolkit/app-startup;1'].
            getService(Ci.nsIAppStartup);

    appStartup.quit(aForceQuit
            ? Ci.nsIAppStartup.eForceQuit
            : Ci.nsIAppStartup.eAttemptQuit);
}

function setupPreferences() {
    println("Preferences activated.");
    openPreferences();
}

function openExtManager() {
    println("Extension manager activated.");
    openDialog("chrome://mozapps/content/extensions/extensions.xul?type=extensions",
            "", "chrome,menubar,extra-chrome,toolbar,dialog=no,resizable");
}

function openPreferences(paneID) {
    var instantApply = getBoolPref("browser.preferences.instantApply", false);
    var features = "chrome,titlebar,toolbar,centerscreen" +
        (instantApply ? ",dialog=no" : ",modal");
    var wm = Cc["@mozilla.org/appshell/window-mediator;1"].
            getService(Ci.nsIWindowMediator);
    var win = wm.getMostRecentWindow("Preferences");
    if (win) {
        win.focus();
        if (paneID) {
            var pane = win.document.getElementById(paneID);
            win.document.documentElement.showPane(pane);
        }
    } else 
        openDialog("dialogs/preferences.xul", "Preferences", features, paneID);
}

