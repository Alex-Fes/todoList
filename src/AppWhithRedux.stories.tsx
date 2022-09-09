import AppWithRedux from "./AppWhithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = (props : any) => {
    return <>
        <AppWithRedux/>
    </>
}
