/**
 * Full menu, transcribed from `reference/Dark Delight menu design.pdf`.
 * veg/non-veg inferred from item naming (standard Indian-menu convention:
 * egg/chicken/mutton/fish/prawns = non-veg) where the source PDF didn't
 * print an explicit VEGETARIAN/NON-VEGETARIAN subheading for a category.
 * `signature: true` marks the "Dark Delight Spl/Special" branded items.
 */

export type MenuItem = {
  name: string;
  /** In ₹. A "X / Y" string denotes a half/full or piece-count price pair. */
  price: string;
  veg: boolean;
  signature?: boolean;
};

export type MenuSubsection = {
  /** null when the source menu has no veg/non-veg or noodle/gravy subheading */
  label: string | null;
  items: MenuItem[];
};

export type MenuCategory = {
  id: string;
  number: string;
  name: string;
  subtitle?: string;
  subsections: MenuSubsection[];
};

export const menu: MenuCategory[] = [
  {
    id: "soups",
    number: "01",
    name: "Soups",
    subsections: [
      {
        label: "Vegetarian",
        items: [
          { name: "Veg Hot & Sour Soup", price: "119", veg: true },
          { name: "Veg Manchow Soup", price: "119", veg: true },
          { name: "Veg Sweet Corn Soup", price: "149", veg: true },
          { name: "Veg Noodles Soup", price: "149", veg: true },
          { name: "Veg Coriander Lemon Soup", price: "149", veg: true },
          { name: "Cream of Tomato Soup", price: "149", veg: true },
          { name: "Dark Delight Spl Veg Soup", price: "149", veg: true, signature: true },
        ],
      },
      {
        label: "Non-Vegetarian",
        items: [
          { name: "Chicken Hot & Sour Soup", price: "149", veg: false },
          { name: "Chicken Manchow Soup", price: "149", veg: false },
          { name: "Chicken Noodles Soup", price: "189", veg: false },
          { name: "Chicken Sweet Corn Soup", price: "189", veg: false },
          { name: "Chicken Coriander Lemon Soup", price: "189", veg: false },
          { name: "Cream of Chicken Soup", price: "189", veg: false },
          { name: "Mutton Garlic Soup", price: "209", veg: false },
          { name: "Mutton Coriander Soup", price: "209", veg: false },
          { name: "Dark Delight Spl Non-Veg Soup", price: "209", veg: false, signature: true },
          { name: "Mutton Paya Soup", price: "209", veg: false },
          { name: "Mutton Paya Shorba", price: "229", veg: false },
          { name: "Prawns Garlic Soup", price: "239", veg: false },
          { name: "Sweet & Sour Prawns Soup", price: "299", veg: false },
        ],
      },
    ],
  },
  {
    id: "tandoor-starters",
    number: "02",
    name: "Tandoor Starters",
    subsections: [
      {
        label: "Vegetarian",
        items: [
          { name: "Paneer Tikka", price: "279", veg: true },
          { name: "Paneer Malai Tikka", price: "309", veg: true },
          { name: "Paneer Afghani Tikka", price: "329", veg: true },
          { name: "Paneer Achari Tikka", price: "299", veg: true },
          { name: "Paneer Kashmiri Tikka", price: "299", veg: true },
          { name: "Paneer Haryali Tikka", price: "299", veg: true },
          { name: "Paneer Lahsuni Tikka", price: "389", veg: true },
          { name: "Paneer Gulabi Tikka", price: "299", veg: true },
          { name: "Paneer Stuff Tikka", price: "389", veg: true },
          { name: "Cheesy Paneer Tikka", price: "319", veg: true },
          { name: "Angara Paneer", price: "389", veg: true },
          { name: "Mushroom Tikka", price: "279", veg: true },
          { name: "Cheese Mushroom Tikka", price: "299", veg: true },
          { name: "Mushroom Stuff Cheesy Tikka", price: "399", veg: true },
          { name: "Cheese Tikka", price: "389", veg: true },
          { name: "Soya Chaap", price: "249", veg: true },
          { name: "Soya Malai Chaap", price: "269", veg: true },
          { name: "Soya Afghani Chaap", price: "299", veg: true },
          { name: "Dark Delight Spl Tikka", price: "399", veg: true, signature: true },
        ],
      },
      {
        label: "Non-Vegetarian",
        items: [
          { name: "Chicken Tikka", price: "299", veg: false },
          { name: "Chicken Malai Tikka", price: "309", veg: false },
          { name: "Chicken Afghani Tikka", price: "329", veg: false },
          { name: "Chicken Achari Tikka", price: "339", veg: false },
          { name: "Chicken Reshmi Kabab", price: "339", veg: false },
          { name: "Chicken Lahsuni Kabab", price: "339", veg: false },
          { name: "Chicken Kalimirch", price: "339", veg: false },
          { name: "Angara Kabab", price: "339", veg: false },
          { name: "Lahsuni Tikka", price: "339", veg: false },
          { name: "Kashmiri Kabab", price: "389", veg: false },
          { name: "Tandoori Lollypop (6 Pcs)", price: "339", veg: false },
          { name: "Leg Kabab (2 Pcs)", price: "199", veg: false },
          { name: "Kalmi Kabab (4 / 8 Pcs)", price: "199 / 389", veg: false },
          { name: "Chicken Tandoori (4 / 8 Pcs)", price: "359 / 699", veg: false },
          { name: "Chicken Afghani Tandoor (4 / 8 Pcs)", price: "389 / 699", veg: false },
        ],
      },
    ],
  },
  {
    id: "chinese-starters",
    number: "03",
    name: "Chinese Starters",
    subsections: [
      {
        label: "Vegetarian",
        items: [
          { name: "Chilli Potato", price: "209", veg: true },
          { name: "Honey Chilli Potato Dry", price: "229", veg: true },
          { name: "Paneer Chilli Dry (8 Pcs)", price: "289", veg: true },
          { name: "Mushroom Chilli Dry", price: "289", veg: true },
          { name: "Baby Corn Chilli Dry", price: "279", veg: true },
          { name: "Corn Salt n Pepper", price: "289", veg: true },
          { name: "American Corn Fry", price: "289", veg: true },
          { name: "Cheese Corn Ball (8 Pcs)", price: "299", veg: true },
          { name: "Paneer Ball (8 Pcs)", price: "289", veg: true },
          { name: "Baby Corn Mushroom Dry", price: "299", veg: true },
          { name: "Veg Lollypop (8 Pcs)", price: "299", veg: true },
          { name: "Mushroom Pepper Dry", price: "299", veg: true },
          { name: "Paneer Dragon", price: "299", veg: true },
          { name: "Paneer Ball Chilli Dry", price: "329", veg: true },
          { name: "Tandoori Mushroom Chilli", price: "319", veg: true },
          { name: "Mushroom 65", price: "299", veg: true },
          { name: "Paneer 65 (8 Pcs)", price: "299", veg: true },
          { name: "Paneer Paprika (8 Pcs)", price: "299", veg: true },
          { name: "Veg Manchurian Dry (8 Pcs)", price: "289", veg: true },
          { name: "Soya Chilli", price: "309", veg: true },
          { name: "Soya Pepper Dry", price: "299", veg: true },
        ],
      },
      {
        label: "Non-Vegetarian",
        items: [
          { name: "Chicken Chilli Boneless Dry (8 Pcs)", price: "329", veg: false },
          { name: "Chicken Chilli Bone Dry (8 Pcs)", price: "299", veg: false },
          { name: "Dragon Chicken", price: "339", veg: false },
          { name: "Schezwan Chicken (8 Pcs)", price: "309", veg: false },
          { name: "Chicken Lollypop (6 Pcs)", price: "319", veg: false },
          { name: "Chicken 65 (8 Pcs)", price: "329", veg: false },
          { name: "Crispy Chicken", price: "329", veg: false },
          { name: "Dark Delight Chicken Chilli", price: "439", veg: false, signature: true },
          { name: "Chicken Pepper Dry", price: "329", veg: false },
          { name: "Chicken Tikka Chilli Dry", price: "369", veg: false },
          { name: "Chicken Schezwan Dry", price: "339", veg: false },
          { name: "Chicken Drumsticks", price: "259", veg: false },
          { name: "Chicken Salt n Pepper", price: "329", veg: false },
          { name: "Chicken Manchurian Dry / Gravy", price: "329", veg: false },
          { name: "Chicken Singapore Dry", price: "329", veg: false },
          { name: "Garlic Chicken Dry", price: "329", veg: false },
          { name: "Honey Chicken Chilli Dry", price: "339", veg: false },
          { name: "Fish Chilli Dry (8 Pcs)", price: "339", veg: false },
          { name: "Honey Fish Chilli Dry (8 Pcs)", price: "359", veg: false },
        ],
      },
    ],
  },
  {
    id: "rolls",
    number: "04",
    name: "Rolls",
    subtitle: "Fresh off the tawa",
    subsections: [
      {
        label: null,
        items: [
          { name: "Veg Roll", price: "79", veg: true },
          { name: "Egg Roll", price: "79", veg: false },
          { name: "Double Egg Roll", price: "99", veg: false },
          { name: "Cheese Roll", price: "119", veg: true },
          { name: "Paneer Roll", price: "129", veg: true },
          { name: "Chicken Roll", price: "139", veg: false },
          { name: "Double Cheese Roll", price: "149", veg: true },
          { name: "Paneer Egg Roll", price: "149", veg: false },
          { name: "Chicken Egg Roll", price: "159", veg: false },
          { name: "Double Egg Paneer Roll", price: "159", veg: false },
          { name: "Double Paneer Roll", price: "159", veg: true },
          { name: "Double Egg Chicken Roll", price: "169", veg: false },
          { name: "Paneer Cheese Roll", price: "169", veg: true },
          { name: "Double Chicken Roll", price: "179", veg: false },
          { name: "Dark Delight Spl Veg Roll", price: "199", veg: true, signature: true },
          { name: "Double Paneer Cheese Roll", price: "199", veg: true },
          { name: "Chicken Cheese Roll", price: "199", veg: false },
          { name: "Double Chicken Egg Roll", price: "199", veg: false },
          { name: "Dark Delight Spl Non-Veg Roll", price: "199", veg: false, signature: true },
          { name: "Double Chicken Tikka Roll", price: "209", veg: false },
          { name: "Double Egg Double Chicken Roll", price: "209", veg: false },
          { name: "Chicken Tikka Egg Roll", price: "209", veg: false },
          { name: "Chicken Tikka Roll", price: "219", veg: false },
          { name: "Chicken Tikka Double Egg Roll", price: "219", veg: false },
          { name: "Double Chicken Tikka Egg Roll", price: "229", veg: false },
          { name: "Chicken Malai Tikka Egg Roll", price: "259", veg: false },
          { name: "Chicken Malai Tikka Double Egg Roll", price: "259", veg: false },
        ],
      },
    ],
  },
  {
    id: "maggi",
    number: "05",
    name: "Maggi",
    subsections: [
      {
        label: null,
        items: [
          { name: "Veg Maggi", price: "99", veg: true },
          { name: "Egg Maggi", price: "129", veg: false },
          { name: "Cheese Maggi", price: "139", veg: true },
          { name: "Chicken Maggi", price: "139", veg: false },
          { name: "Chicken Cheese Maggi", price: "159", veg: false },
          { name: "Dark Delight Spl Veg Maggi", price: "159", veg: true, signature: true },
          { name: "Dark Delight Spl Non-Veg Maggi", price: "199", veg: false, signature: true },
        ],
      },
    ],
  },
  {
    id: "chinese-main-course",
    number: "06",
    name: "Chinese Main Course",
    subtitle: "Noodles, rice & gravies",
    subsections: [
      {
        label: "Noodles & Rice",
        items: [
          { name: "Veg Chowmein", price: "239", veg: true },
          { name: "Paneer Chowmein", price: "269", veg: true },
          { name: "Veg Garlic Chowmein", price: "259", veg: true },
          { name: "Veg Singapore Noodles", price: "239", veg: true },
          { name: "Veg Hakka Noodles", price: "239", veg: true },
          { name: "Schezwan Noodles", price: "299", veg: true },
          { name: "Veg Fried Rice", price: "239", veg: true },
          { name: "Veg Singapore Fried Rice", price: "259", veg: true },
          { name: "Veg Chilli Garlic Fried Rice", price: "269", veg: true },
          { name: "Veg Triple Schezwan Fried Rice", price: "389", veg: true },
          { name: "Paneer Fried Rice", price: "239", veg: true },
        ],
      },
      {
        label: "Gravies",
        items: [
          { name: "Veg Manchurian Gravy", price: "299", veg: true },
          { name: "Veg Chilli Gravy", price: "299", veg: true },
          { name: "Paneer Chilli Gravy", price: "319", veg: true },
          { name: "Paneer Garlic", price: "319", veg: true },
          { name: "Paneer Manchurian", price: "319", veg: true },
          { name: "Paneer Singapore", price: "349", veg: true },
          { name: "Paneer Schezwan", price: "349", veg: true },
          { name: "Paneer Ginger", price: "329", veg: true },
          { name: "Mushroom Chilli Gravy", price: "329", veg: true },
          { name: "Mushroom Hongkong", price: "349", veg: true },
          { name: "Mushroom Pepper Gravy", price: "349", veg: true },
          { name: "Soya Chilli Gravy", price: "299", veg: true },
        ],
      },
    ],
  },
  {
    id: "biryani",
    number: "07",
    name: "Biryani",
    subsections: [
      {
        label: null,
        items: [
          { name: "Veg Dum Biryani", price: "239", veg: true },
          { name: "Veg Hyderabadi Biryani", price: "249", veg: true },
          { name: "Paneer Biryani", price: "269", veg: true },
          { name: "Egg Biryani", price: "199", veg: false },
          { name: "Chicken Dum Biryani", price: "309", veg: false },
          { name: "Chicken Hyderabadi Biryani", price: "309", veg: false },
          { name: "Chicken Tikka Biryani", price: "309", veg: false },
          { name: "Mutton Biryani", price: "359", veg: false },
          { name: "Mutton Hyderabadi Biryani", price: "359", veg: false },
        ],
      },
    ],
  },
  {
    id: "egg-fish-curry",
    number: "08",
    name: "Egg & Fish Curry",
    subsections: [
      {
        label: "Egg",
        items: [
          { name: "Egg Masala Fry (4 Pcs)", price: "249", veg: false },
          { name: "Egg Curry (4 Pcs)", price: "249", veg: false },
          { name: "Egg Pagiar (4 Pcs)", price: "269", veg: false },
          { name: "Stuff Kheema Egg (4 Pcs)", price: "369", veg: false },
          { name: "Egg Bhurji (4 Pcs)", price: "249", veg: false },
        ],
      },
      {
        label: "Fish",
        items: [
          { name: "Fish Masala (4 Pcs)", price: "339", veg: false },
          { name: "Fish Curry (4 Pcs)", price: "339", veg: false },
          { name: "Fish Sarso (4 Pcs)", price: "339", veg: false },
          { name: "Bana Fish Sarso (4 Pcs)", price: "409", veg: false },
          { name: "Bana Fish Curry (4 Pcs)", price: "409", veg: false },
        ],
      },
    ],
  },
  {
    id: "rice",
    number: "09",
    name: "Rice",
    subsections: [
      {
        label: null,
        items: [
          { name: "Steam Rice (Half / Full)", price: "89 / 129", veg: true },
          { name: "Jeera Rice", price: "149", veg: true },
          { name: "Peas Pulao", price: "179", veg: true },
          { name: "Veg Pulao", price: "219", veg: true },
          { name: "Kashmiri Pulao", price: "219", veg: true },
          { name: "Dark Delight Pulao", price: "249", veg: true, signature: true },
        ],
      },
    ],
  },
  {
    id: "mughlai-paratha-breads",
    number: "10",
    name: "Mughlai Paratha & Breads",
    subsections: [
      {
        label: "Mughlai Paratha",
        items: [
          { name: "Veg Mughlai Paratha", price: "339", veg: true },
          { name: "Veg Mughlai Spl Paratha", price: "359", veg: true },
          { name: "Chicken Mughlai Paratha", price: "379", veg: false },
          { name: "Chicken Mughlai Spl Paratha", price: "399", veg: false },
        ],
      },
      {
        label: "Tandoori Breads",
        items: [
          { name: "Tandoori Roti", price: "25", veg: true },
          { name: "Tandoori Butter Roti", price: "35", veg: true },
          { name: "Plain Naan", price: "45", veg: true },
          { name: "Butter Naan", price: "55", veg: true },
          { name: "Garlic Naan", price: "79", veg: true },
          { name: "Cheese Naan", price: "99", veg: true },
          { name: "Lachha Naan", price: "49", veg: true },
          { name: "Paneer Kulcha", price: "89", veg: true },
          { name: "Onion Kulcha", price: "89", veg: true },
          { name: "Mix Kulcha", price: "79", veg: true },
        ],
      },
    ],
  },
  {
    id: "continental",
    number: "11",
    name: "Continental",
    subsections: [
      {
        label: null,
        items: [
          { name: "French Fries", price: "129", veg: true },
          { name: "French Fries Cheesy", price: "159", veg: true },
          { name: "Red Curry", price: "189", veg: true },
          { name: "Thai Rice", price: "309", veg: true },
          { name: "Red Sauce Pasta", price: "359", veg: true },
          { name: "White Sauce Pasta", price: "389", veg: true },
          { name: "Mix Cheesy Sauce Pasta", price: "399", veg: true },
          { name: "Spl Dry Fruit Pasta", price: "509", veg: true },
          { name: "Chicken Red Sauce Pasta", price: "409", veg: false },
          { name: "Chicken White Sauce Pasta", price: "419", veg: false },
          { name: "Chicken Mix Cheesy Sauce Pasta", price: "449", veg: false },
        ],
      },
    ],
  },
  {
    id: "salad-papad-raita",
    number: "12",
    name: "Salad, Papad & Raita",
    subsections: [
      {
        label: null,
        items: [
          { name: "Onion Salad", price: "49", veg: true },
          { name: "Green Salad", price: "89", veg: true },
          { name: "Fruit Salad", price: "99", veg: true },
          { name: "Cucumber Salad", price: "79", veg: true },
          { name: "Russian Salad", price: "149", veg: true },
          { name: "Papad Roasted (2 Pcs)", price: "49", veg: true },
          { name: "Papad Fry (2 Pcs)", price: "59", veg: true },
          { name: "Papad Masala (2 Pcs)", price: "79", veg: true },
          { name: "Mixed Raita", price: "99", veg: true },
          { name: "Fruit Raita", price: "119", veg: true },
          { name: "Pineapple Raita", price: "119", veg: true },
          { name: "Boondi Raita", price: "99", veg: true },
        ],
      },
    ],
  },
  {
    id: "desserts-falooda",
    number: "13",
    name: "Desserts & Falooda",
    subsections: [
      {
        label: "Ice Cream & Sweets",
        items: [
          { name: "Vanilla Ice Cream", price: "119", veg: true },
          { name: "Strawberry Ice Cream", price: "129", veg: true },
          { name: "Chocolate Ice Cream", price: "129", veg: true },
          { name: "Butter Scotch Ice Cream", price: "119", veg: true },
          { name: "Pista Badam Ice Cream", price: "119", veg: true },
          { name: "Mango Ice Cream", price: "159", veg: true },
          { name: "Royal Faluda Ice Cream", price: "149", veg: true },
          { name: "Fruit Salad with Ice Cream", price: "179", veg: true },
          { name: "Gulab Jamun with Ice Cream", price: "119", veg: true },
          { name: "Dark Delight Spl Ice Cream", price: "299", veg: true, signature: true },
          { name: "Hot Gulab Jamun", price: "119", veg: true },
          { name: "White Rasgulla", price: "89", veg: true },
        ],
      },
      {
        label: "Falooda",
        items: [
          { name: "Royal Falooda", price: "199", veg: true },
          { name: "Chocolate Falooda", price: "199", veg: true },
          { name: "Mango Falooda", price: "199", veg: true },
          { name: "Butter Falooda", price: "199", veg: true },
          { name: "Strawberry Falooda", price: "199", veg: true },
          { name: "Kesar Falooda", price: "199", veg: true },
          { name: "Dark Delight Special Falooda", price: "249", veg: true, signature: true },
        ],
      },
    ],
  },
  {
    id: "shakes",
    number: "14",
    name: "Shakes",
    subsections: [
      {
        label: null,
        items: [
          { name: "Milk Shake", price: "209", veg: true },
          { name: "Milk Badam Shake", price: "229", veg: true },
          { name: "Milk Mix Dry Fruit Shake", price: "239", veg: true },
          { name: "Butter Scotch Shake", price: "239", veg: true },
          { name: "Blueberry Vanilla Milk Shake", price: "229", veg: true },
          { name: "Kitkat Shake", price: "209", veg: true },
          { name: "Dark Chocolate Oreo Shake", price: "249", veg: true },
          { name: "Dark Chocolate Ice Cream Shake", price: "269", veg: true },
          { name: "Dark Delight Chocolate Shake", price: "209", veg: true, signature: true },
          { name: "Mango Shake", price: "209", veg: true },
          { name: "Banana Shake", price: "209", veg: true },
          { name: "Banana Dry Fruits Shake", price: "239", veg: true },
          { name: "Oats Banana Peanut Butter Shake", price: "249", veg: true },
        ],
      },
    ],
  },
  {
    id: "refreshing-drinks-mocktails",
    number: "15",
    name: "Refreshing Drinks & Mocktails",
    subsections: [
      {
        label: null,
        items: [
          { name: "Cold Drink", price: "59", veg: true },
          { name: "Masala Cold Drink", price: "69", veg: true },
          { name: "Nimbu Pani", price: "69", veg: true },
          { name: "Jaljeera", price: "69", veg: true },
          { name: "Fresh Lime Soda", price: "149", veg: true },
          { name: "The Summer Hummer", price: "149", veg: true },
          { name: "Strawberry Moon", price: "149", veg: true },
          { name: "Green Apple Mojito", price: "149", veg: true },
          { name: "Blue Lagoon", price: "149", veg: true },
          { name: "Pineapple Mojito", price: "149", veg: true },
          { name: "Orange Mojito", price: "149", veg: true },
          { name: "Blueberry Mojito", price: "149", veg: true },
        ],
      },
    ],
  },
  {
    id: "ice-tea-tea-coffee",
    number: "16",
    name: "Ice Tea, Tea & Coffee",
    subsections: [
      {
        label: "Iced Teas",
        items: [
          { name: "Lemon Ice Tea", price: "129", veg: true },
          { name: "Lemon Mint Ice Tea", price: "149", veg: true },
          { name: "Green Ice Tea", price: "129", veg: true },
          { name: "Honey Mango Tea", price: "149", veg: true },
          { name: "Long Island Ice Tea", price: "189", veg: true },
          { name: "Blue Long Ice Tea", price: "189", veg: true },
          { name: "Vanilla Grey Tea with Milk", price: "169", veg: true },
        ],
      },
      {
        label: "Tea & Coffee",
        items: [
          { name: "Regular Tea", price: "39", veg: true },
          { name: "Lemon Tea", price: "69", veg: true },
          { name: "Regular Coffee", price: "79", veg: true },
          { name: "Black Coffee", price: "69", veg: true },
          { name: "Cold Coffee", price: "149", veg: true },
          { name: "Dark Coffee", price: "149", veg: true },
        ],
      },
    ],
  },
];

/** The "Dark Delight Spl/Special" branded items, flattened, for the hero showcase. */
export const signatureItems = menu
  .flatMap((category) =>
    category.subsections.flatMap((sub) =>
      sub.items
        .filter((item) => item.signature)
        .map((item) => ({ ...item, category: category.name }))
    )
  );
