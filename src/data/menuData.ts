import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'banku-tilapia',
    name: 'Banku with Tilapia',
    category: 'grilled',
    categoryLabel: 'Local & Grilled Specialties',
    description: 'Hot steamed fermented corn and cassava dough dumplings served with a whole freshly char-grilled spiced Tilapia fish, freshly ground hot pepper salsa, sliced red onions, and rich Ghanaian black shito.',
    ingredients: ['Fermented Corn Dough', 'Cassava Dough', 'Fresh River Tilapia', 'Habanero Hot Pepper Salsa', 'Red Onions', 'House Shito'],
    priceGHS: 95,
    image: `${import.meta.env.BASE_URL}src/assets/images/food_banku_tilapia_1790612466995.jpg`,
    badge: "House Signature",
    isPopular: true,
    servingTime: '11:30 AM – 9:30 PM',
    dietaryTags: ['Pescatarian', 'Gluten-Free', 'Charcoal-Grilled'],
    options: [
      {
        name: 'Pepper Level',
        choices: ['Mild', 'Standard Hot', 'Extra Hot & Shito']
      },
      {
        name: 'Portion Size',
        choices: ['Single (2 Banku)', 'Platter (3 Banku + Extra Gravy)']
      }
    ]
  },
  {
    id: 'jollof-chicken',
    name: 'Jollof Rice with Fried Chicken',
    category: 'mains',
    categoryLabel: 'Rice Dishes',
    description: 'Authentic Ghanaian party Jollof rice simmered in a slow-reduced aromatic tomato and herbal broth, topped with spiced golden crispy fried chicken drumstick/thigh, garnished with fresh tomato slices and green pepper.',
    ingredients: ['Ghanaian Long-Grain Rice', 'Slow-Reduced Tomato Stew', 'Spiced Country Chicken', 'Rosemary & Ginger Marinade', 'Side Shito'],
    priceGHS: 75,
    image: `${import.meta.env.BASE_URL}src/assets/images/food_jollof_chicken_1790612478647.jpg`,
    badge: "Crowd Favorite",
    isPopular: true,
    servingTime: '11:00 AM – 9:30 PM',
    dietaryTags: ['Halal-Friendly', 'Party Classic'],
    options: [
      {
        name: 'Chicken Preparation',
        choices: ['Crispy Golden Fried', 'Charcoal Grilled']
      },
      {
        name: 'Add-on Side',
        choices: ['None', 'Fried Ripe Plantain (+GH₵ 15)', 'Egg (+GH₵ 8)', 'Coleslaw (+GH₵ 12)']
      }
    ]
  },
  {
    id: 'fried-rice-chicken',
    name: 'Fried Rice with Grilled Chicken',
    category: 'mains',
    categoryLabel: 'Rice Dishes',
    description: 'Fragrant Ghanaian style wok-tossed vegetable fried rice with sweet golden corn, tender carrots, garden peas, and scallions, served with a succulent herb-infused char-grilled chicken leg quarter and fresh cucumber ribbons.',
    ingredients: ['Fragrant Basmati Rice', 'Sweet Corn & Garden Peas', 'Carrots & Spring Onions', 'Char-Grilled Chicken Quarter', 'Spiced Pepper Sauce'],
    priceGHS: 75,
    image: `${import.meta.env.BASE_URL}src/assets/images/food_fried_rice_chicken_1790612494196.jpg`,
    badge: "Chef's Cut",
    isPopular: true,
    servingTime: '11:00 AM – 9:30 PM',
    dietaryTags: ['Halal-Friendly', 'Charcoal-Grilled'],
    options: [
      {
        name: 'Chicken Style',
        choices: ['Herb Spiced Grilled', 'Golden Crisp Fried']
      },
      {
        name: 'Add-on Side',
        choices: ['None', 'Fried Plantain (+GH₵ 15)', 'Extra Grilled Chicken Piece (+GH₵ 30)']
      }
    ]
  },
  {
    id: 'attieke-tilapia',
    name: 'Attieke with Grilled Tilapia',
    category: 'grilled',
    categoryLabel: 'Local & Grilled Specialties',
    description: 'Steamed fluffy fermented cassava couscous (Attieke) paired with seasoned whole grilled Tilapia fish, topped with finely diced ripe tomatoes, sliced red onions, spicy green habaneros, and fresh lime slices.',
    ingredients: ['Steamed Cassava Couscous (Attieke)', 'Whole Grilled Marinated Tilapia', 'Diced Vine Tomatoes', 'Crisp Red Onions', 'Habanero Chilies', 'Fresh Lime'],
    priceGHS: 95,
    image: `${import.meta.env.BASE_URL}src/assets/images/food_attieke_tilapia_1790612506186.jpg`,
    badge: "Coastal Specialty",
    isPopular: true,
    servingTime: '11:30 AM – 9:30 PM',
    dietaryTags: ['Pescatarian', 'Gluten-Free', 'Charcoal-Grilled'],
    options: [
      {
        name: 'Fish Preparation',
        choices: ['Deep Charcoal Grilled', 'Lightly Crisped Grill']
      },
      {
        name: 'Spice Level',
        choices: ['Regular Pepper & Onion Salsa', 'High Heat Chilies']
      }
    ]
  },
  {
    id: 'wheat-bread',
    name: 'Wheat with Bread',
    category: 'breakfast',
    categoryLabel: 'Breakfast Specials',
    description: 'Wholesome, slow-cooked whole wheat porridge lightly sweetened and served piping hot, accompanied by freshly baked soft Ghanaian butter bread.',
    ingredients: ['Coarse Ground Whole Wheat', 'Evaporated Milk', 'Natural Cane Sugar', 'Warm Buttered Ghanaian Bread'],
    priceGHS: 35,
    image: `${import.meta.env.BASE_URL}src/assets/images/hero_uplands_culinary_spread_1790612455475.jpg`,
    servingTime: '7:00 AM – 11:30 AM',
    dietaryTags: ['Vegetarian', 'High-Fiber Breakfast'],
    options: [
      {
        name: 'Sweetness',
        choices: ['Sweetened with Milk', 'Unsweetened (Sugar on the side)', 'Extra Milk']
      }
    ]
  },
  {
    id: 'oat-porridge',
    name: 'Oat Porridge',
    category: 'breakfast',
    categoryLabel: 'Breakfast Specials',
    description: 'Creamy, velvety rolled oats porridge cooked to smooth perfection, blended with rich milk and served steaming hot with fresh bread slices.',
    ingredients: ['Whole Rolled Oats', 'Creamy Milk', 'Cinnamon Whisper', 'Fresh Bakery Bread'],
    priceGHS: 35,
    image: `${import.meta.env.BASE_URL}src/assets/images/hero_uplands_culinary_spread_1790612455475.jpg`,
    servingTime: '7:00 AM – 11:30 AM',
    dietaryTags: ['Vegetarian', 'Morning Comfort'],
    options: [
      {
        name: 'Preparation',
        choices: ['Classic Sweet Milk', 'Extra Creamy', 'Side of Bread (+GH₵ 10)']
      }
    ]
  },
  {
    id: 'tom-brown',
    name: 'Tom Brown',
    category: 'breakfast',
    categoryLabel: 'Breakfast Specials',
    description: 'Heritage Ghanaian breakfast staple made from roasted yellow corn, soya beans, and groundnuts, slowly simmered into a fragrant, nourishing porridge.',
    ingredients: ['Roasted Yellow Corn Flour', 'Soya Bean Meal', 'Roasted Peanuts', 'Condensed / Evaporated Milk', 'Warm Loaf Slices'],
    priceGHS: 35,
    image: `${import.meta.env.BASE_URL}src/assets/images/hero_uplands_culinary_spread_1790612455475.jpg`,
    servingTime: '7:00 AM – 11:30 AM',
    dietaryTags: ['Heritage Recipe', 'Nutrient-Dense'],
    options: [
      {
        name: 'Texture',
        choices: ['Smooth & Velvety', 'Thick & Hearty']
      }
    ]
  },
  {
    id: 'rice-water',
    name: 'Rice Water',
    category: 'breakfast',
    categoryLabel: 'Breakfast Specials',
    description: 'Traditional comforting Ghanaian slow-boiled white rice porridge, served smooth and warm with sweetened evaporated milk and soft butter bread.',
    ingredients: ['Long Grain White Rice', 'Sweetened Condensed Milk', 'Nutmeg Touch', 'Bakery Fresh Bread'],
    priceGHS: 30,
    image: `${import.meta.env.BASE_URL}src/assets/images/hero_uplands_culinary_spread_1790612455475.jpg`,
    servingTime: '7:00 AM – 11:30 AM',
    dietaryTags: ['Vegetarian', 'Gluten-Free Option'],
    options: [
      {
        name: 'Bread Option',
        choices: ['Included Fresh Bread', 'Toasted Bread', 'Extra Bread (+GH₵ 10)']
      }
    ]
  },
  {
    id: 'tea-bread',
    name: 'Tea with Bread',
    category: 'breakfast',
    categoryLabel: 'Breakfast Specials',
    description: 'Classic West African hot brewed tea beverage (Milo cocoa or black tea with rich condensed milk) served with fresh soft Ghanaian tea bread and butter spread.',
    ingredients: ['Rich Cocoa / Tea Brew', 'Creamy Milk', 'Freshly Baked Sugar Bread / Butter Bread', 'Table Butter'],
    priceGHS: 30,
    image: `${import.meta.env.BASE_URL}src/assets/images/hero_uplands_culinary_spread_1790612455475.jpg`,
    servingTime: '7:00 AM – 11:30 AM',
    dietaryTags: ['Vegetarian', 'Quick Breakfast'],
    options: [
      {
        name: 'Brew Choice',
        choices: ['Rich Cocoa / Milo', 'Black Lipton Tea with Milk', 'Coffee Brew']
      }
    ]
  }
];

export const CATERING_PACKAGES = [
  {
    id: 'outdoor-banquet',
    title: 'Outdoor & Celebration Catering',
    description: 'Full-service live chafing buffet and live charcoal grilling for weddings, birthdays, family celebrations, and outdoor gatherings in Lakeside Estate and Greater Accra.',
    features: [
      'Live grill station with fresh Tilapia and Chicken',
      'Full setup with decorative chafing dishes and warmers',
      'Assortment of Party Jollof, Fried Rice, Banku & Attieke',
      'Professional on-site culinary and serving crew',
      'Flexible packaging (Individual pack boxes or open buffet)'
    ],
    idealFor: '50 to 500+ Guests',
    priceEstimate: 'Custom menu quotes tailored to your guest count'
  },
  {
    id: 'corporate-executive',
    title: 'Corporate Lunches & Office Catering',
    description: 'Punctual, individually packaged hot meals delivered fresh to corporate offices, executive meetings, training workshops, and seminars.',
    features: [
      'Eco-friendly thermal insulated meal pack boxes',
      'Customizable protein choices per executive',
      'Breakfast porridge boxes (Tom Brown, Oat, Wheat) for morning sessions',
      'Scheduled recurring corporate contracts available',
      'Invoice & receipt support for company accounts'
    ],
    idealFor: '15 to 200+ Executives',
    priceEstimate: 'Volume-based corporate meal pricing'
  },
  {
    id: 'private-dinner',
    title: 'Private Home & Estate Dinners',
    description: 'Intimate bespoke dining prepared or delivered hot to private residences in Lakeside Estate, Ashaley Botwe, and surrounding residential communities.',
    features: [
      'Curated Ghanaian family-style feast spreads',
      'Freshly prepared just prior to your specified service time',
      'Special requests accommodated (dietary preferences, spice levels)',
      'Direct WhatsApp concierge coordinator'
    ],
    idealFor: '10 to 40 Guests',
    priceEstimate: 'Bespoke menu pricing'
  }
];
