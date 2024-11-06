# Property Website

---

## Overview

This is a London-based property website.
This forms part of my final Project for Code Institute

---

## Table of Content

- [Planning](#planning)
  - [Wireframes](#wireframes)
  - [UX/UI Designs on Figma](#uxui-designs-on-figma)
  - [Color pallet](#color-pallet)
  - [ERD diagrams for mapping out my models](#erd-diagrams-for-mapping-out-my-models)
  - [User Stories using MOSCOW Prioritization techniques](#user-stories-using-moscow-prioritization-techniques)
- [Features](#features)
  - [Project Description](#project-description)
  - [GitHub Branching Strategy](#github-branching-strategy)
  - [Atomic Design Methodology](#atomic-design-methodology)
  - [Daphne Implementation for async/await with Django Rest Framework](#daphne-implementation-for-asyncawait-with-django-rest-framework)
- [Deployment](#deployment)
  - [Setting up locally](#setting-up-locally)
  - [Setting up on Heroku](#setting-up-on-heroku)
  - [Database manipulation](#database-manipulation)
  - [Environment Variables](#environment-variables)
- [Testing](#testing)
  - [Manual Testing](#manual-testing)
  - [Auto Testing](#auto-testing)
    - [Testing the API locally](#testing-the-api-locally)
    - [Testing React locally with Cypress](#testing-react-locally-with-cypress)
- [Credits](#credits)

---

### [Planning](#table-of-content)

Section Index
- [Wireframes](#wireframes)
- [UX/UI Designs on Figma](#uxui-designs-on-figma)
- [Color pallet](#color-pallet)
- [User Stories using MOSCOW Prioritization techniques](#user-stories-using-moscow-prioritization-techniques)

#### [Wireframes](#planning)

- Landing Page (Homepage)

Desktop

![Landing_Page_desktop.png](frontend/src/assets/docs/planning/wireframes/Landing_Page_desktop.png)

Mobile

![Landing_Page_mobile.png](frontend/src/assets/docs/planning/wireframes/Landing_Page_mobile.png)

- About Page

Desktop

![About_Page_Desktop.png](frontend/src/assets/docs/planning/wireframes/About_Page_Desktop.png)

Mobile

![About_Page_mobile.png](frontend/src/assets/docs/planning/wireframes/About_Page_mobile.png)

- Admin Dashboard Page: Profiles of the users using the site

Desktop

![Admin_Dashboard_properties_desktop.png](frontend/src/assets/docs/planning/wireframes/Admin_Dashboard_properties_desktop.png)

Mobile

![Admin_Dashboard_property_mobile.png](frontend/src/assets/docs/planning/wireframes/Admin_Dashboard_property_mobile.png)

- Admin Dashboard Page: Displaying of the users

Desktop

![Admin_Dashboard_user_desktop.png](frontend/src/assets/docs/planning/wireframes/Admin_Dashboard_user_desktop.png)

Mobile

![Admin_Dashboard_user_mobile.png](frontend/src/assets/docs/planning/wireframes/Admin_Dashboard_user_mobile.png)

- User Dashboard Page

Desktop

![User_Dashboard_desktop.png](frontend/src/assets/docs/planning/wireframes/User_Dashboard_desktop.png)

Mobile

![User_Dashboard_mobile.png](frontend/src/assets/docs/planning/wireframes/User_Dashboard_mobile.png)

#### [UX/UI Designs on Figma](#planning)

- Landing Page (Homepage)

Desktop

![Landing_Page_Desktop.png](frontend/src/assets/docs/planning/design/Landing_Page_Desktop.png)

Mobile

![Landing_Page_mobile.png](frontend/src/assets/docs/planning/design/Landing_Page_mobile.png)

- About Page

Desktop

![About_Page_desktop.png](frontend/src/assets/docs/planning/design/About_Page_desktop.png)

Mobile

![About_Page_mobile.png](frontend/src/assets/docs/planning/design/About_Page_mobile.png)

- Admin Dashboard Page: Profiles of the users using the site

Desktop

![Admin_Dashboard_property_desktop.png](frontend/src/assets/docs/planning/design/Admin_Dashboard_property_desktop.png)

Mobile

![Admin_Dashboard_property_mobile.png](frontend/src/assets/docs/planning/design/Admin_Dashboard_property_mobile.png)

- Admin Dashboard Page: Displaying of the users

Desktop

![Admin_Dashboard_user_desktop.png](frontend/src/assets/docs/planning/design/Admin_Dashboard_user_desktop.png)

Mobile

![Admin_Dashboard_user_mobile.png](frontend/src/assets/docs/planning/design/Admin_Dashboard_user_mobile.png)

- User Dashboard Page

Desktop

![User_Dashboard_desktop.png](frontend/src/assets/docs/planning/design/User_Dashboard_desktop.png)

Mobile

![User_Dashboard_mobile.png](frontend/src/assets/docs/planning/design/User_Dashboard_mobile.png)

#### [Color pallet](#planning)

![color_pallet.png](frontend/src/assets/docs/planning/color_pallet.png)

#### [ERD diagrams for mapping out my models](#planning)

![model.png](frontend/src/assets/docs/planning/api/model.png)

#### [User Stories using MOSCOW Prioritization techniques](#planning)

##### Description

- This project was designed following the Agile Methodology
- Starting with the completion of the Landing Page
- Once that was completed, then move on to the next section
- Creating this Project feature by feature
- I first started with creating all the issues needed for the Landing Page
- GitHub bot would move that to the backlog and I would move it to Ready
- Then, before I started the cards for the Landing Page, I would create cards for the About Page
- Trying to always have something in the Backlog section of the Kanban board

![kanban.png](frontend/src/assets/docs/planning/milestones/kanban.png)

##### Milestones

Landing Page

- The percentage of milestones completed
- 66% complete
- Open 5
- Ten closed

![landing_page.png](frontend/src/assets/docs/planning/milestones/landing_page.png)

About Page

- The percentage of milestones completed
- 60% complete
- Open 9
- Fourteen closed

![about.png](frontend/src/assets/docs/planning/milestones/about.png)

### [Features](#table-of-content)

Section Index
- [Project Description](#project-description)
- [GitHub Branching Strategy](#github-branching-strategy)
- [Atomic Design Methodology](#atomic-design-methodology)
- [Daphne Implementation for async/await with Django Rest Framework](#features)

#### [Project Description](#features)

- This is a complete CRUD application to help solve the Management of Properties
- During the design and implementation of this Project Agile Methodology was followed
- While using the GitHub Branching Strategy
- I was also able to make full use of the Atomic Design Methodology for the Look and feel of the site
- Async/Await was used for the Server side structure to make it very responsive on the server side

#### [GitHub Branching Strategy](#features)

![github_branch_strategy.png](frontend/src/assets/docs/features/github_branch_strategy.png)

- During the management of this Project, GitHub Branching Strategy was chosen
- GitHub Flow was chosen as it is a simpler alternative to GitFlow
- Where I just have the main branch and all other branches get branched and merged off of main
- The main purpose of this branching strategy was to keep the main branch production ready
- And hence can support Continuous integration (CI) and Continuous Delivery (CD) processes

GitHub Flow Pros and cons

- GitHub Flow focuses on Agile principles and so it is a fast and streamlined branching strategy with short production cycles and frequent releases.
- This strategy also allows for fast feedback loops so that teams can quickly identify issues and resolve them.
- Since there is no development branch as you are testing and automating changes to one branch which allows for quick and continuous deployment.
- This strategy is particularly suited for small teams and web applications, and it is ideal when you need to maintain a single production version.
- Thus, this strategy is not suitable for handling multiple versions of the code.
- Furthermore, the lack of development branches makes this strategy more susceptible to bugs and so can lead to an unstable production code 
- If branches are not properly tested before merging with the release preparation and bug fixes happen in this branch. 
- The main branch, as a result, can become cluttered more easily as it serves as both a production and development branch.
- A further disadvantage is as this model is more suited to small teams and hence, 
- as teams grow, merge conflicts can occur as everyone is merging to the same branch 
- and there is a lack of transparency, meaning developers cannot see what other developers are working on.

#### [Atomic Design Methodology](#features)

![atomic_design.png](frontend/src/assets/docs/features/atomic_design.png)

Description

Atomic design, developed by Brad Frost and Dave Olsen, is a methodology for crafting design systems
with five fundamental building blocks which, when combined, promote consistency, modularity and scalability.

The five building blocks are Atoms, Molecules, Organisms, Templates and Pages

Atoms

Basic building blocks of matter, such as a button, input and a form labeled. They're not useful on their own.

Molecules

Grouping atoms together, such as combining a button, input and form labeled to build functionality.

Organisms

Combining molecules to form organisms that make up a district section of an interface (i.e., navigation bar)

Templates

Consisting mostly of groups of organisms to form a page—where clients can see a final design in place.

Pages

An ecosystem that views different template renders.
We can create multiple ecosystems into a single environment—the application

Description of the design structure in a project setting

- The Atomic structure will be placed in the components directory
- The components directory I define as anything that you can see within the UX/UI design
- There are other components that fall out of the spec of the Atomic Structure
- For example, App.jsx, which sits in the construction directory
- this components' main purpose is to wrap the Layout Template around the hole project
- and to make use of Authentication tokens, and it is for the use of routing between pages

Description of Project structure

- assets directory: used to store all static files like images for this document
- components directory: this is where the atomic design sits
- construction directory: this is where the App.jsx will sit
- context directory: all state store and reduced functions will be stored here
- hooks directory: storing of all custom designed hooks
- styles directory: CSS module files will be placed here
- utils directory: If I need some sort of logic that is going to be used often, used as helper functions
- index.js: The most important file in this project, 
- used for two purposes: 
- use as a wrap for the Provider function with the state store and to attach itself to the HTML file for Rendering App.jsx

- There is a directory that is used outside the scope of the src directory
- called cypress
- this directory is used for the Cypress Testing framework

#### [Daphne Implementation for async/await with Django Rest Framework](#features)

![daphne.png](frontend/src/assets/docs/features/daphne.png)

Use Case of Daphne

- Daphne is an HTTP, HTTP2 and WebSocket protocol server for ASGI and ASGI-HTTP, developed to power Django Channels.
- It supports automatic negotiation of protocols; there’s no need for URL prefixing to determine WebSocket endpoints versus HTTP endpoints.
- This is crucial for applications that require real-time communication, 
- like chat applications, notifications or live updates

Why Daphne?

- Traditional DRF and Django are built on a synchronous request-response model (HTTP).
- However, WebSockets require asynchronous handling to maintain persistent, real-time connections between server and client.
- Daphne is an asynchronous ASGI (Asynchronous Server Gateway Interface) server designed to handle this,
- allowing you to manage WebSockets and other asynchronous protocols.

Why Did I choose Daphne for this Project?

- Python is trying to move more towards asynchronous programming, especially in web frameworks
- This Project is intended to be a long-lived project
- The hoping that the future of this project can provide a chat like system
- Where clients can book for maintenance issues on their properties and receive live updates on what is happening
- Or where maintenance officers need to give live updates to their call centers
- with the use of Daphne, I am hoping that it will improve performance issues within the app
- No more sitting around and waiting for a response

---

### [Deployment](#table-of-content)

Index
- [Setting up locally](#setting-up-locally)
- [Setting up on Heroku](#setting-up-on-heroku)
- [Database manipulation](#database-manipulation)
- [Environment Variables](#environment-variables)

#### [Setting up locally](#deployment)

#### [Setting up on Heroku](#deployment)

#### [Database manipulation](#deployment)

#### [Environment Variables](#deployment)

---

### [Testing](#table-of-content)

#### [Manual Testing](#table-of-content)

- Login Form

| Title                                                      | Pass/Fail |
|------------------------------------------------------------|-----------|
| All Fields required                                        | Pass      |
| Form validation works with React hook form                 | Pass      |
| Click to Register: Register form loads                     | Pass      |
| Click to change password: Change Password form loads       | Pass      |
| Form validation works from server and is displayed on form | Pass      |
| Click on "X" closes the modal                              | Pass      |
| Click on Cancel modal is closed                            | Pass      |
| Modal heading says, "Login Form"                           | Pass      |
| Click on "Login" data gets sent to server                  | Pass      |
| Works on Heroku for live deployment                        | Pass      |

- Register Form

| Title                                                     | Pass/Fail |
|-----------------------------------------------------------|-----------|
| Modal heading says, "Registration Form"                   | Pass      |
| Click Login button: Login form loads                      | Pass      |
| All Fields required validation                            | Pass      |
| Form Validation works in React hook form                  | Pass      |
| Check if password 1 and 2 match                           | Pass      |
| Check for common passwords throw validation error         | Pass      |
| Check if password is numeric throw validation error       | Pass      |
| Check if length of passwords are longer than 8 characters | Pass      |
| Click on "Register" data gets sent to server              | Pass      |
| Click on Cancel modal is closed                           | Pass      |
| Click on "X" modal is closed                              | Pass      |
| Form validation works on server and is displayed on form  | Pass      |
| Works on Heroku for live deployment                       | Pass      |

- Change Password Form

| Title                                                             | Pass/Fail |
|-------------------------------------------------------------------|-----------|
| click Register button: register form Loads                        | Pass      |
| click login button: login form loads                              | Pass      |
| Modal heading says, "Change Password Form"                        | Pass      |
| Click on "X" modal is closed                                      | Pass      |
| Click on Cancel modal is closed                                   | Pass      |
| All Fields required validation                                    | Pass      |
| Check for common password for new_password throw validation error | Pass      |
| Check if password is numeric throw validation error               | Pass      |
| Check new_password is longer than 8 characters                    | Pass      |
| Form validation works in React hook form                          | Pass      |
| Form validation works on server and is displayed on form          | Pass      |
| Works on Heroku for live deployment                               | Pass      |

- Logout Form

| Title                               | Pass/Fail |
|-------------------------------------|-----------|
| Modal header says, "Logout Form"    | Pass      |
| Click on "X" modal is closed        | Pass      |
| Click on Cancel modal is closed     | Pass      |
| Logout message appears on Form      | Pass      |
| Submit button says Logout           | Pass      |
| Token Cookies get deleted on Logout | Pass      |
| Works on Heroku for live deployment | Pass      |

#### [Auto Testing](#table-of-content)

Section Index

- [Testing the API locally](#testing-the-api-locally)
- [Testing React locally with Cypress](#testing-the-api-locally)

##### [Testing the API locally](#auto-testing)

Authentication

- I have only done basic testing for authentication as most of the testing was done manually
- Testing if a user can register
- Testing if a user can log in
- Testing if a user can change password

![auth.png](frontend/src/assets/docs/testing/auto_testing/auth.png)

##### [Testing React locally with Cypress](#auto-testing)

Authentication

- I used Cypress e2e for testing the authentication
- I have created a script in package.json for running cypress

```
npm run test
```

- once you have run that command, a Cypress welcoming screen opens
- select E2E Testing
- then select the browser I selected firefox
- then click start E2E testing
- once it opens, click on the one that says authentication.cy.jsx
- as that I created for authentication testing
- the test will start to run immediately

![starting.png](frontend/src/assets/docs/testing/auto_testing/starting.png)

- once it has finished, you will see ticks next to the tests

![finishing.png](frontend/src/assets/docs/testing/auto_testing/finishing.png)

- I have run the tests 50 times by clicking refresh and it passed everytime

Note: Please do not stop the tests halfway as you will have to delete the testing user from db manual

Note: I have created an endpoint to auto delete the testing user from db after all tests have been completed

- Once the test has finished, you can press ctrl+c to exit the cypress terminal

---

### [Credits](#table-of-content)

- [Code Institute](https://codeinstitute.net/) - Bootcamp
- [Luke Buchanan](https://www.linkedin.com/in/lukebuchanan67/) - Mentor

---