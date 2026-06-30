import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ChevronRight, Settings } from 'lucide-react';

interface Survey {
  id: string;
  name: string;
  description: string;
}

export function SurveysManager() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando fetch de base de datos
    setTimeout(() => {
      setSurveys([
        { id: '1', name: 'Autoviolentómetro: Cero Amor', description: 'Cuestionario oficial de 62 preguntas dividido en 3 dominios.' },
        { id: '2', name: 'Violentómetro Paternal', description: 'Versión adaptada para figuras parentales.' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-[#07070F]">Gestión de Violentómetros</h2>
          <p className="text-gray-500 mt-1">Configura las encuestas, sus categorías, dimensiones y sistema de calificación.</p>
        </div>
        <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <Plus size={18} />
          Nuevo Violentómetro
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando violentómetros...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="px-6 py-4 font-medium">Nombre de la Encuesta</th>
                <th className="px-6 py-4 font-medium">Descripción</th>
                <th className="px-6 py-4 font-medium">Preguntas</th>
                <th className="px-6 py-4 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map((survey) => (
                <tr key={survey.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[#07070F]">{survey.name}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm max-w-md truncate">{survey.description}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">62 reactivos</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="text-gray-400 hover:text-[#7C3AED] transition-colors" title="Editar Detalles">
                        <Edit2 size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-[#7C3AED] transition-colors" title="Configurar Especificaciones (Dominios, Zonas)">
                        <Settings size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500 transition-colors" title="Eliminar">
                        <Trash2 size={18} />
                      </button>
                      <button className="text-[#7C3AED] hover:text-[#6D28D9] transition-colors flex items-center gap-1 text-sm font-medium ml-4">
                        Ver Preguntas <ChevronRight size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Sección informativa sobre cómo se relaciona con el SDK */}
      <div className="mt-8 bg-[#F8F8FF] border border-[#C4B5FD] rounded-xl p-6 text-sm text-gray-700">
        <h4 className="font-bold text-[#7C3AED] flex items-center gap-2 mb-2">
          <Settings size={18} /> Especificaciones del SDK y SDD
        </h4>
        <p>
          Las especificaciones (Categorías, Dimensiones, Dominios) y los niveles (0-30, Zonas de Riesgo) que configures aquí, 
          se utilizarán automáticamente para generar la matriz de resultados de los pacientes y definir los caminos lógicos 
          del motor de la encuesta (como el salto adaptativo y el protocolo SOS para el Dominio 3).
        </p>
      </div>
    </div>
  );
}
