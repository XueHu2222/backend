# Veterinarian

1. Install docker to your system
2. Run `docker compose up` and you are good to go

## Modules

We use ES6 module system to import and export modules.

## Variables.env

We save credentials to other services in a `variables.env` file. This file is included in this template. However, it is common use not to include it in a public repository. There are some default key value pairs included to demonstrate its working.

## Ports

You can change the ports of your server via `variables.env`

- Appoinments: microservice for the Appointments resource - running on port:3010
- Apigateway: microservice for the API Gateway - running on port:3011
- Clients: microservice for the Clients resource - running on port:3012

## Containers

Check the readme files of each container to understand the setup
