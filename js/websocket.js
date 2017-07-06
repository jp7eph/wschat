var wsUri = "ws://localhost:9999/echo"; 

var output;  
function init() { 
    output = document.getElementById("output"); 
    testWebSocket(); 
} 

function testWebSocket() { 
    websocket = new WebSocket(wsUri); 
    websocket.onopen = function(evt) { 
        onOpen(evt) 
    }; 
    websocket.onclose = function(evt) { 
        onClose(evt) 
    }; 
    websocket.onmessage = function(evt) { 
        onMessage(evt) 
    }; 
    websocket.onerror = function(evt) { 
        onError(evt) 
    }; 
}  

function onOpen(evt) { 
    writeToScreen("CONNECTED"); 
    doSend("websocketにメッセージを送信",Math.random()); 
}  

function onClose(evt) { 

    writeToScreen("DISCONNECTED"); 
}  

function onMessage(evt) { 

    var jsonData = JSON.parse(evt.data)

    writeToScreen('<span style="color: blue;">RESPONSE: ' + jsonData.Msg + ", no:" + jsonData.Count +'</span>'); 
    websocket.close(); 
}  

function onError(evt) { 
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data); 
}  

function doSend(message,number) {
    writeToScreen("SENT: " + message + ", no: " + number);

    var jsonData = {
        Msg:message,
        Count:number
    }

    websocket.send(JSON.stringify(jsonData));
}  

function writeToScreen(message) { 
    var pre = document.createElement("p"); 
    pre.style.wordWrap = "break-word"; 
    pre.innerHTML = message; 
    output.appendChild(pre); 
}  

window.addEventListener("load", init, false);