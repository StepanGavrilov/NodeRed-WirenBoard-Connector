const WebSocket = require('ws')


module.exports = function (RED) {

    class ServerNode {
        constructor(config) {
            RED.nodes.createNode(this, config);
            var node = this
            node.config = config
            this.driver_storage = {}
            this.sendMessage()
        }

        sendMessage(data){
            let url = `ws://${this.config.host}:${this.config.port}/ws/client`
            let ws = new WebSocket(url);
            ws.addEventListener('message', (event) => {

                console.log('\nMessage from server ', event.data);
                let response = JSON.parse(event.data)
                if (response.type === "feedback"){
                    if (response.driver in this.driver_storage){
                        console.log('driver finds!')
                        console.log('address finds! ', response.address)
                        let sensor = this.driver_storage[response.driver].devices[response.address]

                        console.log('Node type', sensor.type)
                        console.log('Node type2', typeof sensor.on)
                        sensor.send([{payload: response.value}])



                    }
                    else{
                        console.log('No device here!')
                        console.log('---> ', response.driver)
                    }
                }

            });
            if (data){
                data["uid"]= this.config.uid
                ws.onopen = function(e) {
                    ws.send(JSON.stringify(data));
                };
            }
        }
    }
    RED.nodes.registerType("ServerNode", ServerNode);
}


