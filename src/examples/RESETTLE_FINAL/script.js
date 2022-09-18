import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.126.0/build/three.module.js'
import {
    OrbitControls
} from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/controls/OrbitControls.js'
import {
    Rhino3dmLoader
} from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/loaders/3DMLoader.js'
import rhino3dm from 'https://cdn.jsdelivr.net/npm/rhino3dm@7.14.0/rhino3dm.module.js'
import {
    TransformControls
} from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/controls/TransformControls.js'

// set up loader for converting the results to threejs
const loader = new Rhino3dmLoader()
loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@7.14.0/')

var myRadarChart;
var myModuleCountChart;

// initialise 'data' object that will be used by compute()
const data = {
    definition: 'MACAD_RESETTLE_Thesis.gh',
    inputs: getInputs()
}

let points = []

// globals
let rhino, doc

rhino3dm().then(async m => {
    rhino = m

    init()
    rndPts()
    compute()
})

const downloadButton = document.getElementById("downloadButton")
downloadButton.onclick = download

// rnd Points
function rndPts() {
    // generate random points

    const startPts = {
        x: 33.160349,
        y: -83.034558,
        z: 0
    }

    const cntPts = startPts.length

    for (let i = 0; i < cntPts; i++) {
        const x = startPts[i].x
        const y = startPts[i].y
        const z = startPts[i].z

        const pt = "{\"X\":" + x + ",\"Y\":" + y + ",\"Z\":" + z + "}"

        console.log(`x ${x} y ${y}`)

        points.push(pt)

        //viz in three
        const icoGeo = new THREE.IcosahedronGeometry(25)
        const icoMat = new THREE.MeshNormalMaterial()
        const ico = new THREE.Mesh(icoGeo, icoMat)
        ico.name = 'ico'
        ico.position.set(x, y, z)
        scene.add(ico)

        let tcontrols = new TransformControls(camera, renderer.domElement)
        tcontrols.enabled = true
        tcontrols.attach(ico)
        tcontrols.showZ = false
        tcontrols.addEventListener('dragging-changed', onChange)
        scene.add(tcontrols)

    }
}

let dragging = false

function onChange() {
    dragging = !dragging
    if (!dragging) {
        // update points position
        points = []
        scene.traverse(child => {
            if (child.name === 'ico') {
                const pt = "{\"X\":" + child.position.x + ",\"Y\":" + child.position.y + ",\"Z\":" + child.position.z + "}"
                points.push(pt)
                console.log(pt)
            }
        }, false)

        compute()

        controls.enabled = true
        return
    }

    controls.enabled = false

}



/////////////////////////////////////////////////////////////////////////////
//                            HELPER  FUNCTIONS                            //
/////////////////////////////////////////////////////////////////////////////

/**
 * Gets <input> elements from html and sets handlers
 * (html is generated from the grasshopper definition)
 */
function getInputs() {
    const inputs = {}
    for (const input of document.getElementsByTagName('input')) {
        switch (input.type) {
            case 'number':
                inputs[input.id] = input.valueAsNumber
                input.onchange = onSliderChange
                break
            case 'range':
                inputs[input.id] = input.valueAsNumber
                input.onmouseup = onSliderChange
                input.ontouchend = onSliderChange
                break
            case 'checkbox':
                inputs[input.id] = input.checked
                input.onclick = onSliderChange
                break
            default:
                break
        }
    }
    return inputs
}

// more globals
let scene, camera, renderer, controls, raycaster, selectedMaterial;

/**
 * Sets up the scene, camera, renderer, lights and controls and starts the animation
 */
function init() {

    // Rhino models are z-up, so set this as the default
    THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);

    // create a scene and a camera
    scene = new THREE.Scene()

    let cubeMap;
    cubeMap = new THREE.CubeTextureLoader()
        .setPath("./assets/")
        .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
    scene.background = cubeMap;


    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
    // camera.position.set(1, -1, 1) // like perspective view

    camera.position.x = -100;
    camera.position.y = -450;
    camera.position.z = 200;

    camera.lookAt(scene.position);

    // create the renderer and add it to the html
    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // add some controls to orbit the camera
    controls = new OrbitControls(camera, renderer.domElement)
    controls.update();

    // add a directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.intensity = 1.5;
    scene.add(directionalLight)

    const ambientLight = new THREE.AmbientLight()
    scene.add(ambientLight)

    // add lights and views
    scene.add(new THREE.AmbientLight(0xf1e3c9, 1))
    const light = new THREE.DirectionalLight(0xf1e3c9, 1)
    light.position.set(200, 800, 300)
    light.position.multiplyScalar(5000)
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    const d = 500;
    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;
    light.shadow.camera.far = 2000;
    scene.add(light);


    // handle changes in the window size
    window.addEventListener('resize', onWindowResize, false)

    animate()
}

/**
 * Call appserver
 */
async function compute() {
    // construct url for GET /solve/definition.gh?name=value(&...)
    const url = new URL('/solve/' + data.definition, window.location.origin);
    Object.keys(data.inputs).forEach(key => url.searchParams.append(key, data.inputs[key]));
    try {
        const response = await fetch(url)
        if (!response.ok) {
            // TODO: check for errors in response json
            throw new Error(response.statusText)
        }
        const responseJson = await response.json().then(function(responseJson) {
            console.log(responseJson);
            collectResults(responseJson);
        });
    } catch (error) {
        console.error(error)
    }
}

/**
 * Parse response
 */
function collectResults(responseJson) {

    const values = responseJson.values
    // XXXXXXXXXXXXXXXXXXXXXXXX-------------------VALUES--------xxxxxxxxxxxxxxXXXXXXXX
    let den_IND = "Slide to see Density Index"
    let acc_IND = "Slide to see Accessibility Index"
    let fld_IND = "Slide to see Flood Mitigation Index"
    let env_IND = "Slide to see Environmental Index"
    let com_IND = "Slide to see Community Index"
    // XXXXXXXXXXXXXXXXXXXXXXXX-------------------/VALUES--------xxxxxxxxxxxxxxXXXXXXXX
    // clear doc
    if (doc !== undefined)
        doc.delete()

    //console.log(values)
    doc = new rhino.File3dm()

    // for each output (RH_OUT:*)...
    for (let i = 0; i < values.length; i++) {
        // ...iterate through data tree structure...
        for (const path in values[i].InnerTree) {
            const branch = values[i].InnerTree[path]
            // ...and for each branch...
            for (let j = 0; j < branch.length; j++) {
                // ...load rhino geometry into doc
                const rhinoObject = decodeItem(branch[j])
                // XXXXXXXXXXXXXXXXXXXXXXXX-------------------VALUES--------xxxxxxxxxxxxxxXXXXXXXX
                //GET VALUES
                if (values[i].ParamName == "RH_OUT: DENSITY INDEX_0") {
                    den_IND = branch[j].data
                    console.log("Density Index =" + den_IND)
                }
                if (values[i].ParamName == "RH_OUT: ACCESSIBILITY INDEX SCORE") {
                    acc_IND = branch[j].data
                    console.log("Accessibility Index =" + acc_IND)
                }
                if (values[i].ParamName == "RH_OUT: FLOOD MITIGATION RISK SCORE") {
                    fld_IND = branch[j].data
                    console.log("Flood Mitigation Index =" + fld_IND)
                }
                if (values[i].ParamName == "RH_OUT: ENVIRONMENTAL QUALITY") {
                    env_IND = branch[j].data
                    console.log("Environmental Index =" + env_IND)
                }
                if (values[i].ParamName == "RH_OUT: COMMUNITY INDEX SCORE") {
                    com_IND = branch[j].data
                    console.log("Community Index =" + com_IND)
                }
                // XXXXXXXXXXXXXXXXXXXXXXXX-------------------/VALUES--------xxxxxxxxxxxxxxXXXXXXXX


                if (rhinoObject !== null) {
                    doc.objects().add(rhinoObject, null)
                }
            }
        }
        
    }

    destroyCharts();
    drawRadarChart(den_IND, acc_IND, fld_IND, env_IND, com_IND);
    drawModuleCountChart(values);
    // XXXXXXXXXXXXXXXXXXXXXXXX-------------------VALUES--------xxxxxxxxxxxxxxXXXXXXXX

    //GET VALUES
    document.getElementById('den_IND').innerText = "// DENSITY = " + den_IND
    document.getElementById('acc_IND').innerText = "// ACCESSIBILITY = " + acc_IND
    document.getElementById('fld_IND').innerText = "// FLOOD = " + fld_IND
    document.getElementById('env_IND').innerText = "// ENVIRONMENT = " + env_IND
    document.getElementById('com_IND').innerText = "// COMMUNITY = " + com_IND

    // XXXXXXXXXXXXXXXXXXXXXXXX-------------------/VALUES--------xxxxxxxxxxxxxxXXXXXXXX
    if (doc.objects().count < 1) {
        console.error('No rhino objects to load!')
        showSpinner(false)
        return
    }

    // load rhino doc into three.js scene
    const buffer = new Uint8Array(doc.toByteArray()).buffer
    loader.parse(buffer, function(object) {
        // debug 
        /*
        object.traverse(child => {
          if (child.material !== undefined)
            child.material = new THREE.MeshNormalMaterial()
        }, false)
        */

        // clear objects from scene. do this here to avoid blink
        scene.traverse(child => {
            if (!child.isLight) {
                scene.remove(child)
            }
        })

        // add object graph from rhino model to three.js scene
        scene.add(object)

        // hide spinner and enable download button
        showSpinner(false)
        downloadButton.disabled = false

        // zoom to extents
        // zoomCameraToSelection(camera, controls, scene.children)
    })
}

/**
 * Attempt to decode data tree item to rhino geometry
 */
function decodeItem(item) {
    const data = JSON.parse(item.data)
    if (item.type === 'System.String') {
        // hack for draco meshes
        try {
            return rhino.DracoCompression.decompressBase64String(data)
        } catch {} // ignore errors (maybe the string was just a string...)
    } else if (typeof data === 'object') {
        return rhino.CommonObject.decode(data)
    }
    return null
}

/**
 * Called when a slider value changes in the UI. Collect all of the
 * slider values and call compute to solve for a new scene
 */
function onSliderChange() {
    showSpinner(true)
    // get slider values
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

    compute()
}

/**
 * The animation loop!
 */
function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
    scene.rotation.z += 0.00015;
    scene.rotation.y += 0.0;
    scene.rotation.x += 0.0;
}

/**
 * Helper function for window resizes (resets the camera pov and renderer size)
 */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    animate()
}

/**
 * Helper function that behaves like rhino's "zoom to selection", but for three.js!
 */
function zoomCameraToSelection(camera, controls, selection, fitOffset = 1.2) {

    const box = new THREE.Box3();

    for (const object of selection) {
        if (object.isLight) continue
        box.expandByObject(object);
    }

    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxSize = Math.max(size.x, size.y, size.z);
    const fitHeightDistance = maxSize / (2 * Math.atan(Math.PI * camera.fov / 360));
    const fitWidthDistance = fitHeightDistance / camera.aspect;
    const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);

    const direction = controls.target.clone()
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
    const bytes = doc.toByteArray()
    const blob = new Blob([bytes], {
        type: "application/octect-stream"
    })

    // use "hidden link" trick to get the browser to download the blob
    const filename = data.definition.replace(/\.gh$/, '') + '.3dm'
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    link.click()
}

/**
 * Shows or hides the loading spinner
 */
function showSpinner(enable) {
    if (enable)
        document.getElementById('loader').style.display = 'block'
    else
        document.getElementById('loader').style.display = 'none'
}

function drawModuleCountChart(data) {

  let chartLabels = [];
  let chartData = [];

  data.forEach(obj => {
    if (obj.ParamName.includes('ModCount')) {
      chartLabels.push(obj.ParamName);
      chartData.push(obj.InnerTree['{0}'][0].data);
    }
  });

  myModuleCountChart = new Chart(document.getElementById('myChart2'), {
    type: 'bar',
    data: {
        labels: chartLabels,
        fontColor: '#008080',
        datasets: [{
            label: 'Module Count',
            backgroundColor: '#FF7F5080',
            borderColor: '#FF7F50',
            data: chartData,
        }]
    },
    options: {
        responsive: true,
        scales: {
          x: {
            ticks: {color: 'black'}
          },
          y: {
            ticks: {color: 'black'}
          }
        },
        title: {
            display: true,
            text: 'ANALYSIS METRICS'
        },
    }
  });
}

function drawRadarChart(den_chart, acc_chart, fld_chart, env_chart, com_chart) {
    den_chart = parseFloat(den_chart);
    acc_chart = parseFloat(acc_chart);
    fld_chart = parseFloat(fld_chart);
    env_chart = parseFloat(env_chart);
    com_chart = parseFloat(com_chart);

    myRadarChart = new Chart(document.getElementById('myChart'), {
        type: 'radar',
        data: {
            labels: ['Density', 'Accessibility', 'Flood Mitigation', 'Environment', 'Community'],
            datasets: [{
                label: 'PERFORMANCE SCORE',
                backgroundColor: '#FF7F5080',
                // borderColor: '#FF7F50',
                data: [den_chart, acc_chart, fld_chart, env_chart, com_chart],
            }]
        },
        options: {
          scale: {
            gridLines: {
              color: ['black', 'red', 'orange', 'yellow', 'green']
            },
          },
          borderColor: "#FF7F50",
          title: {
              display: true,
              text: 'ANALYSIS METRICS'
          },
          fontColor: '#008080',
          color: '#003535', // affects words colour
          // display: false,
          // tickColor:"0000ff",
          responsive: true,
      }
    });
}

function destroyCharts()
{
  if (myModuleCountChart) {
    myModuleCountChart.destroy();
  }
  if (myRadarChart) {
    myRadarChart.destroy();
  }
}
<<<<<<< HEAD
=======

/////////////////////
////     RADAR CHART
/////////////////////    
>>>>>>> parent of 8496aeb (Updated Graphics and Input Params)
