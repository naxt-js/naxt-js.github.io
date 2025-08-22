export default function Docs(naxt) {
    return naxt.div(
        { className: "grid", style: { gap: "24px" } },

        naxt.div(
            {},
            naxt.h1({}, `${naxt.globals.name} Documentation`),
            naxt.p(
                { className: "muted" },
                "Naxt is a tiny DOM toolkit: one class, no VDOM, stateful re-renders, ",
                "and pragmatic helpers for building UI in plain JavaScript."
            ),
            naxt.div(
                { style: { display: "flex", gap: "8px", flexWrap: "wrap" } },
                naxt.a(
                    { className: "btn", href: "#/examples" },
                    "See Live Examples"
                ),
                naxt.a(
                    { className: "btn btn-outline", href: "#/features" },
                    "API & Concepts"
                )
            )
        ),

        naxt.div(
            { className: "card" },
            naxt.div({ className: "card-head" }, "Getting Started"),
            naxt.div(
                { className: "card-body grid", style: { gap: "12px" } },
                naxt.p(
                    {},
                    "Drop the files in a folder and open index.html (or serve statically)."
                ),
                naxt.pre(
                    { className: "code" },
                    `<!-- index.html -->
<div id="app"></div>
<script type="module" src="app.js"></script>`
                ),
                naxt.p({}, "A minimal “Hello Naxt” app:"),
                naxt.pre(
                    { className: "code" },
                    `import Naxt from './naxt.js';
const naxt = new Naxt(document.getElementById('app'));

function Home() {
  return naxt.div({},
    naxt.h1({}, 'Hello Naxt'),
    naxt.p({}, 'Build UIs with plain JS.')
  );
}

naxt.render(() => Home());`
                )
            )
        ),

        naxt.div(
            { className: "card" },
            naxt.div({ className: "card-head" }, "Core Concepts"),
            naxt.div(
                { className: "card-body grid", style: { gap: "8px" } },
                Bullet(naxt, "Direct DOM"),
                naxt.p(
                    { className: "muted" },
                    "No virtual DOM. Naxt creates real elements via a tiny constructor."
                ),
                Bullet(naxt, "Pure render function"),
                naxt.p(
                    { className: "muted" },
                    "You provide a function that returns a DOM tree; Naxt mounts it."
                ),
                Bullet(naxt, "State + re-render"),
                naxt.p(
                    { className: "muted" },
                    "`setState(partial)` merges into `this.state` and re-renders automatically."
                ),
                Bullet(naxt, "Input snapshotting"),
                naxt.p(
                    { className: "muted" },
                    "Before re-render, Naxt snapshots inputs (value, checked, selection, focus) and restores them."
                ),
                Bullet(naxt, "Pragmatic props"),
                naxt.p(
                    { className: "muted" },
                    "Props map to element properties when possible; otherwise set as attributes. `onClick` → event, `style` accepts object, `className` sets the class."
                )
            )
        ),

        naxt.div(
            { className: "card" },
            naxt.div({ className: "card-head" }, "Quick Example: Counter"),
            naxt.div(
                { className: "card-body" },
                naxt.pre(
                    { className: "code" },
                    `function Counter(naxt) {
  const n = naxt.state.n ?? 0;
  return naxt.div({ style:{display:'flex',gap:'8px',alignItems:'center'} },
    naxt.button({ className:'btn btn-outline', onClick:()=>naxt.setState({n:n-1}) }, '-'),
    naxt.span({}, String(n)),
    naxt.button({ className:'btn', onClick:()=>naxt.setState({n:n+1}) }, '+'),
  );
}`
                ),
                naxt.p(
                    { className: "muted" },
                    "Try the live one in the Examples page."
                )
            )
        ),

        naxt.div(
            { className: "card" },
            naxt.div({ className: "card-head" }, "Page Meta & CSS"),
            naxt.div(
                { className: "card-body grid", style: { gap: "12px" } },
                naxt.p(
                    {},
                    "Set the document title/description and inject CSS without extra files:"
                ),
                naxt.pre(
                    { className: "code" },
                    `naxt.meta.title('My App');
naxt.meta.description('What this app does');
naxt.css(\`
  .btn { border-radius: 10px; }
\`);`
                ),
                naxt.span(
                    { className: "badge" },
                    "Note",
                    " CSS is appended as a <style> tag on the page."
                )
            )
        )
    );
}

function Bullet(naxt, text) {
    return naxt.div(
        { style: { display: "flex", gap: "8px", alignItems: "center" } },
        naxt.span(
            { className: "badge", style: { width: "28px", height: "28px" } },
            "•"
        ),
        naxt.span({}, text)
    );
}
