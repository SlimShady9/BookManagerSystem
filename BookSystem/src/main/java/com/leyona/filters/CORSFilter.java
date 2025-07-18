package com.leyona.filters;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;

import java.io.IOException;
import java.util.logging.Logger;

@Provider
public class CORSFilter implements ContainerResponseFilter {
    private static final Logger logger = Logger.getLogger(CORSFilter.class.getName());

    @Override
    public void filter(ContainerRequestContext requestContext,
                       ContainerResponseContext responseContext) throws IOException {
        logger.info("CORS Filter triggered");
        String origin = requestContext.getHeaderString("Origin");

        if (origin != null && isAllowedOrigin(origin)) {
            responseContext.getHeaders().add("Access-Control-Allow-Origin", origin);
            responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
        }

        responseContext.getHeaders().add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
        responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        responseContext.getHeaders().add("Access-Control-Expose-Headers", "Location");
    }

    private boolean isAllowedOrigin(String origin) {
        // Allowlist your domains here
        return origin.equals("http://localhost:3000") || origin.equals("https://book.leyona.cloud");
    }
}
