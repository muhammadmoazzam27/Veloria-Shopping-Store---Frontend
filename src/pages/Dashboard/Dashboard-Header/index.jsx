const Header = ({ setShowSidebar }) => {
  return (
    <header className="dashboard-header">
      <h4>User Dashboard</h4>
      <button className="menu-btn d-md-none" onClick={() => setShowSidebar(true)}>☰</button>
    </header>
  );
};

export default Header