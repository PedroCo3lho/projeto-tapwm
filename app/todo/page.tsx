"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface Todo {
  id: number;
  title: string;
}

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await supabase.from('todos').select();
      setTodos(data || []);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const { data } = await supabase.from('todos').insert([{ title }]);
    if (data) {
      setTodos([...todos, ...data]);
      setTitle('');
    }
  };

  const deleteTodo = async (id: number) => {
    await supabase.from('todos').delete().eq('id', id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Lista de Compras</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Adicionar item"
        className="border p-2 mr-2"
      />
      <button onClick={addTodo} className="bg-blue-500 text-white p-2">Adicionar</button>

      <ul className="mt-4">
        {todos.map(todo => (
          <li key={todo.id} className="flex justify-between items-center border-b py-2">
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)} className="text-red-500">Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
