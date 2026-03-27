// ============================================================
// seed.js – Populate the database with sample data
// Run with: node seed.js
// ============================================================

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Listing = require('./models/Listing');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/used_items_marketplace';

const sampleUser = {
  name: 'Demo Seller',
  email: 'demo@drivedeals.com',
  password: 'demo123',
  phone: '+91 9876543210',
  location: 'Mumbai, Maharashtra'
};

const sampleListings = [
  {
    title: '2019 Maruti Suzuki Swift VXI – Single Owner',
    category: 'Car',
    brand: 'Maruti Suzuki',
    model: 'Swift VXI',
    year: 2019,
    price: 520000,
    km_driven: 38000,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    condition: 'Excellent',
    location: 'Mumbai, Maharashtra',
    description: 'Single owner car. All documents clear. Regularly serviced at authorized service center. No accident history. Excellent fuel efficiency.',
  },
  {
    title: '2020 Honda City ZX – Fully Loaded',
    category: 'Car',
    brand: 'Honda',
    model: 'City ZX',
    year: 2020,
    price: 870000,
    km_driven: 22000,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    condition: 'Excellent',
    location: 'Pune, Maharashtra',
    description: 'Top-end ZX variant with sunroof, lane watch, Honda sensing. Maintained at Honda service center. Like new condition.',
  },
  {
    title: '2018 Hyundai Creta 1.6 SX Diesel',
    category: 'Car',
    brand: 'Hyundai',
    model: 'Creta SX',
    year: 2018,
    price: 1050000,
    km_driven: 55000,
    fuel_type: 'Diesel',
    transmission: 'Manual',
    condition: 'Good',
    location: 'Delhi, Delhi',
    description: 'Powerful 1.6L diesel engine. Good fuel economy. All features working. Minor scratches on bumper. Price negotiable.',
  },
  {
    title: '2021 Royal Enfield Classic 350 – Desert Sand',
    category: 'Bike',
    brand: 'Royal Enfield',
    model: 'Classic 350',
    year: 2021,
    price: 165000,
    km_driven: 12000,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    condition: 'Excellent',
    location: 'Bangalore, Karnataka',
    description: 'Desert Sand color. New model with dual channel ABS. All accessories installed. Riding in perfect condition.',
  },
  {
    title: '2022 Honda Activa 6G – Special Edition',
    category: 'Scooter',
    brand: 'Honda',
    model: 'Activa 6G',
    year: 2022,
    price: 72000,
    km_driven: 8500,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    condition: 'Excellent',
    location: 'Chennai, Tamil Nadu',
    description: 'Special edition with OBD2. LED headlamp. Excellent mileage. Used very carefully. All documents ready.',
  },
  {
    title: '2017 Toyota Innova Crysta 2.4 GX',
    category: 'Car',
    brand: 'Toyota',
    model: 'Innova Crysta',
    year: 2017,
    price: 1450000,
    km_driven: 90000,
    fuel_type: 'Diesel',
    transmission: 'Manual',
    condition: 'Good',
    location: 'Hyderabad, Telangana',
    description: '7-seater family car. Engine freshly serviced. All electrics working. Good tyres. Used as family vehicle.',
  },
  {
    title: '2020 KTM Duke 390 – BS6',
    category: 'Bike',
    brand: 'KTM',
    model: 'Duke 390',
    year: 2020,
    price: 245000,
    km_driven: 18000,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    condition: 'Good',
    location: 'Pune, Maharashtra',
    description: 'BS6 compliant. Quick shifter and TFT display. Track inspected. No falls. All service records available.',
  },
  {
    title: '2019 Tata Nexon XZ+ Electric',
    category: 'Car',
    brand: 'Tata',
    model: 'Nexon EV',
    year: 2019,
    price: 1150000,
    km_driven: 30000,
    fuel_type: 'Electric',
    transmission: 'Automatic',
    condition: 'Good',
    location: 'Ahmedabad, Gujarat',
    description: 'Electric SUV with 300km range. Battery health 94%. Connected car features. Home charger included in price.',
  },
  {
    title: '2016 Maruti Suzuki Alto 800 LXI – First Owner',
    category: 'Car',
    brand: 'Maruti Suzuki',
    model: 'Alto 800 LXI',
    year: 2016,
    price: 230000,
    km_driven: 62000,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    condition: 'Fair',
    location: 'Nagpur, Maharashtra',
    description: 'Budget car in good running condition. CNG kit installed from factory. Great for city commute. Minor wear on interior.',
  },
  {
    title: '2021 Hero Splendor Plus – Black Chrome',
    category: 'Bike',
    brand: 'Hero',
    model: 'Splendor Plus',
    year: 2021,
    price: 58000,
    km_driven: 14000,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    condition: 'Good',
    location: 'Jaipur, Rajasthan',
    description: 'Black Chrome edition. Very fuel efficient (60+ kmpl). Regular servicing done. Good condition overall.',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Listing.deleteMany({});
    await User.deleteMany({ email: sampleUser.email });
    console.log('🗑️  Cleared old seed data');

    // Create demo user
    const user = await User.create(sampleUser);
    console.log(`👤 Created demo user: ${user.email} (password: demo123)`);

    // Create listings linked to demo user
    const listingsWithSeller = sampleListings.map(l => ({ ...l, seller: user._id }));
    const created = await Listing.insertMany(listingsWithSeller);
    console.log(`🚗 Inserted ${created.length} sample listings`);

    console.log('\n🎉 Seeding complete! Open http://localhost:3000 to see the listings.');
    console.log('📧 Demo login — Email: demo@drivedeals.com | Password: demo123');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
