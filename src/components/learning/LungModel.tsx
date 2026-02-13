"use client";

import {
  Bounds,
  Html,
  OrbitControls,
  useBounds,
  useFBX,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo } from "react";

type Props = {
  modelPath: string;
};

function Model({ modelPath }: Props) {
  const isGLB = modelPath.endsWith(".glb");
  const gltf = isGLB ? useGLTF(modelPath) : null;
  const fbx = !isGLB ? useFBX(modelPath) : null;

  const scene = useMemo(() => {
    if (gltf) return gltf.scene;
    if (fbx) return fbx;
  }, [gltf, fbx]);

  if (!scene) return null;

  return <primitive object={scene} />;
}

export default function LungModel({ modelPath }: Props) {
  if (typeof window === "undefined") return null;

  const isWebGLAvailable = () => {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      return false;
    }
  };

  if (!isWebGLAvailable) {
    return (
      <div className="text-red-500">
        WebGL is not supported in this environment.
      </div>
    );
  }
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Suspense fallback={<Loader />}>
        <Bounds fit clip observe margin={1.2}>
          <group position={[0, 0, 0]}>
            <FitOnModelChange modelPath={modelPath} />
            <Model modelPath={modelPath} />
          </group>
        </Bounds>
      </Suspense>

      <OrbitControls
        makeDefault
        target={[0, 0, 0]}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />
    </Canvas>
  );
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "black", fontSize: "14px" }}>
        Loading: {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

function FitOnModelChange({ modelPath }: { modelPath: string }) {
  const bounds = useBounds();

  useEffect(() => {
    bounds.refresh().fit();
  }, [modelPath, bounds]);

  return null;
}

// preload 3d model
useGLTF.preload("/models/inside-final.glb");
useGLTF.preload("/models/outside-final.glb");
