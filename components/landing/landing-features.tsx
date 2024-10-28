'use client';

import { 
  LayoutDashboard, 
  Users, 
  Video, 
  Settings 
} from 'lucide-react';

export function LandingFeatures() {
  const features = [
    {
      name: 'Dashboard Overview',
      description: 'Get a bird\'s eye view of your system',
      icon: LayoutDashboard,
    },
    {
      name: 'User Management',
      description: 'Manage users and their permissions',
      icon: Users,
    },
    {
      name: 'Video Management',
      description: 'Upload and manage video content',
      icon: Video,
    },
    {
      name: 'Site Settings',
      description: 'Configure your site preferences',
      icon: Settings,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-primary">
          Everything you need
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Powerful Features
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold">
                <feature.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                {feature.name}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}