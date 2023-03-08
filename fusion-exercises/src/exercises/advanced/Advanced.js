import { UIComponent } from "MPageFusion";

class Advanced extends UIComponent {
    view(el, props, children, mapped) {
        return el(
            "div",
            {
                key: "advanced",
                class: "lnf-Exercise"
            },
            /* FIRST EXAMPLE */
            el("hr", {}),
            el("h2", { class: "mpageui-u-text-size-lg" }, "Goal"),
            el("div", {class: "temporaryClass"}, "Work in progress!!"),

            el("h2", { class: "mpageui-u-text-size-lg" }, "Attempt")
        );
    }
}

export default Advanced;
