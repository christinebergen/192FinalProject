# ITAS 192 Final Project

## Traditional Irish Music Randomizer with Wikipedia search
## By: Christine Bergen


### Purpose of this project
Being a musician with a keen interest in Traditional Irish music, I wanted to provide users a way to randomly choose 
a Traditional Irish tune from the top 50 most popular tunes on a commonly used site for Irish Music: thesession.org. 

With thousands of tunes out there, it can be very challenging to decide which tunes to play next, 
and this website can help to direct the user towards a popular tune that would be worthwhile to learn.
This website will also provide some background information about the tune that is displayed via the Wikipedia 
API. 

### API's used:
https://thesession.org/api
https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=earth&limit=5

## JS code stack
React JS Library: 
Anime JS Library: https://animejs.com


### Challenges & If I Had More Time...

Initially, after the random tune name was obtained, I wanted to be able to show a page from 
thesession.org website that showed the sheet music. After some deliberation it was decided that it may be 
fairly complicated, and that the current timeline for this project likely would not see this feature to completion. 
I also attempted to add a YouTube search to the site, that searched for the top video using the name of the tune 
obtained randomly. This proved problematic to access the information needed, so I decided to try the Wikipedia API, which
seemed to be implemented fairly seamlessly. If I had more time, I would have liked to work a bit more on these 2 pieces of 
functionality.

### Resources
I did have some help from Chat GPT for troubleshooting some of the functions.


### General Course Feedback
Overall this was a decent course. I definitely do not feel like I'm confident in any aspect of JS though. It's a pretty tough concept to grasp with no coding experience prior to last September. I would like to see more coding examples given in class that we all go through together. Being told to "refer to the slides" isn't very helpful, as the slides don't lay out the coding in the proper context. "Refer to the slides" format works well for HTML and CSS as they are extremely simple in the land of coding, but I think JS deserves a much deeper dive.



Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
