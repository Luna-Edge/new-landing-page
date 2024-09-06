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
      return geometry;
    }, [initialPoints]);

    const lineGeometry = useMemo(() => {
      const geometry = new THREE.BufferGeometry().setFromPoints(
        getConnections.flat()
      );
      return geometry;
    }, [getConnections]);

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
      onFrame();
    });

    return (
      <group ref={groupRef} {...props}>
        <points geometry={pointsGeometry}>
          <pointsMaterial color="#1480FF" size={0.2} sizeAttenuation>
            <canvasTexture
              attach="map"
              image={circleTexture.image}
              wrapS={THREE.RepeatWrapping}
              wrapT={THREE.RepeatWrapping}
            />
          </pointsMaterial>
        </points>
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial color="#1480FF" />
        </lineSegments>
      </group>
    );
  }
));

Sphere.displayName = "Sphere";

export default Sphere;