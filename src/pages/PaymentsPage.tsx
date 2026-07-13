import React, { useEffect, useState } from "react";
import {
  deposit,
  withdraw,
  transfer,
  getTransactions,
} from "../services/paymentService";

import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const USER_ID = "6a4c3b006fd8b0bc950ccd11";

const PaymentsPage: React.FC = () => {
  // Separate states
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [receiver, setReceiver] = useState("");

  const [transactions, setTransactions] = useState<any[]>([]);

  const loadTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  // Deposit
  const handleDeposit = async () => {
    if (!depositAmount) {
      alert("Enter deposit amount");
      return;
    }

    try {
      await deposit(USER_ID, Number(depositAmount));

      alert("Deposit Successful");

      setDepositAmount("");

      loadTransactions();
    } catch (err) {
      console.log(err);
      alert("Deposit Failed");
    }
  };

  // Withdraw
  const handleWithdraw = async () => {
    if (!withdrawAmount) {
      alert("Enter withdraw amount");
      return;
    }

    try {
      await withdraw(USER_ID, Number(withdrawAmount));

      alert("Withdraw Successful");

      setWithdrawAmount("");

      loadTransactions();
    } catch (err) {
      console.log(err);
      alert("Withdraw Failed");
    }
  };

  // Transfer
  const handleTransfer = async () => {
    if (!receiver || !transferAmount) {
      alert("Fill all fields");
      return;
    }

    try {
      await transfer(
        USER_ID,
        receiver,
        Number(transferAmount)
      );

      alert("Transfer Successful");

      setReceiver("");
      setTransferAmount("");

      loadTransactions();
    } catch (err) {
      console.log(err);
      alert("Transfer Failed");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Payments
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Deposit */}

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">
              Deposit
            </h2>
          </CardHeader>

          <CardBody>
            <input
              className="border rounded w-full p-2 mb-3"
              placeholder="Enter Deposit Amount"
              value={depositAmount}
              onChange={(e) =>
                setDepositAmount(e.target.value)
              }
            />

            <Button
              fullWidth
              onClick={handleDeposit}
            >
              Deposit
            </Button>
          </CardBody>
        </Card>

        {/* Withdraw */}

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">
              Withdraw
            </h2>
          </CardHeader>

          <CardBody>
            <input
              className="border rounded w-full p-2 mb-3"
              placeholder="Enter Withdraw Amount"
              value={withdrawAmount}
              onChange={(e) =>
                setWithdrawAmount(e.target.value)
              }
            />

            <Button
              fullWidth
              variant="warning"
              onClick={handleWithdraw}
            >
              Withdraw
            </Button>
          </CardBody>
        </Card>

        {/* Transfer */}

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">
              Transfer
            </h2>
          </CardHeader>

          <CardBody>
            <input
              className="border rounded w-full p-2 mb-3"
              placeholder="Receiver User ID"
              value={receiver}
              onChange={(e) =>
                setReceiver(e.target.value)
              }
            />

            <input
              className="border rounded w-full p-2 mb-3"
              placeholder="Enter Transfer Amount"
              value={transferAmount}
              onChange={(e) =>
                setTransferAmount(e.target.value)
              }
            />

            <Button
              fullWidth
              variant="secondary"
              onClick={handleTransfer}
            >
              Transfer
            </Button>
          </CardBody>
        </Card>

      </div>

      {/* Transaction History */}

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">
            Transaction History
          </h2>
        </CardHeader>

        <CardBody>
          {transactions.length === 0 ? (
            <p className="text-center text-gray-500">
              No Transactions Found
            </p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">
                    Type
                  </th>

                  <th className="text-left p-2">
                    Amount
                  </th>

                  <th className="text-left p-2">
                    Status
                  </th>

                  <th className="text-left p-2">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((t) => (
                  <tr
                    key={t._id}
                    className="border-b"
                  >
                    <td className="p-2">
                      {t.type}
                    </td>

                    <td className="p-2">
                      Rs. {t.amount}
                    </td>

                    <td className="p-2">
                      {t.status}
                    </td>

                    <td className="p-2">
                      {new Date(
                        t.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default PaymentsPage;