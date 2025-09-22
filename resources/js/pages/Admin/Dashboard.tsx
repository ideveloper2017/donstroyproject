import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, Activity, Plus, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

const stats = [
  { id: 1, name: 'Jami Foydalanuvchilar', value: '0', icon: Users, change: '+20.1%', changeType: 'positive' },
  { id: 2, name: 'Faol Foydalanuvchilar', value: '0', icon: Activity, change: '+180.1%', changeType: 'positive' },
  { id: 3, name: 'Jami Rollar', value: '0', icon: Shield, change: '+2', changeType: 'positive' },
];

const quickActions = [
  { name: 'Foydalanuvchi Qo\'shish', href: '/admin/users/create', icon: Users },
  { name: 'Rol Qo\'shish', href: '/admin/roles/create', icon: Shield },
];

const recentActivity = [
  { id: 1, title: 'Yangi foydalanuvchi ro\'yxatdan o\'tdi', time: '2 soat oldin' },
  { id: 2, title: 'Rol huquqlari yangilandi', time: '5 soat oldin' },
  { id: 3, title: 'Tizim zaxirasi yaratildi', time: '1 kun oldin' },
];

type DashboardProps = {
  stats: {
    totalUsers: number;
    totalRoles: number;
    activeUsers: number;
  };
};

export default function Dashboard({ stats: initialStats }: DashboardProps) {
  // Update stats with actual data from props
  const updatedStats = stats.map(stat => {
    if (stat.name === 'Jami Foydalanuvchilar') return { ...stat, value: initialStats.totalUsers };
    if (stat.name === 'Faol Foydalanuvchilar') return { ...stat, value: initialStats.activeUsers };
    if (stat.name === 'Jami Rollar') return { ...stat, value: initialStats.totalRoles };
    return stat;
  });

  return (
    <AdminLayout>
      <Head title="Admin paneli" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
        {/* Stats Grid */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
          {updatedStats.map((stat) => (
            <Card key={stat.id} className="border-border/70">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  O'tgan oyga nisbatan {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Tezkor Harakatlar</CardTitle>
              <CardDescription>Ko'p ishlatiladigan harakatlar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    className="flex flex-col items-center justify-center rounded-lg border border-border/70 p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <action.icon className="mb-2 h-6 w-6" />
                    <span className="text-sm font-medium">{action.name}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>So'nggi Harakatlar</CardTitle>
                  <CardDescription>Tizimdagi so'nggi harakatlar</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="h-8">
                  <History className="mr-2 h-4 w-4" />
Barchasini ko'rish
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3" />
                    <div>
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
