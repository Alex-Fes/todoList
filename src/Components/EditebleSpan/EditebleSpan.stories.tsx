import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}
const onChangeCallback = action("Value Changed")

export const EditableSpanBaseExample = (props : any) => {
    return <>
    <EditableSpan title={'Start Title'}
                  onChange={onChangeCallback}
                  disabled={true}
    />
    </>
}
