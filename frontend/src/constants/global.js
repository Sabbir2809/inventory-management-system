const productUnits = [
  "Piece", // Individual item
  "Pair", // Two items sold together
  "Dozen", // Twelve items
  "Box", // Container for multiple items
  "Pack", // Group of items sold together
  "Set", // Collection of items sold as a unit
  "Bundle", // Items packaged together
  "Kilogram", // Metric unit of mass
  "Gram", // Smaller unit of mass
  "Liter", // Metric unit of volume
  "Milliliter", // Smaller unit of volume
  "Meter", // Metric unit of length
  "Centimeter", // Smaller unit of length
  "Square Meter", // Metric unit of area
  "Cubic Meter", // Metric unit of volume (3D)
  "Ton", // Metric unit of weight (1000 kilograms)
  "Milligram", // Smaller unit of mass
  "Millimeter", // Smaller unit of length
  "Ounce", // Imperial unit of mass
  "Pound", // Imperial unit of weight
  "Fluid Ounce", // Imperial unit of volume
  "Pint", // Imperial unit of volume
  "Gallon", // Imperial unit of volume
  "Foot", // Imperial unit of length
  "Yard", // Imperial unit of length
  "Square Foot", // Imperial unit of area
  "Cubic Foot", // Imperial unit of volume (3D)
  "Inch", // Imperial unit of length
  "Bunch", // Group of items like fruits or flowers
  "Carton", // Larger container for multiple items
  "Barrel", // Large cylindrical container
  "Packet", // Small container for individual items
  "Bag", // Container for loose items
  "Case", // Container for multiple items
  "Tray", // Flat container for items
];

export const productUnitOptions = productUnits.map((item) => ({
  value: item,
  label: item,
}));
