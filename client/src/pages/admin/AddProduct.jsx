import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBooksContext from "../../hooks/useBooksContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const AddProduct = () => {
  const { user } = useAuthContext();
  const { dispatch } = useBooksContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const navigate = useNavigate();

  const addNewBook = async (event) => {
    event.preventDefault();

    if (!user) {
      setError("You must be logged in!!");
      return;
    }

    const book = { title, description, price, author, imageURL };
    const response = await fetch(
      "https://bookstore-phi.vercel.app/api/admin/addBook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(book),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle("");
      setDescription("");
      setPrice("");
      setAuthor("");
      setImageURL("");
      setError(null);
      setEmptyFields([]);

      dispatch({ type: "CREATE_BOOK", payload: json });
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add a new book 📕
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={addNewBook}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className={`appearance-none ${
                  emptyFields.includes("title")
                    ? "border-red-600 border-2 text-red placeholder-red-500"
                    : "border-gray-400"
                } rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4`}
                placeholder="Name of the book"
              />
            </div>
            <div>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                placeholder="Descirption"
              />
            </div>
            <div>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                className={`appearance-none ${
                  emptyFields.includes("price")
                    ? "border-red-600 border-2 text-red placeholder-red-500"
                    : "border-gray-400"
                } rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4`}
                placeholder="Price"
              />
            </div>
            <div>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
                className={`appearance-none ${
                  emptyFields.includes("author")
                    ? "border-red-600 border-2 text-red placeholder-red-500"
                    : "border-gray-400"
                } rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4`}
                placeholder="author"
              />
            </div>
            <div>
              <input
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                type="text"
                className={`appearance-none ${
                  emptyFields.includes("imageURL")
                    ? "border-red-600 border-2 text-red placeholder-red-500"
                    : "border-gray-400"
                } rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4`}
                placeholder="Image URL"
              />
            </div>
          </div>
          {error && (
            <div className="border-2 border-red-200 p-2 rounded-md bg-red-300">
              <p className="text-center text-red-800">{error}</p>
            </div>
          )}
          <div>
            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add the book to database
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
