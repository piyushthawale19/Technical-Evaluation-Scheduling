export function toUtcDate(value: string | Date): Date {
  const date = value instanceof Date ? value : new Date(value);
  return new Date(date.toISOString());
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}
