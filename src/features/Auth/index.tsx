import { asyncActions, slice } from './auth-reduser'
import { Login } from './Login'
import * as authSelectors from './selectors'

const authActions = {
  ...asyncActions,
  ...slice.actions,
}

const authReducer = slice.reducer

export { authSelectors, Login, authActions, authReducer }
