"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

const AddProductPage = () => {
  const [nomeProduto, setNomeProduto] = useState<string>("");
  const [qtdProduto, setQtdProduto] = useState<number>();
  const [precoProduto, setPrecoProduto] = useState<number>(0.0);

  const addProduct = async () => {
    await supabase
      .from("products")
      .insert([
        {
          nome_produto: nomeProduto,
          qtd_produto: qtdProduto,
          preco_produto: precoProduto,
        },
      ]);
    setNomeProduto("");
    setQtdProduto(0);
    setPrecoProduto(0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Adicionar Produto</h1>
      <label>Nome do Produto</label>
      <input
        type="text"
        value={nomeProduto}
        onChange={(e) => setNomeProduto(e.target.value)}
        placeholder="Nome do Produto"
        className="border p-2 mb-2 w-full text-black"
      />
      <label>Quantidade</label>
      <input
        type="number"
        value={qtdProduto}
        onChange={(e) => setQtdProduto(Number(e.target.value))}
        placeholder="Quantidade"
        className="border p-2 mb-2 w-full text-black"
      />
      <label>Preço</label>
      <input
        type="number"
        step="0.01"
        value={precoProduto}
        onChange={(e) => setPrecoProduto(Number(e.target.value))}
        placeholder="Preço"
        className="border p-2 mb-2 w-full text-black"
      />
      <button onClick={addProduct} className="bg-green-500 text-white p-2">
        Adicionar Produto
      </button>
    </div>
  );
};

export default AddProductPage;
