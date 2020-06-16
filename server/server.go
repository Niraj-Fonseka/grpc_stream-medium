package main

import (
	"fmt"
	"grpc_stream_medium/server/sensor"
	"grpc_stream_medium/server/sensorpb"
	"log"
	"net"
	"time"

	"google.golang.org/grpc"
)

type server struct {
	Sensor *sensor.Sensor
}

func (s *server) TempSensor(req *sensorpb.SensorRequest,
	stream sensorpb.Sensor_TempSensorServer) error {
	for {
		time.Sleep(time.Second * 2)

		temp := s.Sensor.GetTempSensor()
		err := stream.Send(&sensorpb.SensorResponse{Value: temp})
		if err != nil {
			log.Println("Error sending metric message ", err)
		}
	}
	return nil
}

func (s *server) HumiditySensor(req *sensorpb.SensorRequest,
	stream sensorpb.Sensor_HumiditySensorServer) error {

	for {
		time.Sleep(time.Second * 2)

		humd := s.Sensor.GetHumiditySensor()

		err := stream.Send(&sensorpb.SensorResponse{Value: humd})
		if err != nil {
			log.Println("Error sending metric message ", err)
		}
	}
	return nil
}

var (
	port int = 8080
)

func main() {

	sns := sensor.NewSensor()

	sns.StartMonitoring()

	addr := fmt.Sprintf("0.0.0.0:%d", port)

	lis, err := net.Listen("tcp", addr)

	if err != nil {
		log.Fatalf("Error while listening : %v", err)
	}

	s := grpc.NewServer()
	sensorpb.RegisterSensorServer(s, &server{Sensor: sns})

	log.Printf("Starting server in port :%d\n", port)

	if err := s.Serve(lis); err != nil {
		log.Fatalf("Error while serving : %v", err)
	}

}
