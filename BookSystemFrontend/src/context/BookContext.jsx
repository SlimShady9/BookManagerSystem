import { createContext, useContext, useEffect, useState } from "react";
import {
  updateBookService,
  addBookService,
  getBookService,
  removeBookService,
  getBooksService,
} from "../services/bookService";
import toast from "react-hot-toast";

const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const data = await getBooksService();
      setBooks(data);
    } catch (err) {
      toast.error("Error loading books, please contact support.", {duration:5000});
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      const status = await removeBookService(id);
      if (status == 200) {
        setBooks(books.filter((book) => book.id !== id));
        toast.success("Book deleted succesfully", {duration:5000});
      } else {
        throw new Error("Error deleting book");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting, please contact support.", {duration:5000});
    }
  };

  const createBook = async (book) => {
    try {
      const res = await addBookService(book);
      if (res.status >= 400 && res.status <= 499) {
        const msg = await res.text()
        toast.error("Could not create the book", {duration:5000})
        return
      }
      if (res.status >= 500) {
        toast.error("Error at creating book, please reach to administrator.", {duration:5000})
        return
      }
      const newBook = await getBookService(res.headers.get("Location"))
      setBooks([...books, newBook]);
      toast.success("Book created succesfully.", {duration:5000})
      
    } catch (err) {
      console.error("Error creating the book, ", err);
    }
  };

  const updateBook = async (book) => {
    try {
      const updatedBookResult = await updateBookService(book);
      setBooks(
        books.map(
          (b) => (b.id === book.id ? book : b)
        )
      );
      toast.success(`Book "${updatedBookResult.title}" updated successfully!`, {duration:5000});
    } catch (err) {
      console.error("Error updating book:", err);
      toast.error("Error updating book, please contact support.", {duration:5000});
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{ books, fetchBooks, deleteBook, createBook,updateBook, loading }}
    >
      {children}
    </BookContext.Provider>
  );
}

export const useBooks = () => useContext(BookContext);
