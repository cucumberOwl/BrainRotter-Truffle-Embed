
const Dropdown = ({ submenus, dropdown, setLink }) => {
    return (
      <ul className={`dropdown ${dropdown ? "show" : ""}`}>
        {submenus.map((submenu, index) => (
          <li key={index} className="menu-items">
            <div onMouseDown={() => setLink(submenu.url)} className="dropdown-item" >{submenu.title}</div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default Dropdown;