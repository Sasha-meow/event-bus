import Block from "../lib/component";
import store from "../store";

export default class Count extends Block {
    constructor() {
        super({
            store,
            element: document.querySelector(".js-count")
        });
    }

    render() {
        let suffix = store.state.items.length !== 1 ? "s" : "";
        let emoji = !!store.state.items.length ? "&#x1f64c;" : "&#x1f622;";

        this.element.innerHTML = `
            <small>You have done</small>
            ${store.state.items.length}
            <small>thing${suffix} today ${emoji}</small>
        `;
    }
}