# Leaflet-challenge
Module 15 challenge


## Leaflet Part 1
This is a task to visualise an earthquake dataset by fetching earthquake data from the United States Geological Survey (USGS) API and displaying it on a map using Leaflet.  The dataset chosen was those earthquakes that occurred in the past week.

To achieve this a variable was created to store the API endpoint for earthquake data and a d3 function was used to request the data from the API.  This retrieved data is then passed to the 'createFeatures' function.
Functions are used to determine the size and color of the markers on the map based on earthquake magnitude and depth, respectively.

The createFeatures function  takes the earthquake data as input and is responsible for creating the Leaflet map and adding earthquake markers to it.  It also defines a pop-up for each earthquake marker, displaying information such as location, date, magnitude, and depth.

There is a createMap function which is responsible for initializing the Leaflet map, setting its centre and zoom level, and adding base maps and earthquake data as layers.  It also includes a layer control that allows users to toggle between different base maps and the earthquake overlay.

The code defines two base maps, one using OpenStreetMap and the other using OpenTopoMap. These maps provide the underlying geographic context for the earthquake data.
The code sets up a layer control that allows users to switch between base maps and the earthquake overlay on the map.
The code defines a legend for the depth of earthquakes. It uses color-coded ranges to represent the different depths of the earthquakes and displays this legend in the bottom-right corner of the map.