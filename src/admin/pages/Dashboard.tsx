import React, { useState, useEffect } from 'react';
import { Users, FileText, BarChart, TrendingUp, AlertTriangle, ChevronDown, Settings, Search, Bell, Star, ArrowRight } from 'lucide-react';

export function Dashboard() {
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch('/api/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.status === 401 || res.status === 400) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          window.location.href = '/admin/login';
          return;
        }
        const data = await res.json();
        setStatsData(data);
      } catch(e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-[#F8F9FC] min-h-screen text-[#07070F] font-inter">
      {/* 1. Cabecera de Navegación Superior Estilo CareOps */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Clínica Central Ágape</span>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
          <button className="text-sm font-semibold text-[#7C3AED] hover:underline flex items-center gap-1">
            + Añadir Sucursal
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Barra de Búsqueda */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar pacientes..." 
              className="w-full pl-9 pr-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] text-sm"
            />
          </div>

          {/* Notificaciones */}
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative cursor-pointer">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#7C3AED] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">4</span>
          </button>

          {/* Perfil del Administrador */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] font-bold flex items-center justify-center text-sm border border-[#7C3AED]/20">
              A
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800 leading-none">Dra. Alice H.</p>
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Super admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* 2. Título de Operaciones con Controles */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black font-playfair tracking-tight text-gray-900">Panel de Operaciones Clínicas</h1>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">Métricas de Evaluación de Autoviolencia y Salud Mental</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3.5 py-1.5 rounded-lg shadow-sm text-sm font-semibold cursor-pointer hover:bg-gray-50">
              <span>Esta semana</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
            <button className="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg shadow-sm cursor-pointer" title="Configuración del Dashboard">
              <Settings size={18} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* 3. Fila de 5 Métricas Clave (Estilo Fila CareOps) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Métrica 1: Pacientes Activos */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pacientes Activos</p>
              <h3 className="text-2xl font-black text-gray-900">{loading ? '-' : statsData?.patients}</h3>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-green-600 font-semibold mt-4">
              <TrendingUp size={14} />
              <span>+3.2% vs semana anterior</span>
            </div>
          </div>

          {/* Métrica 2: Evaluaciones Realizadas */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Evaluaciones</p>
              <h3 className="text-2xl font-black text-gray-900">{loading ? '-' : statsData?.completedSurveys}</h3>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-green-600 font-semibold mt-4">
              <TrendingUp size={14} />
              <span>+4.1% vs semana anterior</span>
            </div>
          </div>

          {/* Métrica 3: Puntaje Promedio */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Puntaje Promedio</p>
              <h3 className="text-2xl font-black text-gray-900">{loading ? '-' : `${statsData?.averageScore} pts`}</h3>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-green-600 font-semibold mt-4">
              <TrendingUp size={14} />
              <span>+2% vs semana anterior</span>
            </div>
          </div>

          {/* Métrica 4: Casos Críticos / SOS */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Casos SOS</p>
              <h3 className="text-2xl font-black text-red-600 flex items-center gap-2">
                <AlertTriangle size={20} className="animate-pulse" />
                {loading ? '-' : statsData?.sosAlerts}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-red-600 font-semibold mt-4">
              <TrendingUp size={14} />
              <span>+8% casos de alto riesgo</span>
            </div>
          </div>

          {/* Métrica 5: Eficacia / Completados */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tasa de Conclusión</p>
              <h3 className="text-2xl font-black text-gray-900">82.1%</h3>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-green-600 font-semibold mt-4">
              <TrendingUp size={14} />
              <span>+5% de retención clínica</span>
            </div>
          </div>
        </div>

        {/* 4. Fila Central (Carga de Alertas y Desempeño de Facilitadores) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Carga de Alertas Clínicas por Día */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold font-playfair text-gray-900">Carga Semanal de Alertas SOS</h3>
              <p className="text-xs text-gray-400 mt-1">Registros diarios de emergencias e intervenciones activadas.</p>
            </div>
            
            {/* Gráfico de Barras CSS Puro */}
            <div className="h-64 flex items-end justify-between px-4 pt-8">
              {[
                { day: 'Lun', height: 'h-[30%]' },
                { day: 'Mar', height: 'h-[65%]' },
                { day: 'Mié', height: 'h-[50%]' },
                { day: 'Jue', height: 'h-[40%]' },
                { day: 'Vie', height: 'h-[80%]' },
                { day: 'Sáb', height: 'h-[25%]' },
              ].map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 w-12 h-full justify-end group">
                  <div className="w-6 bg-purple-50 hover:bg-purple-100 rounded-full h-full relative overflow-hidden transition-colors flex items-end justify-center shadow-inner border border-purple-100/50">
                    <div className={`w-full bg-[#7C3AED] rounded-full absolute bottom-0 transition-all duration-500 ${bar.height} group-hover:bg-[#6D28D9]`}></div>
                  </div>
                  <span className="text-xs font-semibold text-gray-500">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desempeño de Facilitadores / Médicos */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold font-playfair text-gray-900">Desempeño de Facilitadores</h3>
                <p className="text-xs text-gray-400 mt-1">Seguimiento de sesiones y calificación en intervenciones.</p>
              </div>
              <button className="text-xs font-bold text-[#7C3AED] hover:underline">Ver Todos</button>
            </div>

            {/* Listado de Facilitadores */}
            <div className="space-y-4">
              {[
                { name: 'Dra. Alisha Richards', role: 'Psicóloga Clínica', appointments: 38, rating: 4.6, init: 'AR' },
                { name: 'Dr. Andrew Piters', role: 'Terapeuta de Pareja', appointments: 22, rating: 4.8, init: 'AP' },
                { name: 'Dra. Maria Weber', role: 'Psicoterapeuta Familiar', appointments: 18, rating: 4.9, init: 'MW' },
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50/50 hover:bg-gray-50 rounded-xl border border-gray-100/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] font-bold flex items-center justify-center text-xs border border-[#7C3AED]/20">
                      {doc.init}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">{doc.name}</h4>
                      <p className="text-[11px] text-gray-400 font-semibold uppercase">{doc.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-800">{doc.appointments} Sesiones</p>
                    <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold justify-end mt-1">
                      <Star size={12} fill="currentColor" />
                      <span>{doc.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Banner de Productividad Semanal */}
            <div className="mt-4 bg-[#F8F8FF] border border-[#7C3AED]/20 rounded-xl p-3 flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]"></span>
                <span>Terapeutas completaron <strong>78</strong> sesiones esta semana</span>
              </div>
              <ArrowRight size={14} className="text-[#7C3AED]" />
            </div>
          </div>
        </div>

        {/* 5. Fila Inferior (Zonas de Riesgo y Eficacia de Departamentos) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distribución por Zonas de Riesgo */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold font-playfair text-gray-900">Distribución de Pacientes por Riesgo</h3>
              <p className="text-xs text-gray-400 mt-1">Clasificación clínica de pacientes basada en su evaluación diagnóstica.</p>
            </div>

            {/* Distribución y Progress Bars */}
            <div className="space-y-4">
              {[
                { name: 'Zona Crítica (SOS)', pct: 34, color: 'bg-red-500', count: '285 pacientes' },
                { name: 'Zona Roja (Severa)', pct: 22, color: 'bg-orange-500', count: '185 pacientes' },
                { name: 'Zona Amarilla (Moderada)', pct: 14, color: 'bg-amber-500', count: '118 pacientes' },
                { name: 'Zona Verde (Autoamor)', pct: 12, color: 'bg-emerald-500', count: '100 pacientes' },
                { name: 'Pendientes de Diagnóstico', pct: 6, color: 'bg-gray-400', count: '50 pacientes' },
              ].map((zone, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-700">{zone.name}</span>
                    <div className="flex gap-2 text-gray-400">
                      <span>{zone.count}</span>
                      <strong className="text-gray-800">{zone.pct}%</strong>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className={`${zone.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${zone.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Efectividad de Tratamientos / Departamentos */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold font-playfair text-gray-900">Efectividad de Programas</h3>
                <p className="text-xs text-gray-400 mt-1">Evaluación de la tasa de mejora clínica de las recomendaciones recomendadas.</p>
              </div>
              <button className="text-xs font-bold text-[#7C3AED] hover:underline">Ver Todos</button>
            </div>

            {/* Programa Destacado: Cardiología -> Terapia Cognitivo-Conductual (TCC) */}
            <div className="space-y-6 mt-4">
              <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100/60">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                    <ActivityIcon size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">Terapia Cognitivo-Conductual (TCC)</h4>
                    <p className="text-[11px] text-gray-400 font-semibold uppercase">Programa de Autocompasión</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg">Impacto: +$68k</span>
                  <p className="text-[11px] text-gray-400 mt-1">Uso Clínico: <strong>80%</strong></p>
                </div>
              </div>

              {/* Indicador de Líneas del 80% */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-500">Intensidad y Frecuencia de Recuperación</span>
                  <span className="font-bold text-gray-800">80% de éxito clínico</span>
                </div>
                {/* 30 líneas de progreso */}
                <div className="flex gap-1 items-center justify-between">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const isActive = i < 24; // 80% of 30 is 24
                    return (
                      <span 
                        key={i} 
                        className={`w-1 h-6 rounded-full transition-all ${isActive ? 'bg-emerald-500 shadow-sm' : 'bg-gray-100'}`}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 font-bold px-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>80%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Simple placeholder icon
function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
