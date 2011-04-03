const Cc = Components.classes;
const Ci = Components.interfaces;
Components.utils.import("resource://gre/modules/Services.jsm");

const MAIN = window.top;

function println(s) dump(s + "\n");
function print(s) dump(s);
            
function showError(objError) {
    var sMsg;

    with (objError) {
        sMsg = 'NAME: ' + name;
        sMsg += '\nMESSAGE: ' + message;
        sMsg += '\n\nFILE: ' + fileName;
        sMsg += '\nLINE: ' + lineNumber;        
    }
            
    alert(sMsg);
}

function printError(objError) {
    var sMsg;

    with (objError) {
        sMsg = 'NAME: ' + name;
        sMsg += '\nMESSAGE: ' + message;
        sMsg += '\n\nFILE: ' + fileName;
        sMsg += '\nLINE: ' + lineNumber;
    }
            
    println(sMsg);
}             
            
function getBoolPref(prefname, def) {
    try {
        return Services.prefs.getBoolPref(prefname);
    } catch (er) {
        return def;
    }
}

function getCharPref(prefname, def) {
    try {
        return Services.prefs.getCharPref(prefname);
    } catch (er) {
        return def;
    }
}

function getIntPref(prefname, def) {
    try {
        return Services.prefs.getIntPref(prefname);
    } catch (er) {
        return def;
    }
}

