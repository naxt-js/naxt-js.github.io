# Naxt Example Site

This is a **demo website** built with [Naxt](../naxt.js), a tiny DOM-first UI framework.  
It showcases how you can build a small SPA (single-page app) with **Home, Docs, and Examples** pages — all without JSX, build steps, or virtual DOM.

---

## 🚀 Features

- **Multi-page SPA** using a tiny hash router (`router.js`)  
- **Home page** with intro and quick start guide  
- **Docs page** with full API and usage instructions  
- **Examples page** with interactive widgets (counter, todos, form)  
- **Dark/Light theme toggle** using plain CSS variables  
- **Mobile-friendly navigation** with a responsive menu sheet  

---

## 📂 Project Structure

.
├── index.html
├── styles.css
├── naxt.js # Naxt framework core (provided separately)
├── app.js # App shell + layout + router mounting
├── router.js # Tiny hash router
└── pages/
├── home.js
├── docs.js
└── examples.js
