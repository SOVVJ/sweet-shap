import { asset } from "../../data/catalog";

function Footer() {
  return (
    <footer>
      <img src={asset("Logo_Without_BG.png")} alt="Jhama Sweets" />
      <div>
        <h4>Quick links</h4>
        <a>Search</a>
        <a>Store Locator</a>
        <a>About us</a>
        <a>Contact us</a>
      </div>
      <div>
        <h4>Newsletter</h4>
        <p>Sign up for exclusive deals and free gifts!</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input placeholder="Email address" />
          <button>JOIN</button>
        </form>
      </div>
      <small>© Jhama Sweets & Foods Pvt Ltd 2026</small>
    </footer>
  );
}

export default Footer;
