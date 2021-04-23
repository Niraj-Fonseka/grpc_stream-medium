import React, { useState, useEffect } from 'react';
import './App.css';

import { SensorRequest  } from "./sensorpb/sensor_pb"
import { SensorClient} from "./sensorpb/sensor_grpc_web_pb"

var client = new SensorClient('http://localhost:8000')
function App() {
  const [temp, setTemp] = useState(-9999);
  const [humidity , setHumidity] = useState(-99999)
  const [backColorTemp , setBackgroundColorTemp] = useState('#90BE6D')
  const [backColorHum , setBackgroundColorHum] = useState('#90BE6D')

  const getTemp = () => {
    console.log("called")

    var sensorRequest = new SensorRequest()
    var stream = client.tempSensor(sensorRequest,{})

    stream.on('data', function(response){
        setTemp(response.getValue())
    });
    stream.on('status', function(status) {
        // see: https://grpc.github.io/grpc/core/md_doc_statuscodes.html
        if (status.code > 0) {
            console.log("restarting")
            stream.cancel()
            setTimeout(_ => getTemp(), 1000)
        }
    });
  }

  const getHumidity = () => {
    var sensorRequest = new SensorRequest()
    var stream = client.humiditySensor(sensorRequest,{})

    stream.on('data',function(response){
      setHumidity(response.getValue())
    })
    stream.on('status', function(status) {
        if (status.code > 0) {
            stream.cancel()
            setTimeout(_ => getHumidity(), 1000)
        }
    });
  }

  const detectTempAlert = () => {
    if (temp > 90 || temp < 30) {
      setBackgroundColorTemp('#F94144')
    }else{
      setBackgroundColorTemp('#90BE6D')
    }
  }


  const detectHumAlert = () => {
    if (humidity > 80) {
      setBackgroundColorHum('#F94144')
    }else{
      setBackgroundColorHum('#90BE6D')
    }
  }

  
  useEffect(()=>{
    detectHumAlert()
  })

  useEffect(()=>{
    detectTempAlert()
  })

  useEffect(()=>{
    getTemp()
  },[]);

  useEffect(()=>{
    getHumidity()
  },[]);

  return (
    <div className="temp-cont">
      <div className="temp" style={{backgroundColor:backColorTemp }}>
          <h1> Temperature </h1>
            
          <h1> {temp} F </h1>
      </div>

      <div className="hum" style={{backgroundColor:backColorHum }}>
          <h1> Humidity </h1>
          <h1>{humidity} %</h1>
      </div>
    </div>
 
  
  );
}

export default App;
