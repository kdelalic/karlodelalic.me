import React, { useCallback, useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Switch from "@mui/material/Switch";

const DarkSwitch = styled(Switch)(() => ({
  '& .MuiSwitch-switchBase': {
    color: "#6772e5",
    '&.Mui-checked': {
      color: "#6772e5",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#fff',
      },
    },
  },
  checked: {},
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: "#252525",
  },
  '&.no-transition .MuiSwitch-switchBase': {
    transition: 'none',
  },
  '&.no-transition .MuiSwitch-track': {
    transition: 'none',
  },
  '&.hidden': {
    opacity: 0,
  },
}));

const DarkModeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Sync state with current theme from both window.__theme and DOM
      const syncTheme = () => {
        const isDark = window.__theme === 'dark' || document.documentElement.classList.contains('dark');
        setIsDarkMode(isDark);
      };

      // Immediately sync on mount
      syncTheme();

      // Enable transitions after initial sync
      setTimeout(() => setHasHydrated(true), 0);

      // Listen for storage events to sync across tabs
      const handleStorageChange = (e) => {
        if (e.key === 'preferred-theme') {
          setIsDarkMode(e.newValue === 'dark');
        }
      };

      window.addEventListener('storage', handleStorageChange);

      // Also sync on focus in case theme changed in another tab
      window.addEventListener('focus', syncTheme);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('focus', syncTheme);
      };
    }
  }, []);

  const onChange = useCallback(
    e => {
      const isDarkMode = e.target.checked;
      setIsDarkMode(isDarkMode);
      if (typeof window !== 'undefined') {
        window.__setPreferredTheme(isDarkMode ? 'dark' : 'light');
      }
    },
    []
  );

  return <DarkSwitch
    className={hasHydrated ? "dark-switch" : "dark-switch hidden"}
    checked={isDarkMode}
    onChange={onChange}
    value="darkMode"
    inputProps={{ "aria-label": "dark mode switch" }}
  />;
};

export default DarkModeSwitch;
