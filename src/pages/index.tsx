import React, { FC } from "react"
import { SEO } from "../Components"
import { Link } from "gatsby"
type Props = {}

const Index: FC<Props> = () => {
  return (
    <div>
      <SEO title="Home" />
      <Link to="/app" style={{ borderBottom: "1px solid" }}>
        Go to Dashboard
      </Link>
    </div>
  )
}

export default Index
