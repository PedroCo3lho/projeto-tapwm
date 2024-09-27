interface CardProdutosProps {
    nome_produto: string;
    imagem: string;
    preco_produto: number;
    qtd_produto: number;
  }
  
  const CardProdutos: React.FC<CardProdutosProps> = ({ nome_produto, imagem, preco_produto, qtd_produto }) => {
    return (
      <div>
        <a
          href="/produtos"
          className="block max-w-md rounded-lg overflow-hidden shadow-lg relative group"
        >
          <img
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            src={imagem}
            alt={`${nome_produto} Background`}
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-white text-2xl font-bold mb-4">Nome: {nome_produto}</h2>
            <h2 className="text-white text-lg mt-2">Quantidade: {qtd_produto}</h2>
            <p className="text-white text-lg mt-2">R$ {preco_produto.toFixed(2)}</p>
          </div>
        </a>
      </div>
    );
  };
  
  export default CardProdutos;
  