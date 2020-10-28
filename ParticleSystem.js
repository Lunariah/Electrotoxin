import {Clock, Mesh, Object3D, MeshBasicMaterial, CubeGeometry, SphereGeometry, MathUtils} from "./three.module.js"

export class ParticleEmitter extends Object3D
{
    scene;
    quantity; size; colour;
    particleList = []; p = 0; visibleParticles = 0;
    clock; timer; delay; zoneWidth;
    emitting;
    speed = 10;


    constructor(scene, delay, quantity, size, zoneWidth, zoneHeight, colour=0xFFFFFF, autostart=true)
    {
        super();
        this.scene = scene;
        this.delay = delay;
        this.timer = delay;
        this.quantity = quantity;
        this.size = size;
        this.colour = colour;
        this.zoneWidth = zoneWidth;
        this.zoneHeight = zoneHeight;

        this.emitting = false;

        this.add(new Particle()); // Debug

        scene.add(this);
        if (autostart == true) {this.start();}
    }

    setPosition(x, y, z)
    {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }

    start()
    {
        // Start emitting. 
        for(var i = 0; i < this.quantity; i++)
        {
            this.particleList[i] = new Particle(this.size);
        }
        this.emitting = true;
        this.clock = new Clock(true);

        //console.log(this.particleList.length);

        //console.log("Quantity: " + this.quantity);
        //console.log("Length: "+ this.particleList.length);
        //console.log(this.particleList[9]);
    }

    shutdown()
    {
        /*
        for (let i = 0; i < this.visibleParticles; i++)
        {
            this.scene.remove(this.particleList[i]);
        }
        */
       this.scene.remove(this);
    }

    update()
    {
        // Move and create particles. Fill the list and once it’s full, put old particles back to a new starting point.
        let dt = this.clock.getDelta();

        this.moveParticles(dt)

        // Create particles
        if (!this.emitting)
            return;

        this.timer -= dt;
        if (this.timer <= 0)
        {
            //console.log(this.p);
            this.timer = this.delay;
            if (this.p >= this.quantity)
            {
                this.p = 0;
            }
            
            if (this.visibleParticles < this.quantity)
            {
                this.add(this.particleList[this.p]);
                this.visibleParticles++;
                
                //console.log("New particle");
                //console.log(this.p);
            }
            //console.log("x: " + this.x +" y: " + this.y + " z: " + this.z);
            //console.log(this.p);
            this.particleList[this.p].position.x = 0;
            this.particleList[this.p].position.y = MathUtils.randFloatSpread(this.zoneHeight);
            this.particleList[this.p].position.z = MathUtils.randFloatSpread(this.zoneWidth);
            this.p++;
        }
    }

    moveParticles(time)
    {
        for (let i = 0; i < this.visibleParticles; i++)
        {
            this.particleList[i].position.x += this.speed * time;
        }
    }

    changeScale(x)
    {
        for (let i = 0; i < this.visibleParticles; i++)
        {
            this.particleList[i].scale.x = x;
            this.particleList[i].scale.y = x;
            this.particleList[i].scale.z = x;
            
        }
        console.log(this.particleList[0].scale.x);
    }
}

export class Particle extends Mesh
{
    constructor(size)
    {
        let geometry = new SphereGeometry(size, 5, 2);
        let material = new MeshBasicMaterial( {color: 0xffffff} );
        super(geometry, material);
    }
}