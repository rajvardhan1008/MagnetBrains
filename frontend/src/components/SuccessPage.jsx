import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SuccessPage = () => {
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const paymentId = query.get('paymentId');
    const payerId = query.get('PayerID');

    if (paymentId && payerId) {
      axios.post('http://localhost:5000/api/payment/execute', {
        paymentId,
        payerId,
      })
      .then(res => {
        console.log('Payment Success:', res.data);
        // You can redirect to order summary or show confirmation here
      })
      .catch(err => {
        console.error('Error executing payment:', err);
      });
    }
  }, [location]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>✅ Payment Successful!</h1>
      <p>Your transaction was completed successfully.</p>
    </div>
  );
};

export default SuccessPage;

