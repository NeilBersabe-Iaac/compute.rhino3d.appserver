# S O L I H I Y A
//Iaac-Macad-Bimsc.DataMgt-FinalProject.Neil John Bersabe


![](/images/Finals.jpg?raw=true)

## _PROJECT DESCRIPTION
Solihiya is a parametric pavilion configurator based from the Philippine sunburst weaving pattern of the same name. 
The aim of the configurator is to the give users feedback on implications of different parametric configurations to the pavilion like height, openings, and solar parameters. This also gives users insight on different shadow patterns and behaviours depending on vectors got from solar angles and times of day. A color gradient is applied to the mesh edges of the pavilion corresponding to the distance from the sun.

## _INSTRUCTIONS
Play around the configuration of the pavilion as desired.  
You can download the 3dm geometries with the download button

**PARAMETERS:**  
Format: (ParamName) - (Name),(Description); (DomainValueMin, DomainValueMax)  

**zHeight** - Moves the height of the pavillion; (0,250)  
**solAngle** - solar angle, Move the altitude angle of the sun; (1,179)  
**toD** - time of day, Moves the sun along the curve path; (1,9)  
**smlOpening** - Small opening, Modifies the size of the small opening of the pavilion; (0,45)  
**lrgOpening** - Large opening, Modifies the size of the large opening of the pavilion; (0,45) 

**Add Trees** - Change visibility of the trees; (boolean)  
**Trees Count** - Change the number of trees; (1,250)  
**Trees Scattering** - A seed value to randomize the placement of trees; (1,50)  
**Trees Scale** - Changes the size of the trees; (0.10,3.00)  

**Add People** - Change visibility of people; (boolean)  
**Population** - Changes the quantity of people; (1,50)  
**People Location** - A seed value to randomize the placement of people; (1,50)  

**Show Annotations** - Change visibility of the annotations; (boolean)  
**Show Shadow Analysis** - Shows the shadows cast on the plane as curves; (boolean)  

**ANALYTICS:**  
**Mesh Area** = Shows the total surface area covered by the pavilion  
**Plot Area** = Shows the total area of the concrete plot under the pavilion as a grey area  
**Land Area** = Shows the total Land Area of the mini planet  
**Land Diameter** = Shows the Diameter of the planet  
**Shadow Area** = Calculates the area of the shadow casted. You must run Shadow Analysis first to calculate  



## _LINKS
- [Link to my Rhino.compute repo](https://github.com/NeilBersabe-Iaac/compute.rhino3d.appserver/tree/main/src/examples/solihiya00_v3)
- [Link to the Heroku App](https://bimsc22-neiljohnbersabe.herokuapp.com/examples/solihiya00_v3/)
- [Link to Github Pages (Landing Page)](https://neilbersabe-iaac.github.io/IAAC-BIMSC-FINAL/)


## _DATA FLOW DIAGRAM
1. [Inputs & Outputs](docs/InputOutput.jpg)
2. [Data Flow Diagram](docs/DataFlow.png)

## _CREDITS
Project by:  
Neil John Bersabe

Faculty:  
David Andres Leon  
Hesham Shawqy  


BIM & Smart Construction  
Cloud Based Data Management  
Master in Advanced Computation for Architecture and Design  
IAAC - 2022



