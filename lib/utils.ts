import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const healingCategories = [
  'Grief & Loss',
  'Addiction Recovery',
  'Anxiety & Depression',
  'Trauma & PTSD',
  'Relationship Issues',
  'Life Transitions',
  'Chronic Illness',
  'Self-Improvement',
]

export const crisisHotlines = [
  {
    name: 'SADAG Mental Health Line',
    number: '011 234 4837',
    description: '24/7 mental health crisis support',
  },
  {
    name: 'Suicide Crisis Line',
    number: '0800 567 567',
    description: 'Free 24/7 suicide prevention helpline',
  },
  {
    name: 'LifeLine South Africa',
    number: '0861 322 322',
    description: '24/7 counselling and crisis support',
  },
  {
    name: 'Substance Abuse Helpline',
    number: '0800 12 13 14',
    description: 'Free substance abuse support',
  },
  {
    name: 'Gender-Based Violence',
    number: '0800 150 150',
    description: '24/7 GBV command centre',
  },
  {
    name: 'Childline South Africa',
    number: '116 / 0800 055 555',
    description: 'Free support for children and teens',
  },
]
