//import "./dat.gui.js"
import {WebGLRenderer, Scene, Audio as THREEAudio, AudioListener, AudioAnalyser, PerspectiveCamera, SpotLight, PlaneGeometry, SphereGeometry, MeshLambertMaterial, MeshPhongMaterial, MeshBasicMaterial, DoubleSide, Mesh, BoxGeometry} from "./three.module.js"
import {ParticleEmitter} from "./ParticleSystem.js"
import "./stats.module.js"
import Stats from "./stats.module.js";

var scene, camera, spotLight, spotLight2, plane, startingBox, emitterEast, emitterWest, emitterNorth, emitterSouth;
var analyser, listener, audio;
var state = 1;
var startDate;
var renderer;
var stats;

var rotationSpeed = 0.01;
var planeColor = "#ff0000";
var backgroundColor = "#000000";

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
    renderer.setSize(window.innerWidth - 20, window.innerHeight - 50);
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    // Scene
    scene = new Scene();

    // Audio
    listener = new AudioListener();
    audio = new THREEAudio(listener);
    var mediaElement = new Audio("./Electrotoxin.ogg");
    mediaElement.play();
    audio.setMediaElementSource(mediaElement);
    analyser = new AudioAnalyser( audio, 128 );    

    // Camera
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -10;
    camera.position.y = 30;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    scene.add(camera);

    // Light
    spotLight = new SpotLight(0xffffff);
    //spotLight.position.set(-40, 60, -10);
    spotLight.position.set(0,8,0);
    scene.add(spotLight);

    spotLight2 = new SpotLight(0xffffff);
    spotLight2.position.set(0,-8,0);
    scene.add(spotLight2);

    // Particles
    /*
    emitterEast = new ParticleEmitter(scene, 0.1, 100, 0.5, 50);
    emitterEast.setPosition(-70, 0, 100);
    emitterNorth = new ParticleEmitter(scene, 0.1, 100, 0.5, 100);
    emitterNorth.setPosition(-70, 100, 0);
    */
    emitterWest = new ParticleEmitter(scene, 0.2, 250, 0.5, 50, 80);
    emitterWest.setPosition(-100, -60, -80);
    emitterSouth = new ParticleEmitter(scene, 0.2, 100, 0.5, 70, 50);
    emitterSouth.setPosition(-60, -80, 0);

    emitterWest.speed *= 2;
    emitterSouth.speed *=2;

    // Plane 0
    var planeGeometry = new PlaneGeometry(30, 20, 1, 1);
    var planeMaterial = new MeshPhongMaterial({ color: "#FF0000", side: DoubleSide });
    plane = new Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    // Starting cube
    
    var startingBoxGeometry = new BoxGeometry(60, 60, 60);
    var startingBoxMaterial = new MeshLambertMaterial({ color: "#000000", side: DoubleSide });
    startingBox = new Mesh(startingBoxGeometry, startingBoxMaterial);
    //startingCube.rotation.x = 0.25 * Math.PI;
    //startingCube.rotation.y = 0.25 * Math.PI;
    scene.add(startingBox);
    


    startDate = Date.now();

    //emitterWest.moveParticles(10);
    //emitterWest.moveParticles(10);
    render();
}

function render() 
{
    //stats.update();

    //emitterNorth.update();
    //emitterEast.update();
    emitterWest.update();
    emitterSouth.update();

    var time = Date.now()-startDate;
    //analyser.getFrequencyData();

    //camera.position.x += Math.cos(time);

    plane.material.color.set(planeColor);
    renderer.setClearColor(backgroundColor);

    switch (state) {
        case 1:
            step1();
            if (time > 18100) state=2;
            break;
        case 2:
            step2();
            if (time > 19100) {
                state=3;
                scene.remove(startingBox);
                emitterSouth.speed /= 2;
                emitterWest.speed /= 2;
            }
            break;
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