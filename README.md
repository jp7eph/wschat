# wschat
WebSocket Chat
送信した文字列の末尾に [HOGE] を付けてサーバからレスポンスされます．

## 開発環境

* golang Version:1.8
* パッケージ管理：glide

## How to Install

1. `# glide install`
1. `# go run server.go`

## How to Use

1. [CONNECT] を押す
1. テキストボックスに好きな文字列を書く
1. [SEND] を押す
1. レスポンスが帰ってくる（青文字）
1. [DISCONNECT] を押す

## 将来追加機能

* セッションごとにユニークID発行
* 送信した内容をブロードキャスト

## 修正予定内容

* 送受信を無期限におこなうためにHandlerを無限ループにしているため修正必要（？）
ループにしないでクライアントに送信したら，勝手に切断された

***
## 参考サイト

> WebSocketをGoで触ってみた
> http://qiita.com/m0a/items/f6405bc29073a7609050
