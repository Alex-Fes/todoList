import { RequestStatusType as T1, slice, asyncActions } from './application-reducer'
import * as appSelectors from './selectors'

const appReducer = slice.reducer
const actions = slice.actions

const appActions = {
  ...actions,
  ...asyncActions,
}

export type RequestStatusType = T1

export { appSelectors, appReducer, appActions }
