import Block from "../lib/component";
import store from "../store";

export default class Status extends Block {
    constructor() {
        super({
            store,
            element: document.querySelector(".js-status")
        });
    }

    render() {
        let self = this;
        let suffix = store.state.items.length !== 1 ? "s" : "";

        self.element.innerHTML = `${store.state.items.length} item${suffix}`;
    }
}