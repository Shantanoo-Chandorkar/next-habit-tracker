'use client';
import React, { useState, useEffect } from 'react';
import styles from './styles/newHabitForm.module.css';
import { useHabitContext } from '../../../../context/HabitContext';

const HabitForm = ({ editData, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('Daily'); // Default frequency
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  const { dispatch } = useHabitContext();

  useEffect(() => {
    if (editData) {
      setTitle(editData.title || '');
      setDescription(editData.description || '');
      setFrequency(editData.frequency || 'Daily');
      setCategoryId(editData.categoryId || '');
    }
  }, [editData]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const url = editData ? `/api/habits/${editData._id}` : '/api/habits';
    const method = editData ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      body: JSON.stringify({ title, description, frequency, categoryId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const payload = await res.json();
      dispatch({ type: editData ? 'UPDATE_HABIT' : 'ADD_HABIT', payload });
      setMessage(editData ? 'Habit updated!' : 'Habit created!');
      if (!editData) {
        onSuccess(); // this closes the panel
      }
      if (typeof onSubmit === 'function') onSubmit(); // this closes the panel
    } else {
      setMessage('Something went wrong.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h4>{editData ? 'Edit Habit' : 'Add New Habit'}</h4>
      <label>Habit Title</label>
      <input
        className={styles.inputField}
        type="text"
        placeholder="e.g. Morning Run"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label>description</label>
      <textarea
        className={styles.textAreaField}
        placeholder="e.g. Run for 30 minutes every morning"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="3"
      />
      <label>Frequency</label>
      <select
        className={styles.selectField}
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      >
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Custom">Custom</option>
      </select>
      <label>Category</label>
      <select
        className={styles.selectField}
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      >
        <option value="" disabled>Select a category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button className={styles.buttonField} type="submit">
        {editData ? 'Update' : 'Create'}
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default HabitForm;
