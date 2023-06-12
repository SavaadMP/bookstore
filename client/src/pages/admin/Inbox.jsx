import React, { useEffect, useState } from "react";
import Message from "../../components/Messages/Message";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../../components/Loader/Loader";

const Inbox = () => {
  const { user } = useAuthContext();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch("http://localhost:2200/api/admin/messages", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setMessages(json);
      }
    };

    if (user) {
      fetchMessages();
    }
  }, [messages]);

  return (
    <div className="py-40 p-2 flex flex-col items-center">
      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      ) : (
        <div
          className="flex items-center justify-center "
          style={{ height: "42vh" }}
        >
          <h2 className="text-3xl font-bold">Empty Messages ☹️</h2>
        </div>
      )}
    </div>
  );
};

export default Inbox;
