import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddMoneyModal = ({ isOpen, onClose, onAddMoney, user }) => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate(); // hook to redirect
  const handleAdd = () => {
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid positive amount");
      return;
    }

    // Save amount to localStorage
    localStorage.setItem("rechargeAmount", numericAmount);

    // Call parent callback with user info + amount
    // onAddMoney({
    //   amount: numericAmount,
    //   name: user?.name || "",
    //   email: user?.email || "",
    //   phone: user?.phone || "",
    //   username: user?.name || "", // adjust if username is different
    // });

    setAmount("");
    onClose();

    // Redirect to /payment
    navigate("/payment");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Add Money to Wallet</h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount in INR"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setAmount("");
              onClose();
            }}
            className="flex-1 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="flex-1 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white font-semibold transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMoneyModal;
