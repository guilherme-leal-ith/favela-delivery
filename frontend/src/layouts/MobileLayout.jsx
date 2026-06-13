import BottomNav from '../components/BottomNav';

export default function MobileLayout({ children, navItems }) {
  return (
    <div className="mobile-shell-bg">
      <main className="mobile-shell">
        <div className="mobile-content">{children}</div>
        {navItems && <BottomNav items={navItems} />}
      </main>
    </div>
  );
}
