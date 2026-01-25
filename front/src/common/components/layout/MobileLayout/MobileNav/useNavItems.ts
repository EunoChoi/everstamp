'use client'

import { getTodayString } from "@/common/functions/getTodayString";
import { useSelectedLayoutSegment } from "next/navigation";
import { useRouter } from "next/navigation";
import { MdCalendarMonth, MdCheckBox, MdHome, MdSettings, MdViewList } from 'react-icons/md';

export const useNavItems = () => {
  const router = useRouter();
  const current = useSelectedLayoutSegment();

  const items = [
    { key: 'home', icon: MdHome, label: 'home', onClick: () => router.push('/home') },
    { key: 'calendar', icon: MdCalendarMonth, label: 'calendar', onClick: () => router.push(`/calendar?date=${getTodayString()}`) },
    { key: 'list', icon: MdViewList, label: 'list', onClick: () => router.push('/list') },
    { key: 'habit', icon: MdCheckBox, label: 'habit', onClick: () => router.push('/habit') },
    { key: 'setting', icon: MdSettings, label: 'setting', onClick: () => router.push('/setting') },
  ];

  return { items, current };
};
