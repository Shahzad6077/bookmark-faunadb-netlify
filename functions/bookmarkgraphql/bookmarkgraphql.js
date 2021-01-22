const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb")
require("dotenv").config()
const query = faunadb.query

const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

const typeDefs = gql`
  type Bookmark {
    id: ID
    userId: string!
    title: String!
    link: String!
    ts: String
  }

  type Query {
    getAllBookmarksByUser: [Bookmark]!
  }

  type Mutation {
    createBookmark(title: String!, link: String!): Bookmark!
    deleteBookmark(bookmarId: ID!): Bookmark!
  }
`

const resolvers = {
  Query: {
    getAllBookmarksByUser: async (root, args, context) => {
      try {
        const hasUser = context.context.clientContext.user
        if (!hasUser) {
          return new Error("You're not authorized.")
        }
        const docRefs = query.Paginate(
          query.Match(query.Index("getAllBookmarksByUser"), hasUser.sub)
        )

        let results = await client.query(
          query.Map(docRefs, query.Lambda("ref", query.Get(query.Var("ref"))))
        )
        results = results.data.map(o => ({
          id: o.ref.id,
          ts: `${o.ts}`,
          ...o.data,
        }))

        return results
      } catch (err) {
        return err
      }
    },
  },
  Mutation: {
    createBookmark: async (root, args, context) => {
      try {
        const { title, link } = args
        const hasUser = context.context.clientContext.user
        if (!hasUser) {
          return new Error("You're not authorized.")
        }

        const result = await client.query(
          query.Create("Bookmarks", {
            data: {
              userId: hasUser.sub,
              title,
              link,
            },
          })
        )

        return {
          id: result.ref.id,
          ts: `${result.ts}`,
          ...result.data,
        }
      } catch (err) {
        return err
      }
    },
    deleteBookmark: async (root, { bookmarId }, context) => {
      try {
        const hasUser = context.context.clientContext.user
        if (!hasUser) {
          return new Error("You're not authorized.")
        }

        const docRef = query.Ref(query.Collection("Bookmarks"), bookmarId)
        const result = await client.query(query.Delete(docRef))

        return {
          id: result.ref.id,
          ts: `${result.ts}`,
          ...result.data,
        }
      } catch (err) {
        return err
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context, ...rest }) => {
    return {
      event,
      context,
    }
  },
})

const handler = server.createHandler()

module.exports = { handler }
