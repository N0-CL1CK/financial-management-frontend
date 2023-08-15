import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="text-center p-6">
        <div className="mb-5">
          <p className="font-medium font">Seja bem vindo ao seu App de Gestão Financeira</p>
        </div>
        <div className="flex justify-between">
          <Link href='/signin' className="w-full bg-transparent border border-green-700 rounded py-2 mx-2 hover:bg-green-700 transition duration-500 ease-in-out">Entrar</Link>
          <Link href='/signup' className="w-full bg-transparent border border-blue-700 rounded py-2 mx-2 hover:bg-blue-700 transition duration-500 ease-in-out">Registrar-se</Link>
        </div>
      </div>
    </main>
  )
}
