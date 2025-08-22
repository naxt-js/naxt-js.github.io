export default function Features(naxt) {
    return naxt.div(
        { className: "grid", style: { gap: "24px" } },
        naxt.h1({}, "API Reference & Concepts"),

        Section(
            naxt,
            "Naxt(root?)",
            `new Naxt(root?: Element)
- root (default: document.getElementById('app')): container where pages render.
- state: plain object you control; Naxt won't freeze or proxy it.
- defaultRender: last render function (used when setState triggers re-render).`
        ),

        Section(
            naxt,
            "render(componentFn)",
            `naxt.render((state) => Node)

- Saves componentFn as defaultRender.
- Snapshots <input>, <textarea>, <select> values, checked, selection, and the active element.
- Clears the root, appends the new tree.
- Restores values/checked/selection and refocuses the previously active control.`
        ),

        Section(
            naxt,
            "setState(partial)",
            `naxt.setState({ ...patch })

- Shallow merges patch into naxt.state.
- Immediately calls render(defaultRender) if it exists.
- Keep your components pure: derive UI from state.`
        ),

        Section(
            naxt,
            "css(content)",
            `naxt.css('...css...')

- Appends a <style> tag with your content to the document body.
- Use this to theme or ship component styles without extra files.`
        ),

        Section(
            naxt,
            "meta",
            `naxt.meta.title('My Title')
naxt.meta.description('My Description')

- Writes <title> and <meta name="description"> (creating if missing).`
        ),

        Section(
            naxt,
            "_construct(tag, props?, ...children)",
            `Low-level element factory used by all helpers.
- Props:
  • onXxx: functions become event listeners (e.g., onClick, onInput).
  • style: object merged into element.style.
  • className: sets class="".
  • ref: function(el) receives the created element.
  • Other keys: if key in element → element[key] = value; else setAttribute(key,value). 
    Try/Catch guarded; logs a warning if a property can't be set.
- Children:
  • Strings/numbers → text nodes
  • Node instances → appended as-is
  • Arrays are flattened (so map() results work).`
        ),

        Section(
            naxt,
            "Built-in tag helpers",
            `Convenience methods mapping to _construct():
- div, h1, h2, p, button, ul, li, nav, a, input, textarea, span, pre

Need more tags? Use _construct('table', {...}, ...) directly or create tiny wrappers.`
        ),

        LiveBlock(
            naxt,
            "Ref example (focus an input)",
            `let focusEl = null;
const View = (naxt) => naxt.div({ className:'grid', style:{gap:'8px',maxWidth:'420px'} },
  naxt.input({
    className:'input',
    placeholder:'I will be focused after render',
    ref: (el) => { focusEl = el; }
  }),
  naxt.button({ className:'btn', onClick:()=>alert('value: ' + (focusEl?.value||'')) }, 'Read Value')
);
naxt.render(View);
focusEl?.focus();`
        ),

        Section(
            naxt,
            "Event handling",
            `Use DOM event names with onXxx (camel-cased):
- onClick, onInput, onChange, onSubmit, onKeydown, etc.
Naxt converts 'on' prefix to a real event listener (lowercased).`
        ),

        Section(
            naxt,
            "Controlled inputs + snapshotting",
            `If you bind value/checked to state, Naxt will keep them across re-renders:
- Keeps cursor position and selection range.
- Restores focus to the previously active field when possible.
- File inputs are intentionally excluded from value restore.`
        ),

        Section(
            naxt,
            "Patterns & tips",
            `- Keep render functions pure. Don't mutate DOM outside of events.
- Keep state minimal; derive values in render.
- For one-off tags, prefer naxt._construct('tag', props, ...) to adding many helpers.
- Use 'ref' for imperative escape hatches (measuring, focusing).`
        )
    );
}

function Section(naxt, title, body) {
    return naxt.div(
        { className: "card" },
        naxt.div({ className: "card-head" }, title),
        naxt.div(
            { className: "card-body" },
            naxt.pre({ className: "code" }, body)
        )
    );
}

function LiveBlock(naxt, title, code) {
    return naxt.div(
        { className: "card" },
        naxt.div({ className: "card-head" }, title),
        naxt.div(
            { className: "card-body grid", style: { gap: "12px" } },
            naxt.pre({ className: "code" }, code),
            naxt.p(
                { className: "muted" },
                "Paste into a page or adapt in your app."
            )
        )
    );
}
