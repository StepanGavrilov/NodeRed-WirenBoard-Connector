module.exports = function(RED) {
    class ZwaveNode {
        constructor(config) {

            /*
            * Driver for devices.
            * devices = {
            *   device_address : device_node
            * }
            * */

            RED.nodes.createNode(this, config);
            this.devices = {}
            let node = this;
            node.config = config;
            this.server = RED.nodes.getNode(node.config.server);
            this.addToServerDriverList(node)
        }

        sendData(data){
            if (data.action === 'subscribe'){
                this.server.sendMessage(data)
            }
            else if (data.action === 'set'){
                this.server.sendMessage(data)
            }
            else {
                console.log('Undefined type: ', data.action)
            }
        }

        addToServerDriverList(node){
            this.server.driver_storage[node.config.name] = this
        }

        addToLocalDevicesStorage(address, node){
            this.devices[address] = node
        }
    }
    RED.nodes.registerType("ZwaveNode", ZwaveNode);
}

