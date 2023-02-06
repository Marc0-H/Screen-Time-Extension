let clock = 0;
let currentWebsite;

function getSecondLevelDomain(url) {
    let host = new URL(url).hostname;
    let parts = host.split('.');

    if (parts.length >= 2) {
      return parts[parts.length - 2];
    }

    return host;
}

function logHostname() {
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let url = new URL(tabs[0].url);
        if (!url.hostname) {
            currentWebsite = "HOME";
            return;
        } 

        currentWebsite = new URL(url).hostname;
        // console.log(`Switched to: ${currentWebsite}`);

    });
}

function endSessionTime() {
    let end = performance.now();
    let timeSpend = Math.round((end - clock) / 1000);
    clock = performance.now();

    if (currentWebsite != "HOME" && currentWebsite != null) {
        // console.log(`Time spent on: ${currentWebsite}: ${timeSpend}`);
        let totalTime = localStorage.getItem(currentWebsite);

        if (!totalTime) {
            localStorage.setItem(currentWebsite, timeSpend);
            totalTime = timeSpend;
        } else {
            totalTime = parseInt(totalTime) + parseInt(timeSpend);
            localStorage.setItem(currentWebsite, totalTime);
        }

        // console.log(`TOTAL TIME SPEND ON ${currentWebsite}:  ${totalTime}`);
    }

    
}

browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === "loading") {
        if (currentWebsite) {
            endSessionTime();
        }
        clock = performance.now();
        logHostname();
    }
});

browser.tabs.onActivated.addListener(function(activeInfo) {
    endSessionTime();
    logHostname();
});

browser.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    endSessionTime();
});

browser.windows.onCreated.addListener(function(window) {
    endSessionTime();
    logHostname();
});

browser.windows.onFocusChanged.addListener(function(windowId) {
    if (windowId != browser.windows.WINDOW_ID_NONE) {
        browser.windows.get(windowId, { populate: true }, function(window) {
            endSessionTime();
            logHostname();
        });
    }
});
