import { Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { asset } from "../../data/catalog";

function Header({ go, cart, onOpenCart, onOpenMenu, onOpenSearch }) {
  return (
    <>
      <div className="delivery">
        <span>
          Free Shipping Within Mumbai, Navi Mumbai And Thane On Orders Above
          ₹999. Orders Placed Before 5pm In These Locations Delivered The Same
          Day. <i>(Except Festival Days)</i>
        </span>
      </div>
      <div className="fixed-chrome">
        <header>
          <div className="header-side left">
            <button onClick={onOpenMenu} aria-label="Open menu">
              <Menu />
            </button>
            <button onClick={onOpenSearch} aria-label="Search">
              <Search />
            </button>
          </div>
          <button className="logo" onClick={() => go("home")}>
            <img src={asset("Logo_Without_BG.png")} alt="Jhama Sweets" />
          </button>
          <div className="header-side right">
            <button onClick={() => go("account")} aria-label="My account">
              <UserRound />
            </button>
            <button className="bag" onClick={onOpenCart} aria-label="Open cart">
              <ShoppingBag />
              <b>{cart.length}</b>
            </button>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
