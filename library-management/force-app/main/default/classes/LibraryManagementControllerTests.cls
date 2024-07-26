@isTest
public class LibraryManagementControllerTests {

    @testSetup
    public static void createTestData() {
        // Create some sample Author__c records
        Author__c author1 = new Author__c(Name='F. Scott Fitzgerald', Email__c='fitzgerald@example.com');
        insert author1;



        // Create some sample Book__c records
        Book__c book1 = new Book__c(Name='The Great Gatsby', Genre__c='Fiction', Published_year__c=2023, Author__c=author1.Id);
        insert book1;


    }

    @isTest
    public static void testGetBooks_returnsAllBooks() {
        Test.startTest();
        List<Book__c> books = LibraryManagementController.getBooks();
        Test.stopTest();

        // Assert that the returned list contains the expected number of books
        System.assertEquals(2, books.size());

        // Assert that the returned books have the expected data
        Book__c book1 = books[0];


        if (book1.Name == 'The Great Gatsby') {
            System.assertEquals('F. Scott Fitzgerald', book1.Author__r.Name);
            System.assertEquals('fitzgerald@example.com', book1.Author__r.Email__c);
        } 
    }
}