'use client';

import { useState } from 'react';

import { List } from '@mui/material';

import { ICONS } from '@/lib/icons/icons-const';

import { MenuItemComponent, type MenuItem } from './MenuItem';
import { NavigationContainer } from './sidebar-styled-component';

interface NavigationMenuProps {
  onNavClick: () => void;
}

export function NavigationMenu({ onNavClick }: NavigationMenuProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const navItems: MenuItem[] = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: ICONS.DASHBOARD_ICON,
    },
    {
      name: 'Management',
      icon: 'ic:outline-business',
      children: [
        {
          name: 'Users',
          path: '/users',
          icon: ICONS.USERS_ICON,
          adminOnly: true,
          badge: '12',
        },
        {
          name: 'Roles',
          path: '/roles',
          icon: 'ic:outline-admin-panel-settings',
          adminOnly: true,
        },
        {
          name: 'Permissions',
          path: '/permissions',
          icon: 'ic:outline-security',
          adminOnly: true,
        },
      ],
    },
    {
      name: 'Analytics',
      icon: 'ic:outline-analytics',
      children: [
        {
          name: 'Reports',
          path: '/reports',
          icon: 'ic:outline-assessment',
        },
        {
          name: 'Statistics',
          path: '/statistics',
          icon: 'ic:outline-bar-chart',
        },
      ],
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: ICONS.SETTINGS_ICON,
    },
  ];

  const handleExpandToggle = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <NavigationContainer>
      <List disablePadding>
        {navItems.map((item) => (
          <MenuItemComponent
            key={item.name}
            item={item}
            expandedItems={expandedItems}
            onExpandToggle={handleExpandToggle}
            onNavClick={onNavClick}
          />
        ))}
      </List>
    </NavigationContainer>
  );
}
