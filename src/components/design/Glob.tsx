import React, { ReactNode } from "react";
import { theme } from "@theme/index";
import "./Glob.scss";

interface GlobProps {
  children?: ReactNode;

  color?: string;

  size?: string[];

  globSizes?: number[][];
  globPositions?: number[][];

  top?: string;
  bottom?: string;
  left?: string;
  right?: string;

  opacity?: number;
  speed?: number;
  radius?: string;
  rotate?: number;
}

const Glob: React.FC<GlobProps> = ({
  children,
  color = theme.colors.brand.blue,
  size = ["50%", "50%"],
  globSizes = [
    [40, 80],
    [60, 50],
    [20, 80],
  ],
  globPositions = [
    [20, 10],
    [10, 20],
    [20, 15],
  ],
  top,
  left,
  right,
  bottom,
  opacity = 1,
  speed,
  radius,
  rotate,
}) => (
  <>
    { }
    <div
      className="blob"
      style={{
        top,
        left,
        right,
        bottom,
        width: size[0],
        height: size[1],
        opacity,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
    >
      { }
      {globSizes.map(([w, h], i) => (
        <div
          key={i}
          className={`glob${i || ""}`}
          style={{
            backgroundColor: color,
            width: `${w}%`,
            height: `${h}%`,
            top: `${globPositions[i][0]}%`,
            left: `${globPositions[i][1]}%`,
            animation: speed
              ? `move ${speed * (1200 - i * 200)}ms infinite alternate ease-in-out`
              : undefined,
            borderRadius: radius,
          }}
        />
      ))}
      { }
      {children}
    </div>

    { }
    <svg className="glob-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  </>
);

export default Glob;
