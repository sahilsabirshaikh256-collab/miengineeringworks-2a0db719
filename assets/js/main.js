/* ==========================================================================
   M.I. Engineering Works — site behaviour (vanilla JS, no dependencies)
   ========================================================================== */
(function () {
  "use strict";

  var COMPANY = {
    email: "mienginering17@gmail.com",
    phone: "+91 98199 72301",
    whatsapp: "919819972301"
  };

  /* ── Mobile nav ───────────────────────────────────────────────────────── */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".mobile-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", menu.classList.contains("open"));
      });
    }
    var path = location.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      var href = a.getAttribute("href").replace(/\.html$/, "").replace(/^\/$/, "/");
      if (href === path || (href !== "/" && path.indexOf(href) === 0)) a.classList.add("active");
    });
  }

  /* ── Scroll reveal ────────────────────────────────────────────────────── */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          var delay = parseFloat(e.target.dataset.delay || 0);
          setTimeout(function () { e.target.classList.add("in"); }, delay * 1000);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ── Animated counters ────────────────────────────────────────────────── */
  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseInt(el.dataset.count, 10);
        var suffix = el.dataset.suffix || "";
        var start = performance.now();
        var dur = 1600;
        (function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString("en-IN") + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(start);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ── Product card markup ──────────────────────────────────────────────── */
  function productCard(p) {
    return (
      '<a class="card product-card reveal" href="/product.html?slug=' + p.slug + '">' +
        '<div class="thumb"><img src="' + p.img + '" alt="' + p.name + ' — ' + p.standard + ' manufacturer Mumbai" loading="lazy" width="600" height="450"></div>' +
        '<div class="card-body">' +
          '<span class="tag">' + p.category + '</span>' +
          '<h3>' + p.name + '</h3>' +
          '<p>' + p.description.slice(0, 110) + '…</p>' +
          '<div class="link-more">View details <span>&rarr;</span></div>' +
        '</div>' +
      '</a>'
    );
  }

  /* ── Home: featured products ──────────────────────────────────────────── */
  function initHomeProducts() {
    var host = document.getElementById("home-products");
    if (!host || typeof PRODUCTS === "undefined") return;
    host.innerHTML = PRODUCTS.slice(0, 8).map(productCard).join("");
  }

  /* ── Products listing + search/filter ─────────────────────────────────── */
  function initProductsPage() {
    var host = document.getElementById("product-grid");
    if (!host || typeof PRODUCTS === "undefined") return;
    var search = document.getElementById("product-search");
    var filter = document.getElementById("category-filter");
    var count = document.getElementById("result-count");

    if (filter) {
      var cats = PRODUCTS.map(function (p) { return p.category; })
        .filter(function (c, i, a) { return a.indexOf(c) === i; }).sort();
      filter.innerHTML = '<option value="">All categories</option>' +
        cats.map(function (c) { return '<option value="' + c + '">' + c + "</option>"; }).join("");
    }

    // Support ?q= deep links (used by the sitewide schema.org SearchAction)
    var qParam = new URLSearchParams(location.search).get("q");
    if (qParam && search) search.value = qParam;

    // ItemList structured data so AI engines and Google can read the catalogue
    injectJsonLd({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Industrial Fasteners Catalogue — M.I. Engineering Works, Mumbai",
      numberOfItems: PRODUCTS.length,
      itemListElement: PRODUCTS.map(function (p, i) {
        return {
          "@type": "ListItem",
          position: i + 1,
          url: "https://miengineeringworks.com/product.html?slug=" + p.slug,
          name: p.name + " — " + p.standard
        };
      })
    });


    function render() {
      var q = (search && search.value || "").toLowerCase().trim();
      var cat = filter && filter.value || "";
      var list = PRODUCTS.filter(function (p) {
        var hay = (p.name + " " + p.category + " " + p.standard + " " + p.material + " " + p.grades.join(" ")).toLowerCase();
        return (!q || hay.indexOf(q) > -1) && (!cat || p.category === cat);
      });
      host.innerHTML = list.length
        ? list.map(productCard).join("")
        : '<p>No products matched your search. Call ' + COMPANY.phone + " for custom fasteners.</p>";
      if (count) count.textContent = list.length + " product" + (list.length === 1 ? "" : "s");
      initReveal();
    }
    if (search) search.addEventListener("input", render);
    if (filter) filter.addEventListener("change", render);
    render();
  }

  /* ── Product detail ───────────────────────────────────────────────────── */
  function initProductDetail() {
    var host = document.getElementById("product-detail");
    if (!host || typeof PRODUCTS === "undefined") return;
    var slug = new URLSearchParams(location.search).get("slug");
    var p = PRODUCTS.filter(function (x) { return x.slug === slug; })[0];

    if (!p) {
      host.innerHTML = '<div class="container"><h1>Product not found</h1><p>The product you are looking for is not in our catalogue.</p><a class="btn btn-primary" href="/products.html">Browse all products</a></div>';
      return;
    }

    var pageUrl = "https://miengineeringworks.com/product.html?slug=" + p.slug;
    var pageTitle = p.name + " — " + p.standard + " Manufacturer & Supplier in Mumbai | M.I. Engineering Works";
    var pageDesc = p.description.slice(0, 155);
    document.title = pageTitle;
    setMeta("description", pageDesc);
    setMeta("keywords", [p.name, p.standard, p.material, p.name + " manufacturer in Mumbai", p.name + " supplier India", p.name + " exporter"].concat(p.grades).join(", "));
    setMeta("twitter:title", pageTitle);
    setMeta("twitter:description", pageDesc);
    setMeta("twitter:image", "https://miengineeringworks.com" + p.img);
    setProp("og:title", pageTitle);
    setProp("og:description", pageDesc);
    setProp("og:url", pageUrl);
    setProp("og:type", "product");
    setProp("og:image", "https://miengineeringworks.com" + p.img);
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = pageUrl;

    injectJsonLd({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://miengineeringworks.com/" },
        { "@type": "ListItem", position: 2, name: "Products", item: "https://miengineeringworks.com/products.html" },
        { "@type": "ListItem", position: 3, name: p.name, item: pageUrl }
      ]
    });

    injectJsonLd({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What material and grades are used for " + p.name + "?", acceptedAnswer: { "@type": "Answer", text: p.name + " are manufactured in " + p.material + ". Grades available: " + p.grades.join(", ") + "." } },
        { "@type": "Question", name: "What sizes of " + p.name + " are available?", acceptedAnswer: { "@type": "Answer", text: "Sizes " + p.sizes + ", lengths " + p.length + ". Thread types: " + p.threads + "." } },
        { "@type": "Question", name: "Where can I buy " + p.name + " in Mumbai, India?", acceptedAnswer: { "@type": "Answer", text: "M.I. Engineering Works manufactures and supplies " + p.name + " from 301, 01, Mehar Iron Bazar, Iron Market, Khedwadi, Girgaon, Mumbai 400004, India. Call +91 98199 72301 or email mienginering17@gmail.com for a quote within 24 hours. We supply across India and export worldwide." } },
        { "@type": "Question", name: "What are typical applications of " + p.name + "?", acceptedAnswer: { "@type": "Answer", text: p.applications.join(", ") + "." } }
      ]
    });



    host.innerHTML =
      '<div class="container">' +
        '<div class="breadcrumb"><a href="/">Home</a> / <a href="/products.html">Products</a> / ' + p.name + "</div>" +
        '<div class="detail-grid">' +
          '<div class="detail-img"><img src="' + p.img + '" alt="' + p.name + " " + p.standard + ' manufactured by M.I. Engineering Works Mumbai" width="900" height="675"></div>' +
          "<div>" +
            '<span class="eyebrow">' + p.category + "</span>" +
            "<h1>" + p.name + "</h1>" +
            '<div class="divider"></div>' +
            "<p>" + p.description + "</p>" +
            '<div class="spec-list">' +
              specItem("Standard", p.standard) +
              specItem("Material", p.material) +
              specItem("Size range", p.sizes) +
              specItem("Thread types", p.threads) +
              specItem("Length range", p.length) +
              specItem("Finishes", p.finish.join(", ")) +
            "</div>" +
            '<div style="margin-top:18px">' +
              '<div class="eyebrow">Grades available</div><div style="margin-top:8px">' +
              p.grades.map(function (g) { return '<span class="tag">' + g + "</span>"; }).join("") +
              "</div></div>" +
            '<div class="hero-actions">' +
              '<a class="btn btn-primary" href="/contact.html?product=' + encodeURIComponent(p.name) + '">Request a quote</a>' +
              '<a class="btn btn-ghost" href="https://wa.me/' + COMPANY.whatsapp + "?text=" + encodeURIComponent("Enquiry about " + p.name) + '" target="_blank" rel="noopener">WhatsApp enquiry</a>' +
            "</div>" +
          "</div>" +
        "</div>" +

        '<div class="grid grid-2" style="margin-top:54px">' +
          '<div class="table-card"><header><h3>Technical dimensions</h3></header><div class="table-wrap"><table><tbody>' +
            p.dimensions.map(function (d) { return "<tr><th>" + d.label + "</th><td>" + d.value + "</td></tr>"; }).join("") +
          "</tbody></table></div></div>" +
          '<div class="card"><div class="card-body"><h3>Typical applications</h3><ul style="color:var(--muted);padding-left:18px">' +
            p.applications.map(function (a) { return "<li>" + a + "</li>"; }).join("") +
          "</ul></div></div>" +
        "</div>" +

        '<h2 style="margin-top:54px">Related products</h2><div class="divider"></div>' +
        '<div class="grid grid-4">' +
          PRODUCTS.filter(function (x) { return x.slug !== p.slug; }).slice(0, 4).map(productCard).join("") +
        "</div>" +
      "</div>";

    injectJsonLd({
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.name + " " + p.standard,
      image: ["https://miengineeringworks.com" + p.img],
      description: p.description,
      brand: { "@type": "Brand", name: "M.I. Engineering Works" },
      material: p.material,
      manufacturer: { "@type": "Organization", name: "M.I. Engineering Works", address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" } },
      offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "INR", url: "https://miengineeringworks.com/product.html?slug=" + p.slug }
    });

    initReveal();
  }

  function specItem(k, v) {
    return '<div class="spec-item"><div class="k">' + k + '</div><div class="v">' + v + "</div></div>";
  }
  function setMeta(name, content) {
    var m = document.querySelector('meta[name="' + name + '"]');
    if (!m) { m = document.createElement("meta"); m.name = name; document.head.appendChild(m); }
    m.content = content;
  }
  function setProp(prop, content) {
    var m = document.querySelector('meta[property="' + prop + '"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("property", prop); document.head.appendChild(m); }
    m.setAttribute("content", content);
  }

  function injectJsonLd(obj) {
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }

  /* ── Grade chart ──────────────────────────────────────────────────────── */
  function initGradeChart() {
    var host = document.getElementById("grade-chart");
    if (!host || typeof GRADE_CATEGORIES === "undefined") return;
    var search = document.getElementById("grade-search");

    function render() {
      var q = (search && search.value || "").toLowerCase().trim();
      host.innerHTML = GRADE_CATEGORIES.map(function (cat) {
        var rows = cat.entries.filter(function (e) {
          return !q || (e.product + " " + e.grades.join(" ") + " " + e.material + " " + e.application).toLowerCase().indexOf(q) > -1;
        });
        if (!rows.length) return "";
        return '<div class="table-card reveal" style="margin-bottom:28px">' +
          "<header><h3>" + cat.name + "</h3></header>" +
          '<div class="table-wrap"><table><thead><tr>' +
          "<th>Product</th><th>Grades</th><th>Material</th><th>DIN</th><th>ASME / ASTM</th><th>ISO</th><th>BS</th><th>Tensile</th><th>Yield</th><th>Application</th>" +
          "</tr></thead><tbody>" +
          rows.map(function (e) {
            return "<tr><th>" + e.product + "</th><td>" + e.grades.join(", ") + "</td><td>" + e.material + "</td><td>" +
              e.din + "</td><td>" + e.asme + "</td><td>" + e.iso + "</td><td>" + e.bs + "</td><td>" +
              e.tensile + "</td><td>" + e.yield_ + "</td><td>" + e.application + "</td></tr>";
          }).join("") +
          "</tbody></table></div></div>";
      }).join("") || "<p>No grades matched your search.</p>";
      initReveal();
    }
    if (search) search.addEventListener("input", render);
    render();
  }

  /* ── Contact form (mailto, no backend) ────────────────────────────────── */
  function initContactForm() {
    var form = document.getElementById("quote-form");
    if (!form) return;
    var product = new URLSearchParams(location.search).get("product");
    if (product) {
      var msg = form.querySelector('[name="message"]');
      if (msg && !msg.value) msg.value = "I would like to request a quote for: " + product + "\n\nQuantity:\nSize / Grade:\nDelivery location:\n";
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = "Fastener enquiry from " + (d.get("name") || "website visitor");
      var body =
        "Name: " + (d.get("name") || "") + "\n" +
        "Company: " + (d.get("company") || "") + "\n" +
        "Email: " + (d.get("email") || "") + "\n" +
        "Phone: " + (d.get("phone") || "") + "\n\n" +
        "Message:\n" + (d.get("message") || "");
      window.location.href = "mailto:" + COMPANY.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      var status = document.getElementById("form-status");
      if (status) status.textContent = "Opening your email app with the enquiry pre-filled. You can also call " + COMPANY.phone + ".";
    });
  }

  /* ── Boot ─────────────────────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initHomeProducts();
    initProductsPage();
    initProductDetail();
    initGradeChart();
    initContactForm();
    initCounters();
    initReveal();
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
