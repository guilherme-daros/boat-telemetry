#!/bin/bash

# MQTT Broker configuration (from brokerConfig.js)
BROKER_IP="localhost"
BROKER_PORT="1883" 
# Function to generate random warning flags (8 binary flags)
generate_warnings() {
    local flags=""
    for i in {1..8}; do
        flags+=$(shuf -i 0-1 -n 1)
    done
    echo "$flags"
}

# Main loop to publish data
while true; do
    # Topic: 0x186455F4 - System Status and Warnings
    # Data format: ;;warnings;power
    WARNINGS=$(generate_warnings)
    POWER=$(( RANDOM % 500 + 100 )) 
    mosquitto_pub -h "$BROKER_IP" -p "$BROKER_PORT" -t "0x186455F4" -m ";;$WARNINGS;$POWER"

    # Topic: 0x186555F4 - Battery Pack Info
    # Data format: vPack;cPackPart1;cPackPart2;SoC
    VPACK=$(( RANDOM % 200 + 100 ))
    CPACK_PART1=$(( RANDOM % 1000 + 500 )) 
    CPACK_PART2=$(( RANDOM % 1000 + 500 )) 
    SOC=$(( RANDOM % 80 + 20)) 
    mosquitto_pub -h "$BROKER_IP" -p "$BROKER_PORT" -t "0x186555F4" -m "$VPACK;$CPACK_PART1;$CPACK_PART2;$SOC"

    # Topic: 0x186655F4 - Battery Pack Info
    # Data format: tPackPart1;tPackPart2;tPackPart3;tPackPart4
    TPACK_PART1=$(( RANDOM % 800 + 200 )) 
    TPACK_PART2=$(( RANDOM % 800 + 200 )) 
    TPACK_PART3=$(( RANDOM % 800 + 200 )) 
    TPACK_PART4=$(( RANDOM % 800 + 200 )) 
    mosquitto_pub -h "$BROKER_IP" -p "$BROKER_PORT" -t "0x186655F4" -m "$TPACK_PART1;$TPACK_PART2;$TPACK_PART3;$TPACK_PART4"

    # Topic: 0x186755F4 - Battery Pack Info
    # Data format: tPackPart5;tPackPart6;tPackPart7;tPackPart8
    TPACK_PART5=$(( RANDOM % 800 + 200 )) 
    TPACK_PART6=$(( RANDOM % 800 + 200 )) 
    TPACK_PART7=$(( RANDOM % 800 + 200 )) 
    TPACK_PART8=$(( RANDOM % 800 + 200 )) 
    mosquitto_pub -h "$BROKER_IP" -p "$BROKER_PORT" -t "0x186755F4" -m "$TPACK_PART5;$TPACK_PART6;$TPACK_PART7;$TPACK_PART8"


    sleep 1 # Wait for 1 second before sending next data
done
