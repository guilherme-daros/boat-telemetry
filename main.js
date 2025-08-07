const client = new Paho.MQTT.Client(brokerIp, brokerPort, username);

let interface = {};

window.onload = () => {
  interface = {
    ...interface,
    vGraph: new Chart(
      document.getElementById("vPack").getContext("2d"),
      defaultVGraphOptions
    ),
    cGraph: new Chart(
      document.getElementById("cPack").getContext("2d"),
      defaultCGraphOptions
    ),
    tGraph: new Chart(
      document.getElementById("tPack").getContext("2d"),
      defaultTGraphOptions
    ),
    warningList: warningIdList.reduce((accumulator, currentId) => {
      accumulator[currentId] = document.getElementById(currentId);
      return accumulator;
    }, {}),
    infoList: infoIdList.reduce((accumulator, currentId) => {
      accumulator[currentId] = document.getElementById(currentId);
      return accumulator;
    }, {}),
  };

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

function calculateAverageTemperature() {
  const cellTemps = Object.values(boatBattery.cellTemp);
  const validTemps = cellTemps.filter((temp) => temp !== 0);
  if (validTemps.length === 0) {
    return 0;
  }
  const totalTemp = validTemps.reduce((a, b) => a + b, 0);
  return totalTemp / validTemps.length;
}

client.onMessageArrived = (message) => {
  const topic = message.destinationName;
  const data = message.payloadString.split(";");
  console.log(topic);
  console.log(data);
  const { overTemperature, overCurrent, CHG, DSG, overVoltage, underVoltage } =
    interface.warningList;

  const { SoC, cPackInfo, vPackInfo, tPackInfo, power } = interface.infoList;

  const { red, green } = warningColors;

  switch (topic) {
    case "0x186455F4":
      boatBattery.power = Number(data[3]);
      power.innerHTML = `${boatBattery.power} W`;
      overTemperature.style.backgroundColor =
        data[2][0] == "1" || data[2][1] == "1" ? red : green;
      overCurrent.style.backgroundColor =
        data[2][2] == "1" || data[2][3] == "1" ? red : green;
      CHG.style.backgroundColor = data[2][4] == "1" ? red : green;
      DSG.style.backgroundColor = data[2][5] == "1" ? red : green;
      overVoltage.style.backgroundColor = data[2][6] == "1" ? red : green;
      underVoltage.style.backgroundColor = data[2][7] == "1" ? red : green;
      break;

    case "0x186555F4":
      boatBattery.SoC = parseInt(data[3]);
      SoC.innerHTML = `${boatBattery.SoC} %`;

      boatBattery.cPack = (parseInt(data[2]) + parseInt(data[1])) / 2;
      updateGraph(interface.cGraph, boatBattery.cPack);

      boatBattery.vPack = parseInt(data[0]);
      vPackInfo.innerHTML = `${boatBattery.vPack / 10} V`;
      updateGraph(interface.vGraph, boatBattery.vPack);

      break;

    case "0x186655F4":
      boatBattery.cellTemp.cell4 = parseInt(data[3]);
      boatBattery.cellTemp.cell3 = parseInt(data[2]);
      boatBattery.cellTemp.cell2 = parseInt(data[1]);
      boatBattery.cellTemp.cell1 = parseInt(data[0]);
      boatBattery.tPack = calculateAverageTemperature();
      tPackInfo.innerHTML = `${boatBattery.tPack / 10} °C`;
      break;

    case "0x186755F4":
      boatBattery.cellTemp.cell8 = parseInt(data[3]);
      boatBattery.cellTemp.cell7 = parseInt(data[2]);
      boatBattery.cellTemp.cell6 = parseInt(data[1]);
      boatBattery.cellTemp.cell5 = parseInt(data[0]);
      boatBattery.tPack = calculateAverageTemperature();
      tPackInfo.innerHTML = `${boatBattery.tPack / 10} °C`;
      updateGraph(interface.tGraph, boatBattery.tPack);
      break;

    default:
      break;
  }
};
