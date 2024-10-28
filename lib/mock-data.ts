// Mock data for development
export const MOCK_DATA = {
  users: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-03-01T00:00:00.000Z',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      status: 'active',
      createdAt: '2024-03-02T00:00:00.000Z',
    },
  ],
  videos: [
    {
      id: '1',
      title: 'Getting Started Guide',
      description: 'Learn how to get started with our platform',
      url: 'https://example.com/video1',
      thumbnailUrl: 'https://example.com/thumb1',
      status: 'published',
      createdAt: '2024-03-01T00:00:00.000Z',
      updatedAt: '2024-03-01T00:00:00.000Z',
    },
    {
      id: '2',
      title: 'Advanced Features',
      description: 'Deep dive into advanced features',
      url: 'https://example.com/video2',
      thumbnailUrl: 'https://example.com/thumb2',
      status: 'draft',
      createdAt: '2024-03-02T00:00:00.000Z',
      updatedAt: '2024-03-02T00:00:00.000Z',
    },
  ],
  sites: [
    {
      id: '1',
      name: 'Main Site',
      domain: 'example.com',
      status: 'active',
    },
    {
      id: '2',
      name: 'Blog',
      domain: 'blog.example.com',
      status: 'active',
    },
  ],
  analytics: {
    overview: {
      totalUsers: 1234,
      totalVideos: 567,
      totalViews: 98765,
      revenueData: [
        { name: 'Jan', total: 4500 },
        { name: 'Feb', total: 3500 },
        { name: 'Mar', total: 6000 },
        { name: 'Apr', total: 5200 },
        { name: 'May', total: 4800 },
        { name: 'Jun', total: 5800 },
      ],
    },
    recentSales: [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        amount: 1999.00,
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        amount: 1499.00,
      },
      {
        id: '3',
        name: 'Robert Johnson',
        email: 'robert@example.com',
        amount: 2199.00,
      },
    ],
  },
};