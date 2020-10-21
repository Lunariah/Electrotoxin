import {Clock, Mesh, MeshBasicMaterial, CubeGeometry, SphereGeometry, MathUtils} from "./three.module.js"

export class ParticleEmitter
{
    scene;
    quantity; size; colour;
    particleList = []; p = 0; visibleParticles = 0;
    clock; timer; delay; zoneWidth;
    emitting;
    speed = 10;


    constructor(scene, x, y, z, delay, quantity, size, zoneWidth, colour=0xFFFFFF, autostart=true)
    {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.z = z;
        this.delay = delay;
        this.timer = delay;
        this.quantity = quantity;
        this.size = size;
        this.colour = colour;
        this.zoneWidth = zoneWidth;

        this.emitting = false;

        if (autostart == true) {this.start();}
    }

    update()
    {
        // Move and create particles. Fill the list and once it’s full, put old particles back to a new starting point.
        let dt = this.clock.getDelta();
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
                this.scene.add(this.particleList[this.p]);
                this.visibleParticles++;
                
                //console.log("New particle");
                //console.log(this.p);
            }
            //console.log("x: " + this.x +" y: " + this.y + " z: " + this.z);
            //console.log(this.p);
            this.particleList[this.p].position.x = 0;
            this.particleList[this.p].position.y = MathUtils.randFloatSpread(this.zoneWidth);
            this.particleList[this.p].position.z = MathUtils.randFloatSpread(this.zoneWidth);
            //console.log("Looped");
            this.p++;
            //console.log(this.pooling);
        }
        //else {console.log("waiting");}

        // Move particles
        for (var i = 0; i < this.visibleParticles; i++)
        {
            //console.log(i);
            this.particleList[i].position.x += this.speed * dt;
            //console.log("Move");
        }
        //console.log("Move complete");
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

}

export class Particle extends Mesh
{
    constructor(size)
    {
        let geometry = new SphereGeometry(size, 5, 2);
        let material = new MeshBasicMaterial( {color: 0x000000} );
        super(geometry, material);
    }
}