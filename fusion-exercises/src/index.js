import "MPageFusion/dist/lib/css/mpage-fusion.css";
import "./less/index.less";
import "babel-polyfill";

import { UIComponent, atomic } from "MPageFusion";
import classNames from "classnames";

const { icon: { svg } } = atomic;
const { content: { Checkmark } } = svg;

// Exercises
import Basics from "./exercises/basics/util/Basics_parent";
import Intermediate from "./exercises/intermediate/IntermediateContainer";
import Advanced from "./exercises/advanced/Advanced";
import Demo from "./exercises/Demo/Demo";

const examples = [
    {
        id: "demo",
        display: "Demo",
        view: new Demo()
    },
    {
        id: "basics",
        display: "Basics",
        view: new Basics()
    },
    {
        id: "intermediate",
        display: "Intermediate",
        view: new Intermediate()
    },
    {
        id: "advanced",
        display: "Advanced",
        view: new Advanced()
    }
];

class ExampleProgress extends UIComponent {
    initialProps() {
        return {
            completedExamples: [],
            selectedExample: 0,
            examples: [],
            onExampleClick: () => {
            }
        }
    }

    view(el, props, children, mapped) {
        return el(
            "ul",
            {
                class: "lnf-ExampleProgress"
            },
            [
                props.examples.map((example, i) => el(
                    "li",
                    {
                        class: classNames("lnf-ExampleProgress-item", {
                            "is-active": (example.id === props.selectedExample)
                        }),
                        onclick: () => props.onExampleClick(example, i)
                    },
                    [
                        example.display,
                        (props.completedExamples.includes(example.id)) ? (new Checkmark().render()) : null
                    ]
                ))
            ]
        );
    }
}

class App extends UIComponent {
    initialProps() {
        return {
            completedExamples: [],
            currentExampleIndex: 0
        };
    }

    propChangeHandlers() {
        return {
            currentExample: (current) => {
                this.setState({
                    currentExample: current
                });
            },
            completedExamples: (complete) => {
                this.setState({
                    completedExamples: complete
                });
            }
        };
    }

    initialState() {
        return {
            currentExampleIndex: 0
        };
    }

    createChildren() {
        return [ ...examples.map((example) => ({
            [ example.id ]: example.view
        })), {
            exampleProgress: new ExampleProgress({
                examples: examples,
                onExampleClick: ({ id }, index) => {
                    this.setState({
                        currentExample: id
                    }).update();
                }
            })
        } ];
    }

    beforeRender({ nextState }) {
        localStorage.setItem("currentExample", nextState.currentExample);
        localStorage.setItem("completedExamples", JSON.stringify(nextState.completedExamples));

        this.getChild("exampleProgress").setProps({
            selectedExample: nextState.currentExample,
            completedExamples: nextState.completedExamples
        });
    }

    view(el, props, children, mapped, { state }) {
        return el(
            "div",
            {
                class: "lnf-App"
            },
            el(
                "header",
                {
                    class: "lnf-Header"
                },
                el(
                    "div",
                    {
                        class: "lnf-Header-row"
                    },
                    [
                        el(
                            "h1",
                            {
                                class: "mpageui-u-text-size-lg"
                            },
                            "Learn Fusion"
                        ),
                        mapped.exampleProgress.render(),
                        el("div", { class: "lnf-Header-spacer" }),
                        el(
                            "button",
                            {
                                class: classNames("lnf-Header-button mpageui-Button"),
                                onclick: () => {
                                    if (state.completedExamples.length < examples.length) {
                                        this.setState({
                                            currentExample: examples[ ((examples.findIndex((e) => e.id === state.currentExample)) + 1) % examples.length ].id,
                                            completedExamples: [
                                                ...state.completedExamples,
                                                ...!state.completedExamples.includes(state.currentExample) ? [ state.currentExample ] : []
                                            ]
                                        }).update();
                                    }
                                    else {
                                        this.setState({
                                            currentExample: examples[0].id,
                                            completedExamples: []
                                        }).update();
                                    }
                                }
                            },
                            (state.completedExamples.length >= examples.length) ? "Start Over" : "Complete"
                        )
                    ]
                )
            ),
            el(
                "main",
                {
                    class: "lnf-Main"
                },
                mapped[ state.currentExample ].render()
            )
        );
    }
}

const app = new App({
    currentExample: localStorage.getItem("currentExample") ? (
        localStorage.getItem("currentExample")
    ) : examples[0].id,
    completedExamples: localStorage.getItem("completedExamples") ? (
        JSON.parse(localStorage.getItem("completedExamples"))
    ) : []
});
app.mount("root").update();
