
let contentLeft = document.querySelector(".main_content_left")
let contentRight = document.querySelector(".main_content_right");

function newRow(domain, timeSpent, percentage) {
    let container = document.createElement("div");
    container.className = "web_info_container";
    let logoContainer = document.createElement("div");
    logoContainer.className = "web_logo_container";
    //let logoSrc = "https://s2.googleusercontent.com/s2/favicons?domain=" + domain;
    let logoSrc = "https://" + domain + "/favicon.ico";
    let logo = document.createElement("img");
    logo.src = logoSrc;
    let webName = document.createElement("p");
    webName.className = "web_name";
    webName.innerHTML = `${getSecondLevelDomain(domain)}`;
    logoContainer.appendChild(logo);
    container.appendChild(logoContainer);
    container.appendChild(webName);
    contentLeft.appendChild(container);

    let progressContainer = document.createElement("div");
    progressContainer.className = "progress_container";
    let progress = document.createElement("div");
    progress.className = "progress";
    progress.style.width = percentage + "%";
    let paragraphContainer = document.createElement("p");
    paragraphContainer.className = "progress_time";
    paragraphContainer.innerHTML = getTimeFormat(timeSpent);

    progressContainer.appendChild(progress);
    progressContainer.appendChild(paragraphContainer);
    contentRight.appendChild(progressContainer);
}

function getTimeFormat(seconds) {
    let totalMinutes = Math.round(seconds / 60);
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes - hours * 60;

    if (hours == 0) {
        return `${minutes}m`;
    }

    return `${hours}h ${minutes}m`;
}

function getSecondLevelDomain(url) {
    let parts = url.split('.');

    if (parts.length >= 2) {
      return parts[parts.length - 2];
    }

    return url;
}

const data = { ...localStorage };
contentLeft.innerHTML = '';
contentRight.innerHTML = '';

let totalTime = Object.values(data).reduce((key, value) => key + parseInt(value), 0);
// console.log(totalTime);
let sortedArray = Object.entries(data).map(([key, value]) => [key, parseInt(value)]).sort((a, b) => b[1] - a[1]);
if ("undefined" in data) {
    totalTime -= parseInt(data["undefined"]);
}

for (let [key, value] of sortedArray) {
    if (value >= 60) {
        let percentage = Math.round(value / totalTime * 100);
        newRow(key, value, percentage);
    }
}


let clock = document.querySelector(".clock");
clock.innerHTML = getTimeFormat(totalTime);

