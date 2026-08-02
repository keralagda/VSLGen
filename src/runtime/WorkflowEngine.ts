import { RegistryStore } from './RegistryStore';

export class WorkflowEngine {
  /**
   * Returns next valid stages for a document workflow state
   */
  static getNextStages(currentStage: string): string[] {
    const flow = RegistryStore.get('workflows', 'labelGeneration') as any;
    if (!flow || !flow.steps) return [];

    const index = flow.steps.indexOf(currentStage);
    if (index === -1 || index === flow.steps.length - 1) return [];

    return [flow.steps[index + 1]];
  }

  /**
   * Executes a workflow state transition event
   */
  static transitionStage(currentStage: string, targetStage: string): { success: boolean; nextStage: string } {
    const nextStages = this.getNextStages(currentStage);
    if (nextStages.includes(targetStage)) {
      return { success: true, nextStage: targetStage };
    }
    return { success: false, nextStage: currentStage };
  }
}
