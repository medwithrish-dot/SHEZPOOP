export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  joke: string;
  badge: string;
  image?: string;
  icon: string;
}

export interface PowerCardData {
  id: string;
  name: string;
  subhead: string;
  icon: string;
  powerLevel: number;
  description: string;
  hiddenJoke: string;
  tag: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  imageSrc: string;
  secretNote: string;
  date: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  isString?: boolean;
  stringValue?: string;
  subtext: string;
  icon: string;
}

