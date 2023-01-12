import { ReduxStoreProviderDecorator } from '../stories/ReduxStoreProviderDecorator'

import App from './App'

export default {
  title: 'AppWithRedux Component',
  component: App,
  decorators: [ReduxStoreProviderDecorator],
}

export const AppWithReduxBaseExample = () => {
  return (
    <>
      <App />
    </>
  )
}
