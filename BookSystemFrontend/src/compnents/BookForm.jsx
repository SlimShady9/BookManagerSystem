import React, { useEffect } from 'react';

import Button from './Button';
import { useForm } from 'react-hook-form';
import { ButtonTypeEnum } from '../utils/ButtonType';
import { useBooks } from '../context/BookContext';


export default function BookForm({ onSubmit, initialBookData, closeModal }) {

  const { books } = useBooks()
  const isEditMode = !!initialBookData;


  const validateISBN10 = (isbn) => {
    const cleanedIsbn = isbn.replace(/[- ]/g, '').toUpperCase().trim();
    if (cleanedIsbn.length !== 10) {
      return "ISBN has invalid length";
    }
    

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      const digit = parseInt(cleanedIsbn[i], 10);
      if (isNaN(digit)) return 'ISBN-10 contains invalid characters.';
      sum += digit * (10 - i);
    }

    const lastChar = cleanedIsbn[9];
    const lastDigit = lastChar === 'X' ? 10 : parseInt(lastChar, 10);

    if (isNaN(lastDigit)) return 'ISBN-10 contains invalid characters.';

    sum += lastDigit * 1;
    
    if (sum % 11 !== 0) return 'Invalid ISBN-10 checksum.'
    const ISBNs = books.map(book => book.ISBN.replace(/[- ]/g, '').toUpperCase().trim())
    if (ISBNs.indexOf(cleanedIsbn) != -1 && !isEditMode) return 'ISBN already registered.'

  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialBookData
      ? {
          ...initialBookData,
          yearPublication: String(initialBookData.yearPublication),
        }
      : {
          title: '',
          author: '',
          yearPublication: '',
          ISBN: '',
        },
  });

  useEffect(() => {
    if (initialBookData) {
      reset({
        ...initialBookData,
        yearPublication: String(initialBookData.yearPublication),
      });
    } else {
      reset({
        title: '',
        author: '',
        yearPublication: '',
        ISBN: '',
      });
    }
  }, [initialBookData, reset]);

  const handleFormSubmit = (data) => {
    const submittedData = {
      ...data,
      ISBN: data.ISBN.trim(),
      yearPublication: Number(data.yearPublication),
    };
    onSubmit(submittedData);
    if (!initialBookData) {
      reset();
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="md:p-6 max-w-md mx-auto bg-white space-y-4 font-inter">
      <Button className={"absolute top-3 right-3"} label={ButtonTypeEnum.CANCEL} onClick={closeModal}/>
      <h2 className="text-2xl font-bold text-center text-gray-800">
        {isEditMode ? 'Edit Book' : 'Add New Book'}
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register('title', {
              required: 'Title is required',
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Author Field */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            id="author"
            {...register('author', {
              required: 'Author is required',
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
          )}
        </div>

        {/* Year Publication Field */}
        <div>
          <label htmlFor="yearPublication" className="block text-sm font-medium text-gray-700">
            Year of Publication
          </label>
          <input
            type="number"
            id="yearPublication"
            {...register('yearPublication', {
              required: 'Year of Publication is required',
              valueAsNumber: true, // Converts input string to number
              min: {
                value: 1440,
                message: 'Year must be at least 1440',
              },
              max: {
                value: currentYear,
                message: `Year cannot be in the future (max ${currentYear})`,
              },
              validate: (value) => {
                // Custom validation for integer and positive, as min/max handle range
                if (isNaN(value) || !Number.isInteger(value)) {
                  return 'Year must be an integer';
                }
                if (value <= 0) {
                  return 'Year must be a positive number';
                }
                return true; // Validation passes
              },
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.yearPublication && (
            <p className="mt-1 text-sm text-red-600">{errors.yearPublication.message}</p>
          )}
        </div>

        {/* ISBN Field */}
        <div>
          <label htmlFor="ISBN" className="block text-sm font-medium text-gray-700">
            ISBN (e.g., 0-306-40615-2)
          </label>
          <input
            type="text"
            id="ISBN"
            {...register('ISBN', {
              required: 'ISBN is required',
              validate: validateISBN10,
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.ISBN && (
            <p className="mt-1 text-sm text-red-600">{errors.ISBN.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 sm:rounded-lg "
        >
          {isEditMode ? 'Update book' : 'Add book'}
        </button>
      </form>
    </div>
  );
}
