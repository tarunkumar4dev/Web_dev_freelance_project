export const BRAND = {
  name: "Sahiba Vij",
  tagline: "Every Sparkle Says Its Own Story",
  fromTheGarden: "From Our Garden",
  instagram: "https://www.instagram.com/sahibavijjewels",
  whatsappNumber: "+919830406406",
  email: "hello@sahibavij.com",
  address: "DLF Phase IV, Gurugram, Haryana - 122002",
  phone: "+91 98304 06406",
};

export const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "necklaces", label: "Necklaces" },
  { value: "earrings", label: "Earrings" },
  { value: "rings", label: "Rings" },
  { value: "bangles", label: "Bangles" },
  { value: "bridal", label: "Bridal Sets" },
];


export function generateOrderId() {
  const date = new Date();
  const y = date.getFullYear().toString().slice(-2);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  return `SV${y}${m}${d}${rand}`;
}