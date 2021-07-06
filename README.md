# Project Structure 

The project is divided into two parts, one is the mobile-native application, and the other part is the test code that is written for the application, using Appium. 
The root folder contains the mobile application folder, named as CovidSurvery. The test modules, or codes, are located in the root folder, there is no seperate
folder for the test code. All of the test cases are written in the file called [test.js](test.js). 

# Run Mobile Application

The mobile application can be run using Android Studio, and an emulator or a physical device connected to the computer. Simply pressing the "Run" button on the IDE
will first build (for the first time only) and then run the application.

# Run Test Code

In order to run the test code, one should first install the necessary packages specified in the [package.json](package.json) file. In order to install those packages, simply execute:
```sh
$ npm install 
```
or 
```sh
$ npm i
```
After downloading and installing the package(s), the configuration information should also be modified in the [test.js](test.js) folder. The configuration information can be 
found at the beginning of the file and is necessary for the code to execute properly. Having modified the test code, simply execute the code via:
```sh
$ node test.js 
```
