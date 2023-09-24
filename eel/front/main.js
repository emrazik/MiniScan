var scanIcon = document.getElementById("scan_icon");
scanIcon.addEventListener('click', buttonClickHandler);

var historyIcon = document.getElementById("history_icon");
historyIcon.addEventListener('click', buttonClickHandler);

async function run_check_ports_open(host, ports) {
    let portOpenList = await eel.tcp_check_ports_open_default(host, ports)();
    return portOpenList;
}

async function init_history() {
    return await eel.read_from_json()();
}

const initPromise = init_history();
initPromise.then((value) => {
    createHistoryCards(value);
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // prepare color of selected tab
    var hexColor = "#4139da";
    var opacity = 0.5;

    var red = parseInt(hexColor.slice(1, 3), 16);
    var green = parseInt(hexColor.slice(3, 5), 16);
    var blue = parseInt(hexColor.slice(5, 7), 16);

    // hide the content of the tabs that is going on the more right columns
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // clear all the styling for all elements
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "#1B174E";
        tablinks[i].style.border = "None";
    }

    var scan_icon = document.getElementById("scan_icon");
    scan_icon.style.backgroundColor = "#1B174E";

    var history_icon = document.getElementById("history_icon");
    history_icon.style.backgroundColor = "#1B174E";

    // highlight the selected tab with blue
    document.getElementById(tabName).style.display = "block";
    var tab = evt.currentTarget
    tab.style.backgroundColor = "rgba(" + red + ", " + green + ", " + blue + ", " + opacity + ")";
    tab.style.borderRight = "4px";
    tab.style.borderRightColor = hexColor; 
    tab.style.borderRightStyle = "solid"; 

    // make sure that the icon is included in this highlight
    if (tabName === 'tab1') {
        scan_icon.style.backgroundColor = "rgba(" + red + ", " + green + ", " + blue + ", " + opacity + ")";
    } else if (tabName === 'tab2') {
        history_icon.style.backgroundColor = "rgba(" + red + ", " + green + ", " + blue + ", " + opacity + ")";
    }

}

function buttonClickHandler(event) {
    var scanButton = document.getElementById("scan_button");
    var historyButton = document.getElementById("history_button");
    if (event.target === scan_icon) {
        scanButton.click();
    } else if (event.target === historyIcon) {
        historyButton.click();
    }
};

function scanSubmit(label, ipAddress, portLow, portHigh, OS, portFootprint, portOpenList, formattedTime, ui_location) {
    var card = document.createElement('div');
    card.className = 'card';
    
    var ch = document.createElement('div');
    ch.className = 'card-header';

    var lt = document.createElement('div');
    lt.textContent = label;
    lt.className = 'left-text';

    var rt = document.createElement('div');
    rt.textContent = formattedTime;
    rt.className = 'right-text';

    var cb = document.createElement('div');
    cb.className = 'card-body';

    var host = document.createElement('p');
    host.textContent = 'Hostname: ' + ipAddress;

    var ports = document.createElement('p');
    ports.textContent = 'Open Ports:';

    var ol = document.createElement('ul');
    portOpenList.forEach(port => {
        const listItem = document.createElement('li');
        listItem.textContent = port;
        ol.appendChild(listItem);
    });

    //var OS = document.createElement('object');
    //OS.data = '/icons/scan_icon.svg';

    //OS.type = 'image/svg+xml';
    //OS.width = '200'; 
    //OS.height = '200'; 

    ch.appendChild(lt);
    ch.appendChild(rt);
    card.appendChild(ch);
    card.appendChild(cb);
    cb.appendChild(host);
    cb.append(ports)
    cb.append(ol);
    //ch.appendChild(OS);
    if (ui_location === "scan") {
        var cardContainer = document.getElementById('card-container-scan');
        cardContainer.appendChild(card);
    } else if (ui_location === "history") {
        var cardContainer = document.getElementById('card-container-history');
        cardContainer.appendChild(card);
    }

};

function scanCollect() {
    const label = document.getElementById("name").value;
    const ipAddress = document.getElementById("ip").value;
    const portLow = document.getElementById("port-range-low").value;
    const portHigh = document.getElementById("port-range-high").value;
    const OS = document.getElementById("OS").checked;
    const portFootprint = document.getElementById("port-footprint").checked;

    const scanError = document.getElementById('scanError');
    scanError.style.display = "none";

    const portList = [];
    for (let i = parseInt(portLow); i <= parseInt(portHigh); i++) {
        portList.push(i);
    }

    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString('en-US', { timeStyle: 'medium' });

    const portPromise = run_check_ports_open(ipAddress, portList);
    portPromise.then((value) => {
        if (value != "error") {
            eel.write_to_json(label, ipAddress, value, formattedTime);
            scanSubmit(label, ipAddress, portLow, portHigh, OS, portFootprint, value, formattedTime, "scan");
        } else {
            scanError.style.display = "block";
        }
    })
};

function createHistoryCards(init_data) {    
    for (const card of init_data) {
        let card_data = JSON.parse(card);
        let label = card_data["label"];
        let ipAddress = card_data["ipAddress"];
        let openPorts = card_data["openPorts"];
        let formattedTime = card_data["ipAddress"];
        scanSubmit(label, ipAddress, '', '', '', '', openPorts, formattedTime, "history");
    }
}