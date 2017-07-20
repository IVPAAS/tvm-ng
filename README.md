# TVMng Application

[![Gitter chat](https://badges.gitter.im/kaltura-ng/tvm-ng.png)](https://gitter.im/kaltura-ng/tvm-ng)
  
TVMng application uses the following technologies and conventions:
* [Angular CLI](https://cli.angular.io/) to manage the application (dev)ops.
* [TypeScript](http://www.typescriptlang.org/) language (superset of Javascript).
* [Yarn](https://yarnpkg.com/en/) as our dependency management.
* Stylesheets with [SASS](http://sass-lang.com/) (not required, it supports regular css too).
* Error reported with [TSLint](http://palantir.github.io/tslint/) and [Codelyzer](https://github.com/mgechev/codelyzer).
* Best practices in file and application organization for [Angular 2]({https://angular.io/).

## Quick start

### Prerequisites

- [x] Ensure you have [node.js installed](https://nodejs.org/en/download/current/), version 7.0.0 or above. 
- [x] Ensure you have [git installed](https://git-for-windows.github.io/) 
- [x] Ensure you have [yarn installed](https://yarnpkg.com/lang/en/docs/install/) (we use it for node package management) 

### Get the sources
To get the sources and run tvm-ng project, run the following commands: 

```bash
# clone our repo
$ git clone https://github.com/kaltura/tvm-ng.git 

# change directory to your app
$ cd tvm-ng

# install the dependencies with yarn
$ yarn
```

**Note**: during the `yarn` execution you might encounter some warning of 'incorrect peer dependency' - those warnings should not affect your work still we will handle them in the near future.


### Run the application
Once you got the sources and installed depedencies, you can compile the application and access it in the browser with the following command:
```
$ yarn start
```
navigate to [http://localhost:4200](http://localhost:4200) in your browser.

**Note**: you can change the port number using environment `port` variable as shown bellow:
```bash
$ PORT=3333 yarn start
```

## TVM-ng solution
TVM-ng is built on-top of several kaltura instrastructure packages. 
Below is a summary of the core packages being used:

 Package | Version  |
|:-------|:-------|
|  [kaltura--ott-client](https://www.npmjs.com/package/@kaltura-ng/kaltura-ott-client) | [![npm version](https://badge.fury.io/js/%40kaltura-ng%2Fkaltura-ott-client.svg)](https://badge.fury.io/js/%40kaltura-ng%2Fkaltura-ott-client) |
| [kaltura-common](https://www.npmjs.com/package/@kaltura-ng/kaltura-common) | [![npm version](https://badge.fury.io/js/%40kaltura-ng%2Fkaltura-common.svg)](https://badge.fury.io/js/%40kaltura-ng%2Fkaltura-common) |
| [kaltura-ui](https://www.npmjs.com/package/@kaltura-ng/kaltura-ui) | [![npm version](https://badge.fury.io/js/%40kaltura-ng%2Fkaltura-ui.svg)](https://badge.fury.io/js/%40kaltura-ng%2Fkaltura-ui) |
| [kaltura-primeng-ui](https://www.npmjs.com/package/@kaltura-ng/kaltura-primeng-ui) |[![npm version](https://badge.fury.io/js/%40kaltura-ng%2Fkaltura-primeng-ui.svg)](https://badge.fury.io/js/%40kaltura-ng%2Fkaltura-primeng-ui) |
| [kaltura-ott-typescript-client](https://www.npmjs.com/package/kaltura-ott-typescript-client) | [![npm version](https://badge.fury.io/js/kaltura-ott-typescript-client.svg)](https://badge.fury.io/js/kaltura-ott-typescript-client) |
| [@kaltura-ng/mc-theme](https://www.npmjs.com/package/@kaltura-ng/mc-theme) | [![npm version](https://badge.fury.io/js/%40kaltura-ng%2Fmc-theme.svg)](https://badge.fury.io/js/%40kaltura-ng%2Fmc-theme)
**Note**

- The version number listed above represent the latest version deployed to npm for each package. This is not necessarily the versions currently in-use by this app. You can review `package.json` to get the actual packages versions.


## License and Copyright Information
All code in this project is released under the [AGPLv3 license](http://www.gnu.org/licenses/agpl-3.0.html) unless a different license for a particular library is specified in the applicable library path.

Copyright © Kaltura Inc. All rights reserved.
