module.exports = function(RED) {

    class BaosBinaryNode {

        // BaosBinary driver

        constructor(config, uid, ip, port, destination) {
            RED.nodes.createNode(this, config);

            let context = this.context();
            let node = this;

            node.config = config;

            this.uid = uid
            this.ip = ip
            this.port = port
            this.destination = this.ip + ":" + this.port
            this.topics = []

            node.on('input', function(msg) {
                msg.payload = msg.payload + 'From NodeRed'
                node.send(msg);
            });


        }

        addTopic(){

            // add device for subscribe

        }

        set(){

            // set new value on device

        }

    }

    RED.nodes.registerType("BaosBinaryNode", BaosBinaryNode);

}

