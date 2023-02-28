import { useState,useEffect } from "react";
import Link from "next/link";
import * as Avatar from '@radix-ui/react-avatar';
import styles from '@/components/Header/Header.module.css';

const Header = () => {

  const [userInitials,setUserInitials] = useState('');

  useEffect(() => {
    const userDataString: string|null = localStorage.getItem("UserData");
    if(userDataString !== null){
      const userData: any[] = JSON.parse(userDataString);
      const userNameArray = userData[0].name.split(' ');
      if(userNameArray.length > 1){
        setUserInitials(userNameArray[0].substring(0, 1).toUpperCase() + userNameArray[1].substring(0, 1).toUpperCase());
      } else {
        setUserInitials(userNameArray[0].substring(0, 1).toUpperCase());
      }
    } 
  },[]);

  const handleLogout = () => {
    localStorage.clear();
  }

  return (
    <div>
      <ul className="nav headerContainer">
        <li className="nav-item">
          <Link href="/dashboard">
            <h1>CARD91</h1>
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-expanded="false"
          >
          <Avatar.Root className={styles.AvatarRoot}>
            <Avatar.Fallback className={styles.AvatarFallback}>{userInitials}</Avatar.Fallback>
          </Avatar.Root>
          </a>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" href="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Header;
