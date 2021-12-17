describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })
  it('front page can be opened', () => {
    cy.contains('h2', 'Hello guest')
  })


  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('button', 'Log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('#login-button', 'login').click()
      cy.contains('Hello Matti Luukkainen')
      cy.get('.notyf__toast--success').contains('Logged in successfully')
    })
    it('fails with wrong credentials', () => {
      cy.contains('button', 'Log in').click()
      cy.get('#username').type('mluukkai2')
      cy.get('#password').type('salainen2')
      cy.contains('#login-button', 'login').click()
      cy.get('.notyf__toast--error').contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('button', 'Log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('#login-button', 'login').click()
    })

    it('A blog can be created', function () {
      cy.contains('button', 'Create new blog').click()
      cy.get('#title').type('title test')
      cy.get('#author').type('author test')
      cy.get('#url').type('url test')
      cy.get('#add-blog-btn').click()
      cy.contains('title test author test')
    })
  })

  describe('When logged in and added a blog', function () {
    beforeEach(function () {
      cy.contains('button', 'Log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('#login-button', 'login').click()

      cy.contains('button', 'Create new blog').click()
      cy.get('#title').type('title test')
      cy.get('#author').type('author test')
      cy.get('#url').type('url test')
      cy.get('#add-blog-btn').click()
    })

    it('Check if user can like', function () {
      cy.contains('button', 'Show more').click()
      cy.contains('button', 'Like').click()
      cy.get('.blog-likes').should('contain', '1')
    })
  })

  describe('When logged in and added a blog', function () {
    beforeEach(function () {
      cy.contains('button', 'Log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('#login-button', 'login').click()

      cy.contains('button', 'Create new blog').click()
      cy.get('#title').type('title test')
      cy.get('#author').type('author test')
      cy.get('#url').type('url test')
      cy.get('#add-blog-btn').click()

      cy.contains('button', 'Show more').click()
    })

    it('Check if user can delete a blog', () => {
      cy.contains('button', 'Delete').click()
      cy.contains('Deleted blog successfully')
    })
  })

  describe('When logged in and added 3 blogs and liked each differently', () => {
    beforeEach(function () {
      cy.contains('button', 'Log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('#login-button', 'login').click()

      cy.contains('button', 'Create new blog').click()
      for (let i = 1; i <= 3; i++) {
        cy.get('#title').type('title test' + i)
        cy.get('#author').type('author test' + i)
        cy.get('#url').type('url test' + i)
        cy.get('#add-blog-btn').click()

        cy.get(`.blog${i - 1}`).contains('Show more').click()
        for (let j = 0; j < i; j++) {
          cy.get(`.blog${i - 1}`).contains('button', 'Like').click()
        }
      }
    })

    it('Blogs are ordered desc according to likes', function () {
      cy.reload()

      for (let i = 1; i <= 3; i++) {
        cy.get(`.blog${i - 1}`).contains('Show more').click()
      }

      cy.get('.blogs-div').first().get('.blog-likes').contains('3')
      cy.get('.blogs-div').last().get('.blog-likes').contains('1')

    })
  })

})