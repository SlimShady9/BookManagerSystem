import { useState } from "react";

import Button from "../compnents/Button";
import Modal from "../compnents/Modal";
import BookForm from "../compnents/BookForm";
import { useBooks } from "../context/BookContext";
import { ButtonTypeEnum } from "../utils/ButtonType";

export default function Header() {

  const [showModal, setShowModal] = useState(false)
  const { createBook } = useBooks();
  const submitBook = (bokData) => {
    createBook(bokData)
    setShowModal(false)
  }

  return (
    <>
      <header className="bg-white dark:bg-cyan-700 shadow p-2 sm:px-10 py-4">
        <div className="max-w-5xl mx-auto flex place-content-between gap-2 ">
          <h1 className="text-xl dark:text-white font-bold grid self-center">
            Book Library
          </h1>
          <Button label={ButtonTypeEnum.ADD} onClick={() => setShowModal(true)}></Button>
        </div>
      </header>
      <Modal isOpen={showModal}>
        <BookForm onSubmit={submitBook} closeModal={() => setShowModal(false)}/>
      </Modal>
    </>
  );
}
