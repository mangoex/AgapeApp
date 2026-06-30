import React, { useState, useEffect } from 'react';
import { Search, Filter, Printer, Download, Eye, X } from 'lucide-react';
import { SURVEY_QUESTIONS } from '../../../src/data'; // Ensure we can lookup questions

export function ResultsViewer() {
  const [results, setResults] = useState<any[]>([]);
  const [selectedResult, setSelectedResult] = useState<any>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch('/api/results', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if(Array.isArray(data)) setResults(data);
      } catch (e) {
        console.error("Failed to load results", e);
      }
    };
    fetchResults();
  }, []);

  const getZoneBadge = (zone: string) => {
    switch (zone) {
      case 'Verde': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Verde</span>;
      case 'Amarilla': return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">Amarilla</span>;
      case 'Roja': return <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">Roja</span>;
      case 'Crítica': return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">Crítica (SOS)</span>;
      default: return null;
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-[#07070F]">Resultados de Encuestas</h2>
          <p className="text-gray-500 mt-1">Evalúa y analiza las respuestas de los clientes en tiempo real.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Download size={18} /> Exportar CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por paciente o folio..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 bg-white hover:bg-gray-50 transition-colors">
            <Filter size={18} /> Filtrar
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
              <th className="px-6 py-4 font-medium">Folio / Fecha</th>
              <th className="px-6 py-4 font-medium">Paciente</th>
              <th className="px-6 py-4 font-medium">Violentómetro</th>
              <th className="px-6 py-4 font-medium">Puntaje Total</th>
              <th className="px-6 py-4 font-medium">Zona de Riesgo</th>
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res) => (
              <tr key={res.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-[#07070F]">#{res.id.substring(0,8)}</p>
                  <p className="text-xs text-gray-500">{new Date(res.createdAt).toLocaleDateString()}</p>
                </td>
                <td className="px-6 py-4 font-medium text-gray-700">{res.user?.name}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{res.survey?.name}</td>
                <td className="px-6 py-4 font-bold text-gray-800">{res.score} pts</td>
                <td className="px-6 py-4">{getZoneBadge(res.zone)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => setSelectedResult(res)} className="text-gray-400 hover:text-[#7C3AED] transition-colors" title="Ver Detalles">
                      <Eye size={18} />
                    </button>
                    <button className="text-gray-400 hover:text-[#7C3AED] transition-colors" title="Imprimir Reporte">
                      <Printer size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Visor Detallado */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold">Detalle Clínico - {selectedResult.user?.name}</h3>
                <p className="text-sm text-gray-500">{selectedResult.user?.email} • {new Date(selectedResult.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedResult(null)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-500">Puntaje Total</p>
                  <p className="text-3xl font-black">{selectedResult.score} <span className="text-lg text-gray-400 font-normal">pts</span></p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-500">Zona de Riesgo Diagnosticada</p>
                  <div className="mt-1">{getZoneBadge(selectedResult.zone)}</div>
                </div>
              </div>

              <h4 className="font-bold text-gray-800 mb-4">Desglose de Respuestas</h4>
              <div className="space-y-3">
                {selectedResult.answers && Object.entries(selectedResult.answers).map(([qId, val]) => {
                  const q = SURVEY_QUESTIONS.find(sq => sq.id === qId);
                  return (
                    <div key={qId} className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-[#7C3AED] uppercase">ID: {qId}</span>
                        <p className="text-gray-800 text-sm font-medium mt-1">"{q?.pregunta || 'Pregunta no encontrada'}"</p>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <span className="inline-block px-3 py-1 bg-gray-100 rounded font-mono font-bold text-gray-600">
                          {val} pts
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
