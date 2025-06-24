/*
  # Church Website Database Schema

  1. New Tables
    - `sermons`
      - `id` (uuid, primary key)
      - `title` (text, sermon title)
      - `description` (text, sermon description)
      - `video_url` (text, optional YouTube/video link)
      - `audio_url` (text, optional audio file link)
      - `date` (date, sermon date)
      - `language` (text, language code: en, fr, it)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `blogs`
      - `id` (uuid, primary key)
      - `title` (text, blog post title)
      - `content` (text, blog post content)
      - `author` (text, author name)
      - `date` (date, publication date)
      - `language` (text, language code: en, fr, it)
      - `image_url` (text, optional featured image)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `gallery`
      - `id` (uuid, primary key)
      - `title` (text, image title)
      - `image_url` (text, image URL)
      - `description` (text, optional description)
      - `date` (date, photo date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `events`
      - `id` (uuid, primary key)
      - `title` (text, event title)
      - `description` (text, event description)
      - `date` (date, event date)
      - `time` (text, event time)
      - `location` (text, event location)
      - `language` (text, language code: en, fr, it)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `church_info`
      - `id` (uuid, primary key)
      - `field_name` (text, field identifier)
      - `content` (text, field content)
      - `language` (text, language code: en, fr, it)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text, contact name)
      - `email` (text, contact email)
      - `subject` (text, message subject)
      - `message` (text, message content)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access on content tables
    - Add policies for authenticated admin access for content management
    - Add policy for public insert on contacts table
*/

-- Create sermons table
CREATE TABLE IF NOT EXISTS sermons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  video_url text,
  audio_url text,
  date date NOT NULL,
  language text NOT NULL DEFAULT 'en',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  date date NOT NULL,
  language text NOT NULL DEFAULT 'en',
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  description text,
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create church_info table
CREATE TABLE IF NOT EXISTS church_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  field_name text NOT NULL,
  content text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE church_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for sermons
CREATE POLICY "Anyone can view sermons"
  ON sermons
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage sermons"
  ON sermons
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for blogs
CREATE POLICY "Anyone can view blogs"
  ON blogs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage blogs"
  ON blogs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for gallery
CREATE POLICY "Anyone can view gallery"
  ON gallery
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage gallery"
  ON gallery
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for events
CREATE POLICY "Anyone can view events"
  ON events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage events"
  ON events
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for church_info
CREATE POLICY "Anyone can view church info"
  ON church_info
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage church info"
  ON church_info
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for contacts
CREATE POLICY "Anyone can submit contacts"
  ON contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete contacts"
  ON contacts
  FOR DELETE
  TO authenticated
  USING (true);