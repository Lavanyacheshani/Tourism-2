-- Drop existing tables if they exist
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS packages CASCADE;
DROP TABLE IF EXISTS destinations CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;

-- Create destinations table
CREATE TABLE destinations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 4.5,
  description TEXT,
  image TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  difficulty VARCHAR(50) DEFAULT 'Easy',
  best_time VARCHAR(100),
  duration VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT,
  image TEXT,
  author VARCHAR(100) DEFAULT 'Admin',
  category VARCHAR(100),
  tags JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  read_time VARCHAR(20) DEFAULT '5 min read',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create packages table
CREATE TABLE packages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  group_size VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  rating DECIMAL(2,1) DEFAULT 4.5,
  reviews INTEGER DEFAULT 0,
  image TEXT,
  category VARCHAR(100) NOT NULL,
  difficulty VARCHAR(50) DEFAULT 'Easy',
  highlights JSONB DEFAULT '[]'::jsonb,
  includes JSONB DEFAULT '[]'::jsonb,
  itinerary JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activities table
CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL,
  rating DECIMAL(2,1) DEFAULT 4.5,
  reviews INTEGER DEFAULT 0,
  image TEXT,
  video_background BOOLEAN DEFAULT false,
  description TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  best_time VARCHAR(100),
  difficulty VARCHAR(50) DEFAULT 'Easy',
  group_size VARCHAR(100),
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample destinations
INSERT INTO destinations (name, location, category, rating, description, image, highlights, difficulty, best_time, duration) VALUES
('Sigiriya Rock Fortress', 'Central Province', 'Cultural', 4.8, 'Ancient rock fortress and palace ruins with stunning frescoes and mirror wall', '/placeholder.svg?height=400&width=600', '["Ancient frescoes", "Mirror wall", "Water gardens", "Summit views"]'::jsonb, 'Moderate', 'Early morning', '3-4 hours'),
('Yala National Park', 'Southern Province', 'Wildlife', 4.7, 'Premier wildlife sanctuary famous for leopards, elephants, and diverse bird species', '/placeholder.svg?height=400&width=600', '["Leopard spotting", "Elephant herds", "Bird watching", "Safari experience"]'::jsonb, 'Easy', 'February to July', '6-8 hours'),
('Temple of the Tooth', 'Kandy', 'Cultural', 4.9, 'Sacred Buddhist temple housing the relic of the tooth of Buddha', '/placeholder.svg?height=400&width=600', '["Sacred tooth relic", "Traditional architecture", "Cultural ceremonies", "Historical significance"]'::jsonb, 'Easy', 'Year round', '2-3 hours'),
('Ella Nine Arches Bridge', 'Ella', 'Adventure', 4.6, 'Iconic railway bridge surrounded by lush tea plantations and mountains', '/placeholder.svg?height=400&width=600', '["Railway bridge", "Tea plantations", "Mountain views", "Train spotting"]'::jsonb, 'Easy', 'Year round', '2-3 hours'),
('Galle Fort', 'Galle', 'Cultural', 4.5, 'Historic fortified city built by Portuguese and Dutch colonizers', '/placeholder.svg?height=400&width=600', '["Colonial architecture", "Historic walls", "Lighthouse", "Museums"]'::jsonb, 'Easy', 'Year round', '3-4 hours'),
('Mirissa Beach', 'Southern Coast', 'Beach', 4.4, 'Beautiful crescent-shaped beach perfect for whale watching and surfing', '/placeholder.svg?height=400&width=600', '["Whale watching", "Surfing", "Beach relaxation", "Sunset views"]'::jsonb, 'Easy', 'November to April', 'Full day'),
('Adams Peak', 'Central Highlands', 'Adventure', 4.7, 'Sacred mountain with pilgrimage trail leading to Sri Pada footprint', '/placeholder.svg?height=400&width=600', '["Sacred footprint", "Sunrise views", "Pilgrimage trail", "Mountain climbing"]'::jsonb, 'Challenging', 'December to May', '6-8 hours'),
('Dambulla Cave Temple', 'Central Province', 'Cultural', 4.8, 'Ancient cave temple complex with Buddha statues and murals', '/placeholder.svg?height=400&width=600', '["Cave temples", "Buddha statues", "Ancient murals", "Religious significance"]'::jsonb, 'Easy', 'Year round', '2-3 hours'),
('Nuwara Eliya', 'Central Highlands', 'Nature', 4.3, 'Hill station known as Little England with tea plantations and cool climate', '/placeholder.svg?height=400&width=600', '["Tea plantations", "Cool climate", "Colonial architecture", "Lake Gregory"]'::jsonb, 'Easy', 'Year round', 'Full day');

-- Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, content, image, author, category, tags, featured, published, read_time) VALUES
('10 Must-Visit Places in Sri Lanka', 'Discover the most breathtaking destinations that showcase the beauty and culture of the Pearl of the Indian Ocean.', 'Sri Lanka, known as the Pearl of the Indian Ocean, offers an incredible diversity of experiences within its compact borders. From ancient temples to pristine beaches, here are the top 10 destinations you cannot miss.\n\n1. Sigiriya Rock Fortress - This ancient marvel rises 200 meters above the surrounding plains...\n\n2. Temple of the Tooth in Kandy - One of Buddhism''s most sacred sites...\n\n3. Yala National Park - Home to the highest density of leopards in the world...', '/placeholder.svg?height=400&width=600', 'Sarah Johnson', 'Travel Tips', '["destinations", "culture", "nature"]'::jsonb, true, true, '8 min read'),
('Budget Travel Guide to Sri Lanka', 'How to explore Sri Lanka without breaking the bank - insider tips for budget-conscious travelers.', 'Traveling to Sri Lanka on a budget is not only possible but can lead to some of the most authentic experiences. Here''s your complete guide to exploring this beautiful island nation affordably.\n\nAccommodation: Stay in guesthouses and homestays for authentic local experiences at fraction of hotel costs...\n\nTransportation: Use local buses and trains - they''re incredibly cheap and offer scenic routes...', '/placeholder.svg?height=400&width=600', 'Mike Chen', 'Budget Travel', '["budget", "tips", "backpacking"]'::jsonb, true, true, '6 min read'),
('Sri Lankan Cuisine: A Food Lover''s Paradise', 'Explore the rich flavors and spices that make Sri Lankan cuisine unique and unforgettable.', 'Sri Lankan cuisine is a delightful fusion of flavors influenced by Indian, Dutch, Portuguese, and British culinary traditions. The liberal use of spices creates dishes that are both aromatic and flavorful.\n\nRice and Curry: The staple meal consists of rice served with various curries...\n\nStreet Food: Don''t miss kottu roti, hoppers, and string hoppers...', '/placeholder.svg?height=400&width=600', 'Priya Patel', 'Food & Culture', '["food", "culture", "spices"]'::jsonb, false, true, '7 min read'),
('Best Time to Visit Sri Lanka', 'Understanding Sri Lanka''s climate and seasons to plan your perfect trip.', 'Sri Lanka''s tropical climate means it''s a year-round destination, but timing your visit can make a significant difference to your experience.\n\nWest and South Coasts: Best visited from December to March when the weather is dry and sunny...\n\nEast Coast: April to September offers the best conditions...', '/placeholder.svg?height=400&width=600', 'David Wilson', 'Travel Planning', '["weather", "seasons", "planning"]'::jsonb, false, true, '5 min read'),
('Photography Tips for Sri Lanka', 'Capture the beauty of Sri Lanka with these essential photography tips and locations.', 'Sri Lanka offers endless opportunities for stunning photography, from ancient architecture to wildlife and landscapes.\n\nGolden Hour Shots: The best light occurs during sunrise and sunset...\n\nWildlife Photography: Yala and Udawalawe national parks offer excellent opportunities...', '/placeholder.svg?height=400&width=600', 'Emma Rodriguez', 'Photography', '["photography", "tips", "landscapes"]'::jsonb, true, true, '9 min read'),
('Luxury Resorts in Sri Lanka', 'Experience the ultimate in comfort and service at these world-class luxury resorts.', 'Sri Lanka has emerged as a luxury travel destination with world-class resorts offering exceptional service and stunning locations.\n\nBeach Resorts: Amanwella and Cape Weligama offer unparalleled ocean views...\n\nHill Country: Tea plantation resorts provide a unique luxury experience...', '/placeholder.svg?height=400&width=600', 'James Thompson', 'Luxury Travel', '["luxury", "resorts", "hotels"]'::jsonb, false, true, '6 min read');

-- Insert sample packages
INSERT INTO packages (title, duration, group_size, price, original_price, rating, reviews, image, category, difficulty, highlights, includes, itinerary, featured) VALUES
('Cultural Triangle Explorer', '7 Days', '2-15 People', 899, 1199, 4.9, 156, '/placeholder.svg?height=400&width=600', 'Cultural', 'Easy', '["Sigiriya Rock Fortress", "Dambulla Cave Temple", "Polonnaruwa Ancient City", "Kandy Temple"]'::jsonb, '["Accommodation", "All Meals", "Transport", "Guide", "Entrance Fees"]'::jsonb, '["Day 1: Arrival in Colombo, transfer to Sigiriya", "Day 2: Sigiriya Rock Fortress climb", "Day 3: Dambulla Cave Temple & Polonnaruwa", "Day 4: Travel to Kandy via spice garden", "Day 5: Temple of Tooth & cultural show", "Day 6: Kandy city tour & shopping", "Day 7: Return to Colombo & departure"]'::jsonb, true),
('Wildlife & Beach Paradise', '10 Days', '2-12 People', 1299, 1599, 4.8, 203, '/placeholder.svg?height=400&width=600', 'Wildlife', 'Easy', '["Yala Safari", "Whale Watching", "Mirissa Beach", "Galle Fort"]'::jsonb, '["Luxury Hotels", "All Meals", "Safari Jeep", "Boat Tours", "Guide"]'::jsonb, '["Day 1-2: Arrival & Yala National Park Safari", "Day 3-4: Udawalawe Elephant Park", "Day 5-6: Mirissa whale watching & beach", "Day 7-8: Galle Fort & southern beaches", "Day 9-10: Colombo city tour & departure"]'::jsonb, false),
('Hill Country Adventure', '5 Days', '2-10 People', 699, 899, 4.7, 89, '/placeholder.svg?height=400&width=600', 'Adventure', 'Moderate', '["Ella Nine Arches", "Tea Plantation Tours", "Adams Peak Hike", "Train Journey"]'::jsonb, '["Mountain Hotels", "Breakfast", "Train Tickets", "Hiking Guide"]'::jsonb, '["Day 1: Colombo to Nuwara Eliya by train", "Day 2: Tea plantation tour & factory visit", "Day 3: Travel to Ella, Nine Arches Bridge", "Day 4: Adams Peak sunrise hike", "Day 5: Return journey to Colombo"]'::jsonb, false),
('Complete Sri Lanka Experience', '14 Days', '2-20 People', 1899, 2399, 4.9, 312, '/placeholder.svg?height=400&width=600', 'Complete', 'Easy', '["All Major Attractions", "Cultural Sites", "Wildlife Safari", "Beach Time"]'::jsonb, '["Premium Hotels", "All Meals", "Private Transport", "Expert Guide", "All Activities"]'::jsonb, '["Day 1-3: Cultural Triangle (Sigiriya, Dambulla, Polonnaruwa)", "Day 4-6: Kandy & hill country", "Day 7-9: Wildlife safaris (Yala & Udawalawe)", "Day 10-12: Southern beaches & Galle", "Day 13-14: Colombo & departure"]'::jsonb, true),
('Luxury Honeymoon Package', '6 Days', '2 People', 1799, 2199, 4.9, 89, '/placeholder.svg?height=400&width=600', 'Luxury', 'Easy', '["Luxury Resorts", "Private Dinners", "Spa Treatments", "Romantic Excursions"]'::jsonb, '["5-Star Hotels", "Private Transport", "Candlelit Dinners", "Couple Spa"]'::jsonb, '["Day 1-2: Luxury resort in Kandy", "Day 3-4: Hill country luxury stay", "Day 5-6: Beach resort with spa"]'::jsonb, true);

-- Insert sample activities
INSERT INTO activities (name, location, category, duration, price, rating, reviews, image, video_background, description, highlights, best_time, difficulty, group_size) VALUES
('Whale Watching in Mirissa', 'Mirissa, Southern Coast', 'Marine', '3-4 hours', 45, 4.8, 234, '/placeholder.svg?height=400&width=600', true, 'Experience the thrill of spotting blue whales, sperm whales, and dolphins in their natural habitat', '["Blue whale sightings", "Dolphin encounters", "Professional guides", "Safety equipment provided"]'::jsonb, 'November to April', 'Easy', 'Up to 30 people'),
('Surfing in Arugam Bay', 'Arugam Bay, Eastern Coast', 'Water Sports', '2-3 hours', 35, 4.9, 189, '/placeholder.svg?height=400&width=600', true, 'Ride world-class waves at one of Asia''s top surfing destinations', '["Professional instruction", "Board rental included", "All skill levels", "Perfect waves"]'::jsonb, 'May to September', 'Beginner to Advanced', 'Up to 8 people'),
('Tea Plantation Trekking', 'Ella, Hill Country', 'Trekking', '4-5 hours', 25, 4.7, 156, '/placeholder.svg?height=400&width=600', false, 'Hike through emerald tea plantations and learn about Ceylon tea production', '["Tea factory visit", "Scenic mountain views", "Local guide", "Tea tasting session"]'::jsonb, 'Year round', 'Moderate', 'Up to 12 people'),
('Wildlife Safari in Yala', 'Yala National Park', 'Wildlife', '6-8 hours', 65, 4.8, 298, '/placeholder.svg?height=400&width=600', true, 'Spot leopards, elephants, and exotic birds in Sri Lanka''s premier national park', '["Leopard spotting", "Elephant herds", "Bird watching", "Professional safari guide"]'::jsonb, 'February to July', 'Easy', 'Up to 6 people'),
('Rock Climbing at Sigiriya', 'Sigiriya, Central Province', 'Adventure', '3-4 hours', 40, 4.6, 87, '/placeholder.svg?height=400&width=600', false, 'Climb the ancient rock fortress and explore 5th-century frescoes', '["Ancient frescoes", "Summit views", "Historical significance", "Photography opportunities"]'::jsonb, 'Early morning', 'Moderate', 'Up to 15 people'),
('White Water Rafting', 'Kitulgala', 'Adventure', '4-5 hours', 55, 4.7, 134, '/placeholder.svg?height=400&width=600', true, 'Navigate thrilling rapids through lush rainforest landscapes', '["Grade 2-3 rapids", "Safety equipment", "Experienced guides", "Scenic river journey"]'::jsonb, 'May to December', 'Moderate', 'Up to 8 people'),
('Hot Air Ballooning', 'Dambulla, Central Province', 'Aerial', '3-4 hours', 180, 4.9, 67, '/placeholder.svg?height=400&width=600', false, 'Soar above ancient temples and lush landscapes at sunrise', '["Sunrise flight", "Aerial photography", "Champagne breakfast", "Certificate of flight"]'::jsonb, 'Year round', 'Easy', 'Up to 4 people'),
('Scuba Diving in Hikkaduwa', 'Hikkaduwa, Western Coast', 'Marine', '4-5 hours', 75, 4.8, 145, '/placeholder.svg?height=400&width=600', true, 'Explore vibrant coral reefs and diverse marine life', '["Coral reef exploration", "Tropical fish", "Professional instruction", "Equipment included"]'::jsonb, 'November to April', 'Beginner to Advanced', 'Up to 6 people');

-- Create indexes for better performance
CREATE INDEX idx_destinations_category ON destinations(category);
CREATE INDEX idx_destinations_published ON destinations(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_packages_published ON packages(published);
CREATE INDEX idx_packages_featured ON packages(featured);
CREATE INDEX idx_activities_published ON activities(published);
CREATE INDEX idx_activities_category ON activities(category);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON destinations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
