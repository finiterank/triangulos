triangulos
==========

Geometric construction: From a point P, drop perpendiculars to the sides of a surrounding triangle. This defines three points; connect those to make a new triangle and drop perpendiculars to its sides. Repeat three times this procedure, obtaining each time a smaller triangle. The third new triangle (doesn't matter the point you choose) will be similar to the original one. 

This little toy provides an illustration of this geometric result.

Note that the construction also makes sense if P is outside the triangle (considering the lines generated by each of the sides.)

ToDo
====
* The code is ugly but it does that it should. I guess I could clean it up a bit.
* The construction actually works for N-gones: the Nth inscribed N-gone should be similar to the original one. I don't know if the N-gone need to be convex. I'd like to extend the code to consider polygons of any number of sides. 
