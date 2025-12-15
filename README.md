EcoTrack — Sustainable Living community

EcoTrack একটি কমিউনিটি প্ল্যাটফর্ম যেখানে পরিবেশ-সচেতন মানুষরা টেকসই জীবনযাপনের চ্যালেঞ্জে যোগ দেয়, ব্যবহারিক ইকো-টিপ শেয়ার করে, লোকাল গ্রিন ইভেন্ট ব্রাউজ করে এবং ব্যক্তিগত পরিবেশগত প্রভাব ট্র্যাক করে—সবকিছু পরিমাপযোগ্য ও কমিউনিটি-ড্রাইভেন প্রগ্রেসের উপর ফোকাস করে।

Live site url





Live URL: https://ecotrack-assigment10.netlify.app/



Client repo: https://github.com/Anisur369/EcoTrack-server-site



Server repo: https://github.com/Anisur369/EcoTrack-server-site



প্রধান বৈশিষ্ট্যসমূহ





ডায়নামিক হোমপেজ: হিরো কারোসেল, লাইভ স্ট্যাটস (মোট CO₂ সেভড, প্লাস্টিক কমানো), অ্যাক্টিভ চ্যালেঞ্জ, রিসেন্ট টিপস, ও আপকামিং ইভেন্টস।



অথেন্টিকেশন: Firebase Auth (ইমেইল/পাসওয়ার্ড + Google) সহ Login/Register, প্রোটেক্টেড রুটে রিডাইরেক্ট ও “ইনটেন্ডেড রুট” এ ফিরে যাওয়া।



প্রোটেক্টেড ড্যাশবোর্ড: My Activities-এ পার্সোনাল প্রগ্রেস ট্র্যাকিং, স্ট্যাটাস ও পার্সেন্টেজ আপডেট UI।



অ্যাডভান্সড ফিল্টারিং: ক্যাটাগরি $in, ডেট রেঞ্জ $gte/$lte, পার্টিসিপ্যান্টস রেঞ্জ $gte/$lte সহ ফ্লেক্সিবল /api/challenges ফিল্টার।



CRUD API: চ্যালেঞ্জ, ইউজারচ্যালেঞ্জ, টিপস, ইভেন্টস—MongoDB + Express দিয়ে ফুল CRUD ও জয়ন এন্ডপয়েন্ট।



রেসপন্সিভ ডিজাইন: মোবাইল/ট্যাবলেট/ডেস্কটপ—ইউনিফর্ম টাইপোগ্রাফি, গ্রিড, ইকুয়াল কার্ড হাইট/উইড্থ, এবং নতুন X (টুইটার) লোগো।



লোডিং ও এরর UX: গ্লোবাল স্পিনার, স্কেলেটন লোডার, React Error Boundary, স্টাইলড টোস্ট নোটিফিকেশন (alert নয়)।



অ্যাক্সেসিবিলিটি ও সিকিউরিটি: সেমান্টিক HTML, alt ট্যাগ, ফোকাস স্টেট; client/server এনভায়রনমেন্ট ভ্যারিয়েবল সুরক্ষিত রাখা।



ডিপ্লয়মেন্ট রেডি: Client—Netlify/Surge/Firebase, Server—Vercel; রিলোডে রুট ব্রেক না হওয়া ও Firebase ডোমেইন অথরাইজেশন।

রুটসমূহ (SPA)





Public: /, /challenges, /challenges/:id, /login, /register, /forgot-password, 404



Protected: /challenges/add, /challenges/join/:id, /my-activities, /my-activities/:id



রুট বিহেভিয়ার: আনঅথেন্টিকেটেড হলে /login এ রিডাইরেক্ট; সফল লগইনের পর নির্দিষ্ট “ইনটেন্ডেড রুট” এ ফিরে যায়।

API এন্ডপয়েন্ট (Express + MongoDB)





Challenges list: GET /api/challenges (ক্যাটাগরি $in, ডেট রেঞ্জ, পার্টিসিপ্যান্টস রেঞ্জ ফিল্টার সাপোর্টেড)



Challenge details: GET /api/challenges/:id



Create challenge: POST /api/challenges



Update challenge: PATCH /api/challenges/:id (owner/admin)



Delete challenge: DELETE /api/challenges/:id (owner/admin)



Join challenge: POST /api/challenges/join/:id (প্রোটেক্টেড; participants++ এবং UserChallenges এ রেকর্ড)



Tips list: GET /api/tips



Events list: GET /api/events

কালেকশন স্কিমার সারাংশ





challenges: title, category, description, duration, target, participants, impactMetric, createdBy, startDate, endDate, imageUrl, createdAt, updatedAt



userChallenges: userId, challengeId, status ("Not Started" | "Ongoing" | "Finished"), progress, joinDate, updatedAt



tips: title, content, category, author, authorName, upvotes, createdAt



events: title, description, date, location, organizer, maxParticipants, currentParticipants

যোগাযোগ





Author: Anisur



Email: anisurrahman57136@gmail.com



Location: Dhaka, Bangladesh




