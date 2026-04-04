'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Filter, ChevronLeft, ChevronRight, Loader2, ListTodo } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';

import TaskModal from '@/components/TaskModal';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'PENDING' | 'COMPLETED';
  dueDate?: string;
  createdAt: string;
}

export default function DashboardPage() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [state, setState] = useState({
    page: 1,
    totalPages: 1,
    search: '',
    status: '',
    loading: false,
    isModalOpen: false,
  });

  const fetchTasks = async () => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await api.get('/tasks', {
        params: {
          page: state.page,
          limit: 10,
          search: state.search,
          status: state.status,
        },
      });
      setTasks(response.data.tasks);
      setState((prev) => ({
        ...prev,
        totalPages: response.data.pagination.totalPages,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      toast.error('Failed to load tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [state.page, state.search, state.status]);

  const toggleTask = async (taskId: string) => {
    try {
      const res = await api.patch(`/tasks/${taskId}/toggle`);
      toast.success(
        res.data.status === 'COMPLETED' ? 'Task completed' : 'Task marked as pending'
      );
      fetchTasks();
    } catch (error) {
      toast.error('Failed to toggle task');
    }
  }

  const handleNewTask = async () => {
    setSelectedTask(null);
    setState((prev) => ({ ...prev, isModalOpen: true }));
  }

  const handleEditTask = async (task: Task) => {
    setSelectedTask(task);
    setState((prev) => ({ ...prev, isModalOpen: true }));
  }

  const deleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#3f51b5] tracking-tight">Your Tasks</h1>
            <p className="text-slate-500 mt-1">Manage and track your productivity</p>
          </div>

          <button
            onClick={handleNewTask}
            className="simple-button flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>

        {/* Filters & Search - Simple Line Design */}
        <div className="flex flex-wrap items-end gap-10">
          <div className="flex-1 min-w-[300px]">
            <label className="line-label">Search Tasks</label>
            <div className="flex items-center border-b border-slate-300 focus-within:border-indigo-600 transition-colors bg-white">
              <Search className="w-5 h-5 text-slate-400 mr-2 ml-1" />
              <input
                value={state.search}
                onChange={(e) => setState((prev) => ({ ...prev, search: e.target.value }))}
                placeholder="Find a task..."
                className="w-full bg-transparent border-none px-0 py-2 outline-none focus:ring-0 text-slate-800 placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>

          <div className="w-56">
            <label className="line-label">Status</label>
            <div className="relative border-b border-slate-300 focus-within:border-indigo-600 transition-colors bg-white">
              <select
                value={state.status}
                onChange={(e) => setState((prev) => ({ ...prev, status: e.target.value }))}
                className="w-full bg-transparent border-none px-2 py-2 outline-none focus:ring-0 text-slate-800 font-medium appearance-none"
              >
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <Filter className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {state.loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-[#3f51b5] animate-spin" />
              <p className="text-slate-500 font-medium">Loading tasks...</p>
            </div>
          ) : tasks?.length > 0 ? (
            <div className="flex flex-col gap-3">
              {tasks.map((task: Task) => (
                <div
                  key={task.id}
                  className={`p-4 flex items-center rounded-lg justify-between hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm
                      ${task.status === 'COMPLETED' ? 'bg-slate-50/50' : 'bg-white'
                     }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTask(task.id);
                      }}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${task.status === 'COMPLETED'
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-slate-300 hover:border-[#3f51b5]'
                        }`}
                    >
                      {task.status === 'COMPLETED' && <ListTodo className="w-3 h-3" />}
                    </button>
                    <div>
                      <h3 className={`font-semibold transition-all ${task.status === 'COMPLETED' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {task.title}
                      </h3>
                      {task.description && <p className="text-sm text-slate-500 line-clamp-1">{task.description}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTask(task);
                      }}
                      className="text-xs font-bold text-blue-500 hover:text-blue-700 uppercase tracking-tighter transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}
                      className="text-xs font-bold text-red-400 hover:text-red-600 uppercase tracking-tighter transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border-2 border-dashed border-slate-100 rounded-2xl">
              <ListTodo className="w-12 h-12 text-slate-200" />
              <p className="text-lg font-medium text-slate-400">No tasks found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {state.totalPages > 1 && (
          <div className="flex items-center justify-center gap-6 py-6 border-t">
            <button
              disabled={state.page === 1}
              onClick={() => setState((prev) => ({ ...prev, page: prev.page - 1 }))}
              className="text-[#3f51b5] font-bold disabled:opacity-30 p-2 hover:bg-slate-50 rounded-full transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              {state.page} / {state.totalPages}
            </span>
            <button
              disabled={state.page === state.totalPages}
              onClick={() => setState((prev) => ({ ...prev, page: prev.page + 1 }))}
              className="text-[#3f51b5] font-bold disabled:opacity-30 p-2 hover:bg-slate-50 rounded-full transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </main>

      <TaskModal
        isOpen={state.isModalOpen}
        onClose={() => setState((prev) => ({ ...prev, isModalOpen: false }))}
        task={selectedTask}
      />
    </div>
  );
}
