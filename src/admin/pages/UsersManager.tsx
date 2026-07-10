import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Shield, X, Edit2, Trash2, AlertTriangle } from 'lucide-react';

export function UsersManager() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'CLIENT' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleNewClick = () => {
    setSelectedUser(null);
    setFormData({ name: '', email: '', password: '', role: 'CLIENT' });
    setShowModal(true);
  };

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      password: '',
      role: user.role
    });
    setShowModal(true);
  };

  const handleDeleteClick = (user: any) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const handleSubmitUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const isEditing = !!selectedUser;
      const url = isEditing ? `/api/users/${selectedUser.id}` : '/api/users';
      const method = isEditing ? 'PUT' : 'POST';

      const payload: any = { ...formData };
      if (isEditing && !payload.password) {
        delete payload.password;
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowModal(false);
        setSelectedUser(null);
        setFormData({ name: '', email: '', password: '', role: 'CLIENT' });
        fetchUsers();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Error al guardar el usuario');
      }
    } catch(e) {
      console.error(e);
      alert('Fallo de red al guardar el usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/users/${userToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setShowDeleteConfirm(false);
        setUserToDelete(null);
        fetchUsers();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Error al eliminar usuario');
      }
    } catch(e) {
      console.error(e);
      alert('Error de red al eliminar usuario');
    }
  };

  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      (user.name && user.name.toLowerCase().includes(query)) ||
      (user.email && user.email.toLowerCase().includes(query))
    );
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-[#07070F]">Directorio de Usuarios</h2>
          <p className="text-gray-500 mt-1">Administra los accesos de pacientes y personal de la clínica.</p>
        </div>
        <button 
          onClick={handleNewClick}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer"
        >
          <UserPlus size={18} />
          Registrar Usuario
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o correo..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
              <th className="px-6 py-4 font-medium">Nombre Completo</th>
              <th className="px-6 py-4 font-medium">Correo Electrónico</th>
              <th className="px-6 py-4 font-medium">Rol</th>
              <th className="px-6 py-4 font-medium">Fecha de Registro</th>
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">Cargando directorio...</td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">No se encontraron usuarios.</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[#07070F] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E5E7EB] flex items-center justify-center text-sm font-bold text-gray-600">
                      {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    {user.name || 'Sin nombre'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    {user.role === 'ADMIN' ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-[#7C3AED] bg-[#F3F4F6] px-2 py-1 rounded-full w-fit">
                        <Shield size={12} /> Administrador
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full w-fit">
                        Paciente
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEditClick(user)}
                        className="p-1.5 text-gray-400 hover:text-[#7C3AED] transition-colors rounded-lg hover:bg-gray-100 cursor-pointer"
                        title="Editar Usuario"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(user)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-100 cursor-pointer"
                        title="Eliminar Usuario"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold">{selectedUser ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</h3>
              <button onClick={() => { setShowModal(false); setSelectedUser(null); }} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmitUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none"
                >
                  <option value="CLIENT">Paciente (Cliente)</option>
                  <option value="ADMIN">Administrador (Clínico)</option>
                </select>
              </div>
              
              {formData.role === 'ADMIN' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña {selectedUser && '(Opcional)'}
                  </label>
                  <input 
                    required={!selectedUser}
                    type="password" 
                    value={formData.password}
                    placeholder={selectedUser ? 'Dejar en blanco para no cambiar' : ''}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Los pacientes no requieren contraseña en el simulador inicial.</p>
                </div>
              )}

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => { setShowModal(false); setSelectedUser(null); }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg transition-colors font-medium disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? 'Guardando...' : selectedUser ? 'Guardar Cambios' : 'Registrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && userToDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertTriangle size={24} />
                <h3 className="text-xl font-bold">¿Eliminar Usuario?</h3>
              </div>
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que deseas eliminar permanentemente a <strong>{userToDelete.name || userToDelete.email}</strong>? Esta acción no se puede deshacer y borrará todos sus resultados asociados.
              </p>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => { setShowDeleteConfirm(false); setUserToDelete(null); }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleDeleteUser}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
