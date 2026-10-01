import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const DB_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Global server secret for password hashing pepper
const SERVER_PEPPER = 'UPLANDS_GHANA_SECURE_PEPPER_2026';

function hashPassword(password: string, salt: string): string {
  return crypto
    .createHash('sha256')
    .update(`${salt}_${SERVER_PEPPER}_${password}_${salt}`)
    .digest('hex');
}

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Initial Admin Credentials (Server-Side Only, never exposed to client)
const DEFAULT_SALT = crypto.randomBytes(16).toString('hex');
const DEFAULT_PASSWORD_HASH = hashPassword('uplands2026', DEFAULT_SALT);

// Initial Database Template
function getInitialDbState() {
  return {
    admin: {
      username: 'admin',
      salt: DEFAULT_SALT,
      passwordHash: DEFAULT_PASSWORD_HASH,
      updatedAt: new Date().toISOString(),
    },
    sessions: {} as Record<string, { username: string; expiresAt: number; role: string }>,
    menu: [
      {
        id: 'banku-tilapia',
        name: 'Banku with Tilapia',
        category: 'grilled',
        categoryLabel: 'Local & Grilled Specialties',
        description: 'Hot steamed fermented corn and cassava dough dumplings served with a whole freshly char-grilled spiced Tilapia fish, freshly ground hot pepper salsa, sliced red onions, and rich Ghanaian black shito.',
        ingredients: ['Fermented Corn Dough', 'Cassava Dough', 'Fresh River Tilapia', 'Habanero Hot Pepper Salsa', 'Red Onions', 'House Shito'],
        priceGHS: 95,
        image: '/src/assets/images/food_banku_tilapia_1790612466995.jpg',
        badge: 'House Signature',
        isPopular: true,
        isAvailable: true,
        isBreakfastSpecial: false,
        displayOrder: 0,
        servingTime: '11:30 AM – 9:30 PM',
        dietaryTags: ['Pescatarian', 'Gluten-Free', 'Charcoal-Grilled'],
        options: [
          { name: 'Pepper Level', choices: ['Mild', 'Standard Hot', 'Extra Hot & Shito'] },
          { name: 'Portion Size', choices: ['Single (2 Banku)', 'Platter (3 Banku + Extra Gravy)'] },
        ],
      },
      {
        id: 'jollof-chicken',
        name: 'Jollof Rice with Fried Chicken',
        category: 'mains',
        categoryLabel: 'Rice Dishes',
        description: 'Authentic Ghanaian party Jollof rice simmered in a slow-reduced aromatic tomato and herbal broth, topped with spiced golden crispy fried chicken drumstick/thigh, garnished with fresh tomato slices and green pepper.',
        ingredients: ['Ghanaian Long-Grain Rice', 'Slow-Reduced Tomato Stew', 'Spiced Country Chicken', 'Rosemary & Ginger Marinade', 'Side Shito'],
        priceGHS: 75,
        image: '/src/assets/images/food_jollof_chicken_1790612478647.jpg',
        badge: 'Crowd Favorite',
        isPopular: true,
        isAvailable: true,
        isBreakfastSpecial: false,
        displayOrder: 1,
        servingTime: '11:00 AM – 9:30 PM',
        dietaryTags: ['Halal-Friendly', 'Party Classic'],
        options: [
          { name: 'Chicken Preparation', choices: ['Crispy Golden Fried', 'Charcoal Grilled'] },
          { name: 'Add-on Side', choices: ['None', 'Fried Ripe Plantain (+GH₵ 15)', 'Egg (+GH₵ 8)', 'Coleslaw (+GH₵ 12)'] },
        ],
      },
      {
        id: 'fried-rice-chicken',
        name: 'Fried Rice with Grilled Chicken',
        category: 'mains',
        categoryLabel: 'Rice Dishes',
        description: 'Fragrant Ghanaian style wok-tossed vegetable fried rice with sweet golden corn, tender carrots, garden peas, and scallions, served with a succulent herb-infused char-grilled chicken leg quarter and fresh cucumber ribbons.',
        ingredients: ['Fragrant Basmati Rice', 'Sweet Corn & Garden Peas', 'Carrots & Spring Onions', 'Char-Grilled Chicken Quarter', 'Spiced Pepper Sauce'],
        priceGHS: 75,
        image: '/src/assets/images/food_fried_rice_chicken_1790612494196.jpg',
        badge: "Chef's Cut",
        isPopular: true,
        isAvailable: true,
        isBreakfastSpecial: false,
        displayOrder: 2,
        servingTime: '11:00 AM – 9:30 PM',
        dietaryTags: ['Halal-Friendly', 'Charcoal-Grilled'],
        options: [
          { name: 'Chicken Style', choices: ['Herb Spiced Grilled', 'Golden Crisp Fried'] },
          { name: 'Add-on Side', choices: ['None', 'Fried Plantain (+GH₵ 15)', 'Extra Grilled Chicken Piece (+GH₵ 30)'] },
        ],
      },
      {
        id: 'attieke-tilapia',
        name: 'Attieke with Grilled Tilapia',
        category: 'grilled',
        categoryLabel: 'Local & Grilled Specialties',
        description: 'Steamed fluffy fermented cassava couscous (Attieke) paired with seasoned whole grilled Tilapia fish, topped with finely diced ripe tomatoes, sliced red onions, spicy green habaneros, and fresh lime slices.',
        ingredients: ['Steamed Cassava Couscous (Attieke)', 'Whole Grilled Marinated Tilapia', 'Diced Vine Tomatoes', 'Crisp Red Onions', 'Habanero Chilies', 'Fresh Lime'],
        priceGHS: 95,
        image: '/src/assets/images/food_attieke_tilapia_1790612506186.jpg',
        badge: 'Coastal Specialty',
        isPopular: true,
        isAvailable: true,
        isBreakfastSpecial: false,
        displayOrder: 3,
        servingTime: '11:30 AM – 9:30 PM',
        dietaryTags: ['Pescatarian', 'Gluten-Free', 'Charcoal-Grilled'],
        options: [
          { name: 'Fish Preparation', choices: ['Deep Charcoal Grilled', 'Lightly Crisped Grill'] },
          { name: 'Spice Level', choices: ['Regular Pepper & Onion Salsa', 'High Heat Chilies'] },
        ],
      },
      {
        id: 'wheat-bread',
        name: 'Wheat with Bread',
        category: 'breakfast',
        categoryLabel: 'Breakfast Specials',
        description: 'Wholesome, slow-cooked whole wheat porridge lightly sweetened and served piping hot, accompanied by freshly baked soft Ghanaian butter bread.',
        ingredients: ['Coarse Ground Whole Wheat', 'Evaporated Milk', 'Natural Cane Sugar', 'Warm Buttered Ghanaian Bread'],
        priceGHS: 35,
        image: '/src/assets/images/hero_uplands_culinary_spread_1790612455475.jpg',
        isPopular: false,
        isAvailable: true,
        isBreakfastSpecial: true,
        displayOrder: 4,
        servingTime: '7:00 AM – 11:30 AM',
        dietaryTags: ['Vegetarian', 'High-Fiber Breakfast'],
        options: [
          { name: 'Sweetness', choices: ['Sweetened with Milk', 'Unsweetened (Sugar on the side)', 'Extra Milk'] },
        ],
      },
      {
        id: 'oat-porridge',
        name: 'Oat Porridge with Bread',
        category: 'breakfast',
        categoryLabel: 'Breakfast Specials',
        description: 'Creamy, velvety rolled oats porridge cooked to smooth perfection, blended with rich milk and served steaming hot with fresh bread slices.',
        ingredients: ['Whole Rolled Oats', 'Creamy Milk', 'Cinnamon Whisper', 'Fresh Bakery Bread'],
        priceGHS: 35,
        image: '/src/assets/images/hero_uplands_culinary_spread_1790612455475.jpg',
        isPopular: false,
        isAvailable: true,
        isBreakfastSpecial: true,
        displayOrder: 5,
        servingTime: '7:00 AM – 11:30 AM',
        dietaryTags: ['Vegetarian', 'Morning Comfort'],
        options: [
          { name: 'Preparation', choices: ['Classic Sweet Milk', 'Extra Creamy', 'Side of Bread (+GH₵ 10)'] },
        ],
      },
      {
        id: 'tom-brown',
        name: 'Tom Brown with Bread',
        category: 'breakfast',
        categoryLabel: 'Breakfast Specials',
        description: 'Heritage Ghanaian breakfast staple made from roasted yellow corn, soya beans, and groundnuts, slowly simmered into a fragrant, nourishing porridge.',
        ingredients: ['Roasted Yellow Corn Flour', 'Soya Bean Meal', 'Roasted Peanuts', 'Condensed / Evaporated Milk', 'Warm Loaf Slices'],
        priceGHS: 35,
        image: '/src/assets/images/hero_uplands_culinary_spread_1790612455475.jpg',
        isPopular: true,
        isAvailable: true,
        isBreakfastSpecial: true,
        displayOrder: 6,
        servingTime: '7:00 AM – 11:30 AM',
        dietaryTags: ['Heritage Recipe', 'Nutrient-Dense'],
        options: [
          { name: 'Texture', choices: ['Smooth & Velvety', 'Thick & Hearty'] },
        ],
      },
      {
        id: 'rice-water',
        name: 'Rice Water with Bread',
        category: 'breakfast',
        categoryLabel: 'Breakfast Specials',
        description: 'Traditional comforting Ghanaian slow-boiled white rice porridge, served smooth and warm with sweetened evaporated milk and soft butter bread.',
        ingredients: ['Long Grain White Rice', 'Sweetened Condensed Milk', 'Nutmeg Touch', 'Bakery Fresh Bread'],
        priceGHS: 30,
        image: '/src/assets/images/hero_uplands_culinary_spread_1790612455475.jpg',
        isPopular: false,
        isAvailable: true,
        isBreakfastSpecial: true,
        displayOrder: 7,
        servingTime: '7:00 AM – 11:30 AM',
        dietaryTags: ['Vegetarian', 'Gluten-Free Option'],
        options: [
          { name: 'Bread Option', choices: ['Included Fresh Bread', 'Toasted Bread', 'Extra Bread (+GH₵ 10)'] },
        ],
      },
      {
        id: 'tea-bread',
        name: 'Tea with Bread & Egg',
        category: 'breakfast',
        categoryLabel: 'Breakfast Specials',
        description: 'Classic West African hot brewed tea beverage (Milo cocoa or black tea with rich condensed milk) served with fresh soft Ghanaian tea bread and butter spread.',
        ingredients: ['Rich Cocoa / Tea Brew', 'Creamy Milk', 'Freshly Baked Sugar Bread / Butter Bread', 'Table Butter'],
        priceGHS: 30,
        image: '/src/assets/images/hero_uplands_culinary_spread_1790612455475.jpg',
        isPopular: false,
        isAvailable: true,
        isBreakfastSpecial: true,
        displayOrder: 8,
        servingTime: '7:00 AM – 11:30 AM',
        dietaryTags: ['Vegetarian', 'Quick Breakfast'],
        options: [
          { name: 'Brew Choice', choices: ['Rich Cocoa / Milo', 'Black Lipton Tea with Milk', 'Coffee Brew'] },
        ],
      },
      {
        id: 'uplands-sobolo',
        name: 'Uplands Natural Sobolo Juice',
        category: 'drinks',
        categoryLabel: 'Refreshing Drinks',
        description: 'Freshly brewed chilled hibiscus flower juice infused with natural ginger, cloves, and local spices. Refreshing, antioxidant-rich, and 100% natural.',
        ingredients: ['Dried Hibiscus (Bissap)', 'Fresh Ginger Root', 'Cloves & Grains of Selim', 'Natural Pineapple Sweetening'],
        priceGHS: 25,
        image: '/src/assets/images/hero_uplands_culinary_spread_1790612455475.jpg',
        isPopular: true,
        isAvailable: true,
        isBreakfastSpecial: false,
        displayOrder: 9,
        servingTime: 'All Day',
        dietaryTags: ['Vegan', 'All-Natural', 'Cold Beverage'],
        options: [
          { name: 'Sweetness', choices: ['Natural Sweetness', 'Mild Sugar', 'Extra Ginger Kick'] },
        ],
      },
    ],
    categories: [
      { id: 'all', label: 'All Items', displayOrder: 0, description: 'View our entire kitchen catalog' },
      { id: 'grilled', label: 'Grilled Specialties', displayOrder: 1, description: 'Charcoal-grilled Tilapia, Banku, Attieke' },
      { id: 'mains', label: 'Rice Dishes', displayOrder: 2, description: 'Ghanaian Party Jollof, Fried Rice' },
      { id: 'breakfast', label: 'Breakfast Bar', displayOrder: 3, description: 'Morning porridges, Tom Brown, Wheat, Oat' },
      { id: 'drinks', label: 'Natural Drinks', displayOrder: 4, description: 'Chilled Sobolo, Tigernut & Pineapple Juices' },
    ],
    orders: [] as any[],
    enquiries: [] as any[],
    promotions: [
      {
        id: 'promo-1',
        title: 'Free Lakeside Delivery on Orders over GH₵ 250',
        code: 'LAKESIDE250',
        description: 'Enjoy free dispatch delivery straight to your doorstep across Lakeside Estate, Nsuo Anu, and surrounding areas.',
        discountPercent: 0,
        active: true,
        badgeText: 'Free Delivery',
        applicableCategory: 'all',
      },
      {
        id: 'promo-2',
        title: 'Weekend Outdoor Grill Banquet Special',
        code: 'GRILLWEEKEND',
        description: 'Book your outdoor celebration or family weekend feast with complimentary fresh shito and pepper salsa jars.',
        discountPercent: 10,
        active: true,
        badgeText: '10% Catering Off',
        applicableCategory: 'catering',
      },
    ],
    content: {
      heroHeadline: 'Authentic Taste. Hearty Portions. Lakeside Living.',
      heroTagline: 'From sizzling charcoal-grilled Tilapia and aromatic Ghanaian Party Jollof to wholesome morning porridges and bespoke outdoor catering — experience good food made with love in Nsuo Anu, Lakeside Estate.',
      heroBadgeText: 'Authentic Ghanaian Cuisine',
      announcementBarText: '🎉 Welcome to Uplands Culinary Hub — Serving fresh daily in Lakeside Estate, Nsuo Anu! Order on WhatsApp for prompt delivery.',
      announcementBarActive: true,
      announcementBarLink: '#menu',
      aboutTitle: 'Our Heritage & Kitchen Story',
      aboutStory1: 'Uplands Culinary Hub was founded in Lakeside Estate, Nsuo Anu, with a heartfelt commitment: to honor traditional Ghanaian culinary artistry through uncompromising quality, spotless hygiene, and generous hospitality.',
      aboutStory2: 'Whether serving our steaming morning bowls of roasted Tom Brown and Oats, char-grilling fresh whole Tilapia over aromatic coals, or providing full chafing banquet catering for high-profile weddings and corporate functions, our team puts culinary excellence first.',
      chefQuote: 'Good food is our love language to the Lakeside community.',
      footerTagline: 'Good Food. Great Taste. Made with Love.',
      deliveryEstimateMins: '30 – 45 mins',
    },
    settings: {
      restaurantName: 'Uplands Culinary Hub',
      phone1: '+233241131434',
      phone2: '+233554235619',
      whatsappNumber: '233241131434',
      email: 'uplandsculinaryhub@gmail.com',
      address: 'Lakeside Estate, Nsuo Anu, Accra, Ghana',
      gpsCoordinates: '5.6883° N, 0.1342° W',
      weekdayHours: '7:00 AM – 9:30 PM',
      weekendHours: '7:00 AM – 10:00 PM',
      breakfastHours: '7:00 AM – 11:30 AM',
      currency: 'GH₵',
      deliveryFeeGHS: 20,
      freeDeliveryThresholdGHS: 250,
      taxPercent: 0,
      serviceFeeGHS: 0,
      allowOnlineOrders: true,
      soundAlertsEnabled: true,
      socialLinks: {
        instagram: 'https://instagram.com/uplandsculinaryhub',
        facebook: 'https://facebook.com/uplandsculinaryhub',
        tiktok: 'https://tiktok.com/@uplandsculinaryhub',
        snapchat: 'https://snapchat.com/add/uplandsculinary',
        whatsapp: 'https://wa.me/233241131434',
      },
    },
    media: [
      {
        id: 'media-0',
        title: 'Uplands Culinary Hub Official Master Logo',
        category: 'promotional',
        url: '/uplands_official_logo.jpg',
        createdAt: '2026-03-01T10:00:00Z',
      },
      {
        id: 'media-1',
        title: 'Banku with Tilapia',
        category: 'food',
        url: '/src/assets/images/food_banku_tilapia_1790612466995.jpg',
        createdAt: '2026-03-01T10:00:00Z',
      },
      {
        id: 'media-2',
        title: 'Jollof Rice with Fried Chicken',
        category: 'food',
        url: '/src/assets/images/food_jollof_chicken_1790612478647.jpg',
        createdAt: '2026-03-01T10:00:00Z',
      },
      {
        id: 'media-3',
        title: 'Fried Rice with Grilled Chicken',
        category: 'food',
        url: '/src/assets/images/food_fried_rice_chicken_1790612494196.jpg',
        createdAt: '2026-03-01T10:00:00Z',
      },
      {
        id: 'media-4',
        title: 'Attieke with Grilled Tilapia',
        category: 'food',
        url: '/src/assets/images/food_attieke_tilapia_1790612506186.jpg',
        createdAt: '2026-03-01T10:00:00Z',
      },
      {
        id: 'media-5',
        title: 'Outdoor Catering & Live Grill Event',
        category: 'event',
        url: '/src/assets/images/catering_event_outdoor_1790612517851.jpg',
        createdAt: '2026-03-01T10:00:00Z',
      },
    ],
  };
}

// Database helper functions
let memoryDb: ReturnType<typeof getInitialDbState>;

function loadDb() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      memoryDb = JSON.parse(raw);
      return memoryDb;
    } catch (err) {
      console.error('Failed to read db.json, re-initializing', err);
    }
  }
  memoryDb = getInitialDbState();
  saveDb();
  return memoryDb;
}

function saveDb() {
  try {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(memoryDb, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Failed to save db.json', err);
  }
}

// Initialize DB
loadDb();

// Clean up expired sessions periodically
setInterval(() => {
  const now = Date.now();
  let modified = false;
  for (const [token, sess] of Object.entries(memoryDb.sessions)) {
    if (sess.expiresAt < now) {
      delete memoryDb.sessions[token];
      modified = true;
    }
  }
  if (modified) saveDb();
}, 60 * 1000);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Auth Middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.substring(7);
  const session = memoryDb.sessions[token];

  if (!session || session.expiresAt < Date.now()) {
    if (session) {
      delete memoryDb.sessions[token];
      saveDb();
    }
    return res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
  }

  // Slide expiration (30 minutes of inactivity)
  session.expiresAt = Date.now() + 30 * 60 * 1000;
  saveDb();

  (req as any).adminUser = session;
  next();
}

// -----------------------------------------------------------------------------
// API: AUTHENTICATION
// -----------------------------------------------------------------------------

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const admin = memoryDb.admin;
  if (username !== admin.username) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const computedHash = hashPassword(password, admin.salt);
  if (computedHash !== admin.passwordHash) {
    // Also accept fallback 'admin' for initial setup if not yet changed
    const fallbackHash = hashPassword('admin', admin.salt);
    if (computedHash !== fallbackHash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  }

  // Create session
  const token = generateToken();
  const expiresAt = Date.now() + 30 * 60 * 1000;
  memoryDb.sessions[token] = {
    username: admin.username,
    role: 'superadmin',
    expiresAt,
  };
  saveDb();

  res.json({
    success: true,
    token,
    user: { username: admin.username, role: 'superadmin' },
    expiresAt,
  });
});

app.get('/api/auth/session', requireAdmin, (req, res) => {
  const session = (req as any).adminUser;
  res.json({
    authenticated: true,
    user: { username: session.username, role: session.role },
    expiresAt: session.expiresAt,
  });
});

app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    delete memoryDb.sessions[token];
    saveDb();
  }
  res.json({ success: true });
});

app.post('/api/auth/change-password', requireAdmin, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters long' });
  }

  const admin = memoryDb.admin;
  const currentHash = hashPassword(currentPassword, admin.salt);
  if (currentHash !== admin.passwordHash && currentHash !== hashPassword('admin', admin.salt)) {
    return res.status(401).json({ error: 'Current password incorrect' });
  }

  const newSalt = crypto.randomBytes(16).toString('hex');
  const newHash = hashPassword(newPassword, newSalt);

  admin.salt = newSalt;
  admin.passwordHash = newHash;
  admin.updatedAt = new Date().toISOString();
  saveDb();

  res.json({ success: true, message: 'Password updated successfully' });
});

// -----------------------------------------------------------------------------
// API: STOREFRONT PUBLIC DATA
// -----------------------------------------------------------------------------

app.get('/api/store/data', (req, res) => {
  res.json({
    menu: memoryDb.menu,
    categories: memoryDb.categories,
    promotions: memoryDb.promotions,
    content: memoryDb.content,
    settings: memoryDb.settings,
    media: memoryDb.media,
  });
});

// -----------------------------------------------------------------------------
// API: ORDERS (Customer Creation & Admin Management)
// -----------------------------------------------------------------------------

app.post('/api/orders', (req, res) => {
  const { customerName, phone, email, address, deliveryTime, orderType, items, notes } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item' });
  }
  if (!phone) {
    return res.status(400).json({ error: 'Contact phone number is required' });
  }

  const id = `UCH-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();

  const formattedItems = items.map((item: any) => ({
    dishId: item.dish?.id || item.dishId,
    name: item.dish?.name || item.name,
    priceGHS: Number(item.dish?.priceGHS || item.priceGHS || 0),
    quantity: Number(item.quantity || 1),
    selectedOptions: item.selectedOptions || {},
    notes: item.notes || '',
    image: item.dish?.image || item.image || '',
  }));

  const subtotalGHS = formattedItems.reduce((acc, it) => acc + it.priceGHS * it.quantity, 0);
  const deliveryFeeGHS =
    orderType === 'delivery'
      ? subtotalGHS >= memoryDb.settings.freeDeliveryThresholdGHS
        ? 0
        : memoryDb.settings.deliveryFeeGHS
      : 0;
  const totalGHS = subtotalGHS + deliveryFeeGHS;

  const newOrder = {
    id,
    customerName: customerName || 'Valued Customer',
    phone,
    email: email || '',
    address: address || 'Lakeside Estate / Accra',
    deliveryTime: deliveryTime || 'ASAP',
    orderType: orderType || 'delivery',
    items: formattedItems,
    subtotalGHS,
    deliveryFeeGHS,
    taxGHS: 0,
    totalGHS,
    notes: notes || '',
    status: 'pending',
    createdAt: now,
    updatedAt: now,
    timeline: [{ status: 'pending', timestamp: now, note: 'Order placed by customer' }],
  };

  memoryDb.orders.unshift(newOrder);
  saveDb();

  res.status(201).json({ success: true, order: newOrder });
});

app.get('/api/orders', requireAdmin, (req, res) => {
  res.json({ orders: memoryDb.orders });
});

app.patch('/api/orders/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;

  const orderIndex = memoryDb.orders.findIndex((o) => o.id === id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const order = memoryDb.orders[orderIndex];
  const now = new Date().toISOString();

  if (status) {
    order.status = status;
    order.timeline.push({
      status,
      timestamp: now,
      note: note || `Status updated to ${status}`,
    });
  }
  order.updatedAt = now;
  saveDb();

  res.json({ success: true, order });
});

app.delete('/api/orders/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const initialLength = memoryDb.orders.length;
  memoryDb.orders = memoryDb.orders.filter((o) => o.id !== id);

  if (memoryDb.orders.length === initialLength) {
    return res.status(404).json({ error: 'Order not found' });
  }
  saveDb();
  res.json({ success: true, message: 'Order removed' });
});

// -----------------------------------------------------------------------------
// API: ENQUIRIES (Catering, Reservation, Contact)
// -----------------------------------------------------------------------------

app.post('/api/enquiries', (req, res) => {
  const {
    type,
    fullName,
    phone,
    email,
    eventDate,
    eventType,
    guestCount,
    locationArea,
    preferredServices,
    reservationTime,
    seating,
    specialRequests,
    subject,
    message,
  } = req.body;

  if (!fullName || !phone) {
    return res.status(400).json({ error: 'Name and phone number are required' });
  }

  const id = `ENQ-${Math.floor(100 + Math.random() * 900)}`;
  const now = new Date().toISOString();

  const newEnquiry = {
    id,
    type: type || 'general',
    fullName,
    phone,
    email: email || '',
    dateCreated: now,
    status: 'new',
    subject: subject || `${(type || 'General').toUpperCase()} Inquiry from ${fullName}`,
    eventDate,
    eventType,
    guestCount: guestCount ? Number(guestCount) : undefined,
    locationArea,
    preferredServices: Array.isArray(preferredServices) ? preferredServices : [],
    reservationTime,
    seating,
    specialRequests,
    message: message || '',
  };

  memoryDb.enquiries.unshift(newEnquiry);
  saveDb();

  res.status(201).json({ success: true, enquiry: newEnquiry });
});

app.get('/api/enquiries', requireAdmin, (req, res) => {
  res.json({ enquiries: memoryDb.enquiries });
});

app.patch('/api/enquiries/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const enq = memoryDb.enquiries.find((e) => e.id === id);
  if (!enq) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }

  if (status) {
    enq.status = status;
  }
  saveDb();

  res.json({ success: true, enquiry: enq });
});

app.delete('/api/enquiries/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const len = memoryDb.enquiries.length;
  memoryDb.enquiries = memoryDb.enquiries.filter((e) => e.id !== id);

  if (memoryDb.enquiries.length === len) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }
  saveDb();
  res.json({ success: true });
});

// -----------------------------------------------------------------------------
// API: MENU CRUD (Admin Protected)
// -----------------------------------------------------------------------------

app.post('/api/menu', requireAdmin, (req, res) => {
  const item = req.body;
  if (!item.name || !item.category) {
    return res.status(400).json({ error: 'Item name and category are required' });
  }

  const id = item.id || `dish-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
  const newItem = {
    ...item,
    id,
    isAvailable: item.isAvailable ?? true,
    displayOrder: memoryDb.menu.length,
  };

  memoryDb.menu.unshift(newItem);
  saveDb();

  res.status(201).json({ success: true, item: newItem });
});

app.put('/api/menu/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = memoryDb.menu.findIndex((m) => m.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Menu item not found' });
  }

  memoryDb.menu[index] = { ...memoryDb.menu[index], ...updates };
  saveDb();

  res.json({ success: true, item: memoryDb.menu[index] });
});

app.delete('/api/menu/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const initialLength = memoryDb.menu.length;
  memoryDb.menu = memoryDb.menu.filter((m) => m.id !== id);

  if (memoryDb.menu.length === initialLength) {
    return res.status(404).json({ error: 'Menu item not found' });
  }
  saveDb();
  res.json({ success: true });
});

// -----------------------------------------------------------------------------
// API: CATEGORIES, PROMOTIONS, CONTENT, SETTINGS, MEDIA
// -----------------------------------------------------------------------------

app.put('/api/categories', requireAdmin, (req, res) => {
  const { categories } = req.body;
  if (!Array.isArray(categories)) {
    return res.status(400).json({ error: 'Categories array expected' });
  }
  memoryDb.categories = categories;
  saveDb();
  res.json({ success: true, categories: memoryDb.categories });
});

app.put('/api/promotions', requireAdmin, (req, res) => {
  const { promotions } = req.body;
  if (!Array.isArray(promotions)) {
    return res.status(400).json({ error: 'Promotions array expected' });
  }
  memoryDb.promotions = promotions;
  saveDb();
  res.json({ success: true, promotions: memoryDb.promotions });
});

app.put('/api/content', requireAdmin, (req, res) => {
  memoryDb.content = { ...memoryDb.content, ...req.body };
  saveDb();
  res.json({ success: true, content: memoryDb.content });
});

app.put('/api/settings', requireAdmin, (req, res) => {
  memoryDb.settings = { ...memoryDb.settings, ...req.body };
  saveDb();
  res.json({ success: true, settings: memoryDb.settings });
});

app.post('/api/media', requireAdmin, (req, res) => {
  const { title, category, url } = req.body;
  if (!title || !url) {
    return res.status(400).json({ error: 'Title and URL are required' });
  }

  const newItem = {
    id: `media-${Date.now()}`,
    title,
    category: category || 'food',
    url,
    createdAt: new Date().toISOString(),
  };

  memoryDb.media.unshift(newItem);
  saveDb();
  res.status(201).json({ success: true, media: newItem });
});

app.delete('/api/media/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  memoryDb.media = memoryDb.media.filter((m) => m.id !== id);
  saveDb();
  res.json({ success: true });
});

// -----------------------------------------------------------------------------
// SERVER LIFECYCLE & VITE MOUNTING
// -----------------------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[UPLANDS SERVER] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[UPLANDS SERVER] Failed to start:', err);
  process.exit(1);
});
