const client = "http://localhost:3000";
const server = "http://localhost:8000";

// Registration
describe("Registration", () => {
  beforeEach(() => {
    // Ensure Cypress visits the client URL before interacting with elements
    cy.visit(`${client}`); // Navigate to the current page

    // Confirm the page is fully loaded before checking elements
    cy.get("body").should("contain", "Login"); // Makes sure that page is loaded
  });

  it("Should successfully register a user", () => {
    const username = "testing";
    const password1 = "IAMininGLOrN";
    const password2 = "IAMininGLOrN";

    // Intercept the register API request
    cy.intercept("POST", `${server}/auth/registration/`).as("registerRequest");

    // Trigger the register flow
    cy.get(".btn").contains("Login").click();

    // check if the modal is visible
    cy.get(".modal").should("be.visible");

    // Check if the Register button is present
    cy.get(".btn").contains("Click here to Register?").click();

    // Fill in a registration form
    cy.get(".modal").within(() => {
      cy.get("input[name='username']").type(username);
      cy.get("input[name='password1']").type(password1);
      cy.get("input[name='password2']").type(password2);
      cy.get("button[type='submit']")
        .contains("Register")
        .click({ force: true });
    });

    // wait for the registration request and assert the response
    cy.wait("@registerRequest").then((interception) => {
      // check if the request was successful
      expect(interception.response.statusCode).to.equal(201);

      // Optionally, check if the response contains the expected data
      const { access, refresh } = interception.response.body;
      expect(access).to.exist;
      expect(refresh).to.exist;

      // check if the Logout button appears, meaning the user is logged in
      cy.get(".btn").contains("Logout").should("be.visible");
    });
  });
});

// Login
describe("Login", () => {
  beforeEach(() => {
    // Ensure Cypress visits the client URL before interacting with elements
    cy.visit(`${client}`); // Navigate to the current page

    // Confirm the page is fully loaded before checking elements
    cy.get("body").should("contain", "Login"); // Makes sure that page is loaded
  });

  it("Should successfully log in a user", () => {
    const username = "testing";
    const password = "IAMininGLOrN";

    // Intercept the login API request
    cy.intercept("POST", `${server}/auth/login/`).as("loginRequest");

    // Trigger the login flow
    cy.get(".btn").contains("Login").click();

    // check if the modal is visible
    cy.get(".modal").should("be.visible");

    // Fill in the login form
    cy.get(".modal").within(() => {
      cy.get("input[name='username']").type(username);
      cy.get("input[name='password']").type(password);
      cy.get("button[type='submit']").contains("Login").click({ force: true });
    });

    // wait for the login request and assert the response
    cy.wait("@loginRequest").then((interception) => {
      // Check if the request was successful
      expect(interception.response.statusCode).to.equal(200);

      // Optionally, check if the response contains the expected data
      const { access, refresh } = interception.response.body;
      expect(access).to.exist;
      expect(refresh).to.exist;

      // Check if the Logout button appears, meaning the user is logged in
      cy.get(".btn").contains("Logout").should("be.visible");
    });
  });
});

// Logout
describe("Logout", () => {
  beforeEach(() => {
    // Ensure Cypress visits the client URL before interacting with elements
    cy.visit(`${client}`); // Navigate to the current page

    // Confirm the page is fully loaded before checking elements
    cy.get("body").should("contain", "Login"); // Makes sure that page is loaded
  });

  it("Should successfully log out a user", () => {
    const username = "testing";
    const password = "IAMininGLOrN";

    // Intercept the login API request
    cy.intercept("POST", `${server}/auth/login/`).as("loginRequest");

    // Trigger the login flow
    cy.get(".btn").contains("Login").click();

    // check if the modal is visible
    cy.get(".modal").should("be.visible");

    // Fill in the login form
    cy.get(".modal").within(() => {
      cy.get("input[name='username']").type(username);
      cy.get("input[name='password']").type(password);
      cy.get("button[type='submit']").contains("Login").click({ force: true });
    });

    // wait for the login request and assert the response
    cy.wait("@loginRequest").then((interception) => {
      // Check if the request was successful
      expect(interception.response.statusCode).to.equal(200);

      // Optionally, check if the response contains the expected data
      const { access, refresh } = interception.response.body;
      expect(access).to.exist;
      expect(refresh).to.exist;

      // Check if the Logout button appears, meaning the user is logged in
      cy.get(".btn").contains("Logout").should("be.visible");

      // Logout user
      cy.intercept("POST", `${server}/auth/logout/`).as("logoutRequest");

      // Trigger to Logout
      cy.get(".btn").contains("Logout").click({ force: true });

      // check if the modal is visible
      cy.get(".modal").should("be.visible");

      cy.get(".modal").within(() => {
        cy.get("button[type='submit']")
          .contains("Logout")
          .click({ force: true });
      });

      cy.wait("@logoutRequest").then((interception) => {
        expect(interception.response.statusCode).to.equal(200);

        const { detail } = interception.response.body;
        expect(detail).to.exist;
      });
    });
  });
});

// Change Password
describe("Change Password", () => {
  beforeEach(() => {
    // Ensure Cypress visits the client URL before interacting with elements
    cy.visit(`${client}`); // Navigate to the current page

    // Confirm the page is fully loaded before checking elements
    cy.get("body").should("contain", "Login"); // Makes sure that page is loaded
  });

  it("Should successfully change a users password", () => {
    const username = "testing";
    const old_password = "IAMininGLOrN";
    const new_password = "MininGLOrN";

    // Intercept the Change Password API request
    cy.intercept("POST", `${server}/auth/change_password/`).as(
      "changePasswordRequest",
    );

    // Trigger the change password flow
    cy.get(".btn").contains("Login").click({ force: true });

    // Trigger it the modal is visible
    cy.get(".modal").should("be.visible");

    // Check if the Change Password button is present
    cy.get(".btn").contains("Change Password Here?").click({ force: true });

    // Fill the Change Password Form
    cy.get(".modal").within(() => {
      cy.get("input[name='username']").type(username);
      cy.get("input[name='old_password']").type(old_password);
      cy.get("input[name='new_password']").type(new_password);
      cy.get("button[type='submit']")
        .contains("Change Password")
        .click({ force: true });
    });

    // Optionally, check if the response contains the expected data
    cy.wait("@changePasswordRequest").then((interception) => {
      // check if the request was successful
      expect(interception.response.statusCode).to.equal(200);

      // Optionally, check if the response contains the expected data
      const { message, status } = interception.response.body;
      expect(message).to.exist;
      expect(status).to.exist;

      // Optionally, check if the response contains the expected data
      cy.get(".btn").contains("Change Password").click({ force: true });
    });
  });
});
