/**
 * Created by adm on 25.07.2024.
 */

import { LightningElement,track,wire } from 'lwc';
import searchBooks from '@salesforce/apex/BookSearchController.searchBooks';
export default class SearchBar extends LightningElement {
    @track searchKey= '';
    @track books;
    @track error;

    @wire(searchBooks, { searchKey: '$searchKey' })
    wiredBooks({ error, data }) {
        if (data) {
            this.books = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.books = undefined;
        }
    }

    handleSearchKeyChange(event) {
        this.searchKey = event.target.value;
    }
}