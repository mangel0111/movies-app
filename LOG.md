All issues that I faced during and how I solved.

## [Issues]

## Missing .gitignore file

In order to avoid uploading node_modules folder I added a .gitignore file.

## yarn start not working - Could not find index.html in public

Moved the actuall index.html file from /movies-app/src into /movies-app/public.

## Target container is not a DOM element - yarn start

The main div id in index.html was wrong. Changed id="app" for id="root".

## UI fails when request to API

This was a problem about the ports being used for api and movie-app. I changed the api to use port 3001

## Several images from the app are not loading properly

- Add id to movies in order to have image key unique prop

- Aladdin image url returns `404` so the default Avatar will be shown

- The dark knight rises is forbidden so the default Avatar will be shown

- All Sony images were in a different object So I added logic to get and return that image url from the SonyImages object.

## TODO

1. Refactored class component in order to use funcional modern component. Using useState and useEffect.
2. Move domain into .env file. And extracted defaultAvatar into a constant file.

## studio name in the ui

I added to the API the studio name when building the movie object so we dont have to request the API twice

## Movie position

Changed position name for genre in order to me more descriptive for both UI and API

## sass modules

I installed https://github.com/harrysolovay/rescripts in order to add CamelCase configs for using sass modules without ejecting

## Testing

- I added test ids in order to do tests step by step.
- I added some mocks for the API

## Decisions

- For filtering I decided to do it only front end side, since this tests is mainly focused on the front end. I could do it by sending to the getMovies endpoint some params like genre, price and name.. and then filter in the API. If you want I can do it for future improvements
- Transfer is only a superficial transfering since I dont have a database and the test is mainly focused on the front end
