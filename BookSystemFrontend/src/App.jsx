
import Header from './layouts/Header'
import BookCard from './compnents/BookCard'
import { useState } from 'react'
import { useBooks } from './context/BookContext';
import { Toaster } from 'react-hot-toast';

function App() {

    const { books } = useBooks();
    const [isModalOpen, setIsModalOpen] = useState(false)


    return (
    <>
      <div className='min-h-screen bg-gray-50'>
        <Header/>
        <div className='min-h-screen bg-gray-100 p-2 sm:p-8'>
          <section className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
            {books.map(book => (
              <BookCard key={book.id} id={book.id} author={book.author} isbn={book.ISBN} title={book.title} yearPublication={book.yearPublication}/>
            ))}
          </section>
        </div>
        <Toaster />
      </div>
    </>
  )
}

export default App
