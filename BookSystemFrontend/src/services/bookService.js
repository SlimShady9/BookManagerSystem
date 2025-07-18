const BASE_API_URL = import.meta.env.VITE_API_URL;

const API_URL = `${BASE_API_URL}/api/books`;

export async function getBooksService() {
  const res = await fetch(API_URL);
  return res.json()
}

export async function getBookService(location) {
  const res = await fetch(location);
  return res.json();
}


export async function addBookService(book) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  return res;
}

export async function removeBookService(bookId) {
  const res = await fetch(`${API_URL}/${bookId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return res.status;
}

export async function updateBookService(book) {
  const res = await fetch(`${API_URL}/${book.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });
  return await res.json();
}

