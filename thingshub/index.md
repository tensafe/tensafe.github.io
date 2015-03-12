---
layout: page
title: "Smart hub for every things"
description: ""
draft: true
---
{% include JB/setup %}

The goal of this project is to create a smart hub that can control every things.

This project will use Raspberry Pi, Arduino, and many radio modules such as Xbee, Z-wave, and BLE. The radio modules are to support many existing smart things.

MQTT is used to communicate each other locally.

## proof of concept project #1

There are a motion sensor and a light. The light is turned on when a motion is detected. The light off when there is no motion for a period of time.
The light can be controlled via web interfaces or mobile apps.

The motion sensor on Arduino sends the events via Xbee and the controller on Pi reacts to the events by turning on or off the light and publishing the events using MQTT.

### Requirements

#### Raspberry Pi
- Xbee module as coordinator
- Wi-Fi dongle
- [mongodb](http://c-mobberley.com/wordpress/2013/10/14/raspberry-pi-mongodb-installation-the-working-guide/)
- [mosca](https://github.com/mcollina/mosca) - MQTT broker
- [mqtt](https://www.npmjs.com/package/mqtt) - MQTT client library

#### Arduino
- Xbee module as router
- PIR motion sensor
- Relay



 
