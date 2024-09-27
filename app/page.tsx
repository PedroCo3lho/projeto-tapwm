"use client";
import Image from "next/image";
import CardProdutos from "./components/CardProdutos";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface Product {
  id: number;
  nome_produto: string;
  qtd_produto: number;
  preco_produto: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select();
      setProducts(data || []);
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl">Lista de Produtos em Cards</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <CardProdutos
              key={product.id}
              nome_produto={product.nome_produto}
              imagem="https://via.placeholder.com/600x400"
              qtd_produto={product.qtd_produto}
              preco_produto={product.preco_produto}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
