import React from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

export default function Payment({ cartItems, totalAmount }) {
    const handlePayment = async () => {
        try {
            const response = await axios.post('/paypal/process', {
                cartItems,
                totalAmount
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const approvalUrl = response.data.approvalUrl;
            window.location.href = approvalUrl; // Redirige en lugar de abrir en una nueva ventana
        } catch (error) {
            console.error('Payment error:', error);
            alert('There was an error processing the payment. Please try again.');
        }
    };

    return (
        <div>
            <h1>PayPal Payment</h1>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.product.name} - ${item.product.price} x {item.quantity}
                    </li>
                ))}
            </ul>
            <h2>Total Amount: ${totalAmount}</h2>
            <button onClick={handlePayment}>Pay with PayPal</button>
        </div>
    );
}
