import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import BookForm from "./BookForm"
import { ButtonTypeEnum } from "../utils/ButtonType";
import toast from "react-hot-toast";
import { useBooks } from "../context/BookContext";

function BookCard({ id, title, author, isbn, yearPublication }) {

  const bookData = {
    id,
    title,
    author,
    ISBN: isbn,
    yearPublication
  }
  const [openModal, setOpenModal] = useState(false)

  const { deleteBook, updateBook } = useBooks()

  const submitBook = (bokData) => {
    updateBook(bokData)
    setOpenModal(false)
  }

  var confirmDeleteBook = (id, title) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animation-enter" : "animation-leave"
        } max-w-md w-full bg-white shadow-lg rounded pointer-events-auto flex ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            
            <div className="ml-3 flex-1">
              <p className="text-lg  text-gray-800 mb-2">Are you sure you want to delete book {title}?</p>
              <Button label={ButtonTypeEnum.CONFIRM_DELETE} onClick={() => {
                deleteBook(id)
                toast.remove(t.id)
              }} />
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <Button
            onClick={() => {
                toast.remove(t.id)
            }}
            label={ButtonTypeEnum.CANCEL} />
        </div>
      </div>
    ),
    {duration: Infinity}
  )};

  return (
    <>
      <div className="bg-white sm:rounded-2xl shadow-md p-4 ">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">
          by {author} in {yearPublication}
        </p>
        <p className="text-sm text-gray-500 mb-2">ISBN: {isbn}</p>
        <div className="pt-2 flex sm:place-content-end gap-3">
          <Button label={ButtonTypeEnum.EDIT} onClick={() => setOpenModal(true)}/>
          <Button label={ButtonTypeEnum.DELETE} onClick={() => confirmDeleteBook(id, title)} />
        </div>
      </div>
      <Modal isOpen={openModal} >
        <BookForm initialBookData={bookData} closeModal={() => setOpenModal(false)} onSubmit={submitBook}/>
      </Modal>
    </>
  );
}

export default BookCard;
