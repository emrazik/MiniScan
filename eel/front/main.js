async function run_check_ports_open(host, ports) {
    let portOpenList = await eel.tcp_check_ports_open_default(host, ports)();
    return portOpenList;
}

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
    }

}

var scan_icon = document.getElementById("scan_icon");
scan_icon.addEventListener("click", function() {
    // treat the icon and the button as the same selection
    var buttons = document.querySelectorAll("button");
    var button;

    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent === "Scan") {
            button = buttons[i];
        }
    }
    button.click();
});


function scanSubmit(label, ipAddress, portLow, portHigh, OS, portFootprint, portOpenList) {
    var card = document.createElement('div');
    card.className = 'card';
    
    var ch = document.createElement('div');
    ch.textContent = label + " --- " + ipAddress;
    ch.className = 'card-header';

    var cb = document.createElement('div');
    cb.textContent = 'Open Ports:';
    cb.className = 'card-body';

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

    card.appendChild(ch);
    card.appendChild(cb);
    cb.append(ol);
    //ch.appendChild(OS);
    
    var cardContainer = document.getElementById('card-container');
    cardContainer.appendChild(card);
};

function scanCollect() {
    const label = document.getElementById("name").value;
    const ipAddress = document.getElementById("ip").value;
    const portLow = document.getElementById("port-range-low").value;
    const portHigh = document.getElementById("port-range-high").value;
    const OS = document.getElementById("OS").checked;
    const portFootprint = document.getElementById("port-footprint").checked;

    const portList = [];
    for (let i = parseInt(portLow); i <= parseInt(portHigh); i++) {
        portList.push(i);
    }

    const portPromise = run_check_ports_open(ipAddress, portList);
    portPromise.then((value) => {
        scanSubmit(label, ipAddress, portLow, portHigh, OS, portFootprint, value);
    })
};