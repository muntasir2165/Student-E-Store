# Student-E-Store
UofT SCS Full Stack Flex Bootcamp Group Project 2

#Authentication
This app uses Facebook to authenticate and pull user information (name, photo, email) for the creation of new users. 

On the front end, users login to the app using the Facebook supplied Login Button. The facebook login button provides it's own Login flow via a pop-up window and returns an access_token upon successful login. On our front end, we store this access token in a cookie for access on the backend via the "cookie-parser" npm package.

On the back end, each get request will start by parsing the access_token inside of the received cookie. We then use the facebook-node-api package "fb" to make an access_token decrypt reqest to the facebook API which will return the logged in user's id, and if the access_token is currently valid. If the token is valid, the logic associated with the original http request is excuted, else the index page of the app is re-rendered.
