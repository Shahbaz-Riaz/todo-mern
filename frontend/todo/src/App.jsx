import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, X, Tag, Flag } from 'lucide-react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('medium');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:5000/api/todos';

  const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Other'];
  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'high', label: 'High', color: 'bg-red-500' }
  ];

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch todos. Make sure the backend is running.');
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: input,
          category: selectedCategory || 'Other',
          priority: selectedPriority
        })
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setInput('');
      setSelectedCategory('');
      setSelectedPriority('medium');
      setError('');
    } catch (err) {
      setError('Failed to add todo');
    }
    setLoading(false);
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t._id === id);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed })
      });
      const updated = await response.json();
      setTodos(todos.map(t => t._id === id ? updated : t));
      setError('');
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(t => t._id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(e);
  };

  const getPriorityColor = (priority) => {
    const p = priorities.find(pr => pr.value === priority);
    return p ? p.color : 'bg-gray-500';
  };

  const filteredTodos = todos.filter(todo => {
    const categoryMatch = filterCategory === 'all' || todo.category === filterCategory;
    const priorityMatch = filterPriority === 'all' || todo.priority === filterPriority;
    return categoryMatch && priorityMatch;
  });

  const getCategoryStats = () => {
    const stats = {};
    todos.forEach(todo => {
      stats[todo.category] = (stats[todo.category] || 0) + 1;
    });
    return stats;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
            <h1 className="text-3xl font-bold text-white text-center">MERN Todo App</h1>
            <p className="text-white text-center mt-2 opacity-90">With Categories & Priorities</p>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
                <X className="w-5 h-5" />
                {error}
              </div>
            )}

            <div className="mb-6">
              <div className="space-y-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Add a new todo..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
                  disabled={loading}
                />
                
                <div className="flex gap-2 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <label className="text-xs text-gray-600 mb-1 block flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
                      disabled={loading}
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1 min-w-[200px]">
                    <label className="text-xs text-gray-600 mb-1 block flex items-center gap-1">
                      <Flag className="w-3 h-3" />
                      Priority
                    </label>
                    <select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
                      disabled={loading}
                    >
                      {priorities.map(p => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 flex items-center gap-2 self-end"
                  >
                    <Plus className="w-5 h-5" />
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter Todos</h3>
              <div className="flex gap-3 flex-wrap">
                <div className="flex-1 min-w-[150px]">
                  <label className="text-xs text-gray-600 mb-1 block">By Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat} ({getCategoryStats()[cat] || 0})</option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 min-w-[150px]">
                  <label className="text-xs text-gray-600 mb-1 block">By Priority</label>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
                  >
                    <option value="all">All Priorities</option>
                    {priorities.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {filteredTodos.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  {todos.length === 0 ? 'No todos yet. Add one above!' : 'No todos match your filters.'}
                </p>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo._id}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                  >
                    <button
                      onClick={() => toggleTodo(todo._id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                        todo.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-400 hover:border-green-500'
                      }`}
                    >
                      {todo.completed && <Check className="w-4 h-4 text-white" />}
                    </button>

                    <div className={`w-1 h-8 rounded-full ${getPriorityColor(todo.priority)}`} title={`Priority: ${todo.priority}`}></div>

                    <div className="flex-1 min-w-0">
                      <span
                        className={`block transition ${
                          todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                        }`}
                      >
                        {todo.text}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          <Tag className="w-3 h-3" />
                          {todo.category}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-xs text-white px-2 py-1 rounded ${getPriorityColor(todo.priority)}`}>
                          <Flag className="w-3 h-3" />
                          {todo.priority}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition flex-shrink-0"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {todos.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>
                    {filteredTodos.filter(t => !t.completed).length} of {filteredTodos.length} tasks remaining
                  </span>
                  <span>
                    Total: {todos.length} todos
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-white text-center mt-6 text-sm">
          Built with MongoDB, Express, React, and Node.js
        </p>
      </div>
    </div>
  );
}