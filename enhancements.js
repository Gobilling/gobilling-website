(() => {
  const heroCopy = document.querySelector('.mobile-hero-copy');
  if (heroCopy) {
    heroCopy.insertAdjacentHTML('beforeend', `
      <div class="mobile-values" aria-label="GoBilling values">
        <span>Trust</span><span>Accuracy</span><span>Growth</span><span>Together</span>
      </div>`);
  }

  const dockAction = document.querySelector('.mobile-dock > a');
  if (dockAction) {
    dockAction.className = 'dock-whatsapp';
    dockAction.href = 'https://wa.me/917989070733?text=Hi%2C%20I%27d%20like%20to%20book%20a%20GoBilling%20demo';
    dockAction.setAttribute('aria-label', 'Chat with GoBilling on WhatsApp');
    dockAction.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.4A10 10 0 1 0 12 2Zm5.5 14c-.2.6-1.2 1.1-1.7 1.2-.5.1-1.1.2-1.8-.1-3.5-1.2-5.7-4.8-5.8-5-.7-1.1-.8-2.4-.2-3.4.3-.5.7-.8 1.1-.8h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.5.7c-.1.2-.2.4 0 .7.5.9 1.7 2.4 3.6 3.1.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.4 0 .2 0 .8-.2 1.4Z"/></svg><span>WhatsApp</span>';
  }

  const inventory = document.getElementById('inventory');
  const labelWorkflow = inventory?.querySelectorAll('.workflow')[0];
  if (labelWorkflow) {
    labelWorkflow.innerHTML = `
      <div class="screen-top"><span>Jewellery Label Studio</span><span>Live preview · 100 × 44 mm</span></div>
      <div class="screen-body label-studio">
        <div class="label-studio-tools">
          <button class="active" type="button">Jewellery tag</button>
          <button type="button">Barcode + QR</button>
          <button type="button">Regular sheet</button>
        </div>
        <div class="standard-tag-preview">
          <div class="tag-copy"><strong>Sri Mathaji Jewellers</strong><span>Gold Necklace · 916</span><span>G.Wt 10.000g · N.Wt 9.850g</span><b>GO-NK-0010</b></div>
          <div class="tag-codes"><div class="real-barcode" aria-label="Sample barcode"></div><small>GO-NK-0010</small><img src="assets/sample-item-qr-go-nk-0010.png" alt="Sample scannable QR code for jewellery tag GO-NK-0010"></div>
          <div class="tag-fold">FOLD</div>
        </div>
        <div class="print-support"><span>Thermal tag printer</span><span>Barcode printer</span><span>Regular A4 printer</span></div>
      </div>`;
    labelWorkflow.insertAdjacentHTML('afterend', `
      <figure class="inventory-photo-demo">
        <img loading="lazy" src="assets/inventory-tag-scanner-v1.webp" alt="Gold jewellery with an attached barcode and QR tag beside a barcode scanner">
        <figcaption><b>Tag attached. Item ready to scan.</b><span>Find jewellery instantly by barcode or QR code and keep its image, weight and location connected.</span></figcaption>
      </figure>`);
  }

  const karigar = document.getElementById('karigar');
  const karigarScreen = karigar?.querySelector('.screen');
  if (karigarScreen) {
    karigarScreen.innerHTML = `
      <div class="screen-top"><span>Order &amp; Karigar Board</span><span>Delivery control</span></div>
      <div class="screen-body order-board">
        <div class="order-summary"><span><small>New</small><b>4</b></span><span><small>In work</small><b>8</b></span><span><small>Ready</small><b>3</b></span></div>
        <div class="order-line"><i>OR-1042</i><div><b>Bridal necklace</b><small>Customer: Meena Rao · Due 22 Sep</small></div><span class="assigned">Raju</span></div>
        <div class="order-line"><i>OR-1043</i><div><b>Gold bangles × 2</b><small>Metal issued · Polishing pending</small></div><span class="working">In work</span></div>
        <div class="order-line"><i>OR-1044</i><div><b>Ring resizing</b><small>Quality checked · Customer notified</small></div><span class="ready">Ready</span></div>
        <div class="order-flow"><span>Order</span><b>›</b><span>Assign</span><b>›</b><span>Track</span><b>›</b><span>Deliver</span></div>
      </div>`;
  }

  const girvi = document.getElementById('girvi');
  const girviScreen = girvi?.querySelector('.workflow');
  if (girviScreen) {
    girviScreen.innerHTML = `
      <div class="screen-top"><span>New Girvi · GV-00001</span><span>Identity &amp; article verification</span></div>
      <div class="screen-body girvi-proof">
        <div class="girvi-photo-grid">
          <figure><img src="assets/girvi-customer-sample-v1.webp" alt="Sample customer photo captured for Girvi verification"><figcaption>Customer photo <b>Verified</b></figcaption></figure>
          <figure><img src="assets/inventory-tag-scanner-v1.webp" alt="Sample pledged gold jewellery item photo"><figcaption>Gold necklace <b>3 images</b></figcaption></figure>
        </div>
        <div class="verification-row"><span><i>✓</i>Mobile / webcam photo</span><span><i>✓</i>Thumb impression captured</span><span><i>✓</i>ID document verified</span></div>
        <div class="loan-strip"><span><small>Loan</small><b>₹60,000</b></span><span><small>Net weight</small><b>10.250g</b></span><span><small>Packet</small><b>Rack G-02</b></span></div>
        <div class="girvi-flow"><b>Customer</b><i>›</i><b>Articles</b><i>›</i><b>Loan</b><i>›</i><b>Packet label</b></div>
      </div>`;
  }

  const marketing = document.getElementById('marketing');
  const marketingDemo = marketing?.querySelector('.visual > .visual');
  if (marketingDemo) {
    marketingDemo.className = 'campaign-demo';
    marketingDemo.removeAttribute('style');
    marketingDemo.innerHTML = `
      <div class="campaign-head"><div><small>Campaign ready</small><b>Wedding Season 2026</b></div><span>186 customers</span></div>
      <div class="campaign-channels"><span class="wa-channel"><i>✓</i><b>WhatsApp</b><small>Approved template</small></span><span class="sms-channel"><i>✓</i><b>SMS</b><small>Fallback enabled</small></span></div>
      <div class="campaign-message">Dear {name}, your wedding jewellery preview is ready at Sri Mathaji Jewellers. Reply to book a visit.</div>
      <div class="campaign-stats"><span><b>186</b>Audience</span><span><b>174</b>Delivered</span><span><b>31</b>Responses</span></div>`;
  }

  const reports = document.getElementById('reports');
  const reportScreen = reports?.querySelector('.workflow');
  if (reportScreen) {
    reportScreen.innerHTML = `
      <div class="screen-top"><span>Reports &amp; Control</span><span>Owner view</span></div>
      <div class="screen-body report-compact">
        <div class="report-picker"><button class="active">Sales</button><button>Stock</button><button>GST</button><button>Ledgers</button></div>
        <div class="report-result"><div><small>Sales summary · This month</small><b>₹12,84,650</b><span>48 invoices · ₹2,16,300 received</span></div><div class="mini-bars"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
        <div class="report-actions"><span>Filter dates</span><span>Review details</span><span>Excel</span><span>PDF / Print</span></div>
        <p>One simple path for every report: choose → filter → review → export.</p>
      </div>`;
  }

  const form = document.getElementById('demoForm');
  const messageField = form?.querySelector('#message')?.closest('.field');
  if (form && messageField) {
    messageField.insertAdjacentHTML('beforebegin', `
      <div class="field full primary-reason"><label for="reason">Primary reason for considering GoBilling</label><select id="reason" name="reason" required><option value="">Select the main reason</option><option>Faster and easier billing</option><option>Better stock and label control</option><option>Move from Excel or manual records</option><option>Manage karigar, Girvi or schemes</option><option>GST reports and business control</option><option>Opening a new jewellery business</option></select></div>`);
    form.addEventListener('submit', () => {
      const reason = form.querySelector('#reason');
      const message = form.querySelector('#message');
      if (reason?.value && message && !message.value.startsWith('Primary reason:')) {
        message.value = `Primary reason: ${reason.value}${message.value ? `\n${message.value}` : ''}`;
      }
    }, { capture: true });
  }
})();
