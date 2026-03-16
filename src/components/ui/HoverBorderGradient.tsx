"use client";
import React, { useCallback, useState, useEffect, useRef } from "react";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  BOTTOM:
    "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  RIGHT:
    "radial-gradient(16.2% 41.2% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
};

const highlight =
  "radial-gradient(75% 181.16% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");
  const gradientRef = useRef<HTMLDivElement>(null);

  const rotateDirection = useCallback(
    (currentDirection: Direction): Direction => {
      const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
      const currentIndex = directions.indexOf(currentDirection);
      const nextIndex = clockwise
        ? (currentIndex - 1 + directions.length) % directions.length
        : (currentIndex + 1) % directions.length;
      return directions[nextIndex];
    },
    [clockwise]
  );

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, rotateDirection]);

  const background = hovered ? highlight : movingMap[direction];

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        "relative inline-flex w-fit items-center justify-center overflow-visible p-px",
        containerClassName,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div
        className={["relative z-10 w-auto", className].filter(Boolean).join(" ")}
      >
        {children}
      </div>
      <div
        ref={gradientRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          filter: "blur(2px)",
          background,
          transition: `background ${duration}s linear`,
        }}
      />
    </Tag>
  );
}
