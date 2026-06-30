import bcrypt from 'bcryptjs';
import { sequelize, User, Stat, PortfolioItem, Testimonial, FAQ } from './models';

async function seed() {
  try {
    console.log('Connecting to the database...');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Force sync database (drops tables and recreates them)
    console.log('Syncing database...');
    await sequelize.sync({ force: true });
    console.log('Database synced.');

    // 1. Seed Admin User
    console.log('Seeding Admin User...');
    const passwordHash = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Codex Admin',
      email: 'admin@codex.com',
      passwordHash
    });
    console.log('Admin user seeded (admin@codex.com / admin123)');

    // 2. Seed Stats
    console.log('Seeding Stats...');
    await Stat.bulkCreate([
      {
        key: 'projects',
        value: 100,
        suffix: '+',
        labelEn: 'Projects Delivered',
        labelAr: 'مشاريع منجزة',
        displayOrder: 1
      },
      {
        key: 'satisfaction',
        value: 99,
        suffix: '%',
        labelEn: 'Client Satisfaction',
        labelAr: 'رضا العملاء',
        displayOrder: 2
      },
      {
        key: 'support',
        value: 24,
        suffix: '/7',
        labelEn: 'Support Available',
        labelAr: 'دعم متاح',
        displayOrder: 3
      }
    ]);

    // 3. Seed Portfolio Items
    console.log('Seeding Portfolio Items...');
    await PortfolioItem.bulkCreate([
      {
        titleEn: 'FinTech Dashboard',
        titleAr: 'لوحة تحكم مالية',
        categoryEn: 'Web Application',
        categoryAr: 'تطبيق ويب',
        descriptionEn: 'A comprehensive analytics dashboard for a leading financial institution.',
        descriptionAr: 'لوحة تحكم تحليلية شاملة لمؤسسة مالية رائدة.',
        imageUrl: '/portfolio/fintech.jpg',
        projectUrl: '#',
        displayOrder: 1
      },
      {
        titleEn: 'Health Tracker Pro',
        titleAr: 'متتبع الصحة الاحترافي',
        categoryEn: 'Mobile App',
        categoryAr: 'تطبيق جوال',
        descriptionEn: 'A cross-platform mobile application for personalized health tracking.',
        descriptionAr: 'تطبيق جوال متعدد المنصات لتتبع الصحة الشخصية.',
        imageUrl: '/portfolio/health.jpg',
        projectUrl: '#',
        displayOrder: 2
      },
      {
        titleEn: 'E-Commerce Platform',
        titleAr: 'منصة تجارة إلكترونية',
        categoryEn: 'Full Stack',
        categoryAr: 'تطوير شامل',
        descriptionEn: 'A high-conversion headless e-commerce solution built with Next.js.',
        descriptionAr: 'حل تجارة إلكترونية متطور وعالي التحويل مبني باستخدام Next.js.',
        imageUrl: '/portfolio/ecommerce.jpg',
        projectUrl: '#',
        displayOrder: 3
      }
    ]);

    // 4. Seed Testimonials
    console.log('Seeding Testimonials...');
    await Testimonial.bulkCreate([
      {
        quoteEn: 'Codex completely transformed our digital presence. The new web app is incredibly fast and our conversion rates have doubled.',
        quoteAr: 'قامت كوديكس بتحويل وجودنا الرقمي بالكامل. تطبيق الويب الجديد سريع للغاية وتضاعفت معدلات التحويل لدينا.',
        authorEn: 'Jane Doe',
        authorAr: 'جين دو',
        roleEn: 'CEO',
        roleAr: 'الرئيس التنفيذي',
        companyEn: 'TechStart',
        companyAr: 'TechStart',
        rating: 5,
        displayOrder: 1
      },
      {
        quoteEn: 'Working with Codex was a breeze. They handled everything from design to deployment with extreme professionalism.',
        quoteAr: 'كان العمل مع كوديكس سهلاً للغاية. لقد تعاملوا مع كل شيء من التصميم إلى النشر باحترافية شديدة.',
        authorEn: 'John Smith',
        authorAr: 'جون سميث',
        roleEn: 'CTO',
        roleAr: 'المدير التقني',
        companyEn: 'Enterprise Solutions',
        companyAr: 'Enterprise Solutions',
        rating: 5,
        displayOrder: 2
      },
      {
        quoteEn: 'The mobile app they delivered is stunning. The UI is flawless and it performs perfectly across all devices.',
        quoteAr: 'تطبيق الجوال الذي سلموه مذهل. واجهة المستخدم خالية من العيوب وتعمل بشكل مثالي على جميع الأجهزة.',
        authorEn: 'Sarah Connor',
        authorAr: 'سارة كونور',
        roleEn: 'Product Manager',
        roleAr: 'مدير منتج',
        companyEn: 'Innovate AI',
        companyAr: 'Innovate AI',
        rating: 5,
        displayOrder: 3
      }
    ]);

    // 5. Seed FAQs
    console.log('Seeding FAQs...');
    await FAQ.bulkCreate([
      {
        questionEn: 'What is your typical project timeline?',
        questionAr: 'ما هو الجدول الزمني المعتاد للمشروع؟',
        answerEn: 'Depending on the complexity, a typical MVP takes 8-12 weeks. Enterprise solutions can take 4-6 months to ensure maximum robustness and scalability.',
        answerAr: 'اعتمادًا على التعقيد، يستغرق المنتج الأولي المعتاد (MVP) من 8 إلى 12 أسبوعًا. يمكن أن تستغرق حلول الشركات من 4 إلى 6 أشهر لضمان أقصى قدر من القوة وقابلية التوسع.',
        displayOrder: 1
      },
      {
        questionEn: 'Do you offer post-launch support?',
        questionAr: 'هل تقدمون دعماً بعد الإطلاق؟',
        answerEn: 'Yes, we offer comprehensive maintenance and support packages to ensure your software remains secure, updated, and performs optimally.',
        answerAr: 'نعم، نقدم حزم صيانة ودعم شاملة لضمان بقاء برنامجك آمنًا ومحدثًا ويعمل على النحو الأمثل.',
        displayOrder: 2
      },
      {
        questionEn: 'What is your pricing model?',
        questionAr: 'ما هو نموذج التسعير الخاص بكم؟',
        answerEn: 'We offer both fixed-bid and time-and-materials engagement models, tailored to the specific needs and flexibility requirements of your project.',
        answerAr: 'ننقدم نماذج تسعير ثابتة ونماذج بناءً على الوقت والمواد، مصممة وفقًا للاحتياجات المحددة ومتطلبات المرونة لمشروعك.',
        displayOrder: 3
      }
    ]);

    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
