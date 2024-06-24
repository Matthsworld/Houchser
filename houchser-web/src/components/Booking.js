import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Booking = () => {
  const [type, setType] = useState('');
  const [provider, setProvider] = useState('');
  const [date, setDate] = useState('');
  const history = useHistory();

  const handleBooking = () => {
    fetch('http://localhost:5000/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, provider, date, userId: 'user_id' }),
    }).then(() => {
      history.push('/');
    });
  };

  return (
    <div>
      <h1>Book a Service</h1>
      <input
        type="text"
        placeholder="Service Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="text"
        placeholder="Provider"
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
      />
      <input
        type="text"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleBooking}>Book</button>
    </div>
  );
};

export default Booking;

