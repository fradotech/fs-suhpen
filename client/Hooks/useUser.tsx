import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Route } from '../Enums/Route'
import { authAction } from '../Modules/Iam/Auth/auth.action'

const useUser = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    !authAction.loggedUser() && navigate(Route.Login)
    authAction.loggedUser() && navigate(window.location.pathname)
  }, [])

  return { user: authAction.loggedUser() }
}

export default useUser
