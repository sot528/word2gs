import '../img/icon-128.png'
import '../img/icon-34.png'

function lastErrorCheck() {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
    } else {
        // Tab exists
    }
}

chrome.commands.onCommand.addListener(function(command) {
    if (command == "send") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { text: "send" }, function (response) {
                console.log(response);
            });
        });
    }
});
