var wsUri = "ws://localhost:9999/echo"; 

// function init() { 
//     output = document.getElementById("output"); 
//     testWebSocket(); 
// } 

function testWebSocket() { 
    websocket = new WebSocket(wsUri); 
    // イベントハンドラの設定
    websocket.onopen = onOpen;
    websocket.onmessage = onMessage;
    websocket.onclose = onClose;
    websocket.onerror = onError;
}  

function onOpen(evt) { 
    writeToScreen("CONNECTED"); 
    //doSend("websocketにメッセージを送信"); 
}  

function onClose(evt) { 
    //websocket = null;
    websocket.close();
    writeToScreen("DISCONNECTED"); 
}  

function onMessage(evt) { 

    var jsonData = JSON.parse(evt.data)

    writeToScreen('<span style="color: blue;">RESPONSE: ' + jsonData.Msg + '</span>'); 
    //websocket.close(); 
}  

function onError(evt) { 
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data); 
}  

function doSend(message) {
    writeToScreen("SENT: " + message);

    var jsonData = {
        Msg:message
    }

    websocket.send(JSON.stringify(jsonData));
}

function writeToScreen(message) { 
    var pre = document.createElement("p"); 
    pre.style.wordWrap = "break-word"; 
    pre.innerHTML = message; 
    output.appendChild(pre); 
}