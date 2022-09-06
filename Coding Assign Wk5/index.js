class Book { // created a class named Book
    constructor(name, year) { // class will take the book name and year written
        this.name = name; 
        this.year = year;
    }
    describe() {
        return `${this.book} was written ${this.year}.`; // class will return the entered book name and year written
    }
}

class Author { // created a class named Author
    constructor(name) { //class will take the name of book author
        this.name = name;
        this.books = [];
    }

    addBook(book) { // method to take a book 
        if (book instanceof Book) { // check to see if a book is an instance of our book class
            this.books.push(book); // push a new book to the book array
        } else {
            throw new Error(`You can only add an instance of Book. Argurment is not a book: ${book}`);
        }
    }

    describe() {
        return `${this.name} has ${this.books.length} books.` // print out the name of author and how many of their books we have
    }
}

class Menu {
    constructor() {
        this.authors = []; // array to collect multiple authors
        this.selectedAuthor = null; // show a selected author from array
    }

    start () {
        let selection = this.showMainMenuOptions(); // return the selection the user gives us

        while (selection != 0) { // get users input 
            switch (selection) { // display different selections for the user
                case '1':
                    this.createAuthor();
                    break;
                case '2':
                    this.viewAuthor();
                    break;
                case '3':
                    this.deleteAuthor();
                    break;
                case '4':
                    this.displayAuthors();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Adios!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new author
        2) view author
        3) delete author
        4) display all authors
        `);
    }

    showAuthorMenuOptions (authorInfo) { 
        return prompt(`
        0) back
        1) create book
        2) delete book
        ---------------
        ${authorInfo}
        `);
    }

    displayAuthors() {
        let authorString = ''; // create a blank string
        for (let i= 0; i < this.authors.length; i++) { // iterate through authors
            authorString += i + ') ' + this.authors[i].name + '\n'; // get the name of each author numbered on a new line
        }
        alert (authorString); // see all the authors
    }

    createAuthor () { // method to create author
        let name = prompt ('Enter name for new author:'); // prompt the user to enter the name of an author
        this.authors.push(new Author(name)); // push new author to authors array
    }

    viewAuthor() { // method to view author
        let index = prompt('Enter the index of the author you wish to view:'); // prompt user to enter index to view selected author
        if (index > -1 && index < this.authors.length) {
            this.selectedAuthor = this.authors[index]; // set selected author class propterty to the author input by user 
            let description = 'Author:' + this.selectedAuthor.name + '\n'; 
            
            for (let i = 0; i < this.selectedAuthor.books.length; i++) { // for loop to iterate through the selected authors books array
                description += i + ') ' + this.selectedAuthor.books[i].name + ' - ' + this.selectedAuthor.books[i].year + '\n';
            }

            let selection = this.showAuthorMenuOptions(description) // pass in description to display author and show options for author
            switch (selection) { // created options under author - create or delete book
                case '1':
                    this.createBook();
                    break;
                case '2':
                    this.deleteBook();
            }
        }
    }

    deleteAuthor() { //method to delete author
        let index = prompt('Enter the index of the author you want to delete:'); //prompt user to enter the index of author they want to delete
        if (index > -1 && index < this.authors.length) {
            this.authors.splice(index, 1); //delete the author under entered index
        }
    }

    createBook() { //method to create a book
        let name = prompt('Enter name for new book:'); // prompt user to enter the name and year of book
        let year = prompt('Enter year for new book:');
        this.selectedAuthor.books.push(new Book(name, year)); // push the new book, with its name and year, to the selected author's books array
    }

    deleteBook() { // method to delete a book
        let index = prompt('Enter the index of the book you want to delete:'); //prompt user to enter index of book they want to delete
        if (index > -1 && index < this.selectedAuthor.books.length) { 
            this.selectedAuthor.books.splice(index, 1); // delete book under user entered index from the selected author's books array 
        }
    }
}

let menu = new Menu ();
menu.start();