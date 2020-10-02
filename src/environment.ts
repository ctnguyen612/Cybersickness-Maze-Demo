import { HemisphericLight, Mesh, MeshBuilder, Scene, StandardMaterial, Texture, WebXRDefaultExperience } from "@babylonjs/core";
import { Color3, Vector3 } from "@babylonjs/core/Maths/math";


export class Environment
{
    private _scene: Scene;
    public xrHelper: WebXRDefaultExperience;

    constructor(scene: Scene)
    {
        this._scene = scene;
    }

    public async load()
    {
        // XR & camera stuff ######################################################
        // ########################################################################
        this.xrHelper = await this._scene.createDefaultXRExperienceAsync({ disableTeleportation: true });

        const xrCamera = this.xrHelper.input.xrCamera;

        xrCamera.name = "XR Camera";
        xrCamera.applyGravity = true;
        xrCamera.checkCollisions = true;


        // Assets stuff ###########################################################
        // ########################################################################

        // load textures
        var wallTexture = new Texture("textures/brick.png", this._scene);
        wallTexture.uScale = 5;
        wallTexture.vScale = 1;

        // Lights #################################################################
        // ########################################################################

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new HemisphericLight("light", new Vector3(0, 1, 0), this._scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Physics ################################################################
        // ########################################################################

        // Create gravity
        this._scene.gravity = new Vector3(0, -9.81, 0);

        // Enable collisions
        this._scene.collisionsEnabled = true;

        // Objects ################################################################
        // ########################################################################

        // Create a default skybox
        const environment = this._scene.createDefaultEnvironment({
            createGround: false,
            skyboxSize: 250,
            skyboxColor: new Color3(0.059, 0.663, 0.80)
        });
        
        // Our built-in 'ground' shape.
        var ground = MeshBuilder.CreateGround("ground", { width: 25, height: 25 }, this._scene);

        // Enable collisions on ground
        ground.checkCollisions = true;

        // // Load texture from local directory
        //var gridTexture = new Texture("textures/grid.png", scene);

        // // Create groundMaterial
        // var groundMaterial = new StandardMaterial("groundmaterial", scene);

        // // Attach gridTexture to groundMaterial
        //groundMaterial.diffuseTexture = gridTexture;

        // // Apply groundMaterial to ground
        // ground.material = groundMaterial;

        // ########################################################################
        // ########################################################################

        // Create walls
        var leftWall = MeshBuilder.CreateBox("left wall", { width: 15, height: 3, depth: 0.3 }, this._scene);
        leftWall.checkCollisions = true;
        leftWall.rotation.y = Math.PI / 2;
        leftWall.position = new Vector3(-2, 1.5, 4);
        var wallMaterial = new StandardMaterial("", this._scene);
        wallMaterial.diffuseTexture = wallTexture;
        leftWall.material = wallMaterial;
        

        var rightWall = leftWall.clone();
        rightWall.name = "right wall";
        rightWall.position.x = 2;
    }
}