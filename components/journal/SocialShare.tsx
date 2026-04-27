'use client';

import React from 'react';
import styles from './journal-components.module.css';

const ShareIcon = ({ platform, children }: { platform: string; children: React.ReactNode }) => (
  <button 
    className={styles.shareIcon} 
    onClick={() => {
      // In a real app, logic to share on specific platforms would go here
      if (platform === 'copy') {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } else {
        console.log(`Sharing on ${platform}`);
      }
    }}
    aria-label={`Share on ${platform}`}
  >
    {children}
  </button>
);

export const SocialShare = () => {
  return (
    <div className={styles.shareSidebar}>
      <span className={styles.sidebarLabel}>SHARE</span>
      <div className={styles.shareIcons}>
        <ShareIcon platform="linkedin">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </ShareIcon>
        
        <ShareIcon platform="x">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </ShareIcon>

        <ShareIcon platform="facebook">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.74h-2.94v-3.403h2.94v-2.511c0-2.914 1.78-4.5 4.377-4.5 1.244 0 2.315.092 2.627.134v3.044h-1.802c-1.414 0-1.688.672-1.688 1.658v2.175h3.368l-.438 3.403h-2.93v8.74h6.052c.733 0 1.325-.593 1.325-1.324v-21.351c0-.732-.592-1.325-1.325-1.325z" />
          </svg>
        </ShareIcon>

        <ShareIcon platform="copy">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </ShareIcon>
      </div>
    </div>
  );
};
