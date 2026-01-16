'use client'

import { Facebook, Twitter, Linkedin, Instagram, Globe } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-8 border-t border-white/10">
            <div className="max-w-[1440px] mx-auto px-6">

                <div className="text-2xl font-bold tracking-tighter mb-12">Block Rides</div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    <div className="space-y-4">
                        <h4 className="font-medium text-lg">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white">About us</a></li>
                            <li><a href="#" className="hover:text-white">Our offerings</a></li>
                            <li><a href="#" className="hover:text-white">Newsroom</a></li>
                            <li><a href="#" className="hover:text-white">Investors</a></li>
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium text-lg">Products</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white">Ride</a></li>
                            <li><a href="#" className="hover:text-white">Drive</a></li>
                            <li><a href="#" className="hover:text-white">Eat</a></li>
                            <li><a href="#" className="hover:text-white">Block Rides for Business</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium text-lg">Global Citizenship</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white">Safety</a></li>
                            <li><a href="#" className="hover:text-white">Diversity and Inclusion</a></li>
                            <li><a href="#" className="hover:text-white">Sustainability</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium text-lg">Travel</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white">Airports</a></li>
                            <li><a href="#" className="hover:text-white">Cities</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4">
                    <div className="flex gap-6">
                        <div className="p-2 rounded bg-gray-800 hover:bg-gray-700 cursor-pointer"><Facebook className="w-5 h-5" /></div>
                        <div className="p-2 rounded bg-gray-800 hover:bg-gray-700 cursor-pointer"><Twitter className="w-5 h-5" /></div>
                        <div className="p-2 rounded bg-gray-800 hover:bg-gray-700 cursor-pointer"><Linkedin className="w-5 h-5" /></div>
                        <div className="p-2 rounded bg-gray-800 hover:bg-gray-700 cursor-pointer"><Instagram className="w-5 h-5" /></div>
                    </div>

                    <div className="flex gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2 cursor-pointer hover:text-white">
                            <Globe className="w-4 h-4" />
                            <span>English</span>
                        </div>
                        <span className="cursor-pointer hover:text-white">New York</span>
                    </div>
                </div>

                <div className="mt-8 text-xs text-gray-500 text-center md:text-left">
                    © 2026 Block Rides Decentralized Technologies Inc.
                </div>
            </div>
        </footer>
    )
}
