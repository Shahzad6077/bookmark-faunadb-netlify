import React, { FC, Fragment } from "react"
import { RouteComponentProps, navigate } from "@reach/router"
import { toast } from "react-hot-toast"
type Props = {
  isAuthenticated?: boolean
  Component: FC<any>
} & RouteComponentProps

const PrivateRoute: FC<Props> = ({ Component, isAuthenticated, ...rest }) => {
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    toast.error("Please login to visit dashboard.")
    navigate("/")
    return null
  }
  return <Component {...rest} />
}

export default PrivateRoute
