import { StudentProfile, JobPosting, EligibilityResult } from './types';

export function checkEligibility(
  student: StudentProfile,
  job: JobPosting
): EligibilityResult {
  const isPastDeadline = new Date(job.deadline).getTime() < Date.now();
  const cgpaPassed = student.cgpa >= job.minCGPA;
  const backlogsPassed = student.activeBacklogs <= job.maxBacklogs;
  const departmentPassed =
    job.eligibleDepartmentCodes.length === 0 ||
    job.eligibleDepartmentCodes.includes(student.departmentCode);
  const gradYearPassed =
    !job.targetGraduationYear ||
    student.graduationYear === job.targetGraduationYear;
  const deadlinePassed = !isPastDeadline && job.status === 'Open';
  const verificationPassed = student.isVerified;

  const reasons: string[] = [];

  if (!cgpaPassed) {
    reasons.push(
      `CGPA too low (Current: ${student.cgpa.toFixed(2)}, Required: >= ${job.minCGPA.toFixed(2)})`
    );
  }
  if (!backlogsPassed) {
    reasons.push(
      `Active backlogs exceeded (Current: ${student.activeBacklogs}, Allowed: <= ${job.maxBacklogs})`
    );
  }
  if (!departmentPassed) {
    reasons.push(
      `Branch mismatch (${student.departmentCode} is not in eligible branches: ${job.eligibleDepartmentCodes.join(', ')})`
    );
  }
  if (!gradYearPassed) {
    reasons.push(
      `Graduation year mismatch (Student: ${student.graduationYear}, Required: ${job.targetGraduationYear})`
    );
  }
  if (isPastDeadline) {
    reasons.push(`Application deadline expired on ${new Date(job.deadline).toLocaleDateString()}`);
  }
  if (job.status !== 'Open') {
    reasons.push(`Job posting is currently ${job.status}`);
  }
  if (!verificationPassed) {
    reasons.push('Student academic profile has not been verified by the TPO yet');
  }

  const isEligible =
    cgpaPassed &&
    backlogsPassed &&
    departmentPassed &&
    gradYearPassed &&
    deadlinePassed &&
    verificationPassed;

  return {
    isEligible,
    checks: {
      cgpa: { passed: cgpaPassed, required: job.minCGPA, actual: student.cgpa },
      backlogs: {
        passed: backlogsPassed,
        maxAllowed: job.maxBacklogs,
        actual: student.activeBacklogs,
      },
      department: {
        passed: departmentPassed,
        allowed: job.eligibleDepartmentCodes,
        actual: student.departmentCode,
      },
      graduationYear: {
        passed: gradYearPassed,
        required: job.targetGraduationYear,
        actual: student.graduationYear,
      },
      deadline: {
        passed: deadlinePassed,
        deadline: job.deadline,
        isPast: isPastDeadline,
      },
      verification: {
        passed: verificationPassed,
        isVerified: student.isVerified,
      },
    },
    reasons,
  };
}

