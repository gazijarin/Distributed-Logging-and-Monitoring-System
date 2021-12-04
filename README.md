# TeamRocket
CSC302  - Team Rocket blasting off again
![image](https://user-images.githubusercontent.com/40362692/135701979-579eb7e4-42a8-437e-b537-37a8623d9a5f.png)

## Documentation
> Please consult the [`documentation`](/documentation) subdirectory for our progress, roadmap, meeting minutes, tech stack and more.

## Installation and Deployment
### Quick Start Guide
- Clone the repository
- Go into the directory created by cloning the repository
- run `./bootstrap.sh` to install the required dev dependencies
- run `./run_app.sh`, this should start the entire docker stack and print output to the console

### Test Guide 
- Clone the repository
- run `./bootstrap.sh` if haven't done so already
- run `./run_tests.sh`

## Dev Dependencies installed by bootstrap.sh
* Node 16
* npm 7.24.0
* Docker 20.10
* psql 14


## Repo Folder Structure

### log_creator
`log_creator` is a node application that creates dummy logs.
The docker-compose creates 2 of these services, and they ping each other back and forth imitating microservices.
These services don't have a database to keep complexity down but in real world use each microservice should have it's own database.

### logging_server

#### client
This is our frontend react application, it adds a very simple GUI on top of the logging server.


#### server
This is the backend server that handles the actual log capturing, filtering, and where the API is exposed.
