import React, { useState, useEffect } from 'react';
import './Dahboard.css';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', category: '', expires: '' });

  useEffect(() => {
    setItems([
      { id: 1, name: 'Tomato', category: 'Vegetables', expires: '2024-03-28' },
      { id: 2, name: 'Chicken', category: 'Meat', expires: '2024-03-25' },
      { id: 3, name: 'Milk', category: 'Dairy', expires: '2024-03-30' },
    ]);
  }, []);

  const getDaysRemaining = (expDate) => {
    const diff = new Date(expDate) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (editMode) {
      setItems(items.map(item => item.id === editMode ? { ...newItem, id: editMode } : item));
      setEditMode(null);
    } else {
      const newId = items.length ? items[items.length - 1].id + 1 : 1;
      setItems([...items, { ...newItem, id: newId }]);
    }
    setNewItem({ name: '', category: '', expires: '' });
  };

  const handleEdit = (item) => {
    setEditMode(item.id);
    setNewItem({ name: item.name, category: item.category, expires: item.expires });
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Pantry Dashboard</h1>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </header>
      <form onSubmit={handleAddItem} className="item-form">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <select
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Meat">Meat</option>
          <option value="Dairy">Dairy</option>
        </select>
        <input
          type="date"
          value={newItem.expires}
          onChange={(e) => setNewItem({ ...newItem, expires: e.target.value })}
          required
        />
        <button type="submit">{editMode ? 'Update' : 'Add'} Item</button>
      </form>
      <div className="pantry-items">
        <h2>Your Pantry</h2>
        <div className="item-list">
          {filteredItems.map((item) => (
            <div key={item.id} className={`item-card ${getDaysRemaining(item.expires) <= 3 ? 'expiring' : ''}`}>
              <h3>{item.name}</h3>
              <p>Category: {item.category}</p>
              <p>Expires in: {getDaysRemaining(item.expires)} days</p>
              <div className="actions">
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
