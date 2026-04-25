type TicWordmarkProps = {
  className?: string;
  ariaLabel?: string;
};

export default function TicWordmark({
  className,
  ariaLabel = "TIC Insurance",
}: TicWordmarkProps) {
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={className}
      style={{
        fontFamily: "var(--font-tic-headline)",
        fontWeight: 700,
        letterSpacing: "0.04em",
        lineHeight: 1,
        color: "var(--color-fg)",
        display: "inline-flex",
        alignItems: "baseline",
        gap: "0.18em",
        fontSize: "1.55rem",
      }}
    >
      <span style={{ color: "var(--color-tic-orange)" }}>T</span>
      <span>IC</span>
      <span
        style={{
          fontFamily: "var(--font-tic-body)",
          fontWeight: 500,
          letterSpacing: "0.18em",
          fontSize: "0.62em",
          textTransform: "uppercase",
          color: "var(--color-tic-gray-blue)",
          marginLeft: "0.35em",
        }}
      >
        Insurance
      </span>
    </span>
  );
}
