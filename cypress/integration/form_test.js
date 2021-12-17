// describe('Form Submission', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3000/');
//   })

//   it('sanity checks', () => {
//     expect(5).to.equal(5);
//   });

//   const nameInput = () => cy.get('input[name=first_name]');
//   const termsInput = () => cy.get('input[name=terms]');
//   const submitButton = () => cy.get('button[type="submit"]');

//   it('test that you can add text to box', () => {
//     nameInput()
//       .should('exist')
//       .should('have.value', '')
//     termsInput()
//       .should('exist')
//       .should('not.be.checked')
//     submitButton()
//       .should('exist')

//     nameInput()
//       .type('test')
//     termsInput().check()

//     nameInput()
//       .should('have.value', 'test')

//     termsInput()
//       .should('be.checked')
    
//     submitButton()
//       .should('not.be.disabled')

//     submitButton()
//       .click()

//     const nameOutput = () => cy.get('p:first-child')

//     nameOutput()
//       .should('exist')
//       .contains('test')
//   });
// })
