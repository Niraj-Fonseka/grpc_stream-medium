package sensor

import (
	"log"
	"math/rand"
	"sync"
	"time"
)

type Sensor struct {
	Data map[string]int64
	M    *sync.RWMutex
}

//NewSensor creates a new sensor object
func NewSensor() *Sensor {
	return &Sensor{
		Data: make(map[string]int64),
		M:    &sync.RWMutex{},
	}
}

func (s *Sensor) SetTempSensor() {
	for {
		s.M.Lock()
		s.Data["temp"] = int64(rand.Intn(120))
		s.M.Unlock()
		time.Sleep(5 * time.Second)
	}
}

func (s *Sensor) SetHumiditySensor() {
	for {
		s.M.Lock()
		s.Data["humidity"] = int64(rand.Intn(100))
		s.M.Unlock()
		time.Sleep(2 * time.Second)
	}
}

//StartMonitoring will start fetch data from fake sensors in Goroutines
func (s *Sensor) StartMonitoring() {
	log.Println("Start monitoring...")
	go s.SetHumiditySensor()
	go s.SetTempSensor()
}

//GetTempSensor returns the latest temperature sensor data
func (s *Sensor) GetTempSensor() int64 {
	s.M.RLock()
	defer s.M.RUnlock()
	return  s.Data["temp"]
}

//GetHumiditySensor returns the latest temperature sensor data
func (s *Sensor) GetHumiditySensor() int64 {
	s.M.RLock()
	defer s.M.RUnlock()
	return s.Data["humidity"]
}