export interface JobPlatform {
  name: string;
  apiKey: string;
  enabled: boolean;
}

export interface Resume {
  fullName: string;
  email: string;
  phone: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
}

export interface ApplicationStats {
  total: number;
  successful: number;
  failed: number;
  platforms: Record<string, number>;
}