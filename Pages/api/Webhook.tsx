import crypto from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    const secret = 'sk_test_a9f0fe6f2caaa5324a2c7d8f3776b4a252d28e47'; // Replace with your actual secret key

    // Validate Paystack's signature to ensure request authenticity
    const hash = crypto.createHmac('sha512', secret)
                       .update(JSON.stringify(req.body))
                       .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
      return res.status(401).json({ message: 'Unauthorized request' });
    }

    // Handle different event types from Paystack
    const event = req.body.event;

    if (event === 'charge.success') {
      const { data } = req.body;

      // Access the transaction details
      const transactionReference = data.reference;
      const paymentStatus = data.status;
      const amount = data.amount;
      const customerEmail = data.customer.email;

      // Perform your business logic here (e.g., update the order status in your database)
      console.log('Payment successful: ', transactionReference, paymentStatus, customerEmail, amount);

      // Send a success response to Paystack to acknowledge the event
      return res.status(200).json({ message: 'Webhook received and processed' });
    } else {
      // Handle other events if necessary (e.g., charge.failure, charge.pending, etc.)
      console.log(`Unhandled event: ${event}`);
    }

    // Respond to Paystack
    res.status(200).json({ message: 'Event received' });
  } else {
    // If it's not a POST request
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
