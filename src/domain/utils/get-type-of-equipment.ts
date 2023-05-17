export const getTypeOfEquipment = (equipmentId: string): string => {
  if (equipmentId.startsWith('01-001')) {
    return 'desktop';
  } else if (equipmentId.startsWith('01-002')) {
    return 'monitor';
  } else if (equipmentId.startsWith('01-003')) {
    return 'telephone';
  } else if (equipmentId.startsWith('01-004')) {
    return 'notebook';
  } else if (equipmentId.startsWith('01-005')) {
    return 'vr';
  } else if (equipmentId.startsWith('01-010')) {
    return 'scanner';
  }

  return 'server';
};
