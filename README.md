[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/MhkFIDKy)

# AcademicPlannerPro

University Timetable Management System

---

- [AcademicPlannerPro](#academicplannerpro)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
  - [Testing](#testing)
    - [Unit Testing](#unit-testing)
    - [Integration Testing](#integration-testing)
      - [Postman published documentation - https://documenter.getpostman.com/view/33650902/2sA35BbjHz](#postman-published-documentation---httpsdocumentergetpostmancomview336509022sa35bbjhz)
    - [Security Testing](#security-testing)
    - [Performance Testing](#performance-testing)

## Introduction

Welcome to AcademicPlannerPro, the University Timetable Management System! This system helps universities manage their class schedules efficiently.

## Features

- User Management
- Course Management
- Faculty Management
- Timetable Management
- Room and Resource Booking
- Student Enrollment
- Security
- Authorization and Authentication using (JWT)
- Notifications and Alerts

## Technologies

AcademicPlannerPro is built using the following technologies:

- Node.js
- Express.js
- MongoDB

## Getting Started

To get started with AcademicPlannerPro, follow the steps below.

### Prerequisites

- Node.js
- MongoDB

### Installation

To set up the University Timetable Management System, follow these steps:

1. Clone the repository from GitHub:

   git clone

2. Navigate to the project directory:

   cd backend

3. Install dependencies:

   npm install

4. Set up your environment variables by creating a `.env` file in the root directory. You can use `.env.example` as a template.

### Usage

1. Start the application:

   npm start

2. Access the application at `http://localhost:3000`.

## Testing

### Unit Testing

- Test cases are written with (Jest)
- You can find the test files inside the test folder
- Setup "test" : "jest" in scripts in package.json

![j](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/8c339a53-3a28-4042-b6fb-63603ece6d52)

- Move to the backend folder (cd backend) and run (npm test)

![unittest](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/26cf26ef-7fbb-4db8-8497-f9c3c7a995e8)

### Integration Testing

You can check with the postman or any other API testing tool.
All API endpoints work with CRUD operations (POST, GET, PATCH, DELETE) and All the routes define in the server.js file.

#### Postman published documentation - https://documenter.getpostman.com/view/33650902/2sA35BbjHz

![postmanpublish](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/a2d4e6c6-00f9-442d-8560-3e5e16b36262)

- Authorization and Authentication
  - http://localhost:3000/auth/login

![9](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/25a43f92-4961-450d-b630-bced7096f930)

  - http://localhost:3000/auth/logout

![11](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/1830c160-c5ca-44d7-a7b6-8259ad9db3bf)

  - http://localhost:3000/auth/refresh
    
![12](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/9e48e3c1-e461-4f61-a867-1d226cef486c)

- User Management - http://localhost:3000/users

![1](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/a2394618-85fc-4d25-b876-5d7ec648dede)

- Faculty Management - http://localhost:3000/faculy

![3](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/d6e9aae3-4296-466f-96db-2ba25d416802)

- Course Management - http://localhost:3000/courses

![2](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/22473b91-3265-4bd5-a21b-43254caf62a8)
  
- Timetable Management - http://localhost:3000/timetable

![8](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/3ffbd98b-c2c2-486f-8b7b-6e1099bbcb6e)

- Session Management in TimeTable - http://localhost:3000/sessions
- 
![5](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/b024b5c1-77fb-4506-9e18-12066453b07a)
  
- Room and Resource Booking - http://localhost:3000/rooms

![6](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/37db79a2-3012-48f3-83ee-8f9024a04a91)

- Booking Management - http://localhost:3000/bookings

![4](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/4a5970aa-ca8a-41ee-8d43-fd02de9f959e)

- Student Enrollment - http://localhost:3000/enroll
  
![7](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/a6a2f459-8687-4de9-9e83-96cb0670183b)

### Security Testing

- OWASP ZAP used for the Security Testing.
- OWASP ZAP is an open-source web application security testing tool designed to help testers identify vulnerabilities in web applications during development and testing phases.

![ztest](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/7d8ab58a-0582-48b5-a430-837a11e58347)
![ztest2](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/036e2d29-7fb4-448b-8c4b-f1739de1e71a)
![ztest3](https://github.com/sliitcsse/assignment-01-IT21160066/assets/99235576/a458d273-b2bb-4d3f-b4dc-bf8ae9f2dd66)


### Performance Testing

- Artillery.io is a open-source and powerful performance testing framework primarily designed for testing the scalability and reliability of applications.
- Install Artillery - npm install -g artillery
- Run test file - artillery run test_file_example.json
