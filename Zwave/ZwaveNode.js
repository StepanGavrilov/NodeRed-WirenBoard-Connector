module.exports = function(RED) {
    class ZwaveNode {
        constructor(config) {
            RED.nodes.createNode(this, config);


            this.devices = {}
            this.d = []
            let node = this;
            node.config = config;
            this.server = RED.nodes.getNode(node.config.server);
            this.addToServerDriverList()
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
                        console.log('Send data !')
                        this.d.push(data.topics[device])
                    }
                }
                this.server.sendMessage(data)
            }
            else if (data.action === 'set'){
                this.server.sendMessage(data)
            }
            else {
                console.log('Undefined type: ', data.action)
            }
        }

        addToServerDriverList(){
            console.log('Added to driver list!')
            this.server.driver_storage['zwave'] = this
        }

        addToLocalDevicesStorage(address, node){
            console.log('Added to local storage!')
            this.devices[address] = node
        }
    }
    RED.nodes.registerType("ZwaveNode", ZwaveNode);
}

