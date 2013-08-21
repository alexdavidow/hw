(function() {
  function a(a) {
    return function() {
      var c = function() {}, b = {};
      if (window.console) b = window.console, c = window.console[a] || window.console.info || c;
      else if (window.opera) b = window.opera, c = window.opera.postError || c;
      try {
        c.apply(b, arguments)
      } catch (h) {
        try {
          c(arguments.join(" "))
        } catch (e) {}
      }
    }
  }

  function b(a) {
    function c() {
      b._releaseActive()
    }
    var b = this;
    a = a || {};
    this._win = a.window || window;
    this._doc = a.document || this._win.document;
    this._prefixes = ["webkit", "moz", "ms", "o"];
    this._localStorage = a.localStorage || this._win.localStorage;
    this._idStorageKey = a.idStorageKey || "_BrowserTabIDStorageKey";
    this._id = ("" + Math.random() + Math.random()).replace(/\./g, "");
    this._listen(this._win, "unload", c);
    this._listen(this._win, "beforeunload", c);
    this._supportsVisibility() ? this._initializeWithVisibility() : this._initializeWithBlurring();
    (!this.hidden() || !this._anyTabsActive()) && this._makeActive()
  }
  olark._.P("application");
  olark("api.chat.onBeginConversation", function() {
    olark._.hlog("started chatting #begin_conversation")
  });
  var d = /^\s*(__Extension0\..+|__ChatApiHelper|__BoxApiHelper|[A-Z]\w+)\s*$/,
    c = /^\s*(api|box|browser|chat|data|extensions|system|olark|.*olark.*)\s*$/,
    g = {
      GoogleAnalytics: null,
      VisitorInsight: null,
      VisitorImportance: null,
      Mixpanel: null,
      OfflineWarning: null,
      EndConversation: null
    }, i = "bf177f47611e55d4707c4d9942b696e0";
  i = "bf177f47611e55d4707c4d9942b696e0";
  var k = {
    Shopify: "3a36a58c72d4661d9a9ac484606f012e",
    WelcomeAssist: i,
    CalloutBubble: "423092e252ccbf364ff4b006e43a1b3b",
    WelcomeAssist: i,
    OfflineWarning: "a019e45d1183d9dd0d80ab0b3c283982",
    Cobrowse: "f06d866d2e973c62cf196ca6cc010eac"
  }, j = /.*YOUR-SITE-ID-HERE.*/;
  olark.extend("VisitorInsight");
  olark.extend("VisitorImportance");
  olark.extend("Mixpanel");
  olark.extend("OfflineWarning");
  olark.extend("EndConversation");
  window.olark.__buildinfo = window.olark.__buildinfo || {
    olarkfile: "/javascript/olark.js",
    corefile: "/javascript/application.js",
    jshost: window.olark.__version ? "static.olark.com" : "olarkdev:8001",
    dev: !0
  };
  var f;
  if (window.olark.__buildinfo.dev) f = {
    log: a("log"),
    info: a("info"),
    warn: a("warn"),
    error: a("error"),
    debug: a("debug"),
    showErrorBacktrace: a("error")
  };
  else {
    f = {
      log: function() {},
      info: function() {},
      warn: a("warn"),
      error: a("error"),
      debug: function() {},
      showErrorBacktrace: function() {}
    };
    var n = f.error,
      t = f.warn;
    f.error = function() {
      try {
        var a = Array.prototype.slice.call(arguments || []);
        olark._.hlog(a.join(" "), "#error")
      } catch (c) {}
      try {
        n.apply(f, arguments)
      } catch (b) {}
    };
    f.warn = function() {
      try {
        var a = Array.prototype.slice.call(arguments || []);
        olark._.hlog(a.join(" "), "#warn")
      } catch (c) {}
      try {
        t.apply(f, arguments)
      } catch (b) {}
    }
  }
  window.olark.__legacy_shim = window.olark.__legacy_shim || {};
  document.hbl_ssl = /.*https:.*/.test(document.location.protocol) ? !0 : !1;
  var o = function(a, c, b) {
    a.addEventListener ? a.addEventListener(c, b, !1) : a.attachEvent ? a.attachEvent("on" + c, b) : a["on" + c] = b
  };
  (function(a) {
    a.active = function() {
      if (arguments.length > 0) throw Error("'active' property is not settable");
      this._localStorage || window.console && window.console.warn && window.console.warn("localStorage is required to use the active() property");
      return this._localStorage.getItem(this._idStorageKey) === this._id
    };
    a.hidden =
      function() {
        if (arguments.length > 0) throw Error("'hidden' property is not settable");
        return this._supportsVisibility() ? this._getProperty(this._doc, "hidden") : this._blurred
    };
    a.on = function(a, c) {
      a = a.split(/\s+/);
      for (var b = 0; b < a.length; b++) {
        var h = a[b];
        switch (h) {
          case "change:hidden":
            this._listenForVisibilityChange(c);
            break;
          case "change:active":
            this._listenForActiveChange(c);
            break;
          default:
            throw Error("invalid event '" + h + "'");
        }
      }
    };
    a._getProperty = function(a, c) {
      var b = c.charAt(0).toString().toUpperCase() + c.slice(1);
      if (c in a) return a[c];
      else {
        var h;
        this._eachBrowserPrefix(function(c) {
          c += b;
          c in a && (h = a[c])
        });
        return h
      }
    };
    a._supportsVisibility = function() {
      return this._getProperty(this._doc, "visibilityState") !== "undefined"
    };
    a._eachBrowserPrefix = function(a) {
      for (var c = 0; c < this._prefixes.length; c++) a(this._prefixes[c])
    };
    a._listen = function(a, c, b) {
      a.addEventListener ? a.addEventListener(c, b, !1) : a.attachEvent ? a.attachEvent("on" + c, b) : a["on" + c] = b
    };
    a._listenForVisibilityChange = function(a) {
      var c = this;
      this._listen(this._doc, "visibilitychange",
        a);
      this._eachBrowserPrefix(function(b) {
        c._listen(c._doc, b + "visibilitychange", a)
      });
      this._blurChangeCallbacks && this._blurChangeCallbacks.push(a)
    };
    a._listenForActiveChange = function(a) {
      var c = this;
      this._localStorage && this._listen(this._win, "storage", function(b) {
        b = b || window.event;
        b.key === c._idStorageKey && a()
      })
    };
    a._makeActive = function() {
      this._localStorage && this._localStorage.setItem(this._idStorageKey, this._id)
    };
    a._releaseActive = function() {
      this._localStorage && this._localStorage.getItem(this._idStorageKey) ===
        this._id && this._localStorage.removeItem(this._idStorageKey)
    };
    a._anyTabsActive = function() {
      return this._localStorage ? this._localStorage.getItem(this._idStorageKey) !== "undefined" : !1
    };
    a._initializeWithVisibility = function() {
      function a() {
        c._blurred = c.hidden();
        c.hidden() || c._makeActive()
      }
      var c = this;
      this._blurred = this.hidden();
      this._uncertain = !1;
      a();
      this._listenForVisibilityChange(a)
    };
    a._initializeWithBlurring = function() {
      function a() {
        for (var c = 0; c < blurChangeCallbacks.length; c++) setTimeout(blurChangeCallbacks[c],
          0)
      }

      function c() {
        h._blurred = !0;
        h._uncertain = !1;
        a()
      }

      function b() {
        h._blurred = !1;
        h._uncertain = !1;
        h._makeActive();
        a()
      }
      var h = this;
      this._blurred = !1;
      this._uncertain = !0;
      this._blurChangeCallbacks = blurChangeCallbacks = [];
      this._listen(this._doc, "focusin", b);
      this._listen(this._doc, "focusout", c);
      this._listen(this._win, "focus", b);
      this._listen(this._win, "blur", c);
      this._listen(this._doc, "scroll", b);
      this._listen(this._doc, "keydown", b);
      this._listen(this._doc, "mousemove", b);
      this._listen(this._doc, "select", b);
      this._listen(this._win,
        "scroll", b);
      this._listen(this._win, "keydown", b);
      this._listen(this._win, "mousemove", b);
      this._listen(this._win, "select", b);
      this._listenForActiveChange(function() {
        h.active() || c()
      })
    }
  })(b.prototype);
  var p = null,
    s = null;
  (function() {
    var a = {};
    p = function(c) {
      var b = c.namespace,
        h = c.type;
      c = c.callback;
      if (!b) throw Error("[olark] namespace required");
      if (!h) throw Error("[olark] type required");
      if (!c) throw Error("[olark] callback required");
      a[b] = a[b] || {};
      a[b][h] = a[b][h] || [];
      a[b][h].push(c)
    };
    s = function(c) {
      var b = c.namespace,
        h = c.type,
        e = c.after || null;
      if (!b) throw Error("[olark] namespace required");
      if (!h) throw Error("[olark] type required");
      try {
        c.namespace = void 0, c.type = void 0, delete c.namespace, delete c.type, delete c.after
      } catch (l) {}
      a[b] = a[b] || {};
      for (var g = a[b][h] || [], i = 0; i < g.length;) {
        var n = g[i++];
        n && w(function() {
          n(c)
        }, function(a) {
          f.error("[olark] event handler for '" + b + "." + h + "' failed: " + a.toString());
          f.showErrorBacktrace(a)
        })
      }
      e && e()
    }
  })();
  var r = null,
    e = null,
    m = null,
    h = null,
    l = null,
    q = null,
    v = null,
    z = null,
    x = null,
    y = null,
    w = null;
  (function() {
    var a = [];
    l = function(c, b) {
      var h = setTimeout(b, c.delay);
      a.push(h);
      return h
    };
    r = function(a) {
      var c = !1;
      return function() {
        if (!c) return c = !0, a.apply(a, arguments)
      }
    };
    e = function(a) {
      for (var c = a.length, b = "\n"; c--;) {
        var h = a[c];
        b += c === 0 ? "- " + h : "- " + h + "\n"
      }
      return b
    };
    x = function(a) {
      var c = a.url;
      if (typeof c != "string") throw Error("[olark] string 'url' is required");
      a = c.indexOf("http://") != -1;
      var b = c.indexOf("https://") != -1;
      c = c.split("/")[0].indexOf(".") !== 0;
      return !a && !b && !c
    };
    var c = {};
    m = function(a) {
      var b = a.url;
      if (typeof b != "string") throw Error("[olark] string 'url' is required");
      var h = "https:" == document.location.protocol ? !0 : !1;
      a = b.indexOf("http://") == -1 ? !1 : !0;
      var e = b.indexOf("https://") == -1 ? !1 : !0,
        l = a || e;
      a = null;
      a = x({
        url: b
      }) ? b : l ? b : (h ? "https://" : "http://") + b;
      h && l && !e && f.warn("[olark] you cannot load from ", a, " when you are on an SSL page, you will probably get mixed-content warnings");
      if (!c[a]) c[a] = !0, b = document.createElement("script"), h = document.getElementsByTagName("script")[0], b.setAttribute("async", ""),
      b.setAttribute("defer", "true"), b.src = a, h.parentNode.insertBefore(b, h)
    };
    h = function(a, c) {
      var b = !1,
        h = function() {
          a() ? b || (b = !0, c()) : b || l({
            delay: 50
          }, h)
        };
      h()
    };
    q = function(a) {
      if (a === null || typeof a != "object") return a;
      var c = a.constructor(),
        b;
      for (b in a) a.hasOwnProperty(b) && (c[b] = q(a[b]));
      return c
    };
    v = function(a, c) {
      if (a == c || typeof a == "number" && typeof c == "number" && isNaN(a) && isNaN(c)) return !0;
      else if (typeof a == "object" && typeof c == "object" && a !== null && c !== null) {
        for (var b in a)
          if (!v(a[b], c[b])) return !1;
        for (var h in c)
          if (!v(a[h],
            c[h])) return !1;
        return !0
      } else return !1
    };
    z = function(a) {
      return a.replace(/\s+$/, "").replace(/^\s+/, "")
    };
    y = function(a) {
      if (typeof a.list == "undefined") throw Error("[olark] 'list' required");
      if (typeof a.separator == "undefined") throw Error("[olark] 'separator' required");
      var c = a.list;
      a = a.separator;
      for (var b = !0, h = "", e = 0; e < c.length; e++) {
        var f = c[e];
        b ? (b = !1, h += f) : h += a + f
      }
      return h
    };
    w = function(a, c) {
      if (window.olark.__buildinfo.strict) return a();
      else try {
        return a()
      } catch (b) {
        return c(b)
      }
    }
  })();
  var u = function(a, c) {
    var b =
      window[a];
    if (!b) throw Error("[lightloader] stub library not defined: " + a);
    var h = b.__lightload,
      e = {
        publicMethods: {}
      }, f = [],
      l = [];
    e.getLightloaderVersion = function() {
      return h.V
    };
    e.isDocumentReady = function() {
      return h.A || 0
    };
    e.isWindowLoaded = function() {
      return h.B || 0
    };
    e.whenDocumentReady = function(a) {
      e.isDocumentReady() ? a() : f.push(a)
    };
    e.whenWindowLoaded = function(a) {
      e.isWindowLoaded() ? a() : l.push(a)
    };
    e.reloadLibrary = function() {
      h.D = [];
      h.l()
    };
    var g = function(a) {
      for (var c = a.length > 0 ? a.shift() : void 0; c;) c(), c = a.shift()
    };
    h.a = function() {
      h.A = !0;
      g(f)
    };
    h.b = function() {
      h.B = !0;
      g(l)
    };
    c(b, e);
    olark.extend = e.publicMethods.extend;
    olark.declare = e.publicMethods.declare;
    olark.configure = e.publicMethods.configure;
    olark.ready = e.publicMethods.ready;
    (function() {
      var a = h.D;
      a.reverse();
      for (var c = a.length; c-- > 0;) {
        var e = a[c],
          f = e[0];
        e = e[1];
        var l = b[f];
        l ? l.apply(b, e) : window.console && window.console.error && window.console.error("[lightloader] missing method '" + f + "'")
      }
      a.reverse()
    })()
  }, B = function(a, c) {
      function b() {
        for (var a = h.callstack, c, i, n, q,
            j; a.length;)
          if ((c = a.shift()) && c.length) try {
            if (n = Array.prototype.slice.call(c || []), i = n.length ? n.shift() : void 0, j = /api\.[a-zA-Z]+\.(__SPI_)?[a-zA-Z]+/.test(i), i == "debug")(function() {
              var a = document.createElement("script");
              a.src = "https://static.olark.com/record.js";
              document.getElementsByTagName("head")[0].appendChild(a)
            })();
            else if (j) {
              var d;
              a: switch (i) {
                case "api.chat.getVisitorNickname":
                case "api.chat.getVisitorStatus":
                case "api.chat.operatorsAreAvailable":
                case "api.chat.operatorsAreBusy":
                case "api.chat.operatorsAreAway":
                case "api.chat.onNotificationToVisitor":
                case "api.chat.getVisitorNickname":
                case "api.chat.getVisitorNickname":
                  d = !0;
                  break a;
                default:
                  d = !1
              }
              d ? f.warn("[olark] the API call '" + i + "' is deprecated") : (l.push([i, n]), g())
            } else e.publicMethods.hasOwnProperty(i) ? (q = e.publicMethods[i], q.apply(q, n)) : f.warn("[olark] unknown method 'olark." + i + "'")
          } catch (k) {
            f.error("[olark] unknown exception in dequeueCallbacks: method: " + i + " ", k.message)
          } else f.warn("[olark] empty method call in dequeueCallbacks #empty_dequeue_call")
      }
      var h = olark._,
        e = {
          publicMethods: {}
        };
      e.getLightloaderVersion = function() {
        return h.v
      };
      e.whenDocumentReady = function(a) {
        a()
      };
      e.reloadLibrary = function() {
        olark = olark._ = null;
        h.i()
      };
      var l = [],
        g = function() {};
      olark.extend(function(a) {
        g = function() {
          for (var c; l.length;) {
            c = l.shift();
            var b = c[0];
            c = c[1];
            var h = b.split("."),
              e = h[1];
            h = h[2];
            if (a[e] && a[e][h]) try {
              a[e][h].apply(a[e], c)
            } catch (g) {
              f.error(g.toString())
            } else f.warn("[olark] unknown API call '" + b + "'")
          }
        };
        l.length > 0 && g()
      });
      c(olark, e);
      e.publicMethods.call = function(a, c) {
        var b = e.publicMethods[a];
        b ? b.apply(b, c) : f.warn("[olark] unknown method 'olark." + a + "'")
      };
      olark._.s = {
        push: function(a) {
          h.callstack.push(a);
          b()
        }
      };
      b()
    };
  (function() {
    var a = window.olark;
    if (a.__v) {
      f.warn("[olark] you are using an old version of the Olark Code on your page, please check your dashboard to get the new code.");
      var c = olark.__v[0],
        b = olark.__v[1],
        h = olark.__v[2],
        e = olark.__v[3],
        l;
      for (l in c) typeof c[l] != "function" && a.configure.apply(a, c[l]);
      for (var g in b) typeof b[g] != "function" && a.extend.apply(a, b[g]);
      for (var i in h) typeof h[i] != "function" && a.declare.apply(a, h[i]);
      for (var n in e) typeof e[n] != "function" && a.ready.apply(a, e[n]);
      a.__lightload.A = !0
    }
  })();
  (function(a, c) {
    olark._ ? B(a, c) : u(a, c)
  })("olark", function(a, i) {
      var n = function(a) {
        this.__name = a.name;
        this.__startup = a.startup;
        if (typeof this.__name == "undefined") throw Error("[olark] 'name' required");
        if (typeof this.__startup == "undefined") throw Error("[olark] 'startup' required");
        this.__version = a.version || null;
        this.__source = a.source || null
      };
      (function(c) {
        c.get_name = function() {
          return this.__name
        };
        c.get_version = function() {
          return this.__version
        };
        c.get_source = function() {
          return this.__source
        };
        c.get_pretty_string =
          function() {
            var a = this.__name;
            this.__version && this.__source ? a += " (version " + this.__version + ", from " + this.__source + ")" : this.__version && (a += " (version " + this.__version + ")");
            return a
        };
        c.activate = function(c) {
          c = c.configuration;
          if (typeof c == "undefined") throw Error("[olark] 'configuration' required");
          var b = /__.+/.test(this.__name) ? "__inline" : this.__name;
          c[b] && c[b].enabled === !1 || (this.__startup(new a.__core.api.ApiInstance({
            conf: c,
            namespace: b,
            extension_name: this.__name
          }), c), s({
            namespace: "Extension",
            type: "extensionActivated"
          }))
        }
      })(n.prototype);
      var C = function(a) {
        this.__name = a.name;
        if (typeof this.__name == "undefined") throw Error("[olark] 'name' required");
        this.__version = a.version || null;
        this.__source = a.source || t.get_instance().get_expected_source_for_extension({
          name: this.__name
        })
      };
      (function(a) {
        a.get_name = function() {
          return this.__name
        };
        a.get_version = function() {
          return this.__version
        };
        a.get_source = function() {
          return this.__source
        };
        a.get_pretty_string = function() {
          return this.__name && this.__version && this.__source ? this.__name + " (version " + this.__version +
            ", from " + this.__source + ")" : this.__name && this.__version ? this.__name + " (version " + this.__version + ")" : this.__name && this.__source ? this.__name + " (from " + this.__source + ")" : this.__name
        };
        a.begin_download = function() {
          this.__source && m({
            url: this.__source
          })
        };
        a.is_downloaded = function() {
          return t.get_instance().search_for_extension({
            extension_spec: this
          }).length > 0 ? !0 : !1
        };
        a.when_downloaded = function(a) {
          var c = this,
            b = !1,
            h = function() {
              c.is_downloaded() && !b && (b = !0, a())
            };
          h();
          p({
            namespace: "ExtensionManager",
            type: "registeredExtension",
            callback: h
          })
        }
      })(C.prototype);
      var t = function() {
        this.__extension_specs = [];
        this.__extension_specs_by_name = {};
        this.__extensions_by_name = {};
        this.__extensions_by_source = {};
        this.__extensions_by_name_and_version = {};
        this.__extensions_by_name_and_source = {};
        this.__extensions_by_name_and_version_and_source = {}
      };
      (function(b) {
        var h = null;
        t.get_instance = function() {
          return h = h || new t
        };
        var e = 0;
        t.get_next_extension_name = function() {
          e += 1;
          return "__Extension0." + e
        };
        b.__lazy_load_data_structures = function(a) {
          var c = a.name,
            b =
              a.version;
          a = a.source;
          this.__extensions_by_name[c] = this.__extensions_by_name[c] || [];
          this.__extensions_by_source[a] = this.__extensions_by_name[a] || [];
          this.__extensions_by_name_and_version[c] = this.__extensions_by_name_and_version[c] || {};
          this.__extensions_by_name_and_version[c][b] = this.__extensions_by_name_and_version[c][b] || [];
          this.__extensions_by_name_and_source[c] = this.__extensions_by_name_and_source[c] || {};
          this.__extensions_by_name_and_source[c][a] = this.__extensions_by_name_and_source[c][a] || [];
          this.__extensions_by_name_and_version_and_source[c] =
            this.__extensions_by_name_and_version_and_source[c] || {};
          this.__extensions_by_name_and_version_and_source[c][b] = this.__extensions_by_name_and_version_and_source[c][b] || {};
          this.__extensions_by_name_and_version_and_source[c][b][a] = this.__extensions_by_name_and_version_and_source[c][b][a] || []
        };
        b.get_expected_source_for_extension = function(b) {
          if (typeof b.name == "undefined") throw Error("[olark] 'name' required for extension source lookup");
          b = b.name;
          var h = d.test(b) ? !1 : !0;
          h = (h = h || c.test(b.toLowerCase())) ||
            /.*_.*/.test(b);
          if (typeof g[b] != "undefined") return g[b];
          else if (h) return null;
          else {
            h = "";
            for (var e = 0; e < b.length; e++) {
              var f = b[e] || b.slice(e, e + 1);
              /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/.test(f) ? (h.length > 0 && (h += "-"), h += f.toLowerCase()) : h += f
            }
            return (a._ && a._.plugins ? a._.plugins : window.olark.__buildinfo.jshost + "/javascript/plugins") + "/" + h + ".js?v=" + (k[b] || "1")
          }
        };
        b.register_declared_extension = function(a) {
          a = a.extension;
          if (typeof a == "undefined") throw Error("[olark] 'extension' required");
          var c = a.get_name(),
            b = a.get_version(),
            h = a.get_source();
          h && x({
            url: h
          }) && (h = null);
          this.__lazy_load_data_structures({
            name: c,
            version: b,
            source: h
          });
          this.__extensions_by_name[c].push(a);
          this.__extensions_by_source[h].push(a);
          this.__extensions_by_name_and_version[c][b].push(a);
          this.__extensions_by_name_and_source[c][h].push(a);
          this.__extensions_by_name_and_version_and_source[c][b][h].push(a);
          s({
            namespace: "ExtensionManager",
            type: "registeredExtension"
          })
        };
        b.for_each_extension_spec = function(a) {
          for (var c = this.__extension_specs.length, b = this.__extension_specs,
              h = 0; h < c;)(function(c) {
            w(function() {
              a(c, b)
            }, function(a) {
              f.error("[olark] error while iterating over required extension spec:", c, "error was: " + a.toString());
              f.showErrorBacktrace(a)
            })
          })(this.__extension_specs[h]), h++
        };
        b.register_extension_spec = function(a) {
          a = a.extension_spec;
          if (typeof a == "undefined") throw Error("[olark] 'extension_spec' required");
          var c = a.get_name(),
            b = a.get_version(),
            h = a.get_source();
          h && x({
            url: h
          }) && (h = null);
          var e = this.__extension_specs_by_name[c];
          if (!(e && e.get_source() === a.get_source())) {
            if (e) {
              var l =
                e.get_version(),
                g = e.get_source();
              b && h && l && g ? (b != l || h != g) && f.warn("[olark] conflicting extensions:", a.get_pretty_string(), "and", e.get_pretty_string()) : b && l ? b != l && f.warn("[olark] conflicting extensions:", a.get_pretty_string(), "and", e.get_pretty_string()) : h && g && h != g && f.warn("[olark] conflicting extensions:", a.get_pretty_string(), "and", e.get_pretty_string())
            }
            a.begin_download();
            this.__extension_specs.unshift(a);
            this.__extension_specs_by_name[c] = a;
            s({
              namespace: "ExtensionManager",
              type: "registeredExtensionSpec"
            })
          }
        };
        b.search_for_extension = function(a) {
          var c = a.name,
            b = a.version,
            h = a.source;
          if (a = a.extension_spec) c = a.get_name(), b = a.get_version(), h = a.get_source();
          h && x({
            url: h
          });
          h = null;
          this.__lazy_load_data_structures({
            name: c,
            version: b,
            source: h
          });
          if (c && b && h) return this.__extensions_by_name_and_version_and_source[c][b][h];
          else if (c && b) return this.__extensions_by_name_and_version[c][b];
          else if (c && h) return this.__extensions_by_name_and_source[c][h];
          else if (b && h) throw Error("[olark] cannot search by version and source");
          else if (c) return this.__extensions_by_name[c];
          else if (h) return this.__extensions_by_source[h];
          else if (b) throw Error("[olark] cannot search by version");
          else throw Error("[olark] missing search criteria");
        }
      })(t.prototype);
      var u = function() {
        var a = this;
        a.__configuration_callbacks = [];
        p({
          namespace: "ExtensionManager",
          type: "registeredExtensionSpec",
          callback: function() {
            a.__check_for_olark_key()
          }
        })
      };
      (function(c) {
        function b(c) {
          var h, e, f = a._ ? a._.defaults : null;
          if (f)
            for (h in f)
              if (f.hasOwnProperty(h))
                for (e in c[h] ||
                  (c[h] = {}), f[h]) f[h].hasOwnProperty(e) && (c[h][e] = f[h][e]);
          return c
        }
        var h = null;
        u.get_instance = function() {
          return h = h || new u
        };
        c.register_configure_callback = function(a) {
          a = a.callback;
          if (typeof a == "undefined") throw Error("[olark] 'callback' required");
          this.__configuration_callbacks.push(a);
          this.__check_for_olark_key()
        };
        c.read_configuration = function() {
          var a = this.__read_configuration({
            ignore_errors: !1
          });
          a.system.olark_key = this.get_olark_key();
          return a
        };
        c.get_olark_key = function() {
          var a = this.__read_configuration({
            ignore_errors: !0
          });
          if (a.chat.legacy_site_id) a.system.legacy_site_id = a.system.legacy_site_id || a.chat.legacy_site_id, f.warn("[olark] conf.chat.legacy_site_id is deprecated, please use conf.system.legacy_site_id instead");
          var c = this.__parse_olark_site_id_from_dom();
          if (a = a.system.site_id || a.system.olark_key || a.system.legacy_site_id || window.olark.__k || c) a = a.replace(/^\s*/, "").replace(/\s*$/, ""), j.test(a) && (a = "0000-0000-0000-0000");
          return a
        };
        c.__parse_olark_site_id_from_dom = function() {
          var a = document.getElementById("olark-key");
          if (a && a.className) return z(a.className.replace("site-", ""));
          else
            for (var c in a = document.getElementsByTagName("a"), a)
              if (typeof a[c] != "function") {
                var b = a[c];
                if (b && b.className == "olark-key") return b.style.display = "none", b.id.replace("olark-", "")
              } return null
        };
        c.__read_configuration = function(a) {
          a = a || {};
          a = a.ignore_errors ? !0 : !1;
          var c = {
            box: {},
            chat: {},
            data: {},
            browser: {},
            extensions: {},
            system: {},
            locale: {}
          };
          c = b(c);
          t.get_instance().for_each_extension_spec(function(a) {
            c[a.get_name()] = c[a.get_name()] || {}
          });
          for (var h =
            0; h < this.__configuration_callbacks.length;) {
            if (typeof this.__configuration_callbacks[h] == "function") {
              var e = this.__configuration_callbacks[h];
              if (a) try {
                e(c)
              } catch (l) {} else w(function() {
                e(c)
              }, function(a) {
                f.error("[olark] error with your configuration, overall configuration may be incomplete now: " + a.toString());
                f.showErrorBacktrace(a)
              })
            }
            h++
          }
          return c
        };
        c.__check_for_olark_key = function() {
          this.get_olark_key() && s({
            namespace: "ConfigurationManager",
            type: "olarkKeyAvailable"
          })
        }
      })(u.prototype);
      var B = function(a) {
        if (a.length <
          6) throw Error("[olark] extensions cannot be named '" + a + "', names must be more than 6 letters long");
        if (d.test(a)) {
          if (c.test(a.toLowerCase())) throw Error("[olark] extensions cannot be named '" + a + "', that name is protected for internal use");
        } else throw Error("[olark] extensions cannot be named '" + a + "', names must start with a capital alphabetic letter and contain only alpha characters");
      }, L = function(a) {
          var c = !1,
            b = function() {
              var b = !0;
              t.get_instance().for_each_extension_spec(function(a) {
                a.is_downloaded() ||
                  (b = !1)
              });
              b && !c && (c = !0, a())
            };
          b();
          p({
            namespace: "ExtensionManager",
            type: "registeredExtension",
            callback: b
          });
          l({
            delay: 6E3
          }, function() {
            if (!c) {
              c = !0;
              a();
              var b = [];
              t.get_instance().for_each_extension_spec(function(a) {
                a.is_downloaded() || b.push(a.get_pretty_string())
              });
              f.warn("[olark] unable to download some extensions:", b.join(","))
            }
          })
        }, I = function(a) {
          var c = !1;
          h(function() {
            return window.olark && window.olark.__core && window.olark.__core.api && window.olark.__core.box && window.olark.__core.chat && window.olark.__core.data &&
              window.olark.__core.extensions && window.olark.__core.framestorewithjson && window.olark.__legacy_shim && window.olark.__legacy_shim.legacy_stub_is_loaded && window.olark.__legacy_shim.legacy_post_stub_is_loaded
          }, function() {
            c || (c = !0, a())
          });
          l({
            delay: 5E3
          }, function() {
            c || (c = !0, a(), f.warn("[olark] unable to download core libraries."))
          })
        }, S = function(a) {
          var c = {};
          t.get_instance().for_each_extension_spec(function(b, h) {
            var l = t.get_instance().search_for_extension({
              extension_spec: b
            }),
              g = null;
            if (l.length === 0) f.error("[olark] no loaded extensions matched:" +
              b.get_pretty_string(), h);
            else if (l.length == 1) g = l[0];
            else {
              g = l[0];
              l = l.slice(1);
              for (var i = [], n = l.length; n--;) {
                var q = l[n].get_pretty_string();
                i.push(q)
              }
              f.warn("[olark] more than one extension matched for " + b.get_pretty_string(), ", so we used the first one:", g.get_pretty_string(), "\nYou might want to be more specific. These extensions were also found:", e(i))
            }(l = c[b.get_name()]) ? f.warn("[olark] we already loaded an extension by the name of " + b.get_name(), "(", l.get_pretty_string(), ")", h) : g && (g.activate({
                configuration: a
              }),
              c[b.get_name()] = g)
          });
          s({
            namespace: "core",
            type: "extensionsActivated"
          })
        }, E = function() {
          i.publicMethods.extend = function(a) {
            f.warn("[olark] you cannot do olark.extend() once Olark is already starting up (dropping extension:" + a + ")")
          };
          i.publicMethods.configure = function() {
            f.warn("[olark] you cannot do olark.configure() once Olark is already starting up.")
          }
        }, P = function(a) {
          var c = u.get_instance().get_olark_key();
          a = r(a);
          c ? a() : p({
            namespace: "ConfigurationManager",
            type: "olarkKeyAvailable",
            callback: a
          })
        }, Q = function(a) {
          if (/Chrome/.test(navigator.userAgent)) a.chat.onReady(function() {
            try {
              for (var a =
                document.styleSheets, c = a.length - 1; c >= 0; c--) {
                var b = a[c].cssRules;
                if (b) {
                  var h = b[0],
                    e = h.selectorText;
                  h.selectorText = "#olark-workaround";
                  h.selectorText = e;
                  break
                }
              }
            } catch (l) {
              f.warn("[olark] Chrome stylesheet workaround not active")
            }
          })
        }, X = function(c, b) {
          a._.opm.install(["olark-targeting-plugin"], function(h, e) {
            if (h) f.warn("[olark] unable to install 'olark-targeting-plugin' due to", h);
            else {
              try {
                e("olark-targeting-plugin").activate(a, b)
              } catch (l) {
                f.warn("[olark] unable to activate plugin 'olark-targeting-plugin'"),
                f.error(l)
              }
              T(c, b)
            }
          })
        }, T = function(c, b) {
          Q(c);
          if (b.system.force_ssl) window.hbl_ext = "https", window.hblStaticPath = window.hblStaticPath.replace("http:", "https:"), window.hblPostURL = window.hblPostURL.replace("http:", "https:");
          var h = b.system.deferred_chat_connection !== !0 || c.chat.__SPI_hasConnectedAlready();
          a._.preventBoot != !0 && h && b.system.disable_event_connection !== !0 && c.chat.connect()
        }, W = function() {
          var a = document.getElementsByTagName("head")[0],
            c = document.createElement("style");
          c.type = "text/css";
          c.styleSheet ?
            c.styleSheet.cssText = "@media print {#habla_beta_container_do_not_rely_on_div_classes_or_names {display: none !important}}" : c.appendChild(document.createTextNode("@media print {#habla_beta_container_do_not_rely_on_div_classes_or_names {display: none !important}}"));
          a.appendChild(c)
        };
      a.__core = {
        listen_for_event: p,
        trigger_event: s,
        async_script_load: m,
        logger: f,
        format_bulleted_list_for_logger: e,
        wait_for: h,
        is_extension_required: function(a) {
          var c = a.extension_name;
          if (typeof c == "undefined") throw Error("[olark] 'extension_name' required");
          var b = !1;
          t.get_instance().for_each_extension_spec(function(a) {
            a.get_name() == c && (b = !0)
          });
          return b
        },
        create_idempotent_callback: r,
        trigger_olark_boot_process: function() {
          window.olark.__buildinfo.dev && m({
            url: window.olark.__buildinfo.jshost + "/javascript/olark/__development.js?" + +new Date
          });
          a._.P("bootstart");
          I(function() {
            i.whenDocumentReady(function() {
              a._.P("domready");
              P(function() {
                a._.P("keyready");
                var c = u.get_instance().get_olark_key(),
                  b = u.get_instance().read_configuration();
                a._.P("getstorage");
                window.olark.__core.data.prepare(c,
                  b.system.force_localstorage_fallback, function() {
                    a._.P("storage");
                    var c = new window.olark.__core.data.StorejsKeyStore;
                    if (a._.isNewConversation) c.clearConversationData(), window.olark.__legacy_shim.isNewConversation = !0;
                    E();
                    L(function() {
                      a._.P("extready");
                      var c = u.get_instance().read_configuration();
                      if (c.system.allow_end_conversation) a.__legacy_shim.allowEndConversation = !0;
                      if (c.system.domain) try {
                        window.olark.__core.data.forceDomain(c.system.domain), window.olark.__legacy_shim.forced_cookie_domain = c.system.domain
                      } catch (b) {
                        f.warn("[olark] unable to use domain '" +
                          c.system.domain + "' (" + b + ")")
                      }
                      if (c.system.path) try {
                        window.olark.__core.data.forcePath(c.system.path)
                      } catch (h) {
                        f.warn("[olark] unable to use path '" + c.system.path + "' (" + h + ")")
                      }
                      S(c);
                      var e = new a.__core.api.ApiInstance({
                        conf: c,
                        namespace: "__bootprocessplugin",
                        extension_name: "__bootprocessplugin"
                      });
                      e.chat.onReady(W);
                      for (var l = c.system.rules || [], g = a._.rulesLookup = {}, i = !1, n = 0; n < l.length; n++) {
                        var q = l[n];
                        q.enabled && (i = !0, g[q.id] = q)
                      }
                      i ? X(e, c) : T(e, c)
                    })
                  })
              })
            })
          })
        },
        when_document_is_ready: function(a) {
          i.whenDocumentReady(a)
        },
        when_corelib_is_available: I,
        do_async_call: l,
        run_legacy_code: function(a) {
          return a(window)
        },
        clone_object: q,
        deep_equals: v,
        join_string_list: y,
        for_each_extension_name_starting_with_most_recent: function(a) {
          t.get_instance().for_each_extension_spec(function(c) {
            a(c.get_name())
          })
        },
        after_extensions_are_activated: function(a) {
          p({
            namespace: "core",
            type: "extensionsActivated",
            callback: a
          })
        },
        try_and_optionally_catch: w,
        listen_for_browser_event: o,
        ConfigurationManager: u,
        BrowserTab: b
      };
      i.publicMethods.extend = function(c,
        b) {
        w(function() {
          var h = null,
            e = null,
            f = null;
          if (typeof c == "function") h = t.get_next_extension_name(), a.declare({
            name: h,
            startup: c
          });
          else if (typeof c == "string") h = c, e = b ? b.version : null, f = b ? b.source : null, B(h);
          else throw Error("[olark] extend requires either an extension name or an inline startup function");
          h = new C({
            name: h,
            version: e,
            source: f
          });
          t.get_instance().register_extension_spec({
            extension_spec: h
          })
        }, function(a) {
          f.error("[olark] failed in olark.extend: " + a.toString());
          f.showErrorBacktrace(a)
        })
      };
      i.publicMethods.declare =
        function(a, c) {
          w(function() {
            var b = null,
              h = null,
              e = null;
            typeof a == "string" ? (f.warn("[olark] old-style extension declarations are no longer supported"), h = a.split("@"), b = h[0], h = h.length == 2 ? h[1] : null, e = c) : (b = a.name, h = a.version, e = a.startup);
            B(b);
            b = new n({
              name: b,
              version: h,
              startup: e
            });
            t.get_instance().register_declared_extension({
              extension: b
            })
          }, function(a) {
            f.error("[olark] failed in olark.declare: " + a.toString());
            f.showErrorBacktrace(a)
          })
      };
      i.publicMethods.configure = function(a, c) {
        var b, h;
        typeof a == "string" ?
          (h = a.split("."), b = function(a) {
          var b = h[0];
          (a = a[h[0]]) ? (b = h[1], a[b] = c, b[0] == "_" && f.warn("[olark] cannot configure private key:", b)) : f.warn("[olark] unknown configuration namespace:", b)
        }) : b = a;
        u.get_instance().register_configure_callback({
          callback: b
        })
      };
      i.publicMethods.ready = function(a) {
        a()
      };
      i.publicMethods.identify = function() {};
      i.publicMethods.load = function() {}
    });
  try {
    window.olark.__core.trigger_olark_boot_process()
  } catch (C) {
    m({
      url: ""
    })
  }
})();
window.hbl_ssl = document.location.protocol == "https:" ? !0 : !1;
hbl_ext = window.hbl_ssl ? "https" : "http";
hblCacheConstant = "application";
hbl_hostname = "olark.com/nrpc";
hbl_static_hostname = "static.olark.com";
hblStaticPath = hbl_ext + "://static.olark.com/js";
hblPostURL = hbl_ext + "://www.olark.com/emails/create";
hblPopupURL = olark && olark._ && olark._.popout ? olark._.popout : hblStaticPath + "/html/popout.html";
hblUrlHandler = olark && olark._ && olark._.follow ? olark._.follow : hblStaticPath + "/html/url_handler.html";
hblPostStub = hblStaticPath + "/wc_post.js?" + hblCacheConstant;
hblJSInline = !0;
hblName = "Olark Chat";
hblInstallUrl = "http://www.olark.com/dashboard/install";
var hbl = {
  util: {},
  pipelines: {},
  themes: {},
  hwindow_util: {},
  plugins: {},
  hwindow: {
    config: function() {
      this.vars = {};
      this.palette = {};
      this.style_id = {};
      this.style = {};
      this.style_classes = {};
      this.style_classes_map = {}
    }
  },
  jsoncallback_norv: function() {}
};
hbl.util.eventmanager = function() {
  this.registered_events = {};
  this.register = function(a, b, d) {
    this.registered_events[a] == void 0 && (this.registered_events[a] = []);
    d == void 0 && (d = 999);
    this.registered_events[a].push({
      handler: b,
      priority: d
    });
    this.registered_events[a] = this.registered_events[a].sort(function(a, b) {
      return a.priority - b.priority
    })
  };
  this.handle = function(a, b) {
    if (this.registered_events[a] != void 0) {
      b == void 0 && (b = {});
      b.window = this.win;
      b.event_name = a;
      var d = "",
        c;
      for (c in b) b.hasOwnProperty(c) && (d += c + "=" + b[c] +
        "|");
      for (var g in this.registered_events[a]) this.registered_events[a].hasOwnProperty(g) && this.registered_events[a][g] && typeof this.registered_events[a][g].handler == "function" && this.registered_events[a][g].handler(b)
    }
  };
  this.unregister_all = function(a) {
    this.registered_events[a] = []
  };
  this.setWindow = function(a) {
    this.win = a
  }
};
var hblrpcTrick = 1,
  hblDEBUG = 0,
  hblnoconsole = 1,
  hblHideUnsupported = 1,
  hblJavaScriptVersion = "0.5m",
  hblBegincall = "begin_2",
  hblJSInline = !0,
  hbl_max_event = 1E3,
  hbl_hostname_delimiter = ".";
hbl.eventmgr = new hbl.util.eventmanager;
habla_window = void 0;
hbl.get_current_page = function() {
  return document.URL
};
hbl.get_current_referrer = function() {
  return document.referrer
};
hbl.hconfig = function() {
  this.vars = {
    input_width_offset_normal: 16,
    input_width_offset_ie: 16,
    input_width_offset_compat: 8,
    theme_url: "../theme.js"
  };
  this.palette = {};
  this.style = {};
  this.plugins = new hbl.util.pluginlist;
  this.style_id = {};
  this.style_classes = {};
  this.style_classes_map = {}
};
hbl.hconfig.prototype.setMargin = function(a) {
  this.setMargins(a, a, a, a)
};
hbl.hconfig.prototype.setMargins = function(a, b, d, c) {
  this.vars.bottom_margin = c;
  this.vars.right_margin = d;
  this.vars.left_margin = a;
  this.vars.top_margin = b
};
hbl.hconfig.prototype.setPosition = function(a) {
  this.vars.corner_position = a
};
hbl.hconfig.prototype.setDirectionRtl = function(a) {
  this.vars.rtl = a;
  this.style_classes.habla_conversation_div = 'height: $vars["convo_height_px"]; overflow: auto; border-bottom: 1px dotted $palette["control"]; background: transparent; line-height: 1.5em; padding: 3px 23px 3px 3px; border: 1px solid';
  this.style_classes.habla_window_div = "z-index:3000; direction: rtl";
  this.style_classes.habla_conversation_message_off = "margin: 0; padding: 3px 23px 3px 3px;";
  this.style_classes.habla_conversation_p_item = 'color: $palette["main_fg"]; margin: 0; padding: 0; text-indent: -20px; background: transparent; text-align: right;';
  this.style_classes.habla_conversation_person1 = 'color: $palette["local"]; padding-left: 5px; float: right;';
  this.style_classes.habla_conversation_person2 = 'color: $palette["remote"]; padding-left: 5px; float: right;'
};
hbl.hconfig.prototype.setInline = function(a) {
  a ? (this.vars.is_inline = 1, this.vars.disableFocus = 1) : (this.vars.is_inline = 0, this.vars.disableFocus = 0)
};
hbl.hconfig.prototype.setHeight = function(a) {
  this.vars.convo_height = a
};
hbl.hconfig.prototype.setWidth = function(a) {
  this.vars.width = a
};
hbl.util.pluginlist = function() {
  this.todo = [];
  this.defined = {};
  this.add = function(a, b) {
    b == void 0 && (b = 999);
    if (a != void 0 && !this.defined[a.name]) this.defined[a.name] = 1, this.todo.push({
      handler: a,
      priority: b
    }), this.todo = this.todo.sort(function(a, c) {
      return a.priority - c.priority
    })
  }
};
hbl.util.get_body = function() {
  var a = document.getElementsByTagName("html"),
    b = null;
  a.length < 1 ? (b = document.createElement("html"), document.appendChild(b)) : b = a[0];
  a = document.getElementsByTagName("body");
  var d = null;
  a.length > 0 ? d = document.getElementsByTagName("body").item(0) : (d = document.createElement("body"), b.appendChild(d));
  return d
};
hbl.util.get_head = function() {
  var a = document.getElementsByTagName("html"),
    b = null;
  a.length < 1 ? (b = document.createElement("html"), document.appendChild(b)) : b = a[0];
  a = document.getElementsByTagName("head");
  var d = null;
  a.length > 0 ? d = document.getElementsByTagName("head").item(0) : (d = document.createElement("head"), b.appendChild(d));
  return d
};
hbl.util.simple_load_js_async = function(a) {
  html_doc = hbl.util.get_body();
  var b = document.createElement("script");
  b.setAttribute("language", "javascript");
  b.setAttribute("type", "text/javascript");
  b.setAttribute("data-cfasync", "false");
  b.setAttribute("src", a);
  html_doc.appendChild(b)
};
hbl.util.BrowserDetect = {
  _initialized: !1,
  init: function() {
    if (!this._initialized) {
      this.browser = this.searchString(this.dataBrowser, 1) || "An unknown browser";
      this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
      this.need_submit_button = this.backwards_dimension = this.use_position_absolute_on_ie = !1;
      if (document.compatMode == "BackCompat") this.backwards_dimension = !0;
      if (this.browser == "Explorer") {
        var a = 0,
          b = navigator.userAgent.match(/Trident\/(\d+)/);
        b && (a = b[1]);
        if (this.version >= 10 || a >= 6) this.use_position_absolute_on_ie = !1;
        else if (this.use_position_absolute_on_ie = !0, (this.version >= 7 || document.body && typeof document.body.style.maxHeight != "undefined") && document.compatMode != "BackCompat") this.use_position_absolute_on_ie = !1
      }
      if (navigator.userAgent && navigator.userAgent.toLowerCase().indexOf("wii") > -1) this.need_submit_button = !0;
      this._initialized = !0
    }
  },
  searchString: function(a, b) {
    for (var d = 0; d < a.length; d++) {
      var c = a[d].string,
        g = a[d].prop;
      this.versionSearchString =
        a[d].versionSearch || a[d].identity;
      if (c) {
        if (c.indexOf(a[d].subString) != -1) {
          if (b != void 0) this.supported = a[d].supported;
          return a[d].identity
        }
      } else if (g) {
        if (a[d].identity) this.supported = a[d].supported;
        return a[d].identity
      }
    }
  },
  searchVersion: function(a) {
    var b = a.indexOf(this.versionSearchString);
    if (b != -1) return parseFloat(a.substring(b + this.versionSearchString.length + 1))
  },
  dataBrowser: [{
    string: navigator.vendor,
    subString: "Apple",
    identity: "Safari",
    supported: "1"
  }, {
    prop: window.opera,
    identity: "Opera",
    supported: "1"
  }, {
    string: navigator.userAgent,
    subString: "Firefox",
    identity: "Firefox",
    supported: "1"
  }, {
    string: navigator.vendor,
    subString: "Camino",
    identity: "Camino",
    supported: "1"
  }, {
    string: navigator.userAgent,
    subString: "Netscape",
    identity: "Netscape",
    supported: "1"
  }, {
    string: navigator.userAgent,
    subString: "MSIE",
    identity: "Explorer",
    versionSearch: "MSIE",
    supported: "1"
  }, {
    string: navigator.userAgent,
    subString: "Gecko",
    identity: "Mozilla",
    versionSearch: "rv",
    supported: "1"
  }, {
    string: navigator.userAgent,
    subString: "Mozilla",
    identity: "Netscape",
    versionSearch: "Mozilla",
    supported: "1"
  }, {
    string: navigator.userAgent,
    subString: "iPad",
    identity: "iPad",
    supported: "1"
  }, {
    string: navigator.userAgent,
    subString: "iPhone",
    identity: "iPhone",
    supported: "1"
  }]
};

function wc_config() {
  return new hbl.hconfig
}
hblHasinit = void 0;

function wc_init(a, b) {
  if (!(hblHasinit || document.URL.search("hblNoInit") > -1))
    if (hblHasinit = 1, hbl.util.BrowserDetect.init(), hbl.util.BrowserDetect.supported || !hblHideUnsupported) {
      a = a || window.__get_olark_key();
      if (typeof a == "undefined" || !a) {
        var d = document.getElementById("hbl_code");
        d ? (a = d.href.split("#")[1], d.style.display = "none") : a = "missing-site-id"
      }
      olark._.identityManager.setSiteId(a);
      if ((hbl.config = b) && b.palette)
        for (var c in b.palette)
          if (typeof b.palette[c] == "string") hbl.need_ugly_backwards_palette_hack = !0;
      hbl.started = 0;
      hbl.prev_onload = window.onload;
      window.onload = function() {
        habla_load_func(hbl.prev_onload)
      };
      window.setTimeout("habla_load_func(hbl.prev_onload)", 2500)
    }
}

function habla_load_func(a) {
  if (!hbl.started) {
    hbl.started = 1;
    if (a && typeof a == "function") try {
      a()
    } catch (b) {}
    hblJSInline || hbl.util.simple_load_js_async(hblPostStub);
    hbl.eventmgr.handle("habla_called_wc_init")
  }
}
window.__olark_external_start && window.__olark_external_start();
var hbl_link = document.getElementById("hbl_code");
if (hbl_link) hbl_link.style.display = "none";
(function() {
  try {
    var a = document.getElementsByTagName("head")[0],
      b = document.createElement("style"),
      d = document.createTextNode(".olark-key,#hbl_code,#olark-data{display: none !important;}");
    b.type = "text/css";
    b.styleSheet ? b.styleSheet.cssText = d.nodeValue : b.appendChild(d);
    a.appendChild(b)
  } catch (c) {}
})();
window.__get_olark_key = function() {
  var a = document.getElementById("olark-data");
  if (a && a.childNodes)
    for (var b = a.childNodes.length; b--;) {
      var d = a.childNodes[b];
      if ((d.className || "").indexOf("olark-key") != -1) return d.id.replace("olark-", "")
    }
  a = document.getElementsByTagName("a");
  for (b = a.length; b--;)
    if (d = a[b], (d.className || "").indexOf("olark-key") != -1) return d.id.replace("olark-", "");
  return null
};
if (window.olark && window.olark.__legacy_shim) window.olark.__legacy_shim.legacy_stub_is_loaded = !0;
hbl.hconfig.prototype.merge = function(a, b) {
  this.copy_hash(this.vars, a.vars, b);
  this.copy_hash(this.style, a.style, b);
  this.copy_hash(this.palette, a.palette, b);
  this.copy_hash(this.style_id, a.style_id, b);
  this.copy_hash(this.style_classes, a.style_classes, b);
  this.copy_hash(this.style_classes_map, a.style_classes_map, b);
  if (a.plugins && a.plugins.todo)
    for (var d in a.plugins.todo) a.plugins.todo.hasOwnProperty(d) && this.plugins.add(a.plugins.todo.handler, a.plugins.todo.priority)
};
hbl.hconfig.prototype.copy_hash = function(a, b, d) {
  if (b)
    for (var c in b)
      if (b.hasOwnProperty(c) && (d || a[c] == void 0)) a[c] = b[c]
};
hbl.hconfig.prototype.up = function(a) {
  this.merge(a, !0)
};
hbl.hconfig.prototype.render_all_styles = function(a) {
  for (var b in this.style_classes_map) this.style_classes_map.hasOwnProperty(b) && typeof b == "string" && a[b] && this.render_element_classes(a, b)
};
hbl.hconfig.prototype.render_stylesheet = function() {
  hbl.util.css.create_css_class("div#habla_window_div p", "padding:0;");
  for (var a in this.style_classes)
    if (this.style_classes.hasOwnProperty(a)) {
      var b = this.render_part(this.style_classes[a]);
      hbl.util.css.create_css_class("." + a, b)
    }
};
hbl.hconfig.prototype.smart_join = function(a, b) {
  var d = "",
    c;
  for (c in a) a.hasOwnProperty(c) && typeof a[c] == "string" && (d += a[c] + b);
  return d
};
hbl.hconfig.prototype.render_element_classes = function(a, b) {
  this.set_element_classes(a[b], b)
};
hbl.hconfig.prototype.set_element_classes = function(a, b) {
  if (a && this.style_classes_map[b] && this.style_classes_map[b].join) a.className = this.smart_join(this.style_classes_map[b], " ")
};
hbl.hconfig.prototype.render_element = function(a, b) {
  this.render_element_classes(a, b)
};
hbl.hconfig.prototype.render_class = function(a, b, d) {
  if (a && a.className) {
    var c = a.className.split(" "),
      g = [],
      i;
    for (i in c) c.hasOwnProperty(i) && typeof i == "string" && c[i] != d && c[i] != b && g.push(c[i]);
    g.push(b);
    a.className = this.smart_join(g, " ")
  }
};
hbl.hconfig.prototype.render_ie_hacks = function() {
  if ((hbl.util.BrowserDetect.use_position_absolute_on_ie && this.vars.disableJSStyles && !this.vars.is_inline || this.vars.yahoo_ui) && !window.hbl.__ie6_floating_div_monitor) window.hbl.__ie6_floating_div_monitor = new window.__ie6_float_hack
};
hbl.hconfig.prototype.remap_palette = function() {
  var a = {
    mainbg: "main_bg",
    mainfg: "main_fg",
    titlebg: "title_bg",
    titlefg: "title_fg",
    buttonbg: "button_bg",
    buttonfg: "button_fg",
    buttonhi: "button_bg_highlight",
    titlebg_highlight: "title_bg_highlight",
    titlefg_highlight: "title_fg_highlight",
    control: "control_border",
    control_highlight: "control_highlight_border",
    local: "local_fg",
    remote: "remote_fg",
    border: "panel_border"
  }, b;
  for (b in a) a.hasOwnProperty(b) && typeof b == "string" && this.palette[b] && (this.palette[a[b]] = this.palette[b]);
  this.palette.buttonfg && (this.palette.button_fg_highlight = this.palette.buttonfg)
};
hbl.hconfig.prototype.init_from_config = function(a) {
  a.setWidth(this.vars.width);
  a.setHeight(this.vars.height);
  this.vars.is_inline ? a.setInline(this.vars.is_inline) : a.setPosition(this.vars.corner_position);
  a.setMargins(this.vars.left_margin, this.vars.top_margin, this.vars.right_margin, this.vars.bottom_margin);
  a.setInputHeight(this.vars.input_height);
  a.setFormInputHeight(this.vars.input_height);
  hbl.util.BrowserDetect.browser == "Opera" && (this.vars.poll = !0)
};
hbl.hconfig.prototype.load_defaults = function() {
  this.plugins = new hbl.util.pluginlist;
  this.vars = [];
  this.palette = {};
  this.palette.link = "#e75917";
  this.vars.line_length = 21;
  this.vars.bottom_margin = 10;
  this.vars.right_margin = 10;
  this.vars.left_margin = 10;
  this.vars.top_margin = 10;
  this.vars.width = 260;
  this.vars.height = 155;
  this.vars.panel_offset = 20;
  this.vars.resize_input_height = 60;
  this.vars.input_height = 20;
  this.vars.corner_position = "BR";
  this.vars.offline_msg_mode = !0;
  this.vars.rtl = !1;
  this.vars.resize_length = 25;
  this.vars.myname =
    "you";
  this.vars.say_text = "Type here and hit enter to chat";
  this.vars.send_text = "Send";
  this.vars.check_for_status = hblName + " (startup)";
  this.vars.disable_expand_text_input = !1;
  this.vars.disable_set_cookies = !1;
  this.vars.disable_get_cookies = !1;
  this.vars.cookie_path = "/";
  this.vars.hbl_cookie_path = "/";
  this.vars.session_expire = void 0;
  this.vars.local_user_display_name = "&rarr;";
  this.vars.disableGoogleAnalytics = 0;
  this.vars.expandOnMessageReceived = 0;
  this.vars.enable_google_analytics = !1;
  this.vars.google_analytics_domain =
    "auto";
  this.vars.language = "en";
  this.vars.enableLanguageTranslation = !1;
  this.vars.expandOnFirstMessageReceived = 1;
  this.vars.close_hides_window = !1;
  this.vars.plugin_path = hblStaticPath + "/plugins/";
  this.vars.divid = "habla_window_div";
  this.vars.poll = !1;
  hbl.util.BrowserDetect.browser == "Opera" && (this.vars.poll = !0);
  this.vars.habla_name_input_text = "click here and type your Name";
  this.vars.habla_offline_email_text = "click here and type your Email";
  this.vars.habla_offline_phone_text = "click here and type your Phone";
  this.vars.habla_offline_body_text = "We're not around but we still want to hear from you!  Leave us a note:";
  this.vars.habla_offline_submit_value = "Send";
  this.vars.habla_offline_sent_text = "Thanks for your message!  We'll get back to you shortly.";
  this.vars.in_chat_text = "Now Chatting";
  this.vars.before_chat_text = "Chat with us!";
  this.vars.not_available_text = "Contact us!";
  this.vars.busy_text = "Contact us";
  this.vars.away_text = "Contact us";
  this.vars.offline_message = "We're not around, but we'd love to chat another time.";
  this.vars.welcome_msg = "Questions? We'd love to chat!";
  this.vars.busy_message = "All of our representatives are with other customers at this time. We will be with you shortly.";
  this.vars.enable_buttons = 1;
  this.vars.hide_min_max_buttons = 0;
  this.vars.local_name_override = void 0;
  this.vars.url_handler_target_window = "_top";
  this.vars.url_handler = hblUrlHandler;
  this.vars.url_local_pattern = document.domain;
  this.vars.parse_links = 1;
  this.vars.is_inline = 0;
  this.vars.start_expanded = 0;
  this.vars.start_hidden = 0;
  this.vars.hide_not_available =
    0;
  this.vars.append_to_body = 1;
  this.vars.show_away = 0;
  this.vars.hide_when_away = 0;
  this.vars.show_away_as_header = 0;
  this.vars.habla_sizebutton_text_expanded = "_";
  this.vars.habla_sizebutton_text_compressed = "^";
  this.vars.habla_closebutton_text = "x";
  this.vars.habla_popout_text = ">";
  this.vars.habla_end_popout_text = "<<";
  this.vars.start_visible = !1;
  this.vars.start_habla_window_visible = !1;
  this.vars.pre_chat_message = "Hi, I am around, click 'start chatting' to contact me.";
  this.vars.pre_chat_submit = "Click here to start chatting";
  this.vars.pre_chat_error_text = "Please enter your name and email in case we get disconnected.";
  this.vars.show_pre_chat = 0;
  this.vars.require_name = 2;
  this.vars.require_email = 1;
  this.vars.require_phone = 0;
  this.vars.require_offline_phone = 0;
  this.vars.show_end_popout = 0;
  this.vars.show_popout = 0;
  this.vars.is_popup = 0;
  this.vars.sending_text = "sending";
  this.vars.email_body_error_text = "You must complete all fields and specify a valid email address";
  this.vars.habla_special_div_show_type = "block";
  this.vars.operator_has_stopped_typing_text =
    "has stopped typing";
  this.vars.operator_is_typing_text = "is typing...";
  this.vars.flash_icons = 1;
  this.vars.flash_titlebar = 1;
  this.vars.default_flash_off_icon = hblStaticPath + "/images/white.ico";
  this.vars.default_flash_on_icon = hblStaticPath + "/images/orange.ico";
  this.vars.ended_chat_message = "This chat has ended, start typing below if you need anything else!";
  this.style_classes_map = {};
  this.style_id = {};
  this.style_classes = {}
};
if (!window.hbl) window.hbl = {};
window.hbl.__ie6_floating_div_monitor = void 0;
window.__ie6_float_hack = function() {
  var a = this;
  a.__moving = !1;
  a.__need_to_move = function() {
    var b = a.__with_complete_habla_window(function(a) {
      var c = a.config.vars;
      c = __get_element_position({
        dom_element: a.theme.habla_window_div,
        top: c.top_margin,
        bottom: c.bottom_margin,
        left: c.left_margin,
        right: c.right_margin,
        corner: c.corner_position
      });
      if (a.theme) {
        var b = {
          x: a.theme.getX(),
          y: a.theme.getY()
        };
        a = c.x - b.x;
        c = c.y - b.y;
        return {
          x: a,
          y: c,
          max_diff: Math.max(Math.abs(a), Math.abs(c))
        }
      } else return {
        x: 0,
        y: 0,
        max_diff: 0
      }
    });
    return b ?
      b : {
        x: 0,
        y: 0,
        max_diff: 0
    }
  };
  a.__with_complete_habla_window = function(a) {
    var d = window.habla_window;
    if (d && d.config && d.config.vars && d.config.vars.corner_position) return a(d)
  };
  a.__move_window = function(b, d) {
    a.__with_complete_habla_window(function(a) {
      var g = a.config.vars;
      g = __get_element_position({
        dom_element: a.theme.habla_window_div,
        top: g.top_margin,
        bottom: g.bottom_margin,
        left: g.left_margin,
        right: g.right_margin,
        corner: g.corner_position
      });
      a.theme.setXY(g.x - b, g.y - d)
    })
  };
  a.__check_location = function() {
    a.__move_to_correct_location();
    setTimeout(function() {
      a.__check_location()
    }, 500)
  };
  a.__move_to_correct_location = function(b) {
    var d = a.__need_to_move();
    if (b || !(d.max_diff < 2)) b || d.max_diff < 15 ? a.__move_window(0, 0) : (a.__move_window(0, d.y * 0.5), setTimeout(function() {
      a.__move_to_correct_location()
    }, 40))
  };
  a.stop = function() {
    a.__timeout && clearTimeout(a.__timeout);
    a.__timeout = void 0
  };
  a.start = function() {
    a.stop();
    a.__timeout = setTimeout(function() {
      a.__check_location()
    }, 500)
  };
  a.__move_to_correct_location(!0);
  a.start()
};
var __get_element_position = function(a) {
  var b = 0,
    d = 0;
  b = a.dom_element.offsetWidth;
  d = a.dom_element.offsetHeight;
  var c = window.innerWidth || (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth),
    g = window.innerHeight || (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight),
    i = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft,
    k = document.documentElement.scrollTop ? document.documentElement.scrollTop :
      document.body.scrollTop;
  b = a.corner.match("R") ? c + i - a.right - b : a.left + i;
  d = a.corner.match("B") ? g + k - a.bottom - d : a.top + k;
  if (!d) d = margin.top;
  if (!b) b = margin.right;
  return {
    x: b,
    y: d
  }
};
hbl.util.pluginlist.prototype.load = function(a) {
  for (var b = 0; b < this.todo.length; b++) this.todo[b] && this.todo[b].handler && typeof this.todo[b].handler.load == "function" && this.defined[this.todo[b].handler.name] == 1 && (this.todo[b].handler.load(a), this.defined[this.todo[b].handler.name] = 2);
  return a
};
hbl.util.last_js_id = 0;
hbl.util.last_js_pollid = 0;
hbl.util.pipeline = function(a) {
  this.todo = [];
  this.host_obj = a;
  this.add = function(a, d) {
    d == void 0 && (d = 999);
    this.todo.push({
      handler: a,
      priority: d
    });
    this.todo = this.todo.sort(function(a, b) {
      return a.priority - b.priority
    })
  };
  this.run = function(a) {
    for (var d = a, c = 0; c < this.todo.length; c++)
      if (this.todo[c] && typeof this.todo[c].handler == "function") {
        d = this.todo[c].handler(a, this.host_obj);
        if (d == void 0) return;
        a = d
      }
    return d
  };
  this.setTarget = function(a) {
    this.host_obj = a
  }
};
hbl.util.listenForEvent = function(a, b, d) {
  return a.addEventListener ? a.addEventListener(b, d, !1) : a.attachEvent ? a.attachEvent("on" + b, d) : a["on" + b] = d
};
hbl.util.pluginloader = function(a, b, d) {
  hbl.pluginArgs = {
    conf: a,
    client: b,
    hwindow: d
  };
  a.plugins.load({
    conf: a,
    client: b,
    hwindow: d
  })
};
hbl.util.timestamp = function() {
  return (new Date).toUTCString()
};
hbl.util.reportException = function(a) {
  olark._.hlog("exception:", a, "#error")
};
hbl.util.urlencode = function(a) {
  var b = "",
    d;
  for (d in a) a.hasOwnProperty(d) && (b += d + "=" + encodeURIComponent(a[d]) + "&");
  return b
};
hbl.util.load_js_async = function(a) {
  hbl.util.last_js_id += 1;
  hbl.util.last_js_pollid += 1;
  var b = "jscript" + hbl.util.last_js_id;
  a += a.indexOf("?") > -1 ? "&" + b : "?" + b;
  if (hbl.util.last_js_id > 1900)
    if (a.match(/sendmessage/i) || a.match(/begin/i)) hbl.util.last_js_id = 1;
    else return;
  html_doc = hbl.util.get_body();
  var d = document.createElement("script");
  d.setAttribute("language", "javascript");
  d.setAttribute("id", b);
  d.setAttribute("type", "text/javascript");
  d.setAttribute("data-cfasync", "false");
  d.setAttribute("src", a);
  html_doc.appendChild(d)
};
hbl.util.remove_element = function(a) {
  a = document.getElementById(a);
  a != void 0 && a.parentNode != void 0 && a.parentNode.removeChild(a)
};
hbl.util.calculate_retry_delay = function(a, b, d) {
  a *= 1 + b;
  return a > d ? d : a
};
hbl.util.append_script = function(a, b, d) {
  var c = hbl.util.append_script,
    g = d.scriptid,
    i = d.url,
    k = d.tries,
    j = d.previous_tries || 0,
    f = d.timeout,
    n = d.error_callback,
    t = d.success_callback,
    o = d.cache,
    p = d.retryid ? d.retryid : "";
  a.opera && !f && (f = 200);
  var s = function(e) {
    var h = b.getElementById(g + p);
    h ? (h.loaded = !0, h.parentNode != void 0 && h.parentNode.removeChild(h), n && n({
      status: e
    }), k > 0 ? a.setTimeout(function() {
      c(a, b, {
        scriptid: g,
        retryid: "r" + k,
        url: i,
        tries: k,
        previous_tries: j + 1,
        timeout: f,
        error_callback: n,
        cache: o
      })
    }, hbl.util.calculate_retry_delay(1200,
      j, 15E3)) : window.olark && window.olark._.hlog && olark._.hlog("#rpc_call_error-" + e + " url:" + i)) : t && t()
  };
  d = i;
  if (!o) {
    var r = d.length > 0 && d.charAt(d.length - 1) != "&" && d.charAt(d.length - 1) != "?";
    d.match(/\?/) ? r && (d += "&") : d += "?";
    d += "_rnd=" + Math.random()
  }
  d = d.replace("?", "?j=" + g + p + "&");
  var e = b.createElement("script");
  e.setAttribute("language", "javascript");
  e.setAttribute("id", g + p);
  e.setAttribute("type", "text/javascript");
  e.setAttribute("data-cfasync", "false");
  e.setAttribute("src", d);
  e.loaded = !1;
  k && (k -= 1);
  if (f) e.timeout =
    a.setTimeout(function() {
      s("timeout")
    }, f);
  e.readyState ? e.onreadystatechange = function() {
    if ((e.readyState == "loaded" || e.readyState == "complete") && !e.loaded) e.onreadystatechange = function() {}, e.loaded = !0, e.timeout && a.clearTimeout(e.timeout), a.setTimeout(function() {
      s("error")
    }, 100)
  } : (e.onload = function() {
    if (!e.loaded) e.loaded = !0, e.timeout && a.clearTimeout(e.timeout), a.setTimeout(function() {
      s("error")
    }, 100)
  }, e.onerror = function() {
    if (!e.loaded) e.loaded = !0, e.timeout && a.clearTimeout(e.timeout), a.setTimeout(function() {
        s("error")
      },
      100)
  });
  r = b.getElementsByTagName("script")[0];
  r.parentNode.insertBefore(e, r);
  olark._.internalLog && olark._.internalLog.logHttpRequest(d)
};
hbl.util.as_dom = function(a) {
  var b;
  if (typeof a == "object") return a;
  b = document.createElement("span");
  b.innerHTML = a;
  return b
};
hbl.util.set_inner_text = function(a, b) {
  a.innerText ? a.innerText = b : a.textContent = b
};
hbl.util.find_or_create_el = function(a, b, d) {
  var c = document.getElementById(a);
  if (!c || c.length < 0) b == void 0 && (b = "div"), c = document.createElement(b), c.setAttribute("id", a), d != void 0 && d.appendChild(c);
  if (b == "input" || b == "textarea") c.name = a;
  return c
};
hbl.util.find_or_create_div = function(a, b) {
  return hbl.util.find_or_create_el(a, "div", b)
};
hbl.util.hide_div = function(a) {
  typeof a != "object" && (a = document.getElementById(a));
  if (a != void 0) return a.style.display = "none", !0;
  return !1
};
hbl.util.show_div = function(a, b) {
  b == void 0 && (b = "block");
  typeof a != "object" && (a = document.getElementById(a));
  if (a != void 0) return a.style.display = b, !0;
  return !1
};
hbl.util.clean_whitespace = function(a) {
  a = a.replace(/^\s*/, "");
  a = a.replace(/\s*$/, "");
  return a = a.replace("'", "")
};
hbl.util.decode_base64 = function(a) {
  var b = "";
  try {
    b = window.atob(a)
  } catch (d) {
    var c, g, i, k, j, f = 0;
    a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(f++)), g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(f++)), k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(f++)), j = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(f++)),
    c = c << 2 | g >> 4, g = (g & 15) << 4 | k >> 2, i = (k & 3) << 6 | j, b += String.fromCharCode(c), k != 64 && (b += String.fromCharCode(g)), j != 64 && (b += String.fromCharCode(i));
    while (f < a.length)
  }
  return b
};
hbl.util.encode_base64 = function(a) {
  var b, d, c, g, i = 0,
    k = 0,
    j = "";
  j = [];
  if (!a) return a;
  a = hbl.util.utf8_encode(a + "");
  do b = a.charCodeAt(i++), d = a.charCodeAt(i++), c = a.charCodeAt(i++), g = b << 16 | d << 8 | c, b = g >> 18 & 63, d = g >> 12 & 63, c = g >> 6 & 63, g &= 63, j[k++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(d) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g);
  while (i < a.length);
  j = j.join("");
  switch (a.length % 3) {
    case 1:
      j = j.slice(0, -2) + "==";
      break;
    case 2:
      j = j.slice(0, -1) + "="
  }
  return j
};
hbl.util.strip_whitespace = function(a) {
  return a.replace(/^\s*/, "").replace(/\s*$/, "")
};
hbl.util.is_valid_email = function(a) {
  if (!a) return !1;
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(a)
};
hbl.util.is_valid_phone = function(a) {
  if (!a) return !1;
  return /^(((\+|0+)?\d{1,3})?\d{2,3})?\d{7}$/.test(a.replace(/[^\+\d]/g, ""))
};
hbl.util.utf8_encode = function(a) {
  a = (a + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  var b = "",
    d, c, g = 0;
  d = c = 0;
  g = a.length;
  for (var i = 0; i < g; i++) {
    var k = a.charCodeAt(i),
      j = null;
    k < 128 ? c++ : j = k > 127 && k < 2048 ? String.fromCharCode(k >> 6 | 192) + String.fromCharCode(k & 63 | 128) : String.fromCharCode(k >> 12 | 224) + String.fromCharCode(k >> 6 & 63 | 128) + String.fromCharCode(k & 63 | 128);
    j !== null && (c > d && (b += a.substring(d, c)), b += j, d = c = i + 1)
  }
  c > d && (b += a.substring(d, a.length));
  return b
};
hbl.util.css = {};
hbl.util.getElementsByClass = function(a, b) {
  a || (a = document.getElementsByTagName("body")[0]);
  for (var d = [], c = RegExp("\\b" + b + "\\b"), g = a.getElementsByTagName("*"), i = 0, k = g.length; i < k; i++) c.test(g[i].className) && d.push(g[i]);
  return d
};
var PollingManager = function(a, b, d, c, g) {
  var i = this,
    k = 1,
    j = !0,
    f = !1,
    n = !1,
    t = !1,
    o = void 0,
    p = void 0,
    s = void 0,
    r = void 0,
    e = void 0,
    m = !1,
    h = 15,
    l = 0,
    q = +new Date;
  d("api.chat.onOperatorsAvailable", function() {
    t = !0;
    e = +new Date
  });
  d("api.chat.onOperatorsAway", function() {
    t = !1
  });
  m = !0;
  /irefox/.test(g.userAgent) && a.addEventListener && a.addEventListener("unload", function() {
    f && n && c.client.sendcommand("return_long_poll_now", "")
  }, !1);
  i.getMinAvailablePollTime = function() {
    return l
  };
  i.setMinAvailablePollTime = function(a) {
    l = a
  };
  i.setAllowedDelayWhenSlow =
    function(a) {
      h = a
  };
  i.reset = function() {
    q = +new Date
  };
  i.__timeOnPage = function() {
    return (+new Date - q) / 1E3
  };
  i.__secondsSinceOnline = function() {
    return e ? (+new Date - e) / 1E3 : void 0
  };
  i.__setLastPollStartedTimestamp = function(a) {
    s = a
  };
  i.setLongPoll = function(a) {
    j = a
  };
  i.startFailSafeIntervalIfNeeded = function() {
    o || (o = a.setInterval(function() {
        i.getNextPollTime(function(a) {
          var c = !1,
            b = s ? (+new Date - s) / 1E3 : void 0,
            e = a - +new Date;
          a == void 0 ? s == void 0 ? c = !0 : b > 300 && (c = !0) : s && +new Date - (s + e) < h && (c = !0);
          c && (i.finishLastPoll(), i.startNextPollNow())
        })
      },
      3E4))
  };
  i.startNextPollNow = function() {
    n || v()
  };
  i.finishLastPoll = function() {
    n && (n = !1);
    r = void 0;
    lastPollFinishedTimestamp = +new Date;
    return f
  };
  var v = function(c) {
    f = !0;
    p && a.clearTimeout(p);
    p = void 0;
    i.startFailSafeIntervalIfNeeded();
    c == void 0 && (c = j ? 0 : 900);
    p = a.setTimeout(function() {
      i.poll()
    }, c);
    r = +new Date + c;
    k = c
  };
  i.__determinePollTime = function(a, c, b) {
    return a ? (a = 0, a = c < 120 ? 4E3 : c < 300 ? 1E4 : c < 1800 ? 3E4 : c < 7200 ? 45E3 : c / 20 * 1E3, a < l ? l : a) : b && b < 60 ? 15E3 : c < 300 ? 45E3 : c < 3600 ? 15E5 : (c = c / 2 * 1300, c < 15E5 ? 15E5 : c)
  };
  i.getNextPollTime =
    function(a) {
      var c, b = function(b) {
          c = b;
          a && a(b)
        };
      d("api.visitor.getDetails", function(a) {
        var c = a.secondsSinceLastMessage,
          h = a.secondsSinceLastNotificationToOperator;
        a = c;
        if (h != void 0 && (c == void 0 || h < c)) a = h;
        c = i.__timeOnPage();
        h = i.__secondsSinceOnline();
        return a != void 0 ? a < 180 ? b(void 0) : a < 300 ? b(1E4) : a < 1800 ? b(2E4) : b(i.__determinePollTime(t, c, h)) : b(i.__determinePollTime(t, c, h))
      });
      return c
  };
  i.scheduleNextPoll = function() {
    n || i.getNextPollTime(function(a) {
      if (!r || a == void 0 || r > +new Date + a) m ? a > 18E5 ? i.stop() : v(a) : (a >
        18E5 && (a = 18E5), v(a))
    })
  };
  i.stop = function() {
    f ? (f = !1, p && a.clearTimeout(p), o && a.clearInterval(o), o = p = void 0, c.client.sendcommand("return_long_poll_now", "")) : f = !1
  };
  i.isRunning = function() {
    return f
  };
  i.poll = function() {
    n = !0;
    s = +new Date;
    k == 0 && j ? c.client.proxy2.getmessages(olark._.identityManager.getConversationId(), c.client.last_poll_index, c.client.callbacks.getmessages) : c.client.proxy3.pollmessages(olark._.identityManager.getConversationId(), c.client.last_poll_index, c.client.callbacks.pollmessages)
  }
};
hbl._pollevents_errors = 0;
hbl.client = {
  SENDMESSAGE_DELAY: 100,
  incoming_pipeline: new hbl.util.pipeline,
  first_time: !0,
  recorded_ssl_ip: !1,
  op_nickname_map: {},
  pollingmanager: new PollingManager(window, document, olark, hbl, navigator),
  is_conversation: function() {
    var a, b = !1,
      d = !1;
    for (a = 0; a < hbl.client.buffer.length; ++a) hbl.client.buffer[a] && (hbl.client.buffer[a][0] == "you" && (b = !0), hbl.client.buffer[a][0] != "you" && (d = !0));
    return b && d
  },
  current_operator: function() {
    var a, b = "";
    for (a = 0; a < hbl.client.buffer.length; ++a) hbl.client.buffer[a] && hbl.client.buffer[a][0] !=
      "you" && (b = hbl.client.buffer[a][0]);
    return b
  },
  noop: function() {},
  geolocation_ready: function(a) {
    hbl.client.eventmgr.handle("geolocation_ready", a)
  },
  callbacks: {
    begin: function(a) {
      hbl.client.jsoncallback(a, hbl.client.begin_call_back)
    },
    sendmessage: function(a) {
      hbl.client.msg_callback(a)
    },
    sendpresence: function() {},
    sendcommand: function() {},
    pollevents: function(a) {
      hbl._pollevents_errors = 0;
      hbl.client.pollingmanager.finishLastPoll() && hbl.client.jsoncallback(a, hbl.client.callbacks.pollmessages1)
    },
    pollmessages1: function(a) {
      var b =
        a;
      setTimeout(function() {
        hbl.client.eventmgr.handle("handled_nrpc_response")
      });
      b.is_new_conversation && hbl.client.eventmgr.handle("session_was_not_in_memcache", {});
      b.ipaddress_lookup_needed && hbl.client.record_ssl_ip();
      hbl.client.site_is_online = b.site_is_online;
      hbl.client.conversation_has_slot = b.conversation_has_slot;
      a = {
        sid: b.conversation_id,
        hblid: b.visitor_id,
        chatting: b.in_active_conversation,
        opstatus: b.status_state,
        opavailable: b.site_is_online,
        geoip: b.geolocation_data,
        ipaddress: b.ipaddress,
        pop_out: b.is_popup,
        ssl: b.ssl,
        box_visible: !0,
        opbusy: !1,
        operator_composing_state: a.operator_composing_state,
        operator_nickname: a.operator_nickname
      };
      if (b.operator_has_sent_message && b.site_is_online) a.opstatus = "available";
      if (!b.operator_has_sent_message && b.site_is_online && a.opstatus != "available") a.opavailable = !1;
      hbl.client.chatting = a.chatting;
      if (!a.disconnected) {
        if (hbl.client.first_time) hbl.client.first_time = !1;
        if (a.exception != "no session found") {
          if (a.opavailable != hbl.client.opavailable || hbl.client.opmessage != a.opmessage ||
            hbl.client.opstatus != a.opstatus || hbl.client.opbusy != a.opbusy || hbl.client.pop_out != a.pop_out) hbl.client.eventmgr.handle("operator_status_change", {
            available: a.opavailable,
            opavailable: a.opavailable,
            status: a.opstatus,
            opstatus: a.opstatus,
            message: a.opmessage,
            busy: a.opbusy,
            pop_out: a.pop_out,
            pop_out_change: hbl.client.pop_out != a.pop_out,
            chatting: hbl.client.chatting,
            box_visible: hbl.client.box_visible,
            opbusy: a.opbusy
          }), hbl.client.first_time = !1, hbl.client.opavailable = a.opavailable, hbl.client.opmessage = a.opmessage,
          hbl.client.opstatus = a.opstatus, hbl.client.opbusy = a.opbusy, hbl.client.pop_out = a.pop_out;
          if (hbl.client.composing != a.operator_composing_state) hbl.client.eventmgr.handle("operator_composing", {
            composing_type: a.operator_composing_state,
            operator_nickname: a.operator_nickname
          }), hbl.client.composing = a.operator_composing_state;
          a = [];
          for (var d = !1, c, g = b.new_events || [], i = 0; i < g.length; i++) {
            var k = g[i][0];
            if (k > hbl.client.last_poll_index) hbl.client.last_poll_index = k;
            var j = g[i][1];
            if (j.body && j.nickname != "you") a.push([j.nickname,
              j.body, k
            ]), hbl.client.op_nickname_map[j.nickname] = j.operator_id;
            if (j.type == "site_config_changed") d = !0, c = j.md5
          }
          hbl.client.append1(a);
          d && (olark._.setSiteAssetHash(c), olark._.setLoaderUseAssets("1"));
          hbl.client.whenNicknameAndPresenceAreAllowed(function() {
            b.resend_nickname && hbl.client.eventmgr.handle("resend_nickname", {});
            b.resend_status && hbl.client.eventmgr.handle("resend_status", {})
          });
          hbl.client.pollingmanager.scheduleNextPoll()
        }
      }
    }
  },
  siteid: "",
  wc_sid: "",
  sid: "",
  proxy: null,
  buffer: [],
  myname: "you",
  jsoncallback: function(a,
    b) {
    if (a.http_traffic_blocked) return olark("api.box.hide"), hbl.util.append_script = function() {}, window.console && window.console.warn && window.console.warn("[olark] Olark Chat is turned off for this website, if you own this website please contact Olark via support@olark.com"), !1;
    a.ended && hbl.client.eventmgr.handle("conversation_ended", {
      next_conversation_id: a.ended.next_conversation_id
    });
    a.conversation_does_not_exist ? hbl.client.restart_session() : a.retry ? hbl.client.pollingmanager.startNextPollNow() : b != null && !a.duplicate_session_id && b(a)
  },
  begin_call_back: function(a) {
    function b() {
      olark._.identityManager.deleteIdentityFromCookies()
    }
    var d = olark._.hlog,
      c = a;
    if (a.error) {
      var g = [];
      a.error == "fatal_boot_exception" && (b(), g.push("#fatal_boot_exception"));
      c.invalid_id_format && (b(), g.push("#invalid_id_format"));
      c.conversation_does_not_exist && (b(), g.push("#conversation_does_not_exist"));
      d("stopped begin call:", a.error, "#error #begin_call_error", g.join(" "))
    } else if (c.invalid_id_format || c.conversation_does_not_exist) b(),
    d("RPC reported no errors, but gave error flags #error #unexpected_rpc_output");
    else {
      c.conversation_id != olark._.identityManager.getConversationId() && d("RPC reported new conversationId:", c.conversation_id, "!=", olark._.identityManager.getConversationId(), "#error #new_rpc_wcsid");
      c.visitor_id != olark._.identityManager.getVisitorId() && (d("RPC reported new visitorId, re-storing to cookie:", c.visitor_id, "!=", olark._.identityManager.getVisitorId(), "#error #new_rpc_hblid"), c.visitor_id && olark._.identityManager.setVisitorId(c.visitor_id));
      var i = function() {
        olark("api.box.__SPI_getLegacyState", function(c) {
          olark._.needsFirstTimeOperatorLogin = !1;
          var b = a;
          a.site_config_changed && (olark._.setSiteAssetHash(a.site_md5 || a.assets_config_md5), olark._.setLoaderUseAssets("1"));
          a = {
            sid: b.conversation_id,
            hblid: b.visitor_id,
            chatting: b.in_active_conversation,
            opstatus: b.status_state,
            opavailable: b.site_is_online,
            geoip: b.geolocation_data,
            ipaddress: b.ipaddress,
            pop_out: b.is_popup,
            ssl: b.ssl,
            opbusy: !1,
            operator_composing_state: a.operator_composing_state,
            operator_nickname: a.operator_nickname,
            habla_message: a.habla_message,
            box_visible: c.box_visible,
            box_open: c.box_open
          };
          if (b.operator_has_sent_message && b.site_is_online) a.opstatus = "available";
          if (!b.operator_has_sent_message && b.site_is_online && a.opstatus != "available") a.opavailable = !1;
          if (a != null && !a.error) {
            olark._.identityManager.setConversationId(a.sid);
            olark._.identityManager.setVisitorId(a.hblid);
            hbl.client.chatting = a.chatting;
            hbl.client.site_is_online = b.site_is_online;
            hbl.client.conversation_has_slot = b.conversation_has_slot;
            hbl.client.opavailable =
              a.opavailable;
            hbl.client.opmessage = a.opmessage;
            hbl.client.opstatus = a.opstatus;
            hbl.client.opbusy = a.opbusy;
            hbl.client.pop_out = a.pop_out;
            hbl.client.ssl = a.ssl;
            hbl.client.box_visible = a.box_visible;
            c = function(a) {
              return {
                available: a.opavailable,
                opavailable: a.opavailable,
                opstatus: a.opstatus,
                status: a.opstatus,
                message: a.opmessage,
                busy: a.opbusy,
                pop_out: a.pop_out,
                pop_out_change: hbl.client.pop_out != a.pop_out,
                chatting: hbl.client.chatting,
                box_visible: hbl.client.box_visible,
                opbusy: a.opbusy
              }
            };
            olark._.geoip = a.geoip;
            olark._.ipaddress = a.ipaddress;
            hbl.client.eventmgr.handle("nrpc_data_ready", c(a));
            hbl.client.eventmgr.handle("chat_started", {
              chatting: a.chatting,
              box_open: a.box_open,
              box_visible: a.box_visible,
              opstatus: a.opstatus,
              opavailable: a.opavailable,
              opmessage: a.opmessage,
              opbusy: a.opbusy,
              pop_out: a.pop_out,
              config: a.config,
              dconfig: a.dconfig,
              habla_message: a.habla_message,
              browser_ip: a.ipaddress,
              geolocation: a.geocode_ip
            });
            hbl.client.last_poll_index = 0;
            if (b.conversation_history) {
              for (var f = [], g = 0; g < b.conversation_history.length; g++) {
                var i =
                  b.conversation_history[g][0];
                if (i > hbl.client.last_poll_index) hbl.client.last_poll_index = i;
                var d = b.conversation_history[g][1];
                if (d.body) d.type == "visitor_message" && (i = 0), f.push([d.nickname, d.body, i]), hbl.client.op_nickname_map[d.nickname] = d.operator_id
              }
              hbl.client.setContents(f)
            }
            hbl.client.eventmgr.handle("operator_status_change", c(a));
            hbl.client.opavailable = a.opavailable;
            hbl.client.opmessage = a.opmessage;
            hbl.client.opstatus = a.opstatus;
            hbl.client.opbusy = a.opbusy;
            hbl.client.pop_out = a.pop_out;
            hbl.client.eventmgr.handle("operator_composing", {
              composing_type: a.operator_composing_state,
              operator_nickname: a.operator_nickname
            });
            hbl.client.composing = a.composing_type;
            hbl.client.whenNicknameAndPresenceAreAllowed(function() {
              b.resend_nickname && hbl.client.eventmgr.handle("resend_nickname", {});
              b.resend_status && hbl.client.eventmgr.handle("resend_status", {})
            });
            b.is_new_conversation && hbl.client.eventmgr.handle("session_was_not_in_memcache", {});
            hbl.client.pollingmanager.scheduleNextPoll()
          } else a && a.error && hbl.client.eventmgr.handle("habla_error", {
            etype: a.error
          })
        })
      };
      a.error != "fatal exception" ? a.ipaddress_lookup_needed ? (olark._.identityManager.setConversationId(a.conversation_id), hbl.client.record_ssl_ip(), hbl.client.eventmgr.register("geolocation_ready", function(c) {
        a.geolocation_data = c.geolocation;
        a.ipaddress = c.geolocation.ipaddress;
        i()
      })) : i() : olark._.hlog("#boot #spoof detected")
    }
  },
  start: function(a, b, d, c, g) {
    olark._.identityManager.setSiteId(d);
    olark._.identityManager.setConversationId(a);
    olark._.identityManager.setVisitorId(b);
    hbl.client.eventmgr = c;
    hbl.client.config =
      g;
    hbl.client.opstatus = null;
    hbl.client.opavailable = null;
    hbl.client.opmessage = null;
    hbl.client.chatting = !1;
    hbl.client.pop_out = !1;
    hbl.client.buffer = [];
    hbl.client.the_count = 0;
    hbl.client.newlinecount = 0;
    hbl.client.lastindex = 0;
    hbl.client.last_getmessages = new Date;
    hbl.client.jsondata = null;
    hbl.client.datareadycallback = null;
    hbl.client.getmsgcallback = null;
    hbl.client.first_time = !0;
    hbl.client.incoming_pipeline.setTarget(this);
    try {
      var i = new hbl.client.jsonproxy(olark._.nrpcBaseUrl);
      hbl.client.proxy = hbl.client.proxy3 =
        hbl.client.proxy2 = i;
      hbl.config && hbl.config.vars && !hbl.config.vars.local_mode && (olark._.P("begin"), hbl.client.proxy.begin(olark._.identityManager.getConversationId(), olark._.identityManager.getVisitorId(), olark._.identityManager.getSiteId(), hbl.get_current_page(), hbl.get_current_referrer(), g.vars.start_passive, g.vars.force_nickname, g.vars.no_system_messages, hbl.client.begin_call_back))
    } catch (k) {
      throw hbl.client.chatting = !1, hbl.util.reportException(k), k;
    }
  },
  jsoncallback_norv: function() {},
  jsonproxy: function(a,
    b) {
    this.uri = a;
    this.callq = [];
    this.rnd = b
  },
  check_getmsg: function() {},
  setContents: function(a) {
    if (!a || a.length == 0)
      if (window.olark && window.olark.__legacy_shim && window.olark.__legacy_shim.has_messages_in_history) a = [
        [null, "  ", 0.2]
      ];
      else return;
    for (var b = hbl.client.lastindex = 0; b < a.length; ++b)
      if (hbl.client.buffer[hbl.client.buffer.length] = [a[b][0], a[b][1], a[b][2]], a[b][2] > hbl.client.lastindex) hbl.client.lastindex = a[b][2];
    hbl.client.newlinecount = 1;
    window.olark && window.olark.__legacy_shim && window.olark.__legacy_shim.load_missed_messages &&
      window.olark.__legacy_shim.load_missed_messages(a);
    hbl.client.eventmgr.handle("receive_message", {
      type: "start",
      msg: a
    })
  },
  append: function(a) {
    if (a && a.length > 0) {
      for (var b = 0; b < a.length; ++b) hbl.client.buffer[hbl.client.buffer.length] = [a[b][0], a[b][1], a[b][2]];
      hbl.client.newlinecount += a.length;
      hbl.client.chatting = !0;
      hbl.client.eventmgr.handle("send_message", {
        type: "local_update",
        msg: a
      })
    }
  },
  append1: function(a) {
    if (a && a.length > 0) {
      for (var b = [], d = 0, c = 0; c < a.length; ++c)
        if (a[c][2] > hbl.client.lastindex) {
          hbl.client.lastindex =
            a[c][2];
          var g = hbl.client.incoming_pipeline.run(a[c]);
          g != void 0 && (hbl.client.buffer[hbl.client.buffer.length] = g, b.push(g));
          a[c] && (d += 1)
        }
      hbl.client.newlinecount += a.length;
      if (d > 0) hbl.client.chatting = !0;
      b.length > 0 && hbl.client.eventmgr.handle("receive_message", {
        type: "remote_update",
        msg: b
      })
    }
  },
  msg_callback: function(a) {
    a.error == "operator_is_busy" && hbl.eventmgr.handle("habla_error", {
      etype: "operator_is_busy"
    })
  },
  sendmessage: function(a, b, d, c, g, i) {
    hbl.client.lastNickname = g;
    hbl.client.lastStatusMessage = i;
    var k = !b;
    b = [
      [hbl.client.myname, a, k, d]
    ];
    k && hbl.client.append(b);
    c && (hbl.client.proxy.setnickname(olark._.identityManager.getConversationId(), g), hbl.client.proxy.sendpresence(olark._.identityManager.getConversationId(), i, "chat"));
    setTimeout(function() {
      hbl.client.proxy.sendmessage(olark._.identityManager.getConversationId(), a, k, d, hbl.client.msg_callback)
    }, hbl.client.SENDMESSAGE_DELAY);
    hbl.client.pollingmanager.startNextPollNow()
  },
  sendofflinemessage: function(a, b) {
    hbl.client.proxy.setnickname(olark._.identityManager.getConversationId(),
      hbl.client.lastNickname);
    hbl.client.proxy.sendpresence(olark._.identityManager.getConversationId(), hbl.client.lastStatusMessage, "chat");
    setTimeout(function() {
      hbl.client.proxy.sendofflinemessage(olark._.identityManager.getConversationId(), a, b)
    }, hbl.client.SENDMESSAGE_DELAY)
  },
  setnickname: function(a) {
    hbl.client.lastNickname = a;
    hbl.client.whenNicknameAndPresenceAreAllowed(function() {
      hbl.client.proxy.setnickname(olark._.identityManager.getConversationId(), a)
    })
  },
  sendcommand: function(a, b) {
    hbl.client.proxy.sendcommand(olark._.identityManager.getConversationId(),
      a, b)
  },
  record_ssl_ip: function() {
    if (!hbl.client.recorded_ssl_ip) hbl.client.proxy.geolocation(olark._.identityManager.getConversationId(), olark._.identityManager.getVisitorId()), hbl.client.recorded_ssl_ip = !0
  },
  restart_session: function() {
    hbl.client.proxy.noop(olark._.identityManager.getConversationId(), olark._.identityManager.getVisitorId())
  },
  setvcard: function() {},
  sendpresence: function(a, b) {
    hbl.client.lastStatusMessage = a;
    hbl.client.whenNicknameAndPresenceAreAllowed(function() {
      hbl.client.proxy.sendpresence(olark._.identityManager.getConversationId(),
        a, b)
    })
  },
  log_event: function(a, b) {
    hbl.client.proxy && hbl.client.proxy.log_event(olark._.identityManager.getConversationId(), a, b)
  },
  sendexpand: function() {},
  sendcompress: function() {},
  sendend: function() {},
  sendhide: function() {},
  sendshow: function() {},
  popout: function() {
    hbl.client.proxy && hbl.client.proxy.popout(olark._.identityManager.getConversationId())
  },
  end_popout: function() {
    hbl.client.proxy && hbl.client.proxy.end_popout(olark._.identityManager.getConversationId())
  },
  whenNicknameAndPresenceAreAllowed: function(a) {
    olark("api.visitor.getDetails",
      function(b) {
        if (b.secondsSinceLastMessage != void 0 || b.secondsSinceLastNotificationToOperator != void 0) a();
        else if (hbl.config.vars.show_in_buddy_list != "chatting") b = hbl.client.site_is_online, hbl.client.conversation_has_slot && b && a()
      })
  }
};
hbl.client.map = {
  command: "c",
  callback: "cb",
  group_id: "g",
  group_idstring: "g",
  conversation_id: "i",
  script_id: "j",
  site_idstring: "s",
  sequence_id: "q",
  status_message: "m",
  status_state: "p",
  current_url: "u",
  visitor_id: "v",
  referrer_url: "r"
};
hbl.client.jsonproxy.prototype.__build_nrpc_arguments = function(a) {
  var b = "";
  a.command && (b += "&c=" + encodeURIComponent(a.command + ""));
  a.sequence_id && (b += "&q=" + a.sequence_id);
  var d = hbl.client.map,
    c = [],
    g;
  for (g in a)
    if (c.push(g), a.hasOwnProperty(g) && a[g] && g != "append_settings" && g != "throttle" && g != "sequence_id" && g != "command") {
      var i = encodeURIComponent(a[g] + "");
      d[g] && (g = d[g]);
      b += "&" + g + "=" + i
    }
  b == "" && (b = "?command=invalid_buffer&buffer_is_empty=" + escape(c.join(",")));
  return b
};
hbl.client.jsonproxy.prototype.do_nrpc_call = function(a) {
  var b = hbl.client.pollingmanager.getNextPollTime();
  if (b) a.next_poll_time = b;
  if (hbl._pollevents_errors) a.num_retries = hbl._pollevents_errors;
  this.do_raw_nrpc_call(a)
};
hbl.client.jsonproxy.prototype.do_raw_nrpc_call = function(a) {
  var b = a.command,
    d = a.append_settings,
    c = "",
    g = hbl_ext;
  if (olark.__legacy_shim.allowEndConversation && (a.end_conversation = 1, olark._.identityManager.isNewConversation() && b === "create")) a.is_new_conversation = 1;
  a.visitor_id = a.visitor_id || olark._.identityManager.getVisitorId();
  if (b == "create" || b == "sendmessage") hbl.util.last_js_id = 1;
  hbl.util.last_js_id += 1;
  if (hbl.util.last_js_id < 1900) {
    hbl.util.last_js_pollid += 1;
    this.rnd && (c = parseInt(Math.random() * 10).toString() +
      "-");
    var i = "/" + b.charAt(0) + "?";
    b == "geolocation" && hblrpcTrick ? (c = "start-" + parseInt(Math.random() * 3).toString() + "." + hbl_hostname, c += i, g = "https") : c += this.uri + i;
    b = parseInt(Math.random() * 1E4) + "." + +new Date % 1E5 + "." + hbl.util.last_js_pollid;
    a.sequence_id = b;
    a.version = hblJavaScriptVersion;
    a.pretty = !0;
    a.throw_exceptions = window.olark.__buildinfo.strict ? !0 : !1;
    c += this.__build_nrpc_arguments(a);
    hbl.util.append_script(window, document, {
      scriptid: "o" + hbl.util.last_js_pollid,
      url: g + "://" + c,
      tries: d.tries,
      timeout: d.timeout,
      cache: !1,
      error_callback: d.error_callback
    })
  }
};
hbl.client.jsonproxy.prototype.begin = function(a, b, d, c, g) {
  a || olark._.hlog("missing sid #no_begin_wcsid_input");
  b || olark._.hlog("missing hblid #no_begin_hblid_input");
  var i = olark.__legacy_shim.currentGroupIdstring || "ALL",
    k = this,
    j = function() {
      k.do_nrpc_call({
        command: "create",
        conversation_id: a,
        visitor_id: b,
        site_idstring: d,
        current_url: c,
        referrer_url: g,
        callback: "hbl.client.callbacks.begin",
        group_id: i,
        throttle: !1,
        append_settings: {
          tries: 3,
          timeout: 2E4
        }
      })
    }, f = function(a) {
      a.status ? j() : hbl.client.callbacks.begin(a)
    },
    n = olark._.nrpcPrecache;
  n ? n.response ? f(n.response) : n.responseCallback = f : j()
};
hbl.client.jsonproxy.prototype.sendmessage = function(a, b, d, c) {
  var g = olark.__legacy_shim.currentGroupIdstring;
  this.do_nrpc_call({
    command: "sendmessage",
    conversation_id: a,
    site_idstring: olark._.identityManager.getSiteId(),
    body: b,
    no_history: !d,
    notification: c,
    callback: "hbl.client.callbacks.sendmessage",
    group_idstring: g,
    version: hblJavaScriptVersion,
    append_settings: {
      tries: 3,
      timeout: 45E3
    }
  })
};
hbl.client.jsonproxy.prototype.sendofflinemessage = function(a, b, d) {
  var c = olark.__legacy_shim.currentGroupIdstring;
  a = {
    command: "sendofflinemessage",
    conversation_id: a,
    site_idstring: olark._.identityManager.getSiteId(),
    body: b,
    callback: "hbl.client.noop",
    group_idstring: c,
    version: hblJavaScriptVersion,
    append_settings: {
      tries: 3,
      timeout: 45E3
    }
  };
  for (var g in d) d.hasOwnProperty(g) && (a["form_" + g] = d[g]);
  this.do_nrpc_call(a)
};
hbl.client.jsonproxy.prototype.sendcommand = function(a, b, d) {
  var c = olark.__legacy_shim.currentGroupIdstring;
  if (b == "disconnectchat") this.do_nrpc_call({
    command: "destroy",
    conversation_id: a,
    callback: "hbl.client.noop",
    group_idstring: c,
    append_settings: {
      tries: 3,
      timeout: 45E3
    }
  });
  else if (b == "send_compose_state") this.do_nrpc_call({
    command: "sendcomposing",
    conversation_id: a,
    callback: "hbl.client.noop",
    state: d,
    group_idstring: c,
    append_settings: {
      tries: 3,
      timeout: 45E3
    }
  });
  else if (b == "return_long_poll_now") this.do_nrpc_call({
    command: "finishlongpoll",
    conversation_id: a,
    callback: "hbl.client.noop",
    state: d,
    group_idstring: c,
    append_settings: {
      tries: 3,
      timeout: 45E3
    }
  });
  else if (b == "unlock_operator") this.do_nrpc_call({
    command: "sendunlock",
    conversation_id: a,
    callback: "hbl.client.noop",
    message: d,
    group_idstring: c,
    append_settings: {
      tries: 3,
      timeout: 45E3
    }
  });
  else throw "Unsupported command: " + b;
};
hbl.client.jsonproxy.prototype.setnickname = function(a, b) {
  this.do_nrpc_call({
    command: "sendnickname",
    conversation_id: a,
    callback: "hbl.client.noop",
    nickname: b,
    group_idstring: olark.__legacy_shim.currentGroupIdstring,
    append_settings: {
      tries: 3,
      timeout: 45E3
    }
  })
};
hbl.client.jsonproxy.prototype.noop = function(a, b) {
  this.do_nrpc_call({
    command: "noop",
    conversation_id: a,
    visitor_id: b,
    site_idstring: olark._.identityManager.getSiteId(),
    callback: "hbl.client.noop",
    append_settings: {
      tries: 3,
      timeout: 45E3
    }
  })
};
hbl.client.jsonproxy.prototype.geolocation = function(a, b) {
  this.do_nrpc_call({
    command: "geolocation",
    conversation_id: a,
    visitor_id: b,
    site_idstring: olark._.identityManager.getSiteId(),
    callback: "hbl.client.geolocation_ready",
    append_settings: {
      tries: 3,
      timeout: 45E3
    }
  })
};
hbl.client.jsonproxy.prototype.sendpresence = function(a, b, d) {
  this.do_nrpc_call({
    command: "sendpresence",
    conversation_id: a,
    callback: "hbl.client.noop",
    status_message: b,
    status_state: d,
    group_idstring: olark.__legacy_shim.currentGroupIdstring,
    append_settings: {
      tries: 5,
      timeout: 45E3
    }
  })
};
hbl._exponential_backoff_pollevents_error_handler = function() {
  var a = 1E3 * hbl._pollevents_errors * hbl._pollevents_errors;
  a > 45E3 && (a = 45E3);
  setTimeout(function() {
    hbl.client.pollingmanager.finishLastPoll();
    hbl.client.pollingmanager.startNextPollNow()
  }, a);
  hbl._pollevents_errors += 1
};
hbl.client.jsonproxy.prototype.getmessages = function(a, b) {
  hbl.client.the_count++;
  hbl.client.last_getmessages = new Date;
  this.do_nrpc_call({
    command: "pollevents",
    throttle: !1,
    conversation_id: a,
    callback: "hbl.client.callbacks.pollevents",
    timeout: 29,
    after: b,
    append_settings: {
      timeout: 4E4,
      error_callback: hbl._exponential_backoff_pollevents_error_handler
    }
  })
};
hbl.client.jsonproxy.prototype.pollmessages = function(a, b) {
  hbl.client.the_count++;
  this.do_nrpc_call({
    command: "pollevents",
    throttle: !1,
    conversation_id: a,
    callback: "hbl.client.callbacks.pollevents",
    timeout: 0,
    after: b,
    append_settings: {
      timeout: 1E4,
      error_callback: hbl._exponential_backoff_pollevents_error_handler
    }
  })
};
hbl.client.jsonproxy.prototype.popout = function(a) {
  this.do_nrpc_call({
    command: "popout",
    conversation_id: a,
    callback: "hbl.client.noop",
    append_settings: {
      tries: 3,
      timeout: 45E3
    }
  })
};
hbl.client.jsonproxy.prototype.end_popout = function(a) {
  this.do_nrpc_call({
    command: "endpopout",
    conversation_id: a,
    callback: "hbl.client.noop",
    append_settings: {
      tries: 3,
      timeout: 45E3
    }
  })
};
hbl.client.jsonproxy.prototype.log_event = function(a, b, d) {
  this.do_nrpc_call({
    command: "logevent",
    conversation_id: a,
    site_idstring: olark._.identityManager.getSiteId(),
    callback: "hbl.client.noop",
    event_type: b,
    body: d,
    append_settings: {
      tries: 3,
      timeout: 45E3
    }
  })
};
hbl._hwindow = function(a, b, d) {
  this.config = b;
  this.client = a;
  this.handlers = !1;
  this.theme = void 0;
  this.eventmgr = d;
  this.pop_out = this.offline_msg_visible = this.offline_msg_started = this.has_typed = this.expanded_textbox = this.loaded = !1;
  this.setTheme = function(a) {
    this.theme && this.theme.remove();
    this.theme = a;
    this.theme.build(this.config, this.client, this.config.vars.start_visible, this.config.vars.start_habla_window_visible);
    this.check_theme_for_link_div();
    hbl.util.pluginloader(this.config, this.client, this)
  };
  this.check_theme_for_link_div =
    function() {
      if (this.theme) {
        this.config.vars.hkey && (this.config.vars.special_link = hbl.util.decode_base64(this.config.vars.hkey).replace("href", 'style="' + this.config.vars._habla_link_a + '" href'));
        if (!this.theme.habla_link_div || this.theme.habla_link_div.style && this.theme.habla_link_div.style.display == "none" || this.theme.habla_link_div.innerHTML.indexOf("http://hab.la") < 0 && this.theme.habla_link_div.innerHTML.indexOf("http://www.olark.com") < 0 || !this.theme.habla_link_div.parentNode) {
          this.theme.habla_link_div =
            document.createElement("div");
          this.config.vars.force_name_habla_link_div && this.theme.habla_link_div.setAttribute("id", "habla_link_div");
          if (this.config.vars.special_link) this.theme.habla_link_div.innerHTML = this.config.vars.special_link.replace("hblink1", "hblink9");
          this.theme.config.vars.append_middle ? this.theme.habla_middle_div.appendChild(this.theme.habla_link_div) : this.theme.habla_expanded_div.appendChild(this.theme.habla_link_div)
        }
        if (!document.getElementById("hblink9")) this.theme.habla_link_div.innerHTML =
          hbl.util.decode_base64("RnJlZSA8YSBocmVmPSJodHRwOi8vd3d3Lm9sYXJrLmNvbS8/ZnJlZV9saXZlaGVscCIgaWQ9ImhibGluazkiIHRhcmdldD0iX2JsYW5rIj5PbGFyazwvYT4gbGl2ZWhlbHAgfCA8YSBocmVmPSJodHRwOi8vd3d3Lm9sYXJrLmNvbS8/bW9yZSIgaWQ9ImhibGluazk5IiB0YXJnZXQ9Il9ibGFuayI+R2V0IGl0ITwvYT48IS0taHR0cDovL3d3dy5vbGFyay5jb20tLT4=");
        this.set_link(document.getElementById("hblink9"));
        this.set_link(document.getElementById("hblink99"));
        this.theme.habla_link_div.setAttribute("style", this.config.vars._habla_link_div);
        this.theme.habla_link_div.style.clear =
          "both";
        document.getElementById("hblink9") && document.getElementById("hblink9").setAttribute("style", this.config.vars._habla_link_a);
        document.getElementById("hblink99") && document.getElementById("hblink99").setAttribute("style", this.config.vars._habla_link_a)
      }
  };
  this.set_link = function(a) {
    if (a && a.href) {
      var b = a.href.split(/[\?\#]/);
      a.href = b[0] + "?rid=" + olark._.identityManager.getSiteId() + "&" + b[1];
      a.href = a.href.replace("olark.com/", "olark.com/welcome/");
      a.target = "_blank";
      var i = window.olark.__legacy_shim.box_state ==
        "expanded" ? !0 : !1;
      olark("api.box.onExpand", function() {
        setTimeout(function() {
          i = !0
        }, 2E3)
      });
      a.onclick = function() {
        hbl.client.eventmgr.handle("olark_link_clicked", {});
        if (i) return !0;
        return !1
      }
    }
  };
  this.register_handlers = function() {
    if (!this.handlers) this.handlers = !0, this.eventmgr.register("window_focus", this.events.onWindowFocus, 0), this.eventmgr.register("window_click", this.events.onWindowFocus, 0), this.eventmgr.register("window_submit", this.events.onWindowSubmit, 0), this.eventmgr.register("window_form_submit",
      this.events.onWindowFormSubmit, 0), this.eventmgr.register("window_topbar_clicked", this.events.topBarClicked, 0), this.eventmgr.register("habla_closebutton_a_onclick", this.events.closeClicked, 0), this.eventmgr.register("habla_sizebutton_a_onclick", this.events.topBarClicked, 0), this.eventmgr.register("habla_oplink_a_onclick", this.events.topBarClicked, 0), this.eventmgr.register("operator_status_change", this.events.onOpstatusStatusChanged, 0), this.eventmgr.register("receive_message", this.events.onChatUpdated,
      0), this.eventmgr.register("send_message", this.events.onChatUpdated, 0), this.eventmgr.register("chat_started", this.events.onChatStarted, 0), this.eventmgr.register("theme_loaded", this.events.onThemeLoaded, 0)
  };
  this.get_operator_state = function() {
    if (this.config.vars.local_mode) return this.config.vars.local_operator_state || "available";
    return this.opavailable ? this.opbusy ? this.config.vars.show_busy_message ? "busy" : "available" : this.opstatus == "chat" || this.opstatus == "available" || !this.opstatus || this.opstatus ==
      "" ? "available" : "notavailable" : "notavailable"
  };
  this.determine_window_status = function(a) {
    var b = {};
    if (window.olark && window.olark.__legacy_shim) {
      b = window.olark.__legacy_shim;
      b.box_state != null && (a.box_open = b.box_state == "expanded" ? !0 : !1);
      if (b.box_visible != null) a.window.theme.visible = b.box_visible ? !0 : !1, a.box_visible = b.box_visible ? !0 : !1;
      a.window.config.vars.close_hides_window && b.box_state == "closed" && (a.box_visible = !1);
      a.window.theme.state = b.box_state || a.window.theme.state
    }
    if (a.pop_out && !a.window.config.vars.is_popup) return !1;
    if (a.pop_out_change && !a.pop_out) return !0;
    if (a.chatting || hbl.client.buffer.length > 0 && !a.window.config.vars.close_hides_window) return !0;
    if (a.box_open || a.window.theme.state == "expanded") return !0;
    if (a.window.config.vars.start_hidden && !a.window.theme.visible) return !1;
    if (a.window.config.vars.close_hides_window && !a.box_visible) return !1;
    if (a.window.config.vars.hide_not_available && !a.opavailable) return !1;
    b = a.opavailable && a.opstatus != "chat" && a.opstatus != void 0 && a.opstatus != "" && a.opstatus != "available";
    if (a.window.config.vars.hide_not_available &&
      b) return !1;
    return !0
  };
  this.setInputBox = function(a, b, i) {
    this.theme.setInputBox(a, b, i)
  };
  this.setWindowText = function() {
    var a = this.get_operator_state();
    if ((a == "notavailable" || this.offline_msg_started) && this.config.vars.offline_msg_mode) this.setHeader(this.config.vars.not_available_text), this.setOfflineWindow(this.config.vars.offline_message || " ");
    else if (this.setOfflineWindow(!1), a == "notavailable") this.setHeader(this.config.vars.not_available_text), hbl.client.buffer.length < 1 && this.setBody(this.config.vars.offline_message);
    else if (a == "away") this.config.vars.show_away_as_header && this.opmessage ? this.setHeader(this.opmessage, !0) : this.setHeader(this.config.vars.busy_text || this.config.vars.away_text), this.client.buffer.length == 0 && this.setBody(this.config.vars.away_message || this.config.vars.busy_message || this.config.vars.offline_message);
    else if (a == "busy") this.setHeader(this.config.vars.busy_text), this.setBody(this.config.vars.busy_message);
    else if (this.client.buffer.length == 0) {
      a = b.vars.force_nickname && b.vars.force_nickname !=
        "";
      var g = window.olark && window.olark.__legacy_shim ? !0 : !1;
      this.config.vars.show_pre_chat && !this.theme.pre_chat_sent && (g || !a) ? this.setShowPreChat(!0) : this.setBody(this.config.vars.welcome_msg);
      this.setHeader(this.config.vars.before_chat_text)
    } else this.setHeader(this.config.vars.in_chat_text)
  };
  this.appendFromBuffer = function(a) {
    if (!this.offline_msg_started)
      if (this.theme)
        for (var b = 0; b < a.length; b++) a[b] && this.theme.appendNiceMessage(a[b][0], a[b][1], !0);
      else hbl.hwindow_last_buffer = a, this.eventmgr.register("theme_loaded",
        function(a) {
          a.window.appendFromBuffer(hbl.hwindow_last_buffer);
          hbl.hwindow_last_buffer = ""
        }, 100)
  };
  this.setHeader = function(a, b) {
    a != void 0 && (b && (a = ".." + a.substr(0, 10) + ".."), this.theme.setHeader(a))
  };
  this.events = {
    onOpstatusStatusChanged: function(a) {
      a.window.opstatus = a.status;
      a.window.opmessage = a.message;
      a.window.opbusy = a.busy;
      a.window.pop_out = a.pop_out;
      !a.window.opavailable && a.available && (!a.window.config.vars.offline_msg_mode || !a.window.offline_msg_mode) && a.window.reloadBuffer();
      a.window.opavailable =
        a.available;
      a.window.setWindowText();
      var b = a.window.determine_window_status(a),
        i = !a.pop_out && a.pop_out_change;
      if (window.olark && window.olark.__legacy_shim && i && window.olark.__legacy_shim.populate_message_history_from_chat_api) habla_conversation_div.innerHTML = "", window.olark.__legacy_shim.populate_message_history_from_chat_api();
      b || (a.available || !a.window.config.vars.hide_not_available) && a.window.theme.visible ? a.window.show() : a.window.hide(1)
    },
    onChatUpdated: function(a) {
      a.window.setShowPreChat(!1);
      a.window.appendFromBuffer(a.msg)
    },
    onChatStarted: function(a) {
      a.window.opavailable = a.opavailable;
      a.window.opbusy = a.busy;
      a.nick != null && !a.nick.match(/webuser\d\d/) && a.window.setnickname(a.nick, 1);
      hbl.chat_started_arg = a;
      if (a.window.theme) a.window.theme.build(a.window.config, a.window.client, !0), a.window.events.onThemeLoaded(a);
      else if (a.window.config.vars.theme_obj) a.window.setTheme(b.vars.theme_obj), a.window.events.onThemeLoaded(a);
      else {
        hbl.chat_started_arg = a;
        var g = "";
        a.window.config.vars.theme_path && (g = "http://" + hbl_static_hostname +
          "/" + a.window.config.vars.theme_path);
        a.window.config.vars.theme_url && (g = a.window.config.vars.theme_url);
        hbl.util.simple_load_js_async(g)
      }
      hbl.client.eventmgr.handle("chat_loaded", a)
    },
    onThemeLoaded: function(a) {
      a.window.theme || a.window.setTheme(a.obj);
      hbl.util.BrowserDetect.use_position_absolute_on_ie && hbl.config.render_ie_hacks();
      a = hbl.chat_started_arg;
      a.window.determine_window_status(a) ? (a.window.show(1), (!a.pop_out || a.window.config.vars.is_popup) && (a.box_open || a.window.config.vars.start_expanded ||
        window.olark && window.olark.__legacy_shim && olark.__legacy_shim.box_state == "expanded") && a.window.expand()) : a.window.hide(1);
      if (a.habla_message) {
        a.window.config.vars.offline_message = a.habla_message.msg;
        if (a.habla_message.header) a.window.config.vars.not_available_text = a.habla_message.header, a.window.setHeader(habla_window.config.vars.not_available_text);
        a.window.show(1);
        a.habla_message.expand && a.window.expand();
        a.window.theme.habla_conversation_div.scrollTop = 0
      }
    },
    onWindowFocus: function(a) {
      a.window.normal();
      a.window.setWindowText()
    },
    topBarClicked: function(a) {
      a.window.normal();
      a.window.expanded ? (a.window.compress(), hbl.client.eventmgr.handle("window_compressed")) : (a.window.expand(), hbl.client.eventmgr.handle("window_expanded"));
      return !1
    },
    closeClicked: function(a) {
      a.window.close();
      hbl.client.eventmgr.handle("window_closed");
      return !1
    },
    onWindowFormSubmit: function(a) {
      a.window.send()
    },
    onWindowSubmit: function(a) {
      a.window.send()
    }
  };
  this.send_pipeline = new hbl.util.pipeline(this);
  this.send_pipeline.add(hbl.pipelines.nickname,
    999);
  return this
};
hbl._hwindow.prototype.setnickname = function(a, b) {
  b == void 0 && this.client.setnickname(nickname)
};
hbl._hwindow.prototype.show = function(a) {
  this.theme.state == "closed" && this.theme.__set_css_window_state("compressed");
  this.theme.show();
  this.visible = !0;
  !a && !this.config.vars.disable_rpc_state && this.client.sendshow();
  hbl.eventmgr.handle("habla_window_changed", {
    type: "show"
  })
};
hbl._hwindow.prototype.popout = function(a) {
  if (habla_popup = window.open(hblPopupURL + "?_ok=" + olark._.identityManager.getSiteId() + "&wcsid=" + olark._.identityManager.getConversationId() + "&_oklv=" + olark._.identityManager.getOklvValueForPopout() + "&hblid=" + olark._.identityManager.getVisitorId() + "&_okgid=" + olark._.cookieManager.get("_okgid") + "&olfsk=" + olark._.cookieManager.get("olfsk") + "&host=" + window.location.host, "habla_popout", "width=300,height=400,scrollbars=no,location=no,status=no,menubar=no,toolbar=no,directories=no,resizable=yes")) a ||
    this.client.popout(), this.pop_out = !0, hbl.client.pop_out = !0, habla_popup.focus(), this.hide(a), hbl.eventmgr.handle("habla_window_changed", {
      type: "popout"
    })
};
hbl._hwindow.prototype.end_popout = function(a) {
  this.pop_out = !1;
  a || this.client.end_popout();
  hbl.eventmgr.handle("habla_window_changed", {
    type: "endpop_out"
  })
};
hbl._hwindow.prototype.close = function(a) {
  this.theme.close();
  !a && !this.config.vars.disable_rpc_state && this.client.sendend();
  this.config.vars.close_hides_window && this.hide();
  hbl.eventmgr.handle("habla_window_changed", {
    type: "close"
  })
};
hbl._hwindow.prototype.hide = function(a) {
  this.theme.hide();
  this.visible = !1;
  !a && !this.config.vars.disable_rpc_state && this.client.sendhide();
  hbl.eventmgr.handle("habla_window_changed", {
    type: "hide"
  })
};
hbl._hwindow.prototype.setWidth = function(a) {
  this.theme && this.theme.setWidth(a);
  hbl.eventmgr.handle("habla_window_changed", {
    type: "resize"
  })
};
hbl._hwindow.prototype.setInputHeight = function(a) {
  this.theme.setInputHeight(a);
  hbl.eventmgr.handle("habla_window_changed", {
    type: "resize"
  })
};
hbl._hwindow.prototype.setHeight = function(a) {
  this.theme && this.theme.setHeight(a);
  hbl.eventmgr.handle("habla_window_changed", {
    type: "resize"
  })
};
hbl._hwindow.prototype.compress = function() {
  this.expanded = !1;
  this.theme.compress();
  hbl.util.BrowserDetect.use_position_absolute_on_ie && this.visible && window.hbl.__ie6_floating_div_monitor && window.hbl.__ie6_floating_div_monitor.__move_to_correct_location();
  hbl.eventmgr.handle("habla_window_changed", {
    type: "compress"
  });
  this.config.vars.disable_rpc_state || this.client.sendcompress()
};
hbl._hwindow.prototype.expand = function() {
  this.expanded = !0;
  hbl.util.BrowserDetect.use_position_absolute_on_ie && this.config.vars.ycorner == "bottom" && this.theme.setXY(this.theme.habla_window_div.style.left.match(/\d\d*/), this.theme.habla_window_div.style.top.match(/\d\d*/) - this.config.vars.convo_height - this.config.vars.panel_offset);
  this.theme && this.theme.expand();
  this.config.vars.disable_rpc_state || this.client.sendexpand();
  hbl.eventmgr.handle("habla_window_changed", {
    type: "expand"
  })
};
hbl._hwindow.prototype.setPosition = function(a) {
  this.theme.setPosition(a)
};
hbl._hwindow.prototype.setInline = function(a) {
  this.theme.setInline(a)
};
hbl._hwindow.prototype.setMargins = function(a, b, d, c) {
  this.theme.setMargins(a, b, d, c)
};
hbl._hwindow.prototype.getHeader = function() {
  return this.theme.getHeader()
};
hbl._hwindow.prototype.reloadBuffer = function() {
  this.theme.setBody("");
  this.appendFromBuffer(this.client.buffer)
};
hbl._hwindow.prototype.setBody = function(a) {
  this.setOfflineWindow(!1);
  this.theme.setBody(a || "")
};
hbl._hwindow.prototype.setOfflineWindow = function(a) {
  this.theme.setOfflineWindow(a)
};
hbl._hwindow.prototype.setShowPreChat = function(a) {
  this.theme.setShowPreChat(a)
};
hbl._hwindow.prototype.highlight = function() {
  this.theme.highlight()
};
hbl._hwindow.prototype.normal = function() {
  this.theme.normal()
};
hbl._hwindow.prototype.send = function() {
  var a = this.theme.getMessageInputField(),
    b = this.theme.getMessageInputFieldValue();
  if (b == this.config.vars.say_text) this.theme.setMessageInputFieldValue("");
  else if (b && b.length > 0) try {
    this.theme.setMessageInputFieldValue(""), (b = this.send_pipeline.run(b)) && this.client.sendmessage(b), this.normal()
  } catch (d) {
    throw d;
  }
  this.config.vars.disableFocus || (a.focus(), setTimeout(function() {
    habla_window.theme.getMessageInputField().focus()
  }, 10));
  return !1
};
hbl.hwindow_util.wrap_and_create_links = function(a, b) {
  function d(a) {
    var c = a.childNodes;
    if (c.length == 0) {
      if (a.data && (c = a.data.replace(/([^\s]{13})/g, "$1%|%").split("%|%"), c.length > 1))
        for (var b in a = document.createElement("span"), c)
          if (c.hasOwnProperty(b) && typeof c[b] == "string") {
            var i = document.createElement("span");
            b > 0 && i.setAttribute("class", "olark_new_line");
            c[b] = c[b].replace("<", "&lt;");
            c[b] = c[b].replace(">", "&gt;");
            i.innerHTML = c[b];
            a.appendChild(i);
            a.appendChild(document.createElement("wbr"))
          }
    } else
      for (b in c) typeof c[b] ==
        "object" && a.replaceChild(d(c[b]), c[b]);
    return a
  }

  function c(a) {
    var c = {
      ":)": "smile",
      ":(": "frown"
    }, b;
    for (b in c)
      if (c.hasOwnProperty(b)) {
        var i = RegExp("\\s" + b.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "g"),
          g = "olark-smiley-" + c[b];
        a = a.replace(i, function(a) {
          return ' <span class="' + g + '">' + a + "</span>"
        })
      }
    return a
  }

  function g(a, c, b) {
    var i = /^\+?[\<\[]?(?:\%3C)?\s*((https?|ftp|file|telnet|ldap|irc|nntp|news|irc):\/\/\/?)?([\w-]+\.)+[a-zA-Z]{2,4}(:\d+)?(\/[\w\!\#\$\%\&\'\*\+\/\-\=\?\^\_\.\`\{\|\}\~\-]*)*(\?.*)?[\>\]]?$|^[\w\!\#\$\%\&\'\*\+\.\/\-\=\?\^\_\`\{\|\}\~\-]+(?:\.[\w!\#$%&'*+\/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
    a = a.split(" ");
    for (var g in a) a.hasOwnProperty(g) && (a[g] = a[g].replace(i, function(a) {
      var i = !0;
      a.charAt(0) === "+" && (i = !1, a = a.slice(1));
      var g = a,
        e = '<a href="' + b(a, i) + '" target="',
        d = k.config.vars.chat_does_not_follow_external_links ? !0 : !1;
      a = hbl.hwindow_util.refers_to_local_domain(a) ? !1 : !0;
      return e + (!i || d && a ? "_blank" : c) + '" >' + g.replace(/</, "&lt;").replace(/>/, "&gt") + "</a>"
    }));
    return a.join(" ")
  }

  function i(a, c) {
    return hbl.hwindow_util.get_habla_url(a, k, c)
  }
  var k = b;
  return function(a) {
    a = a.replace(/<\/*body[^>]*>/ig,
      "");
    a = a.replace(/<((\/[^a]|[^\/a])[^>]*)>/ig, "<wbr>&lt;$1&gt;<wbr>");
    k.config.vars.parse_links && (a = g(a, k.config.vars.url_handler_target_window, i));
    k.config.vars.parse_smileys !== !1 && (a = c(a));
    var b = document.createElement("div");
    b.innerHTML = a;
    b = d(b);
    return b.innerHTML
  }(a)
};
hbl.hwindow_util.refers_to_local_domain = function(a, b) {
  function d(a) {
    return a.replace(/^(?:https?\:\/\/)?(?:www\.)?/, "").split("/")[0]
  }
  b = b || window.location.host;
  return d(b) === d(a)
};
hbl.hwindow_util.get_habla_url = function(a, b, d) {
  var c = /^\s*(ftp|file|telnet|ldap|irc|nntp|news|irc).*/,
    g = /^\s*(\/).*/,
    i = /^\s*(https?)\:\/\/.+/,
    k = function(a) {
      if (b.config.vars.url_handler && d) {
        for (var c = window.location.search.replace(/^\?/, "").split(/&/), i = c.length - 1; i >= 0; i--) c[i].split(/=/);
        return b.config.vars.url_handler + "?_ok=" + olark._.identityManager.getSiteId() + "&wcsid=" + olark._.identityManager.getConversationId() + "&_oklv=" + olark._.identityManager.getOklvValueForPopout() + "&hblid=" + olark._.identityManager.getVisitorId() +
          "&_okgid=" + olark._.cookieManager.get("_okgid") + "&olfsk=" + olark._.cookieManager.get("olfsk") + "&url=" + hbl.util.encode_base64(a) + "&host=" + window.location.host
      } else return a
    };
  a = a.replace(/^\s*%3C\s*/, "");
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(a) ? "mailto:" + a : c.test(a) ? a : g.test(a) ? document.location.protocol + "//" + document.domain + a : (c = null, c = i.test(a) ? a : hbl.hwindow_util.refers_to_local_domain(a) ?
    document.location.protocol + "//" + a : "http://" + a, b.config.vars.chat_does_not_follow_external_links || hbl.hwindow_util.refers_to_local_domain(c) ? c : k(c))
};
hbl.pipelines.nickname = function(a, b) {
  if (a.substr(0, 6) == "/nick ") {
    var d = a.substr(6);
    b.client.setnickname(d)
  } else return a
};
hbl.pipelines.wrap_text = function(a, b) {
  return hbl.hwindow_util.wrap_and_create_links(a, b)
};
hbl.pipelines.emoticons = function(a) {
  a = a.replace(/\;\-\)/, "<code><big>;-)</big></code>");
  return a = a.replace(/\:\-\)/, "<code><big>:-)</big></code>")
};
hbl.pipelines.push_url = function(a) {
  msg_t = a;
  a = a[1];
  if (a.substr(0, 6) == "!push ") {
    var b = "";
    a = a.replace(/&lt;/i, "[");
    a = a.replace(/\/*&gt;/i, "]");
    a.match(/<a/) ? (a = a.match(/src\s*=\s*"*([^\"]+)\"*/i), a.length > 1 && (b = a[1])) : a.match(/\[(http[^\]]+)\s*\]/i) ? (a = a.match(/\[(http[^\]]+)\]/i), b = a[1]) : b = a.substr(6, a.length - 6);
    b = b.split(" ")[0];
    b = b.split("%20")[0];
    if (b != "") {
      var d = hbl.hwindow_util.get_habla_url(b, habla_window, !0);
      setTimeout(function() {
        window.location = d
      }, 0);
      return
    }
  }
  return msg_t
};
hbl.client.incoming_pipeline.add(hbl.pipelines.push_url, 999);
hbl.plugins.incoming_notification_vars = {};
hbl.plugins.incoming_notification = function() {
  this.name = "incoming_notification";
  this.load = function(a) {
    var b = this;
    hbl.plugins.incoming_notification_vars.freq = 3E3;
    hbl.plugins.incoming_notification_vars.flashicon = !1;
    hbl.plugins.incoming_notification_vars.flashing = !1;
    hbl.plugins.incoming_notification_vars.original_favicon = !1;
    habla_wcsend_input = hbl.util.find_or_create_el("habla_wcsend_input", "textarea");
    hbl.plugins.incoming_notification_vars.windowTextCleared = !0;
    a.hwindow.config.vars.flash_titlebar && (a.hwindow.eventmgr.register("receive_message",
      this.onReceiveMessage), a.hwindow.eventmgr.register("send_message", this.onWindowFocus), a.hwindow.eventmgr.register("window_focus", this.onWindowFocus), a.hwindow.eventmgr.register("window_click", this.onWindowFocus));
    if (a.hwindow.config.vars.flash_icons) {
      hbl.plugins.incoming_notification_vars.default_flash_on_icon = a.hwindow.config.vars.default_flash_off_icon;
      if (!hbl.oldtitle) hbl.oldtitle = /Message Received/i.test(document.title) ? "" : document.title || "";
      if (!hbl.plugins.incoming_notification_vars.originalFavicon) hbl.plugins.incoming_notification_vars.originalFavicon =
        hbl.plugins.incoming_notification_vars.remove_current_icon(!0) || a.hwindow.config.vars.default_flash_on_icon;
      hbl.plugins.incoming_notification_vars.default_flash_off_icon = hbl.plugins.incoming_notification_vars.originalFavicon;
      habla_wcsend_input.onkeypress = function() {
        b.onWindowFocus({
          window: a.hwindow
        });
        hbl.plugins.incoming_notification_vars.windowTextCleared = !0
      }
    }
  };
  this.onReceiveMessage = function(a) {
    if (!/^\s*!/.test(a.msg[a.msg.length - 1][1]) && a.type == "remote_update") {
      a.window.highlight();
      hbl.plugins.incoming_notification_vars.last_msg =
        "";
      if (hbl.client.buffer && hbl.client.buffer[hbl.client.buffer.length - 1]) hbl.plugins.incoming_notification_vars.last_msg = hbl.client.buffer[hbl.client.buffer.length - 1][1].substr(0, 10), a.window.setHeader(".." + hbl.plugins.incoming_notification_vars.last_msg + "..");
      hbl.plugins.incoming_notification_vars.windowTextCleared = !1;
      hbl.plugins.incoming_notification_vars.flashOlarkFavicon()
    }
  };
  this.onWindowFocus = function(a) {
    hbl.plugins.incoming_notification_vars.resetFavicon();
    if (!hbl.plugins.incoming_notification_vars.windowTextCleared) a.window.setWindowText(),
    hbl.plugins.incoming_notification_vars.windowTextCleared = !0, a = document.getElementById("habla_topbar_div"), a.className = a.className.replace(/habla_topbar_div_highlighted/, "habla_topbar_div_normal")
  };
  hbl.plugins.incoming_notification_vars.flashOlarkFavicon = function() {
    document.title = "(Message Received: " + hbl.plugins.incoming_notification_vars.last_msg + ") " + hbl.oldtitle;
    hbl.plugins.incoming_notification_vars.set_icon(hbl.plugins.incoming_notification_vars.default_flash_on_icon);
    var a = !0;
    hbl.plugins.incoming_notification_vars.flashingInterval =
      setInterval(function() {
        a ? hbl.plugins.incoming_notification_vars.set_icon(hbl.plugins.incoming_notification_vars.originalFavicon) : hbl.plugins.incoming_notification_vars.set_icon(hbl.plugins.incoming_notification_vars.default_flash_on_icon);
        a = !a
      }, hbl.plugins.incoming_notification_vars.freq)
  };
  hbl.plugins.incoming_notification_vars.resetFavicon = function() {
    document.title = hbl.oldtitle;
    clearInterval(hbl.plugins.incoming_notification_vars.flashingInterval);
    var a = hbl.plugins.incoming_notification_vars.originalFavicon ||
      "";
    hbl.plugins.incoming_notification_vars.remove_current_icon();
    hbl.plugins.incoming_notification_vars.set_icon(a);
    hbl.plugins.incoming_notification_vars.flashing = !1
  };
  hbl.plugins.incoming_notification_vars.remove_current_icon = function(a) {
    if (document.getElementsByTagName("head") && document.getElementsByTagName("head").length != 0)
      for (var b = document.getElementsByTagName("head")[0].getElementsByTagName("link"), d = 0; d < b.length; d++) {
        var c = b[d];
        if (c.type == "image/x-icon" && /favicon|favico|shortcut|icon|shortcut\s*icon/i.test(c.rel)) return b =
          c.href, a || document.getElementsByTagName("head")[0].removeChild(c), b
      }
  };
  hbl.plugins.incoming_notification_vars.set_icon = function(a) {
    var b = document.createElement("link");
    b.type = "image/x-icon";
    b.rel = "shortcut icon";
    b.href = a;
    hbl.plugins.incoming_notification_vars.remove_current_icon();
    document.getElementsByTagName("head") && document.getElementsByTagName("head").length != 0 && document.getElementsByTagName("head")[0].appendChild(b)
  }
};
hbl.plugins.messages_received = 0;
hbl.plugins.expand_on_receive_message = function() {
  this.name = "expand_on_receive_message";
  this.load = function(a) {
    a.hwindow.eventmgr.register("receive_message", this.onReceiveMessage, -1)
  };
  this.onReceiveMessage = function(a) {
    if (!/^\s*!/.test(a.msg[a.msg.length - 1][1]) && (hbl.plugins.messages_received += 1, !a.window.pop_out))
      if (a.type != "start" && (!a.window.config.vars.expandOnFirstMessageReceived || a.window.config.vars.expandOnMessageReceived || hbl.plugins.messages_received == 1)) hbl.client.eventmgr.handle("window_expanded"),
    a.window.expand(), a.window.show();
    else if (a.type != "start" && a.window.theme && a.window.theme.state == "closed") a.window.theme.state = "compressed", a.window.show()
  }
};
hbl.plugins.away_div_handler = function() {
  this.name = "away_div_handler";
  this.load = function(a) {
    hbl.util.hide_div("habla_unavailable_div");
    hbl.util.hide_div("habla_available_div");
    hbl.util.show_div("habla_loading_div", a.hwindow.config.vars.habla_special_div_show_type) || hbl.util.show_div("habla_unavailable_div", a.hwindow.config.vars.habla_special_div_show_type);
    (document.getElementById("habla_available_div") != void 0 || document.getElementById("habla_unavailable_div") != void 0) && a.hwindow.eventmgr.register("operator_status_change",
      this.onOperatorStatusChange)
  };
  this.onOperatorStatusChange = function(a) {
    var b = a.status;
    a.available && (!b || b == "chat" || !a.window.config.vars.hide_when_away) ? (hbl.util.show_div("habla_available_div", a.window.config.vars.habla_special_div_show_type), hbl.util.hide_div("habla_unavailable_div")) : (hbl.util.hide_div("habla_available_div"), hbl.util.show_div("habla_unavailable_div", a.window.config.vars.habla_special_div_show_type));
    hbl.util.hide_div("habla_loading_div")
  }
};
hbl.plugins.auto_initiate = function() {
  this.load = function(a) {
    a.hwindow.config.vars.auto_initiate_allowed && a.hwindow.config.vars.auto_initiate && a.hwindow.eventmgr.register("chat_loaded", this.onChatLoad)
  };
  this.onChatLoad = function(a) {
    if (a.session_start && !a.opbusy && a.opavailable) habla_window.auto_initiated = !1, setTimeout(function() {
        if (hbl.client.buffer.length == 0 && hbl.client.opavailable) {
          habla_window.show();
          habla_window.expand();
          habla_window.auto_initiated = !0;
          var b = a.window.config.vars.auto_initiate_message;
          habla_window.theme.appendNiceMessage(a.window.config.vars.auto_initiate_name, b[Math.floor(Math.random() * b.length)], !0, !1, !0);
          habla_window.highlight();
          hbl.client.buffer = [" "];
          habla_window.send_pipeline.add(function(a) {
            if (habla_window.auto_initiated) hbl.client.sendmessage(habla_window.config.vars.auto_initiate_response_notify, !0), habla_window.auto_initiated = !1;
            return a
          }, 1E4);
          habla_window.config.vars.auto_initiate_notify && hbl.client.sendmessage(habla_window.config.vars.auto_initiate_notify_msg, !0)
        }
      },
      parseInt(a.window.config.vars.auto_initiate_period * 1E3))
  }
};
hbl.plugins.google_translate = function() {
  this.name = "googletranslate";
  this.load = function() {}
};
hbl.plugins.sounds = function() {
  this.name = "sounds";
  this.load = function(a) {
    a.conf.vars.enableSounds == 1 && hbl.util.simple_load_js_async(a.conf.vars.plugin_path + "contributed/sounds.js")
  }
};
hbl.plugins.smileys = function() {
  this.name = "smileys";
  this.load = function(a) {
    a.conf.vars.enableSmileys == 1 && hbl.util.simple_load_js_async(a.conf.vars.plugin_path + "contributed/smileys.js")
  }
};
hbl.themes.default_theme = function() {
  this.appended = !0;
  this.last_msg = -1;
  this.highlighted = this.visible = !1;
  this.state = "compressed";
  this.ready = this.pre_chat_sent = this.offline_window = this.message_sent = !1;
  this.position = "BR";
  this.build = function(a, b, i) {
    this.client = b;
    this.config = a;
    this.set_config();
    this.load_styles();
    this.div = void 0;
    this.divid = a.vars.divid;
    this.build_dom(i);
    this.set_dom_event_handlers();
    this.config.init_from_config(this);
    this.palette_hack();
    this.render_styles();
    !this.config.vars.disableJSStyles && !this.config.vars.no_palette && this.render_palette();
    this.set_default_text();
    this.register_handlers();
    this.ready = !0;
    this.config.vars.disableJSStyles && !this.config.vars.start_hidden && this.show();
    hbl.eventmgr.handle("post_theme_loaded")
  };
  this.palette_hack = function() {
    if (hbl.need_ugly_backwards_palette_hack) {
      var a = {}, b;
      for (b in this.config.style_classes_map)
        if (this.config.style_classes_map.hasOwnProperty(b))
          for (var i in this.config.style_classes_map[b])
            if (this.config.style_classes_map[b].hasOwnProperty(i))
              for (var d in this.config.palette) this.config.palette.hasOwnProperty(d) &&
                "hbl_pal_" + d == this.config.style_classes_map[b][i] && (this.config.style_classes_map[b][i] = "hbl_pal_" + d + "_local", a[d + "_local"] = this.config.palette[d]);
      this.config.palette = a
    }
  };
  this.set_config = function() {
    var a = new hbl.hconfig;
    a.style_classes = {};
    a.style_classes_map = {
      habla_window_div: ["habla_window_div_position", "habla_window_div_base", "hbl_pal_main_width"],
      habla_closebutton_a: ["habla_button", "habla_button_a_normal", "hbl_pal_header_font_size", "hbl_pal_main_font_family", "hbl_pal_button_bg", "hbl_pal_button_fg"],
      habla_sizebutton_a: ["habla_button", "habla_button_a_normal", "hbl_pal_header_font_size", "hbl_pal_main_font_family", "hbl_pal_button_bg", "hbl_pal_button_fg"],
      habla_popout_a: ["habla_button", "habla_button_a_normal", "hbl_pal_header_font_size", "hbl_pal_main_font_family", "hbl_pal_button_bg", "hbl_pal_button_fg"],
      habla_end_popout_a: ["habla_button", "habla_button_a_normal", "hbl_pal_header_font_size", "hbl_pal_main_font_family", "hbl_pal_button_bg", "hbl_pal_button_fg"],
      habla_button_normal: ["habla_button", "habla_button_a_normal",
        "hbl_pal_header_font_size", "hbl_pal_button_bg", "hbl_pal_button_fg"
      ],
      habla_button_highlighted: ["habla_button", "habla_button_a_highlighted", "hbl_pal_header_font_size", "hbl_pal_button_bg_highlight", "hbl_pal_button_fg_highlight"],
      habla_button_hover: ["habla_button", "habla_button_a_hover", "hbl_pal_header_font_size", "hbl_pal_button_bg_hover", "hbl_pal_button_fg_hover"],
      habla_panel_div: ["habla_panel_border", "hbl_pal_main_bg", "hbl_pal_panel_border", "hbl_pal_main_font_family", "hbl_pal_main_font_size"],
      habla_oplink_a: ["habla_oplink_a_normal",
        "hbl_pal_header_font_size", "hbl_pal_title_fg"
      ],
      habla_oplink_hover: ["habla_oplink_a_hover", "hbl_pal_header_font_size", "hbl_pal_title_fg"],
      habla_wcsend_input_pre: ["habla_wcsend_field", "habla_wcsend_input_pre", "habla_wcsend_input_normal", "hbl_pal_input_pre_fg", "hbl_pal_main_font_family", "hbl_pal_input_font_size", "hbl_pal_control_border"],
      habla_wcsend_input_post: ["habla_wcsend_field", "habla_wcsend_input_post", "habla_wcsend_input_normal", "hbl_pal_main_fg", "hbl_pal_main_font_family", "hbl_pal_input_font_size"],
      habla_wcsend_input: ["habla_wcsend_field", "habla_wcsend_input_pre", "habla_wcsend_input_normal", "hbl_pal_control_border", "hbl_pal_main_font_family", "hbl_pal_input_font_size"],
      habla_wcsend_input_highlighted: ["habla_wcsend_field", "habla_wcsend_input_pre", "habla_wcsend_input_highlighted", "hbl_pal_control_highlight_border", "hbl_pal_main_font_family", "hbl_pal_input_font_size"],
      habla_name_input: ["habla_wcsend_field", "habla_wcsend_input_pre", "habla_wcsend_input_normal", "hbl_pal_main_font_family", "hbl_pal_control_border",
        "hbl_pal_input_font_size"
      ],
      habla_wcsend_input: ["habla_wcsend_field", "habla_wcsend_input_pre", "habla_wcsend_input_normal", "hbl_pal_main_font_family", "hbl_pal_control_border", "hbl_pal_input_font_size"],
      habla_offline_email_input: ["habla_wcsend_field", "habla_wcsend_input_pre", "habla_wcsend_input_normal", "hbl_pal_main_font_family", "hbl_pal_control_border", "hbl_pal_input_font_size"],
      habla_offline_phone_input: ["habla_wcsend_field", "habla_wcsend_input_pre", "habla_wcsend_input_normal", "hbl_pal_main_font_family",
        "hbl_pal_control_border", "hbl_pal_input_font_size"
      ],
      habla_offline_body_input: ["habla_wcsend_input_pre", "habla_wcsend_input_normal", "hbl_pal_main_font_family", "hbl_pal_control_border", "hbl_pal_input_font_size"],
      habla_offline_clear_div: ["clear_style"],
      habla_chatform_form: ["habla_chatform_form"],
      habla_input_div: ["habla_input_div"],
      habla_pre_chat_email_input: ["habla_pre_chat_form_field", "habla_wcsend_field", "habla_wcsend_input_pre", "habla_wcsend_input_normal", "hbl_pal_main_font_family", "hbl_pal_control_border",
        "hbl_pal_input_font_size"
      ],
      habla_pre_chat_name_input: ["habla_pre_chat_form_field", "habla_wcsend_field", "habla_wcsend_input_pre", "habla_wcsend_input_normal", "hbl_pal_main_font_family", "hbl_pal_control_border", "hbl_pal_input_font_size"],
      habla_pre_chat_phone_input: ["habla_pre_chat_form_field", "habla_wcsend_field", "habla_wcsend_input_pre", "habla_wcsend_input_normal", "hbl_pal_main_font_family", "hbl_pal_control_border", "hbl_pal_input_font_size"],
      habla_offline_message_sent_div: ["hbl_panel", "habla_offline_message_sent_div",
        "hbl_pal_main_height", "hbl_pal_control_border", "hbl_pal_main_fg"
      ],
      habla_pre_chat_div: ["hbl_panel", "habla_pre_chat_div", "hbl_pal_main_height", "hbl_pal_main_fg"],
      habla_offline_message_div: ["hbl_panel", "habla_offline_message_div", "hbl_pal_control_border", "hbl_pal_main_fg"],
      habla_conversation_div: ["hbl_panel", "habla_conversation_div", "hbl_pal_main_height", "hbl_pal_control_border", "hbl_pal_main_fg", "hbl_pal_main_bg"],
      habla_say_text_span: ["habla_say_text_span", "hbl_pal_main_fg"],
      habla_submit_button: ["habla_submit_button"],
      habla_offline_submit_input: ["habla_offline_submit_input", "hbl_pal_offline_submit_fg", "hbl_pal_control_border", "hbl_pal_offline_submit_bg"],
      habla_pre_chat_submit_input: ["habla_pre_chat_form_field", "habla_offline_submit_input", "hbl_pal_offline_submit_fg", "hbl_pal_control_border", "hbl_pal_offline_submit_bg"],
      habla_offline_error_span: ["habla_offline_error_span"],
      habla_pre_chat_clear_div: ["clear_style"],
      habla_conversation_p_item: ["habla_conversation_p_item", "hbl_pal_main_fg"],
      habla_conversation_person1: ["habla_conversation_person1",
        "hbl_pal_local_fg"
      ],
      habla_conversation_person2: ["habla_conversation_person2", "hbl_pal_remote_fg"],
      habla_conversation_text_span: ["habla_conversation_text_span", "hbl_pal_main_fg"],
      habla_conversation_notification_nickname: ["habla_conversation_person2", "hbl_pal_remote_fg", "habla_conversation_notification_nickname"],
      habla_conversation_notification_text_span: ["habla_conversation_text_span", "hbl_pal_main_fg", "habla_conversation_notification"],
      habla_topbar_div_compressed: ["habla_topbar_div_normal", "hbl_pal_title_fg",
        "hbl_pal_title_bg", "habla_topbar_div_compressed"
      ],
      habla_topbar_div: ["habla_topbar_div_normal", "hbl_pal_title_fg", "hbl_pal_title_bg", "habla_topbar_div_expanded"],
      habla_topbar_div_highlighted: ["habla_topbar_div_highlighted", "hbl_pal_title_fg_highlight", "hbl_pal_title_bg_highlight", "habla_topbar_div_expanded"]
    };
    a.vars = {
      habla_sizebutton_text_expanded: "_",
      habla_sizebutton_text_compressed: "^",
      habla_closebutton_text: "x",
      habla_popout_text: ">",
      habla_end_popout_text: "&lt;&lt;",
      _habla_link_div: "padding: 3px 0 5px 0 !important; font-family: helvetica, sans-serif; text-align: center; text-transform: uppercase; font-size: 9px; letter-spacing: 2px; font-weight: bold; color: #aaa !important;",
      _habla_link_a: "font-family: helvetica, sans-serif; text-transform: uppercase; font-size: 9px !important; letter-spacing: 2px; font-weight: bold; color: #e75917 !important;"
    };
    this.config.merge(a);
    a = new hbl.hconfig;
    a.load_defaults();
    this.config.merge(a);
    hbl.client.pollingmanager.setLongPoll(!this.config.vars.poll);
    this.config.remap_palette();
    this.config.remap_palette();
    if (this.config.vars.right_to_left) this.config.vars.local_user_display_name = "&larr;";
    this.config.vars.enable_buttons && (this.config.style_classes_map.habla_topbar_div =
      ["habla_topbar_div_normal", "habla_topbar_clickable", "hbl_pal_title_fg", "hbl_pal_title_bg", "habla_topbar_div_expanded"]);
    if (this.config.vars.corner_position) this.config.vars.corner_position = this.__getAdjustedPosition(this.config.vars.corner_position)
  };
  this.build_dom = function(a, b) {
    if (document.getElementById(this.divid)) this.appended = !1;
    this.habla_container = hbl.util.find_or_create_div(this.divid, this.config.vars.not_append == void 0 ? hbl.util.get_body() : void 0);
    this.habla_container.id = "habla_beta_container_do_not_rely_on_div_classes_or_names";
    this.habla_container.className = this.__get_browser_class() + " " + this.__get_mobile_class() + " " + (document.compatMode == "BackCompat" ? "olrk-quirks" : "olrk-noquirks");
    var i = hbl.util.find_or_create_div("hbl_operator_state_div", this.habla_container);
    i.className = "olrk-unknown";
    olark("api.chat.onOperatorsAvailable", function() {
      i.className = "olrk-available"
    });
    olark("api.chat.onOperatorsAway", function() {
      i.className = "olrk-away"
    });
    var d = hbl.util.find_or_create_div("hbl_region", i);
    d.className = this.config.vars.right_to_left ?
      "olrk-rtl" : "olrk-normal";
    this.window_state_div = hbl.util.find_or_create_div("habla_window_state_div", d);
    this.window_state_div.className = this.config.vars.show_end_popout ? "olrk-state-popout" : " olrk-state-compressed";
    this.habla_window_div = hbl.util.find_or_create_div(this.divid, this.window_state_div);
    b || hbl.util.hide_div(this.habla_window_div);
    if (d = this.config.vars.corner_position && this.config.vars.corner_position.match(/B/)) this.habla_compressed_div = hbl.util.find_or_create_div("habla_compressed_div",
      this.habla_window_div);
    this.habla_panel_div = hbl.util.find_or_create_div("habla_panel_div", this.habla_window_div);
    this.habla_both_div = hbl.util.find_or_create_div("habla_both_div", this.habla_panel_div);
    hbl.util.hide_div(this.habla_panel_div);
    this.habla_topbar_div = hbl.util.find_or_create_div("habla_topbar_div", this.habla_both_div);
    if (this.config.vars.add_tab_closure_span) this.olrk_tab_closure_span = hbl.util.find_or_create_el("olrk_tab_closure_span", "span"), this.habla_both_div.appendChild(this.olrk_tab_closure_span);
    this.habla_expanded_div = hbl.util.find_or_create_div("habla_expanded_div", this.habla_panel_div);
    if (!d) this.habla_compressed_div = hbl.util.find_or_create_div("habla_compressed_div", this.habla_window_div);
    if (this.config.vars.left_align_widget) this.habla_compressed_div.className = "olrk-left-align";
    this.habla_closed_div = hbl.util.find_or_create_div("habla_closed_div", this.habla_window_div);
    a || this.hide();
    this.habla_oplink_a = hbl.util.find_or_create_el("habla_oplink_a", "a");
    this.config.vars.append_oplink_before_buttons &&
      this.habla_topbar_div.appendChild(this.habla_oplink_a);
    if (this.config.vars.show_end_popout) this.habla_end_popout_a = hbl.util.find_or_create_el("habla_end_popout_a", "a"), this.habla_topbar_div.appendChild(this.habla_end_popout_a);
    else if (this.config.vars.show_popout) this.habla_popout_a = hbl.util.find_or_create_el("habla_popout_a", "a"), this.habla_topbar_div.appendChild(this.habla_popout_a);
    if (this.config.vars.enable_buttons && !this.config.vars.hide_min_max_buttons) this.habla_closebutton_a = hbl.util.find_or_create_el("habla_closebutton_a",
      "a"), this.config.vars.close_hides_window && this.habla_topbar_div.appendChild(this.habla_closebutton_a), this.habla_sizebutton_a = hbl.util.find_or_create_el("habla_sizebutton_a", "a"), this.habla_topbar_div.appendChild(this.habla_sizebutton_a);
    this.config.vars.append_oplink_before_buttons || this.habla_topbar_div.appendChild(this.habla_oplink_a);
    d = function(a) {
      var c = document.createElement("div");
      c.className = "hbl_txt_wrapper";
      c.appendChild(a);
      return c
    };
    this.habla_middle_div = hbl.util.find_or_create_div("habla_middle_div",
      this.habla_expanded_div);
    var j = hbl.util.find_or_create_div("habla_middle_wrapper_div", this.habla_middle_div);
    this.habla_conversation_div = hbl.util.find_or_create_div("habla_conversation_div", j);
    this.habla_offline_message_sent_div = hbl.util.find_or_create_div("habla_offline_message_sent_div", j);
    this.habla_offline_message_sent_div.style.display = "none";
    this.habla_offline_message_span = hbl.util.find_or_create_el("habla_offline_message_span", "span");
    this.habla_offline_message_div = hbl.util.find_or_create_div("habla_offline_message_div",
      j);
    this.habla_offline_message_div.style.display = "none";
    this.habla_name_input = hbl.util.find_or_create_el("habla_name_input", "textarea");
    this.habla_offline_phone_input = hbl.util.find_or_create_el("habla_offline_phone_input", "textarea");
    this.habla_offline_email_input = hbl.util.find_or_create_el("habla_offline_email_input", "textarea");
    this.habla_offline_body_input = hbl.util.find_or_create_el("habla_offline_body_input", "textarea");
    this.habla_offline_clear_div = hbl.util.find_or_create_el("habla_offline_clear_div",
      "div");
    this.habla_offline_submit_input = hbl.util.find_or_create_el("habla_offline_submit_input", "input");
    try {
      this.habla_offline_submit_input.setAttribute("type", "submit")
    } catch (f) {}
    this.habla_offline_error_span = hbl.util.find_or_create_el("habla_offline_error_span", "span");
    this.habla_offline_message_div.appendChild(this.habla_offline_message_span);
    this.habla_offline_message_div.appendChild(d(this.habla_name_input));
    this.habla_offline_message_div.appendChild(d(this.habla_offline_email_input));
    hbl.config.vars.require_offline_phone >
      0 && this.habla_offline_message_div.appendChild(d(this.habla_offline_phone_input));
    this.habla_offline_message_div.appendChild(d(this.habla_offline_body_input));
    hbl.config.vars.disable_extra_br || this.habla_offline_message_div.appendChild(hbl.util.find_or_create_el("habla_br", "br"));
    this.habla_offline_message_div.appendChild(this.habla_offline_error_span);
    this.habla_offline_message_div.appendChild(this.habla_offline_submit_input);
    this.habla_offline_message_div.appendChild(this.habla_offline_clear_div);
    this.habla_pre_chat_span = hbl.util.find_or_create_el("habla_pre_chat_span", "span");
    this.habla_pre_chat_div = hbl.util.find_or_create_div("habla_pre_chat_div", j);
    this.habla_pre_chat_div.style.display = "none";
    this.habla_pre_chat_name_input = hbl.util.find_or_create_el("habla_pre_chat_name_input", "textarea");
    this.habla_pre_chat_clear_div = hbl.util.find_or_create_el("habla_pre_chat_clear_div", "div");
    this.habla_pre_chat_email_input = hbl.util.find_or_create_el("habla_pre_chat_email_input", "textarea");
    this.habla_pre_chat_phone_input =
      hbl.util.find_or_create_el("habla_pre_chat_phone_input", "textarea");
    this.habla_pre_chat_submit_input = hbl.util.find_or_create_el("habla_pre_chat_submit_input", "input");
    try {
      this.habla_pre_chat_submit_input.setAttribute("type", "submit")
    } catch (n) {}
    this.habla_pre_chat_error_span = hbl.util.find_or_create_el("habla_pre_chat_error_span", "span");
    this.habla_pre_chat_div.appendChild(this.habla_pre_chat_span);
    this.habla_pre_chat_div.appendChild(d(this.habla_pre_chat_name_input));
    this.habla_pre_chat_div.appendChild(d(this.habla_pre_chat_email_input));
    this.habla_pre_chat_div.appendChild(d(this.habla_pre_chat_phone_input));
    hbl.config.vars.disable_extra_br || this.habla_pre_chat_div.appendChild(hbl.util.find_or_create_el("habla_br_2", "br"));
    this.habla_pre_chat_div.appendChild(this.habla_pre_chat_error_span);
    this.habla_pre_chat_div.appendChild(this.habla_pre_chat_submit_input);
    this.habla_pre_chat_div.appendChild(this.habla_pre_chat_clear_div);
    this.habla_chatform_form = hbl.util.find_or_create_el("habla_chatform_form", "form");
    this.habla_chatform_form.setAttribute("action",
      "#");
    this.habla_chatform_form.setAttribute("method", "GET");
    this.habla_chatform_form.setAttribute("autocomplete", "off");
    this.habla_input_div = hbl.util.find_or_create_el("habla_input_div", "div");
    this.habla_wcsend_input = hbl.util.find_or_create_el("habla_wcsend_input", "textarea");
    this.habla_wcsend_input.setAttribute("size", this.config.vars.input_box_size);
    this.habla_input_div.appendChild(d(this.habla_wcsend_input));
    if (hbl.util.BrowserDetect.need_submit_button) {
      this.habla_submit_button = hbl.util.find_or_create_el("habla_submit_button",
        "input");
      try {
        this.habla_submit_button.setAttribute("type", "button")
      } catch (t) {}
      this.habla_input_div.appendChild(this.habla_submit_button)
    }
    this.habla_chatform_form.appendChild(this.habla_input_div);
    this.habla_middle_div.appendChild(this.habla_chatform_form)
  };
  this.set_events = function(a, b) {
    if (typeof a != "undefined") {
      var i = function(b, i, f) {
        return function(g) {
          var d;
          if (!g) g = window.event;
          if (g.target) d = g.target;
          else if (g.srcElement) d = g.srcElement;
          if (d.nodeType == 3) d = d.parentNode;
          if (d == a && (habla_window.eventmgr.handle(b +
            "_" + i, {
              target: d,
              event: g
            }), f && (g.cancelBubble = !0, g.stopPropagation))) return g.stopPropagation(), !1
        }
      };
      a.onblur = i(b, "onblur");
      a.onfocus = i(b, "onfocus");
      a.onclick = i(b, "onclick", !0);
      a.onmouseover = i(b, "onmouseover");
      a.onmouseout = i(b, "onmouseout")
    }
  };
  this.set_dom_event_handlers = function() {
    if (this.habla_submit_button) this.habla_submit_button.onclick = function() {
      habla_window.eventmgr.handle("window_form_submit", {
        event: void 0
      })
    };
    this.set_events(this.habla_wcsend_input, "habla_wcsend_input", !0);
    this.set_events(this.habla_name_input,
      "habla_name_input");
    this.set_events(this.habla_offline_email_input, "habla_offline_email_input");
    this.set_events(this.habla_offline_phone_input, "habla_offline_phone_input");
    this.set_events(this.habla_offline_body_input, "habla_offline_body_input");
    this.set_events(this.habla_offline_submit_input, "habla_offline_submit_input");
    this.set_events(this.habla_pre_chat_email_input, "habla_pre_chat_email_input");
    this.set_events(this.habla_pre_chat_phone_input, "habla_pre_chat_phone_input");
    this.set_events(this.habla_pre_chat_name_input,
      "habla_pre_chat_name_input");
    this.set_events(this.habla_pre_chat_submit_input, "habla_pre_chat_submit_input");
    this.habla_conversation_div.onclick = function() {
      return habla_window.eventmgr.handle("habla_conversation_div_onclick")
    };
    this.habla_chatform_form.onfocus = function() {
      habla_window.eventmgr.handle("habla_chatform_form_onfocus")
    };
    this.habla_chatform_form.onsubmit = function(a) {
      habla_window.eventmgr.handle("window_form_submit", {
        event: a
      });
      return !1
    };
    this.habla_pre_chat_phone_input.onkeypress = function(a) {
      if (!a) a =
        window.event;
      keynum = void 0;
      if (window.event) a = window.event, keynum = a.keyCode;
      else if (a.which) keynum = a.which;
      if (keynum == 13 || keynum == 10) return habla_window.eventmgr.handle("habla_pre_chat_submit_input_onclick"), !1
    };
    this.habla_pre_chat_email_input.onkeypress = function(a) {
      if (!a) a = window.event;
      keynum = void 0;
      if (window.event) a = window.event, keynum = a.keyCode;
      else if (a.which) keynum = a.which;
      if (keynum == 13 || keynum == 10) return habla_window.eventmgr.handle("habla_pre_chat_submit_input_onclick"), !1
    };
    this.habla_pre_chat_name_input.onkeypress =
      function(a) {
        if (!a) a = window.event;
        keynum = void 0;
        if (window.event) a = window.event, keynum = a.keyCode;
        else if (a.which) keynum = a.which;
        if (keynum == 13 || keynum == 10) return habla_window.eventmgr.handle("habla_pre_chat_submit_input_onclick"), !1
    };
    this.habla_wcsend_input.onkeydown = function(a) {
      if (!a) a = window.event;
      (function(b) {
        function i(a) {
          olark.__legacy_shim.disableComposing || hbl.client.sendcommand("send_compose_state", a)
        }

        function d() {
          clearTimeout(b.visitorHasPausedTyping);
          b.visitorHasPausedTyping = setTimeout(function() {
            j();
            i(f.PAUSED)
          }, n)
        }

        function j() {
          clearTimeout(b.visitorHasPausedTyping);
          i(f.ACTIVE);
          b.visitorHasStartedTyping = !1
        }
        var f = {
          ACTIVE: "active",
          INACTIVE: "inactive",
          COMPOSING: "composing",
          PAUSED: "paused"
        }, n = 3E3;
        b.visitorHasStartedTyping = b.visitorHasStartedTyping || !1;
        b.visitorHasPausedTyping = b.visitorHasPausedTyping || -1;
        switch (a.keyCode) {
          case 10:
          case 13:
            j();
            break;
          default:
            if (habla_window.theme.habla_wcsend_input.value == "") j();
            else {
              if (!b.visitorHasStartedTyping) b.visitorHasStartedTyping = !0, i(f.COMPOSING);
              d()
            }
        }
      })(this);
      if (!habla_window.theme.habla_wcsend_input.has_typed) return a.keyCode != 13 && a.keyCode != 10 ? habla_window.setInputBox(habla_window.theme.habla_wcsend_input, String.fromCharCode(a.keyCode), "highlight") : habla_window.setInputBox(habla_window.theme.habla_wcsend_input, "", "highlight"), habla_window.theme.habla_wcsend_input.has_typed = !0, !1;
      (function() {
        function a(f, g) {
          function d() {
            b = !1
          }
          if (b) return !1;
          else {
            var j = g.parentNode || document.body || document.documentElement;
            b = !0;
            setTimeout(d, 600);
            if (typeof c == "undefined") c =
              document.createElement("olark"), c.style.display = "block", c.style.visibility = "hidden", c.style.position = "absolute", j.appendChild(c);
            var p = f.replace(/(\<|\>)/g, "^");
            c.innerHTML = p;
            p = parseInt(c.offsetWidth) >= parseInt(g.offsetWidth);
            j.removeChild(c);
            return p
          }
        }
        var b = !1,
          c;
        if (!habla_window.config.vars.disable_expand_text_input && !habla_window.expanded_textbox && a(habla_window.theme.getMessageInputFieldValue(), habla_window.theme.getMessageInputField())) {
          habla_window.expanded_textbox = !0;
          habla_window.setInputHeight(habla_window.config.vars.resize_input_height);
          var d = habla_window.theme.habla_wcsend_input.parentNode;
          d.className = d.className.replace("hbl_long_text_entered", "") + " hbl_long_text_entered"
        }
        if (!habla_window.config.vars.disable_expand_text_input && habla_window.expanded_textbox && habla_window.theme.getMessageInputFieldValue().length < habla_window.config.vars.resize_length) habla_window.expanded_textbox = !1, habla_window.setInputHeight(habla_window.config.vars.input_height), d = habla_window.theme.habla_wcsend_input.parentNode, d.className = d.className.replace("hbl_long_text_entered",
          "") + " hbl_long_text_entered"
      })();
      if (a.keyCode == 13 || a.keyCode == 10) {
        if (habla_window.theme.getMessageInputFieldValue().replace(/^\s*|\s*$/g, "") == "") return;
        habla_window.expanded_textbox = !1;
        habla_window.setInputHeight(habla_window.config.vars.input_height);
        habla_window.eventmgr.handle("window_submit", {
          event: a
        });
        return !1
      }
      return !0
    };
    this.set_events(this.habla_oplink_a, "habla_oplink_a");
    this.config.vars.show_end_popout ? this.set_events(this.habla_end_popout_a, "habla_end_popout_a") : this.config.vars.show_popout &&
      this.set_events(this.habla_popout_a, "habla_popout_a");
    this.config.vars.enable_buttons ? (this.habla_topbar_div.onclick = function(a) {
      habla_window.eventmgr.handle("window_topbar_clicked");
      if (!a) a = window.event;
      a.cancelBubble = !0;
      a.stopPropagation && a.stopPropagation();
      return !1
    }, this.config.vars.hide_min_max_buttons || (this.set_events(this.habla_closebutton_a, "habla_closebutton_a"), this.set_events(this.habla_sizebutton_a, "habla_sizebutton_a"))) : this.habla_oplink_a.onclick = function() {
      return !1
    }
  };
  this.styles =
    [];
  this.set_css_style = function(a) {
    if (a)
      if (a = a.replace("static.olark.com", hbl_static_hostname), /^\s*http/i.test(a) || (a = hbl_ext + "://" + a), a += "?" + hbl_ext, this.style_div) {
        var b = hbl.util.find_or_create_el("habla_style_div_alternative", "link");
        b.setAttribute("type", "text/css");
        b.setAttribute("rel", "alternative stylesheet");
        hbl.util.get_head().appendChild(b);
        b.setAttribute("href", a);
        a = document.getElementById("habla_style_div");
        b = document.getElementById("habla_style_div_alternative");
        a.setAttribute("rel",
          "alternative stylesheet");
        b.setAttribute("rel", "stylesheet");
        a.id = "habla_style_div_alternative";
        b.id = "habla_style_div"
      } else this.style_div = hbl.util.find_or_create_el("habla_style_div", "link"), this.style_div.setAttribute("type", "text/css"), this.style_div.setAttribute("rel", "stylesheet"), hbl.util.get_head().appendChild(this.style_div), this.style_div.setAttribute("href", a)
  };
  this.load_styles = function() {
    var a = this.config.vars.legacy_css_for_linkfollow;
    if (window.__olark_iframe_wrapper && a) this.set_css_style(a);
    else if (!this.config.vars.disableJSStyles || this.config.vars.force_olark_css) {
      a = hbl.util.BrowserDetect.use_position_absolute_on_ie;
      var b = document.compatMode == "BackCompat" ? !0 : !1,
        i = void 0;
      i = window.__olark_popout ? this.config.vars.popout_css_url ? this.config.vars.popout_css_url : hbl_static_hostname + "/themes/azul_popout/preview_theme.css?" + hblCacheConstant : this.config.vars.inline_css_url ? a ? b && this.config.vars.inline_css_url_quirks ? this.config.vars.inline_css_url_quirks : this.config.vars.inline_css_url_ie ?
        this.config.vars.inline_css_url_ie : this.config.vars.inline_css_url : b && this.config.vars.inline_css_url_quirks ? this.config.vars.inline_css_url_quirks : this.config.vars.inline_css_url : a ? hbl_static_hostname + "/themes/defaults/base.ie.css?" + hblCacheConstant : hbl_static_hostname + "/themes/defaults/base.css?" + hblCacheConstant;
      this.set_css_style(i)
    }
  };
  this.render_styles = function() {
    if (!this.config.vars.require_name) this.habla_pre_chat_name_input.style.display = "none", this.habla_pre_chat_name_input.parentNode.style.display =
      "none";
    if (!this.config.vars.require_phone) this.habla_pre_chat_phone_input.style.display = "none", this.habla_pre_chat_phone_input.parentNode.style.display = "none";
    if (!this.config.vars.require_email) this.habla_pre_chat_email_input.style.display = "none", this.habla_pre_chat_email_input.parentNode.style.display = "none";
    this.config.render_all_styles(this)
  };
  this.setInputBox = function(a, b, i, d) {
    a.value = b;
    this.setInputBoxStyle(a, i, d)
  };
  this.setInputBoxStyle = function(a, b, i) {
    i ? this.config.set_element_classes(a, "habla_wcsend_input_post") :
      this.config.set_element_classes(a, "habla_wcsend_input_pre");
    b == "normal" ? this.config.set_element_classes(a, "habla_wcsend_input") : b == "highlight" && this.config.set_element_classes(a, "habla_wcsend_input_highlighted")
  };
  this.set_default_text = function() {
    this.set_default_text_event(this.habla_name_input, "habla_name_input", this.config.vars.habla_name_input_text);
    this.set_default_text_event(this.habla_offline_email_input, "habla_offline_email_input", this.config.vars.habla_offline_email_text);
    this.set_default_text_event(this.habla_offline_phone_input,
      "habla_offline_phone_input", this.config.vars.habla_offline_phone_text);
    this.set_default_text_event(this.habla_offline_body_input, "habla_offline_body_input", this.config.vars.habla_offline_body_text);
    this.set_default_text_event(this.habla_pre_chat_name_input, "habla_pre_chat_name_input", this.config.vars.habla_name_input_text);
    this.set_default_text_event(this.habla_pre_chat_email_input, "habla_pre_chat_email_input", this.config.vars.habla_offline_email_text);
    this.set_default_text_event(this.habla_pre_chat_phone_input,
      "habla_pre_chat_phone_input", this.config.vars.habla_offline_phone_text);
    this.set_default_text_event(this.habla_wcsend_input, "habla_wcsend_input", this.config.vars.textbox_message || this.config.vars.say_text);
    this.habla_offline_submit_input.value = this.config.vars.habla_offline_submit_value;
    this.set_events(this.habla_wcsend_input, "habla_wcsend_input");
    this.set_events(this.habla_offline_email_input, "habla_offline_email_input");
    this.set_events(this.habla_offline_phone_input, "habla_offline_phone_input");
    this.set_events(this.habla_offline_body_input, "habla_offline_body_input");
    this.set_events(this.habla_offline_submit_input, "habla_offline_submit_input");
    this.habla_offline_message_sent_div.innerHTML = this.config.vars.habla_offline_sent_text;
    if (this.habla_closebutton_a) this.habla_closebutton_a.innerHTML = this.config.vars.habla_closebutton_text;
    if (this.habla_sizebutton_a) this.habla_sizebutton_a.innerHTML = this.config.vars.habla_sizebutton_text_compressed;
    if (this.habla_popout_a) this.habla_popout_a.innerHTML =
      this.config.vars.habla_popout_text;
    if (this.habla_end_popout_a) this.habla_end_popout_a.innerHTML = this.config.vars.habla_end_popout_text;
    if (this.habla_submit_button) this.habla_submit_button.value = this.config.vars.send_text;
    if (this.habla_pre_chat_submit_input) this.habla_pre_chat_submit_input.value = this.config.vars.pre_chat_submit;
    this.habla_pre_chat_span.innerHTML = this.config.vars.pre_chat_message;
    this.setHeader(this.config.vars.check_for_status);
    window.olark.__legacy_shim.has_messages_in_history != !0 &&
      this.setBody(this.config.vars.welcome_msg)
  };
  this.set_default_text_event = function(a, b, i) {
    "placeholder" in a ? (this.setInputBox(a, ""), a.placeholder = i, a.has_typed = !1, hbl.eventmgr.register(b + "_onblur", function(a) {
      a.target.has_typed = a.target.value == "" ? !1 : !0
    }), a = function(a) {
      a.target.has_typed = !0
    }, hbl.eventmgr.register(b + "_onfocus", a), hbl.eventmgr.register(b + "_onclick", a)) : (this.setInputBox(a, i), a.default_text = i, a.has_typed = !1, hbl.eventmgr.register(b + "_onblur", function(a) {
      a.window.theme.setInputBoxStyle(a.target,
        "normal");
      if (a.target.value == "") a.target.value = a.target.default_text, a.target.has_typed = !1
    }, 0), hbl.eventmgr.register(b + "_onclick", function(a) {
      if (!a.target.has_typed) a.target.has_typed = !0, a.window.setInputBox(a.target, "", "highlight");
      a.window.theme.setInputBoxStyle(a.target, "highlight")
    }, 0), hbl.eventmgr.register(b + "_onfocus", function(a) {
      if (!a.target.has_typed) a.target.has_typed = !0, a.window.setInputBox(a.target, "", "highlight");
      a.window.theme.setInputBoxStyle(a.target, "highlight")
    }, 0))
  };
  this.set_rollover_event =
    function(a, b, i, d) {
      if (a) a.on_class = d, a.off_class = i, hbl.eventmgr.register(b + "_onmouseover", function(a) {
        a.window.config.set_element_classes(a.target, a.target.on_class)
      }, 0), hbl.eventmgr.register(b + "_onmouseout", function(a) {
        a.window.config.set_element_classes(a.target, a.target.off_class)
      }, 0), hbl.eventmgr.register(b + "_onclick", function(a) {
        a.window.config.set_element_classes(a.target, a.target.off_class)
      }, 0)
  };
  this.register_handlers = function() {
    this.set_rollover_event(this.habla_popout_a, "habla_popout_a", "habla_button_normal",
      "habla_button_hover");
    this.set_rollover_event(this.habla_end_popout_a, "habla_end_popout_a", "habla_button_normal", "habla_button_hover");
    this.set_rollover_event(this.habla_sizebutton_a, "habla_sizebutton_a", "habla_button_normal", "habla_button_hover");
    this.set_rollover_event(this.habla_closebutton_a, "habla_closebutton_a", "habla_button_normal", "habla_button_hover");
    this.set_rollover_event(this.habla_oplink_a, "habla_oplink_a", "habla_oplink_a", "habla_oplink_hover");
    hbl.eventmgr.register("habla_conversation_div_onclick",
      function() {
        habla_window.eventmgr.handle("window_click")
      }, 0);
    hbl.eventmgr.register("habla_chatform_form_onfocus", function() {
      habla_window.eventmgr.handle("window_focus")
    }, 0);
    hbl.eventmgr.register("habla_popout_a_onclick", function(a) {
      a.window.popout()
    }, 0);
    hbl.eventmgr.register("habla_end_popout_a_onclick", function(a) {
      a.window.end_popout();
      setTimeout(function() {
        window.close()
      }, 2)
    }, 0);
    hbl.eventmgr.register("habla_wcsend_input_onclick", function(a) {
      a.window.eventmgr.handle("window_focus")
    }, 0);
    hbl.eventmgr.register("habla_pre_chat_submit_input_onclick",
      function(a) {
        var b = a.window.config,
          i = a.window.theme.habla_pre_chat_email_input,
          d = a.window.theme.habla_pre_chat_name_input,
          j = a.window.theme.habla_pre_chat_phone_input,
          f = i.value ? hbl.util.strip_whitespace(i.value) : void 0,
          n = d.value ? hbl.util.strip_whitespace(d.value) : void 0,
          t = j.value ? hbl.util.strip_whitespace(j.value) : void 0;
        d = d.has_typed ? !0 : !1;
        j = j.has_typed && hbl.util.is_valid_phone(t) ? !0 : !1;
        var o = i.has_typed && hbl.util.is_valid_email(f) ? !0 : !1;
        !o && d && hbl.util.is_valid_email(n) && (d = n, n = f, f = d, o = !0, d = i.has_typed ? !0 : !1);
        (b.vars.require_name <= 1 || d) && (b.vars.require_phone <= 1 || j) && (b.vars.require_email <= 1 || o) ? (a.window.theme.habla_pre_chat_error_span.innerHTML = "", window.olark.__legacy_shim.send_prechat_info({
          name: n,
          email: hbl.util.is_valid_email(f) ? f : null,
          phone: hbl.util.is_valid_phone(t) ? t : null
        }), a.window.theme.pre_chat_sent = !0, a.window.setShowPreChat(!1)) : a.window.theme.habla_pre_chat_error_span.innerHTML = a.window.config.vars.pre_chat_error_text
      }, 0);
    hbl.eventmgr.register("habla_offline_submit_input_onclick",
      function(a) {
        var b = a.window.theme.habla_offline_body_input,
          i = a.window.theme.habla_offline_email_input,
          d = a.window.theme.habla_offline_phone_input,
          j = a.window.theme.habla_name_input,
          f = a.window.theme.config.vars.require_offline_phone;
        if (a.window.theme.message_sent) a.window.theme.setOfflineWindow(a.window.theme.config.vars.habla_offline_sent_text || " ");
        else {
          var n = hbl.util.strip_whitespace(i.value);
          b.has_typed && i.has_typed && hbl.util.is_valid_email(n) && (f <= 1 || hbl.util.is_valid_phone(d.value)) ? (a.window.theme.message_sent = !0, tocall = hblPostURL + "?site_id=" + olark._.identityManager.getSiteId() + "&" + hbl.util.urlencode({
            body: b.value,
            email: i.value,
            name: j.value,
            phone: d.value,
            location: document.location,
            referrer: document.referrer
          }), a.window.theme.habla_offline_error_span.innerHTML = a.window.config.vars.sending_text, hbl.util.load_js_async(tocall), olark("api.visitor.updateEmailAddress", n), olark("api.visitor.updateFullName", j.value), olark("api.visitor.updatePhoneNumber", d.value), hbl.client.sendofflinemessage(b.value, {
            email: n,
            name: j.value,
            phone: d.value,
            location: document.location,
            referrer: document.referrer
          }), a.window.eventmgr.handle("offlineMessageToOperator", {
            body: b.value,
            nickname: j.value
          }), a.window.theme.setOfflineWindow(a.window.theme.config.vars.habla_offline_sent_text || " ")) : a.window.theme.habla_offline_error_span.innerHTML = a.window.config.vars.email_body_error_text
        }
      }, 0);
    hbl.eventmgr.register("habla_wcsend_input_onmouseover", function(a) {
      a.window.eventmgr.handle("window_focus")
    }, 0)
  };
  this.remove = function() {
    this.appended && hbl.util.remove_element(this.divid)
  };
  this.setShowPreChat = function(a) {
    if (!window.olark || !window.olark.__legacy_shim || !window.olark.__legacy_shim.ignore_prechat_status) a ? this.showOnlyThisDiv(this.habla_pre_chat_div) : this.showOnlyThisDiv(this.habla_conversation_div)
  };
  this.showOnlyThisDiv = function(a) {
    var b = this.habla_conversation_div,
      i = this.habla_offline_message_div,
      d = this.habla_offline_message_sent_div,
      j = this.habla_pre_chat_div,
      f = this.habla_chatform_form,
      n = this.habla_wcsend_input;
    if (a == b) {
      if (b.style.display = "block", i.style.display = "none",
        d.style.display = "none", j.style.display = "none", habla_window.get_operator_state() != "notavailable") f.style.display = "block", n.style.display = "block"
    } else if (a == i) b.style.display = "none", i.style.display = "block", d.style.display = "none", j.style.display = "none", f.style.display = "none", n.style.display = "none";
    else if (a == d) b.style.display = "none", i.style.display = "none", d.style.display = "block", j.style.display = "none", f.style.display = "none", n.style.display = "none";
    else if (a == j) b.style.display = "none", i.style.display = "none",
    d.style.display = "none", j.style.display = "block", f.style.display = "none", n.style.display = "none";
    olark._.needsFirstTimeOperatorLogin ? (this.habla_name_input.style.display = "none", this.habla_offline_email_input.style.display = "none", this.habla_offline_phone_input.style.display = "none", this.habla_offline_body_input.style.display = "none", this.habla_offline_submit_input.style.display = "none") : (this.habla_name_input.style.display = "block", this.habla_offline_email_input.style.display = "block", this.habla_offline_phone_input.style.display =
      "block", this.habla_offline_body_input.style.display = "block", this.habla_offline_submit_input.style.display = "block")
  };
  this.setOfflineWindow = function(a) {
    if (!window.olark || !window.olark.__legacy_shim || !window.olark.__legacy_shim.ignore_prechat_status) {
      var b = this.config.vars.show_pre_chat && this.config.vars.disable_offline_messaging_fallback != !0 && habla_window.get_operator_state() == "notavailable";
      !a && !b ? (this.offline_window = !1, this.showOnlyThisDiv(this.habla_conversation_div)) : (this.habla_offline_message_span.innerHTML =
        a || this.config.vars.offline_message, this.message_sent ? (this.showOnlyThisDiv(this.habla_offline_message_sent_div), this.offline_window = !1) : (this.offline_window = !0, this.showOnlyThisDiv(this.habla_offline_message_div)))
    }
  };
  this.scroll_conversation_history_to_most_recent = function() {
    var a = this;
    setTimeout(function() {
      a.habla_conversation_div.scrollTop = a.habla_conversation_div.scrollHeight
    }, 10)
  };
  this.setBody = function(a) {
    if (!hbl.client.buffer.length || !hbl.client.is_conversation()) {
      this.habla_conversation_div.innerHTML =
        "";
      this.config.render_class(this.habla_conversation_div, "habla_conversation_message_off", "habla_conversation_message_on");
      if (a != "") a = hbl.util.as_dom(a), this.config.render_class(this.habla_conversation_div, "habla_conversation_message_on", "habla_conversation_message_off"), this.habla_conversation_div.appendChild(a), a.id = "hbl_body_message";
      this.scroll_conversation_history_to_most_recent()
    }
  };
  this.disableMessageInput = function(a) {
    this.habla_wcsend_input.disabled = !0;
    this.habla_wcsend_input.value = a || ""
  };
  this.getBody =
    function() {
      return this.habla_conversation_div.innerHTML
  };
  var a = {}, b = null,
    d = function(a) {
      var b = document.createElement("div");
      b.appendChild(document.createTextNode(a));
      a = b.innerHTML;
      delete b;
      return a
    };
  this.appendNiceMessage = function(c, g, i, k) {
    if (!(g == void 0 || c == void 0)) {
      g && (g = d(g));
      k || (g = this.display_pipeline.run(g));
      if (g) {
        window.olark && window.olark.__legacy_shim && window.habla_window && (g = hbl.hwindow_util.wrap_and_create_links(g, window.habla_window));
        k = hbl.client.op_nickname_map[c];
        var j = null;
        if (hbl.config.vars.operators &&
          k && hbl.config.vars.operators[k.toString()]) j = hbl.config.vars.operators[k.toString()].avatar_url;
        document.location.protocol === "https:" && typeof j == "string" && (j = j.replace("http://", "https://"));
        k = document.createElement("p");
        if (j && !a[c]) {
          a[c] = !0;
          var f = document.createElement("img");
          f.className = "olrk_avatar";
          f.src = j;
          k.appendChild(f)
        }
        this.config.set_element_classes(k, "habla_conversation_p_item");
        b != null && b != c && (k.className += " olrk_new_sender");
        b = c;
        j = document.createElement("span");
        var n = document.createElement("span");
        if (c === this.config.vars.myname) this.config.set_element_classes(j, "habla_conversation_person1"), this.config.set_element_classes(n, "habla_conversation_text_span"), c = this.config.vars.local_user_display_name, c === "&rarr;" || c === "&larr;" ? j.innerHTML = c : hbl.util.set_inner_text(j, c);
        else if (/^INTERNAL_NOTIFICATION/.test(c)) {
          this.config.set_element_classes(j, "habla_conversation_notification_nickname");
          this.config.set_element_classes(n, "habla_conversation_notification_text_span");
          hbl.util.set_inner_text(j, "");
          var t = c.split("-");
          c = t.slice(2).join("-");
          t = t.slice(0, 2);
          t.push(c);
          t.length === 3 && setTimeout(function() {
            olark.__core.trigger_event({
              namespace: "chat",
              type: "interfaceElementReady",
              extensionName: t[1],
              key: t[2],
              dom: n
            })
          }, 0)
        } else this.config.set_element_classes(j, "habla_conversation_person2"), this.config.set_element_classes(n, "habla_conversation_text_span"), (c = this.config.vars.local_name_override ? this.config.vars.local_name_override : c) && !/^\s*$/.test(c) ? hbl.util.set_inner_text(j, c + ": ") : hbl.util.set_inner_text(j,
          c);
        n.innerHTML = g;
        k.appendChild(j);
        k.appendChild(n);
        this.appendMessage(k, i)
      }
      window.habla_window.theme.scroll_conversation_history_to_most_recent()
    }
  };
  this.appendMessage = function(a, b) {
    this.last_msg == -1 && b && this.setBody("");
    a = hbl.util.as_dom(a);
    this.last_msg += 1;
    a.setAttribute("id", "habla_msg_" + this.last_msg);
    this.habla_conversation_div.appendChild(a);
    this.scroll_conversation_history_to_most_recent()
  };
  this.setHeader = function(a) {
    this.habla_oplink_a.innerHTML = a
  };
  this.getHeader = function() {
    return this.habla_oplink_a.innerHTML
  };
  this.hide = function() {
    this.visible = !1;
    if (this.habla_conversation_div) this.habla_conversation_div.style.overflow = "hidden";
    hbl.util.hide_div(this.habla_window_div);
    hbl.util.hide_div(this.habla_panel_div);
    hbl.util.hide_div(this.habla_both_div);
    hbl.util.hide_div(this.habla_closed_div);
    hbl.util.hide_div(this.habla_expanded_div);
    hbl.util.hide_div(this.habla_compressed_div)
  };
  this.focus_on_the_input_box = function() {
    var a = this,
      b = document.activeElement && document.activeElement.tagName ? document.activeElement.tagName :
        null;
    if (!b || !/^(input|textarea|select|option|button|optgroup|form)$/i.test(b)) a.config.vars.disable_input_focusing || (!window.olark || !window.olark.__legacy_shim || !window.olark.__legacy_shim.disable_input_focusing) && !a.config.vars.is_inline && !a.config.vars.disableFocus && a.habla_wcsend_input && a.habla_chatform_form.style.display != "none" && setTimeout(function() {
      if (a.habla_chatform_form.style.display != "none") try {
        a.habla_wcsend_input.focus()
      } catch (b) {}
    }, 20)
  };
  this.expand = function() {
    this.__set_css_window_state("expanded");
    if (this.habla_sizebutton_a && this.config.vars.habla_sizebutton_text_expanded) this.habla_sizebutton_a.innerHTML = this.config.vars.habla_sizebutton_text_expanded;
    this.show();
    this.focus_on_the_input_box()
  };
  this.compress = function() {
    this.__set_css_window_state("compressed");
    if (this.habla_sizebutton_a && this.config.vars.habla_sizebutton_text_compressed) this.habla_sizebutton_a.innerHTML = this.config.vars.habla_sizebutton_text_compressed;
    this.show()
  };
  this.show = function() {
    if (this.ready)
      if (this.visible = !0, this.config.vars.disableJSStyles &&
        hbl.util.show_div(this.habla_window_div), this.state == "closed") hbl.util.hide_div(this.habla_expanded_div), hbl.util.hide_div(this.habla_panel_div), hbl.util.hide_div(this.habla_compressed_div), this.habla_conversation_div.style.overflow = "hidden", hbl.util.show_div(this.habla_closed_div);
      else
    if (this.state == "expanded") {
      hbl.util.hide_div(this.habla_compressed_div);
      hbl.util.hide_div(this.habla_closed_div);
      hbl.util.show_div(this.habla_panel_div);
      hbl.util.show_div(this.habla_expanded_div);
      hbl.util.show_div(this.habla_both_div);
      this.habla_conversation_div.style.overflow = "auto";
      this.scroll_conversation_history_to_most_recent();
      if (this.habla_sizebutton_a) this.habla_sizebutton_a.innerHTML = this.config.vars.habla_sizebutton_text_expanded;
      this.focus_on_the_input_box();
      this.normal()
    } else if (this.state == "compressed" && (hbl.util.hide_div(this.habla_expanded_div), hbl.util.hide_div(this.habla_closed_div), hbl.util.show_div(this.habla_panel_div), hbl.util.show_div(this.habla_both_div), hbl.util.show_div(this.habla_compressed_div), this.habla_conversation_div.style.overflow =
      "hidden", this.config.set_element_classes(this.habla_topbar_div, "habla_topbar_div_compressed"), this.habla_sizebutton_div)) this.habla_sizebutton_div.innerHTML = this.config.vars.habla_sizebutton_text_compressed
  };
  this.close = function() {
    this.__set_css_window_state("closed");
    this.show()
  };
  this.__set_css_window_state = function(a) {
    this.state = a;
    this.window_state_div.className = (this.config.vars.show_end_popout ? "olrk-state-popout" : "") + "olrk-state-" + a
  };
  this.__get_browser_class = function() {
    return "habla-browser-" + hbl.util.BrowserDetect.browser.toLowerCase()
  };
  this.__get_mobile_class = function() {
    return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) ? "habla-mobile" : navigator.userAgent.match(/iPad/) ? "habla-ipad" : "habla-desktop"
  };
  this.setWidth = function(a) {
    if (!this.config.vars.disable_width) {
      var b = a;
      this.habla_panel_div.style.width = a + "px";
      b = hbl.util.BrowserDetect.backwards_dimension || hbl.util.BrowserDetect.browser == "Explorer" && hbl.util.BrowserDetect.backwards_dimension ?
        a - this.config.vars.input_width_offset_compat + "px" : hbl.util.BrowserDetect.browser == "Explorer" ? a - this.config.vars.input_width_offset_ie + "px" : a - this.config.vars.input_width_offset_normal + "px";
      this.habla_wcsend_input.style.width = b;
      this.habla_name_input.style.width = b;
      this.habla_offline_body_input.style.width = b;
      this.habla_offline_email_input.style.width = b;
      this.habla_offline_phone_input.style.width = b;
      this.habla_pre_chat_name_input.style.width = b;
      this.habla_pre_chat_email_input.style.width = b;
      this.habla_pre_chat_phone_input.style.width =
        b
    }
  };
  this.setInputHeight = function(a) {
    if (!hbl.config.vars.disable_height) {
      a = a > 18 ? a : 18;
      hbl.util.BrowserDetect.backwards_dimension && (a = a > 24 ? a : 24);
      if (typeof this.originalHeight == "undefined") this.originalHeight = a, this.habla_wcsend_input.style.lineHeight = a + "px";
      this.habla_wcsend_input.style.height = a + "px"
    }
  };
  this.setFormInputHeight = function(a) {
    if (!hbl.config.vars.disable_height) a = a > 18 ? a : 18, hbl.util.BrowserDetect.backwards_dimension && (a = a > 24 ? a : 24), a += "px", this.habla_name_input.style.height = a, this.habla_offline_email_input.style.height =
      a, this.habla_offline_phone_input.style.height = a, this.habla_pre_chat_name_input.style.height = a, this.habla_pre_chat_name_input.style.lineHeight = a, this.habla_pre_chat_email_input.style.height = a, this.habla_pre_chat_email_input.style.lineHeight = a, this.habla_pre_chat_phone_input.style.height = a, this.habla_pre_chat_phone_input.style.lineHeight = a
  };
  this.render_palette = function() {
    var a = this.config.palette;
    this.config.vars.limited_palette && (a = this.config.vars.limited_palette);
    for (var b in a)
      if (a.hasOwnProperty(b) &&
        typeof this.config.palette[b] == "string") {
        var i = hbl.util.getElementsByClass(this.habla_window_div, "hbl_pal_" + b),
          d;
        for (d in i)
          if (i.hasOwnProperty(d) && i[d] && i[d].style)
            if (b.match("_fg")) i[d].style.color = this.config.palette[b];
            else
        if (b.match("_bg")) i[d].style.backgroundColor = this.config.palette[b];
        else if (b.match("_border")) i[d].style.borderColor = this.config.palette[b]
      }
  };
  this.getX = function() {
    return this.habla_window_div.style.left.match(/\d\d*/)
  };
  this.getY = function() {
    return this.habla_window_div.style.top.match(/\d\d*/)
  };
  this.setXY = function(a, b) {
    this.habla_window_div.style.top = b;
    this.habla_window_div.style.left = a
  };
  this.setHeight = function(a) {
    if (!hbl.config.vars.disable_height) {
      a = parseInt(a);
      var b = function(a, b) {
        if (a) a.style.height = b + "px"
      };
      b(this.habla_conversation_div, a);
      b(this.habla_pre_chat_div, a);
      b(this.habla_offline_body_input, a - 85 > 0 ? a - 85 : 0)
    }
  };
  this.setMargins = function(a, b, i, d) {
    if (!this.config.vars.disable_javascript_position) this.habla_window_div.style.marginTop = b + "px", this.habla_window_div.style.marginLeft = a + "px",
    this.habla_window_div.style.marginRight = i + "px", this.habla_window_div.style.marginBottom = d + "px"
  };
  this.setInline = function(a) {
    a ? (a = this.habla_window_div.style.display, this.habla_window_div.setAttribute("style", ""), this.config.style_classes_map.habla_window_div = ["habla_window_div_position_inline", "habla_window_div_base", "hbl_pal_main_width"], this.habla_window_div.style.display = a, this.config.render_element_classes(this, "habla_window_div")) : this.setPosition(this.config.vars.corner_position)
  };
  this.__getAdjustedPosition =
    function(a) {
      a = a.toUpperCase();
      this.config.vars.theme_requires_position && (this.config.vars.theme_requires_position.match(/B/) ? a = a.replace("T", "B") + "B" : this.config.vars.theme_requires_position.match(/T/) && (a = a.replace("B", "T")), this.config.vars.theme_requires_position.match(/R/) ? a = a.replace("L", "R") + "R" : this.config.vars.theme_requires_position.match(/L/) && (a = a.replace("R", "L")));
      return a
  };
  this.setPosition = function(a) {
    var b = this.habla_window_div.style.display;
    this.config.style_classes_map.habla_window_div =
      ["habla_window_div_base", "hbl_pal_main_width"];
    a = this.__getAdjustedPosition(a);
    this.habla_window_div.setAttribute("style", "");
    if (a.match(/B/)) {
      if (!this.config.vars.disable_javascript_position) this.habla_window_div.style.marginBottom = this.config.vars.bottom_margin + "px", this.habla_window_div.style.bottom = "0px";
      this.config.style_classes_map.habla_window_div.push("olrk-fixed-bottom")
    } else {
      if (!this.config.vars.disable_javascript_position) this.habla_window_div.style.marginTop = this.config.vars.top_margin +
        "px", this.habla_window_div.style.top = "0px";
      this.config.style_classes_map.habla_window_div.push("olrk-fixed-top")
    } if (a.match(/R/)) {
      if (!this.config.vars.disable_javascript_position) this.habla_window_div.style.marginRight = this.config.vars.right_margin + "px", this.habla_window_div.style.right = "0px";
      this.config.style_classes_map.habla_window_div.push("olrk-fixed-right")
    } else {
      if (!this.config.vars.disable_javascript_position) this.habla_window_div.style.marginLeft = this.config.vars.left_margin + "px", this.habla_window_div.style.left =
        "0px";
      this.config.style_classes_map.habla_window_div.push("olrk-fixed-left")
    }
    this.habla_window_div.style.display = b;
    if (!this.config.vars.disable_javascript_position) this.habla_window_div.style.position = hbl.util.BrowserDetect.use_position_absolute_on_ie ? "absolute" : "fixed";
    this.config.render_element_classes(this, "habla_window_div");
    this.position = a
  };
  this.highlight = function() {
    if (!this.highlighted) this.config.set_element_classes(this.habla_closebutton_a, "habla_button_highlighted"), this.config.set_element_classes(this.habla_sizebutton_a,
      "habla_button_highlighted"), this.config.set_element_classes(this.habla_topbar_div, "habla_topbar_div_highlighted"), this.config.set_element_classes(this.habla_wcsend_input, "habla_wcsend_input_highlighted"), this.highlighted = !0
  };
  this.normal = function() {
    if (this.highlighted) this.config.set_element_classes(this.habla_closebutton_a, "habla_button_normal"), this.config.set_element_classes(this.habla_sizebutton_a, "habla_button_normal"), this.config.set_element_classes(this.habla_topbar_div, "habla_button_normal"),
    this.config.set_element_classes(this.habla_topbar_div, "habla_topbar_div"), this.config.set_element_classes(this.habla_wcsend_input, "habla_wcsend_input"), this.highlighted = !1
  };
  this.getMessageInputField = function() {
    return this.habla_wcsend_input
  };
  this.getMessageInputFieldValue = function() {
    return this.habla_wcsend_input.value
  };
  this.setMessageInputFieldValue = function(a) {
    this.habla_wcsend_input.value = a
  };
  this.display_pipeline = new hbl.util.pipeline(this);
  this.display_pipeline.add(hbl.pipelines.wrap_text, 999);
  this.display_pipeline.add(hbl.pipelines.emoticons, 1E3);
  window.olark && window.olark.__legacy_shim && window.olark.__legacy_shim.pipeline_disabler && this.display_pipeline.add(window.olark.__legacy_shim.pipeline_disabler, 1001)
};
hbl.eventmgr.register("habla_preload_done", function() {
  !hbl.config.vars.theme_path && !hbl.config.vars.theme_obj && (hbl.config.vars.theme_obj = new hbl.themes.default_theme)
}, 0);

function habla_start_func() {
  if (!hbl.post_started)
    if (hbl.post_started = 1, olark._.identityManager.getSiteId() ? olark._.identityManager.getSiteId() == "missing-site-id" && olark._.identityManager.setSiteId(window.__get_olark_key()) : olark._.identityManager.setSiteId(window.__get_olark_key()), window.habla_window || (habla_window = new hbl._hwindow(hbl.client, hbl.config, hbl.eventmgr), hbl.eventmgr.setWindow(habla_window), habla_window.register_handlers()), hbl.config.vars.local_mode) hbl.client.start(olark._.identityManager.getConversationId(),
      olark._.identityManager.getVisitorId(), olark._.identityManager.getSiteId(), hbl.eventmgr, hbl.config), habla_window.setTheme(hbl.config.vars.theme_obj), habla_window.config.vars.welcome_msg = "Hab.la is in testing mode. set <em>config.vars['local_mode'] = false;</em> to go back to normal.", habla_window.config.vars.in_chat_text = "Hab.la Local Mode", habla_window.config.vars.before_chat_text = "Hab.la Local Mode", habla_window.config.vars.not_available_text = "Hab.la Local Mode", habla_window.setHeader(habla_window.config.vars.not_available_text),
  habla_window.show(1);
  else {
    var a = olark._.identityManager.getSiteId();
    a && (a.match(/(olark|\@)/i) || !a.match(/\d\d*\-\d/)) && hbl.config.vars.theme_obj ? habla_error({
      etype: "invalid_site_id"
    }) : !a && hbl.config.vars.theme_obj ? habla_error({
      etype: "invalid_site_link"
    }) : (hbl.eventmgr.register("habla_error", habla_error, 10), hbl.client.start(olark._.identityManager.getConversationId(), olark._.identityManager.getVisitorId(), olark._.identityManager.getSiteId(), hbl.eventmgr, hbl.config), hbl.eventmgr.handle("habla_started"))
  }
}

function habla_error(a) {
  if (a.etype == "invalid_site_id") hbl.client.eventmgr = new hbl.util.eventmanager, habla_window.setTheme(hbl.config.vars.theme_obj), habla_window.config.vars.offline_message = "<em>" + olark._.identityManager.getSiteId() + "</em> is not a valid <a href='" + hblInstallUrl + "'>" + hblName + "</a> site ID.<p> Your " + hblName + " Site ID is in the format '###-##-###-##' and can be found on your <a href='" + hblInstallUrl + "' target='_blank'>Dashboard</a>.</p>", habla_window.config.vars.not_available_text =
    hblName + ": Site ID Error", habla_window.setHeader(habla_window.config.vars.not_available_text), habla_window.show(1), habla_window.theme.habla_conversation_div.scrollTop = 0;
  else if (a.etype == "invalid_site_link") hbl.client.eventmgr = new hbl.util.eventmanager, habla_window.setTheme(hbl.config.vars.theme_obj), habla_window.config.vars.offline_message = "Unable to determine your site-id.  Please make sure you have copied and pasted all the code as it appears on your <a href='" + hblInstallUrl + "' target='_blank'>" +
    hblName + " Dashboard</a>.", habla_window.config.vars.not_available_text = hblName + ": Site ID Error", habla_window.setHeader(habla_window.config.vars.not_available_text), habla_window.show(1), habla_window.theme.habla_conversation_div.scrollTop = 0;
  else if (a.etype == "operator_is_busy") hbl.client.opbusy = !0, habla_window.opbusy = !0, habla_window.setWindowText()
}

function wc_init_post(a) {
  window.olark && window.olark.__legacy_shim && hbl.util.BrowserDetect.init();
  hbl.config = hbl.config || new hbl.hconfig;
  if (!hbl.config.merge) {
    var b = hbl.config;
    hbl.config = new hbl.hconfig;
    hbl.config.merge(b, !0)
  }
  if (hbl.config.vars.disable_get_cookies || hbl.config.vars.wcsid) hbl.config.vars.wcsid && olark._.identityManager.setConversationId(hbl.config.vars.wcsid), hbl.config.vars.hblid && olark._.identityManager.setVisitorId(hbl.config.vars.hblid);
  if (!hbl.config.plugins) hbl.config.plugins = new hbl.util.pluginlist;
  a = a || ["incoming_notification", "away_div_handler", "expand_on_receive_message", "google_translate", "auto_initiate"];
  for (b = 0; b < a.length; b++) {
    var d = new hbl.plugins[a[b]];
    hbl.config.plugins.add(d)
  }
  hbl.eventmgr.handle("habla_preload_done");
  habla_start_func()
}
if (!window.olark || window.olark && !window.olark.__legacy_shim)
  if (!window.olark || !window.olark.__internal || !window.olark.__internal.skip_wc_init_post) hblJSInline ? hbl.eventmgr.register("habla_called_wc_init", function() {
    wc_init_post()
  }) : wc_init_post();
window.olark && window.olark.__internal && window.olark.__internal.declare("__internal.legacy", function() {});
if (window.olark && window.olark.__legacy_shim) window.olark.__legacy_shim.legacy_post_stub_is_loaded = !0;
window.olark.__core.framestorewithjson = function(a, b, d, c, g) {
  a = function() {
    function a(b) {
      return b < 10 ? "0" + b : b
    }

    function b(a) {
      d.lastIndex = 0;
      return d.test(a) ? '"' + a.replace(d, function(a) {
        var b = p[a];
        return typeof b === "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
      }) + '"' : '"' + a + '"'
    }

    function c(a, h) {
      var e, f, d, i, n = g,
        r, w = h[a];
      w && typeof w === "object" && typeof w.__jsonlib_toJSON === "function" && (w = w.__jsonlib_toJSON(a));
      typeof s === "function" && (w = s.call(h, a, w));
      switch (typeof w) {
        case "string":
          return b(w);
        case "number":
          return isFinite(w) ? String(w) : "null";
        case "boolean":
        case "null":
          return String(w);
        case "object":
          if (!w) return "null";
          g += o;
          r = [];
          if (Object.prototype.toString.apply(w) === "[object Array]") {
            i = w.length;
            for (e = 0; e < i; e += 1) r[e] = c(e, w) || "null";
            d = r.length === 0 ? "[]" : g ? "[\n" + g + r.join(",\n" + g) + "\n" + n + "]" : "[" + r.join(",") + "]";
            g = n;
            return d
          }
          if (s && typeof s === "object") {
            i = s.length;
            for (e = 0; e < i; e += 1) f = s[e], typeof f === "string" && (d = c(f, w)) && r.push(b(f) + (g ? ": " : ":") + d)
          } else
            for (f in w) Object.hasOwnProperty.call(w,
              f) && (d = c(f, w)) && r.push(b(f) + (g ? ": " : ":") + d);
          d = r.length === 0 ? "{}" : g ? "{\n" + g + r.join(",\n" + g) + "\n" + n + "}" : "{" + r.join(",") + "}";
          g = n;
          return d
      }
    }
    if (typeof Date.prototype.__jsonlib_toJSON !== "function") Date.prototype.__jsonlib_toJSON = function() {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.__jsonlib_toJSON = Number.prototype.__jsonlib_toJSON = Boolean.prototype.__jsonlib_toJSON =
      function() {
        return this.valueOf()
    };
    var f = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      d = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      g, o, p = {
        "\u0008": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\u000c": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
      }, s, r = null;
    typeof r !== "function" && (r = function(a, b, e) {
      var f;
      o = g = "";
      if (typeof e === "number")
        for (f = 0; f < e; f += 1) o += " ";
      else typeof e === "string" &&
        (o = e); if ((s = b) && typeof b !== "function" && (typeof b !== "object" || typeof b.length !== "number")) throw Error("stringify failed");
      return c("", {
        "": a
      })
    });
    var e = null;
    typeof e !== "function" && (e = function(a, b) {
      function c(a, e) {
        var f, d, i = a[e];
        if (i && typeof i === "object")
          for (f in i) Object.hasOwnProperty.call(i, f) && (d = c(i, f), d !== void 0 ? i[f] = d : delete i[f]);
        return b.call(a, e, i)
      }
      var e;
      f.lastIndex = 0;
      f.test(a) && (a = a.replace(f, function(a) {
        return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
      }));
      if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), typeof b === "function" ? c({
        "": e
      }, "") : e;
      throw new SyntaxError("JSON parse error: " + a);
    });
    return {
      encode: r,
      decode: e
    }
  }(window, document);
  b = function() {
    function a() {
      function h(a) {
        (a = a.key) ? b(a) : c()
      }
      window.addEventListener ? window.addEventListener("storage", h, !1) : window.attachEvent("onstorage", h)
    }

    function b(a) {
      var c = p[a],
        h = s(a);
      o[a] = o[a] || [];
      p[a] = h;
      if (c != h)
        for (c = 0; c <
          o[a].length; c++) try {
          o[a][c]({
            newValue: h
          })
        } catch (e) {
          window.console && window.console.error && window.console.error(e)
        }
    }

    function c() {
      for (var a in o) o.hasOwnProperty(a) && b(a)
    }
    var f = {}, d = window,
      g = d.document,
      o = {}, p = {}, s, r;
    f.set = function() {};
    f.get = function() {};
    f.remove = function() {};
    f.clear = function() {};
    f.transact = function(a, b) {
      var c = f.get(a);
      typeof c == "undefined" && (c = {});
      b(c);
      f.set(a, c)
    };
    f.listen = function(a, b) {
      p[a] = s(a);
      o[a] = o[a] || [];
      o[a].push(b)
    };
    f.serialize = function(a) {
      return JSON.stringify(a)
    };
    f.deserialize =
      function(a) {
        if (typeof a == "string") return JSON.parse(a)
    };
    var e;
    try {
      e = "localStorage" in d && d.localStorage
    } catch (m) {
      e = !1
    }
    if (e) r = d.localStorage, f.set = function(a, b) {
      r.setItem(a, f.serialize(b))
    }, f.get = function(a) {
      return f.deserialize(r.getItem(a))
    }, f.remove = function(a) {
      r.removeItem(a)
    }, f.clear = function() {
      r.clear()
    }, s = function(a) {
      return r.getItem(a)
    }, a();
    else {
      var h;
      try {
        h = "globalStorage" in d && d.globalStorage && d.globalStorage[d.location.hostname]
      } catch (l) {
        h = !1
      }
      if (h) r = d.globalStorage[d.location.hostname], f.set =
        function(a, b) {
          r[a] = f.serialize(b)
      }, f.get = function(a) {
        return f.deserialize(r[a] && r[a].value)
      }, f.remove = function(a) {
        delete r[a]
      }, f.clear = function() {
        for (var a in r) delete r[a]
      }, s = function(a) {
        return r[a]
      }, setInterval(c, 750);
      else if (g.documentElement.addBehavior) {
        r = g.createElement("div");
        var q = {}, v = {}, z = {}, x = function(a) {
            return function() {
              var b = Array.prototype.slice.call(arguments || [], 0);
              b.unshift(r);
              g.body.appendChild(r);
              r.addBehavior("#default#userData");
              r.load("localStorage");
              b = a.apply(f, b);
              g.body.removeChild(r);
              return b
            }
          }, y = function() {
            var a = Array.prototype.slice.call(arguments || [], 0),
              b = a.shift();
            try {
              return v[b].apply(v, a), z[b].apply(z, a)
            } catch (c) {
              return v[b].apply(v, a)
            }
          };
        z.set = x(function(a, b, c) {
          a.setAttribute(b, f.serialize(c));
          a.save("localStorage")
        });
        z.get = x(function(a, b) {
          return f.deserialize(a.getAttribute(b))
        });
        z.remove = x(function(a, b) {
          a.removeAttribute(b);
          a.save("localStorage")
        });
        z.clear = x(function(a) {
          var b = a.XMLDocument.documentElement.attributes;
          a.load("localStorage");
          for (var c = 0, h; h = b[c]; c++) a.removeAttribute(h.name);
          a.save("localStorage")
        });
        v.set = function(a, b) {
          q[a] = b
        };
        v.get = function(a) {
          return q[a]
        };
        v.remove = function(a) {
          delete q[a]
        };
        v.clear = function() {
          q = {}
        };
        f.set = function(a, b) {
          return y("set", a, b)
        };
        f.get = function(a) {
          return y("get", a)
        };
        f.remove = function(a) {
          return y("remove", a)
        };
        f.clear = function() {
          return y("clear")
        };
        s = function(a) {
          try {
            return x(function(a, b) {
              return a.getAttribute(b)
            })(a)
          } catch (b) {
            return q[a]
          }
        };
        setInterval(c, 750)
      } else {
        var w = "; path=" + document.location.pathname,
          u = function() {
            for (var a = document.cookie.split(";"),
                b = 0; b < a.length; b++) {
              var c = a[b].replace(/^\s*/, "").replace(/\s*$/, "");
              if (c.indexOf("storejs=") == 0) return f.deserialize(unescape(c.slice(8)))
            }
            return {}
          }, B = function(a) {
            document.cookie = "storejs=" + escape(f.serialize(a)) + w;
            document.cookie.length > 4E3 && (window.console && window.console.warn && window.console.warn("cookie is too large, clearing storejs"), B({}))
          };
        f.set = function(a, b) {
          var c = u();
          c[a] = b;
          B(c)
        };
        f.get = function(a) {
          return u()[a]
        };
        f.remove = function(a) {
          var b = u();
          try {
            delete b[a]
          } catch (c) {
            b[a] = void 0
          }
          B(b)
        };
        f.clear = function() {
          B({})
        };
        s = function(a) {
          return f.serialize(u()[a])
        }
      }
    }
    return f
  }();
  d = function(a, b) {
    function c() {
      if (a.console && a.console.error) try {
        a.console.error.apply(a.console, arguments)
      } catch (b) {
        try {
          a.console.error(Array.prototype.slice.call(arguments || []).join(" "))
        } catch (h) {}
      }
    }

    function f() {
      if (a.console && a.console.warn) try {
        a.console.warn.apply(a.console.warn, arguments)
      } catch (b) {
        try {
          a.console.warn(Array.prototype.slice.call(arguments || []).join(" "))
        } catch (c) {}
      }
    }

    function d() {
      if (a.ActiveXObject) try {
        var b =
          new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),
          c;
        return b ? (c = b.GetVariable("$version"), parseInt(/([0-9]+)/.exec(c)[1])) : -1
      } catch (h) {
        return -1
      } else return -1
    }

    function g(a) {
      return /^\s*(file\:|[a-zA-Z]\:).*/.test(a)
    }

    function o(a) {
      return a ? a.length == "" ? null : g(a) ? "file:" : (a = a.split("//"), a.length > 1 ? a[0] + "//" + a[1].split("/")[0] : a[0]) : null
    }

    function p(c, h) {
      var e = Math.floor(Math.random() * 99999).toString(),
        f, d = b.createElement("span"),
        l = "framesocket" + e;
      e = "framesocket" + e;
      var q = b.getElementsByTagName("body")[0],
        g, n = !1,
        s = "try{window." + e + "()}catch(e){" + e + "()}";
      q ? g = function() {
        q.appendChild(d)
      } : (q = b.getElementsByTagName("script")[0], g = function() {
        q.parentNode.insertBefore(d, q)
      });
      a[e] = function() {
        h && !n && (n = !0, h(f))
      };
      d.style.display = "none";
      /(Firefox)/.test(navigator.userAgent) ? (d.innerHTML = '<iframe style="display: none !important" id="' + l + '" onload="' + s + '"></iframe>', g(), f = b.getElementById(l), f.src = c) : (d.innerHTML = '<iframe style="display: none !important" id="' + l + '" src="' + c + '" onload="' + s + '"></iframe>', g(), f = b.getElementById(l));
      return f
    }

    function s(a) {
      setTimeout(a, 0)
    }

    function r(a) {
      return o(a == "file:" ? null : a)
    }

    function e(a, b) {
      function c() {
        if (a()) {
          var f = h.shift();
          e = !1;
          typeof f != "undefined" && b(f);
          h.length > 0 && !e && (e = !0, s(c))
        }
      }
      var h = [],
        e = !1,
        f = null;
      return f = {
        queuedSend: function(a) {
          h.push(a);
          c()
        },
        attemptDequeue: c
      }
    }

    function m() {
      function c() {
        var b, h, f;
        f = e(function() {
          return typeof b != "undefined" && typeof h != "undefined" ? !0 : !1
        }, function(c) {
          if (h == null || g(h)) a.postMessage ? b.postMessage(c, "*") : b.document.postMessage(c, "*");
          else {
            var e = o(h);
            a.postMessage ? b.postMessage(c, e) : b.document.postMessage(c, e)
          }
        });
        return {
          setPostMessageTargetWindow: function(a) {
            b = a;
            f.attemptDequeue()
          },
          setPostMessageTargetOrigin: function(a) {
            h = a;
            f.attemptDequeue()
          },
          send: function(a) {
            f.queuedSend(a)
          }
        }
      }

      function h(c) {
        function e(a) {
          var h = o(a.origin || a.uri);
          a.origin == "null" && (h = "file:");
          h && !g(h) && (a.uri && a.uri.toString().indexOf(h) == 0 ? a.uri.toString().slice(h.length) : b.referrer && b.referrer.toString().indexOf(h) == 0 && b.referrer.toString().slice(h.length));
          h = r(h);
          if (typeof d ==
            "undefined" || d == h)(typeof l == "undefined" || l == a.source) && c({
            data: a.data,
            origin: h
          })
        }
        var f = {}, d, l;
        a.addEventListener ? a.addEventListener("message", e, !1) : a.attachEvent("onmessage", e);
        f.setExpectedOrigin = function(a) {
          d = r(a)
        };
        f.setExpectedWindow = function(a) {
          l = a
        };
        return f
      }
      q.connect = function(a, b) {
        function e(a) {
          l.send(q + v + a)
        }
        var f = a.server || a,
          d = null,
          l = c(),
          i, q = Math.random().toString().replace("0.", "TK"),
          g = f.replace(/\#[^?]*/, "") + "#" + q;
        b = b || function() {};
        l.setPostMessageTargetOrigin(f);
        p(g, function(a) {
          a = a.contentWindow ?
            a.contentWindow : a.contentDocument.window;
          i = h(b);
          i.setExpectedOrigin(o(g));
          i.setExpectedWindow(a);
          l.setPostMessageTargetWindow(a)
        });
        e(z);
        return d = {
          send: e
        }
      };
      q.accept = function(b) {
        var e = null,
          d = c(),
          l, q = (a.location.hash || "").slice(1),
          g = !1;
        b = b || function() {};
        d.setPostMessageTargetWindow(a.parent);
        l = h(function(a) {
          var c = a.data.split(v),
            h = c[1];
          c[0] == q ? h == z ? g || (g = !0, l.setExpectedOrigin(a.origin), d.setPostMessageTargetOrigin(a.origin)) : s(function() {
            b({
              data: h,
              origin: a.origin
            })
          }) : f("[framesocket] received a message from an origin with an invalid identity")
        });
        l.setExpectedWindow(a.parent);
        return e = {
          send: d.send
        }
      }
    }

    function h() {
      q.connect = function(b, c) {
        function h(b, c) {
          if (b == g) c();
          else return a.console && a.console.warn && a.console.warn("[framesocket] invalid security token given to client in frameElement transport"), null
        }
        var f = b.server || b,
          d, l, q = !1,
          g = Math.random().toString().replace("0.", "TK"),
          n = f.replace(/\#[^?]*/, "") + "#" + g;
        c = c || function() {};
        d = e(function() {
          return q
        }, function(a) {
          l.frameElementContext.sendToChild(a, g)
        });
        l = p(n);
        l.frameElementContext = function() {};
        l.frameElementContext.markChildAsReady = function(a) {
          h(a, function() {
            s(function() {
              q = !0;
              d.attemptDequeue()
            })
          })
        };
        l.frameElementContext.sendToParent = function(a, b) {
          h(b, function() {
            c({
              data: a,
              origin: r(f)
            })
          })
        };
        return {
          send: function(a) {
            d.queuedSend(a)
          }
        }
      };
      q.accept = function(c) {
        function h(b, c) {
          if (b == f) c();
          else return a.console && a.console.warn && a.console.warn("[framesocket] invalid security token given to server in frameElement transport"), null
        }
        var f = (a.location.hash || "").slice(1),
          d;
        c = c || function() {};
        a.frameElement.frameElementContext();
        a.frameElement.frameElementContext.sendToChild = function(a, e) {
          h(e, function() {
            c({
              data: a,
              origin: r(b.referrer)
            })
          })
        };
        a.frameElement.frameElementContext.markChildAsReady(f);
        d = e(function() {
          return !0
        }, function(b) {
          a.frameElement.frameElementContext.sendToParent(b, f)
        });
        return {
          send: function(a) {
            d.queuedSend(a)
          }
        }
      }
    }

    function l() {
      function c() {
        for (; g.length;) g.shift()(e())
      }

      function h(a) {
        var c = b.getElementsByTagName("script")[0],
          e = b.createElement("script");
        e.type = "text/javascript";
        e.async = !0;
        e.src = a;
        c.parentNode.insertBefore(e,
          c)
      }

      function e() {
        var b = null;
        if (a.minixdm) b = a.minixdm.easyXDM;
        return b || a.easyXDM
      }

      function f(a, b) {
        g.push(b);
        e() ? c() : d || (d = !0, h(a), l = setInterval(function() {
          e() && (c(), clearInterval(l))
        }, 100))
      }
      var d = !1,
        l = null,
        g = [];
      q.connect = function(b, c) {
        var h = b.server || b,
          e = h.replace(/(\/[^\/]+)$/, ""),
          d = e + "/minixdm.swf",
          l = e + "/minixdm.js",
          q;
        a.location.protocol == "http:" && (d = d.replace("https", "http"));
        f(l, function(a) {
          q = new a.Socket({
            protocol: x,
            lazy: !1,
            swf: d,
            remote: h.replace(/\#[^?]*/, "") + "#basepath=" + encodeURIComponent(e),
            onMessage: function(a, b) {
              c({
                data: a,
                origin: o(b)
              })
            }
          })
        });
        return newSocket = {
          send: function(a) {
            f(l, function() {
              q.postMessage(a)
            })
          }
        }
      };
      q.accept = function(b) {
        var c = decodeURIComponent(/basepath=([^?&]+)/.exec(a.location.href.slice(1))[1]),
          h = c + "/minixdm.swf",
          e = c + "/minixdm.js",
          d;
        a.location.protocol == "http:" && (h = h.replace("https", "http"));
        f(e, function(a) {
          d = new a.Socket({
            protocol: x,
            swf: h,
            onMessage: function(a, c) {
              b({
                data: a,
                origin: o(c)
              })
            }
          })
        });
        return newSocket = {
          send: function(a) {
            f(e, function() {
              d.postMessage(a)
            })
          }
        }
      }
    }
    var q = {}, v = "~:DATA:~",
      z = "~:INIT:~",
      x = "6";
    if (a.postMessage || b.postMessage) m();
    else if (navigator.product == "Gecko" && "frameElement" in a && navigator.userAgent.indexOf("WebKit") == -1) h();
    else if (d() > 6) l();
    else {
      var y = function() {
        c("[framesocket] unsupported browser")
      };
      q.connect = function() {
        y();
        return {
          send: y
        }
      };
      q.accept = function() {
        y();
        return {
          send: y
        }
      };
      q.isCompatible = function() {
        return !1
      }
    }
    q.isCompatible = q.isCompatible || function() {
      return !0
    };
    return q
  }(window, document);
  c = function(a, b, c, f, d) {
    function g() {
      if (a.console && a.console.error) try {
        a.console.error.apply(a.console,
          arguments)
      } catch (b) {
        try {
          a.console.error(Array.prototype.slice.call(arguments || []).join(" "))
        } catch (c) {}
      }
    }

    function o() {
      if (a.console && a.console.warn) try {
        a.console.warn.apply(a.console.warn, arguments)
      } catch (b) {
        try {
          a.console.warn(Array.prototype.slice.call(arguments || []).join(" "))
        } catch (c) {}
      }
    }

    function p() {
      this.name = "ReadTimeoutError"
    }

    function s() {
      this.name = "WriteTimeoutError"
    }

    function r(a, b) {
      for (var h = Array.prototype.slice.call(arguments || []).slice(2), e = b.toString(), f = 0; f < h.length; f++) e += typeof h[f] ==
        "undefined" ? w + escape(u) : w + escape(c.encode(h[f]));
      a.send(e)
    }

    function e(a, b) {
      var h = a.split(w),
        e = h[0];
      h = h.slice(1);
      for (var f = b[e], d = [], l, q = 0; q < h.length; q++) l = unescape(h[q]), l == u ? d.push({}.undefinedValue) : d.push(c.decode(l));
      f ? f.apply(f, d) : o("[framestore] unknown command type:", e)
    }

    function m(a, b) {
      try {
        f.remove("__framestore__.locks." + a)
      } catch (c) {}
      b(function() {})
    }

    function h() {
      try {
        return f.get("__framestore__.index") || {}
      } catch (a) {
        return o("[framestore] index capture failed, resetting"), f.set("__framestore__.index", {}), {}
      }
    }

    function l(a) {
      try {
        return f.set("__framestore__.index", a)
      } catch (b) {
        o("[framestore] index capture failed, clearing entire storage"), f.clear(), f.set("__framestore__.index", a)
      }
    }

    function q(a) {
      var b = h();
      f.remove(z(a));
      delete b[a];
      l(b)
    }

    function v(a) {
      var b = h();
      b[a] = (new Date).getTime();
      l(b)
    }

    function z(a) {
      return "__framestore__.stores." + a
    }

    function x(a, c, h) {
      v(a);
      m("stores." + a, function(e) {
        var d = z(a),
          l = {
            metadata: {
              creator: b.referrer,
              lastUpdated: (new Date).getTime()
            },
            data: {}
          }, q;
        try {
          q = f.get(d) || l
        } catch (i) {
          if (h) q =
            l;
          else throw i;
        }
        c(q.data, q.metadata, function(a, b) {
          if (a || b) {
            if (a) q.data = a;
            if (b) q.metadata = b;
            q.metadata.lastUpdated = (new Date).getTime();
            f.set(d, q)
          }
          e()
        })
      })
    }
    var y = {}, w = ",",
      u = "~UNDEFINED",
      B = 100;
    y.connect = function(b, c, h) {
      function f() {
        y || (y = setTimeout(l, B))
      }

      function l() {
        g.flush()
      }

      function q(a) {
        a.code === 22 || /QUOTA/.test(a.name || "") ? j ? N && N() : u && u() : a instanceof s ? Y && Y() : a instanceof p ? O && O() : !j && !t ? (o("[framestore] failed to boot, trying to dump storage"), t = !0, g.dump(), g.pull()) : k && k(a)
      }
      var g = {}, m = b.key,
        j = !1,
        t = !1,
        v = {}, x = [],
        z, y = null,
        w = !1,
        k = b.onFailure,
        u = b.onDisabled,
        N = b.onOverflow,
        O = b.onReadTimeout,
        Y = b.onWriteTimeout,
        R = !1,
        U = null,
        V = null,
        M = null,
        Z = b.maxMillisecondsForResponse || 2100;
      z = d.connect(b.server, function(b) {
        e(b.data, {
          DOWNLOADED: function() {
            h && h.onDownloaded()
          },
          FLUSHDONE: function(a) {
            U == a && (w = !1, x = [], R && l())
          },
          FLUSHFAIL: function(a, b) {
            U == a && (w = !1, q(b))
          },
          PULLFAIL: function(a) {
            M && (clearTimeout(M), M = null);
            q(a)
          },
          PUSH: function(b, e, f) {
            h && !j && h.onFirstPullReceived();
            var d;
            if (f) b = e;
            else {
              b = e;
              for (e = 0; e < x.length; e++) f =
                x[e], d = v[f], b[f] = d
            }
            v = b;
            M && (clearTimeout(M), M = null);
            j || (j = !0, a.addEventListener ? a.addEventListener("beforeunload", l, !1) : a.attachEvent("onbeforeunload", l), h && h.onFirstPullParsed(), c(g))
          }
        })
      });
      g.pull = function() {
        M = setTimeout(function() {
          o("[framesocket] timed out while pulling from persistent storage");
          q(new p)
        }, Z);
        r(z, "PULL", m)
      };
      g.flush = function() {
        if (w) R = !0;
        else if (y && (clearTimeout(y), y = null), V && (clearTimeout(V), V = null), R = !1, j && x.length > 0) {
          var a = {}, b, c, h;
          for (b = 0; b < x.length; b++) c = x[b], h = v[c], a[c] = typeof h ==
            "undefined" ? "~DELETEDKEY" : h;
          U = (+new Date).toString();
          w = !0;
          V = setTimeout(function() {
            if (w) {
              o("[framesocket] timed out while flushing to persistent storage");
              var a = new s;
              w = !1;
              q(a)
            }
          }, Z);
          r(z, "FLUSH", m, a, U)
        }
      };
      g.get = function(a) {
        return v[a]
      };
      g.set = function(a, b) {
        v[a] = b;
        x.push(a);
        f()
      };
      g.remove = function(a) {
        try {
          v[a] = void 0, delete v[a]
        } catch (b) {}
        x.push(a);
        f()
      };
      g.clear = function() {
        v = {};
        y && (clearTimeout(y), y = null);
        r(z, "CLEAR", m)
      };
      g.dump = function() {
        r(z, "DUMP", m, v)
      };
      g.reclaim = function(a) {
        r(z, "RECLAIM", m, a)
      };
      g.reject =
        function(a) {
          for (var b in v) {
            var c;
            try {
              c = a(b) ? !0 : !1
            } catch (h) {
              c = !1
            }
            if (v.hasOwnProperty(b) && c) {
              try {
                v[b] = void 0, delete v[b]
              } catch (e) {}
              x.push(b)
            }
          }
          f()
      };
      g.pull();
      return g
    };
    y.accept = function() {
      function a(b, h) {
        o("[framestore] unable to flush to persistent storage");
        g(b);
        r(c, "FLUSHFAIL", h, b)
      }

      function b(a) {
        o("[framestore] unable to pull from persistent storage");
        g(a);
        r(c, "PULLFAIL", a)
      }
      var c, l = {};
      c = d.accept(function(d) {
        e(d.data, {
          PULL: function(a) {
            function e(h) {
              try {
                x(a, function(b, e, f) {
                  r(c, "PUSH", a, b, h);
                  f(null,
                    null)
                })
              } catch (f) {
                b(f)
              }
            }
            l[a] || (l[a] = !0, f.listen(z(a), e), f.listen("__framestore__.index", function() {
              var b = h(),
                c;
              for (c in b)
                if (c == a) return;
              o("[framestore] storage reclaimed, pushing cleared contents");
              e(!0)
            }));
            e()
          },
          FLUSH: function(b, h, e) {
            try {
              x(b, function(b, f, d) {
                var l, q = {};
                for (l in h)
                  if (h.hasOwnProperty(l))
                    if (f = h[l], q[l] = b[l], f == "~DELETEDKEY") try {
                      b[l] = void 0, delete b[l]
                    } catch (i) {} else b[l] = f;
                try {
                  d(b, null), r(c, "FLUSHDONE", e)
                } catch (g) {
                  for (var n in q) q.hasOwnProperty(n) && (b[n] = q[n]);
                  a(g, e)
                }
              })
            } catch (f) {
              a(f,
                e)
            }
          },
          CLEAR: function(a) {
            q(a)
          },
          DUMP: function(a, b) {
            x(a, function(a, c, h) {
              h(b, null)
            }, !0)
          },
          RECLAIM: function(a, b) {
            if (b && b > 0)
              for (var c = b; c;) {
                c--;
                var e = a,
                  f = h(),
                  d = null,
                  l = (new Date).getTime(),
                  g = null,
                  i = void 0;
                for (i in f)
                  if (i != e && f.hasOwnProperty(i) && (g = f[i], d === null || g === !0 || g < l)) d = i, l = g === !0 ? 0 : g;
                d && q(d)
              } else o("[framestore] number of reclaimed entries must be nonzero")
          }
        })
      });
      r(c, "DOWNLOADED")
    };
    f.serialize = function(a) {
      return c.encode(a)
    };
    f.deserialize = function(a) {
      if (typeof a == "string") return c.decode(a)
    };
    return y
  }(window,
    document, a, b, d);
  return g = {
    framestore: c,
    json: a,
    framesocket: d
  }
}();
(function(a, b) {
  a.wait_for(function() {
    return a.framestorewithjson
  }, function() {
    function d(c, f) {
      function e(a) {
        olark._.cookieManager.set("olfsk", a, 63072E6)
      }
      var d = !1,
        h = olark._ && olark._.storage ? olark._.storage : "https://static.olark.com/jsclient/storage.html?v=1";
      olark._.storage || olark._.hlog("no storage URL specified in loader, falling back #warn #no_storage_url");
      var l;
      if (!(l = olark._.cookieManager.get("olfsk"))) olark._.isNewConversation || olark._.hlog("already booted once, but lost olfsk #warn #olfsk_regen"),
      l = Math.random().toString().replace("0.", "olfsk");
      (function(l) {
        function g(b) {
          if (!d) d = !0, a.data.forceDomain = function() {
            olark._.cookieManager.erase("olfsk");
            e(l)
          }, a.data.forcePath = function() {
            olark._.cookieManager.erase("olfsk");
            e(l)
          }, e(l), a.data.storejs = b, f()
        }

        function i() {
          var b = a.framestorewithjson.json;
          g({
            set: function(a, c) {
              localStorage.setItem(a, b.encode(c))
            },
            get: function(a) {
              return b.decode(localStorage.getItem(a) || "null")
            },
            remove: function(a) {
              localStorage.removeItem(a)
            }
          })
        }
        var n = !1,
          j = !1,
          t = function() {
            a.data.storejs.reject(function(a) {
              return a ==
                "vsession" || a == olark._.identityManager.getConversationId() ? !1 : !0
            });
            a.data.storejs.reclaim(1);
            a.data.storejs.flush()
          }, o = !1,
          k = document.referrer || "";
        location.protocol === "https:" && /^http\:/.test(k) && (o = !0);
        location.protocol === "http:" && /^https\:/.test(k) && (o = !0);
        k === "" && location.protocol === "http:" && (o = !0);
        o && olark._.hlog("switching from HTTP to HTTPS #ssl_protocol_switch");
        o = {
          server: h,
          key: l,
          onDisabled: function() {
            "localStorage" in window && (b.warn("[olark] persistent storage disabled, chat will restart when crossing over into SSL or other subdomains"),
              olark._.hlog("data persistence lowered due to #local_storage_disabled"), i())
          },
          onOverflow: function() {
            n ? (olark._.hlog("storage overflow, #overflow_cleared_convo_storage"), a.data.storejs.clear()) : (olark._.hlog("storage overflow, #eliminated_convo_data"), n = !0, t())
          },
          onReadTimeout: function() {
            olark._.hlog("reads taking too long #storage_read_timeout");
            t()
          },
          onWriteTimeout: function() {
            olark._.hlog("writes taking too long #storage_write_timeout");
            t()
          },
          onFailure: function(c) {
            j ? (olark._.hlog("storage failure, #failure_cleared_convo_storage"),
              a.data.storejs.clear()) : (j = !0, b.warn("[olark] dumping storage cache due to unexpected issue:", c), olark._.hlog("unable to persist storage #storage_failure"), a.data.storejs.dump())
          }
        };
        c ? i() : a.data.storejs = a.framestorewithjson.framestore.connect(o, g, {
          onDownloaded: function() {
            olark._.P("storedownloaded")
          },
          onFirstPullReceived: function() {
            olark._.P("storereceived")
          },
          onFirstPullParsed: function() {
            olark._.P("storeparsed")
          }
        })
      })(l);
      setTimeout(function() {
          d || olark._.hlog("slow data connection (>8s) #slow_framestore_connection")
        },
        8E3)
    }
    var c = /^\s*(__.*|chatNickname|chatStatus)\s*$/,
      g = function(a, b) {
        a = a || {};
        for (var c = b.length; c--;) {
          var f = b[c];
          if (typeof a[f] == "undefined") throw Error("[olark] '" + f + "' is a required argument");
        }
        return a
      }, i = function(a) {
        this.__key = a.key;
        this.__keystore = a.keystore;
        this.__link_to_conversation = a.link_to_conversation;
        this.__link_to_visitor = a.link_to_visitor;
        this.__initial_value = a.initial_value;
        this.__backup = a.backup;
        this.__backupTransform = a.backupTransform;
        if (this.__link_to_visitor && this.__link_to_conversation) throw Error("cannot link object reference to both the visitor and conversation");
        this.__event_object_string = "PersistentObjectReference." + this.__key;
        typeof this.get() == "undefined" && typeof this.__initial_value != "undefined" && this.set(this.__initial_value);
        if (this.__link_to_conversation && this.__keystore.isLinkedToVisitor({
          key: this.__key
        })) throw Error("this object is already linked to the visitor, cannot link it to the conversation");
        if (this.__link_to_visitor && this.__keystore.isLinkedToConversation({
          key: this.__key
        })) throw Error("this object is already linked to the conversation, cannot link it to the visitor");
      };
    i.prototype.get = function() {
      var b = this.__keystore.get({
        key: this.__key,
        backup: this.__backup,
        backupTransform: this.__backupTransform
      });
      return typeof b == "undefined" ? (this.set(this.__initial_value), a.clone_object(this.__initial_value)) : a.clone_object(b)
    };
    i.prototype.set = function(b) {
      if (typeof b == "undefined") throw Error("'value' required for object set");
      var c = this.__keystore.get({
        key: this.__key,
        backup: this.__backup,
        backupTransform: this.__backupTransform
      });
      a.deep_equals(c, b) || (this.__keystore.set({
        key: this.__key,
        value: b,
        link_to_conversation: this.__link_to_conversation,
        link_to_visitor: this.__link_to_visitor,
        backup: this.__backup
      }), a.trigger_event({
        namespace: this.__event_object_string,
        type: "keyChange",
        key: this.__key,
        newValue: b,
        oldValue: c
      }))
    };
    i.prototype.edit = function(a) {
      var b = this.get();
      a(b);
      this.set(b)
    };
    i.prototype.change = function(a) {
      b.warn("[olark] 'change' is deprecated, use __SPI_onChange instead");
      this.__SPI_onChange(a)
    };
    i.prototype.__SPI_onChange = function(b) {
      a.listen_for_event({
        namespace: this.__event_object_string,
        type: "keyChange",
        callback: b
      })
    };
    var k = function() {};
    k.prototype.get = function() {
      throw Error();
    };
    k.prototype.set = function() {
      throw Error();
    };
    k.prototype.clearConversationData = function() {
      throw Error();
    };
    k.prototype.clearVisitorData = function() {
      throw Error();
    };
    k.prototype.isLinkedToConversation = function() {
      throw Error();
    };
    k.prototype.isLinkedToVisitor = function() {
      throw Error();
    };
    var j = function() {
      this.__conversation_expiration_delta_in_days = 0.1;
      this.__visitor_expiration_delta_in_days = 365;
      o({
        key: "csession",
        defaultValue: null,
        expiration_access_tag: olark._.identityManager.getConversationId()
      }) || t({
        key: "csession",
        value: {},
        expiration_in_milliseconds: this.__conversation_expiration_delta_in_days * 864E5,
        expiration_access_tag: olark._.identityManager.getConversationId()
      });
      o({
        key: "vsession",
        defaultValue: null,
        expiration_access_tag: olark._.identityManager.getVisitorId()
      }) || t({
        key: "vsession",
        value: {},
        expiration_in_milliseconds: this.__visitor_expiration_delta_in_days * 864E5,
        expiration_access_tag: olark._.identityManager.getVisitorId()
      });
      this.set({
        key: "siteId",
        value: olark._.siteId,
        link_to_visitor: !0
      })
    };
    j.prototype = new k;
    j.prototype.constructor = j;
    j.prototype.get = function(a) {
      a = a || {};
      var c = a.key;
      a = a.backup;
      if (typeof c == "undefined") throw Error("'key' required");
      var e = o({
        key: "vsession",
        defaultValue: {},
        expiration_access_tag: olark._.identityManager.getVisitorId()
      }),
        f = o({
          key: "csession",
          defaultValue: {},
          expiration_access_tag: olark._.identityManager.getConversationId()
        });
      e = e[c];
      f = f[c];
      var h;
      typeof f != "undefined" ? typeof e != "undefined" ? b.warn("[olark]",
        c, "was stored as associated with both the visitor and conversation, falling back to the conversation value") : h = f : h = e;
      if (typeof h == "undefined" && a) {
        c = (olark._.cookieManager.getAllowingNullAndUndefinedAndEmptyString("_okbk") || "").split(",");
        var d;
        for (e = 0; e < c.length; e++) d = c[e].split("="), f = d[0], d = unescape(d[1]), f == a && (h = d)
      }
      return h
    };
    j.prototype.set = function(a) {
      a = a || {};
      var b = a.key,
        c = a.value,
        f = a.link_to_visitor,
        h = a.link_to_conversation;
      a = a.backup;
      if (typeof b == "undefined") throw Error("'key' required");
      if (typeof c ==
        "undefined") throw Error("'value' required for key store set");
      if (f && h) throw Error("cannot link data to both a visitor and conversation");
      if (!f && !h) throw Error("currently, you must link to either a conversation or visitor");
      var d = o({
        key: "vsession",
        defaultValue: {},
        expiration_access_tag: olark._.identityManager.getVisitorId()
      }),
        q = o({
          key: "csession",
          defaultValue: {},
          expiration_access_tag: olark._.identityManager.getConversationId()
        });
      if (f)
        if (q[b]) throw Error("[error] cannot link " + b + " to the visitor, it is already associated with the conversation");
        else d[b] = c, t({
          key: "vsession",
          value: d,
          expiration_in_milliseconds: this.__visitor_expiration_delta_in_days * 864E5,
          expiration_access_tag: olark._.identityManager.getVisitorId()
        });
      if (h)
        if (d[b]) throw Error("cannot link this value to the conversation, it is already associated with the visitor");
        else q[b] = c, t({
          key: "csession",
          value: q,
          expiration_in_milliseconds: this.__conversation_expiration_delta_in_days * 864E5,
          expiration_access_tag: olark._.identityManager.getConversationId()
        });
      if (a) {
        b = (olark._.cookieManager.get("_okbk") ||
          "").split(",");
        d = [a + "=" + escape(c)];
        for (h = 0; h < b.length; h++) c = b[h].split("="), f = c[0], unescape(c[1]), f != a && d.push(b[h]);
        olark._.cookieManager.setAllowingNullAndUndefinedAndEmptyString("_okbk", d.join(",") || null)
      }
    };
    j.prototype.clearConversationData = function() {
      p({
        key: "csession"
      });
      olark._.cookieManager.erase("_okbk")
    };
    j.prototype.clearVisitorData = function() {
      p({
        key: "vsession"
      })
    };
    j.prototype.isLinkedToConversation = function(a) {
      a = a || {};
      a = a.key;
      if (typeof a == "undefined") throw Error("'key' required");
      return typeof o({
        key: "csession",
        defaultValue: {},
        expiration_access_tag: olark._.identityManager.getConversationId()
      })[a] != "undefined"
    };
    j.prototype.isLinkedToVisitor = function(a) {
      a = a || {};
      a = a.key;
      if (typeof a == "undefined") throw Error("'key' required");
      return typeof o({
        key: "vsession",
        defaultValue: {},
        expiration_access_tag: olark._.identityManager.getVisitorId()
      })[a] != "undefined"
    };
    var f = function(a) {
      a = a || {};
      if (typeof a.namespace == "undefined") throw Error("'namespace' required");
      this.__namespace = a.namespace;
      this.__keystore = new j
    };
    f.prototype.__SPI_clearVisitorAndConversationData =
      function() {
        this.__keystore.clearVisitorData();
        this.__keystore.clearConversationData()
    };
    f.prototype.__SPI_clearOnlyConversationData = function() {
      this.__keystore.clearConversationData()
    };
    (function() {
      var a = f.prototype;
      a.declareConversationObject = function(a) {
        b.warn("[olark] api.data.declareConversationObject is deprecated, please use api.data.getConversationObject instead");
        return this.getConversationObject(a)
      };
      a.declareVisitorObject = function(a) {
        b.warn("[olark] api.data.declareVisitorObject is deprecated, please use api.data.getVisitorObject instead");
        return this.getVisitorObject(a)
      }
    })();
    f.prototype.getConversationObject = function(a) {
      a = a || {};
      if (typeof a.key == "undefined") throw Error("'key' required for getConversationObject");
      if (typeof a.initialValue == "undefined") a.initialValue = null;
      if (c.test(a.key)) throw Error("[olark] '" + a.key + "' is a protected key name, please choose something else");
      return new i({
        key: (a.__SPI_forceNamespace || this.__namespace) + "." + a.key,
        keystore: this.__keystore,
        initial_value: a.initialValue,
        link_to_conversation: !0,
        backup: a.backup,
        backupTransform: a.backupTransform
      })
    };
    f.prototype.getVisitorObject = function(a) {
      a = a || {};
      if (typeof a.key == "undefined") throw Error("'key' required for getVisitorObject");
      if (typeof a.initialValue == "undefined") a.initialValue = null;
      if (c.test(a.key)) throw Error("[olark] '" + a.key + "' is a protected key name, please choose something else");
      return new i({
        key: (a.__SPI_forceNamespace || this.__namespace) + "." + a.key,
        keystore: this.__keystore,
        initial_value: a.initialValue,
        link_to_visitor: !0,
        backup: a.backup,
        backupTransform: a.backupTransform
      })
    };
    var n = null;
    (function() {
      var b = {};
      n = {
        get: function(c) {
          var e = (new Date).getTime(),
            f = b[c];
          return f && e - f.timestamp < 900 ? f.val : (f = a.data.storejs.get(c), b[c] = {
            val: f,
            timestamp: e
          }, f)
        },
        set: function(c, e) {
          var f = (new Date).getTime();
          f = {
            val: e,
            timestamp: f
          };
          a.data.storejs.set(c, e);
          b[c] = f
        },
        remove: function(c) {
          a.data.storejs.remove(c);
          b[c] = void 0;
          try {
            delete b[c]
          } catch (e) {}
        }
      }
    })();
    var t = function(a) {
      a = g(a, ["key", "value", "expiration_in_milliseconds"]);
      var b = a.key,
        c = (new Date).getTime();
      c = {
        value: a.value,
        unix_timestamp: c,
        expiration_in_milliseconds: a.expiration_in_milliseconds
      };
      if (a.expiration_access_tag) {
        var f = n.get("prev-" + b);
        f && f.expiration_access_tag === a.expiration_access_tag && (b = "prev-" + b);
        c.expiration_access_tag = a.expiration_access_tag
      }
      n.set(b, c)
    }, o = function(c) {
        c = g(c, ["key"]);
        return a.try_and_optionally_catch(function() {
          var a = n.get(c.key);
          if (a && a.expiration_access_tag && a.expiration_access_tag !== c.expiration_access_tag) {
            var b = n.get("prev-" + c.key);
            b && b.expiration_access_tag === c.expiration_access_tag ? a = b : (olark._.hlog("new session started, #returning_visitor_session"),
              n.set("prev-" + c.key, a), n.remove(c.key), a = n.get(c.key))
          }
          return a ? (new Date).getTime() - a.unix_timestamp < a.expiration_in_milliseconds ? a.value : (p({
            key: c.key
          }), c.defaultValue) : c.defaultValue
        }, function(a) {
          b.error("[olark] problem retrieving '" + c.key + "' from storejs: " + a.toString());
          b.showErrorBacktrace(a)
        })
      }, p = function(a) {
        a = g(a, ["key"]);
        n.remove(a.key)
      };
    a.data = {
      AbstractKeyStore: k,
      StorejsKeyStore: j,
      DataApi: f,
      prepare: function(a, b, c) {
        d(b, c)
      },
      storejs: null
    }
  })
})(window.olark.__core, window.olark.__core.logger);
(function(a, b) {
  a.wait_for(function() {
    return a.data && window.olark.__legacy_shim.legacy_post_stub_is_loaded
  }, function() {
    var d = null,
      c = null,
      g = !1,
      i = !1,
      k = !1,
      j = function(b) {
        var c = this;
        c.__conf = b.conf;
        if (typeof c.__conf == "undefined") throw Error("'conf' required");
        c.__chat_api = b.chat_api;
        if (typeof c.__chat_api == "undefined") throw Error("'chat_api' required");
        c.__initialize_legacy_event_handlers();
        c.__setup_chat_history_handling();
        c.__conf.box.behave_like_popout && c.__setup_popout_behavior();
        c.__keystore = new a.data.StorejsKeyStore;
        c.__renderWelcomeMessage();
        c.__SPI_onPrechatWelcomeMessage(function() {
          c.__renderWelcomeMessage()
        });
        if (!c.__conf.system.offline_msg_mode) c.__prevent_showing = !1, c.__pending_show = !1, c.__chat_api.__SPI_onOperatorGroupChanging(function() {
          c.__prevent_showing = !0
        }), c.__chat_api.__SPI_onOperatorGroupChanged(function() {
          c.__prevent_showing = !1;
          c.__chat_api.operatorsAreAvailable() && c.__pending_show && c.show()
        })
      };
    j.prototype.listen = function(c, d) {
      var g = string.charAt(0).toUpperCase() + string.slice(1);
      b.warn("[olark] api.box.listen is deprecated, please use api.box.on" +
        g + " instead");
      a.listen_for_event({
        namespace: "box",
        type: c,
        callback: d
      })
    };
    j.prototype.expand = function() {
      this.__SPI_whenRendered(function() {
        habla_window.expand()
      })
    };
    j.prototype.onExpand = function(b) {
      window.olark.__legacy_shim.disable_input_focusing = !1;
      a.listen_for_event({
        namespace: "box",
        type: "expand",
        callback: b
      })
    };
    j.prototype.shrink = function() {
      this.__SPI_whenRendered(function() {
        habla_window.compress()
      })
    };
    j.prototype.onShrink = function(b) {
      window.olark.__legacy_shim.disable_input_focusing = !1;
      a.listen_for_event({
        namespace: "box",
        type: "shrink",
        callback: b
      })
    };
    j.prototype.show = function() {
      this.__prevent_showing ? this.__pending_show = !0 : this.__SPI_whenRendered(function() {
        habla_window.show()
      })
    };
    j.prototype.onShow = function(b) {
      window.olark.__legacy_shim.disable_input_focusing = !1;
      a.listen_for_event({
        namespace: "box",
        type: "show",
        callback: b
      })
    };
    j.prototype.overlay = function() {
      this.__SPI_whenRendered(function() {
        habla_window.theme.setInline(0);
        habla_window.end_popout()
      })
    };
    j.prototype.onOverlay = function(b) {
      window.olark.__legacy_shim.disable_input_focusing = !1;
      a.listen_for_event({
        namespace: "box",
        type: "overlay",
        callback: b
      })
    };
    j.prototype.hide = function() {
      this.__SPI_whenRendered(function() {
        habla_window.hide()
      })
    };
    j.prototype.onHide = function(b) {
      window.olark.__legacy_shim.disable_input_focusing = !0;
      a.listen_for_event({
        namespace: "box",
        type: "hide",
        callback: b
      })
    };
    j.prototype.popout = function() {
      habla_window.popout()
    };
    j.prototype.onPopout = function(b) {
      window.olark.__legacy_shim.disable_input_focusing = !1;
      a.listen_for_event({
        namespace: "box",
        type: "popout",
        callback: b
      })
    };
    j.prototype.dismiss = function() {
      this.__SPI_whenRendered(function() {
        habla_window.close()
      })
    };
    j.prototype.onDismiss = function(b) {
      window.olark.__legacy_shim.disable_input_focusing = !0;
      a.listen_for_event({
        namespace: "box",
        type: "dismiss",
        callback: b
      })
    };
    j.prototype.__SPI__onOlarkLinkClicked = function(b) {
      a.listen_for_event({
        namespace: "box",
        type: "olark_link_clicked",
        callback: b
      })
    };
    j.prototype.__SPI_disableUserInterface = function() {
      var a = document.getElementById("habla_beta_container_do_not_rely_on_div_classes_or_names");
      a.style.visibility = "hidden";
      a.style.display = "none"
    };
    j.prototype.__SPI_inline = function() {
      this.__SPI_whenRendered(function() {
        habla_window.theme.setInline(1)
      })
    };
    j.prototype.__SPI_onInline = function(b) {
      window.olark.__legacy_shim.disable_input_focusing = !1;
      a.listen_for_event({
        namespace: "box",
        type: "inline",
        callback: b
      })
    };
    j.prototype.__SPI_injectStyleIntoPage = function(a) {
      function b() {
        var c = document.getElementsByTagName("head")[0];
        c.insertBefore(a, c.firstChild)
      }
      /(Chrome)/.test(navigator.userAgent) ? setTimeout(b,
        1E3) : b()
    };
    j.prototype.__clear_message_history = function() {
      this.__SPI_whenRendered(function() {
        a.run_legacy_code(function(a) {
          a.habla_window.setBody("")
        })
      })
    };
    j.prototype.__renderWelcomeMessage = function() {
      function a() {
        return b.__keystore.get({
          key: "__box.welcomeMessage"
        })
      }
      var b = this;
      if (a()) {
        var c = function() {
          var c = a();
          c && b.__chat_api.sendMessageToVisitor({
            nickname: " ",
            body: c,
            __SPI_notification: !0
          });
          b.__keystore.set({
            key: "__box.welcomeMessage",
            value: null,
            link_to_conversation: !0
          })
        };
        b.__chat_api.onReady(function() {
          window.hbl.config.vars.show_pre_chat ?
            b.__chat_api.__SPI_onPrechatInfoReceived(c) : c()
        });
        b.__SPI_whenRendered(function() {
          var b = a();
          if (b) window.habla_window.theme.habla_pre_chat_span.innerHTML = b
        })
      }
    };
    j.prototype.__SPI_setPrechatWelcomeMessage = function(b) {
      this.__keystore.set({
        key: "__box.welcomeMessage",
        value: b,
        link_to_conversation: !0
      });
      a.trigger_event({
        namespace: "box",
        type: "prechatWelcomeMessage",
        body: b
      });
      this.expand()
    };
    j.prototype.__SPI_onPrechatWelcomeMessage = function(b) {
      a.listen_for_event({
        namespace: "box",
        type: "prechatWelcomeMessage",
        callback: b
      })
    };
    j.prototype.__SPI_showMessageHistory = function() {
      var a = this;
      a.__SPI_whenRendered(function() {
        habla_window.config.vars.show_pre_chat ? habla_window.theme.habla_offline_message_div.style.display = "none" : (window.olark.__legacy_shim.ignore_prechat_status = !1, a.__toggle_divs_by_id({
          show: ["habla_chatform_form", "habla_conversation_div"],
          hide: ["olark-api-panel", "habla_pre_chat_div", "habla_offline_message_div"]
        }))
      })
    };
    j.prototype.__SPI_getLegacyState = function(a) {
      var b = this.__keystore.get({
        key: "__box.legacyState"
      }) || {
        box_open: !1,
        box_visible: !0
      };
      a(b)
    };
    j.prototype.__SPI_setLegacyState = function(a) {
      this.__keystore.set({
        key: "__box.legacyState",
        value: a,
        link_to_conversation: !0
      })
    };
    j.prototype.__hide_dom = function(a) {
      typeof a == "string" && (a = document.getElementById(a));
      if (typeof a == "object" && a !== null) return a.style.display = "none", !0;
      return !1
    };
    j.prototype.__show_dom = function(a) {
      typeof a == "string" && (a = document.getElementById(a));
      if (typeof a == "object" && a !== null) return a.style.display = "block", !0;
      return !1
    };
    j.prototype.__toggle_divs_by_id =
      function(a) {
        var b = a.show;
        a = a.hide;
        for (var c in b) typeof b[c] != "function" && this.__show_dom(document.getElementById(b[c]));
        for (var d in a) typeof a[d] != "function" && this.__hide_dom(document.getElementById(a[d]))
    };
    j.prototype.__SPI_whenRendered = function(a) {
      olark("api.chat.onReady", a)
    };
    j.prototype.__SPI_hideForDuration = function(b) {
      this.hide();
      a.trigger_event({
        namespace: "box",
        type: "hideForDuration",
        duration: b
      })
    };
    j.prototype.__SPI_onHideForDuration = function(b) {
      a.listen_for_event({
        namespace: "box",
        type: "hideForDuration",
        callback: b
      })
    };
    j.prototype.__SPI_hideBoxForThisPageOnly = function() {
      this.__SPI_whenRendered(function() {
        a.run_legacy_code(function(a) {
          try {
            a.habla_window.theme.habla_window_div.style.visibility = "hidden"
          } catch (c) {
            b.warn("[olark] unable to hide the chatbox for this page", c)
          }
        })
      })
    };
    j.prototype.__SPI_setThemeTextField = function(b, c) {
      c && olark("api.chat.onReady", function() {
        a.run_legacy_code(function(a) {
          a = a.habla_window.theme[b];
          a.has_typed = !0;
          a.value = c
        })
      })
    };
    j.prototype.__setup_popout_behavior = function() {
      var b =
        this;
      window.onbeforeunload = function() {
        return !1
      };
      var c = function() {
        var c = 300,
          d = 500;
        if (parseInt(navigator.appVersion, 10) > 3) navigator.appName.indexOf("Microsoft") != -1 ? (c = document.body.offsetWidth, d = document.body.offsetHeight) : (c = window.innerWidth, d = window.innerHeight);
        c && d && b.__SPI_whenRendered(function() {
          a.run_legacy_code(function(a) {
            a.habla_window.config.setHeight(parseInt(d, 10) - 85);
            a.habla_window.setHeight(parseInt(d, 10) - 85);
            a.habla_window.setWidth(parseInt(c, 10))
          })
        })
      };
      c();
      window.onresize = c
    };
    j.prototype.__initialize_legacy_event_handlers =
      function() {
        if (!i) {
          i = !0;
          var b = function() {
            habla_window.theme.habla_wcsend_input.disabled = !0;
            habla_window.theme.habla_wcsend_input.style.display = "none"
          };
          this.__chat_api.onOperatorsAway(b);
          this.__chat_api.onOperatorsBusy(b);
          this.__chat_api.onOperatorsAvailable(function() {
            habla_window.theme.habla_wcsend_input.disabled = !1;
            habla_window.theme.habla_wcsend_input.style.display = "block"
          });
          this.__SPI_whenRendered(function() {
            olark._.P("box")
          });
          hbl.eventmgr.register("chat_loaded", function() {
            g = !0
          }, 0);
          hbl.eventmgr.register("olark_link_clicked",
            function() {
              a.trigger_event({
                namespace: "box",
                type: "olark_link_clicked"
              })
            });
          hbl.eventmgr.register("habla_window_changed", function(b) {
            if (g) switch (b.type) {
              case "popout":
                a.trigger_event({
                  namespace: "box",
                  type: "popout"
                });
                break;
              case "endpop_out":
                a.trigger_event({
                  namespace: "box",
                  type: "popin"
                });
                break;
              case "show":
                c || (c = !0, a.trigger_event({
                  namespace: "box",
                  type: "show"
                }));
                break;
              case "hide":
                c = !1;
                a.trigger_event({
                  namespace: "box",
                  type: "hide"
                });
                break;
              case "compress":
                d = !1;
                a.trigger_event({
                  namespace: "box",
                  type: "shrink"
                });
                break;
              case "expand":
                d || (d = !0, a.trigger_event({
                  namespace: "box",
                  type: "expand"
                }))
            }
          }, 0);
          hbl.eventmgr.register("habla_closebutton_a_onclick", function() {
            a.trigger_event({
              namespace: "box",
              type: "dismiss"
            })
          }, 0)
        }
    };
    j.prototype.__populate_message_history_from_chat_api = function() {
      var b = this;
      b.__SPI_whenRendered(function() {
        var c = b.__chat_api.__SPI_getMessageHistory(),
          d = 0;
        for (c.length > 0 && a.run_legacy_code(function(a) {
          a.habla_window.theme.setBody("")
        }); d < c.length;) {
          var g = c[d++],
            i = g.nickname || "you",
            j = g.body;
          a.run_legacy_code(function(a) {
            /^\s+$/.test(j) ||
              a.habla_window.theme.appendNiceMessage(i, j, !0, !0)
          })
        }
        var k = function() {
          var a = window.habla_window.theme.habla_conversation_div;
          a.scrollHeight ? a.scrollTop = a.scrollHeight : setTimeout(k, 100)
        };
        k()
      })
    };
    j.prototype.__setup_chat_history_handling = function() {
      var b = this;
      k || (k = !0, b.__chat_api.onReady(function() {
        b.__populate_message_history_from_chat_api();
        b.__chat_api.__SPI_populatedLocalChatHistoryFromRpcServer() && b.expand()
      }), b.__chat_api.__SPI_onDeliveryOfMessageFromVisitor(function(b) {
        a.run_legacy_code(function(a) {
          a.habla_window.theme.appendNiceMessage(a.hbl.config.vars.myname ||
            "you", b.message.body, !0, !0)
        })
      }), b.__chat_api.__SPI_onDeliveryOfMessageFromOperator(function(b) {
        a.run_legacy_code(function(a) {
          a.habla_window.theme.appendNiceMessage(b.message.nickname, b.message.body, !0, !0)
        })
      }))
    };
    olark.declare({
      name: "__BoxApiHelper",
      startup: function(b, c) {
        var d = b.data.getConversationObject({
          key: "visible",
          initialValue: c.box.start_hidden ? !1 : null
        }),
          g = b.data.getConversationObject({
            key: "state",
            initialValue: null
          }),
          i = b.data.getConversationObject({
            key: "close_hides_window",
            initialValue: !1
          }),
          j = b.data.getConversationObject({
            key: "hidden_for_visit",
            initialValue: !1
          }),
          k = b.data.getVisitorObject({
            key: "hidden_for_visitor",
            initialValue: !1
          }),
          e = b.data.getConversationObject({
            key: "auto_messages",
            initialValue: []
          }),
          m = function() {
            window.olark.__legacy_shim.box_visible = d.get();
            window.olark.__legacy_shim.box_state = g.get()
          };
        if (c.system.hide_not_available && !c.system.offline_msg_mode) b.chat.onOperatorsAway(function() {
          b.visitor.getDetails(function(a) {
            a.isConversing || b.box.hide()
          })
        });
        if (i.get() === !0 && g.get() ===
          "closed" || j.get() === !0 || k.get() === !0) b.box.hide(), m();
        b.chat.onReady(function() {
          a.run_legacy_code(function(a) {
            a.hbl.config.vars.close_hides_window ? i.set(!0) : i.set(!1)
          })
        });
        b.box.onDismiss(function() {
          d.set(!1);
          g.set("closed");
          m()
        });
        b.box.onExpand(function() {
          d.set(!0);
          g.set("expanded");
          m()
        });
        b.box.onShrink(function() {
          d.set(!0);
          g.set("compressed");
          m()
        });
        b.box.onOverlay(function() {
          d.set(!0);
          m()
        });
        b.box.onPopout(function() {
          d.set(!1);
          g.set("closed");
          m()
        });
        b.box.onHide(function() {
          d.set(!1);
          m()
        });
        b.chat.onOperatorsAway(function() {
          c.system.hide_when_offline &&
            b.box.hide()
        });
        b.chat.onOperatorsAvailable(function() {
          c.system.hide_when_offline && b.box.show()
        });
        b.box.__SPI_onInline(function() {
          d.set(!0);
          m()
        });
        b.box.__SPI_onHideForDuration(function(a) {
          a = a.duration;
          a.forVisit ? j.set(!0) : a.forVisitor && k.set(!0);
          d.set(!1);
          g.set("closed");
          m()
        });
        var h = function() {
          j.set(!1);
          k.set(!1)
        };
        b.box.__SPI_whenRendered(function() {
          b.box.onShow(h);
          b.box.onExpand(h);
          b.box.onPopout(h);
          b.box.onOverlay(h)
        });
        m();
        b.chat.onMessageToVisitor(function() {
          b.box.expand()
        });
        b.chat.onOperatorsAvailable(function() {
          b.box.__SPI_showMessageHistory()
        });
        window.olark.__legacy_shim.populate_message_history_from_chat_api = function() {
          b.box.__populate_message_history_from_chat_api()
        };
        b.box.__SPI_onPrechatWelcomeMessage(function(a) {
          var b = e.get();
          b.push(a.body);
          e.set(b)
        });
        b.chat.onBeginConversation(function() {
          var a = e.get().slice(0);
          a.length > 0 && b.chat.sendNotificationToOperator({
            body: ["visitor is replying to these automated messages:", "  >> " + a.join("\n  >> ")].join("\n")
          })
        })
      }
    });
    olark.extend("__BoxApiHelper");
    a.box = {
      BoxApi: j
    }
  })
})(window.olark.__core, window.olark.__core.logger);
(function(a, b) {
  a.wait_for(function() {
    return a.framestorewithjson && a.data && window.olark.__legacy_shim.legacy_post_stub_is_loaded
  }, function() {
    function d(a) {
      return function(a) {
        var b = typeof a;
        b === "object" && (a ? typeof a.length === "number" && !a.propertyIsEnumerable("length") && typeof a.splice === "function" && (b = "array") : b = "null");
        return b
      }(a) == "array"
    }
    var c = /^\s*\!\s*([^\s]+)\s*((.*)\s*)?/,
      g = ["VisitorImportance", "Shopify", "CartSaver"],
      i = !1,
      k = !1,
      j = !1,
      f = null,
      n = !1,
      t = !1,
      o = !1,
      p = !1,
      s = {}, r = function() {
        this.__message_sending_failsafe_timeout =
          null;
        this.__status_update_pending = this.__nickname_update_pending = !1;
        this.__message_queue = [];
        this.__notification_queue = [];
        this.__keystore = new a.data.StorejsKeyStore;
        this.__connection_wrapper = null;
        this.__all_extensions_have_run_their_startup_method = !1;
        this.__sync_pipeline = [];
        this.__sync_pipeline_is_draining = !1
      };
    (function(c) {
      var e = null;
      r.get_instance = function() {
        e || (e = new r);
        return e
      };
      var d = !1,
        f = function(b) {
          d ? b() : a.listen_for_event({
            namespace: "SessionConnection",
            type: "afterReady",
            callback: function() {
              d = !0;
              b()
            }
          })
        };
      c.get_local_data = function(a) {
        return this.__local_get(a)
      };
      c.put_local_data = function(a) {
        return this.__local_set(a)
      };
      c.send_message = function(b) {
        var c = this;
        if (typeof b.body == "undefined") throw Error("[olark] 'body' required");
        c.__message_queue.push(b.body);
        c.__message_queue.length == 1 && a.do_async_call({
          delay: 270
        }, function() {
          c.__synchronize_with_jabber()
        })
      };
      c.send_notification = function(b) {
        var c = this;
        if (typeof b.body == "undefined") throw Error("[olark] 'body' required");
        c.__notification_queue.push(b.body);
        c.__notification_queue.length == 1 && a.do_async_call({
          delay: 300
        }, function() {
          c.__synchronize_with_jabber()
        })
      };
      c.update_nickname_for_extension = function(a) {
        if (typeof a.extension_name == "undefined") throw Error("[olark] 'extension_name' required");
        if (typeof a.snippet == "undefined") throw Error("[olark] 'snippet' required");
        var b = a.extension_name,
          c = a.snippet,
          h = a.hides_default_nickname,
          e = this.__local_get({
            key: "nickname_lookup"
          }) || {};
        e[b] = {
          snippet: c,
          hides_default_nickname: h,
          secureTimestamp: a.secureTimestamp,
          secureSignature: a.secureSignature
        };
        this.__local_set({
          key: "nickname_lookup",
          value: e
        });
        this.__mark_nickname_update_pending()
      };
      c.__mark_nickname_update_pending = function(b) {
        var c = this;
        if (!c.__nickname_update_pending) c.__nickname_update_pending = !0, a.do_async_call({
          delay: 250
        }, function() {
          c.__synchronize_with_jabber(b)
        });
        c.__mark_status_update_pending(!0)
      };
      c.update_status_for_extension = function(a) {
        if (typeof a.extension_name == "undefined") throw Error("[olark] 'extension_name' required");
        if (typeof a.snippet == "undefined") throw Error("[olark] 'snippet' required");
        var b = this.__local_get({
          key: "status_lookup"
        }) || {};
        b[a.extension_name] = {
          snippet: a.snippet,
          secureTimestamp: a.secureTimestamp,
          secureSignature: a.secureSignature
        };
        this.__local_set({
          key: "status_lookup",
          value: b
        });
        this.__mark_status_update_pending()
      };
      c.__mark_status_update_pending = function(b) {
        var c = this;
        if (!c.__status_update_pending) c.__status_update_pending = !0, a.do_async_call({
          delay: 260
        }, function() {
          c.__synchronize_with_jabber(void 0, b)
        })
      };
      c.disconnect = function() {
        var b = this;
        a.run_legacy_code(function(a) {
          a.hbl.client.sendcommand &&
            a.hbl.client.sendcommand("disconnectchat", b.__enableMessageToBeRoutedToGroupIfNecessary(""))
        })
      };
      c.getGroupForThisPage = function() {
        return this.__groupIdString
      };
      c.lockToGroupForThisPage = function(a) {
        olark.__legacy_shim.currentGroupIdstring = this.__groupIdString = a
      };
      c.unlockFromGroupForThisPage = function() {
        olark.__legacy_shim.currentGroupIdstring = this.__groupIdString = {}.undefinedValue
      };
      c.__TMP_set_connection_wrapper = function(a) {
        var b = this;
        b.__connection_wrapper = a;
        b.__with_open_connection(function() {
          b.__all_extensions_have_run_their_startup_method = !0;
          b.__synchronize_with_jabber()
        })
      };
      c.__TMP_get_current_combined_nickname = function() {
        var b = this.__local_get({
          key: "nickname_lookup"
        }) || {}, c = [],
          h = !0,
          e = function(a) {
            return {
              v: a.snippet,
              t: a.secureTimestamp,
              s: a.secureSignature
            }
          };
        a.for_each_extension_name_starting_with_most_recent(function(a) {
          var d = b[a];
          d && typeof d != "function" && d.snippet && d.snippet.length > 0 && (d.hides_default_nickname && (h = !1), function(b) {
            var h;
            a: {
              for (h = 0; h < g.length; h++)
                if (g[h] == a) {
                  h = !0;
                  break a
                }
              h = !1
            }
            h ? c.unshift(b) : c.push(b)
          }(e(d)))
        });
        (h || c.length ===
          0) && c.push(e({
          snippet: this.__get_default_nickname_snippet()
        }));
        return a.framestorewithjson.json.encode(c)
      };
      c.__TMP_get_current_combined_status = function() {
        var c = this.__local_get({
          key: "status_lookup"
        }) || {}, h = [];
        a.for_each_extension_name_starting_with_most_recent(function(a) {
          try {
            var e = c[a];
            e && typeof e != "function" && h.unshift({
              v: e.snippet,
              t: e.secureTimestamp,
              s: e.secureSignature
            })
          } catch (d) {
            b.error("[olark] problem setting status: " + d.toString()), b.showErrorBacktrace(d)
          }
        });
        h.length == 0 && (h = [{
          v: "There is no status information available right now.\n Add custom information using the Javascript API (www.olark.com/docs)."
        }]);
        h.unshift({
          v: "{{nickname}}"
        });
        return a.framestorewithjson.json.encode(h)
      };
      c.__enableMessageToBeRoutedToGroupIfNecessary = function(a) {
        if (typeof a != "string") throw Error("[olark] message must be a string");
        return a
      };
      c.__get_default_nickname_snippet = function() {
        var a = this.__local_get({
          key: "default_nickname"
        }) || null;
        a || (a = "{{geolocation}} #" + Math.floor(Math.random() * 1E4).toString(), this.__local_set({
          key: "default_nickname",
          value: a
        }));
        return a
      };
      c.__local_get = function(a) {
        if (typeof a.key == "undefined") throw Error("'key' required");
        return (this.__keystore.get({
          key: "sessconn"
        }) || {})[a.key] || null
      };
      c.__local_set = function(a) {
        if (typeof a.key == "undefined") throw Error("'key' required");
        var b = this.__keystore.get({
          key: "sessconn"
        }) || {};
        b[a.key] = a.value;
        this.__keystore.set({
          key: "sessconn",
          value: b,
          link_to_conversation: !0
        })
      };
      c.__update_nickname_in_jabber = function(b) {
        var c = this;
        f(function() {
          c.__local_set({
            key: "has_sent_initial_nickname",
            value: !0
          });
          c.__nickname_update_pending = !1;
          var h = c.__TMP_get_current_combined_nickname(),
            e = c.__local_get({
              key: "previous_nickname"
            }) !=
              h;
          c.__local_set({
            key: "previous_nickname",
            value: h
          });
          (e || b) && a.run_legacy_code(function(a) {
            a.hbl.client.setnickname(c.__enableMessageToBeRoutedToGroupIfNecessary(h))
          })
        })
      };
      c.__update_status_in_jabber = function(b) {
        var c = this;
        f(function() {
          c.__local_set({
            key: "has_sent_initial_status",
            value: !0
          });
          c.__status_update_pending = !1;
          var h = c.__TMP_get_current_combined_status(),
            e = c.__local_get({
              key: "previous_status"
            }) != h;
          c.__local_set({
            key: "previous_status",
            value: h
          });
          (e || b) && a.run_legacy_code(function(a) {
            a.hbl.client.sendpresence(c.__enableMessageToBeRoutedToGroupIfNecessary(h),
              "chat")
          })
        })
      };
      var i = function(a) {
        if (typeof a.list == "undefined") throw Error("'list' required");
        var b = {};
        a = a.list;
        for (var c = [], h = 0; h < a.length; h++) {
          var e = a[h];
          b[e] || (b[e] = !0, c.push(e))
        }
        return c
      };
      c.__dequeue_messages_into_jabber = function() {
        var c = this;
        f(function() {
          var h = c.__message_queue;
          c.__message_queue = [];
          var e = i({
            list: h
          });
          e.length != h.length && b.warn("[olark] message batch contains", h.length - e.length, "duplicate messages");
          var d = null;
          h.length > 0 && (d = a.join_string_list({
            list: e,
            separator: "\n"
          }));
          d && c.__sendmessage(d, !1)
        })
      };
      c.__dequeue_notifications_into_jabber = function() {
        var c = this,
          h = c.__notification_queue;
        c.__notification_queue = [];
        a.run_legacy_code(function() {
          var e = i({
            list: h
          });
          e.length != h.length && b.warn("[olark] notification batch contains", h.length - e.length, "duplicate notifications");
          var d = null;
          h.length > 1 ? d = "[info]\n  - " + a.join_string_list({
            list: e,
            separator: "\n  - "
          }) : h.length == 1 && (d = "[info] " + h[0]);
          d && c.__sendmessage(d, !0)
        })
      };
      c.__sendmessage = function(b, c) {
        var h = this,
          e = h.__local_get({
            key: "sentmessage"
          }) ? !1 : !0;
        a.run_legacy_code(function(a) {
          a.hbl.client.sendmessage(h.__enableMessageToBeRoutedToGroupIfNecessary(b), c ? !0 : !1, c ? !0 : {}.undefinedValue, e, h.__TMP_get_current_combined_nickname(), h.__TMP_get_current_combined_status())
        });
        h.__local_set({
          key: "sentmessage",
          value: !0
        })
      };
      c.__synchronize_with_jabber = function(a, b) {
        var c = this,
          h = c.__nickname_update_pending,
          e = c.__status_update_pending,
          d = c.__notification_queue.length > 0 ? !0 : !1,
          l = c.__message_queue.length > 0 ? !0 : !1,
          f = c.__local_get({
            key: "has_sent_initial_nickname"
          }),
          g = c.__local_get({
            key: "has_sent_initial_status"
          });
        c.__all_extensions_have_run_their_startup_method && (f || (h = !0), g || (e = !0));
        c.__force_nickname_update = c.__force_nickname_update || a;
        c.__force_status_update = c.__force_status_update || b;
        var i = c.__sync_pipeline;
        if (h && !c.__nickname_update_queued) f = !0, c.__nickname_update_queued = !0, i.push(function() {
          var a = c.__force_nickname_update;
          c.__nickname_update_queued = !1;
          c.__force_nickname_update = !1;
          c.__update_nickname_in_jabber(a)
        });
        if (e && !c.__status_update_queued) f ? (g = !0, c.__status_update_queued = !0, i.push(function() {
          var a = c.__force_status_update;
          c.__status_update_queued = !1;
          c.__force_status_update = !1;
          c.__update_status_in_jabber(a)
        })) : c.__trigger_message_sending_failsafe();
        d && (g ? i.push(function() {
          c.__dequeue_notifications_into_jabber()
        }) : c.__trigger_message_sending_failsafe());
        l && (g ? i.push(function() {
          c.__dequeue_messages_into_jabber()
        }) : c.__trigger_message_sending_failsafe());
        c.__drain_sync_pipeline()
      };
      c.__drain_sync_pipeline = function() {
        var c = this,
          h = c.__sync_pipeline,
          e = function() {
            if (h.length > 0) {
              var d = h.shift();
              a.try_and_optionally_catch(function() {
                d()
              }, function(a) {
                b.error("[olark] problem servicing SessionConnection pipeline: " + a.toString());
                b.showErrorBacktrace(a)
              })
            }
            h.length > 0 ? a.do_async_call({
              delay: 1E3
            }, e) : c.__sync_pipeline_is_draining = !1
          };
        if (c.__sync_pipeline_is_draining === !1) c.__sync_pipeline_is_draining = !0, e()
      };
      c.__with_open_connection = function(a) {
        this.__connection_wrapper(a)
      };
      c.__trigger_message_sending_failsafe = function() {
        var b = this,
          c = b.__local_get({
            key: "has_sent_initial_nickname"
          }),
          h = b.__local_get({
            key: "has_sent_initial_status"
          });
        if (!b.__message_sending_failsafe_timeout) b.__message_sending_failsafe_timeout = a.do_async_call({
          delay: 3E3
        }, function() {
          if (!c || !h) h = c = !0, b.__synchronize_with_jabber()
        })
      }
    })(r.prototype);
    var e = function(a) {
      var c = this;
      c.__legacy_message_tuple = a.legacy_message_tuple;
      if (typeof c.__legacy_message_tuple == "undefined") throw Error("'legacy_message_tuple' required");
      if (typeof a.send_event_type == "undefined") throw Error("'send_event_type' required");
      if (typeof a.deliver_event_type ==
        "undefined") throw Error("'send_event_type' required");
      if (typeof a.final_delivery_action == "undefined") throw Error("'final_delivery_action' required");
      c.__send_event_type = a.send_event_type;
      c.__deliver_event_type = a.deliver_event_type;
      c.__final_delivery_action = a.final_delivery_action;
      c.__delivered = !1;
      c.__predelivery_actions = [];
      c.__new_body = null;
      c.__SPI_notification = a.__SPI_notification;
      c.__message_event = {
        namespace: "chat",
        type: c.__send_event_type,
        automated: a.is_automated ? !0 : !1,
        __SPI_notification: a.__SPI_notification,
        nickname: c.__legacy_message_tuple[0],
        body: c.__legacy_message_tuple[1],
        __legacy_sequence_id: parseFloat(c.__legacy_message_tuple[2]),
        __SPI_deferMessageDelivery: function(a) {
          c.__predelivery_actions.push(a)
        },
        updateBody: function(a) {
          c.__new_body && b.warn("[olark] two handlers tried to modify the body of the same message, allowing the second one to override");
          c.__new_body = a
        }
      };
      c.__original_body = window.olark.__core.clone_object(c.__message_event.body)
    };
    (function(c) {
      c.get_processed_body = function() {
        return this.__new_body ||
          this.__message_event.body
      };
      c.send = function() {
        a.trigger_event(this.__message_event)
      };
      c.deliver = function() {
        for (var b = this, c = [], h = function() {
            c[e] = !0;
            for (var a = c.length, h = !0; a--;) c[a] || (h = !1);
            h && b.__trigger_delivery()
          }, e = b.__predelivery_actions.length; e--;) c.push(!1);
        e = b.__predelivery_actions.length;
        for (a.listen_for_event({
          namespace: "chat::Message",
          type: "doneDeferringMessageDelivery",
          callback: h
        }); e--;)(function(b, h) {
          h({
            deliverMessage: function() {
              c[b] = !0;
              a.trigger_event({
                namespace: "chat::Message",
                type: "doneDeferringMessageDelivery"
              })
            }
          })
        })(e,
          b.__predelivery_actions[e]);
        h()
      };
      c.__trigger_delivery = function() {
        if (!this.__delivered) this.__delivered = !0, this.__original_body != this.__message_event.body && b.warn("[olark] you cannot modify the 'body' attribute of messages directly, please use message.updateBody() to modify the body"), a.trigger_event({
          namespace: "chat",
          type: this.__deliver_event_type,
          automated: this.__message_event.automated,
          nickname: this.__message_event.nickname,
          body: this.get_processed_body(),
          __legacy_sequence_id: parseFloat(this.__message_event.__legacy_sequence_id)
        }),
        this.__final_delivery_action()
      }
    })(e.prototype);
    var m = function(a) {
      function b(a) {
        return a == "true" ? !0 : !1
      }

      function c(a) {
        return a == "null" ? null : a
      }
      var e = this;
      e.__conf = a.conf;
      if (typeof e.__conf == "undefined") throw Error("'conf' required");
      e.__extension_name = a.extension_name;
      if (typeof e.__extension_name == "undefined") throw Error("'extension_name' required");
      e.__data = new window.olark.__core.data.DataApi({
        namespace: "__chatd"
      });
      e.__last_incr_seq_id = e.__data.getConversationObject({
        key: "last_incr_seq_id",
        initialValue: 0,
        backup: "cd1",
        backupTransform: parseFloat
      });
      e.__last_leg_seq_id = e.__data.getConversationObject({
        key: "last_leg_seq_id",
        initialValue: 0,
        backup: "cd2",
        backupTransform: parseFloat
      });
      e.__is_conversing = e.__data.getConversationObject({
        key: "is_conversing",
        initialValue: !1,
        backup: "cd3",
        backupTransform: b
      });
      e.__hasconnected = e.__data.getConversationObject({
        key: "hasconnected",
        initialValue: !1,
        backup: "cd4",
        backupTransform: b
      });
      e.__data_history = e.__data.getConversationObject({
        key: "data_history",
        initialValue: !1
      });
      e.__last_op_presence =
        e.__data.getConversationObject({
          key: "last_op_presence",
          initialValue: "away",
          backup: "cd5",
          backupTransform: c
        });
      e.__last_cmd_seq_id = e.__data.getConversationObject({
        key: "last_cmd_seq_id",
        initialValue: 0,
        backup: "cd6",
        backupTransform: parseFloat
      });
      e.__last_presence = e.__data.getConversationObject({
        key: "last_presence",
        initialValue: "chat",
        backup: "cd8",
        backupTransform: c
      });
      e.__is_connection_upgraded = e.__data.getConversationObject({
        key: "is_connection_upgraded",
        initialValue: !1
      });
      e.__is_ended = e.__data.getConversationObject({
        key: "is_ended",
        initialValue: !1
      });
      e.__next_conversation_id = e.__data.getConversationObject({
        key: "next_conversation_id",
        initialValue: null
      });
      e.__needsToDoPrechat = e.__data.getConversationObject({
        key: "needs_prechat",
        initialValue: null
      });
      e.__SPI_onPrechatInfoReceived(function() {
        e.__needsToDoPrechat.set(!1)
      });
      e.onReady(function() {
        e.__needsToDoPrechat.get() === null && e.__needsToDoPrechat.set(hbl.config.vars.show_pre_chat ? !0 : !1)
      });
      e.__initialize_legacy_connection_and_messaging_handlers();
      e.__initialize_legacy_history_tracking();
      e.__initialize_conversation_tracking();
      e.__has_local_history = !0;
      e.__conversation_message_history = [];
      e.__session_connection = r.get_instance();
      e.__session_connection.__TMP_set_connection_wrapper(function(a) {
        e.__wait_for_chat_to_connect(a)
      })
    };
    (function() {
      var c = m.prototype;
      m.prototype.listen = function(c, h) {
        var e = string.charAt(0).toUpperCase() + string.slice(1);
        b.warn("[olark] api.chat.listen is deprecated, please use api.chat.on" + e + " instead");
        a.listen_for_event({
          namespace: "chat",
          type: c,
          callback: h
        })
      };
      c.onMessageFromVisitor =
        function(a) {
          b.warn("[olark] api.chat.onMessageFromVisitor is deprecated, please use api.chat.onMessageToOperator instead");
          return this.onMessageToOperator(a)
      };
      c.onMessageFromOperator = function(a) {
        b.warn("[olark] api.chat.onMessageFromOperator is deprecated, please use api.chat.onMessageToVisitor instead");
        return this.onMessageToVisitor(a)
      };
      c.getNickname = function() {
        b.warn("[olark] api.chat.getNickname is deprecated, please use api.chat.getVisitorNickname instead");
        return this.getVisitorNickname()
      };
      c.sendAutomatedMessageToVisitor = function(a) {
        b.warn("[olark] api.chat.sendAutomatedMessageToVisitor is deprecated, please use api.chat.sendMessageToVisitor instead");
        return this.sendMessageToVisitor(a)
      };
      c.updateNickname = function(a) {
        b.warn("[olark] api.chat.updateNickname is deprecated, please use api.chat.updateVisitorNickname instead");
        return this.updateVisitorNickname(a)
      };
      c.onConnectComplete = function(a) {
        b.warn("[olark] api.chat.onConnectComplete is deprecated, please use api.chat.onReady instead");
        return this.onReady(a)
      }
    })();
    m.prototype.updateVisitorNickname = function(a) {
      a = a || {};
      if (a.nickname) a.snippet = a.nickname, b.warn("[olark] giving 'nickname' as an argument to updateVisitorNickname is now deprecated, use 'snippet' instead");
      typeof a == "string" && (a = {
        snippet: a
      });
      if (typeof a.snippet == "undefined") throw Error("'snippet' required");
      if (d(a.snippet))
        if (a.secureTimestamp || a.secureSignature) throw Error("[olark] you cannot give a list of snippets and also security information, please join the snippets yourself before signing them");
        else a.snippet = a.snippet.join(" | ");
      this.__session_connection.update_nickname_for_extension({
        extension_name: a.source || this.__extension_name,
        snippet: a.snippet,
        hides_default_nickname: a.hidesDefault ? !0 : !1,
        secureTimestamp: a.secureTimestamp,
        secureSignature: a.secureSignature
      })
    };
    m.prototype.getVisitorNickname = function(c) {
      c = c || {};
      c.other && b.warn("[olark] giving 'other' as an argument to getVisitorNickname is now deprecated, this method only returns the entire nickname");
      c.combined && b.warn("[olark] giving 'combined' as an argument to getVisitorNickname is now deprecated, this method only returns the entire nickname");
      c = this.__session_connection.__TMP_get_current_combined_nickname();
      c = a.framestorewithjson.json.decode(c);
      for (var e = [], d = 0; d < c.length; d++) e.push(c[d].v);
      return e.length ? e.join(" | ") : null
    };
    m.prototype.updateVisitorStatus = function(a) {
      a = a || {};
      if (a.status) a.snippet = a.status, b.warn("[olark] giving 'status' as an argument to updateVisitorStatus is now deprecated, use 'snippet' instead");
      typeof a == "string" && (a = {
        snippet: a
      });
      if (typeof a.snippet == "undefined") throw Error("[olark] 'snippet' required");
      if (d(a.snippet))
        if (a.secureTimestamp ||
          a.secureSignature) throw Error("[olark] you cannot give a list of snippets and also security information, please join the snippets yourself before signing them");
        else a.snippet = a.snippet.join("\n| ");
      this.__session_connection.update_status_for_extension({
        extension_name: this.__extension_name,
        snippet: a.snippet,
        secureTimestamp: a.secureTimestamp,
        secureSignature: a.secureSignature
      })
    };
    m.prototype.getVisitorStatus = function(c) {
      c = c || {};
      c.other && b.warn("[olark] giving 'other' as an argument to getVisitorStatus is now deprecated, this method only returns the entire status");
      c.combined && b.warn("[olark] giving 'combined' as an argument to getVisitorStatus is now deprecated, this method only returns the entire status");
      c = this.__session_connection.__TMP_get_current_combined_status();
      c = a.framestorewithjson.json.decode(c);
      for (var e = [], d = 0; d < c.length; d++) e.push(c[d].v);
      return e.length ? e.join("\n| ") : null
    };
    m.prototype.sendNotificationToOperator = function(b) {
      var c = this,
        e = null;
      e = typeof b == "string" ? b : b.body;
      if (!e) throw Error("body required");
      c.__wait_for_chat_to_connect(function() {
        a.trigger_event({
          namespace: "chat",
          type: "notificationToOperator",
          body: e,
          after: function() {
            c.__session_connection.send_notification({
              body: e
            })
          }
        })
      })
    };
    m.prototype.sendMessageFromVisitor = function(b) {
      var c = this,
        e = null;
      e = typeof b == "string" ? b : b.body;
      if (!e) throw Error("body required");
      c.__wait_for_chat_to_connect(function() {
        a.trigger_event({
          namespace: "chat",
          type: "messageFromVisitor",
          body: e,
          after: function() {
            c.__session_connection.send_message({
              body: e
            })
          }
        })
      })
    };
    m.prototype.onNotificationToOperator = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "notificationToOperator",
        callback: function(a) {
          b({
            notification: {
              body: a.body
            }
          })
        }
      })
    };
    m.prototype.sendNotificationToVisitor = function(a) {
      this.sendMessageToVisitor({
        nickname: "INTERNAL_NOTIFICATION",
        body: a.body,
        __SPI_notification: !0
      })
    };
    m.prototype.__SPI_sendInterfaceElementToVisitor = function(a) {
      this.sendMessageToVisitor({
        nickname: "INTERNAL_NOTIFICATION-" + this.__extension_name + "-" + a.key,
        body: "...",
        __SPI_notification: !0
      })
    };
    m.prototype.__SPI_onInterfaceElementReady = function(b) {
      var c = this;
      a.listen_for_event({
        namespace: "chat",
        type: "interfaceElementReady",
        callback: function(a) {
          a.extensionName === c.__extension_name && b({
            key: a.key,
            dom: a.dom
          })
        }
      })
    };
    m.prototype.__get_next_message_sequence_id_that_is_server_safe = function() {
      var a = this.__last_leg_seq_id.get(),
        b = parseFloat(a),
        c = this.__last_incr_seq_id.get(),
        e = parseFloat(c),
        d = null;
      a != b && (olark._.hlog("last_legacy_sequence_id was not a float:", a, "#non_int_legseq_id #warn"), a = b || 0);
      c != e && (olark._.hlog("last_incremented_sequence_id was not a float:", c, "#non_int_incrseq_id #warn"), c = e ||
        0);
      d = c <= a ? a + 0.25 : c + 0.25;
      this.__last_incr_seq_id.set(d);
      return d
    };
    m.prototype.onNotificationToVisitor = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "messageFromOperator",
        callback: function(a) {
          a.nickname == "INTERNAL_NOTIFICATION" && b({
            notification: {
              body: a.body
            }
          })
        }
      })
    };
    m.prototype.sendMessageToVisitor = function(b) {
      var c = this,
        e = b.nickname || "",
        d = b.body,
        f = b.skipPrechatSurvey ? !0 : !1;
      if (!d) throw Error("body required");
      var g = b.automated === !1 ? !1 : !0;
      !f && c.__needsToDoPrechat.get() === !0 ? olark("api.box.__SPI_setPrechatWelcomeMessage",
        d) : c.__wait_for_chat_to_connect(function() {
        a.run_legacy_code(function(a) {
          e || (e = a.hbl.client.current_operator());
          c.__send_and_deliver_message_from_operator({
            legacy_message_tuple: [e, d, c.__get_next_message_sequence_id_that_is_server_safe()],
            is_automated: g,
            __SPI_notification: b.__SPI_notification
          })
        })
      })
    };
    m.prototype.onMessageToVisitor = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "messageFromOperator",
        callback: function(a) {
          b({
            message: {
              nickname: a.nickname,
              body: a.body,
              updateBody: function(b) {
                a.updateBody(b)
              },
              __SPI_deferMessageDelivery: function(b) {
                a.__SPI_deferMessageDelivery(b)
              },
              automated: a.automated,
              __SPI_notification: a.__SPI_notification
            }
          })
        }
      })
    };
    m.prototype.onMessageToOperator = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "messageFromVisitor",
        callback: function(a) {
          b({
            message: {
              nickname: a.nickname,
              body: a.body,
              updateBody: function(b) {
                a.updateBody(b)
              },
              __SPI_deferMessageDelivery: function(b) {
                a.__SPI_deferMessageDelivery(b)
              }
            }
          })
        }
      })
    };
    m.prototype.onOfflineMessageToOperator = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "offlineMessageToOperator",
        callback: function(a) {
          b({
            message: {
              nickname: a.message.nickname,
              body: a.message.body
            }
          })
        }
      })
    };
    m.prototype.onCommandFromOperator = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "commandFromOperator",
        callback: function(a) {
          b({
            command: {
              name: a.name,
              body: a.body,
              nickname: a.nickname
            }
          })
        }
      })
    };
    m.prototype.__SPI_onDeliveryOfMessageFromVisitor = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "deliveryOfMessageFromVisitor",
        callback: function(a) {
          b({
            __legacy_sequence_id: parseFloat(a.__legacy_sequence_id),
            message: {
              nickname: a.nickname,
              body: a.body
            }
          })
        }
      })
    };
    m.prototype.__SPI_onDeliveryOfMessageFromOperator = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "deliveryOfMessageFromOperator",
        callback: function(a) {
          b({
            __legacy_sequence_id: parseFloat(a.__legacy_sequence_id),
            message: {
              nickname: a.nickname,
              body: a.body
            }
          })
        }
      })
    };
    m.prototype.operatorsAreAvailable = function() {
      return f == "available"
    };
    m.prototype.onOperatorsAvailable = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "operatorsAvailable",
        callback: b
      })
    };
    m.prototype.operatorsAreBusy = function() {
      return f == "busy"
    };
    m.prototype.onOperatorsBusy = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "operatorsBusy",
        callback: b
      })
    };
    m.prototype.operatorsAreAway = function() {
      return f == "away"
    };
    m.prototype.onOperatorsAway = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "operatorsAway",
        callback: b
      })
    };
    m.prototype.__SPI_onConnectBegin = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "connectBegin",
        callback: b
      })
    };
    m.prototype.setOperatorGroup = function(b) {
      this.__SPI_lockToOperatorGroup(b.group ||
        b);
      a.trigger_event({
        namespace: "chat",
        type: "operatorGroupChanging"
      });
      hbl.client.eventmgr.register("handled_nrpc_response", function() {
        a.trigger_event({
          namespace: "chat",
          type: "operatorGroupChanged"
        });
        hbl.client.eventmgr.unregister_all("handled_nrpc_response")
      });
      hbl.client.sendcommand("return_long_poll_now", "")
    };
    m.prototype.__SPI_onOperatorGroupChanging = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "operatorGroupChanging",
        callback: b
      })
    };
    m.prototype.__SPI_onOperatorGroupChanged = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "operatorGroupChanged",
        callback: b
      })
    };
    m.prototype.__SPI_lockToOperatorGroup = function(a) {
      olark._.cookieManager.setAllowingNullAndUndefinedAndEmptyString("_okgid", a);
      this.__session_connection.lockToGroupForThisPage(a)
    };
    m.prototype.__SPI_lockToExistingOperatorGroupIfGiven = function(a) {
      var b = olark._.cookieManager.getAllowingNullAndUndefinedAndEmptyString("_okgid");
      b || b === null ? this.__session_connection.lockToGroupForThisPage(b) : this.__session_connection.lockToGroupForThisPage(a)
    };
    m.prototype.__SPI_unlockFromCurrentGroup =
      function() {
        olark._.cookieManager.erase("_okgid");
        this.__session_connection.unlockFromGroupForThisPage()
    };
    m.prototype.onReady = function(a) {
      this.__wait_for_chat_to_connect(a)
    };
    m.prototype.whenDataReady = function(b) {
      n ? b() : a.listen_for_event({
        namespace: "chat",
        type: "dataReady",
        callback: b
      })
    };
    m.prototype.connect = function() {
      this.__SPI_connectToRpcServers()
    };
    m.prototype.__SPI_onConnectFailure = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "connectFailure",
        callback: b
      })
    };
    m.prototype.__wait_for_chat_to_connect =
      function(b) {
        k ? b() : (b = a.create_idempotent_callback(b), a.listen_for_event({
          namespace: "chat",
          type: "onReady",
          callback: b
        }))
    };
    m.prototype.__SPI_visitorIsAvailable = function() {
      return this.__last_presence.get() == "chat"
    };
    m.prototype.__SPI_visitorIsBusy = function() {
      return this.__last_presence.get() == "dnd"
    };
    m.prototype.__SPI_visitorIsAway = function() {
      return this.__last_presence.get() == "away"
    };
    m.prototype.__SPI_isConversing = function() {
      return this.__is_conversing.get() === !0 ? !0 : !1
    };
    m.prototype.__SPI_beginConversation =
      function() {
        this.__is_conversing.get() != !0 && (this.__is_conversing.set(!0), a.trigger_event({
          namespace: "chat",
          type: "beginConversation"
        }))
    };
    m.prototype.__SPI_onConversationBegin = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "beginConversation",
        callback: b
      })
    };
    m.prototype.__SPI_endConversation = function() {
      this.__is_conversing.set(!1)
    };
    m.prototype.__SPI_onEndedStateChanged = function(b) {
      var c = this;
      a.listen_for_event({
        namespace: "chat",
        type: "endedStateChange",
        callback: function() {
          c.__SPI_getEndedState(b)
        }
      })
    };
    m.prototype.__SPI_getEndedState = function(a) {
      a({
        is_ended: this.__is_ended.get(),
        next_conversation_id: this.__next_conversation_id.get(),
        is_conversing: this.__SPI_isConversing()
      })
    };
    m.prototype.onBeginConversation = function(b) {
      a.listen_for_event({
        namespace: "chat",
        type: "beginConversation",
        callback: b
      })
    };
    m.prototype.__initialize_conversation_tracking = function() {
      var a = this;
      a.onMessageToOperator(function(b) {
        b.message.__SPI_notification !== !0 && a.__SPI_beginConversation()
      });
      a.onMessageToVisitor(function(b) {
        b.message.__SPI_notification !== !0 && a.__SPI_beginConversation()
      })
    };
    m.prototype.__SPI_getConversationUUID = function() {
      return olark._.identityManager.getConversationId()
    };
    m.prototype.__SPI_getVisitorUUID = function() {
      return olark._.identityManager.getVisitorId()
    };
    m.prototype.__SPI_getLegacyConfig = function() {
      return a.run_legacy_code(function(a) {
        return a.hbl.config
      })
    };
    m.prototype.__SPI_queryCurrentGroup = function(a) {
      a({
        group: this.__session_connection.getGroupForThisPage()
      })
    };
    m.prototype.__SPI_disableEventConnection = function() {
      p = !0
    };
    m.prototype.__SPI_enableEventConnection =
      function() {
        p = !1
    };
    m.prototype.__SPI_getLegacySiteId = function() {
      return olark._.identityManager.getSiteId()
    };
    m.prototype.__SPI_sendRawMessageToVisitor = function(b) {
      var c = [b.nickname, b.body, this.__get_next_message_sequence_id_that_is_server_safe()];
      a.run_legacy_code(function(a) {
        a.hbl.client.incoming_pipeline.run(c)
      })
    };
    m.prototype.__SPI_sendRawMessageToOperator = function(a) {
      this.__send_and_deliver_message_from_visitor({
        legacy_message_tuple: [null, a.body, 0]
      })
    };
    m.prototype.__handleHighTrafficConfiguration =
      function(a) {
        var b = this;
        if (b.__is_connection_upgraded.get() !== !0 && a.system && a.system.forced_polling_in_seconds_when_online_but_not_chatting) {
          a = a.system.forced_polling_in_seconds_when_online_but_not_chatting;
          var c = hbl.client.pollingmanager.getMinAvailablePollTime();
          hbl.client.pollingmanager.setMinAvailablePollTime(a * 1E3);
          var e = function() {
            b.__is_connection_upgraded.get() || (b.__is_connection_upgraded.set(!0), hbl.client.pollingmanager.setMinAvailablePollTime(c), hbl.client.pollingmanager.startNextPollNow())
          };
          hbl.eventmgr.register("habla_window_changed", function(a) {
            a.type === "expand" && e()
          });
          olark("api.box.onExpand", e)
        }
    };
    m.prototype.__SPI_connectToRpcServers = function(a) {
      a = a || {};
      var c = this,
        e = c.__conf;
      if (j != !0 && (j = !0, c.__hasconnected.set(!0), olark._.P("getconnection"), c.onReady(function() {
        olark._.P("connection")
      }), !p)) {
        window.hblJavaScriptVersion = "api-1.2.1";
        window.hbl_hostname = e.system.legacy_rpc_server || window.hbl_hostname || "olark.com/rpc";
        window.hbl.config = window.wc_config();
        var d = window.hbl.config;
        d.vars.no_system_messages = !0;
        d.vars.disable_rpc_state = !0;
        if (e.system.show_in_buddy_list == "chatting" && typeof e.system.forced_polling_in_seconds_when_online_but_not_chatting === "undefined") e.system.forced_polling_in_seconds_when_online_but_not_chatting = 300;
        c.__handleHighTrafficConfiguration(e);
        if (e.system.path) d.vars.cookie_path = e.system.path, d.vars.hbl_cookie_path = e.system.path;
        e.system.disable_offline_messaging_fallback && olark._.hlog("used #disable_offline_messaging_fallback flag");
        for (var f in e.system) typeof e.system[f] !=
          "function" && (d.vars[f] = e.system[f]);
        for (var g in e.box) typeof e.box[g] != "function" && (d.vars[g] = e.box[g]);
        if (/AppleWebKit/.test(navigator.appVersion)) {
          f = document.getElementsByTagName("object");
          for (g = 0; g < f.length; g++)
            if (/\.swf/.test(f[g].data || "")) {
              d.vars.disable_expand_text_input = !0;
              break
            }
        }
        f = function(a, b) {
          return typeof a == "undefined" ? b : a
        };
        d.vars.top_margin = f(e.box.vertical_offset, d.vars.top_margin);
        d.vars.bottom_margin = f(e.box.vertical_offset, d.vars.bottom_margin);
        d.vars.right_margin = f(e.box.horizontal_offset,
          d.vars.right_margin);
        d.vars.left_margin = f(e.box.horizontal_offset, d.vars.left_margin);
        f = function(a, b) {
          d.vars[a] = b || e.system[a]
        };
        f("before_chat_text", e.locale.welcome_title || e.box.welcome_title);
        f("in_chat_text", e.locale.chatting_title);
        f("not_available_text", e.locale.unavailable_title || e.box.unavailable_title);
        f("busy_text", e.locale.busy_title);
        f("away_text", e.locale.unavailable_title);
        f("offline_message", e.locale.away_message);
        f("welcome_msg", e.locale.welcome_message || e.box.welcome_message);
        f("busy_message",
          e.locale.busy_message);
        f("say_text", e.locale.chat_input_text);
        f("habla_name_input_text", e.locale.name_input_text || e.system.field_text_for_name);
        f("habla_offline_email_text", e.locale.email_input_text || e.system.field_text_for_email);
        f("habla_offline_phone_text", e.locale.phone_input_text);
        f("habla_offline_body_text", e.locale.offline_note_message || e.system.field_for_offline_message_body || e.system.information_text_when_offline);
        f("habla_offline_submit_value", e.locale.send_button_text || e.system.button_text_for_send);
        f("habla_offline_sent_text", e.locale.offline_note_thankyou_text || e.system.offline_message_thankyou_text);
        f("email_body_error_text", e.locale.offline_note_error_text || e.system.offline_message_validation_error_text);
        f("sending_text", e.locale.offline_note_sending_text || e.system.offline_message_sending_text);
        f("operator_is_typing_text", e.locale.operator_is_typing_text);
        f("operator_has_stopped_typing_text", e.locale.operator_has_stopped_typing_text);
        f("pre_chat_error_text", e.locale.introduction_error_text);
        f("pre_chat_message", e.locale.introduction_messages);
        f("pre_chat_submit", e.locale.introduction_submit_button_text);
        f("check_for_status", e.locale.loading_title);
        f("send_text", e.locale.send_button_text);
        if (e.system.always_create_new_session) d.vars.disable_set_cookies = !0, d.vars.disable_get_cookies = !0;
        d.vars.start_passive && b.warn("[olark] start_passive mode is not enabled in the new Javascript");
        d.vars.max_milliseconds_conversation_can_be_idle = d.vars.max_milliseconds_conversation_can_be_idle || olark._.maxMillisecondsConversationCanBeIdle;
        if (e.box.inline && (d.setInline(1), d.vars.start_expanded = typeof e.box.start_expanded == "undefined" ? 1 : e.box.start_expanded, d.vars.enable_buttons = !1, f = document.getElementById("olark-box-container"))) f.id = "habla_window_div";
        var n = function() {
          var b = a.__legacy_site_id || c.__conf.system.olark_key;
          window.hblHasinit = 1;
          window.hbl.post_started = void 0;
          b && olark._.identityManager.setSiteId(b);
          window.hbl.config = window.hbl.config || window.wc_config();
          b = ["expand_on_receive_message"];
          e.Notify && b.push("incoming_notification");
          (e.StatusElements || e.CalloutBubble) && b.push("away_div_handler");
          (function() {
            var a = olark._.identityManager.getSiteId(),
              b = olark._.cookieManager.get("_ok"),
              d = c.__SPI_isConversing(),
              h = e.system.high_priority_site ? !0 : !1;
            if (b) {
              if (b != a && (!d || h)) window.hbl.config.vars.disable_get_cookies = !0, olark._.cookieManager.set("_ok", a)
            } else olark._.cookieManager.set("_ok", a)
          })();
          window.wc_init_post(b);
          (function(a, b) {
            e.locale[a] = e.locale[a] || b
          })("ended_chat_message", d.vars.ended_chat_message)
        };
        if (c.__conf.system.disable_visitor_composing) olark.__legacy_shim.disableComposing = !0;
        i || k ? c.__wait_for_chat_to_connect(function() {
          c.__SPI_disconnect();
          n()
        }) : n()
      }
    };
    m.prototype.__get_message_history = function() {
      return this.__data_history.get() || this.__conversation_message_history
    };
    m.prototype.__SPI_setMessageHistory = function(b) {
      this.__conversation_message_history = b;
      a.run_legacy_code(function(a) {
        if (a.hbl.client.buffer.length == 0) a.hbl.client.buffer = [
          [null, "", 0.2]
        ]
      });
      this.__data_history.set(b)
    };
    m.prototype.__SPI_disableChatConnection = function() {
      hbl.util.append_script = function() {};
      hbl.client.jsonproxy.prototype.do_nrpc_call =
        function() {}
    };
    m.prototype.__SPI_disconnect = function() {
      this.__session_connection.disconnect();
      this.__SPI_setMessageHistory([]);
      window.hblHasinit = void 0;
      window.hbl.client.messageq = [];
      window.hbl.client.jsonthrottle_locked = !1;
      olark._.identityManager.deleteConversationId();
      window.hbl.client.pollingmanager.stop();
      window.hbl.client.pollingmanager.reset();
      window.hbl.config = window.wc_config();
      window.hbl.config.merge({
        vars: {
          habla_sizebutton_text_expanded: "_",
          habla_sizebutton_text_compressed: "^",
          habla_closebutton_text: "x",
          habla_popout_text: ">",
          habla_end_popout_text: "&lt;&lt;",
          corner_position: "BR",
          bottom_margin: 10,
          right_margin: 10,
          left_margin: 10,
          top_margin: 10
        }
      });
      window.hbl.config.vars.poll = !0;
      window.habla_window.config = hbl.config;
      window.habla_window.theme.config = hbl.config;
      k = i = !1;
      a.trigger_event({
        namespace: "chat",
        type: "disconnect"
      })
    };
    m.prototype.__SPI_getVisitorGeolocation = function() {
      return s.geolocation || null
    };
    m.prototype.__SPI_getVisitorIP = function() {
      return s.browser_ip || null
    };
    m.prototype.__SPI_isPremiumUser = function() {
      return hbl.client.ssl ? !0 : !1
    };
    m.prototype.__SPI_hasConnectedAlready = function() {
      return this.__hasconnected.get() ? !0 : !1
    };
    m.prototype.__SPI_getLastOperatorPresence = function(a) {
      var b = this;
      b.whenDataReady(function() {
        var c = b.__last_op_presence.get();
        a(c)
      })
    };
    m.prototype.__send_and_deliver_message_from_visitor = function(a) {
      var b = this;
      a = a.legacy_message_tuple;
      if (typeof a == "undefined") throw Error("'legacy_message_tuple' required");
      a[2] = a[2] || b.__get_next_message_sequence_id_that_is_server_safe();
      var c = new e({
        legacy_message_tuple: a,
        send_event_type: "messageFromVisitor",
        deliver_event_type: "deliveryOfMessageFromVisitor",
        final_delivery_action: function() {
          b.__session_connection.send_message({
            body: c.get_processed_body()
          })
        }
      });
      c.send();
      c.deliver()
    };
    m.prototype.__send_and_deliver_message_from_operator = function(b) {
      var c = b.legacy_message_tuple,
        d = b.is_automated,
        f = c && c[1] && /^\s*$/.test(c[1]) ? !0 : !1;
      if (typeof c == "undefined") throw Error("'legacy_message_tuple' required");
      if (typeof d == "undefined") throw Error("'is_automated' required");
      if (!f) {
        c[2] =
          c[2] || this.__get_next_message_sequence_id_that_is_server_safe();
        var g = new e({
          legacy_message_tuple: c,
          is_automated: d,
          __SPI_notification: b.__SPI_notification,
          send_event_type: "messageFromOperator",
          deliver_event_type: "deliveryOfMessageFromOperator",
          final_delivery_action: function() {
            a.run_legacy_code(function(a) {
              var b = [c[0], g.get_processed_body(), c[2]];
              a.hbl.client.append([b])
            })
          }
        });
        g.send();
        g.deliver()
      }
    };
    m.prototype.__determine_presence_from_nrpc_event = function(a) {
      var b = null;
      if (a.opavailable) switch (a.status) {
        case "available":
        case "chat":
          b =
            "available";
          break;
        default:
          b = "away"
      } else b = "away";
      return b
    };
    m.prototype.__initialize_legacy_connection_and_messaging_handlers = function() {
      var b = this;
      if (!o) {
        f = b.__last_op_presence.get() || "away";
        o = !0;
        hbl.eventmgr.register("chat_started", function(b) {
          i = !0;
          a.trigger_event({
            namespace: "chat",
            type: "connectBegin"
          });
          s = {
            browser_ip: b.browser_ip,
            geolocation: b.geolocation
          }
        }, 0);
        hbl.eventmgr.register("resend_nickname", function() {
          b.__session_connection.__mark_nickname_update_pending(!0)
        }, 0);
        hbl.eventmgr.register("resend_status",
          function() {
            b.__session_connection.__mark_status_update_pending(!0)
          }, 0);
        hbl.eventmgr.register("offlineMessageToOperator", function(b) {
          a.trigger_event({
            namespace: "chat",
            type: "offlineMessageToOperator",
            message: b
          })
        });
        var e = b.__is_ended.get();
        hbl.eventmgr.register("conversation_ended", function(c) {
          e || (e = !0, b.__is_ended.set(!0), b.__next_conversation_id.set(c.next_conversation_id), a.trigger_event({
            namespace: "chat",
            type: "endedStateChange"
          }))
        }, 0);
        hbl.eventmgr.register("operator_composing", function(a) {
          function c(a) {
            this.composingMessage &&
              e();
            var b = document.createElement("p");
            b.className = "habla_conversation_p_item hbl_pal_main_fg";
            b.innerHTML = '<span class="olark-composing-message habla_conversation_person2 hbl_pal_local_fg">' + a + "</span>";
            if (b.children) b.children[0].style.color = "rgb(200,200,200)", this.composingMessage = b, d.appendChild(this.composingMessage);
            d.scrollTop = d.scrollHeight
          }

          function e() {
            if (this.composingMessage) {
              clearTimeout(this.composingMessageRemovalTimeout);
              var a = this.composingMessage.parentNode || this.composingMessage.parent;
              a && a.removeChild(this.composingMessage);
              this.composingMessage = !1
            }
          }
          var d = document.getElementById("habla_conversation_div");
          this.composingMessage = this.composingMessage || !1;
          if (!this.composingMessageRemovalHandlerSet) b.__SPI_onDeliveryOfMessageFromOperator(function() {
            e()
          }), this.composingMessageRemovalHandlerSet = !0;
          b.__SPI_onEndedStateChanged(function(a) {
            a.is_ended && e()
          });
          var f = hbl.config.vars.local_name_override || a.operator_nickname || "operator",
            g = {
              active: function() {
                e()
              },
              composing: function() {
                c(f + " " + hbl.config.vars.operator_is_typing_text)
              },
              paused: function() {
                c(f + " " + hbl.config.vars.operator_has_stopped_typing_text);
                this.composingMessageRemovalTimeout = setTimeout(e, 3E4)
              }
            };
          g.hasOwnProperty(a.composing_type) && (clearTimeout(this.composingMessageRemovalTimeout), g[a.composing_type]())
        });
        hbl.eventmgr.register("nrpc_data_ready", function(c) {
          c = b.__determine_presence_from_nrpc_event(c);
          b.__last_op_presence.set(c);
          n = !0;
          a.trigger_event({
            namespace: "chat",
            type: "dataReady"
          })
        });
        hbl.eventmgr.register("operator_status_change", function(c) {
          c = b.__determine_presence_from_nrpc_event(c);
          switch (c) {
            case "available":
              a.trigger_event({
                namespace: "chat",
                type: "operatorsAvailable",
                previously: f
              });
              break;
            case "away":
              a.trigger_event({
                namespace: "chat",
                type: "operatorsAway",
                previously: f
              })
          }
          f = c;
          b.__last_op_presence.set(f);
          k || (i = !1, k = !0, a.trigger_event({
            namespace: "chat",
            type: "onReady",
            after: function() {
              a.trigger_event({
                namespace: "SessionConnection",
                type: "afterReady"
              })
            }
          }))
        }, 9999);
        b.__wait_for_chat_to_connect(function() {
          a.run_legacy_code(function() {
            window.habla_window.send_pipeline.add(function(a) {
              b.__send_and_deliver_message_from_visitor({
                legacy_message_tuple: [null,
                  a, null
                ]
              })
            }, 1001)
          })
        });
        window.olark.__legacy_shim.pipeline_disabler = function() {};
        b.__wait_for_chat_to_connect(function() {
          window.hbl.client.incoming_pipeline.add(function(e) {
            var d = e[0],
              f = e[1],
              g = parseFloat(e[2] || -1),
              i = b.__last_cmd_seq_id.get();
            (f = c.exec(f)) ? (parseFloat(i) != i && (olark._.hlog("resetting last_command_index to 0, found a string instead #reset_string_command_index #warn"), i = 0, b.__last_cmd_seq_id.set(i)), g > i ? (b.__last_cmd_seq_id.set(g), g = f[1], (i = f[2]) && i.length === 0 && (i = null), a.trigger_event({
                namespace: "chat",
                type: "commandFromOperator",
                nickname: d,
                name: g,
                body: i
              })) : olark._.hlog("dropping command", f[1], "due to sequence ID mismatch", g, "<=", i, "#warn #dropped_command")) : b.__send_and_deliver_message_from_operator({
                legacy_message_tuple: e,
                is_automated: !1
              });
            return e
          }, 1001)
        })
      }
    };
    m.prototype.__SPI_getMessageHistory = function(a) {
      var b = this.__get_message_history();
      a && a(b);
      return b
    };
    m.prototype.__SPI_populatedLocalChatHistoryFromRpcServer = function() {
      return !this.__has_local_history
    };
    m.prototype.__SPI_onPrechatInfoReceived =
      function(b) {
        a.listen_for_event({
          namespace: "chat",
          type: "prechatInfoReceived",
          callback: b
        })
    };
    m.prototype.__initialize_legacy_history_tracking = function() {
      var e = this;
      if (!t) {
        t = !0;
        var f = function(a) {
          var f = parseFloat(e.__last_leg_seq_id.get());
          if (!a.__legacy_sequence_id) a.__legacy_sequence_id = e.__get_next_message_sequence_id_that_is_server_safe();
          if (f < a.__legacy_sequence_id) {
            e.__last_leg_seq_id.set(a.__legacy_sequence_id);
            var g = e.__get_message_history();
            d(g) || (b.error("[olark] expected message_history to be a list:",
              g), g = []);
            c.test(a.message.body) || g.push({
              nickname: a.message.nickname,
              body: a.message.body
            });
            var i = function() {
              g = g.slice(1, g.length);
              b.warn("[olark] trying to shrink message history, now has", g.length, "entries");
              g.length > 0 ? e.__SPI_setMessageHistory(g, i) : e.__SPI_setMessageHistory([])
            };
            e.__SPI_setMessageHistory(g, i)
          }
        };
        e.__SPI_onDeliveryOfMessageFromOperator(f);
        e.__SPI_onDeliveryOfMessageFromVisitor(f);
        hbl.eventmgr.register("chat_loaded", a.create_idempotent_callback(function() {
          a.trigger_event({
            namespace: "chat",
            type: "legacyChatLoaded"
          })
        }));
        window.olark.__legacy_shim.load_missed_messages = a.create_idempotent_callback(function(a) {
          e.__has_local_history = a.length != 0 && e.__last_leg_seq_id.get();
          for (var b = 0; b < a.length;) {
            var d = a[b],
              g = d[0],
              i = d[1],
              j = d[2],
              n = e.__last_leg_seq_id.get();
            c.test(d[1]) || (e.__has_local_history ? j > n && e.__send_and_deliver_message_from_operator({
              legacy_message_tuple: d,
              is_automated: !1
            }) : f({
              __legacy_sequence_id: parseFloat(j),
              message: {
                nickname: g,
                body: i
              }
            }));
            b++
          }
        });
        var g = e.__SPI_getMessageHistory();
        window.olark.__legacy_shim.has_messages_in_history = g && g.length > 0 ? !0 : !1
      }
    };
    olark.declare({
      name: "__ChatApiHelper",
      startup: function(b, c) {
        function e() {
          setTimeout(function() {
            try {
              var a = window.hbl.client.buffer.length > 0,
                b = habla_window.getHeader() == c.system.before_chat_text;
              a && b && habla_window.setHeader(c.system.in_chat_text)
            } catch (e) {}
          }, 900)
        }
        var d = !1;
        window.olark.__legacy_shim.send_prechat_info = function(c) {
          if (!d) {
            d = !0;
            var e = "";
            c.name && c.name.length && c.name != "undefined" && (b.visitor.addFullName(c.name), e += "\n    name: " +
              c.name);
            c.email && c.email.length && c.email != "undefined" && (b.visitor.addEmailAddress(c.email), e += "\n    email: " + c.email);
            c.phone && c.phone.length && c.phone != "undefined" && (b.visitor.updatePhoneNumber(c.phone), e += "\n    phone: " + c.phone);
            b.chat.sendNotificationToOperator({
              body: e
            });
            a.trigger_event({
              namespace: "chat",
              type: "prechatInfoReceived"
            })
          }
        };
        b.chat.onMessageToVisitor(e);
        b.chat.onMessageToOperator(e);
        var f = b.data.getConversationObject({
          key: "lock",
          initialValue: !1
        }),
          g = null,
          i = null,
          j = function() {
            g || (g = setInterval(function() {
                m()
              },
              12E4), i = setInterval(function() {
              b.chat.sendNotificationToOperator({
                body: "this visitor is still locked into chat, to unlock this visitor type !unlock"
              })
            }, 6E5))
          }, n = function() {
            g && (clearInterval(g), clearInterval(i), i = g = null)
          }, m = function() {
            a.run_legacy_code(function(a) {
              a.hbl.client.sendcommand("return_long_poll_now", "")
            })
          };
        b.chat.onReady(function() {
          f.get() == !0 ? j() : n()
        });
        b.chat.onCommandFromOperator(function(a) {
          switch (a.command.name) {
            case "lock":
              f.set(!0);
              b.chat.sendNotificationToOperator({
                body: "visitor has been locked into this chat, to unlock this visitor type !unlock"
              });
              j();
              break;
            case "unlock":
              f.set(!1);
              b.chat.sendNotificationToOperator({
                body: "visitor has been unlocked from this chat"
              });
              n();
              break;
            case "end":
              b.chat.sendNotificationToVisitor({
                body: c.locale.ended_chat_message
              })
          }
        });
        b.chat.onCommandFromOperator(function(a) {
          switch (a.command.name) {
            case "transfer":
              b.chat.__SPI_unlockFromCurrentGroup();
              break;
            case "name":
              a = a.command.body;
              b.visitor.updateFullName({
                fullName: a
              });
              b.chat.sendNotificationToOperator({
                body: "remembering visitor name as " + a
              });
              break;
            case "email":
              a = a.command.body;
              b.visitor.updateEmailAddress({
                emailAddress: a
              });
              b.chat.sendNotificationToOperator({
                body: "remembering visitor email as " + a
              });
              break;
            case "phone":
              a = a.command.body, b.visitor.updatePhoneNumber({
                phoneNumber: a
              }), b.chat.sendNotificationToOperator({
                body: "remembering visitor phone number as " + a
              })
          }
        });
        b.chat.onCommandFromOperator(function(a) {
          a.command.name == "help" && b.chat.sendNotificationToOperator({
            body: "quick reference for the commands you can type at any time...\n\n!tag\n     tag this conversation, like '!tag followup' or '!tag important'\n\n!transfer\n     transfer this visitor to another operator.  Optionally give a note, like '!transfer This guy needs help with billing'\n\n!unfollow\n     stop receiving page-change notifications for this visitor\n\n!push\n     push this visitor to a URL, like '!push www.google.com'\n\n!block\n     block this visitor\nFor more commands, check out http://www.olark.com/help/olark-commands\n"
          })
        });
        b.box.onDismiss(function() {
          b.chat.__SPI_endConversation()
        });
        b.chat.onBeginConversation(function() {
          b.chat.__SPI_lockToOperatorGroup(c.system.group || c.system.olark_group || null)
        });
        b.chat.__SPI_lockToExistingOperatorGroupIfGiven(c.system.group || c.system.olark_group || null);
        if (c.system.forced_rpc_server) window.hbl_hostname = c.system.forced_rpc_server, window.hblrpcTrick = 0
      }
    });
    olark.extend("__ChatApiHelper");
    a.chat = {
      ChatApi: m,
      SessionConnection: r
    }
  })
})(window.olark.__core, window.olark.__core.logger);
(function(a) {
  a.wait_for(function() {
    return !0
  }, function() {
    var b = {}, d = function(a) {
        this.__namespace = a.namespace;
        if (typeof this.__namespace == "undefined") throw Error("'namespace' required");
        this.__methods = b[this.__namespace] = {}
      };
    d.prototype.exportMethods = function(a) {
      a(this.__methods)
    };
    d.prototype.importMethods = function(c, d) {
      if (!a.is_extension_required({
        extension_name: c
      })) throw Error("extension '" + c + "' is required for " + this.__namespace);
      var i = b[c];
      if (i) d(i);
      else {
        var k = !1;
        a.listen_for_event({
          namespace: "Extension",
          type: "extensionActivated",
          callback: function() {
            if ((i = b[c]) && !k) k = !0, d(i)
          }
        })
      }
    };
    a.extensions = {
      ExtensionsApi: d
    }
  })
})(window.olark.__core, window.olark.__core.logger);
(function(a) {
  a.wait_for(function() {
    return a.chat
  }, function() {
    var b = {
      encode: function(a) {
        a = a.replace(/\r\n/g, "\n");
        for (var b = "", c = 0; c < a.length; c++) {
          var d = a.charCodeAt(c);
          d < 128 ? b += String.fromCharCode(d) : (d > 127 && d < 2048 ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128)), b += String.fromCharCode(d & 63 | 128))
        }
        return b
      },
      decode: function(a) {
        for (var b = "", c = 0, d = c1 = c2 = 0; c < a.length;) d = a.charCodeAt(c), d < 128 ? (b += String.fromCharCode(d), c++) : d > 191 && d < 224 ? (c2 = a.charCodeAt(c +
          1), b += String.fromCharCode((d & 31) << 6 | c2 & 63), c += 2) : (c2 = a.charCodeAt(c + 1), c3 = a.charCodeAt(c + 2), b += String.fromCharCode((d & 15) << 12 | (c2 & 63) << 6 | c3 & 63), c += 3);
        return b
      }
    }, d = !1,
      c = function(b) {
        var c = this;
        c.__namespace = b.namespace;
        c.__conf = b.conf;
        if (typeof c.__namespace == "undefined") throw Error("'namespace' required");
        c.__session_connection = a.chat.SessionConnection.get_instance();
        b = function() {
          var b = c.__session_connection.get_local_data({
            key: "BrowserApi::last_page_visited"
          }),
            d = olark._.overrideWindowHref || document.location.href.toString();
          b !== d && (a.trigger_event({
            namespace: "BrowserApi",
            type: "locationChange",
            previousUrl: b,
            currentUrl: d
          }), c.__session_connection.put_local_data({
            key: "BrowserApi::last_page_visited",
            value: d
          }))
        };
        if (!d) {
          d = !0;
          a.after_extensions_are_activated(b);
          if (c.__conf.system.hashchange_events_trigger_page_change) try {
            a.listen_for_browser_event(window, "hashchange", b)
          } catch (k) {}
          var j = window.history && window.history.pushState;
          if (c.__conf.system.history_events_trigger_page_change !== !1 && j) try {
            var f = window.history.pushState;
            window.history.pushState =
              function() {
                f.apply(window.history, arguments);
                a.trigger_event({
                  namespace: "BrowserApi",
                  type: "pushstateChanged"
                })
            };
            var n = window.history.replaceState;
            window.history.replaceState = function() {
              n.apply(window.history, arguments);
              a.trigger_event({
                namespace: "BrowserApi",
                type: "pushstateChanged"
              })
            };
            a.listen_for_event({
              namespace: "BrowserApi",
              type: "pushstateChanged",
              callback: b
            });
            a.listen_for_browser_event(window.history, "popstate", b)
          } catch (t) {}
        }
      };
    c.prototype.onPageChange = function(b) {
      a.listen_for_event({
        namespace: "BrowserApi",
        type: "locationChange",
        callback: function(a) {
          b({
            newPage: a.currentUrl,
            oldPage: a.previousUrl
          })
        }
      })
    };
    c.prototype.__SPI_getSafeUrl = function(a) {
      /webkit/.test(navigator.userAgent.toString().toLowerCase()) && (a = b.decode(unescape(a)));
      return a.replace(/ /g, "%20")
    };
    a.browser = {
      BrowserApi: c
    }
  })
})(window.olark.__core, window.olark.__core.logger);
(function(a, b) {
  a.wait_for(function() {
    return a.data
  }, function() {
    function d(a) {
      a = a || function() {};
      var b = "olark_" + Math.random().toString().replace(".", "");
      window[b] = function(c) {
        a(c);
        window[b] = void 0;
        try {
          delete window[b]
        } catch (d) {}
      };
      return b
    }

    function c(a) {
      try {
        var b = /(q|p|query|queryTerms?)\=([^&\#]+)/i.exec(a)[2],
          c = decodeURIComponent(b).replace(/\+/g, " ");
        a = /(?:\((.+?)\)|"(.+?)"|'(.+?)'|([^\s]+))/g;
        b = [];
        for (var d; d = a.exec(c);) b.push(d[2] || d[3] || d[4]);
        return {
          text: /^\s*$/.test(c) ? null : c,
          terms: b
        }
      } catch (f) {
        return {
          text: null,
          terms: []
        }
      }
    }

    function g(a) {
      try {
        var b;
        b = a.replace(/\</gi, "&lt;");
        b = b.replace(/\>/gi, "&gt;");
        var c = document.createElement("div");
        c.innerHTML = b;
        var d = c.childNodes.length === 0 ? "" : c.childNodes[0].nodeValue;
        return d && !/^\s*$/.test(d) ? d : a
      } catch (f) {
        return a
      }
    }

    function i(a) {
      try {
        for (var b = {}, c; c = rawQuery.exec(a);) try {
          b[c[1]] = decodeURIComponent(c[2]).replace(/\+/g, " ")
        } catch (d) {}
        return b
      } catch (f) {
        return {}
      }
    }
    var k = !1,
      j = function(a) {
        var b = this;
        b.__namespace = a.namespace;
        if (typeof b.__namespace == "undefined") throw Error("'namespace' required");
        var c = a.data;
        a = a.browser;
        b.__fullNameObject = c.getVisitorObject({
          key: "visFullName",
          initialValue: null,
          __SPI_forceNamespace: "__api"
        });
        b.__emailAddressObject = c.getVisitorObject({
          key: "visEmailAddress",
          initialValue: null,
          __SPI_forceNamespace: "__api"
        });
        b.__phoneNumberObject = c.getVisitorObject({
          key: "visPhoneNumber",
          initialValue: null,
          __SPI_forceNamespace: "__api"
        });
        b.__recentPageHistory = c.getVisitorObject({
          key: "rph",
          initialValue: [],
          __SPI_forceNamespace: "__vis"
        });
        b.__visitHistory = c.getVisitorObject({
          key: "vh",
          initialValue: [],
          __SPI_forceNamespace: "__vis"
        });
        b.__isNewVisit = c.getConversationObject({
          key: "inv",
          initialValue: !0,
          __SPI_forceNamespace: "__vis"
        });
        b.__importance = c.getVisitorObject({
          key: "imp",
          initialValue: 0,
          __SPI_forceNamespace: "__vis"
        });
        b.__notes = c.getVisitorObject({
          key: "nts",
          initialValue: [],
          __SPI_forceNamespace: "__vis"
        });
        b.__mostRecentMessage = c.getConversationObject({
          key: "mrcm",
          initialValue: void 0,
          __SPI_forceNamespace: "__vis"
        });
        b.__mostRecentNotificationToOperator = c.getConversationObject({
          key: "mrno",
          initialValue: void 0,
          __SPI_forceNamespace: "__vis"
        });
        b.__visitFields = c.getConversationObject({
          key: "vf",
          initialValue: {},
          __SPI_forceNamespace: "__vis"
        });
        b.__didSyncName = c.getConversationObject({
          key: "dsn",
          initialValue: !1,
          __SPI_forceNamespace: "__vis"
        });
        b.__didSyncEmail = c.getConversationObject({
          key: "dse",
          initialValue: !1,
          __SPI_forceNamespace: "__vis"
        });
        b.__didSyncPhone = c.getConversationObject({
          key: "dsp",
          initialValue: !1,
          __SPI_forceNamespace: "__vis"
        });
        b.__conversationBeginPage = c.getConversationObject({
          key: "cbp",
          initialValue: void 0,
          __SPI_forceNamespace: "__vis"
        });
        b.__landedOnPageTimestamp = +new Date;
        a.onPageChange(function() {
          b.__landedOnPageTimestamp = +new Date
        });
        if (!k) {
          k = !0;
          var d = b.__recentPageHistory.get();
          c = function() {
            var a = d[d.length - 1];
            a = a ? a.url : null;
            if (d.length === 0 || document.location.href !== a) d.push({
              title: document.title.length ? document.title : null,
              url: document.location.href,
              timestamp: +new Date
            }), d.length > 10 && (d = d.slice(d.length - 10)), b.__recentPageHistory.set(d)
          };
          c();
          a.onPageChange(c);
          c = b.__visitHistory.get().length ===
            0;
          if ((a = b.__isNewVisit.get()) || c) a || olark._.hlog("got #empty_history, treating as new visit for visit history"), b.__isNewVisit.set(!1), c = b.__visitHistory.get(), c.push({
            didChat: !1,
            pageCount: 0,
            messageCount: 0,
            referrer: document.referrer.toString(),
            createdAt: +new Date,
            updatedAt: +new Date
          }), b.__visitHistory.set(c);
          var f = function() {
            b.__SPI_bumpVisitHistoryTimestamp();
            setTimeout(f, 9E3)
          };
          f();
          c = b.__visitHistory.get();
          c = b.__updateMostRecentTimestampOnHistory(c);
          c[c.length - 1].pageCount += 1;
          b.__visitHistory.set(c);
          olark("api.chat.onBeginConversation", function() {
            var a = b.__visitHistory.get(),
              c = a[a.length - 1];
            if (c && c.didChat !== !0) c.didChat = !0, b.__visitHistory.set(a), b.__conversationBeginPage.set(document.location.href)
          });
          var g = function() {
            var a = b.__visitHistory.get(),
              c = a[a.length - 1];
            c.messageCount = c.messageCount || 0;
            c.messageCount++;
            b.__visitHistory.set(a)
          };
          olark("api.chat.onMessageToOperator", function() {
            b.__mostRecentMessage.set(+new Date);
            g()
          });
          olark("api.chat.onMessageToVisitor", function() {
            b.__mostRecentMessage.set(+new Date);
            g()
          });
          olark("api.chat.onNotificationToOperator", function() {
            b.__mostRecentNotificationToOperator.set(+new Date)
          });
          b.__SPI_prepopulateEmailFields();
          b.__SPI_prepopulateFullNameFields();
          b.__SPI_prepopulatePhoneNumberFields();
          b.__SPI_prepopulateChatNicknameFromBestVisitorInformation();
          this.__emailAddressObject.__SPI_onChange(function() {
            b.__SPI_prepopulateEmailFields();
            b.__SPI_prepopulateChatNicknameFromBestVisitorInformation();
            b.__didSyncEmail.set(!1);
            b.__ensureVisitorDataSynced({
              emailAddress: !0
            })
          });
          this.__fullNameObject.__SPI_onChange(function() {
            b.__SPI_prepopulateFullNameFields();
            b.__SPI_prepopulateChatNicknameFromBestVisitorInformation();
            b.__didSyncName.set(!1);
            b.__ensureVisitorDataSynced({
              fullName: !0
            })
          });
          this.__phoneNumberObject.__SPI_onChange(function() {
            b.__SPI_prepopulatePhoneNumberFields();
            b.__didSyncPhone.set(!1);
            b.__ensureVisitorDataSynced({
              phoneNumber: !0
            })
          });
          b.__ensureVisitorDataSynced({
            fullName: !0,
            emailAddress: !0,
            phoneNumber: !0
          })
        }
      };
    (function(j) {
      function k(a, b) {
        var c = olark;
        p ? b && b(p[a]) : c("api.chat.whenDataReady", function() {
          p = olark._.geoip;
          b && b((p || {})[a])
        });
        return (p || {})[a]
      }

      function o(a, b) {
        var c = b();
        a && a(c);
        return c
      }
      var p = null,
        s = 0,
        r = null;
      j.__ensureVisitorDataSynced = function(b) {
        var c = this,
          f = !1;
        if (!(b.retry && s >= 3)) {
          var g = function(b, c, e, g) {
            !c.get() && b.get() && (b = ["site_id=" + encodeURIComponent(olark._.identityManager.getSiteId()), "visitor_id=" + encodeURIComponent(olark._.identityManager.getVisitorId()), e + "=" + encodeURIComponent(b.get()), "cache=" + encodeURIComponent(Math.random()), "jsonp=" + d(function(a) {
              a.success && (s = 0, c.set(!0))
            })], f = !0, c.set(!1), a.async_script_load({
              url: olark._.apiHost + "/1.0/visitor/" + g + "?" + b.join("&")
            }))
          };
          b.fullName && g(c.__fullNameObject, c.__didSyncName, "full_name", "addFullName");
          b.emailAddress && g(c.__emailAddressObject, c.__didSyncEmail, "email_address", "addEmailAddress");
          b.phoneNumber && g(c.__phoneNumberObject, c.__didSyncPhone, "phone_number", "addPhoneNumber");
          if (f)
            for (var i in b.retry && s++, r || (r = {}, a.do_async_call({
                delay: 1E4
              }, function() {
                var a = r;
                a.retry = !0;
                r = null;
                c.__ensureVisitorDataSynced(a)
              })), b) b.hasOwnProperty(i) && (r[i] = b[i])
        }
      };
      j.__SPI_getBrowser = function() {
        var a =
          f.parse(window.navigator.userAgent);
        return a.family + " " + a.toVersionString()
      };
      j.__SPI_getOs = function() {
        var a = navigator.platform;
        if (/Mac/.test(a)) return "Mac OSX";
        else if (/Linux/.test(a)) return "Linux";
        else if (/Win/.test(a)) return "Windows"
      };
      j.__SPI_getIp = function() {
        return olark._.ipaddress
      };
      j.__SPI_getRecentPageHistory = function() {
        return this.__recentPageHistory.get() || []
      };
      j.__SPI_prepopulateEmailFields = function() {
        var a = this.__emailAddressObject.get();
        olark("api.box.__SPI_setThemeTextField", "habla_pre_chat_email_input",
          a);
        olark("api.box.__SPI_setThemeTextField", "habla_offline_email_input", a)
      };
      j.__SPI_prepopulateFullNameFields = function() {
        var a = this.__fullNameObject.get();
        olark("api.box.__SPI_setThemeTextField", "habla_pre_chat_name_input", a);
        olark("api.box.__SPI_setThemeTextField", "habla_name_input", a)
      };
      j.__SPI_prepopulatePhoneNumberFields = function() {
        var a = this.__phoneNumberObject.get();
        olark("api.box.__SPI_setThemeTextField", "habla_pre_chat_phone_input", a);
        olark("api.box.__SPI_setThemeTextField", "habla_offline_phone_input",
          a)
      };
      j.__SPI_prepopulateChatNicknameFromBestVisitorInformation = function() {
        var a = this.__fullNameObject.get(),
          b = this.__emailAddressObject.get(),
          c;
        a && b ? c = a + " (" + b + ")" : a ? c = a : b && (c = b);
        c && olark("api.chat.updateVisitorNickname", {
          snippet: c,
          hidesDefault: !0
        })
      };
      j.__SPI_getIsInspecting = function(a) {
        return o(a, function() {
          return olark._.cookieManager.get("_okinspect") ? !0 : !1
        })
      };
      j.__SPI_setIsInspecting = function(a) {
        a ? olark._.cookieManager.set("_okinspect", a) : olark._.cookieManager.erase("_okinspect")
      };
      j.__SPI_bumpVisitHistoryTimestamp =
        function() {
          var a = this.__visitHistory.get();
          a = this.__updateMostRecentTimestampOnHistory(a);
          this.__visitHistory.set(a)
      };
      j.__updateMostRecentTimestampOnHistory = function(a) {
        var b = a[a.length - 1];
        if (b) b.updatedAt = +new Date;
        return a
      };
      j.addEmailAddress = function(a) {
        this.updateEmailAddress(a)
      };
      j.updateEmailAddress = function(a) {
        a = a.emailAddress || a;
        if (typeof a != "string") throw Error("[olark] emailAddress string expected");
        a = hbl.util.strip_whitespace(g(a));
        if (hbl.util.is_valid_email(a)) this.__emailAddressObject.set(a);
        else throw Error("[olark] invalid email address: '" + a + "'");
      };
      j.addFullName = function(a) {
        this.updateFullName(a)
      };
      j.updateFullName = function(a) {
        a = a.fullName || a;
        if (typeof a != "string") throw Error("[olark] fullName string expected");
        a = hbl.util.strip_whitespace(g(a));
        this.__fullNameObject.set(a)
      };
      j.updatePhoneNumber = function(a) {
        a = a.phoneNumber || a;
        if (typeof a != "string") throw Error("[olark] phoneNumber string expected");
        a = hbl.util.strip_whitespace(g(a));
        this.__phoneNumberObject.set(a)
      };
      j.getFullName = function(a) {
        var b =
          this;
        return o(a, function() {
          return b.__fullNameObject.get()
        })
      };
      j.getEmailAddress = function(a) {
        var b = this;
        return o(a, function() {
          return b.__emailAddressObject.get()
        })
      };
      j.getPhoneNumber = function(a) {
        var b = this;
        return o(a, function() {
          return b.__phoneNumberObject.get()
        })
      };
      j.onChange = function(a) {
        this.__fullNameObject.__SPI_onChange(a);
        this.__emailAddressObject.__SPI_onChange(a);
        this.__phoneNumberObject.__SPI_onChange(a);
        this.__visitHistory.__SPI_onChange(a);
        this.__recentPageHistory.__SPI_onChange(a);
        this.__importance.__SPI_onChange(a);
        this.__notes.__SPI_onChange(a)
      };
      j.getCity = function(a) {
        return k("city", a)
      };
      j.getRegion = function(a) {
        return k("state", a)
      };
      j.getCountry = function(a) {
        return k("country", a)
      };
      j.getCountryCode = function(a) {
        return k("country_code", a)
      };
      j.getOrganization = function(a) {
        var b;
        k("isp", function(c) {
          k("organization", function(d) {
            b = c != d ? d : {}.undefinedValue;
            a && a(b)
          })
        });
        return b
      };
      j.updateImportance = function(a) {
        try {
          var b = parseInt(a.value || a)
        } catch (c) {
          b = -1
        }
        if (b < 0 || b > 3) throw Error("[olark] visitor importance must be an integer between 0-3");
        else this.__importance.set(b)
      };
      j.addNote = function(a) {
        a = a.body || a;
        var b = this.__notes.get();
        if (typeof a != "string") throw Error("[olark] visitor notes must be strings");
        for (var c = !1, d = 0; d < b.length; d++)
          if (b[d] == a) {
            c = !0;
            break
          }
        c || (b.push(a), this.__notes.set(b))
      };
      j.updateCustomFields = function(b) {
        var c = a.framestorewithjson.json,
          f = c.encode(this.__visitFields.get());
        c = c.encode(b);
        f != c && (this.__visitFields.set(b), b = ["conversation_id=" + encodeURIComponent(olark._.identityManager.getConversationId()), "site_id=" +
          encodeURIComponent(olark._.identityManager.getSiteId()), "custom_fields_json=" + encodeURIComponent(c), "cache=" + encodeURIComponent(Math.random()), "jsonp=" + d()
        ], a.async_script_load({
          url: olark._.apiHost + "/1.0/visitor/updateDetailsForThisVisit?" + b.join("&")
        }))
      };
      j.updateDetailsForThisVisit = function(a) {
        this.updateCustomFields(a)
      };
      j.getDetailsForThisVisit = function(a) {
        a(this.__visitFields.get())
      };
      j.trackConversion = function() {
        var b = ["conversation_id=" + encodeURIComponent(olark._.identityManager.getConversationId()),
          "site_id=" + encodeURIComponent(olark._.identityManager.getSiteId()), "cache=" + encodeURIComponent(Math.random()), "jsonp=" + d()
        ];
        a.async_script_load({
          url: olark._.apiHost + "/1.0/visitor/trackConversion?" + b.join("&")
        })
      };
      j.getDetails = function(a) {
        var d = this,
          f = null;
        d.getCity(function(g) {
          try {
            var j = d.getRegion(),
              n = d.getCountry(),
              r = d.getCountryCode(),
              s = d.getOrganization(),
              o = function() {
                var a = k("domain"),
                  b = d.getOrganization();
                return /(gov|edu|ibm|microsoft)/i.test(a) || b ? a : void 0
              }(),
              p = d.__recentPageHistory.get(),
              u =
                d.__visitHistory.get(),
              B = d.__conversationBeginPage.get();
            u.length == 0 && (u.push({}), olark._.hlog("#history_is_empty in getDetails"));
            p.length == 0 && (p.push({}), olark._.hlog("#page_history_is_empty in getDetails"));
            var C = u[u.length - 1].referrer;
            C && C.indexOf(" ") > 0 && (C = encodeURI(C));
            for (var A = 0, F = 0, G = 0, H = 0, D = !1, J = !1, K = !1, L = !1, I = "", S = [], E = 0; E < u.length; E++) {
              var P = E == u.length - 1;
              A += u[E].pageCount;
              F += u[E].messageCount || 0;
              u[E].didChat && G++;
              H += u[E].updatedAt - u[E].createdAt;
              var Q = i(u[E].referrer);
              Q.campaign && (K = !0, P && (L = !0));
              var X = /(cpc|ppc)/i.test(Q.medium || ""),
                T = Q.term,
                W = /gclid\=/.test(u[E].referrer);
              if (T || W || X) D = !0, P && (J = !0);
              var N = c(u[E].referrer);
              if (N.text) P ? I = N.text : S.push(N.text)
            }
            E = function(a) {
              return a ? (+new Date - a) / 1E3 : {}.undefinedValue
            };
            var O;
            try {
              O = d.__visitFields.get()
            } catch (Y) {
              O = {}
            }
            f = {
              recentPageHistory: p,
              currentPage: p[p.length - 1],
              conversationBeginPage: B,
              referrer: C,
              referredByPaidAdvertisingEver: D,
              referredByPaidAdvertisingThisVisit: J,
              referredByCampaignEver: K,
              referredByCampaignThisVisit: L,
              searchTextForThisVisit: I,
              searchTextForPreviousVisits: S,
              pageCountForThisVisit: u[u.length - 1].pageCount,
              pageCountAcrossAllVisits: A,
              messageCountForThisVisit: u[u.length - 1].messageCount || 0,
              messageCountAcrossAllVisits: F,
              visitCount: u.length,
              conversationCount: G,
              isConversing: u[u.length - 1].didChat,
              secondsSpentOnCurrentPage: Math.round((+new Date - d.__landedOnPageTimestamp) / 1E3),
              secondsSpentForThisVisit: Math.round((+new Date - u[u.length - 1].createdAt) / 1E3),
              secondsSpentAcrossAllVisits: Math.round(H / 1E3),
              city: g,
              region: j,
              country: n,
              countryCode: r,
              organization: s,
              domain: o,
              fullName: d.getFullName(),
              emailAddress: d.getEmailAddress(),
              phoneNumber: d.getPhoneNumber(),
              importance: d.__importance.get(),
              notes: d.__notes.get(),
              browser: d.__SPI_getBrowser(),
              operatingSystem: d.__SPI_getOs(),
              ip: d.__SPI_getIp(),
              secondsSinceLastMessage: E(d.__mostRecentMessage.get()),
              secondsSinceLastNotificationToOperator: E(d.__mostRecentNotificationToOperator.get()),
              customFields: O
            }
          } catch (R) {
            b.error("#error - getDetails", R.message), f = {}
          }
          a && a(f)
        });
        return f
      };
      j.__SPI_getNotes = function(a) {
        var b =
          this;
        return o(a, function() {
          return b.__notes.get()
        })
      };
      j.__SPI_getVisitHistory = function(a) {
        var b = this;
        return o(a, function() {
          return b.__visitHistory.get()
        })
      }
    })(j.prototype);
    var f = function() {
      function a(b) {
        this.family = b || "Other"
      }
      var b = [{
        p: "^(Opera)/(\\d+)\\.(\\d+) \\(Nintendo Wii",
        f: "Wii"
      }, {
        p: "(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?)",
        f: "Firefox ($1)"
      }, {
        p: "(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?",
        f: "Firefox ($1)"
      }, {
        p: "(SeaMonkey|Fennec|Camino)/(\\d+)\\.(\\d+)([ab]?\\d+[a-z]*)"
      }, {
        p: "(Flock)/(\\d+)\\.(\\d+)(b\\d+?)"
      }, {
        p: "(Fennec)/(\\d+)\\.(\\d+)(pre)"
      }, {
        p: "(Navigator)/(\\d+)\\.(\\d+)\\.(\\d+)",
        f: "Netscape"
      }, {
        p: "(Navigator)/(\\d+)\\.(\\d+)([ab]\\d+)",
        f: "Netscape"
      }, {
        p: "(Netscape6)/(\\d+)\\.(\\d+)\\.(\\d+)",
        f: "Netscape"
      }, {
        p: "(MyIBrow)/(\\d+)\\.(\\d+)",
        f: "My Internet Browser"
      }, {
        p: "(Firefox).*Tablet browser (\\d+)\\.(\\d+)\\.(\\d+)",
        f: "MicroB"
      }, {
        p: "(Opera)/9.80.*Version\\/(\\d+)\\.(\\d+)(?:\\.(\\d+))?"
      }, {
        p: "(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?) \\(Swiftfox\\)",
        f: "Swiftfox"
      }, {
        p: "(Firefox)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)? \\(Swiftfox\\)",
        f: "Swiftfox"
      }, {
        p: "(konqueror)/(\\d+)\\.(\\d+)\\.(\\d+)",
        f: "Konqueror"
      }, {
        p: "(Jasmine|ANTGalio|Midori|Fresco|Lobo|Maxthon|Lynx|OmniWeb|Dillo|Camino|Demeter|Fluid|Fennec|Shiira|Sunrise|Chrome|Flock|Netscape|Lunascape|Epiphany|WebPilot|Vodafone|NetFront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|Opera Mini|iCab|NetNewsWire|Iron|Iris)/(\\d+)\\.(\\d+)\\.(\\d+)"
      }, {
        p: "(Bolt|Jasmine|Maxthon|Lynx|Arora|IBrowse|Dillo|Camino|Shiira|Fennec|Phoenix|Chrome|Flock|Netscape|Lunascape|Epiphany|WebPilot|Opera Mini|Opera|Vodafone|NetFront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|iCab|NetNewsWire|Iron|Space Bison|Stainless|Orca)/(\\d+)\\.(\\d+)"
      }, {
        p: "(iRider|Crazy Browser|SkipStone|iCab|Lunascape|Sleipnir|Maemo Browser) (\\d+)\\.(\\d+)\\.(\\d+)"
      }, {
        p: "(iCab|Lunascape|Opera|Android) (\\d+)\\.(\\d+)"
      }, {
        p: "(IEMobile) (\\d+)\\.(\\d+)",
        f: "IE Mobile"
      }, {
        p: "(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)"
      }, {
        p: "(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*)?"
      }, {
        p: "(Obigo|OBIGO)[^\\d]*(\\d+)(?:.(\\d+))?",
        f: "Obigo"
      }, {
        p: "(MAXTHON|Maxthon) (\\d+)\\.(\\d+)",
        f: "Maxthon"
      }, {
        p: "(Maxthon|MyIE2|Uzbl|Shiira)",
        r: "0"
      }, {
        p: "(PLAYSTATION) (\\d+)",
        f: "PlayStation"
      }, {
        p: "(PlayStation Portable)[^\\d]+(\\d+).(\\d+)"
      }, {
        p: "(BrowseX) \\((\\d+)\\.(\\d+)\\.(\\d+)"
      }, {
        p: "(Opera)/(\\d+)\\.(\\d+).*Opera Mobi",
        f: "Opera Mobile"
      }, {
        p: "(POLARIS)/(\\d+)\\.(\\d+)",
        f: "Polaris"
      }, {
        p: "(BonEcho)/(\\d+)\\.(\\d+)\\.(\\d+)",
        f: "Bon Echo"
      }, {
        p: "(iPhone) OS (\\d+)_(\\d+)(?:_(\\d+))?"
      }, {
        p: "(Avant)",
        r: "1"
      }, {
        p: "(Nokia)[EN]?(\\d+)"
      }, {
        p: "(Black[bB]erry)(\\d+)",
        f: "Blackberry"
      }, {
        p: "(OmniWeb)/v(\\d+)\\.(\\d+)"
      }, {
        p: "(Blazer)/(\\d+)\\.(\\d+)",
        f: "Palm Blazer"
      }, {
        p: "(Pre)/(\\d+)\\.(\\d+)",
        f: "Palm Pre"
      }, {
        p: "(Links) \\((\\d+)\\.(\\d+)"
      }, {
        p: "(QtWeb) Internet Browser/(\\d+)\\.(\\d+)"
      }, {
        p: "(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?.*Safari/",
        f: "Safari"
      }, {
        p: "(OLPC)/Update(\\d+)\\.(\\d+)"
      }, {
        p: "(OLPC)/Update()\\.(\\d+)",
        r: "0"
      }, {
        p: "(SamsungSGHi560)",
        f: "Samsung SGHi560"
      }, {
        p: "^(SonyEricssonK800i)",
        f: "Sony Ericsson K800i"
      }, {
        p: "(Teleca Q7)"
      }, {
        p: "(MSIE) (\\d+)\\.(\\d+)",
        f: "Internet Explorer"
      }],
        c = [],
        d;
      for (d = 0; d < b.length; d++)(function(b) {
        var d = RegExp(b.p),
          e = b.f || null,
          f = b.r || null;
        c.push(function(b) {
          b = b.match(d);
          var c;
          if (!b) return null;
          c = e ? e.replace("$1", b[1]) : b[1];
          c = new a(c);
          c.major = parseInt(f ?
            f : b[2]);
          c.minor = b[3] ? parseInt(b[3]) : null;
          c.patch = b[4] ? parseInt(b[4]) : null;
          return c
        })
      })(b[d]);
      a.prototype.toVersionString = function() {
        var a = "";
        this.major != null && (a += this.major, this.minor != null && (a += "." + this.minor, this.patch != null && (a += "." + this.patch)));
        return a
      };
      a.prototype.toString = function() {
        var a = this.toVersionString();
        a && (a = " " + a);
        return this.family + a
      };
      return {
        parse: function(b) {
          var d, e;
          for (d = 0; d < c.length; d++)
            if (e = c[d](b)) return e;
          return new a
        }
      }
    }();
    a.visitor = {
      VisitorApi: j
    }
  })
})(window.olark.__core,
  window.olark.__core.logger);
(function(a) {
  a.wait_for(function() {
    return a.data
  }, function() {
    var b = 900,
      d = function(a) {
        var b = a.data;
        this.__browserApi = a.browser;
        this.__didActionForVisitor = b.getVisitorObject({
          key: "dafv",
          initialValue: {},
          __SPI_forceNamespace: "__rul"
        });
        this.__didActionForConversation = b.getConversationObject({
          key: "dafc",
          initialValue: {},
          __SPI_forceNamespace: "__rul"
        })
      };
    (function(a) {
      function d(a) {
        var b = function(a, c) {
          c(a);
          if (a.clauses)
            for (var d = 0; d < a.clauses.length; d++) b(clauses[d], c);
          a.left && b(a.left, c);
          a.right && b(a.right,
            c)
        }, c = olark._.rulesLookup[a];
        if (c) {
          var g = {}, i = [],
            o = [];
          b(c.clause, function(a) {
            a.kind === "VariableClause" && (a = a.varname.replace("visitor.", ""), a = a.replace(/\./g, "_"), g[a] || (i.push(a), g[a] = !0))
          });
          for (var p = 0; p < c.actions.length; p++) {
            var s = c.actions[p].method.replace("api.", "");
            s = s.replace(/\./g, "_");
            o.push(s)
          }
          olark._.hlog("rule " + a, "#triggered_rule_action." + o.join(","), "#used_rule_variables." + i.join(","))
        } else olark._.hlog("rule " + a + " #triggered_rule_action on site")
      }

      function i(a, b, c, i) {
        function t() {
          i.set(!0);
          c();
          try {
            d(a)
          } catch (b) {}
        }
        i.get() !== !0 && b(t)
      }
      a.defineRule = function(a) {
        function c() {
          m === 0 ? i(g, t, o, e) : h || (h = setTimeout(function() {
            h = null;
            i(g, t, o, e)
          }, b))
        }
        var d = this,
          g = a.id,
          t = a.condition,
          o = a.action,
          p = a.perVisit,
          s = a.perVisitor,
          r = a.perPage,
          e = {
            get: function() {
              return p || s ? (p ? d.__didActionForConversation : d.__didActionForVisitor).get()[g] : r ? e.value : !1
            },
            set: function(a) {
              if (p || s) {
                var b = p ? d.__didActionForConversation : d.__didActionForVisitor,
                  c = b.get();
                c[g] = a;
                b.set(c)
              } else if (r) e.value = a
            }
          }, m = 0,
          h = null;
        olark("api.boot.onIdentityReady",
          c);
        olark("api.visitor.onChange", c);
        olark("api.chat.onReady", c);
        olark("api.chat.onOperatorsAway", c);
        olark("api.chat.onOperatorsBusy", c);
        olark("api.chat.onOperatorsAvailable", c);
        d.__browserApi.onPageChange(function() {
          r && e.set(!1);
          c()
        })
      }
    })(d.prototype);
    a.rules = {
      RulesApi: d
    }
  })
})(window.olark.__core, window.olark.__core.logger);
(function(a, b) {
  a.wait_for(function() {
    return !0
  }, function() {
    var d = ["callback"],
      c = ["jsonp", "callback", "cb"],
      g = function(a) {
        for (var c = "", d = 0; d < a.length; d++) {
          var g = a.charAt(d);
          g == " " ? c += "+" : "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_.!~*'()".indexOf(g) != -1 ? c += g : (g = g.charCodeAt(0), g > 255 ? (b.error("[olark] unicode character cannot be URL encoded, attempting to substitute plus sign"), c += "+") : (c += "%", c += "0123456789ABCDEF".charAt(g >> 4 & 15), c += "0123456789ABCDEF".charAt(g & 15)))
        }
        return c
      }, i =
        function(a) {
          for (var d = c.length; d--;) {
            var g = c[d];
            if (typeof a[g] == "function") return {
              name: g,
              callback: a[g]
            }
          }
          var i = function() {
            b.warn("[olark] no callback handler given for JSONP request")
          }, k = null,
            p;
          for (p in kwargs) typeof kwargs[p] == "function" && function(a, c) {
            k = a;
            i = function() {
              b.warn("[olark] you may be using a nonstandard jsonp callback '", a, "'");
              c.apply(c, arguments)
            }
          }(p, kwargs[p]);
          return {
            name: k,
            callback: i
          }
      }, k = function() {};
    k.prototype.requestJson = function(a, b) {
      var c = a.url;
      if (typeof c != "string") throw Error("[olark] string 'url' is required");
      var k = a.params;
      if (typeof k != "object") throw Error("[olark] dictionary 'params' is required");
      var o = d,
        p = b;
      if (typeof p == "undefined") {
        var s = i(k);
        o = s.name;
        p = s.callback
      }
      var r = "cb" + Math.floor(Math.random() * 1E6);
      k[o] = r;
      o = "";
      s = !0;
      for (var e in k)
        if (typeof k[e] != "function") {
          var m = k[e];
          s || (o += "&");
          o += e + "=" + g(m);
          s = !1
        }
      c = c.replace("http://", "");
      c = c.replace("https://", "");
      c += "?" + o;
      c = ("https:" == document.location.protocol ? "https://" : "http://") + c;
      var h = document.createElement("script");
      h.type = "text/javascript";
      h.src =
        c;
      var l = document.getElementsByTagName("head")[0] || document.documentElement;
      window[r] = function() {
        p.apply(p, arguments);
        window[r] = void 0;
        try {
          delete window[r]
        } catch (a) {}
        l.removeChild(h)
      };
      this.withConnectionCompatibility(function() {
        l.insertBefore(h, l.firstChild)
      })
    };
    k.prototype.withConnectionCompatibility = function(b) {
      a.run_legacy_code(function(a) {
        a.hbl.client.sendcommand("return_long_poll_now", "");
        b()
      })
    };
    a.remote = {
      RemoteApi: k
    }
  })
})(window.olark.__core, window.olark.__core.logger);
(function(a, b) {
  a.wait_for(function() {
    return window.olark.__core.box && window.olark.__core.chat && window.olark.__core.data && window.olark.__core.visitor && window.olark.__core.rules && window.olark.__core.extensions && window.olark.__core.browser && window.olark.__core.remote
  }, function() {
    a.api = {
      ApiInstance: function(a) {
        a = a || {};
        var c = a.namespace;
        if (typeof c == "undefined") throw Error("'namespace' is required");
        var g = a.conf;
        if (typeof g == "undefined") throw Error("'conf' is required");
        a = a.extension_name;
        if (typeof a ==
          "undefined") throw Error("'extension_name' is required");
        this.__SPI_browser = new window.olark.__core.browser.BrowserApi({
          namespace: c,
          conf: g
        });
        this.__SPI_extensions = new window.olark.__core.extensions.ExtensionsApi({
          namespace: c
        });
        this.chat = new window.olark.__core.chat.ChatApi({
          conf: g,
          extension_name: a
        });
        this.box = new window.olark.__core.box.BoxApi({
          conf: g,
          chat_api: this.chat
        });
        this.data = new window.olark.__core.data.DataApi({
          namespace: c
        });
        this.visitor = new window.olark.__core.visitor.VisitorApi({
          namespace: c,
          data: this.data,
          browser: this.__SPI_browser
        });
        this.rules = new window.olark.__core.rules.RulesApi({
          data: this.data,
          browser: this.__SPI_browser
        });
        this.logger = b;
        this.__SPI_remote = new window.olark.__core.remote.RemoteApi;
        this.boot = {
          onIdentityReady: function(a) {
            olark._.identityManager.triggerIfIdentityIsReady(a)
          },
          onWindowLoad: function(a) {
            a()
          }
        }
      }
    }
  })
})(window.olark.__core, window.olark.__core.logger);
olark("api.boot.onIdentityReady", function() {
  function a(a, b, c) {
    a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
  }

  function b() {
    var a = document.location.href,
      b = a.split("#"),
      c = "__olarkpg__=" + Math.random(),
      d = /__olarkpg__=[^&]+/;
    return d.test(a) ? a.replace(d, c) : /\?/.test(a) ? b[0] + "&" + c + (b[1] || "") : b[0] + "?" + c + (b[1] || "")
  }

  function d(b) {
    var c = document.createElement("a");
    c.style.display = "block";
    c.id = "olark-inspector-" + b.id;
    c.href = b.href || "#";
    a(c, "click", b.onclick);
    c.innerHTML =
      b.content;
    return c
  }

  function c(a, b) {
    var c = document.createElement("div");
    c.id = "olark-inspector-" + a;
    c.innerHTML = b;
    return c
  }

  function g() {
    if (!i) {
      i = document.createElement("div");
      var g = document.createElement("ul"),
        j = function() {
          f(function(b) {
            g.innerHTML = "";
            for (var c = 0; c < b.length; c++) g.appendChild(b[c]);
            b = document.createElement("a");
            b.innerHTML = "close";
            (function(a) {
              a.display = "block";
              a.position = "absolute";
              a.top = "0px";
              a.right = "0px";
              a["text-decoration"] = "none";
              a.color = "#ccc"
            })(b.style);
            b.href = "#";
            a(b, "click",
              function() {
                olark("api.visitor.__SPI_setIsInspecting", !1);
                i.style.display = "none";
                i = null;
                return !1
              });
            g.appendChild(b)
          })
        }, f = function(a) {
          olark("api.visitor.getDetails", function(f) {
            a([c("olark-header", "<strong style='color: #aaa'>OLARK INSPECTOR</strong>"), c("olark-page-count", ["visitor from <strong>" + f.city + ", " + f.region + ", " + f.country + "</strong>", "viewed <strong>" + f.pageCountForThisVisit + "</strong> pages", "in <strong>" + f.secondsSpentForThisVisit + "</strong> seconds,", "and has chatted <strong>" + f.conversationCount +
              "</strong> times in the past,", "and <strong>" + (f.isConversing ? "is conversing now" : "has not conversed") + "</strong>"
            ].join(" ")), d({
              id: "start-new-visitor",
              content: "pretend to be a brand-new visitor",
              href: b(),
              onclick: function() {
                olark._.cookieManager.erase("hblid");
                olark._.cookieManager.erase("olfsk");
                olark._.cookieManager.erase("wcsid");
                olark._.cookieManager.erase("_okgid")
              }
            }), d({
              id: "start-new-conversation",
              content: "pretend this is a new visit to the site",
              href: b(),
              onclick: function() {
                olark._.cookieManager.erase("wcsid");
                olark._.cookieManager.erase("_okgid")
              }
            }), d({
              id: "visit-another-page",
              content: "pretend to change pages",
              href: b()
            })])
          })
        };
      (function(a) {
        a.position = "relative";
        a.width = "400px";
        a.margin = "0px";
        a.marginLeft = a.marginRight = "auto";
        a.padding = "10px";
        a.fontFamily = "monospace";
        a.color = "black";
        a.background = "white";
        a.opacity = "0.90";
        a["list-style-type"] = "none";
        a["-moz-box-shadow"] = a["-webkit-box-shadow"] = a["box-shadow"] = "0px 2px 25px #999"
      })(g.style);
      (function(a) {
        a.position = "fixed";
        a.bottom = "0px";
        a.width = "98%"
      })(i.style);
      i.appendChild(g);
      document.body.appendChild(i);
      j();
      olark("api.visitor.onChange", j)
    }
  }
  var i = null;
  olark("api.visitor.__SPI_getIsInspecting", function(a) {
    a ? g() : olark("api.chat.onCommandFromOperator", function(a) {
      a.command.name == "develop" && (olark("api.visitor.__SPI_setIsInspecting", !0), g())
    })
  })
});
olark.declare({
  name: "GoogleAnalytics",
  version: "1.1",
  startup: function(a, b) {
    function d(a, b) {
      if (y && window.console && window.console[a]) window.console[a](b)
    }

    function c(a) {
      return a.replace(/[^\w\)\(\d]/g, "_").replace(/\_[\_]*/, "_")
    }

    function g(a) {
      d("log", a);
      try {
        window._gaq.push(a)
      } catch (b) {}
    }

    function i(a) {
      window._gaq = window._gaq || [];
      a && (g([A + "_setAccount", a]), r != null && g([A + "_setAllowLinker", r]), e != null && g([A + "_setAllowHash", e]), m != null && g([A + "_setDomainName", m]), h != null && g(h))
    }

    function k(a) {
      if (a._getAccount) return a._getAccount();
      var b = void 0,
        c;
      for (c in a) typeof a[c] == "string" && a[c].match(/UA\-/) && (b = a[c]);
      return b
    }

    function j() {
      var a = window._gat && window._gat._getTrackerByName,
        b = window.pageTracker,
        c = !a && window._gaq,
        e = t && !a && !c;
      n && (A = "olark.");
      if (e) s ? (function() {
          var a = document.createElement("script");
          a.type = "text/javascript";
          a.async = !0;
          a.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
          (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(a)
        }(),
        i(s), g([A + "_trackPageview"])) : d("error", "Cannot load Google Analytics Tracking without Tracking ID");
      else if (n) s ? i(s) : d("error", "Cannot create Custom Google Analytics Tracker without Tracking ID");
      else if (b) a = k(window.pageTracker), a != "UA-XXXXX-X" && a && o ? i(a) : d("error", "Cannot determine Tracking ID for Google Analytics legacy tracker id is: " + a);
      else if (a) k(window._gat._getTrackerByName()) == "UA-XXXXX-X" && d("error", "Cannot determine Tracking ID for Google Analytics, _gat is loaded");
      else if (c) {
        a = !1;
        for (b = 0; b < window._gaq.length; b++)
          if ((c = window._gaq[b]) && c[0] == "_setAccount") {
            a = c[1];
            break
          }
        a || d("error", "Cannot determine Tracking ID for Google Analytics _gaq")
      }
    }

    function f() {
      var a = K.get(),
        b = G.get(),
        d = H.get(),
        e = b > d ? !0 : !1,
        f = D.get() == "automated",
        h = "";
      h = e ? a + " initiated" : f ? "Olark Targeted Chat initiated" : "Visitor initiated with " + a;
      q && (x != null && g([A + "_setCustomVar", x, c(c(F) + ":(Visitor) Had Conversation"), c(h), w]), v != null && g([A + "_setCustomVar", v, c(c(F) + ":(Session)_Had_Conversation"), c(h), u]), z != null &&
        g([A + "_setCustomVar", z, c(c(F) + ":(Page) Had Conversation"), c(h), B]), p && g([A + "_trackPageview"]));
      a = e || f ? Math.floor((b - d) / 1E3) : Math.floor((d - b) / 1E3);
      if (a < 0 || a > C) a = 0;
      g([A + "_trackEvent", c(c(F)), "Conversation", c(h), l ? a : 0])
    }
    var n = b.GoogleAnalytics.create_custom_tracker || null,
      t = b.GoogleAnalytics.load_ga_if_misisng || null,
      o = b.GoogleAnalytics.legacy_compatibility === void 0 ? !0 : b.GoogleAnalytics.legacy_compatibility,
      p = b.GoogleAnalytics.track_chat_start_page || null,
      s = b.GoogleAnalytics.tracking_id || null,
      r = b.GoogleAnalytics.allow_linker ||
        null,
      e = b.GoogleAnalytics.allow_hash || null,
      m = b.GoogleAnalytics.domain || null,
      h = b.GoogleAnalytics.custom_config || null,
      l = b.GoogleAnalytics.track_message_delays || null,
      q = b.GoogleAnalytics.enable_custom_variables || null,
      v = b.GoogleAnalytics.had_conversation_session_slot_number || null,
      z = b.GoogleAnalytics.had_conversation_page_slot_number || null,
      x = b.GoogleAnalytics.had_conversation_visitor_slot_number || null,
      y = b.GoogleAnalytics.debug || document.location.toString().match(/__debug_ga/) || null,
      w = 1,
      u = 2,
      B = 3,
      C = 1200,
      A =
        "",
      F = window.hblName || "Olark",
      G = a.data.getConversationObject({
        key: "lastMessageToOperatorSent",
        initialValue: null
      }),
      H = a.data.getConversationObject({
        key: "lastMessageToVisitorSent",
        initialValue: null
      }),
      D = a.data.getConversationObject({
        key: "lastMessageSent",
        initialValue: null
      }),
      J = a.data.getConversationObject({
        key: "isConversation",
        initialValue: null
      }),
      K = a.data.getConversationObject({
        key: "lastOperatorNickname",
        initialValue: ""
      });
    if (y) window.olark._.ga_debug = this;
    a.chat.onReady(function() {
      j();
      a.chat.onMessageToVisitor(function(a) {
        var b =
          G.get(),
          d = a.message.nickname;
        a = a.message.automated;
        if (D.get() == "visitor" || H.get() == null) {
          var e = 0;
          if (G.get() && (e = Math.floor((+new Date - G.get()) / 1E3), e < 0 || e > C)) e = 0;
          a ? g([A + "_trackEvent", c(F), c("Olark Targeted Chat Sent a Message"), c("Targeted"), l ? e : 0]) : g([A + "_trackEvent", c(F), c("Operator Sent a Message"), c(d), l ? e : 0]);
          H.set(+new Date)
        }
        H.get() == null && H.set(+new Date);
        K.set(d);
        b && !J.get() && f();
        J.set(b);
        a ? D.set("automated") : D.set("operator")
      });
      a.chat.onMessageToOperator(function() {
        var a = H.get();
        if (D.get() ==
          "operator" || D.get() == "automated" || G.get() == null) {
          var b = 0;
          if (G.get() && (b = Math.floor((+new Date - G.get()) / 1E3), b < 0 || b > C)) b = 0;
          g([A + "_trackEvent", c(F), c("Visitor Sent a Message"), c("true"), l ? b : 0]);
          G.set(+new Date)
        }
        G.get() == null && G.set(+new Date);
        a && !J.get() && f();
        J.set(a);
        D.set("visitor")
      });
      olark("api.chat.onOfflineMessageToOperator", function() {
        g([A + "_trackEvent", c(F), c("Visitor Sent an Offline Message"), c("true"), 0])
      })
    })
  }
});
olark.declare({
  name: "VisitorInsight",
  version: "1.0",
  startup: function(a, b) {
    function d(a) {
      return a == "true" ? !0 : !1
    }
    var c = function(b) {
      return b ? a.__SPI_browser.__SPI_getSafeUrl(b) : null
    }, g = function(a) {
        return (b.VisitorInsight || {})[a] || b.system[a]
      }, i = b.chat.visitor_nickname || b.system.force_nickname || null,
      k = !0;
    if (g("prechat_contains_referrer") === !1 || b.chat.notify_operator_of_referrer === !1) k = !1;
    var j = !0;
    if (g("prechat_contains_location") === !1 || b.chat.notify_operator_of_location === !1) j = !1;
    var f = g("disable_default_visitor_information") ? !0 : !1,
      n = g("status_contains_referrer") === !1 ? !1 : !0,
      t = g("status_contains_location") === !1 ? !1 : !0,
      o = g("give_location_to_operator") === !1 ? !1 : !0,
      p = g("max_location_notifs_when_not_conversing") || 2,
      s = g("max_idle_milliseconds_for_location_notifs") || 6E4,
      r = g("custom_visitor_ip") || null,
      e = typeof g("clickpath_entries") == "undefined" ? 5 : g("clickpath_entries"),
      m = b.system.disable_time_based_status_updates ? !0 : !1,
      h = null,
      l = +new Date,
      q = a.data.getConversationObject({
        key: "didGivePrechatInsight",
        initialValue: !1,
        backup: "vi1",
        backupTransform: d
      }),
      v = a.data.getConversationObject({
        key: "isConversation",
        initialValue: !1,
        backup: "vi2",
        backupTransform: d
      }),
      z = a.data.getConversationObject({
        key: "referrer",
        initialValue: document.referrer && document.referrer !== "" ? document.referrer : null
      }),
      x = a.data.getConversationObject({
        key: "locationNotificationState",
        initialValue: "active",
        backup: "vi3",
        backupTransform: d
      }),
      y = a.data.getConversationObject({
        key: "locationNotifsWithoutConversing",
        initialValue: 0
      }),
      w = a.data.getConversationObject({
        key: "timestampOfLastActivity",
        initialValue: (new Date).getTime(),
        backup: "vi4",
        backupTransform: parseInt
      }),
      u = a.data.getConversationObject({
        key: "pagesCount",
        initialValue: 0
      }),
      B = a.data.getVisitorObject({
        key: "visitCount",
        initialValue: 0
      }),
      C = a.data.getConversationObject({
        key: "visitorMessageCount",
        initialValue: 0
      }),
      A = a.data.getConversationObject({
        key: "operatorMessageCount",
        initialValue: 0
      }),
      F = a.data.getConversationObject({
        key: "operatorNotificationCount",
        initialValue: 0,
        backup: "vi5",
        backupTransform: parseInt
      }),
      G = a.data.getConversationObject({
        key: "initialArrivalTimestamp",
        initialValue: (new Date).getTime()
      });
    i && a.chat.updateVisitorNickname({
      snippet: i,
      hidesDefault: !0
    });
    (function() {
      a.chat.onMessageToOperator(function() {
        C.set(C.get() + 1)
      });
      a.chat.onMessageToVisitor(function() {
        A.set(A.get() + 1)
      });
      a.chat.onNotificationToOperator(function() {
        F.set(F.get() + 1)
      });
      a.__SPI_browser.onPageChange(function() {
        u.set(u.get() + 1)
      });
      u.__SPI_onChange(function(a) {
        a.newValue == 1 && B.set(B.get() + 1)
      })
    })();
    (function() {
      var a = function() {
        C.get() > 0 && A.get() > 0 && v.set(!0)
      };
      C.__SPI_onChange(a);
      A.__SPI_onChange(a)
    })();
    (function() {
      var b = function() {
        w.set((new Date).getTime());
        y.set(0);
        x.get() != "disabled" && x.set("active")
      };
      a.chat.onMessageToVisitor(function() {
        b()
      });
      a.chat.onMessageToOperator(function() {
        b()
      });
      y.__SPI_onChange(function(a) {
        a.newValue >= p && x.set("inactive")
      });
      a.box.onDismiss(function() {
        x.set("inactive")
      });
      a.chat.onCommandFromOperator(function(a) {
        a = a.command;
        if (a.name == "unfollow" || a.name == "nofollow") x.set("disabled"), olark("api.chat.sendNotificationToOperator", {
          body: "turned off URL notifications from this visitor"
        });
        a.name === "end" && x.set("inactive")
      })
    })();
    (function() {
      var b =
        function() {
          var b = c(olark._.overrideWindowHref || document.location.href);
          a.chat.sendNotificationToOperator({
            body: "looking at " + b
          })
      }, d = function() {
          if (q.get() === !1 && !f) {
            q.set(!0);
            var d = a.chat.getVisitorNickname();
            a.chat.sendNotificationToOperator({
              body: "talking to " + d
            });
            j && b();
            if (k) {
              var e = c(z.get());
              e && a.chat.sendNotificationToOperator({
                body: "referred from " + e
              })
            }
            /{\s*geolocation\s*}/.test(d) || a.chat.sendNotificationToOperator({
              body: "located in {{geolocation}}"
            });
            if (d = H())
              for (e = 0; e < d.length; e++) a.chat.sendNotificationToOperator({
                body: d[e]
              });
            a.chat.sendNotificationToOperator({
              body: "to see additional options, simply type !help"
            })
          }
        };
      a.__SPI_browser.onPageChange(function() {
        q.get() === !0 && o && !((new Date).getTime() - w.get() > s) && x.get() == "active" && (b(), y.set(y.get() + 1))
      });
      C.__SPI_onChange(function(a) {
        a.newValue == 1 && d()
      });
      F.__SPI_onChange(function(a) {
        a.newValue == 1 && d()
      })
    })();
    var H = function() {
      var b = [],
        c = a.visitor.getOrganization();
      c && b.push("might be affiliated with " + c);
      return b
    }, D = function() {
        if (!(+new Date - l > 18E5)) {
          var b = function(a) {
            return a >=
              864E5 ? "one day" : a >= 36E5 ? Math.floor(a / 36E5) + " hours" : a >= 6E4 ? Math.floor(a / 6E4) + " minutes" : a >= 1E3 ? Math.floor(a / 1E3) + " seconds" : null
          }, d = c(document.location.href.toString()),
            f = c(z.get()),
            g = u.get(),
            i = B.get(),
            j = r || a.visitor.__SPI_getIp() || "{{ipaddress}}",
            q = (new Date).getTime() - G.get(),
            k = b(q),
            v = a.visitor.getFullName(),
            o = a.visitor.getEmailAddress(),
            s = a.visitor.getPhoneNumber(),
            p = a.visitor.__SPI_getNotes(),
            x = a.visitor.__SPI_getRecentPageHistory();
          h = p;
          p = p.slice(0) || [];
          v && p.push("speaking with " + v);
          o && p.push(o);
          s && p.push("phone number is " + s);
          d && t && p.push("looking at " + d);
          if (x && x.length > 1) {
            v = x.length - 1;
            d = x.length - 1 - e;
            d < 1 && (d = 1);
            for (p.push("already looked at:"); v >= d; v--) o = x[v], o.url ? p.push("  " + c(o.url)) : o.title && p.push("  " + o.title)
          }
          f && n && p.push("referred from " + f);
          p.push("located in {{geolocation}}");
          p.push("{num_pages} pages viewed".replace(/{num_pages}/, g));
          i > 1 ? p.push(i + " visits") : p.push("first visit");
          I > 1 ? p.push("has had " + I + " conversations") : I == 1 && p.push("first conversation");
          p.push("using " + a.visitor.__SPI_getBrowser() +
            " on " + a.visitor.__SPI_getOs());
          j && p.push(j);
          k && q > 3E4 ? p.push("spent at least " + k + " so far") : (b = b(3E4)) && p.push("arrived within the last " + b);
          if (b = H())
            for (f = 0; f < b.length; f++) p.push(b[f]);
          a.chat.updateVisitorStatus({
            snippet: p
          });
          q *= 2;
          q < 3E4 && (q = 3E4);
          a.chat.__SPI_isConversing() || m || setTimeout(D, q)
        }
      };
    a.chat.onReady(D);
    a.__SPI_browser.onPageChange(function() {
      setTimeout(D, 100)
    });
    var J, K, L, I;
    a.visitor.getDetails(function(a) {
      J = a.fullName;
      K = a.emailAddress;
      L = a.phoneNumber;
      I = a.conversationCount
    });
    a.visitor.onChange(function() {
      a.visitor.getDetails(function(a) {
        var b = !1;
        if (J !== a.fullName) J = a.fullName, b = !0;
        if (K !== a.emailAddress) K = a.emailAddress, b = !0;
        if (L !== a.phoneNumber) L = a.phoneNumber, b = !0;
        if (I !== a.conversationCount) I = a.conversationCount, b = !0;
        b && D()
      })
    });
    a.visitor.onChange(function() {
      h !== null && a.visitor.__SPI_getNotes().join("") != h.join("") && D()
    })
  }
});
olark.declare({
  name: "VisitorImportance",
  version: "1.0",
  startup: function(a, b) {
    function d() {
      olark("api.visitor.getDetails", function(b) {
        for (var c = "", d = 0; d < 3; d++) c += b.importance > d ? g : i;
        a.chat.updateVisitorNickname({
          snippet: c
        })
      })
    }
    var c = b.system.show_importance_in_nickname == !0 ? !0 : !1,
      g = b.system.filled_icon || String.fromCharCode(9733),
      i = b.system.unfilled_icon || String.fromCharCode(9734);
    c && (olark("api.visitor.onChange", d), d())
  }
});
olark.declare({
  name: "Mixpanel",
  version: "1.0",
  startup: function(a, b) {
    function d(a, d) {
      o(function(f) {
        d = d || {};
        d.linkType = f.type;
        if (!f.free) {
          if (!(f = b.system.show_in_buddy_list !== "chatting")) try {
            var e = 0,
              g = olark._.identityManager.getConversationId(),
              h;
            for (h in g) g.hasOwnProperty(h) && (e += g.charCodeAt(h));
            f = e % 10 <= parseInt(4)
          } catch (i) {
            f = !1
          }
          f && c(a, d)
        }
      })
    }

    function c(c, d) {
      function g() {
        t || (t = !0, ompq.push(["identify", a.chat.__SPI_getConversationUUID()]));
        ompq.push(["track", c, d])
      }
      var e = (new Date).getTime() - j.get();
      if (!n[c]) n[c] = !0, f.set(n), d = d || {}, d.bucket = b.system.olark_key, d.site_id = b.system.olark_key, d.template = b.system.template, e > k ? g() : setTimeout(g, k - e)
    }

    function g() {
      var a;
      if (typeof ompq != "undefined" && ompq && ompq[0] && ompq[0][0] == "init") {
        ompq.metrics = new function(a, b) {
          var c = {}, d = !1;
          c.config = {
            cross_subdomain_cookie: !1,
            cookie_name: "omp__super_properties",
            test: !1,
            store_google: !1,
            debug: !1
          };
          c.super_properties = {
            all: {},
            events: {},
            funnels: {}
          };
          c.funnels = {};
          c.send_request = function(a, b) {
            var d = c.callback_fn;
            a += a.indexOf("?") > -1 ? "&callback=" : "?callback=";
            a += d + "&";
            b && (a += c.http_build_query(b));
            c.config.test && (a += "&test=1");
            a += "&_=" + (new Date).getTime().toString();
            d = document.createElement("script");
            d.setAttribute("src", a);
            d.setAttribute("type", "text/javascript");
            var f = document.getElementsByTagName("head")[0] || document.documentElement;
            f.insertBefore(d, f.firstChild)
          };
          c.track_funnel = function(a, b, d, f, g) {
            f || (f = {});
            f.funnel = a;
            f.step = parseInt(b, 10);
            f.goal = d;
            f.step == 1 && document.referrer.search("http://(.*)google.com") === 0 && (a = c.get_query_param(document.referrer,
              "q"), a.length && c.register({
              mp_keyword: a
            }, "funnels"));
            c.track("mp_funnel", f, g, "funnels")
          };
          c.get_query_param = function(a, b) {
            b = b.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var c = RegExp("[\\?&]" + b + "=([^&#]*)").exec(a);
            return c === null || c && typeof c[1] != "string" && c[1].length ? "" : unescape(c[1]).replace(/\+/g, " ")
          };
          c.track = function(a, b, d, f) {
            c.load_super_once();
            f || (f = "events");
            b || (b = {});
            if (!b.token) b.token = c.token;
            if (d) c.callback = d;
            b.time = c.get_unixtime();
            c.save_campaign_params();
            var g;
            if (f != "all")
              for (g in c.super_properties[f]) b[g] ||
                (b[g] = c.super_properties[f][g]);
            if (c.super_properties.all)
              for (g in c.super_properties.all) b[g] || (b[g] = c.super_properties.all[g]);
            d = {
              event: a,
              properties: b
            };
            f = c.base64_encode(c.json_encode(d));
            c.config.debug && window.console && (window.console.log("-------------- REQUEST --------------"), window.console.log(d));
            c.send_request(c.api_host + "/track/", {
              data: f,
              ip: 1
            });
            c.track_predefined_funnels(a, b)
          };
          c.identify = function(a) {
            c.register_once({
              distinct_id: a
            }, "all", null, 30)
          };
          c.register_once = function(a, b, d, f) {
            c.load_super_once();
            if (!b || !c.super_properties[b]) b = "all";
            d || (d = "None");
            f || (f = 7);
            if (a)
              for (var g in a)
                if (a.hasOwnProperty(g) && (!c.super_properties[b][g] || c.super_properties[b][g] == d)) c.super_properties[b][g] = a[g];
            c.config.cross_subdomain_cookie && c.clear_old_cookie();
            c.set_cookie(c.config.cookie_name, c.json_encode(c.super_properties), f, c.config.cross_subdomain_cookie)
          };
          c.register = function(a, b, d) {
            c.load_super_once();
            if (!b || !c.super_properties[b]) b = "all";
            d || (d = 7);
            if (a)
              for (var f in a) a.hasOwnProperty(f) && (c.super_properties[b][f] =
                a[f]);
            c.config.cross_subdomain_cookie && c.clear_old_cookie();
            c.set_cookie(c.config.cookie_name, c.json_encode(c.super_properties), d, c.config.cross_subdomain_cookie)
          };
          c.http_build_query = function(a, b) {
            var c, d, e, f = 0,
              g = [];
            b || (b = "&");
            for (c in a) c && (d = encodeURIComponent(a[c].toString()), e = encodeURIComponent(c), g[f++] = e + "=" + d);
            return g.join(b)
          };
          c.get_unixtime = function() {
            return parseInt((new Date).getTime().toString().substring(0, 10), 10)
          };
          c.jsonp_callback = function(a) {
            if (c.callback) c.callback(a), c.callback = !1
          };
          c.json_encode = function(a) {
            var b = function(a) {
              var b = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                c = {
                  "\u0008": "\\b",
                  "\t": "\\t",
                  "\n": "\\n",
                  "\u000c": "\\f",
                  "\r": "\\r",
                  '"': '\\"',
                  "\\": "\\\\"
                };
              b.lastIndex = 0;
              return b.test(a) ? '"' + a.replace(b, function(a) {
                var b = c[a];
                return typeof b === "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
              }) + '"' : '"' + a + '"'
            }, c = function(a, d) {
                var e = "",
                  f = 0,
                  g = f = "";
                g = 0;
                var h = e,
                  i = [],
                  j = d[a];
                j && typeof j ===
                  "object" && typeof j.toJSON === "function" && (j = j.toJSON(a));
                switch (typeof j) {
                  case "string":
                    return b(j);
                  case "number":
                    return isFinite(j) ? String(j) : "null";
                  case "boolean":
                  case "null":
                    return String(j);
                  case "object":
                    if (!j) return "null";
                    e += "    ";
                    i = [];
                    if (Object.prototype.toString.apply(j) === "[object Array]") {
                      g = j.length;
                      for (f = 0; f < g; f += 1) i[f] = c(f, j) || "null";
                      return g = i.length === 0 ? "[]" : e ? "[\n" + e + i.join(",\n" + e) + "\n" + h + "]" : "[" + i.join(",") + "]"
                    }
                    for (f in j) Object.hasOwnProperty.call(j, f) && (g = c(f, j)) && i.push(b(f) + (e ?
                      ": " : ":") + g);
                    return g = i.length === 0 ? "{}" : e ? "{" + i.join(",") + "" + h + "}" : "{" + i.join(",") + "}"
                }
              };
            return c("", {
              "": a
            })
          };
          c.base64_encode = function(a) {
            var b, d, f, g, h = 0,
              i = 0,
              j = "";
            j = [];
            if (!a) return a;
            a = c.utf8_encode(a + "");
            do b = a.charCodeAt(h++), d = a.charCodeAt(h++), f = a.charCodeAt(h++), g = b << 16 | d << 8 | f, b = g >> 18 & 63, d = g >> 12 & 63, f = g >> 6 & 63, g &= 63, j[i++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(d) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f) +
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g); while (h < a.length);
            j = j.join("");
            switch (a.length % 3) {
              case 1:
                j = j.slice(0, -2) + "==";
                break;
              case 2:
                j = j.slice(0, -1) + "="
            }
            return j
          };
          c.utf8_encode = function(a) {
            a = (a + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
            var b = "",
              c, d, e = 0;
            c = d = 0;
            e = a.length;
            for (var f = 0; f < e; f++) {
              var g = a.charCodeAt(f),
                h = null;
              g < 128 ? d++ : h = g > 127 && g < 2048 ? String.fromCharCode(g >> 6 | 192) + String.fromCharCode(g & 63 | 128) : String.fromCharCode(g >> 12 | 224) + String.fromCharCode(g >> 6 &
                63 | 128) + String.fromCharCode(g & 63 | 128);
              h !== null && (d > c && (b += a.substring(c, d)), b += h, c = d = f + 1)
            }
            d > c && (b += a.substring(c, a.length));
            return b
          };
          c.set_cookie = function(a, b, c) {
            c && c > 0 && (c *= 864E5);
            olark._.cookieManager.set(a, b, c)
          };
          c.get_cookie = function(a) {
            return (a = olark._.cookieManager.get(a)) ? a : ""
          };
          c.delete_cookie = function(a, b) {
            c.set_cookie(a, "", -1, b)
          };
          c.get_super = function() {
            var a = eval("(" + c.get_cookie(c.config.cookie_name) + ")");
            if (a)
              for (var b in a) a.hasOwnProperty(b) && (c.super_properties[b] = a[b]);
            return c.super_properties
          };
          c.load_super_once = function() {
            if (!d) try {
              c.get_super(), d = !0
            } catch (a) {}
          };
          c.register_funnel = function(a, b) {
            c.funnels[a] = b
          };
          c.track_predefined_funnels = function(a, b) {
            if (a && c.funnels)
              for (var d in c.funnels)
                if (c.funnels.hasOwnProperty(d))
                  for (var f = 0; f < c.funnels[d].length; ++f) c.funnels[d][f] && c.funnels[d][f] == a && c.track_funnel(d, f + 1, a, b)
          };
          c.save_campaign_params = function() {
            c.campaign_params_saved = c.campaign_params_saved || !1;
            if (c.config.store_google && !c.campaign_params_saved) {
              for (var a = ["utm_source", "utm_medium",
                "utm_campaign", "utm_content", "utm_term"
              ], b = "", d = {}, f = 0; f < a.length; f++) b = c.get_query_param(document.URL, a[f]), b.length && (d[a[f]] = b);
              c.register_once(d);
              c.campaign_params_saved = !0
            }
          };
          c.clear_old_cookie = function() {
            c.delete_cookie(c.config.cookie_name, !1);
            c.set_cookie(c.config.cookie_name, c.json_encode(c.super_properties), 7, !0)
          };
          c.set_config = function(a) {
            for (var b in a) a.hasOwnProperty(b) && (c.config[b] = a[b])
          };
          var f = "https:" == document.location.protocol ? "https://" : "http://";
          c.token = a;
          c.api_host = f + "stats.olark.com";
          c.callback_fn = b ? b + ".jsonp_callback" : "mmetrics.jsonp_callback";
          return c
        }(ompq[0][1], "ompq.metrics");
        ompq.push = function(a) {
          if (a)
            if (typeof a == "function") a();
            else
          if (a.constructor == Array) {
            var b = ompq.metrics[a[0]];
            typeof b == "function" && b.apply(ompq.metrics, a.slice(1))
          }
        };
        for (a = 1; a < ompq.length; a++) ompq.push(ompq[a]);
        ompq.length = 0
      }
    }

    function i() {
      g();
      d("visitorAvailable");
      a.chat.__SPI_getLastOperatorPresence(function(a) {
        a === "available" && d("operatorsAvailable")
      })
    }
    if (!b.system.disable_analytics) {
      var k = 6E3,
        j =
          a.data.getConversationObject({
            key: "initialLandingTimestamp",
            initialValue: (new Date).getTime()
          }),
        f = a.data.getConversationObject({
          key: "sentEvents",
          initialValue: {}
        }),
        n = f.get(),
        t = !1;
      window.ompq = window.ompq || [];
      ompq.push(["init", "0908d20dfe9d3ea7c81e64bb4ffd7d36"]);
      a.box.onShow(i);
      a.box.onExpand(i);
      a.box.onShrink(i);
      if (b.system.visitor_available_with_hidden_ui) a.chat.onReady(i);
      a.chat.onMessageToVisitor(function(a) {
        d("messageToVisitor", {
          operator: a.nickname
        })
      });
      a.box.__SPI__onOlarkLinkClicked(function() {
        d("olarkLinkClicked")
      });
      var o = function(a) {
        olark("api.box.__SPI_whenRendered", function() {
          var b = window.habla_window.theme.habla_link_div.innerHTML,
            c = {};
          if (b.match(/hblink99/)) {
            var d = b.match(/utm_campaign=([^\&]+)/);
            c.type = d ? d[1] : "unknown"
          } else c.type = "whitelabel"; if (/[Ff]ree/.test(b)) c.free = !0;
          a(c)
        })
      }
    }
  }
});
olark.declare({
  name: "OfflineWarning",
  version: "1.0",
  startup: function(a, b) {
    var d = b.system.offlineResponse || "Operator has gone away try again later";
    a.chat.onMessageToOperator(function() {
      setTimeout(function() {
        hbl.client.opavailable || olark("api.chat.sendMessageToVisitor", {
          body: d,
          nickname: " "
        })
      }, 1)
    })
  }
});
olark.declare({
  name: "EndConversation",
  version: "1.0",
  startup: function(a, b) {
    function d() {
      olark._.identityManager.deleteConversationId();
      setTimeout(function() {
        window.location.reload()
      }, 1)
    }

    function c(b) {
      if (b.is_ended)
        if (b.is_conversing) {
          b = document.getElementById("habla_end_convo_div");
          if (!b) {
            var c = document.getElementById("habla_conversation_div");
            b = document.createElement("div");
            b.id = "habla_end_convo_div";
            c.appendChild(b)
          }
          c = document.createElement("p");
          var j = document.createElement("em");
          j.innerText = g.end_conversation_placeholder;
          c.appendChild(j);
          j = document.createElement("hr");
          var f = document.createElement("div"),
            n = g.restart_conversation_input_text,
            t = d,
            o = document.createElement("input");
          o.type = "submit";
          o.value = n;
          o.onclick = t;
          o.className = "habla_offline_submit_input";
          f.id = "habla_pre_chat_div";
          b.className = "hbl_panel habla_offline_message_div hbl_pal_control_border hbl_pal_main_fg";
          f.appendChild(o);
          b.appendChild(c);
          b.appendChild(j);
          b.appendChild(f);
          b.style.clear = "both";
          b.style.display = "block";
          olark._.identityManager.keepConversationIdAlive()
        } else olark._.identityManager.deleteConversationId(),
      a.box.hide(), olark._.hlog("disabling chatbox due to #convo_ended_before_begin"), window.console && console.warn && window.console.warn("[olark] conversation expired, disabling chatbox"), a.box.__SPI_disableUserInterface(), a.chat.__SPI_disableChatConnection();
      else if (b = document.getElementById("habla_end_convo_div")) b.style.display = "none"
    }
    var g = {
      end_conversation_placeholder: b.locale.end_conversation_placeholder || "Conversation ended",
      restart_conversation_input_text: b.locale.restart_conversation_input_text || "Start a new chat"
    };
    if (b.system.allow_end_conversation) a.chat.onReady(function() {
      setTimeout(function() {
        a.chat.__SPI_getEndedState(function(b) {
          b.is_ended ? c(b) : a.chat.__SPI_onEndedStateChanged(c)
        })
      })
    })
  }
});