describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('Login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('123')
      cy.get('#login').click()

      cy.contains('Test User has logged in.')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login').click()

      cy.get('#error').contains('Wrong username or password')
    })
  })

  describe('When logged in', function(){
    beforeEach(function() {
      cy.login({ username: 'testuser', password: '123' })
    })
    it('A blog can be created', function() {
      cy.get('#newBlog').click()
      cy.get('#title').type('Test user is creating a new blog.')
      cy.get('#author').type('Test User')
      cy.get('#url').type('www.addingblog.com')

      cy.get('#submit').click()

      cy.contains('Test user is creating a new blog.')
    })
    it('A blog can be liked', function(){
      cy.createBlog({
        title: 'Liking blog is working?',
        author: 'Who Knows',
        url: 'www.liking247.com'
      })
      cy.get('#viewButton').click()
      cy.contains('Like').click()

      cy.contains('The blog has been liked!')
      cy.contains('1')
    })
    it('A blog can be deleted', function() {
      cy.createBlog({
        title: 'Is the delete gonna work?',
        author: 'Delete Master',
        url: 'www.deletingalldaylong.com'
      })
      cy.contains('Delete Master')

      cy.get('#viewButton').click()

      cy.contains('Is the delete gonna work?')
      cy.contains('www.deletingalldaylong.com')
      cy.contains('Test User')

      cy.get('#deleteButton').click()

      cy.contains('has been deleted.')
      cy.get('html').should('not.contain', 'Like')
      cy.get('html').should('not.contain', 'View')
    })
    it.only('Blogs are sorted by Likes', function() {
      cy.createBlog({
        title: 'Liking blog is working?',
        author: 'Who Knows',
        url: 'www.liking247.com'
      })
      cy.createBlog({
        title: 'Is the delete gonna work?',
        author: 'Delete Master',
        url: 'www.deletingalldaylong.com'
      })
      //First blog is without likes
      cy.contains('Who Knows').contains('View').click()
      cy.contains('Likes 0')
      cy.contains('Hide').click()

      //Second blog is without likes aswell
      cy.contains('Delete Master').contains('View').click()
      cy.contains('Likes 0')

      //Second blog has been liked
      cy.contains('Like').click()
      cy.contains('The blog has been liked!')
      cy.contains('Hide').click()

      //Second blog should be on top of the first blog
      cy.contains('View').click()
      cy.contains('Likes 1')

      //First blog should be on top of second blog
      cy.contains('View').click()
      cy.contains('Likes 0').contains('Like').click().click()

    })
  })
})