import { useAppStore } from '@/store/appStore';

export class CommandEngine {
  /**
   * Executes a system command payload asynchronously
   */
  static async executeCommand(commandName: string, payload: any): Promise<{ success: boolean; result?: any }> {
    const store = useAppStore.getState();

    switch (commandName) {
      case 'GenerateLabel':
        store.setCurrentLabel(payload);
        return { success: true, result: payload };

      case 'PrintLabel':
        store.printLabel(payload.id);
        return { success: true };

      case 'VoidLabel':
        store.voidLabel(payload.id, payload.reason);
        return { success: true };

      default:
        return { success: false, result: `Unknown system command: ${commandName}` };
    }
  }
}
