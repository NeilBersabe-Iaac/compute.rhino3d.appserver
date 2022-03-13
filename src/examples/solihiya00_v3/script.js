import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.126.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/controls/OrbitControls.js";
import { Rhino3dmLoader } from "https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/loaders/3DMLoader.js";
import rhino3dm from "https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/rhino3dm.module.js";
// import { TransformControls } from "https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/controls/TransformControls.js";

// set up loader for converting the results to threejs
const loader = new Rhino3dmLoader();
loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/");

// initialise 'data' object that will be used by compute()
const data = {
definition: "Solihiya00_v4.gh",
    inputs: getInputs(),
};

const definition = "Solihiya00_v4.gh";

// //////////////////////////
// // Set up sliders
// const zHeight_slider = document.getElementById("RH_IN: zHeight");
// zHeight_slider.addEventListener("mouseup", onSliderChange, false);
// zHeight_slider.addEventListener("touchend", onSliderChange, false);

// const solAngle_slider = document.getElementById("RH_IN: solAngle");
// solAngle_slider.addEventListener("mouseup", onSliderChange, false);
// solAngle_slider.addEventListener("touchend", onSliderChange, false);

// const toD_slider = document.getElementById("RH_IN: toD");
// toD_slider.addEventListener("mouseup", onSliderChange, false);
// toD_slider.addEventListener("touchend", onSliderChange, false);

// const smlOpening_slider = document.getElementById("RH_IN: smlOpening");
// smlOpening_slider.addEventListener("mouseup", onSliderChange, false);
// smlOpening_slider.addEventListener("touchend", onSliderChange, false);

// const lrgOpening_slider = document.getElementById("RH_IN: lrgOpening");
// lrgOpening_slider.addEventListener("mouseup", onSliderChange, false);
// lrgOpening_slider.addEventListener("touchend", onSliderChange, false);

//////////////////////////////////////////

// // const Annotation_Button = document.getElementById("RH_IN:Show Annotations");
// // Annotation_Button.addEventListener( 'change', onSliderChange, false

const Showtrees = document.getElementById("Show Trees");
Showtrees.addEventListener("change", onSliderChange, false);

// const TreesNo = document.getElementById("RH_IN: Trees No");
// TreesNo.addEventListener("mouseup", onSliderChange, false);
// TreesNo.addEventListener("touchend", onSliderChange, false);

// const TreesLocation = document.getElementById("RH_IN: Trees Location");
// TreesLocation.addEventListener("mouseup", onSliderChange, false);
// TreesLocation.addEventListener("touchend", onSliderChange, false);

// const TreesScale = document.getElementById("RH_IN: Trees Scale");
// TreesScale.addEventListener("mouseup", onSliderChange, false);
// TreesScale.addEventListener("touchend", onSliderChange, false);

//////////////////////////////////////////

const ShowPeople = document.getElementById("Show People");
ShowPeople.addEventListener("change", onSliderChange, false);

// const Population = document.getElementById("RH_IN: Population");
// Population.addEventListener("mouseup", onSliderChange, false);
// Population.addEventListener("touchend", onSliderChange, false);

// const PeopleLocation = document.getElementById("RH_IN: People Location");
// PeopleLocation.addEventListener("mouseup", onSliderChange, false);
// PeopleLocation.addEventListener("touchend", onSliderChange, false);


const ShowAnnot = document.getElementById("Show Annotations");
ShowAnnot.addEventListener("change", onSliderChange, false);

const ShowShadow = document.getElementById("Shadow Analysis");
ShowShadow.addEventListener("change", onSliderChange, false);

//Set up Buttons
const downloadButton = document.getElementById("downloadButton");
downloadButton.onclick = download;

/////////////////////////
//Setup Empty Points List
// globals
let points = [];
// let cameraRig, activeCamera, activeHelper;
// let cameraPerspective, cameraOrtho;
// let cameraPerspectiveHelper, cameraOrthoHelper;
let rhino, doc;

rhino3dm().then(async (m) => {
  console.log("Successfully Loaded rhino3dm.");
  rhino = m;

  init();
  // rndPts();
  compute();
});

// function rndPts() {
//   // generate random points

//   const startPts = [

//     {x:3.276063, y:11.223933, z:0},
//     {x:-8.663308, y:18.347937, z:0},
//     {x:-3.87914, y:33.307085, z:0},
//     {x:4.563591, y:44.35353, z:0},
//     {x:16.825266, y:45.566347, z:0},
//     {x:21.027902, y:38.132332, z:0},
//     {x:28.596457, y:34.535895, z:0},
//     {x:37.259009, y:35.357609, z:0},
//     {x:44.208391, y:30.493998, z:0},
//     {x:45.483061, y:23.416053, z:0},
//     {x:41.160147, y:7.166575, z:0},
//     {x:31.918529, y:5.326137, z:0},
//     {x:24.132118, y:6.224273, z:0},
//     {x:21.344111, y:9.850299, z:0},
//     {x:18.25342, y:16.528613, z:0},

//   ]
// const cntPts = startPts.length;

//   for (let i = 0; i < cntPts; i++) {
//     const x = startPts[i].x
//     const y = startPts[i].y
//     const z = startPts[i].z

//     const pt = "{\"X\":" + x + ",\"Y\":" + y + ",\"Z\":" + z + "}"
//     console.log( `x ${x} y ${y}` )

//     points.push(pt);

//     //viz in three
//     const icoGeo = new THREE.SphereGeometry(0.3);
//     const icoMat = new THREE.MeshStandardMaterial();
//     const ico = new THREE.Mesh(icoGeo, icoMat);
//     ico.name = "ico";
//     ico.position.set(x, y, z);
//     scene.add(ico);

//     let tcontrols = new TransformControls(camera, renderer.domElement);
//     tcontrols.enabled = true;
//     tcontrols.attach(ico);
//     tcontrols.showZ = false;
//     tcontrols.addEventListener("dragging-changed", onChange);
//     tcontrols.setSize(0.35)
//     scene.add(tcontrols);
//   }
// }

// let dragging = false;
// function onChange() {
//   dragging = !dragging;
//   if (!dragging) {
//     // update points position
//     points = [];
//     scene.traverse((child) => {
//       if (child.name === "ico") {
//         const pt =
//           '{"X":' +
//           child.position.x +
//           ',"Y":' +
//           child.position.y +
//           ',"Z":' +
//           child.position.z +
//           "}";
//         points.push(pt);
//         console.log(pt);
//       }
//     }, false);

//     compute();

//     controls.enabled = true;
//     return;
//   }

//   controls.enabled = false;
// }

/////////////////////////////////////////////////////////////////////////////
//                            HELPER  FUNCTIONS                            //
/////////////////////////////////////////////////////////////////////////////

/**
 * Gets <input> elements from html and sets handlers
 * (html is generated from the grasshopper definition)
//  */
function getInputs() {
  const inputs = {};
  for (const input of document.getElementsByTagName("input")) {
    switch (input.type) {
      case "number":
        inputs[input.id] = input.valueAsNumber;
        input.onchange = onSliderChange;
        break;
      case "range":
        inputs[input.id] = input.valueAsNumber;
        input.onmouseup = onSliderChange;
        input.ontouchend = onSliderChange;
        break;
      case "checkbox":
        inputs[input.id] = input.checked;
        input.onclick = onSliderChange;
        break;
      default:
        break;
    }
  }
  return inputs;
}

/**
 * Call appserver
 */
async function compute() {
  // const data = {
  //   definition: definition,
  //   inputs: {
  //     //'dimension': dimension_slider.valueAsNumber,
  //     // 'height': height_slider.valueAsNumber,
      // "RH_IN: zHeight": zHeight_slider.valueAsNumber,
  //     "RH_IN: solAngle": solAngle_slider.valueAsNumber,
  //     "RH_IN: toD": toD_slider.valueAsNumber,
  //     "RH_IN: smlOpening": smlOpening_slider.valueAsNumber,
  //     "RH_IN: lrgOpening": lrgOpening_slider.valueAsNumber,
  //     //Insert Annotation Checkbox here
  //     //
      // "Show Trees": Showtrees.checked,
  //     "RH_IN: Trees Location": TreesLocation.valueAsNumber,
  //     "RH_IN: Trees Scale": TreesScale.valueAsNumber,
  //     "RH_IN: Trees No": TreesNo.valueAsNumber,
  //     //
      // "Show People": ShowPeople.checked,
  //     "RH_IN: People Location": PeopleLocation.valueAsNumber,
  //     "RH_IN: Population": Population.valueAsNumber,

  //     points: points,
  //   },
  // };

  // showSpinner(true);

  // console.log(data.inputs);

  // const request = {
  //   method: "POST",
  //   body: JSON.stringify(data),
  //   headers: { "Content-Type": "application/json" },
  // };

  //attaches Data to Document
  const url = new URL('/solve/' + data.definition, window.location.origin)
    Object.keys(data.inputs).forEach((key) =>
      url.searchParams.append(key, data.inputs[key])
    );
    console.log(url.toString());

  try {
    // const response = await fetch("/solve", request);
    const response = await fetch(url);

    if (!response.ok) {
      // TODO: check for errors in response json
      throw new Error(response.statusText);
    }

    const responseJson = await response.json();

    collectResults(responseJson);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Parse response
 */
function collectResults(responseJson) {
  const values = responseJson.values;

  console.log(values);

  //GET VALUES
  // // let RH_IN: zHeight =
  // let area = "Slide to see area"
  // let roofarea = "Slide to see roofarea"
  // let plants = "Slide to see No. plants"

  let mesharea = "Slide to see Mesh Area"
  let plotarea = "Slide to see Plot Area"
  let landarea = "Slide to see Land Area"
  let landDiameter = "Slide to see Diameter"
  let shadowArea = "Run Shadow Analysis to see area"

  let zHeight = "Slide to see value"
  let solAngle = "Slide to see value"
  let toD = "Slide to see value"
  let smlOpening = "Slide to see value"
  let lrgOpening = "Slide to see value"

  let treesNo = "Slide to see value"
  let treesLocation = "Slide to see value"
  let treesScale = "Slide to see value"

  let population = "Slide to see value"
  let peopleLocation = "Slide to see value"

  // clear doc
  // try {
    if (doc !== undefined) doc.delete();
  // } catch {}

  //console.log(values)
  doc = new rhino.File3dm();

  // for each output (RH_OUT:*)...
  for (let i = 0; i < values.length; i++) {
    // ...iterate through data tree structure...
    for (const path in values[i].InnerTree) {
      const branch = values[i].InnerTree[path];
      // ...and for each branch...
      for (let j = 0; j < branch.length; j++) {
        // ...load rhino geometry into doc
        const rhinoObject = decodeItem(branch[j]);

        // //GET VALUES
        if (values[i].ParamName == "RH_OUT:meshArea") {
          // mesharea = JSON.parse(responseJson.values[i].InnerTree['{ 0; }'][0].data)
          mesharea = Math.round(branch[j].data)
          console.log('mesh area = ' + mesharea + 'm²')
        }
        if (values[i].ParamName == "RH_OUT:plotArea") {
          // plotarea = JSON.parse(responseJson.values[i].InnerTree['{ 0; }'][0].data)
          plotarea = Math.round(branch[j].data)
          console.log('plot area = ' + plotarea + 'm²')
        }
        if (values[i].ParamName == "RH_OUT:Total Land Area") {
          // landarea = JSON.parse(responseJson.values[i].InnerTree['{ 0; }'][0].data)
          landarea = Math.round(branch[j].data)
          console.log('land area = ' + landarea + 'm²')
        }
        if (values[i].ParamName == "RH_OUT:landDiameter") {
          // landarea = JSON.parse(responseJson.values[i].InnerTree['{ 0; }'][0].data)
          landDiameter = Math.round(branch[j].data)
        }
        if (values[i].ParamName == "RH_OUT:shadowArea") {
          // landarea = JSON.parse(responseJson.values[i].InnerTree['{ 0; }'][0].data)
          shadowArea = Math.round(branch[j].data)
        }


        ///
        if (values[i].ParamName == "RH_OUT:zHeight") {
          // zHeight = JSON.parse(responseJson.values[i].InnerTree['{ 0; }'][0].data);
          zHeight = Math.round(branch[j].data)
        }
        if (values[i].ParamName == "RH_OUT:solAngle") {
          // solAngle = JSON.parse(responseJson.values[i].InnerTree['{ 0; }'][0].data)
          solAngle = Math.round(branch[j].data)
        }
        if (values[i].ParamName == "RH_OUT:toD") {
        //   toD = JSON.parse(responseJson.values[i].InnerTree['{ 0; }'][0].data)
          toD = Math.round(branch[j].data)
        }
        if (values[i].ParamName == "RH_OUT:smlOpening") {
            //   smlOpening = JSON.parse(responseJson.values[i].InnerTree['{ 0; }'][0].data)
        smlOpening = Math.round(branch[j].data)
        }
        if (values[i].ParamName == "RH_OUT:lrgOpening") {
        //   lrgOpening = JSON.parse(responseJson.values[i].InnerTree['{ 0; }'][0].data)
        lrgOpening = Math.round(branch[j].data)
        }
        if (values[i].ParamName == "RH_OUT:treesNo") {
        //   treesNo = JSON.parse(responseJson.values[i].InnerTree['{ 0; }'][0].data)
        treesNo = Math.round(branch[j].data)
        }
        if (values[i].ParamName == "RH_OUT:treesLocation") {
        //   treesLocation = JSON.parse(responseJson.values[i].InnerTree['{ 0; }'][0].data)
        treesLocation = Math.round(branch[j].data)
        }
        if (values[i].ParamName == "RH_OUT:treesScale") {
        //   treesScale = JSON.parse(responseJson.values[i].InnerTree['{ 0; }'][0].data)
        treesScale = branch[j].data
        }
        if (values[i].ParamName == "RH_OUT:population") {
        //   population = JSON.parse(responseJson.values[i].InnerTree['{ 0; }'][0].data)
        population = Math.round(branch[j].data)
        }
        if (values[i].ParamName == "RH_OUT:peopleLocation") {
          //   peopleLocation = JSON.parse(responseJson.values[i].InnerTree['{ 0; }'][0].data)
        peopleLocation = Math.round(branch[j].data)
        }


        // console.log(values[i].ParamName)

        if (rhinoObject !== null) {
          doc.objects().add(rhinoObject, null);
        }
      }
    }
  }

  // //GET VALUES
  
  document.getElementById('meshArea').innerText = "MESH SURFACE AREA = " + mesharea + " m²";
  document.getElementById('plotArea').innerText = "COVERED PLOT AREA = " + plotarea + " m²";
  document.getElementById('totalLandArea').innerText = "TOTAL LAND AREA = " + landarea + " m²";
  document.getElementById('landDiameter').innerText = "LAND DIAMETER = " + landDiameter + " m";
  document.getElementById('shadowArea').innerText = "SHADOW AREA = " + shadowArea + " m²";

  document.getElementById('zHeight').innerText = "Z Height = " + zHeight;
  document.getElementById('solAngle').innerText = "Solar Altitude Angle = " + solAngle + "°";
  document.getElementById('toD').innerText = "Time of Day = " + toD;
  document.getElementById('smlOpening').innerText = "Small Opening Size = " + smlOpening;
  document.getElementById('lrgOpening').innerText = "Large Opening Size = " + lrgOpening;

  document.getElementById('treesNo').innerText = "Tree Quantity = " + treesNo;
  document.getElementById('treesLocation').innerText = "Trees Scattering = " + treesLocation;
  document.getElementById('treesScale').innerText = "Trees Scale = " + treesScale;
  
  document.getElementById('population').innerText = "Population = " + population;
  document.getElementById('peopleLocation').innerText = "People Scattering = " + peopleLocation;

  ////////////////////////////
  // let objects = doc.objects();
  // for ( let i = 0; i < objects.count; i++ ) {

  //     const rhinoObject = objects.get( i );

  //         // asign geometry userstrings to object attributes
  //         if ( rhinoObject.geometry().userStringCount > 0 ) {
  //         const g_userStrings = rhinoObject.geometry().getUserStrings()
  //         rhinoObject.attributes().setUserString(g_userStrings[0][0], g_userStrings[0][1])

  //         ////////////////////////////////////////////////////////////
  //         const length = rhinoObject.geometry().getUserStrings()[1]
  //         console.log(length)
  //         ////////////////////////////////////////////////////////////
  //     }
  // }

  if (doc.objects().count < 1) {
    console.error("No rhino objects to load!");
    showSpinner(false);
    return;
  }

  // load rhino doc into three.js scene
  const buffer = new Uint8Array(doc.toByteArray()).buffer;
  loader.parse(buffer, function (object) {
    // debug
    /*
        object.traverse(child => {
          if (child.material !== undefined)
            child.material = new THREE.MeshNormalMaterial()
        }, false)
        */

    // clear objects from scene. do this here to avoid blink
    scene.traverse((child) => {
      if (
        child.userData.hasOwnProperty("objectType") &&
        child.userData.objectType === "File3dm"
      ) {
        scene.remove(child);
      }
    });

    // color crvs
    object.traverse((child) => {
      if (child.isLine) {
        if (child.userData.attributes.geometry.userStringCount > 0) {
          //console.log(child.userData.attributes.geometry.userStrings[0][1])
          const col = child.userData.attributes.geometry.userStrings[0][1];
          const threeColor = new THREE.Color("rgb(" + col + ")");
          const mat = new THREE.LineBasicMaterial({ color: threeColor });
          child.material = mat;
        }
      }
    });

  //   scene.traverse(child => {
  //     if (!child.isLight) {
  //         scene.remove(child)
  //     }
  // })


    // //COLOR MESHES
    // object.traverse((child) => {
    //   if (child.isMesh) {
    //       const mat = new THREE.MeshStandardMaterial( {color: (0x202020),roughness: 0.01 ,transparent: true, opacity: 0.50 } )
    //       child.material = mat;
    //             if (child.userData.attributes.geometry.userStringCount > 0) {

    //               //get color from userStrings
    //               const colorData = child.userData.attributes.userStrings[0]
    //               const col = colorData[1];

    //               //convert color from userstring to THREE color and assign it
    //               const threeColor = new THREE.Color("rgb(" + col + ")");
    //               const mat = new THREE.LineBasicMaterial({ color: threeColor });
    //               child.material = mat;
    //             }
    //   }
    // });

    // add object graph from rhino model to three.js scene
    scene.add(object);

    // hide spinner and enable download button
    showSpinner(false);
    downloadButton.disabled = false;

    // zoom to extents
    zoomCameraToSelection(camera, controls, scene.children);
  });
}

function decodeItem(item) {
  const data = JSON.parse(item.data);
  if (item.type === "System.String") {
    // hack for draco meshes
    try {
      return rhino.DracoCompression.decompressBase64String(data);
    } catch {} // ignore errors (maybe the string was just a string...)
  } else if (typeof data === "object") {
    return rhino.CommonObject.decode(data);
  }
  return null;
}

/**
 * Called when a slider value changes in the UI. Collect all of the
 * slider values and call compute to solve for a new scene
 */
function onSliderChange() {
  showSpinner(true);

  let inputs = {}
    for (const input of document.getElementsByTagName('input')) {
      switch (input.type) {
      case 'number':
        inputs[input.id] = input.valueAsNumber
        break
      case 'range':
        inputs[input.id] = input.valueAsNumber
        break
      case 'checkbox':
        inputs[input.id] = input.checked
        break
      }
    }

  data.inputs = inputs

  compute();
}

function showSpinner(enable) {
  if (enable) document.getElementById("loader").style.display = "block";
  else document.getElementById("loader").style.display = "none";
}

// Boilerplate//
// more globals
var scene, camera, renderer, controls;
 
/**
 * Sets up the scene, camera, renderer, lights and controls and starts the animation
 */
function init() {
  // Rhino models are z-up, so set this as the default
  THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);

  // create a scene and a camera
  scene = new THREE.Scene();

  //Scene Background
  // scene.background = new THREE.Color(1, 1, 1)

  let material, cubeMap;
  cubeMap = new THREE.CubeTextureLoader()
    .setPath("./assets/")
    .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);
  scene.background = cubeMap;

  // very light grey for background, like rhino
  //   scene.background = new THREE.Color("whitesmoke");
  ///
  // scene.fog = new THREE.Fog( 0xffffff, 40, 100 )

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1,10000 );

  // camera.position.set(1, -1, 1) // like perspective view
  camera.position.x = 2;
  camera.position.y = 1;
  camera.position.z = 1;
  camera.zoom = 1;
  camera.lookAt(scene.position);

  // create the renderer and add it to the html
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // add some controls to orbit the camera
  controls = new OrbitControls(camera, renderer.domElement);
  // controls.target.set(30, 39, 20);
  controls.update();

  // add a directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.intensity = 1.5;
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight();
  scene.add(ambientLight);

  scene.add( new THREE.AmbientLight( 0xf1e3c9, 1 ) )
  const light = new THREE.DirectionalLight( 0xf1e3c9, 1 )
  light.position.set( 200, 800, 300 )
  light.position.multiplyScalar( 5000 )
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  const d = 500;
  light.shadow.camera.left = - d;
  light.shadow.camera.right = d;
  light.shadow.camera.top = d;
  light.shadow.camera.bottom = - d;
  light.shadow.camera.far = 2000;
  scene.add( light );



  // handle changes in the window size
  window.addEventListener("resize", onWindowResize, false);

  animate();
}


/**
 * The animation loop!
 */
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  scene.rotation.z += 0.00015;
  scene.rotation.y += 0.0;
  scene.rotation.x += 0.0;
}

// var animate = function () {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// };

/**
 * Helper function for window resizes (resets the camera pov and renderer size)
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  animate();
}

/**
 * Helper function that behaves like rhino's "zoom to selection", but for three.js!
 */
function zoomCameraToSelection(camera, controls, selection, fitOffset = 1.2) {
  const box = new THREE.Box3();

  for (const object of selection) {
    if (object.isLight) continue;
    box.expandByObject(object);
  }

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const maxSize = Math.max(size.x, size.y, size.z);
  const fitHeightDistance =
    maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);

  const direction = controls.target
    .clone()
    .sub(camera.position)
    .normalize()
    .multiplyScalar(distance);
  controls.maxDistance = distance * 10;
  controls.target.copy(center);

  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();
  camera.position.copy(controls.target).sub(direction);

  controls.update();
}

/**
 * This function is called when the download button is clicked
 */
function download() {
  // write rhino doc to "blob"
  const bytes = doc.toByteArray();
  const blob = new Blob([bytes], { type: "application/octect-stream" });

  // use "hidden link" trick to get the browser to download the blob
  const filename = data.definition.replace(/\.gh$/, "") + ".3dm";
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
