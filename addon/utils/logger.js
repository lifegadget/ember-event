import './common-types';
import WorkflowManager from './workflow-manager';
import PerformanceMetric from './performance-metric';
import * as Ember from 'ember';
const STACK_TRACE_LOG_LEVELS = ['warn', 'error'];
const STACK_START_DEPTH = 2;
export default class Logger {
    constructor() {
        this.workflows = [];
        this.perfMeasurements = [];
    }
    loginUser(userId) {
        this.userId = userId;
    }
    stackTrace(err, incomingHash) {
        return Promise.resolve(incomingHash);
    }
    log(messageOrError, hash) {
        console.log('logging', messageOrError, hash);
        if (!hash['severity']) {
            hash['severity'] = 'info';
        }
        ;
        if (typeof messageOrError !== 'string') {
            hash = this.stackTrace(messageOrError, hash);
            hash['message'] = messageOrError.message;
        }
        else {
            if (STACK_TRACE_LOG_LEVELS.filter((s) => s === hash['severity']).length > 0) {
                hash = this.stackTrace(null, hash);
            }
            hash['message'] = messageOrError;
        }
        this.sendEvent('log')(Object.assign({ message: messageOrError }, hash));
    }
    sendEvent(type) {
        return (hash) => {
            console.log('sending event', hash);
            Ember.$.ajax({
                type: 'POST',
                url: 'https://m21x9qbpyi.execute-api.eu-west-1.amazonaws.com/dev/logger',
                contentType: 'application/json; charset=utf-8',
                contents: hash
            });
        };
    }
    createWorkflow(startingPoint) {
        const wf = new WorkflowManager(startingPoint, this.sendEvent('workflow'));
        this.workflows.push(wf);
        return wf;
    }
    createMeasurement(metric, options) {
        const perf = new PerformanceMetric(metric, options, this.sendEvent('performance'));
        this.perfMeasurements.push(perf);
        return perf;
    }
    exit() {
    }
}
