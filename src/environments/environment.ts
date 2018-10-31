// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCdWBDVoPNmoRUt4vHmvTuurGYfTiW7ovA',
    authDomain: 'family-cart-25e7a.firebaseapp.com',
    databaseURL: 'https://family-cart-25e7a.firebaseio.com',
    projectId: 'family-cart-25e7a',
    storageBucket: 'family-cart-25e7a.appspot.com',
    messagingSenderId: '337072650415'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
