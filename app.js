import Naxt from "./naxt.js";

const naxt = new Naxt();

naxt.state = { counter: 0 };

function App() {
    return naxt.div(
        {},
        naxt.h1({}, "Basic Naxt.js Counter"),
        naxt.p({}, `Count: ${naxt.state.counter}`),
        naxt.button(
            {
                onClick: () =>
                    naxt.setState({ counter: naxt.state.counter + 1 }),
            },
            "Increment"
        )
    );
}

naxt.meta.title("Naxt Counter");
naxt.css(`
  body { font-family: system-ui, sans-serif; }
  #app { padding: 2rem; }
  button { padding: .5rem .8rem; border-radius: 6px; border: 0; cursor: pointer; }
`);

naxt.render(App());
