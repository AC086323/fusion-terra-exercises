import { UIComponent, atomic } from "MPageFusion";
import classNames from "classnames";

const { button: { Button }, selection: { Select } } = atomic;
const EVENTS = {
    SELECTION_CHANGE: "Basic_reference_2::SELECTION::CHANGE",
    BUTTON_CLICK: "Basic_reference_2::BUTTON::CLICK"
};
const defaultClassName = "Basic-reference-2";

export default class Basics_reference2 extends UIComponent {

    /**
     * @inheritDoc
     */
    initialProps() {
        return {
            selectedColor: ""
        };
    }

    /**
     * @inheritDoc
     */
    constructor(children, props) {
        super(children, props);
        this.backgroundColor = "White";
    }

    /**
     * @inheritDoc
     */
    createChildren() {
        return [

            {
                select: new Select({
                    items: [
                        {
                            display: "Red",
                            id: "Red"
                        },
                        {
                            display: "Green",
                            id: "Green"
                        },
                        {
                            display: "Blue",
                            id: "Blue"
                        },
                        {
                            display: "Orange",
                            id: "Orange"
                        }
                    ],
                    placeholder: "Select an Option to change button text",
                    selectionChangeEventName: EVENTS.SELECTION_CHANGE,
                    classNames: "width50"
                })
            },
            {
                button: new Button({
                    display: "Click for background color change",
                    clickEventName: EVENTS.BUTTON_CLICK
                })
            }
        ]
    }

    /**
     * @inheritDoc
     */
    afterCreate() {
        this.on(EVENTS.SELECTION_CHANGE, (val, selectedValue) => {
            this.setProp("selectedColor", selectedValue || "White");
            this.getChild("button").setProp("display", selectedValue || "Select a color").update();
        });

        this.on(EVENTS.BUTTON_CLICK, () => {
            this.backgroundColor = this.getProp("selectedColor");
            this.update();
        });
    }

    /**
     * @inheritDoc
     */
    view(el, props, children, mChildren) {
        return el("div",
            {
                class: classNames({
                    [`${defaultClassName}`]: true,
                    [`${defaultClassName}--${this.backgroundColor}`] : true
                })
            },
            this.renderChildren()
        );
    }
}
