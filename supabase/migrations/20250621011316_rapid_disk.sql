/*
  # Insert Sample Data for Church Website

  1. Sample Content
    - Add sample sermons in multiple languages
    - Add sample blog posts
    - Add sample events
    - Add sample gallery images
    - Add sample church information

  2. Purpose
    - Provide initial content for testing and demonstration
    - Show how multilingual content works
    - Give users something to see immediately after setup
*/

-- Insert sample sermons
INSERT INTO sermons (title, description, video_url, date, language) VALUES
('The Power of Faith', 'A powerful message about trusting in God''s plan and having unwavering faith in difficult times.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2024-01-21', 'en'),
('Walking in Love', 'Understanding what it means to love one another as Christ loved us, and practical ways to show love.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2024-01-14', 'en'),
('God''s Grace and Mercy', 'Exploring the depth of God''s grace and how His mercy transforms our lives daily.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2024-01-07', 'en'),
('La Puissance de la Foi', 'Un message puissant sur la confiance en le plan de Dieu et avoir une foi inébranlable dans les moments difficiles.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2024-01-21', 'fr'),
('Marcher dans l''Amour', 'Comprendre ce que signifie s''aimer les uns les autres comme le Christ nous a aimés.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2024-01-14', 'fr'),
('Il Potere della Fede', 'Un messaggio potente sulla fiducia nel piano di Dio e avere una fede incrollabile nei momenti difficili.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2024-01-21', 'it');

-- Insert sample blog posts
INSERT INTO blogs (title, content, author, date, language, image_url) VALUES
('Welcome to Our New Website', 'We are excited to launch our new church website! This platform will help us stay connected as a community and share God''s love with everyone. You can find our latest sermons, upcoming events, and ways to get involved in our ministries. We believe this will be a valuable resource for both our members and visitors who want to learn more about our church family.', 'Pastor John Smith', '2024-01-20', 'en', 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'),
('The Importance of Community', 'In today''s world, it''s easy to feel isolated and disconnected. But as believers, we are called to be part of a community - the body of Christ. Our church family provides support, encouragement, and accountability as we grow in our faith together. Whether you''re celebrating joys or facing challenges, you don''t have to walk alone.', 'Minister Sarah Johnson', '2024-01-15', 'en', 'https://images.pexels.com/photos/8466657/pexels-photo-8466657.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'),
('Bienvenue sur Notre Nouveau Site Web', 'Nous sommes ravis de lancer notre nouveau site web d''église! Cette plateforme nous aidera à rester connectés en tant que communauté et à partager l''amour de Dieu avec tous.', 'Pasteur John Smith', '2024-01-20', 'fr', 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'),
('Benvenuti nel Nostro Nuovo Sito Web', 'Siamo entusiasti di lanciare il nostro nuovo sito web della chiesa! Questa piattaforma ci aiuterà a rimanere connessi come comunità e condividere l''amore di Dio con tutti.', 'Pastore John Smith', '2024-01-20', 'it', 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop');

-- Insert sample events
INSERT INTO events (title, description, date, time, location, language) VALUES
('Sunday Worship Service', 'Join us for our weekly worship service filled with praise, worship, and the Word of God.', '2024-01-28', '09:00', 'Main Sanctuary', 'en'),
('Bible Study', 'Weekly Bible study where we dive deep into God''s Word and grow together in understanding.', '2024-01-31', '19:00', 'Fellowship Hall', 'en'),
('Youth Fellowship', 'A time for our young people to connect, have fun, and grow in their faith together.', '2024-02-02', '18:00', 'Youth Center', 'en'),
('Prayer Meeting', 'Come together as we lift up our community, nation, and world in prayer.', '2024-02-02', '18:00', 'Prayer Room', 'en'),
('Service de Culte Dominical', 'Rejoignez-nous pour notre service de culte hebdomadaire rempli de louanges et de la Parole de Dieu.', '2024-01-28', '09:00', 'Sanctuaire Principal', 'fr'),
('Servizio di Adorazione Domenicale', 'Unisciti a noi per il nostro servizio di adorazione settimanale pieno di lode e della Parola di Dio.', '2024-01-28', '09:00', 'Santuario Principale', 'it');

-- Insert sample gallery images
INSERT INTO gallery (title, image_url, description, date) VALUES
('Sunday Worship Service', 'https://images.pexels.com/photos/8466657/pexels-photo-8466657.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 'Our vibrant Sunday worship service filled with praise and worship', '2024-01-21'),
('Youth Fellowship', 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 'Young people gathering for fellowship and Bible study', '2024-01-19'),
('Community Outreach', 'https://images.pexels.com/photos/6994900/pexels-photo-6994900.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 'Serving our local community with love and care', '2024-01-17'),
('Baptism Service', 'https://images.pexels.com/photos/8468083/pexels-photo-8468083.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 'Celebrating new believers through baptism', '2024-01-15'),
('Prayer Meeting', 'https://images.pexels.com/photos/301930/pexels-photo-301930.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 'Weekly prayer meeting bringing our community together', '2024-01-12'),
('Christmas Celebration', 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 'Christmas service celebrating the birth of our Savior', '2023-12-25');

-- Insert sample church information
INSERT INTO church_info (field_name, content, language) VALUES
('welcome_message', 'Welcome to Covenant Temple, where faith meets community. We are a vibrant family of believers committed to worship, fellowship, and serving God together.', 'en'),
('mission_statement', 'Our mission is to spread the Gospel of Jesus Christ, nurture spiritual growth, and build a strong community of believers through worship, fellowship, and outreach.', 'en'),
('vision_statement', 'To be a beacon of hope and love in our community, raising disciples who are passionate about God''s word and committed to His service.', 'en'),
('message_bienvenue', 'Bienvenue au Temple de l''Alliance, où la foi rencontre la communauté. Nous sommes une famille dynamique de croyants engagés dans l''adoration, la communion et le service de Dieu ensemble.', 'fr'),
('messaggio_benvenuto', 'Benvenuti al Tempio dell''Alleanza, dove la fede incontra la comunità. Siamo una famiglia vibrante di credenti impegnati nell''adorazione, nella comunione e nel servire Dio insieme.', 'it');