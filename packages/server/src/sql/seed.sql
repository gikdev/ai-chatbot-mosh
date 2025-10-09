INSERT INTO products (id, name, description, price) VALUES
(1, 'ErgoComfort Office Chair', 'An ergonomic chair designed for long working hours with lumbar support and breathable mesh.', 189.99),
(2, 'AeroBrew Coffee Maker', 'A sleek coffee maker with precision brewing and smart timer settings.', 129.50),
(3, 'SoundWave Wireless Headphones', 'Noise-canceling wireless headphones with 40-hour battery life and crystal-clear audio.', 249.00),
(4, 'EcoLight Smart Lamp', 'Energy-efficient smart lamp with customizable brightness and color temperature.', 79.99),
(5, 'FitPulse Smartwatch', 'A fitness-focused smartwatch with heart-rate monitoring, GPS tracking, and water resistance.', 199.00);

INSERT INTO reviews (author, rating, content, productId, createdAt) VALUES
('Alice Johnson', 5, 'The ErgoComfort Chair completely changed my work-from-home experience. My back pain is gone, and I can sit comfortably for hours.', 1, NOW()),
('Mark Peterson', 4, 'Solid build and great support. I wish the headrest was adjustable, but overall very satisfied.', 1, NOW()),
('Sarah Lee', 5, 'The mesh is breathable and perfect for hot days. You can tell it’s designed with ergonomics in mind.', 1, NOW()),
('Daniel Cruz', 3, 'Good chair but took a while to assemble. Comfort is decent though.', 1, NOW()),
('Emma Davis', 5, 'Super comfortable and stylish. Feels premium and definitely worth the price.', 1, NOW()),

('James Wright', 5, 'The AeroBrew Coffee Maker delivers barista-quality coffee every morning. It’s quick, quiet, and reliable.', 2, NOW()),
('Lara Simmons', 4, 'I love the flavor it extracts, though the carafe could have been a bit larger.', 2, NOW()),
('Oliver Chen', 5, 'This coffee maker makes my mornings better. Consistent temperature and rich taste.', 2, NOW()),
('Rachel Adams', 4, 'Easy to use and clean. Looks elegant on the countertop.', 2, NOW()),
('Tommy Rogers', 5, 'Honestly, the best coffee maker I’ve ever owned. Worth every penny.', 2, NOW()),

('Nina Patel', 5, 'Sound quality is outstanding, with deep bass and clear highs. Perfect for travel or daily use.', 3, NOW()),
('Chris Evans', 4, 'Battery life is excellent, though the touch controls can be a bit sensitive.', 3, NOW()),
('Sophia King', 5, 'The noise cancellation works wonders on airplanes. Feels very comfortable even after hours.', 3, NOW()),
('Jacob Moore', 4, 'High-quality headphones with balanced sound. Slightly tight fit at first.', 3, NOW()),
('Elena Torres', 5, 'Crisp audio, sturdy design, and the wireless connection never drops. Perfect!', 3, NOW()),

('Michael Brown', 4, 'The EcoLight Lamp has transformed my workspace. I love being able to adjust the color temperature.', 4, NOW()),
('Isabella Rivera', 5, 'Beautiful minimalist design and great brightness levels. The app control is seamless.', 4, NOW()),
('Henry Walker', 4, 'Energy efficient and perfect for late-night reading. Great buy overall.', 4, NOW()),
('Sophia Young', 5, 'Smart features work flawlessly with Alexa. Great value for money.', 4, NOW()),
('David Kim', 4, 'The light feels natural and reduces eye strain. Could use a longer power cable.', 4, NOW()),

('Olivia Carter', 5, 'FitPulse Smartwatch tracks everything accurately—steps, heart rate, sleep. The display is bright and responsive.', 5, NOW()),
('Ethan Ross', 4, 'Great fitness features and sleek design. Battery life could be better.', 5, NOW()),
('Grace Mitchell', 5, 'Love how intuitive the app is. It motivates me to stay active daily.', 5, NOW()),
('Ryan Brooks', 5, 'Waterproof and durable. GPS works perfectly during my runs.', 5, NOW()),
('Chloe Bennett', 4, 'Stylish and functional. Notifications are quick, and sensors seem accurate.', 5, NOW());
