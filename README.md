# Campus Placement Information System (PIS)

A centralized, web-based platform that digitizes the entire campus recruitment lifecycle—from student profile verification and company job postings to automated eligibility checking, ATS recruitment pipelines, interview scheduling, and placement analytics.

Built according to the **Placement Information System (PIS) Research, Requirements, Technology Stack & Development Blueprint**.

---

## 🚀 Live Features Implemented

### 1. Public Portal
- **Home (`/`)**: Hero section, real-time placement stats, active campus drives, and role gateway cards.
- **About the Placement Cell (`/about`)**: Cell leadership, vision, training bootcamps, and institutional policies.
- **Recruiting Companies (`/companies`)**: Directory of corporate hiring partners with verified statuses.
- **Placement Analytics (`/statistics`)**: Interactive Recharts dashboards (branch-wise placement rates, salary distribution tiers, recruitment funnel conversion, multi-year trends).
- **Placement Highlights (`/highlights`)**: Top tier packages (₹44 LPA Google SDE, Microsoft, Amazon), star achievers, and hall of fame.
- **Contact (`/contact`)**: Official TPO location, helpline, working hours, and interactive inquiry submission.
- **Login & Registration (`/login`, `/register`)**: Credential authentication + 1-click persona quick-login.

### 2. 🎓 Student Portal (`/student`)
- **Dashboard (`/student/dashboard`)**: Actionable overview of submitted applications, upcoming interviews, and smart job recommendations.
- **Opportunities (`/student/opportunities`)**: Active campus drives with the **Automated Eligibility Engine**:
  - Validates `student.cgpa >= job.minCGPA`
  - Validates `student.activeBacklogs <= job.maxBacklogs`
  - Validates `job.eligibleDepartmentCodes.includes(student.departmentCode)`
  - Validates graduation year, deadline, and TPO verification.
  - Transparent checklist showing passed and unmet requirements.
- **My Applications (`/student/applications`)**: Multi-stage ATS pipeline tracker (`Applied` ➔ `Shortlisted` ➔ `Assessment` ➔ `Tech Interview` ➔ `HR Interview` ➔ `Selected`).
- **Resume & Skill Matcher (`/student/resume`)**: CV skills parser, verified skills tag cloud, and interactive job fit benchmark with interview prep advisories.
- **Profile & Academics (`/student/profile`)**: Institutional academic records (CGPA, backlogs, branch, graduation year) with TPO verification audit status.
- **Placement History (`/student/placement-history`)**: Confirmed offer letters, package CTC breakdown, and celebration confetti.
- **Notifications & Settings (`/student/notifications`, `/student/settings`)**: Real-time alerts, email preferences, privacy options.

### 3. 🏛️ Training & Placement Officer (TPO) Console (`/tpo`)
- **Dashboard (`/tpo/dashboard`)**: Placement rate metrics, company drives, and urgent verification alerts.
- **Student Verification (`/tpo/students`)**: Audit student CGPA/backlogs, 1-click profile verification, and CSV export.
- **Company Approvals (`/tpo/companies`)**: Review and approve/reject employer onboarding requests.
- **Job Vacancies (`/tpo/jobs`)**: Review company vacancies, package CTCs, and branch restrictions.
- **Applications & ATS (`/tpo/applications`)**: View all student submissions across companies, update pipeline stages, and schedule interview rounds.
- **Interview Scheduler (`/tpo/interviews`)**: Calendar agenda with virtual meeting links and remarks.
- **Placement Records (`/tpo/placements`)**: Official offer registry with CSV export.
- **Reports & Analytics (`/tpo/reports`)**: Department-wise breakdowns, recruiter leaderboards, salary band distributions, and CSV downloads.
- **Announcements (`/tpo/notifications`)**: Broadcast circulars to specific engineering branches or all students.

### 4. 🏢 Corporate Recruiter Portal (`/recruiter`)
- **Dashboard (`/recruiter/dashboard`)**: Active vacancies, candidate submissions, and interview counts.
- **Post & Manage Vacancies (`/recruiter/job-postings`)**: Create new job postings with package, CGPA cutoffs, backlog limits, eligible branches, and required skills.
- **Applicant Review (`/recruiter/applicants`)**: Candidate screening with automated resume fit scoring.
- **ATS Kanban Shortlisting (`/recruiter/shortlisting`)**: Visual Kanban board to advance candidates across rounds with 1 click.
- **Selection Results (`/recruiter/recruitment-results`)**: Final hires list submitted to the placement office.
- **Company Profile (`/recruiter/company-profile`)**: Manage corporate info, logo, and HR contact points.

### 5. 🛡️ Super Admin Console (`/admin`)
- **Dashboard (`/admin/dashboard`)**: System health, active users, audit counts, and security status.
- **User Accounts (`/admin/users`)**: Directory of all accounts and roles.
- **RBAC Matrix (`/admin/roles`)**: Visual permission breakdown across operations.
- **Departments (`/admin/departments`)**: Engineering branches (CSE, IT, AIDS, ECE, EEE, MECH, CIVIL).
- **Academic Sessions (`/admin/academic-sessions`)**: Batch cohort management (2026-2027, etc.).
- **System Settings (`/admin/system-settings`)**: Dream offer rules, attendance thresholds, file size caps.
- **Audit Logs (`/admin/audit-logs`)**: Immutable event trail recording actor, action, timestamp, and details with CSV export.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router) + React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS + PostCSS + Autoprefixer
- **Visual Analytics**: Recharts
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Architecture**: Role-based access control, Server Actions, persistent data engine (`data/database.json`), seed data initialization.

---

## ⚡ Quick Start Guide

### 1. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 2. Testing Personas
The system features a **Quick Demo Persona Bar** pinned at the top:
- **Student**: Priya Sharma (CSE, 8.85 CGPA, 0 backlogs)
- **TPO Officer**: Dr. K. Ramanathan (Placement Head)
- **Recruiter**: Vikram Seth (Microsoft Campus Lead)
- **Super Admin**: Chief Administrator
- **Reset Seed Button**: Resets all data back to the clean initial seed at any time.

---

## 📄 Documentation Artifact
A complete architectural blueprint with Mermaid ER diagrams, DFD Level 0 & Level 1, and Use Case flows is available in:
`system-design-blueprint.md`

