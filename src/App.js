import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ContactList from './pages/ContactList';
import AddContact from './pages/AddContact';
import ContactDetail from './pages/ContactDetail';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      const saved = localStorage.getItem("gk_contacts");
      if (saved) {
        try {
          setContacts(JSON.parse(saved));
          setLoading(false);
          return;
        } catch (e) {
          console.error(e);
        }
      }

      try {
        const response = await axios.get("/data/contacts.json", {
          signal: controller.signal
        });
        setContacts(response.data);
        setLoading(false);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(true);
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("gk_contacts", JSON.stringify(contacts));
    }
  }, [contacts, loading]);

  const addContact = (newContact) => {
    setContacts(prev => [...prev, newContact]);
  };

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const toggleFavorite = (id) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, favorite: !c.favorite } : c));
  };

  if (loading) {
    return (
      <div className="container">
        <div className="navbar">
          <span className="nav-item">Trang chủ</span>
          <span className="nav-item">Danh sách</span>
          <span className="nav-item">Thêm mới</span>
        </div>
        <p>Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="navbar">
          <span className="nav-item">Trang chủ</span>
          <span className="nav-item">Danh sách</span>
          <span className="nav-item">Thêm mới</span>
        </div>
        <p>Không tải được dữ liệu</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home contacts={contacts} />} />
        <Route 
          path="contacts" 
          element={
            <ContactList 
              contacts={contacts} 
              onDelete={deleteContact} 
              onToggleFavorite={toggleFavorite} 
            />
          } 
        />
        <Route path="contacts/new" element={<AddContact contacts={contacts} onAdd={addContact} />} />
        <Route path="contacts/:id" element={<ContactDetail contacts={contacts} />} />
      </Route>
    </Routes>
  );
};

export default App;