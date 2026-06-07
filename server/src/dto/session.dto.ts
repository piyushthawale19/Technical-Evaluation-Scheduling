export type CreateSessionDto = {
  organizationId: string;
  studentName: string;
  tutorId: string;
  startTime: string;
  endTime: string;
  timezone: string;
  status: "scheduled" | "completed" | "billed" | "unbilled";
  recurrenceRuleId?: string;
};

export type UpdateSessionDto = Partial<CreateSessionDto>;
