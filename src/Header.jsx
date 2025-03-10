import React, { useEffect, useState } from 'react';
import Logo from './components/Activities/Logo.jsx';

const Header = ({ activeTab }) => {
  const [currentTab, setCurrentTab] = useState('inbox');

  useEffect(() => {
    activeTab(currentTab);
  }, [currentTab]);

  return (
    <header>
      <Logo />
      <nav>
        <div onClick={() => setCurrentTab('inbox')}>
          <div className={currentTab == 'inbox' ? 'active title' : 'title'}>
            Inbox
          </div>
        </div>
        <div onClick={() => setCurrentTab('archive')}>
          <div className={currentTab == 'archive' ? 'active title' : 'title'}>
            Archive
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
