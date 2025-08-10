import { useContext, useEffect, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";

import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";

const PaymentGateway = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [phone, setPhone] = useState();
  const [amount, setAmount] = useState();
  const [email, setEmail] = useState();

  const { user, addMoneyToWalletye } = useContext(UserContext);
  const numericAmount = JSON.parse(localStorage.getItem("rechargeAmount"));

  const generateUniqueId = () => {
    return "101" + Date.now() + "9" + Math.floor(Math.random() * 10000);
  };

  useEffect(() => {
    // Get user data from localStorage safely
    setEmail(user.email || "parbat@gmail.com");
    setName(user.name || "Parbat Nil Bera");

    setPhone(user.phone || "9163419935");
    setAmount(numericAmount || 100);
    console.log(user);

    setId(generateUniqueId());
  }, []);

  useEffect(() => {
    console.log("Updated name:", name);
    console.log("Updated email:", email);
    console.log("Updated phone:", phone);
    console.log("Updated id:", id);
  }, [name, email, phone, id]);

  // Initialize cashfree SDK
  let cashfree;
  const initializeSDK = async () => {
    try {
      cashfree = await load({
        mode: "sandbox", // Use "production" for live
      });
    } catch (error) {
      console.error("Failed to initialize Cashfree SDK:", error);
    }
  };

  // Call initialization immediately
  initializeSDK();

  const addMoneyToWallet = async () => {
    try {
      const res = await axiosInstance.post(API_PATH.PAYMENT.ADD_MONEY_WALLET, {
        amount: amount,
      });
      if (!res) {
        console.error("an Error Occured");
        return;
      }
      addMoneyToWalletye(amount);
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      setMessage("Error Add Wallet");
      console.error("Error Add wallet:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderDetails = async () => {
    setIsLoading(true);
    setMessage("Creating order...");

    try {
      const res = await axiosInstance.post(API_PATH.PAYMENT.PAY, {
        userId: id,
        name: name,
        email: email,
        phone: phone,
        order_amount: amount,
      });

      if (res.data && res.data.payment_session_id) {
        console.log("Order created:", res.data);
        setOrderId(res.data.order_id);
        setMessage("Order created successfully!");
        return res.data.payment_session_id;
      } else {
        setMessage("Failed to get payment session ID");
        console.error("Invalid response:", res.data);
        return null;
      }
    } catch (error) {
      setMessage("Error creating order");
      console.error("Error creating order:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPayment = async (orderIdToVerify) => {
    setIsLoading(true);
    setMessage("Verifying payment...");

    try {
      const orderId = orderIdToVerify || orderId;
      const res = await axiosInstance.post(API_PATH.PAYMENT.VERIFY, {
        orderId: orderId,
      });

      if (res && res.data) {
        console.log("Payment verified:", res.data);
        setMessage("Payment verified successfully!");
        return true;
      }
      return false;
    } catch (error) {
      setMessage("Error verifying payment");
      console.error("Error verifying payment:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayNow = async (e) => {
    e.preventDefault();

    try {
      const sessionId = await getOrderDetails();

      if (!sessionId) {
        setMessage("Failed to get payment session ID");
        return;
      }

      setMessage("Initializing payment...");

      const checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal", // Opens payment in modal
      };

      cashfree
        .checkout(checkoutOptions)
        .then(function (result) {
          console.log("Payment result:", result);
          if (result.error) {
            setMessage(
              `Payment error: ${result.error.message || "Unknown error"}`
            );
          } else {
            setMessage("Payment initiated successfully!");
            setTimeout(() => {
              verifyPayment(result.order.orderId || orderId);
            }, 2000);
            setTimeout(() => {
              addMoneyToWallet();
            }, 2000);
          }
        })
        .catch(function (error) {
          console.error("Payment initialization error:", error);
          setMessage(
            `Payment initialization error: ${error.message || "Unknown error"}`
          );
        });
    } catch (error) {
      console.error("Error during payment process:", error);
      setMessage(`Error: ${error.message || "Unknown error during payment"}`);
    }
  };

  return (
    <div className="container text-center max-w-[600px] p-14 mx-auto ">
      <h1 className="text-2xl font-bold mb-4"> Payment Page</h1>
      <div>
        <div className="max-w-sm mx-auto p-6 bg-blue-950 text-white rounded-2xl shadow-md space-y-4 flex flex-col items-start">
          <h2 className="text-xl font-semibold ">User Information</h2>
          <div className="">
            <span className="font-medium ">Name:</span> {name}
          </div>
          <div className="">
            <span className="font-medium ">Phone Number:</span> {phone}
          </div>
          <div className="">
            <span className="font-medium">Email Address:</span> {email}
          </div>
        </div>
      </div>
      {message && (
        <div
          className={`my-5 p-4 rounded text-sm ${
            message.toLowerCase().includes("error") ||
            message.toLowerCase().includes("failed")
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {message}
        </div>
      )}

      <div className="card mt-8">
        <button
          onClick={handlePayNow}
          disabled={isLoading}
          className={`px-6 py-3 text-white rounded text-base ${
            isLoading
              ? "bg-blue-500 cursor-not-allowed opacity-70"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
      </div>

      {orderId && (
        <div className="mt-5 text-sm text-gray-600">Order ID: {orderId}</div>
      )}
    </div>
  );
};

export default PaymentGateway;

// import React, { useEffect, useState, useContext } from "react";
// import { load } from "@cashfreepayments/cashfree-js";
// import { UserContext } from "../Context/UserContext"; // Adjust path accordingly
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../utils/axiosInstance";
// import { BASE_URL } from "../utils/apiPath";

// const PaymentGateway = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(UserContext);

//   // State
//   const [orderId, setOrderId] = useState("");
//   const [paymentSessionId, setPaymentSessionId] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [cashfreeSdk, setCashfreeSdk] = useState(null);

//   // Constants
//   const PAYMENT_AMOUNT = 50000; // Example: Rs 500 (adjust as needed)

//   // Generate unique order ID (you may want to generate it backend-side instead)
//   const generateUniqueOrderId = () => {
//     return `astrolyst_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
//   };

//   // Load Cashfree SDK once
//   useEffect(() => {
//     const initSdk = async () => {
//       try {
//         const sdk = await load({
//           mode: "sandbox", // Change to "production" in live
//         });
//         setCashfreeSdk(sdk);
//       } catch (error) {
//         console.error("Failed to load Cashfree SDK:", error);
//         setMessage("Payment system initialization failed.");
//       }
//     };
//     initSdk();
//   }, []);

//   // Create order (call backend to create order & get payment session id)
//   const createOrder = async () => {
//     setIsLoading(true);
//     setMessage("Creating payment order...");

//     const order_id = generateUniqueOrderId();

//     try {
//       const response = await axiosInstance.post(
//         `${BASE_URL}/payment/create-order`, // Change to your backend endpoint
//         {
//           userId: user?._id,
//           name: user?.name,
//           email: user?.email,
//           phone: user?.phone,
//           amount: PAYMENT_AMOUNT,
//           orderId: order_id,
//         }
//       );

//       if (response.data && response.data.payment_session_id) {
//         setOrderId(order_id);
//         setPaymentSessionId(response.data.payment_session_id);
//         setMessage("Payment order created successfully.");
//         return response.data.payment_session_id;
//       } else {
//         setMessage("Failed to create payment order.");
//         return null;
//       }
//     } catch (error) {
//       console.error("Create order error:", error);
//       setMessage("Error creating payment order.");
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Verify payment status from backend after payment completion
//   const verifyPayment = async (order_id) => {
//     setIsLoading(true);
//     setMessage("Verifying payment...");

//     try {
//       const response = await axiosInstance.post(
//         `${BASE_URL}/payment/verify`, // Change to your backend endpoint
//         { orderId: order_id }
//       );

//       if (response.data && response.data.status === "SUCCESS") {
//         setMessage("Payment verified successfully!");
//         // Add further logic like updating user status, redirecting, etc.
//         navigate("/profile"); // Redirect to profile or dashboard
//         return true;
//       } else {
//         setMessage("Payment verification failed.");
//         return false;
//       }
//     } catch (error) {
//       console.error("Payment verification error:", error);
//       setMessage("Error verifying payment.");
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle payment button click: create order + launch payment modal
//   const handlePayNow = async (e) => {
//     e.preventDefault();

//     if (!cashfreeSdk) {
//       setMessage("Payment system not ready. Please try again later.");
//       return;
//     }

//     const sessionId = await createOrder();

//     if (!sessionId) return;

//     setMessage("Starting payment...");

//     const options = {
//       paymentSessionId: sessionId,
//       redirectTarget: "_modal", // opens in modal overlay
//     };

//     try {
//       const result = await cashfreeSdk.checkout(options);
//       if (result.error) {
//         setMessage(
//           `Payment failed: ${result.error.message || "Unknown error"}`
//         );
//       } else {
//         setMessage("Payment successful, verifying...");
//         await verifyPayment(result.order.orderId || orderId);
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       setMessage(`Payment error: ${error.message || "Unknown error"}`);
//     }
//   };

//   if (!user) {
//     return <div>Please log in to make a payment.</div>;
//   }

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-12">
//       <h1 className="text-2xl font-bold mb-6 text-center">Make Payment</h1>

//       <div className="mb-4">
//         <strong>Name:</strong> {user?.name}
//       </div>
//       <div className="mb-4">
//         <strong>Email:</strong> {user?.email}
//       </div>
//       <div className="mb-4">
//         <strong>Phone:</strong> {user?.phone || "-"}
//       </div>

//       {message && (
//         <div
//           className={`p-3 mb-4 rounded ${
//             message.toLowerCase().includes("error") ||
//             message.toLowerCase().includes("failed")
//               ? "bg-red-100 text-red-700"
//               : "bg-green-100 text-green-700"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       <button
//         onClick={handlePayNow}
//         disabled={isLoading}
//         className={`w-full py-3 text-white rounded ${
//           isLoading
//             ? "bg-gray-500 cursor-not-allowed"
//             : "bg-blue-600 hover:bg-blue-700"
//         }`}
//       >
//         {isLoading
//           ? "Processing..."
//           : `Pay ₹${(PAYMENT_AMOUNT / 100).toFixed(2)}`}
//       </button>

//       {orderId && (
//         <p className="mt-4 text-center text-gray-600 text-sm">
//           Order ID: {orderId}
//         </p>
//       )}
//     </div>
//   );
// };

// export default PaymentGateway;
