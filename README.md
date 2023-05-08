# Documentation

This project is a full-stack application built with React, Express, and MySQL, and it runs using Docker Compose. The application consists of two main services: an Express API and a React frontend.

# Setup

## Prerequisites

- Docker and Docker Compose installed on your machine.

## Configuration

- Create a .env file at the root of the project with the following variables:
  DB_ROOT_PASSWORD=<your_db_root_password>
  DB_NAME=<your_db_name>
  DB_USER=<your_db_user>
  DB_USER_PASSWORD=<your_db_user_password>

## Running the Application

to run the application execute docker-compose up in the root directory.

# Docker Compose Configuration

The docker-compose.yml file defines three services:

- express-api: Builds and runs the Express API from the services/express-api directory.
- db: Runs a MySQL 8.0 container and sets up the database, user, and password using environment variables.
- react-frontend: Builds and runs the React frontend from the services/react-frontend directory.
  The services express-api and react-frontend are configured to use the .env file for environment variables. The db service also uses a named volume db_data to persist the database data.
