'use client'

import { Facebook, Twitter, Linkedin, Instagram, Globe, Github } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-8 border-t border-white/10">
            <div className="max-w-[1440px] mx-auto px-6">

                <div className="flex flex-col items-start gap-6 mb-12">
                    <div className="text-2xl font-bold tracking-tighter">blockrides</div>

                    <a 
                        href="https://github.com/julian-farrel/blockrides" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-zinc-300 transition-colors p-2 bg-zinc-800 rounded-full hover:bg-zinc-700"
                        aria-label="GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                </div>

                <div className="mt-8 text-xs text-gray-500 text-center md:text-left border-t border-white/5 pt-8">
                    © 2026 Blockrides Inc.
                </div>
            </div>
        </footer>   
    )
}