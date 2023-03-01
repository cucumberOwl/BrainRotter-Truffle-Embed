import { menuItems } from '../menuItems';
import MenuItems from './MenuItems';

const Navbar = (props) => {
  return (
    <nav>
      <ul className="menus ">
        {menuItems.map((menu, index) => {
          return <MenuItems items={menu} key={index} setLink={props.setLink} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;