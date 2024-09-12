import "./Sphere.module.scss";
import * as THREE from "three";
import { GroupProps, useFrame } from "@react-three/fiber";

import { forwardRef, useImperativeHandle, useRef, useMemo, memo } from "react";

interface RotatingSphereProps extends GroupProps {
  radius?: number;
  numPoints?: number;
  numConnections?: number;
  onFrame?: () => void;
}

const Sphere = memo(forwardRef<
  THREE.Group<THREE.Object3DEventMap>,
  RotatingSphereProps
>(
  (
    {
      radius = 10,
      numPoints = 400,
      numConnections = 10,
      onFrame = () => {},
      ...props
    },
    ref
  ) => {
    const groupRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

    useImperativeHandle(ref, () => groupRef.current!);

    const getRandomPointOnSphere = (radius: number) => {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    const initialPoints = useMemo(
      () =>
        Array.from({ length: numPoints }, () => getRandomPointOnSphere(radius)),
      [numPoints, radius]
    );

    const getConnections = useMemo(() => {
      const connections: [THREE.Vector3, THREE.Vector3][] = [];

      initialPoints.forEach((pointA, idxA) => {
        const distances = initialPoints
          .map((pointB, idxB) =>
            idxA !== idxB
              ? { point: pointB, distance: pointA.distanceTo(pointB) }
              : null
          )
          .filter(Boolean)
          .sort((a, b) => a!.distance - b!.distance);

        const nearestNeighbors = distances.slice(0, numConnections);
        nearestNeighbors.forEach((neighbor) => {
          connections.push([pointA, neighbor!.point]);
        });
      });
      return connections;
    }, [initialPoints, numConnections]);

    const pointsGeometry = useMemo(() => {
      const geometry = new THREE.BufferGeometry().setFromPoints(initialPoints);
      const colors = new Float32Array(initialPoints.length * 3);
      initialPoints.forEach((point, i) => {
        const t = (point.x + radius) / (2 * radius);
        const color = new THREE.Color().lerpColors(new THREE.Color("#1480FF"), new THREE.Color("#131AE0"), t);
        color.toArray(colors, i * 3);
      });
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      return geometry;
    }, [initialPoints, radius]);

    const lineGeometry = useMemo(() => {
      const geometry = new THREE.BufferGeometry().setFromPoints(
        getConnections.flat()
      );
      const colors = new Float32Array(getConnections.length * 6);
      getConnections.forEach((connection, i) => {
        const [start, end] = connection;
        const startT = (start.x + radius) / (2 * radius);
        const endT = (end.x + radius) / (2 * radius);
        const startColor = new THREE.Color().lerpColors(new THREE.Color("#1480FF"), new THREE.Color("#131AE0"), startT);
        const endColor = new THREE.Color().lerpColors(new THREE.Color("#1480FF"), new THREE.Color("#131AE0"), endT);
        startColor.toArray(colors, i * 6);
        endColor.toArray(colors, i * 6 + 3);
      });
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      return geometry;
    }, [getConnections, radius]);

    const circleTexture = useMemo(() => {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    }, []);

    useFrame(() => {
      if (groupRef.current) {
        const colorTransition = 0.05;
        const rotationSpeed = (window as any).lenis?.isScrolling ? 0.007 : 0.0007;

        groupRef.current.rotation.x = rotationSpeed;
        groupRef.current.rotation.y = rotationSpeed;

        const rotationMatrix = new THREE.Matrix4().makeRotationY(groupRef.current.rotation.y);
        pointsGeometry.applyMatrix4(rotationMatrix);
        lineGeometry.applyMatrix4(rotationMatrix);

        const positions = pointsGeometry.attributes.position;
        const colors = pointsGeometry.attributes.color;

        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const t = (x + radius) / (2 * radius);
          const targetColor = new THREE.Color().lerpColors(new THREE.Color("#1480FF"), new THREE.Color("#131AE0"), t);
          const currentColor = new THREE.Color(colors.getX(i), colors.getY(i), colors.getZ(i));
          currentColor.lerp(targetColor, colorTransition);
          colors.setXYZ(i, currentColor.r, currentColor.g, currentColor.b);
        }

        colors.needsUpdate = true;

        const lineColors = lineGeometry.attributes.color;
        for (let i = 0; i < lineColors.count; i += 2) {
          const x1 = lineGeometry.attributes.position.getX(i);
          const x2 = lineGeometry.attributes.position.getX(i + 1);
          const t1 = (x1 + radius) / (2 * radius);
          const t2 = (x2 + radius) / (2 * radius);
          const targetColor1 = new THREE.Color().lerpColors(new THREE.Color("#1480FF"), new THREE.Color("#131AE0"), t1);
          const targetColor2 = new THREE.Color().lerpColors(new THREE.Color("#1480FF"), new THREE.Color("#131AE0"), t2);
          const currentColor1 = new THREE.Color(lineColors.getX(i), lineColors.getY(i), lineColors.getZ(i));
          const currentColor2 = new THREE.Color(lineColors.getX(i + 1), lineColors.getY(i + 1), lineColors.getZ(i + 1));
          currentColor1.lerp(targetColor1, colorTransition);
          currentColor2.lerp(targetColor2, colorTransition);
          lineColors.setXYZ(i, currentColor1.r, currentColor1.g, currentColor1.b);
          lineColors.setXYZ(i + 1, currentColor2.r, currentColor2.g, currentColor2.b);
        }

        lineColors.needsUpdate = true;
      }
      onFrame();
    });

    return (
      <group ref={groupRef} {...props}>
        <points geometry={pointsGeometry}>
          <pointsMaterial size={0.2} sizeAttenuation vertexColors>
            <canvasTexture
              attach="map"
              image={circleTexture.image}
              wrapS={THREE.RepeatWrapping}
              wrapT={THREE.RepeatWrapping}
            />
          </pointsMaterial>
        </points>
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial vertexColors />
        </lineSegments>
      </group>
    );
  }
));

Sphere.displayName = "Sphere";

export default Sphere;