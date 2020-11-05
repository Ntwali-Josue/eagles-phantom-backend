# PHANTOM

## Phantom is an online platform with facilitate the transport into town, we are tracking buses, we assign the buses to drivers and operators.

[![](https://img.shields.io/static/v1?label=Reviewer&message=Hound&color=blueviolet)](https://houndci.com)
[![Build Status](https://travis-ci.com/atlp-rwanda/eagles-phantom-backend.svg?branch=develop)](https://travis-ci.com/atlp-rwanda/eagles-phantom-backend)
<a href="https://codeclimate.com/github/atlp-rwanda/eagles-phantom-backend/maintainability"><img src="https://api.codeclimate.com/v1/badges/3e75b6bbdd43289b59ec/maintainability" /></a>
<a href="https://codeclimate.com/github/atlp-rwanda/eagles-phantom-backend/test_coverage"><img src="https://api.codeclimate.com/v1/badges/3e75b6bbdd43289b59ec/test_coverage" /></a>
[![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/eagles-phantom-backend/badge.svg?branch=develop)](https://coveralls.io/github/atlp-rwanda/eagles-phantom-backend?branch=develop)


## Vision
Modernize the public transport, in order to accelerate and facilitate the displacement of the client and reduce the time spending on the bus station

---
## Project setup
---
### Dotenv setup
 1. ***Get some stuffs on table***
  * Run in terminal ``` npm install ```
  * Create ``` .env ``` file in project root directory
  * Create the variables for  ``` .env ``` taken  ``` .env.example ```  as reference for the environment to create which are used in the project
  * You can add other extra environment if you want other specific things
  ***Note***: Add keys in ``` .env.example ``` to ease next setup for other developers.

  2. ***Time to serve***
   * For you to use your new environment variable you have to import ``` dotenv ``` module in the file where you want to utilise your environment variables and configure it. like this: ```import dotenv from 'dotenv';
   dotenv.config();```

   * Then you'll be able to access your environment variables via ``` process.env.YOUR_KEY ```
   * TYou can then proceed with the other installation!. , happy coding!
### Sequelize ORM setup
1. ***Configuring ```.env```***
   * Download and install [pgAdmin](https://www.postgresql.org/download/)
   * Create two databases, one for testing and another for development.
   * Copy ``` DATABASE_DEV_URL=postgres://your_db_user:your_password@127.0.0.1:5432/your_dev_db_name ``` 
          ``` DATABASE_TEST_URL=postgres://your_db_user:your_password@127.0.0.1:5432/your_test_db_name``` URLs
    from ```.env.example``` to ```.env```
   * Edit them with your real database user, password, port(if you changed the default one) and database name.
2. ***Running Migrations (this is to undo and redo migration)***
   * Run ``` npm run migrate:reset ``` in terminal to fire up migration
3. Running Seeds
 * Run ``` npm run seed ``` in terminal to run all seeds

### Running server (for the development)
   * Run `npm run dev` in terminal
### Running tests (for the testing of the endpoint)
   * Run `npm test` in terminal

### Deployment 
[Heroku](https://eagles-phantom-backend.herokuapp.com/)

### Api Documentation 
[Swagger Documentation](https://eagles-phantom-backend.herokuapp.com/api-docs)

