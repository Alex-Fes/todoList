import {AddItemForm} from "../Components/AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm Component',
    component: AddItemForm
}
const callback = action("Button 'ADD' was pressed inside the form")

export const AddItemFormBaseExample = (props : any) => {
    return <AddItemForm addItem={callback}/>
}
