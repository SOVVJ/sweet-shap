function CheckoutPage({ cart, total, onPay, isProcessing }) {
  return (
    <main className="checkout-page">
      <section className="checkout-card">
        <p className="eyebrow">SECURE CHECKOUT</p>
        <h1>Almost there.</h1>
        <p className="checkout-copy">
          Review your order and complete the demo payment.
        </p>
        <div className="checkout-summary">
          {cart.map((item, index) => (
            <div key={`${item.name}-${index}`}>
              <span>
                {item.name} · {item.weight}
              </span>
              <b>{item.price}</b>
            </div>
          ))}
          <p>
            <span>Total</span>
            <b>₹ {total.toFixed(2)}</b>
          </p>
        </div>
        <button className="fake-pay" onClick={onPay} disabled={isProcessing}>
          {isProcessing ? "PROCESSING PAYMENT..." : `PAY ₹ ${total.toFixed(2)}`}
        </button>
        <small>This is a demo checkout. No money will be charged.</small>
      </section>
    </main>
  );
}

export default CheckoutPage;
