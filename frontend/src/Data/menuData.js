export const MENU_ITEMS = [
  // DRINKS - ESPRESSO & COFFEE ROASTS
  {
    id: "d1",
    name: "Golden Caramel Macchiato",
    category: "drinks",
    isNew: false,
    isPopular: true,
    price: 249,
    description:
      "Rich house espresso combined with Madagascar vanilla syrup, velvet steamed milk, and a golden caramel drizzle.",
    image:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80",
    tags: ["Hot/Iced", "Bestseller"],
    dietary: ["Oat Milk Available"],
  },
  {
    id: "d2",
    name: "Ember Dark Velvet Mocha",
    category: "drinks",
    isNew: false,
    isPopular: true,
    price: 279,
    description:
      "Rich dark cocoa blended with double-shot espresso, velvet steamed milk, and dark chocolate curls.",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80",
    tags: ["Hot/Iced", "Bestseller"],
    dietary: ["Vegan Option"],
  },
  {
    id: "d3",
    name: "Artisanal Vanilla Cold Brew",
    category: "drinks",
    isNew: false,
    isPopular: true,
    price: 229,
    description:
      "Slow-steeped for 20 hours, infused with Madagascar vanilla bean and smooth cream over ice.",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
    tags: ["Iced", "Popular"],
    dietary: ["Low Sugar Option"],
  },
  {
    id: "d4",
    name: "Kyoto Nitro Cold Draft",
    category: "drinks",
    isNew: false,
    isPopular: false,
    price: 269,
    description:
      "Infused with nitrogen for a naturally sweet flavor and cascading velvety micro-foam crema head.",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80",
    tags: ["Iced", "Draft Roast"],
    dietary: ["Zero Sugar"],
  },
  {
    id: "d5",
    name: "Ceremonial Oat Matcha Cloud",
    category: "drinks",
    isNew: true,
    isPopular: true,
    price: 299,
    description:
      "First-harvest Uji Japanese green tea whisked with silky oat milk and cold sweet cream foam.",
    image:
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80",
    tags: ["Hot/Iced", "New"],
    dietary: ["Vegan", "Dairy Free"],
  },
  {
    id: "d6",
    name: "Classic Cappuccino Roast",
    category: "drinks",
    isNew: false,
    isPopular: false,
    price: 199,
    description:
      "Equal parts deep house espresso brew, hot steamed milk, and thick foam cushion.",
    image:
      "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80",
    tags: ["Hot", "Classic"],
    dietary: ["Nut Free"],
  },
  {
    id: "d7",
    name: "Hazelnut Praline Espresso",
    category: "drinks",
    isNew: false,
    isPopular: true,
    price: 259,
    description:
      "Double espresso shot layered with toasted hazelnut syrup, oat milk, and crushed praline dust.",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    tags: ["Hot/Iced", "Popular"],
    dietary: ["Contains Nuts"],
  },
  {
    id: "d8",
    name: "Spanish Cream Iced Latte",
    category: "drinks",
    isNew: false,
    isPopular: true,
    price: 289,
    description:
      "Espresso combined with sweetened condensed milk and cold whole milk over cubed crystal ice.",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    tags: ["Iced", "Bestseller"],
    dietary: ["Sweet Craving"],
  },
  {
    id: "d9",
    name: "Cinnamon Spiced Cortado",
    category: "drinks",
    isNew: false,
    isPopular: false,
    price: 219,
    description:
      "Equal parts intense dark roast espresso and warm textured milk dusted with Korintje cinnamon.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn7qaakLSeK4x_eSzRn15CR9H279nySJKOEvBeXGp1fw&s",
    tags: ["Hot", "Bold Brew"],
    dietary: ["Gluten Free"],
  },
  {
    id: "d10",
    name: "Salted Caramel Iced Frappe",
    category: "drinks",
    isNew: false,
    isPopular: true,
    price: 279,
    description:
      "Blended ice espresso shake layered with sea salt caramel and topped with fresh whipped cream.",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    tags: ["Blended Iced", "Popular"],
    dietary: ["Vegetarian"],
  },
  {
    id: "d11",
    name: "Double Shot Flat White",
    category: "drinks",
    isNew: true,
    isPopular: true,
    price: 219,
    description:
      "Double ristretto espresso shot poured with silky micro-foamed milk for a velvety coffee texture.",
    image:
      "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80",
    tags: ["Hot", "Espresso Special"],
    dietary: ["Nut Free"],
  },
  {
    id: "d12",
    name: "Irish Cream Velvet Cold Brew",
    category: "drinks",
    isNew: true,
    isPopular: false,
    price: 249,
    description:
      "20-hour cold brew infused with non-alcoholic Irish cream syrup and vanilla sweet cold foam.",
    image:
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
    tags: ["Iced", "Cold Brew"],
    dietary: ["Low Calorie"],
  },
  {
    id: "d13",
    name: "Vietnamese Drip Iced Coffee",
    category: "drinks",
    isNew: true,
    isPopular: true,
    price: 239,
    description:
      "Traditional slow-drip Robusta roast stirred with sweet condensed milk over crushed ice.",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    tags: ["Iced", "Bold Roast"],
    dietary: ["Sweet Craving"],
  },
  {
    id: "d14",
    name: "Iced Brown Sugar Oat Shaken Espresso",
    category: "drinks",
    isNew: true,
    isPopular: true,
    price: 289,
    description:
      "Double espresso shaken with brown sugar and cinnamon over ice, topped with creamy oat milk.",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
    tags: ["Iced", "Bestseller"],
    dietary: ["Vegan", "Dairy Free"],
  },
  {
    id: "d15",
    name: "Single-Origin Ethiopian Pour-Over",
    category: "drinks",
    isNew: false,
    isPopular: false,
    price: 279,
    description:
      "Artisanal hand pour-over coffee featuring floral jasmine, wild blueberry, and citrus bergamot notes.",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    tags: ["Hot", "Single Origin"],
    dietary: ["Zero Sugar", "Black Coffee"],
  },
  {
    id: "d16",
    name: "Affogato Gelato Espresso",
    category: "drinks",
    isNew: true,
    isPopular: true,
    price: 229,
    description:
      "Scoop of creamy Madagascar vanilla bean gelato drowned in a piping hot double shot of dark espresso.",
    image:
      "https://images.unsplash.com/photo-1592663527359-cf6642f54cff?auto=format&fit=crop&w=600&q=80",
    tags: ["Dessert Coffee", "Popular"],
    dietary: ["Vegetarian"],
  },

  // FOOD & BAKERY
  {
    id: "f1",
    name: "Flaky Butter Croissant",
    category: "food",
    isNew: false,
    isPopular: true,
    price: 179,
    description:
      "Authentic French recipe baked fresh daily with 84% European cultured butter.",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    tags: ["Fresh Baked", "Bestseller"],
    dietary: ["Vegetarian"],
  },
  {
    id: "f2",
    name: "Avocado Poached Egg Sourdough",
    category: "food",
    isNew: true,
    isPopular: true,
    price: 349,
    description:
      "Hass avocado smash, organic poached farm egg, chili flakes, and hemp seeds on toasted sourdough.",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
    tags: ["Hot Breakfast", "Chef Special"],
    dietary: ["Vegetarian"],
  },
  {
    id: "f3",
    name: "Warm Cinnamon Brown Sugar Roll",
    category: "food",
    isNew: false,
    isPopular: true,
    price: 199,
    description:
      "Soft brioche yeast dough filled with Korintje cinnamon and drizzled with cream cheese frosting.",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    tags: ["Sweet", "Bakery Favorite"],
    dietary: ["Vegetarian"],
  },
  {
    id: "f4",
    name: "Smoked Turkey & Gruyere Panini",
    category: "food",
    isNew: false,
    isPopular: false,
    price: 399,
    description:
      "Hickory smoked turkey breast, aged Gruyere cheese, caramelized onions & honey mustard melt.",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    tags: ["Hot Lunch"],
    dietary: ["High Protein"],
  },
  {
    id: "f5",
    name: "Belgian Dark Chocolate Chip Muffin",
    category: "food",
    isNew: false,
    isPopular: true,
    price: 169,
    description:
      "Moist bakery muffin packed with 70% dark Belgian chocolate chunks and cocoa nib crust.",
    image:
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=600&q=80",
    tags: ["Fresh Baked"],
    dietary: ["Vegetarian"],
  },
  {
    id: "f6",
    name: "Truffle Wild Mushroom Toastie",
    category: "food",
    isNew: true,
    isPopular: false,
    price: 329,
    description:
      "Sautéed wild mushrooms, white truffle oil, melted fontina cheese on artisanal sourdough.",
    image:
      "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80",
    tags: ["Hot Toastie", "New"],
    dietary: ["Vegetarian"],
  },
  {
    id: "f7",
    name: "Almond Blueberry Danish Pastry",
    category: "food",
    isNew: false,
    isPopular: false,
    price: 189,
    description:
      "Flaky puff pastry filled with wild blueberry compote and toasted frangipane almond cream.",
    image:
      "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80",
    tags: ["Pastry"],
    dietary: ["Contains Nuts"],
  },

  // NEW SEASONAL SPECIALS
  {
    id: "n1",
    name: "Honey Roasted Pistachio Latte",
    category: "new-drinks",
    isNew: true,
    isPopular: true,
    price: 299,
    description:
      "Real wild honey infused with roasted Mediterranean pistachio syrup, espresso, and steamed milk.",
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80",
    tags: ["Seasonal", "New Drink"],
    dietary: ["Contains Nuts"],
  },
  {
    id: "n2",
    name: "Spiced Cinnamon Cold Cloud Brew",
    category: "new-drinks",
    isNew: true,
    isPopular: false,
    price: 269,
    description:
      "Signature cold brew topped with cinnamon spiced sweet cream cold foam and nutmeg dust.",
    image:
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
    tags: ["Seasonal", "New Drink"],
    dietary: ["Gluten Free"],
  },
  {
    id: "n3",
    name: "Wild Berry Hibiscus Espresso Tonic",
    category: "new-drinks",
    isNew: true,
    isPopular: false,
    price: 259,
    description:
      "Sparkling botanical tonic water layered with wild berry hibiscus tea syrup and espresso shot.",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    tags: ["Seasonal", "Refreshing"],
    dietary: ["Vegan", "Zero Dairy"],
  },
  {
    id: "n4",
    name: "Salted Maple Pecan Latte",
    category: "new-drinks",
    isNew: true,
    isPopular: true,
    price: 289,
    description:
      "Pure Canadian maple syrup infused with toasted pecan praline, espresso, and warm oat milk.",
    image:
      "https://images.unsplash.com/photo-1579887829663-67706e62e6ac?auto=format&fit=crop&w=600&q=80",
    tags: ["Seasonal", "Chef Pick"],
    dietary: ["Vegan Available"],
  },
  {
    id: "n5",
    name: "Iced Tiramisu Cream Latte",
    category: "new-drinks",
    isNew: true,
    isPopular: true,
    price: 299,
    description:
      "Double shot espresso combined with mascarpone sweet cream, ladyfinger syrup, and Dutch cocoa dust.",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80",
    tags: ["Seasonal", "New Drink"],
    dietary: ["Sweet Treat"],
  },
];
