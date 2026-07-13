import Transaction from "../models/Transaction.js";

export const deposit = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const transaction = new Transaction({
      user: userId,
      type: "Deposit",
      amount,
      status: "Completed",
      referenceNo: "TXN" + Date.now(),
    });

    await transaction.save();

    res.status(201).json({
      message: "Deposit Successful",
      transaction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const withdraw = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const transaction = new Transaction({
      user: userId,
      type: "Withdraw",
      amount,
      status: "Completed",
      referenceNo: "TXN" + Date.now(),
    });

    await transaction.save();

    res.status(201).json({
      message: "Withdraw Successful",
      transaction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const transfer = async (req, res) => {
  try {
    const { userId, receiver, amount } = req.body;

    const transaction = new Transaction({
      user: userId,
      receiver,
      type: "Transfer",
      amount,
      status: "Completed",
      referenceNo: "TXN" + Date.now(),
    });

    await transaction.save();

    res.status(201).json({
      message: "Transfer Successful",
      transaction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTransactions = async (req, res) => {
  try {

    const transactions = await Transaction.find()
      .populate("user", "name")
      .populate("receiver", "name");

    res.json(transactions);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};