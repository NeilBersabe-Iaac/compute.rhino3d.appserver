![GitHub package.json version](https://img.shields.io/github/package-json/v/mcneel/compute.rhino3d.appserver/main?label=version&style=flat-square)
![node-current (scoped)](https://img.shields.io/badge/dynamic/json?label=node&query=engines.node&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmcneel%2Fcompute.rhino3d.appserver%2Fmain%2Fpackage.json&style=flat-square&color=dark-green)

# _PROJECT BRIEF
SOLIHIYA
The browser-based configurator is based from the Filipino traditional weaving pattern called solihiya. 
The configurator defines a pavilion with varying openings that responds to light and solar angles
Solar Directions can be controlled by simple parameter sliders and serves as an attractor for pattern opening variations.
A color gradient is applied to mesh edges corresponding to the variety of attractor distances.
There are also parameter sliders that control height, and size of the smallest and largest openings
It is also possible to download the geometry as a mesh geometry in .obj format

## _PLUGINS
- **Easy to get started**: for

## Getting Started
1. Fork this repo
2. Follow the [installation guide](docs/installation.md) to test and debug on your computer
3. Follow the [Heroku hosting guide](docs/heroku.md) to push your customized AppServer to Heroku for a production web server

## How and What Video
- A workshop on using the appserver can be found at https://vimeo.com/442079095 - also [slides](https://docs.google.com/presentation/d/1nCbd87iA_D2ZCwoSirOYK3har6XUJHDUEIkt635btUU)
- AECTECH 2020 workshop: https://youtu.be/At4BaIuEE3c - [slides](https://docs.google.com/presentation/d/1uY6DcYpBNrgxk8sbHHv1gy3IZWRmO7QF1rUT1XOl3s0/edit?usp=drivesdk)

## Example
When we have our testing server up and running, you can visit

https://compute-rhino3d-appserver.herokuapp.com/examples/

To see a sample web application that passes three numbers based on slider positions to the AppServer for solving a grasshopper definition. Results are returned to the web page and new mesh visualizations are created.

----
## Other Information
- [API Endpoints](docs/endpoints.md) the server supports
- [Client Code](docs/clientcode.md) example for calling the AppServer
