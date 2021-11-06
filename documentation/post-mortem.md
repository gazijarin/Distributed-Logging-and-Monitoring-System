## Post-Mortem on A1

### What goals have been achieved?

- **Documentation:** We made it a necessity to document every decision so that we can come back later to a shared environment of recorded history. As of now, all of the documentation lies in the documentation folder from the root directory. We have added all the necessary information there up till this point of progress. We will be adding our meeting minutes as well as useful findings in there as time passes.

- **Research:** Since not everyone from the team is well-informed about distributed logging and monitoring, we have set up an additional document where we share useful resources and learning modules surrounding the topic. We have watched all the preliminary videos on the topic and made notes on them, which seemed like a resourceful endeavour before starting the project.
  Configuration and deployment. We have set up a simple server that configures and deploys itself in easy, straightforward steps through docker.

- **Backend Implementation:** We have set up a simple server system and also added a connection manager that would manage connections from a logger to a remote database within the docker container. This sets up the foundation for our future work.

- **Team Organization:** After A1, we have done further breakdown and task delegation through Github Issues within the team for the next milestone. There was a healthy division of skills and no aspect of the project relies too much on the skill of one person.
  What goals have been missed, and by how much.
  CI/CD. Since we do not have a substantial workflow already in place due to only the first milestone being reached, we have not set up Github Actions for our test schedule yet. However, we already assigned this task as a requirement for the next iteration.

- **Industry partner:** One of our goals was to also get in touch with the industry partner early. However, due to unexpected delays, we were unable to set up a meeting. We hope to set up a bi-weekly meeting with our partner for the next iteration in order for a greater visibility for our work.

### What Goals have been Missed and by How Much? 

- **Architecture:** Our current architecture is rather prone to error and failure, due primarily to the fact that it has a lot of single points of failure. We will work on developing and implementing a new & improved architecture in the near future. 

- **Object-Relational Mapping:** During development, we recognized that the scope of the connection from log manager to the database is significantly more involved and complicated than we had originally anticipated. This is due in large part to the inclusion of ORM into our application, and the time taken to research & understand PRISMA. We will work on integrating this in our application in the near future. 

### What plans need to be adjusted based on time availabl and project scope?

Distributed logging and monitoring is a big field, and we need to undergo additional research in order to fully understand the project scope. We hope to, in synchronization with our work, also look into specific tools like ElasticSearch that would guide us to a better architecture.

An all-encompassing visualization tool was also under our radar for the future. However, since we are delegating more time onto building a stronger foundation in our backend mechanics, we would keep that feature as a nice-have and not mandatory for completing the project.
