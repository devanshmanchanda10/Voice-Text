import React, { useState } from 'react';
import { TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

const Expense = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(0);

  const handleDeleteExpense = (index) => {
    setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index));
    // Update balance based on deleted expense amount
    setBalance((prevBalance) => prevBalance + expenses[index].amount);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleAddExpense = () => {
    if (!isNaN(parseFloat(amount)) && text.trim() !== '') {
      const newExpense = { text, amount: parseFloat(amount) };
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
      setBalance((prevBalance) => prevBalance - parseFloat(amount));
      setText('');
      setAmount('');
    }
  };

  const handleClearExpenses = () => {
    setExpenses([]);
    setBalance(0);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
    <Typography variant="h6" gutterBottom>Expense Tracker</Typography>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <TextField label="Expense Description" value={text} onChange={handleTextChange} />
      <TextField type="number" label="Amount" value={amount} onChange={handleAmountChange} />
    </div>
    <Button variant="contained" color="primary" onClick={handleAddExpense}>
      Add Expense
    </Button>
    <Button variant="contained" color="error" onClick={handleClearExpenses}>
      Clear All
    </Button>
    <List>
      {expenses.map((expense, index) => (
  <ListItem key={index}>
    <ListItemText primary={`${expense.amount.toFixed(2)} - ${expense.text}`} />
    <Button variant="outlined" color="error" size="small" onClick={() => handleDeleteExpense(index)}>
      Delete
    </Button>
  </ListItem>
))}

    </List>
    <Typography variant="subtitle1" gutterBottom>Balance: ${balance.toFixed(2)}</Typography>
  </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  balance: {
    fontSize: '1.2em',
    margin: '10px 0',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#00aaff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  clearButton: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ff4444',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
  expenses: {
    listStyleType: 'none',
    padding: '0',
  },
  expenseItem: {
    margin: '5px 0',
  },
};

export default Expense;
