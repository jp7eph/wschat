package main

import (
	"net/http"

	"io"

	"golang.org/x/net/websocket"
)

func echoHandler(ws *websocket.Conn) {
	io.Copy(ws, ws)
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
