# RE:SETTLE
//Iaac-Macad-Thesis.Neil John Bersabe


![](/images/POSTER_COVER.png?raw=true)

## _PROJECT ABSTRACT
The rapid population growth of cities affects the acquisition of land tenure, land security, and production of good quality housing.  The constant pressure of living in highly urbanized cities forced the working class to live in lower-quality housing.  In return, these people have reverted to living in areas within the poorer residential districts of the city. 

Due to the low enforcement of zoning laws in some cities, people living in such conditions tend to build housing settlements in no-build or high-risk flood zones to survive, making the community vulnerable to disasters. 

So the question is:

Is there a need to rethink these communities' current housing development strategies?

Rethinking current housing designs can be a platform for builders and planners to provide new innovative solutions.  Understanding the current housing conditions can be used as a learning tool to achieve the effectiveness and efficiency of new housing design strategies. 

The project aims to create a tool to analyze housing strategies by employing machine learning to predict the performances of different housing iterations and democratizes the design process by deploying the parametric model to the web.  The participatory approach to design would hopefully empower the users and planners with the ability to infer, analyze, and improve on different possible solutions interactively.


## _INSTRUCTIONS (TO BE UPDATED)
Play around the configuration of the site and building as desired.  
You can download the 3dm geometries with the download button

**PARAMETERS:**  
Format: (ParamName) - (Name),(Description); (DomainValueMin, DomainValueMax)  

**AGGREGATION COUNT** - Controls the total number of modules in the aggregation; (150,1000)  
**RESET DESIGN** - Resets the aggregation; (boolean)  
**POINT** - Controls the location of the building; (realtime)  

**SHOW FLOOD MAP** - Controls the visibility of the Flood Map; (boolean)  
**SHOW DETAILED BUIDLING** - Changes the level of detail of the aggregation; (boolean)
**SHOW AGGREGATION BOUNDARY** - Controls the visibility of the Aggregation Boundary Area; (boolean) 

**Trees No** - Controls the number of trees within the site; (1,250)  
**Trees Location** - Controls the distance of the trees from the build area; (1,50)  
**Trees Scale** - Changes the size of the trees; (0.10,2.01) 
**Show Trees** - Controls the visibility of the trees; (boolean)  

**Other Buildings No.** - Controls the number of other buildings within the site; (1,10)  
**Other Buildings Random** - Changes the randomness of the location of other buildings within the site; (1,10)  
**Show Other Buildings** - Controls the visibility of other buildings within the site; (boolean)  


**ANALYTICS:**  

**Res Density** = Shows the density of the residential area per hec2 of the aggregation boundary area. This was quantified by dividing the total area of residential modules to the total area of the aggregation boundary 
**Pop Density** = Shows the density of the residential area per hec2 of the aggregation boundary area. This was quantified by dividing the total area of residential modules to the total area of the aggregation boundary  
**DENSITY INDEX** = Shows the ratio of residential population to the total area of the aggregation boundary projected to the ground surface



**Access to Exit** = Quantifies whether the average distance of the Housing modules to the Core and Stair modules is within walking distance. The standard for the ideal walking distance was set to ≥ 45m  
**Access to Green Spaces** = Quantifies whether the average distance of the Housing modules to the Park. Parklet and Balcony modules is within walking distance. The standard for the ideal walking distance was set to ≥ 200m  
**Access to Amenities** = Quantifies whether the average distance of the Housing modules to the Market and Store modules is within walking distance. The standard for the ideal walking distance was set to ≥ 150m
**ACCESSIBILITY INDEX SCORE** = Quantifies the ease of accessibility of the housing modules to the Amenities, Green Spaces and Exit points. The value was calculated as the average of the 3 factors (Access to Exit, Access to Green Spaces and Access to Amenities).

**ModElev_Housing** = Quantifies how safe the Housing modules are from the identified flood levels according to its elevation from the ground. Standard for ideal elevation was set to ≥ 9m.
**ModElev_Circulation** = Quantifies how safe the Circulation modules are from the identified flood levels according to its elevation from the ground. Standard for ideal elevation was set to ≥ 10m.
**ModElev_Green Space** = Quantifies how safe the Green Space modules are from the identified flood levels according to its elevation from the ground. Standard for ideal elevation was set to ≥ 12m.
**ModElev_Commercial** =  Quantifies how safe the Commercial modules are from the identified flood levels according to its elevation from the ground. Standards for ideal elevation were set to ≤ 10m and ≥ 10m for Market modules and Store modules respectively.
**MODULE ELEVATION SCORE** = Refers to the correlation of the height per module from the ground and the site’s Flood Map. This was quantified by setting preferred elevation height levels per module type based on its function in the building’s Flood Mitigation strategy and the identified flood level height.

**High Risk** = Calculates how much of your site is within the high risk zone. Standard for ideal area percentage was set to ≤ 15%
**Med Risk** = Calculates how much of your site is within the medium risk zone. Standard for ideal area percentage was set to ≤ 35% 
**Safe/ Low Risk** = Calculates how much of your site is within the medium risk zone. Standard for ideal area percentage was set to ≥ 50%  
**LOCATION FLOOD RISK RATING** = Measures how good your chosen area is for flood risk mitigation. The lower percentage of High and Medium risk areas within the site, the the more ideal it is. 

**FLOOD MITIGATION RISK SCORE** = Measures how well the aggregation does in relation to the site’s flood map. The value was calculated as the average of the 2 factors (Module Elevation score and Location Flood Risk Rating)



**Green Plot Ratio** = Refers to the total amount of vertical or horizontal vegetation within the building. This was quantified by dividing the total green space areas by the aggregation boundary area. The higher the value means more green spaces.

**Surrounding Quality** = Refers to the total area of the aggregation boundary in comparison to the site’s total area. This was quantified by dividing the aggregation boundary area by the total site area. The lesser the value means more opportunities for green spaces.

**ENVIRONMENTAL QUALITY** = Calculates the amount of green spaces/ vegetation on and around the building compared to the total area of the aggregation boundary. Involving 2 factors, overall result was quantified by setting a 60/40 weighted average, favoring Green Plot Ratio as heavier than Surrounding Quality.  



**Community Plot Ratio** = Refers to the amount of community space within the development compared to the number of housing modules. 
Standards for ideal ratio of the spaces were set as follows: 
1 Parklet module: 3 Housing modules
1 Park module: 6 Housing modules
1 Balcony module: 2 Housing modules
1 Store module: 5 Housing modules
1 Market module: 20 Housing modules

**Civic Generosity Index** = Calculates the area of the shadow casted. You must run Shadow Analysis first to calculate 

**Housing Zone Ratio** = Calculates the area of the shadow casted. You must run Shadow Analysis first to calculate 
**Green Space Zone Ratio** = Calculates the area of the shadow casted. You must run Shadow Analysis first to calculate 
**Commercial Zone Ratio** = Calculates the area of the shadow casted. You must run Shadow Analysis first to calculate 
**ZONING RATIO SCORE** = Calculates the area of the shadow casted. You must run Shadow Analysis first to calculate 

**COMMUNITY INDEX SCORE** = Calculates the area of the shadow casted. You must run Shadow Analysis first to calculate 


## _LINKS
- [Link to my Rhino.compute repo](https://github.com/NeilBersabe-Iaac/compute.rhino3d.appserver)
- [Link to my Website repo](https://github.com/NeilBersabe-Iaac/IAAC-THESIS-MACAD)
- [Link to the Heroku App](https://bimsc22-neiljohnbersabe.herokuapp.com/examples/solihiya00_v3/)
- [Link to Github Pages (Landing Page)](https://neilbersabe-iaac.github.io/IAAC-BIMSC-FINAL/)
- [Link to Book and Papers](https://neilbersabe-iaac.github.io/IAAC-BIMSC-FINAL/)
- [Link to Blogpost](https://neilbersabe-iaac.github.io/IAAC-BIMSC-FINAL/)

## _CREDITS
Project by:  
Neil John Bersabe

Faculty:  
Angelos Chronis


Thesis Studio
Master in Advanced Computation for Architecture and Design  
IAAC - 2022



