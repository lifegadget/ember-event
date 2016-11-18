import './common-types';
import WorkflowManager from './workflow-manager';
import PerformanceMetric from './performance-metric';
import * as StackTrace from 'stacktrace-js';
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
        let hash = Object.assign({}, incomingHash);
        return new Promise((resolve, reject) => {
            if (err) {
                StackTrace.fromError(err)
                    .then(st => {
                    hash['stack'] = st;
                    return Promise.resolve(hash);
                })
                    .then(resolve)
                    .catch(reject);
            }
            else {
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
    log(messageOrError, hash) {
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
        this.sendEvent('log')(hash);
    }
    sendEvent(type) {
        return (hash) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLGdCQUFnQjtPQUNoQixlQUFlLE1BQU0sb0JBQW9CO09BRXpDLGlCQUFpQixNQUFNLHNCQUFzQjtPQUM3QyxLQUFLLFVBQVUsTUFBTSxlQUFlO0FBRzNDLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7QUFHNUI7SUFLRTtRQUpRLGNBQVMsR0FBdUIsRUFBRSxDQUFDO1FBQ25DLHFCQUFnQixHQUF3QixFQUFFLENBQUM7SUFLbkQsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFjO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFPRCxVQUFVLENBQUMsR0FBaUIsRUFBRSxZQUE4QjtRQUMxRCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTTtZQUVsQyxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNQLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO3FCQUN0QixJQUFJLENBQUMsRUFBRTtvQkFDTixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUNuQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0IsQ0FBQyxDQUFDO3FCQUNELElBQUksQ0FBQyxPQUFPLENBQUM7cUJBQ2IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25CLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixVQUFVLENBQUMsR0FBRyxFQUFFO3FCQUNiLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO3FCQUN2QyxJQUFJLENBQUMsRUFBRTtvQkFDTixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUNuQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0IsQ0FBQyxDQUFDO3FCQUNELElBQUksQ0FBQyxPQUFPLENBQUM7cUJBQ2IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25CLENBQUM7UUFFSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxHQUFHLENBQUUsY0FBOEIsRUFBRSxJQUFzQjtRQUN6RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsTUFBTSxDQUFBO1FBQUMsQ0FBQztRQUFBLENBQUM7UUFDckQsRUFBRSxDQUFDLENBQUMsT0FBTyxjQUFjLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUM7UUFDM0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sRUFBRSxDQUFDLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBUyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBRSxDQUFDLENBQUMsQ0FBQztnQkFDckYsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLENBQUM7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsY0FBYyxDQUFDO1FBQ25DLENBQUM7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBWTtRQUNwQixNQUFNLENBQUMsQ0FBQyxJQUFzQjtRQUU5QixDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsY0FBYyxDQUFDLGFBQXFCO1FBQ2xDLE1BQU0sRUFBRSxHQUFHLElBQUksZUFBZSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxNQUFjLEVBQUUsT0FBeUI7UUFDekQsTUFBTSxJQUFJLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNuRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsSUFBSTtJQUVKLENBQUM7QUFFSCxDQUFDO0FBQUEifQ==