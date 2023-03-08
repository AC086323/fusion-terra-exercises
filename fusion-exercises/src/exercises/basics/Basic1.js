import { UIComponent, atomic } from "MPageFusion";
import classNames from "classnames";

const {
    button: { Button },
} = atomic;
const EVENT = {
    RED_CLICK: "RED::CLICK",
    GREEN_CLICK: "GREEN_CLICK",
};

const defaultClassName = "basic1";

/**
 * This task will be completed when you click on button the background of the div should change
 */

// TODO Need to create two buttons as children
// TODO Need to write event listeners for button to handle button click events
// TODO Need to render two buttons

export default class Basic1 extends UIComponent {
    initialProps() {
        return {
            redSelected: false,
            greenSelected: true,
        };
    }

    createChildren() {
        return [
            {
                redButton: new Button({
                    display: "Click for red",
                    clickEventName: EVENT.RED_CLICK,
                }),
            },
            {
                greenButton: new Button({
                    display: "Click for green",
                    clickEventName: EVENT.GREEN_CLICK,
                }),
            },
        ];
    }

    afterCreate() {
        this.on(EVENT.GREEN_CLICK, () => {
            this.setProp("redSelected", false).update();
            this.setProp("greenSelected", true).update();
        });

        this.on(EVENT.RED_CLICK,()=>{
            this.setProp("redSelected",true).update();
            this.setProp("greenSelected",false).update();
        });
    }

    /**
     * @inheritDoc
     */
    view(el, props, children, mChildren) {
        return el(
            "div",
            {
                // We use classNames refer this https://github.com/JedWatson/classnames
                class: classNames({
                    [`${defaultClassName}`]: true,
                    [`${defaultClassName}_green`]: this.getProp("greenSelected"),
                    [`${defaultClassName}_red`]: this.getProp("redSelected")
                }),
            }, this.renderChildren()
        );
    }
}
