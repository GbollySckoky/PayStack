// '/api/PayStackVerify' backend logic to verify payment

'use server';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    const { reference } = req.body;

    if (!reference) {
      return res.status(400).json({ message: 'Transaction reference is required' });
    }

    try {
      const response = await axios({
        method: 'GET',
        url: `https://api.paystack.co/transaction/verify/${reference}`,
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECURITY_KEY}`,
        },
      });

      if (response.data.data.status === 'success') {
        // Payment verified successfully
        res.status(200).json({ message: 'Payment verified', data: response.data.data });
      } else {
        res.status(400).json({ message: 'Payment verification failed' });
      }
    } catch (error) {
      console.error('Verification error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
