-- Drop existing tables if they exist (be careful in production!)
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS packages CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS destinations CASCADE;

-- Create destinations table
CREATE TABLE destinations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 4.5,
  description TEXT,
  image TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  difficulty TEXT DEFAULT 'Easy',
  best_time TEXT,
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image TEXT,
  author TEXT DEFAULT 'Admin',
  category TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  read_time TEXT DEFAULT '5 min read',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create packages table
CREATE TABLE packages (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  group_size TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  rating DECIMAL(2,1) DEFAULT 4.5,
  reviews INTEGER DEFAULT 0,
  image TEXT,
  category TEXT NOT NULL,
  difficulty TEXT DEFAULT 'Easy',
  highlights JSONB DEFAULT '[]'::jsonb,
  includes JSONB DEFAULT '[]'::jsonb,
  itinerary JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activities table
CREATE TABLE activities (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  duration TEXT NOT NULL,
  price INTEGER NOT NULL,
  rating DECIMAL(2,1) DEFAULT 4.5,
  reviews INTEGER DEFAULT 0,
  image TEXT,
  video_background BOOLEAN DEFAULT FALSE,
  description TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  best_time TEXT,
  difficulty TEXT DEFAULT 'Easy',
  group_size TEXT NOT NULL,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_destinations_updated_at
    BEFORE UPDATE ON destinations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packages_updated_at
    BEFORE UPDATE ON packages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at
    BEFORE UPDATE ON activities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample destinations
INSERT INTO destinations (name, location, category, rating, description, image, highlights, difficulty, best_time, duration) VALUES
('Sigiriya Rock Fortress', 'Central Province', 'Cultural', 4.9, 'Ancient rock fortress and palace ruins with stunning frescoes and gardens', '/placeholder.svg?height=400&width=600', '["Ancient frescoes", "Mirror wall", "Water gardens", "Summit views"]'::jsonb, 'Moderate', 'Early morning', '3-4 hours'),
('Yala National Park', 'Southern Province', 'Wildlife', 4.8, 'Premier wildlife destination famous for leopards and diverse ecosystems', '/placeholder.svg?height=400&width=600', '["Leopard spotting", "Elephant herds", "Bird watching", "Scenic landscapes"]'::jsonb, 'Easy', 'Early morning/Evening', 'Half/Full day'),
('Ella Nine Arches Bridge', 'Uva Province', 'Adventure', 4.7, 'Iconic railway bridge surrounded by lush tea plantations', '/placeholder.svg?height=400&width=600', '["Train spotting", "Tea plantations", "Hiking trails", "Photography"]'::jsonb, 'Easy', 'Morning/Afternoon', '2-3 hours'),
('Mirissa Beach', 'Southern Coast', 'Beach', 4.8, 'Perfect crescent-shaped beach ideal for whale watching and surfing', '/placeholder.svg?height=400&width=600', '["Whale watching", "Surfing", "Beach relaxation", "Sunset views"]'::jsonb, 'Easy', 'Year round', 'Full day'),
('Temple of the Tooth', 'Kandy', 'Cultural', 4.9, 'Sacred Buddhist temple housing the relic of Buddha''s tooth', '/placeholder.svg?height=400&width=600', '["Sacred relic", "Traditional architecture", "Cultural ceremonies", "Lake views"]'::jsonb, 'Easy', 'Morning/Evening', '2-3 hours'),
('Adam''s Peak', 'Central Highlands', 'Adventure', 4.6, 'Sacred mountain peak with breathtaking sunrise views', '/placeholder.svg?height=400&width=600', '["Sunrise views", "Pilgrimage site", "Mountain hiking", "Sacred footprint"]'::jsonb, 'Challenging', 'December-May', '6-8 hours'),
('Galle Fort', 'Southern Coast', 'Cultural', 4.7, 'Historic Dutch colonial fort with charming streets and ocean views', '/placeholder.svg?height=400&width=600', '["Colonial architecture", "Rampart walk", "Lighthouse", "Art galleries"]'::jsonb, 'Easy', 'Afternoon/Evening', '3-4 hours'),
('Nuwara Eliya', 'Central Highlands', 'Adventure', 4.5, 'Hill station known as "Little England" with tea plantations and cool climate', '/placeholder.svg?height=400&width=600', '["Tea factories", "Colonial architecture", "Lake Gregory", "Strawberry farms"]'::jsonb, 'Easy', 'Year round', '1-2 days'),
('Arugam Bay', 'Eastern Coast', 'Beach', 4.6, 'World-renowned surfing destination with pristine beaches', '/placeholder.svg?height=400&width=600', '["World-class surfing", "Beach relaxation", "Lagoon tours", "Wildlife spotting"]'::jsonb, 'Easy', 'May-September', '1-3 days');

-- Insert sample packages
INSERT INTO packages (title, duration, group_size, price, original_price, rating, reviews, image, category, difficulty, highlights, includes, itinerary, featured) VALUES
('Cultural Triangle Explorer', '7 Days', '2-15 People', 899, 1199, 4.9, 156, '/placeholder.svg?height=400&width=600', 'Cultural', 'Easy', 
'["Sigiriya Rock Fortress", "Dambulla Cave Temple", "Polonnaruwa Ancient City", "Kandy Temple"]'::jsonb, 
'["Accommodation", "All Meals", "Transport", "Guide", "Entrance Fees"]'::jsonb,
'["Day 1: Arrival in Colombo, transfer to Sigiriya", "Day 2: Sigiriya Rock Fortress climb", "Day 3: Dambulla Cave Temple & Polonnaruwa", "Day 4: Travel to Kandy via spice garden", "Day 5: Temple of Tooth & cultural show", "Day 6: Kandy city tour & shopping", "Day 7: Return to Colombo & departure"]'::jsonb, true),

('Wildlife & Beach Paradise', '10 Days', '2-12 People', 1299, 1599, 4.8, 203, '/placeholder.svg?height=400&width=600', 'Wildlife', 'Easy',
'["Yala Safari", "Whale Watching", "Mirissa Beach", "Galle Fort"]'::jsonb,
'["Luxury Hotels", "All Meals", "Safari Jeep", "Boat Tours", "Guide"]'::jsonb,
'["Day 1-2: Arrival & Yala National Park Safari", "Day 3-4: Udawalawe Elephant Park", "Day 5-6: Mirissa whale watching & beach", "Day 7-8: Galle Fort & southern beaches", "Day 9-10: Colombo city tour & departure"]'::jsonb, false),

('Hill Country Adventure', '5 Days', '2-10 People', 699, 899, 4.7, 89, '/placeholder.svg?height=400&width=600', 'Adventure', 'Moderate',
'["Ella Nine Arches", "Tea Plantation Tours", "Adams Peak Hike", "Train Journey"]'::jsonb,
'["Mountain Hotels", "Breakfast", "Train Tickets", "Hiking Guide"]'::jsonb,
'["Day 1: Colombo to Nuwara Eliya by train", "Day 2: Tea plantation tour & factory visit", "Day 3: Travel to Ella, Nine Arches Bridge", "Day 4: Adams Peak sunrise hike", "Day 5: Return journey to Colombo"]'::jsonb, false),

('Complete Sri Lanka Experience', '14 Days', '2-20 People', 1899, 2399, 4.9, 312, '/placeholder.svg?height=400&width=600', 'Complete', 'Easy',
'["All Major Attractions", "Cultural Sites", "Wildlife Safari", "Beach Time"]'::jsonb,
'["Premium Hotels", "All Meals", "Private Transport", "Expert Guide", "All Activities"]'::jsonb,
'["Day 1-3: Cultural Triangle (Sigiriya, Dambulla, Polonnaruwa)", "Day 4-6: Kandy & hill country", "Day 7-9: Wildlife safaris (Yala & Udawalawe)", "Day 10-12: Southern beaches & Galle", "Day 13-14: Colombo & departure"]'::jsonb, true),

('Luxury Honeymoon Package', '6 Days', '2 People', 1799, 2199, 4.9, 89, '/placeholder.svg?height=400&width=600', 'Luxury', 'Easy',
'["Luxury Resorts", "Private Dinners", "Spa Treatments", "Romantic Excursions"]'::jsonb,
'["5-Star Hotels", "Private Transport", "Candlelit Dinners", "Couple Spa"]'::jsonb,
'["Day 1-2: Luxury resort in Kandy", "Day 3-4: Hill country luxury stay", "Day 5-6: Beach resort with spa"]'::jsonb, true);

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

-- Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, content, image, author, category, tags, featured, published, read_time) VALUES
('10 Hidden Gems in Sri Lanka You Must Visit', 'Discover the lesser-known treasures of Sri Lanka that will take your breath away. From secret beaches to ancient ruins...', 'Sri Lanka is full of incredible destinations that most tourists never discover. Here are 10 hidden gems that will make your trip truly special...', '/placeholder.svg?height=400&width=600', 'Samantha Silva', 'Travel Tips', '["Hidden Gems", "Adventure", "Culture"]'::jsonb, true, true, '8 min read'),
('Budget Travel Guide: Sri Lanka Under $50 a Day', 'Learn how to explore Sri Lanka on a shoestring budget without compromising on experiences...', 'Traveling Sri Lanka doesn''t have to break the bank. With careful planning and local knowledge, you can have an amazing experience for under $50 per day...', '/placeholder.svg?height=400&width=600', 'Rajesh Perera', 'Budget Travel', '["Budget", "Backpacking", "Tips"]'::jsonb, false, true, '12 min read'),
('The Ultimate Sri Lankan Food Guide', 'From spicy curries to sweet treats, explore the incredible flavors of Sri Lankan cuisine...', 'Sri Lankan cuisine is a delightful fusion of flavors influenced by Indian, Dutch, Portuguese, and British culinary traditions...', '/placeholder.svg?height=400&width=600', 'Priya Jayawardena', 'Food & Culture', '["Food", "Culture", "Local Cuisine"]'::jsonb, true, true, '10 min read'),
('Best Time to Visit Sri Lanka: A Month-by-Month Guide', 'Plan your perfect Sri Lankan adventure with our comprehensive weather and seasonal guide...', 'Sri Lanka''s tropical climate means it''s a year-round destination, but timing your visit right can make all the difference...', '/placeholder.svg?height=400&width=600', 'Dinesh Fernando', 'Travel Planning', '["Weather", "Planning", "Seasons"]'::jsonb, false, true, '6 min read'),
('Wildlife Photography in Sri Lanka: Pro Tips', 'Capture stunning wildlife photos in Sri Lanka''s national parks with these expert techniques...', 'Sri Lanka offers incredible opportunities for wildlife photography. From leopards in Yala to elephants in Udawalawe...', '/placeholder.svg?height=400&width=600', 'Dinesh Fernando', 'Photography', '["Photography", "Wildlife", "Tips"]'::jsonb, false, true, '15 min read'),
('Luxury Stays: Top 10 Hotels in Sri Lanka', 'Experience the finest accommodations Sri Lanka has to offer, from beachfront resorts to mountain retreats...', 'For those seeking luxury during their Sri Lankan adventure, these exceptional hotels offer world-class service and stunning locations...', '/placeholder.svg?height=400&width=600', 'Samantha Silva', 'Luxury Travel', '["Luxury", "Hotels", "Accommodation"]'::jsonb, true, true, '9 min read');

-- Enable Row Level Security (RLS)
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON destinations FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON packages FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON activities FOR SELECT USING (true);

-- Create policies for authenticated users (admin) to insert, update, delete
CREATE POLICY "Enable insert for authenticated users only" ON destinations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON destinations FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON destinations FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users only" ON blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON blog_posts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON blog_posts FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users only" ON packages FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON packages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON packages FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users only" ON activities FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON activities FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON activities FOR DELETE USING (auth.role() = 'authenticated');
