export default class EventBus {
    constructor() {
        this.events = {}; //дефолтное значение, возвращает именованные события(каналы)
    }

    on(event, callback) { //подписка
        if (!this.events[event]) {
            this.events[event] = [];
        }

        return this.events[event].push(callback);
    }

    off(event, callback) { //отписка
        if (!this.events[event]) {
            this.events[event] = [];
        }

        return this.events[event] = this.events[event].filter((func) => func !== callback);
    }

    emit(event, ...args) { //оповещение подписчиков
        if (!this.events[event]) {
            this.events[event] = [];
        }

        return this.events[event].map((func) => func(...args))
    }
}