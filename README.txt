FG VHXX Custom Scenery
======================
for FlightGear, the open source flight simulator
www.flightgear.org

This package contains custom objects and terrain for the Hong Kong area. Currently, I'm focusing on VHXX. VHXX is included as well, but probably terrain is messed up a bit. This is work in progress.

Thomas Albrecht
radi_@web.de
03 June 2015

Copying
-------

Copyright (C) 2015 Thomas Albrecht, Roger Mole, Emilian Huminiuc, Ralf Kutscher

This file is part of FG VHXX Custom Scenery.

FG VHXX Custom Scenery is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

FG VHXX Custom Scenery is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

Install
-------

This package contains a standard FG_SCENERY directory structure. Assuming you've cloned it to

/home/user/custom_scenery_VHXX

append that path to your FG_SCENERY variable (http://wiki.flightgear.org/$FG_SCENERY).

Then copy the fgdata/ directory to your FG_ROOT (http://wiki.flightgear.org/$FG_ROOT) to enable textures and Emilian's traffic shader.


DDS textures
------------

I've created custom mipmaps for the facades textures to improve appearance at night. They are stored in .DDS format. In case of problems you can switch back to .png textures. Edit
The custom_scenery_VHXX/Objects/e110n20/e114n22/cityLM.eff
and change <image>tex/atlas_facades_LM.dds</image>.


Contributers and Acknowledgements
---------------------------------

Roger Mole created the Kai Tak models for MSFS. Ralf Kutscher converted them to X-Plane. I took Ralf's work and converted it (with permission) to FG. The following models are included
- Kai Tak Terminal
- Checkerboard hill
- apron light poles
(more to come)

Some awesome Hong Kong pictures were donated by Jamie Lloyd, from which I created facade textures.
https://www.flickr.com/photos/j3tourshongkong/

Hong Kong city buildings and roads auto-generated from OpenStreetMap data using osm2city
http://wiki.flightgear.org/Osm2city.py

Custom landcover data provided by statto. Some landcover also taken from OpenStreetMap.

Emilian Huminiuc wrote the traffic shader, which is still work in progress and so far only works with the default renderer -- ALS/Rembrandt must be off if you want to use this effect. The scenery itself of course should work fine in any renderer.


Email corresponcence
--------------------
From: Ralf Kutscher <rundek@mac.com>
Subject: Re: Kai Tak Scenery as GPL?
Date: 22 April 2015 1:48:49 pm AEST
To: Thomas Albrecht <radi_@web.de>

kein Problem

Ralf


On 22 Apr 2015, at 03:57, Thomas Albrecht <radi_@web.de> wrote:

Hallo nochmal Ralf,

ich hatte jetzt Roger Mole angeschrieben, und er hat (etwas knurrend) sein Einverständnis gegeben. Trotzdem würde ich gerne von deiner konvertierten Version starten (mein workflow X-Plane -> Fligthgear funktioniert ausgezeichnet, von MSFS starten ist mehr Arbeit). Ist das OK für Dich?

Thomas
---
From: Flightsim <flightsim@ukgo.com>
Subject: Re: Kai Tak Scenery as GPL?
Date: 22 April 2015 5:53:14 am AEST
To: Thomas Albrecht <radi_@web.de>

Hi Thomas, I'm not keen on the possibility of my stuff being used, even in part, in a sold-for-profit product I have to say. But this is a very old scenery that unfortunately I never got around to finishing so I don't see why not. I'd appreciate the usual acknowledgement though.

Best wishes,

Roger


On 21/04/2015 12:37, Thomas Albrecht wrote:
Hi Roger,

I'm developing scenery for Flightgear (FG), the open source flight simulator. I came accross your
Kai Tak scenery (from 2003?!?), which had been converted to X-Plane by rundek (Ralf).  I've converted it to FG's format, and it works great:

http://forum.flightgear.org/viewtopic.php?f=5&t=24508#p223425

Now I would like it to be included in FG's official scenery, which can be downloaded free of charge from flightgear.org.

However, all official FG scenery must be compatible with the GNU Public License (GPL). Would you be willing to release your scenery, or parts thereof, under the GPL? I’m particularly interested in the airport buildings and the checkerboard hill.

Note that the GPL explicitly allows derivative works and commercial use including selling the product, as long as the product itself is again licensed under the GPL. That is, the sources must remain free and open. I understand that this is in contrast to the usual freeware licenses found around FSX/P3D/X-Plane communities. The rationale is to foster improvements by other parties which again must be released under the GPL, ultimately for the benefit of the community.

Kind regards,
Thomas
---
From:


J3 Tours Hong Kong Jamie Lloyd
Subject:

Re: May I use some of your Hong Kong Photos?


Tom

Go right ahead and download and use any image you like!!

If you have any problems let me know

Thanks

J


        Hide your original mail...
May I use some of your Hong Kong Photos?

1 May 15, 11.17PM PDT

Hi Jamie,

I'm Tom from Melbourne. I'm creating free/open source scenery for Hong Kong's old Kai Tak airport for Flightgear, the open source flight simulator.

I wonder if you would consider allowing me to use some of your Flickr photos of Hong Kong buildings in my project. Specifically, I would rectify the images and extract textures from them. As I said, my project is free and open source, and I'm donating a the better part of my spare time to it. So unfortunately, I cannot offer you more than an acknowledgement in the readme file :) and of course the textures I would extract.

Please let me know what you think!
Thanks,
Tom

PS. I'm not providing a link to my project here to not make this look like spam; I'm happy to provide one if you should so wish, otherwise just google flightgear hong kong
