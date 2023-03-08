import {UIComponent, atomic} from "MPageFusion"; // Using ES6 import we can import exposed components from MPageFusion
import classNames from "classnames";

const { button : { Button } } = atomic; // Here we are using object destructuring this line implies this "var Button = MPageFusion.atomic.button.Button"

// A better way to define constants is to declare them outside the class
// The name of the events should follow the specific order (ClassName::eventName) for better readability
const EVENTS = {
    BUTTON_CLICK: "Demo::buttonClick"
};

// In ES6 we can use classes and we can export and import them. Check ES6 class, export and import.
// We extend MPageFusion UIComponent to over ride it's prototype functions
export default class Demo extends UIComponent {
    /**
     * initialProps function is used for initiating properties of the component, general thumb of rule if the component
     * is consumed by other components and if they send properties then that property should be declared in initial props
     */
    initialProps() {
        return {
            /**
             * I am setting a prop 'isImageDisplayed' to be false and if we create a Demo instance like this
             * let demo = new Demo({isImageDisplayed: false}); then the initial prop would be overridden with
             * the updated value, in the above case "isImageDisplayed" would be false
             */
            isImageDisplayed: true
        };
    }

    /**
     * afterCreate function would be called after createChildren life cycle method and this is place where
     * we should register register events to the component
     */
    afterCreate() {
        /**
         * Here we are registering an event "Demo::buttonClick" and on event we would
         */
        this.on(EVENTS.BUTTON_CLICK, (btn) => {
            this.setProp("isImageDisplayed", !this.getProp("isImageDisplayed")).update();
        });
    }

    /**
     * Create children function is used to create children and it is defined in UIComponent and we override it
     * to create children for the component we are creating
     */
    createChildren() {
        return [ // It would return an array of children
            {
                button: new Button({   // Here i am creating a mapped child, refer documentation for more details
                    display: "Toggle Button!",
                    clickEventName: EVENTS.BUTTON_CLICK
                })
            }
        ];
    }
    /**
     * View function would return an single dom element and we need to override this function
     *
     * el - a function which creates a virtual dom element based on params {1st param: elementType(Ex: div, p, span)},
     *      {2nd param: attributes like class, style}, {3rd param: children}
     * props - The props which are sent in creating an instance of the component ex: new ExampleClass({height: 25, width: 50})
     *         here height and width will be props for ExampleClass
     * children - All the children which are created in the createChildren function, or even children can also be passed in params
     *            when creating component instance ex: new ExampleClass({height: 10}, [new Button({display: "test"})]). Here the
     *            instance would have button as the child, if it is not overriding in createChildren function.
     * mChildren - If the children created are mapped children(key value pairs) then you would be access the specific child using mChildren
     */
    view(el, props, children, mChildren) {
        // We should return only one element, it can have multiple elements as child
        return el("div", // Here we are returning an div element
            {
                class: "Demo-Wrapper"
            },
            [
                el("p", // here we are displaying p element
                    {
                        style: {color: "coral", "font-size": "3em"} // This is for example purpose only,
                        // we should not hard code inline style.
                    },
                    "MPage Fusion is Awesome"
                ),
                el("div", { class : "demo-button__wrapper" }, mChildren.button.render()),
                el(
                    "iframe",
                    {
                        src: "https://giphy.com/embed/11sBLVxNs7v6WA",
                        width: "480",
                        height: "270",
                        frameBorder: "0",
                        class: classNames({
                            "DoNotDisplay": props.isImageDisplayed === true
                        })
                    }
                ),
                el("p", {class : "temporaryClass"},
                    "This task has been implemented at src/exercises/Demo/Demo.js, check it out!")
            ]
        );
    }
}
