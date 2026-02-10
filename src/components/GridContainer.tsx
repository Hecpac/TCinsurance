"use client";

import {
  useState,
  useEffect,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

type GridContainerProps<T extends ElementType = "div"> = {
  children: ReactNode;
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function GridContainer<T extends ElementType = "div">({
  children,
  as,
  className,
  ...rest
}: GridContainerProps<T>) {
  const [debug, setDebug] = useState(false);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "g") {
        e.preventDefault();
        setDebug((d) => !d);
      }
    }
    if (process.env.NODE_ENV === "development") {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, []);

  return (
    <Tag
      {...rest}
      className={`mx-auto w-full max-w-[1440px] px-6 md:px-20 text-left ${className ?? ""}`}
    >
      <div className="relative">
        {/* Debug grid overlay */}
        {debug && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-50 grid grid-cols-12 gap-6"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-full bg-swiss-red/10" />
            ))}
          </div>
        )}

        <div className="grid grid-cols-12 gap-6">
          {children}
        </div>
      </div>
    </Tag>
  );
}
