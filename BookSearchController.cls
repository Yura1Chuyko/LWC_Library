public with sharing class BookSearchController {
    @AuraEnabled(cacheable=true)
    public static List<Book__c> searchBooks(String searchKey) {
        String query = '%' + searchKey + '%';
        return [
                SELECT Id, Name, Genre__c, Published_year__c,
                        Author__r.Name, Author__r.Email__c
                FROM Book__c
                WHERE Name LIKE :query OR
                Genre__c LIKE :query OR
                Author__r.Name LIKE :query OR
                Author__r.Email__c LIKE :query
        ];
    }
}
