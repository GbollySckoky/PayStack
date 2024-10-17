'use client';
import React, { useState } from 'react';
import PaystackPop from '@paystack/inline-js';

const Email = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        amount: 0,
        phoneNumber: '',
    });
    const [isError, setIsError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleApprovePaystack = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setIsError(null);

        const paystack = new PaystackPop();
        const publicKey = 'pk_test_e22fd4f9b0be9a74b0edde50962b8d71be5b7b2d';

        if (!publicKey) {
            throw new Error("Paystack public key is not defined in the environment variables.");
        }

        try {
            const response = await fetch(`/api/PayStack`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Send formData directly
            });
            const data = await response.json();

            if (response.ok) {
                paystack.newTransaction({
                    key: publicKey,
                    email: formData.email,
                    amount: formData.amount * 100, // Convert to kobo
                    firstName: formData.firstName,
                    phoneNumber: formData.phoneNumber,
                    currency: "NGN",
                    onSuccess(transaction) {
                        console.log('Payment successful:', transaction);
                    },
                    onCancel() {
                        console.log('Payment cancelled');
                    },
                    onError() {
                        console.error('Payment error');
                    },
                });
            } else {
                setIsError(data.message || 'Payment initiation failed');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsError('An error occurred while processing your request.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-blue-800">
            <form className='p-5 w-[50%] mx-auto' onSubmit={handleApprovePaystack}>
                <div className='flex flex-col'>
                    <label className='text-white'>Email</label>
                    <input 
                        type="email"
                        placeholder='Email'
                        className='p-2 outline-none mt-2 rounded-lg'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col mt-5'>
                    <label className='text-white'>First Name</label>
                    <input 
                        type="text"
                        placeholder='First Name'
                        value={formData.firstName}
                        className='p-2 outline-none mt-2 rounded-lg'
                        name='firstName'
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col mt-5'>
                    <label className='text-white'>Amount</label>
                    <input 
                        type="number"
                        placeholder='Amount'
                        value={formData.amount}
                        className='p-2 outline-none mt-2 rounded-lg'
                        name='amount'
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col mt-5'>
                    <label className='text-white'>Phone Number</label>
                    <input 
                        type="tel"
                        placeholder='Phone Number'
                        value={formData.phoneNumber}
                        className='p-2 outline-none mt-2 rounded-lg'
                        name='phoneNumber'
                        onChange={handleChange}
                    />
                </div>
                <button className='bg-red-600 mt-5 w-full p-2 rounded-lg text-white' disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Pay'}
                </button>
                {isError && <p className="text-red-500">{isError}</p>}
            </form>
        </div>
    );
}

export default Email;
