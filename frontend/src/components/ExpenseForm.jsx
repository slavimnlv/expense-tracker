import React, { useState, useEffect } from 'react';
import { useCustomRequest } from '../utils/customRequest';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/ExpenseForm';

const ExpenseForm = ({ expense, onClose, onSave }) => {
  const customRequest = useCustomRequest();

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().slice(0, 16),
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        description: expense.description,
        amount: expense.amount,
        date: new Date(expense.date).toISOString().slice(0, 16),
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.description) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      if (expense) {
        await customRequest.put(`/expenses/${expense.id}`, formData);
        toast.success('Expense updated successfully');
      } else {
        await customRequest.post('/expenses', formData);
        toast.success('Expense added successfully');
      }
      onSave();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save expense');
    }
  };

  return (
    <Wrapper>
      <div className='popup'>
        <div className='popup-content'>
          <h3>{expense ? 'Edit Expense' : 'Add Expense'}</h3>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Description</label>
              <input
                type='text'
                name='description'
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Amount</label>
              <input
                type='number'
                name='amount'
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Date</label>
              <input
                type='datetime-local'
                name='date'
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className='form-buttons'>
              <button type='submit'>
                {expense ? 'Update' : 'Add'} Expense
              </button>
              <button type='button' onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default ExpenseForm;
