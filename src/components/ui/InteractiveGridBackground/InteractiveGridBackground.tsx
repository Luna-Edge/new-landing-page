import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface InteractiveGridBackgroundProps {
  /**
   * Size of the grid
   */
  gridSize: number;
  /**
   * Size of each square
   */
  boxSize: number;
  /**
   * Width of the border
   */
  lineWidth: number;
  /**
   * Speed of color transition
   */
  transitionSpeed: number;
}

export default function InteractiveGridBackground({
  gridSize,
  boxSize,
  lineWidth,
  transitionSpeed,
}: InteractiveGridBackgroundProps) {
  const ref = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const colorTransfer = useRef<THREE.Color[][]>([]);
  const time = useRef(0);

  // Initialize color transfer array
  useEffect(() => {
    colorTransfer.current = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(new THREE.Color("#080E2C")));
  }, [gridSize]);

  // Update the mouse position on mouse move
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Create the grid
  const squares: JSX.Element[] = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      squares.push(
        <lineSegments
          key={`square-${i}-${j}`}
          position={[i - gridSize / 2, j - gridSize / 2, 0]}
        >
          <edgesGeometry args={[new THREE.PlaneGeometry(boxSize, boxSize)]} />
          <lineBasicMaterial color="#080E2C" linewidth={lineWidth} />
        </lineSegments>
      );
    }
  }

  // Update the grid based on mouse position and auto color transferring
  useFrame((state, delta) => {
    time.current += delta;

    if (ref.current && colorTransfer.current.length > 0) {
      ref.current.children.forEach((square, index) => {
        if (
          square instanceof THREE.LineSegments &&
          square.material instanceof THREE.LineBasicMaterial
        ) {
          const i = Math.floor(index / gridSize);
          const j = index % gridSize;
          const pos = square.position;
          const distance = Math.sqrt(
            Math.pow(pos.x - (mouse.current.x * gridSize) / 2, 2) +
              Math.pow(pos.y - (mouse.current.y * gridSize) / 2, 2)
          );

          // Change color based on distance to the mouse
          const maxDistance = Math.sqrt(2) * (gridSize / 2);
          const t = 1 - Math.min(distance / maxDistance, 1);

          const startColor = new THREE.Color("#080E2C");
          const endColor = new THREE.Color("#1480ff");
          const targetColor = new THREE.Color().lerpColors(
            startColor,
            endColor,
            t
          );

          // Auto color transferring
          const autoColorT = (Math.sin(time.current + i * 0.1 + j * 0.1) + 1) / 2;
          const autoColor = new THREE.Color().lerpColors(
            startColor,
            endColor,
            autoColorT
          );

          // Combine mouse-based and auto color
          const combinedColor = new THREE.Color().lerpColors(
            targetColor,
            autoColor,
            0.3
          );

          // Smoothly transition the color
          colorTransfer.current[i][j].lerp(combinedColor, transitionSpeed);
          square.material.color.copy(colorTransfer.current[i][j]);

          // Transfer color to neighbors
          const transferAmount = 0.1;
          const neighbors = [
            [i - 1, j],
            [i + 1, j],
            [i, j - 1],
            [i, j + 1],
          ];

          neighbors.forEach(([ni, nj]) => {
            if (ni >= 0 && ni < gridSize && nj >= 0 && nj < gridSize) {
              colorTransfer.current[ni][nj].lerp(
                colorTransfer.current[i][j],
                transferAmount
              );
            }
          });
        }
      });
    }
  });

  return <group ref={ref}>{squares}</group>;
}