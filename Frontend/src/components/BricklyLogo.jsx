export const BricklyLogo = ({ className = "", isDark = false, size = 32 }) => {
  const colors = {
    light: {
      brick: "#FF5F4F",
      primary: "#1A1F2E",
      text: "#1A1F2E",
      accent: "#FF5F4F",
    },
    dark: {
      brick: "#FF5F4F",
      primary: "#FFFFFF",
      text: "#FFFFFF",
      accent: "#FF5F4F",
    },
  };
  const theme = isDark ? colors.dark : colors.light;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <rect x="6" y="2" width="12" height="6" rx="1" fill={theme.brick} />
        <rect x="2" y="10" width="10" height="6" rx="1" fill={theme.primary} />
        <rect x="14" y="10" width="10" height="6" rx="1" fill={theme.primary} />
        <rect x="6" y="18" width="12" height="6" rx="1" fill={theme.brick} />
      </svg>

      <div className="flex items-baseline gap-0.5">
        <span className="text-lg font-bold" style={{ color: theme.text }}>
          brick
        </span>
        <span className="text-lg font-bold" style={{ color: theme.accent }}>
          ly
        </span>
      </div>
    </div>
  );
};

export default BricklyLogo;
