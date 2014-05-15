require-later [![Build Status](https://travis-ci.org/rstone770/require-later.png?branch=master)](https://travis-ci.org/rstone770/require-later)
=======

This is a super small lib that allows for lazy loading of callback type modules. Although the use case for this is very small, it's very useful when needed. My main use for it is to lazy load less used modules/routes in larger applications. I compile the 75% of the app that user use normally then allow lazy loading for resources that may not be used or needed such as privileged pages or debugging tools.

installation
============

To install simply use bower.

```
bower install require-later
```

its recommended that you alias the plugin via require.config.

```
require.config({
	paths: {
		'later'	: 'path/to/plugin/require-later.min'
	}
});

usage
=====

Its used like any require plugin. Require you will export a function that you can be used with pretty much any async task. When the function is called, the requested module will then be loaded and executed. All parameters passed to the deferred function will be sent to the module once loaded.

The best example is for something like backbone.
```javascript

define([
	'backbone',
	'routes/home',
	'later!routes/admin',
], function(Backbone, homeRoute, adminRoute) {
	'': homeRoute,
	'admin': adminRoute
});

```

As you can see when home is required, it will become recursive and require all of its resources and its dependants. If not compiled, it will require a bunch of ajax calls for things a user may or may not use. If compiled, an app can quickly become large when you include modules that a very small subset of your users will use. The adminRole will not load anything until the callback is actually used, then it will actually require routes/admin and evaluate it with any passed arguments.

Context bind the adminRoute will pass that context to its callback as well.

hack and build
==============

Just run gulp to lint, test and build this project.

```
npm install && gulp
```

You can also run individual tasks

```
gulp spec
gulp lint
gulp build
```


