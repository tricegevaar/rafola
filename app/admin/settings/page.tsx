'use client'

import { useState } from 'react'
import { Save, Globe, Mail, Shield, Bell, DollarSign, Users, Palette } from 'lucide-react'
import AdminLayout from '../layout-admin'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'HealTogether',
    siteDescription: 'Mental wellness and peer support platform',
    supportEmail: 'support@healtogether.co.za',
    allowRegistration: true,
    requireEmailVerification: true,
    enableAnonymousMode: true,
    moderationEnabled: true,
    autoModeration: false,
    maxCommunitiesPerUser: 10,
    maxBuddiesPerUser: 20,
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    currency: 'ZAR',
    freePlanPrice: 0,
    supporterPlanPrice: 300,
    premiumPlanPrice: 450,
    primaryColor: '#2563eb',
    secondaryColor: '#9333ea',
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Save settings to backend
    console.log('Saving settings:', settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Settings</h2>
        <p className="text-gray-600">Configure your platform settings and preferences</p>
      </div>

      {saved && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-2">
          <Save className="w-5 h-5" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">General Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Site Description</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* User Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">User Settings</h3>
          </div>

          <div className="space-y-4">
            <ToggleSetting
              label="Allow New Registrations"
              description="Enable or disable new user sign-ups"
              checked={settings.allowRegistration}
              onChange={(checked) => setSettings({ ...settings, allowRegistration: checked })}
            />

            <ToggleSetting
              label="Require Email Verification"
              description="Users must verify their email before accessing the platform"
              checked={settings.requireEmailVerification}
              onChange={(checked) => setSettings({ ...settings, requireEmailVerification: checked })}
            />

            <ToggleSetting
              label="Enable Anonymous Mode"
              description="Allow users to participate anonymously"
              checked={settings.enableAnonymousMode}
              onChange={(checked) => setSettings({ ...settings, enableAnonymousMode: checked })}
            />

            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Max Communities Per User</label>
                <input
                  type="number"
                  value={settings.maxCommunitiesPerUser}
                  onChange={(e) => setSettings({ ...settings, maxCommunitiesPerUser: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Max Buddies Per User</label>
                <input
                  type="number"
                  value={settings.maxBuddiesPerUser}
                  onChange={(e) => setSettings({ ...settings, maxBuddiesPerUser: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Moderation Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Moderation Settings</h3>
          </div>

          <div className="space-y-4">
            <ToggleSetting
              label="Enable Moderation"
              description="Require moderator approval for posts and comments"
              checked={settings.moderationEnabled}
              onChange={(checked) => setSettings({ ...settings, moderationEnabled: checked })}
            />

            <ToggleSetting
              label="Auto-Moderation (AI)"
              description="Use AI to automatically flag inappropriate content"
              checked={settings.autoModeration}
              onChange={(checked) => setSettings({ ...settings, autoModeration: checked })}
            />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Notification Settings</h3>
          </div>

          <div className="space-y-4">
            <ToggleSetting
              label="Email Notifications"
              description="Send email notifications to users"
              checked={settings.emailNotifications}
              onChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
            />

            <ToggleSetting
              label="Push Notifications"
              description="Enable browser push notifications"
              checked={settings.pushNotifications}
              onChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
            />

            <ToggleSetting
              label="Weekly Digest"
              description="Send weekly summary emails to users"
              checked={settings.weeklyDigest}
              onChange={(checked) => setSettings({ ...settings, weeklyDigest: checked })}
            />
          </div>
        </div>

        {/* Pricing Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Pricing Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="ZAR">ZAR (South African Rand)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
                <option value="GBP">GBP (British Pound)</option>
              </select>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Free Plan Price</label>
                <input
                  type="number"
                  value={settings.freePlanPrice}
                  onChange={(e) => setSettings({ ...settings, freePlanPrice: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Supporter Plan Price</label>
                <input
                  type="number"
                  value={settings.supporterPlanPrice}
                  onChange={(e) => setSettings({ ...settings, supporterPlanPrice: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Premium Plan Price</label>
                <input
                  type="number"
                  value={settings.premiumPlanPrice}
                  onChange={(e) => setSettings({ ...settings, premiumPlanPrice: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Appearance Settings</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Primary Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  className="w-16 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Secondary Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  className="w-16 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-xl hover:scale-105 transition-all"
          >
            <Save className="w-5 h-5" />
            Save All Settings
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}

function ToggleSetting({ label, description, checked, onChange }: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between p-4 rounded-lg bg-gray-50">
      <div className="flex-1">
        <div className="font-semibold text-gray-800 mb-1">{label}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}
