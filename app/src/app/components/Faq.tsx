const ITEMS = [
  ['What does it cost?', 'Nothing beyond the network gas fee. On a testnet, gas is paid in test tokens that have no market value.'],
  ['Can I mint the same character twice?', 'Yes. Every mint creates a new token that points to the chosen artwork. There is no supply cap and no per-wallet limit.'],
  ['Where is the artwork stored?', 'On IPFS. Each token stores a metadata link, so the image does not depend on this website.'],
  ['Which wallets work?', 'Any wallet listed when you press Connect. If your wallet is on another network, the site will ask you to switch.'],
];

export default function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-30 px-5 pb-16">
      <h2 className="display text-4xl">Questions</h2>
      <div className="mt-6">
        {ITEMS.map(([q, a]) => (
          <details key={q} className="faq">
            <summary>{q}</summary>
            <p className="muted mt-2 max-w-[60ch] leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
