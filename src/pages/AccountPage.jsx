import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

function AccountPage({
  user,
  onAuthenticate,
  onSaveProfile,
  onSignOut,
  authError,
  authNotice,
  isLoading,
  orders,
}) {
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [profileMessage, setProfileMessage] = useState(null);

  useEffect(() => {
    if (!user) return;
    setProfile({
      name: user.user_metadata?.name || "",
      email: user.email || "",
      phone: user.user_metadata?.phone || "",
      address: user.user_metadata?.address || "",
    });
  }, [user]);

  const updateForm = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));
  const updateProfile = (key, value) =>
    setProfile((current) => ({ ...current, [key]: value }));

  if (!user) {
    const creatingAccount = mode === "signup";
    return (
      <main className="account-page account-login">
        <section className="account-card">
          <p className="eyebrow">WELCOME TO JHAMA</p>
          <h1>
            {creatingAccount ? "Create an account" : "Sign in to your account"}
          </h1>
          <p>Save your details and keep track of your sweet orders.</p>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await onAuthenticate(mode, form);
            }}
          >
            {creatingAccount && (
              <label>
                Name
                <input
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  placeholder="Your name"
                  required
                />
              </label>
            )}
            <label>
              Email address
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateForm("email", event.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={form.password}
                onChange={(event) => updateForm("password", event.target.value)}
                placeholder="At least 6 characters"
                minLength="6"
                required
              />
            </label>
            {authError && (
              <p className="auth-message error" role="alert">
                {authError}
              </p>
            )}
            {authNotice && <p className="auth-message success">{authNotice}</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading
                ? "PLEASE WAIT..."
                : creatingAccount
                  ? "CREATE ACCOUNT"
                  : "SIGN IN"}
            </button>
          </form>
          <button
            className="account-switch"
            type="button"
            onClick={() => setMode(creatingAccount ? "signin" : "signup")}
          >
            {creatingAccount
              ? "Already have an account? Sign in"
              : "New here? Create an account"}
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="account-page">
      <section className="account-header">
        <p className="eyebrow">MY ACCOUNT</p>
        <h1>Hello, {profile.name || "there"}</h1>
        <p>Manage your orders and personal details in one place.</p>
      </section>
      <section className="account-grid">
        <article className="account-section orders-panel">
          <p className="eyebrow">ORDERS</p>
          <h2>Your orders</h2>
          {orders.length ? (
            <div className="order-list">
              {orders.map((order) => (
                <div className="order-card" key={order.id}>
                  <div>
                    <b>{order.id}</b>
                    <small>{order.date}</small>
                  </div>
                  <span>CONFIRMED</span>
                  <p>
                    {order.items.length} item
                    {order.items.length === 1 ? "" : "s"} · ₹{" "}
                    {order.total.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-orders">
              <ShoppingBag size={28} />
              <h3>No orders yet</h3>
              <p>Your completed orders will appear here.</p>
            </div>
          )}
        </article>
        <article className="account-section profile-panel">
          <div className="profile-heading">
            <div>
              <p className="eyebrow">PROFILE</p>
              <h2>Your details</h2>
            </div>
            <button onClick={onSignOut}>SIGN OUT</button>
          </div>
          <form
            className="profile-fields"
            onSubmit={async (event) => {
              event.preventDefault();
              const result = await onSaveProfile(profile);
              setProfileMessage({
                text: result.error || result.notice,
                type: result.error ? "error" : "success",
              });
            }}
          >
            <label>
              Name
              <input
                value={profile.name}
                onChange={(event) => updateProfile("name", event.target.value)}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={profile.email}
                onChange={(event) => updateProfile("email", event.target.value)}
              />
            </label>
            <label>
              Phone number
              <input
                type="tel"
                value={profile.phone}
                onChange={(event) => updateProfile("phone", event.target.value)}
                placeholder="Add phone number"
              />
            </label>
            <label>
              Address
              <textarea
                value={profile.address}
                onChange={(event) =>
                  updateProfile("address", event.target.value)
                }
                placeholder="Add delivery address"
                rows="3"
              />
            </label>
            {profileMessage && (
              <p
                className={`auth-message ${profileMessage.type}`}
                role="status"
              >
                {profileMessage.text}
              </p>
            )}
            <button type="submit" className="save-profile">
              SAVE DETAILS
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}

export default AccountPage;
