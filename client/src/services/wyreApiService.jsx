// ./services/wyreApiService.js
import axios from "axios";

const API_URL = "https://api.sendwyre.com";
const API_KEY = "your_api_key";
const API_VERSION = "v4";

// Generate a secret key and store it in localStorage
export async function generateSecretKey() {
  const secretKey = await axios.post(`${API_URL}/${API_VERSION}/keys`);
  localStorage.setItem("secretKey", secretKey.data.secretKey);
  return secretKey.data.secretKey;
}

// Get the secret key from localStorage
export function getSecretKey() {
  return localStorage.getItem("secretKey");
}

// Create a new account using the secret key
export async function createAccount() {
  const secretKey = getSecretKey();
  const headers = {
    Authorization: `Bearer ${secretKey}`,
  };
  const account = await axios.post(
    `${API_URL}/${API_VERSION}/accounts`,
    {},
    { headers }
  );
  return account.data;
}

// Get the account information using the secret key
export async function getAccount() {
  const secretKey = getSecretKey();
  const headers = {
    Authorization: `Bearer ${secretKey}`,
  };
  const account = await axios.get(`${API_URL}/${API_VERSION}/account`, {
    headers,
  });
  return account.data;
}

// Create a payment method using the card details
export async function createPaymentMethod(card) {
  const secretKey = getSecretKey();
  const headers = {
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/json",
  };
  const paymentMethod = await axios.post(
    `${API_URL}/${API_VERSION}/paymentMethods`,
    card,
    { headers }
  );
  return paymentMethod.data;
}

// Create a transfer using the payment method id and the destination currency
export async function createTransfer(paymentMethodId, destCurrency) {
  const secretKey = getSecretKey();
  const headers = {
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/json",
  };
  const transfer = await axios.post(
    `${API_URL}/${API_VERSION}/transfers`,
    {
      source: `paymentMethod:${paymentMethodId}`,
      dest: `account:${destCurrency}`,
      destCurrency,
      autoConfirm: true,
    },
    { headers }
  );
  return transfer.data;
}

// Get the transfer information using the transfer id
export async function getTransfer(transferId) {
  const secretKey = getSecretKey();
  const headers = {
    Authorization: `Bearer ${secretKey}`,
  };
  const transfer = await axios.get(
    `${API_URL}/${API_VERSION}/transfer/${transferId}`,
    { headers }
  );
  return transfer.data;
}
