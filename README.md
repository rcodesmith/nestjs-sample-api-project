# Test API

## Description

Test API project exposing users and posts endpoints. The project is built using NestJS framework, TypeORM,
and uses PostgreSQL as a database.

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

It exposes Swagger documentation at http://localhost:3000/api

## Installation

To install the project locally, you first need to install:

- [https://nodejs.org/en](Node.js) version 16.3.1+
- [https://nestjs.com/](Nest.js) version 10.4.4+

Once you do, install packages:

```bash
$ npm install
```

## PostgreSQL Database

Before running the app, you need a PostgreSQL database.

### Creating PostgreSQL database in Neon

One option is to host one in [https://neon.tech](Neon).

### Database configuration

After you create a PostgreSQL database, copy the connection URL:

![alt text](image.png)

And set it as an environment variable in a `.env.local` file which will get used when you run the app locally.  e.g.:

```
DATABASE_URL=postgresql://some_owner:UXAvZJJB6Hy2@ep-restless-violet-a5cwkpun.us-east-2.aws.neon.tech/test?sslmode=require
```

To run e2e tests, you also need to set the database URL which should be used for e2e tests in a `.env.test` file.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The app will be running at http://localhost:3000

## Run via Docker

The project includes a Dockerfile to run the app in a container.

To build the Docker image:

```bash
docker build -t 'testapi' .
```

To run the Docker container, exposed at port 3000:

```bash
docker run -p 3000:3000 -e 'DATABASE_URL=postgresql://some_owner:UXAvZJJB6Hy2@ep-restless-violet-a5cwkpun.us-east-2.aws.neon.tech/test?sslmode=require' testapi
```

The app will be running at http://localhost:3000

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

The e2e tests use the PostgreSQL database and depend on the database URL set in the `.env.test` file (see above).

## API Documentation

Once you're running the app locally, Swagger docs can be found at:

http://localhost:3000/api
