import EventBus from "../lib/eventbus";

export default class Store {
    constructor(params) {
        let self = this;

        self.actions = {};
        self.mutations = {};
        self.state = {};
        self.status = "resting";

        self.events = new EventBus();

        if (!!params.actions) {
            self.actions = params.actions;
        }

        if (!!params.mutations) {
            self.mutations = params.mutations;
        }

        self.state = new Proxy((params.state || {}), {
            set(state, key, value) {

                state[key] = value;

                console.log(`stateChange: ${key}: ${value}`);

                self.events.emit("stateChange", self.state);

                if (self.status !== "mutation") {
                    console.warn(`You should use a mutation to set ${key}`);
                }

                self.status = "resting"; //reset status

                return true;
            }
        });
    }

    dispatch(actionKey, payload) {
        
        let self = this;

        if (typeof self.actions[actionKey] !== "function") {
            console.error(`Action "${actionKey} doesn't exist.`);

            return false;
        }

        console.groupCollapsed(`ACTION: ${actionKey}`);

        self.status = "action";

        self.actions[actionKey](self, payload);

        console.groupEnd();

        return true;
    }

    commit(mutationKey, payload) {
        let self = this;

        if (typeof self.mutations[mutationKey] !== "function") {
            console.log(`Mutation "${mutationKey}" doesn't exist`);

            return false;
        }

        self.status = "mutation";

        let newState = self.mutations[mutationKey](self.state, payload);

        self.state = Object.assign(self.state, newState);

        return true;
    }
}