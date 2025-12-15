import { AlertCircle, Phone, MessageSquare, ArrowLeft, Heart } from 'lucide-react'
import { crisisHotlines } from '@/lib/utils'
import Link from 'next/link'

export default function CrisisPage() {
  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-slate-50 via-red-50 to-rose-50">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-red-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Crisis Support</h1>
              <p className="text-red-600 font-medium">South African Resources</p>
            </div>
          </div>

          <p className="text-lg text-gray-700 mb-8">
            If you're in crisis or need immediate support, please reach out to one of these South African resources. 
            You're not alone, and help is available 24/7.
          </p>

          <div className="space-y-4">
            {crisisHotlines.map((hotline) => (
              <div key={hotline.name} className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 rounded-r-xl p-5 hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{hotline.name}</h3>
                    <a 
                      href={`tel:${hotline.number.replace(/\s/g, '')}`}
                      className="text-2xl font-bold text-red-600 hover:text-red-700 my-2 block"
                    >
                      {hotline.number}
                    </a>
                    <p className="text-gray-600 text-sm">{hotline.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">If you're in immediate danger:</h3>
                <p className="text-gray-700 mb-3">
                  Call <a href="tel:10111" className="font-bold text-blue-600 hover:underline">10111</a> (SAPS Emergency) 
                  or go to your nearest emergency room. Your safety is the top priority.
                </p>
                <div className="bg-white/50 rounded-lg p-3 mt-3">
                  <h4 className="font-semibold text-sm mb-2 text-gray-800">Emergency Services:</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• <strong>Ambulance:</strong> <a href="tel:10177" className="text-blue-600 hover:underline">10177</a></li>
                    <li>• <strong>Netcare 911:</strong> <a href="tel:082911" className="text-blue-600 hover:underline">082 911</a></li>
                    <li>• <strong>ER24:</strong> <a href="tel:084124" className="text-blue-600 hover:underline">084 124</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <div className="flex items-start gap-3">
              <Heart className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" fill="currentColor" />
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">You're Not Alone</h3>
                <p className="text-gray-700 text-sm">
                  Reaching out for help is a sign of strength. These trained professionals are here to support you 
                  through difficult times. All calls are confidential and free.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              Join Our Support Community
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
