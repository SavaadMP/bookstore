import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBooksContext from "../../hooks/useBooksContext";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const { dispatch } = useBooksContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        "http://localhost:2200/api/admin/book/" + id
      );
      const json = await response.json();

      setTitle(json.title);
      setDescription(json.description);
      setPrice(json.price);
      setAuthor(json.author);
      setImageURL(json.imageURL);
    };

    fetchBooks();
  }, []);

  const updateBook = async (e) => {
    e.preventDefault();

    const book = { title, description, price, author, imageURL };
    const response = await fetch(
      "http://localhost:2200/api/admin/editbook/" + id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      dispatch({ type: "UPDATE_BOOK", payload: json });
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update the book 📖
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={updateBook}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className={`appearance-none border-gray-400 rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4`}
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
                className={`appearance-none border-gray-400rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4`}
                placeholder="Price"
              />
            </div>
            <div>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
                className={`appearance-none border-gray-400rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4`}
                placeholder="author"
              />
            </div>
            <div>
              <input
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                type="text"
                className={`appearance-none border-gray-400rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4`}
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
              Update the book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
