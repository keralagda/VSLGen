import { RegistryStore } from './RegistryStore';

export class PolicyEngine {
  /**
   * Validates if a shipment meets carrier policies and constraints
   */
  static evaluateShipmentPolicy(carrierId: string, shipmentData: Record<string, any>): { allowed: boolean; reason?: string } {
    const carrier = RegistryStore.get('carriers', carrierId) as any;
    if (!carrier) {
      return { allowed: false, reason: `Unknown carrier ID: ${carrierId}` };
    }

    // Weight checks
    const totalWeight = shipmentData.totalWeight || 0;
    if (carrierId === 'usps' && totalWeight > 70) {
      return { allowed: false, reason: 'USPS packages cannot exceed 70 lbs' };
    }

    return { allowed: true };
  }

  /**
   * Evaluates UI action policies based on role permissions
   */
  static isActionAllowed(role: string, actionKey: string): boolean {
    const permission = RegistryStore.get('permissions', role) as any;
    if (!permission) return false;

    if (actionKey === 'delete' && !permission.canDelete) {
      return false;
    }

    return true;
  }
}
