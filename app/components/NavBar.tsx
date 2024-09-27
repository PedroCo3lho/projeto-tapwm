import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-lg font-bold">Minha Loja</h1>
        <div className="flex space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/todo" className="hover:underline">Compras</Link>
          <Link href="/adicionar-produtos" className="hover:underline">Adicionar Produto</Link>
          <Link href="/produtos" className="hover:underline">Produtos</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
