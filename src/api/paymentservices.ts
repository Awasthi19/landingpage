import axiosClient from './axiosClient';

export const generateQR = async (transactionAmount: string, customerId: string, tenant: string) => {
  const response = await axiosClient.post('/api/onlinepay/nepalpay/generate-qr', 
    null,
    {
      params: { transactionAmount, customerId, tenant }
    }
  );
  console.log('Payment response:', response);
  return response.data;
};

export const checkStatusViaWebSocket = async (validationTraceId: string, tenant: string) => {
  const response = await axiosClient.post('/api/onlinepay/nepalpay/checkstatus-ws', 
    null,
    {
      params: { requestId: validationTraceId, tenant },
      timeout: 300000 // 3 minutes in milliseconds (3 * 60 * 1000)
    }
  );
  console.log('Status response:', response);
  return response.data;
};

export const checkStatusViaReport = async (validationTraceId: string, tenant: string) => {
  const response = await axiosClient.post('/api/onlinepay/nepalpay/transaction-report/single', 
    null,
    {
      params: { requestId: validationTraceId, tenant }
    }
  );
  console.log('Status response:', response);
  return response.data;
};

export const getPaymentDetails = async (customerId: string, tenant: string) => {
  console.log('Fetching payment details for customerId:', customerId, 'tenant:', tenant);
  const response = await axiosClient.get("/api/charges/topay-online", {
    params: { customerId, tenant }
  });
  console.log("Payment details response:", response.data); // Debugging line
  return response.data;
};