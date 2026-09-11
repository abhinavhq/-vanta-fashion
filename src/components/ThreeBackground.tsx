import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 1. Create 3D Outer Torus Knot (Cyan Wireframe Mesh)
    const geometry = new THREE.TorusKnotGeometry(10, 2.8, 140, 20);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.9,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // 2. Inner Golden Polyhedron Core
    const coreGeometry = new THREE.IcosahedronGeometry(5.5, 2);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // 3. 3D Floating Particle Vortex
    const particlesCount = 600;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 120;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.18,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // 4. Dynamic 3D Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 3, 100);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xd4af37, 2, 100);
    pointLight2.position.set(-20, -20, -20);
    scene.add(pointLight2);

    // Mouse & Scroll tracking for 3D parallax
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate 3D Geometries with scroll factor
      torusKnot.rotation.x += 0.004 + scrollY * 0.00005;
      torusKnot.rotation.y += 0.006 + scrollY * 0.00005;

      coreMesh.rotation.x -= 0.005;
      coreMesh.rotation.y -= 0.007;

      particlesMesh.rotation.y += 0.001;

      // Smooth Mouse & Scroll Parallax
      const targetZ = 25 + scrollY * 0.01;
      camera.position.z += (targetZ - camera.position.z) * 0.05;
      camera.position.x += (mouseX * 12 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 12 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90"
    />
  );
};
