export default function Examples(naxt) {
    return naxt.div(
        { className: "grid", style: { gap: "24px" } },
        naxt.h1({}, "Examples"),

        Card(naxt, "Counter (state & re-render)", Counter(naxt)),
        Card(
            naxt,
            "Form snapshot (value, selection, focus)",
            SnapshotDemo(naxt)
        ),
        Card(naxt, "Todo list (controlled inputs)", Todo(naxt)),
        Card(naxt, "Custom tag via _construct", CustomTag(naxt)),
        Card(naxt, "LocalStorage (persisted state)", LocalStorageDemo(naxt))
    );
}

function Card(naxt, title, bodyNode) {
    return naxt.div(
        { className: "card" },
        naxt.div({ className: "card-head" }, title),
        naxt.div({ className: "card-body" }, bodyNode)
    );
}

function LocalStorageDemo(naxt) {
    if (!naxt.state.persisted) {
        const saved = localStorage.getItem("naxt-demo");
        naxt.state.persisted = saved ? JSON.parse(saved) : { clicks: 0 };
    }
    const { clicks } = naxt.state.persisted;

    const update = (patch) => {
        const next = { ...naxt.state.persisted, ...patch };
        localStorage.setItem("naxt-demo", JSON.stringify(next));
        naxt.setState({ persisted: next });
    };

    return naxt.div(
        { className: "grid", style: { gap: "8px", maxWidth: "300px" } },
        naxt.p({}, "Click count is saved to localStorage:"),
        naxt.div(
            { style: { display: "flex", gap: "8px", alignItems: "center" } },
            naxt.button(
                {
                    className: "btn",
                    onClick: () => update({ clicks: clicks + 1 }),
                },
                "Click me"
            ),
            naxt.span({}, String(clicks ?? 0))
        ),
        naxt.button(
            {
                className: "btn btn-outline",
                onClick: () => update({ clicks: 0 }),
            },
            "Reset"
        )
    );
}

function Counter(naxt) {
    const n = naxt.state.count ?? 0;
    return naxt.div(
        { style: { display: "flex", gap: "8px", alignItems: "center" } },
        naxt.button(
            {
                className: "btn btn-outline",
                onClick: () => naxt.setState({ count: n - 1 }),
            },
            "-"
        ),
        naxt.span(
            { style: { minWidth: "40px", textAlign: "center" } },
            String(n)
        ),
        naxt.button(
            {
                className: "btn",
                onClick: () => naxt.setState({ count: n + 1 }),
            },
            "+"
        )
    );
}

function SnapshotDemo(naxt) {
    const form = naxt.state.snap || {
        text: "Edit me and click re-render",
        rerenders: 0,
    };
    const set = (patch) => naxt.setState({ snap: { ...form, ...patch } });

    return naxt.div(
        { className: "grid", style: { gap: "8px", maxWidth: "520px" } },
        naxt.input({
            className: "input",
            id: "snapText",
            value: form.text,
            onInput: (e) => set({ text: e.target.value }),
        }),
        naxt.button(
            {
                className: "btn btn-outline",
                onClick: () => set({ rerenders: form.rerenders + 1 }),
            },
            "Force re-render"
        ),
        naxt.span({ className: "muted" }, `Re-renders: ${form.rerenders}`)
    );
}

function Todo(naxt) {
    const s = naxt.state.todo || { items: [], draft: "" };
    const set = (patch) => naxt.setState({ todo: { ...s, ...patch } });

    const add = () => {
        const t = s.draft.trim();
        if (!t) return;
        set({
            items: [...s.items, { id: Date.now(), text: t, done: false }],
            draft: "",
        });
    };
    const toggle = (id) =>
        set({
            items: s.items.map((i) =>
                i.id === id ? { ...i, done: !i.done } : i
            ),
        });
    const remove = (id) => set({ items: s.items.filter((i) => i.id !== id) });

    return naxt.div(
        { className: "grid", style: { gap: "8px", maxWidth: "520px" } },
        naxt.div(
            { style: { display: "flex", gap: "8px" } },
            naxt.input({
                className: "input",
                id: "todoDraft",
                placeholder: "Add a task...",
                value: s.draft,
                onInput: (e) => set({ draft: e.target.value }),
                onKeydown: (e) => {
                    if (e.key === "Enter") add();
                },
            }),
            naxt.button({ className: "btn", onClick: add }, "Add")
        ),
        naxt.div(
            { className: "grid", style: { gap: "6px" } },
            s.items.length
                ? s.items.map((item) =>
                      naxt.div(
                          {
                              className: "card",
                              style: {
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  padding: "10px 12px",
                              },
                          },
                          naxt.div(
                              {
                                  style: {
                                      display: "flex",
                                      gap: "8px",
                                      alignItems: "center",
                                  },
                              },
                              naxt.input({
                                  type: "checkbox",
                                  checked: item.done,
                                  onChange: () => toggle(item.id),
                              }),
                              naxt.span(
                                  {
                                      style: {
                                          textDecoration: item.done
                                              ? "line-through"
                                              : "none",
                                      },
                                  },
                                  item.text
                              )
                          ),
                          naxt.button(
                              {
                                  className: "btn btn-ghost",
                                  onClick: () => remove(item.id),
                              },
                              "Remove"
                          )
                      )
                  )
                : naxt.span({ className: "muted" }, "No tasks yet.")
        )
    );
}

function CustomTag(naxt) {
    const table = (...args) => naxt._construct("table", ...args);
    const thead = (...args) => naxt._construct("thead", ...args);
    const tbody = (...args) => naxt._construct("tbody", ...args);
    const tr = (...args) => naxt._construct("tr", ...args);
    const th = (...args) => naxt._construct("th", ...args);
    const td = (...args) => naxt._construct("td", ...args);

    return table(
        { className: "table", style: { maxWidth: "520px" } },
        thead({}, tr({}, th({}, "Prop"), th({}, "Type"), th({}, "Notes"))),
        tbody(
            {},
            tr(
                {},
                td({}, "className"),
                td({}, "string"),
                td({}, "Sets element class attribute")
            ),
            tr(
                {},
                td({}, "style"),
                td({}, "object"),
                td({}, "Merged into element.style")
            ),
            tr(
                {},
                td({}, "onClick"),
                td({}, "function"),
                td({}, "Adds click event listener")
            ),
            tr(
                {},
                td({}, "ref"),
                td({}, "function"),
                td({}, "Imperative access to element")
            )
        )
    );
}
