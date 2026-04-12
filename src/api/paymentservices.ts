import axiosClient from './axiosClient';

/* ============================================================
   TYPE DEFINITIONS
============================================================ */
interface ApiOptions {
  signal?: AbortSignal;
}


/**
 * Get payment details for a customer
 * @param customerId - Customer identifier
 * @param tenant - Tenant identifier
 * @param options - Optional abort signal for request cancellation
 */
export const getPaymentDetails = async (
  customerId: string,
  tenant: string,
  options?: ApiOptions
) => {
  console.log('Fetching payment details for customerId:', customerId, 'tenant:', tenant);
  const response = await axiosClient.get('/api/charges/topay-online', {
    params: { customerId, tenant },
    signal: options?.signal, // ← Frontend cancellation
  });
  console.log('Payment details response:', response.data);
  return response.data;
};

/**
 * Get the default online payment method for a tenant
 */
export const getOnlinePaymentMethod = async (
  tenant: string,
  options?: ApiOptions
) => {
  const response = await axiosClient.get('/api/payment-methods/online-default', {
    params: { tenant },
    signal: options?.signal,
  });
  return response.data; // { id, name, prefix, isCounterDefault, isOnlineDefault }
};


/* ============================================================
   PAYMENT API FUNCTIONS
============================================================ */

/**
 * Generate QR code for NepalPay payment
 * @param transactionAmount - Amount to charge
 * @param customerId - Customer identifier
 * @param tenant - Tenant identifier
 * @param options - Optional abort signal for request cancellation
 */
export const generateQR = async (
  transactionAmount: string,
  customerId: string,
  tenant: string,
  options?: ApiOptions
) => {
  const response = await axiosClient.post(
    '/api/onlinepay/nepalpay/generate-qr',
    null,
    {
      params: { transactionAmount, customerId, tenant },
      signal: options?.signal, // ← Frontend cancellation
    }
  );
  console.log('Payment response:', response);
  return response.data;
};

/**
 * Check payment status via WebSocket
 * @param validationTraceId - Transaction trace ID
 * @param tenant - Tenant identifier
 * @param options - Optional abort signal for request cancellation
 */
export const checkStatusViaWebSocket = async (
  validationTraceId: string,
  tenant: string,
  options?: ApiOptions
) => {
  const response = await axiosClient.post(
    '/api/onlinepay/nepalpay/checkstatus-ws',
    null,
    {
      params: { requestId: validationTraceId, tenant },
      timeout: 300000, // 5 minutes (5 * 60 * 1000)
      signal: options?.signal, // ← Frontend cancellation
    }
  );
  console.log('Status response:', response);
  return response.data;
};

/**
 * Check payment status via transaction report
 * @param validationTraceId - Transaction trace ID
 * @param tenant - Tenant identifier
 * @param options - Optional abort signal for request cancellation
 */
export const checkStatusViaReport = async (
  validationTraceId: string,
  tenant: string,
  options?: ApiOptions
) => {
  const response = await axiosClient.post(
    '/api/onlinepay/nepalpay/transaction-report/single',
    null,
    {
      params: { requestId: validationTraceId, tenant },
      signal: options?.signal, // ← Frontend cancellation
    }
  );
  console.log('Status response:', response);
  return response.data;
};

/**
 * Generate FonePay QR code
 */
export const generateFonePayQR = async (
  transactionAmount: string,
  customerId: string,
  tenant: string,
  options?: ApiOptions
) => {
  const response = await axiosClient.post(
    '/api/onlinepay/fonepay/generate-qr',
    {
      transactionAmount,
      customerId: Number(customerId),
      remarks1: 'online',
      remarks2: 'payment',
      tenant,
    },
    { signal: options?.signal }
  );
  return response.data;
};

/**
 * Check FonePay payment status
 */
export const checkFonePayStatus = async (
  prn: string,
  tenant: string,
  options?: ApiOptions
) => {
  const response = await axiosClient.post(
    '/api/onlinepay/fonepay/check-status',
    null,
    {
      params: { prn, tenant },
      signal: options?.signal,
    }
  );
  return response.data; // { prn, paymentStatus: "PAID" | "PENDING", ... }
};