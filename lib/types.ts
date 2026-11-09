export type UserRole = 'student' | 'tpo' | 'recruiter' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface Department {
  id: string;
  code: string;
  name: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  regNumber: string;
  fullName: string;
  institutionalEmail: string;
  phone: string;
  departmentId: string;
  departmentCode: string;
  departmentName: string;
  semester: number;
  cgpa: number;
  activeBacklogs: number;
  graduationYear: number;
  skills: string[];
  projects: string[];
  certifications: string[];
  resumeUrl: string;
  resumeFileName: string;
  resumeLastUpdated: string;
  isVerified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  placementStatus: 'Not Placed' | 'Placed' | 'Opted Out';
}

export interface Company {
  id: string;
  recruiterUserId: string;
  name: string;
  logo: string;
  industry: string;
  website: string;
  description: string;
  hrName: string;
  hrEmail: string;
  hrPhone: string;
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';
  registeredAt: string;
}

export type ApplicationStage =
  | 'Applied'
  | 'Resume Shortlisted'
  | 'Online Assessment'
  | 'Technical Interview'
  | 'HR Interview'
  | 'Selected'
  | 'Rejected'
  | 'Withdrawn';

export interface JobPosting {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  title: string;
  description: string;
  location: string;
  employmentType: 'Full-time' | 'Internship' | 'Intern + PPO';
  packageLPA: number;
  stipendPerMonth?: number;
  minCGPA: number;
  maxBacklogs: number;
  eligibleDepartmentCodes: string[];
  targetGraduationYear: number;
  requiredSkills: string[];
  deadline: string;
  status: 'Draft' | 'Pending Approval' | 'Open' | 'Closed';
  stages: string[];
  postedAt: string;
}

export interface RecruitmentStageRecord {
  id: string;
  stageName: ApplicationStage;
  status: 'Pending' | 'Completed' | 'Skipped';
  scheduledAt?: string;
  venueOrLink?: string;
  remarks?: string;
  updatedAt: string;
  updatedBy: string;
}

export interface Application {
  id: string;
  studentId: string;
  jobId: string;
  studentName: string;
  studentRegNo: string;
  studentEmail: string;
  studentDepartment: string;
  studentCGPA: number;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  packageLPA: number;
  submittedAt: string;
  status: ApplicationStage;
  resumeSnapshot: string;
  stages: RecruitmentStageRecord[];
  notes?: string;
}

export interface PlacementRecord {
  id: string;
  studentId: string;
  studentName: string;
  regNumber: string;
  departmentCode: string;
  companyId: string;
  companyName: string;
  jobId: string;
  jobTitle: string;
  packageLPA: number;
  placementDate: string;
  academicYear: string;
  offerLetterUrl?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  category: 'job' | 'interview' | 'system' | 'application';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface AuditLog {
  id: string;
  actorUserId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  entityType: 'Student' | 'Job' | 'Company' | 'Application' | 'Department' | 'System';
  entityId: string;
  details: string;
  timestamp: string;
}

export interface EligibilityResult {
  isEligible: boolean;
  checks: {
    cgpa: { passed: boolean; required: number; actual: number };
    backlogs: { passed: boolean; maxAllowed: number; actual: number };
    department: { passed: boolean; allowed: string[]; actual: string };
    graduationYear: { passed: boolean; required: number; actual: number };
    deadline: { passed: boolean; deadline: string; isPast: boolean };
    verification: { passed: boolean; isVerified: boolean };
  };
  reasons: string[];
}

export interface SkillMatchResult {
  score: number; // 0 - 100
  matchedSkills: string[];
  missingSkills: string[];
  recommendation: 'Strong Match' | 'Moderate Match' | 'Low Match';
}

