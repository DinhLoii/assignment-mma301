/**
 * User Domain Model
 * Prepares foundation for Practical Exam 2 authentication and team assignment.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: 'MEMBER' | 'ADMIN' | 'GUEST';
  teamId?: string | null;
  createdAt?: string | number;
}
