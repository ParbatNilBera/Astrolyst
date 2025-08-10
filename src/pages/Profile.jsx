import React, { useContext, useState, useEffect } from "react";
import { User, Mail, Phone, Wallet, Plus, LogOut, Bell } from "lucide-react";
import { UserContext } from "../Context/UserContext";
import AddMoneyModal from "../components/Modal/AddMoneyModal";

const Profile = () => {
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) setUserData(user);
  }, [user]);

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "₹0";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddMoney = (data) => {
    // data = { amount, name, email, phone, username }
    alert(
      `Adding ${formatCurrency(data.amount)} to wallet for user ${data.name}`
    );
    console.log(data);
    // Do further processing here, like API call to add money
    setShowAddMoney(false);
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <header className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {userData?.name}
              </h1>
              <p className="text-sm text-gray-600 capitalize">
                {userData?.role}
              </p>
            </div>
          </div>
          <button
            title="Logout"
            className="p-2 rounded-md hover:bg-red-100 transition"
            // Add logout logic here or pass as prop
          >
            <LogOut className="w-6 h-6 text-red-600" />
          </button>
        </header>

        {/* Contact Info */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Contact Information
          </h2>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600 font-medium">Email Address</p>
              <p className="text-gray-900">{userData?.email || "-"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600 font-medium">Phone Number</p>
              <p className="text-gray-900">
                {userData?.phone ? `+91 ${userData.phone}` : "-"}
              </p>
            </div>
          </div>
        </section>

        {/* Wallet */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Wallet Balance
            </h2>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Wallet className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-4xl font-bold text-yellow-700 mb-2">
            {formatCurrency(userData?.wallet?.balance ?? 0)}
          </p>
          <p className="text-sm text-yellow-600 mb-6">Available for spending</p>

          <button
            onClick={() => setShowAddMoney(true)}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Add Money
          </button>

          <AddMoneyModal
            isOpen={showAddMoney}
            onClose={() => setShowAddMoney(false)}
            onAddMoney={handleAddMoney}
            user={user}
          />
        </section>
      </div>
    </div>
  );
};

export default Profile;
