## Team Name: HCBTW

## Sponsor Name: Cucamonga LLC

## Project Description:
The product to be developed is a mobile application for the iOS
platform that offers a peer-to-peer physical storage marketplace.

## Team Members:

Last Name       | First Name      | GitHub User Name     | Scrum Role
--------------- | --------------- | -------------------- | ---------------
Hinman          | Jorah           | jorahsh              | Product Owner
Holden          | Joshua          | joshua-holden        | Scrum Master

## Setup Instructions:
# WINDOWS
To set up the Storage Forage app on a windows machine: First find the install_chocolatey.bat file inside
the storage_forage_app/cucamonga directory. Right click on the file and run it as an administrator. This 
will download chocolatey.

Next, find the install_cucamonga_windows.bat file inside of the storage_forage_app/cucamonga directory. 
Double click to run this file. This file should not run as administrator. This will install Node.js, and 
then install all of the project's dependencies.

# MAC
To set up the Storage Forace app on a Mac machine: Find the install_cucamonga_mac file inside
of the storage_forage_app/cucamonga directory. The Node.js package is downloaded and installed using curl
so no aditional package manager is needed. The app will launch at the end of the instllation script.

To build and run an iOS simulatior for the app, make sure Xcode is installed, then run the following command in Terminal:

  $ ionic cordova build ios
  $ ionic cordova emulate ios -- --buildFlag="-UseModernBuildSystem=0"


## Build For Android Instructions:

To build the app for release on an Android device: run the publish_storage_forage file. About halfway
through the installation, you will be asked for a key password. The key password is "popio9004". The
script will then build the project into an apk file StorageForage.apk.
