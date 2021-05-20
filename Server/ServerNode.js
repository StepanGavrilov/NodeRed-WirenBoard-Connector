const WebSocket = require('ws')


module.exports = function (RED) {

    class ServerNode {
        constructor(config) {
            RED.nodes.createNode(this, config);

            var node = this
            node.config = config

            this.storage = []


            this.sendMessage()
        }

        sendMessage(data){
            let url = `ws://${this.config.host}:${this.config.port}/ws/client`
            let ws = new WebSocket(url);

            ws.addEventListener('message', function (event) {
                console.log('\nMessage from server ', event.data);
            });

            if (data){
                data["uid"]= this.config.uid

                ws.onopen = function(e) {

                    ws.send(JSON.stringify(data));
                };
            }
        }

        onMessage(){
            exampleSocket.onmessage = function (event) {
                console.log(event.data);
            }
        }



    }
    RED.nodes.registerType("ServerNode", ServerNode);
}


