const money = (n) => `${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;

export default function InvoicePreview({ invoiceNo, date, name, email, address, items, subtotal, discount, total }) {
  return (
    <div className="overflow-x-auto text-[11px] text-body">
      <div className="min-w-[460px]">
        <div className="bg-[#F8F8F9] p-5">
          <div className="flex justify-between">
            <svg width="30" height="36" viewBox="0 0 30 36" aria-label="Company logo">
              <path d="M0 0h30v21a15 15 0 01-15 15H8v-9h7a6 6 0 006-6V9H0z" fill="#1A6DFF" />
              <rect y="0" width="9" height="9" fill="#1A6DFF" />
            </svg>
            <div className="space-y-1 text-right text-[10px] text-muted">
              <p><span className="mr-2 text-brand-blue">@</span>your.mail@gmail.com</p>
              <p><span className="mr-2 text-brand-blue">m</span>+386 989 271 3115</p>
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <div className="space-y-0.5 text-[10px] text-muted">
              <p className="mb-2 font-bold text-ink">RECIPIENT</p>
              <p className="uppercase">{name || 'John Smith'}</p>
              <p>{address || '4304 Liberty Avenue'}</p>
              <p>92680 Tustin, CA</p>
              <p>VAT no.: 12345678</p>
              <p className="pt-3"><span className="mr-2 text-brand-blue">@</span>{email || 'company.mail@gmail.com'}</p>
              <p><span className="mr-2 text-brand-blue">m</span>+386 714 505 8385</p>
            </div>
            <div className="text-right text-[10px] text-muted">
              <p className="mb-5 text-2xl font-semibold text-ink">Invoice</p>
              <p className="font-bold text-ink">INVOICE NO.</p>
              <p className="mb-2">{invoiceNo}</p>
              <p className="font-bold text-ink">INVOICE DATE</p>
              <p>{date}</p>
            </div>
          </div>
        </div>

        <div className="px-1 pt-8">
          <div className="grid grid-cols-[1fr_40px_50px_90px] gap-2 border-b border-line pb-3 text-[10px] uppercase text-muted">
            <span>Task description</span>
            <span>Qty</span>
            <span>Rate</span>
            <span className="text-right">Amount</span>
          </div>
          {items.map((it) => (
            <div key={it.id} className="grid grid-cols-[1fr_40px_50px_90px] gap-2 border-b border-line py-3 text-ink">
              <span>{it.name || '—'}</span>
              <span>{it.qty}</span>
              <span>{it.rate} USD</span>
              <span className="text-right">{money(it.rate * it.qty)}</span>
            </div>
          ))}
          <div className="ml-auto mt-3 w-[230px] space-y-3 text-[10px]">
            <p className="flex justify-between text-muted"><span>SUBTOTAL</span><span className="text-ink">{money(subtotal)}</span></p>
            <p className="flex justify-between border-b border-line pb-3 text-muted"><span>DISCOUNT 5%</span><span className="text-ink">{money(discount)}</span></p>
            <p className="flex justify-between font-bold text-ink"><span>TOTAL</span><span className="text-sm text-brand-blue">{money(total)}</span></p>
          </div>

          <p className="mt-6 text-right text-[10px] text-muted">Transfer the amount to the business account below. Please include invoice number on your check.</p>
          <p className="mt-2 text-right text-[10px] text-muted">BANK: <b className="mr-3 text-ink">FTSBUS33</b>IBAN: <b className="text-ink">GB82-1111-2222-3333</b></p>

          <p className="mt-8 text-[10px] font-bold text-ink">NOTES</p>
          <p className="mt-2 text-[10px] leading-relaxed text-muted">
            All amounts are in dollars. Please make the payment within 15 days from the issue of date of this invoice. Tax is not charged on the basis of
            paragraph 1 of Article 94 of the Value Added Tax Act (I am not liable for VAT).
          </p>
          <p className="mt-3 text-[10px] text-muted">Thank you for you confidence in my work.<br />Signiture</p>
        </div>
      </div>
    </div>
  );
}
