export const getInitials = (name: string): string => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  return parts.length > 1
    ? `${parts[0][0].toUpperCase()}${parts[1][0].toUpperCase()}`
    : `${parts[0][0].toUpperCase()}0`;
};
