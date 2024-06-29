import './Header.css';
import { useTheme, useThemeUpdate } from '../CustomAppTheme';

export default function Header({ themeStyles }) {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();

  return (
    <div className='header' style={themeStyles}>
      <div className='header-content'>
        <div className='title'>
          <svg className="icon" width="40px" height="40px" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg">
            <path fill={themeStyles.fill} className="fill-path" d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-0.832 0.576-1.408t1.44-0.576h2.272q0.256-0.992 0.832-2.048l-1.6-1.6q-0.576-0.608-0.576-1.44t0.576-1.408 1.408-0.576 1.408 0.576l1.632 1.632q1.024-0.608 2.048-0.864v-2.272q0-0.832 0.576-1.408t1.408-0.608 1.408 0.608 0.608 1.408v2.272q0.992 0.256 2.048 0.864l1.6-1.632q0.576-0.576 1.408-0.576t1.408 0.576 0.576 1.408-0.576 1.44l-1.6 1.6q0.576 1.056 0.832 2.048h2.304q0.8 0 1.408 0.576t0.576 1.408-0.576 1.44-1.408 0.576h-2.304q-0.256 1.024-0.832 2.048l1.6 1.6q0.576 0.608 0.576 1.44t-0.576 1.408-1.408 0.576-1.408-0.576l-1.6-1.632q-1.056 0.608-2.048 0.864v2.272q0 0.832-0.608 1.408t-1.408 0.576-1.408-0.576-0.576-1.408v-2.272q-1.024-0.288-2.048-0.864l-1.632 1.632q-0.576 0.576-1.408 0.576t-1.408-0.576-0.576-1.408 0.576-1.44l1.6-1.6q-0.576-1.024-0.832-2.048h-2.272q-0.832 0-1.44-0.576t-0.576-1.44z" />
          </svg>
          Eventify
        </div>
        <div className='theme-button'>
          <label className="switch">
            <input type="checkbox" checked={darkTheme} onChange={toggleTheme} />
            <span className="slider round"></span>
          </label>
          {/* <span className="switch-label">{darkTheme ? 'Dark Theme' : 'Light Theme'}</span> */}
        </div>
      </div>
    </div>
  );
}
