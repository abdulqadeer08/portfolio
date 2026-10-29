"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import type { Group } from "three";
import { Color, MathUtils } from "three";
import { useTheme, type Theme } from "@/lib/hooks";

type Palette = { deep: string; accent: string; bright: string; ambient: string };

/** Reads the active colour preset from the CSS custom properties for the given theme. */
function readPalette(theme: Theme): Palette {
  const styles = getComputedStyle(document.documentElement);
  const fallback = theme === "light" ? "#4936d6" : "#b39dff";
  const get = (name: string) => styles.getPropertyValue(name).trim() || fallback;
  const deep = get("--accent-deep");
  // A dim wash of the accent fills the reflections, so the chrome never reads as plain black.
  const base = new Color(deep);
  // Dark: a deep wash of the accent. Light: a pale, pearly tint of it.
  const ambient = `#${(theme === "light" ? base.lerp(new Color("#ffffff"), 0.62) : base.multiplyScalar(0.32)).getHexString()}`;
  return { deep, accent: get("--accent"), bright: get("--accent-bright"), ambient };
}

function Knot({ reduceMotion, pointer }: { reduceMotion: boolean; pointer: RefObject<{ x: number; y: number }> }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    if (!reduceMotion) g.rotation.z += delta * 0.12;
    // Ease the whole sculpture towards the pointer.
    g.rotation.x = MathUtils.damp(g.rotation.x, pointer.current.y * 0.35, 3, delta);
    g.rotation.y = MathUtils.damp(g.rotation.y, pointer.current.x * 0.55, 3, delta);
  });

  return (
    <group ref={group}>
      <Float speed={reduceMotion ? 0 : 1.6} rotationIntensity={0.6} floatIntensity={0.9}>
        <mesh>
          <torusKnotGeometry args={[1, 0.34, 360, 64, 2, 3]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={1}
            roughness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.08}
            iridescence={1}
            iridescenceIOR={1.6}
            iridescenceThicknessRange={[180, 820]}
            envMapIntensity={1.6}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Lights({ palette }: { palette: Palette }) {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={[palette.ambient]} />
      <group rotation={[-Math.PI / 3, 0, 1]}>
        <Lightformer form="circle" intensity={5} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={3} color={palette.bright} />
        <Lightformer form="circle" intensity={3} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={3} color={palette.deep} />
        <Lightformer form="circle" intensity={3} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={3} color={palette.accent} />
        <Lightformer form="circle" intensity={3} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={10} color={palette.accent} />
        <Lightformer form="rect" intensity={4} position={[0, 0, 8]} scale={[8, 2, 1]} color="#ffffff" />
        <Lightformer form="ring" intensity={10} position={[10, 10, 0]} scale={10} color={palette.bright} target={[0, 0, 0]} />
      </group>
    </Environment>
  );
}

/** The floating iridescent sculpture behind the hero headline. */
export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const theme = useTheme();
  // Re-read the palette whenever the theme changes, so light and dark each get their own colours.
  const palette = useMemo(() => readPalette(theme), [theme]);
  const reduceMotion = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Stop rendering entirely while the hero is scrolled out of view.
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (wrapper.current) observer.observe(wrapper.current);

    return () => {
      window.removeEventListener("pointermove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={wrapper} className="size-full">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6.2], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={visible ? (reduceMotion ? "demand" : "always") : "never"}
        onCreated={() => onReady?.()}
      >
        <Knot reduceMotion={reduceMotion} pointer={pointer} />
        <Lights key={theme} palette={palette} />
      </Canvas>
    </div>
  );
}
