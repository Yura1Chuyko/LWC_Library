import { LightningElement, wire } from 'lwc';
import getBooks from '@salesforce/apex/LibraryManagementController.getBooks';

const columns = [
    { label: 'Book Name', fieldName: 'Name' },
    { label: 'Author Name', fieldName: 'AuthorName' },
    { label: 'Author Email', fieldName: 'AuthorEmail' },
    { label: 'Genre', fieldName: 'Genre__c' },
    { label: 'Published Year', fieldName: 'Published_year__c', type: 'number' }
];

export default class BookList extends LightningElement {
    searchTerm ='';

    columns = columns;
    books;

    @wire(getBooks)
    wiredBooks(result) {
        this.books = result;
        if (result.data) {
            // Map related Author fields
            this.books.data = result.data.map(book => ({
                ...book,
                AuthorName: book.Author__r ? book.Author__r.Name : '',
                AuthorEmail: book.Author__r ? book.Author__r.Email__c : ''
            }));
        }
    }

    exportToCSV() {
        let selectedRows = [];
        let downloadRecords = [];
        selectedRows =  this.template.querySelector("lightning-datatable").getSelectedRows()
        if(selectedRows.length > 0){
           downloadRecords = [...selectedRows];
        } else {
            downloadRecords = [...this.data];
        }
        let csvFile = this.convertArrayToCsv(downloadRecords);
        this.createLinkForDownload(csvFile)
    }
    convertArrayToCsv(downloadRecords) {
        let csvHeader = Object.keys(downloadRecords[0]).toString();
        let csvBody = downloadRecords.map(currItem => Object.values(currItem).toString());
        let csvFile = csvHeader + '\n' + csvBody.join('\n');
        return csvFile;
    }
    createLinkForDownload(csvFile){
        const downLink = document.createElement("a");
        downLink.href = "data:text/csv;chatset=utf-8," + encodeURI(csvFile);
        downLink.target = "_blank";
        downLink.download = "Book_Data.csv";
        downLink.click();
    }
    handleKeyChange(event){
        this.searchTerm = event.target.value;
    }

}
