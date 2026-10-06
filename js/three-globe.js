/* ============================================================
   INMUN 2026 — Interactive 3D Diplomatic Globe (Three.js)
   Renders a celestial interactive Earth with real continental
   boundaries, diplomatic hubs, connection arcs, and particle space.
   ============================================================ */

(function () {
  const container = document.getElementById('globeCanvasContainer');
  if (!container) return;

  // Check Three.js availability
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded. Globe fallback active.');
    return;
  }

  // --- Constants & Locations ---
  const HUBS = [
    { id: 'delhi', name: 'New Delhi', committee: 'INMUN Summit & G77', lat: 28.6139, lon: 77.2090, color: 0xd4af37, isHub: true },
    { id: 'hague', name: 'The Hague', committee: 'International Court of Justice (ICJ)', lat: 52.0705, lon: 4.3007, color: 0x5b8cff },
    { id: 'ny', name: 'New York', committee: 'UNGA (DISEC)', lat: 40.7128, lon: -74.0060, color: 0x38bdf8 },
    { id: 'geneva', name: 'Geneva', committee: 'Conference on Disarmament (CD)', lat: 46.2044, lon: 6.1432, color: 0xa78bfa },
    { id: 'sf', name: 'Silicon Valley', committee: 'AI Impact Summit (AIS)', lat: 37.7749, lon: -122.4194, color: 0x3ddc97 },
    { id: 'nairobi', name: 'Nairobi', committee: 'Plastics Treaty (INC)', lat: -1.2921, lon: 36.8219, color: 0x38bdf8 },
    { id: 'davos', name: 'Davos', committee: 'World Economic Forum (WEF)', lat: 46.8027, lon: 9.8360, color: 0xf59e0b },
    { id: 'lyon', name: 'Lyon', committee: 'INTERPOL', lat: 45.7640, lon: 4.8357, color: 0xec4899 },
    { id: 'sa', name: 'Johannesburg', committee: 'BRICS', lat: -26.2041, lon: 28.0473, color: 0xd4af37 },
    { id: 'london', name: 'London', committee: 'World Press', lat: 51.5074, lon: -0.1278, color: 0xf4dc9a }
  ];

  const GLOBE_RADIUS = 2.4;

  // --- Helper: Lat/Lon to Vector3 ---
  function latLonToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  // --- Procedural Canvas Texture Generation ---
  function generateWorldTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // 1. Deep Oceanic Gradient
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    oceanGrad.addColorStop(0, '#030612');
    oceanGrad.addColorStop(0.3, '#070d24');
    oceanGrad.addColorStop(0.7, '#070d24');
    oceanGrad.addColorStop(1, '#030612');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Graticule Latitude/Longitude Lines
    ctx.strokeStyle = 'rgba(91, 140, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let lat = -80; lat <= 80; lat += 20) {
      const y = (90 - lat) * (canvas.height / 180);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    for (let lon = -180; lon <= 180; lon += 30) {
      const x = (lon + 180) * (canvas.width / 360);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // 3. Draw World Landmass Polygons
    if (typeof WORLD_POLYGONS !== 'undefined' && Array.isArray(WORLD_POLYGONS)) {
      ctx.fillStyle = '#0b1633';
      ctx.strokeStyle = 'rgba(91, 140, 255, 0.55)';
      ctx.lineWidth = 1.6;

      WORLD_POLYGONS.forEach(ring => {
        if (!ring || ring.length < 3) return;
        ctx.beginPath();
        ring.forEach(([lon, lat], idx) => {
          const x = (lon + 180) * (canvas.width / 360);
          const y = (90 - lat) * (canvas.height / 180);
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });

      // Subtle gold coastal glow on landmasses
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.28)';
      ctx.lineWidth = 0.8;
      WORLD_POLYGONS.forEach(ring => {
        if (!ring || ring.length < 3) return;
        ctx.beginPath();
        ring.forEach(([lon, lat], idx) => {
          const x = (lon + 180) * (canvas.width / 360);
          const y = (90 - lat) * (canvas.height / 180);
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.stroke();
      });
    }

    // 4. City Hub Glows on Texture
    HUBS.forEach(hub => {
      const x = (hub.lon + 180) * (canvas.width / 360);
      const y = (90 - hub.lat) * (canvas.height / 180);

      const radGrad = ctx.createRadialGradient(x, y, 0, x, y, 22);
      radGrad.addColorStop(0, 'rgba(212, 175, 55, 0.9)');
      radGrad.addColorStop(0.3, 'rgba(91, 140, 255, 0.5)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      // Pin core dot
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;
    return texture;
  }

  // --- Scene Setup ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0.8, 6.2);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.appendChild(renderer.domElement);

  // --- Lighting ---
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xf4dc9a, 1.8);
  dirLight1.position.set(5, 4, 4);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x5b8cff, 1.2);
  dirLight2.position.set(-5, -2, -3);
  scene.add(dirLight2);

  // --- Globe Mesh ---
  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  const worldTexture = generateWorldTexture();
  const globeGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
  const globeMat = new THREE.MeshPhongMaterial({
    map: worldTexture,
    specular: new THREE.Color(0xd4af37),
    shininess: 24,
    bumpScale: 0.05
  });
  const globeMesh = new THREE.Mesh(globeGeo, globeMat);
  globeGroup.add(globeMesh);

  // --- Atmospheric Aura Glow ---
  const atmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.055, 48, 48);
  const atmosMat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
        gl_FragColor = vec4(0.35, 0.65, 1.0, 1.0) * intensity * 0.9 + vec4(0.85, 0.7, 0.2, 1.0) * intensity * 0.4;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true
  });
  const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
  globeGroup.add(atmosMesh);

  // --- Celestial Coordinate & Orbital Rings ---
  const ringGroup = new THREE.Group();
  globeGroup.add(ringGroup);

  // Equator Orbit Ring
  const equatorGeo = new THREE.RingGeometry(GLOBE_RADIUS * 1.25, GLOBE_RADIUS * 1.255, 80);
  const equatorMat = new THREE.MeshBasicMaterial({
    color: 0x5b8cff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.35
  });
  const equatorMesh = new THREE.Mesh(equatorGeo, equatorMat);
  equatorMesh.rotation.x = Math.PI / 2;
  ringGroup.add(equatorMesh);

  // Tilted Axial Orbit Ring (Gold)
  const orbitGeo = new THREE.RingGeometry(GLOBE_RADIUS * 1.42, GLOBE_RADIUS * 1.428, 90);
  const orbitMat = new THREE.MeshBasicMaterial({
    color: 0xd4af37,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.45
  });
  const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
  orbitMesh.rotation.x = (Math.PI / 180) * 65;
  orbitMesh.rotation.y = (Math.PI / 180) * 23.5;
  ringGroup.add(orbitMesh);

  // --- Hub Markers & Pulsing Rings ---
  const markers = [];
  const markerGroup = new THREE.Group();
  globeGroup.add(markerGroup);

  HUBS.forEach(hub => {
    const pos = latLonToVector3(hub.lat, hub.lon, GLOBE_RADIUS + 0.02);

    // Marker Pin Core
    const coreGeo = new THREE.SphereGeometry(hub.isHub ? 0.045 : 0.035, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: hub.color });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.copy(pos);
    markerGroup.add(core);

    // Vertical Beacon Stem
    const normal = pos.clone().normalize();
    const stemEnd = pos.clone().add(normal.clone().multiplyScalar(0.16));
    const stemGeo = new THREE.BufferGeometry().setFromPoints([pos, stemEnd]);
    const stemMat = new THREE.LineBasicMaterial({ color: hub.color, transparent: true, opacity: 0.8 });
    const stem = new THREE.Line(stemGeo, stemMat);
    markerGroup.add(stem);

    // Pulsing Outer Ring
    const ringGeo = new THREE.RingGeometry(0.04, 0.065, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: hub.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });
    const pRing = new THREE.Mesh(ringGeo, ringMat);
    pRing.position.copy(pos.clone().add(normal.clone().multiplyScalar(0.01)));
    pRing.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    markerGroup.add(pRing);

    markers.push({ hub, pos, normal, core, pRing, scale: 1 });
  });

  // --- Diplomatic Great-Circle Arcs (Flight Corridors) ---
  const arcs = [];
  const arcGroup = new THREE.Group();
  globeGroup.add(arcGroup);

  const delhiHub = HUBS[0]; // New Delhi
  const destinationHubs = HUBS.slice(1);

  destinationHubs.forEach(dest => {
    const start = latLonToVector3(delhiHub.lat, delhiHub.lon, GLOBE_RADIUS);
    const end = latLonToVector3(dest.lat, dest.lon, GLOBE_RADIUS);

    // Midpoint curved outwards
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const distance = start.distanceTo(end);
    const arcHeight = Math.min(1.2, Math.max(0.35, distance * 0.32));
    mid.normalize().multiplyScalar(GLOBE_RADIUS + arcHeight);

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(50);
    const arcGeo = new THREE.BufferGeometry().setFromPoints(points);

    // Arc Line
    const arcMat = new THREE.LineBasicMaterial({
      color: 0x5b8cff,
      transparent: true,
      opacity: 0.28
    });
    const arcLine = new THREE.Line(arcGeo, arcMat);
    arcGroup.add(arcLine);

    // Flowing Photon Particle
    const photonGeo = new THREE.SphereGeometry(0.024, 8, 8);
    const photonMat = new THREE.MeshBasicMaterial({ color: 0xf4dc9a });
    const photon = new THREE.Mesh(photonGeo, photonMat);
    arcGroup.add(photon);

    arcs.push({ curve, photon, progress: Math.random() });
  });

  // --- Starfield Particle Background ---
  const starGeo = new THREE.BufferGeometry();
  const starCount = 1200;
  const starCoords = [];
  const starColors = [];

  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 60;
    const y = (Math.random() - 0.5) * 60;
    const z = (Math.random() - 0.5) * 60;
    // Keep stars outside inner sphere
    if (Math.sqrt(x*x + y*y + z*z) < 12) continue;
    starCoords.push(x, y, z);

    // Palette: white, gold, cyan
    const r = Math.random();
    if (r > 0.7) {
      starColors.push(0.83, 0.69, 0.22); // gold
    } else if (r > 0.4) {
      starColors.push(0.35, 0.55, 1.0);  // blue
    } else {
      starColors.push(0.95, 0.95, 1.0);  // crisp white
    }
  }

  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
  starGeo.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
  const starMat = new THREE.PointsMaterial({
    size: 0.075,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });
  const starField = new THREE.Points(starGeo, starMat);
  scene.add(starField);

  // --- Mouse Drag & Orbit Controls ---
  let isDragging = false;
  let prevMousePos = { x: 0, y: 0 };
  let targetRotation = { x: 0.2, y: -1.2 };
  let currentRotation = { x: 0.2, y: -1.2 };
  let autoRotateSpeed = 0.0018;
  let mouseParallax = { x: 0, y: 0 };
  let isHovered = false;

  container.addEventListener('mousedown', e => {
    isDragging = true;
    prevMousePos = { x: e.clientX, y: e.clientY };
    if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', e => {
    const rect = container.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      isHovered = true;
    } else {
      isHovered = false;
    }

    // Parallax tracking
    mouseParallax.x = (e.clientX / window.innerWidth - 0.5) * 0.25;
    mouseParallax.y = (e.clientY / window.innerHeight - 0.5) * 0.25;

    if (!isDragging) return;
    const deltaX = e.clientX - prevMousePos.x;
    const deltaY = e.clientY - prevMousePos.y;

    targetRotation.y += deltaX * 0.006;
    targetRotation.x += deltaY * 0.006;
    // Constrain pitch
    targetRotation.x = Math.max(-1.1, Math.min(1.1, targetRotation.x));

    prevMousePos = { x: e.clientX, y: e.clientY };
  });

  // Touch Support
  container.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', e => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - prevMousePos.x;
    const deltaY = e.touches[0].clientY - prevMousePos.y;

    targetRotation.y += deltaX * 0.007;
    targetRotation.x += deltaY * 0.007;
    targetRotation.x = Math.max(-1.1, Math.min(1.1, targetRotation.x));

    prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });

  // --- Resize Handler ---
  function onWindowResize() {
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', onWindowResize);

  // --- Public Globe Controller ---
  window.INMUN_GLOBE = {
    focusCity: function (cityKey) {
      const match = HUBS.find(h => h.id === cityKey || h.committee.toLowerCase().includes(cityKey.toLowerCase()));
      if (match) {
        // Calculate target rotation to bring city to front
        const phi = (90 - match.lat) * (Math.PI / 180);
        const theta = (match.lon + 180) * (Math.PI / 180);
        targetRotation.y = -theta + Math.PI / 2;
        targetRotation.x = phi - Math.PI / 2;
        if (window.INMUN_AUDIO) window.INMUN_AUDIO.playHover();
      }
    },
    resetView: function () {
      targetRotation = { x: 0.2, y: -1.2 };
    }
  };

  // --- Animation Loop ---
  let animationFrameId;
  let isVisible = true;
  let pulseTime = 0;

  // Optimize when scrolled out of view
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
    });
  }, { threshold: 0.05 });
  heroObserver.observe(container);

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    if (!isVisible) return;

    pulseTime += 0.035;

    // Auto rotate when user is not dragging
    if (!isDragging) {
      targetRotation.y += autoRotateSpeed;
    }

    // Smooth inertia interpolation
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.06;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.06;

    globeGroup.rotation.x = currentRotation.x + mouseParallax.y;
    globeGroup.rotation.y = currentRotation.y + mouseParallax.x;

    // Slowly rotate celestial rings in opposite direction
    ringGroup.rotation.z += 0.001;

    // Gently rotate starfield for cosmic parallax
    starField.rotation.y += 0.0003;
    starField.rotation.x = mouseParallax.y * 0.5;

    // Animate Marker Pulses
    markers.forEach(m => {
      const scale = 1 + Math.sin(pulseTime * 2 + m.pos.x) * 0.45;
      m.pRing.scale.set(scale, scale, 1);
      m.pRing.material.opacity = Math.max(0.1, 1 - (scale - 1) / 0.55);
    });

    // Animate Flowing Photons on Diplomatic Arcs
    arcs.forEach(arc => {
      arc.progress = (arc.progress + 0.006) % 1;
      const pt = arc.curve.getPointAt(arc.progress);
      arc.photon.position.copy(pt);
    });

    renderer.render(scene, camera);
  }

  animate();
})();
