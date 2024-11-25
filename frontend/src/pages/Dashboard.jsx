import React from 'react';
import { JWT_TOKEN_KEY } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCustomRequest } from '../utils/customRequest';
import ExpenseForm from '../components/ExpenseForm';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Wrapper from '../assets/wrappers/Dashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  const customRequest = useCustomRequest();

  const getCurrentDateString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getPreviousMonthDateString = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().split('T')[0];
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };

    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(
      date
    );

    return formattedDate;
  };

  const handleLogout = () => {
    localStorage.removeItem(JWT_TOKEN_KEY);
    navigate('/login');
  };

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [filters, setFilters] = useState({
    fromDate: getPreviousMonthDateString(),
    toDate: getCurrentDateString(),
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  const handleAddExpense = () => {
    setCurrentExpense(null);
    setIsPopupOpen(true);
  };

  const handleEditExpense = (expense) => {
    setCurrentExpense(expense);
    setIsPopupOpen(true);
  };

  const handleDeleteExpense = async (id) => {
    try {
      await customRequest.delete(`/expenses/${id}`);
      toast.success('Expense deleted successfully');
      fetchExpenses();
    } catch (err) {
      toast.error('Failed to delete expense');
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setCurrentExpense(null);
  };

  const fetchExpenses = async () => {
    if (isFetching) return;

    setIsFetching(true);
    setLoading(true);

    try {
      const queryParams = new URLSearchParams();
      if (filters.fromDate) queryParams.append('fromDate', filters.fromDate);
      if (filters.toDate) queryParams.append('toDate', filters.toDate);

      const { data } = await customRequest.get(
        `/expenses?${queryParams.toString()}`
      );
      setExpenses(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch expenses');
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === 'fromDate' || name === 'toDate') {
      const date = new Date(value);

      if (isNaN(date.getTime())) {
        setFilters((prev) => ({
          ...prev,
          [name]: getCurrentDateString(),
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleClearFilters = () => {
    setFilters({
      fromDate: getPreviousMonthDateString(),
      toDate: getCurrentDateString(),
    });
  };

  const processData = () => {
    const dailyExpenses = {};

    expenses.forEach((expense) => {
      const date = expense.date.slice(0, 10);
      if (dailyExpenses[date]) {
        dailyExpenses[date] += expense.amount;
      } else {
        dailyExpenses[date] = expense.amount;
      }
    });

    return Object.keys(dailyExpenses)
      .map((date) => ({
        date,
        total: dailyExpenses[date],
      }))
      .reverse();
  };

  const chartData = processData();

  return (
    <Wrapper>
      <header>
        <h2>Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <div className='expenses'>
          <div className='filter-expenses section-expenses'>
            <h3>Filter Expenses</h3>
            <div>
              <label>
                From:{' '}
                <input
                  type='date'
                  name='fromDate'
                  value={filters.fromDate}
                  onChange={handleFilterChange}
                />
              </label>
              <label>
                To:{' '}
                <input
                  type='date'
                  name='toDate'
                  value={filters.toDate}
                  onChange={handleFilterChange}
                />
              </label>
              <button onClick={handleClearFilters}>Reset Filters</button>
            </div>
          </div>
          <div className='section-expenses'>
            <h3>Your Expenses</h3>
            <button onClick={handleAddExpense}>Add Expense</button>

            <div className='expenses-section'>
              {loading ? (
                <p>Loading expenses...</p>
              ) : expenses.length === 0 ? (
                <p>No expenses found.</p>
              ) : (
                <ul className='expenses-list'>
                  {expenses.map((expense) => (
                    <li key={expense.id}>
                      <div className='expense-details'>
                        <div className='expense-text'>
                          {expense.description}
                        </div>
                        <div className='expense-text date-text'>
                          {formatDateTime(expense.date)}
                        </div>
                        <div className='expense-text amount-text'>
                          ${expense.amount}
                        </div>
                      </div>
                      <button onClick={() => handleEditExpense(expense)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteExpense(expense.id)}>
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {isPopupOpen && (
              <ExpenseForm
                expense={currentExpense}
                onClose={handleClosePopup}
                onSave={fetchExpenses}
              />
            )}
          </div>
        </div>
        <divc className='chart'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='total' fill='#328ff3' />
              </BarChart>
            </ResponsiveContainer>
          )}
        </divc>
      </main>
    </Wrapper>
  );
};

export default Dashboard;
