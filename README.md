# c-factor-backend

This repository can be used as a convenient starting point for building
`NODE REST API`'s using `TypeScript` on top of `Express` web framework.  

# Features
 - Basic `JWT` authentication and account activation using `SMTP`
 - Repository pattern used to enable separation of concerns
 - `PostgreSQL` - default repository implementation, should be easy to replace
 
# Pre-reqs
- copy and create `.env` file from `.env.example` template.
- Install [Node.js](https://nodejs.org/en/)
- Install [PostgreSQL](https://www.postgresql.org/)
- Configure your SMTP service and enter your SMTP settings inside `.env` file

# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/maljukan/typescript-node-rest-starter.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Configure your PostgreSQL server
```
# Create new User Role
> createuser --interactive
# Create new Database
> createdb <database name>
# change ownership of the created db to your new role
> psql
> ALTER DATABASE <database name> OWNER TO <role name>;

# optionally, add password to newly created user (since default there'll be no password set)
> ALTER USER <username> WITH PASSWORD '<new password>';

```
- Start your postgreSQL server (you'll probably want another command prompt)
```
> postgres -D /usr/local/var/postgres
```
- Build and run the project
```
> npm run build
> npm start
```

# Swagger
To access Swagger UI for available endpoints
```
http://localhost:3000/api-docs/#/
```
Pass token from `/auth/login` when using protected endpoints (for example: getting all `/users`) like `Bearer <token>`

# REST endpoints
- public: `/auth/login`, `/auth/register`, `/auth/activate`
- protected: `/users`

# CURL
- Register
```
curl -d '{"email":"jdoe@example.com", "password":"PASSWORD",  "name": "John Doe", "userType": "guest"}' -H "Content-Type: application/json" -X POST http://localhost:3000/auth/register
```
- Activation
```
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/auth/activate/ACTIVATION_TOKEN
```
- Login
```
curl -i -d '{"email":"jdoe@example.com", "password":"PASSWORD"}' -H "Content-Type: application/json" -X POST http://localhost:3000/auth/login
```
- GET /users
```
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer JWT_TOKEN_HERE" -X GET http://localhost:3000/users/
```

# Import mock users
TBA

# Tests
* Before running tests be sure to create a real `.env` file in root using the fields found in `.env.example`
```
npm run test
```

# TODO
- Implement RBAC functionality
- ~~Integrate Swagger~~
- Test coverage

# Credits
The repository is based on [Microsoft/TypeScript-Node-Starter
](https://github.com/Microsoft/TypeScript-Node-Starter)