const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <footer className="dashboard-footer">
      © {year} Veloria Shopping Store. All Rights Reserved.
    </footer>
  );
};

export default Footer;