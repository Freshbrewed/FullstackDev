const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const { v1: uuid } = require('uuid')

const MONGODB_URI = 'mongodb+srv://fullstack:fullstack20@cluster0-zeazc.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connection to MongoDB:', error.message)
  })



const typeDefs = gql`
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
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log('Given arguments: ', args)
      const author = await Author.findOne({ name: args.author})
      if (!args.author && !args.genre) return await Book.find({})
      if (args.author && !args.genre) return await Book.find({ author: author })
      if (!args.author && args.genre) return await Book.find({ genres: args.genre })
      if (args.author && args.genre) return await Book.find({ author: author, genres: args.genre })
      return await Book.find({})
    },
    allAuthors: () => Author.find({})
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
  Mutation: {
    addBook: async (root, args) => {
      console.log("Received arguments", args)
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
    editAuthor: async (root, args) => {
      console.log(args)
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
    }
  }
  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})