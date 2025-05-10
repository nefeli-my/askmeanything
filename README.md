# SaaS-25
**ask**me**anything** is a project developed by two undergraduate students, [Nefeli Myropoulou](https://github.com/nefeli-my) and [Iliana Xigkou](https://github.com/IlianaXn) 
for the course SaaS 2021 [NTUA ECE](https://www.ece.ntua.gr/gr).   

## Purpose
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

## Technology Stack
During the development of this app these technologies are used:
* [PostgreSQL](https://www.postgresql.org/) as the DBMS.
* [Sequelize](https://sequelize.org/) as the ORM for the communication with the DBMS.
* [NodeJS](https://nodejs.org/en/) as the [JavaScript](https://www.javascript.com/) runtime.
* [ExpressJS](https://expressjs.com/) as the web application framework for the implementation
of the services in SOA and Microservices architecture.
* [ReactJS](https://reactjs.org/) as the [JavaScript](https://www.javascript.com/) library for the front-end.
* [Bootstrap](https://getbootstrap.com/) as the tool for the design and customization of the website's
  front-end.
* [Redis](https://redis.io/) as the in-memory key–value database and message broker for the 
implementation of the Choreographer in the MicroServices architecture.
* [PassportJS](http://www.passportjs.org/) as an authentication middleware for NodeJS.
* [Heroku](https://www.heroku.com/) for the SOA and the Microservices apps' deployment. 
* [EmailJS](https://www.emailjs.com/) as the third-party service for sending emails to users 
after they have contacted us via the corresponding 'contact us' form. 


## Architectures
### Service-Oriented Architecture (SOA)

The implementation of the app based on SOA is located in the `back-end` and `front-end` directories.
It was broken down into 3 services 
containing the following business logic:
* Authenticator service:
  - Register a new user
  - Sign in an existing user
  - Sign out a signed-in user
  - Get the account information of an existing user
  - Update the account information of an existing user
  - Validate the token of a signed-in user
* QnAOperations service:
  - View all questions (*)
  - View the 10 most recent questions (available to not signed-in users instead of the 
    'view all questions' functionality)
  - Filter questions based on the author, the attached keywords and the posting date (*)
  - View all the questions the signed-in user has posted or contributed to (*)
  - Create a new question (*)
  - View all the answers to an existing question
  - Answer an existing question (*)
* Analytics service:
  - View statistic data regarding the amount of questions posted per day, during the last week
  - View statistic data regarding the amount of answers posted per day, during the last week
  - View statistic data regarding the most used keywords 
  - View statistic data regarding the amount of questions posted by the signed-in user 
    per day, during the last week (*)
  - View statistic data regarding the amount of answers posted by the signed-in
    per day, during the last week (*)
  - View statistic data regarding the most used keywords by the signed-in user (*)
 
 *The functionalities noted with an asterisk are only available to signed-in users.*

#### Data access layer
The above services communicate with the Data access layer via its provided interfaces (API)
in order to obtain the corresponding data from the database. Thus, this layer is implemented 
as a different app, the only one with the ability to communicate directly with the database.

#### Enterprise Service Bus (ESB)
The ESB is implemented as a different app for the inter-service communication and specifically
for the user's token validation everytime he wants to access protected resources via a request.

**Analytics service** ⟷ **ESB** ⟷ **Authenticator service** 

**QnAOperations service** ⟷ **ESB** ⟷ **Authenticator service**

### Microservices architecture

The implementation of the app based on Microservices architecture is located in the `back-end-micro` and `front-end-micro` directories.
It was broken down into 
5 microservices:
* Authenticator service:
  - Register a new user
  - Sign in an existing user
  - Sign out a signed-in user
  - Get the account information of an existing user
  - Update the account information of an existing user
  - Validate the token of a signed-in user
* Question service:
  - Create a new question (*)
* Answer service:
  - View an existing question and all of its answers 
  - Answer an existing question (*)
* QnADisplay service: 
  - View all questions (*)
  - View the 10 most recent questions (available to not signed-in users instead of the 
    'view all questions' functionality)
  - Filter questions based on the author, the attached keywords and the posting date (*)
  - View questions which the signed-in user has posted or contributed to (*)
* Statistics service:
  - View statistic data regarding the amount of questions posted per day for the last week
  - View statistic data regarding the amount of answers posted per day for the last week
  - View statistic data regarding the most used keywords
  - View statistic data regarding the amount of questions posted by the signed-in user
    per day for the last week (*)
  - View statistic data regarding the amount of answers posted by the signed-in
    per day for the last week (*)
  - View statistic data regarding the most used keywords by the signed-in user (*)
  
*The functionalities noted with an asterisk are only available to signed-in users.*
  
#### Choreographer
The Choreographer is implemented as a different app responsible for the notification
of the appropriate services upon an occurring event (new user creation, new 
question, or new answer submission). 
For this purpose, Redis is used with the below configuration:
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

## Deployment
For the deployment of the app **ask**me**anything** the cloud application platform
[Heroku](https://www.heroku.com/) was used.

For the deployment of the app the instructions as stated below are executed given
that one has installed the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli):

1.
``` 
heroku login
```
2.
```
heroku create <app-name>
```
3.
```
heroku git:remote --app <app-name>
```
4.
```
git subtree push --prefix path/to/project heroku main
```

For the connection of the [Heroku Postgres](https://elements.heroku.com/addons/heroku-postgresql) and [Heroku Redis](https://elements.heroku.com/addons/heroku-redis) these instructions
are executed:
* Heroku Postgres:
```
heroku addons:create heroku-postgresql:hobby-dev
```
* Heroku Redis:
```
heroku addons:create heroku-redis:hobby-dev 
heroku addons:attach <app-name-with-redis>::REDIS --app <app-name-to-share-redis>
```

## Documentation
During the development of this app diagrams are created with [Visual Paradigm](https://www.visual-paradigm.com/) and used as a guide. 
These diagrams can be found in the VPP project `askmeanything-25.vpp` in the directory `documentation` following this structure:
1. Entity Relationship diagram: `ER diagram`
2. Class diagram: `Class Diagram`
3. Component diagrams:
   - `SOA1`
   - `SOA2` (more detailed)
   - `SOA Front-End`  
   - `Microservices1`
   - `Microservices2` (more detailed)
   - `Microservices Front-End`
4. Deployment diagrams:
   - `SOA`
   - `Microservices`

  
  ![main view](https://github.com/user-attachments/assets/2ad395fd-201e-4a54-adec-e42314916f3a)



