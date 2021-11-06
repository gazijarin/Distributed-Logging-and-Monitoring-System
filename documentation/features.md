## Features

### High-level features for A2

Our main goal for the new features is to create an application where we implement a simple logging system. Therefore, we are able to meet the following criteria:

- Understand and experiment with log messages - correlation id, context id, etc.
- This logging system would allow one machine to log multiple inputs from various servers.
- Begin with a single endpoint that reads and writes to our PSQL database from our logging system.
- Have a simple “dummy” page on the web browser that presents relevant information

In order to achieve that, we created the following tasks:

- Creation of an application that generates logs on a single machine.
  - Delegated to: Demetre Jouras
  - Due: October 31st
- Creation of a class that would allow us to connect to the central log database.
  - Delegated to: Sultan Sidhu
  - Due: October 31st
- Setting up the networking layer that transports the logs to the database.
  - Delegated to: Demetre Jouras
  - Due: October 31st
- Deployment (AWS, Heroku, etc) and CI/CD expansion - add tests + linter + code metrics
  - Delegated to: Abhi Kapoor
  - Due: October 31st
- Basic log visualization - have a server that supports getting information from the database for a given machine
  - Delegated to: Gazi Jarin
  - Due: October 31st
- Creation of a class that does actual logging logic.
  - Delegated to: Sultan Sidhu
  - Due: October 31st
- Creating artifacts of documentation
  - Delegated to: Gazi Jarin
  - Due: October 28th

### Progress Map for A2

**Abhi Kapoor**

- [Completed] Integrating CI/CD through Github Actions (https://github.com/nektos/act)
- [Completed] Preliminary research on specific tools, like ElasticSearch, and creating a simple blueprint and/or guide for us to follow and take inspiration from for our code (with other teammates)
- [In progress] Undergoing research to understand domain-level architecture
- [Completed] Meeting notes and tracking changes

**Demetre Jouras**

- [Completed] Initial deployment and set-up of a simple architecture
  Run express server with PSQL backend
  Print a simple server running message
- [Completed] Create a new Github repository and invite members
- [Completed] Commit the initial set-up and list the dependencies

**Gazi Jarin**

- [In progress] Create a “dummy” web page that visualizes basic information
- [Completed] Preliminary research on specific tools, like ElasticSearch, and creating a simple blueprint and/or guide for us to follow and take inspiration from for our code (with other teammates)
- [Completed] Undergoing research to understand domain-level architecture

**Sultan Sidhu**

- [Completed] Initial deployment and set-up of a simple architecture
  Create an installation/deployment README
- [Completed] Preliminary research on specific tools, like ElasticSearch, and creating a simple blueprint and/or guide for us to follow and take inspiration from for our code (with other teammates)
- [Completed] Undergoing research to understand domain-level architecture
