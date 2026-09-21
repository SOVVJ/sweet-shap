import { useEffect, useRef, useState } from "react";
import { ChevronRight, Plus, X } from "lucide-react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AccountPage from "./pages/AccountPage";
import CheckoutPage from "./pages/CheckoutPage";
import CollectionPage from "./pages/CollectionPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import {
  allProducts,
  collections,
  currentScreen,
  imageOf,
  priceFor,
  productFromUrl,
} from "./data/catalog";
import { supabase } from "./lib/supabase";

function App() {
  const [screen, setScreen] = useState(currentScreen),
    [cart, setCart] = useState([]),
    [drawer, setDrawer] = useState(false),
    [search, setSearch] = useState(false),
    [query, setQuery] = useState(""),
    [menu, setMenu] = useState(false),
    [user, setUser] = useState(null),
    [authError, setAuthError] = useState(""),
    [authNotice, setAuthNotice] = useState(""),
    [isAuthLoading, setIsAuthLoading] = useState(false),
    [orders, setOrders] = useState([]),
    [isPaymentProcessing, setIsPaymentProcessing] = useState(false),
    [isAuthReady, setIsAuthReady] = useState(false);
  const paymentTimer = useRef(null);
  const go = (s) => {
    history.pushState({}, "", s === "home" ? "/" : `/${s}`);
    setScreen(s);
    scrollTo({ top: 0, behavior: "instant" });
  };
  useEffect(() => {
    let f = () => setScreen(currentScreen());
    addEventListener("popstate", f);
    return () => removeEventListener("popstate", f);
  }, []);
  useEffect(() => {
    if (!supabase) {
      setIsAuthReady(true);
      return;
    }
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setUser(session?.user || null))
      .finally(() => setIsAuthReady(true));
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      },
    );
    return () => listener.subscription.unsubscribe();
  }, []);
  useEffect(
    () => () => {
      if (paymentTimer.current) window.clearTimeout(paymentTimer.current);
    },
    [],
  );
  useEffect(() => {
    if (!isAuthReady || screen !== "checkout") return;
    if (!user) go("account");
    else if (!cart.length && !isPaymentProcessing) go("home");
  }, [isAuthReady, screen, user, cart.length, isPaymentProcessing]);
  useEffect(() => {
    if (!user?.id) {
      setOrders([]);
      return;
    }
    try {
      const savedOrders = localStorage.getItem(`jhama-orders-${user.id}`);
      setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    } catch {
      setOrders([]);
    }
  }, [user?.id]);
  useEffect(() => {
    if (!drawer && !search && !menu) return;
    const previousOverflow = document.body.style.overflow;
    const closeOverlays = (event) => {
      if (event.key !== "Escape") return;
      setDrawer(false);
      setSearch(false);
      setMenu(false);
      setQuery("");
    };
    document.body.style.overflow = "hidden";
    addEventListener("keydown", closeOverlays);
    return () => {
      document.body.style.overflow = previousOverflow;
      removeEventListener("keydown", closeOverlays);
    };
  }, [drawer, search, menu]);

  const authenticate = async (mode, form) => {
    setAuthError("");
    setAuthNotice("");
    if (!supabase) {
      setAuthError("Something went Wrong");
      return;
    }
    setIsAuthLoading(true);
    let response;
    try {
      response =
        mode === "signup"
          ? await supabase.auth.signUp({
              email: form.email,
              password: form.password,
              options: {
                data: { name: form.name },
                emailRedirectTo: window.location.origin,
              },
            })
          : await supabase.auth.signInWithPassword({
              email: form.email,
              password: form.password,
            });
    } catch {
      setAuthError("Could not reach the sign-in service. Please try again.");
      return;
    } finally {
      setIsAuthLoading(false);
    }
    if (response.error) {
      setAuthError(response.error.message);
      return;
    }
    if (mode === "signup" && !response.data.session) {
      setAuthNotice(
        "Account created. Please check your email and confirm your account before signing in.",
      );
    }
  };
  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
  };
  const saveProfile = async (profile) => {
    if (!supabase || !user) return { error: "You are not signed in." };
    const attributes = {
      data: {
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
      },
    };
    if (profile.email !== user.email) attributes.email = profile.email;
    const { data, error } = await supabase.auth.updateUser(attributes);
    if (error) return { error: error.message };
    setUser(data.user || user);
    return {
      notice:
        profile.email !== user.email
          ? "Details saved. Confirm the email-change message sent to your new address."
          : "Details saved.",
    };
  };
  const startCheckout = () => {
    setDrawer(false);
    go("checkout");
  };
  const completeCheckout = () => {
    if (isPaymentProcessing || !cart.length || !user) return;
    const orderItems = cart.map((item) => ({ ...item }));
    const userId = user.id;
    setIsPaymentProcessing(true);
    paymentTimer.current = window.setTimeout(() => {
      const order = {
        id: `ORDER #${String(Date.now()).slice(-6)}`,
        date: new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
          new Date(),
        ),
        items: orderItems,
        total: orderItems.reduce(
          (sum, item) => sum + Number(item.price.replace(/[^\d.]/g, "")),
          0,
        ),
      };
      setOrders((current) => {
        const updated = [order, ...current];
        localStorage.setItem(`jhama-orders-${userId}`, JSON.stringify(updated));
        return updated;
      });
      setCart([]);
      setIsPaymentProcessing(false);
      paymentTimer.current = null;
      go("account");
    }, 5000);
  };
  const add = (p) => {
    setCart((c) => [
      ...c,
      {
        ...p,
        weight: p.weight || "400g",
        basePrice: p.basePrice || p.price,
        price: priceFor(p, p.weight || "400g"),
      },
    ]);
    setDrawer(true);
  };
  const updateCartWeight = (index, weight) =>
    setCart((items) =>
      items.map((item, itemIndex) =>
        itemIndex === index
          ? { ...item, weight, price: priceFor(item, weight) }
          : item,
      ),
    );
  const catalog = allProducts;
  const results = query.trim()
    ? catalog
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6)
    : [];
  const total = cart.reduce(
    (s, p) => s + Number(p.price.replace(/[^\d.]/g, "")),
    0,
  );
  return (
    <>
      <Header
        go={go}
        cart={cart}
        onOpenCart={() => {
          setDrawer(true);
          setMenu(false);
          setSearch(false);
        }}
        onOpenMenu={() => {
          setMenu(true);
          setDrawer(false);
          setSearch(false);
        }}
        onOpenSearch={() => {
          setSearch(true);
          setDrawer(false);
          setMenu(false);
        }}
      />
      {screen === "product" ? (
        <ProductPage p={productFromUrl()} add={add} />
      ) : screen === "checkout" ? (
        <CheckoutPage
          cart={cart}
          total={total}
          onPay={completeCheckout}
          isProcessing={isPaymentProcessing}
        />
      ) : screen === "account" ? (
        <AccountPage
          user={user}
          onAuthenticate={authenticate}
          onSaveProfile={saveProfile}
          onSignOut={signOut}
          authError={authError}
          authNotice={authNotice}
          isLoading={isAuthLoading}
          orders={orders}
        />
      ) : screen === "home" ? (
        <HomePage go={go} add={add} />
      ) : (
        <CollectionPage id={screen} add={add} />
      )}
      <Footer />
      {menu && (
        <aside className="menu-panel" aria-label="Shop menu">
          <button onClick={() => setMenu(false)} aria-label="Close menu">
            <X />
          </button>
          <p>SHOP</p>
          {Object.entries(collections).map(([id, c]) => (
            <button
              key={id}
              onClick={() => {
                go(id);
                setMenu(false);
              }}
            >
              {c.title}
              <ChevronRight />
            </button>
          ))}
        </aside>
      )}
      {search && (
        <div className="overlay" role="presentation">
          <div
            className="search-box"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-title"
          >
            <button
              onClick={() => {
                setSearch(false);
                setQuery("");
              }}
              aria-label="Close search"
            >
              <X />
            </button>
            <h2 id="search-title">What are you looking for?</h2>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sweets, namkeen, dry fruits..."
            />
            {query && (
              <div className="search-results">
                {results.length ? (
                  results.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => {
                        add(p);
                        setSearch(false);
                        setQuery("");
                      }}
                    >
                      <img src={imageOf(p)} alt="" />
                      <span>
                        <b>{p.name}</b>
                        <small>From {p.price}</small>
                      </span>
                      <Plus size={18} />
                    </button>
                  ))
                ) : (
                  <p>No products found for “{query}”.</p>
                )}
              </div>
            )}
            {!query && (
              <div className="suggestions">
                Popular: Gulab Jamun　 Kaju Katli　 Sev Barfi
              </div>
            )}
          </div>
        </div>
      )}
      {drawer && (
        <aside className="cart" aria-label="Shopping cart">
          <div className="cart-top">
            <h2>
              Your Cart <small>({cart.length})</small>
            </h2>
            <button onClick={() => setDrawer(false)} aria-label="Close cart">
              <X />
            </button>
          </div>
          {cart.length ? (
            <>
              <div className="cart-items">
                {cart.map((p, i) => (
                  <div className="cart-line" key={i}>
                    <img src={imageOf(p)} alt={p.name} />
                    <div>
                      <b>{p.name}</b>
                      <p>{p.price}</p>
                      <select
                        className="cart-weight"
                        aria-label={`${p.name} weight`}
                        value={p.weight || "400g"}
                        onChange={(event) =>
                          updateCartWeight(i, event.target.value)
                        }
                      >
                        <option value="400g">400g</option>
                        <option value="800g">800g</option>
                      </select>
                    </div>
                    <button
                      aria-label={`Remove ${p.name} from cart`}
                      onClick={() =>
                        setCart((c) => c.filter((_, n) => n !== i))
                      }
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-bottom">
                <p>
                  Subtotal <b>₹ {total.toFixed(2)}</b>
                </p>
                {user ? (
                  <button onClick={startCheckout}>CHECK OUT</button>
                ) : (
                  <button
                    onClick={() => {
                      setDrawer(false);
                      go("account");
                    }}
                  >
                    SIGN IN TO CHECK OUT
                  </button>
                )}
                <small>Shipping and taxes calculated at checkout</small>
              </div>
            </>
          ) : (
            <div className="empty">
              Your Cart is Empty
              <br />
              <button onClick={() => setDrawer(false)}>
                CONTINUE SHOPPING
              </button>
            </div>
          )}
        </aside>
      )}
    </>
  );
}
export default App;
