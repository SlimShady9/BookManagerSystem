package com.leyona.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = ISBNValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidISBN10 {
    String message() default "Must be valid isbn 10";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}