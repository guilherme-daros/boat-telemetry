const client = new Paho.MQTT.Client(brokerIp, brokerPort, username);

const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');

const graphContainer = document.getElementById('graph-container');

let graphs = {};

function createGraph(cellNumber) {
    const graphDiv = document.createElement('div');
    graphDiv.classList.add('graph-container');

    const title = document.createElement('h3');
    title.classList.add('graph-title');
    title.innerText = `${type}Cell${cellNumber}`;

    const canvas = document.createElement('canvas');
    canvas.id = `${type}Cell${cellNumber}`;
    canvas.classList.add('graph');

    graphDiv.appendChild(title);
    graphDiv.appendChild(canvas);

    graphContainer.appendChild(graphDiv);

    return new Chart(canvas.getContext('2d'), {
        type: 'line',
        options: {
            animation: false,
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    display: true,
                }, ],
            },
            elements: {
                line: {
                    borderWidth: 1,
                    backgroundColor: "rgba(252,145,46,0.01)",
                    borderColor: "rgb(252,145,46)",
                },
                point: {
                    radius: 0,
                },
            },
        }
    });
}

window.onload = () => {
    for (let i = 1; i <= 8; i++) {
        graphs[`${type}Cell${i}`] = createGraph(i);
    }

    client.connect({
        onSuccess: () => {
            console.log("MQTT Connected Succesfully");
            topics.forEach(topic => {
                client.subscribe(topic);
            });
        },
    });
};

client.onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
};

client.onMessageArrived = (message) => {
    const data = message.payloadString.split(';');
    const topic = message.destinationName;

    if (type === 't') {
        if (topic === "0x186655F4") {
            updateGraph(graphs.tCell1, parseInt(data[0]));
            updateGraph(graphs.tCell2, parseInt(data[1]));
            updateGraph(graphs.tCell3, parseInt(data[2]));
            updateGraph(graphs.tCell4, parseInt(data[3]));
        } else if (topic === "0x186755F4") {
            updateGraph(graphs.tCell5, parseInt(data[0]));
            updateGraph(graphs.tCell6, parseInt(data[1]));
            updateGraph(graphs.tCell7, parseInt(data[2]));
            updateGraph(graphs.tCell8, parseInt(data[3]));
        }
    } else if (type === 'v') {
        // Assuming similar logic for voltage data
    }
};

function updateGraph(graph, value) {
    graph.data.datasets.forEach((dataset) => {
        dataset.data.push(value);
    });
    graph.update();
}
