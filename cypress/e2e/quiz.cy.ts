describe('Tech Quiz App E2E', () => {
    beforeEach(() => {
      // Visit the app homepage
      cy.visit('http://localhost:3001');
    });
    // ======================================
    // Start quiz and display first question
    // ======================================
    it('starts the quiz and shows a question', () => {
      // Click Start Quiz
      cy.contains('Start Quiz').click();
  
      // Wait for a question to appear
      cy.contains(/What|Which|How|Who|When|Where|Why/).should('exist');
  
      // Check that answer buttons are present
      cy.get('button.btn-primary').should('have.length.greaterThan', 1);
    });
    
    // ======================================
    // Answer one question and move to next
    // ======================================
    it('selects an answer and shows the next question', () => {
      cy.contains('Start Quiz').click();
  
      cy.contains(/What|Which|How|Who|When|Where|Why/).should('exist');
  
      cy.get('button.btn-primary').first().click();
  
      // After clicking, another question should appear
      cy.contains(/What|Which|How|Who|When|Where|Why/).should('exist');
    });
    
    // ======================================
    // Answer all questions and verify score
    // ======================================
    it('completes the quiz and shows the final score', () => {
      cy.visit('http://localhost:3001');
  
      cy.contains('Start Quiz').click();
  
      // Answer all 10 questions
      for (let i = 0; i < 10; i++) {
          cy.contains(/What|Which|How|Who|When|Where|Why/).should('exist');
  
          // Click the first available answer
          cy.get('button.btn-primary').first().click();
      }
  
      // After answering all, score should be displayed
      cy.contains('Your score').should('exist');
      cy.contains('Take New Quiz').should('exist');
    });
  
   // ======================================
   // Start a new quiz after completing one
   // ======================================
  it('starts a new quiz after completing the first one', () => {
    cy.visit('http://localhost:3001');
  
    cy.contains('Start Quiz').click();
  
    for (let i = 0; i < 10; i++) {
        cy.get('button.btn-primary').first().click();
    }
  
    // Click "Take New Quiz"
    cy.contains('Take New Quiz').click();
  
    // Should go back to first question again
    cy.contains(/What|Which|How|Who|When|Where|Why/).should('exist');
    });
  
   // ==============================================
   // Validate score resets when starting a new quiz
   // ==============================================
   it('resets the score when starting a new quiz', () => {
    cy.visit('http://localhost:3001');
    cy.contains('Start Quiz').click();
  
    for (let i = 0; i < 10; i++) {
        cy.get('button.btn-primary').first().click();
    }
  
    // Score is displayed
    cy.contains('Your score').should('exist');
  
    cy.contains('Take New Quiz').click();
  
    // Score should reset — since quiz restarted, there should be no "Your score" message
    cy.contains('Your score').should('not.exist');
    });
  });