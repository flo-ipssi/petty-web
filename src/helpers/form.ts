
export default function isDefinedAndNotNull(value: string | boolean | object) {
  return value !== undefined && value !== null;
}
