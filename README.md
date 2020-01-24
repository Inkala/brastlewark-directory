## About this test

To see this test working, clone the repository, type `npm install` from the root folder and then type `npm start`.

### The test

The app has a main page that renders a card for each gnome divided by pages according to the amount of results from the JSON. The search bar filters the gnomes by name and clicking the card will open the details page with all the information about the gnomes and links to their friends.

###Technologies used

For this test I chose to use [React](https://reactjs.org/) for it is not only the JavaScript tool in which I have more knowledge and experience, but also because it is one of the suggestions for the test.

I also used [Redux](https://redux.js.org/) because it is a tool used with [React](https://reactjs.org/) very often, and because having a global state can be really useful when handling data that should be available and modified by more than one component.

For fetching the information from the URL I used [axios](https://github.com/axios/axios).

### Success

All the functionalities that were added to the app are working as expected. 

### Challenges

I don't have much experience using Redux and it was a good practice.

I also haven't worked much with tests so I had to do some research on that. I tried testing the asynchronous behaviour with redux-mock-store and moxios but I was not able to make it work.

### What to improve

There are always things that you want to improve when developing something. For example I want to add more tests, async tests, split the actions and reducers into different files or limit the amount of buttons in the pagination to those closer to the current page.

The CSS can be improved with animations.

### Additional notes

I love RPGs, which made the test super fun to do :)