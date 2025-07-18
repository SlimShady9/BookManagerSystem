package com.leyona.ejb;

import com.leyona.domain.Book;
import jakarta.ejb.Stateless;
import jakarta.enterprise.context.Dependent;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.List;
import java.util.logging.Logger;

@Stateless
@Dependent
@Transactional
public class BookQueries {

    Logger logger = Logger.getLogger(BookQueries.class.getName());

    @PersistenceContext(unitName = "MyPU")
    private EntityManager em;


    public List<Book> getBooks() {
        return em.createQuery("Select b from Book b", Book.class)
                .getResultList();
    }

    public Book getBook(Integer id) throws NotFoundException {
        logger.info(String.format("getBook {} %s", id));
        Book book = em.find(Book.class, id);
        if (book == null) {
            throw new NotFoundException(String.format("Book with id %s not found", id));
        }
        return book;
    }

    public void makeBook(Book newBook) throws EntityExistsException {
        em.persist(newBook);
    }

    public Book updateBook(Book book) {
        return em.merge(book);
    }

    public void deleteBook(Integer id) {
        Book book = getBook(id);
        em.remove(book);
    }


}
