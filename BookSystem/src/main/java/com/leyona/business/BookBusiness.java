package com.leyona.business;

import com.leyona.domain.Book;
import com.leyona.domain.dto.BookDTO;
import com.leyona.ejb.BookQueries;
import com.leyona.services.BookService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;

import java.net.URI;
import java.util.List;
import java.util.logging.Logger;


@Path("/books")
@Produces("application/json")
@Consumes("application/json")
public class BookBusiness implements BookService {

    Logger logger = Logger.getLogger(BookBusiness.class.getName());

    @Inject
    private BookQueries bookQueries;

    @Override
    public Response getBook(Integer id) {
        Book book = bookQueries.getBook(id);
        return Response.ok(BookDTO.toDto(book)).build();
    }

    @Override
    public Response getBooks() {
        List<Book> books = bookQueries.getBooks();
        List<BookDTO> booksDto = books.stream().map(BookDTO::toDto).toList();
        return Response.ok(booksDto).build();
    }

    @Override
    public Response updateBook(Integer id, BookDTO dto) {
        Book book = bookQueries.getBook(id);
        Book updated = dto.updateEntity(book);
        updated = bookQueries.updateBook(updated);
        return Response.ok(BookDTO.toDto(updated)).build();
    }

    @Override
    public Response createBook(BookDTO dto, UriInfo uri) {
        Book book = dto.convertToEntity();
        bookQueries.makeBook(book);

        URI location = uri.getAbsolutePathBuilder()
                .path(String.valueOf(book.getId()))
                .build();

        return Response.created(location).build();
    }

    @Override
    public Response deleteBook(Integer id) {
        bookQueries.deleteBook(id);

        return  Response.ok().build();
    }


}
