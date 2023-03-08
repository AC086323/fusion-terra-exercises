import { UIComponent } from "MPageFusion";
import IntermediateReference from "./reference/IntermediateReference";
import Intermediate1 from "./Intermediate1";

export default class IntermediateContainer extends UIComponent {
    createChildren() {
        return [
            {
                reference: new IntermediateReference()
            },
            {
                intermediate1: new Intermediate1()
            }
        ];
    }

    view(el, props, children, mapped) {
        return el(
            "div",
            {
                key: "intermediate",
                class: "lnf-Exercise"
            },
            el("hr", {}),
            el(
                "h2",
                { class: "mpageui-u-text-size-lg", style: "font-weight: bold" },
                "Goal"
            ),
            mapped.reference.render(),
            el(
                "h2",
                { class: "mpageui-u-text-size-lg", style: "font-weight: bold" },
                "Attempt"
            ),
            mapped.intermediate1.render()
        );
    }
}
