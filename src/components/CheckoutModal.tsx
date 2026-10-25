import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, Copy, Check, Printer, ArrowLeft, Truck, PackageCheck } from 'lucide-react';
import { useBookstore } from '../context/BookstoreContext';
import { formatPHP, generateReferenceCode, calculateShipping } from '../utils/formatters';
import { OrderConfirmation, ShippingDetails } from '../types/book';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    subtotalCentavos,
    discountCentavos,
    appliedPromo,
    isCheckoutOpen,
    setIsCheckoutOpen,
    saveOrder,
    triggerToast,
  } = useBookstore();

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [formData, setFormData] = useState<ShippingDetails>({
    recipientName: 'Maria Santos',
    email: 'maria.santos@example.com',
    phone: '0917-555-0192',
    region: 'Metro Manila',
    city: 'Quezon City',
    address: '42 Balete Drive, New Manila',
    deliveryNotes: 'Please leave with reception or front gate security.',
    method: 'standard',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isCheckoutOpen) return null;

  const currentShippingCentavos = calculateShipping(
    subtotalCentavos,
    shippingMethod,
    appliedPromo === 'FREESHIP'
  );

  const grandTotalCentavos = Math.max(
    0,
    subtotalCentavos - discountCentavos + currentShippingCentavos
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate 900ms realistic processing
    setTimeout(() => {
      const newOrder: OrderConfirmation = {
        orderId: `ORD-${Date.now()}`,
        referenceCode: generateReferenceCode(),
        items: [...cart],
        subtotalCentavos,
        shippingCentavos: currentShippingCentavos,
        discountCentavos,
        totalCentavos: grandTotalCentavos,
        promoCodeApplied: appliedPromo || undefined,
        shippingDetails: { ...formData, method: shippingMethod },
        placedAt: new Date().toLocaleDateString('en-PH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      saveOrder(newOrder);
      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      triggerToast('Simulated order placed successfully!', 'success');
    }, 900);
  };

  const handleCopyCode = () => {
    if (confirmedOrder) {
      navigator.clipboard.writeText(confirmedOrder.referenceCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
      triggerToast('Order reference copied to clipboard.', 'info');
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn">
      <div
        className="relative bg-[#FFFEFB] border border-[#EADBCE] rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="sticky top-0 z-20 bg-[#FFFEFB]/95 backdrop-blur-md px-6 py-4 border-b border-[#EADBCE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-bold text-[#3A2A25]">
              {confirmedOrder ? 'Order Confirmation' : 'Checkout'}
            </h3>
            <span className="text-xs bg-[#F4D5C5]/60 text-[#C9785B] px-2 py-0.5 rounded font-mono font-medium">
              Demo Simulation
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-[#6B564E] hover:text-[#3A2A25] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {confirmedOrder ? (
            /* Order Success State */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#EBF0E7] text-[#647558] flex items-center justify-center animate-scale">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-mono text-[#C9785B] uppercase tracking-wider block mb-1">
                  Demonstration Completed
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#3A2A25]">
                  Thank you, {confirmedOrder.shippingDetails.recipientName}!
                </h3>
                <p className="text-xs text-[#6B564E] max-w-md mx-auto mt-1 leading-relaxed">
                  Your simulated bookstore order has been recorded. In a live production store, your packaged literary editions would be prepared with our signature bookmarks.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="p-4 rounded-xl bg-[#FFF9F1] border border-[#EADBCE] max-w-md mx-auto text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase text-[#988277]">
                    Simulated Reference Code
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 text-xs text-[#C9785B] hover:text-[#B5674B] font-medium"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
                <div className="font-mono text-lg font-bold text-[#3A2A25] tracking-wide">
                  {confirmedOrder.referenceCode}
                </div>
                <div className="text-[11px] text-[#988277] mt-1">
                  Recorded at {confirmedOrder.placedAt}
                </div>
              </div>

              {/* Receipt Breakdown */}
              <div className="p-4 rounded-xl bg-white border border-[#EADBCE] max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="font-serif font-bold text-sm text-[#3A2A25] pb-2 border-b border-[#EADBCE]">
                  Itemized Summary ({confirmedOrder.items.reduce((s, i) => s + i.quantity, 0)} books)
                </div>
                {confirmedOrder.items.map(({ book, quantity }) => (
                  <div key={book.id} className="flex justify-between text-[#6B564E]">
                    <span className="truncate pr-2">
                      {quantity}× {book.title}
                    </span>
                    <span className="font-mono tabular-nums text-[#3A2A25]">
                      {formatPHP(book.priceCentavos * quantity)}
                    </span>
                  </div>
                ))}

                <div className="pt-2 border-t border-[#EADBCE] space-y-1 text-[#6B564E]">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono tabular-nums">{formatPHP(confirmedOrder.subtotalCentavos)}</span>
                  </div>
                  {confirmedOrder.discountCentavos > 0 && (
                    <div className="flex justify-between text-[#647558]">
                      <span>Discount ({confirmedOrder.promoCodeApplied}):</span>
                      <span className="font-mono tabular-nums">-{formatPHP(confirmedOrder.discountCentavos)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery ({confirmedOrder.shippingDetails.method}):</span>
                    <span className="font-mono tabular-nums">
                      {confirmedOrder.shippingCentavos === 0 ? 'FREE' : formatPHP(confirmedOrder.shippingCentavos)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-[#3A2A25] text-sm pt-1 border-t border-[#EADBCE]">
                    <span>Total:</span>
                    <span className="font-mono text-[#C9785B]">{formatPHP(confirmedOrder.totalCentavos)}</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#988277]">
                  <strong>Delivery To:</strong> {confirmedOrder.shippingDetails.address}, {confirmedOrder.shippingDetails.city}, {confirmedOrder.shippingDetails.region}
                </div>
              </div>

              {/* Return to Catalog Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-[#C9785B] text-white text-xs font-semibold rounded-lg hover:bg-[#B5674B] transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Catalog</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 bg-[#FFFEFB] border border-[#EADBCE] text-[#3A2A25] text-xs font-medium rounded-lg hover:bg-[#FFF9F1] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4 text-[#6B564E]" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleConfirmOrder} className="space-y-6">
              {/* Demonstration Notice */}
              <div className="p-3.5 rounded-xl bg-[#FFF9F1] border border-[#C9785B]/30 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-[#C9785B] shrink-0 mt-0.5" />
                <div className="text-xs text-[#3A2A25] leading-relaxed">
                  <strong className="block font-medium text-[#C9785B]">
                    Demonstration Store Notice
                  </strong>
                  BookNest is an interactive demonstration store. No real payments are processed, no real charges will occur, and no actual packages are dispatched. Please do not enter sensitive banking or credit card details.
                </div>
              </div>

              {/* Delivery Information */}
              <div>
                <h4 className="font-serif font-bold text-sm text-[#3A2A25] mb-3 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#C9785B]" />
                  <span>Shipping & Delivery Details</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#6B564E] mb-1 font-medium">
                      Recipient Full Name
                    </label>
                    <input
                      type="text"
                      name="recipientName"
                      required
                      value={formData.recipientName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white border border-[#EADBCE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9785B] text-[#3A2A25]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6B564E] mb-1 font-medium">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white border border-[#EADBCE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9785B] text-[#3A2A25]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6B564E] mb-1 font-medium">
                      Mobile Number (PH)
                    </label>
                    <input
                      type="text"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white border border-[#EADBCE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9785B] text-[#3A2A25]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6B564E] mb-1 font-medium">
                      Region / Island Group
                    </label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white border border-[#EADBCE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9785B] text-[#3A2A25]"
                    >
                      <option value="Metro Manila">Metro Manila (NCR)</option>
                      <option value="Luzon (Provinces)">Luzon Provinces</option>
                      <option value="Visayas (Cebu, Iloilo, etc.)">Visayas</option>
                      <option value="Mindanao (Davao, CDO, etc.)">Mindanao</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#6B564E] mb-1 font-medium">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street name, building, barangay, city"
                      className="w-full px-3 py-2 bg-white border border-[#EADBCE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9785B] text-[#3A2A25]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#6B564E] mb-1 font-medium">
                      Delivery Notes / Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      name="deliveryNotes"
                      value={formData.deliveryNotes}
                      onChange={handleInputChange}
                      placeholder="e.g. Leave with security guard, package carefully"
                      className="w-full px-3 py-2 bg-white border border-[#EADBCE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9785B] text-[#3A2A25]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Speed Options */}
              <div>
                <label className="block text-xs font-serif font-bold text-[#3A2A25] mb-2">
                  Select Delivery Option
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-[#C9785B] bg-[#FFF9F1] ring-1 ring-[#C9785B]'
                        : 'border-[#EADBCE] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="method"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="accent-[#C9785B]"
                      />
                      <div>
                        <div className="font-medium text-[#3A2A25]">Standard Courier</div>
                        <div className="text-[11px] text-[#988277]">2-4 business days</div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#3A2A25]">
                      {subtotalCentavos >= 150000 || appliedPromo === 'FREESHIP' ? 'FREE' : '₱95.00'}
                    </span>
                  </label>

                  <label
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      shippingMethod === 'express'
                        ? 'border-[#C9785B] bg-[#FFF9F1] ring-1 ring-[#C9785B]'
                        : 'border-[#EADBCE] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="method"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="accent-[#C9785B]"
                      />
                      <div>
                        <div className="font-medium text-[#3A2A25]">Priority Book Express</div>
                        <div className="text-[11px] text-[#988277]">1-2 business days</div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#3A2A25]">
                      {subtotalCentavos >= 150000 || appliedPromo === 'FREESHIP' ? '₱65.00' : '₱160.00'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Order Financial Summary */}
              <div className="p-4 rounded-xl bg-[#FFF9F1] border border-[#EADBCE] space-y-2 text-xs">
                <div className="flex justify-between text-[#6B564E]">
                  <span>Items Subtotal:</span>
                  <span className="font-mono tabular-nums text-[#3A2A25] font-medium">
                    {formatPHP(subtotalCentavos)}
                  </span>
                </div>

                {discountCentavos > 0 && (
                  <div className="flex justify-between text-[#647558]">
                    <span>Discount ({appliedPromo}):</span>
                    <span className="font-mono tabular-nums font-bold">
                      -{formatPHP(discountCentavos)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-[#6B564E]">
                  <span>Delivery ({shippingMethod}):</span>
                  <span className="font-mono tabular-nums text-[#3A2A25]">
                    {currentShippingCentavos === 0 ? 'FREE' : formatPHP(currentShippingCentavos)}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#EADBCE] flex justify-between font-bold text-[#3A2A25] text-sm">
                  <span>Grand Total:</span>
                  <span className="font-mono text-base text-[#C9785B]">
                    {formatPHP(grandTotalCentavos)}
                  </span>
                </div>
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-3.5 bg-[#C9785B] text-white font-medium text-xs rounded-lg hover:bg-[#B5674B] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Demo Confirmation...</span>
                  </span>
                ) : (
                  <>
                    <PackageCheck className="w-4 h-4" />
                    <span>Confirm Order ({formatPHP(grandTotalCentavos)})</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
