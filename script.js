const books = JSON.parse(localStorage.getItem("books")) || [];

document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById("book-form");

    // Load books on page load
    renderBooks();

    // Add book event
    bookForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const isCompleted = document.getElementById("isCompleted").checked;

        const newBook = {
            id: Date.now(),
            title,
            author,
            isCompleted
        };

        books.push(newBook);
        saveBooks();
        renderBooks();

        bookForm.reset();
    });
});

// Save to local storage
function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

// Render books
function renderBooks() {
    const uncompletedContainer = document.querySelector("#uncompleted-books .book-container");
    const completedContainer = document.querySelector("#completed-books .book-container");

    uncompletedContainer.innerHTML = "";
    completedContainer.innerHTML = "";

    books.forEach((book) => {
        const bookElement = createBookElement(book);
        if (book.isCompleted) {
            completedContainer.appendChild(bookElement);
        } else {
            uncompletedContainer.appendChild(bookElement);
        }
    });
}

// Create book element
function createBookElement(book) {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    bookItem.innerHTML = `
        <strong>${book.title}</strong><br>
        <small>by ${book.author}</small><br>
    `;

    const toggleButton = document.createElement("button");
    toggleButton.textContent = book.isCompleted ? "Mark as Unread" : "Mark as Read";
    toggleButton.addEventListener("click", () => {
        book.isCompleted = !book.isCompleted;
        saveBooks();
        renderBooks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "5px";
    deleteButton.addEventListener("click", () => {
        const bookIndex = books.findIndex((b) => b.id === book.id);
        books.splice(bookIndex, 1);
        saveBooks();
        renderBooks();
    });

    bookItem.appendChild(toggleButton);
    bookItem.appendChild(deleteButton);

    return bookItem;
}

const bookForm = document.querySelector('[data-testid="bookForm"]');
const searchForm = document.querySelector('[data-testid="searchBookForm"]');


const titleInput = document.querySelector('[data-testid="bookFormTitleInput"]');
const authorInput = document.querySelector('[data-testid="bookFormAuthorInput"]');
const yearInput = document.querySelector('[data-testid="bookFormYearInput"]');
const isCompletedCheckbox = document.querySelector('[data-testid="bookFormIsCompleteCheckbox"]');

const uncompletedContainer = document.querySelector('[data-testid="incompleteBookList"] .book-container');
const completedContainer = document.querySelector('[data-testid="completeBookList"] .book-container');
