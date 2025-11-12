import React from 'react';
import { getSmoothStepPath } from 'reactflow';

// Edge personalizado para Composición (rombo relleno)
const ComposicionEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Calcular la posición y rotación del rombo en el origen
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
  // Tamaño del rombo
  const size = 8;
  
  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
      />
      
      {/* Rombo relleno en el origen (composición) */}
      <g transform={`translate(${sourceX}, ${sourceY}) rotate(${angle})`}>
        <path
          d={`M ${size * 2},0 L ${size * 3},${size} L ${size * 2},${size * 2} L ${size},${size} Z`}
          fill="#f59e0b"
          stroke="#f59e0b"
          strokeWidth="1"
        />
      </g>
      
      {label && (
        <g>
          <rect
            x={labelX - 40}
            y={labelY - 10}
            width={80}
            height={20}
            fill="#23232a"
            fillOpacity={0.9}
            rx={4}
          />
          <text
            x={labelX}
            y={labelY + 5}
            style={{ fontSize: 12, fill: '#fff', fontWeight: 600 }}
            textAnchor="middle"
          >
            {label}
          </text>
        </g>
      )}
    </>
  );
};

export default ComposicionEdge;
