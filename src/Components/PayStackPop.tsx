declare module '@paystack/inline-js' {
    export default class PaystackPop {
      newTransaction(params: {
        key: string;                  // Your Paystack public key
        email: string;                // Customer's email
        amount: number;               // Amount in kobo
        currency?: string;            // Optional currency (e.g., "NGN")
        firstName?: string;           // Optional: Customer's last name
        phoneNumber?: string;               // Optional: Customer's phone number
        onSuccess(transaction: any): void; // Callback on successful payment
        onCancel(): void;             // Callback on payment cancellation
        onError(): void;              // Callback on payment error
      }): void;
    }
  }
  