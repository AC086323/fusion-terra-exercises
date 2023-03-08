import { UIComponent, atomic } from "MPageFusion";
import classNames from "classnames";

const { button: { Button } } = atomic;
const EVENTS = {
    RED_BUTTON_CLICK: "RED::BUTTON::CLICK",
    GREEN_BUTTON_CLICK: "GREEN::BUTTON::CLICK"
};
const defaultClassName = "Basic-reference-1";

export default class Basics_reference1 extends UIComponent {

    /**
     * @inheritDoc
     */
    initialProps() {
        return {
            isGreenSelected: true
        };
    }

    /**
     * @inheritDoc
     */
    createChildren() {
        return [
            {
                redButton: new Button({
                    display: "Click For Red",
                    clickEventName: EVENTS.RED_BUTTON_CLICK
                })
            },
            {
                greenButton: new Button({
                    display: "Click For Green",
                    clickEventName: EVENTS.GREEN_BUTTON_CLICK
                })
            }
        ]
    }

    /**
     * @inheritDoc
     */
    afterCreate() {
        this.on(EVENTS.GREEN_BUTTON_CLICK, () => {
            this.setProp("isGreenSelected", true).update();
        });

        this.on(EVENTS.RED_BUTTON_CLICK, () => {
            this.setProp("isGreenSelected", false).update();
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
                    [`${defaultClassName}__GreenColor`]: this.getProp("isGreenSelected"),
                    "Basic-reference-1__RedColor": !this.getProp("isGreenSelected")
                })
            },
            this.renderChildren()
        );
    }
}
