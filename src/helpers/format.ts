export function capitalizeFirstLetter(string: any) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return null;
}
