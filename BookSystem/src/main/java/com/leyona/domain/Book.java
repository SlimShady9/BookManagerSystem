package com.leyona.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor @Data
@Entity
@Table(name = "Book")
public class Book implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String author;
    private Integer yearPublication;
    @Column(unique = true)
    private String ISBN;

}
