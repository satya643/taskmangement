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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md bg-white p-6 rounded shadow">

        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        <h2 className="mb-4 font-bold">
          {isEdit ? 'Edit Task' : 'New Task'}
        </h2>

        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">

          <input
            {...register('title', { required: 'Title required' })}
            placeholder="Title"
            className="simple-input"
          />

          <textarea
            {...register('description')}
            placeholder="Description"
            className="simple-input"
          />

          <input
            {...register('dueDate')}
            type="date"
            className="simple-input"
          />

          <div className="flex gap-2 items-center justify-center ">
            <button className='simple-button'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}