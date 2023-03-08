import { UIComponent } from "MPageFusion";
import Basics_reference1 from "../Reference/Basic_reference1";
import Basic1 from "../Basic1";
import Basics_reference2 from "../Reference/Basic_reference2";
import Basic2 from "../Basic2";

class Basics extends UIComponent {

    createChildren() {
        return [
            {
                reference: new Basics_reference1()
            },
            {
                basic1_sol: new Basic1()
            },
            {
                reference2: new Basics_reference2()
            },
            {
                basic2_sol: new Basic2()
            },
        ]
    }

    view(el, props, children, mapped) {
        return el(
            "div",
            {
                key: "basics",
                class: "lnf-Exercise"
            },
            /* FIRST EXAMPLE */
            el("hr", {}),
            el("h2", { class: "mpageui-u-text-size-lg", style: "font-weight: bold" }, "Goal"),
            el("div",
                { class: "lnf-Container", },
                mapped.reference.render()
            ),
            el("h2", { class: "mpageui-u-text-size-lg", style: "font-weight: bold" }, "Attempt"),
            mapped.basic1_sol.render(),

            /* SECOND EXAMPLE */
            el("hr", {}),
            el("h2", { class: "mpageui-u-text-size-lg", style: "font-weight: bold" }, "Goal"),
            el("div",
                { class: "lnf-Container", },
                mapped.reference2.render()
            ),
            el("h2", { class: "mpageui-u-text-size-lg", style: "font-weight: bold" }, "Attempt"),
            mapped.basic2_sol.render()
        );
    }
}

export default Basics;
