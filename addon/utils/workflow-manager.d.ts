/// <reference types="ember" />
import './common-types';
export default class WorkflowManager {
    private _workflow;
    id: string;
    uid: string;
    startTime: number;
    stopTime: number;
    constructor(startingState: string, sendEvent: Function);
    readonly completed: boolean;
    addState(state: IWorkflowState): void;
    _updateQueue(): void;
}
export interface IWorkflowState {
    state: string;
    subState?: string;
    start?: number;
    stop?: number;
    completed?: boolean;
}
