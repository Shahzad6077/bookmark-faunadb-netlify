import { useApolloClient } from "@apollo/client"
import { Link } from "gatsby"
import React, { FC, Fragment } from "react"

import { useAuthContext } from "./../Context/Auth"
interface HeaderProps {
  siteTitle: string
}

const Header: FC<HeaderProps> = ({ siteTitle }) => {
  const { isAuthenticated, onLogout, onLogin, onSignup } = useAuthContext()
  // const client = useApolloClient()
  const client = null
  return (
    <header
      style={{
        background: `var(--purple)`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: "var(--maxWidth)",
          padding: `1.45rem 1.0875rem`,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <ul>
          {isAuthenticated ? (
            <button
              className="primary-btn"
              onClick={() => {
                onLogout()
                client && client.resetStore()
              }}
            >
              Logout
            </button>
          ) : (
            <Fragment>
              <button className="primary-btn" onClick={onLogin}>
                Login
              </button>
              <button className="primary-btn" onClick={onSignup}>
                Signup
              </button>
            </Fragment>
          )}
        </ul>
      </div>
    </header>
  )
}
Header.defaultProps = {
  siteTitle: ``,
}

export default Header
