import Naxt from "./naxt.js";

const naxt = new Naxt(); // or new Naxt(document.getElementById("app"))

let state = { counter: 0 };

function setState(partial) {
    state = { ...state, ...partial };
    render();
}

function App() {
    return naxt.div(
        {},
        naxt.h1({}, "Basic Naxt.js Counter"),
        naxt.p({}, `Count: ${state.counter}`),
        naxt.button(
            { onClick: () => setState({ counter: state.counter + 1 }) },
            "Increment"
        )
    );
}

function render() {
    naxt.render(App());
}

naxt.meta.title("Naxt Counter");
naxt.css(`
  body { font-family: system-ui, sans-serif; }
  #app { padding: 2rem; }
  button { padding: .5rem .8rem; border-radius: 6px; border: 0; cursor: pointer; }
`);

render();
