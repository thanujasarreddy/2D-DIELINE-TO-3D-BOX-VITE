import * as THREE from "three";
import { BOX } from "./constants.js";

export function createPanels(texture) {

    const material = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide
    });

    const group = new THREE.Group();

    // ---------------- FRONT ----------------
    const front = new THREE.Mesh(
        new THREE.PlaneGeometry(BOX.width, BOX.height),
        material
    );

    front.name = "front";
    front.position.set(0, 0, 0);
    front.castShadow = true;
    front.receiveShadow = true;

    group.add(front);
    
  

    // ---------------- TOP ----------------
    const topPivot = new THREE.Group();
   
    topPivot.position.set(0,BOX.height / 2,0);

    const top = new THREE.Mesh(
        new THREE.PlaneGeometry(BOX.width, BOX.depth),
        material
    );

    top.name = "top";
    //top.rotation.x = 0;
    
    top.position.set(0,BOX.depth / 2,0);
    

    top.castShadow = true;
    top.receiveShadow = true;

    topPivot.add(top);
    group.add(topPivot);
   // ---------------- BACK ----------------
    

// ---------------- BOTTOM ----------------

    
    const bottomPivot = new THREE.Group();
    bottomPivot.position.y= -BOX.height / 2;

    const bottom = new THREE.Mesh(
        new THREE.PlaneGeometry(BOX.width, BOX.depth),
        material
    );

    bottom.name = "bottom";
    //bottom.rotation.x = -Math.PI / 2;
    bottom.position.y=BOX.depth / 2;

    bottom.castShadow = true;
    bottom.receiveShadow = true;

    bottomPivot.add(bottom);
    front.add(bottomPivot);
    // ---------------- LEFT ----------------
    const leftPivot = new THREE.Group();
    leftPivot.position.x=-BOX.width / 2;

    const left = new THREE.Mesh(
        new THREE.PlaneGeometry(BOX.depth, BOX.height),
        material
    );

    left.name = "left";
    //left.rotation.y = Math.PI / 2;
    left.position.x=-BOX.depth / 2;

    left.castShadow = true;
    left.receiveShadow = true;

    leftPivot.add(left);
    front.add(leftPivot);
    // ---------------- BACK ----------------
   // ---------------- BACK ----------------
    const backPivot = new THREE.Group();

// Attach the back to the left panel's free edge
    backPivot.position.set=(0,0,-BOX.depth);

    const back = new THREE.Mesh(
        new THREE.PlaneGeometry(BOX.width, BOX.height),
        material
    );

    back.name = "back";

// Position so its right edge is on the hinge
    back.position.set(-BOX.width / 2, 0,-BOX.depth/2);

    back.castShadow = true;
    back.receiveShadow = true;

    backPivot.add(back);

// Attach to the left panel
    left.add(backPivot);
// ---------------- RIGHT ----------------
    const rightPivot = new THREE.Group();
    rightPivot.position.x=BOX.width / 2 ;

    const right = new THREE.Mesh(
        new THREE.PlaneGeometry(BOX.depth, BOX.height),
        material
    );

    right.name = "right";
    //right.rotation.y = -Math.PI / 2;
    right.position.x=BOX.depth / 2;

    right.castShadow = true;
    right.receiveShadow = true;

    rightPivot.add(right);
    front.add(rightPivot);


    return{
        group,

        front,

        top,
        topPivot,

        bottom,
        bottomPivot,

        left,
        leftPivot,

        right,
        rightPivot,

        back,
        backPivot

    };
}
