import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  PerspectiveCamera,
} from "@react-three/drei";
import ModelRenderer from "./ModelRenderer";

function SceneContent({ model3D }) {
  const {
    url,
    scale = 1,
    position = { x: 0, y: 0, z: 0 },
    rotation = { x: 0, y: 0, z: 0 },
    camera = { x: 0, y: 0, z: 4 },
  } = model3D;

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[camera.x, camera.y, camera.z]}
        fov={45}
      />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <Environment preset="studio" />
      <Suspense fallback={null}>
        <ModelRenderer
          url={url}
          scale={scale}
          position={position}
          rotation={rotation}
        />
      </Suspense>
      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
      />
      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={8}
        autoRotate={false}
      />
    </>
  );
}

function ProductViewer3D({ model3D }) {
  if (!model3D?.url) {
    return (
      <div className="w-full h-[min(70vh,600px)] rounded-2xl bg-border-subtle flex items-center justify-center text-ink-muted">
        3D model unavailable
      </div>
    );
  }

  return (
    <div className="w-full h-[min(70vh,600px)] rounded-2xl overflow-hidden bg-gradient-to-b from-[#f5f5f5] to-[#e8e8e8] border border-border">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <SceneContent model3D={model3D} />
      </Canvas>
      <p className="text-center text-xs text-ink-subtle py-2">
        Drag to rotate · Scroll to zoom
      </p>
    </div>
  );
}

export default ProductViewer3D;
