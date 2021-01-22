import { gql } from "@apollo/client"

export const ON_CREATE = gql`
  mutation AddBookmark($title: String!, $link: String!) {
    createBookmark(title: $title, link: $link) {
      id
      userId
      title
      link
      ts
    }
  }
`
export const ON_DELETE = gql`
  mutation deleteBookmark($bookmarId: ID!) {
    deleteBookmark(bookmarId: $bookmarId) {
      id
      userId
      title
      link
      ts
    }
  }
`

export const GET_ALL_ITEMS = gql`
  query getAll {
    getAllBookmarksByUser {
      id
      userId
      title
      link
      ts
    }
  }
`
