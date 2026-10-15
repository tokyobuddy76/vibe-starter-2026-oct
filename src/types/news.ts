export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  isAnalysis?: boolean;
  readTime: string;
  byline: string;
  authorRole?: string;
  date: string;
  photoUrl?: string;
  placeholderUrl?: string;
  photoCaption?: string;
  photoCredit?: string;
  paragraphs: string[];
  pullQuote?: {
    text: string;
    attribution?: string;
  };
  tags: string[];
  liveUpdatesBadge?: {
    text: string;
    subtext: string;
  };
  sectionKey: 'left' | 'hero' | 'center-sub' | 'opinion' | 'arts' | 'wirecutter';
  viewsCount?: number;
  commentsCount?: number;
}

export interface CrosswordCell {
  row: number;
  col: number;
  letter: string; // solution letter
  number?: number;
  isBlocked: boolean;
}

export interface CrosswordClue {
  number: number;
  direction: 'across' | 'down';
  clue: string;
  answer: string;
}

export interface RecipeData {
  title: string;
  author: string;
  yieldInfo: string;
  timeInfo: string;
  rating: number;
  ratingCount: number;
  summary: string;
  ingredients: { item: string; amount: string }[];
  steps: string[];
}

export interface WirecutterPick {
  category: string;
  title: string;
  subtitle: string;
  author: string;
  updatedDate: string;
  topPick: {
    name: string;
    price: string;
    rating: string;
    summary: string;
    pros: string[];
    cons: string[];
  };
  budgetPick: {
    name: string;
    price: string;
    summary: string;
  };
  howWeTested: string;
}

export interface LiveUpdateEntry {
  id: string;
  time: string;
  author: string;
  title: string;
  content: string;
  isBreaking?: boolean;
}
