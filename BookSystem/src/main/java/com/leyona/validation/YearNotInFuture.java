package com.leyona.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = YearNotInFutureValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface YearNotInFuture {
    String message() default "Year must not be in the future";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}