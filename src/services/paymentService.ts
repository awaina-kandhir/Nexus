import axios from "axios";

const API = "http://localhost:5000/api/payments";

// Deposit
export const deposit = async (
  userId: string,
  amount: number
) => {
  const res = await axios.post(`${API}/deposit`, {
    userId,
    amount,
  });

  return res.data;
};

// Withdraw
export const withdraw = async (
  userId: string,
  amount: number
) => {
  const res = await axios.post(`${API}/withdraw`, {
    userId,
    amount,
  });

  return res.data;
};

// Transfer
export const transfer = async (
  userId: string,
  receiver: string,
  amount: number
) => {
  const res = await axios.post(`${API}/transfer`, {
    userId,
    receiver,
    amount,
  });

  return res.data;
};

// Transaction History
export const getTransactions = async () => {
  const res = await axios.get(API);
  return res.data;
};