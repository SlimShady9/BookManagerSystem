package com.leyona.services;

import com.leyona.domain.dto.BookDTO;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;


public interface BookService {

    @GET
    @Path("{id}")
    public Response getBook(@PathParam("id") Integer id);



    @GET
    public Response getBooks();

    @PUT
    @Path("{id}")
    public Response updateBook(@PathParam("id") Integer id, @Valid BookDTO dto);

    @POST
    public Response createBook(@Valid BookDTO dto, @Context UriInfo uriInfo);

    @DELETE
    @Path("{id}")
    public Response deleteBook(@PathParam("id") Integer id);

}
