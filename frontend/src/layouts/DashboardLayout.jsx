import { NavLink } from 'react-router-dom';

export default function DashboardLayout({ title, navItems, children }) {
  return (
    <div className="dashboard-bg">
      <div className="dashboard-shell">
        <aside className="sidebar">
          <div className="brand-mini">FavelaFood</div>
          <nav>
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="dashboard-main">
          <h1>{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
}
