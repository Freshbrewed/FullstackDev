const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')


const MONGODB_URI = 'mongodb+srv://fullstack:fullstack20@cluster0-zeazc.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connection to MongoDB:', error.message)
  })

  const JWT_SECRET = 'REALLY_SECRET_KEY_ID_NO_ONE_KNOWS_ABOUT'


const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book

    addAuthor(
      name: String!
      born: Int
    ) : Author

    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log('Given arguments: ', args)
      const author = await Author.findOne({ name: args.author})
      if (!args.author && !args.genre) return await Book.find({}).populate("author")
      if (args.author && !args.genre) return await Book.find({ author: author }).populate("author")
      if (!args.author && args.genre) return await Book.find({ genres: args.genre }).populate("author")
      if (args.author && args.genre) return await Book.find({ author: author, genres: args.genre }).populate("author")
      return await Book.find({})
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      const books = await Book.find({author: author})
      let count = 0
      books.forEach(() => {
        count += 1

      })
      console.log(`Found ${count} books written by ${root.name}`)
      return count
    }
  },
  Book: {
    author: (root) => {
      return {
        name: root.author.name,
        id: root.author.id,
        born: root.author.born,
        bookCount: root.author.bookCount
      }
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log("Received arguments", args)
      const currentUser = context.currentUser
    if (!currentUser) {
      console.log('Authentication Error')
      throw new AuthenticationError("not authenticated")
    }
      const author = await Author.findOne({ name: args.author })
      if (author) {
        const book = new Book({ ...args, author: author })
        console.log(`Creating a new book with an existing author: ${book} `)
        try {
           await book.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args.title,
          })    
      }
      return book
    }
      const newAuthor = new Author({ name: args.author, born: null})
      const book = new Book({ ...args, author: newAuthor })
      console.log(`Creating a new book with a new author:${newAuthor}, ${book} `)
      try {
        await newAuthor.save()
        await book.save()
     }
     catch (error) {
       throw new UserInputError(error.message, {
         invalidArgs: args.title,
       })    
   }
   return book
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        await author.save()
     }
     catch (error) {
       throw new UserInputError(error.message, {
         invalidArgs: args,
       })    
   }
      return author
    },
    editAuthor: async (root, args, context) => {
      console.log('editAuthor', args)
      const currentUser = context.currentUser
      if (!currentUser) {
        console.log('Authentication Error')
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      if (author) {
        author.born = args.setBornTo
        try {
          await author.save()
       }
       catch (error) {
         throw new UserInputError(error.message, {
           invalidArgs: args,
         })    
     }
        return author
      }
      return null
    },
  createUser: (root, args) => {
    console.log('createUser', args)
    const user = new User({ ...args })
    return user.save()
      .catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
  },
  login: async (root, args) => {
    const user = await User.findOne({ username: args.username })

    if ( !user || args.password !== 'secret' ) {
      throw new UserInputError("wrong credentials")
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }
    console.log(`Logged user is ${user.username}.`)
    return { value: jwt.sign(userForToken, JWT_SECRET) }
  },
}}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})