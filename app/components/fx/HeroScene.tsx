"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

export type SceneState = {
    /** 0..1 scroll progress through the pinned hero */
    progress: number;
    /** 0..1 intro reveal, animated by the hero timeline */
    intro: number;
};

/**
 * Brndfy mark in cobalt metal. The source GLB is an untextured AI mesh
 * (positions only), so normals are rebuilt and the material is defined here.
 * Pointer tilt and scroll progress are read from a mutable ref every frame,
 * so the React tree never re-renders during animation.
 */
export default function HeroScene({
    state,
    onReady,
}: {
    state: React.RefObject<SceneState>;
    onReady?: () => void;
}) {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.95;
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const pmrem = new THREE.PMREMGenerator(renderer);
        const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environment = envTex;

        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
        camera.position.set(0, 0, 7.2);

        // Lighting: cool key, cobalt fill from below, ice-blue rim from behind
        const key = new THREE.DirectionalLight(0xdfe8ff, 1.2);
        key.position.set(3, 4, 5);
        const fill = new THREE.PointLight(0x1744ff, 60, 20);
        fill.position.set(-3, -2.5, 2.5);
        const rim = new THREE.PointLight(0xb0d7f9, 80, 20);
        rim.position.set(2.5, 1.5, -3);
        scene.add(key, fill, rim, new THREE.AmbientLight(0x0d1350, 0.6));

        const pivot = new THREE.Group();
        scene.add(pivot);

        // Faint particle field gives the camera something to travel through
        const COUNT = 420;
        const pos = new Float32Array(COUNT * 3);
        for (let i = 0; i < COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 14;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
        }
        const dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        const dustMat = new THREE.PointsMaterial({
            color: 0x8fb8ff,
            size: 0.018,
            transparent: true,
            opacity: 0.55,
            depthWrite: false,
        });
        const dust = new THREE.Points(dustGeo, dustMat);
        scene.add(dust);

        // Deep anodised cobalt, matching the 2D render in /logo3d.png
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x0f2fd6,
            metalness: 0.92,
            roughness: 0.3,
            clearcoat: 0.8,
            clearcoatRoughness: 0.18,
            envMapIntensity: 0.55,
        });

        let model: THREE.Object3D | null = null;
        const loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);
        loader.load(
            "/models/brndfy-mark.glb",
            (gltf) => {
                model = gltf.scene;
                model.traverse((o) => {
                    const mesh = o as THREE.Mesh;
                    if (mesh.isMesh) {
                        mesh.geometry.computeVertexNormals();
                        mesh.material = material;
                    }
                });
                // Centre and normalise to ~2.2 units tall
                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3());
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center);
                const s = 2.2 / size.y;
                const holder = new THREE.Group();
                holder.scale.setScalar(s);
                holder.add(model);
                pivot.add(holder);
                onReady?.();
            },
            undefined,
            () => onReady?.(),
        );

        // Pointer tilt (normalised -1..1), eased toward target each frame
        const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
        const onPointer = (e: PointerEvent) => {
            pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener("pointermove", onPointer, { passive: true });

        let width = 0;
        let height = 0;
        const resize = () => {
            width = mount.clientWidth;
            height = mount.clientHeight;
            renderer.setSize(width, height, false);
            renderer.domElement.style.width = "100%";
            renderer.domElement.style.height = "100%";
            camera.aspect = width / Math.max(height, 1);
            camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(mount);

        let visible = true;
        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
        });
        io.observe(mount);

        const timer = new THREE.Timer();
        let raf = 0;
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);

        const frame = () => {
            raf = requestAnimationFrame(frame);
            if (!visible || document.hidden) return;
            timer.update();
            const t = timer.getElapsed();
            const { progress = 0, intro = 1 } = state.current ?? {};
            const wide = width >= 1024;

            pointer.x += (pointer.tx - pointer.x) * 0.05;
            pointer.y += (pointer.ty - pointer.y) * 0.05;

            const p = ease(Math.min(Math.max(progress, 0), 1));
            const idle = reduce ? 0 : Math.sin(t * 0.6) * 0.08;

            // Resting pose sits right of the headline on desktop, centred above it on mobile
            const restX = wide ? 1.62 : 0;
            const restY = wide ? 0.28 : 1.15;
            pivot.position.x = THREE.MathUtils.lerp(restX, 0, p);
            pivot.position.y = THREE.MathUtils.lerp(restY, 0, p) + idle * 0.6;
            pivot.position.z = THREE.MathUtils.lerp(0, 2.6, p);

            const baseScale = wide ? 0.88 : 0.52;
            pivot.scale.setScalar(baseScale * (0.55 + 0.45 * ease(intro)));

            pivot.rotation.y =
                -0.45 + (1 - intro) * -1.6 + pointer.x * 0.35 + p * (Math.PI * 2 + 0.45) + (reduce ? 0 : Math.sin(t * 0.35) * 0.12);
            pivot.rotation.x = 0.08 + pointer.y * 0.18 + p * 0.25;
            pivot.rotation.z = -0.06 + idle * 0.3;

            dust.rotation.y = t * 0.012 + pointer.x * 0.05;
            dust.position.z = p * 4;
            dustMat.opacity = 0.55 * intro;

            renderer.render(scene, camera);
        };
        frame();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("pointermove", onPointer);
            ro.disconnect();
            io.disconnect();
            dustGeo.dispose();
            dustMat.dispose();
            material.dispose();
            envTex.dispose();
            pmrem.dispose();
            renderer.dispose();
            renderer.domElement.remove();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
