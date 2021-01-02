# PatientDataFrontEnd
## Documentation
The front-end is a single page application developed with Angular 11 and is generated with AngularCLI. It presents a list of patient information to the user and offers create, read, update and delete (CRUD) funcionalities. The app is developed according to the Material Design. The patient list is ordered by the patient's last name. The back-end does not allow duplicates. If the user tries to add a duplicate, the server error message will be presented to the user. The patient list can be searched.

A few tests are added for [main component](src/app/app.component.spec.ts) and [http client](src/app/patients.service.spec.ts).
Results: ![alt text](https://i.imgur.com/alG15cc.png)

The app is hosted on [Heroku](https://patient-data-frontend.herokuapp.com/).

Currently, I am doing my Masters Thesis at the [Department of Biomedical Informatics, University of Utah](https://medicine.utah.edu/dbmi/) and there was not enough time to add additional features or a more detailed documentation. I hope it is still sufficient.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
