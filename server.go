package main

import (
	"net/http"

	"log"

	"golang.org/x/net/websocket"
)

func echoHandler(ws *websocket.Conn) {
	type data struct {
		Msg string
	}

	var buf, res data

	res.Msg = "Connected Server!!"
	websocket.JSON.Send(ws, res)

	for {
		// receive json data
		websocket.JSON.Receive(ws, &buf)

		log.Printf("data=%#v\n", buf)

		res.Msg = buf.Msg + " [HOGE]"
		// send json data
		websocket.JSON.Send(ws, res)

	}
}

func main() {
	//http.Handle("/echo", websocket.Handler(echoHandler))
	http.HandleFunc("/echo", func(w http.ResponseWriter, req *http.Request) {
		s := websocket.Server{Handler: websocket.Handler(echoHandler)}
		s.ServeHTTP(w, req)
	})
	http.Handle("/", http.FileServer(http.Dir("./")))

	if err := http.ListenAndServe(":9999", nil); err != nil {
		panic("ListenAndServe: " + err.Error())
	}

}
