import { useMemo } from 'react'

import { ActionCreatorsMapObject, bindActionCreators } from 'redux'

import { useAppDispatch } from '../app/hooks/hooks'

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
  const dispatch = useAppDispatch()

  return useMemo(() => {
    return bindActionCreators(actions, dispatch)
  }, [])
}
