import fs from 'fs';
import path from 'path';
import {
  User,
  Department,
  StudentProfile,
  Company,
  JobPosting,
  Application,
  PlacementRecord,
  NotificationItem,
  AuditLog,
  ApplicationStage,
} from './types';
import {
  initialUsers,
  initialDepartments,
  initialStudents,
  initialCompanies,
  initialJobs,
  initialApplications,
  initialPlacements,
  initialNotifications,
  initialAuditLogs,
  placementStats,
} from './seed-data';

interface DatabaseSchema {
  users: User[];
  departments: Department[];
  students: StudentProfile[];
  companies: Company[];
  jobs: JobPosting[];
  applications: Application[];
  placements: PlacementRecord[];
  notifications: NotificationItem[];
  auditLogs: AuditLog[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// In-memory store fallback and cache
let memoryStore: DatabaseSchema | null = null;

function loadDatabase(): DatabaseSchema {
  if (memoryStore) {
    return memoryStore;
  }

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      memoryStore = JSON.parse(content);
      return memoryStore!;
    }
  } catch (err) {
    console.warn('Error reading db.json, falling back to seed data:', err);
  }

  // Initialize with seed data
  memoryStore = {
    users: [...initialUsers],
    departments: [...initialDepartments],
    students: [...initialStudents],
    companies: [...initialCompanies],
    jobs: [...initialJobs],
    applications: [...initialApplications],
    placements: [...initialPlacements],
    notifications: [...initialNotifications],
    auditLogs: [...initialAuditLogs],
  };

  saveDatabase(memoryStore);
  return memoryStore;
}

function saveDatabase(data: DatabaseSchema) {
  memoryStore = data;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to database.json:', err);
  }
}

// Database helper functions
export const db = {
  // Users
  getUsers: (): User[] => loadDatabase().users,
  getUserById: (id: string): User | undefined =>
    loadDatabase().users.find((u) => u.id === id),
  getUserByEmail: (email: string): User | undefined =>
    loadDatabase().users.find((u) => u.email.toLowerCase() === email.toLowerCase()),
  createUser: (user: User): User => {
    const data = loadDatabase();
    data.users.push(user);
    saveDatabase(data);
    return user;
  },

  // Students
  getStudents: (): StudentProfile[] => loadDatabase().students,
  getStudentById: (id: string): StudentProfile | undefined =>
    loadDatabase().students.find((s) => s.id === id),
  getStudentByUserId: (userId: string): StudentProfile | undefined =>
    loadDatabase().students.find((s) => s.userId === userId),
  updateStudent: (id: string, updates: Partial<StudentProfile>): StudentProfile => {
    const data = loadDatabase();
    const index = data.students.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Student not found');
    data.students[index] = { ...data.students[index], ...updates };
    saveDatabase(data);
    return data.students[index];
  },
  verifyStudent: (studentId: string, verifierName: string): StudentProfile => {
    const data = loadDatabase();
    const student = data.students.find((s) => s.id === studentId);
    if (!student) throw new Error('Student not found');
    student.isVerified = true;
    student.verifiedBy = verifierName;
    student.verifiedAt = new Date().toISOString();
    
    // Add audit log
    data.auditLogs.unshift({
      id: `log-${Date.now()}`,
      actorUserId: 'tpo',
      actorName: verifierName,
      actorRole: 'tpo',
      action: 'VERIFIED_PROFILE',
      entityType: 'Student',
      entityId: student.id,
      details: `Profile and academic credentials verified for ${student.fullName} (${student.regNumber}).`,
      timestamp: new Date().toISOString(),
    });

    // Notify student
    data.notifications.unshift({
      id: `notif-${Date.now()}`,
      userId: student.userId,
      title: 'Profile Verified by Placement Office',
      message: 'Your CGPA and academic credentials have been verified. You can now apply for campus drives.',
      category: 'system',
      isRead: false,
      createdAt: new Date().toISOString(),
      link: '/student/profile',
    });

    saveDatabase(data);
    return student;
  },

  // Departments
  getDepartments: (): Department[] => loadDatabase().departments,
  addDepartment: (dept: Department): Department => {
    const data = loadDatabase();
    data.departments.push(dept);
    saveDatabase(data);
    return dept;
  },

  // Companies
  getCompanies: (): Company[] => loadDatabase().companies,
  getCompanyById: (id: string): Company | undefined =>
    loadDatabase().companies.find((c) => c.id === id),
  createCompany: (company: Company): Company => {
    const data = loadDatabase();
    data.companies.push(company);
    saveDatabase(data);
    return company;
  },
  updateCompanyStatus: (id: string, status: 'Approved' | 'Rejected'): Company => {
    const data = loadDatabase();
    const comp = data.companies.find((c) => c.id === id);
    if (!comp) throw new Error('Company not found');
    comp.approvalStatus = status;

    data.auditLogs.unshift({
      id: `log-${Date.now()}`,
      actorUserId: 'tpo',
      actorName: 'TPO Officer',
      actorRole: 'tpo',
      action: status === 'Approved' ? 'APPROVED_COMPANY' : 'REJECTED_COMPANY',
      entityType: 'Company',
      entityId: comp.id,
      details: `Company registration for ${comp.name} marked as ${status}.`,
      timestamp: new Date().toISOString(),
    });

    saveDatabase(data);
    return comp;
  },

  // Jobs
  getJobs: (): JobPosting[] => loadDatabase().jobs,
  getJobById: (id: string): JobPosting | undefined =>
    loadDatabase().jobs.find((j) => j.id === id),
  createJob: (job: JobPosting): JobPosting => {
    const data = loadDatabase();
    data.jobs.unshift(job);

    data.auditLogs.unshift({
      id: `log-${Date.now()}`,
      actorUserId: 'recruiter',
      actorName: job.companyName,
      actorRole: 'recruiter',
      action: 'CREATED_JOB',
      entityType: 'Job',
      entityId: job.id,
      details: `Published vacancy: ${job.title} (${job.packageLPA} LPA).`,
      timestamp: new Date().toISOString(),
    });

    saveDatabase(data);
    return job;
  },
  updateJob: (id: string, updates: Partial<JobPosting>): JobPosting => {
    const data = loadDatabase();
    const index = data.jobs.findIndex((j) => j.id === id);
    if (index === -1) throw new Error('Job not found');
    data.jobs[index] = { ...data.jobs[index], ...updates };
    saveDatabase(data);
    return data.jobs[index];
  },

  // Applications
  getApplications: (): Application[] => loadDatabase().applications,
  getApplicationById: (id: string): Application | undefined =>
    loadDatabase().applications.find((a) => a.id === id),
  getApplicationsByStudentId: (studentId: string): Application[] =>
    loadDatabase().applications.filter((a) => a.studentId === studentId),
  getApplicationsByJobId: (jobId: string): Application[] =>
    loadDatabase().applications.filter((a) => a.jobId === jobId),
  
  createApplication: (
    student: StudentProfile,
    job: JobPosting
  ): Application => {
    const data = loadDatabase();
    
    // Prevent duplicate applications
    const existing = data.applications.find(
      (a) => a.studentId === student.id && a.jobId === job.id
    );
    if (existing) {
      throw new Error('You have already applied for this position.');
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      studentId: student.id,
      jobId: job.id,
      studentName: student.fullName,
      studentRegNo: student.regNumber,
      studentEmail: student.institutionalEmail,
      studentDepartment: student.departmentCode,
      studentCGPA: student.cgpa,
      jobTitle: job.title,
      companyName: job.companyName,
      companyLogo: job.companyLogo,
      packageLPA: job.packageLPA,
      submittedAt: new Date().toISOString(),
      status: 'Applied',
      resumeSnapshot: student.resumeFileName || 'Resume.pdf',
      stages: [
        {
          id: `stage-${Date.now()}-1`,
          stageName: 'Applied',
          status: 'Completed',
          updatedAt: new Date().toISOString(),
          updatedBy: student.fullName,
          remarks: 'Application submitted successfully before deadline.',
        },
      ],
    };

    data.applications.unshift(newApp);

    // Notify student
    data.notifications.unshift({
      id: `notif-${Date.now()}`,
      userId: student.userId,
      title: `Application Submitted: ${job.companyName}`,
      message: `Your application for ${job.title} (${job.packageLPA} LPA) has been received.`,
      category: 'application',
      isRead: false,
      createdAt: new Date().toISOString(),
      link: '/student/applications',
    });

    // Audit log
    data.auditLogs.unshift({
      id: `log-${Date.now()}`,
      actorUserId: student.userId,
      actorName: student.fullName,
      actorRole: 'student',
      action: 'SUBMITTED_APPLICATION',
      entityType: 'Application',
      entityId: newApp.id,
      details: `Student applied for ${job.title} at ${job.companyName}.`,
      timestamp: new Date().toISOString(),
    });

    saveDatabase(data);
    return newApp;
  },

  advanceApplicationStage: (
    applicationId: string,
    newStage: ApplicationStage,
    actorName: string,
    remarks?: string,
    scheduledAt?: string,
    venueOrLink?: string
  ): Application => {
    const data = loadDatabase();
    const app = data.applications.find((a) => a.id === applicationId);
    if (!app) throw new Error('Application not found');

    app.status = newStage;

    app.stages.push({
      id: `stage-${Date.now()}`,
      stageName: newStage,
      status: 'Completed',
      scheduledAt,
      venueOrLink,
      remarks,
      updatedAt: new Date().toISOString(),
      updatedBy: actorName,
    });

    // If final selection, automatically record placement!
    if (newStage === 'Selected') {
      const student = data.students.find((s) => s.id === app.studentId);
      if (student) {
        student.placementStatus = 'Placed';
      }

      const newPlacement: PlacementRecord = {
        id: `plc-${Date.now()}`,
        studentId: app.studentId,
        studentName: app.studentName,
        regNumber: app.studentRegNo,
        departmentCode: app.studentDepartment,
        companyId: 'comp-auto',
        companyName: app.companyName,
        jobId: app.jobId,
        jobTitle: app.jobTitle,
        packageLPA: app.packageLPA,
        placementDate: new Date().toISOString(),
        academicYear: '2026-2027',
      };
      data.placements.unshift(newPlacement);

      // Notify student
      if (student) {
        data.notifications.unshift({
          id: `notif-${Date.now()}`,
          userId: student.userId,
          title: `🎉 CONGRATULATIONS! Offer Extended by ${app.companyName}!`,
          message: `You have been selected for ${app.jobTitle} with a package of ${app.packageLPA} LPA! Check your placement history.`,
          category: 'interview',
          isRead: false,
          createdAt: new Date().toISOString(),
          link: '/student/placement-history',
        });
      }
    } else {
      // General stage update notification
      const student = data.students.find((s) => s.id === app.studentId);
      if (student) {
        data.notifications.unshift({
          id: `notif-${Date.now()}`,
          userId: student.userId,
          title: `Update on ${app.companyName} Application`,
          message: `Your application status has been updated to "${newStage}". ${remarks ? `Remarks: ${remarks}` : ''}`,
          category: 'interview',
          isRead: false,
          createdAt: new Date().toISOString(),
          link: '/student/applications',
        });
      }
    }

    saveDatabase(data);
    return app;
  },

  // Placements
  getPlacements: (): PlacementRecord[] => loadDatabase().placements,

  // Notifications
  getNotificationsByUserId: (userId: string): NotificationItem[] =>
    loadDatabase().notifications.filter((n) => n.userId === userId),
  markNotificationAsRead: (id: string) => {
    const data = loadDatabase();
    const notif = data.notifications.find((n) => n.id === id);
    if (notif) {
      notif.isRead = true;
      saveDatabase(data);
    }
  },

  // Audit Logs
  getAuditLogs: (): AuditLog[] => loadDatabase().auditLogs,

  // Stats
  getStats: () => {
    const data = loadDatabase();
    return {
      ...placementStats,
      totalJobs: data.jobs.length,
      totalApplications: data.applications.length,
      totalCompanies: data.companies.length,
      totalStudentsVerified: data.students.filter((s) => s.isVerified).length,
      recentPlacements: data.placements.slice(0, 10),
    };
  },

  // Reset database to seed
  resetToSeed: () => {
    memoryStore = {
      users: [...initialUsers],
      departments: [...initialDepartments],
      students: [...initialStudents],
      companies: [...initialCompanies],
      jobs: [...initialJobs],
      applications: [...initialApplications],
      placements: [...initialPlacements],
      notifications: [...initialNotifications],
      auditLogs: [...initialAuditLogs],
    };
    saveDatabase(memoryStore);
    return memoryStore;
  }
};

