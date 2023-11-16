// DashboardPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/DashboardPage.css';
import { NavBar } from '../components/NavBar';


function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  const [editUser, setEditUser] = useState({ _id: null, username: '', email: '', password: '' });

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/register', {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
      });
      alert('Usuario agregado correctamente');
      fetchUsers();
      setNewUser({ username: '', email: '', password: '' });
    } catch (error) {
      console.error('Error al agregar usuario:', error.response.data);
      alert('Error al agregar usuario');
    }
  };

  const handleUpdateUser = async (id) => {
    if (id === null) {
      console.error('Error al actualizar usuario: _id es null');
      return;
    }
    console.log('Updating user with id:', id);

    try {
      const response = await axios.put(`http://localhost:4000/api/users/${id}`, {
        username: editUser.username,
        email: editUser.email,
        password: editUser.password,
      });
      alert('Usuario actualizado correctamente');
      fetchUsers();
      setEditUser({ _id: null, username: '', email: '', password: '' });
    } catch (error) {
      console.error('Error al actualizar usuario:', error.response.data);
      alert('Error al actualizar usuario');
    }
  };

  const handleDelete = async (userId) => {
    console.log('Deleting user with id:', userId);
    try {
      await axios.delete(`http://localhost:4000/api/users/${userId}`);
      alert('Usuario eliminado correctamente');
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error.response.data);
      alert('Error al eliminar usuario');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <NavBar />
      <div className='dashboard-container'>
        <div className='dashboard-card'>
          <h1 className='dashboard-title'>Mi Dashboard Personalizado</h1>
          <div className='form-container'>
            <input
              type='text'
              placeholder='Nombre de usuario'
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className='input-field'
            />
            <input
              type='email'
              placeholder='Email'
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className='input-field'
            />
            <input
              type='password'
              placeholder='Contraseña'
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className='input-field'
            />
            <button onClick={handleAddUser} className='action-button'>
              Agregar Usuario
            </button>
          </div>
          <table className='user-table'>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Email</th>
                <th>Contraseña</th>
                <th>Fecha de creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.createdAt}</td>
                  <td>
                    <button onClick={() => handleDelete(user._id)} className='delete-button'>
                      Eliminar
                    </button>
                    <button onClick={() => handleUpdateUser(user._id)} className='edit-button'>
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editUser._id !== null && (
            <div className='edit-form'>
              <h2>Editar Usuario</h2>
              <input
                type='text'
                placeholder='Nombre de usuario'
                value={editUser.username}
                onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                className='input-field'
              />
              <input
                type='email'
                placeholder='Email'
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                className='input-field'
              />
              <input
                type='password'
                placeholder='Contraseña'
                value={editUser.password}
                onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                className='input-field'
              />
              <button onClick={() => handleUpdateUser(editUser._id)} className='update-button'>
                Actualizar Usuario
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
