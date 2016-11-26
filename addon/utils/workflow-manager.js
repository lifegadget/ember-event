import './common-types';
export default class WorkflowManager {
    constructor(startingState, sendEvent) {
        this._workflow = [];
        const now = new Date().getTime();
        this.startTime = now;
        this.addState({
            state: startingState
        });
    }
    get completed() {
        return Boolean(this._workflow[this._workflow.length - 1].completed);
    }
    addState(state) {
        this._workflow.push(state);
        this._updateQueue();
    }
    _updateQueue() {
    }
}
