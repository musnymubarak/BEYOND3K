document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("hero-3d-canvas");
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    
    // Transparent background allowing CSS to show
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 30, 80);
    camera.lookAt(0, 0, 0);

    const city = new THREE.Group();
    scene.add(city);

    // Subtle dark magenta/purple wireframe matches the accent but very faintly
    const material = new THREE.LineBasicMaterial({ 
        color: 0x933393, 
        transparent: true, 
        opacity: 0.15 
    });

    const buildingCount = 40;
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const edges = new THREE.EdgesGeometry(boxGeometry);

    for (let i = 0; i < buildingCount; i++) {
        const building = new THREE.LineSegments(edges, material);
        
        building.position.x = (Math.random() - 0.5) * 160;
        building.position.z = (Math.random() - 0.5) * 120;
        
        const height = Math.random() * 25 + 5;
        building.userData = {
            baseHeight: height,
            speed: Math.random() * 0.01 + 0.005,
            phase: Math.random() * Math.PI * 2
        };
        
        building.scale.set(
            Math.random() * 6 + 2, 
            height, 
            Math.random() * 6 + 2
        );
        
        building.position.y = height / 2;
        city.add(building);
    }

    function resize() {
        const parent = canvas.parentElement;
        const width = parent.clientWidth;
        const height = parent.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
    
    window.addEventListener('resize', resize);
    resize();

    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Slow rotation to simulate architectural inspection
        city.rotation.y = time * 0.05;

        // Bobbing scaling to simulate building rising / working
        city.children.forEach(building => {
            const data = building.userData;
            const currentHeight = (Math.sin(time * data.speed + data.phase) * 0.5 + 0.5) * data.baseHeight + 0.5;
            building.scale.y = currentHeight;
            building.position.y = currentHeight / 2 - 15;
        });

        renderer.render(scene, camera);
    }
    
    animate();
});
