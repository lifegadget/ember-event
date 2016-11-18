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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3ctbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndvcmtmbG93LW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sZ0JBQWdCO0FBT3ZCO0lBT0UsWUFBWSxhQUFxQixFQUFFLFNBQW1CO1FBTjlDLGNBQVMsR0FBcUIsRUFBRSxDQUFDO1FBT3ZDLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNaLEtBQUssRUFBRSxhQUFhO1NBQ3JCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFhRCxJQUFJLFNBQVM7UUFDWCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFxQjtRQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELFlBQVk7SUFFWixDQUFDO0FBRUgsQ0FBQztBQUFBIn0=