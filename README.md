<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>UNIVERSITY UPDATES - ADMIT CARD GENERATOR</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        :root {
            --card-bg: #ffffff;
            --ink: #111827;
            --primary-color: #EF3C3C; /* Crimson Red from viva.html */
            --secondary-color: #2C4B9E; /* Deep Blue from viva.html */
            --footer-bg: #2C4B9E; /* Deep Blue for footer from viva.html */
            --footer-text: #ffffff;
        }

        /* Base Styles & Inter Font */
        html,
        body {
            font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
            background: #f8fafc;
            color: var(--ink);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        
        /* New Utility Bar Styles (from viva.html) */
        .utility-bar {
            background-color: var(--primary-color);
            color: white;
            padding: 8px 20px;
            font-size: 0.9rem;
        }
        .utility-link:hover {
            text-decoration: underline;
            opacity: 0.8;
        }
        .social-icon {
            color: white;
            font-size: 1.5rem;
            transition: color 0.3s;
        }
        .social-icon:hover {
            color: #FFD700; /* Gold hover for contrast */
        }
        
        /* New Footer Styles (from viva.html) */
        .footer {
            background-color: var(--footer-bg);
            color: var(--footer-text);
            padding: 40px 20px 20px 20px;
            margin-top: auto; /* Pushes footer to the bottom */
            width: 100%;
        }
        
        /* Utility Classes */
        .glass {
            background: rgba(255, 255, 255, .8);
            backdrop-filter: blur(10px);
        }

        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }

        /* Form Layout Styles */
        h1,
        h2 {
            color: #333;
            text-align: center;
        }

        #form-container {
            background: white;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 900px;
            margin-bottom: 20px;
        }

        .entry-toggle {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 6px;
            overflow: hidden;
        }

        .toggle-btn {
            flex: 1;
            padding: 12px;
            border: none;
            background-color: #f0f0f0;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            color: #555;
            transition: background-color 0.3s, color 0.3s;
        }

        .toggle-btn.active {
            background-color: #007BFF;
            color: white;
        }

        #auto-fill-section {
            text-align: center;
            padding: 20px;
            border: 2px dashed #ccc;
            border-radius: 8px;
        }

        #auto-fill-section label {
            font-weight: bold;
            font-size: 18px;
            display: block;
            margin-bottom: 15px;
        }

        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        .form-group label {
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
        }

        .form-group input,
        .form-group select {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
        }

        #papers-container {
            margin-top: 20px;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }

        /* Paper Entry Grid for responsiveness (FIXED to prevent unnecessary stacking) */
        .paper-entry {
            /* FIX: Use flexible units (fr) to make columns adapt automatically.
               Paper Code (1fr), Paper Name (3fr), Paper Type (1.5fr), Remove Button (40px fixed) */
            display: grid;
            grid-template-columns: 1fr 3fr 1.5fr 40px;
            gap: 10px;
            align-items: center;
            margin-bottom: 10px;
            background: #f9f9f9;
            padding: 10px;
            border-radius: 4px;
        }

        @media (max-width: 900px) {
            .paper-entry {
                /* Adjust ratio slightly for medium screens */
                grid-template-columns: 1fr 2.5fr 1.5fr 40px; 
            }
        }

        @media (max-width: 640px) {
            .paper-entry {
                /* Stack on small screens for form inputs to be readable */
                grid-template-columns: 1fr;
                gap: 5px;
            }

            .paper-entry button {
                width: 100%;
            }
        }


 
/* Dropdown positioning */
    nav { position: relative; z-index: 50; }
    nav .group:hover div { display: block !important; z-index: 60; }
    
        /* Gradient Button Styles */
        .gradient-button {
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            color: white;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .gradient-button:hover {
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
            transform: translateY(-1px);
        }

        #generateBtn {
            background-image: linear-gradient(to right, #1E3A8A, #3B82F6);
        }

        #generateBtn:hover {
            background-image: linear-gradient(to right, #1D4ED8, #2563EB);
        }

        #downloadBtn {
            background-image: linear-gradient(to right, #10B981, #059669);
        }

        #downloadBtn:hover {
            background-image: linear-gradient(to right, #06B6D4, #14B8A6);
        }

        #printBtn {
            background-image: linear-gradient(to right, #9333EA, #A855F7);
        }

        #printBtn:hover {
            background-image: linear-gradient(to right, #7C3AED, #8B5CF6);
        }

        #resetBtn {
            background-image: linear-gradient(to right, #EF4444, #F97316);
        }

        #resetBtn:hover {
            background-image: linear-gradient(to right, #DC2626, #F97316);
        }

        /* Admit Card Styles */
        #admit-card-wrapper {
            width: 100%;
            max-width: 800px;
            margin-top: 15px;
            padding: 20px;
            background: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }

        #admit-card-content {
            border: 2px solid black;
            padding: 15px;
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid black;
            padding-bottom: 10px;
            margin-bottom: 10px;
        }

        .header img {
            height: 60px;
            width: auto;
        }

        .header h3 {
            flex: 1;
            text-align: center;
            margin: 0;
            font-size: 20px;
        }

        .header-right {
            width: 60px;
        }

        .sub-header {
            text-align: center;
            font-weight: bold;
            padding: 5px 0;
            margin-bottom: 10px;
        }

        .sub-header h4 {
            margin: 0;
            padding: 5px 10px;
            border: 1px solid black;
            border-radius: 5px;
            display: inline-block;
        }

        .details-table {
            width: 100%;
            margin-top: 5px;
            border-collapse: collapse;
        }

        .details-table td {
            padding: 5px;
            font-size: 12px;
            vertical-align: top;
        }

        .details-table .label {
            font-weight: bold;
            width: 25%;
        }

        /* FIX: Paper Table Widths for better print layout */
        .papers-table {
            width: 100%;
            margin-top: 10px;
            border-collapse: collapse;
            font-size: 10px;
            /* Ensure fixed layout for consistent column widths */
            table-layout: fixed; 
        }

        .papers-table th,
        .papers-table td {
            border: 1px solid black;
            padding: 6px;
            text-align: left;
            word-wrap: break-word; /* Allows long names to wrap */
        }

        .papers-table th {
            background-color: #f2f2f2;
            text-align: center;
            font-weight: bold;
        }
        
        /* FIX: Re-enforce column widths using percentages for automatic device/print sizing */
        .papers-table th:nth-child(1), .papers-table td:nth-child(1) { width: 5%; text-align: center; }  /* S. No. - Center aligned */
        .papers-table th:nth-child(2), .papers-table td:nth-child(2) { width: 12%; } /* PAPER CODE */
        .papers-table th:nth-child(3), .papers-table td:nth-child(3) { width: 30%; } /* PAPER NAME (Increased width) */
        .papers-table th:nth-child(4), .papers-table td:nth-child(4) { width: 14%; } /* PAPER TYPE */
        .papers-table th:nth-child(5), .papers-table td:nth-child(5) { width: 14%; } /* EXAM DATE */
        .papers-table th:nth-child(6), .papers-table td:nth-child(6) { width: 8%; } /* DAY (Reduced width) */
        .papers-table th:nth-child(7), .papers-table td:nth-child(7) { width: 18%; } /* SHIFT */


        .footer-note {
            font-size: 10px;
            margin-top: 5px;
            font-weight: bold;
        }

        /* Improved Printed Date/Time Display */
        #generatedTime {
            font-size: 10px;
            font-style: italic;
            color: #4B5563;
            /* Darker gray for better print contrast */
            padding-top: 10px;
            border-top: 1px dashed #D1D5DB;
        }

        /* Print-specific styles to hide elements */
        @media print {
            body>*:not(#admit-card-wrapper) {
                display: none !important;
            }

            #admit-card-wrapper {
                /* FIX: Use standard print margins to avoid cutting off content */
                margin: 0.2in auto !important; 
                padding: 0 !important;
                box-shadow: none !important;
                max-width: 100% !important;
                width: 100% !important;
            }

            #admit-card-content {
                border: 1px solid black !important;
                /* FIX: Allow some internal padding for text clearance and set a max content width */
                margin: 0 auto; 
                padding: 10px;
                width: 7.5in; 
                max-width: 100%;
            }
            
            /* FIX: Reset table-layout to auto in print to allow proportional shrinking */
            .papers-table {
                table-layout: auto !important; 
                font-size: 8px; /* Reduce font size for print-out readability */
            }
            
            /* Ensure specific print widths are proportional and small */
            .papers-table th:nth-child(1), .papers-table td:nth-child(1) { width: 5%; }
            .papers-table th:nth-child(2), .papers-table td:nth-child(2) { width: 12%; }
            .papers-table th:nth-child(3), .papers-table td:nth-child(3) { width: 30%; }
            .papers-table th:nth-child(4), .papers-table td:nth-child(4) { width: 14%; }
            .papers-table th:nth-child(5), .papers-table td:nth-child(5) { width: 14%; }
            .papers-table th:nth-child(6), .papers-table td:nth-child(6) { width: 8%; }
            .papers-table th:nth-child(7), .papers-table td:nth-child(7) { width: 18%; }
        }

        /* Go To Top Button Styles from index (1).html */
        #topBtn {
            display: none;
            position: fixed;
            bottom: 20px;
            right: 25px;
            z-index: 50;
            font-size: 15px;
            border: none;
            outline: none;
            background-color: var(--primary-color); /* Primary Red */
            color: white;
            cursor: pointer;
            padding: 12px 16px;
            border-radius: 50%;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            transition: 0.3s;
        }
        #topBtn:hover {
            background-color: #C63333; /* Darker Red */
            transform: scale(1.1);
        }
        html {
            scroll-behavior: smooth;
        }
    </style>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
    <script>
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    </script>
    <script src="https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
</head>
<body class="flex flex-col items-center">
    
    <header class="utility-bar w-full">
        <div class="max-w-6xl mx-auto flex justify-between items-center px-4">
            <div class="flex space-x-4">
                <a href="index.html" class="utility-link"><i class="fas fa-home mr-1"></i> Home</a>
                <a href="https://t.me/HelpforDMBot" class="utility-link"><i class="fas fa-headset mr-1"></i> Contact Us</a>
            </div>
            <div class="flex items-center space-x-4">
                <a href="https://t.me/CCSUniversityMRT" class="social-icon text-sm hover:text-gray-300 transition" title="Telegram"><i class="fab fa-telegram"></i></a>
                <span class="mx-2 text-white opacity-50">|</span>
                <a href="https://www.whatsapp.com/channel/0029Va9jtav4tRrmKPxos138" class="social-icon text-sm hover:text-gray-300 transition" title="Whatsapp"><i class="fab fa-whatsapp"></i></a>
                <span class="mx-2 text-white opacity-50">|</span>
                <a href="https://www.instagram.com/@UniversityUpdates_UU" class="social-icon text-sm hover:text-gray-300 transition" title="Instagram"><i class="fab fa-instagram"></i></a>
                <span class="mx-2 text-white opacity-50">|</span>
                <a href="https://www.youtube.com/@University-Updates-UU" class="social-icon text-sm hover:text-gray-300 transition" title="YouTube"><i class="fab fa-youtube"></i></a>
                
            </div>
        </div>
    </header>
    <header class="w-full border-b bg-white/70 shadow-lg mb-4">
        <div class="max-w-6xl mx-auto flex items-center justify-center p-4">
            <div class="flex items-center gap-3">
                <img src="https://i.ibb.co/nMC0877T/UNIVERSITY-UPDATES-LOGO-removebg-preview.png" alt="Logo" class="h-10 w-auto" />
            </div>
        </div> 
    </header> 
  
     <p style="color: white; font-style: italic; font-size: 15px; background-color: crimson; display: flex; align-items: center; height: 25px;">
    <marquee onmouseover="this.stop();" direction="left" onmouseout="this.start();">
        <b style="color: white">➤</b> 📢 Only For NEP (B.A., B.Sc., B.Com., M.A., M.Sc. & M.Com.)
        <b style="color: white">➤</b> 📢 यह प्रवेश पत्र केवल आपकी सुविधा एवं जानकारी हेतु है, परीक्षाओ के लिए यह वैध नहीं है। यह सीसीएसयू से संबद्ध या समर्थित नहीं है। वैध प्रवेश पत्र के लिए ccsuniversityweb.in पर विजिट करें।
        <b style="color: white">➤</b> 📢 नोट: यह औपबंधिक प्रवेश पत्र आधिकारिक तौर पर स्वीकृत नहीं है। इसको बनाने का मात्र उद्देश्य सम्बन्धित छात्रों को परीक्षा तिथि और समय की जानकारी उपलब्ध कराना है। अधिक जानकारी के लिए विश्वविद्यालय की अधिकृत वेबसाइट www.ccsuniversity.ac.in का अवलोकन करें। उक्त प्रवेश पत्र विश्वविद्यालय के पत्रांक संख्या परीक्षा/डी०आर०/9906 दिनाँक 07.11.2025 के अनुसार है।
    </marquee>
</p>

  
  
<h1 class="mt-3 mx-auto text-3xl font-extrabold text-center text-gray-800">ADMIT CARD GENERATOR</h1>
<h2 class="mt-1 mx-auto text-1xl font-extrabold text-center text-red-800">For NEP (B.A., B.Sc., B.Com., M.A., M.Sc. & M.Com.)</h2>


<div class="flex justify-center mt-6 px-2 w-full max-w-5xl mx-auto">
  <div class="w-full bg-white shadow-xl border border-gray-200 rounded-xl p-4 sm:p-6">
  
  <div class="flex justify-center items-center gap-2 sm:gap-3 mb-4 border-b pb-2 border-blue-300">
            <img src="https://cdn-icons-png.flaticon.com/512/595/595067.png" alt="Disclaimer Icon" class="h-8 w-8">
            <h2 class="text-xl md:text-2xl font-bold text-blue-800">HOW TO USE?</h2>
        </div>
        
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    
    
        
        <div class="bg-gradient-to-r from-blue-50 to-blue-100 shadow-md border border-blue-300 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div class="flex justify-start items-center gap-2 sm:gap-3 mb-3">
              <i class="fas fa-keyboard text-xl sm:text-2xl text-blue-800"></i>
              <h2 class="text-base sm:text-lg md:text-xl font-bold text-blue-800">Option 1: Manual Entry</h2>
            </div>
            <ol>
                    <li><i class="fas fa-circle-notch text-xs text-blue-500 mr-2"></i><b>Step 1:</b> Select the <b>"Manual Entry"</b> option.</li>
                    <li><i class="fas fa-circle-notch text-xs text-blue-500 mr-2"></i><b>Step 2:</b> Fill in all the Student and Paper details manually according to your Exam Form.</li>
                    <li><i class="fas fa-circle-notch text-xs text-blue-500 mr-2"></i><b>Step 3:</b> Click on <b>"Generate Admit Card"</b>.</li>
                </ol>
          </div>
        </div>

        <div class="bg-gradient-to-r from-green-50 to-green-100 shadow-md border border-green-300 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div class="flex justify-start items-center gap-2 sm:gap-3 mb-3">
              <i class="fas fa-upload text-xl sm:text-2xl text-green-800"></i>
              <h2 class="text-base sm:text-lg md:text-xl font-bold text-green-800">Option 2: Auto-fill from Upload</h2>
            </div>
            <ol>
                    <li><i class="fas fa-circle-notch text-xs text-green-500 mr-2"></i><b>Step 1:</b> Select the <b>"Auto-fill from Upload"</b> option.</li>
                    <li><i class="fas fa-circle-notch text-xs text-green-500 mr-2"></i><b>Step 2:</b> Upload your <b>Exam Form/Admit Card</b> (PDF Recommended).</li>
                    <li><i class="fas fa-circle-notch text-xs text-green-500 mr-2"></i><b>Step 3:</b> Review and correct any auto-filled details.</li>
                    <li><i class="fas fa-circle-notch text-xs text-green-500 mr-2"></i><b>Step 4:</b> Click on <b>"Generate Admit Card"</b>.</li>
                </ol>
          </div>
          
        </div>
    </div>
    <div style="text-align: center;">
    <a href="https://youtu.be/n0hNj5M-L3Y" target="_blank" class="gradient-button mt-2 inline-flex items-center bg-red-600 hover:bg-red-700 transition duration-150">
        <i class="fab fa-youtube mr-2"></i> Watch Tutorial on YouTube
    </a>
</div>
    <div class="max-w-5xl w-full mx-auto px-4 mt-2">
    <p class="text-[10px] sm:text-sm text-center text-red-600 italic font-semibold">
        <b>Note:</b> If you upload the Exam Form then examination center will not be displayed, please upload the Admit Card for better result.
    </p>
</div>
  </div>
</div>


<div id="form-container" class="mt-5 mx-auto bg-white rounded-xl shadow-lg p-8 w-full max-w-5xl">
        
        <div class="entry-toggle flex justify-center mb-8">
            <button class="toggle-btn active rounded-l-md" id="manualBtn">Manual Entry</button>
            <button class="toggle-btn rounded-r-md" id="autoBtn">Auto-fill from Upload</button>
        </div>

        <div id="auto-fill-section" style="display:none;" class="border-2 border-dashed border-blue-300 bg-blue-50 p-6 rounded-lg text-center mb-8">
            <label for="admitCardUpload" class="block text-lg font-semibold text-blue-700 mb-3">
                Upload Admit Card/Exam Form (PDF/Image) to Auto-Fill Details (PDF Recommended)
            </label>
            <input type="file" id="admitCardUpload" accept=".pdf,.png,.jpg,.jpeg" class="p-2 border border-gray-300 rounded-md w-full max-w-md mx-auto block">
            <p id="upload-status" class="mt-3 text-blue-600 font-semibold"></p>
        </div>

        <div id="manual-form">
            <form id="admitCardForm" class="space-y-8">

                <div>
                    <h2 class="text-xl font-semibold mb-4 border-b-2 border-gray-300 pb-2 text-gray-700">Student Details</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div class="form-group">
                            <label for="candidateName">Candidate Name:</label>
                            <input type="text" id="candidateName" required>
                        </div>
                        <div class="form-group">
                            <label for="fatherMotherName">Father's/Mother's Name:</label>
                            <input type="text" id="fatherMotherName" required>
                        </div>
                        <div class="form-group">
                            <label for="rollNumber">Roll Number:</label>
                            <input type="text" id="rollNumber" required>
                        </div>
                        <div class="form-group">
                            <label for="enrollmentNumber">Enrollment Number:</label>
                            <input type="text" id="enrollmentNumber" required>
                        </div>
                        <div class="form-group">
                            <label for="course">Course:</label>
                            <input type="text" id="course" required>
                        </div>
                        <div class="form-group">
                            <label for="gender">Gender:</label>
                            <select id="gender" required>
                                <option value="">Select</option>
                                <option value="FEMALE">FEMALE</option>
                                <option value="MALE">MALE</option>
                                <option value="OTHER">OTHER</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="semester">Semester:</label>
                            <select id="semester" required>
                                <option value="">Select Semester</option>
                                <option value="1">1st</option>
                                <option value="2">2nd</option>
                                <option value="3">3rd</option>
                                <option value="4">4th</option>
                                <option value="5">5th</option>
                                <option value="6">6th</option>
                                <option value="7">7th</option>
                                <option value="8">8th</option>
                                <option value="9">9th</option>
                                <option value="10">10th</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="examType">Exam Type:</label>
                            <select id="examType" required>
                                <option value="">Select Exam Type</option>
                                <option value="MAIN EXAM">Main</option>
                                <option value="BACK EXAM">Back</option>
                                <option value="EX-STUDENT EXAM">Ex-Student</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="collegeName">College Name:</label>
                            <input type="text" id="collegeName" required>
                        </div>
                        <div class="form-group">
                            <label for="examinationCenter">Examination Center:</label>
                            <input type="text" id="examinationCenter" required>
                        </div>
                        <div class="form-group">
                            <label for="subject">Main Subject:</label>
                            <input type="text" id="subject" required>
                        </div>
                    </div>
                </div>

                <div id="papers-container">
                    <h2 class="text-xl font-semibold mb-4 border-b-2 border-gray-300 pb-2 text-gray-700">Paper Details</h2>
                    <div id="paper-entries" class="space-y-3"></div>
                    <div class="text-center mt-4">
                        <button type="button" id="addPaperBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 px-5 rounded-full shadow-md transition">
                            + Add Paper
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    

  <div class="action-buttons flex flex-wrap justify-center gap-4 mt-6 mb-10 w-full max-w-5xl px-4">
        <button type="button" id="generateBtn" class="gradient-button">Generate Admit Card</button>
        <button type="button" id="resetBtn" class="gradient-button">Reset Form</button>
        <button type="button" id="printBtn" class="gradient-button" style="display:none;">Print Admit Card</button>
        <button type="button" id="downloadBtn" class="gradient-button" style="display:none;">Download as PDF</button>
    </div>



<div id="admit-card-wrapper" style="display:none;">
  <div id="admit-card-content">
    <div class="header">
      <img src="https://i.ibb.co/nMC0877T/UNIVERSITY-UPDATES-LOGO-removebg-preview.png">
      <h3><b>UNIVERSITY UPDATES</b></h3>
      <div class="header-right"></div>
    </div>

    <div class="sub-header" style="text-align:center; margin-bottom:10px;">
      <h4 style="font-weight:bold; font-size:16px;">
        औपबंधिक प्रवेश-पत्र / PROVISIONAL ADMIT CARD
      </h4>
    </div>
    <div class="sub-header" style="text-align:justify; margin-bottom:10px;">
      <h4 style="font-weight:bold; color:#d32f2f; font-size:16px;">
        यह प्रवेश पत्र केवल आपकी सुविधा एवं जानकारी हेतु है, परीक्षाओ के लिए यह वैध नहीं है। यह सीसीएसयू से संबद्ध या समर्थित नहीं है। वैध प्रवेश पत्र के लिए ccsuniversityweb.in पर विजिट करें। 
      </h4>
    </div>

    <p id="exam-type-sem" style="text-align:center; font-weight:bold; font-size:16px; margin-bottom:15px; color:#d32f2f;"></p>

    <table class="details-table">
      <tr>
        <td class="label">Roll Number:</td>
        <td class="value" id="ac-rollNumber"></td>
        <td class="label">Enrollment No:</td>
        <td class="value" id="ac-enrollmentNumber"></td>
      </tr>
      <tr>
        <td class="label">Candidate Name:</td>
        <td class="value" id="ac-candidateName"></td>
        <td class="label">Father's/Mother's Name:</td>
        <td class="value" id="ac-fatherMotherName"></td>
      </tr>
      <tr>
        <td class="label">Course:</td>
        <td class="value" id="ac-course"></td>
        <td class="label">Gender:</td>
        <td class="value" id="ac-gender"></td>
      </tr>
      <tr>
        <td class="label">College Name:</td>
        <td class="value" id="ac-collegeName" colspan="3"></td>
      </tr>
      <tr>
        <td class="label">Examination Center:</td>
        <td class="value" id="ac-examinationCenter" colspan="3"></td>
      </tr>
      <tr>
        <td class="label">Subject:</td>
        <td class="value" colspan="3" id="ac-subject"></td>
      </tr>
    </table>

    <table class="papers-table" id="ac-papers-table">
      <thead>
        <tr>
          <th>S. No.</th>
          <th>PAPER CODE</th>
          <th>PAPER NAME</th>
          <th>PAPER TYPE</th>
          <th>EXAM DATE</th>
          <th>DAY</th>
          <th>SHIFT</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>

    <div class="mt-8 text-xs text-gray-600 leading-relaxed border-t pt-4">
      <p class="text-justify"><strong>नोट:</strong> यह औपबंधिक प्रवेश पत्र आधिकारिक तौर पर स्वीकृत नहीं है। इसको बनाने का मात्र उद्देश्य सम्बन्धित छात्रों को परीक्षा तिथि और समय की जानकारी उपलब्ध कराना है। अधिक जानकारी के लिए विश्वविद्यालय की अधिकृत वेबसाइट www.ccsuniversity.ac.in का अवलोकन करें। उक्त प्रवेश पत्र UG-NEP के लिए विश्वविद्यालय के पत्रांक संख्या <b>परीक्षा/डी०आर०/9906</b> दिनाँक 07.11.2025, <b>परीक्षा/डी०आर०/9918</b>,<b>परीक्षा/डी०आर०/9919</b> दिनाँक 13.11.2025, PG-NEP के लिए विश्वविद्यालय के पत्रांक संख्या <b>परीक्षा/डी०आर०/9923</b> दिनाँक 14.11.2025 के अनुसार है।</p>


      <div class="text-right mt-2">
        <p class="text-xs text-gray-500 font-semibold">Generated On:</p>
        <p class="text-sm font-mono text-gray-800" id="generatedTime"></p>
      </div>
    </div>
  </div>
</div>

<div id="disclaimer-modal" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-2">
    <div class="bg-white rounded-lg shadow-2xl p-3 sm:p-4 max-w-xs sm:max-w-sm md:max-w-md w-full mx-auto">
        <h2 class="text-base sm:text-sm font-bold mb-2 text-red-600 border-b pb-1 text-center">
            DISCLAIMER & IMPORTANT NOTE
        </h2>

        <p class="text-gray-700 mb-2 text-[10px] sm:text-xs leading-tight text-justify">
            This <b>ADMIT CARD GENERATOR</b> is a non-official tool designed for educational and informational purposes only. The provisional admit card generated here is based on user input and pre-defined exam datesheet data.
        </p>

        <ul class="list-disc list-inside text-gray-700 mb-2 text-[10px] sm:text-xs leading-tight space-y-1 text-justify">
            <li>The content is <b>NOT</b> officially sanctioned by any University.</li>
            <li>Always refer to the official University website for your final, legally valid admit card, exam center, and schedule.</li>
            <li>The accuracy of the generated card depends entirely on the accuracy of the data you provide or the data extracted via OCR.</li>
            <li>यह केवल परीक्षा की तिथि की जानकारी हेतु है, यह कोई आधिकारिक दस्तावेज नहीं है।</li>
        </ul>

        <p class="text-gray-800 font-semibold text-[10px] sm:text-xs text-justify">
            By clicking 'I Understand', you acknowledge that this is a mock document, and you accept full responsibility for verifying all details with the official University sources.
        </p>

        <div class="mt-3 flex justify-center">
            <button id="understand-btn" class="gradient-button bg-green-500 hover:bg-green-600 transition duration-150 px-2 py-1 text-[10px] sm:text-xs rounded">
                I Understand and Accept
            </button>
        </div>
    </div>
</div>

<footer class="footer">
        <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                
                <div><div class="text-center">
                    <h3 class="text-xl font-bold mb-3 border-b-2 border-primary-color pb-1 inline-block">Disclaimer</h3>
                    <div class="text-justify">
                    <p class="text-sm opacity-90">
                        The Admit Card generated is for informational purposes only. It is <b>not</b> an official document. Students must <b>always confirm</b> the details from their respective college/ university administration. We are not responsible for any last-minute changes or inaccuracies. Not affiliated with or endorsed by CCSU.
                    </p>
                </div></div></div>

                <div>
                <div class="text-center">
                    <h3 class="text-xl font-bold mb-3 border-b-2 border-primary-color pb-1 inline-block">Exam Schedule</h3>
                    <ul class="space-y-1 text-sm">
                        <li><i class="fas fa-circle-notch text-xs text-yellow-500 mr-2"></i><a href="https://t.me/CCSUniversityMRT/24715" class="hover:text-primary-color transition"><b>UG-NEP</b></a> (Released on 07.11.2025)</li>
                        <li><i class="fas fa-circle-notch text-xs text-yellow-500 mr-2"></i><a href="https://t.me/CCSUniversityMRT/24838" class="hover:text-primary-color transition"><b>UG-NEP Remaining Papers</b></a> (Released on 13.11.2025)</li>
                        <li><i class="fas fa-circle-notch text-xs text-yellow-500 mr-2"></i><a href="https://t.me/CCSUniversityMRT/24864" class="hover:text-primary-color transition"><b>PG-NEP 3rd Semester</b></a> (Released on 14.11.2025)</li>
                        <li><i class="fas fa-circle-notch text-xs text-yellow-500 mr-2"></i><a href="https://t.me/CCSUniversityMRT/24863" class="hover:text-primary-color transition"><b>Professional Courses</b></a> (Released on 14.11.2025)</li>
                        <li><i class="fas fa-circle-notch text-xs text-yellow-500 mr-2"></i><a href="https://t.me/CCSUniversityMRT/24835" class="hover:text-primary-color transition"><b>LL.M., LL.B., B.Sc. Ag. (Hons), B.Sc. HS</b></a> (Released on 13.11.2025)</li>
                        
                        </ul>
                </div></div>


                <div><div class="text-center">
                    <h3 class="text-xl font-bold mb-3 border-b-2 border-primary-color pb-1 inline-block">Connect With Us</h3>
                    <div class="flex space-x-4 justify-center">
                        <a href="https://www.whatsapp.com/channel/0029Va9jtav4tRrmKPxos138" class="social-icon" title="Whatsapp"><i class="fab fa-whatsapp"></i></a>
                        <a href="https://t.me/CCSUniversityMRT" class="social-icon" title="Telegram"><i class="fab fa-telegram-plane"></i></a>
                        <a href="https://www.instagram.com/@UniversityUpdates_UU" class="social-icon" title="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.youtube.com/@University-Updates-UU" class="social-icon" title="YouTube"><i class="fab fa-youtube"></i></a>
                    </div>
                    <div id="datetime" class="text-white text-sm font-semibold mt-3">
                        <span id="liveDate"></span> | <span id="liveTime"></span>
                    </div>
                    </div>
                </div>
            </div>

            <div class="text-center pt-4 border-t border-white border-opacity-30">
                <p class="text-sm opacity-70">
                    &copy; 2025 University Updates. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
    
    <button onclick="topFunction()" id="topBtn" title="Go to top">↑</button>
    <script>
        // --- DATA (Datesheet for fetching Date, Day, Shift, and Name) ---
        const examDatesheet = {
            'A040101T': {
                date: '26-Nov-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'English Prose and Writing Skills' 
            },
            'A020501T': {
                date: '26-Nov-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Vedic Vadhya Avm Bhartiya Darshan'
            },
            'C010101T': {
                date: '26-Nov-2025',
                day: 'Wed',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Business Organisation'
            },
            'B010101T': {
                date: '26-Nov-2025',
                day: 'Wed',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Mathematical Physics & Newtonian Mechanics'
            },
            'B040101T': {
                date: '26-Nov-2025',
                day: 'Wed',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Microbiology & Plant Pathology'
            },
            'A040301T': {
                date: '27-Nov-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'British and American Drama'
            },
            'B010301T': {
                date: '27-Nov-2025',
                day: 'Thu',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Electromagnetic Theory & Modern Optics'
            },
            'C010301T': {
                date: '27-Nov-2025',
                day: 'Thu',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Company Law'
            },
            'B040301T': {
                date: '27-Nov-2025',
                day: 'Thu',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Flowering Plans Identification & Aesthetic Characteristics'
            },
            'A020502T': {
                date: '27-Nov-2025',
                day: 'Thu',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Vyakaran Avm Bhasha Vigyan'
            },
            'A050101T': {
                date: '28-Nov-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Ancient and Early Medival India (Till 1206 A.D.)'
            },
            'A300501T': {
                date: '28-Nov-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Theoretical and Analytical study of Ragas, Talas & Applied theory of Indian Classical Music'
            },
            'A310501T': {
                date: '28-Nov-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Aesthetical aspects of Tabla'
            },
            'A320501T': {
                date: '28-Nov-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Study of Western Music and Style of'
            },
            'A120501T': {
                date: '28-Nov-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Indian Defence Mechanism'
            },
            'C010501T': {
                date: '28-Nov-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Corporate Accounting'
            },
            'B030101T': {
                date: '28-Nov-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Differential Calculus & Integral Calculus'
            },
            'B050101T': {
                date: '28-Nov-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Cytology, Genetics and Infectious Diseases'
            },
            'B058101T': {
                date: '28-Nov-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Basic Nutrition, Sanitation & Hygiene'
            },
            'B010502T': {
                date: '28-Nov-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Quantum Mechanics & Spectroscopy'
            },
            'B040502T': {
                date: '28-Nov-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Molecular Biology & Bioinformatics'
            },
            'A050301T': {
                date: '29-Nov-2025',
                day: 'Sat',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'History of Modern India (1757A.D.- 1950A.D.)'
            },
            'C010102T': {
                date: '29-Nov-2025',
                day: 'Sat',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Business Statistics'
            },
            'B030301T': {
                date: '19-Dec-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Algebra & Mathematical Methods'
            },
            'B050301T': {
                date: '29-Nov-2025',
                day: 'Sat',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Molecular Biology, Bioinstrumentation & Bio techniques'
            },
            'B058301T': {
                date: '29-Nov-2025',
                day: 'Sat',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Food Process Technology & Food Microbiology'
            },
            'A120502T': {
                date: '29-Nov-2025',
                day: 'Sat',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'National Security of India'
            },
            'A060101T': {
                date: '01-Dec-2025',
                day: 'Mon',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Indian National Movement & Constitution of India'
            },
            'E010501T': {
                date: '01-Dec-2025',
                day: 'Mon',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Educational Assessment'
            },
            'A090501T': {
                date: '01-Dec-2025',
                day: 'Mon',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Life Span Human Development'
            },
            'C010302T': {
                date: '01-Dec-2025',
                day: 'Mon',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Cost Accounting'
            },
            'B020101T': {
                date: '01-Dec-2025',
                day: 'Mon',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Fundamentals of Chemistry'
            },
            'B030501T': {
                date: '01-Dec-2025',
                day: 'Mon',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Group and Ring The ory & Linear Algebra'
            },
            'B050501T': {
                date: '01-Dec-2025',
                day: 'Mon',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Diversity of Non-Chordates, Parasitology and Economic Zoology'
            },
            'B058501T': {
                date: '01-Dec-2025',
                day: 'Mon',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Food Analysis'
            },
            'A060301T': {
                date: '02-Dec-2025',
                day: 'Tue',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Political Process in India'
            },
            'C010502T': {
                date: '02-Dec-2025',
                day: 'Tue',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Goods and Service Tax'
            },
            'B020301T': {
                date: '02-Dec-2025',
                day: 'Tue',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Chemical Dynamics & Coordination Chemistry'
            },
            'A090502T': {
                date: '02-Dec-2025',
                day: 'Tue',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Positive Psychology'
            },
            'A010101T': {
                date: '03-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Hindi Kavya'
            },
            'A180501T': {
                date: '03-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Library Classification'
            },
            'A030501T': {
                date: '03-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Urdu Ghazal Aur Nazm'
            },
            'E010502T': {
                date: '03-Dec-2025',
                day: 'Wed',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Educational Statistics'
            },
            'C010103T': {
                date: '03-Dec-2025',
                day: 'Wed',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Business Communication'
            },
            'B190101T': {
                date: '03-Dec-2025',
                day: 'Wed',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Fundamentals of Industrial Chemistry'
            },
            'B070101T': {
                date: '03-Dec-2025',
                day: 'Wed',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Problem Solving using Computer'
            },
            'B050502T': {
                date: '03-Dec-2025',
                day: 'Wed',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Diversity of Chordates and Comparative Anatomy'
            },
            'B058502T': {
                date: '03-Dec-2025',
                day: 'Wed',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Food Manufacturing & Packaging'
            },
            'A010301T': {
                date: '04-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Hindi Gadhya'
            },
            'C010303T': {
                date: '04-Dec-2025',
                day: 'Thu',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Business Regulatory Framework'
            },
            'B190301T': {
                date: '04-Dec-2025',
                day: 'Thu',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Process Instrumentation and Industrial Chemical Analysis'
            },
            'B070301T': {
                date: '04-Dec-2025',
                day: 'Thu',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Operating Systems'
            },
            'A030502T': {
                date: '04-Dec-2025',
                day: 'Thu',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Qasida, Masnavi Aur Marsia'
            },
            'A180503T': {
                date: '04-Dec-2025',
                day: 'Thu',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Library Cataloguing'
            },
            'A070101T': {
                date: '05-Dec-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Introduction to Basic Concepts of Sociology'
            },
            'A070102T': {
                date: '05-Dec-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Concepts of Rural Sociology'
            },
            'A070104T': {
                date: '05-Dec-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Basic Concepts in Sociology'
            },
            'E020501T': {
                date: '05-Dec-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Athletic Injuries and Physiotherapy'
            },
            'A100501T': {
                date: '05-Dec-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Problems of Philosophy (Indian and Western)'
            },
            'C010503T': {
                date: '05-Dec-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Business Finance'
            },
            'B080101T': {
                date: '05-Dec-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'General Microbiology'
            },
            'B017101T': {
                date: '05-Dec-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Fundamentals of Industrial Microbiology'
            },
            'B060101T': {
                date: '05-Dec-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Descriptive Statistics (Univariate) and Theory of Probability'
            },
            'A070504T': {
                date: '12-Dec-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Rural Sociology'
            },
            'A070505T': {
                date: '02-Jan-2026',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Social Change & Social Movements in India'
            },
            'B020501T': {
                date: '05-Dec-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Organic Synthesis-A'
            },
            'A070301T': {
                date: '06-Dec-2025',
                day: 'Sat',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Social Change & Social Movements'
            },
            'A070302T': {
                date: '06-Dec-2025',
                day: 'Sat',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Population and Society'
            },
            'A070304T': {
                date: '06-Dec-2025',
                day: 'Sat',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Tribes in India'
            },
            'C010104T': {
                date: '06-Dec-2025',
                day: 'Sat',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Introduction to Computer Application'
            },
            'B080301T': {
                date: '06-Dec-2025',
                day: 'Sat',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Basic Bio Chemistry and Microbial Physiology'
            },
            'B017301T': {
                date: '06-Dec-2025',
                day: 'Sat',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Fermentation Technology'
            },
            'B060301T': {
                date: '06-Dec-2025',
                day: 'Sat',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Theory of Estimation and Sampling Survey'
            },
            'A080101T': {
                date: '08-Dec-2025',
                day: 'Mon',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Principle of Micro Economics'
            },
            'A210501T': {
                date: '08-Dec-2025',
                day: 'Mon',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'History of Indian Art-Rajsthani, Mughal & PahariStyle'
            },
            'A100502T': {
                date: '08-Dec-2025',
                day: 'Mon',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Applied Philosophy'
            },
            'E020502T': {
                date: '08-Dec-2025',
                day: 'Mon',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Kinesiology and Biomechanics in Sports'
            },
            'C010304T': {
                date: '08-Dec-2025',
                day: 'Mon',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Inventory Management'
            },
            'B020502T': {
                date: '08-Dec-2025',
                day: 'Mon',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Rearrangements and Chemistry of Group Elements'
            },
            'A080301T': {
                date: '09-Dec-2025',
                day: 'Tue',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'History of Economic Thought'
            },
            'C010504T': {
                date: '09-Dec-2025',
                day: 'Tue',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Principles and Practices of Insurance'
            },
            'B010501T': {
                date: '09-Dec-2025',
                day: 'Tue',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Classical & Statistical Mechanics'
            },
            'B040501T': {
                date: '09-Dec-2025',
                day: 'Tue',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Plant Physiology, Metabolism & Bio Chemistry'
            },
            'A210502T': {
                date: '09-Dec-2025',
                day: 'Tue',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'History of Indian art- Development of Modern Art'
            },
            'A110101T': {
                date: '10-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Physical Geogrphy'
            },
            'A130501T': {
                date: '10-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Surface Ornamentation of Fabrics'
            },
            'B190501T': {
                date: '10-Dec-2025',
                day: 'Wed',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Industrial Chemicals'
            },
            'B070501T': {
                date: '10-Dec-2025',
                day: 'Wed',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Analysis of Algorithms and Data Structures'
            },
            'A110301T': {
                date: '11-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Environment, Disaster Management and Climate Change'
            },
            'A300301T': {
                date: '11-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Theoretical and Analytical study of Ragas, Talas & Descriptive theory of Indian Classical Music'
            },
            'A310301T': {
                date: '11-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'History of Tabla'
            },
            'A320301T': {
                date: '11-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Contribution of Ancient, Medieval and Modern Scholars to Indian Music'
            },
            'C010505T': {
                date: '11-Dec-2025',
                day: 'Thu',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Monetary Theory and Banking in India'
            },
            'B030502T': {
                date: '11-Dec-2025',
                day: 'Thu',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Number Theory & Game Theory'
            },
            'B030503T': {
                date: '11-Dec-2025',
                day: 'Thu',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Graph Theory & Discrete'
            },
            'B030504T': {
                date: '11-Dec-2025',
                day: 'Thu',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Differential Geometry and Tensor Analysis'
            },
            'A130502T': {
                date: '11-Dec-2025',
                day: 'Thu',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Community Development & Programme Planning'
            },
            'E020101T': {
                date: '12-Dec-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Elements of Physical Education'
            },
            'A070502T': {
                date: '02-Jan-2026',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Research Methodology in Social Sciences'
            },
            'B190502T': {
                date: '12-Dec-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Pollution, its Management and Industrial Economics'
            },
            'B070502T': {
                date: '12-Dec-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Soft Computing'
            },
            'E020301T': {
                date: '13-Dec-2025',
                day: 'Sat',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Anatomy & exercise Physiology'
            },
            'A060501T': {
                date: '13-Dec-2025',
                day: 'Sat',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Comparative Government and Politics'
            },
            'Z010101': {
                date: '15-Dec-2025',
                day: 'Mon',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Food Nutrition and Hygiene'
            },
            'Z050501': {
                date: '15-Dec-2025',
                day: 'Mon',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Analytic Ability and Digital Awareness'
            },
            'Z030301': {
                date: '16-Dec-2025',
                day: 'Tue',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Human Values and Environment Studies'
            },
            'Q10001': {
                date: '17-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Kuru Kingdom Through The Ages (3000 BC-2000BC)'
            },
            'Q10003': {
                date: '17-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Applied Ethics'
            },
            'Q10004': {
                date: '17-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Basic Economics'
            },
            'Q10005': {
                date: '17-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Health Personal & Environmental'
            },
            'Q10006': {
                date: '17-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Disaster Management System in India'
            },
            'Q10007': {
                date: '17-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Earths Atmosphere and Climate Change'
            },
            'Q10008': {
                date: '17-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Environment and Public Health Challenges'
            },
            'Q10010': {
                date: '17-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Public Health and Hygiene'
            },
            'Q10030': {
                date: '17-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Promoting Personal Growth and Relationship Through Psychology'
            },
            'Q10018': {
                date: '17-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Road Safety: Laws, Policies & Practices'
            },
            'Q10037': {
                date: '17-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Business Communication'
            },
            'Q10038': {
                date: '17-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Sanskrit Sahitya Mein Rashtra Chintan'
            },
            'Q10039': {
                date: '17-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Quantitative Mathematics'
            },
            'Q10040': {
                date: '17-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Maternal and Child Nutrition'
            },
            'Q10032': {
                date: '18-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Yoga for All'
            },
            'Q10034': {
                date: '18-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Psychology of Everyday Life'
            },
            'Q10035': {
                date: '18-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Renewable Energy Sources'
            },
            'Q10036': {
                date: '18-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Scientific Progress and Environmental Awareness in India'
            },
            'Q10020': {
                date: '18-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'An Introduction to Indian Jurists'
            },
            'Q10012': {
                date: '18-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Applied Yoga'
            },
            'Q10033': {
                date: '18-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Fundamentals of Indian Economy'
            },
            'Q10029': {
                date: '18-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Food and Food Sources'
            },
            'Q30001': {
                date: '18-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Business Regulatory Frame work'
            },
            'Q30002': {
                date: '18-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Inventory Management'
            },
            'Q30003': {
                date: '18-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Bhartiya Gaurav Evam Arthkavya'
            },
            'Q30004': {
                date: '18-Dec-2025',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Optimization Technique'
            },
            'A020101T': {
                date: '19-Dec-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Sanskrit-Padya Sahitya Avm Vyakaran'
            },
            'A040501T': {
                date: '19-Dec-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Classical Literature & History of English Literature'
            },
            'B080501T': {
                date: '19-Dec-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Medical Microbiology'
            },
            'B017501T': {
                date: '19-Dec-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Industrial Food Microbiology'
            },
            'B060501T': {
                date: '19-Dec-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Multivariate Analysis and Non-parametric Methods'
            },
            'A020301T': {
                date: '20-Dec-2025',
                day: 'Sat',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Sanskrit-Natak Avm Vyakaran'
            },
            'A040502T': {
                date: '20-Dec-2025',
                day: 'Sat',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Fiction'
            },
            'E010101T': {
                date: '22-Dec-2025',
                day: 'Mon',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Conceptual Frame work of Education'
            },
            'B080502T': {
                date: '22-Dec-2025',
                day: 'Mon',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Immunology'
            },
            'B017502T': {
                date: '22-Dec-2025',
                day: 'Mon',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Immunology & Medical Microbiology'
            },
            'B060502T': {
                date: '22-Dec-2025',
                day: 'Mon',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Analysis of Variance and Design of Experiment'
            },
            'E010301T': {
                date: '24-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Philosophical-Sociological-Political- Economic Perspectives of Education'
            },
            'A060502T': {
                date: '24-Dec-2025',
                day: 'Wed',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Principles of Public Administration'
            },
            'A100301T': {
                date: '26-Dec-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Ethics(Indian and Western)'
            },
            'A180101T': {
                date: '26-Dec-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Fundamentals of Librarianship'
            },
            'A010501T': {
                date: '26-Dec-2025',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Sahitya shastra and Hind iAalochana'
            },
            'A180301T': {
                date: '27-Dec-2025',
                day: 'Sat',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Library Management'
            },
            'A030301T': {
                date: '27-Dec-2025',
                day: 'Sat',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Sahafat Aur Tarjuma Nigari Ka Fun Aur Riwayat'
            },
            'A010502T': {
                date: '27-Dec-2025',
                day: 'Sat',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Hindi Ka Rastriya Ka Vya'
            },
            'A210101T': {
                date: '29-Dec-2025',
                day: 'Mon',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'History of Art: Pre Historic to Rashtrakuta'
            },
            'A080501T': {
                date: '29-Dec-2025',
                day: 'Mon',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Economic Growth and Development'
            },
            'A210301T': {
                date: '30-Dec-2025',
                day: 'Tue',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'History of Indian Art-Palato Pandya & Nayaka Period'
            },
            'A080502T': {
                date: '30-Dec-2025',
                day: 'Tue',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Environmental Economics'
            },
            'A080503T': {
                date: '30-Dec-2025',
                day: 'Tue',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'International Economics'
            },
            'A130101T': {
                date: '31-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Fundamentals of Nutrition and Human Development'
            },
            'A110501T': {
                date: '31-Dec-2025',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Regional Geography'
            },
            'A130301T': {
                date: '01-Jan-2026',
                day: 'Thu',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Advance Nutrition and Human Development'
            },
            'A110502T': {
                date: '01-Jan-2026',
                day: 'Thu',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Basics of Remote Sensing and GIS'
            },
            'A090101T': {
                date: '01-Jan-2026',
                day: 'Thu',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Basic Psychological Processes'
            },
            'A100101T': {
                date: '02-Jan-2026',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Indian Philosophy'
            },
            'A070501T': {
                date: '12-Dec-2025',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Classical Sociological Thought'
            },
            'A120101T': {
                date: '02-Jan-2026',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Conceptual Aspect of war'
            },
            'A310101T': {
                date: '02-Jan-2026',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Basic Fundamental of Tabla'
            },
            'A320101T': {
                date: '02-Jan-2026',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Introduction to Indian Music'
            },
            'A300101T': {
                date: '02-Jan-2026',
                day: 'Fri',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Theoretical and Analytical study of Ragas, Talas and general theory of'
            },
            'A090301T': {
                date: '02-Jan-2026',
                day: 'Fri',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Psychology of Social Behavior'
            },
            'A050501T': {
                date: '05-Jan-2026',
                day: 'Mon',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Nationalism in India'
            },
            'A120301T': {
                date: '06-Jan-2026',
                day: 'Tue',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'National Security-Conceptual Aspects'
            },
            'A030101T': {
                date: '07-Jan-2026',
                day: 'Wed',
                shift: 'Shift I (10:00 AM - 01:00 PM)',
                name: 'Urdu Zaban-o-Adab aur Qwaid-o Insha'
            },
            'A050502T': {
                date: '07-Jan-2026',
                day: 'Wed',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'History of Modern Europe (1815A.D.-1870A.D.)'
            },
            'A050503T': {
                date: '07-Jan-2026',
                day: 'Wed',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Socio-Cultural and Economic History of Medieval India (1200A.D.-1700A.D.)'
            },
            'A050504T': {
                date: '07-Jan-2026',
                day: 'Wed',
                shift: 'Shift II (02:00 PM - 05:00 PM)',
                name: 'Ethicsin History'
            },
            'B590301T': { date: '05-Dec-2025', day: 'Fri', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Introduction to Resource Management' },
		'B600301T': { date: '05-Dec-2025', day: 'Fri', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Consumer Economics' },
		'B590303T': { date: '08-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Food Service Equipment Layout' },
		'B600302T': { date: '08-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Nutritional Biochemistry' },
'B590305T': { date: '10-Dec-2025', day: 'Wed', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Food Science & Processing' },
'B600303T': { date: '10-Dec-2025', day: 'Wed', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Nutritional through Life Cycle' },
'B600305T': { date: '12-Dec-2025', day: 'Fri', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Nutritional Biochemistry' },
            
            // Non-scheduled / Placeholder Entries
            'C010403P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            }, // Practical - Date decided by college
            'A010603R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'A020607R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'A030607R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'A040604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'A050605R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'A060603R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'A070606R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'A070603R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'A080604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'A090604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'A090603P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            },
            'A100603P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            },
            'A100604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'A110603P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            },
            'A110604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'A120603P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            },
            'A120604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'A130603P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            },
            'A130604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'A180603P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            },
            'A180604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'A210603P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            },
            'A210604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'E010603P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            },
            'E010604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'E020603P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            },
            'E020604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'B010603P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            },
            'B010604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'B020603P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            },
            'B020604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'B030603P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            },
            'B030604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'B040603P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            },
            'B040604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'B050603P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            },
            'B050604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'B060603P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            },
            'B060604R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'C010603P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical'
            },
            'C010607R': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Research Project'
            },
            'Q10021': {
                date: '22-May-2025',
                day: 'Thu',
                shift: 'Shift 1 (8:00 AM - 11:00 AM)',
                name: 'Elective Paper'
            },
            'V0001015P': {
                date: 'N/A',
                day: 'N/A',
                shift: 'N/A',
                name: 'Practical/Vocational'
            }, // Practical/Vocational
            'V0001015T': {
                date: '23-May-2025',
                day: 'Fri',
                shift: 'Shift 1 (8:00 AM - 11:00 AM)',
                name: 'Vocational Theory'
            }, // Assuming T means Theory
            'Z060601': {
                date: '14-Oct-2025',
                day: 'Tue',
                shift: 'Shift 1 (10:00 AM - 12:00 PM)',
                name: 'Co-Curricular'
            },
            
            // Added codes
            'D010601T': {
                date: '06-May-2025',
                day: 'Tue',
                shift: 'Shift 2 (11:00 AM - 2:00 PM)',
                name: 'Added Theory Paper'
            },
            'D010201T': {
                date: '01-May-2025',
                day: 'Thu',
                shift: 'Shift 1 (8:00 AM - 11:00 AM)',
                name: 'Added Theory Paper 2'
            },
            'A010901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Adhunik Kavya (Chhayvad Paryant)' },
            'A020901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Bhartiya Darsan (Vedant Mimansaevam Yog)' },
            'A030901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Urdu Nazam' },
            'A040907T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Victorian Fiction and Prose' },
            'A040901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Victorian Fiction and Prose (BP)' },
            'A050901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'History of South India (From Sangam Age to Vijay Nagar Empire)' },
            'A050902T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Bhakti Movement in India' },
            'A05A0901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'History of Ancient Indian Numismatics' },
            'A15A901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'History of Ancient Indian Numismatics' },
            'A060901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Western Political Thought' },
            'A070908T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Modern Sociological Theories' },
            'A080901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Public Finance' },
            'A110901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Geographical Thoughts' },
            'A160901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Rural Urban Community Development' },
            'A270901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Western Administrative Thinkers' },
            'A090901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Advance Quantitive Methods' },
            'A120901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'National Security-1' },
            'E010901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Measurement & Evaluation in Education' },
            'A100901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Contemporary Indian Philosophy' },
            'E020901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: '(Th) Sports Biomechanics and Kinesiology' },
            'A130901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Statistics and Computer Application' },
            'A300901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Study of Notation System and General Research Methodology (For Vocal, Stringed Instruments, Tabla and Pakhawaj)' },
            'A210901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'History of European Painting (Classical to Early Renaissance)' },
            'C010901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Financial Management' },
            'B010901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Condensed Matter Physics' },
            'B020901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Photochemistry' },
            'B030901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Fluid Dynamics' },
            'B040901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Medicinal Botany and Ayurvedic System of Medicine' },
            'B050901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Genetics, Biostatistics & Computational and Biology' },
            'B060901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Quality Control & Realiability Engineering' },
            'B080901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Immunology' },
            'B300901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Toxicology of Heavy Metals' },
            'B610911T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Abnormal Psychology' },
            'B620921T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Technical Textiles' },
            'B630931T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Community & Public Health Nutrition' },
            'B100901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'I(Th) Food Biotechnology' },
            'B310901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Forensic Chemistry' },
            'B150901T': { date: '01-Dec-2025', day: 'Mon', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Environmental Impact Assessment and Management' },
            'A010902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Bhartiya Kavyashastra Evam Pashchatya Kavyashastra' },
            'A020902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Vyakaran Evam Bhasha Vigyan' },
            'A030902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Mass Media' },
            'A040902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Twentieth Century British Poetry(BP)' },
            'A040908T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Twentieth Century British Poetry' },
            'A050903T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'History of Medieval India (1206-1526 A.D.)' },
            'A05A0902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'History of Ancient Indian Art and Architecture' },
            'A150902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'History of Ancient Indian Art and Architecture' },
            'A060902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Indian Adminstration' },
            'A070909T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Rural Studies' },
            'A090902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Higher Cognitive Processes' },
            'A080902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Research Methodology' },
            'A110902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Inter disciplinary Research Methods and Techniques in Geography' },
            'A160902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Research Methods, Statistics and Computer Application' },
            'A270902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Ancient Indian Administration' },
            'A120902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Tnternational Law' },
            'E010902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Educational Technology' },
            'A100902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Social and Political Philosophy' },
            'E020902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'II(Th) Sport Medicine' },
            'A130902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Clinical and Therapeutic Nutrition' },
            'A300902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Ancient Music Scriptures and Technical Terms (For Vocal, Stringed Instruments, Tabla and Pakhawaj)' },
            'A210902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'History of Modern European Art (Neo-Classicism to cubism)' },
            'B010902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Nuclear and Particle Physics' },
            '8020902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Spectroscopy' },
            'B030902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Functional Analysis' },
            'B0409021': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Plant Biochemistry and Molecular Biology' },
            'B050902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Development Biology' },
            'B060902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Statistical Inference-II' },
            '8080902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Microbial Biotechnology and Industrial Microbiology' },
            'B300902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Toxicology of Pesticides' },
            'B610912T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Adolescent and Youth' },
            'B620922T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Historic Costume' },
            'C010902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Marketing Management' },
            'B100902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'II Genomics and Proteomics' },
            'B310902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Forensic Toxicology' },
            'B150902T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Environmental Pollution' },
            'B630932T': { date: '02-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Clinical Nutrition' },
            'A010903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Kabirdas' },
            'A010904T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Surdas' },
            'A010905T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Goswami Tulsidas' },
            'A010906T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Jaishankar Prasad' },
            'A010907T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Premchand' },
            'A010908T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: "Sacchin and Hiranand Vatsyayan 'Ageya'" },
            'A020903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Dhwani Evam Kavya Shastriya Parshthan' },
            'A030904T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Sir Syedahmad Khan' },
            'A030905T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Prem Chand' },
            'A030903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Maulana Abul Kalam Azad' },
            'A040903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Twentieth Century British Fictionand (BP)' },
            'A040909T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Twentieth Century British Fiction' },
            'A050904T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'History of Medieval India (1526-1707 A.D.)' },
            'A05A0903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Ancient Indian Art and Architecture' },
            'A150903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Ancient Indian Art and Architecture' },
            'A060903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Modern Indian Political Thought' },
            'A060904T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Modern Western Political Thought' },
            'A070910T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Social Change: Concepts and Theories' },
            'B010903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Operational Amplifier and Digital Circuits' },
            'B010904T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Nanomaterials and Synthesis Techniques' },
            'B010910T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Solid State Physics-1' },
            'B010913T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Spectroscopy -1' },
            'B010916T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Nuclear Physics-1' },
            'B020903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Analytical Chemistry' },
            'B030903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Introduction to Soft Computing' },
            'B040903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Environmental Chemistry' },
            'B050903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'A-Parasitology: (i) Biologyof Parasites-1' },
            'B050905T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'B-Fishand Fisheries: (i) General Fish Biology' },
            'B050907T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'C-Endrocrinology: (i) General Endocrinology' },
            'B050909T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'D-Cell Biology: (i) Advanced Cell Biology' },
            'B050911T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'E-Entomology: (i) General Insect Biology' },
            'B050913T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'F-Chronobiology:(i) Chronobiology' },
            'B060903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Operations Research' },
            'B080903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Computer Applications, Bioinformatics, statistics and Research Methodology' },
            'B300903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Toxicology of Organic Solvents' },
            'A090903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Psychopathology' },
            'A080903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Economics of Infrastructure' },
            'A080904T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Econometrics' },
            'A080905T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Agricultural Economics' },
            'A110903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Population Geography' },
            'A160903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Environment, Sustainable Development and Social Work' },
            'A270903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Financial Administration' },
            'A270904T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Personnel Administration' },
            'A120903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Disarmament and Arms Control-1' },
            'A100903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Concepts of Western Philosophy' },
            'A130903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Textiles: Testing and Quality Control' },
            'B310903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Forensic Biology' },
            'E010903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Guidance & Counselling' },
            'E020903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'III(Th) Sports Psychology' },
            'B610913T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Advance in Life Span Development and Gero' },
            'B620923T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Recent Advances in Textile Science & Apparel Design' },
            'B630934T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Institutional Food Service Management' },
            'C010903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Human Resource Management' },
            'B100903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'III(Th) Plant Biotechnology' },
            'B150903T': { date: '04-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Environment & Public Health' },
            'A010909T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Patrakarita Parshikshan' },
            'A020904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Vedic Shatiyaka Vishisth Adhyaan' },
            'A020906T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Pracheen Evam Avarcheen Sanskrit Sahityaka Vishisth Adhyaan' },
            'A030907T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Meertaqi Meer' },
            'A030906T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Ghalib' },
            'A030908T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Iqbal' },
            'A050906T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Political and Cultural History of Western Uttar Pradesh' },
            'A040605T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Translation Studies (BP)' },
            'A040910T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Research Methodology' },
            'A040904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Campus Fiction (BP)' },
            'A150906T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Indian Art Iconography' },
            'A060905T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Indian Tradition of Political Thinking' },
            'A060906T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Indian Public Governance' },
            'A070912T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Political Sociology' },
            'A070911T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Environmental Sociology' },
            'A080906T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Rural Development' },
            'A080907T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Demography' },
            'A080908T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Industrial Economics' },
            'A090904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Clinical Psychology' },
            'A110904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Gender Geography' },
            'A110905T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Agricultural Geography' },
            'A110906T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Social Geography' },
            'A110907T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Techniques and Methods of Regional Analysis' },
            'A110908T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Cultural Geography' },
            'A110909T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Multi-Variety Statically Analysis' },
            'A110910T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Remote Sensing G.I.S. & G.P.S.' },
            'A160904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Mental Health Care & Services, Medical & Psychiatric Social Work' },
            'A270905T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Social Welfare Administration' },
            'A270906T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Public Policy Process in India' },
            'A270907T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Public Policy' },
            'A120904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Indian Military History-1' },
            'A120905T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Disaster Management-1' },
            'A100904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Contemporary Western Philosophy' },
            'A130904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-I (10:00 AM to 01:00 PM)', name: 'Children with Special Needs' },
            'B310904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Forensic Serology, Genetics and Physiology' },
            'B010905T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Electronic Communication Systems' },
            'B010906T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Advance Tools for Nano characterization' },
            'B010911T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Nuclear Physics -II' },
            'B010914T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Solid State Physics -II' },
            'B010917T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Spectroscopy' },
            'B020904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Bio-Inorganic Chemistry' },
            'B020905T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Bio-Organic Chemistry' },
            'B020906T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Bio-Physical Chemistry' },
            'B030904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Mathematical Robotics' },
            'B300904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Regulatory Toxicology' },
            'B040904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Genetic Engineering' },
            'B040905T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Evolutionary Biology' },
            'B040906T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Plant Nomenclature' },
            'B050904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'A-Parasitology: (ii) Biology of Parasites -II (Nematoda and Arthropoda)' },
            'B050906T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'B-Fishand Fisheries: (ii) Morphology and Physiology' },
            'B050908T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'C-Endrocrinology: (ii) Neuro Endrocrinology' },
            'B050910T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'D-Cell Biology:(ii) Chromosome and Genomic Organization' },
            'B050912T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'E-Entomology: (ii) Anatomy and Physiology of Insects' },
            'B050914T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'F-Chronobiology: (ii) Photoperiodism and Seasonal Breeding' },
            'B060904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Advanced Bayeslan Statistics' },
            'B060905T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Acruarial Science and Official Statistics' },
            'B080904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Food Chemistry' },
            'B080905T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Food and Water Borne Disease' },
            'E010904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Adult Education' },
            'E010905T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Life Skill Education' },
            'E010906T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Distance Education' },
            'E020906T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'IV(Th)a: Health Education' },
            'E020905T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'IV(Th)b: Professional Preparation and Curriculum Design in Physical Education' },
            'E020904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'IV(Th)c: Kinanthropometry' },
            'B610915T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Parent and Community Education' },
            'B620924T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Textile & Garment Quality Control' },
            'B620926T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Fashion Communication' },
            'C010904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Managerial Economics' },
            'C010905T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Operations Research' },
            'B100904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'IV(Th) Animal Biotechnology' },
            'B150904T': { date: '06-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Water & Wastewater Treatment' },
            'A090906T': { date: '09-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Educational Psychology' },
            'B030905T': { date: '09-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Information Theory' },
            'B100905T': { date: '09-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'V(Th) Industrial Bio Technology & Bioentrepreneur ship' },
            'A090907T': { date: '11-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Human Development till Adulthood' },
            'B030906T': { date: '11-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Advanced Numerical Analysis' },
            'B100906T': { date: '11-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'VI (Th)a: Plant genetic Resources: conservation and their sustainable use' },
            'A090909T': { date: '13-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Managing Behavior in Organizations' },
            'B030907T': { date: '13-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Measure and Integration' },
            'B100907T': { date: '13-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'VII(Th) b: Biotechnology of Human' },
            'A090910T': { date: '16-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Human Resource Development and Consulting' },
            'B030908T': { date: '16-Dec-2025', day: 'Tue', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Algebric Coding Theory' },
            'A090912T': { date: '17-Dec-2025', day: 'Wed', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Health psychology' },
            'A090908T': { date: '18-Dec-2025', day: 'Thu', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Organizational Psychology' },
            'B030909T': { date: '19-Dec-2025', day: 'Fri', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Object Oriented Programming C++' },
            'A090911T': { date: '19-Dec-2025', day: 'Fri', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Counselling Psychology' },
            'A090905T': { date: '20-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Neuropsychology' },
            'B030910T': { date: '20-Dec-2025', day: 'Sat', shift: 'Shift-II (02:00 PM to 05:00 PM)', name: 'Partial Differential Equation' }
        };

        const paperEntriesContainer = document.getElementById('paper-entries');

        // --- MODAL AND INITIALIZATION LOGIC (NEW/UPDATED) ---
        document.addEventListener('DOMContentLoaded', () => {
            const modal = document.getElementById('disclaimer-modal');
            const understandBtn = document.getElementById('understand-btn');
            
            // Initially hide main content elements
            document.getElementById('form-container').style.display = 'none';
            document.querySelector('.action-buttons').style.display = 'none';
            document.getElementById('admit-card-wrapper').style.display = 'none';
            
            // Show the modal
            modal.style.display = 'flex';
            
            // Set up the Understand button click handler
            understandBtn.addEventListener('click', () => {
                modal.style.display = 'none'; // Hide modal

                // Show main content
                document.getElementById('form-container').style.display = 'block';
                document.querySelector('.action-buttons').style.display = 'flex'; 

                // Initial setup for the form (Add one paper entry)
                addPaperEntry();
                
                // Start live date/time update
                updateDateTime();
                setInterval(updateDateTime, 1000); // Update every second
                
                // Add scroll listener for top button
                window.onscroll = scrollFunction;
            });
            
            // Initial setup for the theme toggle (light mode by default)
            // Note: theme-toggle element is not present in the HTML, so this line will likely fail but is kept for context integrity.
            // document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
        });
        
        // --- THEME TOGGLE FUNCTIONALITY (Copied from viva.html) ---
        function toggleTheme() {
            const isDark = document.body.classList.toggle('dark-mode');
            const themeIcon = document.getElementById('theme-icon');
            
            // Utility to set CSS variables
            const setVar = (key, value) => document.documentElement.style.setProperty(key, value);
            
            // Utility to update element styles
            const updateStyles = (selector, styleMap) => {
                document.querySelectorAll(selector).forEach(el => {
                    for (const prop in styleMap) {
                        el.style[prop] = styleMap[prop];
                    }
                });
            };

            if (isDark) {
                // Apply dark mode styles by changing CSS variables
                setVar('--ink', '#f8fafc'); 
                setVar('--footer-bg', '#111827'); 
                
                // Update specific elements that need styling adjustment
                updateStyles('body', { backgroundColor: '#1f2937', color: '#f8fafc' });
                updateStyles('#form-container, #admit-card-wrapper', { backgroundColor: '#374151', boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)' });
                updateStyles('h1, h2, .form-group label', { color: '#bfdbfe' }); 
                updateStyles('.form-group input, .form-group select', { 
                    backgroundColor: '#4b5563', 
                    borderColor: '#6b7280', 
                    color: '#f8fafc' 
                });
                updateStyles('.toggle-btn', { backgroundColor: '#4b5563', color: '#f8fafc' });
                updateStyles('.toggle-btn.active', { backgroundColor: '#1D4ED8', color: 'white' });
                updateStyles('.paper-entry', { backgroundColor: '#374151' });
                updateStyles('.papers-table th', { backgroundColor: '#4b5563', color: '#f8fafc' });

                // Update icon
                if(themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }

            } else {
                // Reset to light mode styles
                setVar('--ink', '#111827');
                setVar('--footer-bg', '#2C4B9E'); 
                
                // Reset specific elements
                updateStyles('body', { backgroundColor: '#f8fafc', color: '#111827' });
                updateStyles('#form-container, #admit-card-wrapper', { backgroundColor: '#ffffff', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' });
                updateStyles('h1, h2', { color: '#333' });
                updateStyles('.form-group label', { color: '#555' });
                updateStyles('.form-group input, .form-group select', {
                    backgroundColor: '#fff',
                    borderColor: '#ccc',
                    color: '#111827'
                });
                 updateStyles('.toggle-btn', { backgroundColor: '#f0f0f0', color: '#555' });
                 updateStyles('.toggle-btn.active', { backgroundColor: '#007BFF', color: 'white' });
                 updateStyles('.paper-entry', { backgroundColor: '#f9f9f9' });
                 updateStyles('.papers-table th', { backgroundColor: '#f2f2f2', color: '#111827' });

                // Update icon
                if(themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }
        }
        
        // --- TOGGLE MANUAL / AUTO MODE (NEW FUNCTION) ---
        function switchToManualMode() {
            document.getElementById('manual-form').style.display = 'block';
            document.getElementById('auto-fill-section').style.display = 'none';
            document.getElementById('manualBtn').classList.add('active');
            document.getElementById('autoBtn').classList.remove('active');
        }

        // --- TOGGLE EVENT LISTENERS (UPDATED) ---
        document.getElementById('manualBtn').addEventListener('click', switchToManualMode);

        document.getElementById('autoBtn').addEventListener('click', () => {
            document.getElementById('manual-form').style.display = 'none';
            document.getElementById('auto-fill-section').style.display = 'block';
            document.getElementById('manualBtn').classList.remove('active');
            document.getElementById('autoBtn').classList.add('active');
        });

        // --- ADD/REMOVE PAPER ROW ---
        function addPaperEntry(paper = {
            code: '',
            name: '',
            type: ''
        }) {
            const div = document.createElement('div');
            div.className = 'paper-entry';
            div.innerHTML = `
        <input type="text" placeholder="Paper Code" value="${paper.code}" required>
        <input type="text" placeholder="Paper Name" value="${paper.name}" required>
        <input type="text" placeholder="Paper Type (Theory, Practical)" value="${paper.type}" required>
        <button type="button" class="remove-paper-btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-1  text-xs rounded" title="Remove Paper">X</button>`;
            div.querySelector('.remove-paper-btn').addEventListener('click', () => {
                if (paperEntriesContainer.children.length > 1) {
                    paperEntriesContainer.removeChild(div);
                } else {
                    // Use a custom message instead of alert()
                    showFloatingMessage('Cannot remove the last paper entry.', 'bg-yellow-500');
                }
            });
            paperEntriesContainer.appendChild(div);
        }

        document.getElementById('addPaperBtn').addEventListener('click', () => addPaperEntry());

        // --- FILE UPLOAD + OCR EXTRACTION (Logic updated for auto-switch) ---
        document.getElementById('admitCardUpload').addEventListener('change', handleFileUpload);

        async function handleFileUpload(event) {
            const file = event.target.files[0];
            const status = document.getElementById('upload-status');
            if (!file) return;
            status.textContent = 'Extracting text... please wait.';

            let extractedText = '';
            try {
                if (file.type === 'application/pdf') {
                    extractedText = await extractTextFromPDF(file);
                } else if (file.type.startsWith('image/')) {
                    extractedText = await extractTextFromImage(file);
                }
            } catch (e) {
                console.error('Extraction Error:', e);
                status.textContent = 'Error reading file. Check console for details.';
                return;
            }

            if (!extractedText.trim()) {
                status.textContent = 'No readable text found.';
                return;
            }

            // Try to detect common fields
            const extractedData = parseExamFormText(extractedText);
            fillFormWithData(extractedData);
            
            // *** NEW: Automatically switch to Manual Entry mode ***
            switchToManualMode();
            
            status.textContent = '✅ Data fetched successfully! Please review and verify the details below.';
        }

        async function extractTextFromPDF(file) {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({
                data: arrayBuffer
            }).promise;
            let text = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const strings = content.items.map(item => item.str).join(' ');
                text += strings + '\n';
            }
            return text;
        }

        async function extractTextFromImage(file) {
            const status = document.getElementById('upload-status');
            status.textContent = '🔍 Scanning image... (this may take 10–20 sec)';
            const result = await Tesseract.recognize(file, 'eng', {
                logger: info => status.textContent = `Scanning: ${Math.round(info.progress*100)}%`
            });
            return result.data.text;
        }

        /**
         * @description Extracts and cleans student and exam metadata from the provided text.
         */
        function parseExamFormText(text) {
            const cleanText = text.replace(/[\r\n]+/g, ' ').replace(/\s{2,}/g, ' ').toUpperCase();

            const getMatch = (pattern) => {
                const match = cleanText.match(pattern);
                if (match && match[1]) {
                    return match[1].trim().replace(/\s+/g, ' ');
                }
                return '';
            };

             // --- 1. EXAM TYPE FIX (More robust) ---
            let examType = 'MAIN EXAM';
            // --- MODIFICATION START (C) ---
            if (cleanText.includes('SPECIAL BACK PAPER')) {
                examType = 'BACK EXAM'; // Use BACK EXAM to select the correct dropdown option
            } else if (cleanText.includes('BACK PAPER')) {
                examType = 'BACK EXAM';
            } else if (cleanText.includes('EX-STUDENT')) {
            // --- MODIFICATION END (C) ---
                examType = 'EX-STUDENT EXAM';
            } else {
                const typeMatch = cleanText.match(/COLLEGE\s*EXAMINATION\s*\/\s*([A-Z\s]+)\s*\/\s*(\d+)/i);
                if (typeMatch && typeMatch[1].trim() !== 'ZIND SEMESTER') {
                    const detectedType = typeMatch[1].trim().replace(/\s+/g, ' ');
                    if (detectedType && detectedType !== 'PROVISIONAL ADMIT CARD') {
                        examType = detectedType;
                    }
                }
            }

            // --- 2. INDIVIDUAL NAME EXTRACTION (for Father/Mother fix) ---
            const fatherName = getMatch(/FATHER'?S\s*NAME:[:\-\n\s]*?([\s\S]*?)(?=ENROLLMENT|MOTHER'?S|ROLL|COURSE)/i);
            const motherName = getMatch(/MOTHER'?S\s*NAME:[:\-\n\s]*?([\s\S]*?)(?=DATE\s*OF\s*BIRTH|SEMESTER|ROLL|COURSE)/i);

            let combinedFatherMotherName = '';
            if (fatherName && motherName) {
                combinedFatherMotherName = `${fatherName}/${motherName}`.trim().replace(/\s*\/\s*/g, '/');
            } else {
                combinedFatherMotherName = getMatch(/FATHER'?S\s*[\/\\]?\s*MOTHER'?S\s*NAME:[:\-\n\s]*?([\s\S]*?)(?=ROLL|COURSE|GENDER)/i) || fatherName || motherName;
            }

            // --- 3. COURSE AND GENDER FIX (using non-greedy and lookahead) ---
            const course = getMatch(/COURSE:[:\-\n\s]*?([\s\S]+?)(?=GENDER|COLLEGE\s*NAME|ADMITTED\s*SUBJECT|EXAMINATION)/i) || getMatch(/ADMITTED\s*COURSE:[:\-\n\s]*?([\s\S]+?)(?=ADMITTED\s*SUBJECT|GENDER)/i);

            const gender = getMatch(/GENDER:[:\-\n\s]*?(MALE|FEMALE|OTHER)(?=\s*(?:CASTE|SEMESTER|ROLL|COURSE))/i) ||
                getMatch(/GENDER:[:\-\n\s]*?(MALE|FEMALE|OTHER)/i) || 'FEMALE';

            // --- 4. SEMESTER / YEAR FIX (looking for the specific form field) ---
            const semester = getMatch(/SEMESTER\s*OR\s*YEAR:[:\-\n\s]*?([0-9]+)(?:ST|ND|RD|TH)?/i) || // Specific Exam Form field
                getMatch(/([0-9]+)(?:ST|ND|RD|TH)?\s*SEMESTER/i) ||
                getMatch(/(\d+)'TH/i) ||
                '4'; // Default to 4

            // --- 5. COLLEGE NAME FIX (Non-greedy and robust) ---
            const collegeName =
  getMatch(/COLLEGE\s*NAME:[:\-\n\s]*?([\s\S]*?)(?=EXAMINATION\s*CENTER|SUBJECT|NOTE|PAPER|PAYMENT|DECLARATION)/i) ||
  getMatch(/ADMITTED\s*COLLEGE:[:\-\n\s]*?([\s\S]*?)(?=PAPER|PAYMENT|NOTE|DECLARATION|PROJECT|COURSE|ROLL|GENDER)/i);
            
            // --- FIX: SUBJECT NAME (Exclude 'NOTE' and subsequent text like PAPER) ---
            // Pattern looks for 'SUBJECT:' followed by content, stopping before the next label (NOTE or PAPER).
            const subject =
  getMatch(/SUBJECT:[:\-\n\s]*?([A-Z0-9,\s]+?)(?=NOTE|ADMITTED\s*COLLEGE|PAPER\s*\d+)/i) ||
  getMatch(/ADMITTED\s*SUBJECT[:\-\n\s]*?([A-Z0-9,\s]+?)(?=ADMITTED\s*COLLEGE|NOTE|PAPER\s*\d+)/i);


            // --- FIX: Examination Center (Required User Modification) ---
            const examinationCenter = 
                getMatch(/EXAMINATION\s*CENTER:[:\-\n\s]*?([\s\S]*?)(?=SUBJECT|NOTE|PAPER)/i) || 
                "Visit the official site to view the examination center";


            return {
                // Updated to use combined logic
                candidateName: getMatch(/CANDIDATE\s*NAME:[:\-\n\s]*?([\s\S]*?)(?=FATHER'?S|ROLL|COURSE)/i) || getMatch(/STUDENT\s*NAME:[:\-\n\s]*?([\s\S]*?)(?=REGISTRATION|FATHER)/i),
                fatherMotherName: combinedFatherMotherName, // FIX: Uses combined extraction
                rollNumber: getMatch(/ROLL\s*NUMBER[:\-\n\s]*?([A-Z0-9]+)/i),
                enrollmentNumber: getMatch(/ENROLLMENT\s*(?:NO|NUMBER|ID)?[:\-\n\s]*?([A-Z0-9]+)/i) || getMatch(/REGISTRATION\s*NUMBER:\s*([A-Z0-9]+)/i) || getMatch(/([M]\d{8})/i),
                course: course, // FIX: Improved pattern
                gender: gender, // FIX: Improved pattern
                semester: semester, // FIX: Improved pattern
                examType: examType, // FIX: Improved logic
                collegeName: collegeName, // FIX: Improved pattern
                examinationCenter: examinationCenter, // **UPDATED**
                subject: subject, // FIX: Subject extraction improved to exclude NOTE
                papers: extractPapers(text.toUpperCase())
            };
        }

        /**
         * @description Extracts and cleans paper details from the provided text.
         */
        function extractPapers(text) {
            const papers = [];
            // Pattern: PAPER X <CODE> <NAME> <TYPE>
            const regex = /PAPER\s*\d+\s*([A-Z0-9]+)\s*([\s\S]*?)(THEORY|PRACTICAL|PROJECT|MINNOR|VOCATIONAL|CO CURRICULAR|INTERNAL|EXTERNAL)[\s,]*?(INTERNAL|EXTERNAL)?/gi;
            let match;
            
            // Array of words to filter out if they appear as the first word of the paper name
            const filterWords = ['BOTANY', 'SUBJECT', 'VOCATIONAL', 'CO', 'PHYSICS', 'CHEMISTRY', 'MATHEMATICS', 'PRACTICAL:', 'LAB', 'ALGAE,'];

            while ((match = regex.exec(text)) !== null) {
                const rawNameArea = match[2].trim().replace(/[\n\t\r]+/g, ' ').replace(/\s{2,}/g, ' ');
                const code = match[1].trim();
                let type1 = match[3].trim();
                let type2 = match[4] ? match[4].trim() : '';

                // Clean up the raw name area by filtering common subject words
                let nameParts = rawNameArea.split(/\s+/).filter(p => p.length > 0);
                
                // FIX: Loop to remove common subject name (like "BOTANY") from the start of the paper name
                let cleanedNameParts = [];
                let removeNext = true;
                for (const part of nameParts) {
                    if (removeNext && filterWords.includes(part)) {
                        continue; // Skip the word
                    } else {
                        // Once a non-filter word is hit, stop filtering the start
                        removeNext = false;
                        cleanedNameParts.push(part);
                    }
                }
                nameParts = cleanedNameParts;

                // Final cleanup for phrases like 'BOTANY MICROBILOGY' where 'BOTANY' is removed
                let name = nameParts.join(' ');
                
                // If name is empty after stripping, use a fallback
                if(name.length === 0 && code.endsWith('P')) {
                     name = 'PRACTICAL';
                } else if (name.length === 0) {
                    name = 'GENERAL PAPER';
                }

                papers.push({
                    code: code,
                    name: name.toUpperCase(),
                    // Clean up paper type from internal/external mentions that might be repeated
                    type: type1.toUpperCase().replace(/,?\s*EXTERNAL/g, '').replace(/,?\s*INTERNAL/g, '').replace(/\s{2,}/g, ' ')
                });
            }
            
            // Final check: Extracting single paper from Exam Form table (Pattern: CODE NAME TYPE)
            if (papers.length === 0) {
                const singlePaperMatch = text.match(/PAPER\s*1\s*([A-Z0-9]+)\s*([\s\S]+?)(THEORY|PRACTICAL|PROJECT|INTERNAL|EXTERNAL)/i);
                if (singlePaperMatch) {
                    // Try to clean up the name part
                    let name = singlePaperMatch[2].trim().replace(/[\n\t\r]+/g, ' ').replace(/\s{2,}/g, ' ');
                    name = name.replace(/SUBJECT/i, '').trim(); // Remove 'SUBJECT' if present

                    papers.push({
                        code: singlePaperMatch[1].trim(),
                        name: name.toUpperCase(),
                        type: singlePaperMatch[3].trim().toUpperCase()
                    });
                }
            }

            return papers.length ? papers : [{
                code: '',
                name: '',
                type: ''
            }];
        }

        // --- FILL FORM WITH AUTO DATA ---
        function fillFormWithData(data) {
            const set = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.value = val || '';
            };
            set('candidateName', data.candidateName);
            set('fatherMotherName', data.fatherMotherName);
            set('rollNumber', data.rollNumber);
            set('enrollmentNumber', data.enrollmentNumber);
            set('course', data.course);
            // Ensure dropdowns get valid options
            set('gender', ['MALE', 'FEMALE', 'OTHER'].includes(data.gender) ? data.gender : 'FEMALE');
            set('semester', data.semester);
            set('examType', ['MAIN EXAM', 'BACK EXAM', 'EX-STUDENT EXAM'].includes(data.examType) ? data.examType : 'MAIN EXAM');
            set('collegeName', data.collegeName);
            // Uses the extracted or defaulted examinationCenter value
            set('examinationCenter', data.examinationCenter); 
            set('subject', data.subject);

            paperEntriesContainer.innerHTML = '';
            if (data.papers.length === 0) {
                addPaperEntry(); // Add one empty row if none found
            } else {
                data.papers.forEach(addPaperEntry);
            }
        }

        // --- UTILITY: SHOW FLOATING MESSAGE (for replacing alert) ---
        function showFloatingMessage(message, classes = 'bg-blue-500') {
            let msgBox = document.getElementById('floating-message');
            if (!msgBox) {
                msgBox = document.createElement('div');
                msgBox.id = 'floating-message';
                msgBox.className = 'fixed top-4 right-4 p-4 rounded-lg text-white shadow-xl transition-opacity duration-300 z-50';
                document.body.appendChild(msgBox);
            }
            msgBox.className = `fixed top-4 right-4 p-4 rounded-lg text-white shadow-xl transition-opacity duration-300 z-50 ${classes}`;
            msgBox.textContent = message;
            msgBox.style.opacity = '1';

            setTimeout(() => {
                msgBox.style.opacity = '0';
            }, 3000);
        }

        /**
         * @description Formats and updates the printed date and time on the admit card and footer.
         */
        function updateDateTime() {
            const now = dayjs();
            
            // For Admit Card Content
            const dateStrAC = now.format('DD-MMM-YYYY'); // e.g., 04-Oct-2025
            const timeStrAC = now.format('hh:mm:ss A'); // e.g., 09:31:57 PM
            const timezoneStrAC = now.format('ZZ').replace(/(\d{2})(\d{2})/, '$1:$2'); // e.g., +05:30 (manual formatting for better readability)
            document.getElementById('generatedTime').innerHTML =
                `${dateStrAC} ${timeStrAC} IST ${timezoneStrAC}`;
                
            // For Footer (Live Clock)
            const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
            document.getElementById('liveDate').textContent = new Date().toLocaleDateString('en-IN', dateOptions);
            document.getElementById('liveTime').textContent = new Date().toLocaleTimeString('en-IN', timeOptions);
        }

        /**
         * @description Clears all fields in the manual entry form.
         */
        function resetForm() {
            document.getElementById('admitCardForm').reset();
            paperEntriesContainer.innerHTML = '';
            addPaperEntry();
            document.getElementById('admit-card-wrapper').style.display = 'none';
            document.getElementById('downloadBtn').style.display = 'none';
            document.getElementById('printBtn').style.display = 'none';
            showFloatingMessage('Form has been reset.', 'bg-red-500');
        }

        /**
         * @description Initiates the native browser print dialogue for the admit card content only.
         */
        function printAdmitCard() {
            window.print();
        }

        /**
         * @description Main function to generate the admit card view.
         */
        function generateAdmitCard() {
            const candidateName = document.getElementById('candidateName').value,
                fatherMotherName = document.getElementById('fatherMotherName').value,
                rollNumber = document.getElementById('rollNumber').value,
                enrollmentNumber = document.getElementById('enrollmentNumber').value,
                course = document.getElementById('course').value,
                gender = document.getElementById('gender').value,
                semester = document.getElementById('semester').value,
                rawExamType = document.getElementById('examType').value,
                examType = rawExamType === 'BACK EXAM' ? 'SPECIAL BACK EXAM' : rawExamType,
                collegeName = document.getElementById('collegeName').value,
                examinationCenter = document.getElementById('examinationCenter').value,
                subject = document.getElementById('subject').value;

            // Simple validation
            if (!candidateName || !rollNumber || !course || !examType) {
                showFloatingMessage('Please fill in all required fields.', 'bg-red-700');
                return;
            }

            // Get paper details
            const paperEntries = Array.from(paperEntriesContainer.children).map(div => ({
                code: div.querySelector('input:nth-child(1)').value.toUpperCase() || 'N/A', // Ensure code is at least N/A
                name: div.querySelector('input:nth-child(2)').value.toUpperCase() || 'N/A',
                type: div.querySelector('input:nth-child(3)').value.toUpperCase() || 'N/A',
            }));

            // Build papers table HTML
            let papersHtml = paperEntries.map((paper, index) => {
                const details = examDatesheet[paper.code] || {
                    date: 'SCHEDULE NOT FOUND', 
                    day: 'SCHEDULE NOT FOUND',
                    shift: 'SCHEDULE NOT FOUND',
                    name: paper.name // Use manually entered name as fallback
                };

                // *** NEW/UPDATED: Use the name from the datesheet if available, otherwise use manual entry ***
                const finalPaperName = details.name && details.name !== 'N/A' ? details.name.toUpperCase() : paper.name;

                let scheduleHTML;
                const paperCodeUpper = paper.code.toUpperCase();
                const paperTypeCleaned = paper.type.toUpperCase().replace(/\s{2,}/g, ' '); 
                let customMessage = ''; 

                // --- START LOGIC FOR P, R, V PAPERS ---
                if (paperCodeUpper.endsWith('P')) {
                    customMessage = 'Contact the college for Exam Date (Paper is Practical)';
                } else if (paperCodeUpper.endsWith('R')) {
                    customMessage = 'Contact the college for Exam Date (Paper is Research Project)';
                } else if (paperCodeUpper.startsWith('V')) {
                    customMessage = 'Contact the college for Exam Date (Paper is Skill Development)';
                }
                // --- END LOGIC FOR P, R, V PAPERS ---

                if (customMessage) { // Check if a custom message was set (for P, R, V codes)
                    scheduleHTML = `<td colspan="3" style="text-align: center; font-weight: bold; color: #d32f2f;">${customMessage}</td>`;
                } else if (details.date === 'SCHEDULE NOT FOUND' || details.date === 'N/A') {
                    // For codes not found in the datesheet array (and are not P, R, or V)
                    scheduleHTML = `<td colspan="3" style="text-align: center; font-weight: bold; color: #f57c00;">Visit ccsuniversity.ac.in to confirm the exam schedule</td>`;
                } else {
                    // Normal entry found
                    const [shiftName, shiftTime] = details.shift.split('('); 
                    scheduleHTML = `
                        <td>${details.date}</td>
                        <td>${details.day}</td>
                        <td>
                            ${shiftName.trim()}<br>
                            ${shiftTime ? `(${shiftTime}` : ''}
                        </td>
                    `;
                }

                return `
                <tr>
                    <td style="text-align: center;">${index + 1}</td> 
                    <td>${paper.code}</td>
                    <td>${finalPaperName}</td> <td>${paper.type}</td>
                    ${scheduleHTML}
                </tr>`;
            }).join('');

            // Fill the Admit Card HTML
            document.getElementById('ac-rollNumber').textContent = rollNumber.toUpperCase();
            document.getElementById('ac-enrollmentNumber').textContent = enrollmentNumber.toUpperCase();
            document.getElementById('ac-candidateName').textContent = candidateName.toUpperCase();
            document.getElementById('ac-fatherMotherName').textContent = fatherMotherName.toUpperCase();
            document.getElementById('ac-course').textContent = course.toUpperCase();
            document.getElementById('ac-gender').textContent = gender.toUpperCase();
            document.getElementById('ac-collegeName').textContent = collegeName.toUpperCase();
            document.getElementById('ac-examinationCenter').textContent = examinationCenter.toUpperCase();
            document.getElementById('ac-subject').textContent = subject.toUpperCase();
            
            const semesterText = `${semester}${['1','2','3'].includes(semester) ? ['st','nd','rd'][semester-1] : 'th'} SEMESTER`;
            document.getElementById('exam-type-sem').textContent = `${examType} (${semesterText})`;

            const paperTableBody = document.querySelector('#ac-papers-table tbody');
            paperTableBody.innerHTML = papersHtml;

            // Show the admit card and action buttons
            document.getElementById('admit-card-wrapper').style.display = 'block';
            document.getElementById('downloadBtn').style.display = 'inline-block';
            document.getElementById('printBtn').style.display = 'inline-block';
            updateDateTime(); // Update the printed date/time

            // Scroll to the admit card
            document.getElementById('admit-card-wrapper').scrollIntoView({
                behavior: 'smooth'
            });
            showFloatingMessage('Admit Card Generated! 📄', 'bg-green-600');
        }


        // --- DOWNLOAD AS PDF ---
        document.getElementById('downloadBtn').addEventListener('click', () => {
            const element = document.getElementById('admit-card-content');
            const candidateName = document.getElementById('candidateName').value;
            const filename = `${candidateName.replace(/\s/g, '_')}_Admit_Card.pdf`;

            showFloatingMessage('Generating PDF... please wait.', 'bg-yellow-600');

            // Configure PDF generation options for better print quality and A4 size simulation
            const opt = {
                margin: 0.2,
                filename: filename,
                image: {
                    type: 'jpeg',
                    quality: 1
                },
                html2canvas: {
                    scale: 4,
                    letterRendering: true,
                   useCORS: true
                },
                jsPDF: {
                    unit: 'in',
                    format: 'a4',
                    orientation: 'portrait'
                }
            };

            // Use html2pdf to generate and save
            html2pdf().from(element).set(opt).save();

            // The save function is asynchronous, so the message below is only an estimate.
            setTimeout(() => {
                showFloatingMessage('PDF download initiated. 📥', 'bg-green-500');
            }, 500);
        });

        // --- GO TO TOP BUTTON FUNCTIONS ---
        let mybutton = document.getElementById("topBtn");

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        }

        function topFunction() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
        mybutton.addEventListener('click', topFunction);

        // --- BUTTON EVENT LISTENERS ---
        document.getElementById('generateBtn').addEventListener('click', generateAdmitCard);
        document.getElementById('resetBtn').addEventListener('click', resetForm);
        document.getElementById('printBtn').addEventListener('click', printAdmitCard);
        
        // Mobile Menu Toggle
    document.getElementById('menu-btn').addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.toggle('hidden');
    });
   
    
    </script>
</body>
</html>
