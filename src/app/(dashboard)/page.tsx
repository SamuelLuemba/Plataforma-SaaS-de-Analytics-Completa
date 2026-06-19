// src/app/dashboard/page.tsx
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-400 mt-2">
        Bem-vindo, {session?.user?.name || "Usuário"}!
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black/40 p-4 rounded-xl border border-white/10">
          <p className="text-sm text-gray-400">Total de Usuários</p>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="bg-black/40 p-4 rounded-xl border border-white/10">
          <p className="text-sm text-gray-400">Receita</p>
          <p className="text-2xl font-bold">R$ 12.340</p>
        </div>
        <div className="bg-black/40 p-4 rounded-xl border border-white/10">
          <p className="text-sm text-gray-400">Conversões</p>
          <p className="text-2xl font-bold">12.5%</p>
        </div>
      </div>
    </div>
  );
}