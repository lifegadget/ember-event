import './common-types';
import WorkflowManager from './workflow-manager';
import PerformanceMetric from './performance-metric';
export default class Logger {
    private workflows;
    private perfMeasurements;
    private userId;
    constructor();
    loginUser(userId: string): void;
    stackTrace(err: Error | null, incomingHash: IDictionary<any>): Promise<IDictionary<any>>;
    log(messageOrError: string | Error, hash: IDictionary<any>): void;
    sendEvent(type: string): (hash: IDictionary<any>) => void;
    createWorkflow(startingPoint: string): WorkflowManager;
    createMeasurement(metric: string, options: IDictionary<any>): PerformanceMetric;
    exit(): void;
}
