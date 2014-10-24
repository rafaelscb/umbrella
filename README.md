## Umbrella

Umbrella is a set of classes and tools to build JavaScript applications.

With Umbrella you create a single HTML file and inherit your JavaScript
classes from Umbrella classes.

## Motivation

This is the [BLUE JEANS](http://lojabluejeans.com.br) framework.

## Steps

Compiling the ANSI C utility tools:

* `cd umbrella/tools/`
* `make`

Compile (Windows):

* `cd umbrella/tools/`
* `make -f Makefile.win32`

## Running the Umbrella Web Server

Run Umbrella Server and Start Demo:

* `cd umbrella`
* `run-server.sh`

## Generating the deps.js file (a dependency graph)

Every time a new class is added or removed, regenerate the dependency files:

* `cd umbrella`
* `run-deps.sh demos en`

## Compiling the final JavaScript and CSS

To compile a final solution:

* `cd umbrella`
* `run-comp.sh demos en`
* `cat results/demos.en.js`

## Testing the TODO list demo app

*  `run-server.sh`
* goto http://localhost:8080/demos/todo.html

![alt tag](http://4.bp.blogspot.com/-Mimv3COJRZc/U3ueTkJyCDI/AAAAAAAAAeo/AxqpKtc4AFs/s1600/22-Umbrella-todo-app-01.png)

## Contributors

[JUSTON.CO](http://juston.co) and [BLUE JEANS](http://lojabluejeans.com.br).