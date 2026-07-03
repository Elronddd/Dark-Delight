/**
 * Central source of truth for real-world business facts.
 * Anything marked PLACEHOLDER was not confirmed by the client before build
 * start and needs a real value swapped in here — nowhere else in the code
 * references these facts directly.
 */
export const business = {
  name: "Dark Delight",
  tagline: "Restaurant & Cafe",
  heroLine: "Life Begins After Flavour",
  storyLine: "A cosy corner for coffee, comfort food & good company.",

  phone: "+91 90906 26228",
  phoneHref: "tel:+919090626228",
  whatsappNumber: "919090626228", // confirmed

  // CONFIRMED (found via web search, not yet verified by client)
  address: "Krishna Apartment, Boring Road, Anandpuri, Patna, Bihar",
  addressPincode: "PLACEHOLDER — confirm PIN code",

  // PLACEHOLDER — mockup and aggregator listings disagree (Mon-Thu 9-10/Fri-Sun 9-11
  // vs. aggregators' 11am-11pm daily). Using the client's own concept mockup for now.
  hours: [
    { days: "Mon – Thu", time: "9:00 AM – 10:00 PM" },
    { days: "Fri – Sun", time: "9:00 AM – 11:00 PM" },
  ],

  // PLACEHOLDER — could not confirm Zomato's own figure directly (page wouldn't
  // render for automated fetch). 4.5 is corroborated independently by both
  // Justdial (616 reviews) and Swiggy Dineout (808 reviews), used as a stand-in.
  rating: {
    value: 4.5,
    reviewCountLabel: "600+ reviews",
    source: "Zomato",
  },

  social: {
    instagram: "https://www.instagram.com/darkdelightpatna/?hl=en",
    facebook: "https://www.facebook.com/darkdelightcafe/",
  },

  zomatoUrl: "https://www.zomato.com/patna/dark-delight-restaurant-cafe-anandpuri",

  mapsQueryUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Dark Delight Restaurant & Cafe, Krishna Apartment, Boring Road, Anandpuri, Patna, Bihar"),
} as const;
