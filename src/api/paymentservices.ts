import axiosClient from "./axiosClient";

/* ============================================================
   TYPE DEFINITIONS
============================================================ */
interface ApiOptions {
  signal?: AbortSignal;
}

export interface OnlinePaymentTenant {
  identifier: string;
  name: string;
}

export interface OnlineBill {
  customerName: string;
  address?: string | null;
  meterSerialNumber?: string | null;
  customerType: string;
  billAmount: number;
  charges?: {
    id: string;
    description: string;
    amount: number;
  }[];
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
  options?: ApiOptions,
): Promise<OnlineBill> => {
  console.log(
    "Fetching payment details for customerId:",
    customerId,
    "tenant:",
    tenant,
  );
  const response = await axiosClient.get("/api/charges/topay-online", {
    params: { customerId, tenant },
    signal: options?.signal, // ← Frontend cancellation
  });
  console.log("Payment details response:", response.data);
  return response.data;
};

/**
 * Get tenants that have online payments enabled.
 */
export const getOnlinePaymentEnabledTenants = async (
  options?: ApiOptions,
): Promise<OnlinePaymentTenant[]> => {
  const response = await axiosClient.get(
    "/api/platform/public/tenants/online-payment-enabled",
    {
      signal: options?.signal,
    },
  );
  return response.data;
};

export const generateFonePayQR = async (
  transactionAmount: string,
  customerId: string,
  tenant: string,
  customerName: string,
  options?: ApiOptions,
) => {
  const paddedId = customerId.padStart(4, "0");

  const firstName = customerName.trim().split(" ")[0] || "";
  const cleanFirstName = firstName.replace(/\s+/g, "");
  const shortName = cleanFirstName.slice(0, 8);

  const response = await axiosClient.post(
    "/api/onlinepay/fonepay/generate-qr",
    {
      transactionAmount,
      customerId: Number(customerId),
      remarks1: "E-BILL",
      remarks2: `C-${paddedId}_${shortName}`,
      tenant,
    },
    { signal: options?.signal },
  );

  return response.data;
};

/**
 * Check FonePay payment status
 */
export const checkFonePayStatus = async (
  prn: string,
  tenant: string,
  options?: ApiOptions,
) => {
  const response = await axiosClient.post(
    "/api/onlinepay/fonepay/check-status",
    null,
    {
      params: { prn, tenant },
      signal: options?.signal,
    },
  );
  return response.data; // { prn, paymentStatus: "PAID" | "PENDING", ... }
};
