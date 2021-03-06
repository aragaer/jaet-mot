Components.utils.import("resource://gre/modules/Services.jsm");
var charList;
var chars = {};
var unsel;
function mot_onLoad() {
    var authman = Cc["@aragaer/eve/auth-manager;1"].getService(Ci.nsIEveAuthManager);
    var selected = getIntPref("mot.selected_char");
    charList = document.getElementById("char");
    unsel = charList.appendItem("Select character", -1);
    charList.selectedIndex = 0;
    charList.addEventListener("command", charChanged, false);

    Cc["@aragaer/eve-hr-manager;1"].getService(Ci.nsIEveHRManager).
        getAllCharacters({}).forEach(function (c) {
            if (authman.getTokenForChar(c, Ci.nsEveAuthTokenType.TYPE_FULL))
                chars[c.id] = c;
        });

    for each (var c in chars) {
        var itm = charList.appendItem(c.name, c.id);
        if (c.id == selected) {
            charList.selectedIndex = charList.getIndexOfItem(itm);
            charChanged();
        }
    }

}

function charChanged() {
    if (charList.value == -1)
        return;
    charList.removeItemAt(charList.getIndexOfItem(unsel));
    Services.prefs.setIntPref("mot.selected_char", charList.value)

    var end  = Date.now();
    var start = 0; //end - 24*60*60*1000;
    println("Transactions from "+Date(start)+" to "+Date(end));

    var trlist = Cc["@aragaer/eve/wallet/manager;1"].getService(Ci.nsIEveWalletManager).
        getTransactionsForChar(chars[charList.value], start, end, {});

    for each (var tr in trlist) {
        println("Transaction: "+tr.typeID+" x"+tr.quantity+" "+
            (tr.type == Ci.nsEveTransactionType.TYPE_BUY ? "bought" : "sold") +
            " for " + tr.price + " each on "+tr.timestamp+" = "+(new Date(tr.timestamp)));
    }
}

