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
