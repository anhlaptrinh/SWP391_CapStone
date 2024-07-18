// src/pages/payment/PaymentSuccess.tsx
import React from 'react';
import { Button, Result } from 'antd';
import {  useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
    const navigate  = useNavigate ();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <Result
    status="success"
    title="Successfully Checkout!"
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Button type="primary" onClick={goToHome}>
        Go Home
      </Button>,
    ]}
  />
    );
};

export default PaymentSuccess;
