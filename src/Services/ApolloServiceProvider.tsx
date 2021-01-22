import React, { FC, useEffect, useState, Fragment } from "react"
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
  ApolloProvider,
} from "@apollo/client"
import { useAuthContext } from "../Context/Auth"

const createClient = (token: string) => {
  const httpLink = new HttpLink({ uri: "/.netlify/functions/todographql" })

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    })

    return forward(operation)
  })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  })

  return client
}
const ApolloServiceProvider: FC = ({ children }) => {
  const [client, setClient] = useState<any>(undefined)
  const { user } = useAuthContext()
  const token = user?.token

  useEffect(() => {
    const client = createClient(token)
    setClient(client)
    console.log(token, "new User logined", client)
  }, [token])

  if (client === undefined) return <Fragment>{children}</Fragment>
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
export default ApolloServiceProvider
