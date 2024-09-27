"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text('Lista de Produtos', 20, 10);
    
    const tableColumn = ['Nome', 'Quantidade', 'Preço'];
    const tableRows: (string | number)[][] = [];

    products.forEach((product) => {
      const productData = [
        product.nome_produto,
        product.qtd_produto,
        `R$ ${product.preco_produto.toFixed(2)}`,
      ];
      tableRows.push(productData);
    });

    // Gerar a tabela no PDF
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('produtos.pdf');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Lista de Produtos</h1>
      <button
        onClick={exportPDF}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Exportar para PDF
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border-b border-r py-2 text-left text-black">Nome</th>
            <th className="border-b border-r py-2 text-left text-black">Quantidade</th>
            <th className="border-b py-2 text-left text-black">Preço</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b text-center">
              <td className="py-2 border-r text-black">{product.nome_produto}</td>
              <td className="py-2 border-r text-black">{product.qtd_produto}</td>
              <td className="py-2 text-black">R$ {product.preco_produto.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
