import { RefBook, UniversityLibrarian, Shelf } from './classes';
import { Logger, Book, Librarian, Magazine } from './intefaces';
import { Category } from './enums';
import { PersonBook, BookRequiredFields, UpdatedBook, СreateCustomerFunctionType } from './types';
import * as Func from './functions';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

Func.logFirstAvailable(Func.getAllBooks());
Func.logBookTitles(Func.getBookTitlesByCategory(Category.JavaScript));

console.log(Func.getBookAuthorByIndex(1));
console.log(Func.calcTotalPages());

const myID: string = Func.createCustomerID('Ann', 10);
console.log(myID);

let idGenerator: (name: string, id: number) => string;
idGenerator = (n: string, id: number) => `${id}-${n}`;
console.log(idGenerator('Kate', 20));
idGenerator = Func.createCustomerID;

Func.createCustomer('Olena');
Func.createCustomer('Olena', 24);
Func.createCustomer('Olena', 24, 'Lviv');

console.log(Func.getBookTitlesByCategory());
Func.logFirstAvailable();

console.log(Func.getBookByID(1));

const myBooks: string[] = Func.сheckoutBooks('Ann', 1, 2, 4);
console.log(myBooks);

const checkedOutBooks: string[] = Func.getTitles(2, false);
console.log(checkedOutBooks);

console.log(Func.bookTitleTransform('My Title'));
// console.log(bookTitleTransform(1));

const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 200,
    markDamaged: reason => console.log(`Damaged: ${reason}`)
};
Func.printBook(myBook);
myBook.markDamaged('missing back cover');

const logDamage: Logger = reason => console.log(`Damaged: ${reason}`);
logDamage('missing back cover');


const offer: any = {
    book: {
        title: 'Essential TypeScript'
    }
};
console.log(offer?.magazine?.title);
console.log(offer?.magazine?.getTitle());
console.log(offer?.book?.getTitle?.());

console.log(Func.getBookProp(Func.getAllBooks()[0], 'title'));
console.log(Func.getBookProp(myBook, 'markDamaged'));

// const ref = new ReferenceItem('My Title', 2020);
// ref.printItem();
// ref.publisher = 'Super Publisher';
// console.log(ref.publisher);
// console.log(ref);

const refBook: RefBook = new RefBook('Encyclopedia Title', 2012, 3);
refBook.printItem();

refBook.printCitation();

const favLibrarian: Librarian = new UniversityLibrarian();
favLibrarian.name = 'Solomia';
favLibrarian.assistCustomer('Alex');

const personBook: PersonBook = {
    id: 1,
    name: 'Ann',
    email: 'ann@example.com',
    title: 'No Title',
    author: 'Author',
    available: false,
    category: Category.HTML
};
console.log(personBook);

const flag = true;
if (flag) {
    import('./classes')
        .then(module => {
            const reader = new module.Reader();
            reader.name = 'Petro';
            console.log(reader);
        })
        .catch(err => console.log(err));
}

const inventory: Array<Book> = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];
// console.log(Func.purge(inventory));
// const result = Func.purge<number>([1, 2, 3]);
// const result1 = Func.purge([1, 2, '3']);

const bookShelf: Shelf<Book> = new Shelf<Book>();
inventory.forEach(book => bookShelf.add(book));
console.log(bookShelf.getFirst().title);

const magazines: Array<Magazine> = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];
const magazineShelf = new Shelf<Magazine>();
magazines.forEach(mag => magazineShelf.add(mag));
console.log(magazineShelf.getFirst().title);
magazineShelf.printTitles();
console.log(magazineShelf.find('Five Points'));

const bookWithRequiredFields: BookRequiredFields = {
    id: 0,
    title: 'Book Required Fields',
    author: 'Olena Shevchuk',
    available: false,
    category: Category.Software,
    pages: 0,
    markDamaged: null
};

const updatedBook: UpdatedBook = {
    title: 'Updated Title'
};

const params: Parameters<СreateCustomerFunctionType> = ['Andrii'];
Func.createCustomer(...params);

const librarian = new UniversityLibrarian();
librarian.name = 'Anna';
// librarian['printLibrarian']();
librarian.assistCustomer('Boris');
console.log(librarian.name);
console.log(librarian);

librarian.assistFaculty = null;
// librarian.teachCommunity = null;

const enc = new RefBook('Title', 2020, 3);
enc.printItem();

// enc.copies = -10;
enc.copies = 5;
console.log(enc.copies);

console.log('Start getBooksByCategory');
Func.getBooksByCategory(Category.JavaScript, Func.logCategorySearch);
Func.getBooksByCategory(Category.Software, Func.logCategorySearch);
console.log('Finish getBooksByCategory');

console.log('Start getBooksByCategoryPromise');
Func.getBooksByCategoryPromise(Category.JavaScript)
    .then(titles => {
        console.log(titles);
        return Promise.resolve(titles.length);
    })
    .then(numberOfBooks => console.log(numberOfBooks))
    .catch(reason => console.log(reason))
    .finally(() => console.log('End of promise'));
Func.getBooksByCategoryPromise(Category.Software)
    .then(titles => console.log(titles))
    .catch(reason => console.log(reason))
    .finally(() => console.log('End of promise'));
console.log('Finish getBooksByCategoryPromise');

console.log('Start logSearchResults');
Func.logSearchResults(Category.JavaScript)
    .catch(err => console.log(err));
console.log('Finish logSearchResults');