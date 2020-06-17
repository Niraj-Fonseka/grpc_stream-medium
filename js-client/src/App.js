import React, { useState, useEffect } from 'react';
import './App.css';

import { SensorRequest , SensorResponse } from "./sensorpb/sensor_pb"
import { SensorClient} from "./sensorpb/sensor_grpc_web_pb"

var client = new SensorClient('http://localhost:8000')
function App() {
  const [temp, setTemp] = useState(-9999);
  const [humidity , setHumidity] = useState(-99999)
  

  const getTemp = () => {
    var sensorRequest = new SensorRequest()
    var stream = client.tempSensor(sensorRequest,{})

    stream.on('data', function(response){
        setTemp(response.getTemp())
    });
  };

  useEffect(()=>{
    getTemp()
  });

  return (
    <div>
      {temp}
    </div>

  
  );
}

export default App;
