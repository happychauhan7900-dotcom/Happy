<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Brand | Welcome</title>
    <!-- Google Fonts for better typography -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* --- 1. GLOBAL STYLES --- */
        :root {
            --primary-color: #6c63ff; /* Purple */
            --secondary-color: #2f2e41; /* Dark Grey */
            --accent-color: #f3f4f6; /* Light Grey */
            --text-color: #333;
            --white: #ffffff;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', sans-serif;
            color: var(--text-color);
            line-height: 1.6;
        }

        a {
            text-decoration: none;
            color: inherit;
        }

        ul {
            list-style: none;
        }

        .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* --- 2. NAVBAR --- */
        .navbar {
            background: var(--white);
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
        }

        .navbar .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 70px;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-color);
        }

        .nav-links {
            display: flex;
            gap: 20px;
        }

        .nav-links a {
            font-weight: 600;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: var(--primary-color);
        }

        .btn-nav {
            padding: 8px 20px;
            background: var(--primary-color);
            color: var(--white);
            border-radius: 5px;
            font-weight: 600;
            transition: background 0.3s;
        }

        .btn-nav:hover {
            background: #5750d6;
        }

        /* --- 3. HERO SECTION --- */
        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            background: var(--accent-color);
            padding-top: 70px; /* Offset for fixed navbar */
        }

        .hero .container {
            display: grid;
            grid-template-columns: 1fr 1fr; /* 2 Columns */
            gap: 30px;
            align-items: center;
        }

        .hero-text h1 {
            font-size: 3rem;
            line-height: 1.2;
            margin-bottom: 20px;
            color: var(--secondary-color);
        }

        .hero-text p {
            margin-bottom: 30px;
            font-size: 1.1rem;
            color: #666;
        }

        .btn-primary {
            display: inline-block;
            padding: 12px 30px;
            background: var(--primary-color);
            color: var(--white);
            border-radius: 5px;
            font-size: 1.1rem;
            transition: transform 0.2s;
        }

        .btn-primary:hover {
            transform: translateY(-3px);
            background: #5750d6;
        }

        .hero-image img {
            width: 100%;
            max-width: 500px;
            border-radius: 10px;
            /* Placeholder styling */
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        /* --- 4. FEATURES SECTION --- */
        .features {
            padding: 80px 0;
            background: var(--white);
            text-align: center;
        }

        .features h2 {
            font-size: 2.5rem;
            margin-bottom: 50px;
            color: var(--secondary-color);
        }

        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
        }

        .feature-card {
            padding: 30px;
            background: var(--white);
            border: 1px solid #eee;
            border-radius: 10px;
            transition: box-shadow 0.3s;
        }

        .feature-card:hover {
            box-shadow: 0 10px 20px rgba(0,0,0,0.08);
        }

        .feature-icon {
            font-size: 2rem;
            margin-bottom: 15px;
            display: block;
        }

        .feature-card h3 {
            margin-bottom: 10px;
            color: var(--secondary-color);
        }

        /* --- 5. FOOTER --- */
        footer {
            background: var(--secondary-color);
            color: var(--white);
            padding: 20px 0;
            text-align: center;
        }

        /* --- MOBILE RESPONSIVENESS --- */
        @media (max-width: 768px) {
            .hero .container {
                grid-template-columns: 1fr; /* Stack vertically */
                text-align: center;
            }
            
            .hero-image {
                order: -1; /* Image on top */
                margin-bottom: 20px;
            }

            .hero-text h1 {
                font-size: 2rem;
            }

            .nav-links {
                display: none; /* Simple hide for mobile demo */
            }
        }
    </style>
</head>
<body>

    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="container">
            <a href="#" class="logo">BrandName.</a>
            <ul class="nav-links">
                <li><a href="#hero">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#" class="btn-nav">Sign Up</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section (The main banner) -->
    <section class="hero" id="hero">
        <div class="container">
            <div class="hero-text">
                <h1>Grow Your Business with Modern Solutions</h1>
                <p>We provide high-quality services to help your company scale. fast, reliable, and secure.</p>
                <a href="#features" class="btn-primary">Get Started Now</a>
            </div>
            <div class="hero-image">
                <!-- Using a placeholder image generator -->
                <img src="https://placehold.co/600x400/6c63ff/ffffff?text=Hero+Image" alt="Hero Illustration">
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="features">
        <div class="container">
            <h2>Our Services</h2>
            <div class="feature-grid">
                <!-- Card 1 -->
                <div class="feature-card">
                    <span class="feature-icon">🚀</span>
                    <h3>Fast Performance</h3>
                    <p>Optimized for speed to ensure your users have the best experience possible.</p>
                </div>
                <!-- Card 2 -->
                <div class="feature-card">
                    <span class="feature-icon">🛡️</span>
                    <h3>Secure Data</h3>
                    <p>We take security seriously with top-tier encryption and data protection.</p>
                </div>
                <!-- Card 3 -->
                <div class="feature-card">
                    <span class="feature-icon">⚙️</span>
                    <h3>Easy Automation</h3>
                    <p>Automate your workflow and save time with our integrated tools.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <p>&copy; 2023 BrandName. All rights reserved.</p>
        </div>
    </footer>

</body>
</html>
