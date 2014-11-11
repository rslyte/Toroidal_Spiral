Ryan Slyter
CS452
Programming Assignment 3: Toroidal Spiral

Files in the archive:
this readme
spiral.js (file holds all the properties of the spiral except the spine)
spiral.html (the assignment)
matrix.js (Dr. Cochrans matrix library

To Run: double click on the spiral.html with spiral.js and matrix.js in the same directory.

Note: This html file was tested with the library in the same dir,
and run on Chromium in Ubuntu 14.04

For this assignment we were to employ Web-gl, javascript, and the geometry-building, triangle-mesh-building, and shading/lighting principals from the last 3 weeks to draw a Toroidal Spiral. I went of off, primarily, Dr. Cochran's torus code from a few commits ago, as well as one of the 'sphere by subdivision' examples done in class to build the shape, as well as inserting the toroidal spiral-specific functions given to us in the assigment prompt. Finally, I went off of the web-gl function calls and modificaitons to the fragment/vertex shaders from the wineglass example to do the shading.

**IMPORTANT NOTE**: I noticed that once you got the spine working, that was not required to actually make the deliverable required by the assignment (Shaded Toroidal Spiral). So I initially made my spine-geometry code in the html file to draw the thing, and then realizing it would take more code to make the deliverable (but not needing the spine code) I commented out the spine code in the html file to prove that I did it, and just started developing in the separate spiral.js file. If you really need to see the spine to give me full credit for the assigment, I saved a backup of it and can submit it separately. I'm submitting this project before the actual 'Submission' part of the assigment prompt is completed because I want to turn this in early and spend time studying for the midterm.
