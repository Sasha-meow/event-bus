import Block from "../lib/component";
import store from "../store";

export default class List extends Block {
    constructor() {
        super({
            store,
            element: document.querySelector(".js-items")
        });
    }

    render() {
        let self = this;

        if (!store.state.items.length) {
            self.element.innerHTML = `<p class="no-items">You've done nothing yet &#x1f622;</p>`;
            return;
        }

        self.element.innerHTML = `
            <ul class="app__items">
                ${store.state.items.map((item) => 
                    `<li>
                        ${item}
                        <button aria-label="Delete this item">
                            -
                        </button>
                    </li>`
                ).join("")}
            </ul>
        `;

        self.element.querySelectorAll("button").forEach((btn, index) => {
            btn.addEventListener("click", () => {
                store.dispatch("clearItem", { index });
            });
        });
    }
}