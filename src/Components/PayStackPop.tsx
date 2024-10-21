// Define the Transaction interface to describe the expected structure of the transaction object
interface Transaction {
  id: string;          // Transaction ID
  status: string;      // Transaction status (e.g., "success", "failed")
  email: string;       // Customer's email
  amount: number;      // Amount in kobo
  currency?: string;   // Optional currency (e.g., "NGN")
  // Add any additional properties you expect from the transaction response
}

// Declare the PaystackPop module with the newTransaction method
declare module '@paystack/inline-js' {
  export default class PaystackPop {
    newTransaction(params: {
      key: string;                  // Your Paystack public key
      email: string;                // Customer's email
      amount: number;               // Amount in kobo
      currency?: string;            // Optional currency (e.g., "NGN")
      firstName?: string;           // Optional: Customer's first name
      lastName?: string;            // Optional: Customer's last name
      phoneNumber?: string;         // Optional: Customer's phone number
      onSuccess(transaction: Transaction): void; // Callback on successful payment
      onCancel(): void;             // Callback on payment cancellation
      onError(): void;              // Callback on payment error
    }): void;
  }
}
