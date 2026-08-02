export class ExpressionEngine {
  /**
   * Evaluates dynamic algebraic expressions like "{{length * width * height}}" against standard data model
   */
  static evaluate(expression: string, context: Record<string, any>): any {
    // 1. Resolve variable paths
    const resolved = expression.replace(/\{\{([^}]+)\}\}/g, (_, path) => {
      const parts = path.trim().split('.');
      let current: any = context;
      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          return '0';
        }
      }
      return String(current ?? '0');
    });

    // 2. Safely evaluate simple math/logical statements without eval
    try {
      if (/^[0-9\s.+\-*/()]+$/.test(resolved)) {
        // Safe math calculator
        const fn = new Function(`return (${resolved});`);
        return fn();
      }
      return resolved;
    } catch {
      return resolved;
    }
  }
}
