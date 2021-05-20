module.exports = function(RED) {
    class ActivatorNode {
        constructor(config) {
            RED.nodes.createNode(this, config);

            var node = this;
            node.config = config;
            node.driver = RED.nodes.getNode(node.config.driver);

            this.subscribe(node)

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

        subscribe(node){
            let subscribe_command = {
                "action": "subscribe",
                "driver": node.driver.config.name,
                "destination": node.driver.config.destination,
                "driver_properties": {
                    "username":  node.driver.config.user,
                    "password":  node.driver.config.password
                },
                "topics": [
                    node.config.name
                ]
            }
            node.driver.sendData(subscribe_command)
        }

    }
    RED.nodes.registerType("ActivatorNode", ActivatorNode);
}

