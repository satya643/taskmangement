'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';

export default function TaskModal({ isOpen, onClose, task }: any) {
  const isEdit = !!task;
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { title: '', description: '', dueDate: '' }
  });

  // ✅ fill form when editing
  useEffect(() => {
    if (!isOpen) return;

    reset(
      task
        ? {
          title: task.title,
          description: task.description || '',
          dueDate: task.dueDate
            ? new Date(task.dueDate).toISOString().split('T')[0]
            : '',
        }
        : { title: '', description: '', dueDate: '' }
    );
  }, [task, isOpen]);

  const handleSubmitForm = async (data: any) => {
    setLoading(true);

    try {
      if (isEdit) {
        await api.patch(`/tasks/${task.id}`, data);
        toast.success('Task Updated Successfully');
      } else {
        await api.post('/tasks', data);
        toast.success('Task Created Successfully');
      }

      reset();
      onClose();

      window.location.reload(); // simple refresh

    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 z-[100] animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white p-6 rounded-xl shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">

        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition-colors">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-[#3f51b5] tracking-tight mb-6">
          {isEdit ? 'Edit Task' : 'New Task'}
        </h2>

        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-5">

          <div>
            <label className="line-label">Task Title</label>
            <input
              {...register('title', { required: 'Title required' })}
              placeholder="What needs to be done?"
              className="line-input text-sm py-1.5"
            />
            {errors.title && <span className="text-red-500 text-xs mt-1 block font-medium">{errors.title.message as string}</span>}
          </div>

          <div>
            <label className="line-label">Description (Optional)</label>
            <textarea
              {...register('description')}
              placeholder="Add some details..."
              className="line-input resize-none text-sm py-1.5"
              rows={2}
            />
          </div>

          <div>
            <label className="line-label">Due Date (Optional)</label>
            <input
              {...register('dueDate')}
              type="date"
              className="line-input text-slate-600 bg-transparent text-sm py-1.5"
            />
          </div>

          <div className="pt-2">
            <button type="submit" disabled={loading} className="simple-button w-full py-2 text-sm">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto"/> : (isEdit ? 'Save Changes' : 'Create Task')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}