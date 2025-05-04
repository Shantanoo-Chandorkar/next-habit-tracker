'use client';
import React, { useState, useEffect } from 'react';
import styles from './styles/newCateogryForm.module.css'

const CategoryForm = ({ editData }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#1e90ff'); // default blue
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (editData) {
      setName(editData.name || '');
      setColor(editData.color || '#1e90ff');
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const url = editData ? `/api/categories/${editData._id}` : '/api/categories';
    const method = editData ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      body: JSON.stringify({ name, color }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setMessage(editData ? 'Category updated!' : 'Category created!');
      setName('');
    } else {
      setMessage('Something went wrong.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h4>{editData ? 'Edit Category' : 'Add New Category'}</h4>
      <label>Category Name</label>
      <input
        className={styles.inputField}
        type="text"
        placeholder="e.g. Health"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>Color</label>
      <input className={styles.inputField} type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <button className={styles.buttonField} type="submit">
        {editData ? 'Update' : 'Create'}
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default CategoryForm;
