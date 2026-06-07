import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Button, Input, Label, Badge } from '../../components/ui';
import { demoStudents, demoTutors } from '../../data/mockData';
import { useUiStore } from '../../store/uiStore';

const schema = z.object({
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  tutorName: z.string().min(1, 'Tutor name is required'),
  studentName: z.string().min(1, 'Student name is required'),
  weeklyFrequency: z.coerce.number().min(1).max(12)
});

type RecurrenceForm = z.infer<typeof schema>;

export function RecurringSessionsPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<RecurrenceForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      startDate: '2026-06-08',
      endDate: '2026-07-06',
      tutorName: demoTutors[0],
      studentName: demoStudents[0],
      weeklyFrequency: 1
    }
  });

  const showToast = useUiStore((state) => state.showToast);

  const onSubmit = (values: RecurrenceForm) => {
    showToast(`Weekly recurrence plan generated from ${values.startDate} to ${values.endDate} for student ${values.studentName} with tutor ${values.tutorName}.`, 'success');
  };

  return (
    <div className="space-y-6 p-6 lg:p-8 bg-slate-50">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Recurring Sessions</h1>
        <p className="text-sm text-slate-500 mt-1">Weekly recurrence generator and preview engine.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr] items-start">
        {/* Recurrence Generator Form */}
        <Card className="p-6">
          <h3 className="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-4 mb-4">
            Generator Settings
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" {...register('startDate')} />
              {errors.startDate && <p className="text-xs text-rose-600 font-semibold">{errors.startDate.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" {...register('endDate')} />
              {errors.endDate && <p className="text-xs text-rose-600 font-semibold">{errors.endDate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Tutor</Label>
              <input
                list="tutors"
                placeholder="Select tutor"
                className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none ring-0 placeholder:text-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                {...register('tutorName')}
              />
              <datalist id="tutors">
                {demoTutors.map((tutor) => <option key={tutor} value={tutor} />)}
              </datalist>
              {errors.tutorName && <p className="text-xs text-rose-600 font-semibold">{errors.tutorName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Student</Label>
              <input
                list="students"
                placeholder="Select student"
                className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none ring-0 placeholder:text-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                {...register('studentName')}
              />
              <datalist id="students">
                {demoStudents.map((student) => <option key={student} value={student} />)}
              </datalist>
              {errors.studentName && <p className="text-xs text-rose-600 font-semibold">{errors.studentName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Weekly Frequency (Sessions/Week)</Label>
              <Input type="number" min="1" max="12" {...register('weeklyFrequency')} />
              {errors.weeklyFrequency && <p className="text-xs text-rose-600 font-semibold">{errors.weeklyFrequency.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-white font-bold py-3 mt-4">
              Generate Weekly Recurrence
            </Button>
          </form>
        </Card>

        {/* Calendar Previews */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-4 mb-4">
              Preview Generated Instances
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {['Monday Instance', 'Tuesday Instance', 'Wednesday Instance', 'Thursday Instance'].map((day) => (
                <div key={day} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">{day}</div>
                  <div className="mt-2 text-xs font-semibold text-slate-500">Generated instance draft pending confirmation.</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-4 mb-4">
              Status Color Code Keys
            </h3>
            <div className="flex items-center gap-3">
              <Badge tone="primary">Scheduled</Badge>
              <Badge tone="success">Completed</Badge>
              <Badge tone="warning">Pending Billed</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}