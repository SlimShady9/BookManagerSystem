package com.leyona.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.Year;

public class YearNotInFutureValidator implements ConstraintValidator<YearNotInFuture, Integer> {

    @Override
    public boolean isValid(Integer year, ConstraintValidatorContext context) {
        if (year == null) return true; // Use @NotNull for null check
        int currentYear = Year.now().getValue();
        return year <= currentYear;
    }
}