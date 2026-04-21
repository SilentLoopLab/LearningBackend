import type { Events, Listener } from "./types.js";

export default class CustomEventEmitter {
    #events: Events = new Map();

    public constructor() {}

    public on(event: string, listener: Listener): this {
        let listeners = this.#events.get(event);

        if (!listeners) {
            listeners = new Set();
            this.#events.set(event, listeners);
        }

        listeners.add(listener);
        return this;
    }

    public emit(event: string, ...args: any[]): boolean {
        const listeners = this.#events.get(event);

        if (!listeners || listeners.size === 0) {
            return false;
        }

        for (const listener of listeners) {
            listener(...args);
        }

        return true;
    }

    public off(event: string, listener: Listener): this {
        const listeners = this.#events.get(event);

        if (listeners) {
            listeners.delete(listener);

            if (listeners.size === 0) {
                this.#events.delete(event);
            }
        }

        return this;
    }
}
