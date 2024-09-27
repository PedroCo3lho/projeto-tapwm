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
    <div className="container mx-auto p-2/5 w-3/5">
      <h1 className="text-2xl mb-4 font-bold text-gray-700">Lista de Produtos</h1>
      <button
        onClick={exportPDF}
        className="mb-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Exportar para PDF
      </button>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <div className="table w-full bg-white">
            <div className="table-header-group">
              <div className="table-row bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <div className="table-cell text-left font-bold py-3 px-6">Nome</div>
                <div className="table-cell text-left font-bold py-3 px-6">Quantidade</div>
                <div className="table-cell text-left font-bold py-3 px-6">Preço</div>
              </div>
            </div>
            <div className="table-row-group">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="table-row bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <div className="table-cell py-3 px-6 border-b">{product.nome_produto}</div>
                  <div className="table-cell py-3 px-6 border-b">{product.qtd_produto}</div>
                  <div className="table-cell py-3 px-6 border-b">R$ {product.preco_produto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
