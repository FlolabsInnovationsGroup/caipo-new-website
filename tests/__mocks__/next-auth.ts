export const getServerSession = jest.fn().mockResolvedValue({
  user: { email: 'admin@example.com' }
})

export default {
  getServerSession
} 