import {AddItemForm} from "../Components/AddItemForm";
import {action} from "@storybook/addon-actions";
import {EditebleSpan} from "../Components/EditebleSpan";

export default {
    title: 'EditableSpan Component',
    component: EditebleSpan
}
const onChangeCallback = action("Value Changed")

export const EditableSpanBaseExample = (props : any) => {
    return <>
    <EditebleSpan title={'Start Title'} onChange={onChangeCallback}/>
    </>
}
