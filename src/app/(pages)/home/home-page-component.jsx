"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  MessageSquare,
  Book,
  CheckCircle,
  Type,
  CheckSquare,
} from "lucide-react";

export function HomePageComponent() {
  const [activeService, setActiveService] = useState(null);
  const controls = useAnimation();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const services = [
    {
      icon: Mail,
      title: "عبقري البريد الإلكتروني",
      description: "اصنع رسائل إلكترونية تجذب الانتباه",
    },
    {
      icon: MessageSquare,
      title: "ملهمة التسويق",
      description: "كلمات تبيع، قصص تأسر",
    },
    {
      icon: Book,
      title: "حائك قصص الأطفال",
      description: "اجلب خيال الأطفال إلى الحياة",
    },
    {
      icon: CheckCircle,
      title: "المحترف الدقيق",
      description: "محتوى خالي من العيوب، في كل مرة",
    },
    {
      icon: Type,
      title: "ماستر التشكيل",
      description: "تشكيل مثالي للعربية بنقرة واحدة",
    },
    {
      icon: CheckSquare,
      title: "حارس القواعد",
      description: "مُحسن لغتك الشخصي",
    },
  ];

  // References for each section
  const sectionRefs = useRef([]);
  const observer = useRef();

  useEffect(() => {
    // Function to handle intersection changes
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.getAttribute("data-index");
          controls.start({ opacity: 1, y: 0 });
          observer.current.unobserve(entry.target);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1, // Trigger when 10% of the section is visible
    });

    // Observe each section
    sectionRefs.current.forEach((section) => {
      if (section) observer.current.observe(section);
    });

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <motion.div
        className="fixed w-64 h-64 rounded-full pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(32,177,201,0.15) 0%, rgba(255,255,255,0) 70%)",
          x: cursorPosition.x - 128,
          y: cursorPosition.y - 128,
        }}
      />
      <main className="container mx-auto px-6 py-12 relative z-10 my-[8%]">
        <motion.section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-6xl font-bold mb-6 leading-tight text-[#20b1c9]"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            أطلق العنان لقوة الذكاء الاصطناعي
            <br />
            في كتاباتك
          </motion.h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-600">
            اختبر مستقبل إنشاء المحتوى مع أدواتنا المتقدمة للذكاء الاصطناعي. من
            الرسائل الإلكترونية إلى القصص، نحن نُحدث ثورة في أسلوبك في الكتابة.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-[#20b1c9] hover:bg-[#1C9AAF] text-white text-xl px-12 py-6 rounded-full shadow-lg transition-all duration-300">
              ابدأ في صنع السحر
            </Button>
          </motion.div>
        </motion.section>

        <motion.section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="mb-24 mt-44"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <motion.h3 className="text-4xl font-bold mb-12 text-center text-[#20b1c9]">
            خدماتنا المدعومة بالذكاء الاصطناعي
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-24">
            {services.map((service, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                onHoverStart={() => setActiveService(index)}
                onHoverEnd={() => setActiveService(null)}
              >
                <motion.div
                  className="bg-white rounded-xl p-8 h-full border border-gray-200 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(32,177,201,0.2)",
                  }}
                  dir="rtl"
                >
                  <service.icon className="w-12 h-12 mb-6 text-[#20b1c9]" />
                  <h4 className="text-2xl font-bold mb-4 text-[#20b1c9]">
                    {service.title}
                  </h4>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
                <AnimatePresence>
                  {activeService === index && (
                    <motion.div
                      className="absolute inset-0 bg-[#20b1c9]/10 backdrop-blur-sm rounded-xl flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button className="bg-[#20b1c9] text-white hover:bg-[#1C9AAF]">
                        جرّب الآن
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="text-center mb-24" data-aos="fade-up">
          <h3 className="text-4xl font-bold mb-6 text-[#20b1c9]">
            اختبر الكتابة بالذكاء الاصطناعي
          </h3>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-600">
            اكتب أي شيء أدناه وشاهد كيف يحوّل الذكاء الاصطناعي إدخالك إلى نص
            مصقول واحترافي.
          </p>
          <div
            className="max-w-3xl mx-auto bg-white rounded-xl p-8 border border-gray-200 shadow-lg"
            dir="rtl"
          >
            <Input
              className="mb-4 border-gray-300 text-gray-800 placeholder-gray-400"
              placeholder="ابدأ الكتابة هنا..."
            />
            <div className="h-40 overflow-auto bg-gray-50 rounded p-4 mb-4">
              <motion.p animate={controls} className="text-right text-gray-600">
                سيظهر نصك المعزز بالذكاء الاصطناعي هنا...
              </motion.p>
            </div>
            <Button
              className="bg-[#20b1c9] hover:bg-[#1C9AAF] text-white"
              onClick={() => {
                controls.start({
                  opacity: [0, 1],
                  transition: { duration: 0.5 },
                });
              }}
            >
              عزّز النص
            </Button>
          </div>
        </motion.section>

        <motion.section className="text-center" data-aos="fade-up">
          <h3 className="text-4xl font-bold mb-6 text-[#20b1c9]">
            انضم إلى ثورة الذكاء الاصطناعي
          </h3>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-600">
            ابقَ على اطلاع بأحدث تقنيات الكتابة بالذكاء الاصطناعي. اشترك في
            نشرتنا الإخبارية للحصول على نصائح حصرية، وتحديثات، والوصول المبكر
            إلى الميزات الجديدة.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            dir="rtl"
          >
            <Input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-grow border-gray-300 text-gray-800 placeholder-gray-400"
              dir="rtl"
            />
            <Button
              type="submit"
              className="bg-[#20b1c9] hover:bg-[#1C9AAF] text-white px-8"
            >
              اشترك
            </Button>
          </form>
        </motion.section>
      </main>
    </div>
  );
}
