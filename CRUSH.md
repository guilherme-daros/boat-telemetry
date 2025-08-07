## Build and Run
The project uses Docker for builds.
- Build image: `docker build -t web-image:v1 .`
- Run container: `docker run -d --name web_server -p 80:80 web-image:v1`
- Stop container: `docker kill web_server`
- Reset Docker env: `docker kill web_server && docker container prune && docker build -t web-image:v1 . && docker run -d --name web_server -p 80:80 web-image:v1`

## Code Style
- Vanilla JavaScript (ES6+).
- Use `const` and `let`; avoid `var`.
- Ternary operators are used for conditional styling.
- Use strict equality `===` and `!==`.
- As there are no libraries, use of native functions and methods of data-types is required.

## Naming Conventions
- Variables: camelCase (`overTemperature`, `boatBattery`)
- Constants: camelCase (`brokerIp`, `brokerPort`)
- Functions: camelCase (`onConnectionLost`, `updateTGraph`)

## Linting and Testing
- There are no linting or testing frameworks configured.
- Manual testing is required.
