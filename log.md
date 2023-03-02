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

- Filter component: I was tempted to use redux but for mutating the state with the
  filters and prevent passing props from the father component.
  I decided to not do that for the following reasons:
    The app is small and the use of redux will add an extra layer of complexity
    not needed at this time
    The props that are going to be passed will go down just one level, from
    father to child, which is totally reasonable
    I can remove complexity from the father component by isolating the filtering
    logic in a reusable hook component
    If I were to need shared state (movies) I will prefer to use the context first

- Since this is a new app I decided to upgrade all packages to their latest version and enable strict mode

- Wrote basic tests for all components and got into a lot of problems
  trying to not break the best practice rules highlighted by the linter.
    Could not get arround the not use render inside act because the solution
    triggered another warning, so in the end decided to leave it since it was
    shown in an example in the react docs so it should not be that bad
    
- I just finished the sell component and im not happy with how things went and 
  at this point I have done almost nothing to the backend so I will move there
  and see if I have some time to improve this in the future
    Notes for improvement: definitely use the context, so you dont have to drill
    props to re-fetch the movies nor drill the studios list
    Could also work for improving the Alert component, there is no need to have
    one alert for each movie

