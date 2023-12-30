(() => {
  "use strict";
  function e(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function t(s, i) {
    void 0 === s && (s = {}),
      void 0 === i && (i = {}),
      Object.keys(i).forEach((r) => {
        void 0 === s[r]
          ? (s[r] = i[r])
          : e(i[r]) && e(s[r]) && Object.keys(i[r]).length > 0 && t(s[r], i[r]);
      });
  }
  const s = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function i() {
    const e = "undefined" != typeof document ? document : {};
    return t(e, s), e;
  }
  const r = {
    document: s,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function a() {
    const e = "undefined" != typeof window ? window : {};
    return t(e, r), e;
  }
  function n(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function l() {
    return Date.now();
  }
  function o(e, t) {
    void 0 === t && (t = "x");
    const s = a();
    let i, r, n;
    const l = (function (e) {
      const t = a();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((r = l.transform || l.webkitTransform),
          r.split(",").length > 6 &&
            (r = r
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (n = new s.WebKitCSSMatrix("none" === r ? "" : r)))
        : ((n =
            l.MozTransform ||
            l.OTransform ||
            l.MsTransform ||
            l.msTransform ||
            l.transform ||
            l
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (i = n.toString().split(","))),
      "x" === t &&
        (r = s.WebKitCSSMatrix
          ? n.m41
          : 16 === i.length
            ? parseFloat(i[12])
            : parseFloat(i[4])),
      "y" === t &&
        (r = s.WebKitCSSMatrix
          ? n.m42
          : 16 === i.length
            ? parseFloat(i[13])
            : parseFloat(i[5])),
      r || 0
    );
  }
  function d(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function c() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
      const r = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (
        null != r &&
        ((s = r),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? s instanceof HTMLElement
          : s && (1 === s.nodeType || 11 === s.nodeType)))
      ) {
        const s = Object.keys(Object(r)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, i = s.length; t < i; t += 1) {
          const i = s[t],
            a = Object.getOwnPropertyDescriptor(r, i);
          void 0 !== a &&
            a.enumerable &&
            (d(e[i]) && d(r[i])
              ? r[i].__swiper__
                ? (e[i] = r[i])
                : c(e[i], r[i])
              : !d(e[i]) && d(r[i])
                ? ((e[i] = {}), r[i].__swiper__ ? (e[i] = r[i]) : c(e[i], r[i]))
                : (e[i] = r[i]));
        }
      }
    }
    var s;
    return e;
  }
  function p(e, t, s) {
    e.style.setProperty(t, s);
  }
  function u(e) {
    let { swiper: t, targetPosition: s, side: i } = e;
    const r = a(),
      n = -t.translate;
    let l,
      o = null;
    const d = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      r.cancelAnimationFrame(t.cssModeFrameID);
    const c = s > n ? "next" : "prev",
      p = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
      u = () => {
        (l = new Date().getTime()), null === o && (o = l);
        const e = Math.max(Math.min((l - o) / d, 1), 0),
          a = 0.5 - Math.cos(e * Math.PI) / 2;
        let c = n + a * (s - n);
        if ((p(c, s) && (c = s), t.wrapperEl.scrollTo({ [i]: c }), p(c, s)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [i]: c });
            }),
            void r.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = r.requestAnimationFrame(u);
      };
    u();
  }
  function m(e, t) {
    return (
      void 0 === t && (t = ""), [...e.children].filter((e) => e.matches(t))
    );
  }
  function f(e) {
    try {
      return void console.warn(e);
    } catch (e) {}
  }
  function h(e, t) {
    void 0 === t && (t = []);
    const s = document.createElement(e);
    return (
      s.classList.add(
        ...(Array.isArray(t)
          ? t
          : (function (e) {
              return (
                void 0 === e && (e = ""),
                e
                  .trim()
                  .split(" ")
                  .filter((e) => !!e.trim())
              );
            })(t)),
      ),
      s
    );
  }
  function g(e, t) {
    return a().getComputedStyle(e, null).getPropertyValue(t);
  }
  function v(e) {
    let t,
      s = e;
    if (s) {
      for (t = 0; null !== (s = s.previousSibling); )
        1 === s.nodeType && (t += 1);
      return t;
    }
  }
  function w(e, t) {
    const s = [];
    let i = e.parentElement;
    for (; i; )
      t ? i.matches(t) && s.push(i) : s.push(i), (i = i.parentElement);
    return s;
  }
  function b(e, t, s) {
    const i = a();
    return s
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top"),
          ) +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue(
                "width" === t ? "margin-left" : "margin-bottom",
              ),
          )
      : e.offsetWidth;
  }
  let y, S, T;
  function E() {
    return (
      y ||
        (y = (function () {
          const e = a(),
            t = i();
          return {
            smoothScroll:
              t.documentElement &&
              t.documentElement.style &&
              "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
          };
        })()),
      y
    );
  }
  function x(e) {
    return (
      void 0 === e && (e = {}),
      S ||
        (S = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const s = E(),
            i = a(),
            r = i.navigator.platform,
            n = t || i.navigator.userAgent,
            l = { ios: !1, android: !1 },
            o = i.screen.width,
            d = i.screen.height,
            c = n.match(/(Android);?[\s\/]+([\d.]+)?/);
          let p = n.match(/(iPad).*OS\s([\d_]+)/);
          const u = n.match(/(iPod)(.*OS\s([\d_]+))?/),
            m = !p && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            f = "Win32" === r;
          let h = "MacIntel" === r;
          return (
            !p &&
              h &&
              s.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${o}x${d}`) >= 0 &&
              ((p = n.match(/(Version)\/([\d.]+)/)),
              p || (p = [0, 1, "13_0_0"]),
              (h = !1)),
            c && !f && ((l.os = "android"), (l.android = !0)),
            (p || m || u) && ((l.os = "ios"), (l.ios = !0)),
            l
          );
        })(e)),
      S
    );
  }
  function C() {
    return (
      T ||
        (T = (function () {
          const e = a();
          let t = !1;
          function s() {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          }
          if (s()) {
            const s = String(e.navigator.userAgent);
            if (s.includes("Version/")) {
              const [e, i] = s
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((e) => Number(e));
              t = e < 16 || (16 === e && i < 2);
            }
          }
          return {
            isSafari: t || s(),
            needPerspectiveFix: t,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent,
            ),
          };
        })()),
      T
    );
  }
  var M = {
    on(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      const r = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][r](t);
        }),
        i
      );
    },
    once(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      function r() {
        i.off(e, r), r.__emitterProxy && delete r.__emitterProxy;
        for (var s = arguments.length, a = new Array(s), n = 0; n < s; n++)
          a[n] = arguments[n];
        t.apply(i, a);
      }
      return (r.__emitterProxy = t), i.on(e, r, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const i = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (s.eventsListeners[e] = [])
                : s.eventsListeners[e] &&
                  s.eventsListeners[e].forEach((i, r) => {
                    (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                      s.eventsListeners[e].splice(r, 1);
                  });
            }),
            s)
          : s;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      let t, s, i;
      for (var r = arguments.length, a = new Array(r), n = 0; n < r; n++)
        a[n] = arguments[n];
      "string" == typeof a[0] || Array.isArray(a[0])
        ? ((t = a[0]), (s = a.slice(1, a.length)), (i = e))
        : ((t = a[0].events), (s = a[0].data), (i = a[0].context || e)),
        s.unshift(i);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(i, [t, ...s]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(i, s);
              });
        }),
        e
      );
    },
  };
  const L = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      const s = t.closest(
        e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
      );
      if (s) {
        let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t &&
          e.isElement &&
          (s.shadowRoot
            ? (t = s.shadowRoot.querySelector(
                `.${e.params.lazyPreloaderClass}`,
              ))
            : requestAnimationFrame(() => {
                s.shadowRoot &&
                  ((t = s.shadowRoot.querySelector(
                    `.${e.params.lazyPreloaderClass}`,
                  )),
                  t && t.remove());
              })),
          t && t.remove();
      }
    },
    P = (e, t) => {
      if (!e.slides[t]) return;
      const s = e.slides[t].querySelector('[loading="lazy"]');
      s && s.removeAttribute("loading");
    },
    k = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext;
      const s = e.slides.length;
      if (!s || !t || t < 0) return;
      t = Math.min(t, s);
      const i =
          "auto" === e.params.slidesPerView
            ? e.slidesPerViewDynamic()
            : Math.ceil(e.params.slidesPerView),
        r = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        const s = r,
          a = [s - t];
        return (
          a.push(...Array.from({ length: t }).map((e, t) => s + i + t)),
          void e.slides.forEach((t, s) => {
            a.includes(t.column) && P(e, s);
          })
        );
      }
      const a = r + i - 1;
      if (e.params.rewind || e.params.loop)
        for (let i = r - t; i <= a + t; i += 1) {
          const t = ((i % s) + s) % s;
          (t < r || t > a) && P(e, t);
        }
      else
        for (let i = Math.max(r - t, 0); i <= Math.min(a + t, s - 1); i += 1)
          i !== r && (i > a || i < r) && P(e, i);
    };
  var A = {
    updateSize: function () {
      const e = this;
      let t, s;
      const i = e.el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : i.clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : i.clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(g(i, "padding-left") || 0, 10) -
            parseInt(g(i, "padding-right") || 0, 10)),
          (s =
            s -
            parseInt(g(i, "padding-top") || 0, 10) -
            parseInt(g(i, "padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t, s) {
        return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0);
      }
      const s = e.params,
        {
          wrapperEl: i,
          slidesEl: r,
          size: a,
          rtlTranslate: n,
          wrongRTL: l,
        } = e,
        o = e.virtual && s.virtual.enabled,
        d = o ? e.virtual.slides.length : e.slides.length,
        c = m(r, `.${e.params.slideClass}, swiper-slide`),
        u = o ? e.virtual.slides.length : c.length;
      let f = [];
      const h = [],
        v = [];
      let w = s.slidesOffsetBefore;
      "function" == typeof w && (w = s.slidesOffsetBefore.call(e));
      let y = s.slidesOffsetAfter;
      "function" == typeof y && (y = s.slidesOffsetAfter.call(e));
      const S = e.snapGrid.length,
        T = e.slidesGrid.length;
      let E = s.spaceBetween,
        x = -w,
        C = 0,
        M = 0;
      if (void 0 === a) return;
      "string" == typeof E && E.indexOf("%") >= 0
        ? (E = (parseFloat(E.replace("%", "")) / 100) * a)
        : "string" == typeof E && (E = parseFloat(E)),
        (e.virtualSize = -E),
        c.forEach((e) => {
          n ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
            (e.style.marginBottom = ""),
            (e.style.marginTop = "");
        }),
        s.centeredSlides &&
          s.cssMode &&
          (p(i, "--swiper-centered-offset-before", ""),
          p(i, "--swiper-centered-offset-after", ""));
      const L = s.grid && s.grid.rows > 1 && e.grid;
      let P;
      L ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
      const k =
        "auto" === s.slidesPerView &&
        s.breakpoints &&
        Object.keys(s.breakpoints).filter(
          (e) => void 0 !== s.breakpoints[e].slidesPerView,
        ).length > 0;
      for (let i = 0; i < u; i += 1) {
        let r;
        if (
          ((P = 0),
          c[i] && (r = c[i]),
          L && e.grid.updateSlide(i, r, c),
          !c[i] || "none" !== g(r, "display"))
        ) {
          if ("auto" === s.slidesPerView) {
            k && (c[i].style[e.getDirectionLabel("width")] = "");
            const a = getComputedStyle(r),
              n = r.style.transform,
              l = r.style.webkitTransform;
            if (
              (n && (r.style.transform = "none"),
              l && (r.style.webkitTransform = "none"),
              s.roundLengths)
            )
              P = e.isHorizontal() ? b(r, "width", !0) : b(r, "height", !0);
            else {
              const e = t(a, "width"),
                s = t(a, "padding-left"),
                i = t(a, "padding-right"),
                n = t(a, "margin-left"),
                l = t(a, "margin-right"),
                o = a.getPropertyValue("box-sizing");
              if (o && "border-box" === o) P = e + n + l;
              else {
                const { clientWidth: t, offsetWidth: a } = r;
                P = e + s + i + n + l + (a - t);
              }
            }
            n && (r.style.transform = n),
              l && (r.style.webkitTransform = l),
              s.roundLengths && (P = Math.floor(P));
          } else
            (P = (a - (s.slidesPerView - 1) * E) / s.slidesPerView),
              s.roundLengths && (P = Math.floor(P)),
              c[i] && (c[i].style[e.getDirectionLabel("width")] = `${P}px`);
          c[i] && (c[i].swiperSlideSize = P),
            v.push(P),
            s.centeredSlides
              ? ((x = x + P / 2 + C / 2 + E),
                0 === C && 0 !== i && (x = x - a / 2 - E),
                0 === i && (x = x - a / 2 - E),
                Math.abs(x) < 0.001 && (x = 0),
                s.roundLengths && (x = Math.floor(x)),
                M % s.slidesPerGroup == 0 && f.push(x),
                h.push(x))
              : (s.roundLengths && (x = Math.floor(x)),
                (M - Math.min(e.params.slidesPerGroupSkip, M)) %
                  e.params.slidesPerGroup ==
                  0 && f.push(x),
                h.push(x),
                (x = x + P + E)),
            (e.virtualSize += P + E),
            (C = P),
            (M += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, a) + y),
        n &&
          l &&
          ("slide" === s.effect || "coverflow" === s.effect) &&
          (i.style.width = `${e.virtualSize + E}px`),
        s.setWrapperSize &&
          (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + E}px`),
        L && e.grid.updateWrapperSize(P, f),
        !s.centeredSlides)
      ) {
        const t = [];
        for (let i = 0; i < f.length; i += 1) {
          let r = f[i];
          s.roundLengths && (r = Math.floor(r)),
            f[i] <= e.virtualSize - a && t.push(r);
        }
        (f = t),
          Math.floor(e.virtualSize - a) - Math.floor(f[f.length - 1]) > 1 &&
            f.push(e.virtualSize - a);
      }
      if (o && s.loop) {
        const t = v[0] + E;
        if (s.slidesPerGroup > 1) {
          const i = Math.ceil(
              (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                s.slidesPerGroup,
            ),
            r = t * s.slidesPerGroup;
          for (let e = 0; e < i; e += 1) f.push(f[f.length - 1] + r);
        }
        for (
          let i = 0;
          i < e.virtual.slidesBefore + e.virtual.slidesAfter;
          i += 1
        )
          1 === s.slidesPerGroup && f.push(f[f.length - 1] + t),
            h.push(h[h.length - 1] + t),
            (e.virtualSize += t);
      }
      if ((0 === f.length && (f = [0]), 0 !== E)) {
        const t =
          e.isHorizontal() && n
            ? "marginLeft"
            : e.getDirectionLabel("marginRight");
        c.filter(
          (e, t) => !(s.cssMode && !s.loop) || t !== c.length - 1,
        ).forEach((e) => {
          e.style[t] = `${E}px`;
        });
      }
      if (s.centeredSlides && s.centeredSlidesBounds) {
        let e = 0;
        v.forEach((t) => {
          e += t + (E || 0);
        }),
          (e -= E);
        const t = e - a;
        f = f.map((e) => (e <= 0 ? -w : e > t ? t + y : e));
      }
      if (s.centerInsufficientSlides) {
        let e = 0;
        if (
          (v.forEach((t) => {
            e += t + (E || 0);
          }),
          (e -= E),
          e < a)
        ) {
          const t = (a - e) / 2;
          f.forEach((e, s) => {
            f[s] = e - t;
          }),
            h.forEach((e, s) => {
              h[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: c,
          snapGrid: f,
          slidesGrid: h,
          slidesSizesGrid: v,
        }),
        s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
      ) {
        p(i, "--swiper-centered-offset-before", -f[0] + "px"),
          p(
            i,
            "--swiper-centered-offset-after",
            e.size / 2 - v[v.length - 1] / 2 + "px",
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (u !== d && e.emit("slidesLengthChange"),
        f.length !== S &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        h.length !== T && e.emit("slidesGridLengthChange"),
        s.watchSlidesProgress && e.updateSlidesOffset(),
        e.emit("slidesUpdated"),
        !(o || s.cssMode || ("slide" !== s.effect && "fade" !== s.effect)))
      ) {
        const t = `${s.containerModifierClass}backface-hidden`,
          i = e.el.classList.contains(t);
        u <= s.maxBackfaceHiddenSlides
          ? i || e.el.classList.add(t)
          : i && e.el.classList.remove(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        i = t.virtual && t.params.virtual.enabled;
      let r,
        a = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const n = (e) => (i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || []).forEach((e) => {
            s.push(e);
          });
        else
          for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
            const e = t.activeIndex + r;
            if (e > t.slides.length && !i) break;
            s.push(n(e));
          }
      else s.push(n(t.activeIndex));
      for (r = 0; r < s.length; r += 1)
        if (void 0 !== s[r]) {
          const e = s[r].offsetHeight;
          a = e > a ? e : a;
        }
      (a || 0 === a) && (t.wrapperEl.style.height = `${a}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides,
        s = e.isElement
          ? e.isHorizontal()
            ? e.wrapperEl.offsetLeft
            : e.wrapperEl.offsetTop
          : 0;
      for (let i = 0; i < t.length; i += 1)
        t[i].swiperSlideOffset =
          (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
          s -
          e.cssOverflowAdjustment();
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        s = t.params,
        { slides: i, rtlTranslate: r, snapGrid: a } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let n = -e;
      r && (n = e),
        i.forEach((e) => {
          e.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass);
        }),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      let l = s.spaceBetween;
      "string" == typeof l && l.indexOf("%") >= 0
        ? (l = (parseFloat(l.replace("%", "")) / 100) * t.size)
        : "string" == typeof l && (l = parseFloat(l));
      for (let e = 0; e < i.length; e += 1) {
        const o = i[e];
        let d = o.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
        const c =
            (n + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (o.swiperSlideSize + l),
          p =
            (n - a[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (o.swiperSlideSize + l),
          u = -(n - d),
          m = u + t.slidesSizesGrid[e],
          f = u >= 0 && u <= t.size - t.slidesSizesGrid[e];
        ((u >= 0 && u < t.size - 1) ||
          (m > 1 && m <= t.size) ||
          (u <= 0 && m >= t.size)) &&
          (t.visibleSlides.push(o),
          t.visibleSlidesIndexes.push(e),
          i[e].classList.add(s.slideVisibleClass)),
          f && i[e].classList.add(s.slideFullyVisibleClass),
          (o.progress = r ? -c : c),
          (o.originalProgress = r ? -p : p);
      }
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let { progress: r, isBeginning: a, isEnd: n, progressLoop: l } = t;
      const o = a,
        d = n;
      if (0 === i) (r = 0), (a = !0), (n = !0);
      else {
        r = (e - t.minTranslate()) / i;
        const s = Math.abs(e - t.minTranslate()) < 1,
          l = Math.abs(e - t.maxTranslate()) < 1;
        (a = s || r <= 0), (n = l || r >= 1), s && (r = 0), l && (r = 1);
      }
      if (s.loop) {
        const s = t.getSlideIndexByData(0),
          i = t.getSlideIndexByData(t.slides.length - 1),
          r = t.slidesGrid[s],
          a = t.slidesGrid[i],
          n = t.slidesGrid[t.slidesGrid.length - 1],
          o = Math.abs(e);
        (l = o >= r ? (o - r) / n : (o + n - a) / n), l > 1 && (l -= 1);
      }
      Object.assign(t, {
        progress: r,
        progressLoop: l,
        isBeginning: a,
        isEnd: n,
      }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        a && !o && t.emit("reachBeginning toEdge"),
        n && !d && t.emit("reachEnd toEdge"),
        ((o && !a) || (d && !n)) && t.emit("fromEdge"),
        t.emit("progress", r);
    },
    updateSlidesClasses: function () {
      const e = this,
        { slides: t, params: s, slidesEl: i, activeIndex: r } = e,
        a = e.virtual && s.virtual.enabled,
        n = e.grid && s.grid && s.grid.rows > 1,
        l = (e) => m(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
      let o, d, c;
      if (
        (t.forEach((e) => {
          e.classList.remove(
            s.slideActiveClass,
            s.slideNextClass,
            s.slidePrevClass,
          );
        }),
        a)
      )
        if (s.loop) {
          let t = r - e.virtual.slidesBefore;
          t < 0 && (t = e.virtual.slides.length + t),
            t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
            (o = l(`[data-swiper-slide-index="${t}"]`));
        } else o = l(`[data-swiper-slide-index="${r}"]`);
      else
        n
          ? ((o = t.filter((e) => e.column === r)[0]),
            (c = t.filter((e) => e.column === r + 1)[0]),
            (d = t.filter((e) => e.column === r - 1)[0]))
          : (o = t[r]);
      o &&
        (o.classList.add(s.slideActiveClass),
        n
          ? (c && c.classList.add(s.slideNextClass),
            d && d.classList.add(s.slidePrevClass))
          : ((c = (function (e, t) {
              const s = [];
              for (; e.nextElementSibling; ) {
                const i = e.nextElementSibling;
                t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
              }
              return s;
            })(o, `.${s.slideClass}, swiper-slide`)[0]),
            s.loop && !c && (c = t[0]),
            c && c.classList.add(s.slideNextClass),
            (d = (function (e, t) {
              const s = [];
              for (; e.previousElementSibling; ) {
                const i = e.previousElementSibling;
                t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
              }
              return s;
            })(o, `.${s.slideClass}, swiper-slide`)[0]),
            s.loop && 0 === !d && (d = t[t.length - 1]),
            d && d.classList.add(s.slidePrevClass))),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          snapGrid: i,
          params: r,
          activeIndex: a,
          realIndex: n,
          snapIndex: l,
        } = t;
      let o,
        d = e;
      const c = (e) => {
        let s = e - t.virtual.slidesBefore;
        return (
          s < 0 && (s = t.virtual.slides.length + s),
          s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
          s
        );
      };
      if (
        (void 0 === d &&
          (d = (function (e) {
            const { slidesGrid: t, params: s } = e,
              i = e.rtlTranslate ? e.translate : -e.translate;
            let r;
            for (let e = 0; e < t.length; e += 1)
              void 0 !== t[e + 1]
                ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
                  ? (r = e)
                  : i >= t[e] && i < t[e + 1] && (r = e + 1)
                : i >= t[e] && (r = e);
            return (
              s.normalizeSlideIndex && (r < 0 || void 0 === r) && (r = 0), r
            );
          })(t)),
        i.indexOf(s) >= 0)
      )
        o = i.indexOf(s);
      else {
        const e = Math.min(r.slidesPerGroupSkip, d);
        o = e + Math.floor((d - e) / r.slidesPerGroup);
      }
      if ((o >= i.length && (o = i.length - 1), d === a && !t.params.loop))
        return void (o !== l && ((t.snapIndex = o), t.emit("snapIndexChange")));
      if (d === a && t.params.loop && t.virtual && t.params.virtual.enabled)
        return void (t.realIndex = c(d));
      const p = t.grid && r.grid && r.grid.rows > 1;
      let u;
      if (t.virtual && r.virtual.enabled && r.loop) u = c(d);
      else if (p) {
        const e = t.slides.filter((e) => e.column === d)[0];
        let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
        Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
          (u = Math.floor(s / r.grid.rows));
      } else if (t.slides[d]) {
        const e = t.slides[d].getAttribute("data-swiper-slide-index");
        u = e ? parseInt(e, 10) : d;
      } else u = d;
      Object.assign(t, {
        previousSnapIndex: l,
        snapIndex: o,
        previousRealIndex: n,
        realIndex: u,
        previousIndex: a,
        activeIndex: d,
      }),
        t.initialized && k(t),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) &&
          (n !== u && t.emit("realIndexChange"), t.emit("slideChange"));
    },
    updateClickedSlide: function (e, t) {
      const s = this,
        i = s.params;
      let r = e.closest(`.${i.slideClass}, swiper-slide`);
      !r &&
        s.isElement &&
        t &&
        t.length > 1 &&
        t.includes(e) &&
        [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
          !r &&
            e.matches &&
            e.matches(`.${i.slideClass}, swiper-slide`) &&
            (r = e);
        });
      let a,
        n = !1;
      if (r)
        for (let e = 0; e < s.slides.length; e += 1)
          if (s.slides[e] === r) {
            (n = !0), (a = e);
            break;
          }
      if (!r || !n)
        return (s.clickedSlide = void 0), void (s.clickedIndex = void 0);
      (s.clickedSlide = r),
        s.virtual && s.params.virtual.enabled
          ? (s.clickedIndex = parseInt(
              r.getAttribute("data-swiper-slide-index"),
              10,
            ))
          : (s.clickedIndex = a),
        i.slideToClickedSlide &&
          void 0 !== s.clickedIndex &&
          s.clickedIndex !== s.activeIndex &&
          s.slideToClickedSlide();
    },
  };
  var I = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: s, translate: i, wrapperEl: r } = this;
      if (t.virtualTranslate) return s ? -i : i;
      if (t.cssMode) return i;
      let a = o(r, e);
      return (a += this.cssOverflowAdjustment()), s && (a = -a), a || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        { rtlTranslate: i, params: r, wrapperEl: a, progress: n } = s;
      let l,
        o = 0,
        d = 0;
      s.isHorizontal() ? (o = i ? -e : e) : (d = e),
        r.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? o : d),
        r.cssMode
          ? (a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -o
              : -d)
          : r.virtualTranslate ||
            (s.isHorizontal()
              ? (o -= s.cssOverflowAdjustment())
              : (d -= s.cssOverflowAdjustment()),
            (a.style.transform = `translate3d(${o}px, ${d}px, 0px)`));
      const c = s.maxTranslate() - s.minTranslate();
      (l = 0 === c ? 0 : (e - s.minTranslate()) / c),
        l !== n && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, s, i, r) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        void 0 === i && (i = !0);
      const a = this,
        { params: n, wrapperEl: l } = a;
      if (a.animating && n.preventInteractionOnTransition) return !1;
      const o = a.minTranslate(),
        d = a.maxTranslate();
      let c;
      if (
        ((c = i && e > o ? o : i && e < d ? d : e),
        a.updateProgress(c),
        n.cssMode)
      ) {
        const e = a.isHorizontal();
        if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!a.support.smoothScroll)
            return (
              u({ swiper: a, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (a.setTransition(0),
            a.setTranslate(c),
            s &&
              (a.emit("beforeTransitionStart", t, r), a.emit("transitionEnd")))
          : (a.setTransition(t),
            a.setTranslate(c),
            s &&
              (a.emit("beforeTransitionStart", t, r),
              a.emit("transitionStart")),
            a.animating ||
              ((a.animating = !0),
              a.onTranslateToWrapperTransitionEnd ||
                (a.onTranslateToWrapperTransitionEnd = function (e) {
                  a &&
                    !a.destroyed &&
                    e.target === this &&
                    (a.wrapperEl.removeEventListener(
                      "transitionend",
                      a.onTranslateToWrapperTransitionEnd,
                    ),
                    (a.onTranslateToWrapperTransitionEnd = null),
                    delete a.onTranslateToWrapperTransitionEnd,
                    s && a.emit("transitionEnd"));
                }),
              a.wrapperEl.addEventListener(
                "transitionend",
                a.onTranslateToWrapperTransitionEnd,
              ))),
        !0
      );
    },
  };
  function O(e) {
    let { swiper: t, runCallbacks: s, direction: i, step: r } = e;
    const { activeIndex: a, previousIndex: n } = t;
    let l = i;
    if (
      (l || (l = a > n ? "next" : a < n ? "prev" : "reset"),
      t.emit(`transition${r}`),
      s && a !== n)
    ) {
      if ("reset" === l) return void t.emit(`slideResetTransition${r}`);
      t.emit(`slideChangeTransition${r}`),
        "next" === l
          ? t.emit(`slideNextTransition${r}`)
          : t.emit(`slidePrevTransition${r}`);
    }
  }
  var _ = {
    slideTo: function (e, t, s, i, r) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e && (e = parseInt(e, 10));
      const a = this;
      let n = e;
      n < 0 && (n = 0);
      const {
        params: l,
        snapGrid: o,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: m,
        wrapperEl: f,
        enabled: h,
      } = a;
      if ((a.animating && l.preventInteractionOnTransition) || (!h && !i && !r))
        return !1;
      const g = Math.min(a.params.slidesPerGroupSkip, n);
      let v = g + Math.floor((n - g) / a.params.slidesPerGroup);
      v >= o.length && (v = o.length - 1);
      const w = -o[v];
      if (l.normalizeSlideIndex)
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * w),
            s = Math.floor(100 * d[e]),
            i = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= s && t < i - (i - s) / 2
              ? (n = e)
              : t >= s && t < i && (n = e + 1)
            : t >= s && (n = e);
        }
      if (a.initialized && n !== p) {
        if (
          !a.allowSlideNext &&
          (m
            ? w > a.translate && w > a.minTranslate()
            : w < a.translate && w < a.minTranslate())
        )
          return !1;
        if (
          !a.allowSlidePrev &&
          w > a.translate &&
          w > a.maxTranslate() &&
          (p || 0) !== n
        )
          return !1;
      }
      let b;
      if (
        (n !== (c || 0) && s && a.emit("beforeSlideChangeStart"),
        a.updateProgress(w),
        (b = n > p ? "next" : n < p ? "prev" : "reset"),
        (m && -w === a.translate) || (!m && w === a.translate))
      )
        return (
          a.updateActiveIndex(n),
          l.autoHeight && a.updateAutoHeight(),
          a.updateSlidesClasses(),
          "slide" !== l.effect && a.setTranslate(w),
          "reset" !== b && (a.transitionStart(s, b), a.transitionEnd(s, b)),
          !1
        );
      if (l.cssMode) {
        const e = a.isHorizontal(),
          s = m ? w : -w;
        if (0 === t) {
          const t = a.virtual && a.params.virtual.enabled;
          t &&
            ((a.wrapperEl.style.scrollSnapType = "none"),
            (a._immediateVirtual = !0)),
            t && !a._cssModeVirtualInitialSet && a.params.initialSlide > 0
              ? ((a._cssModeVirtualInitialSet = !0),
                requestAnimationFrame(() => {
                  f[e ? "scrollLeft" : "scrollTop"] = s;
                }))
              : (f[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (a.wrapperEl.style.scrollSnapType = ""),
                  (a._immediateVirtual = !1);
              });
        } else {
          if (!a.support.smoothScroll)
            return (
              u({ swiper: a, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          f.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        a.setTransition(t),
        a.setTranslate(w),
        a.updateActiveIndex(n),
        a.updateSlidesClasses(),
        a.emit("beforeTransitionStart", t, i),
        a.transitionStart(s, b),
        0 === t
          ? a.transitionEnd(s, b)
          : a.animating ||
            ((a.animating = !0),
            a.onSlideToWrapperTransitionEnd ||
              (a.onSlideToWrapperTransitionEnd = function (e) {
                a &&
                  !a.destroyed &&
                  e.target === this &&
                  (a.wrapperEl.removeEventListener(
                    "transitionend",
                    a.onSlideToWrapperTransitionEnd,
                  ),
                  (a.onSlideToWrapperTransitionEnd = null),
                  delete a.onSlideToWrapperTransitionEnd,
                  a.transitionEnd(s, b));
              }),
            a.wrapperEl.addEventListener(
              "transitionend",
              a.onSlideToWrapperTransitionEnd,
            )),
        !0
      );
    },
    slideToLoop: function (e, t, s, i) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e)
      ) {
        e = parseInt(e, 10);
      }
      const r = this,
        a = r.grid && r.params.grid && r.params.grid.rows > 1;
      let n = e;
      if (r.params.loop)
        if (r.virtual && r.params.virtual.enabled) n += r.virtual.slidesBefore;
        else {
          let e;
          if (a) {
            const t = n * r.params.grid.rows;
            e = r.slides.filter(
              (e) => 1 * e.getAttribute("data-swiper-slide-index") === t,
            )[0].column;
          } else e = r.getSlideIndexByData(n);
          const t = a
              ? Math.ceil(r.slides.length / r.params.grid.rows)
              : r.slides.length,
            { centeredSlides: s } = r.params;
          let i = r.params.slidesPerView;
          "auto" === i
            ? (i = r.slidesPerViewDynamic())
            : ((i = Math.ceil(parseFloat(r.params.slidesPerView, 10))),
              s && i % 2 == 0 && (i += 1));
          let l = t - e < i;
          if ((s && (l = l || e < Math.ceil(i / 2)), l)) {
            const i = s
              ? e < r.activeIndex
                ? "prev"
                : "next"
              : e - r.activeIndex - 1 < r.params.slidesPerView
                ? "next"
                : "prev";
            r.loopFix({
              direction: i,
              slideTo: !0,
              activeSlideIndex: "next" === i ? e + 1 : e - t + 1,
              slideRealIndex: "next" === i ? r.realIndex : void 0,
            });
          }
          if (a) {
            const e = n * r.params.grid.rows;
            n = r.slides.filter(
              (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
            )[0].column;
          } else n = r.getSlideIndexByData(n);
        }
      return (
        requestAnimationFrame(() => {
          r.slideTo(n, t, s, i);
        }),
        r
      );
    },
    slideNext: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        { enabled: r, params: a, animating: n } = i;
      if (!r) return i;
      let l = a.slidesPerGroup;
      "auto" === a.slidesPerView &&
        1 === a.slidesPerGroup &&
        a.slidesPerGroupAuto &&
        (l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const o = i.activeIndex < a.slidesPerGroupSkip ? 1 : l,
        d = i.virtual && a.virtual.enabled;
      if (a.loop) {
        if (n && !d && a.loopPreventsSliding) return !1;
        if (
          (i.loopFix({ direction: "next" }),
          (i._clientLeft = i.wrapperEl.clientLeft),
          i.activeIndex === i.slides.length - 1 && a.cssMode)
        )
          return (
            requestAnimationFrame(() => {
              i.slideTo(i.activeIndex + o, e, t, s);
            }),
            !0
          );
      }
      return a.rewind && i.isEnd
        ? i.slideTo(0, e, t, s)
        : i.slideTo(i.activeIndex + o, e, t, s);
    },
    slidePrev: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        {
          params: r,
          snapGrid: a,
          slidesGrid: n,
          rtlTranslate: l,
          enabled: o,
          animating: d,
        } = i;
      if (!o) return i;
      const c = i.virtual && r.virtual.enabled;
      if (r.loop) {
        if (d && !c && r.loopPreventsSliding) return !1;
        i.loopFix({ direction: "prev" }),
          (i._clientLeft = i.wrapperEl.clientLeft);
      }
      function p(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = p(l ? i.translate : -i.translate),
        m = a.map((e) => p(e));
      let f = a[m.indexOf(u) - 1];
      if (void 0 === f && r.cssMode) {
        let e;
        a.forEach((t, s) => {
          u >= t && (e = s);
        }),
          void 0 !== e && (f = a[e > 0 ? e - 1 : e]);
      }
      let h = 0;
      if (
        (void 0 !== f &&
          ((h = n.indexOf(f)),
          h < 0 && (h = i.activeIndex - 1),
          "auto" === r.slidesPerView &&
            1 === r.slidesPerGroup &&
            r.slidesPerGroupAuto &&
            ((h = h - i.slidesPerViewDynamic("previous", !0) + 1),
            (h = Math.max(h, 0)))),
        r.rewind && i.isBeginning)
      ) {
        const r =
          i.params.virtual && i.params.virtual.enabled && i.virtual
            ? i.virtual.slides.length - 1
            : i.slides.length - 1;
        return i.slideTo(r, e, t, s);
      }
      return r.loop && 0 === i.activeIndex && r.cssMode
        ? (requestAnimationFrame(() => {
            i.slideTo(h, e, t, s);
          }),
          !0)
        : i.slideTo(h, e, t, s);
    },
    slideReset: function (e, t, s) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, s)
      );
    },
    slideToClosest: function (e, t, s, i) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === i && (i = 0.5);
      const r = this;
      let a = r.activeIndex;
      const n = Math.min(r.params.slidesPerGroupSkip, a),
        l = n + Math.floor((a - n) / r.params.slidesPerGroup),
        o = r.rtlTranslate ? r.translate : -r.translate;
      if (o >= r.snapGrid[l]) {
        const e = r.snapGrid[l];
        o - e > (r.snapGrid[l + 1] - e) * i && (a += r.params.slidesPerGroup);
      } else {
        const e = r.snapGrid[l - 1];
        o - e <= (r.snapGrid[l] - e) * i && (a -= r.params.slidesPerGroup);
      }
      return (
        (a = Math.max(a, 0)),
        (a = Math.min(a, r.slidesGrid.length - 1)),
        r.slideTo(a, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, slidesEl: s } = e,
        i =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let r,
        a = e.clickedIndex;
      const l = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
      if (t.loop) {
        if (e.animating) return;
        (r = parseInt(
          e.clickedSlide.getAttribute("data-swiper-slide-index"),
          10,
        )),
          t.centeredSlides
            ? a < e.loopedSlides - i / 2 ||
              a > e.slides.length - e.loopedSlides + i / 2
              ? (e.loopFix(),
                (a = e.getSlideIndex(
                  m(s, `${l}[data-swiper-slide-index="${r}"]`)[0],
                )),
                n(() => {
                  e.slideTo(a);
                }))
              : e.slideTo(a)
            : a > e.slides.length - i
              ? (e.loopFix(),
                (a = e.getSlideIndex(
                  m(s, `${l}[data-swiper-slide-index="${r}"]`)[0],
                )),
                n(() => {
                  e.slideTo(a);
                }))
              : e.slideTo(a);
      } else e.slideTo(a);
    },
  };
  var z = {
    loopCreate: function (e) {
      const t = this,
        { params: s, slidesEl: i } = t;
      if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
      const r = () => {
          m(i, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
            e.setAttribute("data-swiper-slide-index", t);
          });
        },
        a = t.grid && s.grid && s.grid.rows > 1,
        n = s.slidesPerGroup * (a ? s.grid.rows : 1),
        l = t.slides.length % n != 0,
        o = a && t.slides.length % s.grid.rows != 0,
        d = (e) => {
          for (let i = 0; i < e; i += 1) {
            const e = t.isElement
              ? h("swiper-slide", [s.slideBlankClass])
              : h("div", [s.slideClass, s.slideBlankClass]);
            t.slidesEl.append(e);
          }
        };
      if (l) {
        if (s.loopAddBlankSlides) {
          d(n - (t.slides.length % n)), t.recalcSlides(), t.updateSlides();
        } else
          f(
            "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
          );
        r();
      } else if (o) {
        if (s.loopAddBlankSlides) {
          d(s.grid.rows - (t.slides.length % s.grid.rows)),
            t.recalcSlides(),
            t.updateSlides();
        } else
          f(
            "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
          );
        r();
      } else r();
      t.loopFix({
        slideRealIndex: e,
        direction: s.centeredSlides ? void 0 : "next",
      });
    },
    loopFix: function (e) {
      let {
        slideRealIndex: t,
        slideTo: s = !0,
        direction: i,
        setTranslate: r,
        activeSlideIndex: a,
        byController: n,
        byMousewheel: l,
      } = void 0 === e ? {} : e;
      const o = this;
      if (!o.params.loop) return;
      o.emit("beforeLoopFix");
      const {
          slides: d,
          allowSlidePrev: c,
          allowSlideNext: p,
          slidesEl: u,
          params: m,
        } = o,
        { centeredSlides: h } = m;
      if (
        ((o.allowSlidePrev = !0),
        (o.allowSlideNext = !0),
        o.virtual && m.virtual.enabled)
      )
        return (
          s &&
            (m.centeredSlides || 0 !== o.snapIndex
              ? m.centeredSlides && o.snapIndex < m.slidesPerView
                ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0)
                : o.snapIndex === o.snapGrid.length - 1 &&
                  o.slideTo(o.virtual.slidesBefore, 0, !1, !0)
              : o.slideTo(o.virtual.slides.length, 0, !1, !0)),
          (o.allowSlidePrev = c),
          (o.allowSlideNext = p),
          void o.emit("loopFix")
        );
      let g = m.slidesPerView;
      "auto" === g
        ? (g = o.slidesPerViewDynamic())
        : ((g = Math.ceil(parseFloat(m.slidesPerView, 10))),
          h && g % 2 == 0 && (g += 1));
      const v = m.slidesPerGroupAuto ? g : m.slidesPerGroup;
      let w = v;
      w % v != 0 && (w += v - (w % v)),
        (w += m.loopAdditionalSlides),
        (o.loopedSlides = w);
      const b = o.grid && m.grid && m.grid.rows > 1;
      d.length < g + w
        ? f(
            "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
          )
        : b &&
          "row" === m.grid.fill &&
          f(
            "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`",
          );
      const y = [],
        S = [];
      let T = o.activeIndex;
      void 0 === a
        ? (a = o.getSlideIndex(
            d.filter((e) => e.classList.contains(m.slideActiveClass))[0],
          ))
        : (T = a);
      const E = "next" === i || !i,
        x = "prev" === i || !i;
      let C = 0,
        M = 0;
      const L = b ? Math.ceil(d.length / m.grid.rows) : d.length,
        P = (b ? d[a].column : a) + (h && void 0 === r ? -g / 2 + 0.5 : 0);
      if (P < w) {
        C = Math.max(w - P, v);
        for (let e = 0; e < w - P; e += 1) {
          const t = e - Math.floor(e / L) * L;
          if (b) {
            const e = L - t - 1;
            for (let t = d.length - 1; t >= 0; t -= 1)
              d[t].column === e && y.push(t);
          } else y.push(L - t - 1);
        }
      } else if (P + g > L - w) {
        M = Math.max(P - (L - 2 * w), v);
        for (let e = 0; e < M; e += 1) {
          const t = e - Math.floor(e / L) * L;
          b
            ? d.forEach((e, s) => {
                e.column === t && S.push(s);
              })
            : S.push(t);
        }
      }
      if (
        ((o.__preventObserver__ = !0),
        requestAnimationFrame(() => {
          o.__preventObserver__ = !1;
        }),
        x &&
          y.forEach((e) => {
            (d[e].swiperLoopMoveDOM = !0),
              u.prepend(d[e]),
              (d[e].swiperLoopMoveDOM = !1);
          }),
        E &&
          S.forEach((e) => {
            (d[e].swiperLoopMoveDOM = !0),
              u.append(d[e]),
              (d[e].swiperLoopMoveDOM = !1);
          }),
        o.recalcSlides(),
        "auto" === m.slidesPerView
          ? o.updateSlides()
          : b &&
            ((y.length > 0 && x) || (S.length > 0 && E)) &&
            o.slides.forEach((e, t) => {
              o.grid.updateSlide(t, e, o.slides);
            }),
        m.watchSlidesProgress && o.updateSlidesOffset(),
        s)
      )
        if (y.length > 0 && x) {
          if (void 0 === t) {
            const e = o.slidesGrid[T],
              t = o.slidesGrid[T + C] - e;
            l
              ? o.setTranslate(o.translate - t)
              : (o.slideTo(T + C, 0, !1, !0),
                r &&
                  ((o.touchEventsData.startTranslate =
                    o.touchEventsData.startTranslate - t),
                  (o.touchEventsData.currentTranslate =
                    o.touchEventsData.currentTranslate - t)));
          } else if (r) {
            const e = b ? y.length / m.grid.rows : y.length;
            o.slideTo(o.activeIndex + e, 0, !1, !0),
              (o.touchEventsData.currentTranslate = o.translate);
          }
        } else if (S.length > 0 && E)
          if (void 0 === t) {
            const e = o.slidesGrid[T],
              t = o.slidesGrid[T - M] - e;
            l
              ? o.setTranslate(o.translate - t)
              : (o.slideTo(T - M, 0, !1, !0),
                r &&
                  ((o.touchEventsData.startTranslate =
                    o.touchEventsData.startTranslate - t),
                  (o.touchEventsData.currentTranslate =
                    o.touchEventsData.currentTranslate - t)));
          } else {
            const e = b ? S.length / m.grid.rows : S.length;
            o.slideTo(o.activeIndex - e, 0, !1, !0);
          }
      if (
        ((o.allowSlidePrev = c),
        (o.allowSlideNext = p),
        o.controller && o.controller.control && !n)
      ) {
        const e = {
          slideRealIndex: t,
          direction: i,
          setTranslate: r,
          activeSlideIndex: a,
          byController: !0,
        };
        Array.isArray(o.controller.control)
          ? o.controller.control.forEach((t) => {
              !t.destroyed &&
                t.params.loop &&
                t.loopFix({
                  ...e,
                  slideTo: t.params.slidesPerView === m.slidesPerView && s,
                });
            })
          : o.controller.control instanceof o.constructor &&
            o.controller.control.params.loop &&
            o.controller.control.loopFix({
              ...e,
              slideTo:
                o.controller.control.params.slidesPerView === m.slidesPerView &&
                s,
            });
      }
      o.emit("loopFix");
    },
    loopDestroy: function () {
      const e = this,
        { params: t, slidesEl: s } = e;
      if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
      e.recalcSlides();
      const i = [];
      e.slides.forEach((e) => {
        const t =
          void 0 === e.swiperSlideIndex
            ? 1 * e.getAttribute("data-swiper-slide-index")
            : e.swiperSlideIndex;
        i[t] = e;
      }),
        e.slides.forEach((e) => {
          e.removeAttribute("data-swiper-slide-index");
        }),
        i.forEach((e) => {
          s.append(e);
        }),
        e.recalcSlides(),
        e.slideTo(e.realIndex, 0);
    },
  };
  function D(e, t, s) {
    const i = a(),
      { params: r } = e,
      n = r.edgeSwipeDetection,
      l = r.edgeSwipeThreshold;
    return (
      !n ||
      !(s <= l || s >= i.innerWidth - l) ||
      ("prevent" === n && (t.preventDefault(), !0))
    );
  }
  function G(e) {
    const t = this,
      s = i();
    let r = e;
    r.originalEvent && (r = r.originalEvent);
    const n = t.touchEventsData;
    if ("pointerdown" === r.type) {
      if (null !== n.pointerId && n.pointerId !== r.pointerId) return;
      n.pointerId = r.pointerId;
    } else
      "touchstart" === r.type &&
        1 === r.targetTouches.length &&
        (n.touchId = r.targetTouches[0].identifier);
    if ("touchstart" === r.type) return void D(t, r, r.targetTouches[0].pageX);
    const { params: o, touches: d, enabled: c } = t;
    if (!c) return;
    if (!o.simulateTouch && "mouse" === r.pointerType) return;
    if (t.animating && o.preventInteractionOnTransition) return;
    !t.animating && o.cssMode && o.loop && t.loopFix();
    let p = r.target;
    if ("wrapper" === o.touchEventsTarget && !t.wrapperEl.contains(p)) return;
    if ("which" in r && 3 === r.which) return;
    if ("button" in r && r.button > 0) return;
    if (n.isTouched && n.isMoved) return;
    const u = !!o.noSwipingClass && "" !== o.noSwipingClass,
      m = r.composedPath ? r.composedPath() : r.path;
    u && r.target && r.target.shadowRoot && m && (p = m[0]);
    const f = o.noSwipingSelector
        ? o.noSwipingSelector
        : `.${o.noSwipingClass}`,
      h = !(!r.target || !r.target.shadowRoot);
    if (
      o.noSwiping &&
      (h
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                if (!s || s === i() || s === a()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const r = s.closest(e);
                return r || s.getRootNode ? r || t(s.getRootNode().host) : null;
              })(t)
            );
          })(f, p)
        : p.closest(f))
    )
      return void (t.allowClick = !0);
    if (o.swipeHandler && !p.closest(o.swipeHandler)) return;
    (d.currentX = r.pageX), (d.currentY = r.pageY);
    const g = d.currentX,
      v = d.currentY;
    if (!D(t, r, g)) return;
    Object.assign(n, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (d.startX = g),
      (d.startY = v),
      (n.touchStartTime = l()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      o.threshold > 0 && (n.allowThresholdMove = !1);
    let w = !0;
    p.matches(n.focusableElements) &&
      ((w = !1), "SELECT" === p.nodeName && (n.isTouched = !1)),
      s.activeElement &&
        s.activeElement.matches(n.focusableElements) &&
        s.activeElement !== p &&
        s.activeElement.blur();
    const b = w && t.allowTouchMove && o.touchStartPreventDefault;
    (!o.touchStartForcePreventDefault && !b) ||
      p.isContentEditable ||
      r.preventDefault(),
      o.freeMode &&
        o.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !o.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", r);
  }
  function $(e) {
    const t = i(),
      s = this,
      r = s.touchEventsData,
      { params: a, touches: n, rtlTranslate: o, enabled: d } = s;
    if (!d) return;
    if (!a.simulateTouch && "mouse" === e.pointerType) return;
    let c,
      p = e;
    if ((p.originalEvent && (p = p.originalEvent), "pointermove" === p.type)) {
      if (null !== r.touchId) return;
      if (p.pointerId !== r.pointerId) return;
    }
    if ("touchmove" === p.type) {
      if (
        ((c = [...p.changedTouches].filter(
          (e) => e.identifier === r.touchId,
        )[0]),
        !c || c.identifier !== r.touchId)
      )
        return;
    } else c = p;
    if (!r.isTouched)
      return void (
        r.startMoving &&
        r.isScrolling &&
        s.emit("touchMoveOpposite", p)
      );
    const u = c.pageX,
      m = c.pageY;
    if (p.preventedByNestedSwiper) return (n.startX = u), void (n.startY = m);
    if (!s.allowTouchMove)
      return (
        p.target.matches(r.focusableElements) || (s.allowClick = !1),
        void (
          r.isTouched &&
          (Object.assign(n, { startX: u, startY: m, currentX: u, currentY: m }),
          (r.touchStartTime = l()))
        )
      );
    if (a.touchReleaseOnEdges && !a.loop)
      if (s.isVertical()) {
        if (
          (m < n.startY && s.translate <= s.maxTranslate()) ||
          (m > n.startY && s.translate >= s.minTranslate())
        )
          return (r.isTouched = !1), void (r.isMoved = !1);
      } else if (
        (u < n.startX && s.translate <= s.maxTranslate()) ||
        (u > n.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      t.activeElement &&
      p.target === t.activeElement &&
      p.target.matches(r.focusableElements)
    )
      return (r.isMoved = !0), void (s.allowClick = !1);
    r.allowTouchCallbacks && s.emit("touchMove", p),
      (n.previousX = n.currentX),
      (n.previousY = n.currentY),
      (n.currentX = u),
      (n.currentY = m);
    const f = n.currentX - n.startX,
      h = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(f ** 2 + h ** 2) < s.params.threshold)
      return;
    if (void 0 === r.isScrolling) {
      let e;
      (s.isHorizontal() && n.currentY === n.startY) ||
      (s.isVertical() && n.currentX === n.startX)
        ? (r.isScrolling = !1)
        : f * f + h * h >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(h), Math.abs(f))) / Math.PI),
          (r.isScrolling = s.isHorizontal()
            ? e > a.touchAngle
            : 90 - e > a.touchAngle));
    }
    if (
      (r.isScrolling && s.emit("touchMoveOpposite", p),
      void 0 === r.startMoving &&
        ((n.currentX === n.startX && n.currentY === n.startY) ||
          (r.startMoving = !0)),
      r.isScrolling)
    )
      return void (r.isTouched = !1);
    if (!r.startMoving) return;
    (s.allowClick = !1),
      !a.cssMode && p.cancelable && p.preventDefault(),
      a.touchMoveStopPropagation && !a.nested && p.stopPropagation();
    let g = s.isHorizontal() ? f : h,
      v = s.isHorizontal()
        ? n.currentX - n.previousX
        : n.currentY - n.previousY;
    a.oneWayMovement &&
      ((g = Math.abs(g) * (o ? 1 : -1)), (v = Math.abs(v) * (o ? 1 : -1))),
      (n.diff = g),
      (g *= a.touchRatio),
      o && ((g = -g), (v = -v));
    const w = s.touchesDirection;
    (s.swipeDirection = g > 0 ? "prev" : "next"),
      (s.touchesDirection = v > 0 ? "prev" : "next");
    const b = s.params.loop && !a.cssMode,
      y =
        ("next" === s.touchesDirection && s.allowSlideNext) ||
        ("prev" === s.touchesDirection && s.allowSlidePrev);
    if (!r.isMoved) {
      if (
        (b && y && s.loopFix({ direction: s.swipeDirection }),
        (r.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating)
      ) {
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
        });
        s.wrapperEl.dispatchEvent(e);
      }
      (r.allowMomentumBounce = !1),
        !a.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", p);
    }
    if (
      (new Date().getTime(),
      r.isMoved &&
        r.allowThresholdMove &&
        w !== s.touchesDirection &&
        b &&
        y &&
        Math.abs(g) >= 1)
    )
      return (
        Object.assign(n, {
          startX: u,
          startY: m,
          currentX: u,
          currentY: m,
          startTranslate: r.currentTranslate,
        }),
        (r.loopSwapReset = !0),
        void (r.startTranslate = r.currentTranslate)
      );
    s.emit("sliderMove", p),
      (r.isMoved = !0),
      (r.currentTranslate = g + r.startTranslate);
    let S = !0,
      T = a.resistanceRatio;
    if (
      (a.touchReleaseOnEdges && (T = 0),
      g > 0
        ? (b &&
            y &&
            r.allowThresholdMove &&
            r.currentTranslate >
              (a.centeredSlides
                ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1]
                : s.minTranslate()) &&
            s.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          r.currentTranslate > s.minTranslate() &&
            ((S = !1),
            a.resistance &&
              (r.currentTranslate =
                s.minTranslate() -
                1 +
                (-s.minTranslate() + r.startTranslate + g) ** T)))
        : g < 0 &&
          (b &&
            y &&
            r.allowThresholdMove &&
            r.currentTranslate <
              (a.centeredSlides
                ? s.maxTranslate() +
                  s.slidesSizesGrid[s.slidesSizesGrid.length - 1]
                : s.maxTranslate()) &&
            s.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                s.slides.length -
                ("auto" === a.slidesPerView
                  ? s.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(a.slidesPerView, 10))),
            }),
          r.currentTranslate < s.maxTranslate() &&
            ((S = !1),
            a.resistance &&
              (r.currentTranslate =
                s.maxTranslate() +
                1 -
                (s.maxTranslate() - r.startTranslate - g) ** T))),
      S && (p.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        r.currentTranslate < r.startTranslate &&
        (r.currentTranslate = r.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        r.currentTranslate > r.startTranslate &&
        (r.currentTranslate = r.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (r.currentTranslate = r.startTranslate),
      a.threshold > 0)
    ) {
      if (!(Math.abs(g) > a.threshold || r.allowThresholdMove))
        return void (r.currentTranslate = r.startTranslate);
      if (!r.allowThresholdMove)
        return (
          (r.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (r.currentTranslate = r.startTranslate),
          void (n.diff = s.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY)
        );
    }
    a.followFinger &&
      !a.cssMode &&
      (((a.freeMode && a.freeMode.enabled && s.freeMode) ||
        a.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      a.freeMode &&
        a.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(r.currentTranslate),
      s.setTranslate(r.currentTranslate));
  }
  function B(e) {
    const t = this,
      s = t.touchEventsData;
    let i,
      r = e;
    r.originalEvent && (r = r.originalEvent);
    if ("touchend" === r.type || "touchcancel" === r.type) {
      if (
        ((i = [...r.changedTouches].filter(
          (e) => e.identifier === s.touchId,
        )[0]),
        !i || i.identifier !== s.touchId)
      )
        return;
    } else {
      if (null !== s.touchId) return;
      if (r.pointerId !== s.pointerId) return;
      i = r;
    }
    if (
      ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
        r.type,
      )
    ) {
      if (
        !(
          ["pointercancel", "contextmenu"].includes(r.type) &&
          (t.browser.isSafari || t.browser.isWebView)
        )
      )
        return;
    }
    (s.pointerId = null), (s.touchId = null);
    const {
      params: a,
      touches: o,
      rtlTranslate: d,
      slidesGrid: c,
      enabled: p,
    } = t;
    if (!p) return;
    if (!a.simulateTouch && "mouse" === r.pointerType) return;
    if (
      (s.allowTouchCallbacks && t.emit("touchEnd", r),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && a.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    a.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const u = l(),
      m = u - s.touchStartTime;
    if (t.allowClick) {
      const e = r.path || (r.composedPath && r.composedPath());
      t.updateClickedSlide((e && e[0]) || r.target, e),
        t.emit("tap click", r),
        m < 300 &&
          u - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", r);
    }
    if (
      ((s.lastClickTime = l()),
      n(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        (0 === o.diff && !s.loopSwapReset) ||
        (s.currentTranslate === s.startTranslate && !s.loopSwapReset))
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let f;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (f = a.followFinger
        ? d
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      a.cssMode)
    )
      return;
    if (a.freeMode && a.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: f });
    const h = f >= -t.maxTranslate() && !t.params.loop;
    let g = 0,
      v = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < c.length;
      e += e < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup
    ) {
      const t = e < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
      void 0 !== c[e + t]
        ? (h || (f >= c[e] && f < c[e + t])) && ((g = e), (v = c[e + t] - c[e]))
        : (h || f >= c[e]) &&
          ((g = e), (v = c[c.length - 1] - c[c.length - 2]));
    }
    let w = null,
      b = null;
    a.rewind &&
      (t.isBeginning
        ? (b =
            a.virtual && a.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (w = 0));
    const y = (f - c[g]) / v,
      S = g < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    if (m > a.longSwipesMs) {
      if (!a.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (y >= a.longSwipesRatio
          ? t.slideTo(a.rewind && t.isEnd ? w : g + S)
          : t.slideTo(g)),
        "prev" === t.swipeDirection &&
          (y > 1 - a.longSwipesRatio
            ? t.slideTo(g + S)
            : null !== b && y < 0 && Math.abs(y) > a.longSwipesRatio
              ? t.slideTo(b)
              : t.slideTo(g));
    } else {
      if (!a.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (r.target === t.navigation.nextEl || r.target === t.navigation.prevEl)
        ? r.target === t.navigation.nextEl
          ? t.slideTo(g + S)
          : t.slideTo(g)
        : ("next" === t.swipeDirection && t.slideTo(null !== w ? w : g + S),
          "prev" === t.swipeDirection && t.slideTo(null !== b ? b : g));
    }
  }
  function F() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: r, snapGrid: a } = e,
      n = e.virtual && e.params.virtual.enabled;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses();
    const l = n && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
    !e.isEnd ||
    e.isBeginning ||
    e.params.centeredSlides ||
    l
      ? e.params.loop && !n
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0)
      : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = r),
      (e.allowSlideNext = i),
      e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow();
  }
  function N(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function V() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
    if (!i) return;
    let r;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const a = e.maxTranslate() - e.minTranslate();
    (r = 0 === a ? 0 : (e.translate - e.minTranslate()) / a),
      r !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  function H(e) {
    const t = this;
    L(t, e.target),
      t.params.cssMode ||
        ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
        t.update();
  }
  function q() {
    const e = this;
    e.documentTouchHandlerProceeded ||
      ((e.documentTouchHandlerProceeded = !0),
      e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
  }
  const R = (e, t) => {
    const s = i(),
      { params: r, el: a, wrapperEl: n, device: l } = e,
      o = !!r.nested,
      d = "on" === t ? "addEventListener" : "removeEventListener",
      c = t;
    s[d]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: o }),
      a[d]("touchstart", e.onTouchStart, { passive: !1 }),
      a[d]("pointerdown", e.onTouchStart, { passive: !1 }),
      s[d]("touchmove", e.onTouchMove, { passive: !1, capture: o }),
      s[d]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
      s[d]("touchend", e.onTouchEnd, { passive: !0 }),
      s[d]("pointerup", e.onTouchEnd, { passive: !0 }),
      s[d]("pointercancel", e.onTouchEnd, { passive: !0 }),
      s[d]("touchcancel", e.onTouchEnd, { passive: !0 }),
      s[d]("pointerout", e.onTouchEnd, { passive: !0 }),
      s[d]("pointerleave", e.onTouchEnd, { passive: !0 }),
      s[d]("contextmenu", e.onTouchEnd, { passive: !0 }),
      (r.preventClicks || r.preventClicksPropagation) &&
        a[d]("click", e.onClick, !0),
      r.cssMode && n[d]("scroll", e.onScroll),
      r.updateOnWindowResize
        ? e[c](
            l.ios || l.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            F,
            !0,
          )
        : e[c]("observerUpdate", F, !0),
      a[d]("load", e.onLoad, { capture: !0 });
  };
  const j = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var W = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function Y(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      const i = Object.keys(s)[0],
        r = s[i];
      "object" == typeof r && null !== r
        ? (!0 === e[i] && (e[i] = { enabled: !0 }),
          "navigation" === i &&
            e[i] &&
            e[i].enabled &&
            !e[i].prevEl &&
            !e[i].nextEl &&
            (e[i].auto = !0),
          ["pagination", "scrollbar"].indexOf(i) >= 0 &&
            e[i] &&
            e[i].enabled &&
            !e[i].el &&
            (e[i].auto = !0),
          i in e && "enabled" in r
            ? ("object" != typeof e[i] ||
                "enabled" in e[i] ||
                (e[i].enabled = !0),
              e[i] || (e[i] = { enabled: !1 }),
              c(t, s))
            : c(t, s))
        : c(t, s);
    };
  }
  const X = {
      eventsEmitter: M,
      update: A,
      translate: I,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode ||
            ((s.wrapperEl.style.transitionDuration = `${e}ms`),
            (s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          i.cssMode ||
            (i.autoHeight && s.updateAutoHeight(),
            O({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          (s.animating = !1),
            i.cssMode ||
              (s.setTransition(0),
              O({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: _,
      loop: z,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0),
            (s.style.cursor = "move"),
            (s.style.cursor = e ? "grabbing" : "grab"),
            t.isElement &&
              requestAnimationFrame(() => {
                t.__preventObserver__ = !1;
              });
        },
        unsetGrabCursor: function () {
          const e = this;
          (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e.isElement && (e.__preventObserver__ = !0),
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = ""),
            e.isElement &&
              requestAnimationFrame(() => {
                e.__preventObserver__ = !1;
              }));
        },
      },
      events: {
        attachEvents: function () {
          const e = this,
            { params: t } = e;
          (e.onTouchStart = G.bind(e)),
            (e.onTouchMove = $.bind(e)),
            (e.onTouchEnd = B.bind(e)),
            (e.onDocumentTouchStart = q.bind(e)),
            t.cssMode && (e.onScroll = V.bind(e)),
            (e.onClick = N.bind(e)),
            (e.onLoad = H.bind(e)),
            R(e, "on");
        },
        detachEvents: function () {
          R(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            { realIndex: t, initialized: s, params: i, el: r } = e,
            a = i.breakpoints;
          if (!a || (a && 0 === Object.keys(a).length)) return;
          const n = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
          if (!n || e.currentBreakpoint === n) return;
          const l = (n in a ? a[n] : void 0) || e.originalParams,
            o = j(e, i),
            d = j(e, l),
            p = i.enabled;
          o && !d
            ? (r.classList.remove(
                `${i.containerModifierClass}grid`,
                `${i.containerModifierClass}grid-column`,
              ),
              e.emitContainerClasses())
            : !o &&
              d &&
              (r.classList.add(`${i.containerModifierClass}grid`),
              ((l.grid.fill && "column" === l.grid.fill) ||
                (!l.grid.fill && "column" === i.grid.fill)) &&
                r.classList.add(`${i.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            ["navigation", "pagination", "scrollbar"].forEach((t) => {
              if (void 0 === l[t]) return;
              const s = i[t] && i[t].enabled,
                r = l[t] && l[t].enabled;
              s && !r && e[t].disable(), !s && r && e[t].enable();
            });
          const u = l.direction && l.direction !== i.direction,
            m = i.loop && (l.slidesPerView !== i.slidesPerView || u),
            f = i.loop;
          u && s && e.changeDirection(), c(e.params, l);
          const h = e.params.enabled,
            g = e.params.loop;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            p && !h ? e.disable() : !p && h && e.enable(),
            (e.currentBreakpoint = n),
            e.emit("_beforeBreakpoint", l),
            s &&
              (m
                ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                : !f && g
                  ? (e.loopCreate(t), e.updateSlides())
                  : f && !g && e.loopDestroy()),
            e.emit("breakpoint", l);
        },
        getBreakpoint: function (e, t, s) {
          if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
            return;
          let i = !1;
          const r = a(),
            n = "window" === t ? r.innerHeight : s.clientHeight,
            l = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: n * t, point: e };
              }
              return { value: e, point: e };
            });
          l.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < l.length; e += 1) {
            const { point: a, value: n } = l[e];
            "window" === t
              ? r.matchMedia(`(min-width: ${n}px)`).matches && (i = a)
              : n <= s.clientWidth && (i = a);
          }
          return i || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: i } = s;
          if (i) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: {
        addClasses: function () {
          const e = this,
            { classNames: t, params: s, rtl: i, el: r, device: a } = e,
            n = (function (e, t) {
              const s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((i) => {
                        e[i] && s.push(t + i);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: i },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: a.android },
                { ios: a.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
                { "watch-progress": s.watchSlidesProgress },
              ],
              s.containerModifierClass,
            );
          t.push(...n), r.classList.add(...t), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { el: e, classNames: t } = this;
          e.classList.remove(...t), this.emitContainerClasses();
        },
      },
    },
    U = {};
  class K {
    constructor() {
      let e, t;
      for (var s = arguments.length, r = new Array(s), a = 0; a < s; a++)
        r[a] = arguments[a];
      1 === r.length &&
      r[0].constructor &&
      "Object" === Object.prototype.toString.call(r[0]).slice(8, -1)
        ? (t = r[0])
        : ([e, t] = r),
        t || (t = {}),
        (t = c({}, t)),
        e && !t.el && (t.el = e);
      const n = i();
      if (
        t.el &&
        "string" == typeof t.el &&
        n.querySelectorAll(t.el).length > 1
      ) {
        const e = [];
        return (
          n.querySelectorAll(t.el).forEach((s) => {
            const i = c({}, t, { el: s });
            e.push(new K(i));
          }),
          e
        );
      }
      const l = this;
      (l.__swiper__ = !0),
        (l.support = E()),
        (l.device = x({ userAgent: t.userAgent })),
        (l.browser = C()),
        (l.eventsListeners = {}),
        (l.eventsAnyListeners = []),
        (l.modules = [...l.__modules__]),
        t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules);
      const o = {};
      l.modules.forEach((e) => {
        e({
          params: t,
          swiper: l,
          extendParams: Y(t, o),
          on: l.on.bind(l),
          once: l.once.bind(l),
          off: l.off.bind(l),
          emit: l.emit.bind(l),
        });
      });
      const d = c({}, W, o);
      return (
        (l.params = c({}, d, U, t)),
        (l.originalParams = c({}, l.params)),
        (l.passedParams = c({}, t)),
        l.params &&
          l.params.on &&
          Object.keys(l.params.on).forEach((e) => {
            l.on(e, l.params.on[e]);
          }),
        l.params && l.params.onAny && l.onAny(l.params.onAny),
        Object.assign(l, {
          enabled: l.params.enabled,
          el: e,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === l.params.direction,
          isVertical: () => "vertical" === l.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: l.params.allowSlideNext,
          allowSlidePrev: l.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: l.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            pointerId: null,
            touchId: null,
          },
          allowClick: !0,
          allowTouchMove: l.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        l.emit("_swiper"),
        l.params.init && l.init(),
        l
      );
    }
    getDirectionLabel(e) {
      return this.isHorizontal()
        ? e
        : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom",
          }[e];
    }
    getSlideIndex(e) {
      const { slidesEl: t, params: s } = this,
        i = v(m(t, `.${s.slideClass}, swiper-slide`)[0]);
      return v(e) - i;
    }
    getSlideIndexByData(e) {
      return this.getSlideIndex(
        this.slides.filter(
          (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
        )[0],
      );
    }
    recalcSlides() {
      const { slidesEl: e, params: t } = this;
      this.slides = m(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const i = s.minTranslate(),
        r = (s.maxTranslate() - i) * e + i;
      s.translateTo(r, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass),
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass),
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.forEach((s) => {
        const i = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: s,
        slides: i,
        slidesGrid: r,
        slidesSizesGrid: a,
        size: n,
        activeIndex: l,
      } = this;
      let o = 1;
      if ("number" == typeof s.slidesPerView) return s.slidesPerView;
      if (s.centeredSlides) {
        let e,
          t = i[l] ? i[l].swiperSlideSize : 0;
        for (let s = l + 1; s < i.length; s += 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (o += 1), t > n && (e = !0));
        for (let s = l - 1; s >= 0; s -= 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (o += 1), t > n && (e = !0));
      } else if ("current" === e)
        for (let e = l + 1; e < i.length; e += 1) {
          (t ? r[e] + a[e] - r[l] < n : r[e] - r[l] < n) && (o += 1);
        }
      else
        for (let e = l - 1; e >= 0; e -= 1) {
          r[l] - r[e] < n && (o += 1);
        }
      return o;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let r;
      if (
        (s.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && L(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        s.freeMode && s.freeMode.enabled && !s.cssMode)
      )
        i(), s.autoHeight && e.updateAutoHeight();
      else {
        if (
          ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
          e.isEnd &&
          !s.centeredSlides
        ) {
          const t =
            e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
          r = e.slideTo(t.length - 1, 0, !1, !0);
        } else r = e.slideTo(e.activeIndex, 0, !1, !0);
        r || i();
      }
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const s = this,
        i = s.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
          s.el.classList.add(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      let s = e || t.params.el;
      if (("string" == typeof s && (s = document.querySelector(s)), !s))
        return !1;
      (s.swiper = t),
        s.parentNode &&
          s.parentNode.host &&
          "SWIPER-CONTAINER" === s.parentNode.host.nodeName &&
          (t.isElement = !0);
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let r = (() => {
        if (s && s.shadowRoot && s.shadowRoot.querySelector) {
          return s.shadowRoot.querySelector(i());
        }
        return m(s, i())[0];
      })();
      return (
        !r &&
          t.params.createElements &&
          ((r = h("div", t.params.wrapperClass)),
          s.append(r),
          m(s, `.${t.params.slideClass}`).forEach((e) => {
            r.append(e);
          })),
        Object.assign(t, {
          el: s,
          wrapperEl: r,
          slidesEl:
            t.isElement && !s.parentNode.host.slideSlots
              ? s.parentNode.host
              : r,
          hostEl: t.isElement ? s.parentNode.host : s,
          mounted: !0,
          rtl: "rtl" === s.dir.toLowerCase() || "rtl" === g(s, "direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === s.dir.toLowerCase() || "rtl" === g(s, "direction")),
          wrongRTL: "-webkit-box" === g(r, "display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      if (!1 === t.mount(e)) return t;
      t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.loop && t.virtual && t.params.virtual.enabled
          ? t.slideTo(
              t.params.initialSlide + t.virtual.slidesBefore,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            )
          : t.slideTo(
              t.params.initialSlide,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            ),
        t.params.loop && t.loopCreate(),
        t.attachEvents();
      const s = [...t.el.querySelectorAll('[loading="lazy"]')];
      return (
        t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
        s.forEach((e) => {
          e.complete
            ? L(t, e)
            : e.addEventListener("load", (e) => {
                L(t, e.target);
              });
        }),
        k(t),
        (t.initialized = !0),
        k(t),
        t.emit("init"),
        t.emit("afterInit"),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const s = this,
        { params: i, el: r, wrapperEl: a, slides: n } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          i.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            r.removeAttribute("style"),
            a.removeAttribute("style"),
            n &&
              n.length &&
              n.forEach((e) => {
                e.classList.remove(
                  i.slideVisibleClass,
                  i.slideFullyVisibleClass,
                  i.slideActiveClass,
                  i.slideNextClass,
                  i.slidePrevClass,
                ),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index");
              })),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.el.swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      c(U, e);
    }
    static get extendedDefaults() {
      return U;
    }
    static get defaults() {
      return W;
    }
    static installModule(e) {
      K.prototype.__modules__ || (K.prototype.__modules__ = []);
      const t = K.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => K.installModule(e)), K)
        : (K.installModule(e), K);
    }
  }
  function J(e, t, s, i) {
    return (
      e.params.createElements &&
        Object.keys(i).forEach((r) => {
          if (!s[r] && !0 === s.auto) {
            let a = m(e.el, `.${i[r]}`)[0];
            a || ((a = h("div", i[r])), (a.className = i[r]), e.el.append(a)),
              (s[r] = a),
              (t[r] = a);
          }
        }),
      s
    );
  }
  function Q(e) {
    let { swiper: t, extendParams: s, on: i, emit: r } = e;
    s({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled",
      },
    }),
      (t.navigation = { nextEl: null, prevEl: null });
    const a = (e) => (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    function n(e) {
      let s;
      return e &&
        "string" == typeof e &&
        t.isElement &&
        ((s = t.el.querySelector(e)), s)
        ? s
        : (e &&
            ("string" == typeof e && (s = [...document.querySelectorAll(e)]),
            t.params.uniqueNavElements &&
              "string" == typeof e &&
              s.length > 1 &&
              1 === t.el.querySelectorAll(e).length &&
              (s = t.el.querySelector(e))),
          e && !s ? e : s);
    }
    function l(e, s) {
      const i = t.params.navigation;
      (e = a(e)).forEach((e) => {
        e &&
          (e.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
          "BUTTON" === e.tagName && (e.disabled = s),
          t.params.watchOverflow &&
            t.enabled &&
            e.classList[t.isLocked ? "add" : "remove"](i.lockClass));
      });
    }
    function o() {
      const { nextEl: e, prevEl: s } = t.navigation;
      if (t.params.loop) return l(s, !1), void l(e, !1);
      l(s, t.isBeginning && !t.params.rewind),
        l(e, t.isEnd && !t.params.rewind);
    }
    function d(e) {
      e.preventDefault(),
        (!t.isBeginning || t.params.loop || t.params.rewind) &&
          (t.slidePrev(), r("navigationPrev"));
    }
    function c(e) {
      e.preventDefault(),
        (!t.isEnd || t.params.loop || t.params.rewind) &&
          (t.slideNext(), r("navigationNext"));
    }
    function p() {
      const e = t.params.navigation;
      if (
        ((t.params.navigation = J(
          t,
          t.originalParams.navigation,
          t.params.navigation,
          { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" },
        )),
        !e.nextEl && !e.prevEl)
      )
        return;
      let s = n(e.nextEl),
        i = n(e.prevEl);
      Object.assign(t.navigation, { nextEl: s, prevEl: i }),
        (s = a(s)),
        (i = a(i));
      const r = (s, i) => {
        s && s.addEventListener("click", "next" === i ? c : d),
          !t.enabled && s && s.classList.add(...e.lockClass.split(" "));
      };
      s.forEach((e) => r(e, "next")), i.forEach((e) => r(e, "prev"));
    }
    function u() {
      let { nextEl: e, prevEl: s } = t.navigation;
      (e = a(e)), (s = a(s));
      const i = (e, s) => {
        e.removeEventListener("click", "next" === s ? c : d),
          e.classList.remove(...t.params.navigation.disabledClass.split(" "));
      };
      e.forEach((e) => i(e, "next")), s.forEach((e) => i(e, "prev"));
    }
    i("init", () => {
      !1 === t.params.navigation.enabled ? m() : (p(), o());
    }),
      i("toEdge fromEdge lock unlock", () => {
        o();
      }),
      i("destroy", () => {
        u();
      }),
      i("enable disable", () => {
        let { nextEl: e, prevEl: s } = t.navigation;
        (e = a(e)),
          (s = a(s)),
          t.enabled
            ? o()
            : [...e, ...s]
                .filter((e) => !!e)
                .forEach((e) => e.classList.add(t.params.navigation.lockClass));
      }),
      i("click", (e, s) => {
        let { nextEl: i, prevEl: n } = t.navigation;
        (i = a(i)), (n = a(n));
        const l = s.target;
        if (
          t.params.navigation.hideOnClick &&
          !n.includes(l) &&
          !i.includes(l)
        ) {
          if (
            t.pagination &&
            t.params.pagination &&
            t.params.pagination.clickable &&
            (t.pagination.el === l || t.pagination.el.contains(l))
          )
            return;
          let e;
          i.length
            ? (e = i[0].classList.contains(t.params.navigation.hiddenClass))
            : n.length &&
              (e = n[0].classList.contains(t.params.navigation.hiddenClass)),
            r(!0 === e ? "navigationShow" : "navigationHide"),
            [...i, ...n]
              .filter((e) => !!e)
              .forEach((e) =>
                e.classList.toggle(t.params.navigation.hiddenClass),
              );
        }
      });
    const m = () => {
      t.el.classList.add(
        ...t.params.navigation.navigationDisabledClass.split(" "),
      ),
        u();
    };
    Object.assign(t.navigation, {
      enable: () => {
        t.el.classList.remove(
          ...t.params.navigation.navigationDisabledClass.split(" "),
        ),
          p(),
          o();
      },
      disable: m,
      update: o,
      init: p,
      destroy: u,
    });
  }
  function Z(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!+\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  function ee(e) {
    let { swiper: t, extendParams: s, on: i, emit: r } = e;
    const a = "swiper-pagination";
    let n;
    s({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (e) => e,
        formatFractionTotal: (e) => e,
        bulletClass: `${a}-bullet`,
        bulletActiveClass: `${a}-bullet-active`,
        modifierClass: `${a}-`,
        currentClass: `${a}-current`,
        totalClass: `${a}-total`,
        hiddenClass: `${a}-hidden`,
        progressbarFillClass: `${a}-progressbar-fill`,
        progressbarOppositeClass: `${a}-progressbar-opposite`,
        clickableClass: `${a}-clickable`,
        lockClass: `${a}-lock`,
        horizontalClass: `${a}-horizontal`,
        verticalClass: `${a}-vertical`,
        paginationDisabledClass: `${a}-disabled`,
      },
    }),
      (t.pagination = { el: null, bullets: [] });
    let l = 0;
    const o = (e) => (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    function d() {
      return (
        !t.params.pagination.el ||
        !t.pagination.el ||
        (Array.isArray(t.pagination.el) && 0 === t.pagination.el.length)
      );
    }
    function c(e, s) {
      const { bulletActiveClass: i } = t.params.pagination;
      e &&
        (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
        (e.classList.add(`${i}-${s}`),
        (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
          e.classList.add(`${i}-${s}-${s}`));
    }
    function p(e) {
      const s = e.target.closest(Z(t.params.pagination.bulletClass));
      if (!s) return;
      e.preventDefault();
      const i = v(s) * t.params.slidesPerGroup;
      if (t.params.loop) {
        if (t.realIndex === i) return;
        t.slideToLoop(i);
      } else t.slideTo(i);
    }
    function u() {
      const e = t.rtl,
        s = t.params.pagination;
      if (d()) return;
      let i,
        a,
        p = t.pagination.el;
      p = o(p);
      const u =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.slides.length,
        m = t.params.loop
          ? Math.ceil(u / t.params.slidesPerGroup)
          : t.snapGrid.length;
      if (
        (t.params.loop
          ? ((a = t.previousRealIndex || 0),
            (i =
              t.params.slidesPerGroup > 1
                ? Math.floor(t.realIndex / t.params.slidesPerGroup)
                : t.realIndex))
          : void 0 !== t.snapIndex
            ? ((i = t.snapIndex), (a = t.previousSnapIndex))
            : ((a = t.previousIndex || 0), (i = t.activeIndex || 0)),
        "bullets" === s.type &&
          t.pagination.bullets &&
          t.pagination.bullets.length > 0)
      ) {
        const r = t.pagination.bullets;
        let o, d, u;
        if (
          (s.dynamicBullets &&
            ((n = b(r[0], t.isHorizontal() ? "width" : "height", !0)),
            p.forEach((e) => {
              e.style[t.isHorizontal() ? "width" : "height"] =
                n * (s.dynamicMainBullets + 4) + "px";
            }),
            s.dynamicMainBullets > 1 &&
              void 0 !== a &&
              ((l += i - (a || 0)),
              l > s.dynamicMainBullets - 1
                ? (l = s.dynamicMainBullets - 1)
                : l < 0 && (l = 0)),
            (o = Math.max(i - l, 0)),
            (d = o + (Math.min(r.length, s.dynamicMainBullets) - 1)),
            (u = (d + o) / 2)),
          r.forEach((e) => {
            const t = [
              ...[
                "",
                "-next",
                "-next-next",
                "-prev",
                "-prev-prev",
                "-main",
              ].map((e) => `${s.bulletActiveClass}${e}`),
            ]
              .map((e) =>
                "string" == typeof e && e.includes(" ") ? e.split(" ") : e,
              )
              .flat();
            e.classList.remove(...t);
          }),
          p.length > 1)
        )
          r.forEach((e) => {
            const r = v(e);
            r === i
              ? e.classList.add(...s.bulletActiveClass.split(" "))
              : t.isElement && e.setAttribute("part", "bullet"),
              s.dynamicBullets &&
                (r >= o &&
                  r <= d &&
                  e.classList.add(...`${s.bulletActiveClass}-main`.split(" ")),
                r === o && c(e, "prev"),
                r === d && c(e, "next"));
          });
        else {
          const e = r[i];
          if (
            (e && e.classList.add(...s.bulletActiveClass.split(" ")),
            t.isElement &&
              r.forEach((e, t) => {
                e.setAttribute("part", t === i ? "bullet-active" : "bullet");
              }),
            s.dynamicBullets)
          ) {
            const e = r[o],
              t = r[d];
            for (let e = o; e <= d; e += 1)
              r[e] &&
                r[e].classList.add(...`${s.bulletActiveClass}-main`.split(" "));
            c(e, "prev"), c(t, "next");
          }
        }
        if (s.dynamicBullets) {
          const i = Math.min(r.length, s.dynamicMainBullets + 4),
            a = (n * i - n) / 2 - u * n,
            l = e ? "right" : "left";
          r.forEach((e) => {
            e.style[t.isHorizontal() ? l : "top"] = `${a}px`;
          });
        }
      }
      p.forEach((e, a) => {
        if (
          ("fraction" === s.type &&
            (e.querySelectorAll(Z(s.currentClass)).forEach((e) => {
              e.textContent = s.formatFractionCurrent(i + 1);
            }),
            e.querySelectorAll(Z(s.totalClass)).forEach((e) => {
              e.textContent = s.formatFractionTotal(m);
            })),
          "progressbar" === s.type)
        ) {
          let r;
          r = s.progressbarOpposite
            ? t.isHorizontal()
              ? "vertical"
              : "horizontal"
            : t.isHorizontal()
              ? "horizontal"
              : "vertical";
          const a = (i + 1) / m;
          let n = 1,
            l = 1;
          "horizontal" === r ? (n = a) : (l = a),
            e.querySelectorAll(Z(s.progressbarFillClass)).forEach((e) => {
              (e.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${l})`),
                (e.style.transitionDuration = `${t.params.speed}ms`);
            });
        }
        "custom" === s.type && s.renderCustom
          ? ((e.innerHTML = s.renderCustom(t, i + 1, m)),
            0 === a && r("paginationRender", e))
          : (0 === a && r("paginationRender", e), r("paginationUpdate", e)),
          t.params.watchOverflow &&
            t.enabled &&
            e.classList[t.isLocked ? "add" : "remove"](s.lockClass);
      });
    }
    function m() {
      const e = t.params.pagination;
      if (d()) return;
      const s =
        t.virtual && t.params.virtual.enabled
          ? t.virtual.slides.length
          : t.grid && t.params.grid.rows > 1
            ? t.slides.length / Math.ceil(t.params.grid.rows)
            : t.slides.length;
      let i = t.pagination.el;
      i = o(i);
      let a = "";
      if ("bullets" === e.type) {
        let i = t.params.loop
          ? Math.ceil(s / t.params.slidesPerGroup)
          : t.snapGrid.length;
        t.params.freeMode && t.params.freeMode.enabled && i > s && (i = s);
        for (let s = 0; s < i; s += 1)
          e.renderBullet
            ? (a += e.renderBullet.call(t, s, e.bulletClass))
            : (a += `<${e.bulletElement} ${
                t.isElement ? 'part="bullet"' : ""
              } class="${e.bulletClass}"></${e.bulletElement}>`);
      }
      "fraction" === e.type &&
        (a = e.renderFraction
          ? e.renderFraction.call(t, e.currentClass, e.totalClass)
          : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
        "progressbar" === e.type &&
          (a = e.renderProgressbar
            ? e.renderProgressbar.call(t, e.progressbarFillClass)
            : `<span class="${e.progressbarFillClass}"></span>`),
        (t.pagination.bullets = []),
        i.forEach((s) => {
          "custom" !== e.type && (s.innerHTML = a || ""),
            "bullets" === e.type &&
              t.pagination.bullets.push(
                ...s.querySelectorAll(Z(e.bulletClass)),
              );
        }),
        "custom" !== e.type && r("paginationRender", i[0]);
    }
    function f() {
      t.params.pagination = J(
        t,
        t.originalParams.pagination,
        t.params.pagination,
        { el: "swiper-pagination" },
      );
      const e = t.params.pagination;
      if (!e.el) return;
      let s;
      "string" == typeof e.el && t.isElement && (s = t.el.querySelector(e.el)),
        s ||
          "string" != typeof e.el ||
          (s = [...document.querySelectorAll(e.el)]),
        s || (s = e.el),
        s &&
          0 !== s.length &&
          (t.params.uniqueNavElements &&
            "string" == typeof e.el &&
            Array.isArray(s) &&
            s.length > 1 &&
            ((s = [...t.el.querySelectorAll(e.el)]),
            s.length > 1 &&
              (s = s.filter((e) => w(e, ".swiper")[0] === t.el)[0])),
          Array.isArray(s) && 1 === s.length && (s = s[0]),
          Object.assign(t.pagination, { el: s }),
          (s = o(s)),
          s.forEach((s) => {
            "bullets" === e.type &&
              e.clickable &&
              s.classList.add(...(e.clickableClass || "").split(" ")),
              s.classList.add(e.modifierClass + e.type),
              s.classList.add(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass,
              ),
              "bullets" === e.type &&
                e.dynamicBullets &&
                (s.classList.add(`${e.modifierClass}${e.type}-dynamic`),
                (l = 0),
                e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
              "progressbar" === e.type &&
                e.progressbarOpposite &&
                s.classList.add(e.progressbarOppositeClass),
              e.clickable && s.addEventListener("click", p),
              t.enabled || s.classList.add(e.lockClass);
          }));
    }
    function h() {
      const e = t.params.pagination;
      if (d()) return;
      let s = t.pagination.el;
      s &&
        ((s = o(s)),
        s.forEach((s) => {
          s.classList.remove(e.hiddenClass),
            s.classList.remove(e.modifierClass + e.type),
            s.classList.remove(
              t.isHorizontal() ? e.horizontalClass : e.verticalClass,
            ),
            e.clickable &&
              (s.classList.remove(...(e.clickableClass || "").split(" ")),
              s.removeEventListener("click", p));
        })),
        t.pagination.bullets &&
          t.pagination.bullets.forEach((t) =>
            t.classList.remove(...e.bulletActiveClass.split(" ")),
          );
    }
    i("changeDirection", () => {
      if (!t.pagination || !t.pagination.el) return;
      const e = t.params.pagination;
      let { el: s } = t.pagination;
      (s = o(s)),
        s.forEach((s) => {
          s.classList.remove(e.horizontalClass, e.verticalClass),
            s.classList.add(
              t.isHorizontal() ? e.horizontalClass : e.verticalClass,
            );
        });
    }),
      i("init", () => {
        !1 === t.params.pagination.enabled ? g() : (f(), m(), u());
      }),
      i("activeIndexChange", () => {
        void 0 === t.snapIndex && u();
      }),
      i("snapIndexChange", () => {
        u();
      }),
      i("snapGridLengthChange", () => {
        m(), u();
      }),
      i("destroy", () => {
        h();
      }),
      i("enable disable", () => {
        let { el: e } = t.pagination;
        e &&
          ((e = o(e)),
          e.forEach((e) =>
            e.classList[t.enabled ? "remove" : "add"](
              t.params.pagination.lockClass,
            ),
          ));
      }),
      i("lock unlock", () => {
        u();
      }),
      i("click", (e, s) => {
        const i = s.target,
          a = o(t.pagination.el);
        if (
          t.params.pagination.el &&
          t.params.pagination.hideOnClick &&
          a &&
          a.length > 0 &&
          !i.classList.contains(t.params.pagination.bulletClass)
        ) {
          if (
            t.navigation &&
            ((t.navigation.nextEl && i === t.navigation.nextEl) ||
              (t.navigation.prevEl && i === t.navigation.prevEl))
          )
            return;
          const e = a[0].classList.contains(t.params.pagination.hiddenClass);
          r(!0 === e ? "paginationShow" : "paginationHide"),
            a.forEach((e) =>
              e.classList.toggle(t.params.pagination.hiddenClass),
            );
        }
      });
    const g = () => {
      t.el.classList.add(t.params.pagination.paginationDisabledClass);
      let { el: e } = t.pagination;
      e &&
        ((e = o(e)),
        e.forEach((e) =>
          e.classList.add(t.params.pagination.paginationDisabledClass),
        )),
        h();
    };
    Object.assign(t.pagination, {
      enable: () => {
        t.el.classList.remove(t.params.pagination.paginationDisabledClass);
        let { el: e } = t.pagination;
        e &&
          ((e = o(e)),
          e.forEach((e) =>
            e.classList.remove(t.params.pagination.paginationDisabledClass),
          )),
          f(),
          m(),
          u();
      },
      disable: g,
      render: m,
      update: u,
      init: f,
      destroy: h,
    });
  }
  function te(e) {
    let t,
      s,
      { swiper: r, extendParams: a, on: n, emit: l, params: o } = e;
    (r.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
      a({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !1,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1,
        },
      });
    let d,
      c,
      p,
      u,
      m,
      f,
      h,
      g,
      v = o && o.autoplay ? o.autoplay.delay : 3e3,
      w = o && o.autoplay ? o.autoplay.delay : 3e3,
      b = new Date().getTime();
    function y(e) {
      r &&
        !r.destroyed &&
        r.wrapperEl &&
        e.target === r.wrapperEl &&
        (r.wrapperEl.removeEventListener("transitionend", y), g || M());
    }
    const S = () => {
        if (r.destroyed || !r.autoplay.running) return;
        r.autoplay.paused ? (c = !0) : c && ((w = d), (c = !1));
        const e = r.autoplay.paused ? d : b + w - new Date().getTime();
        (r.autoplay.timeLeft = e),
          l("autoplayTimeLeft", e, e / v),
          (s = requestAnimationFrame(() => {
            S();
          }));
      },
      T = (e) => {
        if (r.destroyed || !r.autoplay.running) return;
        cancelAnimationFrame(s), S();
        let i = void 0 === e ? r.params.autoplay.delay : e;
        (v = r.params.autoplay.delay), (w = r.params.autoplay.delay);
        const a = (() => {
          let e;
          if (
            ((e =
              r.virtual && r.params.virtual.enabled
                ? r.slides.filter((e) =>
                    e.classList.contains("swiper-slide-active"),
                  )[0]
                : r.slides[r.activeIndex]),
            !e)
          )
            return;
          return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
        })();
        !Number.isNaN(a) &&
          a > 0 &&
          void 0 === e &&
          ((i = a), (v = a), (w = a)),
          (d = i);
        const n = r.params.speed,
          o = () => {
            r &&
              !r.destroyed &&
              (r.params.autoplay.reverseDirection
                ? !r.isBeginning || r.params.loop || r.params.rewind
                  ? (r.slidePrev(n, !0, !0), l("autoplay"))
                  : r.params.autoplay.stopOnLastSlide ||
                    (r.slideTo(r.slides.length - 1, n, !0, !0), l("autoplay"))
                : !r.isEnd || r.params.loop || r.params.rewind
                  ? (r.slideNext(n, !0, !0), l("autoplay"))
                  : r.params.autoplay.stopOnLastSlide ||
                    (r.slideTo(0, n, !0, !0), l("autoplay")),
              r.params.cssMode &&
                ((b = new Date().getTime()),
                requestAnimationFrame(() => {
                  T();
                })));
          };
        return (
          i > 0
            ? (clearTimeout(t),
              (t = setTimeout(() => {
                o();
              }, i)))
            : requestAnimationFrame(() => {
                o();
              }),
          i
        );
      },
      E = () => {
        (b = new Date().getTime()),
          (r.autoplay.running = !0),
          T(),
          l("autoplayStart");
      },
      x = () => {
        (r.autoplay.running = !1),
          clearTimeout(t),
          cancelAnimationFrame(s),
          l("autoplayStop");
      },
      C = (e, s) => {
        if (r.destroyed || !r.autoplay.running) return;
        clearTimeout(t), e || (h = !0);
        const i = () => {
          l("autoplayPause"),
            r.params.autoplay.waitForTransition
              ? r.wrapperEl.addEventListener("transitionend", y)
              : M();
        };
        if (((r.autoplay.paused = !0), s))
          return f && (d = r.params.autoplay.delay), (f = !1), void i();
        const a = d || r.params.autoplay.delay;
        (d = a - (new Date().getTime() - b)),
          (r.isEnd && d < 0 && !r.params.loop) || (d < 0 && (d = 0), i());
      },
      M = () => {
        (r.isEnd && d < 0 && !r.params.loop) ||
          r.destroyed ||
          !r.autoplay.running ||
          ((b = new Date().getTime()),
          h ? ((h = !1), T(d)) : T(),
          (r.autoplay.paused = !1),
          l("autoplayResume"));
      },
      L = () => {
        if (r.destroyed || !r.autoplay.running) return;
        const e = i();
        "hidden" === e.visibilityState && ((h = !0), C(!0)),
          "visible" === e.visibilityState && M();
      },
      P = (e) => {
        "mouse" === e.pointerType &&
          ((h = !0), (g = !0), r.animating || r.autoplay.paused || C(!0));
      },
      k = (e) => {
        "mouse" === e.pointerType && ((g = !1), r.autoplay.paused && M());
      };
    n("init", () => {
      r.params.autoplay.enabled &&
        (r.params.autoplay.pauseOnMouseEnter &&
          (r.el.addEventListener("pointerenter", P),
          r.el.addEventListener("pointerleave", k)),
        i().addEventListener("visibilitychange", L),
        E());
    }),
      n("destroy", () => {
        r.el.removeEventListener("pointerenter", P),
          r.el.removeEventListener("pointerleave", k),
          i().removeEventListener("visibilitychange", L),
          r.autoplay.running && x();
      }),
      n("_freeModeStaticRelease", () => {
        (u || h) && M();
      }),
      n("_freeModeNoMomentumRelease", () => {
        r.params.autoplay.disableOnInteraction ? x() : C(!0, !0);
      }),
      n("beforeTransitionStart", (e, t, s) => {
        !r.destroyed &&
          r.autoplay.running &&
          (s || !r.params.autoplay.disableOnInteraction ? C(!0, !0) : x());
      }),
      n("sliderFirstMove", () => {
        !r.destroyed &&
          r.autoplay.running &&
          (r.params.autoplay.disableOnInteraction
            ? x()
            : ((p = !0),
              (u = !1),
              (h = !1),
              (m = setTimeout(() => {
                (h = !0), (u = !0), C(!0);
              }, 200))));
      }),
      n("touchEnd", () => {
        if (!r.destroyed && r.autoplay.running && p) {
          if (
            (clearTimeout(m),
            clearTimeout(t),
            r.params.autoplay.disableOnInteraction)
          )
            return (u = !1), void (p = !1);
          u && r.params.cssMode && M(), (u = !1), (p = !1);
        }
      }),
      n("slideChange", () => {
        !r.destroyed && r.autoplay.running && (f = !0);
      }),
      Object.assign(r.autoplay, { start: E, stop: x, pause: C, resume: M });
  }
  function se() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)',
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  Object.keys(X).forEach((e) => {
    Object.keys(X[e]).forEach((t) => {
      K.prototype[t] = X[e][t];
    });
  }),
    K.use([
      function (e) {
        let { swiper: t, on: s, emit: i } = e;
        const r = a();
        let n = null,
          l = null;
        const o = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (i("beforeResize"), i("resize"));
          },
          d = () => {
            t && !t.destroyed && t.initialized && i("orientationchange");
          };
        s("init", () => {
          t.params.resizeObserver && void 0 !== r.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((n = new ResizeObserver((e) => {
                l = r.requestAnimationFrame(() => {
                  const { width: s, height: i } = t;
                  let r = s,
                    a = i;
                  e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: i, target: n } = e;
                    (n && n !== t.el) ||
                      ((r = i ? i.width : (s[0] || s).inlineSize),
                      (a = i ? i.height : (s[0] || s).blockSize));
                  }),
                    (r === s && a === i) || o();
                });
              })),
              n.observe(t.el))
            : (r.addEventListener("resize", o),
              r.addEventListener("orientationchange", d));
        }),
          s("destroy", () => {
            l && r.cancelAnimationFrame(l),
              n && n.unobserve && t.el && (n.unobserve(t.el), (n = null)),
              r.removeEventListener("resize", o),
              r.removeEventListener("orientationchange", d);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: r } = e;
        const n = [],
          l = a(),
          o = function (e, s) {
            void 0 === s && (s = {});
            const i = new (l.MutationObserver || l.WebkitMutationObserver)(
              (e) => {
                if (t.__preventObserver__) return;
                if (1 === e.length) return void r("observerUpdate", e[0]);
                const s = function () {
                  r("observerUpdate", e[0]);
                };
                l.requestAnimationFrame
                  ? l.requestAnimationFrame(s)
                  : l.setTimeout(s, 0);
              },
            );
            i.observe(e, {
              attributes: void 0 === s.attributes || s.attributes,
              childList: void 0 === s.childList || s.childList,
              characterData: void 0 === s.characterData || s.characterData,
            }),
              n.push(i);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = w(t.hostEl);
                for (let t = 0; t < e.length; t += 1) o(e[t]);
              }
              o(t.hostEl, { childList: t.params.observeSlideChildren }),
                o(t.wrapperEl, { attributes: !1 });
            }
          }),
          i("destroy", () => {
            n.forEach((e) => {
              e.disconnect();
            }),
              n.splice(0, n.length);
          });
      },
    ]),
    window.addEventListener("load", function (e) {
      se(),
        document.querySelector(".pricing__slider") &&
          new K(".pricing__slider", {
            modules: [Q, ee, te],
            effect: "cube",
            observer: !0,
            observeParents: !0,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            loop: !0,
            pagination: { el: ".slider-quality__pagging", clickable: !0 },
            navigation: {
              nextEl: ".about__more .more__item_next",
              prevEl: ".about__more .more__item_prev",
            },
            on: {},
          });
    });
  let ie = !1;
  setTimeout(() => {
    if (ie) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (() => {
      const e = {
        openModalBtn: document.querySelector("[data-modal-open]"),
        closeModalBtn: document.querySelector("[data-modal-close]"),
        modal: document.querySelector("[data-modal]"),
        form: document.querySelector(".contact__form"),
      };
      e.form.addEventListener("submit", (t) => {
        t.preventDefault();
        const s = e.form.querySelector("#e-mail").value;
        fetch("http://127.0.0.1:3000/app/mail/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: s }),
        })
          .then((e) => e.json())
          .then((t) => {
            console.log("Server response:", t.result),
              e.modal.classList.remove("is-hidden");
          })
          .catch((e) => {
            console.error("Error:", e);
          });
      }),
        e.closeModalBtn.addEventListener("click", function () {
          e.modal.classList.add("is-hidden");
        });
    })();
  const re = {
    "burger-button": document.querySelector(".burger-button"),
    "header__burger-menu": document.querySelector(".header__burger-menu"),
    nav__item: document.querySelectorAll(".nav__item"),
  };
  (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (() => {
      re["burger-button"]?.addEventListener("click", () => {
        const e = re["burger-button"]?.classList.contains("burger-button_open"),
          t = re["header__burger-menu"]?.classList.contains(
            "header__burger-menu_open",
          );
        e ||
          t ||
          (re["burger-button"]?.classList.add("burger-button_open"),
          re["header__burger-menu"]?.classList.add("header__burger-menu_open"),
          document.body.classList.add("block-scroll")),
          e &&
            (re["burger-button"]?.classList.remove("burger-button_open"),
            re["header__burger-menu"]?.classList.remove(
              "header__burger-menu_open",
            ),
            document.body.classList.remove("block-scroll"));
      });
      const e = () => {
        const e = 0.01 * window.innerHeight;
        document.documentElement.style.setProperty("--vh", `${e}px`);
      };
      window.addEventListener("resize", e),
        e(),
        re.nav__item.forEach((e) => {
          e.addEventListener("click", () => {
            (() => {
              const e =
                re["burger-button"]?.classList.contains("burger-button_open");
              e &&
                (re["burger-button"]?.classList.remove("burger-button_open"),
                re["header__burger-menu"]?.classList.remove(
                  "header__burger-menu_open",
                ),
                document.body.classList.remove("block-scroll"));
            })();
          });
        });
    })();
})();
