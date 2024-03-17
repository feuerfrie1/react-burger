describe("should test constructor", () => {
  it("should test ingredient card", () => {
    cy.prepare("1@1.com", "123");
    const ingredientId = "643d69a5c3f7b9001cfa093c";
    cy.get(`[data-test-ingredient=${ingredientId}]`).click();
    cy.get("[data-test-modal=open]").should("exist");
    cy.get("[data-test-modal=close]").click();
  });

  const DROP_BUN = "[data-test-drop=bun]";
  const DROP_FILLING = "[data-test-drop=filling]";

  it("should test drag & drop", () => {
    cy.prepare("1@1.com", "123");
    const bunId = "643d69a5c3f7b9001cfa093c";
    const mainId = "643d69a5c3f7b9001cfa0941";
    const sauceId = "643d69a5c3f7b9001cfa0942";
    cy.get("[data-test-tab='buns']").click();
    cy.get(`[data-test-ingredient=${bunId}]`).drag(DROP_BUN);
    cy.get(`[data-test-bun-id=${bunId}]`).should("exist");
    cy.get("[data-test-tab='main']").click();
    cy.get(`[data-test-ingredient=${mainId}]`).drag(DROP_FILLING);
    cy.get(`[data-test-filling-id=${mainId}]`).should("exist");
    cy.get("[data-test-tab='sauces']").click();
    cy.get(`[data-test-ingredient=${sauceId}]`).drag(DROP_FILLING).first();
    cy.get(`[data-test-filling-id=${sauceId}]`).should("exist");
  });

  it("should test makeOrder", () => {
    cy.intercept("POST", "api/orders", { fixture: "makeOrder.json" }).as(
      "makeOrder"
    );
    cy.prepare("1@1.com", "123");
    const bunId = "643d69a5c3f7b9001cfa093c";
    const mainId = "643d69a5c3f7b9001cfa0941";
    const sauceId = "643d69a5c3f7b9001cfa0942";
    cy.get("[data-test-tab='buns']").click();
    cy.get(`[data-test-ingredient=${bunId}]`).drag(DROP_BUN);
    cy.get(`[data-test-bun-id=${bunId}]`).should("exist");
    cy.get("[data-test-tab='main']").click();
    cy.get(`[data-test-ingredient=${mainId}]`).drag(DROP_FILLING);
    cy.get(`[data-test-filling-id=${mainId}]`).should("exist");
    cy.get("[data-test-tab='sauces']").click();
    cy.get(`[data-test-ingredient=${sauceId}]`)
      .drag(DROP_FILLING)
      .first();
    cy.get(`[data-test-filling-id=${sauceId}]`).should("exist");
    cy.get("[data-testid=orderButton]").click();
    cy.get("[data-test-order-number=36128]").should("exist");
    cy.get("[data-test-modal=close]").click();
  });
});
