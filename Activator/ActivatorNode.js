module.exports = function(RED) {
    class ActivatorNode {
        constructor(config) {

            /*
            * Activator - device, used for
            * actions
            *
            * while start node-red send subscribe
            * to broker and add to driver list
            * */

            RED.nodes.createNode(this, config);
            var node = this;
            node.config = config;
            node.driver = RED.nodes.getNode(node.config.driver);

            node.on('input', function(msg) {

                let set_command = {
                    "action": "set",
                    "driver": node.driver.config.name,
                    "destination": node.driver.config.destination,
                    "driver_properties": {
                        "username":  node.driver.config.user,
                        "password":  node.driver.config.password
                    },
                    "address": node.config.name,
                    "value": msg.value
                }
                node.driver.sendData(set_command)
            });
        }

        start(node){
            node.driver.addToLocalDevicesStorage(node.config.name, this)
        }
    }
    RED.nodes.registerType("ActivatorNode", ActivatorNode);
}

