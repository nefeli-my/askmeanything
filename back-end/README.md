# Service-Oriented Architecture (SOA)

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

## Data access layer
The above services communicate with the Data access layer via its provided interfaces (API)
in order to obtain the corresponding data from the database. Thus, this layer is implemented
as a different app, the only one with the ability to communicate directly with the database.

## Enterprise Service Bus (ESB)
The ESB is implemented as a different app for the inter-service communication and specifically
for the authentication of a user.

**Analytics service** ⟷ **ESB** ⟷ **Authenticator service**

**QnAOperations service** ⟷ **ESB** ⟷ **Authenticator service**