## Branch with only Express and Sequelize
Some useful commands:
1. To get this branch
```
git pull //to be up to date with main
git fetch 
git checkout PureExpress
```
2. Create in root directory a file `.env` with appropriate data for the connection with database (see Notes below)
3. Run this command to get `sequelize cli`
```
 npm install -g sequelize-cli
 ```
 4. Run this command to create tables in database
 ```
 sequelize db:migrate
 ```
 5. Run app with
 ```
 npm run dev
 ```
 ## Notes
 It is supposed you have installed postgres, created appropriate user and database.
In `.env` file you need this kind of structure:
<pre>
DB_USER=saas25
DB_NAME=AskMeAnything
DB_PORT=3306
DB_HOST=localhost
DB_PASS= <i>password</i>
SECRET= <i>secret_for_token</i>
REFRESH_SECRET= <i>secret_for_refresh_token</i>
</pre>
