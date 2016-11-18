import './common-types';
import { v4 } from "ember-uuid";

/**
 * Uses an array to represent a user workflow, where a "workflow" is
 * most typically a set of Ember routes (but can be anything)
 */
export default class WorkflowManager {
  private _workflow: IWorkflowState[] = [];
  public id: string;
  public uid: string;
  public startTime: number;
  public stopTime: number;

  constructor(startingState: string, sendEvent: Function) {
    const now = new Date().getTime();
    this.startTime = now;
    this.addState({
      state: startingState
    });
  }

  /**
   * Has the workflow completed? A workflow completes when:
   *
   * - explicit call to
   * - user shuts down browser / tab of Ember app
   * - timeout period is exceeded
   *
   * @readonly
   *
   * @memberOf LogWorkflowManage
   */
  get completed() {
    return Boolean(this._workflow[this._workflow.length - 1].completed);
  }

  addState(state: IWorkflowState) {
    this._workflow.push(state);
    this._updateQueue();
  }

  _updateQueue() {
    // TODO: implement
  }

}


export interface IWorkflowState {
  state: string;
  subState?: string;
  start?: number;
  stop?: number;
  completed?: boolean;
}
