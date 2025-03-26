import { Session } from 'next-auth';

export const mockSession = (isAdmin = false): Session => ({
  user: {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'ADMIN',
  },
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
});

export const mockGetServerSession = (session: Session | null = null) => {
  jest.mock('next-auth/next', () => ({
    getServerSession: jest.fn().mockResolvedValue(session),
  }));
};

jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
})); 