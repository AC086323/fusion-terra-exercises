import { UIComponent, composite, atomic } from "MPageFusion";
import classNames from "classnames";

const {
    button: { CollapseGroup },
    banner: { BannerItem, BannerManager }
} = composite;
const {
    button: { Button },
    selection: { Checkbox }
} = atomic;

const TYPES = CollapseGroup.TYPES;
const NAMESPACE = "Intermediate";
const EXERCISE_CLASS = "reference1";

const EVENTS = {
    ADD_BUTTON: "COLLAPSE_GROUP::ADD_BUTTON",
    REMOVE_BUTTON: "COLLAPSE_GROUP::REMOVE_BUTTON",
    ADD_CHECKBOX: "COLLAPSE_GROUP::ADD_CHECKBOX",
    REMOVE_CHECKBOX: "COLLAPSE_GROUP::REMOVE_CHECKBOX"
};

const renderItems = items => items.map(item => item.render());
let bannerItemCount = 0;

class IntermediateReference extends UIComponent {
    initialProps() {
        return {
            buttons: [],
            checkboxes: []
        };
    }

    createChildren() {
        return [
            {
                bannerManager: new BannerManager()
            },
            {
                checkboxGroup: new CollapseGroup({
                    items: [
                        {
                            id: "addCheckbox",
                            type: TYPES.ACTION,
                            display: "Add Checkbox",
                            eventName: EVENTS.ADD_CHECKBOX
                        },
                        {
                            id: "removeCheckbox",
                            type: TYPES.ACTION,
                            display: "Remove Checkbox",
                            eventName: EVENTS.REMOVE_CHECKBOX
                        }
                    ]
                })
            },
            {
                buttonGroup: new CollapseGroup({
                    items: [
                        {
                            id: "addButton",
                            type: TYPES.ACTION,
                            display: "Add Button",
                            eventName: EVENTS.ADD_BUTTON
                        },
                        {
                            id: "removeButton",
                            type: TYPES.ACTION,
                            display: "Remove Button",
                            eventName: EVENTS.REMOVE_BUTTON
                        }
                    ]
                })
            }
        ];
    }

    afterCreate() {
        this.on(EVENTS.ADD_BUTTON, () => {
            const buttons = this.getProp("buttons");
            this.setProp("buttons", [
                ...buttons,
                new Button({
                    display: `Button ${buttons.length + 1}`
                })
            ]).update();
        });

        this.on(EVENTS.REMOVE_BUTTON, () => {
            const buttons = this.getProp("buttons");
            if (buttons.length) {
                this.setProp(
                    "buttons",
                    buttons.slice(0, buttons.length - 1)
                ).update();
            } else {
                const bannerManager = this.getChild("bannerManager");
                bannerManager
                    .setProp("items", [
                        ...bannerManager.getProp("items"),
                        new BannerItem({
                            key: `banner${++bannerItemCount}`,
                            title: "Uh-oh!",
                            description: "There are no buttons to remove!"
                        })
                    ])
                    .update();
            }
        });

        this.on(EVENTS.ADD_CHECKBOX, () => {
            const checkboxes = this.getProp("checkboxes");
            this.setProp("checkboxes", [
                ...checkboxes,
                new Checkbox({
                    display: `Checkbox ${checkboxes.length + 1}`
                })
            ]).update();
        });

        this.on(EVENTS.REMOVE_CHECKBOX, () => {
            const checkboxes = this.getProp("checkboxes");
            if (checkboxes.length) {
                this.setProp(
                    "checkboxes",
                    checkboxes.slice(0, checkboxes.length - 1)
                ).update();
            } else {
                const bannerManager = this.getChild("bannerManager");
                bannerManager
                    .setProp("items", [
                        ...bannerManager.getProp("items"),
                        new BannerItem({
                            key: `banner${++bannerItemCount}`,
                            title: "Uh-oh!",
                            description: "There are no checkboxes to remove!"
                        })
                    ])
                    .update();
            }
        });
    }

    view(el, props, children, mapped) {
        return el(
            "div",
            {
                key: "intermediate",
                class: classNames({
                    [`${NAMESPACE}-${EXERCISE_CLASS}`]: true
                })
            },
            [
                el(
                    "div",
                    {
                        class: "mpageui-content-container"
                    },
                    [
                        el(
                            "div",
                            {
                                class: "mpageui-u-flexgrid-col--offset-2"
                            },
                            mapped.checkboxGroup.render()
                        ),
                        el(
                            "div",
                            {
                                class: "mpageui-u-flexgrid-col--offset-4"
                            },
                            mapped.buttonGroup.render()
                        )
                    ]
                ),
                el(
                    "div",
                    {
                        class: "mpageui-u-pad-absolute-very-tight"
                    },
                    mapped.bannerManager.render()
                ),
                el(
                    "div",
                    {
                        class: "mpageui-u-flexgrid-row mpageui-u-flexgrid-row--distribute dev-flexgrid-row"
                    },
                    [
                        el(
                            "div",
                            {
                                class: "mpageui-u-flexgrid-col--offset-3"
                            },
                            renderItems(props.checkboxes)
                        ),
                        el(
                            "div",
                            {
                                class: "mpageui-u-flexgrid-col-5  mpageui-u-flexgrid-col--padSmall"
                            },
                            renderItems(props.buttons)
                        )
                    ]
                )
            ]
        );
    }
}

export default IntermediateReference;
