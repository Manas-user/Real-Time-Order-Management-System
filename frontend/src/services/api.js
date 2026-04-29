import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  getProducts: () => api.get('/products'),
  getProductById: (id) => api.get(`/products/${id}`),
};

export const orderService = {
  createOrder: (orderData) => api.post('/orders/create', orderData),
  getOrders: () => api.get('/orders'),
  getOrderStatus: (orderId) => api.get(`/orders/status/${orderId}`),
};

export const paymentService = {
  processPayment: (orderId) => api.post('/payments/process-payment', { order_id: orderId })
};

export default api;
