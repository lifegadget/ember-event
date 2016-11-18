import './common-types';
import WorkflowManager from './workflow-manager';
import * as workflow from './workflow-manager';
import PerformanceMetric from './performance-metric';
import * as StackTrace from 'stacktrace-js';
import * as Ember from 'Ember';

const STACK_TRACE_LOG_LEVELS = ['warn', 'error'];
const STACK_START_DEPTH = 2;


export default class Logger {
  private workflows: WorkflowManager[]  = [];
  private perfMeasurements: PerformanceMetric[] = [];
  private userId: string;

  constructor() {
    // const browserTag = this.
  }

  loginUser(userId: string) {
    this.userId = userId;
  }

  /**
   * Adds a stacktrace to an incoming options hash before it is sent out to logging server.
   * You can optionally send in an Error object (ideal) or it will instead just take the
   * current call stack (minus the stack involved in getting here)
   */
  stackTrace(err: Error | null, incomingHash: IDictionary<any>, ): Promise<IDictionary<any>> {
    let hash = Object.assign({}, incomingHash);
    return new Promise( (resolve, reject) => {

      if(err) {
        StackTrace.fromError(err)
          .then(st => {
            hash['stack'] = st;
            return Promise.resolve(hash);
          })
          .then(resolve)
          .catch(reject);
      } else {
        StackTrace.get()
          .then(st => st.slice(STACK_START_DEPTH))
          .then(st => {
            hash['stack'] = st;
            return Promise.resolve(hash);
          })
          .then(resolve)
          .catch(reject);
      }

    });
  }

  log( messageOrError: string | Error, hash: IDictionary<any> ) {
    if (!hash['severity']) { hash['severity'] = 'info' };
    if (typeof messageOrError !== 'string') {
      hash = this.stackTrace(messageOrError, hash);
      hash['message'] = messageOrError.message;
    } else {
      if (STACK_TRACE_LOG_LEVELS.filter((s: string) => s === hash['severity']).length > 0 ) {
        hash = this.stackTrace(null, hash);
      }
      hash['message'] = messageOrError;
    }
    this.sendEvent('log')(hash);
  }

  sendEvent(type: string) {
    return (hash: IDictionary<any>) => {
      // TODO
    };
  }

  createWorkflow(startingPoint: string) {
    const wf = new WorkflowManager(startingPoint, this.sendEvent('workflow'));
    this.workflows.push(wf);
    return wf;
  }

  createMeasurement(metric: string, options: IDictionary<any>) {
    const perf = new PerformanceMetric(metric, options, this.sendEvent('performance'));
    this.perfMeasurements.push(perf);
    return perf;
  }

  exit() {
    // TODO
  }

}
