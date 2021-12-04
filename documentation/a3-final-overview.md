## A3 Final Overview

### A final overview of the features your project has implemented, including what purpose they serve.

#### An elaboration of what these features do and how they work.

Our main goal for the new features is to create an application where we implement a logging system. Therefore, we are able to meet the following criteria:

- Understand and experiment with log messages - correlation id, context id, etc.
- This logging system would allow one machine to log multiple inputs from various servers.
- Begin with a single endpoint that reads and writes to our PSQL database from our logging system.
- Have a simple page on the web browser that presents relevant information

In order to achieve that, we have accomplished the following features:

- Set-up of a logging server to accept log requests and store in the database
  - Set-up ORM with the database: established an ORM connection with the database that enables logging. We have created a new class called the DatabaseManager that establishes a new Prisma client that helps in adding and searching logs through async Promises. Then, in the LogManager class, we define all the necessary attributes needed to define a specific log, such as machineID, dbManager and isClosed. After all classes have been defined, we go into the log server and create a new post request where we add the log to the database.
  - POST endpoint for logs: in our main log server, log_server.ts, we create a new post endpoint where we define the log body, level and message and send the result to the server. We also log this result to the dbManager.
  - GET endpoint for logs
  - Extensive testing of the logging server. We achieved a very strong 100% code coverage on all the backend routes. We realize that this is only attainable because of the simplicity of the code. Any things like authentication, authorization, etc. would present a whole new unique set of challenges when test. We luckily didnt' have to rely on any outside web services that we would also need to mock when testing which again increases the complexity and ability to get 100% code coverage like we did here.
- Data visualization
  - A React page that displays all the relevant data for the logs that are coming in: in this web server, we receive data from the backend and display the logs in a meaningful way. Currently, support a table of all the newest logs and ways to filter through it

#### The acceptance criteria for these features and how that acceptance has been demonstrated. In particular, what verification criteria have been negotiated with your industry partner, and what tests, processes, or documentation exist showing that those criteria have been met?

- Github CI/CD: We have defined our CI/CD workflow so that the code that we are going to all be eventually working on is decoupled from one another to ensure there is a faster merging process, and we allocate less time for errors. CI/CD using GitHub Actions offers workflows that can build the code in your repository and run your tests on a set schedule to ensure preliminary checking before a team member reviews a PR. This enables us to test the basic correctness of our code and ensure that there are no errors overlooked.
- Github Issues: we defined several issues in our Github repository that act as tickets and are dependent on other linked issues. Every single issue is directly linked to a pull request. Therefore, since we have a linear workflow, if any of the issues are missing or incompleted, we have a documented reason why. Similarly, there exists enough information in this issue to define an acceptance criteria, such as the basic functionality that needs to be demonstrated.
- Lastly, we have frontend visualization as a platform to visually see our logs and our changes. This enables us to see if the right logs are coming through at the right moment.

#### What features of tasks were not delivered, if any, and documentation of how those decisions were made.
- Some visualizations, we ended up not implementing a histogram of the logs and a few other visualizations we originally intended to implement. We focused more on the backend API instead of the frontend visualization.
- Shard database: For the objective that we had planned for the final product, it is quite far-fetched to make massive improvements to our database. Since it is a minimum viable product, it did not make sense for us to create horizontal partitioning to facilitate horizontal scaling. This is because our product will not have any traffic load at all during the initial stages and therefore does not require faster processing.
- “Leader-follower” database architecture. Additionally, since we currently do not have massive system overload, we decided to not implement further tweaks to our database to implement a “leader-follower” database architecture to help stabilize the system.
- Kafka queue. This implementation also requires much more data than we will get for our product. Therefore, we decided not to pursue overall system peak load hardening through implementing a kafka queue architecture.
