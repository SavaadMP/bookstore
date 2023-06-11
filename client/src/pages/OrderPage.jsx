import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const OrderPage = () => {
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [cartPrice, setCartPrice] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getCartPrice = async () => {
      const response = await fetch(
        "http://localhost:2200/api/user/getCartPrice",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();
      setCartPrice(json.total);
    };

    if (user) {
      getCartPrice();
    }
  }, []);

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!user) return;

    const body = {
      name,
      phone,
      pinCode,
      district,
      address,
      paymentMethod,
      cartPrice,
    };
    const response = await fetch("http://localhost:2200/api/user/placeOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(body),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      return;
    }

    if (response.ok) {
      setName("");
      setPhone("");
      setPinCode("");
      setDistrict("");
      setAddress("");
      setPaymentMethod("");
      setError(null);
      setEmptyFields([]);

      navigate("/orders");
    }
  };

  return (
    <div className="py-40 flex justify-around ">
      <form
        onSubmit={placeOrder}
        className="max-w-lg bg-white w-full rounded-lg shadow-md p-6"
      >
        <h2 className="text-2xl font-bold mb-4 -tracking-tighter">
          Address Details
        </h2>

        <div className="flex">
          <div className="mb-4 mr-5">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              value={name}
              className="border border-gray-400 rounded px-3 py-2 w-full focus:outline focus:border-indigo-700"
              placeholder="eg: John Doe"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="number"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone number:
            </label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="number"
              id="number"
              className="border border-gray-400 rounded px-3 py-2 w-full focus:outline focus:border-indigo-700"
              placeholder="eg: 0000000000"
            />
          </div>
        </div>

        <div className="flex">
          <div className="mb-4 mr-4">
            <label
              htmlFor="pinCode"
              className="block text-gray-700 font-bold mb-2"
            >
              Pin Code:
            </label>
            <input
              onChange={(e) => setPinCode(e.target.value)}
              value={pinCode}
              type="number"
              id="pinCode"
              className="border border-gray-400 rounded px-3 py-2 w-full focus:outline focus:border-indigo-700"
              placeholder="eg:  679338"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-gray-700 font-bold mb-2"
            >
              District:
            </label>
            <input
              onChange={(e) => setDistrict(e.target.value)}
              value={district}
              type="text"
              id="district"
              className="border border-gray-400 rounded px-3 py-2 w-full focus:outline focus:border-indigo-700"
              placeholder="eg:  Malappuram"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 font-bold mb-2"
          >
            Address
          </label>
          <textarea
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            id="address"
            className="border border-gray-400 rounded px-3 py-2 w-full focus:outline focus:border-indigo-700"
            placeholder="Enter Your Address.. Please Include House Name, Extra Phone Number And Many More.. Make It More Clear As Much As You Can!!"
          ></textarea>
        </div>

        <h4 className="font-bold mb-4">Payment Method:</h4>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="COD"
            name="payment"
            value="COD"
            className="mr-2"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="cod" className="text-gray-600">
            Cash on Delivery
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="online-payment"
            name="payment"
            value="online"
            className="mr-2"
            checked={paymentMethod === "online"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="online-payment" className="text-gray-600">
            Online Payment
          </label>
        </div>

        <p className="text-base text-gray-500 mt-4">
          We highly recomment to go with COD. we are not responsible for any
          money loss!!
        </p>

        {error && (
          <div className="border-2 my-5 border-red-200 p-2 rounded-md bg-red-300">
            <p className="text-center text-red-800">{error}</p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderPage;
