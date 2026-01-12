export const UserCreationMode = {
  INIT_ROOT_ADMIN: "INIT_ROOT_ADMIN",
  CREATE_SUPER_ADMIN: "CREATE_SUPER_ADMIN",
  CREATE_ADMIN: "CREATE_ADMIN",
  CREATE_USER: "CREATE_USER",
} as const;

export type UserCreationModeType = typeof UserCreationMode[keyof typeof UserCreationMode];

export const QuestionType = {
  MCQ: "MCQ",
  MAQ: "MAQ",
  FILL_BLANK: "FILL_BLANK",
} as const;

export type QuestionTypeType = typeof QuestionType[keyof typeof QuestionType];

export const UserRole = {
  ROOTADMIN: "ROOTADMIN",
  SUPERADMIN: "SUPERADMIN",
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type UserRoleType = typeof UserRole[keyof typeof UserRole];

export interface Test {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  totalMarks: number;
  published: boolean;
  maxAttempts: number;
  createdBy: number;
}

export interface CreateTestRequest {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  totalMarks: number;
  published: boolean;
  maxAttempts: number;
}

export interface UpdateTestRequest {
  title?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  totalMarks?: number;
  published?: boolean;
  maxAttempts?: number;
}

export interface Question {
  id: number;
  testId: number;
  questionType: QuestionTypeType;
  questionText: string;
  marks: number;
  negativeMarks: number;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctOption?: string;
  correctOptionsCsv?: string;
  correctAnswer?: string;
}

export interface CreateQuestionRequest {
  questionType: QuestionTypeType;
  questionText: string;
  marks: number;
  negativeMarks: number;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctOption?: string;
  correctOptionsCsv?: string;
  correctAnswer?: string;
}

export interface UpdateQuestionRequest {
  questionType?: QuestionTypeType;
  questionText?: string;
  marks?: number;
  negativeMarks?: number;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctOption?: string;
  correctOptionsCsv?: string;
  correctAnswer?: string;
}

export interface Attempt {
  id: number;
  testId: number;
  userId: number;
  startedAt: string;
  submittedAt?: string;
  score?: number;
  maxScore: number;
  status: "IN_PROGRESS" | "SUBMITTED";
}

export interface Answer {
  id: number;
  attemptId: number;
  questionId: number;
  answerText: string;
  isCorrect: boolean;
  marksObtained: number;
}

export interface SubmitAnswerRequest {
  questionId: number;
  answerText: string;
}

export interface SessionReport {
  id: number;
  attemptId: number;
  headsTurned: number;
  headTilts: number;
  lookAways: number;
  multiplePeople: number;
  faceVisibilityIssues: number;
  mobileDetected: number;
  audioIncidents: number;
  isValidTest?: boolean;
  invalidReason?: string;
}

export interface UpdateSessionReportRequest {
  headsTurned?: number;
  headTilts?: number;
  lookAways?: number;
  multiplePeople?: number;
  faceVisibilityIssues?: number;
  mobileDetected?: number;
  audioIncidents?: number;
}

export interface FinalizeSessionReportRequest {
  isValidTest: boolean;
  invalidReason?: string;
}

export interface Result {
  attemptId: number;
  testId: number;
  testTitle: string;
  userId: number;
  userName: string;
  userEmail: string;
  score: number;
  maxScore: number;
  percentage: number;
  submittedAt: string;
  isValidTest?: boolean;
}
