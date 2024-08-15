import { type EntityCondition } from '@frmscoe/frms-coe-lib/lib/interfaces';

export const filterConditions = (conditions: EntityCondition[]): EntityCondition[] => {
  // Could move this in the filter, but we would then be comparing with different values per iteration
  const now = new Date();
  return conditions.filter((condition) => {
    if (condition.xprtnDtTm) {
      const dt = new Date(condition.xprtnDtTm);
      return now > dt;
    } else {
      return true; //condition has no expiry
    }
  });
};
