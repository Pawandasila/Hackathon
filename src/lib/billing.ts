export interface BillingData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Billing Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Payment Information
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  
  // Preferences
  saveInfo: boolean;
  newsletter: boolean;
}

export interface Order {
  id: string;
  items: any[];
  billingData: BillingData;
  total: number;
  date: Date;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  paymentMethod: string;
}

// Payment processing result
export interface PaymentResult {
  success: boolean;
  orderId?: string;
  error?: string;
  transactionId?: string;
}

export class BillingManager {
  private static readonly BILLING_KEY = "billingData";
  private static readonly ORDERS_KEY = "orders";

  // Get saved billing data
  static getBillingData(): BillingData | null {
    if (typeof window === "undefined") return null;
    
    try {
      const data = localStorage.getItem(this.BILLING_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error reading billing data:", error);
      return null;
    }
  }

  // Save billing data to localStorage
  static saveBillingData(data: BillingData): boolean {
    if (typeof window === "undefined") return false;
    
    try {
      // Don't save sensitive payment information
      const dataToSave = {
        ...data,
        cardNumber: '', // Don't save card number
        cvv: '', // Don't save CVV
        expiryDate: '', // Don't save expiry date
      };
      
      localStorage.setItem(this.BILLING_KEY, JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      console.error("Error saving billing data:", error);
      return false;
    }
  }

  // Clear saved billing data
  static clearBillingData(): boolean {
    if (typeof window === "undefined") return false;
    
    try {
      localStorage.removeItem(this.BILLING_KEY);
      return true;
    } catch (error) {
      console.error("Error clearing billing data:", error);
      return false;
    }
  }

  // Save order
  static saveOrder(order: Order): boolean {
    if (typeof window === "undefined") return false;
    
    try {
      const orders = this.getOrders();
      orders.push(order);
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
      
      // Dispatch order saved event
      window.dispatchEvent(new CustomEvent('orderSaved', { detail: order }));
      return true;
    } catch (error) {
      console.error("Error saving order:", error);
      return false;
    }
  }

  // Get all orders
  static getOrders(): Order[] {
    if (typeof window === "undefined") return [];
    
    try {
      const orders = localStorage.getItem(this.ORDERS_KEY);
      return orders ? JSON.parse(orders) : [];
    } catch (error) {
      console.error("Error reading orders:", error);
      return [];
    }
  }

  // Get order by ID
  static getOrder(orderId: string): Order | undefined {
    return this.getOrders().find(order => order.id === orderId);
  }

  // Update order status
  static updateOrderStatus(orderId: string, status: Order['status']): boolean {
    try {
      const orders = this.getOrders();
      const orderIndex = orders.findIndex(order => order.id === orderId);
      
      if (orderIndex > -1) {
        orders[orderIndex].status = status;
        localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating order status:", error);
      return false;
    }
  }

  // Clear all orders
  static clearOrders(): boolean {
    if (typeof window === "undefined") return false;
    
    try {
      localStorage.removeItem(this.ORDERS_KEY);
      return true;
    } catch (error) {
      console.error("Error clearing orders:", error);
      return false;
    }
  }

  // Get order statistics
  static getOrderStats() {
    const orders = this.getOrders();
    return {
      total: orders.length,
      completed: orders.filter(o => o.status === 'completed').length,
      pending: orders.filter(o => o.status === 'pending').length,
      totalAmount: orders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + o.total, 0)
    };
  }

  // Dummy payment processing
  static async processPayment(
    cartItems: any[],
    billingData: BillingData,
    total: number
  ): Promise<PaymentResult> {
    return new Promise((resolve) => {
      // Create order
      const orderId = `order_${Date.now()}`;
      const transactionId = `txn_${Date.now()}`;
      
      const order: Order = {
        id: orderId,
        items: cartItems,
        billingData,
        total,
        date: new Date(),
        status: 'pending',
        paymentMethod: 'Credit Card'
      };

      // Save order
      this.saveOrder(order);

      // Simulate payment processing delay
      setTimeout(() => {
        // Simulate 95% success rate
        const isSuccess = Math.random() > 0.05;
        
        if (isSuccess) {
          // Payment successful
          this.updateOrderStatus(orderId, 'completed');
          
          // Show success notification
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent('showToast', {
              detail: {
                message: 'Payment successful! Order placed successfully.',
                type: 'success'
              }
            }));

            // Trigger confetti effect
            window.dispatchEvent(new CustomEvent('triggerConfetti'));
          }

          resolve({ 
            success: true, 
            orderId, 
            transactionId 
          });
        } else {
          // Payment failed
          this.updateOrderStatus(orderId, 'failed');
          
          // Show error notification
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent('showToast', {
              detail: {
                message: 'Payment failed! Please try again.',
                type: 'error'
              }
            }));
          }

          resolve({ 
            success: false, 
            error: 'Payment processing failed. Please check your card details and try again.' 
          });
        }
      }, 2000); // 2 second delay to simulate processing
    });
  }

  // Validate card details (basic validation)
  static validateCardDetails(billingData: BillingData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Card number validation (basic Luhn algorithm check)
    const cardNumber = billingData.cardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cardNumber)) {
      errors.push('Invalid card number');
    }

    // Expiry date validation
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(billingData.expiryDate)) {
      errors.push('Invalid expiry date format (MM/YY)');
    } else {
      const [month, year] = billingData.expiryDate.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        errors.push('Card has expired');
      }
    }

    // CVV validation
    if (!/^\d{3,4}$/.test(billingData.cvv)) {
      errors.push('Invalid CVV');
    }

    // Cardholder name validation
    if (!billingData.cardholderName.trim()) {
      errors.push('Cardholder name is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export default BillingManager;
