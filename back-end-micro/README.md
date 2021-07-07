# Microservices architecture

The implementation of the app based on Microservices is located in the `back-end-micro` and `front-end-micro` directories.
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

## Choreographer
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