package com.leyona.domain.dto;


import com.leyona.domain.Book;
import com.leyona.validation.ValidISBN10;
import com.leyona.validation.YearNotInFuture;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor @Data
public class BookDTO implements Serializable {


    private Integer id;

    @NotBlank @NotNull
    private String title;
    @NotBlank @NotNull
    private String author;
    @Min(1440) @YearNotInFuture @NotNull
    private Integer yearPublication;
    @NotBlank @NotNull @ValidISBN10
    private String ISBN;


    public Book convertToEntity() {
        Book book = new Book();
        book.setId(this.id);
        return setNonIdBook(book);
    }

    public Book updateEntity(Book book) {
        return setNonIdBook(book);
    }

    private Book setNonIdBook(Book book) {
        book.setTitle(this.title);
        book.setAuthor(this.author);
        book.setYearPublication(this.yearPublication);
        book.setISBN(this.ISBN);
        return book;
    }

    public static BookDTO toDto(Book book) {
        BookDTO dto = new BookDTO();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor());
        dto.setYearPublication(book.getYearPublication());
        dto.setISBN(book.getISBN());
        return dto;
    }
}
