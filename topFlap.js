import * as THREE from "three";

export function createTopFlap(texture) {

    const pivot = new THREE.Group();

    const material = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide
    });

    const flap = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 3),
        material
    );

    // Move the flap so its bottom edge sits at the pivot (hinge)
    flap.position.y = 1.5;

    pivot.add(flap);

    return {
        pivot,
        flap
    };
}
