'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Icon from '@/lib/icons';
import { ICONS } from '@/lib/icons/icons-const';

import { useAuth } from '../../hooks/use-auth';
import {
  MobileNavContainer,
  MobileNavigation,
  MobileNavPaper,
  StyledBottomNavigationAction,
} from './components/mobile-bottom-nav-styled-component';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { isAdmin } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: ICONS.DASHBOARD_ICON },
    { name: 'Users', path: '/users', icon: ICONS.USERS_ICON, adminOnly: true },
    { name: 'Reports', path: '/reports', icon: 'ic:outline-assessment' },
    { name: 'Settings', path: '/settings', icon: ICONS.SETTINGS_ICON },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !item.adminOnly || isAdmin()
  );

  const getCurrentValue = () => {
    const currentItem = filteredNavItems.find((item) => item.path === pathname);
    return currentItem ? filteredNavItems.indexOf(currentItem) : 0;
  };

  return (
    <MobileNavContainer>
      <MobileNavPaper>
        <MobileNavigation value={getCurrentValue()}>
          {filteredNavItems.map((item, index) => (
            <StyledBottomNavigationAction
              key={item.path}
              label={item.name}
              icon={<Icon icon={item.icon} />}
              component={Link}
              href={item.path}
            />
          ))}
        </MobileNavigation>
      </MobileNavPaper>
    </MobileNavContainer>
  );
}
