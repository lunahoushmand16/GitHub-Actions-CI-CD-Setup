/// <reference types="cypress" />
import Quiz from '../../client/src/components/Quiz';
import { mount } from 'cypress/react18';

describe('Quiz Component', () => {
      beforeEach(() => {
          cy.fixture('questions.json').then((questions) => {
            // Stub the API request for starting the quiz
            // Waits for the component to call /api/questions/random
            cy.intercept('GET', '/api/questions/random', {
              statusCode: 200,
              body: questions
            }).as('getQuestions');
          });
    });

  it('should start the quiz and display the first question', () => {
    // cy.mount(<Quiz />);
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty');
  });

  it('should answer questions and complete the quiz', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();

    // Answer questions
    cy.get('button').contains('1').click();

    // Verify the quiz completion
    cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
  });

  it('should restart the quiz after completion', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();

    // Answer questions
    cy.get('button').contains('1').click();

    // Restart the quiz
    cy.get('button').contains('Take New Quiz').click();

    // Verify the quiz is restarted
    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty');
  });
});
