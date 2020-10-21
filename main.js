//import "./dat.gui.js"
import {WebGLRenderer, Scene, Audio, AudioListener, AudioAnalyser, PerspectiveCamera, SpotLight, PlaneGeometry, MeshLambertMaterial, DoubleSide, Mesh} from "./three.module.js"
import {ParticleEmitter, Particle} from "./ParticleSystem.js"
import "./stats.module.js"
import Stats from "./stats.module.js";

var scene, camera, spotLight, plane, emitter;
var analyser, listener, audio;
var state = 1;
var startDate;
var renderer;
var stats;

var rotationSpeed = 0.01;
var planeColor = "#ff0000";
var backgroundColor = "#00ff00";

// Debug
/*
var gui = new dat.GUI();
gui.add(this, "state", 0, 11);      // write-only, apparently
gui.add(this, "rotationSpeed", -1, 1);
gui.addColor(this, "planeColor");
gui.addColor(this, "backgroundColor");
*/

// Start button
var startButton = document.getElementById('startButton');
startButton.addEventListener('click', init);

function init() 
{
    /*
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0";
    stats.domElement.style.top = "0";
    document.body.appendChild(stats.domElement);
    */
    
    // Remove overlay
    var overlay = document.getElementById('overlay');
    overlay.remove();

    


    // Renderer
    renderer = new WebGLRenderer( {antialias: true} );
    renderer.setClearColor(backgroundColor);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    // Scene
    scene = new Scene();

    // Audio
    /*
    listener = new AudioListener();
    audio = new Audio(listener);
    //var fileName = './Electrotoxin.ogg';
    
    var mediaElement = new Audio("./Electrotoxin.ogg");
    mediaElement.play();
    audio.setMediaElementSource(mediaElement);
    analyser = new AudioAnalyser( audio, 128 );
    */
    

    // Camera
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 50;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    scene.add(camera);

    // Light
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    scene.add(spotLight);

    // Particles
    emitter = new ParticleEmitter(scene, 0,0,0, 0.1, 200, 0.5, 40);

    // Plane 0
    var planeGeometry = new PlaneGeometry(30, 20, 1, 1);
    var planeMaterial = new MeshLambertMaterial({ color: "#FF0000", side: DoubleSide });
    plane = new Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
        scene.add(plane);


    startDate = Date.now();

    render();
}

function render() 
{
    //stats.update();
    renderer.setClearColor(0xff00ff);

    emitter.update();

    var time = Date.now()-startDate;
    //analyser.getFrequencyData();

    camera.position.x += Math.cos()

    plane.material.color.set(planeColor);
    renderer.setClearColor(backgroundColor);

    switch (state) {
        case 1:
            step1();
            if (time > 18100) state=2;
            break;
        case 2:
            step2();
            if (time > 19100) state=3;
            break
        case 3:
            step3();
            if (time > 42100) state=4;
            break;
        case 4:
            step4();
            if (time > 57400) state=5;
            break;
        case 5:
            step5();
            if (time > 72100) state=6;
            break;
        case 6:
            step6();
            if (time > 93000) state=7;
            break;
        case 7:
            step7();
            if (time > 107000) state=8;
            break;
        case 8:
            step8();
            if (time > 122000) state=9;
            break;
        case 9:
            step9();
            if (time > 141000) state=10;
            break;
        case 10:
            step10();
            if (time > 183000) state=11;
            break;
        case 11:
            step11();
            break;
        default:
            console.error("State machine broke. state=" + state);
            step=1;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);

    function step1()
    {
        plane.rotation.z += rotationSpeed;
    }

    function step2()
    {

    }

    function step3()
    {
        plane.rotation.z -= rotationSpeed;
    }

    function step4()
    {
        plane.rotation.x += rotationSpeed;
    }

    function step5()
    {
        plane.rotation.x -= rotationSpeed;
    }

    function step6()
    {
        plane.rotation.y += rotationSpeed;
    }

    function step7()
    {
        plane.rotation.y -= rotationSpeed;
    }

    function step8()
    {
        plane.rotation.z += rotationSpeed;
        plane.rotation.y += rotationSpeed;
    }

    function step9()
    {
        plane.rotation.z += rotationSpeed;
        plane.rotation.y -= rotationSpeed;
    }

    function step10()
    {
        plane.rotation.z -= rotationSpeed;
        plane.rotation.y += rotationSpeed;
    }

    function step11()
    {
        plane.rotation.z -= rotationSpeed;
        plane.rotation.y -= rotationSpeed;
    }
}