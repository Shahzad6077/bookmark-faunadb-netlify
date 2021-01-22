import React, { FC, useEffect } from "react"
import { SEO } from "../Components"
import { Link } from "gatsby"
type Props = {}

const Index: FC<Props> = () => {
  return (
    <div>
      <SEO title="Home" />
      Bookmarking appp
      <Link to="/app">Go to Dashboard</Link>
    </div>
  )
}

export default Index
