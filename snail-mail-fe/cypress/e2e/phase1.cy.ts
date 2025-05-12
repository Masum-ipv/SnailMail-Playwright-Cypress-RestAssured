/// <reference types="cypress" />

describe("Inbox Component Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); // Visit the application before each test
    cy.get("#username").type("username"); // Type username
    cy.get("#password").type("password"); // Type password
    cy.get(".btn").click(); // Click the login button
  });

  it("01. Check compose component opens after clicking the compose button", () => {
    cy.get(".btn-sm").click();
    cy.get('[data-testid="compose-component"]').should("be.visible");
  });

  it("02. Check compose component closes after clicking the close button", () => {
    cy.get(".btn-sm").click();
    cy.get(".btn-close").click();
    cy.get('[data-testid="compose-component"]').should("not.exist");
  });

  it("03. Check alert message when mendatory fields are not filled", () => {
    cy.contains("Compose Email").click();
    cy.contains("Send").click();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Subject cannot be empty");
    });
  });

  it("04. Alert message pop up when email fetch fails", () => {
    cy.intercept("GET", "/mail", { forceNetworkError: true });
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal(
        "There was a problem when fetching your inbox! Please try again later"
      );
    });
  });

  it("05. Check success message when email is sent successfully", () => {
    cy.get(".btn-sm").click();
    cy.get('[data-testid="compose-component"]').should("be.visible");
    cy.get("input[name='recipient']").type("beetle@snailmail.com");
    cy.get("input[name='subject']").type("I am a beetle");
    cy.get("textarea[name='body']").type("*beetle noises*");
    cy.get(".btn-sm").click();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Sent Mail to: beetle@snailmail.com");
    });
  });

  it("06. Check error arert if valid email is not provided", () => {
    cy.get(".btn-sm").click();
    cy.get('[data-testid="compose-component"]').should("be.visible");
    cy.get("input[name='recipient']").type("beetle");
    cy.get("input[name='subject']").type("I am a beetle");
    cy.get("textarea[name='body']").type("*beetle noises*");
    cy.get(".btn-sm").click();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal(
        "Recipient doesn't appear to be a valid email address"
      );
    });
  });

  it("07. Check user can't input more than 20 characters in subject field", () => {
    cy.get(".btn-sm").click();
    cy.get('[data-testid="compose-component"]').should("be.visible");
    cy.get("input[name='subject']").type(
      "Hey This is a very long subject line"
    );
    cy.get("input[name='subject']").should(
      "have.value",
      "Hey This is a very l"
    );
  });
});
