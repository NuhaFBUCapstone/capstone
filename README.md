# capstone

**Product Spec**

 - A social book cataloguing app that allows you to create lists and save books to those lists.
 - Contains a page that incorporates the Spotify API to create a playlist based off a given book.
 - Allows you to send and accept/reject friend requests and view friends' public lists

**Components and Features**

 - Search
		 - search by title or author
		 - clicking on books takes you to a book detail page
  - Home
		 - see showcase of trending books
		 - Login/Signup option if not already logged in
		 - About Us section
 - My Library
		 - display user's lists (user specific information)
		 - "read" list is already created for every user, other lists can be created
		 - allow user to set/create public and private lists
		 - see friends lists here?
 - Playlist
		 - search for a book
		 - user can add preferences/filters to search; for example they can check the instrumental box to get only instrumental songs
		 - user can choose length of playlist
		 - returns a list of songs 
		 - allow option to create a Spotify playlist with the songs
 - Book Details
		 - when clicking on a book from the search page or in My Library, a full book detail page opens
		 - includes user rating + review along with synopsis, publication date, author, etc. 
		 - allow option to add to a list
		 - also include friends rating + reviews ?
 - Profile
		 - see list of friends
		 - user stats--how many pages and books read, average rating given, etc. (based off "read" list)
		 - viewable from popup tab on upper right corner of screen
		 - Logout option

**Wireframes:** https://www.figma.com/file/Z8rZ9U3uHcNYSy41EQV7P6/goodreads?node-id=0%3A1

**User Stories**

 1. As a user, I want to be able to search by title or author.
 2. As a user, I want to click on a book to get more details, so I can see a summary and rating information.
 3. I want an option to choose whether the generated playlist contains strictly instrumental music since some users prefer that while reading. 
 4. As a user, I want to write private notes about the books in my lists so I can remember certain things about them.
 5. As a user, I want to see similar recommended books after I finish a book I liked.
 6. As a user, I want to choose the approximate length of my generated playlist.
 7. As a user, I want to have a profile page with stats like how many books/pages I've read, when I joined, etc.
 8. As a user, I want to have a library page that contains all my lists and saved books.
 9. As a user, I want to have an explore page where I can search for other books.
 10. As a user, I want to have a header that contains a link to the home page, explore page, and playlist generation page.
