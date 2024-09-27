"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Product {
  id: number;
  nome_produto: string;
  qtd_produto: number;
  preco_produto: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select();
      setProducts(data || []);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Lista de Produtos</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border-b py-2 text-black">Nome</th>
            <th className="border-b py-2 text-black">Quantidade</th>
            <th className="border-b py-2 text-black">Preço</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="border-b py-2 text-black text-center">
              <td>{product.nome_produto}</td>
              <td>{product.qtd_produto}</td>
              <td>{product.preco_produto.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
