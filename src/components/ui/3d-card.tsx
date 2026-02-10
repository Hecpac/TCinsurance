"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type ElementType,
  type MouseEvent,
  type ReactNode,
} from "react";

interface CardContainerProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
}

type CardBodyProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

type CardItemProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children: ReactNode;
  translateX?: number;
  translateY?: number;
  translateZ?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  style?: CSSProperties;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children" | "style">;

const MouseEnterContext = createContext(false);

function canRun3dHover() {
  if (typeof window === "undefined") return false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  return finePointer && !reducedMotion;
}

export function CardContainer({
  children,
  className,
  containerClassName,
  maxTilt = 10,
  scale = 1.02,
  perspective = 1200,
}: CardContainerProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const resetTransform = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!canRun3dHover()) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (event.clientX - centerX) / (rect.width / 2);
      const deltaY = (event.clientY - centerY) / (rect.height / 2);

      const rotateY = deltaX * maxTilt;
      const rotateX = -deltaY * maxTilt;

      card.style.transform = `translate3d(0, 0, 0) rotateX(${rotateX.toFixed(
        2
      )}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
    },
    [maxTilt, scale]
  );

  const handleMouseEnter = useCallback(() => {
    if (!canRun3dHover()) return;
    setIsMouseEntered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseEntered(false);
    resetTransform();
  }, [resetTransform]);

  const containerStyle = useMemo<CSSProperties>(() => {
    return { perspective: `${perspective}px` };
  }, [perspective]);

  return (
    <div
      className={containerClassName ?? ""}
      style={containerStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className={`transition-transform duration-300 ease-out ${
          className ?? ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <MouseEnterContext.Provider value={isMouseEntered}>
          {children}
        </MouseEnterContext.Provider>
      </div>
    </div>
  );
}

export function CardBody<T extends ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: CardBodyProps<T>) {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component
      className={className ?? ""}
      style={{ transformStyle: "preserve-3d" }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function CardItem<T extends ElementType = "div">({
  as,
  className,
  children,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  style,
  ...rest
}: CardItemProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const isMouseEntered = useContext(MouseEnterContext);

  const transform = isMouseEntered
    ? `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
    : "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";

  return (
    <Component
      className={`transition-transform duration-300 ease-out ${className ?? ""}`}
      style={{ ...style, transform, transformStyle: "preserve-3d" }}
      {...rest}
    >
      {children}
    </Component>
  );
}
