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

