#!/bin/bash

# MQTT Broker configuration (from brokerConfig.js)
BROKER_IP="localhost"
BROKER_PORT="8080" # This is the websocket port from brokerConfig.js, mosquitto_pub usually connects to the MQTT port (1883 by default). If this doesn't work, you might need to change it to 1883 or check your mosquitto configuration.

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
    POWER=$(( RANDOM % 500 + 100 )) # Random power between 100 and 600
    mosquitto_pub -h "$BROKER_IP" -p "$BROKER_PORT" -t "0x186455F4" -m ";;$WARNINGS;$POWER"

    # Topic: 0x186555F4 - Battery Pack Info
    # Data format: vPack;cPackPart1;cPackPart2;SoC
    VPACK=$(( RANDOM % 100 + 200 )) # Random vPack between 200-300 (20.0-30.0V)
    CPACK_PART1=$(( RANDOM % 1000 + 500 )) # Random cPackPart1
    CPACK_PART2=$(( RANDOM % 1000 + 500 )) # Random cPackPart2
    SOC=$(( RANDOM % 101 )) # Random SoC between 0-100
    mosquitto_pub -h "$BROKER_IP" -p "$BROKER_PORT" -t "0x186555F4" -m "$VPACK;$CPACK_PART1;$CPACK_PART2;$SOC"

    sleep 1 # Wait for 1 second before sending next data
done
