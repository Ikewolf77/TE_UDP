var args = process.argv.slice(2);
var object = new Object();

//depedencies
const dgram = require('dgram');
const socket = dgram.createSocket('udp4');
const socket2 = dgram.createSocket('udp4');

//protocol
const protocol = {
    multicast_address: "239.255.99.111",
    multicast_port: "1111"
}

const protocol2 = {
    multicast_address: "239.255.99.222",
    multicast_port: "2222"
}

object.timestamp = "allo serveur";
const payload = JSON.stringify(object);
message = Buffer.from(payload);

socket.send(message, 0, message.length, protocol.multicast_port, protocol.multicast_address,
    function(err, bytes) {
        console.log("Sending payload: " + payload + " via port " + socket.address().port);
    }
);

socket2.bind(protocol2.multicast_port, function() {
    console.log("Joining multicast group");
        socket.addMembership(protocol2.multicast_address);
    }
);

socket2.on('message', 
    function(msg, source) {
        console.log("Data has arrived: " + msg + ". Source IP: " + source.address + ". Sourceport: " + source.port);
        socket2.close();
    }
);
