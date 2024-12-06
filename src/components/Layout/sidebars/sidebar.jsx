import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faUsers, 
  faChartLine, 
  faChartBar, 
  faUser, 
  faShieldAlt, 
  faCogs, 
  faSignOutAlt,
  faBell,
  faChevronDown // Import the down arrow icon
} from '@fortawesome/free-solid-svg-icons'; 
import styles from './sidebar.module.css';
import { useRouter } from 'next/router';

export default function SidebarLayout({ children }) {
  const [activeMenu, setActiveMenu] = useState('');
  const router = useRouter()
  const handleActiveStyling = (menu) => {
    return router.asPath == menu ? styles.active: ''
  }; 
  const handleRouting = (route) => {
     router.push(route)
  };

  return (
    <div className={styles.sidebarLayout}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src="/images/logo.png" alt="Logo" className={styles.logoImg} />
        </div>

        {/* Sidebar Menu */}
        <div className={styles.sidebarMenu}>

          {/* Overview */}
          {/* <Link href="/admin/overview"> */}
            <div
              className={`${handleActiveStyling('/admin/overview')} ${styles.menuItem} `}
              onClick={() => handleRouting('/admin/overview')}
            >
              <FontAwesomeIcon icon={faTachometerAlt} className={styles.icon} />
              Overview
            </div>
          {/* </Link> */}

          {/* Customers */}
          {/* <Link href="/admin/customers"> */}
            <div
              className={`${handleActiveStyling('/admin/customers')}  ${styles.menuItem}`}
              onClick={() => handleRouting('/admin/customers')}
            >
              <FontAwesomeIcon icon={faUsers} className={styles.icon} />
              Customers
            </div>
          {/* </Link> */}

          {/* Acquisitions Header */}
          <div className={styles.staticHeader}>
            Acquisitions
            <FontAwesomeIcon icon={faChevronDown} className={styles.headerIcon} /> {/* Down arrow added */}
          </div>
          <hr className={styles.divider} />
          <div className={styles.dropdownMenu}>
            {/* <Link href="/admin/acquisition/account_officers"> */}
              <div
                className={`${handleActiveStyling('/admin/acquisition/account_officers')} ${styles.menuItem}`}
                onClick={() => handleRouting('/admin/acquisition/account_officers')}
              >
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
                Account Officers
              </div>
            {/* </Link> */}

            {/* <Link href="/admin/acquisitions/acquisition_metrics"> */}
              <div
                className={`${handleActiveStyling('/admin/acquisition/acquisition_metrics')} ${styles.menuItem}`}
                onClick={() => handleRouting('/admin/acquisition/acquisition_metrics')}
              >
                <FontAwesomeIcon icon={faChartBar} className={styles.icon} />
                Acquisition Metrics
              </div>
            {/* </Link> */}
            {/* <Link href="/admin/acquisitions/lead_tracker"> */}
              <div
                className={`${handleActiveStyling('/admin/acquisition/lead_tracker')} ${ styles.menuItem }`}
                onClick={() => handleRouting('/admin/acquisition/lead_tracker')}
              >
                <FontAwesomeIcon icon={faChartLine} className={styles.icon} />
                Lead Tracker
              </div>
            {/* </Link> */}

          </div>

          {/* System Header */}
          <div className={styles.staticHeader}>
            System
            <FontAwesomeIcon icon={faChevronDown} className={styles.stylesHeaderIcon} /> {/* Down arrow added */}
          </div>
          <hr className={styles.divider} />
          <div className={styles.dropdownMenu}>

            {/* <Link href="/admin/system/notifications"> */}
              <div
                className={`${handleActiveStyling('/admin/system/notifications')} ${ styles.menuItem  }`}
                onClick={() => handleRouting('/admin/system/notifications')}
              >
                <FontAwesomeIcon icon={faBell} className={styles.icon} />
                Notifications
              </div>
            {/* </Link> */}

            {/* <Link href="/admin/system/access_control"> */}
              <div
                className={`${handleActiveStyling('/admin/system/access_control')} ${styles.menuItem }`}
                onClick={() => handleRouting('/admin/system/access_control')}
              >
                <FontAwesomeIcon icon={faShieldAlt} className={styles.icon} />
                Access Control
              </div>
            {/* </Link> */}

            {/* <Link href="/admin/system/settings"> */}
              <div
                className={`${handleActiveStyling('/admin/system/settings')} ${styles.menuItem }`}
                onClick={() => handleRouting('/admin/system/settings')}
              >
                <FontAwesomeIcon icon={faCogs} className={styles.icon} />
                Settings
              </div>
            {/* </Link> */}
          </div>

          <div className={styles.userInfo}>
            {/* User Image and Info */}
            <div className={styles.userDetails}>
              <img 
                src="/images/user-placeholder.jpg" // Replace with actual user image URL
                alt="User Image" 
                className={styles.userImage}
              />
              <div className={styles.userText}>
                <div className={styles.username}>Username</div>
                <div className={styles.role}>Administrator</div>
              </div>
            </div>

            {/* Logout link */}
            <Link href="/logout">
              <div className={styles.logoutContainer}>
                <FontAwesomeIcon icon={faSignOutAlt} className={styles.icon} />
                <div className={styles.logout}>Log out</div>
              </div>
            </Link>

          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>{children}</div>
    </div>
  );
}
