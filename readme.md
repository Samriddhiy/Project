
# ToDo Application

A secure Todo API with JWT authentication and a MongoDB aggregation feature for task counts per user.


## API Reference

#### User Register

```http
    POST /api/v1/users/register
``` 

#### User Login

```http
  POST /api/v1/users/login
```

#### Task Create

```http
    POST /api/v1/tasks/
``` 

#### Task Update

```http
    PUT /api/v1/tasks/:id
``` 

#### Task Delete

```http
    DELETE /api/v1/tasks/:id
``` 
#### Task Rate

```http
    POST /api/v1/tasks/rateTask/:id
``` 
#### No. of tasks per user

```http
    GET /api/v1/tasks/taskCount
``` 

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` = 

`MONGODB_URI`= 

`CORS_ORIGIN` =

`JWT_SECRET` = 

`JWT_EXPIRES_IN` =
## Run Locally

Clone the project

```bash
  git clone https://github.com/Samriddhiy/Project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

