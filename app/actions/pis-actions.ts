'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { getCurrentUser, setSessionUserId, clearSession } from '@/lib/auth';
import { ApplicationStage, JobPosting, UserRole } from '@/lib/types';
import { checkEligibility } from '@/lib/eligibility';

export async function switchDemoUser(role: UserRole) {
  let targetUserId = 'user-student-1';
  if (role === 'tpo') targetUserId = 'user-tpo-1';
  if (role === 'recruiter') targetUserId = 'user-recruiter-1';
  if (role === 'admin') targetUserId = 'user-admin-1';
  if (role === 'student') targetUserId = 'user-student-1';

  await setSessionUserId(targetUserId);
  revalidatePath('/', 'layout');
  return { success: true, role, userId: targetUserId };
}

export async function loginWithEmail(email: string) {
  const user = db.getUserByEmail(email);
  if (!user) {
    return { success: false, error: 'User with this email not found in directory.' };
  }

  await setSessionUserId(user.id);
  revalidatePath('/', 'layout');
  return { success: true, user };
}

export async function logoutUser() {
  await clearSession();
  revalidatePath('/', 'layout');
  return { success: true };
}

export async function applyForJob(jobId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { success: false, error: 'You must be logged in to apply.' };
  }

  const student = db.getStudentByUserId(currentUser.id);
  if (!student) {
    return { success: false, error: 'Student academic profile not found for this account.' };
  }

  const job = db.getJobById(jobId);
  if (!job) {
    return { success: false, error: 'Job vacancy not found.' };
  }

  // Run automated eligibility engine
  const eligibility = checkEligibility(student, job);
  if (!eligibility.isEligible) {
    return {
      success: false,
      error: 'Eligibility criteria not met: ' + eligibility.reasons.join(', '),
      eligibility,
    };
  }

  try {
    const app = db.createApplication(student, job);
    revalidatePath('/student/applications');
    revalidatePath('/student/opportunities');
    revalidatePath('/tpo/applications');
    revalidatePath('/recruiter/applicants');
    return { success: true, application: app };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to submit application.' };
  }
}

export async function updateStudentProfile(updates: {
  fullName?: string;
  phone?: string;
  skills?: string[];
  projects?: string[];
  certifications?: string[];
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { success: false, error: 'Not authenticated' };

  const student = db.getStudentByUserId(currentUser.id);
  if (!student) return { success: false, error: 'Student record not found' };

  const updated = db.updateStudent(student.id, updates);
  revalidatePath('/student/profile');
  return { success: true, student: updated };
}

export async function uploadResumeAction(fileName: string, extractedSkills: string[]) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { success: false, error: 'Not authenticated' };

  const student = db.getStudentByUserId(currentUser.id);
  if (!student) return { success: false, error: 'Student record not found' };

  const mergedSkills = Array.from(new Set([...student.skills, ...extractedSkills]));

  const updated = db.updateStudent(student.id, {
    resumeFileName: fileName,
    resumeUrl: `/uploads/${fileName}`,
    resumeLastUpdated: new Date().toISOString(),
    skills: mergedSkills,
  });

  revalidatePath('/student/resume');
  revalidatePath('/student/profile');
  return { success: true, student: updated };
}

export async function verifyStudentProfile(studentId: string) {
  const currentUser = await getCurrentUser();
  const verifierName = currentUser ? currentUser.name : 'Dr. K. Ramanathan (TPO)';
  const updated = db.verifyStudent(studentId, verifierName);
  revalidatePath('/tpo/students');
  return { success: true, student: updated };
}

export async function advanceApplicationStage(
  applicationId: string,
  newStage: ApplicationStage,
  remarks?: string,
  scheduledAt?: string,
  venueOrLink?: string
) {
  const currentUser = await getCurrentUser();
  const actorName = currentUser ? currentUser.name : 'Recruiter / TPO';

  const updated = db.advanceApplicationStage(
    applicationId,
    newStage,
    actorName,
    remarks,
    scheduledAt,
    venueOrLink
  );

  revalidatePath('/recruiter/shortlisting');
  revalidatePath('/recruiter/applicants');
  revalidatePath('/tpo/recruitment');
  revalidatePath('/tpo/interviews');
  revalidatePath('/student/applications');
  revalidatePath('/student/placement-history');
  return { success: true, application: updated };
}

export async function createJobPosting(formData: {
  title: string;
  description: string;
  location: string;
  employmentType: 'Full-time' | 'Internship' | 'Intern + PPO';
  packageLPA: number;
  minCGPA: number;
  maxBacklogs: number;
  eligibleDepartmentCodes: string[];
  targetGraduationYear: number;
  requiredSkills: string[];
  deadline: string;
}) {
  const currentUser = await getCurrentUser();
  let companyName = 'Recruiter Enterprise';
  let companyLogo = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&auto=format&fit=crop&q=80';
  let companyId = 'comp-custom';

  if (currentUser) {
    const comp = db.getCompanies().find((c) => c.recruiterUserId === currentUser.id);
    if (comp) {
      companyName = comp.name;
      companyLogo = comp.logo;
      companyId = comp.id;
    }
  }

  const newJob: JobPosting = {
    id: `job-${Date.now()}`,
    companyId,
    companyName,
    companyLogo,
    title: formData.title,
    description: formData.description,
    location: formData.location,
    employmentType: formData.employmentType,
    packageLPA: Number(formData.packageLPA),
    minCGPA: Number(formData.minCGPA),
    maxBacklogs: Number(formData.maxBacklogs),
    eligibleDepartmentCodes: formData.eligibleDepartmentCodes,
    targetGraduationYear: Number(formData.targetGraduationYear),
    requiredSkills: formData.requiredSkills,
    deadline: formData.deadline,
    status: 'Open',
    stages: ['Applied', 'Resume Shortlisted', 'Online Assessment', 'Technical Interview', 'HR Interview', 'Selected'],
    postedAt: new Date().toISOString(),
  };

  const created = db.createJob(newJob);
  revalidatePath('/recruiter/job-postings');
  revalidatePath('/student/opportunities');
  revalidatePath('/tpo/jobs');
  return { success: true, job: created };
}

export async function updateCompanyStatusAction(companyId: string, status: 'Approved' | 'Rejected') {
  const comp = db.updateCompanyStatus(companyId, status);
  revalidatePath('/tpo/companies');
  return { success: true, company: comp };
}

export async function markNotificationReadAction(notificationId: string) {
  db.markNotificationAsRead(notificationId);
  revalidatePath('/student/notifications');
  revalidatePath('/tpo/notifications');
  return { success: true };
}

export async function resetDatabaseToDefault() {
  db.resetToSeed();
  revalidatePath('/', 'layout');
  return { success: true };
}

