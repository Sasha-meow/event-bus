import Store from "../store/store";

export default class Block {
    constructor(props = {}) {
        let self = this;

        this.render = this.render || function() {};

        if (props.store instanceof Store) {
            props.store.events.on("stateChange", () => self.render());
        }

        if (!!props.element) {
            this.element = props.element;
        }
    }
}