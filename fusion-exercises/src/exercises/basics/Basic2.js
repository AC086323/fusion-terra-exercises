import {UIComponent,atomic} from "MPageFusion";
import classNames from "classnames";

const {button:{Button},selection:{Select}}=atomic
const EVENT = {
    SELECTION: "COLOR::SELECTION",
    CHANGE:"CLICK::BUTTON"
}
const defaultClassName = "basic2"
/**
 * This task will be completed when you change the select drop down, it should change the
 * text of the color and when the button is clicked it should change the background color of the surrounding div
 */

// TODO Need to create one button and select as children
// TODO Need to write event listeners for button to handle button click event and select for selection change event
// TODO Need to render button and select

export default class Basic2 extends UIComponent {

    initialProps(){
        return {
            color: ""
        }
    }

    constructor(children, props) {
        super(children, props);
        this.backgroundColor = "White";
    }

    createChildren(){
        return [
            {
                select: new Select({
                    items:[
                        {
                            display:"red",
                            id:"red"
                        },
                        {
                            display: "blue",
                            id:"blue"
                        }
                    ],
                    classNames:"width50",
                    placeholder:"Select an option",
                    selectionChangeEventName: EVENT.SELECTION
                })
            },
            {
                button: new Button({ display:"Change",clickEventName:EVENT.CHANGE})
            }
        ]
    }

    afterCreate(){

        this.on(EVENT.SELECTION,(val,selectedValue)=>{
            this.setProp("color",selectedValue)
            this.getChild("button").setProp("display",selectedValue||"Change").update()
        })
        this.on(EVENT.CHANGE,()=>{
            this.backgroundColor = this.getProp("color")
            this.update()
        })
    }

    /**
     * @inheritDoc
     */
    view(el, props, children, mChildren) {
        return el("div",
            {
                // We use classNames refer this https://github.com/JedWatson/classnames
                class: classNames({
                    [`${defaultClassName}`]: true,
                    [`${defaultClassName}_${this.backgroundColor}`] : true
                })
            },
            this.renderChildren()
        );
    }
}
