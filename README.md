# SaaS-25
ask**me**anything is a project developed by two undergraduate students, [Nefeli Myropoulou](https://github.com/nefeli-my) and [Iliana Xigkou](https://github.com/IlianaXn) for the course SaaS 2021 [NTUA ECE](https://www.ece.ntua.gr/gr).   

##Purpose
ask**me**anything gives its users the opportunity to:

* View posted questions 
* View the answers to the above questions
* View statistical diagrams regarding the amount of questions/answers posted per day in the last week and
the most used keywords in the questions. 
<p/>  
After registration, which is free, users obtain even more capabilities.
They can:

* View all questions and filter them based on the name of the author, the attached keywords, 
or date that they were created 
* Post their own questions 
* Answer posted questions 
* View statistical diagrams stated as above based on their activity
* Update the account information

##Technology Stack
During the development of this app these technologies are used:
* [PostgreSQL](https://www.postgresql.org/) as the DBMS.
* [Sequelize](https://sequelize.org/) as the ORM for the communication with the DBMS.
* [Nodejs](https://nodejs.org/en/) as the [JavaScript](https://www.javascript.com/) runtime.
* [Express](https://expressjs.com/) as the web application framework for the implementation
of the services in SOA and Microservices architecture.
* [React](https://reactjs.org/) as the [JavaScript](https://www.javascript.com/) library for the front-end.
* [Redis](https://redis.io/) as the in-memory key–value database and message broker for 
the implementation of the Choreographer in MicroServices architecture.

##Architectures
###Service-Oriented Architecture (SOA)
Regarding the implementation of the app based on SOA, it is broken down into 3 services 
containing business logic:
* Authenticator service:
  - Registration of new user
  - Sign in of existing user
  - Sign out of signed-in user
  - Get info of existing user
  - Update of info of existing user
  - Validation of token of signed-in user
* QnAOperations service:
  - View questions available to a user who is not signed-in
  - View all questions
  - Filter questions based on the author, the attached keywords and the posting date
  - View questions which the signed-in user has posted or contributed to
  - Create a new question
  - View all the answers to an existing question available to a user who is not signed-in
  - View all the answers to an existing question
  - Create an answer to an existing question
* Analytics service:
  - View statistic data regarding the amount of questions posted per day for the last week
  - View statistic data regarding the amount of answers posted per day for the last week
  - View statistic data regarding the most used keywords 
  - View statistic data regarding the amount of questions posted by the signed-in user 
    per day for the last week
  - View statistic data regarding the amount of answers posted by the signed-in
    per day for the last week
  - View statistic data regarding the most used keywords by the signed-in user

####Data access layer
The above services communicate with the Data access layer via its provided interfaces (API)
in order to obtain the corresponding data from the database. Thus, this layer is implemented 
as a different app, the only one with the ability to communicate directly with the database.

####Enterprise Service Bus (ESB)
The ESB is implemented as a different app for the inter-service communication and specifically
for the authentication of a user.

**Analytics service** ⟷ **ESB** ⟷ **Authenticator service** 

**QnAOperations service** ⟷ **ESB** ⟷ **Authenticator service**

###Microservices
Regarding the implementation of the app based on Microservices, it is broken down into 
5 microservices:
* Authenticator service:
  - Registration of new user
  - Sign in of existing user
  - Sign out of signed-in user
  - Get info of existing user
  - Update of info of existing user
  - Validation of token of signed-in user
* Question service:
  - Create a new question
* Answer service:
  - View an existing question and all of its answers available to a user who is not signed-in
  - View an existing question and all of its answers 
  - Create an answer to an existing question
* QnADisplay service: 
  - View questions available to a user who is not signed-in
  - View all questions
  - Filter questions based on the author, the attached keywords and the posting date
  - View questions which the signed-in user has posted or contributed to
* Statistics service:
  - View statistic data regarding the amount of questions posted per day for the last week
  - View statistic data regarding the amount of answers posted per day for the last week
  - View statistic data regarding the most used keywords
  - View statistic data regarding the amount of questions posted by the signed-in user
    per day for the last week
  - View statistic data regarding the amount of answers posted by the signed-in
    per day for the last week
  - View statistic data regarding the most used keywords by the signed-in user
  
####Choreographer
The Choreographer is implemented as a different app responsible for the notification
of the appropriate services upon an occurring event. For this purpose, Redis is used with 
the below configuration:
* 4 keys:
  - `bus`
     - Field `messages`, with all the messages that the 
       Choreographer has received
  - `publishers`: 
     - Field `channel_users`, with the publisher to that channel, i.e. the **Authenticator
       service**
     - Field `channel_questions`,  with the publisher to that channel, i.e. the
       **Question service**
     - Field `channel_answers`, with the publisher to that channel, i.e. the
       **Answer service**
  - `subscribers`:
     - Field `channel_users`, with the subscribers to that channel, i.e. the **Question
       service**, **Answer service**, **QnADisplay service** and **Statistics service**
     - Field `channel_questions`,  with the subscribers to that channel, i.e. the
       **Answer service**, **QnADisplay service** and **Statistics service**
     - Field `channel_answers`, with the subscribers to that channel, i.e. the
       **QnADisplay service** and **Statistics service**
  - `services`:
     - Field `AuthenticatorService`
     - Field `QuestionService`
     - Field `AnswerService`
     - Field `QnADisplayService`
     - Field `StatisticsService`
<br>with all the provided capabilities by each service
       
Moreover, in case a service is down and an amount of messages is created and ignored
by this service, it is ensured that once it is functional again, it can obtain the
missing messages from the `bus messages` field.

##Deployment
Information about the deployment of ask**me**anything is available on the branch 
`production`.

##Documentation
During the development of this app diagrams are created with [Visual Paradigm](https://www.visual-paradigm.com/) and used as a guide. 
These diagrams can be found in the VPP project `askmeanything.vpp` in the directory `documentation` following this structure:
1. Entity Relationship diagram: `ER diagram`
2. Class diagram: `Class Diagram`
3. Component diagrams:
   - `SOA1`
   - `SOA2` (more detailed)
   - `Microservices1`
   - `Microservices2` (more detailed)
4. Deployment diagrams:
   - `SOA`
   - `Microservices`
  
  

