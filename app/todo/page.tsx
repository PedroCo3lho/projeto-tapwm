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
  const [loading, setLoading] = useState<boolean>(false);

  // Função para buscar todos os itens
  const fetchTodos = async () => {
    const { data, error } = await supabase.from('todos').select().order("created_at", { ascending: false });
    if (error) {
      console.error("Erro ao buscar itens:", error.message);
    } else {
      setTodos(data || []);
    }
  };

  useEffect(() => {
    fetchTodos(); // Busca a lista de itens quando o componente é montado
  }, []);

  // Função para adicionar um novo item
  const addTodo = async () => {
    if (!title.trim()) return; // Evita adicionar itens vazios
    setLoading(true);

    const { error } = await supabase.from('todos').insert([{ title }]);
    if (error) {
      console.error("Erro ao adicionar item:", error.message);
    } else {
      await fetchTodos(); // Atualiza a lista após adicionar
      setTitle(''); // Limpa o campo de input
    }

    setLoading(false);
  };

  // Função para deletar um item
  const deleteTodo = async (id: number) => {
    setLoading(true);

    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) {
      console.error("Erro ao deletar item:", error.message);
    } else {
      await fetchTodos(); // Atualiza a lista após deletar
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Lista de Compras</h1>
      
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Adicionar item"
          className="text-black flex-1 border rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTodo}
          className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Adicionando...' : 'Adicionar'}
        </button>
      </div>

      <ul className="space-y-3">
        {todos.length === 0 ? (
          <p className="text-gray-500">Nenhum item na lista.</p>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border-b border-gray-200">
              <span className="text-gray-700">{todo.title}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-800 transition-colors"
              >
                Deletar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoPage;
