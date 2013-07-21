chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		if (!disabled) {
			if (details.url.indexOf("/commit/") != -1 && details.url.indexOf("w=1") == -1) {
				if (details.url.indexOf("?") == -1) {
					return {redirectUrl: details.url + "?w=1" };
				} else {
					return {redirectUrl: details.url + "&w=1" };
				}
			}
		}
	}, {urls: ["https://github.com/*" ]}, ["blocking"]
);

var disabled = false;
chrome.storage.sync.get("disabled", function(settings) {
	if (settings['disabled']) {
		disabled = true;
		chrome.browserAction.setIcon({path: "disabled.png"});
	}
});
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.storage.sync.set({'disabled': !disabled}, function() {
		disabled = !disabled;
		if (!disabled) {
			chrome.browserAction.setIcon({path: "icon.png"});
		} else {
			chrome.browserAction.setIcon({path: "disabled.png"});
		}
	});
});