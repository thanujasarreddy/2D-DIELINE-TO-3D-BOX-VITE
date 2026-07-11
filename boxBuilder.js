import * as THREE from "three";

export function createBox(texture) {

    const material = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide
    });

    const group = new THREE.Group();

    const width = 4;
    const height = 2.5;
    const depth = 3;

    // FRONT
    const front = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        material
    );
    front.position.set(0, 0, depth / 2);

    // BACK
    const back = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        material
    );
    back.rotation.y = Math.PI;
    back.position.set(0, 0, -depth / 2);

    // LEFT
    const left = new THREE.Mesh(
        new THREE.PlaneGeometry(depth, height),
        material
    );
    left.rotation.y = Math.PI / 2;
    left.position.set(-width / 2, 0, 0);

    // RIGHT
    const right = new THREE.Mesh(
        new THREE.PlaneGeometry(depth, height),
        material
    );
    right.rotation.y = -Math.PI / 2;
    right.position.set(width / 2, 0, 0);

    // TOP
    const top = new THREE.Mesh(
        new THREE.PlaneGeometry(width, depth),
        material
    );
    top.rotation.x = -Math.PI / 2;
    top.position.set(0, height / 2, 0);

    // BOTTOM
    const bottom = new THREE.Mesh(
        new THREE.PlaneGeometry(width, depth),
        material
    );
    bottom.rotation.x = Math.PI / 2;
    bottom.position.set(0, -height / 2, 0);

    group.add(front);
    group.add(back);
    group.add(left);
    group.add(right);
    group.add(top);
    group.add(bottom);

    return {
        group,
        front,
        back,
        left,
        right,
        top,
        bottom
    };

}
