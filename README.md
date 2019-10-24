# Washr

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.2.

## TODOs

- [x] Move the form outside of the post list
- [x] Add a detailed thread viewer
- [x] Make the background something like #262a2b
- [x] Make a separate scss for storing colors
- [x] Add an option to toggle whether the user wants to see NSFW content or not
- [x] Implement lazy loading of replies
  - **NOTE**: Only kind of implemented?
- [x] Made the security rules better
- [ ] Add more ways to log in
  - [x] Added logging in via e-mail
- [ ] Implement displaying of videos
  - [ ] Replace the image tag with either an image or a video tag, depending on the type.
  - [ ] Add a function that generates a thumbnail for the uploaded video
- [ ] Change up the colors
- [ ] Implement push notifications
- [ ] Add some pins for the admin, mod, and significant people
- [ ] Add more user details
- [ ] Add the ability to like or dislike posts
- [ ] Add licenses
- [ ] Make more post lists (i.e.: list of posts for people the user follows)
- [ ] Implement lazy loading of posts
- [ ] Make the page a11y-compliant
- [ ] Add a list of recent posts to profile view
- [ ] Add a function that updates every post when a user updates their profile
- [ ] Move state management to NgRx
- [ ] Implement date formatting with `moment.js`
- [ ] Design the page with Adobe XD
- [ ] Rewrite the image overlay to use the Overlay from `@angular/cdk`
  - **_DO LATER_** `@angular/cdk` overlays are terribly documented

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### IMPORTANT!

For some reason, Firebase Auth guards from AngularFire don't play well with production builds. For the meantime, deploy development builds (no `--prod` flags)

## Deploy

Run `firebase deploy` to deploy everything.
