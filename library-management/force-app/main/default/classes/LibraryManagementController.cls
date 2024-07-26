public with sharing class LibraryManagementController {
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBooks() {
        return [SELECT Id, Name, Genre__c, Published_year__c,
                Author__r.Name, Author__r.Email__c
        FROM Book__c];
    }
}