import Docs from "./docs.js";
import Features from "./features.js";
import Examples from "./examples.js";

const naxt = new Naxt();

naxt.globals = {
    name: "Naxt.js",
};

const routes = {
    "/": (s) => Docs(naxt, s),
    "/docs": (s) => Docs(naxt, s),
    "/api-concepts": (s) => Features(naxt, s),
    "/examples": (s) => Examples(naxt, s),
};

const THEMES = {
    light: {
        "--bg": "#ffffff",
        "--fg": "#0a0a0a",
        "--muted": "#f6f6f6",
        "--border": "#e5e5e5",
        "--muted-text": "#858585ff",
    },
    dark: {
        "--bg": "#0a0a0a",
        "--fg": "#ffffff",
        "--muted": "#1a1a1a",
        "--border": "#282828",
        "--muted-text": "#aaaaaaff",
    },
};

applyTheme(localStorage.getItem("naxt-theme"));

function applyTheme(name) {
    const vars = THEMES[name] || THEMES.light;
    Object.entries(vars).forEach(([k, v]) => {
        document.documentElement.style.setProperty(k, v);
    });
}

const pathNow = () => location.hash.replace(/^#/, "") || "/docs";
const goto = (path) => {
    if (!path.startsWith("#")) path = "#" + path;
    if (location.hash !== path) location.hash = path;
    render();
};

function ThemeSwitch(naxt) {
    const current = naxt.state.theme || localStorage.getItem("naxt-theme");
    const setTheme = (name) => {
        if (name === current) return;
        localStorage.setItem("naxt-theme", name);
        applyTheme(name);
        naxt.setState({ theme: name });
    };

    return naxt.div(
        { className: "seg", role: "group", "aria-label": "Theme" },
        naxt.button(
            {
                className: "seg-btn",
                "aria-pressed": String(current === "light"),
                title: "Light theme",
                onClick: () => setTheme("light"),
            },
            "Light"
        ),
        naxt.button(
            {
                className: "seg-btn",
                "aria-pressed": String(current === "dark"),
                title: "Dark theme",
                onClick: () => setTheme("dark"),
            },
            "Dark"
        )
    );
}

function NavLink(href, label) {
    const isActive = "#" + pathNow() === href;
    return naxt.a(
        {
            href,
            className: "navlink",
            "aria-current": isActive ? "page" : "false",
            onClick: (e) => {
                e.preventDefault();
                goto(href);
            },
        },
        label
    );
}

function Layout(page) {
    return naxt.div(
        {},
        naxt.nav(
            { className: "navbar" },
            naxt.div(
                { className: "container navbar-inner" },
                naxt.a(
                    { href: "#/" },
                    naxt.div({ className: "brand" }, naxt.globals.name)
                ),
                naxt.div(
                    { className: "navlinks" },
                    NavLink("#/docs", "Docs"),
                    NavLink("#/api-concepts", "API & Concepts"),
                    NavLink("#/examples", "Examples"),
                    naxt.a({ href: "https://github.com/naxt-js/", className: "navlink" }, "GitHub"),
                    ThemeSwitch(naxt)
                )
            )
        ),
        naxt.div({ className: "container" }, page),
        naxt.div(
            { className: "footer container" },
            naxt.p(
                {},
                naxt.a(
                    { href: "#/" },
                    `${naxt.globals.name} • ${new Date().getFullYear()}`
                )
            )
        )
    );
}

function App(state) {
    naxt.meta.title("Naxt • Documentation");
    naxt.meta.description("Official documentation for the Naxt DOM toolkit.");
    const Page = routes[pathNow()] || routes["/docs"];
    return Layout(Page(state));
}

function render() {
    naxt.render(App);
}
window.addEventListener("hashchange", render);
render();

export { goto };
export default naxt;
