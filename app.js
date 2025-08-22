import Naxt from "./Naxt.js";

const app = new Naxt();

// Add global CSS
app.css(`
  body {
    font-family: Arial, sans-serif;
    background: #f5f5f5;
    margin: 0;
    padding: 20px;
  }
  .container {
    max-width: 600px;
    margin: auto;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 20px;
  }
  .task {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  .task.done {
    text-decoration: line-through;
    color: gray;
  }
  .task button {
    margin-left: 8px;
  }
  input {
    padding: 8px;
    width: 75%;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
  button {
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    background: #007bff;
    color: white;
    cursor: pointer;
  }
  button:hover {
    background: #0056b3;
  }
`);

app.state = {
    tasks: [],
    newTask: ""
};

function TaskManager(state) {
    return app.div({ className: "container" },
        app.h1({}, "Naxt Task Manager ✅"),

        // Input form
        app.div({ style: { display: "flex", gap: "10px", marginBottom: "15px" } },
            app.input({
                type: "text",
                placeholder: "Enter a task...",
                value: state.newTask,
                oninput: (e) => app.setState({ newTask: e.target.value })
            }),
            app.button({
                onclick: () => {
                    if (!state.newTask.trim()) return;
                    const newTask = { id: Date.now(), text: state.newTask, done: false };
                    app.setState({ tasks: [...state.tasks, newTask], newTask: "" });
                }
            }, "Add")
        ),

        // Task list
        app.ul({},
            state.tasks.map(task =>
                app.li({ className: `task ${task.done ? "done" : ""}` },
                    task.text,
                    app.div({},
                        app.button({
                            onclick: () => {
                                const updated = state.tasks.map(t =>
                                    t.id === task.id ? { ...t, done: !t.done } : t
                                );
                                app.setState({ tasks: updated });
                            }
                        }, task.done ? "Undo" : "Done"),
                        app.button({
                            onclick: () => {
                                const filtered = state.tasks.filter(t => t.id !== task.id);
                                app.setState({ tasks: filtered });
                            }
                        }, "Delete")
                    )
                )
            )
        )
    );
}

app.meta.title("Naxt Task Manager");
app.meta.description("A simple task manager built with the Naxt micro-framework.");

app.render(TaskManager);
