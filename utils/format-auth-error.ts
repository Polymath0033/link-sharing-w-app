export const formatAuthError = (error: string | undefined) => {
  if (!error) return "";
  return (
    error[0].toUpperCase() + error.replace("_", " ").toLowerCase().slice(1)
  );
};
