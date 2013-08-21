(function() {
  var n = document.location.protocol,
    t = n + "//cdn.feedbackify.com",
    C = t + "/dialog.js?1368455419",
    l = t + "/img/classic",
    y = n + "//s3.amazonaws.com/fby-form";
  if ("undefined" == typeof FBY) {
    var f = document,
      e = f.body,
      p = "Microsoft Internet Explorer" == navigator.appName;
    !p || /trident\/\d/i.test(navigator.userAgent);
    var z = "http:" == n ? "http://yui.yahooapis.com/combo?3.4.1/build/yui-base/yui-base-min.js&3.4.1/build/oop/oop-min.js&3.4.1/build/features/features-min.js&3.4.1/build/dom-core/dom-core-min.js&3.4.1/build/dom-base/dom-base-min.js&3.4.1/build/dom-style/dom-style-min.js&3.4.1/build/dom-style-ie/dom-style-ie-min.js&3.4.1/build/event-custom-base/event-custom-base-min.js&3.4.1/build/selector-native/selector-native-min.js&3.4.1/build/selector/selector-min.js&3.4.1/build/node-core/node-core-min.js&3.4.1/build/node-base/node-base-min.js&3.4.1/build/event-base/event-base-min.js&3.4.1/build/event-custom-complex/event-custom-complex-min.js&3.4.1/build/attribute-base/attribute-base-min.js&3.4.1/build/base-base/base-base-min.js&3.4.1/build/node-style/node-style-min.js&3.4.1/build/anim-base/anim-base-min.js&3.4.1/build/anim-easing/anim-easing-min.js&3.4.1/build/dom-screen/dom-screen-min.js&3.4.1/build/node-screen/node-screen-min.js&3.4.1/build/selector-css2/selector-css2-min.js&3.4.1/build/event-synthetic/event-synthetic-min.js&3.4.1/build/event-key/event-key-min.js&3.4.1/build/event-base-ie/event-base-ie-min.js" :
      t + "/yui.js",
      q = 0,
      u = 0,
      v = 0,
      r = function(b) {
        !v && (q && u && FBY.forms[b].data) && (v = 1, FBY.start(b))
      }, A, D = "_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + l,
      j, w = f.createElement("DIV");
    j = function(b) {
      w.innerHTML = b;
      b = w.firstChild;
      w.removeChild(b);
      return b
    };
    var s = function(b, d) {
      b.className.match(RegExp("(\\s|^)" + d + "(\\s|$)")) || (b.className += " " + d)
    };
    FBY = {
      IN: "https://www.feedbackify.com/in",
      IMG_PATH: l,
      FORM_PATH: y,
      forms: {},
      config: {
        device: "mobile",
        hideFlash: !0
      },
      setDevice: function(b) {
        if ("mobile" == b || "desktop" ==
          b) FBY.config.device = b
      },
      mobile: function(b) {
        !0 === b ? FBY.config.device = "mobile" : !1 === b && (FBY.config.device = "desktop")
      },
      setEmail: function(b) {
        FBY.email = b
      },
      hideFlash: function(b) {
        FBY.config.hideFlash = b
      },
      callback: function(b) {
        "function" == typeof b && (FBY.config.callback = b)
      },
      onload: function(b) {
        "function" == typeof b && b.apply({
          device: this.config.device
        })
      },
      showTab: function(b) {
        if (f.getElementById("feedbackify")) {
          var d = null,
            c = "right",
            h = "#FF0059",
            g = l + "/tab.png",
            e = 36,
            k = 100;
          48 == b.id && (b.color = "#0055A4");
          "string" == typeof b ||
            "number" == typeof b ? d = String(b) : "object" == typeof b && (d = "undefined" == typeof b.id ? d : String(b.id), c = "undefined" == typeof b.position ? c : b.position, h = "undefined" == typeof b.color ? h : b.color, g = "undefined" == typeof b.img ? g : b.img, e = "undefined" == typeof b.img_w ? e : parseInt(b.img_w), k = "undefined" == typeof b.img_h ? k : parseInt(b.img_h));
          FBY.addCSS([".fby-tab", ["position:fixed;width:", e, "px;height:", k, "px;overflow:hidden;_position:absolute;"].join(""), ".fby-tab a", ["display:block;position:absolute;width:", e, "px;height:",
              k, "px;background-color:#000000;cursor:pointer;background:url(", g, ");_background:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=", g, ");"
            ].join(""), ".fby-tab-l", ["top:50%;left:0;margin-top:-", Math.ceil(k / 2), 'px;_top:expression((parseInt(this.parentNode.style.height)-this.clientHeight)/2+"px");_margin-top:0;'].join(""), ".fby-tab-l a", "margin-left:-5px;", ".fby-tab-l a:hover", "margin-left:-2px;", ".fby-tab-r", ["top:50%;right:0px;margin-top:-", Math.ceil(k / 2), 'px;_top:expression((parseInt(this.parentNode.style.height)-this.clientHeight)/2+"px");_left:expression((document.documentElement.clientWidth||document.body.clientWidth)-this.clientWidth+"px");_margin-top:0;'].join(""),
            ".fby-tab-r a", "margin-left:5px;", ".fby-tab-r a:hover", "margin-left:2px;", ".fby-tab-t", "top:0;margin-top:0px;", ".fby-tab-b", 'top:auto;bottom:0;_top:expression(parseInt(this.parentNode.style.height)-this.clientHeight+"px");'
          ]);
          if (null == d) return !1;
          g = j('<div id="fby-tab-' + d + '" class="fby-tab ' + ("fby-tab-" + ("right" == c ? "r" : "l")) + '"><a href="#" style="background-color:' + h + '!important"></a></div>');
          g.firstChild.onclick = function() {
            FBY.showForm(d);
            return !1
          };
          f.getElementById("fby-screen").appendChild(g);
          FBY.forms[d] = {
            calls: 0,
            tab: {
              position: c,
              color: h
            }
          }
        } else setTimeout(function() {
          FBY.showTab(b)
        }, 10)
      },
      showForm: function(b) {
        if (f.getElementById("feedbackify")) {
          var d = null;
          "string" == typeof b || "number" == typeof b ? d = String(b) : "object" == typeof o && (d = "undefined" == typeof o.id ? d : String(o.id));
          if (null == d) return !1;
          if ("mobile" == FBY.config.device) return d = {
            formId: d,
            url: location.href
          }, FBY.email && (d.email = FBY.email), window.open("http://mobile.feedbackify.com/?" + encodeURIComponent(JSON.stringify(d)), ""), !1;
          s(e, "fby-on");
          FBY.config.hideFlash &&
            (s(e, "fby-hide-embed"), s(e, "fby-hide-object"));
          "undefined" == typeof FBY.forms[d] && (FBY.forms[d] = {
            calls: 0
          });
          FBY.forms[d].calls++;
          var c = f.getElementById("feedbackify"),
            h = f.getElementById("fby-screen"),
            g = f.getElementById("fby-mask");
          e.appendChild(c);
          h.appendChild(g);
          g.className = "fby-mask fby-show";
          c.appendChild(j(['<table id="fby-form" style="top:', (f.body.scrollTop || f.documentElement.scrollTop) + 25, "px;left:", ((window.innerWidth || self.innerWidth || f.clientWidth || e.clientWidth) - 618) / 2, 'px" cellspacing="0" cellpadding="0"><tr><td style="width:9px"></td><td style="width:9px"></td><td style="width:582px"></td><td style="width:9px"></td><td style="width:9px"></td></tr><tr><td rowspan="2" colspan="2" class="fby-d fby-d-tl"></td><td class="fby-d-h fby-d-t"></td><td rowspan="2" colspan="2" class="fby-d fby-d-tr"></td></tr><tr><td class="fby-d-h2"></td></tr><tr><td class="fby-d fby-d-l"></td><td colspan="3" class="fby-d-main"><div class="fby-d-load"><img style="width:16px;height:16px" src="',
            l, '/loading_anim.gif"/></div></td><td class="fby-d fby-d-r"></td></tr><tr><td rowspan="2" colspan="2" class="fby-d fby-d-bl"></td><td class="fby-d-h2"></td><td rowspan="2" colspan="2" class="fby-d fby-d-br"></td></tr><tr><td class="fby-d-h fby-d-b"></td></tr></table>'
          ].join("")));
          FBY.loadForm(d)
        } else setTimeout(function() {
          FBY.showForm(b)
        }, 10)
      },
      loadForm: function(b) {
        v = 0;
        0 != b ? FBY.forms[b].data = null : r(b);
        q || FBY.loadJS(z, function() {
          q = 1;
          r(b)
        });
        u || FBY.loadJS(C, function() {
          u = 1;
          r(b)
        });
        0 < b && FBY.loadJS(y + "/" +
          b + "/d.js", function() {
            r(b)
          })
      },
      addCSS: function(b, d) {
        var c = A ? [] : ["html{_background:url(//about:blank) fixed;}", ".fby-on select {visibility:hidden!important;}", ".fby-on .fby-hide-iframe {visibility:hidden!important;}", ".fby-hide-embed embed {visibility:hidden!important;}", ".fby-hide-object object {visibility:hidden!important;}"];
        A = 1;
        for (var h = 0; h < b.length; h += 2) {
          for (var g = b[h].split("|"), e = [], k = b[h + 1].split(";"), l = [], j = 0; j < g.length; j++) e.push((d ? "" : "#feedbackify ") + g[j]);
          for (g = 0; g < k.length - 1; g++) l.push(k[g] +
            (-1 < "top|left|height|width|opacity|filter".indexOf(k[g].split(":")[0]) ? ";" : "!important;"));
          c.push(e.join(",") + "{" + l.join("") + "}")
        }
        c = c.join("");
        if (p) try {
          var m = document.createStyleSheet();
          m.cssText = c
        } catch (n) {
          m = document.styleSheets[document.styleSheets.length - 1], m.cssText += "\r\n" + c
        } else m = f.createElement("STYLE"), m.type = "text/css", f.getElementsByTagName("HEAD")[0].appendChild(m), m.appendChild(f.createTextNode(c))
      },
      loadJS: function(b, d) {
        var c = f.createElement("SCRIPT"),
          e = function() {
            c.x = 1;
            d && d(this)
          };
        c.src =
          b;
        p ? c.onreadystatechange = function() {
          ("loaded" == c.readyState || "complete" == c.readyState) && !c.x && e()
        } : c.onload = e;
        f.getElementsByTagName("HEAD")[0].appendChild(c);
        setTimeout(function() {
          c.parentNode.removeChild(c);
          c = null
        }, 15E3);
        return c
      }
    };
    navigator.platform.match(/Win32|Win64|WOW64|AMD64|MacPPC|MacIntel|Linux i[3456]86|Linux x86_64|X11/i) && (FBY.config.device = "desktop");
    var x = function() {
      if (p && document.documentElement.doScroll) try {
        document.documentElement.doScroll("left")
      } catch (b) {
        setTimeout(x, 1);
        return
      } else if (!f.body) {
        setTimeout(x,
          1);
        return
      }
      e = f.body;
      FBY.addCSS(["*", "box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", "input", "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;", "*:before", "content:none;", "*:after", "content:none;", "|div|span|textarea|input|table|tbody|tr|td|img|p|a", ["border:0;outline:none;width:auto;height:auto;text-align:left;text-indent:0;float:none;padding:0;margin:0;", p ? 'font:12px "Lucida Grande",Tahoma,Verdana,Arial,sans-serif;' : "font:12px arial,helvetica,sans-serif;",
          "overflow:visible;color:#000;line-height:1.2;background:0 none;position:static;vertical-align:baseline;box-shadow:none;"
        ].join(""), "table", "border-collapse:collapse;border-spacing:0;max-width:inherit;", "", "z-index:2147483646;position:absolute;top:0;left:0;", ".fby-screen", 'position:fixed;top:0;left:0;width:0;height:100%;_position:absolute;_top:expression(eval(document.body.scrollTop||document.documentElement.scrollTop));_left:expression(eval(document.body.scrollLeft||document.documentElement.scrollLeft));_width:0;_height:expression(document.documentElement.clientHeight||document.body.clientHeight+"px");',
        ".fby-mask", 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000;opacity:0.2;filter:alpha(opacity=20);_position:absolute;_width:expression(document.documentElement.clientWidth||document.body.clientWidth+"px");_height:expression(this.parentNode.style.height);', ".fby-show", "display:block;visibility:visible;", ".fby-hide", "display:none;visibility:hidden;"
      ]);
      e.appendChild(j('<div id="feedbackify"><div id="fby-screen" class="fby-screen"><div id="fby-mask" class="fby-mask"></div></div></div>'));
      setTimeout(function() {
        e.appendChild(f.getElementById("feedbackify"));
        for (var b = document.getElementsByTagName("iframe"), c, h = 0; h < b.length; h++) c = b[h], 468 == c.width && s(c, "fby-hide-iframe");
        b = D + "/dlg_shad_";
        c = l + "/dlg_shad_sprite_h.png";
        FBY.addCSS(["#fby-form", "width:618px;position:absolute;", ".fby-d-main", "width:600px;height:50px;vertical-align:top;background-color:#FFFFFF;position:relative;", ".fby-d", ["background:url(", l + "/dlg_shad_sprite.png", ");_background:none;"].join(""), ".fby-d-h", ["height:9px;background:url(",
          c, ");_background:none;"
        ].join(""), ".fby-d-h2", "height:9px;background-color:#FFFFFF;", ".fby-d-tl", ["background-position:-18px;", b, "tl.png);"].join(""), ".fby-d-t", [b, "t.png,sizingMethod=scale);"].join(""), ".fby-d-tr", ["background-position:-36px;", b, "tr.png);"].join(""), ".fby-d-l", [b, "l.png,sizingMethod=scale);"].join(""), ".fby-d-r", ["background-position:-9px;", b, "r.png,sizingMethod=scale);"].join(""), ".fby-d-bl", ["background-position:-54px;", b, "bl.png);"].join(""), ".fby-d-br", ["background-position:-72px;",
          b, "br.png);"
        ].join(""), ".fby-d-b", ["background-position:0px -9px;", b, "b.png,sizingMethod=scale);"].join(""), ".fby-d-load", "position:relative;", ".fby-d-load img", "position:absolute;left:8px;", ".fby-d-load div", "position:absolute;padding:4px 18px;font-size:16px;font-weight:bold;color:#333;"]);
        b = j('<div style="width:1px;padding-left:1px;box-sizing:content-box;-webkit-box-sizing:content-box;-moz-box-sizing:content-box"></div>');
        e.appendChild(b);
        FBY.boxModel = 2 === b.offsetWidth;
        e.removeChild(b).style.display =
          "none";
        b = j('<input type="text" style="width:100px;padding-left:1px"/>');
        e.appendChild(b);
        FBY.ieFormModel = 100 == b.offsetWidth;
        e.removeChild(b).style.display = "none";
        "http:" == n && FBY.loadJS(z, function() {
          q = 1
        })
      }, 500)
    };
    x();
    var B = function(b) {
      var d = b.shift();
      if ("function" == typeof FBY[d]) FBY[d](b[0])
    };
    if ("undefined" != typeof fby)
      for (; a = fby.shift();) B(a);
    fby = {
      push: function(b) {
        B(b)
      }
    }
  }
})();