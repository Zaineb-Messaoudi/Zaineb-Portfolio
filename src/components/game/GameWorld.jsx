import { useEffect, useRef } from "react";

const STOPS = [
  { id: "hero", name: "Start", x: -23, z: 8, color: 0xffc66d },
  { id: "about", name: "About", x: -18, z: 3, color: 0xff9a91 },
  { id: "summary", name: "Story", x: -12, z: -3, color: 0x7be6d1 },
  { id: "experience", name: "Internships", x: -6, z: -8, color: 0x84b9ff },
  { id: "education", name: "Education", x: 1, z: -5, color: 0xf6d675 },
  { id: "projects", name: "Projects", x: 8, z: 1, color: 0xff9f73 },
  { id: "skills", name: "Skills", x: 15, z: 6, color: 0x9fe278 },
  { id: "contact", name: "Contact", x: 22, z: 1, color: 0x84e2cf },
];

const BRANCH_LAYOUT = {
  experience: { startAngle: -Math.PI * 0.7, endAngle: Math.PI * 0.7, radius: 8.4, color: 0x84e2cf },
  projects: { startAngle: -Math.PI * 0.68, endAngle: Math.PI * 0.68, radius: 9.2, color: 0xff9f73 },
};

const STOP_LABELS = {
  hero: { en: "Start", fr: "Départ" },
  about: { en: "About", fr: "À propos" },
  summary: { en: "Story", fr: "Mon parcours" },
  experience: { en: "Internships", fr: "Stages" },
  education: { en: "Education", fr: "Formation" },
  projects: { en: "Projects", fr: "Projets" },
  skills: { en: "Skills", fr: "Compétences" },
  contact: { en: "Contact", fr: "Contact" },
};

function terrainHeight(x, z) {
  const hillA = Math.exp(-((x + 25) ** 2 + (z + 11) ** 2) / 170) * 5.2;
  const hillB = Math.exp(-((x - 20) ** 2 + (z - 11) ** 2) / 180) * 4.4;
  const ridge = Math.sin(x * 0.22 + z * 0.12) * 0.7 + Math.cos(z * 0.28 - x * 0.1) * 0.42;
  return hillA + hillB + ridge;
}

function createRouteCurve(THREE) {
  return new THREE.CatmullRomCurve3(
    STOPS.map((stop) => new THREE.Vector3(stop.x, terrainHeight(stop.x, stop.z) - 0.72, stop.z)),
    false,
    "centripetal",
    0.35
  );
}

function makeRoute(THREE, routeCurve) {
  const positions = [];
  const uvs = [];
  const indices = [];
  const samples = 320;

  for (let index = 0; index <= samples; index += 1) {
    const point = routeCurve.getPointAt(index / samples);
    const tangent = routeCurve.getTangentAt(index / samples);
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const left = point.clone().addScaledVector(side, 1.15);
    const right = point.clone().addScaledVector(side, -1.15);
    positions.push(left.x, left.y, left.z, right.x, right.y, right.z);
    uvs.push(0, index / 16, 1, index / 16);

    if (index < samples) {
      const base = index * 2;
      indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function addTerrain(THREE, scene) {
  const width = 82;
  const segments = 100;
  const geometry = new THREE.PlaneGeometry(width, width * 0.68, segments, Math.round(segments * 0.68));
  geometry.rotateX(-Math.PI / 2);

  const vertices = geometry.attributes.position;
  const colors = [];
  const low = new THREE.Color("#18334b");
  const mid = new THREE.Color("#28665d");
  const high = new THREE.Color("#9b9f82");

  for (let index = 0; index < vertices.count; index += 1) {
    const x = vertices.getX(index);
    const z = vertices.getZ(index);
    const height = terrainHeight(x, z);
    vertices.setY(index, height);

    const slope = THREE.MathUtils.smoothstep(height, 0.6, 4.3);
    const color = low.clone().lerp(mid, THREE.MathUtils.clamp((height + 1.2) / 3.8, 0, 1));
    color.lerp(high, slope * 0.42);
    colors.push(color.r, color.g, color.b);
  }

  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();

  const terrain = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.88, metalness: 0.02 })
  );
  terrain.position.y = -1.3;
  terrain.receiveShadow = true;
  scene.add(terrain);

  const islandBase = new THREE.Mesh(
    new THREE.CylinderGeometry(21, 25, 4, 9, 1, false),
    new THREE.MeshStandardMaterial({ color: "#182b44", roughness: 0.77, metalness: 0.08, flatShading: true })
  );
  islandBase.scale.set(1.95, 1, 0.78);
  islandBase.position.set(0, -4.1, 0);
  islandBase.rotation.y = -0.15;
  islandBase.castShadow = true;
  islandBase.receiveShadow = true;
  scene.add(islandBase);
}

function addRidges(THREE, scene) {
  const material = new THREE.MeshStandardMaterial({
    color: "#35546a",
    roughness: 0.82,
    flatShading: true,
  });
  const ridgePoints = [
    [-31, -8, 0, 9], [-27, -16, 0, 6], [-20, -17, 0, 11],
    [-13, -17, 0, 6], [-4, -18, 0, 10], [4, -17, 0, 7],
    [13, -16, 0, 11], [22, -15, 0, 7], [29, -9, 0, 10],
    [-31, 11, 0, 6], [30, 11, 0, 8],
  ];

  for (const [x, z, , height] of ridgePoints) {
    const mountain = new THREE.Mesh(new THREE.ConeGeometry(height * 0.7, height, 6), material);
    mountain.position.set(x, height / 2 - 0.6, z);
    mountain.rotation.y = x * 0.07;
    mountain.castShadow = true;
    scene.add(mountain);
  }
}

function addRoute(THREE, scene, routeCurve) {
  const routeMaterial = new THREE.MeshStandardMaterial({
    color: "#f6bc70",
    roughness: 0.54,
    metalness: 0.08,
    side: THREE.DoubleSide,
    emissive: "#512d19",
    emissiveIntensity: 0.18,
  });
  const road = new THREE.Mesh(makeRoute(THREE, routeCurve), routeMaterial);
  road.position.y = 0.23;
  road.receiveShadow = true;
  road.castShadow = true;
  scene.add(road);

  const edgeGeometry = new THREE.TubeGeometry(routeCurve, 240, 0.075, 5, false);
  const edgeMaterial = new THREE.MeshStandardMaterial({ color: "#ffe2a3", roughness: 0.38, metalness: 0.16 });
  const routeEdge = new THREE.Mesh(edgeGeometry, edgeMaterial);
  routeEdge.position.y = 0.3;
  scene.add(routeEdge);
}

function addLandmarks(THREE, scene, routeCurve, lowPower) {
  const materials = STOPS.map((stop) => new THREE.MeshStandardMaterial({
    color: stop.color,
    roughness: 0.42,
    metalness: 0.1,
    emissive: stop.color,
    emissiveIntensity: 0.12,
  }));
  const markerTargets = [];
  const stoneMaterial = new THREE.MeshStandardMaterial({ color: "#516777", roughness: 0.81, flatShading: true });

  STOPS.forEach((stop, index) => {
    const marker = new THREE.Group();
    marker.name = stop.id;
    const routePoint = routeCurve.getPoint(index / (STOPS.length - 1));
    marker.position.set(stop.x, routePoint.y + 0.16, stop.z);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.65, 0.58, 9), stoneMaterial);
    base.position.y = 0.24;
    base.castShadow = true;
    base.receiveShadow = true;
    marker.add(base);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.05, 0.085, 8, 32),
      materials[index]
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.66;
    marker.add(ring);

    const beacon = new THREE.Mesh(
      index === 0 || index === 7
        ? new THREE.OctahedronGeometry(0.55, 1)
        : new THREE.DodecahedronGeometry(0.48, 0),
      materials[index]
    );
    beacon.position.y = 1.7;
    beacon.castShadow = true;
    marker.add(beacon);

    if (!lowPower) {
      const glow = new THREE.PointLight(stop.color, 5.5, 9, 2);
      glow.position.set(0, 2, 0);
      marker.add(glow);
    }

    if (index === 0) {
      const gate = new THREE.Mesh(
        new THREE.TorusGeometry(1.1, 0.12, 12, 28, Math.PI),
        new THREE.MeshStandardMaterial({ color: stop.color, metalness: 0.45, roughness: 0.32, emissive: stop.color, emissiveIntensity: 0.22 })
      );
      gate.position.y = 1.45;
      marker.add(gate);
    }

    marker.userData.stop = stop.id;
    markerTargets.push(marker);
    scene.add(marker);
  });

  const treeMaterials = [
    new THREE.MeshStandardMaterial({ color: "#466d60", roughness: 0.92, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: "#698b72", roughness: 0.92, flatShading: true }),
  ];

  for (let index = 0; index < 38; index += 1) {
    const x = (Math.sin(index * 47.1) * 0.5 + 0.5) * 69 - 34.5;
    const z = (Math.cos(index * 19.7) * 0.5 + 0.5) * 45 - 22.5;
    const nearRoad = routeCurve.getPoints(70).some((point) => point.distanceTo(new THREE.Vector3(x, point.y, z)) < 2.8);
    if (nearRoad) continue;

    const height = 1.3 + ((index * 17) % 12) * 0.19;
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.21, height * 0.42, 6), stoneMaterial);
    trunk.position.set(x, -0.3 + height * 0.21, z);
    trunk.castShadow = true;
    scene.add(trunk);

    const canopy = new THREE.Mesh(
      new THREE.IcosahedronGeometry(height * 0.43, 1),
      treeMaterials[index % treeMaterials.length]
    );
    canopy.position.set(x, height * 0.62, z);
    canopy.scale.y = 1.2;
    canopy.castShadow = true;
    scene.add(canopy);
  }

  return markerTargets;
}

function addBranchRoutes(THREE, scene, routeCurve, branchCounts) {
  const branchGroups = {};
  const branchCurves = new Map();
  const branchMarkers = [];
  const treeMaterial = new THREE.MeshStandardMaterial({ color: "#668e70", roughness: 0.9, flatShading: true });
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: "#655641", roughness: 0.95 });

  Object.entries(BRANCH_LAYOUT).forEach(([category, layout]) => {
    const parentIndex = STOPS.findIndex((stop) => stop.id === category);
    const parentStop = STOPS[parentIndex];
    const hub = routeCurve.getPoint(parentIndex / (STOPS.length - 1));
    const group = new THREE.Group();
    group.name = `${category}-branch`;
    const roadMaterial = new THREE.MeshStandardMaterial({
      color: layout.color,
      emissive: layout.color,
      emissiveIntensity: 0.22,
      roughness: 0.58,
    });

    for (let index = 0; index < branchCounts[category]; index += 1) {
      const progress = branchCounts[category] === 1 ? 0.5 : index / (branchCounts[category] - 1);
      const angle = THREE.MathUtils.lerp(layout.startAngle, layout.endAngle, progress);
      const x = parentStop.x + Math.cos(angle) * layout.radius;
      const z = parentStop.z + Math.sin(angle) * layout.radius;
      const endpoint = new THREE.Vector3(x, terrainHeight(x, z) - 0.72, z);
      const curve = new THREE.CatmullRomCurve3([hub.clone(), endpoint.clone()]);
      const route = new THREE.Mesh(new THREE.TubeGeometry(curve, 28, 0.38, 7, false), roadMaterial);
      route.castShadow = true;
      route.userData.isBranchRoad = true;
      group.add(route);
      branchCurves.set(`${category}:${index}`, curve);

      const marker = new THREE.Group();
      marker.name = `${category}-${index}`;
      marker.position.copy(endpoint);
      marker.userData.branchId = `${category}:${index}`;
      const platform = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.9, 0.28, 8),
        new THREE.MeshStandardMaterial({ color: "#566b69", roughness: 0.86, flatShading: true })
      );
      platform.position.y = 0.12;
      platform.receiveShadow = true;
      marker.add(platform);

      const beaconMaterial = new THREE.MeshStandardMaterial({
        color: layout.color,
        emissive: layout.color,
        emissiveIntensity: 0.24,
        metalness: 0.08,
        roughness: 0.44,
      });
      const beacon = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), beaconMaterial);
      beacon.position.y = 0.78;
      beacon.castShadow = true;
      marker.add(beacon);
      group.add(marker);
      branchMarkers.push(marker);

      const treeX = x + Math.cos(angle + Math.PI / 2) * 1.4;
      const treeZ = z + Math.sin(angle + Math.PI / 2) * 1.4;
      const tree = new THREE.Group();
      const trunkHeight = 1.1 + (index % 2) * 0.25;
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.16, trunkHeight, 6), trunkMaterial);
      trunk.position.y = trunkHeight / 2;
      tree.add(trunk);
      const canopy = new THREE.Mesh(new THREE.IcosahedronGeometry(0.85 + (index % 3) * 0.12, 1), treeMaterial);
      canopy.position.y = trunkHeight + 0.5;
      canopy.scale.y = 1.2;
      canopy.castShadow = true;
      tree.add(canopy);
      tree.position.set(treeX, terrainHeight(treeX, treeZ) - 1.3, treeZ);
      tree.castShadow = true;
      group.add(tree);
    }

    group.userData.branchRoadCount = group.children.filter((child) => child.userData.isBranchRoad).length;
    group.visible = false;
    scene.add(group);
    branchGroups[category] = group;
  });

  return { branchGroups, branchCurves, branchMarkers };
}

function createAdventurer(THREE, scene) {
  const player = new THREE.Group();
  const coat = new THREE.MeshStandardMaterial({ color: "#31556c", roughness: 0.64 });
  const jacket = new THREE.MeshStandardMaterial({ color: "#bf7564", roughness: 0.59 });
  const skin = new THREE.MeshStandardMaterial({ color: "#be805e", roughness: 0.73 });
  const dark = new THREE.MeshStandardMaterial({ color: "#392e36", roughness: 0.62 });
  const hairHighlight = new THREE.MeshStandardMaterial({ color: "#56414b", roughness: 0.62 });
  const gold = new THREE.MeshStandardMaterial({ color: "#f8cd7a", roughness: 0.44, metalness: 0.18 });

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.48, 0.68, 4, 8), jacket);
  torso.position.y = 1.55;
  torso.castShadow = true;
  player.add(torso);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.43, 16, 12), skin);
  head.position.set(0, 2.55, 0);
  head.castShadow = true;
  player.add(head);

  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.47, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.62), dark);
  hair.position.set(0, 2.73, -0.015);
  hair.castShadow = true;
  player.add(hair);
  for (const side of [-1, 1]) {
    const lock = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.62, 4, 8), dark);
    lock.position.set(side * 0.34, 2.22, 0.02);
    lock.rotation.z = side * -0.12;
    lock.castShadow = true;
    player.add(lock);
  }
  const ponytail = new THREE.Group();
  ponytail.position.set(-0.2, 2.53, 0.02);
  const ponytailRoot = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), dark);
  ponytailRoot.position.set(0, -0.02, 0.03);
  ponytailRoot.scale.set(1, 0.8, 0.78);
  ponytailRoot.castShadow = true;
  ponytail.add(ponytailRoot);
  const ponytailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.03, -0.05, 0.02),
    new THREE.Vector3(-0.2, -0.24, 0.12),
    new THREE.Vector3(-0.25, -0.5, 0.2),
    new THREE.Vector3(-0.12, -0.76, 0.27),
    new THREE.Vector3(0.05, -0.94, 0.23),
  ]);
  const ponytailMesh = new THREE.Mesh(new THREE.TubeGeometry(ponytailCurve, 24, 0.16, 8, false), dark);
  ponytailMesh.castShadow = true;
  ponytail.add(ponytailMesh);
  const flowingLock = new THREE.Mesh(
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.01, -0.1, 0.13),
        new THREE.Vector3(-0.12, -0.32, 0.27),
        new THREE.Vector3(-0.13, -0.58, 0.34),
        new THREE.Vector3(0.02, -0.82, 0.3),
      ]),
      20,
      0.055,
      6,
      false
    ),
    hairHighlight
  );
  flowingLock.castShadow = true;
  ponytail.add(flowingLock);
  const ponytailTie = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.045, 7, 16), gold);
  ponytailTie.position.set(-0.04, -0.1, 0.08);
  ponytailTie.rotation.y = Math.PI / 2;
  ponytail.add(ponytailTie);
  player.add(ponytail);

  const pack = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.75, 0.33), coat);
  pack.position.set(0, 1.64, -0.48);
  pack.castShadow = true;
  player.add(pack);

  const insignia = new THREE.Mesh(new THREE.OctahedronGeometry(0.19, 0), gold);
  insignia.position.set(0.26, 1.62, 0.48);
  player.add(insignia);

  const legs = [];
  const arms = [];
  for (const side of [-1, 1]) {
    const leg = new THREE.Group();
    leg.position.set(side * 0.23, 0.83, 0);
    const thigh = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.62, 3, 7), coat);
    thigh.position.y = -0.37;
    thigh.castShadow = true;
    leg.add(thigh);
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.33, 0.22, 0.52), dark);
    boot.position.set(0, -0.83, 0.12);
    boot.castShadow = true;
    leg.add(boot);
    player.add(leg);
    legs.push(leg);

    const arm = new THREE.Group();
    arm.position.set(side * 0.57, 1.88, 0);
    const sleeve = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.58, 3, 7), jacket);
    sleeve.position.y = -0.35;
    sleeve.castShadow = true;
    arm.add(sleeve);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), skin);
    hand.position.y = -0.77;
    arm.add(hand);
    player.add(arm);
    arms.push(arm);
  }

  player.scale.setScalar(0.84);
  player.userData.legs = legs;
  player.userData.arms = arms;
  player.userData.body = torso;
  player.userData.ponytail = ponytail;
  scene.add(player);
  return player;
}

function addAtmosphere(THREE, scene) {
  const skyGeometry = new THREE.SphereGeometry(90, 32, 24);
  const skyMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vWorldPosition;
      void main() {
        float horizon = smoothstep(-0.15, 0.68, normalize(vWorldPosition).y);
        vec3 low = vec3(0.055, 0.09, 0.18);
        vec3 high = vec3(0.13, 0.19, 0.33);
        gl_FragColor = vec4(mix(low, high, horizon), 1.0);
      }
    `,
  });
  scene.add(new THREE.Mesh(skyGeometry, skyMaterial));

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3.2, 24, 18),
    new THREE.MeshStandardMaterial({ color: "#f4d8c6", emissive: "#8d647b", emissiveIntensity: 0.7, roughness: 0.7 })
  );
  moon.position.set(-29, 22, -32);
  scene.add(moon);

  const stars = new THREE.BufferGeometry();
  const starPositions = [];
  for (let index = 0; index < 180; index += 1) {
    const x = Math.sin(index * 21.3) * 58;
    const y = 9 + ((index * 37) % 37);
    const z = -35 - ((index * 17) % 40);
    starPositions.push(x, y, z);
  }
  stars.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
  scene.add(new THREE.Points(
    stars,
    new THREE.PointsMaterial({ color: "#e5d6ff", size: 0.12, sizeAttenuation: true, transparent: true, opacity: 0.85 })
  ));
}

function makeScene(THREE, host, branchCounts) {
  const scene = new THREE.Scene();
  const routeCurve = createRouteCurve(THREE);
  scene.fog = new THREE.FogExp2("#162941", 0.006);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 220);
  camera.position.set(0, 25, 37);
  camera.lookAt(0, 0, 0);

  const lowPower = window.matchMedia("(max-width: 760px), (pointer: coarse)").matches
    || (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4);
  // Note: reduce3d/localStorage toggle removed to avoid blank page issues
  // if (reduce3d) document.body.classList.add("low-power");
  // else document.body.classList.remove("low-power");
  
  const renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: !lowPower,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.35));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = !lowPower;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.setAttribute("tabindex", "-1");
  renderer.domElement.className = "game-world-canvas";
  host.appendChild(renderer.domElement);

  const hemi = new THREE.HemisphereLight("#b5d9ff", "#15283e", 2.2);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight("#ffe1b3", 3.1);
  sun.position.set(-20, 33, 14);
  sun.castShadow = !lowPower;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -34;
  sun.shadow.camera.right = 34;
  sun.shadow.camera.top = 34;
  sun.shadow.camera.bottom = -34;
  sun.shadow.normalBias = 0.035;
  sun.shadow.bias = -0.00015;
  scene.add(sun);

  const fill = new THREE.DirectionalLight("#a1b5ff", 1.1);
  fill.position.set(20, 12, -22);
  scene.add(fill);

  addAtmosphere(THREE, scene);
  addTerrain(THREE, scene);
  addRidges(THREE, scene);
  addRoute(THREE, scene, routeCurve);
  const markers = addLandmarks(THREE, scene, routeCurve, lowPower);
  const branchWorld = addBranchRoutes(THREE, scene, routeCurve, branchCounts);
  const adventurer = createAdventurer(THREE, scene);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const resizeObserver = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.fov = width < 600 ? 58 : width < 1024 ? 50 : 42;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  });
  resizeObserver.observe(host);

  return { scene, camera, renderer, adventurer, markers, raycaster, pointer, resizeObserver, routeCurve, ...branchWorld };
}

let THREE = null;

export async function initTHREE() {
  if (!THREE) {
    THREE = await import("three");
  }
  return THREE;
}

export default function GameWorld({
  activeSection,
  branchCategory,
  branchTarget,
  branchReturning,
  branchLabels,
  branchCounts,
  onArriveBranch,
  onArriveMainRoad,
  onArriveStop,
  onSelectBranch,
  onSelectStop,
  onMoveBranch,
  language,
}) {
  const hostRef = useRef(null);
  const stopLabelRefs = useRef([]);
  const branchLabelRefs = useRef({});
  const activeSectionRef = useRef(activeSection);
  const branchCategoryRef = useRef(branchCategory);
  const branchTargetRef = useRef(branchTarget);
  const branchReturningRef = useRef(branchReturning);
  const onArriveBranchRef = useRef(onArriveBranch);
  const onArriveMainRoadRef = useRef(onArriveMainRoad);
  const onArriveStopRef = useRef(onArriveStop);
  const onSelectBranchRef = useRef(onSelectBranch);
  const onSelectStopRef = useRef(onSelectStop);
  const scheduleRenderRef = useRef(null);

  useEffect(() => {
    activeSectionRef.current = activeSection;
    branchCategoryRef.current = branchCategory;
    branchTargetRef.current = branchTarget;
    branchReturningRef.current = branchReturning;
    onArriveBranchRef.current = onArriveBranch;
    onArriveMainRoadRef.current = onArriveMainRoad;
    onArriveStopRef.current = onArriveStop;
    onSelectBranchRef.current = onSelectBranch;
    onSelectStopRef.current = onSelectStop;
    scheduleRenderRef.current?.();
  }, [activeSection, branchCategory, branchTarget, branchReturning, onArriveBranch, onArriveMainRoad, onArriveStop, onSelectBranch, onSelectStop]);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    initTHREE().then((THREE_) => {
      const THREE = THREE_;
      const host = hostRef.current;
      if (cancelled || !host) return;

      let world;
      let frame = 0;
      let disposed = false;
      let inView = false;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      try {
        world = makeScene(THREE, host, branchCounts);
      } catch (error) {
        console.error("Unable to initialize the 3D portfolio map.", error);
        host.dataset.webglUnavailable = "true";
        return;
      }

      const scheduleRender = () => {
        if (disposed || !world) return;
        if (reduceMotion) {
          renderFrame(performance.now());
        } else if (inView && !frame) {
          frame = requestAnimationFrame(renderFrame);
        }
      };
      scheduleRenderRef.current = scheduleRender;
      window.addEventListener("resize", scheduleRender);
      const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView) scheduleRender();
        else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      }, { rootMargin: "200px 0px" });
      observer.observe(host);

      const position = new THREE.Vector3();
    const targetPosition = new THREE.Vector3();
    const cameraTarget = new THREE.Vector3(0, 0, 0);
    const nextCameraTarget = new THREE.Vector3(0, 0, 0);
    const projectedStop = new THREE.Vector3();
    const branchPosition = new THREE.Vector3();
    const branchMinimum = new THREE.Vector3();
    const branchMaximum = new THREE.Vector3();
    const worldStopPoints = STOPS.map((_, index) => world.routeCurve.getPoint(index / (STOPS.length - 1)));
    let previousTime = 0;
    let routeProgress = 0;
    let branchWaitForHub = false;
    let currentBranchTarget = null;
    let currentBranchReturning = false;
    let lastArrivedTarget = null;
    let branchProgress = 0;

    function renderFrame(time = 0) {
      frame = 0;
      if (disposed || !world || !inView) return;
      const currentIndex = Math.max(0, STOPS.findIndex((stop) => stop.id === activeSectionRef.current));
      const desiredProgress = currentIndex / (STOPS.length - 1);
      const elapsed = Math.min((time - previousTime) / 1000, 0.06);
      previousTime = time;
      const smoothing = reduceMotion ? 1 : 1 - Math.exp(-elapsed * 5.4);
      const selectedBranch = branchTargetRef.current;
      const returningToHub = branchReturningRef.current;
      const branchCurve = selectedBranch ? world.branchCurves.get(selectedBranch) : null;
      const branchCategory = selectedBranch?.split(":")[0];

      Object.entries(world.branchGroups).forEach(([category, group]) => {
        group.visible = category === branchCategoryRef.current;
      });

      if (selectedBranch !== currentBranchTarget || returningToHub !== currentBranchReturning) {
        currentBranchTarget = selectedBranch;
        currentBranchReturning = returningToHub;
        branchProgress = 0;
        const branchParts = selectedBranch?.split(":");
        const parentIndex = branchParts ? STOPS.findIndex((stop) => stop.id === branchParts[0]) : -1;
        branchWaitForHub = Boolean(!returningToHub && branchCurve && parentIndex >= 0 && position.distanceTo(worldStopPoints[parentIndex]) > 0.45);
      }

      let targetTangent;
      let targetLocation;
      let branchSettled = false;
      if (branchCurve && branchCategory) {
        const parentIndex = STOPS.findIndex((stop) => stop.id === branchCategory);
        if (branchWaitForHub && parentIndex >= 0) {
          targetLocation = worldStopPoints[parentIndex];
          if (position.distanceTo(targetLocation) <= 0.45) {
            branchWaitForHub = false;
            branchProgress = 0;
          }
        } else {
          branchProgress += (1 - branchProgress) * smoothing;
          const curveProgress = returningToHub ? 1 - branchProgress : branchProgress;
          targetLocation = branchCurve.getPointAt(curveProgress);
          branchSettled = branchProgress >= 0.995;
        }
        const curveProgress = returningToHub ? 1 - branchProgress : branchProgress;
        targetTangent = branchCurve.getTangentAt(branchWaitForHub ? 0 : curveProgress);
        if (returningToHub) targetTangent.negate();
      } else {
        routeProgress += (desiredProgress - routeProgress) * smoothing;
        targetLocation = world.routeCurve.getPoint(routeProgress);
        targetTangent = world.routeCurve.getTangent(routeProgress);
        branchSettled = Math.abs(routeProgress - desiredProgress) < 0.001;
      }
      targetPosition.copy(targetLocation);
      position.lerp(targetPosition, smoothing);

      world.adventurer.position.set(position.x, position.y, position.z);
      world.adventurer.rotation.y = Math.atan2(targetTangent.x, targetTangent.z);

      const walking = !reduceMotion && (position.distanceTo(targetPosition) > 0.28 || !branchSettled || branchWaitForHub);
      const stride = walking ? Math.sin(time * 0.012) * 0.42 : 0;
      world.adventurer.userData.legs.forEach((leg, index) => { leg.rotation.x = index === 0 ? stride : -stride; });
      world.adventurer.userData.arms.forEach((arm, index) => { arm.rotation.x = index === 0 ? -stride * 0.72 : stride * 0.72; });
      world.adventurer.userData.body.rotation.z = walking && !reduceMotion ? Math.sin(time * 0.006) * 0.025 : 0;
      world.adventurer.userData.ponytail.rotation.z = walking && !reduceMotion ? Math.sin(time * 0.012 + 0.8) * 0.13 : 0;
      world.adventurer.userData.ponytail.rotation.x = walking && !reduceMotion ? Math.sin(time * 0.009) * 0.08 : 0;
      world.adventurer.position.y += walking && !reduceMotion ? Math.abs(Math.sin(time * 0.024)) * 0.11 : 0;
      world.adventurer.scale.setScalar(1.34);

      const nearbyStop = branchCurve && !branchWaitForHub
        ? branchCurve.getPointAt(returningToHub ? 1 - branchProgress : branchProgress)
        : worldStopPoints[currentIndex];
      const activeBranchIndex = branchCategoryRef.current
        ? STOPS.findIndex((stop) => stop.id === branchCategoryRef.current)
        : -1;
      let branchDistance = 0;
      if (activeBranchIndex >= 0) {
        branchMinimum.copy(worldStopPoints[activeBranchIndex]);
        branchMaximum.copy(worldStopPoints[activeBranchIndex]);
        world.branchMarkers.forEach((marker) => {
          if (!marker.userData.branchId.startsWith(`${branchCategoryRef.current}:`)) return;
          marker.getWorldPosition(branchPosition);
          branchMinimum.min(branchPosition);
          branchMaximum.max(branchPosition);
        });
        const branchRadius = branchMinimum.distanceTo(branchMaximum) * 0.5 + 2.5;
        const branchCenter = branchMinimum.add(branchMaximum).multiplyScalar(0.5);
        const limitingFov = 2 * Math.atan(
          Math.tan(THREE.MathUtils.degToRad(world.camera.fov / 2)) * Math.min(world.camera.aspect, 1)
        );
        branchDistance = (branchRadius * 1.35) / Math.sin(limitingFov / 2);
        nextCameraTarget.copy(branchCenter);
      } else {
        const cameraFocus = branchCurve ? targetLocation : position;
        nextCameraTarget.set(cameraFocus.x, 0, cameraFocus.z);
      }
      const cameraEase = reduceMotion ? 1 : 1 - Math.exp(-elapsed * 3.2);
      cameraTarget.lerp(nextCameraTarget, cameraEase);
      if (branchCategoryRef.current) {
        world.camera.position.set(
          cameraTarget.x + branchDistance * 0.3,
          cameraTarget.y + branchDistance * 0.8,
          cameraTarget.z + branchDistance * 0.52
        );
      } else {
        world.camera.position.set(cameraTarget.x + 10, 16, cameraTarget.z + 21);
      }
      world.camera.lookAt(cameraTarget.x, branchCategoryRef.current ? cameraTarget.y : 0, cameraTarget.z);
      world.camera.updateMatrixWorld();
      world.renderer.domElement.dataset.cameraMode = branchCategoryRef.current ? "branch" : "route";

      const targetId = selectedBranch || activeSectionRef.current;
      const arrivalKey = `${targetId}:${returningToHub ? "return" : "arrive"}`;
      if (!walking && branchSettled && !branchWaitForHub && lastArrivedTarget !== arrivalKey) {
        lastArrivedTarget = arrivalKey;
        if (returningToHub) {
          onArriveMainRoadRef.current?.();
          lastArrivedTarget = `${activeSectionRef.current}:arrive`;
        } else if (selectedBranch) {
          onArriveBranchRef.current?.(selectedBranch);
          if (selectedBranch.endsWith(":hub")) lastArrivedTarget = activeSectionRef.current;
        } else {
          onArriveStopRef.current?.(activeSectionRef.current);
        }
      }

      const bounds = host.getBoundingClientRect();
      const activeBranchGroup = world.branchGroups[branchCategoryRef.current];
      world.renderer.domElement.dataset.branchRoadCount = String(activeBranchGroup?.userData.branchRoadCount || 0);
      const visibleStopLabels = [];
      world.markers.forEach((marker, index) => {
        const selected = index === currentIndex;
        marker.scale.setScalar(selected && !reduceMotion ? 1.07 + Math.sin(time * 0.0025) * 0.035 : selected ? 1.06 : 1);
        const label = stopLabelRefs.current[index];
        if (!label) return;

        marker.getWorldPosition(projectedStop);
        projectedStop.y += 2.8;
        projectedStop.project(world.camera);
        const onScreen = projectedStop.z < 1
          && projectedStop.z > -1
          && projectedStop.x > -0.94
          && projectedStop.x < 0.94
          && projectedStop.y > -0.92
          && projectedStop.y < 0.86
          && !branchCategoryRef.current
          && Math.abs(index - currentIndex) <= 1
          && (bounds.width > 640 || selected);
        label.style.visibility = onScreen ? "visible" : "hidden";
        label.tabIndex = onScreen ? 0 : -1;
        label.dataset.current = String(selected);
        label.setAttribute("aria-hidden", String(!onScreen));
        if (onScreen) {
          visibleStopLabels.push({
            label,
            left: (projectedStop.x * 0.5 + 0.5) * bounds.width,
            top: (-projectedStop.y * 0.5 + 0.5) * bounds.height,
          });
        }
      });
      const placedStopLabels = [];
      visibleStopLabels.forEach(({ label, left, top }) => {
        const labelWidth = label.offsetWidth;
        const labelHeight = label.offsetHeight;
        const halfWidth = labelWidth / 2;
        const halfHeight = labelHeight / 2;
        const x = Math.max(halfWidth + 8, Math.min(bounds.width - halfWidth - 8, left));
        const verticalStep = labelHeight + 8;
        const offsets = [0, -1, 1, -2, 2, -3, 3, -4, 4].map((step) => step * verticalStep);
        const placement = offsets.map((offset) => {
          const y = top + offset;
          return {
            left: x - halfWidth,
            right: x + halfWidth,
            top: y - halfHeight,
            bottom: y + halfHeight,
            x,
            y,
          };
        }).find((candidate) =>
          candidate.top >= 4
          && candidate.bottom <= bounds.height - 4
          && placedStopLabels.every((placed) =>
            candidate.left >= placed.right
            || candidate.right <= placed.left
            || candidate.top >= placed.bottom
            || candidate.bottom <= placed.top
          )
        );
        const fallback = placement || {
          x,
          y: Math.max(halfHeight + 4, Math.min(bounds.height - halfHeight - 4, top)),
        };
        label.style.left = `${fallback.x}px`;
        label.style.top = `${fallback.y}px`;
        placedStopLabels.push({
          left: fallback.x - halfWidth,
          right: fallback.x + halfWidth,
          top: fallback.y - halfHeight,
          bottom: fallback.y + halfHeight,
        });
      });
      const branchLabelPlacements = [];
      world.branchMarkers.forEach((marker) => {
        marker.scale.setScalar(marker.userData.branchId === selectedBranch && !reduceMotion ? 1.1 + Math.sin(time * 0.003) * 0.04 : 1);
        const label = branchLabelRefs.current[marker.userData.branchId];
        if (!label) return;
        const [category, index] = marker.userData.branchId.split(":");
        marker.getWorldPosition(projectedStop);
        projectedStop.y += 2.1;
        projectedStop.project(world.camera);
        const anchorX = (projectedStop.x * 0.5 + 0.5) * bounds.width;
        const anchorY = (-projectedStop.y * 0.5 + 0.5) * bounds.height;
        const onScreen = category === branchCategoryRef.current;
        label.style.visibility = onScreen ? "visible" : "hidden";
        label.tabIndex = onScreen ? 0 : -1;
        label.setAttribute("aria-hidden", String(!onScreen));
        label.dataset.current = String(marker.userData.branchId === branchTargetRef.current);
        label.dataset.anchorX = String(anchorX);
        label.dataset.anchorY = String(anchorY);
        if (onScreen) branchLabelPlacements.push({ label, anchorX, anchorY });
      });
      branchLabelPlacements.sort((first, second) => first.anchorY - second.anchorY);
      const placedBranchLabels = [];
      const navbarBottom = document.querySelector(".navbar-wrap")?.getBoundingClientRect().bottom || 0;
      const hud = document.querySelector(".journey-hud")?.getBoundingClientRect();
      const obstacles = [
        { left: 0, right: bounds.width, top: navbarBottom - bounds.top, bottom: 0 },
        ...(hud ? [{
          left: hud.left - bounds.left,
          right: hud.right - bounds.left,
          top: hud.top - bounds.top,
          bottom: hud.bottom - bounds.top,
        }] : []),
      ];
      branchLabelPlacements.forEach(({ label, anchorX, anchorY }) => {
        const halfWidth = label.offsetWidth / 2;
        const halfHeight = label.offsetHeight / 2;
        const x = Math.max(halfWidth + 8, Math.min(bounds.width - halfWidth - 8, anchorX));
        const verticalStep = label.offsetHeight + 8;
        const candidates = [0, -1, 1, -2, 2, -3, 3].map((step) => ({
          x,
          y: anchorY + step * verticalStep,
        }));
        const placement = candidates.find(({ x: candidateX, y }) => {
          const box = {
            left: candidateX - halfWidth,
            right: candidateX + halfWidth,
            top: y - halfHeight,
            bottom: y + halfHeight,
          };
          return box.top >= navbarBottom - bounds.top + 6
            && box.bottom <= bounds.height - 6
            && [...obstacles, ...placedBranchLabels].every((other) =>
              box.left >= other.right
              || box.right <= other.left
              || box.top >= other.bottom
              || box.bottom <= other.top
            );
        });
        const fallback = placement || candidates[0];
        label.style.left = `${fallback.x}px`;
        label.style.top = `${fallback.y}px`;
        placedBranchLabels.push({
          left: fallback.x - halfWidth,
          right: fallback.x + halfWidth,
          top: fallback.y - halfHeight,
          bottom: fallback.y + halfHeight,
        });
      });

      world.renderer.render(world.scene, world.camera);
      const cameraSettled = cameraTarget.distanceTo(nextCameraTarget) < 0.025;
      if (!reduceMotion && (walking || !cameraSettled)) {
        frame = requestAnimationFrame(renderFrame);
      }
    }

    const markers = [...world.markers, ...world.branchMarkers];
    const getHit = (event) => {
      const rect = world.renderer.domElement.getBoundingClientRect();
      world.pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      world.raycaster.setFromCamera(world.pointer, world.camera);
      return world.raycaster.intersectObjects(markers, true)
        .find((item) => item.object.parent?.userData.stop || item.object.userData.stop
          || item.object.parent?.userData.branchId || item.object.userData.branchId);
    };

    const onPointerMove = (event) => {
      const hit = getHit(event);
      host.classList.toggle("has-hotspot", Boolean(hit));
      world.renderer.domElement.style.cursor = hit ? "pointer" : "default";
    };

    const onPointerUp = (event) => {
      if (event.button !== 0) return;
      const hit = getHit(event);
      const branchId = hit?.object.parent?.userData.branchId || hit?.object.userData.branchId;
      if (branchId) {
        onSelectBranchRef.current?.(branchId, true);
        return;
      }
      const stopId = hit?.object.parent?.userData.stop || hit?.object.userData.stop;
      if (stopId) onSelectStopRef.current(stopId);
    };

    const canvas = world.renderer.domElement;
    const onPointerLeave = () => {
      host.classList.remove("has-hotspot");
      canvas.style.cursor = "default";
    };
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    scheduleRender();

      cleanup = () => {
        disposed = true;
        if (scheduleRenderRef.current === scheduleRender) scheduleRenderRef.current = null;
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", scheduleRender);
        observer.disconnect();
        world.resizeObserver.disconnect();
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointerleave", onPointerLeave);

        world.scene.traverse((object) => {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material?.dispose();
        });
        world.renderer.dispose();
        world.renderer.domElement.remove();
      };
    }).catch((error) => {
      if (cancelled) return;
      console.error("Unable to load the 3D portfolio map.", error);
      if (hostRef.current) hostRef.current.dataset.webglUnavailable = "true";
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="game-world"
      role="region"
      tabIndex={0}
      aria-keyshortcuts="ArrowLeft ArrowRight ArrowDown"
      aria-label={language === "fr"
        ? "Carte 3D interactive : choisissez une destination pour explorer le portfolio."
        : "Interactive 3D map: choose a destination to explore the portfolio."}
      data-active-stop={activeSection}
      data-branch-category={branchCategory || ""}
      data-branch-target={branchTarget || ""}
    >
      <div className="world-fallback" aria-hidden="true">
        <div className="fallback-island"><span className="fallback-traveler">Z</span></div>
      </div>
      <div className="world-vignette" aria-hidden="true" />
      <div className="world-intro" aria-hidden="true">
        <span>{language === "fr" ? "UN MONDE. HUIT ARRÊTS." : "ONE WORLD. EIGHT STOPS."}</span>
        <strong>{language === "fr" ? "L'histoire se déroule en chemin." : "The story unfolds along the way."}</strong>
      </div>
      <span className="world-coordinates world-coordinate-left" aria-hidden="true">36° 48′ N</span>
      <span className="world-coordinates world-coordinate-right" aria-hidden="true">TUNISIA / 01</span>
      <div className="world-stop-labels">
        {STOPS.map((stop, index) => (
          <button
            className="world-stop-label"
            key={stop.id}
            ref={(element) => { stopLabelRefs.current[index] = element; }}
            data-current={activeSection === stop.id}
            type="button"
            onClick={() => onSelectStopRef.current(stop.id)}
            aria-label={`${language === "fr" ? "Explorer" : "Explore"} ${STOP_LABELS[stop.id][language]}`}
          >
            <span className="world-stop-dot" aria-hidden="true" />
            <span>{STOP_LABELS[stop.id][language]}</span>
          </button>
        ))}
        {Object.entries(branchCounts).flatMap(([category, count]) => (
          Array.from({ length: count }, (_, index) => {
            const branchId = `${category}:${index}`;
            return (
              <button
                className="world-stop-label world-branch-label"
                key={branchId}
                ref={(element) => { branchLabelRefs.current[branchId] = element; }}
                data-branch-id={branchId}
                data-current={branchTarget === branchId}
                type="button"
                onClick={() => onSelectBranch?.(branchId, true)}
                aria-label={`${language === "fr" ? "Marcher vers" : "Walk to"} ${branchLabels?.[category]?.[index] || ""}`}
                style={{ visibility: "hidden" }}
              >
                <span className="world-stop-dot" aria-hidden="true" />
                <span>{branchLabels?.[category]?.[index] || ""}</span>
              </button>
            );
          })
        ))}
      </div>
    </div>
  );
}

export { STOPS };
