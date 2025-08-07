# Telemetry Data Viewer

This project is a web-based application for visualizing telemetry data received from the Guarapuvu I solar boat, part of the Vento Sul - UFSC Solar Boat team.

## Data Format

The application expects to receive data in a specific CSV format. The data string is composed of several values separated by commas. The expected values are:

- **GPS:** Latitude and Longitude.
- **Vessel Status:** Roll, Pitch, and Yaw.
- **Engine Data:** RPM, Current, and Voltage for two motors (M1 and M2).
- **Temperature:** Controller and motor temperatures for two motors.
- **Battery:** Voltage, Current, and Charge Level for the boat's battery.
- **Wind:** Speed and direction.
- **Hydrogen:** Tank pressure, cell current, and electrolyzer current.
- **Commands:** Rudder and throttle commands.

For more details, see the `DATA_FORMAT.md` file.

## How to Run

This project uses Docker to create a container with the web server.

### Build the Docker Image

```bash
docker build -t web-image:v1 .
```

### Run the Docker Container

```bash
docker run -d --name web_server -p 80:80 web-image:v1
```

Once the container is running, the application will be available at `http://localhost:80`.

### Stop the Docker Container

```bash
docker kill web_server
```

## Code Style

- **JavaScript:** Vanilla JavaScript (ES6+) is used. `const` and `let` are preferred over `var`.
- **Equality:** Strict equality `===` and `!==` are enforced.
- **Conditionals:** Ternary operators are used for conditional styling.
- **Naming Conventions:**
    - Variables and constants: `camelCase` (e.g., `overTemperature`, `boatBattery`).
    - Functions: `camelCase` (e.g., `onConnectionLost`, `updateTGraph`).
- **Libraries:** No external libraries are used. Native JavaScript functions and methods are used instead.

## Linting and Testing

There are no linting or testing frameworks configured for this project. Manual testing is required.
