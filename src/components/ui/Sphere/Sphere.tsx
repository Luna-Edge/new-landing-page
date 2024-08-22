import "./Sphere.module.scss";
import * as THREE from "three";
import { GroupProps, useFrame } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";

interface RotatingSphereProps extends GroupProps {
  /**
   * Sphere radius
   */
  radius?: number;
  /**
   * Number of points
   */
  numPoints?: number;
  /**
   * Number of nearest neighbors to connect to
   */
  numConnections?: number;
  /**
   * Function that will calls each time the frame is updated
   */
  onFrame?: () => void;
}

const Sphere = forwardRef<
  THREE.Group<THREE.Object3DEventMap>,
  RotatingSphereProps
>(
  (
    { radius = 10, numPoints = 400, numConnections = 10, onFrame = () => {}, ...props },
    ref
  ) => {
    const groupRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null);
    const pointsRef = useRef<
      THREE.Mesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[],
        THREE.Object3DEventMap
      >[]
    >([]);

    useImperativeHandle(ref, () => groupRef.current!);

    // Function to generate random points on the surface of a sphere
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

    // Generate initial points on the sphere
    const initialPoints = useRef(
      Array.from({ length: numPoints }, () => getRandomPointOnSphere(radius))
    ).current;

    // Find the k nearest neighbors for each point
    const getConnections = (points: THREE.Vector3[], k: number) => {
      const connections: [THREE.Vector3, THREE.Vector3][] = [];
      points.forEach((pointA, idxA) => {
        // Calculate distances to all other points
        const distances = points
          .map((pointB, idxB) => {
            if (idxA !== idxB) {
              return {
                point: pointB,
                distance: pointA.distanceTo(pointB),
              };
            }
            return null;
          })
          .filter(Boolean)
          .sort((a, b) => a!.distance - b!.distance);

        // Connect to the k nearest neighbors
        const nearestNeighbors = distances.slice(0, k);
        nearestNeighbors.forEach((neighbor) => {
          connections.push([pointA, neighbor!.point]);
        });
      });
      return connections;
    };

    const connectionsRef = useRef(
      getConnections(initialPoints, numConnections)
    );

    useFrame(() => {
      onFrame();
    });

    return (
      <group ref={groupRef} {...props}>
        {/* Points */}
        {initialPoints.map((point, idx) => (
          <mesh
            key={idx}
            ref={(el) => {
              if (el) pointsRef.current[idx] = el;
            }}
            position={point}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#1480FF" />
          </mesh>
        ))}

        {/* Lines connecting each point to its k nearest neighbors */}
        {connectionsRef.current.map(([pointA, pointB], idx) => {
          const pointsArray = [pointA, pointB];
          const geometry = new THREE.BufferGeometry().setFromPoints(
            pointsArray
          );
          return (
            <primitive
              key={idx}
              object={
                new THREE.Line(
                  geometry,
                  new THREE.LineBasicMaterial({ color: "#1480FF" })
                )
              }
            />
          );
        })}
      </group>
    );
  }
);

Sphere.displayName = "Sphere";

export default Sphere;
