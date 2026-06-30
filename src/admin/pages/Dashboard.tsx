import React from 'react';
import { Users, FileText, BarChart, TrendingUp, AlertTriangle } from 'lucide-react';

export function Dashboard() {
  const stats = [
    { title: 'Pacientes Registrados', value: '142', icon: <Users size={24} className="text-[#7C3AED]" />, trend: '+12% este mes' },
    { title: 'Encuestas Completadas', value: '840', icon: <FileText size={24} className="text-blue-500" />, trend: '+54 esta semana' },
    { title: 'Promedio Nivel Cero Amor', value: '45.2', icon: <BarChart size={24} className="text-yellow-500" />, trend: '-2% respecto al mes pasado' },
    { title: 'Casos en Riesgo Crítico', value: '18', icon: <AlertTriangle size={24} className="text-red-500" />, trend: '+3 urgentes hoy' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-playfair font-bold text-[#07070F]">Dashboard Principal</h2>
        <p className="text-gray-500 mt-1">Resumen general de la plataforma Amor Ágape.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#F8F8FF] rounded-lg">
                {stat.icon}
              </div>
              <span className="text-2xl font-bold text-[#07070F]">{stat.value}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              <TrendingUp size={14} className="text-green-500" />
              {stat.trend}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold font-playfair mb-4">Actividad Reciente de Evaluaciones</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p className="text-gray-400 text-sm">Gráfico de actividad en desarrollo...</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold font-playfair mb-4">Alertas SOS Recientes</h3>
          <ul className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <li key={i} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="mt-0.5 p-1.5 bg-red-100 text-red-600 rounded-full">
                  <AlertTriangle size={14} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Paciente #{2040 + i} ha marcado riesgo crítico</p>
                  <p className="text-xs text-gray-500">Hace {i + 1} horas • Dominio 3 Activado</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
