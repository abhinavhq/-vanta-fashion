import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, Layers } from 'lucide-react';

interface ThreeDGarmentViewerProps {
  productName?: string;
}

export const ThreeDGarmentViewer: React.FC<ThreeDGarmentViewerProps> = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState(false);
  const [lightColor, setLightColor] = useState<'cyan' | 'gold' | 'white'>('cyan');

  const wireframeRef = useRef(wireframe);
  wireframeRef.current = wireframe;

  const lightColorRef = useRef(lightColor);
  lightColorRef.current = lightColor;

  useEffect(() => {
    if (!mountRef.current) return;

    // 3D Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0b);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(400, 450);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 3D Garment Mannequin Geometry (Avant-garde Torus / Sculptural Mesh)
    const geometry = new THREE.CylinderGeometry(2.5, 3.2, 8, 32, 16);
    
    // Add parametric waist indent to simulate mannequin torso shape
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const factor = 1 - Math.cos((y / 8) * Math.PI) * 0.18;
      pos.setX(i, pos.getX(i) * factor);
      pos.setZ(i, pos.getZ(i) * factor);
    }
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 3D Hanger / Collar accent ring
    const collarGeom = new THREE.TorusGeometry(2.6, 0.2, 16, 32);
    const collarMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9 });
    const collarMesh = new THREE.Mesh(collarGeom, collarMat);
    collarMesh.position.y = 4;
    collarMesh.rotation.x = Math.PI / 2;
    scene.add(collarMesh);

    // 3D Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 2, 50);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const secondaryLight = new THREE.PointLight(0xd4af37, 1.5, 50);
    secondaryLight.position.set(-10, -10, -10);
    scene.add(secondaryLight);

    // Mouse drag rotation tracking
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const domElem = renderer.domElement;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      mesh.rotation.y += deltaX * 0.01;
      mesh.rotation.x += deltaY * 0.01;
      collarMesh.rotation.z += deltaX * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        mesh.rotation.y += 0.008;
      }

      // Sync state refs
      material.wireframe = wireframeRef.current;
      if (lightColorRef.current === 'cyan') {
        pointLight.color.setHex(0x00f0ff);
      } else if (lightColorRef.current === 'gold') {
        pointLight.color.setHex(0xd4af37);
      } else {
        pointLight.color.setHex(0xffffff);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      collarGeom.dispose();
      collarMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center bg-zinc-950 border border-zinc-800 p-4">
      <div className="flex justify-between items-center w-full mb-3 font-mono text-xs text-zinc-400">
        <span className="text-[#00f0ff] font-bold flex items-center space-x-1.5">
          <Box size={14} />
          <span>INTERACTIVE 3D SILHOUETTE VIEWPORT</span>
        </span>
        <span>DRAG TO ROTATE 360°</span>
      </div>

      <div ref={mountRef} className="cursor-grab active:cursor-grabbing w-full flex justify-center" />

      {/* 3D Viewport Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-between w-full font-mono text-xs border-t border-zinc-800 pt-3 gap-2">
        <button
          onClick={() => setWireframe(w => !w)}
          className={`px-3 py-1.5 border transition-all flex items-center space-x-1.5 ${
            wireframe ? 'bg-white text-black border-white font-bold' : 'bg-zinc-900 text-zinc-300 border-zinc-700'
          }`}
        >
          <Layers size={13} />
          <span>{wireframe ? 'SOLID MESH' : 'WIREFRAME 3D'}</span>
        </button>

        <div className="flex items-center space-x-1.5">
          <span className="text-zinc-400 text-[10px]">3D LIGHTING:</span>
          <button
            onClick={() => setLightColor('cyan')}
            className={`w-4 h-4 rounded-full border ${lightColor === 'cyan' ? 'ring-2 ring-white' : ''}`}
            style={{ backgroundColor: '#00f0ff' }}
            title="Cyber Cyan Light"
          />
          <button
            onClick={() => setLightColor('gold')}
            className={`w-4 h-4 rounded-full border ${lightColor === 'gold' ? 'ring-2 ring-white' : ''}`}
            style={{ backgroundColor: '#d4af37' }}
            title="Luxury Gold Light"
          />
          <button
            onClick={() => setLightColor('white')}
            className={`w-4 h-4 rounded-full border ${lightColor === 'white' ? 'ring-2 ring-white' : ''}`}
            style={{ backgroundColor: '#ffffff' }}
            title="Studio White Light"
          />
        </div>
      </div>
    </div>
  );
};
