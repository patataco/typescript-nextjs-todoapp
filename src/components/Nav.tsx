import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const Nav = () => {
  return (
    <div className="h-12 bg-slate-300">
      <div className="mx-auto flex h-full items-center justify-between px-4">
        <NavigationMenu>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Image alt="menu" src="/menusvg.svg" width={16} height={16} />
            </NavigationMenuTrigger>
            <NavDropdownMenu />
          </NavigationMenuItem>
        </NavigationMenu>

        <div className="mx-auto pr-16 text-xl font-medium text-neutral-700">
          <Link href="/">Todo앱의 A to Z</Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;

const NavDropdownMenu = () => {
  return (
    <NavigationMenuContent>
      <ul className="flex w-[160px] flex-col items-center justify-center">
        <li className="w-full">
          <ListItem href="/guide" title="프로젝트 가이드">
            프로젝트 설정
          </ListItem>
        </li>
        <li className="w-full">
          <ListItem href="/BDD" title="개발방법론, BDD">
            BDD로 개발하기
          </ListItem>
        </li>
        <li className="w-full">
          <ListItem href="/todo/v1" title="v1">
            Context API를 활용한 상태관리
          </ListItem>
        </li>
        <li className="w-full">
          <ListItem href="/todo/v2" title="v2">
            Recoil을 활용한 상태관리
          </ListItem>
        </li>
        <li className="w-full">
          <ListItem href="/todo/v3" title="v3">
            REST API를 활용한 Data Fetching
          </ListItem>
        </li>
        <li className="w-full">
          <ListItem href="/todo/v4" title="v4">
            React Query로 Optimistic Updates 구현하기
          </ListItem>
        </li>
      </ul>
    </NavigationMenuContent>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
