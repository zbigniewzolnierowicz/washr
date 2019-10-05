# Washr

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.2.

## TODOs

- [x] Move the form outside of the post list
- [ ] Add a function that generates a thumbnail for the uploaded video
- [ ] Implement push notifications
- [ ] Add a detailed thread viewer
- [x] Make the background something like #262a2b
- [x] Make a separate scss for storing colors
- [ ] Add some pins for the admin, mod, and significant people
- [x] Add an option to toggle whether the user wants to see NSFW content or not
- [ ] Implement lazy loading of replies
- [ ] Add more user details
- [ ] Make the same method as above, but with likes.
- [ ] Add licenses
- [ ] Add more ways to log in
- [ ] Make more post lists (i.e.: list of posts for people the user follows)
- [ ] Implement lazy loading of posts
- [ ] Make the page a11y-compliant

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### IMPORTANT!

For some reason, Firebase Auth guards from AngularFire don't play well with production builds. For the meantime, deploy development builds (no `--prod` flags)

## Deploy

Run `firebase deploy` to deploy everything.
