import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navbar: {
        home: 'Home',
        about: 'About Us',
        courses: 'Courses',
        instructors: 'Our Instructors',
        language: 'English',
        logo: '<em>SCI</em>CODE ',
        login: 'Login',
       logout: 'Logout',
       game: 'game',


        register: 'Register',
      },
      hero: {
        welcome: 'Welcome we are ',
        book_now: 'Book Now',
        contact_us: 'Contact Us',
        discover_more: 'Discover more',
        company_name: "<em>SCI</em>CODE<em> Academy</em> "
      },
   
    }
  },
  ar: {
    translation: {
      navbar: {
        home: 'الرئيسية',
        about: 'حولنا',
        courses: 'الدورات',
        instructors: 'مدربونا',
        language: 'العربية',
        logo: '<em>ساي</em>-كود',
        login: 'تسجيل الدخول',
       logout: 'تسجيل الخروج',
       game: ' اللعبة',

        register: 'انشاء حساب'
      },
      hero: {
        welcome: 'مرحبًا بكم نحن ',
        book_now: 'احجز الآن',
        contact_us: 'اتصل بنا',
        discover_more: 'اكتشف المزيد',
        company_name: "  الكتب <em>عا</em>-لم"
      },
     
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
