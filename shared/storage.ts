import { 
  users, User, InsertUser, 
  categories, Category, InsertCategory,
  tips, Tip, InsertTip
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getCategoryById(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Tip operations
  getTips(): Promise<Tip[]>;
  getTipsByCategory(categoryId: number): Promise<Tip[]>;
  getTipById(id: number): Promise<Tip | undefined>;
  getFeatureTip(): Promise<Tip | undefined>;
  createTip(tip: InsertTip): Promise<Tip>;
  updateTipLikes(id: number, increment: boolean): Promise<Tip | undefined>;
  searchTips(query: string): Promise<Tip[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private tips: Map<number, Tip>;
  private currentUserId: number;
  private currentCategoryId: number;
  private currentTipId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.tips = new Map();
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentTipId = 1;
    
    // Initialize with default categories
    this.initializeCategories();
    // Initialize with sample tips
    this.initializeTips();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Tip operations
  async getTips(): Promise<Tip[]> {
    return Array.from(this.tips.values()).sort((a, b) => {
      // Sort by creation date, most recent first
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
  
  async getTipsByCategory(categoryId: number): Promise<Tip[]> {
    return Array.from(this.tips.values())
      .filter(tip => tip.categoryId === categoryId)
      .sort((a, b) => {
        // Sort by creation date, most recent first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }
  
  async getTipById(id: number): Promise<Tip | undefined> {
    return this.tips.get(id);
  }
  
  async getFeatureTip(): Promise<Tip | undefined> {
    return Array.from(this.tips.values()).find(tip => tip.featured);
  }
  
  async createTip(insertTip: InsertTip): Promise<Tip> {
    const id = this.currentTipId++;
    const now = new Date();
    const tip: Tip = { 
      ...insertTip, 
      id, 
      likes: 0,
      createdAt: now
    };
    this.tips.set(id, tip);
    return tip;
  }
  
  async updateTipLikes(id: number, increment: boolean): Promise<Tip | undefined> {
    const tip = this.tips.get(id);
    if (!tip) return undefined;
    
    const updatedTip = { 
      ...tip, 
      likes: increment ? tip.likes + 1 : Math.max(0, tip.likes - 1) 
    };
    this.tips.set(id, updatedTip);
    return updatedTip;
  }
  
  async searchTips(query: string): Promise<Tip[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.tips.values())
      .filter(tip => 
        tip.title.toLowerCase().includes(lowercaseQuery) || 
        tip.content.toLowerCase().includes(lowercaseQuery)
      )
      .sort((a, b) => {
        // Sort by creation date, most recent first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }
  
  // Initialize default categories
  private initializeCategories() {
    const defaultCategories: InsertCategory[] = [
      { name: "Home", slug: "home" },
      { name: "Food", slug: "food" },
      { name: "Fashion", slug: "fashion" },
      { name: "Energy", slug: "energy" },
      { name: "Transport", slug: "transport" }
    ];
    
    defaultCategories.forEach(category => {
      this.createCategory(category);
    });
  }
  
  // Initialize with sample tips
  private initializeTips() {
    const sampleTips: InsertTip[] = [
      {
        title: "Start Your Own Vegetable Garden",
        content: "Even with limited space, you can grow your own vegetables and herbs. A small balcony or windowsill can become a productive garden space, reducing your food miles and providing fresh, pesticide-free produce.",
        categoryId: 2, // Food
        imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
        featured: true,
        authorName: "Emma Johnson",
        authorTitle: "Urban Gardener",
        authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
      },
      {
        title: "Zero-Waste Kitchen Essentials",
        content: "Replace single-use items with reusable alternatives like cloth napkins, silicone food covers, and glass storage containers.",
        categoryId: 1, // Home
        imageUrl: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
      },
      {
        title: "Energy-Saving Smart Home Tips",
        content: "Use smart plugs and programmable thermostats to reduce energy consumption when you're away from home.",
        categoryId: 4, // Energy
        imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
      },
      {
        title: "Building a Sustainable Wardrobe",
        content: "Choose quality over quantity and look for clothing made from organic and natural materials that will last longer.",
        categoryId: 3, // Fashion
        imageUrl: "https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
      },
      {
        title: "Shop Local Farmers Markets",
        content: "Supporting local farmers reduces carbon emissions from food transportation and often means fresher, seasonal produce.",
        categoryId: 2, // Food
        imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
      },
      {
        title: "Bicycle Commuting Guide",
        content: "Discover how to incorporate cycling into your commute, even if just once a week, to reduce your carbon footprint.",
        categoryId: 5, // Transport
        imageUrl: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
      },
      {
        title: "Water Conservation at Home",
        content: "Install low-flow showerheads and faucet aerators to reduce your water usage without sacrificing performance.",
        categoryId: 1, // Home
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
      }
    ];
    
    sampleTips.forEach(tip => {
      this.createTip(tip);
    });
  }
}

export const storage = new MemStorage();
