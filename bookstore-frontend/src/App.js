import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:8080";

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const addBook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/book`, newBook);
      setBooks([...books, response.data]);
      setNewBook({ title: "", author: "" });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`${API_URL}/book/${id}`);
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="App">
      <h1>Bookstore Management</h1>
      <div className="book-list">
        <h2>Books</h2>
        {books.map((book) => (
          <div key={book.id} className="book">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>ID: {book.id}</p>
            <button onClick={() => deleteBook(book.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={addBook} className="add-book-form">
        <h2>Add New Book</h2>
        <input
          type="text"
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
          placeholder="Book Title"
          required
        />
        <input
          type="text"
          name="author"
          value={newBook.author}
          onChange={handleInputChange}
          placeholder="Book Author"
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default App;
