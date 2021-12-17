describe('MVP tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/pizza');
  })

  it('sanity checks', () => {
    expect(5).to.equal(5);
    expect(1 + 2).to.equal(3);
    expect({}).not.to.equal({});
    expect({}).to.eql({});
  });

  const nameInput = () => cy.get('input[name=name]');
  const sizeInput = () => cy.get('select[name=size]');
  const pepperoni = () => cy.get('input[name=pepperoni]');
  const sausage = () => cy.get('input[name=sausage]');
  const bacon = () => cy.get('input[name=bacon]');
  const anchovies = () => cy.get('input[name=anchovies]');
  const submitButton = () => cy.get('button[type="submit"]');

  it('the proper elements exist', () => {
    nameInput().should('exist');
    sizeInput().should('exist');
    pepperoni().should('exist');
    sausage().should('exist');
    bacon().should('exist');
    anchovies().should('exist');
    submitButton().should('exist');
  });

  it('test that you can add text to name box', () => {
    nameInput()
      .type('Sauron')
      .should('have.value', 'Sauron');
  });

  it('test that you can select multiple toppings', () => {
    pepperoni()
      .check();
    sausage()
      .check();
    bacon()
      .check();
    anchovies()
      .check();
  });

  it('test that you can submit the form', () => {
    nameInput()
      .type('Sauron');
    sizeInput()
      .select('Gargantuan');
    submitButton()
      .should('not.be.disabled')
      .click();
  });
})
