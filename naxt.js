class Naxt {
    constructor(root = document.getElementById("app")) {
        this.root = root;
        this.state = {};
        this.defaultRender = null;
    }

    _construct(type, props = {}, ...children) {
        const element = document.createElement(type);

        for (let [key, value] of Object.entries(props)) {
            if (key.startsWith("on") && typeof value === "function") {
                const event = key.substring(2).toLowerCase();
                element.addEventListener(event, value);
            } else if (key === "style" && typeof value === "object") {
                Object.assign(element.style, value);
            } else if (key === "className") {
                element.setAttribute("class", value);
            } else {
                element[key] = value;
            }
        }

        children.flat().forEach((child) => {
            if (typeof child === "string" || typeof child === "number") {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                element.appendChild(child);
            }
        });

        return element;
    }

    setState(partial) {
        this.state = { ...this.state, ...partial };
        this.render(this.defaultRender);
    }

    css(content) {
        const style = document.createElement("style");
        style.textContent = content;
        document.body.appendChild(style);
    }

    meta = {
        title: (title) => (document.title = title),
        description: (description) => {
            let element = document.querySelector("meta[name='description']");

            if (!element) {
                element = document.createElement("meta");
                element.name = "description";
                document.head.appendChild(element);
            }
            element.content = description;
        },
    };

    render(component) {
        this.defaultRender = component;
        this.root.innerHTML = "";
        this.root.appendChild(component);
    }

    div(props, ...children) {
        return this._construct("div", props, ...children);
    }
    h1(props, ...children) {
        return this._construct("h1", props, ...children);
    }
    h2(props, ...children) {
        return this._construct("h2", props, ...children);
    }
    p(props, ...children) {
        return this._construct("p", props, ...children);
    }
    button(props, ...children) {
        return this._construct("button", props, ...children);
    }
    ul(props, ...children) {
        return this._construct("ul", props, ...children);
    }
    li(props, ...children) {
        return this._construct("li", props, ...children);
    }
    nav(props, ...children) {
        return this._construct("nav", props, ...children);
    }
    a(props, ...children) {
        return this._construct("a", props, ...children);
    }
}

export default Naxt;
