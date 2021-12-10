import Search from "./Search";
import Authorization from "./Authorization";

const Header = () => {
  return (
    <header className="py-3 bg-dark text-white header">
      <div className="container">
        <div className="header-content">
          <span style={{ fontSize: 18 }}>AwennSocial</span>
          <div className="header-actions">
            <Search />
            <Authorization />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
