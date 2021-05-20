module.exports = function(RED) {
    class ZwaveNode {
        constructor(config) {
            RED.nodes.createNode(this, config);


            this.devices = []
            let node = this;
            node.config = config;
            this.server = RED.nodes.getNode(node.config.server);

        }

        sentGeneralSubscribe(){

            let subscribe_command = {
                "action": "subscribe",
                "driver": this.server.name,
                "destination": this.server.destination,
                "driver_properties": {
                    "username":  this.server.user,
                    "password":  this.server.password
                },
                "topics": this.devices
            }

            this.server.openWebsocketConnection(data)
        }

        sendData(data){
            if (data.action === 'subscribe'){
                if (data.hasOwnProperty('topics')){
                    for (let device in data.topics){
                        this.devices.push(data.topics[device])
                    }
                }
                this.server.sendMessage(data)
            }
            else if (data.action === 'set'){
                this.server.sendMessage(data)
            }

        }

    }




    RED.nodes.registerType("ZwaveNode", ZwaveNode);
}

