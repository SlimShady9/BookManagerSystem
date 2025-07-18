package com.leyona.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ISBNValidator  implements ConstraintValidator<ValidISBN10, String> {

    public boolean isValidISBN10(String isbn) {
        // Remove hyphens and trim whitespace
        isbn = isbn.replaceAll("-", "").trim();

        if (isbn.length() != 10) {
            return false;
        }

        int sum = 0;
        for (int i = 0; i < 9; i++) {
            char digitChar = isbn.charAt(i);
            if (!Character.isDigit(digitChar)) {
                return false; // Not a digit
            }
            sum += (digitChar - '0') * (10 - i);
        }

        char lastChar = isbn.charAt(9);
        if (Character.isDigit(lastChar)) {
            sum += (lastChar - '0') * 1;
        } else if (lastChar == 'X' || lastChar == 'x') {
            sum += 10 * 1;
        } else {
            return false;
        }

        return sum % 11 == 0;
    }

    @Override
    public boolean isValid(String isbn, ConstraintValidatorContext context) {
        return isValidISBN10(isbn);
    }
}
