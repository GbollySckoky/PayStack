'use server';
import axios from 'axios';

export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    const { email, amount, firstName, phoneNumber } = req.body;

    try {
      // Make the API call to Paystack to initialize the transaction
      const response = await axios({
        method: 'POST',
        url: 'https://api.paystack.co/transaction/initialize',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECURITY_KEY}`,
          'Content-Type': 'application/json',
        },
        data: {
          email,
          amount, // Amount in kobo
          firstName,
          phoneNumber,
          callback_url: 'http://localhost:3000/payment-success', // Your frontend URL
        },
      });

      // Send the authorization URL to the frontend
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Transaction initialization failed' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
