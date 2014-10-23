## Umbrella

Umbrella is a set of classes and tools to build JavaScript applications.

With Umbrella you create a single HTML file and inherit your JavaScript
classes from Umbrella classes.

## Motivation

This is the [BLUE JEANS](http://lojabluejeans.com.br) framework.

## Steps

Compile:

* `cd umbrella/tools/`
* `make`

Run Umbrella Server and Start Demo:

* `cd umbrella`
* `run-server.sh`

Every time a new class was added or remove, regenerate the dependency files:

* `cd umbrella`
* `run-deps.sh demos en`

To compile a final solution:

* `cd umbrella`
* `run-comp.sh demos en`
* `cat results/demos.en.js`

## Contributors

Juston.co and BLUE JEANS .

## License

If you replicate some part of this project, you must mention this project and this link.