const WebSocket = require('ws')

module.exports = function (RED) {
    class ServerNode {
        constructor(config) {

            /*
            * driver_storage: user for store drivers and get activator
            * and sensor nodes while need.
            * driver_storage = {
            *   'zwave': 'zwave_driver_node'
            * }
            * */

            RED.nodes.createNode(this, config);
            var node = this
            node.config = config
            this.driver_storage = {}
            this.sendMessage()
        }

        sendMessage(data){

            /*
            * open ws connection and send messages to broker which configured
            * from node-red config or received messages from broker after get node.
            * */

            let url = `ws://${this.config.host}:${this.config.port}/ws/client`
            let ws = new WebSocket(url);

            ws.addEventListener('message', (event) => {
                let response = JSON.parse(event.data)
                if (response.type === "feedback"){
                    if (response.driver in this.driver_storage){

                        let node = this.driver_storage[response.driver].devices[response.address]
                        if (node) {
                            console.log('CATCH !', response.address, response)

                            if (node.config.translate === "string")
                            {
                                response.value = response.value.toString()
                                console.log('STRING')
                            }
                            else if(node.config.translate === "integer"){

                                console.log('INTEGER')
                                parseInt(response.value)
                            }

                            node.send([{value: response.value}])
                        }
                    }
                    else{
                    }
                }
                else {
                }
            });
            if (data){
                data["uid"]= this.config.uid
                ws.onopen = function(e) {
                    ws.send(JSON.stringify(data));
                };
                ws.onclose = function (e){
                console.log('======== Disconnect ========')
                }
            }
        }
    }
    RED.nodes.registerType("ServerNode", ServerNode);
}


