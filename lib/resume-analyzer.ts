import { SkillMatchResult } from './types';

// Canonical list of common tech, business, and core engineering skills for fuzzy matching
export const COMMON_SKILLS = [
  'Python', 'Java', 'C++', 'C', 'JavaScript', 'TypeScript', 'React', 'Next.js',
  'Node.js', 'Express', 'Django', 'FastAPI', 'Spring Boot', 'SQL', 'PostgreSQL',
  'MySQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
  'Git', 'GitHub', 'Linux', 'Data Structures', 'Algorithms', 'Machine Learning',
  'Deep Learning', 'Computer Vision', 'NLP', 'TensorFlow', 'PyTorch', 'REST APIs',
  'GraphQL', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'System Design',
  'Microservices', 'CI/CD', 'Agile', 'Scrum', 'Object-Oriented Programming (OOP)',
  'Database Management', 'Computer Networks', 'Operating Systems', 'Cybersecurity',
  'MATLAB', 'AutoCAD', 'SolidWorks', 'Embedded Systems', 'IoT', 'VLSI',
  'Data Analysis', 'Tableau', 'Power BI', 'Excel', 'Problem Solving', 'Communication'
];

/**
 * Simulates extracting skills and metadata from a student's resume text or portfolio
 */
export function extractSkillsFromResume(resumeText: string): string[] {
  const normalizedText = resumeText.toLowerCase();
  const extracted = new Set<string>();

  COMMON_SKILLS.forEach((skill) => {
    // Regex word boundary match
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(normalizedText)) {
      extracted.add(skill);
    }
  });

  return Array.from(extracted);
}

/**
 * Compares student skills against job required skills
 */
export function calculateSkillMatch(
  studentSkills: string[],
  requiredSkills: string[]
): SkillMatchResult {
  if (!requiredSkills || requiredSkills.length === 0) {
    return {
      score: 100,
      matchedSkills: studentSkills,
      missingSkills: [],
      recommendation: 'Strong Match',
    };
  }

  const normalizedStudent = new Set(
    studentSkills.map((s) => s.trim().toLowerCase())
  );

  const matched: string[] = [];
  const missing: string[] = [];

  requiredSkills.forEach((req) => {
    const isMatched = Array.from(normalizedStudent).some(
      (stud) => stud === req.trim().toLowerCase() || stud.includes(req.trim().toLowerCase()) || req.trim().toLowerCase().includes(stud)
    );
    if (isMatched) {
      matched.push(req);
    } else {
      missing.push(req);
    }
  });

  const score = Math.round((matched.length / requiredSkills.length) * 100);

  let recommendation: 'Strong Match' | 'Moderate Match' | 'Low Match' = 'Low Match';
  if (score >= 70) {
    recommendation = 'Strong Match';
  } else if (score >= 40) {
    recommendation = 'Moderate Match';
  }

  return {
    score,
    matchedSkills: matched,
    missingSkills: missing,
    recommendation,
  };
}

