import React, { FC, Fragment } from "react"

import { Router, RouteComponentProps } from "@reach/router"
import { useAuthContext } from "../Context/Auth"
import { PrivateRoute } from "./../Utils"
import { BookmarkComp, SEO } from "../Components"

let Home = (props: RouteComponentProps) => {
  const { user, isAuthenticated } = useAuthContext()
  if (!isAuthenticated) {
    return (
      <div>
        <h4>Please login to go into dashboard</h4>
      </div>
    )
  }
  return (
    <div>
      <h4>Welcome {user.full_name}</h4>
      <BookmarkComp />
    </div>
  )
}
let Dash = (props: RouteComponentProps) => <div>Dash</div>
const DashboardApp: FC = () => {
  const { isAuthenticated } = useAuthContext()
  return (
    <Fragment>
      <SEO title="Dashboard" />
      <Router basepath="/app">
        <Home path="/" />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/dashboard"
          Component={Dash}
        />
      </Router>
    </Fragment>
  )
}
export default DashboardApp
