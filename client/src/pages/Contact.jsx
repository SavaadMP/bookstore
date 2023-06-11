import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.username);
      setEmail(user.email);
    }
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    const body = { name, email, message };

    const response = await fetch("http://localhost:2200/api/user/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      toast.success("Message sent successfully");
      sendMessage("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-40 p-10">
      <ToastContainer />
      <div className="mt-8 md:px-56">
        <h2 className="text-xl font-semibold  text-center mb-10 underline">
          Contact Form
        </h2>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={sendMessage}
        >
          <div>
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              value={user.username}
              onChange={(e) => setName(e.target.value)}
              required={true}
              type="text"
              id="name"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              value={user.email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              type="email"
              id="email"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Your email address"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="message" className="block mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required={true}
              id="message"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              rows="4"
              placeholder="Your message"
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-indigo-700 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
