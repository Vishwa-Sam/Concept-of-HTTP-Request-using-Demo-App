# HTTP Concepts Demo App
This demo app is designed to explain and showcase HTTP concepts in Angular. It demonstrates how to interact with backend APIs using Angular's HTTP client, manage errors, and use HTTP interceptors for request/response handling and error management.
 
 ---
 
## Features
Generate Image: Retrieve images from the backend using HTTP GET.

Add to Favourite Places: Add an image to the "favourite place" section by sending its data to the backend using HTTP PUT. Prevents duplicate entries automatically.

Remove Image: Remove an image from the "favourite place" section using HTTP DELETE.

Error Dialogues: Displays a dialogue box for any error that occurs during getting, adding, or removing images via HTTP.

HTTP Interceptors: Handles and manages HTTP request/response logic globally with interceptor(s).

---

## Core Angular & HTTP Concepts Illustrated
HTTP Methods:
Uses GET to fetch images, PUT to add favourites, and DELETE to remove them, illustrating RESTful interaction patterns.

Preventing Duplicates:
Ensures that adding an image already present in favourites is blocked on the frontend.

Error Handling:
All HTTP errors are caught, and a user-friendly dialogue box displays a clear error message.

HTTP Interceptors:
Demonstrates Angular's HTTP interceptors to centrally manage tasks such as error handling, logging, and modifying requests/responses before they reach the app or backend.

---

## How It Works
Click Generate Image to fetch a new image from the backend.

Add the image to your favourite places; if it's already present, you’ll get a notification preventing duplicate entry.

Remove an image from favourites using the provided interface.

If any HTTP operation fails (due to network/API/server errors), an error dialogue is automatically shown to the user, handled globally by an HTTP interceptor.

---

## Educational Value
Learn to structure HTTP requests and handle different methods in Angular.

See how HTTP interceptors are used to DRY up error and authentication handling.

Experience robust error handling for real-world user experience.

Gain practical skill in RESTful patterns and Angular's HttpClient system.
