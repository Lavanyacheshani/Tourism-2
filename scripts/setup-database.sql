-- Create destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 4.5,
  description TEXT,
  image TEXT,
  highlights TEXT[] DEFAULT '{}',
  difficulty TEXT DEFAULT 'Easy',
  best_time TEXT,
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image TEXT,
  author TEXT DEFAULT 'Admin',
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  read_time TEXT DEFAULT '5 min read',
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
DROP TRIGGER IF EXISTS update_destinations_updated_at ON destinations;
CREATE TRIGGER update_destinations_updated_at
    BEFORE UPDATE ON destinations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample destinations
INSERT INTO destinations (name, location, category, rating, description, image, highlights, difficulty, best_time, duration) VALUES
('Sigiriya Rock Fortress', 'Central Province', 'Cultural', 4.9, 'Ancient rock fortress and palace ruins with stunning frescoes and gardens', '/placeholder.svg?height=400&width=600', ARRAY['Ancient frescoes', 'Mirror wall', 'Water gardens', 'Summit views'], 'Moderate', 'Early morning', '3-4 hours'),
('Yala National Park', 'Southern Province', 'Wildlife', 4.8, 'Premier wildlife destination famous for leopards and diverse ecosystems', '/placeholder.svg?height=400&width=600', ARRAY['Leopard spotting', 'Elephant herds', 'Bird watching', 'Scenic landscapes'], 'Easy', 'Early morning/Evening', 'Half/Full day'),
('Ella Nine Arches Bridge', 'Uva Province', 'Adventure', 4.7, 'Iconic railway bridge surrounded by lush tea plantations', '/placeholder.svg?height=400&width=600', ARRAY['Train spotting', 'Tea plantations', 'Hiking trails', 'Photography'], 'Easy', 'Morning/Afternoon', '2-3 hours'),
('Mirissa Beach', 'Southern Coast', 'Beach', 4.8, 'Perfect crescent-shaped beach ideal for whale watching and surfing', '/placeholder.svg?height=400&width=600', ARRAY['Whale watching', 'Surfing', 'Beach relaxation', 'Sunset views'], 'Easy', 'Year round', 'Full day'),
('Temple of the Tooth', 'Kandy', 'Cultural', 4.9, 'Sacred Buddhist temple housing the relic of Buddha''s tooth', '/placeholder.svg?height=400&width=600', ARRAY['Sacred relic', 'Traditional architecture', 'Cultural ceremonies', 'Lake views'], 'Easy', 'Morning/Evening', '2-3 hours'),
('Adam''s Peak', 'Central Highlands', 'Adventure', 4.6, 'Sacred mountain peak with breathtaking sunrise views', '/placeholder.svg?height=400&width=600', ARRAY['Sunrise views', 'Pilgrimage site', 'Mountain hiking', 'Sacred footprint'], 'Challenging', 'December-May', '6-8 hours'),
('Galle Fort', 'Southern Coast', 'Cultural', 4.7, 'Historic Dutch colonial fort with charming streets and ocean views', '/placeholder.svg?height=400&width=600', ARRAY['Colonial architecture', 'Rampart walk', 'Lighthouse', 'Art galleries'], 'Easy', 'Afternoon/Evening', '3-4 hours'),
('Nuwara Eliya', 'Central Highlands', 'Adventure', 4.5, 'Hill station known as "Little England" with tea plantations and cool climate', '/placeholder.svg?height=400&width=600', ARRAY['Tea factories', 'Colonial architecture', 'Lake Gregory', 'Strawberry farms'], 'Easy', 'Year round', '1-2 days'),
('Arugam Bay', 'Eastern Coast', 'Beach', 4.6, 'World-renowned surfing destination with pristine beaches', '/placeholder.svg?height=400&width=600', ARRAY['World-class surfing', 'Beach relaxation', 'Lagoon tours', 'Wildlife spotting'], 'Easy', 'May-September', '1-3 days')
ON CONFLICT DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, content, image, author, category, tags, featured, published, read_time) VALUES
('10 Hidden Gems in Sri Lanka You Must Visit', 'Discover the lesser-known treasures of Sri Lanka that will take your breath away. From secret beaches to ancient ruins...', 'Sri Lanka is full of incredible destinations that most tourists never discover. Here are 10 hidden gems that will make your trip truly special...', '/placeholder.svg?height=400&width=600', 'Samantha Silva', 'Travel Tips', ARRAY['Hidden Gems', 'Adventure', 'Culture'], true, true, '8 min read'),
('Budget Travel Guide: Sri Lanka Under $50 a Day', 'Learn how to explore Sri Lanka on a shoestring budget without compromising on experiences...', 'Traveling Sri Lanka doesn''t have to break the bank. With careful planning and local knowledge, you can have an amazing experience for under $50 per day...', '/placeholder.svg?height=400&width=600', 'Rajesh Perera', 'Budget Travel', ARRAY['Budget', 'Backpacking', 'Tips'], false, true, '12 min read'),
('The Ultimate Sri Lankan Food Guide', 'From spicy curries to sweet treats, explore the incredible flavors of Sri Lankan cuisine...', 'Sri Lankan cuisine is a delightful fusion of flavors influenced by Indian, Dutch, Portuguese, and British culinary traditions...', '/placeholder.svg?height=400&width=600', 'Priya Jayawardena', 'Food & Culture', ARRAY['Food', 'Culture', 'Local Cuisine'], true, true, '10 min read'),
('Best Time to Visit Sri Lanka: A Month-by-Month Guide', 'Plan your perfect Sri Lankan adventure with our comprehensive weather and seasonal guide...', 'Sri Lanka''s tropical climate means it''s a year-round destination, but timing your visit right can make all the difference...', '/placeholder.svg?height=400&width=600', 'Dinesh Fernando', 'Travel Planning', ARRAY['Weather', 'Planning', 'Seasons'], false, true, '6 min read'),
('Wildlife Photography in Sri Lanka: Pro Tips', 'Capture stunning wildlife photos in Sri Lanka''s national parks with these expert techniques...', 'Sri Lanka offers incredible opportunities for wildlife photography. From leopards in Yala to elephants in Udawalawe...', '/placeholder.svg?height=400&width=600', 'Dinesh Fernando', 'Photography', ARRAY['Photography', 'Wildlife', 'Tips'], false, true, '15 min read'),
('Luxury Stays: Top 10 Hotels in Sri Lanka', 'Experience the finest accommodations Sri Lanka has to offer, from beachfront resorts to mountain retreats...', 'For those seeking luxury during their Sri Lankan adventure, these exceptional hotels offer world-class service and stunning locations...', '/placeholder.svg?height=400&width=600', 'Samantha Silva', 'Luxury Travel', ARRAY['Luxury', 'Hotels', 'Accommodation'], true, true, '9 min read')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON destinations FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON blog_posts FOR SELECT USING (true);

-- Create policies for authenticated users (admin) to insert, update, delete
CREATE POLICY "Enable insert for authenticated users only" ON destinations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON destinations FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON destinations FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users only" ON blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON blog_posts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON blog_posts FOR DELETE USING (auth.role() = 'authenticated');
