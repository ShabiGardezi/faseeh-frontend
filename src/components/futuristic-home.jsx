'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, MessageSquare, Book, CheckCircle, Type, CheckSquare } from "lucide-react";

export function FuturisticHome() {
  const [activeService, setActiveService] = useState(null)
  const controls = useAnimation()
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [])

  const services = [
    { icon: Mail, title: "Email Genius", description: "Craft emails that demand attention" },
    { icon: MessageSquare, title: "Marketing Muse", description: "Words that sell, stories that compel" },
    { icon: Book, title: "Story Weaver", description: "Bring childrens imaginations to life" },
    { icon: CheckCircle, title: "Precision Pro", description: "Flawless content, every time" },
    { icon: Type, title: "Tashkeel Master", description: "Perfect Arabic diacritics in a click" },
    { icon: CheckSquare, title: "Grammar Guardian", description: "Your personal language perfector" },
  ]

  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white overflow-hidden relative">
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            'radial-gradient(circle, rgba(32,177,201,0.1) 0%, rgba(28,154,175,0.1) 100%)',
            'radial-gradient(circle, rgba(32,177,201,0.2) 0%, rgba(28,154,175,0.2) 100%)',
            'radial-gradient(circle, rgba(32,177,201,0.1) 0%, rgba(28,154,175,0.1) 100%)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div
        className="fixed w-64 h-64 rounded-full pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle, rgba(32,177,201,0.3) 0%, rgba(28,154,175,0) 70%)',
          x: cursorPosition.x - 128,
          y: cursorPosition.y - 128,
        }} />
      <header className="relative z-10">
        <nav className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <motion.h1
              className="text-4xl font-bold"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              AI Text Craft
            </motion.h1>
            <motion.ul
              className="flex space-x-8"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              {['Home', 'Services', 'About', 'Contact'].map((item, index) => (
                <motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <a href="#" className="text-lg hover:text-[#20b1c9] transition-colors">{item}</a>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-12 relative z-10">
        <motion.section
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}>
          <motion.h2
            className="text-6xl font-bold mb-6 leading-tight"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            Unleash the Power of AI<br />in Your Writing
          </motion.h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Experience the future of content creation with our cutting-edge AI tools. 
            From emails to stories, we are revolutionizing the way you write.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="bg-[#20b1c9] hover:bg-[#1C9AAF] text-white text-xl px-12 py-6 rounded-full shadow-lg transition-all duration-300">
              Start Creating Magic
            </Button>
          </motion.div>
        </motion.section>

        <section className="mb-24">
          <motion.h3
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}>
            Our AI-Powered Services
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                onHoverStart={() => setActiveService(index)}
                onHoverEnd={() => setActiveService(null)}>
                <motion.div
                  className="bg-white/10 backdrop-blur-md rounded-xl p-8 h-full border border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(32,177,201,0.5)" }}>
                  <service.icon className="w-12 h-12 mb-6 text-[#20b1c9]" />
                  <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
                  <p className="text-gray-300">{service.description}</p>
                </motion.div>
                <AnimatePresence>
                  {activeService === index && (
                    <motion.div
                      className="absolute inset-0 bg-[#20b1c9]/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}>
                      <Button className="bg-white text-[#20b1c9] hover:bg-gray-100">
                        Try Now
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}>
          <h3 className="text-4xl font-bold mb-6">Experience AI Writing</h3>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Type anything below and watch as our AI transforms your input into polished, professional text.
          </p>
          <div
            className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <Input
              className="mb-4 bg-transparent border-white/30 text-white placeholder-white/50"
              placeholder="Start typing here..." />
            <div className="h-40 overflow-auto bg-white/5 rounded p-4 mb-4">
              <motion.p animate={controls} className="text-left">
                Your AI-enhanced text will appear here...
              </motion.p>
            </div>
            <Button
              className="bg-[#20b1c9] hover:bg-[#1C9AAF] text-white"
              onClick={() => {
                controls.start({
                  opacity: [0, 1],
                  transition: { duration: 0.5 }
                })
              }}>
              Enhance Text
            </Button>
          </div>
        </motion.section>

        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}>
          <h3 className="text-4xl font-bold mb-6">Join the AI Revolution</h3>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Stay updated with the latest in AI writing technology. Subscribe to our newsletter for exclusive tips, updates, and early access to new features.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-white/10 border-white/30 text-white placeholder-white/50" />
            <Button type="submit" className="bg-[#20b1c9] hover:bg-[#1C9AAF] text-white px-8">
              Subscribe
            </Button>
          </form>
        </motion.section>
      </main>
      <footer className="bg-white/5 backdrop-blur-md py-12 mt-24 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2023 AI Text Craft. All rights reserved.</p>
          <div className="mt-6 flex justify-center space-x-6">
            {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
              <motion.a
                key={social}
                href="#"
                className="text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}>
                {social}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>)
  );
}