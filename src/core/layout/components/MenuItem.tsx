'use client';

import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Icon from '@/lib/icons';

import { useAuth } from '@hooks/use-auth';

import { BadgeContainer, MenuItemButton } from './sidebar-styled-component';

export interface MenuItem {
  name: string;
  path?: string;
  icon: string;
  adminOnly?: boolean;
  children?: MenuItem[];
  badge?: string | number;
}

interface MenuItemProps {
  item: MenuItem;
  level?: number;
  expandedItems: string[];
  onExpandToggle: (itemName: string) => void;
  onNavClick: () => void;
}

export function MenuItemComponent({
  item,
  level = 0,
  expandedItems,
  onExpandToggle,
  onNavClick,
}: MenuItemProps) {
  const pathname = usePathname();
  const { isAdmin } = useAuth();

  // Skip admin-only items for non-admin users
  if (item.adminOnly && !isAdmin()) return null;

  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.includes(item.name);
  const active = item.path ? pathname === item.path : false;
  const parentActive = hasChildren
    ? item.children!.some((child) => child.path && pathname === child.path)
    : false;

  return (
    <Box>
      <ListItem
        component={item.path ? Link : 'div'}
        href={item.path || undefined}
        disablePadding
        sx={{ display: 'block' }}
      >
        <MenuItemButton
          onClick={() => {
            if (hasChildren) {
              onExpandToggle(item.name);
            } else {
              onNavClick();
            }
          }}
          active={active}
          level={level}
          parentActive={parentActive}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: active
                ? 'white'
                : parentActive
                  ? 'primary.main'
                  : 'text.secondary',
            }}
          >
            <Icon icon={item.icon} style={{ fontSize: '20px' }} />
          </ListItemIcon>

          <ListItemText
            primary={item.name}
            sx={{
              '& .MuiListItemText-primary': {
                fontSize: '0.875rem',
                fontWeight: active ? 600 : 500,
              },
            }}
          />

          {/* Badge */}
          {item.badge && <BadgeContainer>{item.badge}</BadgeContainer>}

          {/* Expand/Collapse Icon */}
          {hasChildren && (
            <Icon
              icon={
                isExpanded ? 'ic:round-expand-less' : 'ic:round-expand-more'
              }
              style={{
                fontSize: '20px',
                color: 'text.secondary',
              }}
            />
          )}
        </MenuItemButton>
      </ListItem>

      {/* Children */}
      {hasChildren && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children!.map((child) => (
              <MenuItemComponent
                key={child.name}
                item={child}
                level={level + 1}
                expandedItems={expandedItems}
                onExpandToggle={onExpandToggle}
                onNavClick={onNavClick}
              />
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );
}
