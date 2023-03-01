- The frontend does not start, some files are in the wrong directory
        Moved the index.html to the public directory

- Backend and frontend are running on the same port
        Set backend to run on port 4000

- Root element does not exists in html file
        Changed id of div to root

- At this point I can start the application and resolve the todos

- I want to commit my progress and realize the gitignore is empty
        Add **/node-modules to my gitignore

- Started by migrating the class component to a functional one with hooks
  just to feel more 'at home' with the code base
        
- The App component has too much things in it so I'm going to split things
  until they feel right

- Moved the API calls to a single file, dont like fetch too much but will leave it.
        I can improve this file in the future, using axios will allow to set the
        base url on an instance and I would not have to concatenate it with the
        route every time.

- Spent some time in the images issue
  One of the images returns 404, tried getting it with wget but it is definitely not there
  The other returns a forbidden, will look into that, must be a referrer problem.
  I had to use google to search how to solve the referrer problem, turns out 
  material-ui has its own way of passing props to the img tag

- Started to look into the media query/responsive avatar:
        - Went to mui documentation to see if they have anything streamlined for this
          and found they have a hook but I dont feel confortable using it since i dont 
          know how it works internally
        - Decided to go with media queries in css
        - I had to use !important which im not very happy with but I will leave
          it like that for now and return latter if I have some time to improve it
