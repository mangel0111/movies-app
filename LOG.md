All issues that I faced during and how I solved

## [Issues]

## Missing .gitignore file

In order to avoid uploading node_modules folder I added a .gitignore file

## yarn start not working - Could not find index.html in public

Moved the actuall index.html file from /movies-app/src into /movies-app/public

## Target container is not a DOM element - yarn start

The main div id in index.html was wrong. Changed id="app" for id="root"
