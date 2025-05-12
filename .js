import {_ as Nr} from "./game-7d3aeba4-9663a940.js";
import {g as ge, c as sc} from "./game-d8b296a6-de833af9.js";
import {M as ee, Q as ce, e as Ce, g as Bt, R as Mi, U as Ke, c as J, V as na, W as ki, X as Di, Y as at, Z as Ur, $ as jr, a0 as Ht, a1 as uc, a2 as Gi, a3 as Wt, a4 as cc, u as ue, O as Ma, a5 as ka, t as An, S as br, a6 as lc, a7 as dc, a8 as Ni, a9 as fc, aa as pc, ab as gc, ac as ot, ad as tt, _ as aa, i as Le, ae as Tn, af as mc, ag as Ui, ah as hc, B as wt, A as yt, ai as rt, aj as Q, ak as vc, x as wc, al as yc, D as Da, z as Ga} from "./game-6284db59-e69f3d6c.js";
var ji = {};
function ye(e, t) {
    typeof t == "boolean" && (t = {
        forever: t
    }),
    this._originalTimeouts = JSON.parse(JSON.stringify(e)),
    this._timeouts = e,
    this._options = t || {},
    this._maxRetryTime = t && t.maxRetryTime || 1 / 0,
    this._fn = null,
    this._errors = [],
    this._attempts = 1,
    this._operationTimeout = null,
    this._operationTimeoutCb = null,
    this._timeout = null,
    this._operationStart = null,
    this._timer = null,
    this._options.forever && (this._cachedTimeouts = this._timeouts.slice(0))
}
var bc = ye;
ye.prototype.reset = function() {
    this._attempts = 1,
    this._timeouts = this._originalTimeouts.slice(0)
}
;
ye.prototype.stop = function() {
    this._timeout && clearTimeout(this._timeout),
    this._timer && clearTimeout(this._timer),
    this._timeouts = [],
    this._cachedTimeouts = null
}
;
ye.prototype.retry = function(e) {
    if (this._timeout && clearTimeout(this._timeout),
    !e)
        return !1;
    var t = new Date().getTime();
    if (e && t - this._operationStart >= this._maxRetryTime)
        return this._errors.push(e),
        this._errors.unshift(new Error("RetryOperation timeout occurred")),
        !1;
    this._errors.push(e);
    var r = this._timeouts.shift();
    if (r === void 0)
        if (this._cachedTimeouts)
            this._errors.splice(0, this._errors.length - 1),
            r = this._cachedTimeouts.slice(-1);
        else
            return !1;
    var n = this;
    return this._timer = setTimeout(function() {
        n._attempts++,
        n._operationTimeoutCb && (n._timeout = setTimeout(function() {
            n._operationTimeoutCb(n._attempts)
        }, n._operationTimeout),
        n._options.unref && n._timeout.unref()),
        n._fn(n._attempts)
    }, r),
    this._options.unref && this._timer.unref(),
    !0
}
;
ye.prototype.attempt = function(e, t) {
    this._fn = e,
    t && (t.timeout && (this._operationTimeout = t.timeout),
    t.cb && (this._operationTimeoutCb = t.cb));
    var r = this;
    this._operationTimeoutCb && (this._timeout = setTimeout(function() {
        r._operationTimeoutCb()
    }, r._operationTimeout)),
    this._operationStart = new Date().getTime(),
    this._fn(this._attempts)
}
;
ye.prototype.try = function(e) {
    console.log("Using RetryOperation.try() is deprecated"),
    this.attempt(e)
}
;
ye.prototype.start = function(e) {
    console.log("Using RetryOperation.start() is deprecated"),
    this.attempt(e)
}
;
ye.prototype.start = ye.prototype.try;
ye.prototype.errors = function() {
    return this._errors
}
;
ye.prototype.attempts = function() {
    return this._attempts
}
;
ye.prototype.mainError = function() {
    if (this._errors.length === 0)
        return null;
    for (var e = {}, t = null, r = 0, n = 0; n < this._errors.length; n++) {
        var a = this._errors[n]
          , o = a.message
          , i = (e[o] || 0) + 1;
        e[o] = i,
        i >= r && (t = a,
        r = i)
    }
    return t
}
;
(function(e) {
    var t = bc;
    e.operation = function(r) {
        var n = e.timeouts(r);
        return new t(n,{
            forever: r && (r.forever || r.retries === 1 / 0),
            unref: r && r.unref,
            maxRetryTime: r && r.maxRetryTime
        })
    }
    ,
    e.timeouts = function(r) {
        if (r instanceof Array)
            return [].concat(r);
        var n = {
            retries: 10,
            factor: 2,
            minTimeout: 1 * 1e3,
            maxTimeout: 1 / 0,
            randomize: !1
        };
        for (var a in r)
            n[a] = r[a];
        if (n.minTimeout > n.maxTimeout)
            throw new Error("minTimeout is greater than maxTimeout");
        for (var o = [], i = 0; i < n.retries; i++)
            o.push(this.createTimeout(i, n));
        return r && r.forever && !o.length && o.push(this.createTimeout(i, n)),
        o.sort(function(s, c) {
            return s - c
        }),
        o
    }
    ,
    e.createTimeout = function(r, n) {
        var a = n.randomize ? Math.random() + 1 : 1
          , o = Math.round(a * Math.max(n.minTimeout, 1) * Math.pow(n.factor, r));
        return o = Math.min(o, n.maxTimeout),
        o
    }
    ,
    e.wrap = function(r, n, a) {
        if (n instanceof Array && (a = n,
        n = null),
        !a) {
            a = [];
            for (var o in r)
                typeof r[o] == "function" && a.push(o)
        }
        for (var i = 0; i < a.length; i++) {
            var s = a[i]
              , c = r[s];
            r[s] = function(f) {
                var m = e.operation(n)
                  , u = Array.prototype.slice.call(arguments, 1)
                  , l = u.pop();
                u.push(function(d) {
                    m.retry(d) || (d && (arguments[0] = m.mainError()),
                    l.apply(this, arguments))
                }),
                m.attempt(function() {
                    f.apply(r, u)
                })
            }
            .bind(r, c),
            r[s].options = n
        }
    }
}
)(ji);
var _c = ji
  , Ec = _c;
function Sc(e, t) {
    function r(n, a) {
        var o = t || {}, i;
        "randomize"in o || (o.randomize = !0),
        i = Ec.operation(o);
        function s(f) {
            a(f || new Error("Aborted"))
        }
        function c(f, m) {
            if (f.bail) {
                s(f);
                return
            }
            i.retry(f) ? o.onRetry && o.onRetry(f, m) : a(i.mainError())
        }
        function g(f) {
            var m;
            try {
                m = e(s, f)
            } catch (u) {
                c(u, f);
                return
            }
            Promise.resolve(m).then(n).catch(function(l) {
                c(l, f)
            })
        }
        i.attempt(g)
    }
    return new Promise(r)
}
var Pc = Sc;
const kt = ge(Pc);
function Fr(e, t) {
    if (t.length < e)
        throw new TypeError(e + " argument" + (e > 1 ? "s" : "") + " required, but only " + t.length + " present")
}
function lr(e) {
    "@babel/helpers - typeof";
    return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? lr = function(r) {
        return typeof r
    }
    : lr = function(r) {
        return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r
    }
    ,
    lr(e)
}
function On(e) {
    Fr(1, arguments);
    var t = Object.prototype.toString.call(e);
    return e instanceof Date || lr(e) === "object" && t === "[object Date]" ? new Date(e.getTime()) : typeof e == "number" || t === "[object Number]" ? new Date(e) : ((typeof e == "string" || t === "[object String]") && typeof console < "u" && (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),
    console.warn(new Error().stack)),
    new Date(NaN))
}
function Na(e) {
    var t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
    return t.setUTCFullYear(e.getFullYear()),
    e.getTime() - t.getTime()
}
function Ua(e) {
    Fr(1, arguments);
    var t = On(e);
    return t.setHours(0, 0, 0, 0),
    t
}
var Ac = 864e5;
function Tc(e, t) {
    Fr(2, arguments);
    var r = Ua(e)
      , n = Ua(t)
      , a = r.getTime() - Na(r)
      , o = n.getTime() - Na(n);
    return Math.round((a - o) / Ac)
}
function ja(e, t) {
    var r = e.getFullYear() - t.getFullYear() || e.getMonth() - t.getMonth() || e.getDate() - t.getDate() || e.getHours() - t.getHours() || e.getMinutes() - t.getMinutes() || e.getSeconds() - t.getSeconds() || e.getMilliseconds() - t.getMilliseconds();
    return r < 0 ? -1 : r > 0 ? 1 : r
}
function Oc(e, t) {
    Fr(2, arguments);
    var r = On(e)
      , n = On(t)
      , a = ja(r, n)
      , o = Math.abs(Tc(r, n));
    r.setDate(r.getDate() - a * o);
    var i = +(ja(r, n) === -a)
      , s = a * (o - i);
    return s === 0 ? 0 : s
}
const bt = e => {
    let t, r = e;
    return (...n) => (r && (t = r(...n),
    r = void 0),
    t)
}
  , Fi = ee.create({
    baseURL: window.option?.runEnv === "production" ? "https://data-fireman.g123.jp" : "https://data-fireman.stg.g123.jp"
});
async function Cc(e) {
    await Fi.post("/v1/conversion_event/pre_process/cr", e, {
        withCredentials: !0
    })
}
async function xc(e) {
    await Fi.post("/v1/conversion_event/pre_process/pm", e, {
        withCredentials: !0
    })
}
const Ic = {
    gbuttonTheme: "arena",
    gameLoginOrRegisterAt: 0
}
  , _r = ce({
    name: "app",
    initialState: Ic,
    reducers: {
        setGbuttonTheme: (e, t) => {
            e.gbuttonTheme !== t.payload.gbuttonTheme && (e.gbuttonTheme = t.payload.gbuttonTheme)
        }
        ,
        setGameLoginOrRegisterAt: (e, t) => {
            e.gameLoginOrRegisterAt || (e.gameLoginOrRegisterAt = t.payload.gameLoginOrRegisterAt)
        }
    }
})
  , {setGameLoginOrRegisterAt: $c} = _r.actions
  , Rc = () => e => {
    new URL(window.location.href).searchParams.get("utm_source") === "exoclick" && e(_r.actions.setGbuttonTheme({
        gbuttonTheme: "default"
    })),
    window.option.appId === "doraemon" && e(_r.actions.setGbuttonTheme({
        gbuttonTheme: "default"
    }))
}
  , Lc = {
    status: "close",
    blocked: !1
}
  , oa = ce({
    name: "blockedUserDialog",
    initialState: Lc,
    reducers: {
        showDialog(e) {
            e.status = "open",
            e.blocked = !0
        },
        hideDialog(e) {
            e.status = "close"
        }
    }
});
var Er = (e => (e.Recommends = "Recommends",
e.Service = "Service",
e.Profile = "Profile",
e.Login = "Login",
e.Recovery = "Recovery",
e.Install = "Install",
e.Link = "Link",
e.Settings = "Settings",
e.Terms = "Terms",
e.QRCode = "QRCode",
e))(Er || {});
const Mc = {
    currentAppInfo: null,
    currentRoute: "Recommends",
    recommendGames: null,
    hotGameCodes: [],
    newGameCodes: [],
    preregists: null,
    authProviders: [],
    isOpen: !1,
    isGuestClicked: !1,
    vipRank: 0
}
  , Pe = ce({
    name: "mainPopup",
    initialState: Mc,
    reducers: {
        toggleMainPopup(e, t) {
            e.isOpen = t.payload.isOpen
        },
        switchMainPopupRoute(e, t) {
            e.currentRoute = t.payload.tab
        },
        setIsGuestClicked(e, t) {
            e.isGuestClicked = t.payload.clicked
        },
        updateCurrentAppInfo(e, t) {
            e.currentAppInfo = t.payload.appInfo
        },
        updateRecommendGames(e, t) {
            e.recommendGames = t.payload.recommendGames
        },
        updateHotGameCodes(e, t) {
            e.hotGameCodes = t.payload.hotGameCodes
        },
        updateNewGameCodes(e, t) {
            e.newGameCodes = t.payload.newGameCodes
        },
        updatePreregists(e, t) {
            e.preregists = t.payload.preregists
        },
        updateAuthProviders(e, t) {
            e.authProviders = t.payload.authProviders
        },
        updateVipRank(e, t) {
            e.vipRank = t.payload.vipRank
        }
    }
})
  , kc = {
    cookieEnabled: !0
}
  , Bi = ce({
    name: "privacy",
    initialState: kc,
    reducers: {
        setCookieEnabled(e, t) {
            e.cookieEnabled = t.payload.cookieEnabled
        }
    }
})
  , Dc = {
    isUnread: !1
}
  , Hi = ce({
    name: "cs",
    initialState: Dc,
    reducers: {
        setIsUnread: (e, t) => {
            e.isUnread = t.payload.isUnread
        }
    }
})
  , {setIsUnread: Wi} = Hi.actions;
function YP() {
    window.top?.postMessage({
        type: "auxin_g_button_clicked"
    }, "*")
}
function Gc(e) {
    window.top?.postMessage({
        type: "auxin_level_up",
        body: {
            level: e
        }
    }, "*")
}
function Nc(e, t, r, n, a) {
    for (t = t.split ? t.split(".") : t,
    n = 0; n < t.length; n++)
        e = e ? e[t[n]] : a;
    return e === a ? r : e
}
var Cn = {
    exports: {}
};
(function(e, t) {
    (function(r, n) {
        var a = "1.0.35"
          , o = ""
          , i = "?"
          , s = "function"
          , c = "undefined"
          , g = "object"
          , f = "string"
          , m = "major"
          , u = "model"
          , l = "name"
          , d = "type"
          , p = "vendor"
          , h = "version"
          , v = "architecture"
          , A = "console"
          , b = "mobile"
          , S = "tablet"
          , O = "smarttv"
          , y = "wearable"
          , k = "embedded"
          , G = 350
          , N = "Amazon"
          , X = "Apple"
          , le = "ASUS"
          , re = "BlackBerry"
          , oe = "Browser"
          , V = "Chrome"
          , xe = "Edge"
          , ne = "Firefox"
          , te = "Google"
          , me = "Huawei"
          , P = "LG"
          , w = "Microsoft"
          , _ = "Motorola"
          , x = "Opera"
          , R = "Samsung"
          , I = "Sharp"
          , B = "Sony"
          , z = "Xiaomi"
          , q = "Zebra"
          , de = "Facebook"
          , ae = "Chromium OS"
          , fe = "Mac OS"
          , Zt = function(M, U) {
            var L = {};
            for (var j in M)
                U[j] && U[j].length % 2 === 0 ? L[j] = U[j].concat(M[j]) : L[j] = M[j];
            return L
        }
          , Ae = function(M) {
            for (var U = {}, L = 0; L < M.length; L++)
                U[M[L].toUpperCase()] = M[L];
            return U
        }
          , Pt = function(M, U) {
            return typeof M === f ? Ue(U).indexOf(Ue(M)) !== -1 : !1
        }
          , Ue = function(M) {
            return M.toLowerCase()
        }
          , er = function(M) {
            return typeof M === f ? M.replace(/[^\d\.]/g, o).split(".")[0] : n
        }
          , ze = function(M, U) {
            if (typeof M === f)
                return M = M.replace(/^\s\s*/, o),
                typeof U === c ? M : M.substring(0, G)
        }
          , Te = function(M, U) {
            for (var L = 0, j, ve, pe, C, T, E; L < U.length && !T; ) {
                var Ie = U[L]
                  , we = U[L + 1];
                for (j = ve = 0; j < Ie.length && !T && Ie[j]; )
                    if (T = Ie[j++].exec(M),
                    T)
                        for (pe = 0; pe < we.length; pe++)
                            E = T[++ve],
                            C = we[pe],
                            typeof C === g && C.length > 0 ? C.length === 2 ? typeof C[1] == s ? this[C[0]] = C[1].call(this, E) : this[C[0]] = C[1] : C.length === 3 ? typeof C[1] === s && !(C[1].exec && C[1].test) ? this[C[0]] = E ? C[1].call(this, E, C[2]) : n : this[C[0]] = E ? E.replace(C[1], C[2]) : n : C.length === 4 && (this[C[0]] = E ? C[3].call(this, E.replace(C[1], C[2])) : n) : this[C] = E || n;
                L += 2
            }
        }
          , it = function(M, U) {
            for (var L in U)
                if (typeof U[L] === g && U[L].length > 0) {
                    for (var j = 0; j < U[L].length; j++)
                        if (Pt(U[L][j], M))
                            return L === i ? n : L
                } else if (Pt(U[L], M))
                    return L === i ? n : L;
            return M
        }
          , tr = {
            "1.0": "/8",
            "1.2": "/1",
            "1.3": "/3",
            "2.0": "/412",
            "2.0.2": "/416",
            "2.0.3": "/417",
            "2.0.4": "/419",
            "?": "/"
        }
          , At = {
            ME: "4.90",
            "NT 3.11": "NT3.51",
            "NT 4.0": "NT4.0",
            2e3: "NT 5.0",
            XP: ["NT 5.1", "NT 5.2"],
            Vista: "NT 6.0",
            7: "NT 6.1",
            8: "NT 6.2",
            "8.1": "NT 6.3",
            10: ["NT 6.4", "NT 10.0"],
            RT: "ARM"
        }
          , st = {
            browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [h, [l, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [h, [l, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [l, h], [/opios[\/ ]+([\w\.]+)/i], [h, [l, x + " Mini"]], [/\bopr\/([\w\.]+)/i], [h, [l, x]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [l, h], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [h, [l, "UC" + oe]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [h, [l, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [h, [l, "WeChat"]], [/konqueror\/([\w\.]+)/i], [h, [l, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [h, [l, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [h, [l, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[l, /(.+)/, "$1 Secure " + oe], h], [/\bfocus\/([\w\.]+)/i], [h, [l, ne + " Focus"]], [/\bopt\/([\w\.]+)/i], [h, [l, x + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [h, [l, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [h, [l, "Dolphin"]], [/coast\/([\w\.]+)/i], [h, [l, x + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [h, [l, "MIUI " + oe]], [/fxios\/([-\w\.]+)/i], [h, [l, ne]], [/\bqihu|(qi?ho?o?|360)browser/i], [[l, "360 " + oe]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[l, /(.+)/, "$1 " + oe], h], [/(comodo_dragon)\/([\w\.]+)/i], [[l, /_/g, " "], h], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [l, h], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [l], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[l, de], h], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [l, h], [/\bgsa\/([\w\.]+) .*safari\//i], [h, [l, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [h, [l, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [h, [l, V + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[l, V + " WebView"], h], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [h, [l, "Android " + oe]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [l, h], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [h, [l, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [h, l], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [l, [h, it, tr]], [/(webkit|khtml)\/([\w\.]+)/i], [l, h], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[l, "Netscape"], h], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [h, [l, ne + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [l, h], [/(cobalt)\/([\w\.]+)/i], [l, [h, /master.|lts./, ""]]],
            cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[v, "amd64"]], [/(ia32(?=;))/i], [[v, Ue]], [/((?:i[346]|x)86)[;\)]/i], [[v, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[v, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[v, "armhf"]], [/windows (ce|mobile); ppc;/i], [[v, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[v, /ower/, o, Ue]], [/(sun4\w)[;\)]/i], [[v, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[v, Ue]]],
            device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [u, [p, R], [d, S]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [u, [p, R], [d, b]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [u, [p, X], [d, b]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [u, [p, X], [d, S]], [/(macintosh);/i], [u, [p, X]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [u, [p, I], [d, b]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [u, [p, me], [d, S]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [u, [p, me], [d, b]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[u, /_/g, " "], [p, z], [d, b]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[u, /_/g, " "], [p, z], [d, S]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [u, [p, "OPPO"], [d, b]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [u, [p, "Vivo"], [d, b]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [u, [p, "Realme"], [d, b]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [u, [p, _], [d, b]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [u, [p, _], [d, S]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [u, [p, P], [d, S]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [u, [p, P], [d, b]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [u, [p, "Lenovo"], [d, S]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[u, /_/g, " "], [p, "Nokia"], [d, b]], [/(pixel c)\b/i], [u, [p, te], [d, S]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [u, [p, te], [d, b]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [u, [p, B], [d, b]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[u, "Xperia Tablet"], [p, B], [d, S]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [u, [p, "OnePlus"], [d, b]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [u, [p, N], [d, S]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[u, /(.+)/g, "Fire Phone $1"], [p, N], [d, b]], [/(playbook);[-\w\),; ]+(rim)/i], [u, p, [d, S]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [u, [p, re], [d, b]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [u, [p, le], [d, S]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [u, [p, le], [d, b]], [/(nexus 9)/i], [u, [p, "HTC"], [d, S]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [p, [u, /_/g, " "], [d, b]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [u, [p, "Acer"], [d, S]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [u, [p, "Meizu"], [d, b]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [p, u, [d, b]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [p, u, [d, S]], [/(surface duo)/i], [u, [p, w], [d, S]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [u, [p, "Fairphone"], [d, b]], [/(u304aa)/i], [u, [p, "AT&T"], [d, b]], [/\bsie-(\w*)/i], [u, [p, "Siemens"], [d, b]], [/\b(rct\w+) b/i], [u, [p, "RCA"], [d, S]], [/\b(venue[\d ]{2,7}) b/i], [u, [p, "Dell"], [d, S]], [/\b(q(?:mv|ta)\w+) b/i], [u, [p, "Verizon"], [d, S]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [u, [p, "Barnes & Noble"], [d, S]], [/\b(tm\d{3}\w+) b/i], [u, [p, "NuVision"], [d, S]], [/\b(k88) b/i], [u, [p, "ZTE"], [d, S]], [/\b(nx\d{3}j) b/i], [u, [p, "ZTE"], [d, b]], [/\b(gen\d{3}) b.+49h/i], [u, [p, "Swiss"], [d, b]], [/\b(zur\d{3}) b/i], [u, [p, "Swiss"], [d, S]], [/\b((zeki)?tb.*\b) b/i], [u, [p, "Zeki"], [d, S]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[p, "Dragon Touch"], u, [d, S]], [/\b(ns-?\w{0,9}) b/i], [u, [p, "Insignia"], [d, S]], [/\b((nxa|next)-?\w{0,9}) b/i], [u, [p, "NextBook"], [d, S]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[p, "Voice"], u, [d, b]], [/\b(lvtel\-)?(v1[12]) b/i], [[p, "LvTel"], u, [d, b]], [/\b(ph-1) /i], [u, [p, "Essential"], [d, b]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [u, [p, "Envizen"], [d, S]], [/\b(trio[-\w\. ]+) b/i], [u, [p, "MachSpeed"], [d, S]], [/\btu_(1491) b/i], [u, [p, "Rotor"], [d, S]], [/(shield[\w ]+) b/i], [u, [p, "Nvidia"], [d, S]], [/(sprint) (\w+)/i], [p, u, [d, b]], [/(kin\.[onetw]{3})/i], [[u, /\./g, " "], [p, w], [d, b]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [u, [p, q], [d, S]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [u, [p, q], [d, b]], [/smart-tv.+(samsung)/i], [p, [d, O]], [/hbbtv.+maple;(\d+)/i], [[u, /^/, "SmartTV"], [p, R], [d, O]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[p, P], [d, O]], [/(apple) ?tv/i], [p, [u, X + " TV"], [d, O]], [/crkey/i], [[u, V + "cast"], [p, te], [d, O]], [/droid.+aft(\w)( bui|\))/i], [u, [p, N], [d, O]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [u, [p, I], [d, O]], [/(bravia[\w ]+)( bui|\))/i], [u, [p, B], [d, O]], [/(mitv-\w{5}) bui/i], [u, [p, z], [d, O]], [/Hbbtv.*(technisat) (.*);/i], [p, u, [d, O]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[p, ze], [u, ze], [d, O]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[d, O]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [p, u, [d, A]], [/droid.+; (shield) bui/i], [u, [p, "Nvidia"], [d, A]], [/(playstation [345portablevi]+)/i], [u, [p, B], [d, A]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [u, [p, w], [d, A]], [/((pebble))app/i], [p, u, [d, y]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [u, [p, X], [d, y]], [/droid.+; (glass) \d/i], [u, [p, te], [d, y]], [/droid.+; (wt63?0{2,3})\)/i], [u, [p, q], [d, y]], [/(quest( 2| pro)?)/i], [u, [p, de], [d, y]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [p, [d, k]], [/(aeobc)\b/i], [u, [p, N], [d, k]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [u, [d, b]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [u, [d, S]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[d, S]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[d, b]], [/(android[-\w\. ]{0,9});.+buil/i], [u, [p, "Generic"]]],
            engine: [[/windows.+ edge\/([\w\.]+)/i], [h, [l, xe + "HTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [h, [l, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [l, h], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [h, l]],
            os: [[/microsoft (windows) (vista|xp)/i], [l, h], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [l, [h, it, At]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[l, "Windows"], [h, it, At]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[h, /_/g, "."], [l, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[l, fe], [h, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [h, l], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [l, h], [/\(bb(10);/i], [h, [l, re]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [h, [l, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [h, [l, ne + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [h, [l, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [h, [l, "watchOS"]], [/crkey\/([\d\.]+)/i], [h, [l, V + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[l, ae], h], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [l, h], [/(sunos) ?([\w\.\d]*)/i], [[l, "Solaris"], h], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [l, h]]
        }
          , ie = function(M, U) {
            if (typeof M === g && (U = M,
            M = n),
            !(this instanceof ie))
                return new ie(M,U).getResult();
            var L = typeof r !== c && r.navigator ? r.navigator : n
              , j = M || (L && L.userAgent ? L.userAgent : o)
              , ve = L && L.userAgentData ? L.userAgentData : n
              , pe = U ? Zt(st, U) : st
              , C = L && L.userAgent == j;
            return this.getBrowser = function() {
                var T = {};
                return T[l] = n,
                T[h] = n,
                Te.call(T, j, pe.browser),
                T[m] = er(T[h]),
                C && L && L.brave && typeof L.brave.isBrave == s && (T[l] = "Brave"),
                T
            }
            ,
            this.getCPU = function() {
                var T = {};
                return T[v] = n,
                Te.call(T, j, pe.cpu),
                T
            }
            ,
            this.getDevice = function() {
                var T = {};
                return T[p] = n,
                T[u] = n,
                T[d] = n,
                Te.call(T, j, pe.device),
                C && !T[d] && ve && ve.mobile && (T[d] = b),
                C && T[u] == "Macintosh" && L && typeof L.standalone !== c && L.maxTouchPoints && L.maxTouchPoints > 2 && (T[u] = "iPad",
                T[d] = S),
                T
            }
            ,
            this.getEngine = function() {
                var T = {};
                return T[l] = n,
                T[h] = n,
                Te.call(T, j, pe.engine),
                T
            }
            ,
            this.getOS = function() {
                var T = {};
                return T[l] = n,
                T[h] = n,
                Te.call(T, j, pe.os),
                C && !T[l] && ve && ve.platform != "Unknown" && (T[l] = ve.platform.replace(/chrome os/i, ae).replace(/macos/i, fe)),
                T
            }
            ,
            this.getResult = function() {
                return {
                    ua: this.getUA(),
                    browser: this.getBrowser(),
                    engine: this.getEngine(),
                    os: this.getOS(),
                    device: this.getDevice(),
                    cpu: this.getCPU()
                }
            }
            ,
            this.getUA = function() {
                return j
            }
            ,
            this.setUA = function(T) {
                return j = typeof T === f && T.length > G ? ze(T, G) : T,
                this
            }
            ,
            this.setUA(j),
            this
        };
        ie.VERSION = a,
        ie.BROWSER = Ae([l, h, m]),
        ie.CPU = Ae([v]),
        ie.DEVICE = Ae([u, p, d, A, b, O, S, y, k]),
        ie.ENGINE = ie.OS = Ae([l, h]),
        e.exports && (t = e.exports = ie),
        t.UAParser = ie;
        var he = typeof r !== c && (r.jQuery || r.Zepto);
        if (he && !he.ua) {
            var Tt = new ie;
            he.ua = Tt.getResult(),
            he.ua.get = function() {
                return Tt.getUA()
            }
            ,
            he.ua.set = function(M) {
                Tt.setUA(M);
                var U = Tt.getResult();
                for (var L in U)
                    he.ua[L] = U[L]
            }
        }
    }
    )(typeof window == "object" ? window : sc)
}
)(Cn, Cn.exports);
var Uc = Cn.exports;
const Vi = ge(Uc)
  , Sr = new Vi
  , zP = () => !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
  , jc = () => "serviceWorker"in navigator && "BeforeInstallPromptEvent"in window
  , qi = () => !!(window.navigator && window.navigator.standalone === !0 || window.matchMedia?.("(display-mode: standalone)").matches)
  , Fc = ["architecture", "platformVersion", "bitness", "formFactor", "fullVersionList", "model", "wow64"];
let en;
const Bc = async () => {
    if (!("userAgentData"in navigator))
        return {};
    if (!en)
        try {
            en = await navigator.userAgentData.getHighEntropyValues?.(Fc) || {}
        } catch (e) {
            console.error(e)
        }
    return en || {}
}
  , Ki = () => Sr.getOS().name === "iOS" && Sr.getBrowser().name === "Mobile Safari" && !window.navigator.standalone
  , Yi = () => Sr.getOS().name === "iOS" && Sr.getBrowser().name === "Chrome" && !window.navigator.standalone
  , Hc = () => /line/i.test(navigator.userAgent)
  , Wc = () => {
    const e = navigator.userAgent || navigator.vendor;
    return e.indexOf("FBAN") > -1 || e.indexOf("FBAV") > -1
}
  , Vc = () => (navigator.userAgent || navigator.vendor).indexOf("Twitter") > -1
  , qc = () => Hc() || Wc() || Vc()
  , XP = () => !qi() && !qc() && (Ki() || Yi() || jc());
function Vt() {
    if (typeof crypto < "u" && typeof crypto.randomUUID == "function")
        return crypto.randomUUID();
    let e = "", t, r;
    for (t = 0; t < 32; t += 1)
        r = Math.random() * 16 | 0,
        (t === 8 || t === 12 || t === 16 || t === 20) && (e += "-"),
        e += (t === 12 ? 4 : t === 16 ? r & 3 | 8 : r).toString(16);
    return e
}
let rr = null;
async function Kc() {
    if (rr)
        return rr.appFrom;
    const {appId: e, userId: t} = window.option;
    if (!e || !t)
        throw new Error(`appId [${e}] or userId [${t}] empty`);
    const r = await fetch(`/api/userapp?appId=${e}&userId=${t}`, {
        credentials: "omit"
    });
    if (!r.ok)
        return console.error(await r.text()),
        "";
    const n = await r.json();
    return rr = {
        userId: t,
        appId: e,
        appFrom: n.app_from || ""
    },
    rr.appFrom
}
async function qt() {
    const e = await Kc();
    if (e)
        try {
            const t = new URL(e);
            return t || void 0
        } catch (t) {
            console.error(t);
            return
        }
}
async function ia() {
    try {
        const {userId: e, appId: t} = window.option;
        if (!e || !t)
            return [];
        const r = await fetch(`/uts?appId=${t}`, {
            method: "GET"
        });
        if (r.status === 200)
            return (await r.json()).Tags.map(a => ({
                appid: a.appid,
                tagKey: a.tag_key,
                tagValue: a.tag_value,
                updated: a.updated
            }))
    } catch (e) {
        console.error(e)
    }
    return []
}
async function JP() {
    const {userId: e, appId: t} = window.option
      , r = window.location.href;
    if (!e || !t)
        return;
    const a = await fetch("/uts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type: "u_active",
            payload: {
                ctwid: e,
                appid: t,
                pageUrl: r
            }
        })
    });
    if (a.status === 200) {
        const o = await a.json();
        o && Object.keys(o).length > 0 && (Pr({
            version: "v2",
            action: "g_active",
            data: {
                game_server_id: "",
                game_user_id: "",
                role: {},
                item: {},
                custom: {
                    uts: {
                        retargeting: o.retargeting
                    }
                }
            }
        }),
        be({
            event: "UserActive",
            ctwid: e,
            appid: t,
            LastAppSource: o.utm_source,
            retargeting: o.retargeting
        }))
    }
}
function Kt(e) {
    const t = () => {
        window.navigator.sendBeacon("/reports", JSON.stringify(e))
    }
      , r = () => {
        kt( () => fetch("/reports", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(e)
        }), {
            retries: 3
        })
    }
    ;
    if (typeof navigator < "u" && typeof navigator.sendBeacon == "function")
        try {
            t()
        } catch (n) {
            console.error(n),
            r()
        }
    else
        r()
}
function Yc(e, t) {
    if (e === "g_tutorial") {
        const {item_id: r, item_desc: n} = t || {};
        be({
            event: e,
            ...r && n ? {
                item_id: r,
                item_desc: n
            } : {}
        })
    }
}
function zc(e, t) {
    if (e === "g_tutorial" && typeof t.item == "object" && t.item !== null) {
        const r = t.item;
        be({
            event: e,
            ...r.item_id && r.item_desc ? {
                item_id: r.item_id,
                item_desc: r.item_desc
            } : {}
        })
    }
}
async function Xc() {
    const e = await Ce();
    return {
        userId: e.sub,
        appId: e.aud,
        country: e.country,
        region: e.region,
        lang: e.lang,
        currency: e.currency
    }
}
async function sa() {
    const {userId: e, appId: t, country: r, region: n, lang: a} = await Xc();
    if (!Bt().currentUser())
        throw new Error("currentUser is empty");
    if (!e)
        throw new Error(`userId is not found ${e}`);
    return {
        page: {
            referer: document.referrer || "",
            network_connection: Nc(window, "navigator.network.connection.effectiveType", ""),
            url: window.location.href,
            fp: await Mi() || "",
            country: r,
            region: n,
            lang: a,
            userAgent: window.navigator.userAgent,
            userAgentData: await Bc(),
            isStandalone: qi() ? 1 : 0
        },
        ctwid: e,
        appid: t
    }
}
async function Pr(e) {
    const {version: t, service: r, action: n, data: a} = e
      , o = Vt()
      , {ctwid: i, appid: s, page: c} = await sa()
      , g = {
        version: t,
        type: n,
        uuid: o,
        time: `${Date.now()}`,
        ctwid: i,
        appid: s,
        page: c,
        payload: a,
        service: r
    };
    if (t === "v2" ? zc(n, a) : Yc(n, a),
    (n === "g_register" || n === "g_login") && be({
        event: n
    }),
    n === "g_createrole") {
        const f = await ia();
        let m = null
          , u = -1;
        try {
            for (let p = 0; p < f.length; p += 1)
                f[p].tagKey === "last_ad_url" && f[p].updated > u && (m = new URL(f[p].tagValue),
                u = f[p].updated)
        } catch {}
        const l = m?.searchParams
          , d = f.filter(p => p.tagKey === "create_role").length === 0;
        Cc({
            ctwid: i,
            appid: s,
            isFirst: d,
            url: window.location.href
        }),
        be({
            event: n,
            ctwid: i,
            appid: s,
            lastADDetail: {
                appPlatform: l?.get("platform") || "",
                appSource: l?.get("utm_source") || "",
                appCampaign: l?.get("utm_campaign") || "",
                appAdGroup: l?.get("utm_adgroup") || "",
                appKeyword: l?.get("utm_keyword") || "",
                time: u
            },
            isFirst: d
        })
    }
    Kt(g)
}
async function zi(e) {
    const {action: t, data: r} = e
      , n = Vt()
      , {ctwid: a, appid: o, page: i} = await sa()
      , s = {
        type: t,
        uuid: n,
        time: `${Date.now()}`,
        ctwid: a,
        appid: o,
        page: i,
        payload: r
    };
    (t === "p_register" || t === "p_login") && be({
        event: t
    }),
    Kt(s)
}
async function Jc(e, t, r) {
    const n = await Ce()
      , {sub: a, aud: o, country: i, region: s} = n
      , {appTitle: c} = window.option
      , f = new URL(window.location.href).searchParams.get("platform")
      , m = (await qt())?.searchParams
      , u = Vt()
      , l = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      , d = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    window.top?.option?.code && window.dataLayer && window.first_land_url && window.dataLayer.push({
        event: "p_pre_entry",
        ctwid: a,
        appid: t,
        dl_platformid: f || "ctw",
        dl_appid: t,
        dl_appname: c,
        dl_ctwid: a,
        dl_country: i,
        dl_region: s,
        lastADDetail: {
            appPlatform: m?.get("platform") || "",
            appSource: m?.get("utm_source") || "",
            appCampaign: m?.get("utm_campaign") || "",
            appAdgroup: m?.get("utm_adgroup") || "",
            appKeyword: m?.get("utm_keyword") || "",
            time: new Date().getTime()
        }
    }),
    Kt({
        version: "v2",
        type: "misc_platform_pre_entry",
        uuid: u,
        ctwid: a,
        appid: o,
        service: "platform",
        page: {
            region: s,
            country: i,
            lang: r,
            windowWidth: l,
            windowHeight: d,
            referer: document.referrer,
            url: window.location.href,
            first_land_url: window.first_land_url,
            userAgent: window.navigator.userAgent
        },
        payload: {
            provider: e,
            appid: t,
            lang: r,
            timestamp: Date.now()
        }
    })
}
async function Qc(e, {data: t}) {
    const r = Vt()
      , {ctwid: n, page: a} = await sa()
      , o = {
        type: "misc_im_link",
        version: "v2",
        service: "platform",
        uuid: r,
        time: `${Date.now()}`,
        ctwid: n,
        appid: e,
        page: a,
        payload: t
    };
    Kt(o)
}
async function Zc(e, t) {
    const r = await Ce()
      , {sub: n, aud: a, country: o, region: i} = r
      , s = Vt()
      , c = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      , g = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    Kt({
        version: "v2",
        type: "misc_platform_pre_entry_cancel",
        uuid: s,
        ctwid: n,
        appid: a,
        service: "platform",
        page: {
            region: i,
            country: o,
            lang: t,
            windowWidth: c,
            windowHeight: g,
            referer: document.referrer,
            url: window.location.href,
            first_land_url: window.first_land_url,
            userAgent: window.navigator.userAgent
        },
        payload: {
            appid: e,
            lang: t,
            timestamp: Date.now()
        }
    })
}
function el(e) {
    return typeof e == "object" && e !== null && "data"in e && "level"in e && "ctwid"in e
}
function QP(e) {
    return typeof e == "object" && e !== null && "category"in e && e.category === "GAME_EVENT" && "action"in e && e.action === "ACTIVATE" && "payload"in e
}
function ZP(e) {
    return typeof e == "object" && e !== null && "type"in e && e.type === "game_event" && "action"in e && e.action === "server_game_event_created"
}
const tl = {}
  , rl = Ke("CHECK_GAME_EVENTS", async e => {
    const {appId: t} = window.option
      , r = await ee.get(`/api/v1/events/game_event/check/${t}?r=${e}&t=${Date.now()}`, {
        withCredentials: !0
    });
    for (const n of r.data)
        window.postMessage(n);
    return r.data
}
);
function nl(e) {
    e.data && (Gc(e.level),
    Pr({
        version: "v2",
        action: "g_levelup",
        data: {
            ...e.data,
            game_server_id: e.data?.game_server_id || e.server_id,
            custom: {
                ...e.data.custom,
                event_source: "server"
            },
            role: {
                ...e.data.role,
                level: e.level.toString()
            }
        }
    }))
}
const e0 = Ke("GAME_EVENT_ACTIVATE", async e => {
    if (!e?.payload) {
        const n = new Error("event payload is required");
        throw console.error(n, e),
        n
    }
    const r = (await ee.post("/api/v1/events/game_event/activate", {
        payload: e.payload
    })).data;
    return r.length > 0 && setTimeout( () => {
        r.forEach(n => {
            if (n.category === "GC_LEVEL_UP") {
                console.log("[GAME_EVENT] GC_LEVEL_UP event", n);
                const {level: a} = n;
                Mg(a),
                setTimeout( () => {
                    if (!n.payload)
                        return;
                    const o = JSON.parse(n.payload);
                    el(o) && nl(o)
                }
                )
            }
            if (n.category === "GC_PAYMENT_SUCCEED") {
                console.log("[GAME_EVENT] GC_PAYMENT_SUCCEED event", n);
                const {order: a} = n
                  , o = a.items?.[0]?.currency || "JPY";
                Rg({
                    event: "PaymentSucceed",
                    amount: ma(a.items),
                    currency: o,
                    orderID: a.order_no,
                    isAppFirst: a.is_app_first,
                    lastPaymentTime: a.last_deliver_order_time,
                    order: {
                        orderNo: a.order_no,
                        appCode: a.app_code,
                        paymentCode: a.payment_code,
                        status: a.status,
                        error: a.error,
                        items: a.items.map(i => ({
                            code: i.code,
                            name: i.name,
                            desc: i.desc,
                            amt: i.amt,
                            currency: i.currency || o,
                            qty: i.qty,
                            taxamt: i.taxamt
                        }))
                    }
                })
            }
        }
        )
    }
    ),
    r
}
)
  , al = ce({
    name: "gameEvent",
    initialState: tl,
    reducers: {}
})
  , Re = {
    FacebookMessage: "facebook_message",
    DiscordMessage: "discord_message",
    WhatsappMessage: "whatsapp_message",
    LineMessage: "line_message"
}
  , ol = {
    [Re.FacebookMessage]: "FACEBOOK",
    [Re.DiscordMessage]: "DISCORD",
    [Re.WhatsappMessage]: "WHATSAPP",
    [Re.LineMessage]: "LINE"
}
  , il = e => typeof e == "object" && e !== null && "type"in e && "action"in e && "appCode"in e && "imType"in e
  , sl = {
    LineChat: "line_chat",
    FacebookMessage: "facebook_message",
    DiscordMessage: "discord_message",
    WhatsappMessage: "whatsapp_message"
}
  , ul = {
    Simple: "simple"
}
  , cl = {
    PreEntryType: "pre_entry"
}
  , ll = {
    PreEntryStatusChanged: "pre_entry_status_changed"
}
  , t0 = (e, t) => typeof e == "object" && e !== null && "type"in e && e.type === cl.PreEntryType && "action"in e && e.action === ll.PreEntryStatusChanged && "lang"in e && e.lang === t && "appCode"in e && "userId"in e && "isRegistered"in e
  , dl = {
    PreEntry: "pre-registration",
    Profile: "profile",
    H5Page: "h5-page"
}
  , fl = ["twitter", "google", "apple"]
  , pl = {
    imPopupOpen: !1,
    supportedImTypes: [],
    supportedLinkTypes: [],
    imConnectedStatus: {}
};
function Fa(e, t) {
    return !e || !t ? !1 : e.isLinked !== t.isLinked
}
const Ar = ce({
    name: "imConnect",
    initialState: pl,
    reducers: {
        setImPopupOpen: (e, t) => {
            e.imPopupOpen = t.payload
        }
        ,
        initImConnectedStatus: (e, t) => {
            const r = e.imConnectedStatus
              , n = t.payload?.map(i => i.imType) ?? [];
            e.supportedImTypes = n,
            e.supportedLinkTypes = [...n, ...fl];
            const a = {};
            for (const i of t.payload || [])
                a[i.imType] = i;
            e.imConnectedStatus = a;
            const o = e.imConnectedStatus;
            for (const [i,s] of Object.entries(o)) {
                if (!s)
                    continue;
                const c = r[i];
                if (c && Fa(c, s)) {
                    e.imPopupConnectedStatus = {
                        before: c,
                        after: s
                    },
                    console.log("[IM_CONNECT][initImConnectedStatus] imPopupConnectedStatus changed", e.imPopupConnectedStatus);
                    break
                }
            }
        }
        ,
        updateImConnectedStatus: (e, t) => {
            const r = t.payload.imType;
            if (!e.supportedImTypes.includes(r))
                return;
            const n = e.imConnectedStatus[r]
              , a = t.payload;
            e.imConnectedStatus[r] = a,
            n && Fa(n, a) && (e.imPopupConnectedStatus = {
                before: n,
                after: a
            },
            console.log("[IM_CONNECT][updateImConnectedStatus] imPopupConnectedStatus changed", e.imPopupConnectedStatus))
        }
        ,
        dismissImPopupConnectedStatus: e => {
            e.imPopupConnectedStatus = void 0
        }
    }
});
async function gl(e) {
    try {
        return (await ee.get(`${J.SHD_G123_GAME_URL}/api/v1/im/connected_status`, {
            params: e
        })).data
    } catch (t) {
        throw window?.Sentry?.captureException(t),
        t
    }
}
const Xi = Ke("imConnect/refreshImConnectedStatus", async (e, {dispatch: t}) => {
    const r = await gl(e);
    return e.imType ? t(Ar.actions.updateImConnectedStatus(r[0])) : t(Ar.actions.initImConnectedStatus(r)),
    r
}
);
function ml(e, t) {
    const r = n => {
        const a = n.data;
        il(a) && a.appCode === t && e(Xi({
            appCode: a.appCode,
            imType: a.imType
        }))
    }
    ;
    return window.addEventListener("message", r),
    () => {
        window.removeEventListener("message", r)
    }
}
let $t;
const r0 = Ke("imConnect/installImConnectModule", async (e, {dispatch: t}) => {
    $t && $t(),
    $t = ml(t, e),
    t(Xi({
        appCode: e
    }))
}
)
  , n0 = Ke("imConnect/uninstallImConnectModule", async () => {
    $t && $t()
}
)
  , {setImPopupOpen: a0, dismissImPopupConnectedStatus: o0} = Ar.actions;
var hl = na;
function vl() {
    this.__data__ = new hl,
    this.size = 0
}
var wl = vl;
function yl(e) {
    var t = this.__data__
      , r = t.delete(e);
    return this.size = t.size,
    r
}
var bl = yl;
function _l(e) {
    return this.__data__.get(e)
}
var El = _l;
function Sl(e) {
    return this.__data__.has(e)
}
var Pl = Sl
  , Al = na
  , Tl = ki
  , Ol = Di
  , Cl = 200;
function xl(e, t) {
    var r = this.__data__;
    if (r instanceof Al) {
        var n = r.__data__;
        if (!Tl || n.length < Cl - 1)
            return n.push([e, t]),
            this.size = ++r.size,
            this;
        r = this.__data__ = new Ol(n)
    }
    return r.set(e, t),
    this.size = r.size,
    this
}
var Il = xl
  , $l = na
  , Rl = wl
  , Ll = bl
  , Ml = El
  , kl = Pl
  , Dl = Il;
function _t(e) {
    var t = this.__data__ = new $l(e);
    this.size = t.size
}
_t.prototype.clear = Rl;
_t.prototype.delete = Ll;
_t.prototype.get = Ml;
_t.prototype.has = kl;
_t.prototype.set = Dl;
var ua = _t
  , Gl = "__lodash_hash_undefined__";
function Nl(e) {
    return this.__data__.set(e, Gl),
    this
}
var Ul = Nl;
function jl(e) {
    return this.__data__.has(e)
}
var Fl = jl
  , Bl = Di
  , Hl = Ul
  , Wl = Fl;
function Tr(e) {
    var t = -1
      , r = e == null ? 0 : e.length;
    for (this.__data__ = new Bl; ++t < r; )
        this.add(e[t])
}
Tr.prototype.add = Tr.prototype.push = Hl;
Tr.prototype.has = Wl;
var Ji = Tr;
function Vl(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
        if (t(e[r], r, e))
            return !0;
    return !1
}
var ql = Vl;
function Kl(e, t) {
    return e.has(t)
}
var Qi = Kl
  , Yl = Ji
  , zl = ql
  , Xl = Qi
  , Jl = 1
  , Ql = 2;
function Zl(e, t, r, n, a, o) {
    var i = r & Jl
      , s = e.length
      , c = t.length;
    if (s != c && !(i && c > s))
        return !1;
    var g = o.get(e)
      , f = o.get(t);
    if (g && f)
        return g == t && f == e;
    var m = -1
      , u = !0
      , l = r & Ql ? new Yl : void 0;
    for (o.set(e, t),
    o.set(t, e); ++m < s; ) {
        var d = e[m]
          , p = t[m];
        if (n)
            var h = i ? n(p, d, m, t, e, o) : n(d, p, m, e, t, o);
        if (h !== void 0) {
            if (h)
                continue;
            u = !1;
            break
        }
        if (l) {
            if (!zl(t, function(v, A) {
                if (!Xl(l, A) && (d === v || a(d, v, r, n, o)))
                    return l.push(A)
            })) {
                u = !1;
                break
            }
        } else if (!(d === p || a(d, p, r, n, o))) {
            u = !1;
            break
        }
    }
    return o.delete(e),
    o.delete(t),
    u
}
var Zi = Zl
  , ed = at
  , td = ed.Uint8Array
  , es = td;
function rd(e) {
    var t = -1
      , r = Array(e.size);
    return e.forEach(function(n, a) {
        r[++t] = [a, n]
    }),
    r
}
var nd = rd;
function ad(e) {
    var t = -1
      , r = Array(e.size);
    return e.forEach(function(n) {
        r[++t] = n
    }),
    r
}
var od = ad
  , Ba = Ur
  , Ha = es
  , id = jr
  , sd = Zi
  , ud = nd
  , cd = od
  , ld = 1
  , dd = 2
  , fd = "[object Boolean]"
  , pd = "[object Date]"
  , gd = "[object Error]"
  , md = "[object Map]"
  , hd = "[object Number]"
  , vd = "[object RegExp]"
  , wd = "[object Set]"
  , yd = "[object String]"
  , bd = "[object Symbol]"
  , _d = "[object ArrayBuffer]"
  , Ed = "[object DataView]"
  , Wa = Ba ? Ba.prototype : void 0
  , tn = Wa ? Wa.valueOf : void 0;
function Sd(e, t, r, n, a, o, i) {
    switch (r) {
    case Ed:
        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
        e = e.buffer,
        t = t.buffer;
    case _d:
        return !(e.byteLength != t.byteLength || !o(new Ha(e), new Ha(t)));
    case fd:
    case pd:
    case hd:
        return id(+e, +t);
    case gd:
        return e.name == t.name && e.message == t.message;
    case vd:
    case yd:
        return e == t + "";
    case md:
        var s = ud;
    case wd:
        var c = n & ld;
        if (s || (s = cd),
        e.size != t.size && !c)
            return !1;
        var g = i.get(e);
        if (g)
            return g == t;
        n |= dd,
        i.set(e, t);
        var f = sd(s(e), s(t), n, a, o, i);
        return i.delete(e),
        f;
    case bd:
        if (tn)
            return tn.call(e) == tn.call(t)
    }
    return !1
}
var Pd = Sd;
function Ad(e, t) {
    for (var r = -1, n = t.length, a = e.length; ++r < n; )
        e[a + r] = t[r];
    return e
}
var Br = Ad
  , Td = Array.isArray
  , Ge = Td
  , Od = Br
  , Cd = Ge;
function xd(e, t, r) {
    var n = t(e);
    return Cd(e) ? n : Od(n, r(e))
}
var ts = xd;
function Id(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, a = 0, o = []; ++r < n; ) {
        var i = e[r];
        t(i, r, e) && (o[a++] = i)
    }
    return o
}
var $d = Id;
function Rd() {
    return []
}
var rs = Rd
  , Ld = $d
  , Md = rs
  , kd = Object.prototype
  , Dd = kd.propertyIsEnumerable
  , Va = Object.getOwnPropertySymbols
  , Gd = Va ? function(e) {
    return e == null ? [] : (e = Object(e),
    Ld(Va(e), function(t) {
        return Dd.call(e, t)
    }))
}
: Md
  , ca = Gd;
function Nd(e, t) {
    for (var r = -1, n = Array(e); ++r < e; )
        n[r] = t(r);
    return n
}
var Ud = Nd;
function jd(e) {
    return e != null && typeof e == "object"
}
var Ne = jd
  , Fd = Ht
  , Bd = Ne
  , Hd = "[object Arguments]";
function Wd(e) {
    return Bd(e) && Fd(e) == Hd
}
var Vd = Wd
  , qa = Vd
  , qd = Ne
  , ns = Object.prototype
  , Kd = ns.hasOwnProperty
  , Yd = ns.propertyIsEnumerable
  , zd = qa(function() {
    return arguments
}()) ? qa : function(e) {
    return qd(e) && Kd.call(e, "callee") && !Yd.call(e, "callee")
}
  , la = zd
  , Or = {
    exports: {}
};
function Xd() {
    return !1
}
var Jd = Xd;
Or.exports;
(function(e, t) {
    var r = at
      , n = Jd
      , a = t && !t.nodeType && t
      , o = a && !0 && e && !e.nodeType && e
      , i = o && o.exports === a
      , s = i ? r.Buffer : void 0
      , c = s ? s.isBuffer : void 0
      , g = c || n;
    e.exports = g
}
)(Or, Or.exports);
var Hr = Or.exports
  , Qd = 9007199254740991
  , Zd = /^(?:0|[1-9]\d*)$/;
function ef(e, t) {
    var r = typeof e;
    return t = t ?? Qd,
    !!t && (r == "number" || r != "symbol" && Zd.test(e)) && e > -1 && e % 1 == 0 && e < t
}
var as = ef
  , tf = 9007199254740991;
function rf(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= tf
}
var os = rf
  , nf = Ht
  , af = os
  , of = Ne
  , sf = "[object Arguments]"
  , uf = "[object Array]"
  , cf = "[object Boolean]"
  , lf = "[object Date]"
  , df = "[object Error]"
  , ff = "[object Function]"
  , pf = "[object Map]"
  , gf = "[object Number]"
  , mf = "[object Object]"
  , hf = "[object RegExp]"
  , vf = "[object Set]"
  , wf = "[object String]"
  , yf = "[object WeakMap]"
  , bf = "[object ArrayBuffer]"
  , _f = "[object DataView]"
  , Ef = "[object Float32Array]"
  , Sf = "[object Float64Array]"
  , Pf = "[object Int8Array]"
  , Af = "[object Int16Array]"
  , Tf = "[object Int32Array]"
  , Of = "[object Uint8Array]"
  , Cf = "[object Uint8ClampedArray]"
  , xf = "[object Uint16Array]"
  , If = "[object Uint32Array]"
  , K = {};
K[Ef] = K[Sf] = K[Pf] = K[Af] = K[Tf] = K[Of] = K[Cf] = K[xf] = K[If] = !0;
K[sf] = K[uf] = K[bf] = K[cf] = K[_f] = K[lf] = K[df] = K[ff] = K[pf] = K[gf] = K[mf] = K[hf] = K[vf] = K[wf] = K[yf] = !1;
function $f(e) {
    return of(e) && af(e.length) && !!K[nf(e)]
}
var Rf = $f;
function Lf(e) {
    return function(t) {
        return e(t)
    }
}
var Wr = Lf
  , Cr = {
    exports: {}
};
Cr.exports;
(function(e, t) {
    var r = uc
      , n = t && !t.nodeType && t
      , a = n && !0 && e && !e.nodeType && e
      , o = a && a.exports === n
      , i = o && r.process
      , s = function() {
        try {
            var c = a && a.require && a.require("util").types;
            return c || i && i.binding && i.binding("util")
        } catch {}
    }();
    e.exports = s
}
)(Cr, Cr.exports);
var da = Cr.exports
  , Mf = Rf
  , kf = Wr
  , Ka = da
  , Ya = Ka && Ka.isTypedArray
  , Df = Ya ? kf(Ya) : Mf
  , fa = Df
  , Gf = Ud
  , Nf = la
  , Uf = Ge
  , jf = Hr
  , Ff = as
  , Bf = fa
  , Hf = Object.prototype
  , Wf = Hf.hasOwnProperty;
function Vf(e, t) {
    var r = Uf(e)
      , n = !r && Nf(e)
      , a = !r && !n && jf(e)
      , o = !r && !n && !a && Bf(e)
      , i = r || n || a || o
      , s = i ? Gf(e.length, String) : []
      , c = s.length;
    for (var g in e)
        (t || Wf.call(e, g)) && !(i && (g == "length" || a && (g == "offset" || g == "parent") || o && (g == "buffer" || g == "byteLength" || g == "byteOffset") || Ff(g, c))) && s.push(g);
    return s
}
var is = Vf
  , qf = Object.prototype;
function Kf(e) {
    var t = e && e.constructor
      , r = typeof t == "function" && t.prototype || qf;
    return e === r
}
var pa = Kf;
function Yf(e, t) {
    return function(r) {
        return e(t(r))
    }
}
var ss = Yf
  , zf = ss
  , Xf = zf(Object.keys, Object)
  , Jf = Xf
  , Qf = pa
  , Zf = Jf
  , ep = Object.prototype
  , tp = ep.hasOwnProperty;
function rp(e) {
    if (!Qf(e))
        return Zf(e);
    var t = [];
    for (var r in Object(e))
        tp.call(e, r) && r != "constructor" && t.push(r);
    return t
}
var np = rp
  , ap = Gi
  , op = os;
function ip(e) {
    return e != null && op(e.length) && !ap(e)
}
var Yt = ip
  , sp = is
  , up = np
  , cp = Yt;
function lp(e) {
    return cp(e) ? sp(e) : up(e)
}
var Vr = lp
  , dp = ts
  , fp = ca
  , pp = Vr;
function gp(e) {
    return dp(e, pp, fp)
}
var us = gp
  , za = us
  , mp = 1
  , hp = Object.prototype
  , vp = hp.hasOwnProperty;
function wp(e, t, r, n, a, o) {
    var i = r & mp
      , s = za(e)
      , c = s.length
      , g = za(t)
      , f = g.length;
    if (c != f && !i)
        return !1;
    for (var m = c; m--; ) {
        var u = s[m];
        if (!(i ? u in t : vp.call(t, u)))
            return !1
    }
    var l = o.get(e)
      , d = o.get(t);
    if (l && d)
        return l == t && d == e;
    var p = !0;
    o.set(e, t),
    o.set(t, e);
    for (var h = i; ++m < c; ) {
        u = s[m];
        var v = e[u]
          , A = t[u];
        if (n)
            var b = i ? n(A, v, u, t, e, o) : n(v, A, u, e, t, o);
        if (!(b === void 0 ? v === A || a(v, A, r, n, o) : b)) {
            p = !1;
            break
        }
        h || (h = u == "constructor")
    }
    if (p && !h) {
        var S = e.constructor
          , O = t.constructor;
        S != O && "constructor"in e && "constructor"in t && !(typeof S == "function" && S instanceof S && typeof O == "function" && O instanceof O) && (p = !1)
    }
    return o.delete(e),
    o.delete(t),
    p
}
var yp = wp
  , bp = Wt
  , _p = at
  , Ep = bp(_p, "DataView")
  , Sp = Ep
  , Pp = Wt
  , Ap = at
  , Tp = Pp(Ap, "Promise")
  , Op = Tp
  , Cp = Wt
  , xp = at
  , Ip = Cp(xp, "Set")
  , $p = Ip
  , Rp = Wt
  , Lp = at
  , Mp = Rp(Lp, "WeakMap")
  , kp = Mp
  , xn = Sp
  , In = ki
  , $n = Op
  , Rn = $p
  , Ln = kp
  , cs = Ht
  , Et = cc
  , Xa = "[object Map]"
  , Dp = "[object Object]"
  , Ja = "[object Promise]"
  , Qa = "[object Set]"
  , Za = "[object WeakMap]"
  , eo = "[object DataView]"
  , Gp = Et(xn)
  , Np = Et(In)
  , Up = Et($n)
  , jp = Et(Rn)
  , Fp = Et(Ln)
  , Qe = cs;
(xn && Qe(new xn(new ArrayBuffer(1))) != eo || In && Qe(new In) != Xa || $n && Qe($n.resolve()) != Ja || Rn && Qe(new Rn) != Qa || Ln && Qe(new Ln) != Za) && (Qe = function(e) {
    var t = cs(e)
      , r = t == Dp ? e.constructor : void 0
      , n = r ? Et(r) : "";
    if (n)
        switch (n) {
        case Gp:
            return eo;
        case Np:
            return Xa;
        case Up:
            return Ja;
        case jp:
            return Qa;
        case Fp:
            return Za
        }
    return t
}
);
var qr = Qe
  , rn = ua
  , Bp = Zi
  , Hp = Pd
  , Wp = yp
  , to = qr
  , ro = Ge
  , no = Hr
  , Vp = fa
  , qp = 1
  , ao = "[object Arguments]"
  , oo = "[object Array]"
  , nr = "[object Object]"
  , Kp = Object.prototype
  , io = Kp.hasOwnProperty;
function Yp(e, t, r, n, a, o) {
    var i = ro(e)
      , s = ro(t)
      , c = i ? oo : to(e)
      , g = s ? oo : to(t);
    c = c == ao ? nr : c,
    g = g == ao ? nr : g;
    var f = c == nr
      , m = g == nr
      , u = c == g;
    if (u && no(e)) {
        if (!no(t))
            return !1;
        i = !0,
        f = !1
    }
    if (u && !f)
        return o || (o = new rn),
        i || Vp(e) ? Bp(e, t, r, n, a, o) : Hp(e, t, c, r, n, a, o);
    if (!(r & qp)) {
        var l = f && io.call(e, "__wrapped__")
          , d = m && io.call(t, "__wrapped__");
        if (l || d) {
            var p = l ? e.value() : e
              , h = d ? t.value() : t;
            return o || (o = new rn),
            a(p, h, r, n, o)
        }
    }
    return u ? (o || (o = new rn),
    Wp(e, t, r, n, a, o)) : !1
}
var zp = Yp
  , Xp = zp
  , so = Ne;
function ls(e, t, r, n, a) {
    return e === t ? !0 : e == null || t == null || !so(e) && !so(t) ? e !== e && t !== t : Xp(e, t, r, n, ls, a)
}
var Jp = ls
  , Qp = Jp;
function Zp(e, t) {
    return Qp(e, t)
}
var eg = Zp;
const uo = ge(eg);
function tg(e) {
    return typeof e == "object" && e.game_user_id !== void 0 && e.game_server_id !== void 0
}
function ds(e) {
    return typeof e == "object" && e.role !== void 0
}
const rg = {
    role_id: "",
    role_name: "",
    game_server: "",
    tags: [],
    game_user_id: "",
    game_server_id: "",
    role: {
        id: "",
        name: "",
        level: "",
        exp: "",
        vip_level: "",
        vip_exp: "",
        virtual_balance: "",
        custom: ""
    }
}
  , ga = ce({
    name: "inGameAcount",
    initialState: rg,
    reducers: {
        updateByInformEvent(e, t) {
            const r = t.payload;
            e.role_id = r.role_id || e.role_id,
            e.role_name = r.role_name || e.role_name,
            e.tags = (r.tags || r.tags || []).filter(Boolean).map(n => /^vip/i.test(n) ? n.toUpperCase() : n),
            e.game_server_id = r.game_server || e.game_server_id,
            e.game_server = e.game_server_id,
            e.role.id = r.role_id || e.role.id,
            e.role.name = r.role_name || e.role.name
        },
        updateByGEvent(e, t) {
            const r = t.payload;
            if (ds(r))
                e.game_user_id = r.game_user_id || e.game_user_id,
                e.game_server_id = r.game_server_id || e.game_server_id,
                e.game_server = e.game_server_id,
                e.role_id = r.role.id || e.role_id,
                e.role_name = r.role.name || e.role_name,
                uo(e.role, r.role) || (e.role = r.role);
            else {
                e.game_user_id = r.game_user_id || e.game_user_id,
                e.game_server_id = r.game_server_id || e.game_server_id,
                e.game_server = e.game_server_id,
                e.role_id = r.role_id || e.role_id;
                const n = {
                    id: r.role_id || e.role.id,
                    name: e.role_name,
                    level: r.role_level || e.role.level,
                    exp: String(r.role_exp) || e.role.exp,
                    vip_level: String(r.role_vip_level) || e.role.vip_level,
                    vip_exp: String(r.role_vip_exp) || e.role.vip_exp,
                    virtual_balance: String(r.virtual_balance1) || e.role.virtual_balance,
                    custom: e.role.custom
                };
                uo(e.role, n) || (e.role = n)
            }
        }
    }
})
  , co = 599
  , lo = 600
  , ng = e => window.open(e, "_blank", `toolbar=no,location=yes,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=${Math.min(co, window.screen.width - 20)},height=${lo},top=${(window.screen.height - lo) / 2}, left=${(window.screen.width - co) / 2}`)
  , i0 = {
    line_message: "LINE",
    facebook_message: "Facebook",
    discord_message: "Discord",
    whatsapp_message: "WhatsApp"
};
function ag(e, t, r, n) {
    const {lang: a} = window.option;
    switch (t) {
    case Re.LineMessage:
        Bt().link("line", {
            appCode: r,
            redirectUri: n
        });
        break;
    case Re.FacebookMessage:
    case Re.DiscordMessage:
    case Re.WhatsappMessage:
        {
            const o = new URL(`${J.SHD_G123_GAME_URL}/api/v1/im/connect`);
            o.searchParams.set("appCode", r),
            o.searchParams.set("imType", t),
            o.searchParams.set("lang", a || "ja"),
            ng(o.href)
        }
        break
    }
    Qc(r, {
        data: {
            action: "ON",
            isConversationEnabled: !1,
            channel: ol[t],
            source: e
        }
    })
}
async function fs(e) {
    const t = await ee.get(`${J.SHD_G123_WEB_URL}/api/v1/preEntry/${e}?lang=${ue.language}`, {
        withCredentials: !0
    });
    if (!t.data)
        throw new Error(t.data);
    return t.data
}
async function ps({appId: e, type: t}) {
    return (await ee.post(`${J.SHD_G123_WEB_URL}/api/v1/preEntry?type=${t}&lang=${ue.language}`, {
        appCode: e
    }, {
        headers: {
            "x-requested-with": "xhr"
        },
        withCredentials: !0
    })).data
}
async function og(e) {
    return (await ee.post(`${J.SHD_G123_WEB_URL}/api/v1/preEntry/cancel?lang=${ue.language}`, {
        appId: e
    }, {
        headers: {
            "x-requested-with": "xhr"
        },
        withCredentials: !0
    })).data
}
const ig = {
    fetchPreEntryState: fs,
    postPreEntry: ps,
    cancelPreEntryState: og
}
  , sg = Ke("preEntry/loadPreEntry", async (e, {dispatch: t}) => {
    const {appId: r, isRefresh: n} = e
      , a = await fs(r);
    return t(n ? Dt.actions.updatePreEntry({
        appId: r,
        preEntryResponse: a
    }) : Dt.actions.initPreEntry({
        appId: r,
        preEntryResponse: a
    })),
    a
}
)
  , ug = Ke("preEntry/startPreEntry", async (e, {getState: t, dispatch: r}) => {
    const {appId: n} = e
      , a = t().preEntry.preEntryStateMap[n];
    if (!a)
        throw new Error(`PreEntry not found [appId=${n}]`);
    Jc("", n, ue.language);
    const o = a.supportedTypes[0];
    if (o !== ul.Simple && !a.imLinkingStatus[o]) {
        const c = `${J.SHD_G123_WEB_URL}/game/${n}?lang=${ue.language}`
          , g = o === sl.LineChat ? Re.LineMessage : o;
        ag(dl.PreEntry, g, n, c)
    }
    const s = await ps({
        appId: n,
        type: o
    });
    return r(Dt.actions.updatePreEntry({
        appId: n,
        preEntryResponse: s
    })),
    s
}
)
  , cg = Ke("preEntry/cancelPreEntry", async (e, {dispatch: t}) => {
    const {appId: r} = e;
    Zc(r, ue.language);
    const n = await ig.cancelPreEntryState(r);
    return t(Dt.actions.updatePreEntry({
        appId: r,
        preEntryResponse: n
    })),
    n
}
)
  , lg = {
    preEntryMap: {},
    preEntryStateMap: {},
    popupPreRegisterationStatus: void 0
}
  , Dt = ce({
    name: "preEntry",
    initialState: lg,
    reducers: {
        setPreEntry: (e, t) => {
            e.preEntryMap[t.payload.appId] = t.payload.preEntryResponse
        }
        ,
        initPreEntry: (e, t) => {
            const {appId: r, preEntryResponse: n} = t.payload
              , a = {
                ...e.preEntryStateMap,
                [r]: n
            };
            return {
                ...e,
                preEntryStateMap: a
            }
        }
        ,
        updatePreEntry: (e, t) => {
            const {appId: r, preEntryResponse: n} = t.payload
              , a = e.preEntryStateMap[r]?.isRegistered
              , o = n?.isRegistered
              , i = {
                ...e.preEntryStateMap,
                [r]: n
            };
            return {
                ...e,
                preEntryStateMap: i,
                popupPreRegisterationStatus: {
                    before: a,
                    after: o
                }
            }
        }
        ,
        dismissPopupPreRegisterationStatus: e => ({
            ...e,
            popupPreRegisterationStatus: void 0
        })
    },
    extraReducers: e => {
        e.addCase(sg.fulfilled, (t, r) => {
            t.preEntryStateMap[r.meta.arg.appId] = r.payload
        }
        ),
        e.addCase(ug.rejected, (t, r) => {
            r.error && Ma.error(ka("common.actions.pre_register.failed"))
        }
        ),
        e.addCase(cg.rejected, (t, r) => {
            r.error && Ma.error(ka("common.actions.pre_register.cancel_failed"))
        }
        )
    }
})
  , fo = {
    sdkVersion: "unknown",
    sdkStatus: "init",
    sdkLastEventAt: 0,
    appVersion: "unknown",
    appStatus: "init",
    appLastEventAt: 0
}
  , xr = ce({
    name: "pspMonitor",
    initialState: fo,
    reducers: {
        updateSdkVersion: (e, t) => ({
            ...fo,
            sdkVersion: t.payload.version
        }),
        updateSdkStatus: (e, t) => {
            const {sdkLastEventAt: r} = e;
            return t.payload.time < r ? e : {
                ...e,
                sdkStatus: t.payload.status,
                sdkLastEventAt: t.payload.time
            }
        }
        ,
        updateAppStatus: (e, t) => {
            const {appLastEventAt: r} = e;
            return t.payload.time < r ? e : {
                ...e,
                appStatus: t.payload.status,
                appLastEventAt: t.payload.time,
                appVersion: t.payload.version
            }
        }
    }
});
function dg(e) {
    return typeof e == "object" && e !== null && "event"in e && "payload"in e && e.event === "PaymentSdkMonitor"
}
const fg = e => async (t, r) => {
    const n = r().pspMonitorModule
      , a = {
        appStatus: n.appStatus,
        appVersion: n.appVersion,
        sdkStatus: n.sdkStatus,
        sdkVersion: n.sdkVersion,
        gameVersion: window?.option.appVersion
    }
      , o = `${J.SHD_G123_PSP_URL}/api/app/orders/${e}/init`;
    await ee.get(o, {
        params: a
    })
}
  , {updateSdkVersion: pg, updateSdkStatus: s0, updateAppStatus: u0} = xr.actions
  , gg = {
    isPwaInstallPromptReady: Ki() || Yi()
}
  , gs = ce({
    name: "pwa",
    initialState: gg,
    reducers: {
        setIsPwaInstallPromptReady: (e, t) => {
            e.isPwaInstallPromptReady = t.payload.isPwaInstallPromptReady
        }
    }
})
  , {setIsPwaInstallPromptReady: mg} = gs.actions
  , hg = ["creditucc", "paypal", "paypay", "stripe_creditcard", "adyen_creditcard", "applepay", "googlepay"];
function vg(e) {
    return hg.includes(e)
}
function c0(e) {
    return typeof e == "object" && e !== null && "target_user"in e && "refund_ratio"in e && typeof e.target_user == "boolean" && typeof e.refund_ratio == "number"
}
const wg = An()
  , yg = {
    loginChecked: !1,
    doCouponTrigger: !1,
    refundStatus: null,
    showRefundEmailLogin: !1
}
  , Gt = ce({
    name: "refund-coupon",
    initialState: yg,
    reducers: {
        loginChecked: e => {
            e.loginChecked = !0
        }
        ,
        triggerShowCoupon: e => {
            e.loginChecked && (e.doCouponTrigger = !0)
        }
        ,
        setRefundCampaignStatus: (e, t) => {
            const {payload: r} = t;
            e.refundStatus = r
        }
        ,
        setShowEmail: (e, t) => {
            const {payload: r} = t;
            if (!r) {
                e.showRefundEmailLogin = r;
                return
            }
            e.refundStatus?.pay_window && (wg.getItem(br.refundCampaignTargetUser) === "true" ? e.showRefundEmailLogin = r : e.refundStatus = {
                pay_window: null,
                target_user: !1,
                refund_ratio: 0
            })
        }
    }
})
  , bg = () => async e => {
    e(Gt.actions.loginChecked())
}
  , l0 = e => async t => {
    vg(e) && (t(Gt.actions.setShowEmail(!0)),
    t(Gt.actions.setRefundCampaignStatus({
        pay_window: null,
        target_user: !1,
        refund_ratio: 0
    })))
}
  , {triggerShowCoupon: d0, setRefundCampaignStatus: f0, setShowEmail: p0} = Gt.actions
  , _g = {
    display: !1,
    url: ""
}
  , Eg = ce({
    name: "videoPopup",
    initialState: _g,
    reducers: {
        showVideoPopup(e, t) {
            e.url = t.payload,
            t.payload && (e.display = !0)
        },
        hideVideoPopup(e) {
            e.display = !1,
            e.url = ""
        }
    }
})
  , Sg = {
    status: "close",
    targets: [],
    data: null,
    code: ""
}
  , Pg = ce({
    name: "webShare",
    initialState: Sg,
    reducers: {
        update(e, t) {
            e.data = t.payload.data,
            e.code = t.payload.code,
            e.targets = t.payload.targets
        },
        show(e) {
            e.status = "open"
        },
        hide(e) {
            e.status = "close"
        }
    }
})
  , Ag = {
    cs: Hi.reducer,
    app: _r.reducer,
    blockedUser: oa.reducer,
    gameEvent: al.reducer,
    imConnect: Ar.reducer,
    inGameAccount: ga.reducer,
    mainPopup: Pe.reducer,
    preEntry: Dt.reducer,
    privacy: Bi.reducer,
    pspMonitorModule: xr.reducer,
    refundCoupon: Gt.reducer,
    videoPopupModule: Eg.reducer,
    webShareModule: Pg.reducer,
    pwa: gs.reducer
};
function po(e, t) {
    for (var r in t)
        e[r] = t[r];
    return e
}
function Tg(e) {
    var t = [];
    function r(a) {
        for (var o = [], i = 0; i < t.length; i++)
            t[i] === a ? a = null : o.push(t[i]);
        t = o
    }
    function n(a, o, i) {
        e = o ? a : po(po({}, e), a);
        for (var s = t, c = 0; c < s.length; c++)
            s[c](e, i)
    }
    return e = e || {},
    {
        action: function(a) {
            function o(i) {
                n(i, !1, a)
            }
            return function() {
                for (var i = arguments, s = [e], c = 0; c < arguments.length; c++)
                    s.push(i[c]);
                var g = a.apply(this, s);
                if (g != null)
                    return g.then ? g.then(o) : o(g)
            }
        },
        setState: n,
        subscribe: function(a) {
            return t.push(a),
            function() {
                r(a)
            }
        },
        unsubscribe: r,
        getState: function() {
            return e
        }
    }
}
const Og = {}
  , Mn = Tg(Og);
function Cg(e) {
    let t = e.getState();
    Mn.setState(t.inGameAccount),
    e.subscribe( () => {
        const r = e.getState();
        t.inGameAccount !== r.inGameAccount && (Mn.setState(r.inGameAccount),
        console.log("[g123-game][inGameAccount] state changed", JSON.stringify(r.inGameAccount))),
        t = e.getState()
    }
    )
}
const F = lc({
    reducer: Ag
});
F.dispatch(Rc());
Cg(F);
window.__G123_GLOBAL_REDUX_STORE__ = F;
async function xg(e) {
    let t = J.SHD_G123_PSP_SDK_URL
      , r = "";
    try {
        const a = await kt( () => ee.get(`${J.SHD_G123_PSP_URL}/config`));
        a.data?.SHD_G123_PSP_SDK_URL && (t = a.data?.SHD_G123_PSP_SDK_URL,
        r = a.data?.SHD_G123_PSP_SDK_MODULE_URL || ""),
        a.data?.APP_VERSION && F.dispatch(pg({
            version: a.data.APP_VERSION
        }))
    } catch (a) {
        console.error("[PLATFORM][pspHelper] LOAD_PSP_CONFIG_ERROR", a),
        window.Sentry?.captureException(a)
    }
    let n = !1;
    if (r)
        try {
            const a = await kt( () => Nr( () => import(r), []));
            console.info("[PLATFORM][pspHelper] PSP_SDK_MODULE_LOADED", a),
            await a.initG123Psp(e),
            n = !0
        } catch (a) {
            console.error("[PLATFORM][pspHelper] LOAD_PSP_MODULE_ERROR", a),
            window.Sentry?.captureException(a)
        }
    if (!n)
        try {
            window.initG123Psp || await dc(t),
            window.initG123Psp && (await window.initG123Psp(e),
            n = !0)
        } catch (a) {
            console.error("[PLATFORM][pspHelper] LOAD_PSP_SCRIPT_ERROR", a),
            window.Sentry?.captureException(a)
        }
    if (!n)
        throw window.pspConfig = e,
        new Error("window.initG123Psp not exist")
}
function ma(e) {
    return e.reduce( (t, r) => t + r.qty * r.amt + r.taxamt, 0)
}
const Kr = bt(async () => {
    try {
        const {appTitle: e} = window.option
          , t = await Ce()
          , {sub: r, aud: n, country: a, region: o} = t
          , s = new URL(window.location.href).searchParams.get("platform")
          , c = (await qt())?.searchParams;
        window.dataLayer || (window.dataLayer = []),
        window.gtag?.("set", "user_id", r),
        window.dataLayer.push({
            user_id: r,
            dl_platformid: s || "ctw",
            dl_appid: n,
            dl_appname: e,
            dl_ctwid: r,
            dl_country: a,
            dl_region: o,
            appPlatform: c?.get("platform") || "",
            appSource: c?.get("utm_source") || "",
            appCampaign: c?.get("utm_campaign") || "",
            appAdgroup: c?.get("utm_adgroup") || "",
            appKeyword: c?.get("utm_keyword") || ""
        })
    } catch (e) {
        console.error(e)
    }
}
);
async function be(e) {
    await Kr(),
    window.dataLayer || (window.dataLayer = []),
    window.dataLayer.push(e)
}
async function kn(e, t) {
    await Kr(),
    window.gtag?.("event", e, t)
}
function ms(e, t) {
    const r = {};
    for (let n = 0; n < t.length; n += 1)
        t[n].tagKey.startsWith(e) && (r[t[n].tagKey] = t[n].tagValue);
    return r
}
async function Ig(e) {
    await Kr();
    const {amount: t, orderID: r} = e
      , {order: n} = e
      , a = e.currency || n?.items?.[0]?.currency;
    await kn("begin_checkout", {
        currency: a,
        value: n?.items ? ma(n.items) : t,
        transaction_id: n?.orderNo || r,
        items: n?.items?.map( (o, i) => ({
            item_id: `${n.appCode}:${o.code || o.name}`,
            item_name: `${n.appCode}:${o.name}`,
            affiliation: n?.appCode || window.option.appId,
            index: i,
            item_brand: n.appCode,
            item_category: n.appCode,
            price: o.amt,
            quantity: o.qty
        }))
    })
}
async function $g(e) {
    await Kr();
    const {amount: t, orderID: r, order: n} = e
      , a = e.currency || n?.items?.[0]?.currency
      , o = n?.items ? ma(n.items) : t
      , i = n?.paymentCode
      , s = n?.orderNo || r
      , c = n?.items?.map( (g, f) => ({
        item_id: `${n.appCode}:${g.code || g.name}`,
        item_name: `${n.appCode}:${g.name}`,
        affiliation: n?.appCode || window.option.appId,
        index: f,
        item_brand: n.appCode,
        item_category: n.appCode,
        price: g.amt,
        quantity: g.qty
    }));
    await kn("add_payment_info", {
        currency: a,
        value: o,
        payment_type: i,
        items: c
    }),
    await kn("purchase", {
        currency: a,
        value: o,
        transaction_id: s,
        items: c
    })
}
function Rg(e) {
    const {order: t} = e;
    if (!t)
        return;
    const {paymentCode: r} = t
      , n = e.currency || t?.items?.[0]?.currency;
    setTimeout(async () => {
        const a = await Ce()
          , {sub: o, aud: i} = a;
        if (xc({
            appid: i,
            ctwid: o,
            amount: e.amount,
            currencyCode: n,
            orderID: e.orderID,
            isAppFirst: e.isAppFirst,
            url: window.location.href
        }),
        window.option.expflags?.disableGtmMessageListener) {
            let s = !1
              , c = null
              , g = null
              , f = null
              , m = -1
              , u = -1
              , l = {};
            try {
                const [v] = await Promise.all([ia()]);
                l = ms("trigger_", v);
                try {
                    for (let A = 0; A < v.length; A += 1)
                        v[A].tagKey === "createrole_ad_url" && (f = new URL(v[A].tagValue),
                        m = v[A].updated),
                        v[A].tagKey === "last_ad_url" && v[A].updated > u && (g = new URL(v[A].tagValue),
                        u = v[A].updated)
                } catch {}
                c = await qt() || null,
                s = ( () => {
                    const A = new URL(window.location.href)
                      , b = c || new URL(window.location.origin)
                      , S = ["platform", "utm_source", "utm_campaign", "utm_adgroup", "utm_keyword"];
                    for (let O = 0, y = S.length; O < y; O += 1) {
                        const k = S[O]
                          , G = A.searchParams.get(k) || ""
                          , N = b.searchParams.get(k) || "";
                        if (G !== N)
                            return !1
                    }
                    return !0
                }
                )()
            } catch (v) {
                console.error(v)
            }
            const d = c?.searchParams
              , p = f?.searchParams
              , h = g?.searchParams;
            await be({
                event: "PaymentSucceed",
                amount: e.amount,
                currencyCode: n,
                orderID: e.orderID,
                category: "click",
                PageType: "TransactionPage",
                time: new Date().getTime(),
                triggerTags: l,
                createRoleADDetail: {
                    appPlatform: p?.get("platform") || "",
                    appSource: p?.get("utm_source") || "",
                    appCampaign: p?.get("utm_campaign") || "",
                    appAdGroup: p?.get("utm_adgroup") || "",
                    appKeyword: p?.get("utm_keyword") || "",
                    time: m
                },
                lastADDetail: {
                    appPlatform: h?.get("platform") || "",
                    appSource: h?.get("utm_source") || "",
                    appCampaign: h?.get("utm_campaign") || "",
                    appAdGroup: h?.get("utm_adgroup") || "",
                    appKeyword: h?.get("utm_keyword") || "",
                    time: u
                },
                ProductTransactionProducts: [{
                    id: i,
                    price: e.amount,
                    quantity: 1
                }],
                TransactionID: e.orderID,
                isAppFirst: e.isAppFirst,
                isAppPageUrlSame: s,
                lastPaymentTime: e.lastPaymentTime,
                appPlatform: d?.get("platform") || "",
                appSource: d?.get("utm_source") || "",
                appCampaign: d?.get("utm_campaign") || "",
                appKeyword: d?.get("utm_keyword") || "",
                paymentCode: r,
                appid: i,
                ctwid: o
            }),
            await $g(e)
        }
    }
    )
}
function g0(e) {
    const {order: t} = e;
    if (!t)
        return;
    const r = e.currency || t?.items?.[0]?.currency;
    setTimeout(async () => {
        if (window.option.expflags?.disableGtmMessageListener) {
            let n = !1;
            const a = await qt();
            try {
                n = ( () => {
                    const c = new URL(window.location.href)
                      , g = a || new URL(window.location.origin)
                      , f = ["platform", "utm_source", "utm_campaign", "utm_adgroup", "utm_keyword"];
                    for (let m = 0, u = f.length; m < u; m += 1) {
                        const l = f[m]
                          , d = c.searchParams.get(l) || ""
                          , p = g.searchParams.get(l) || "";
                        if (d !== p)
                            return !1
                    }
                    return !0
                }
                )()
            } catch (c) {
                console.error(c)
            }
            const o = a?.searchParams
              , i = await Ce()
              , {aud: s} = i;
            await be({
                event: "PaymentBegin",
                amount: e.amount,
                currencyCode: r,
                orderID: e.orderID,
                category: "click",
                PageType: "TransactionPage",
                ProductTransactionProducts: [{
                    id: s,
                    price: e.amount,
                    quantity: 1
                }],
                TransactionID: e.orderID,
                isAppFirst: e.isAppFirst,
                isAppPageUrlSame: n,
                appPlatform: o?.get("platform") || "",
                appSource: o?.get("utm_source") || "",
                appKeyword: o?.get("utm_keyword") || ""
            }),
            await Ig(e)
        }
    }
    )
}
function Lg() {
    const e = Object.assign({}, ...window.dataLayer || []);
    window.option.expflags?.disableGtmMessageListener && be({
        event: "CreateRole",
        platform: e.dl_platformid,
        appid: e.dl_appid,
        category: "click",
        PageType: "ProductPage",
        ProductID: e.dl_appid,
        is_first_pay: void 0
    })
}
async function Mg(e) {
    const [t,r] = await Promise.all([ia(), qt()])
      , n = r || new URL(window.location.origin)
      , a = ms("trigger_", t);
    let o = null
      , i = -1;
    for (let c = 0; c < t.length; c += 1)
        t[c].tagKey === "createrole_ad_url" && (o = new URL(t[c].tagValue),
        i = t[c].updated);
    const s = o?.searchParams;
    be({
        event: "level_up",
        level: e,
        createRoleADDetail: {
            appPlatform: s?.get("platform") || "",
            appSource: s?.get("utm_source") || "",
            appCampaign: s?.get("utm_campaign") || "",
            appAdGroup: s?.get("utm_adgroup") || "",
            appKeyword: s?.get("utm_keyword") || "",
            time: i
        },
        triggerTags: a,
        appPlatform: n.searchParams.get("platform") || "",
        appSource: n.searchParams.get("utm_source") || "",
        appCampaign: n.searchParams.get("utm_campaign") || "",
        appAdgroup: n.searchParams.get("utm_adgroup") || "",
        appKeyword: n.searchParams.get("utm_keyword") || ""
    })
}
function kg(e) {
    F.dispatch(Bi.actions.setCookieEnabled({
        cookieEnabled: e
    }))
}
function Yr(e) {
    const t = document.createElement("img");
    return t.height = 1,
    t.width = 1,
    t.src = e,
    t
}
const Dg = bt( (e, t, r, n) => {
    if (e !== "g_register" && e !== "g_login" && e !== "g_createrole") {
        console.error(new Error(`Invalid event type: ${e}`));
        return
    }
    if (!t) {
        console.error(new Error(`Invalid appId: ${t}`));
        return
    }
    Yr(`/stats?k=g_event&t=${e}&a=${t}&img=1`),
    ee.post("/api/v1/session_log", {
        kind: "succeed",
        gameServerId: n.gameServerId,
        gameUserId: n.gameUserId,
        roleId: n.roleId,
        roleName: n.roleName
    }, {
        headers: {
            Authorization: `Bearer ${r}`
        }
    })
}
)
  , Gg = ["g_init", "g_register", "g_login", "g_createrole", "g_tutorial", "g_logout", "g_obtain", "g_consumption", "g_transaction", "g_comsumption", "g_view", "g_heartbeat", "g_active", "g_click", "g_levelup", "g_payrequest", "g_payend", "g_milestone", "misc_flashlaunch_*"]
  , hs = {
    ChannelRpcRequest: "@channel-rpc/REQUEST",
    ChannelRpcResponse: "@channel-rpc/RESPONSE"
};
function Ng(e) {
    return e && e.type === hs.ChannelRpcRequest
}
function Ug(e) {
    return e && e.jsonrpc === "2.0" && typeof e.method == "string"
}
let vs = !1;
try {
    vs = !!localStorage.getItem("channel-rpc-debug")
} catch {}
function je(...e) {
    vs && console.log(...e)
}
const nn = {
    InvalidRequest: {
        code: -32600,
        message: "Invalid Request"
    },
    MethodNotFound: {
        code: -32601,
        message: "Method not found"
    },
    InternalError: {
        code: -32603,
        message: "Internal error"
    },
    Timeout: {
        code: -32e3,
        message: "Timeout"
    }
};
function an(e, t) {
    return {
        jsonrpc: "2.0",
        error: {
            code: e.code,
            message: e.message
        },
        id: t
    }
}
class jg {
    constructor(t) {
        this._unlisten = void 0,
        this._handleMessage = i => {
            if (!(!Ng(i.data) || i.data.channelId !== this.channelId)) {
                if (this.allowOrigins.length > 0 && this.allowOrigins.indexOf(i.origin) === -1)
                    throw new Error(`[CHANNEL_RPC_SERVER][channel=${this.channelId}] Invalid origin: ${i.origin}`);
                if (!i.source) {
                    je(`[CHANNEL_RPC_SERVER][channel=${this.channelId}] event.source is null`, i);
                    return
                }
                je(`[CHANNEL_RPC_SERVER][channel=${this.channelId}] RECEIVE_REQUEST`, i.data),
                this._handleRpcRequest(i.source, i.data.payload)
            }
        }
        ;
        const {allowOrigins: r, channelId: n, handler: a} = t;
        if (!n)
            throw new Error("id is required");
        this.channelId = n,
        this.allowOrigins = r && r.indexOf("*") === -1 ? r : [],
        this._handlers = {};
        const o = a || {};
        Object.keys(o).forEach(i => {
            const s = o[i];
            typeof s == "function" && (this._handlers[i] = s.bind(o))
        }
        )
    }
    start() {
        if (this._unlisten)
            return;
        const t = typeof globalThis == "object" ? globalThis : window;
        t.addEventListener("message", this._handleMessage),
        this._unlisten = () => {
            t.removeEventListener("message", this._handleMessage)
        }
    }
    stop() {
        this._unlisten && (this._unlisten(),
        this._unlisten = void 0)
    }
    async _sendResponse(t, r) {
        const n = {
            type: hs.ChannelRpcResponse,
            channelId: this.channelId,
            payload: r
        };
        t.postMessage(n, {
            targetOrigin: "*"
        })
    }
    async _handleRpcRequest(t, r) {
        if (je(`[CHANNEL_RPC_SERVER][channel=${this.channelId}] HANDLE_REQUEST_RPC`, r),
        !Ug(r)) {
            const a = an(nn.InvalidRequest, r.id || null);
            je(`[CHANNEL_RPC_SERVER][channel=${this.channelId}] reply`, a),
            this._sendResponse(t, a);
            return
        }
        je(`[CHANNEL_RPC_SERVER][channel=${this.channelId}] HANDLE_REQUEST_RPC method[${r.method}]`, this._handlers, r);
        const n = this._handlers[r.method];
        if (!n) {
            const a = an(nn.MethodNotFound, r.id || null);
            je(`[CHANNEL_RPC_SERVER][channel=${this.channelId}] SEND_RESPONSE`, a),
            this._sendResponse(t, a);
            return
        }
        try {
            const o = {
                jsonrpc: "2.0",
                result: await n(...r.params || []),
                id: r.id
            };
            je(`[CHANNEL_RPC_SERVER][channel=${this.channelId}] SEND_RESPONSE`, o),
            this._sendResponse(t, o)
        } catch {
            const o = an(nn.InternalError, r.id || null);
            je(`[CHANNEL_RPC_SERVER][channel=${this.channelId}] SEND_RESPONSE`, o),
            this._sendResponse(t, o)
        }
    }
}
const Nt = typeof Date.now == "function" ? Date.now : () => new Date().getTime();
class Fg extends Error {
    constructor(t) {
        super(t.statusText),
        this.name = "HTTPError",
        this.response = t
    }
}
function ws(e) {
    if (!e.ok)
        throw new Fg(e);
    return e
}
async function m0(e) {
    return (await fetch(`${J.SHD_G123_GAME_URL}/api/share`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(e),
        credentials: "include",
        mode: "same-origin"
    }).then(ws)).text()
}
async function Bg(e) {
    try {
        return await (await fetch(`${J.SHD_G123_GAME_URL}/api/share?code=${e}`).then(ws)).json()
    } catch (t) {
        return console.error(t),
        null
    }
}
function go() {
    throw new Error("undefined")
}
function Hg() {
    let e = go
      , t = go;
    const r = new Promise( (n, a) => {
        e = n,
        t = a
    }
    );
    return {
        resolve: e,
        reject: t,
        promise: r
    }
}
const ha = "iframe-game"
  , Wg = ["platform", "bid", "ver", "ctw_share_id", "ctw_share_extra", "app", "utm_medium", "utm_campaign"]
  , Vg = "sdk_mode"
  , ys = {
    USE_QUERY: "0",
    USE_CHANNEL: "1",
    CHANNEL_ONLY: "2"
};
let se = document.getElementById(ha)
  , dr = "0";
function qg(e) {
    const t = e.searchParams.get(Vg);
    if (t && ["0", "1", "2"].indexOf(t) !== -1) {
        dr = t;
        return
    }
    const {sdkMode: r} = window.option;
    if (r && ["0", "1", "2"].indexOf(r) !== -1) {
        dr = r;
        return
    }
    dr = "0"
}
function bs() {
    return dr
}
let Dn = "";
function mo() {
    return Dn
}
function Kg(e) {
    if (Dn || !e)
        return;
    Dn = new URL(e).origin
}
let on;
function _s(e=!1) {
    return (!on || e) && (on = new URL(window.location.href)),
    on
}
async function Yg() {
    const t = await Bt().currentSession();
    if (!t)
        throw new Error("Session is unavailable");
    const {code: r} = t;
    if (!r)
        throw new Error("Code is unavailable");
    const n = {
        platform: "ctw"
    }
      , a = _s()
      , o = a.searchParams;
    a.searchParams.forEach( (g, f) => {
        const m = f.toLowerCase();
        Wg.includes(m) && (n[m] = g)
    }
    );
    const i = o.get("ctw_share_code");
    if (i)
        try {
            const g = await Bg(i);
            g && (g.ctw_share_id && (n.ctw_share_id = g.ctw_share_id),
            g.ctw_share_extra && (n.ctw_share_extra = g.ctw_share_extra))
        } catch (g) {
            console.error(g)
        }
    const s = await Ce()
      , c = {
        region: s.region ? s.region.toLowerCase() : "ja",
        country: s.country,
        lang: s.lang
    };
    return {
        gameParams: {
            code: r,
            params: {
                ...n,
                lang: c.lang || "ja"
            },
            env: window.option.runEnv
        },
        entryParams: {
            __gp_region: c.region,
            sdk_mode: bs()
        }
    }
}
let Ot;
async function Es() {
    return Ot || (Ot = Yg(),
    Ot.catch( () => {
        Ot = void 0
    }
    )),
    Ot
}
async function zg(e) {
    const {entryParams: t, gameParams: r} = await Es()
      , n = new URL(e);
    return t.sdk_mode === ys.CHANNEL_ONLY ? (Object.entries(t).forEach( ([o,i]) => {
        n.searchParams.set(o, i)
    }
    ),
    n.searchParams.sort(),
    n.href) : (n.searchParams.set("code", r.code),
    Object.entries({
        ...r.params,
        ...t
    }).forEach( ([o,i]) => {
        n.searchParams.set(o, i)
    }
    ),
    n.searchParams.sort(),
    n.href)
}
const Xg = bt( () => {
    !window.perf.start || !window.perf.app_start || !window.perf.game_loading || (Yr(`/stats?k=perf&t=game_loading&a=${window.option.appId}&d=${window.perf.game_loading - window.perf.app_start}&img=1`),
    console.info("[Perf] Loading", window.perf.game_loading - window.perf.start))
}
)
  , Jg = bt( () => {
    !window.perf.game_loaded || !window.perf.game_loading || (Yr(`/stats?k=perf&t=game_loaded&a=${window.option.appId}&d=${window.perf.game_loaded - window.perf.game_loading}&img=1`),
    console.info("[Perf] Loaded", window.perf.game_loaded - window.perf.game_loading))
}
);
async function sn(e=!1) {
    const t = await Bt().currentSession();
    if (!t)
        throw new Error("currentSession is unavailable");
    const {idCallback: r} = window.option
      , {code: n} = t;
    if (!r)
        throw new Error(`Invalid idCallback[${r}] or code [${n}]`);
    if (n === Ni) {
        console.error(new Error(`user: ${n} has been blocked!`));
        return
    }
    const a = !se;
    a && (se = document.createElement("iframe"),
    se.id = ha,
    se.allow = "autoplay; screen-wake-lock");
    const o = e && window.perf && window.perf.app_start;
    o && (window.perf.game_loading = window.perf.game_loading || Nt(),
    setTimeout(Xg));
    const i = await zg(r);
    if (!se)
        throw new Error(`gameIframe is ${se}`);
    if (se.src === i)
        return;
    const s = Hg();
    se.onload = function() {
        s.resolve()
    }
    ,
    se.onerror = (c, g, f, m, u) => {
        console.error("gameIframe.onerror", c, g, f, m, u),
        u && u instanceof Error && s.reject(u)
    }
    ,
    Kg(i),
    se.src = i,
    a && se && document.body.insertBefore(se, document.getElementById("float-icon")),
    await s.promise.then( () => {
        window.perf.game_loaded = window.perf.game_loaded || Nt(),
        o && setTimeout(Jg),
        zi({
            action: "p_game_loaded",
            data: {
                display_name: window.option.userId,
                providers: window.option.providers
            }
        })
    }
    )
}
function Ss(e) {
    se = document.getElementById(ha),
    se?.contentWindow?.postMessage(e, "*")
}
let un;
async function Qg(e) {
    if (un)
        throw new Error("ChannelServer has been started");
    const t = `${br.gameStoragePrefix}:${e}`
      , r = {
        sendPayment: n => {
            window.postMessage({
                type: "PspCommand",
                action: "EnterPayment",
                ...n
            })
        }
        ,
        saveData: n => {
            An().setItem(t, n)
        }
        ,
        restoreData: () => An().getItem(t) || "",
        getPlatformParams: async () => (await Es()).gameParams
    };
    un = new jg({
        channelId: "cp-channel",
        handler: r
    }),
    un.start()
}
function Zg({data: e}) {
    if (!e) {
        console.error("Empty in-game account", e);
        return
    }
    F.dispatch(ga.actions.updateByInformEvent(e))
}
function em({data: e, action: t}) {
    if (tg(e) || ds(e))
        F.dispatch(ga.actions.updateByGEvent(e));
    else {
        if (t === "g_init")
            return;
        const r = new Error(`INVALID_GEVENT[${JSON.stringify({
            data: e,
            action: t
        })}]`);
        throw window.Sentry?.captureException(r),
        r
    }
}
function tm(e) {
    kg(!e.data.disabled)
}
function rm(e) {
    setTimeout( () => {
        Lg()
    }
    )
}
function nm(e) {
    if (!dg(e)) {
        const r = new Error("Invalid PSP Monitor Event");
        throw console.error(r, JSON.stringify(e)),
        r
    }
    const {payload: t} = e;
    t.type === "sdk" ? F.dispatch(xr.actions.updateSdkStatus(t)) : F.dispatch(xr.actions.updateAppStatus(t))
}
function am(e) {
    let t;
    if (e.data) {
        if (typeof e.data == "object" && (t = e.data),
        !t && typeof e.data == "string")
            try {
                t = JSON.parse(e.data)
            } catch {}
        if (t) {
            if (t.event === "CreateRole") {
                rm();
                return
            }
            if (t.event === "PaymentSdkMonitor") {
                nm(t);
                return
            }
            switch (t.action) {
            case "inform":
                Zg(t);
                break;
            case "cookie_disabled_check":
                tm(t);
                break;
            case "EnterPayment":
                F.dispatch(fg(t.orderNo)),
                Pr({
                    version: "v2",
                    action: "g_payinit",
                    data: {
                        custom: {
                            type: t.type,
                            order_no: t.orderNo
                        }
                    }
                });
                break;
            default:
                if (t.action?.startsWith("g_") && em(t),
                (t.action === "g_register" || t.action === "g_login" || t.action === "g_createrole") && (F.dispatch($c({
                    gameLoginOrRegisterAt: Date.now()
                })),
                Nr( () => import("./game-002cea5b-8c6ebda4.js"), ["assets/game-002cea5b-8c6ebda4.js", "assets/game-7d3aeba4-9663a940.js", "assets/index-a2552029.css", "assets/game-d8b296a6-de833af9.js", "assets/game-6284db59-e69f3d6c.js"]),
                Dg(t.action, window.option.appId, window.option.code, {
                    gameServerId: `${t.data?.game_server_id || ""}`,
                    gameUserId: `${t.data?.game_user_id || ""}`,
                    roleId: `${t.data?.role?.id || t.data?.role_id || ""}`,
                    roleName: `${t.data?.role?.name || t.data?.role_name || ""}`
                }),
                window.option.gameServerId = t.data?.game_server_id,
                window.option.gameUserId = t.data?.game_user_id),
                Gg.findIndex(r => {
                    const n = t.action || "";
                    return !!(r === n || r.endsWith("*") && n.startsWith(r.slice(0, -1)))
                }
                ) !== -1)
                    if (mo() !== e.origin && window.option.appId !== "seirei") {
                        const r = new Error(`Game origin mismatch, gameOrigin: ${mo()}, eventOrigin: ${e.origin}`);
                        window.Sentry?.captureException(r)
                    } else
                        Pr(t);
                break
            }
        }
    }
}
let ho = !1;
function om() {
    ho || (ho = !0,
    window.addEventListener("message", am, !1))
}
const im = "#000000";
function sm() {
    const e = document.head.querySelector('[name="theme-color"]');
    e && e.setAttribute("content", im)
}
function vo(e, t, r, n, a, o, i) {
    try {
        var s = e[o](i)
          , c = s.value
    } catch (g) {
        r(g);
        return
    }
    s.done ? t(c) : Promise.resolve(c).then(n, a)
}
function H(e) {
    return function() {
        var t = this
          , r = arguments;
        return new Promise(function(n, a) {
            var o = e.apply(t, r);
            function i(c) {
                vo(o, n, a, i, s, "next", c)
            }
            function s(c) {
                vo(o, n, a, i, s, "throw", c)
            }
            i(void 0)
        }
        )
    }
}
function um() {}
var cm = um;
const Ir = ge(cm);
function lm(e, t) {
    if (e == null)
        return {};
    var r = {}, n = Object.keys(e), a, o;
    for (o = 0; o < n.length; o++)
        a = n[o],
        !(t.indexOf(a) >= 0) && (r[a] = e[a]);
    return r
}
function dm(e, t) {
    if (e == null)
        return {};
    var r = lm(e, t), n, a;
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        for (a = 0; a < o.length; a++)
            n = o[a],
            !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
    }
    return r
}
function fm(e) {
    if (Array.isArray(e))
        return fc(e)
}
function pm() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function Ve(e) {
    return fm(e) || pc(e) || gc(e) || pm()
}
var Ps = {
    exports: {}
}
  , As = {
    exports: {}
};
(function(e) {
    function t(r) {
        "@babel/helpers - typeof";
        return e.exports = t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
            return typeof n
        }
        : function(n) {
            return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
        }
        ,
        e.exports.__esModule = !0,
        e.exports.default = e.exports,
        t(r)
    }
    e.exports = t,
    e.exports.__esModule = !0,
    e.exports.default = e.exports
}
)(As);
var gm = As.exports;
(function(e) {
    var t = gm.default;
    function r() {
        e.exports = r = function() {
            return a
        }
        ,
        e.exports.__esModule = !0,
        e.exports.default = e.exports;
        var n, a = {}, o = Object.prototype, i = o.hasOwnProperty, s = Object.defineProperty || function(P, w, _) {
            P[w] = _.value
        }
        , c = typeof Symbol == "function" ? Symbol : {}, g = c.iterator || "@@iterator", f = c.asyncIterator || "@@asyncIterator", m = c.toStringTag || "@@toStringTag";
        function u(P, w, _) {
            return Object.defineProperty(P, w, {
                value: _,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }),
            P[w]
        }
        try {
            u({}, "")
        } catch {
            u = function(_, x, R) {
                return _[x] = R
            }
        }
        function l(P, w, _, x) {
            var R = w && w.prototype instanceof S ? w : S
              , I = Object.create(R.prototype)
              , B = new te(x || []);
            return s(I, "_invoke", {
                value: oe(P, _, B)
            }),
            I
        }
        function d(P, w, _) {
            try {
                return {
                    type: "normal",
                    arg: P.call(w, _)
                }
            } catch (x) {
                return {
                    type: "throw",
                    arg: x
                }
            }
        }
        a.wrap = l;
        var p = "suspendedStart"
          , h = "suspendedYield"
          , v = "executing"
          , A = "completed"
          , b = {};
        function S() {}
        function O() {}
        function y() {}
        var k = {};
        u(k, g, function() {
            return this
        });
        var G = Object.getPrototypeOf
          , N = G && G(G(me([])));
        N && N !== o && i.call(N, g) && (k = N);
        var X = y.prototype = S.prototype = Object.create(k);
        function le(P) {
            ["next", "throw", "return"].forEach(function(w) {
                u(P, w, function(_) {
                    return this._invoke(w, _)
                })
            })
        }
        function re(P, w) {
            function _(R, I, B, z) {
                var q = d(P[R], P, I);
                if (q.type !== "throw") {
                    var de = q.arg
                      , ae = de.value;
                    return ae && t(ae) == "object" && i.call(ae, "__await") ? w.resolve(ae.__await).then(function(fe) {
                        _("next", fe, B, z)
                    }, function(fe) {
                        _("throw", fe, B, z)
                    }) : w.resolve(ae).then(function(fe) {
                        de.value = fe,
                        B(de)
                    }, function(fe) {
                        return _("throw", fe, B, z)
                    })
                }
                z(q.arg)
            }
            var x;
            s(this, "_invoke", {
                value: function(I, B) {
                    function z() {
                        return new w(function(q, de) {
                            _(I, B, q, de)
                        }
                        )
                    }
                    return x = x ? x.then(z, z) : z()
                }
            })
        }
        function oe(P, w, _) {
            var x = p;
            return function(R, I) {
                if (x === v)
                    throw Error("Generator is already running");
                if (x === A) {
                    if (R === "throw")
                        throw I;
                    return {
                        value: n,
                        done: !0
                    }
                }
                for (_.method = R,
                _.arg = I; ; ) {
                    var B = _.delegate;
                    if (B) {
                        var z = V(B, _);
                        if (z) {
                            if (z === b)
                                continue;
                            return z
                        }
                    }
                    if (_.method === "next")
                        _.sent = _._sent = _.arg;
                    else if (_.method === "throw") {
                        if (x === p)
                            throw x = A,
                            _.arg;
                        _.dispatchException(_.arg)
                    } else
                        _.method === "return" && _.abrupt("return", _.arg);
                    x = v;
                    var q = d(P, w, _);
                    if (q.type === "normal") {
                        if (x = _.done ? A : h,
                        q.arg === b)
                            continue;
                        return {
                            value: q.arg,
                            done: _.done
                        }
                    }
                    q.type === "throw" && (x = A,
                    _.method = "throw",
                    _.arg = q.arg)
                }
            }
        }
        function V(P, w) {
            var _ = w.method
              , x = P.iterator[_];
            if (x === n)
                return w.delegate = null,
                _ === "throw" && P.iterator.return && (w.method = "return",
                w.arg = n,
                V(P, w),
                w.method === "throw") || _ !== "return" && (w.method = "throw",
                w.arg = new TypeError("The iterator does not provide a '" + _ + "' method")),
                b;
            var R = d(x, P.iterator, w.arg);
            if (R.type === "throw")
                return w.method = "throw",
                w.arg = R.arg,
                w.delegate = null,
                b;
            var I = R.arg;
            return I ? I.done ? (w[P.resultName] = I.value,
            w.next = P.nextLoc,
            w.method !== "return" && (w.method = "next",
            w.arg = n),
            w.delegate = null,
            b) : I : (w.method = "throw",
            w.arg = new TypeError("iterator result is not an object"),
            w.delegate = null,
            b)
        }
        function xe(P) {
            var w = {
                tryLoc: P[0]
            };
            1 in P && (w.catchLoc = P[1]),
            2 in P && (w.finallyLoc = P[2],
            w.afterLoc = P[3]),
            this.tryEntries.push(w)
        }
        function ne(P) {
            var w = P.completion || {};
            w.type = "normal",
            delete w.arg,
            P.completion = w
        }
        function te(P) {
            this.tryEntries = [{
                tryLoc: "root"
            }],
            P.forEach(xe, this),
            this.reset(!0)
        }
        function me(P) {
            if (P || P === "") {
                var w = P[g];
                if (w)
                    return w.call(P);
                if (typeof P.next == "function")
                    return P;
                if (!isNaN(P.length)) {
                    var _ = -1
                      , x = function R() {
                        for (; ++_ < P.length; )
                            if (i.call(P, _))
                                return R.value = P[_],
                                R.done = !1,
                                R;
                        return R.value = n,
                        R.done = !0,
                        R
                    };
                    return x.next = x
                }
            }
            throw new TypeError(t(P) + " is not iterable")
        }
        return O.prototype = y,
        s(X, "constructor", {
            value: y,
            configurable: !0
        }),
        s(y, "constructor", {
            value: O,
            configurable: !0
        }),
        O.displayName = u(y, m, "GeneratorFunction"),
        a.isGeneratorFunction = function(P) {
            var w = typeof P == "function" && P.constructor;
            return !!w && (w === O || (w.displayName || w.name) === "GeneratorFunction")
        }
        ,
        a.mark = function(P) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(P, y) : (P.__proto__ = y,
            u(P, m, "GeneratorFunction")),
            P.prototype = Object.create(X),
            P
        }
        ,
        a.awrap = function(P) {
            return {
                __await: P
            }
        }
        ,
        le(re.prototype),
        u(re.prototype, f, function() {
            return this
        }),
        a.AsyncIterator = re,
        a.async = function(P, w, _, x, R) {
            R === void 0 && (R = Promise);
            var I = new re(l(P, w, _, x),R);
            return a.isGeneratorFunction(w) ? I : I.next().then(function(B) {
                return B.done ? B.value : I.next()
            })
        }
        ,
        le(X),
        u(X, m, "Generator"),
        u(X, g, function() {
            return this
        }),
        u(X, "toString", function() {
            return "[object Generator]"
        }),
        a.keys = function(P) {
            var w = Object(P)
              , _ = [];
            for (var x in w)
                _.push(x);
            return _.reverse(),
            function R() {
                for (; _.length; ) {
                    var I = _.pop();
                    if (I in w)
                        return R.value = I,
                        R.done = !1,
                        R
                }
                return R.done = !0,
                R
            }
        }
        ,
        a.values = me,
        te.prototype = {
            constructor: te,
            reset: function(w) {
                if (this.prev = 0,
                this.next = 0,
                this.sent = this._sent = n,
                this.done = !1,
                this.delegate = null,
                this.method = "next",
                this.arg = n,
                this.tryEntries.forEach(ne),
                !w)
                    for (var _ in this)
                        _.charAt(0) === "t" && i.call(this, _) && !isNaN(+_.slice(1)) && (this[_] = n)
            },
            stop: function() {
                this.done = !0;
                var w = this.tryEntries[0].completion;
                if (w.type === "throw")
                    throw w.arg;
                return this.rval
            },
            dispatchException: function(w) {
                if (this.done)
                    throw w;
                var _ = this;
                function x(de, ae) {
                    return B.type = "throw",
                    B.arg = w,
                    _.next = de,
                    ae && (_.method = "next",
                    _.arg = n),
                    !!ae
                }
                for (var R = this.tryEntries.length - 1; R >= 0; --R) {
                    var I = this.tryEntries[R]
                      , B = I.completion;
                    if (I.tryLoc === "root")
                        return x("end");
                    if (I.tryLoc <= this.prev) {
                        var z = i.call(I, "catchLoc")
                          , q = i.call(I, "finallyLoc");
                        if (z && q) {
                            if (this.prev < I.catchLoc)
                                return x(I.catchLoc, !0);
                            if (this.prev < I.finallyLoc)
                                return x(I.finallyLoc)
                        } else if (z) {
                            if (this.prev < I.catchLoc)
                                return x(I.catchLoc, !0)
                        } else {
                            if (!q)
                                throw Error("try statement without catch or finally");
                            if (this.prev < I.finallyLoc)
                                return x(I.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function(w, _) {
                for (var x = this.tryEntries.length - 1; x >= 0; --x) {
                    var R = this.tryEntries[x];
                    if (R.tryLoc <= this.prev && i.call(R, "finallyLoc") && this.prev < R.finallyLoc) {
                        var I = R;
                        break
                    }
                }
                I && (w === "break" || w === "continue") && I.tryLoc <= _ && _ <= I.finallyLoc && (I = null);
                var B = I ? I.completion : {};
                return B.type = w,
                B.arg = _,
                I ? (this.method = "next",
                this.next = I.finallyLoc,
                b) : this.complete(B)
            },
            complete: function(w, _) {
                if (w.type === "throw")
                    throw w.arg;
                return w.type === "break" || w.type === "continue" ? this.next = w.arg : w.type === "return" ? (this.rval = this.arg = w.arg,
                this.method = "return",
                this.next = "end") : w.type === "normal" && _ && (this.next = _),
                b
            },
            finish: function(w) {
                for (var _ = this.tryEntries.length - 1; _ >= 0; --_) {
                    var x = this.tryEntries[_];
                    if (x.finallyLoc === w)
                        return this.complete(x.completion, x.afterLoc),
                        ne(x),
                        b
                }
            },
            catch: function(w) {
                for (var _ = this.tryEntries.length - 1; _ >= 0; --_) {
                    var x = this.tryEntries[_];
                    if (x.tryLoc === w) {
                        var R = x.completion;
                        if (R.type === "throw") {
                            var I = R.arg;
                            ne(x)
                        }
                        return I
                    }
                }
                throw Error("illegal catch attempt")
            },
            delegateYield: function(w, _, x) {
                return this.delegate = {
                    iterator: me(w),
                    resultName: _,
                    nextLoc: x
                },
                this.method === "next" && (this.arg = n),
                b
            }
        },
        a
    }
    e.exports = r,
    e.exports.__esModule = !0,
    e.exports.default = e.exports
}
)(Ps);
var mm = Ps.exports
  , fr = mm()
  , hm = fr;
try {
    regeneratorRuntime = fr
} catch {
    typeof globalThis == "object" ? globalThis.regeneratorRuntime = fr : Function("r", "regeneratorRuntime = r")(fr)
}
const $ = ge(hm);
var vm = Object.freeze({
    __proto__: null,
    get start() {
        return Vs
    },
    get ensureJQuerySupport() {
        return Ds
    },
    get setBootstrapMaxTime() {
        return Pm
    },
    get setMountMaxTime() {
        return Am
    },
    get setUnmountMaxTime() {
        return Tm
    },
    get setUnloadMaxTime() {
        return Om
    },
    get registerApplication() {
        return Rm
    },
    get unregisterApplication() {
        return Bs
    },
    get getMountedApps() {
        return Ns
    },
    get getAppStatus() {
        return js
    },
    get unloadApplication() {
        return Hs
    },
    get checkActivityFunctions() {
        return Fs
    },
    get getAppNames() {
        return Us
    },
    get pathToActiveWhen() {
        return Ws
    },
    get navigateToUrl() {
        return wa
    },
    get triggerAppChange() {
        return Lm
    },
    get addErrorHandler() {
        return wm
    },
    get removeErrorHandler() {
        return ym
    },
    get mountRootParcel() {
        return $s
    },
    get NOT_LOADED() {
        return ke
    },
    get LOADING_SOURCE_CODE() {
        return zr
    },
    get NOT_BOOTSTRAPPED() {
        return gt
    },
    get BOOTSTRAPPING() {
        return Ts
    },
    get NOT_MOUNTED() {
        return De
    },
    get MOUNTING() {
        return bm
    },
    get UPDATING() {
        return Os
    },
    get LOAD_ERROR() {
        return mt
    },
    get MOUNTED() {
        return _e
    },
    get UNLOADING() {
        return Gn
    },
    get UNMOUNTING() {
        return Cs
    },
    get SKIP_BECAUSE_BROKEN() {
        return Z
    }
});
function Oe(e) {
    return (Oe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
        return typeof t
    }
    : function(t) {
        return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }
    )(e)
}
function ar(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r,
    e
}
var wo = (typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}).CustomEvent
  , Fe = function() {
    try {
        var e = new wo("cat",{
            detail: {
                foo: "bar"
            }
        });
        return e.type === "cat" && e.detail.foo === "bar"
    } catch {}
    return !1
}() ? wo : typeof document < "u" && typeof document.createEvent == "function" ? function(e, t) {
    var r = document.createEvent("CustomEvent");
    return t ? r.initCustomEvent(e, t.bubbles, t.cancelable, t.detail) : r.initCustomEvent(e, !1, !1, void 0),
    r
}
: function(e, t) {
    var r = document.createEventObject();
    return r.type = e,
    t ? (r.bubbles = !!t.bubbles,
    r.cancelable = !!t.cancelable,
    r.detail = t.detail) : (r.bubbles = !1,
    r.cancelable = !1,
    r.detail = void 0),
    r
}
  , Ut = [];
function qe(e, t, r) {
    var n = pt(e, t, r);
    Ut.length ? Ut.forEach(function(a) {
        return a(n)
    }) : setTimeout(function() {
        throw n
    })
}
function wm(e) {
    if (typeof e != "function")
        throw Error(D(28, !1));
    Ut.push(e)
}
function ym(e) {
    if (typeof e != "function")
        throw Error(D(29, !1));
    var t = !1;
    return Ut = Ut.filter(function(r) {
        var n = r === e;
        return t = t || n,
        !n
    }),
    t
}
function D(e, t) {
    for (var r = arguments.length, n = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
        n[a - 2] = arguments[a];
    return "single-spa minified message #".concat(e, ": ").concat(t ? t + " " : "", "See https://single-spa.js.org/error/?code=").concat(e).concat(n.length ? "&arg=".concat(n.join("&arg=")) : "")
}
function pt(e, t, r) {
    var n, a = "".concat(Xr(t), " '").concat(Y(t), "' died in status ").concat(t.status, ": ");
    if (e instanceof Error) {
        try {
            e.message = a + e.message
        } catch {}
        n = e
    } else {
        console.warn(D(30, !1, t.status, Y(t)));
        try {
            n = Error(a + JSON.stringify(e))
        } catch {
            n = e
        }
    }
    return n.appOrParcelName = Y(t),
    t.status = r,
    n
}
var ke = "NOT_LOADED"
  , zr = "LOADING_SOURCE_CODE"
  , gt = "NOT_BOOTSTRAPPED"
  , Ts = "BOOTSTRAPPING"
  , De = "NOT_MOUNTED"
  , bm = "MOUNTING"
  , _e = "MOUNTED"
  , Os = "UPDATING"
  , Cs = "UNMOUNTING"
  , Gn = "UNLOADING"
  , mt = "LOAD_ERROR"
  , Z = "SKIP_BECAUSE_BROKEN";
function _m(e) {
    return e.status === _e
}
function Nn(e) {
    try {
        return e.activeWhen(window.location)
    } catch (t) {
        return qe(t, e, Z),
        !1
    }
}
function Y(e) {
    return e.name
}
function xs(e) {
    return !!e.unmountThisParcel
}
function Xr(e) {
    return xs(e) ? "parcel" : "application"
}
function zt() {
    for (var e = arguments.length - 1; e > 0; e--)
        for (var t in arguments[e])
            t !== "__proto__" && (arguments[e - 1][t] = arguments[e][t]);
    return arguments[0]
}
function Jr(e, t) {
    for (var r = 0; r < e.length; r++)
        if (t(e[r]))
            return e[r];
    return null
}
function et(e) {
    return e && (typeof e == "function" || (t = e,
    Array.isArray(t) && !Jr(t, function(r) {
        return typeof r != "function"
    })));
    var t
}
function Be(e, t) {
    var r = e[t] || [];
    (r = Array.isArray(r) ? r : [r]).length === 0 && (r = [function() {
        return Promise.resolve()
    }
    ]);
    var n = Xr(e)
      , a = Y(e);
    return function(o) {
        return r.reduce(function(i, s, c) {
            return i.then(function() {
                var g = s(o);
                return Is(g) ? g : Promise.reject(D(15, !1, n, a, t, c))
            })
        }, Promise.resolve())
    }
}
function Is(e) {
    return e && typeof e.then == "function" && typeof e.catch == "function"
}
function va(e, t) {
    return Promise.resolve().then(function() {
        return e.status !== gt ? e : (e.status = Ts,
        e.bootstrap ? Xt(e, "bootstrap").then(r).catch(function(n) {
            if (t)
                throw pt(n, e, Z);
            return qe(n, e, Z),
            e
        }) : Promise.resolve().then(r))
    });
    function r() {
        return e.status = De,
        e
    }
}
function Qr(e, t) {
    return Promise.resolve().then(function() {
        if (e.status !== _e)
            return e;
        e.status = Cs;
        var r = Object.keys(e.parcels).map(function(a) {
            return e.parcels[a].unmountThisParcel()
        });
        return Promise.all(r).then(n, function(a) {
            return n().then(function() {
                var o = Error(a.message);
                if (t)
                    throw pt(o, e, Z);
                qe(o, e, Z)
            })
        }).then(function() {
            return e
        });
        function n() {
            return Xt(e, "unmount").then(function() {
                e.status = De
            }).catch(function(a) {
                if (t)
                    throw pt(a, e, Z);
                qe(a, e, Z)
            })
        }
    })
}
var yo = !1
  , bo = !1;
function Un(e, t) {
    return Promise.resolve().then(function() {
        return e.status !== De ? e : (yo || (window.dispatchEvent(new Fe("single-spa:before-first-mount")),
        yo = !0),
        Xt(e, "mount").then(function() {
            return e.status = _e,
            bo || (window.dispatchEvent(new Fe("single-spa:first-mount")),
            bo = !0),
            e
        }).catch(function(r) {
            return e.status = _e,
            Qr(e, !0).then(n, n);
            function n() {
                if (t)
                    throw pt(r, e, Z);
                return qe(r, e, Z),
                e
            }
        }))
    })
}
var Em = 0
  , Sm = {
    parcels: {}
};
function $s() {
    return Rs.apply(Sm, arguments)
}
function Rs(e, t) {
    var r = this;
    if (!e || Oe(e) !== "object" && typeof e != "function")
        throw Error(D(2, !1));
    if (e.name && typeof e.name != "string")
        throw Error(D(3, !1, Oe(e.name)));
    if (Oe(t) !== "object")
        throw Error(D(4, !1, name, Oe(t)));
    if (!t.domElement)
        throw Error(D(5, !1, name));
    var n, a = Em++, o = typeof e == "function", i = o ? e : function() {
        return Promise.resolve(e)
    }
    , s = {
        id: a,
        parcels: {},
        status: o ? zr : gt,
        customProps: t,
        parentName: Y(r),
        unmountThisParcel: function() {
            return u.then(function() {
                if (s.status !== _e)
                    throw Error(D(6, !1, name, s.status));
                return Qr(s, !0)
            }).then(function(d) {
                return s.parentName && delete r.parcels[s.id],
                d
            }).then(function(d) {
                return g(d),
                d
            }).catch(function(d) {
                throw s.status = Z,
                f(d),
                d
            })
        }
    };
    r.parcels[a] = s;
    var c = i();
    if (!c || typeof c.then != "function")
        throw Error(D(7, !1));
    var g, f, m = (c = c.then(function(d) {
        if (!d)
            throw Error(D(8, !1));
        var p = d.name || "parcel-".concat(a);
        if (Object.prototype.hasOwnProperty.call(d, "bootstrap") && !et(d.bootstrap))
            throw Error(D(9, !1, p));
        if (!et(d.mount))
            throw Error(D(10, !1, p));
        if (!et(d.unmount))
            throw Error(D(11, !1, p));
        if (d.update && !et(d.update))
            throw Error(D(12, !1, p));
        var h = Be(d, "bootstrap")
          , v = Be(d, "mount")
          , A = Be(d, "unmount");
        s.status = gt,
        s.name = p,
        s.bootstrap = h,
        s.mount = v,
        s.unmount = A,
        s.timeouts = Ms(d.timeouts),
        d.update && (s.update = Be(d, "update"),
        n.update = function(b) {
            return s.customProps = b,
            Xe(function(S) {
                return Promise.resolve().then(function() {
                    if (S.status !== _e)
                        throw Error(D(32, !1, Y(S)));
                    return S.status = Os,
                    Xt(S, "update").then(function() {
                        return S.status = _e,
                        S
                    }).catch(function(O) {
                        throw pt(O, S, Z)
                    })
                })
            }(s))
        }
        )
    })).then(function() {
        return va(s, !0)
    }), u = m.then(function() {
        return Un(s, !0)
    }), l = new Promise(function(d, p) {
        g = d,
        f = p
    }
    );
    return n = {
        mount: function() {
            return Xe(Promise.resolve().then(function() {
                if (s.status !== De)
                    throw Error(D(13, !1, name, s.status));
                return r.parcels[a] = s,
                Un(s)
            }))
        },
        unmount: function() {
            return Xe(s.unmountThisParcel())
        },
        getStatus: function() {
            return s.status
        },
        loadPromise: Xe(c),
        bootstrapPromise: Xe(m),
        mountPromise: Xe(u),
        unmountPromise: Xe(l)
    }
}
function Xe(e) {
    return e.then(function() {
        return null
    })
}
function Ls(e) {
    var t = Y(e)
      , r = typeof e.customProps == "function" ? e.customProps(t, window.location) : e.customProps;
    (Oe(r) !== "object" || r === null || Array.isArray(r)) && (r = {},
    console.warn(D(40, !1), t, r));
    var n = zt({}, r, {
        name: t,
        mountParcel: Rs.bind(e),
        singleSpa: vm
    });
    return xs(e) && (n.unmountSelf = e.unmountThisParcel),
    n
}
var ht = {
    bootstrap: {
        millis: 4e3,
        dieOnTimeout: !1,
        warningMillis: 1e3
    },
    mount: {
        millis: 3e3,
        dieOnTimeout: !1,
        warningMillis: 1e3
    },
    unmount: {
        millis: 3e3,
        dieOnTimeout: !1,
        warningMillis: 1e3
    },
    unload: {
        millis: 3e3,
        dieOnTimeout: !1,
        warningMillis: 1e3
    },
    update: {
        millis: 3e3,
        dieOnTimeout: !1,
        warningMillis: 1e3
    }
};
function Pm(e, t, r) {
    if (typeof e != "number" || e <= 0)
        throw Error(D(16, !1));
    ht.bootstrap = {
        millis: e,
        dieOnTimeout: t,
        warningMillis: r || 1e3
    }
}
function Am(e, t, r) {
    if (typeof e != "number" || e <= 0)
        throw Error(D(17, !1));
    ht.mount = {
        millis: e,
        dieOnTimeout: t,
        warningMillis: r || 1e3
    }
}
function Tm(e, t, r) {
    if (typeof e != "number" || e <= 0)
        throw Error(D(18, !1));
    ht.unmount = {
        millis: e,
        dieOnTimeout: t,
        warningMillis: r || 1e3
    }
}
function Om(e, t, r) {
    if (typeof e != "number" || e <= 0)
        throw Error(D(19, !1));
    ht.unload = {
        millis: e,
        dieOnTimeout: t,
        warningMillis: r || 1e3
    }
}
function Xt(e, t) {
    var r = e.timeouts[t]
      , n = r.warningMillis
      , a = Xr(e);
    return new Promise(function(o, i) {
        var s = !1
          , c = !1;
        e[t](Ls(e)).then(function(m) {
            s = !0,
            o(m)
        }).catch(function(m) {
            s = !0,
            i(m)
        }),
        setTimeout(function() {
            return f(1)
        }, n),
        setTimeout(function() {
            return f(!0)
        }, r.millis);
        var g = D(31, !1, t, a, Y(e), r.millis);
        function f(m) {
            if (!s) {
                if (m === !0)
                    c = !0,
                    r.dieOnTimeout ? i(Error(g)) : console.error(g);
                else if (!c) {
                    var u = m
                      , l = u * n;
                    console.warn(g),
                    l + n < r.millis && setTimeout(function() {
                        return f(u + 1)
                    }, n)
                }
            }
        }
    }
    )
}
function Ms(e) {
    var t = {};
    for (var r in ht)
        t[r] = zt({}, ht[r], e && e[r] || {});
    return t
}
function jn(e) {
    return Promise.resolve().then(function() {
        return e.loadPromise ? e.loadPromise : e.status !== ke && e.status !== mt ? e : (e.status = zr,
        e.loadPromise = Promise.resolve().then(function() {
            var n = e.loadApp(Ls(e));
            if (!Is(n))
                throw r = !0,
                Error(D(33, !1, Y(e)));
            return n.then(function(a) {
                var o;
                e.loadErrorTime = null,
                Oe(t = a) !== "object" && (o = 34),
                Object.prototype.hasOwnProperty.call(t, "bootstrap") && !et(t.bootstrap) && (o = 35),
                et(t.mount) || (o = 36),
                et(t.unmount) || (o = 37);
                var i = Xr(t);
                if (o) {
                    var s;
                    try {
                        s = JSON.stringify(t)
                    } catch {}
                    return console.error(D(o, !1, i, Y(e), s), t),
                    qe(void 0, e, Z),
                    e
                }
                return t.devtools && t.devtools.overlays && (e.devtools.overlays = zt({}, e.devtools.overlays, t.devtools.overlays)),
                e.status = gt,
                e.bootstrap = Be(t, "bootstrap"),
                e.mount = Be(t, "mount"),
                e.unmount = Be(t, "unmount"),
                e.unload = Be(t, "unload"),
                e.timeouts = Ms(t.timeouts),
                delete e.loadPromise,
                e
            })
        }).catch(function(n) {
            var a;
            return delete e.loadPromise,
            r ? a = Z : (a = mt,
            e.loadErrorTime = new Date().getTime()),
            qe(n, e, a),
            e
        }));
        var t, r
    })
}
var ks, St = typeof window < "u", xt = {
    hashchange: [],
    popstate: []
}, $r = ["hashchange", "popstate"];
function wa(e) {
    var t;
    if (typeof e == "string")
        t = e;
    else if (this && this.href)
        t = this.href;
    else {
        if (!(e && e.currentTarget && e.currentTarget.href && e.preventDefault))
            throw Error(D(14, !1));
        t = e.currentTarget.href,
        e.preventDefault()
    }
    var r = Po(window.location.href)
      , n = Po(t);
    t.indexOf("#") === 0 ? window.location.hash = n.hash : r.host !== n.host && n.host ? window.location.href = t : n.pathname === r.pathname && n.search === r.search ? window.location.hash = n.hash : window.history.pushState(null, null, t)
}
function _o(e) {
    var t = this;
    if (e) {
        var r = e[0].type;
        $r.indexOf(r) >= 0 && xt[r].forEach(function(n) {
            try {
                n.apply(t, e)
            } catch (a) {
                setTimeout(function() {
                    throw a
                })
            }
        })
    }
}
function Eo() {
    Ye([], arguments)
}
function So(e, t) {
    return function() {
        var r = window.location.href
          , n = e.apply(this, arguments)
          , a = window.location.href;
        return ks && r === a || (qs() ? window.dispatchEvent(Cm(window.history.state, t)) : Ye([])),
        n
    }
}
function Cm(e, t) {
    var r;
    try {
        r = new PopStateEvent("popstate",{
            state: e
        })
    } catch {
        (r = document.createEvent("PopStateEvent")).initPopStateEvent("popstate", !1, !1, e)
    }
    return r.singleSpa = !0,
    r.singleSpaTrigger = t,
    r
}
if (St) {
    window.addEventListener("hashchange", Eo),
    window.addEventListener("popstate", Eo);
    var xm = window.addEventListener
      , Im = window.removeEventListener;
    window.addEventListener = function(e, t) {
        if (!(typeof t == "function" && $r.indexOf(e) >= 0) || Jr(xt[e], function(r) {
            return r === t
        }))
            return xm.apply(this, arguments);
        xt[e].push(t)
    }
    ,
    window.removeEventListener = function(e, t) {
        if (!(typeof t == "function" && $r.indexOf(e) >= 0))
            return Im.apply(this, arguments);
        xt[e] = xt[e].filter(function(r) {
            return r !== t
        })
    }
    ,
    window.history.pushState = So(window.history.pushState, "pushState"),
    window.history.replaceState = So(window.history.replaceState, "replaceState"),
    window.singleSpaNavigate ? console.warn(D(41, !1)) : window.singleSpaNavigate = wa
}
function Po(e) {
    var t = document.createElement("a");
    return t.href = e,
    t
}
var Ao = !1;
function Ds() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.jQuery;
    if (e || window.$ && window.$.fn && window.$.fn.jquery && (e = window.$),
    e && !Ao) {
        var t = e.fn.on
          , r = e.fn.off;
        e.fn.on = function(n, a) {
            return To.call(this, t, window.addEventListener, n, a, arguments)
        }
        ,
        e.fn.off = function(n, a) {
            return To.call(this, r, window.removeEventListener, n, a, arguments)
        }
        ,
        Ao = !0
    }
}
function To(e, t, r, n, a) {
    return typeof r != "string" ? e.apply(this, a) : (r.split(/\s+/).forEach(function(o) {
        $r.indexOf(o) >= 0 && (t(o, n),
        r = r.replace(o, ""))
    }),
    r.trim() === "" ? this : e.apply(this, a))
}
var vt = {};
function Fn(e) {
    return Promise.resolve().then(function() {
        var t = vt[Y(e)];
        if (!t)
            return e;
        if (e.status === ke)
            return Oo(e, t),
            e;
        if (e.status === Gn)
            return t.promise.then(function() {
                return e
            });
        if (e.status !== De && e.status !== mt)
            return e;
        var r = e.status === mt ? Promise.resolve() : Xt(e, "unload");
        return e.status = Gn,
        r.then(function() {
            return Oo(e, t),
            e
        }).catch(function(n) {
            return function(a, o, i) {
                delete vt[Y(a)],
                delete a.bootstrap,
                delete a.mount,
                delete a.unmount,
                delete a.unload,
                qe(i, a, Z),
                o.reject(i)
            }(e, t, n),
            e
        })
    })
}
function Oo(e, t) {
    delete vt[Y(e)],
    delete e.bootstrap,
    delete e.mount,
    delete e.unmount,
    delete e.unload,
    e.status = ke,
    t.resolve()
}
function Co(e, t, r, n) {
    vt[Y(e)] = {
        app: e,
        resolve: r,
        reject: n
    },
    Object.defineProperty(vt[Y(e)], "promise", {
        get: t
    })
}
function Gs(e) {
    return vt[e]
}
var Ee = [];
function $m() {
    var e = []
      , t = []
      , r = []
      , n = []
      , a = new Date().getTime();
    return Ee.forEach(function(o) {
        var i = o.status !== Z && Nn(o);
        switch (o.status) {
        case mt:
            i && a - o.loadErrorTime >= 200 && r.push(o);
            break;
        case ke:
        case zr:
            i && r.push(o);
            break;
        case gt:
        case De:
            !i && Gs(Y(o)) ? e.push(o) : i && n.push(o);
            break;
        case _e:
            i || t.push(o)
        }
    }),
    {
        appsToUnload: e,
        appsToUnmount: t,
        appsToLoad: r,
        appsToMount: n
    }
}
function Ns() {
    return Ee.filter(_m).map(Y)
}
function Us() {
    return Ee.map(Y)
}
function js(e) {
    var t = Jr(Ee, function(r) {
        return Y(r) === e
    });
    return t ? t.status : null
}
function Rm(e, t, r, n) {
    var a = function(o, i, s, c) {
        var g, f = {
            name: null,
            loadApp: null,
            activeWhen: null,
            customProps: null
        };
        return Oe(o) === "object" ? (function(m) {
            if (Array.isArray(m) || m === null)
                throw Error(D(39, !1));
            var u = ["name", "app", "activeWhen", "customProps"]
              , l = Object.keys(m).reduce(function(p, h) {
                return u.indexOf(h) >= 0 ? p : p.concat(h)
            }, []);
            if (l.length !== 0)
                throw Error(D(38, !1, u.join(", "), l.join(", ")));
            if (typeof m.name != "string" || m.name.length === 0 || Oe(m.app) !== "object" && typeof m.app != "function")
                throw Error(D(20, !1));
            var d = function(p) {
                return typeof p == "string" || typeof p == "function"
            };
            if (!(d(m.activeWhen) || Array.isArray(m.activeWhen) && m.activeWhen.every(d)))
                throw Error(D(24, !1));
            if (!Io(m.customProps))
                throw Error(D(22, !1))
        }(o),
        f.name = o.name,
        f.loadApp = o.app,
        f.activeWhen = o.activeWhen,
        f.customProps = o.customProps) : (function(m, u, l, d) {
            if (typeof m != "string" || m.length === 0)
                throw Error(D(20, !1));
            if (!u)
                throw Error(D(23, !1));
            if (typeof l != "function")
                throw Error(D(24, !1));
            if (!Io(d))
                throw Error(D(22, !1))
        }(o, i, s, c),
        f.name = o,
        f.loadApp = i,
        f.activeWhen = s,
        f.customProps = c),
        f.loadApp = typeof (g = f.loadApp) != "function" ? function() {
            return Promise.resolve(g)
        }
        : g,
        f.customProps = function(m) {
            return m || {}
        }(f.customProps),
        f.activeWhen = function(m) {
            var u = Array.isArray(m) ? m : [m];
            return u = u.map(function(l) {
                return typeof l == "function" ? l : Ws(l)
            }),
            function(l) {
                return u.some(function(d) {
                    return d(l)
                })
            }
        }(f.activeWhen),
        f
    }(e, t, r, n);
    if (Us().indexOf(a.name) !== -1)
        throw Error(D(21, !1, a.name));
    Ee.push(zt({
        loadErrorTime: null,
        status: ke,
        parcels: {},
        devtools: {
            overlays: {
                options: {},
                selectors: []
            }
        }
    }, a)),
    St && (Ds(),
    Ye())
}
function Fs() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.location;
    return Ee.filter(function(t) {
        return t.activeWhen(e)
    }).map(Y)
}
function Bs(e) {
    if (Ee.filter(function(t) {
        return Y(t) === e
    }).length === 0)
        throw Error(D(25, !1, e));
    return Hs(e).then(function() {
        var t = Ee.map(Y).indexOf(e);
        Ee.splice(t, 1)
    })
}
function Hs(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        waitForUnmount: !1
    };
    if (typeof e != "string")
        throw Error(D(26, !1));
    var r = Jr(Ee, function(i) {
        return Y(i) === e
    });
    if (!r)
        throw Error(D(27, !1, e));
    var n, a = Gs(Y(r));
    if (t && t.waitForUnmount) {
        if (a)
            return a.promise;
        var o = new Promise(function(i, s) {
            Co(r, function() {
                return o
            }, i, s)
        }
        );
        return o
    }
    return a ? (n = a.promise,
    xo(r, a.resolve, a.reject)) : n = new Promise(function(i, s) {
        Co(r, function() {
            return n
        }, i, s),
        xo(r, i, s)
    }
    ),
    n
}
function xo(e, t, r) {
    Qr(e).then(Fn).then(function() {
        t(),
        setTimeout(function() {
            Ye()
        })
    }).catch(r)
}
function Io(e) {
    return !e || typeof e == "function" || Oe(e) === "object" && e !== null && !Array.isArray(e)
}
function Ws(e, t) {
    var r = function(n, a) {
        var o = 0
          , i = !1
          , s = "^";
        n[0] !== "/" && (n = "/" + n);
        for (var c = 0; c < n.length; c++) {
            var g = n[c];
            (!i && g === ":" || i && g === "/") && f(c)
        }
        return f(n.length),
        new RegExp(s,"i");
        function f(m) {
            var u = n.slice(o, m).replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
            if (s += i ? "[^/]+/?" : u,
            m === n.length)
                if (i)
                    a && (s += "$");
                else {
                    var l = a ? "" : ".*";
                    s = s.charAt(s.length - 1) === "/" ? "".concat(s).concat(l, "$") : "".concat(s, "(/").concat(l, ")?(#.*)?$")
                }
            i = !i,
            o = m
        }
    }(e, t);
    return function(n) {
        var a = n.origin;
        a || (a = "".concat(n.protocol, "//").concat(n.host));
        var o = n.href.replace(a, "").replace(n.search, "").split("?")[0];
        return r.test(o)
    }
}
var cn = !1
  , or = []
  , $o = St && window.location.href;
function Lm() {
    return Ye()
}
function Ye() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
      , t = arguments.length > 1 ? arguments[1] : void 0;
    if (cn)
        return new Promise(function(v, A) {
            or.push({
                resolve: v,
                reject: A,
                eventArguments: t
            })
        }
        );
    var r, n = $m(), a = n.appsToUnload, o = n.appsToUnmount, i = n.appsToLoad, s = n.appsToMount, c = !1, g = $o, f = $o = window.location.href;
    return qs() ? (cn = !0,
    r = a.concat(i, o, s),
    l()) : (r = i,
    u());
    function m() {
        c = !0
    }
    function u() {
        return Promise.resolve().then(function() {
            var v = i.map(jn);
            return Promise.all(v).then(p).then(function() {
                return []
            }).catch(function(A) {
                throw p(),
                A
            })
        })
    }
    function l() {
        return Promise.resolve().then(function() {
            if (window.dispatchEvent(new Fe(r.length === 0 ? "single-spa:before-no-app-change" : "single-spa:before-app-change",h(!0))),
            window.dispatchEvent(new Fe("single-spa:before-routing-event",h(!0, {
                cancelNavigation: m
            }))),
            c)
                return window.dispatchEvent(new Fe("single-spa:before-mount-routing-event",h(!0))),
                d(),
                void wa(g);
            var v = a.map(Fn)
              , A = o.map(Qr).map(function(y) {
                return y.then(Fn)
            }).concat(v)
              , b = Promise.all(A);
            b.then(function() {
                window.dispatchEvent(new Fe("single-spa:before-mount-routing-event",h(!0)))
            });
            var S = i.map(function(y) {
                return jn(y).then(function(k) {
                    return Ro(k, b)
                })
            })
              , O = s.filter(function(y) {
                return i.indexOf(y) < 0
            }).map(function(y) {
                return Ro(y, b)
            });
            return b.catch(function(y) {
                throw p(),
                y
            }).then(function() {
                return p(),
                Promise.all(S.concat(O)).catch(function(y) {
                    throw e.forEach(function(k) {
                        return k.reject(y)
                    }),
                    y
                }).then(d)
            })
        })
    }
    function d() {
        var v = Ns();
        e.forEach(function(S) {
            return S.resolve(v)
        });
        try {
            var A = r.length === 0 ? "single-spa:no-app-change" : "single-spa:app-change";
            window.dispatchEvent(new Fe(A,h())),
            window.dispatchEvent(new Fe("single-spa:routing-event",h()))
        } catch (S) {
            setTimeout(function() {
                throw S
            })
        }
        if (cn = !1,
        or.length > 0) {
            var b = or;
            or = [],
            Ye(b)
        }
        return v
    }
    function p() {
        e.forEach(function(v) {
            _o(v.eventArguments)
        }),
        _o(t)
    }
    function h() {
        var v, A = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], b = arguments.length > 1 ? arguments[1] : void 0, S = {}, O = (ar(v = {}, _e, []),
        ar(v, De, []),
        ar(v, ke, []),
        ar(v, Z, []),
        v);
        A ? (i.concat(s).forEach(function(G, N) {
            k(G, _e)
        }),
        a.forEach(function(G) {
            k(G, ke)
        }),
        o.forEach(function(G) {
            k(G, De)
        })) : r.forEach(function(G) {
            k(G)
        });
        var y = {
            detail: {
                newAppStatuses: S,
                appsByNewStatus: O,
                totalAppChanges: r.length,
                originalEvent: t?.[0],
                oldUrl: g,
                newUrl: f,
                navigationIsCanceled: c
            }
        };
        return b && zt(y.detail, b),
        y;
        function k(G, N) {
            var X = Y(G);
            N = N || js(X),
            S[X] = N,
            (O[N] = O[N] || []).push(X)
        }
    }
}
function Ro(e, t) {
    return Nn(e) ? va(e).then(function(r) {
        return t.then(function() {
            return Nn(r) ? Un(r) : r
        })
    }) : t.then(function() {
        return e
    })
}
var ya = !1;
function Vs(e) {
    var t;
    ya = !0,
    e && e.urlRerouteOnly && (t = e.urlRerouteOnly,
    ks = t),
    St && Ye()
}
function qs() {
    return ya
}
St && setTimeout(function() {
    ya || console.warn(D(1, !1))
}, 5e3);
var Mm = {
    getRawAppData: function() {
        return [].concat(Ee)
    },
    reroute: Ye,
    NOT_LOADED: ke,
    toLoadPromise: jn,
    toBootstrapPromise: va,
    unregisterApplication: Bs
};
St && window.__SINGLE_SPA_DEVTOOLS__ && (window.__SINGLE_SPA_DEVTOOLS__.exposedMethods = Mm);
var Lo = Ur
  , km = la
  , Dm = Ge
  , Mo = Lo ? Lo.isConcatSpreadable : void 0;
function Gm(e) {
    return Dm(e) || km(e) || !!(Mo && e && e[Mo])
}
var Nm = Gm
  , Um = Br
  , jm = Nm;
function Ks(e, t, r, n, a) {
    var o = -1
      , i = e.length;
    for (r || (r = jm),
    a || (a = []); ++o < i; ) {
        var s = e[o];
        t > 0 && r(s) ? t > 1 ? Ks(s, t - 1, r, n, a) : Um(a, s) : n || (a[a.length] = s)
    }
    return a
}
var Fm = Ks;
function Bm(e, t) {
    var r = -1
      , n = e.length;
    for (t || (t = Array(n)); ++r < n; )
        t[r] = e[r];
    return t
}
var ba = Bm
  , Hm = Br
  , Wm = Fm
  , Vm = ba
  , qm = Ge;
function Km() {
    var e = arguments.length;
    if (!e)
        return [];
    for (var t = Array(e - 1), r = arguments[0], n = e; n--; )
        t[n - 1] = arguments[n];
    return Hm(qm(r) ? Vm(r) : [r], Wm(t, 1))
}
var Ym = Km;
const Ys = ge(Ym);
var zm = Wt
  , Xm = function() {
    try {
        var e = zm(Object, "defineProperty");
        return e({}, "", {}),
        e
    } catch {}
}()
  , zs = Xm
  , ko = zs;
function Jm(e, t, r) {
    t == "__proto__" && ko ? ko(e, t, {
        configurable: !0,
        enumerable: !0,
        value: r,
        writable: !0
    }) : e[t] = r
}
var _a = Jm
  , Qm = _a
  , Zm = jr;
function eh(e, t, r) {
    (r !== void 0 && !Zm(e[t], r) || r === void 0 && !(t in e)) && Qm(e, t, r)
}
var Xs = eh;
function th(e) {
    return function(t, r, n) {
        for (var a = -1, o = Object(t), i = n(t), s = i.length; s--; ) {
            var c = i[e ? s : ++a];
            if (r(o[c], c, o) === !1)
                break
        }
        return t
    }
}
var rh = th
  , nh = rh
  , ah = nh()
  , Js = ah
  , Rr = {
    exports: {}
};
Rr.exports;
(function(e, t) {
    var r = at
      , n = t && !t.nodeType && t
      , a = n && !0 && e && !e.nodeType && e
      , o = a && a.exports === n
      , i = o ? r.Buffer : void 0
      , s = i ? i.allocUnsafe : void 0;
    function c(g, f) {
        if (f)
            return g.slice();
        var m = g.length
          , u = s ? s(m) : new g.constructor(m);
        return g.copy(u),
        u
    }
    e.exports = c
}
)(Rr, Rr.exports);
var Qs = Rr.exports
  , Do = es;
function oh(e) {
    var t = new e.constructor(e.byteLength);
    return new Do(t).set(new Do(e)),
    t
}
var Ea = oh
  , ih = Ea;
function sh(e, t) {
    var r = t ? ih(e.buffer) : e.buffer;
    return new e.constructor(r,e.byteOffset,e.length)
}
var Zs = sh
  , uh = ot
  , Go = Object.create
  , ch = function() {
    function e() {}
    return function(t) {
        if (!uh(t))
            return {};
        if (Go)
            return Go(t);
        e.prototype = t;
        var r = new e;
        return e.prototype = void 0,
        r
    }
}()
  , lh = ch
  , dh = ss
  , fh = dh(Object.getPrototypeOf, Object)
  , Sa = fh
  , ph = lh
  , gh = Sa
  , mh = pa;
function hh(e) {
    return typeof e.constructor == "function" && !mh(e) ? ph(gh(e)) : {}
}
var eu = hh
  , vh = Yt
  , wh = Ne;
function yh(e) {
    return wh(e) && vh(e)
}
var tu = yh
  , bh = Ht
  , _h = Sa
  , Eh = Ne
  , Sh = "[object Object]"
  , Ph = Function.prototype
  , Ah = Object.prototype
  , ru = Ph.toString
  , Th = Ah.hasOwnProperty
  , Oh = ru.call(Object);
function Ch(e) {
    if (!Eh(e) || bh(e) != Sh)
        return !1;
    var t = _h(e);
    if (t === null)
        return !0;
    var r = Th.call(t, "constructor") && t.constructor;
    return typeof r == "function" && r instanceof r && ru.call(r) == Oh
}
var xh = Ch;
function Ih(e, t) {
    if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
        return e[t]
}
var nu = Ih
  , $h = _a
  , Rh = jr
  , Lh = Object.prototype
  , Mh = Lh.hasOwnProperty;
function kh(e, t, r) {
    var n = e[t];
    (!(Mh.call(e, t) && Rh(n, r)) || r === void 0 && !(t in e)) && $h(e, t, r)
}
var au = kh
  , Dh = au
  , Gh = _a;
function Nh(e, t, r, n) {
    var a = !r;
    r || (r = {});
    for (var o = -1, i = t.length; ++o < i; ) {
        var s = t[o]
          , c = n ? n(r[s], e[s], s, r, e) : void 0;
        c === void 0 && (c = e[s]),
        a ? Gh(r, s, c) : Dh(r, s, c)
    }
    return r
}
var Jt = Nh;
function Uh(e) {
    var t = [];
    if (e != null)
        for (var r in Object(e))
            t.push(r);
    return t
}
var jh = Uh
  , Fh = ot
  , Bh = pa
  , Hh = jh
  , Wh = Object.prototype
  , Vh = Wh.hasOwnProperty;
function qh(e) {
    if (!Fh(e))
        return Hh(e);
    var t = Bh(e)
      , r = [];
    for (var n in e)
        n == "constructor" && (t || !Vh.call(e, n)) || r.push(n);
    return r
}
var Kh = qh
  , Yh = is
  , zh = Kh
  , Xh = Yt;
function Jh(e) {
    return Xh(e) ? Yh(e, !0) : zh(e)
}
var Qt = Jh
  , Qh = Jt
  , Zh = Qt;
function ev(e) {
    return Qh(e, Zh(e))
}
var tv = ev
  , No = Xs
  , rv = Qs
  , nv = Zs
  , av = ba
  , ov = eu
  , Uo = la
  , jo = Ge
  , iv = tu
  , sv = Hr
  , uv = Gi
  , cv = ot
  , lv = xh
  , dv = fa
  , Fo = nu
  , fv = tv;
function pv(e, t, r, n, a, o, i) {
    var s = Fo(e, r)
      , c = Fo(t, r)
      , g = i.get(c);
    if (g) {
        No(e, r, g);
        return
    }
    var f = o ? o(s, c, r + "", e, t, i) : void 0
      , m = f === void 0;
    if (m) {
        var u = jo(c)
          , l = !u && sv(c)
          , d = !u && !l && dv(c);
        f = c,
        u || l || d ? jo(s) ? f = s : iv(s) ? f = av(s) : l ? (m = !1,
        f = rv(c, !0)) : d ? (m = !1,
        f = nv(c, !0)) : f = [] : lv(c) || Uo(c) ? (f = s,
        Uo(s) ? f = fv(s) : (!cv(s) || uv(s)) && (f = ov(c))) : m = !1
    }
    m && (i.set(c, f),
    a(f, c, n, o, i),
    i.delete(c)),
    No(e, r, f)
}
var gv = pv
  , mv = ua
  , hv = Xs
  , vv = Js
  , wv = gv
  , yv = ot
  , bv = Qt
  , _v = nu;
function ou(e, t, r, n, a) {
    e !== t && vv(t, function(o, i) {
        if (a || (a = new mv),
        yv(o))
            wv(e, t, i, r, ou, n, a);
        else {
            var s = n ? n(_v(e, i), o, i + "", e, t, a) : void 0;
            s === void 0 && (s = o),
            hv(e, i, s)
        }
    }, bv)
}
var Ev = ou;
function Sv(e) {
    return e
}
var Pa = Sv;
function Pv(e, t, r) {
    switch (r.length) {
    case 0:
        return e.call(t);
    case 1:
        return e.call(t, r[0]);
    case 2:
        return e.call(t, r[0], r[1]);
    case 3:
        return e.call(t, r[0], r[1], r[2])
    }
    return e.apply(t, r)
}
var Av = Pv
  , Tv = Av
  , Bo = Math.max;
function Ov(e, t, r) {
    return t = Bo(t === void 0 ? e.length - 1 : t, 0),
    function() {
        for (var n = arguments, a = -1, o = Bo(n.length - t, 0), i = Array(o); ++a < o; )
            i[a] = n[t + a];
        a = -1;
        for (var s = Array(t + 1); ++a < t; )
            s[a] = n[a];
        return s[t] = r(i),
        Tv(e, this, s)
    }
}
var Cv = Ov;
function xv(e) {
    return function() {
        return e
    }
}
var Iv = xv
  , $v = Iv
  , Ho = zs
  , Rv = Pa
  , Lv = Ho ? function(e, t) {
    return Ho(e, "toString", {
        configurable: !0,
        enumerable: !1,
        value: $v(t),
        writable: !0
    })
}
: Rv
  , Mv = Lv
  , kv = 800
  , Dv = 16
  , Gv = Date.now;
function Nv(e) {
    var t = 0
      , r = 0;
    return function() {
        var n = Gv()
          , a = Dv - (n - r);
        if (r = n,
        a > 0) {
            if (++t >= kv)
                return arguments[0]
        } else
            t = 0;
        return e.apply(void 0, arguments)
    }
}
var Uv = Nv
  , jv = Mv
  , Fv = Uv
  , Bv = Fv(jv)
  , Hv = Bv
  , Wv = Pa
  , Vv = Cv
  , qv = Hv;
function Kv(e, t) {
    return qv(Vv(e, t, Wv), e + "")
}
var iu = Kv
  , Yv = jr
  , zv = Yt
  , Xv = as
  , Jv = ot;
function Qv(e, t, r) {
    if (!Jv(r))
        return !1;
    var n = typeof t;
    return (n == "number" ? zv(r) && Xv(t, r.length) : n == "string" && t in r) ? Yv(r[t], e) : !1
}
var Zv = Qv
  , ew = iu
  , tw = Zv;
function rw(e) {
    return ew(function(t, r) {
        var n = -1
          , a = r.length
          , o = a > 1 ? r[a - 1] : void 0
          , i = a > 2 ? r[2] : void 0;
        for (o = e.length > 3 && typeof o == "function" ? (a--,
        o) : void 0,
        i && tw(r[0], r[1], i) && (o = a < 3 ? void 0 : o,
        a = 1),
        t = Object(t); ++n < a; ) {
            var s = r[n];
            s && e(t, s, n, o)
        }
        return t
    })
}
var nw = rw
  , aw = Ev
  , ow = nw
  , iw = ow(function(e, t, r, n) {
    aw(e, t, r, n)
})
  , sw = iw;
const su = ge(sw);
function uw(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
        ;
    return e
}
var uu = uw
  , cw = Js
  , lw = Vr;
function dw(e, t) {
    return e && cw(e, t, lw)
}
var fw = dw
  , pw = Yt;
function gw(e, t) {
    return function(r, n) {
        if (r == null)
            return r;
        if (!pw(r))
            return e(r, n);
        for (var a = r.length, o = t ? a : -1, i = Object(r); (t ? o-- : ++o < a) && n(i[o], o, i) !== !1; )
            ;
        return r
    }
}
var mw = gw
  , hw = fw
  , vw = mw
  , ww = vw(hw)
  , yw = ww
  , bw = Pa;
function _w(e) {
    return typeof e == "function" ? e : bw
}
var Ew = _w
  , Sw = uu
  , Pw = yw
  , Aw = Ew
  , Tw = Ge;
function Ow(e, t) {
    var r = Tw(e) ? Sw : Pw;
    return r(e, Aw(t))
}
var Cw = Ow;
const xw = ge(Cw);
var Iw = typeof navigator < "u" && navigator.userAgent.indexOf("Trident") !== -1;
function cu(e, t) {
    if (!e.hasOwnProperty(t) || !isNaN(t) && t < e.length)
        return !0;
    if (Iw)
        try {
            return e[t] && typeof window < "u" && e[t].parent === window
        } catch {
            return !0
        }
    else
        return !1
}
var pr, gr, Bn;
function $w(e) {
    var t = 0, r, n = !1;
    for (var a in e)
        if (!cu(e, a)) {
            for (var o = 0; o < window.frames.length && !n; o++) {
                var i = window.frames[o];
                if (i === e[a]) {
                    n = !0;
                    break
                }
            }
            if (!n && (t === 0 && a !== pr || t === 1 && a !== gr))
                return a;
            t++,
            r = a
        }
    if (r !== Bn)
        return r
}
function Rw(e) {
    pr = gr = void 0;
    for (var t in e)
        cu(e, t) || (pr ? gr || (gr = t) : pr = t,
        Bn = t);
    return Bn
}
function Aa(e) {
    var t = e.indexOf(">") + 1
      , r = e.lastIndexOf("<");
    return e.substring(t, r)
}
function Hn(e) {
    if (tt(e) === "object")
        return "/";
    try {
        var t = new URL(e,location.href)
          , r = t.origin
          , n = t.pathname
          , a = n.split("/");
        return a.pop(),
        "".concat(r).concat(a.join("/"), "/")
    } catch (o) {
        return console.warn(o),
        ""
    }
}
function Lw() {
    var e = document.createElement("script");
    return "noModule"in e
}
var Mw = window.requestIdleCallback || function(t) {
    var r = Date.now();
    return setTimeout(function() {
        t({
            didTimeout: !1,
            timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - r))
            }
        })
    }, 1)
}
;
function kw(e, t) {
    if (!t || !e.headers)
        return e.text();
    var r = e.headers.get("Content-Type");
    if (!r)
        return e.text();
    var n = "utf-8"
      , a = r.split(";");
    if (a.length === 2) {
        var o = a[1].split("=")
          , i = aa(o, 2)
          , s = i[1]
          , c = s && s.trim();
        c && (n = c)
    }
    return n.toUpperCase() === "UTF-8" ? e.text() : e.blob().then(function(g) {
        return new Promise(function(f, m) {
            var u = new window.FileReader;
            u.onload = function() {
                f(u.result)
            }
            ,
            u.onerror = m,
            u.readAsText(g, n)
        }
        )
    })
}
var ln = {};
function Dw(e, t) {
    var r = e;
    if (!ln[r]) {
        var n = "(function(){".concat(t, "})");
        ln[r] = (0,
        eval)(n)
    }
    var a = ln[r];
    a.call(window)
}
function Wo(e) {
    var t = new DOMParser
      , r = '<script src="'.concat(e, '"><\/script>')
      , n = t.parseFromString(r, "text/html");
    return n.scripts[0].src
}
var Gw = /(<script[\s\S]*?>)[\s\S]*?<\/script>/gi
  , Nw = /<(script)\s+((?!type=('|")text\/ng\x2Dtemplate\3)[\s\S])*?>[\s\S]*?<\/\1>/i
  , Vo = /.*\ssrc=('|")?([^>'"\s]+)/
  , Uw = /.*\stype=('|")?([^>'"\s]+)/
  , jw = /.*\sentry\s*.*/
  , Fw = /.*\sasync\s*.*/
  , Bw = /.*\snomodule\s*.*/
  , Hw = /.*\stype=('|")?module('|")?\s*.*/
  , Ww = /<(link)\s+[\s\S]*?>/ig
  , Vw = /\srel=('|")?(preload|prefetch)\1/
  , qo = /.*\shref=('|")?([^>'"\s]+)/
  , qw = /.*\sas=('|")?font\1.*/
  , Kw = /<style[^>]*>[\s\S]*?<\/style>/gi
  , Yw = /\s+rel=('|")?stylesheet\1.*/
  , zw = /.*\shref=('|")?([^>'"\s]+)/
  , Xw = /<!--([\s\S]*?)-->/g
  , Jw = /<link(\s+|\s+[\s\S]+\s+)ignore(\s*|\s+[\s\S]*|=[\s\S]*)>/i
  , Qw = /<style(\s+|\s+[\s\S]+\s+)ignore(\s*|\s+[\s\S]*|=[\s\S]*)>/i
  , Zw = /<script(\s+|\s+[\s\S]+\s+)ignore(\s*|\s+[\s\S]*|=[\s\S]*)>/i;
function Ko(e) {
    return e.startsWith("http://") || e.startsWith("https://")
}
function Yo(e, t) {
    return new URL(e,t).toString()
}
function ey(e) {
    var t = ["text/javascript", "module", "application/javascript", "text/ecmascript", "application/ecmascript"];
    return !e || t.indexOf(e) !== -1
}
var Lr = function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return "<!-- ".concat(r ? "prefetch/preload" : "", " link ").concat(t, " replaced by import-html-entry -->")
}
  , lu = function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return "<!-- ".concat(r ? "async" : "", " script ").concat(t, " replaced by import-html-entry -->")
}
  , ty = "<!-- inline scripts replaced by import-html-entry -->"
  , ir = function(t) {
    return "<!-- ignore asset ".concat(t || "file", " replaced by import-html-entry -->")
}
  , zo = function(t, r) {
    return "<!-- ".concat(r ? "nomodule" : "module", " script ").concat(t, " ignored by import-html-entry -->")
};
function ry(e, t, r) {
    var n = []
      , a = []
      , o = null
      , i = Lw()
      , s = e.replace(Xw, "").replace(Ww, function(g) {
        var f = !!g.match(Yw);
        if (f) {
            var m = g.match(zw)
              , u = g.match(Jw);
            if (m) {
                var l = m && m[2]
                  , d = l;
                return l && !Ko(l) && (d = Yo(l, t)),
                u ? ir(d) : (d = Wo(d),
                a.push(d),
                Lr(d))
            }
        }
        var p = g.match(Vw) && g.match(qo) && !g.match(qw);
        if (p) {
            var h = g.match(qo)
              , v = aa(h, 3)
              , A = v[2];
            return Lr(A, !0)
        }
        return g
    }).replace(Kw, function(g) {
        return Qw.test(g) ? ir("style file") : g
    }).replace(Gw, function(g, f) {
        var m = f.match(Zw)
          , u = i && !!f.match(Bw) || !i && !!f.match(Hw)
          , l = f.match(Uw)
          , d = l && l[2];
        if (!ey(d))
            return g;
        if (Nw.test(g) && f.match(Vo)) {
            var p = f.match(jw)
              , h = f.match(Vo)
              , v = h && h[2];
            if (o && p)
                throw new SyntaxError("You should not set multiply entry script!");
            if (v && (Ko(v) || (v = Yo(v, t)),
            v = Wo(v)),
            o = o || p && v,
            m)
                return ir(v || "js file");
            if (u)
                return zo(v || "js file", i);
            if (v) {
                var A = !!f.match(Fw);
                return n.push(A ? {
                    async: !0,
                    src: v
                } : v),
                lu(v, A)
            }
            return g
        } else {
            if (m)
                return ir("js file");
            if (u)
                return zo("js file", i);
            var b = Aa(g)
              , S = b.split(/[\r\n]+/).every(function(O) {
                return !O.trim() || O.trim().startsWith("//")
            });
            return S || n.push(g),
            ty
        }
    });
    n = n.filter(function(g) {
        return !!g
    });
    var c = {
        template: s,
        scripts: n,
        styles: a,
        entry: o || n[n.length - 1]
    };
    return typeof r == "function" && (c = r(c)),
    c
}
function Xo(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t && (n = n.filter(function(a) {
            return Object.getOwnPropertyDescriptor(e, a).enumerable
        })),
        r.push.apply(r, n)
    }
    return r
}
function du(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t] != null ? arguments[t] : {};
        t % 2 ? Xo(Object(r), !0).forEach(function(n) {
            Le(e, n, r[n])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Xo(Object(r)).forEach(function(n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
        })
    }
    return e
}
var Jo = {}
  , Qo = {}
  , Zo = {};
if (!window.fetch)
    throw new Error('[import-html-entry] Here is no "fetch" on the window env, you need to polyfill it');
var nt = window.fetch.bind(window);
function Wn(e) {
    return e
}
function fu(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
      , n = r.fetch
      , a = n === void 0 ? nt : n
      , o = e;
    return Ta(t, a).then(function(i) {
        return o = t.reduce(function(s, c, g) {
            return s = s.replace(Lr(c), Zr(c) ? "".concat(c) : "<style>/* ".concat(c, " */").concat(i[g], "</style>")),
            s
        }, o),
        o
    })
}
var Zr = function(t) {
    return t.startsWith("<")
};
function ny(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
      , n = r.proxy
      , a = r.strictGlobal
      , o = r.scopedGlobalVariables
      , i = o === void 0 ? [] : o
      , s = Zr(e) ? "" : "//# sourceURL=".concat(e, `
`)
      , c = i.length ? "const {".concat(i.join(","), "}=this;") : ""
      , g = (0,
    eval)("window");
    return g.proxy = n,
    a ? c ? ";(function(){with(this){".concat(c).concat(t, `
`).concat(s, "}}).bind(window.proxy)();") : ";(function(window, self, globalThis){with(window){;".concat(t, `
`).concat(s, "}}).bind(window.proxy)(window.proxy, window.proxy, window.proxy);") : ";(function(window, self, globalThis){;".concat(t, `
`).concat(s, "}).bind(window.proxy)(window.proxy, window.proxy, window.proxy);")
}
function Ta(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : nt;
    return Promise.all(e.map(function(r) {
        return Zr(r) ? Aa(r) : Jo[r] || (Jo[r] = t(r).then(function(n) {
            return n.text()
        }))
    }))
}
function Oa(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : nt
      , r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {}
      , n = function(o) {
        return Qo[o] || (Qo[o] = t(o).then(function(i) {
            if (i.status >= 400)
                throw new Error("".concat(o, " load failed with status ").concat(i.status));
            return i.text()
        }).catch(function(i) {
            throw r(),
            i
        }))
    };
    return Promise.all(e.map(function(a) {
        if (typeof a == "string")
            return Zr(a) ? Aa(a) : n(a);
        var o = a.src
          , i = a.async;
        return i ? {
            src: o,
            async: !0,
            content: new Promise(function(s, c) {
                return Mw(function() {
                    return n(o).then(s, c)
                })
            }
            )
        } : n(o)
    }))
}
function ei(e, t) {
    setTimeout(function() {
        throw console.error(t),
        e
    })
}
function Mr(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : window
      , n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}
      , a = n.fetch
      , o = a === void 0 ? nt : a
      , i = n.strictGlobal
      , s = i === void 0 ? !1 : i
      , c = n.success
      , g = n.error
      , f = g === void 0 ? function() {}
    : g
      , m = n.beforeExec
      , u = m === void 0 ? function() {}
    : m
      , l = n.afterExec
      , d = l === void 0 ? function() {}
    : l
      , p = n.scopedGlobalVariables
      , h = p === void 0 ? [] : p;
    return Oa(t, o, f).then(function(v) {
        var A = function(y, k) {
            var G = u(k, y) || k
              , N = ny(y, G, {
                proxy: r,
                strictGlobal: s,
                scopedGlobalVariables: h
            });
            Dw(y, N),
            d(k, y)
        };
        function b(O, y, k) {
            if (O === e) {
                Rw(s ? r : window);
                try {
                    A(O, y);
                    var G = r[$w(s ? r : window)] || {};
                    k(G)
                } catch (N) {
                    throw console.error("[import-html-entry]: error occurs while executing entry script ".concat(O)),
                    N
                }
            } else if (typeof y == "string")
                try {
                    A(O, y)
                } catch (N) {
                    ei(N, "[import-html-entry]: error occurs while executing normal script ".concat(O))
                }
            else
                y.async && y?.content.then(function(N) {
                    return A(y.src, N)
                }).catch(function(N) {
                    ei(N, "[import-html-entry]: error occurs while executing async script ".concat(y.src))
                })
        }
        function S(O, y) {
            if (O < t.length) {
                var k = t[O]
                  , G = v[O];
                b(k, G, y),
                !e && O === t.length - 1 ? y() : S(O + 1, y)
            }
        }
        return new Promise(function(O) {
            return S(0, c || O)
        }
        )
    })
}
function ay(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
      , r = nt
      , n = !1
      , a = Hn
      , o = Wn
      , i = t.postProcessTemplate;
    return typeof t == "function" ? r = t : (t.fetch && (typeof t.fetch == "function" ? r = t.fetch : (r = t.fetch.fn || nt,
    n = !!t.fetch.autoDecodeResponse)),
    a = t.getPublicPath || t.getDomain || Hn,
    o = t.getTemplate || Wn),
    Zo[e] || (Zo[e] = r(e).then(function(s) {
        return kw(s, n)
    }).then(function(s) {
        var c = a(e)
          , g = ry(o(s), c, i)
          , f = g.template
          , m = g.scripts
          , u = g.entry
          , l = g.styles;
        return fu(f, l, {
            fetch: r
        }).then(function(d) {
            return {
                template: d,
                assetPublicPath: c,
                getExternalScripts: function() {
                    return Oa(m, r)
                },
                getExternalStyleSheets: function() {
                    return Ta(l, r)
                },
                execScripts: function(h, v) {
                    var A = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                    return m.length ? Mr(u, m, h, du({
                        fetch: r,
                        strictGlobal: v
                    }, A)) : Promise.resolve()
                }
            }
        })
    }))
}
function oy(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
      , r = t.fetch
      , n = r === void 0 ? nt : r
      , a = t.getTemplate
      , o = a === void 0 ? Wn : a
      , i = t.postProcessTemplate
      , s = t.getPublicPath || t.getDomain || Hn;
    if (!e)
        throw new SyntaxError("entry should not be empty!");
    if (typeof e == "string")
        return ay(e, {
            fetch: n,
            getPublicPath: s,
            getTemplate: o,
            postProcessTemplate: i
        });
    if (Array.isArray(e.scripts) || Array.isArray(e.styles)) {
        var c = e.scripts
          , g = c === void 0 ? [] : c
          , f = e.styles
          , m = f === void 0 ? [] : f
          , u = e.html
          , l = u === void 0 ? "" : u
          , d = function(v) {
            return m.reduceRight(function(A, b) {
                return "".concat(Lr(b)).concat(A)
            }, v)
        }
          , p = function(v) {
            return g.reduce(function(A, b) {
                return "".concat(A).concat(lu(b))
            }, v)
        };
        return fu(o(p(d(l))), m, {
            fetch: n
        }).then(function(h) {
            return {
                template: h,
                assetPublicPath: s(e),
                getExternalScripts: function() {
                    return Oa(g, n)
                },
                getExternalStyleSheets: function() {
                    return Ta(m, n)
                },
                execScripts: function(A, b) {
                    var S = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                    return g.length ? Mr(g[g.length - 1], g, A, du({
                        fetch: n,
                        strictGlobal: b
                    }, S)) : Promise.resolve()
                }
            }
        })
    } else
        throw new SyntaxError("entry scripts or styles should be array!")
}
function iy(e) {
    return {
        beforeLoad: function() {
            return H($.mark(function r() {
                return $.wrap(function(a) {
                    for (; ; )
                        switch (a.prev = a.next) {
                        case 0:
                            e.__POWERED_BY_QIANKUN__ = !0;
                        case 1:
                        case "end":
                            return a.stop()
                        }
                }, r)
            }))()
        },
        beforeMount: function() {
            return H($.mark(function r() {
                return $.wrap(function(a) {
                    for (; ; )
                        switch (a.prev = a.next) {
                        case 0:
                            e.__POWERED_BY_QIANKUN__ = !0;
                        case 1:
                        case "end":
                            return a.stop()
                        }
                }, r)
            }))()
        },
        beforeUnmount: function() {
            return H($.mark(function r() {
                return $.wrap(function(a) {
                    for (; ; )
                        switch (a.prev = a.next) {
                        case 0:
                            delete e.__POWERED_BY_QIANKUN__;
                        case 1:
                        case "end":
                            return a.stop()
                        }
                }, r)
            }))()
        }
    }
}
var ti = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
function sy(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "/"
      , r = !1;
    return {
        beforeLoad: function() {
            return H($.mark(function a() {
                return $.wrap(function(i) {
                    for (; ; )
                        switch (i.prev = i.next) {
                        case 0:
                            e.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = t;
                        case 1:
                        case "end":
                            return i.stop()
                        }
                }, a)
            }))()
        },
        beforeMount: function() {
            return H($.mark(function a() {
                return $.wrap(function(i) {
                    for (; ; )
                        switch (i.prev = i.next) {
                        case 0:
                            r && (e.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = t);
                        case 1:
                        case "end":
                            return i.stop()
                        }
                }, a)
            }))()
        },
        beforeUnmount: function() {
            return H($.mark(function a() {
                return $.wrap(function(i) {
                    for (; ; )
                        switch (i.prev = i.next) {
                        case 0:
                            ti === void 0 ? delete e.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ : e.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = ti,
                            r = !0;
                        case 2:
                        case "end":
                            return i.stop()
                        }
                }, a)
            }))()
        }
    }
}
function uy(e, t) {
    return su({}, iy(e), sy(e, t), function(r, n) {
        return Ys(r ?? [], n ?? [])
    })
}
function Ca() {
    try {
        var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
    } catch {}
    return (Ca = function() {
        return !!e
    }
    )()
}
function cy(e) {
    var t = Ca();
    return function() {
        var n = Tn(e), a;
        if (t) {
            var o = Tn(this).constructor;
            a = Reflect.construct(n, arguments, o)
        } else
            a = n.apply(this, arguments);
        return mc(this, a)
    }
}
function ly(e) {
    try {
        return Function.toString.call(e).indexOf("[native code]") !== -1
    } catch {
        return typeof e == "function"
    }
}
function dy(e, t, r) {
    if (Ca())
        return Reflect.construct.apply(null, arguments);
    var n = [null];
    n.push.apply(n, t);
    var a = new (e.bind.apply(e, n));
    return r && Ui(a, r.prototype),
    a
}
function Vn(e) {
    var t = typeof Map == "function" ? new Map : void 0;
    return Vn = function(n) {
        if (n === null || !ly(n))
            return n;
        if (typeof n != "function")
            throw new TypeError("Super expression must either be null or a function");
        if (typeof t < "u") {
            if (t.has(n))
                return t.get(n);
            t.set(n, a)
        }
        function a() {
            return dy(n, arguments, Tn(this).constructor)
        }
        return a.prototype = Object.create(n.prototype, {
            constructor: {
                value: a,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        Ui(a, n)
    }
    ,
    Vn(e)
}
var jt = function(e) {
    hc(r, e);
    var t = cy(r);
    function r(n) {
        return wt(this, r),
        t.call(this, "[qiankun]: ".concat(n))
    }
    return yt(r)
}(Vn(Error))
  , fy = Jt
  , py = Vr;
function gy(e, t) {
    return e && fy(t, py(t), e)
}
var my = gy
  , hy = Jt
  , vy = Qt;
function wy(e, t) {
    return e && hy(t, vy(t), e)
}
var yy = wy
  , by = Jt
  , _y = ca;
function Ey(e, t) {
    return by(e, _y(e), t)
}
var Sy = Ey
  , Py = Br
  , Ay = Sa
  , Ty = ca
  , Oy = rs
  , Cy = Object.getOwnPropertySymbols
  , xy = Cy ? function(e) {
    for (var t = []; e; )
        Py(t, Ty(e)),
        e = Ay(e);
    return t
}
: Oy
  , pu = xy
  , Iy = Jt
  , $y = pu;
function Ry(e, t) {
    return Iy(e, $y(e), t)
}
var Ly = Ry
  , My = ts
  , ky = pu
  , Dy = Qt;
function Gy(e) {
    return My(e, Dy, ky)
}
var Ny = Gy
  , Uy = Object.prototype
  , jy = Uy.hasOwnProperty;
function Fy(e) {
    var t = e.length
      , r = new e.constructor(t);
    return t && typeof e[0] == "string" && jy.call(e, "index") && (r.index = e.index,
    r.input = e.input),
    r
}
var By = Fy
  , Hy = Ea;
function Wy(e, t) {
    var r = t ? Hy(e.buffer) : e.buffer;
    return new e.constructor(r,e.byteOffset,e.byteLength)
}
var Vy = Wy
  , qy = /\w*$/;
function Ky(e) {
    var t = new e.constructor(e.source,qy.exec(e));
    return t.lastIndex = e.lastIndex,
    t
}
var Yy = Ky
  , ri = Ur
  , ni = ri ? ri.prototype : void 0
  , ai = ni ? ni.valueOf : void 0;
function zy(e) {
    return ai ? Object(ai.call(e)) : {}
}
var Xy = zy
  , Jy = Ea
  , Qy = Vy
  , Zy = Yy
  , eb = Xy
  , tb = Zs
  , rb = "[object Boolean]"
  , nb = "[object Date]"
  , ab = "[object Map]"
  , ob = "[object Number]"
  , ib = "[object RegExp]"
  , sb = "[object Set]"
  , ub = "[object String]"
  , cb = "[object Symbol]"
  , lb = "[object ArrayBuffer]"
  , db = "[object DataView]"
  , fb = "[object Float32Array]"
  , pb = "[object Float64Array]"
  , gb = "[object Int8Array]"
  , mb = "[object Int16Array]"
  , hb = "[object Int32Array]"
  , vb = "[object Uint8Array]"
  , wb = "[object Uint8ClampedArray]"
  , yb = "[object Uint16Array]"
  , bb = "[object Uint32Array]";
function _b(e, t, r) {
    var n = e.constructor;
    switch (t) {
    case lb:
        return Jy(e);
    case rb:
    case nb:
        return new n(+e);
    case db:
        return Qy(e, r);
    case fb:
    case pb:
    case gb:
    case mb:
    case hb:
    case vb:
    case wb:
    case yb:
    case bb:
        return tb(e, r);
    case ab:
        return new n;
    case ob:
    case ub:
        return new n(e);
    case ib:
        return Zy(e);
    case sb:
        return new n;
    case cb:
        return eb(e)
    }
}
var Eb = _b
  , Sb = qr
  , Pb = Ne
  , Ab = "[object Map]";
function Tb(e) {
    return Pb(e) && Sb(e) == Ab
}
var Ob = Tb
  , Cb = Ob
  , xb = Wr
  , oi = da
  , ii = oi && oi.isMap
  , Ib = ii ? xb(ii) : Cb
  , $b = Ib
  , Rb = qr
  , Lb = Ne
  , Mb = "[object Set]";
function kb(e) {
    return Lb(e) && Rb(e) == Mb
}
var Db = kb
  , Gb = Db
  , Nb = Wr
  , si = da
  , ui = si && si.isSet
  , Ub = ui ? Nb(ui) : Gb
  , jb = Ub
  , Fb = ua
  , Bb = uu
  , Hb = au
  , Wb = my
  , Vb = yy
  , qb = Qs
  , Kb = ba
  , Yb = Sy
  , zb = Ly
  , Xb = us
  , Jb = Ny
  , Qb = qr
  , Zb = By
  , e_ = Eb
  , t_ = eu
  , r_ = Ge
  , n_ = Hr
  , a_ = $b
  , o_ = ot
  , i_ = jb
  , s_ = Vr
  , u_ = Qt
  , c_ = 1
  , l_ = 2
  , d_ = 4
  , gu = "[object Arguments]"
  , f_ = "[object Array]"
  , p_ = "[object Boolean]"
  , g_ = "[object Date]"
  , m_ = "[object Error]"
  , mu = "[object Function]"
  , h_ = "[object GeneratorFunction]"
  , v_ = "[object Map]"
  , w_ = "[object Number]"
  , hu = "[object Object]"
  , y_ = "[object RegExp]"
  , b_ = "[object Set]"
  , __ = "[object String]"
  , E_ = "[object Symbol]"
  , S_ = "[object WeakMap]"
  , P_ = "[object ArrayBuffer]"
  , A_ = "[object DataView]"
  , T_ = "[object Float32Array]"
  , O_ = "[object Float64Array]"
  , C_ = "[object Int8Array]"
  , x_ = "[object Int16Array]"
  , I_ = "[object Int32Array]"
  , $_ = "[object Uint8Array]"
  , R_ = "[object Uint8ClampedArray]"
  , L_ = "[object Uint16Array]"
  , M_ = "[object Uint32Array]"
  , W = {};
W[gu] = W[f_] = W[P_] = W[A_] = W[p_] = W[g_] = W[T_] = W[O_] = W[C_] = W[x_] = W[I_] = W[v_] = W[w_] = W[hu] = W[y_] = W[b_] = W[__] = W[E_] = W[$_] = W[R_] = W[L_] = W[M_] = !0;
W[m_] = W[mu] = W[S_] = !1;
function mr(e, t, r, n, a, o) {
    var i, s = t & c_, c = t & l_, g = t & d_;
    if (r && (i = a ? r(e, n, a, o) : r(e)),
    i !== void 0)
        return i;
    if (!o_(e))
        return e;
    var f = r_(e);
    if (f) {
        if (i = Zb(e),
        !s)
            return Kb(e, i)
    } else {
        var m = Qb(e)
          , u = m == mu || m == h_;
        if (n_(e))
            return qb(e, s);
        if (m == hu || m == gu || u && !a) {
            if (i = c || u ? {} : t_(e),
            !s)
                return c ? zb(e, Vb(i, e)) : Yb(e, Wb(i, e))
        } else {
            if (!W[m])
                return a ? e : {};
            i = e_(e, m, s)
        }
    }
    o || (o = new Fb);
    var l = o.get(e);
    if (l)
        return l;
    o.set(e, i),
    i_(e) ? e.forEach(function(h) {
        i.add(mr(h, t, r, h, e, o))
    }) : a_(e) && e.forEach(function(h, v) {
        i.set(v, mr(h, t, r, v, e, o))
    });
    var d = g ? c ? Jb : Xb : c ? u_ : s_
      , p = f ? void 0 : d(e);
    return Bb(p || e, function(h, v) {
        p && (v = h,
        h = e[v]),
        Hb(i, v, mr(h, t, r, v, e, o))
    }),
    i
}
var k_ = mr
  , D_ = k_
  , G_ = 1
  , N_ = 4;
function U_(e) {
    return D_(e, G_ | N_)
}
var j_ = U_;
const Rt = ge(j_);
var ut = {}
  , ft = {};
function F_(e, t) {
    Object.keys(ft).forEach(function(r) {
        ft[r]instanceof Function && ft[r](Rt(e), Rt(t))
    })
}
function B_(e, t) {
    return {
        onGlobalStateChange: function(n, a) {
            if (!(n instanceof Function)) {
                console.error("[qiankun] callback must be function!");
                return
            }
            if (ft[e] && console.warn("[qiankun] '".concat(e, "' global listener already exists before this, new listener will overwrite it.")),
            ft[e] = n,
            a) {
                var o = Rt(ut);
                n(o, o)
            }
        },
        setGlobalState: function() {
            var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            if (n === ut)
                return console.warn("[qiankun] state has not changed！"),
                !1;
            var a = []
              , o = Rt(ut);
            return ut = Rt(Object.keys(n).reduce(function(i, s) {
                return t || i.hasOwnProperty(s) ? (a.push(s),
                Object.assign(i, Le({}, s, n[s]))) : (console.warn("[qiankun] '".concat(s, "' not declared when init state！")),
                i)
            }, ut)),
            a.length === 0 ? (console.warn("[qiankun] state has not changed！"),
            !1) : (F_(ut, o),
            !0)
        },
        offGlobalStateChange: function() {
            return delete ft[e],
            !0
        }
    }
}
var Se;
(function(e) {
    e.Proxy = "Proxy",
    e.Snapshot = "Snapshot",
    e.LegacyProxy = "LegacyProxy"
}
)(Se || (Se = {}));
var H_ = /\s/;
function W_(e) {
    for (var t = e.length; t-- && H_.test(e.charAt(t)); )
        ;
    return t
}
var V_ = W_
  , q_ = V_
  , K_ = /^\s+/;
function Y_(e) {
    return e && e.slice(0, q_(e) + 1).replace(K_, "")
}
var z_ = Y_
  , X_ = Ht
  , J_ = Ne
  , Q_ = "[object Symbol]";
function Z_(e) {
    return typeof e == "symbol" || J_(e) && X_(e) == Q_
}
var vu = Z_
  , eE = z_
  , ci = ot
  , tE = vu
  , li = 0 / 0
  , rE = /^[-+]0x[0-9a-f]+$/i
  , nE = /^0b[01]+$/i
  , aE = /^0o[0-7]+$/i
  , oE = parseInt;
function iE(e) {
    if (typeof e == "number")
        return e;
    if (tE(e))
        return li;
    if (ci(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = ci(t) ? t + "" : t
    }
    if (typeof e != "string")
        return e === 0 ? e : +e;
    e = eE(e);
    var r = nE.test(e);
    return r || aE.test(e) ? oE(e.slice(2), r ? 2 : 8) : rE.test(e) ? li : +e
}
var sE = iE
  , uE = sE
  , di = 1 / 0
  , cE = 17976931348623157e292;
function lE(e) {
    if (!e)
        return e === 0 ? e : 0;
    if (e = uE(e),
    e === di || e === -di) {
        var t = e < 0 ? -1 : 1;
        return t * cE
    }
    return e === e ? e : 0
}
var dE = lE
  , fE = dE;
function pE(e) {
    var t = fE(e)
      , r = t % 1;
    return t === t ? r ? t - r : t : 0
}
var gE = pE
  , mE = gE
  , hE = "Expected a function";
function vE(e, t) {
    var r;
    if (typeof t != "function")
        throw new TypeError(hE);
    return e = mE(e),
    function() {
        return --e > 0 && (r = t.apply(this, arguments)),
        e <= 1 && (t = void 0),
        r
    }
}
var wE = vE
  , yE = wE;
function bE(e) {
    return yE(2, e)
}
var _E = bE;
const EE = ge(_E);
function SE(e, t, r, n) {
    var a = -1
      , o = e == null ? 0 : e.length;
    for (n && o && (r = e[++a]); ++a < o; )
        r = t(r, e[a], a, e);
    return r
}
var PE = SE;
function AE(e) {
    return function(t) {
        return e?.[t]
    }
}
var TE = AE
  , OE = TE
  , CE = {
    À: "A",
    Á: "A",
    Â: "A",
    Ã: "A",
    Ä: "A",
    Å: "A",
    à: "a",
    á: "a",
    â: "a",
    ã: "a",
    ä: "a",
    å: "a",
    Ç: "C",
    ç: "c",
    Ð: "D",
    ð: "d",
    È: "E",
    É: "E",
    Ê: "E",
    Ë: "E",
    è: "e",
    é: "e",
    ê: "e",
    ë: "e",
    Ì: "I",
    Í: "I",
    Î: "I",
    Ï: "I",
    ì: "i",
    í: "i",
    î: "i",
    ï: "i",
    Ñ: "N",
    ñ: "n",
    Ò: "O",
    Ó: "O",
    Ô: "O",
    Õ: "O",
    Ö: "O",
    Ø: "O",
    ò: "o",
    ó: "o",
    ô: "o",
    õ: "o",
    ö: "o",
    ø: "o",
    Ù: "U",
    Ú: "U",
    Û: "U",
    Ü: "U",
    ù: "u",
    ú: "u",
    û: "u",
    ü: "u",
    Ý: "Y",
    ý: "y",
    ÿ: "y",
    Æ: "Ae",
    æ: "ae",
    Þ: "Th",
    þ: "th",
    ß: "ss",
    Ā: "A",
    Ă: "A",
    Ą: "A",
    ā: "a",
    ă: "a",
    ą: "a",
    Ć: "C",
    Ĉ: "C",
    Ċ: "C",
    Č: "C",
    ć: "c",
    ĉ: "c",
    ċ: "c",
    č: "c",
    Ď: "D",
    Đ: "D",
    ď: "d",
    đ: "d",
    Ē: "E",
    Ĕ: "E",
    Ė: "E",
    Ę: "E",
    Ě: "E",
    ē: "e",
    ĕ: "e",
    ė: "e",
    ę: "e",
    ě: "e",
    Ĝ: "G",
    Ğ: "G",
    Ġ: "G",
    Ģ: "G",
    ĝ: "g",
    ğ: "g",
    ġ: "g",
    ģ: "g",
    Ĥ: "H",
    Ħ: "H",
    ĥ: "h",
    ħ: "h",
    Ĩ: "I",
    Ī: "I",
    Ĭ: "I",
    Į: "I",
    İ: "I",
    ĩ: "i",
    ī: "i",
    ĭ: "i",
    į: "i",
    ı: "i",
    Ĵ: "J",
    ĵ: "j",
    Ķ: "K",
    ķ: "k",
    ĸ: "k",
    Ĺ: "L",
    Ļ: "L",
    Ľ: "L",
    Ŀ: "L",
    Ł: "L",
    ĺ: "l",
    ļ: "l",
    ľ: "l",
    ŀ: "l",
    ł: "l",
    Ń: "N",
    Ņ: "N",
    Ň: "N",
    Ŋ: "N",
    ń: "n",
    ņ: "n",
    ň: "n",
    ŋ: "n",
    Ō: "O",
    Ŏ: "O",
    Ő: "O",
    ō: "o",
    ŏ: "o",
    ő: "o",
    Ŕ: "R",
    Ŗ: "R",
    Ř: "R",
    ŕ: "r",
    ŗ: "r",
    ř: "r",
    Ś: "S",
    Ŝ: "S",
    Ş: "S",
    Š: "S",
    ś: "s",
    ŝ: "s",
    ş: "s",
    š: "s",
    Ţ: "T",
    Ť: "T",
    Ŧ: "T",
    ţ: "t",
    ť: "t",
    ŧ: "t",
    Ũ: "U",
    Ū: "U",
    Ŭ: "U",
    Ů: "U",
    Ű: "U",
    Ų: "U",
    ũ: "u",
    ū: "u",
    ŭ: "u",
    ů: "u",
    ű: "u",
    ų: "u",
    Ŵ: "W",
    ŵ: "w",
    Ŷ: "Y",
    ŷ: "y",
    Ÿ: "Y",
    Ź: "Z",
    Ż: "Z",
    Ž: "Z",
    ź: "z",
    ż: "z",
    ž: "z",
    Ĳ: "IJ",
    ĳ: "ij",
    Œ: "Oe",
    œ: "oe",
    ŉ: "'n",
    ſ: "s"
}
  , xE = OE(CE)
  , IE = xE;
function $E(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, a = Array(n); ++r < n; )
        a[r] = t(e[r], r, e);
    return a
}
var wu = $E
  , fi = Ur
  , RE = wu
  , LE = Ge
  , ME = vu
  , kE = 1 / 0
  , pi = fi ? fi.prototype : void 0
  , gi = pi ? pi.toString : void 0;
function yu(e) {
    if (typeof e == "string")
        return e;
    if (LE(e))
        return RE(e, yu) + "";
    if (ME(e))
        return gi ? gi.call(e) : "";
    var t = e + "";
    return t == "0" && 1 / e == -kE ? "-0" : t
}
var DE = yu
  , GE = DE;
function NE(e) {
    return e == null ? "" : GE(e)
}
var bu = NE
  , UE = IE
  , jE = bu
  , FE = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g
  , BE = "\\u0300-\\u036f"
  , HE = "\\ufe20-\\ufe2f"
  , WE = "\\u20d0-\\u20ff"
  , VE = BE + HE + WE
  , qE = "[" + VE + "]"
  , KE = RegExp(qE, "g");
function YE(e) {
    return e = jE(e),
    e && e.replace(FE, UE).replace(KE, "")
}
var zE = YE
  , XE = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function JE(e) {
    return e.match(XE) || []
}
var QE = JE
  , ZE = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function e1(e) {
    return ZE.test(e)
}
var t1 = e1
  , _u = "\\ud800-\\udfff"
  , r1 = "\\u0300-\\u036f"
  , n1 = "\\ufe20-\\ufe2f"
  , a1 = "\\u20d0-\\u20ff"
  , o1 = r1 + n1 + a1
  , Eu = "\\u2700-\\u27bf"
  , Su = "a-z\\xdf-\\xf6\\xf8-\\xff"
  , i1 = "\\xac\\xb1\\xd7\\xf7"
  , s1 = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf"
  , u1 = "\\u2000-\\u206f"
  , c1 = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000"
  , Pu = "A-Z\\xc0-\\xd6\\xd8-\\xde"
  , l1 = "\\ufe0e\\ufe0f"
  , Au = i1 + s1 + u1 + c1
  , Tu = "['’]"
  , mi = "[" + Au + "]"
  , d1 = "[" + o1 + "]"
  , Ou = "\\d+"
  , f1 = "[" + Eu + "]"
  , Cu = "[" + Su + "]"
  , xu = "[^" + _u + Au + Ou + Eu + Su + Pu + "]"
  , p1 = "\\ud83c[\\udffb-\\udfff]"
  , g1 = "(?:" + d1 + "|" + p1 + ")"
  , m1 = "[^" + _u + "]"
  , Iu = "(?:\\ud83c[\\udde6-\\uddff]){2}"
  , $u = "[\\ud800-\\udbff][\\udc00-\\udfff]"
  , ct = "[" + Pu + "]"
  , h1 = "\\u200d"
  , hi = "(?:" + Cu + "|" + xu + ")"
  , v1 = "(?:" + ct + "|" + xu + ")"
  , vi = "(?:" + Tu + "(?:d|ll|m|re|s|t|ve))?"
  , wi = "(?:" + Tu + "(?:D|LL|M|RE|S|T|VE))?"
  , Ru = g1 + "?"
  , Lu = "[" + l1 + "]?"
  , w1 = "(?:" + h1 + "(?:" + [m1, Iu, $u].join("|") + ")" + Lu + Ru + ")*"
  , y1 = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])"
  , b1 = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])"
  , _1 = Lu + Ru + w1
  , E1 = "(?:" + [f1, Iu, $u].join("|") + ")" + _1
  , S1 = RegExp([ct + "?" + Cu + "+" + vi + "(?=" + [mi, ct, "$"].join("|") + ")", v1 + "+" + wi + "(?=" + [mi, ct + hi, "$"].join("|") + ")", ct + "?" + hi + "+" + vi, ct + "+" + wi, b1, y1, Ou, E1].join("|"), "g");
function P1(e) {
    return e.match(S1) || []
}
var A1 = P1
  , T1 = QE
  , O1 = t1
  , C1 = bu
  , x1 = A1;
function I1(e, t, r) {
    return e = C1(e),
    t = r ? void 0 : t,
    t === void 0 ? O1(e) ? x1(e) : T1(e) : e.match(t) || []
}
var $1 = I1
  , R1 = PE
  , L1 = zE
  , M1 = $1
  , k1 = "['’]"
  , D1 = RegExp(k1, "g");
function G1(e) {
    return function(t) {
        return R1(M1(L1(t).replace(D1, "")), e, "")
    }
}
var N1 = G1
  , U1 = N1
  , j1 = U1(function(e, t, r) {
    return e + (r ? "_" : "") + t.toLowerCase()
})
  , F1 = j1;
const B1 = ge(F1);
var H1 = "2.9.2";
function lt(e) {
    return Array.isArray(e) ? e : [e]
}
var W1 = typeof window.Zone == "function" ? setTimeout : function(e) {
    return Promise.resolve().then(e)
}
  , dn = !1;
function V1(e) {
    dn || (dn = !0,
    W1(function() {
        e(),
        dn = !1
    }))
}
var fn = new WeakMap;
function q1(e) {
    var t = e.prototype && e.prototype.constructor === e && Object.getOwnPropertyNames(e.prototype).length > 1;
    if (t)
        return !0;
    if (fn.has(e))
        return fn.get(e);
    var r = t;
    if (!r) {
        var n = e.toString()
          , a = /^function\b\s[A-Z].*/
          , o = /^class\b/;
        r = a.test(n) || o.test(n)
    }
    return fn.set(e, r),
    r
}
var K1 = typeof document.all == "function" && typeof document.all > "u"
  , yi = new WeakMap;
function Y1(e) {
    if (yi.has(e))
        return !0;
    var t = K1 ? typeof e == "function" && typeof e < "u" : typeof e == "function";
    return t && yi.set(e, t),
    t
}
var bi = new WeakMap;
function z1(e, t) {
    if (!e || !t)
        return !1;
    var r = bi.get(e) || {};
    if (r[t])
        return r[t];
    var n = Object.getOwnPropertyDescriptor(e, t)
      , a = !!(n && n.configurable === !1 && (n.writable === !1 || n.get && !n.set));
    return r[t] = a,
    bi.set(e, r),
    a
}
var pn = new WeakMap;
function X1(e) {
    if (pn.has(e))
        return pn.get(e);
    var t = e.name.indexOf("bound ") === 0 && !e.hasOwnProperty("prototype");
    return pn.set(e, t),
    t
}
var It = "qiankun-head";
function J1(e, t) {
    return function(r) {
        var n;
        return r.indexOf("<head>") !== -1 ? n = r.replace("<head>", "<".concat(It, ">")).replace("</head>", "</".concat(It, ">")) : n = "<".concat(It, "></").concat(It, ">").concat(r),
        '<div id="'.concat(Mu(e), '" data-name="').concat(e, '" data-version="').concat(H1, '" data-sandbox-cfg=').concat(JSON.stringify(t), ">").concat(n, "</div>")
    }
}
function Mu(e) {
    return "__qiankun_microapp_wrapper_for_".concat(B1(e), "__")
}
var Me = new Function("return this")()
  , Q1 = EE(function() {
    return Me.hasOwnProperty("__app_instance_name_map__") || Object.defineProperty(Me, "__app_instance_name_map__", {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: {}
    }),
    Me.__app_instance_name_map__
})
  , Z1 = function(t) {
    var r = Q1();
    return t in r ? (r[t]++,
    "".concat(t, "_").concat(r[t])) : (Me.__app_instance_name_map__[t] = 0,
    t)
};
function gn(e) {
    var t = e ?? {}
      , r = t.bootstrap
      , n = t.mount
      , a = t.unmount;
    return rt(r) && rt(n) && rt(a)
}
var ku = yt(function e() {
    var t = this;
    wt(this, e),
    this.promise = void 0,
    this.resolve = void 0,
    this.reject = void 0,
    this.promise = new Promise(function(r, n) {
        t.resolve = r,
        t.reject = n
    }
    )
});
function eS(e) {
    return tt(e) !== "object" || e.strictStyleIsolation ? !1 : !!e.experimentalStyleIsolation
}
function tS(e, t) {
    if (t.body.contains(e)) {
        for (var r = "", n, a, o = e; o !== t.documentElement; ) {
            for (n = 0,
            a = o; a; )
                a.nodeType === 1 && a.nodeName === o.nodeName && (n += 1),
                a = a.previousSibling;
            r = "*[name()='".concat(o.nodeName, "'][").concat(n, "]/").concat(r),
            o = o.parentNode
        }
        return r = "/*[name()='".concat(t.documentElement.nodeName, "']/").concat(r),
        r = r.replace(/\/$/, ""),
        r
    }
}
function Du(e) {
    return typeof e == "string" ? document.querySelector(e) : e
}
function rS(e) {
    if (e) {
        var t = Du(e);
        if (t)
            return tS(t, document)
    }
}
var Gu = window.Proxy ? ["Array", "ArrayBuffer", "Boolean", "constructor", "DataView", "Date", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "Error", "escape", "eval", "EvalError", "Float32Array", "Float64Array", "Function", "hasOwnProperty", "Infinity", "Int16Array", "Int32Array", "Int8Array", "isFinite", "isNaN", "isPrototypeOf", "JSON", "Map", "Math", "NaN", "Number", "Object", "parseFloat", "parseInt", "Promise", "propertyIsEnumerable", "Proxy", "RangeError", "ReferenceError", "Reflect", "RegExp", "Set", "String", "Symbol", "SyntaxError", "toLocaleString", "toString", "TypeError", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray", "undefined", "unescape", "URIError", "valueOf", "WeakMap", "WeakSet"] : []
  , Nu = null;
function Uu() {
    return Nu
}
function _i(e) {
    Nu = e
}
var ju = ["window", "self", "globalThis"]
  , Fu = Array.from(new Set([].concat(Ve(Gu), ju, ["requestAnimationFrame"])))
  , Ei = new WeakMap;
function Bu(e, t) {
    if (Y1(t) && !X1(t) && !q1(t)) {
        var r = Ei.get(t);
        if (r)
            return r;
        var n = Function.prototype.bind.call(t, e);
        for (var a in t)
            n[a] = t[a];
        if (t.hasOwnProperty("prototype") && !n.hasOwnProperty("prototype") && Object.defineProperty(n, "prototype", {
            value: t.prototype,
            enumerable: !1,
            writable: !0
        }),
        typeof t.toString == "function") {
            var o = t.hasOwnProperty("toString") && !n.hasOwnProperty("toString")
              , i = n.toString === Function.prototype.toString;
            if (o || i) {
                var s = Object.getOwnPropertyDescriptor(o ? t : Function.prototype, "toString");
                Object.defineProperty(n, "toString", Q(Q({}, s), s?.get ? null : {
                    value: function() {
                        return t.toString()
                    }
                }))
            }
        }
        return Ei.set(t, n),
        n
    }
    return t
}
function nS(e, t) {
    var r = Object.getOwnPropertyDescriptor(e, t);
    return r ? r.configurable : !0
}
var aS = function() {
    function e(t) {
        var r = this
          , n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : window;
        wt(this, e),
        this.addedPropsMapInSandbox = new Map,
        this.modifiedPropsOriginalValueMapInSandbox = new Map,
        this.currentUpdatedPropsValueMap = new Map,
        this.name = void 0,
        this.proxy = void 0,
        this.globalContext = void 0,
        this.type = void 0,
        this.sandboxRunning = !0,
        this.latestSetProp = null,
        this.name = t,
        this.globalContext = n,
        this.type = Se.LegacyProxy;
        var a = this.addedPropsMapInSandbox
          , o = this.modifiedPropsOriginalValueMapInSandbox
          , i = this.currentUpdatedPropsValueMap
          , s = n
          , c = Object.create(null)
          , g = function(u, l, d) {
            var p = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0;
            return r.sandboxRunning && (s.hasOwnProperty(u) ? o.has(u) || o.set(u, d) : a.set(u, l),
            i.set(u, l),
            p && (s[u] = l),
            r.latestSetProp = u),
            !0
        }
          , f = new Proxy(c,{
            set: function(u, l, d) {
                var p = s[l];
                return g(l, d, p, !0)
            },
            get: function(u, l) {
                if (l === "top" || l === "parent" || l === "window" || l === "self")
                    return f;
                var d = s[l];
                return Bu(s, d)
            },
            has: function(u, l) {
                return l in s
            },
            getOwnPropertyDescriptor: function(u, l) {
                var d = Object.getOwnPropertyDescriptor(s, l);
                return d && !d.configurable && (d.configurable = !0),
                d
            },
            defineProperty: function(u, l, d) {
                var p = s[l]
                  , h = Reflect.defineProperty(s, l, d)
                  , v = s[l];
                return g(l, v, p, !1),
                h
            }
        });
        this.proxy = f
    }
    return yt(e, [{
        key: "setWindowProp",
        value: function(r, n, a) {
            n === void 0 && a ? delete this.globalContext[r] : nS(this.globalContext, r) && tt(r) !== "symbol" && (Object.defineProperty(this.globalContext, r, {
                writable: !0,
                configurable: !0
            }),
            this.globalContext[r] = n)
        }
    }, {
        key: "active",
        value: function() {
            var r = this;
            this.sandboxRunning || this.currentUpdatedPropsValueMap.forEach(function(n, a) {
                return r.setWindowProp(a, n)
            }),
            this.sandboxRunning = !0
        }
    }, {
        key: "inactive",
        value: function() {
            var r = this;
            this.modifiedPropsOriginalValueMapInSandbox.forEach(function(n, a) {
                return r.setWindowProp(a, n)
            }),
            this.addedPropsMapInSandbox.forEach(function(n, a) {
                return r.setWindowProp(a, void 0, !0)
            }),
            this.sandboxRunning = !1
        }
    }]),
    e
}(), Lt;
(function(e) {
    e[e.STYLE = 1] = "STYLE",
    e[e.MEDIA = 4] = "MEDIA",
    e[e.SUPPORTS = 12] = "SUPPORTS",
    e[e.IMPORT = 3] = "IMPORT",
    e[e.FONT_FACE = 5] = "FONT_FACE",
    e[e.PAGE = 6] = "PAGE",
    e[e.KEYFRAMES = 7] = "KEYFRAMES",
    e[e.KEYFRAME = 8] = "KEYFRAME"
}
)(Lt || (Lt = {}));
var sr = function(t) {
    return [].slice.call(t, 0)
}
  , oS = HTMLBodyElement.prototype.appendChild
  , Hu = function() {
    function e() {
        wt(this, e),
        this.sheet = void 0,
        this.swapNode = void 0;
        var t = document.createElement("style");
        oS.call(document.body, t),
        this.swapNode = t,
        this.sheet = t.sheet,
        this.sheet.disabled = !0
    }
    return yt(e, [{
        key: "process",
        value: function(r) {
            var n = this
              , a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
            if (!(e.ModifiedTag in r)) {
                if (r.textContent !== "") {
                    var o, i = document.createTextNode(r.textContent || "");
                    this.swapNode.appendChild(i);
                    var s = this.swapNode.sheet
                      , c = sr((o = s?.cssRules) !== null && o !== void 0 ? o : [])
                      , g = this.rewrite(c, a);
                    r.textContent = g,
                    this.swapNode.removeChild(i),
                    r[e.ModifiedTag] = !0;
                    return
                }
                var f = new MutationObserver(function(m) {
                    for (var u = 0; u < m.length; u += 1) {
                        var l = m[u];
                        if (e.ModifiedTag in r)
                            return;
                        if (l.type === "childList") {
                            var d, p = r.sheet, h = sr((d = p?.cssRules) !== null && d !== void 0 ? d : []), v = n.rewrite(h, a);
                            r.textContent = v,
                            r[e.ModifiedTag] = !0
                        }
                    }
                }
                );
                f.observe(r, {
                    childList: !0
                })
            }
        }
    }, {
        key: "rewrite",
        value: function(r) {
            var n = this
              , a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ""
              , o = "";
            return r.forEach(function(i) {
                switch (i.type) {
                case Lt.STYLE:
                    o += n.ruleStyle(i, a);
                    break;
                case Lt.MEDIA:
                    o += n.ruleMedia(i, a);
                    break;
                case Lt.SUPPORTS:
                    o += n.ruleSupport(i, a);
                    break;
                default:
                    o += "".concat(i.cssText);
                    break
                }
            }),
            o
        }
    }, {
        key: "ruleStyle",
        value: function(r, n) {
            var a = /((?:[^\w\-.#]|^)(body|html|:root))/gm
              , o = /(html[^\w{[]+)/gm
              , i = r.selectorText.trim()
              , s = r.cssText;
            if (i === "html" || i === "body" || i === ":root")
                return s.replace(a, n);
            if (o.test(r.selectorText)) {
                var c = /(html[^\w{]+)(\+|~)/gm;
                c.test(r.selectorText) || (s = s.replace(o, ""))
            }
            return s = s.replace(/^[\s\S]+{/, function(g) {
                return g.replace(/(^|,\n?)([^,]+)/g, function(f, m, u) {
                    return a.test(f) ? f.replace(a, function(l) {
                        var d = [",", "("];
                        return l && d.includes(l[0]) ? "".concat(l[0]).concat(n) : n
                    }) : "".concat(m).concat(n, " ").concat(u.replace(/^ */, ""))
                })
            }),
            s
        }
    }, {
        key: "ruleMedia",
        value: function(r, n) {
            var a = this.rewrite(sr(r.cssRules), n);
            return "@media ".concat(r.conditionText || r.media.mediaText, " {").concat(a, "}")
        }
    }, {
        key: "ruleSupport",
        value: function(r, n) {
            var a = this.rewrite(sr(r.cssRules), n);
            return "@supports ".concat(r.conditionText || r.cssText.split("{")[0], " {").concat(a, "}")
        }
    }]),
    e
}();
Hu.ModifiedTag = "Symbol(style-modified-qiankun)";
var mn, qn = "data-qiankun", Kn = function(t, r, n) {
    mn || (mn = new Hu),
    r.tagName === "LINK" && console.warn("Feature: sandbox.experimentalStyleIsolation is not support for link element yet.");
    var a = t;
    if (a) {
        var o = (a.tagName || "").toLowerCase();
        if (o && r.tagName === "STYLE") {
            var i = "".concat(o, "[").concat(qn, '="').concat(n, '"]');
            mn.process(r, i)
        }
    }
}, hr = HTMLHeadElement.prototype.appendChild, hn = HTMLHeadElement.prototype.removeChild, vn = HTMLBodyElement.prototype.appendChild, wn = HTMLBodyElement.prototype.removeChild, yn = HTMLHeadElement.prototype.insertBefore, iS = HTMLElement.prototype.removeChild, xa = "SCRIPT", kr = "LINK", Ia = "STYLE", Wu = Symbol("target"), Dr = function(t) {
    return t.querySelector(It)
};
function sS(e) {
    return !e.type || ["text/javascript", "module", "application/javascript", "text/ecmascript", "application/ecmascript"].indexOf(e.type) !== -1
}
function $a(e) {
    return e?.toUpperCase() === kr || e?.toUpperCase() === Ia || e?.toUpperCase() === xa
}
function Vu(e) {
    var t, r;
    return !e.textContent && (((t = e.sheet) === null || t === void 0 ? void 0 : t.cssRules.length) || ((r = Zu(e)) === null || r === void 0 ? void 0 : r.length))
}
var Yn = new Map;
function He(e, t, r) {
    var n = Yn.get(e) || {
        bootstrappingPatchCount: 0,
        mountingPatchCount: 0
    };
    switch (t) {
    case "increase":
        n["".concat(r, "PatchCount")] += 1;
        break;
    case "decrease":
        n["".concat(r, "PatchCount")] > 0 && (n["".concat(r, "PatchCount")] -= 1);
        break
    }
    Yn.set(e, n)
}
function qu() {
    return Array.from(Yn.entries()).every(function(e) {
        var t = aa(e, 2)
          , r = t[1]
          , n = r.bootstrappingPatchCount
          , a = r.mountingPatchCount;
        return n === 0 && a === 0
    })
}
function Ku(e, t) {
    return Object.defineProperties(e, {
        srcElement: {
            get: t
        },
        target: {
            get: t
        }
    }),
    e
}
function Yu(e) {
    var t = new CustomEvent("load")
      , r = Ku(t, function() {
        return e
    });
    rt(e.onload) ? e.onload(r) : e.dispatchEvent(r)
}
function zu(e) {
    var t = new CustomEvent("error")
      , r = Ku(t, function() {
        return e
    });
    rt(e.onerror) ? e.onerror(r) : e.dispatchEvent(r)
}
function uS(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : fetch
      , n = document.createElement("style")
      , a = e.href;
    return n.dataset.qiankunHref = a,
    r(a).then(function(o) {
        return o.text()
    }).then(function(o) {
        n.appendChild(document.createTextNode(o)),
        t(n),
        Yu(e)
    }).catch(function() {
        return zu(e)
    }),
    n
}
var Xu = new WeakMap
  , zn = new WeakMap
  , Ju = new WeakMap;
function Qu(e) {
    e.forEach(function(t) {
        t instanceof HTMLStyleElement && Vu(t) && t.sheet && Xu.set(t, t.sheet.cssRules)
    })
}
function Zu(e) {
    return Xu.get(e)
}
function bn(e) {
    return function(r) {
        var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null
          , a = r
          , o = e.rawDOMAppendOrInsertBefore
          , i = e.isInvokedByMicroApp
          , s = e.containerConfigGetter
          , c = e.target
          , g = c === void 0 ? "body" : c;
        if (!$a(a.tagName) || !i(a))
            return o.call(this, a, n);
        if (a.tagName) {
            var f = s(a)
              , m = f.appName
              , u = f.appWrapperGetter
              , l = f.proxy
              , d = f.strictGlobal
              , p = f.speedySandbox
              , h = f.dynamicStyleSheetElements
              , v = f.scopedCSS
              , A = f.excludeAssetFilter;
            switch (a.tagName) {
            case kr:
            case Ia:
                {
                    var b = r
                      , S = b
                      , O = S.href;
                    if (A && O && A(O))
                        return o.call(this, a, n);
                    Object.defineProperty(b, Wu, {
                        value: g,
                        writable: !0,
                        configurable: !0
                    });
                    var y = u();
                    if (v) {
                        var k, G = ((k = a.tagName) === null || k === void 0 ? void 0 : k.toUpperCase()) === kr && a.rel === "stylesheet" && a.href;
                        if (G) {
                            var N, X = typeof dt.fetch == "function" ? dt.fetch : (N = dt.fetch) === null || N === void 0 ? void 0 : N.fn;
                            b = uS(a, function(I) {
                                return Kn(y, I, m)
                            }, X),
                            Ju.set(a, b)
                        } else
                            Kn(y, b, m)
                    }
                    var le = g === "head" ? Dr(y) : y;
                    h.push(b);
                    var re = le.contains(n) ? n : null;
                    return o.call(le, b, re)
                }
            case xa:
                {
                    var oe = a
                      , V = oe.src
                      , xe = oe.text;
                    if (A && V && A(V) || !sS(a))
                        return o.call(this, a, n);
                    var ne = u()
                      , te = g === "head" ? Dr(ne) : ne
                      , me = dt.fetch
                      , P = te.contains(n) ? n : null
                      , w = p ? Fu : [];
                    if (V) {
                        var _ = !1;
                        Mr(null, [V], l, {
                            fetch: me,
                            strictGlobal: d,
                            scopedGlobalVariables: w,
                            beforeExec: function() {
                                var B = function() {
                                    var q = Object.getOwnPropertyDescriptor(document, "currentScript");
                                    return !q || q.configurable
                                };
                                B() && (Object.defineProperty(document, "currentScript", {
                                    get: function() {
                                        return a
                                    },
                                    configurable: !0
                                }),
                                _ = !0)
                            },
                            success: function() {
                                Yu(a),
                                _ && delete document.currentScript,
                                a = null
                            },
                            error: function() {
                                zu(a),
                                _ && delete document.currentScript,
                                a = null
                            }
                        });
                        var x = document.createComment("dynamic script ".concat(V, " replaced by qiankun"));
                        return zn.set(a, x),
                        o.call(te, x, P)
                    }
                    Mr(null, ["<script>".concat(xe, "<\/script>")], l, {
                        strictGlobal: d,
                        scopedGlobalVariables: w
                    });
                    var R = document.createComment("dynamic inline script replaced by qiankun");
                    return zn.set(a, R),
                    o.call(te, R, P)
                }
            }
        }
        return o.call(this, a, n)
    }
}
function Si(e, t, r) {
    return function(a) {
        var o = a.tagName;
        if (!$a(o))
            return e.call(this, a);
        try {
            var i, s = t(a), c = s.appWrapperGetter, g = s.dynamicStyleSheetElements;
            switch (o) {
            case Ia:
            case kr:
                {
                    i = Ju.get(a) || a;
                    var f = g.indexOf(i);
                    f !== -1 && g.splice(f, 1);
                    break
                }
            case xa:
                {
                    i = zn.get(a) || a;
                    break
                }
            default:
                i = a
            }
            var m = c()
              , u = r === "head" ? Dr(m) : m;
            if (u.contains(i))
                return iS.call(i.parentNode, i)
        } catch (l) {
            console.warn(l)
        }
        return e.call(this, a)
    }
}
function ec(e, t) {
    return HTMLHeadElement.prototype.appendChild === hr && HTMLBodyElement.prototype.appendChild === vn && HTMLHeadElement.prototype.insertBefore === yn && (HTMLHeadElement.prototype.appendChild = bn({
        rawDOMAppendOrInsertBefore: hr,
        containerConfigGetter: t,
        isInvokedByMicroApp: e,
        target: "head"
    }),
    HTMLBodyElement.prototype.appendChild = bn({
        rawDOMAppendOrInsertBefore: vn,
        containerConfigGetter: t,
        isInvokedByMicroApp: e,
        target: "body"
    }),
    HTMLHeadElement.prototype.insertBefore = bn({
        rawDOMAppendOrInsertBefore: yn,
        containerConfigGetter: t,
        isInvokedByMicroApp: e,
        target: "head"
    })),
    HTMLHeadElement.prototype.removeChild === hn && HTMLBodyElement.prototype.removeChild === wn && (HTMLHeadElement.prototype.removeChild = Si(hn, t, "head"),
    HTMLBodyElement.prototype.removeChild = Si(wn, t, "body")),
    function() {
        HTMLHeadElement.prototype.appendChild = hr,
        HTMLHeadElement.prototype.removeChild = hn,
        HTMLBodyElement.prototype.appendChild = vn,
        HTMLBodyElement.prototype.removeChild = wn,
        HTMLHeadElement.prototype.insertBefore = yn
    }
}
function tc(e, t) {
    e.forEach(function(r) {
        var n = t(r);
        if (n && r instanceof HTMLStyleElement && Vu(r)) {
            var a = Zu(r);
            if (a)
                for (var o = 0; o < a.length; o++) {
                    var i = a[o]
                      , s = r.sheet;
                    s.insertRule(i.cssText, s.cssRules.length)
                }
        }
    })
}
function Gr(e, t, r) {
    var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0
      , a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1
      , o = arguments.length > 5 ? arguments[5] : void 0
      , i = []
      , s = ec(function() {
        return Fs(window.location).some(function(c) {
            return c === e
        })
    }, function() {
        return {
            appName: e,
            appWrapperGetter: t,
            proxy: r,
            strictGlobal: !1,
            speedySandbox: !1,
            scopedCSS: a,
            dynamicStyleSheetElements: i,
            excludeAssetFilter: o
        }
    });
    return n || He(e, "increase", "bootstrapping"),
    n && He(e, "increase", "mounting"),
    function() {
        return n || He(e, "decrease", "bootstrapping"),
        n && He(e, "decrease", "mounting"),
        qu() && s(),
        Qu(i),
        function() {
            tc(i, function(f) {
                var m = t();
                return m.contains(f) ? !1 : (document.head.appendChild.call(m, f),
                !0)
            }),
            n && (i = [])
        }
    }
}
Object.defineProperty(Me, "__proxyAttachContainerConfigMap__", {
    enumerable: !1,
    writable: !0
});
Me.__proxyAttachContainerConfigMap__ = Me.__proxyAttachContainerConfigMap__ || new WeakMap;
var Xn = Me.__proxyAttachContainerConfigMap__
  , Jn = new WeakMap
  , Pi = new WeakMap;
function cS() {
    var e = Pi.get(document.createElement);
    if (!e) {
        var t = document.createElement;
        Document.prototype.createElement = function(n, a) {
            var o = t.call(this, n, a);
            if ($a(n)) {
                var i = Uu() || {}
                  , s = i.window;
                if (s) {
                    var c = Xn.get(s);
                    c && Jn.set(o, c)
                }
            }
            return o
        }
        ,
        document.hasOwnProperty("createElement") && (document.createElement = Document.prototype.createElement),
        Pi.set(Document.prototype.createElement, t)
    }
    return function() {
        e && (Document.prototype.createElement = e,
        document.createElement = e)
    }
}
function rc(e, t, r) {
    var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0
      , a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1
      , o = arguments.length > 5 ? arguments[5] : void 0
      , i = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : !1
      , s = Xn.get(r);
    s || (s = {
        appName: e,
        proxy: r,
        appWrapperGetter: t,
        dynamicStyleSheetElements: [],
        strictGlobal: !0,
        speedySandbox: i,
        excludeAssetFilter: o,
        scopedCSS: a
    },
    Xn.set(r, s));
    var c = s
      , g = c.dynamicStyleSheetElements
      , f = cS()
      , m = ec(function(u) {
        return Jn.has(u)
    }, function(u) {
        return Jn.get(u)
    });
    return n || He(e, "increase", "bootstrapping"),
    n && He(e, "increase", "mounting"),
    function() {
        return n || He(e, "decrease", "bootstrapping"),
        n && He(e, "decrease", "mounting"),
        qu() && (m(),
        f()),
        Qu(g),
        function() {
            tc(g, function(d) {
                var p = t();
                if (!p.contains(d)) {
                    var h = d[Wu] === "head" ? Dr(p) : p;
                    return hr.call(h, d),
                    !0
                }
                return !1
            })
        }
    }
}
function lS() {
    var e = function(a) {
        return Ir
    }
      , t = []
      , r = [];
    return window.g_history && rt(window.g_history.listen) && (e = window.g_history.listen.bind(window.g_history),
    window.g_history.listen = function(n) {
        t.push(n);
        var a = e(n);
        return r.push(a),
        function() {
            a(),
            r.splice(r.indexOf(a), 1),
            t.splice(t.indexOf(n), 1)
        }
    }
    ),
    function() {
        var a = Ir;
        return t.length && (a = function() {
            t.forEach(function(i) {
                return window.g_history.listen(i)
            })
        }
        ),
        r.forEach(function(o) {
            return o()
        }),
        window.g_history && rt(window.g_history.listen) && (window.g_history.listen = e),
        a
    }
}
var Ai = window.setInterval
  , Ti = window.clearInterval;
function dS(e) {
    var t = [];
    return e.clearInterval = function(r) {
        return t = t.filter(function(n) {
            return n !== r
        }),
        Ti.call(window, r)
    }
    ,
    e.setInterval = function(r, n) {
        for (var a = arguments.length, o = new Array(a > 2 ? a - 2 : 0), i = 2; i < a; i++)
            o[i - 2] = arguments[i];
        var s = Ai.apply(void 0, [r, n].concat(o));
        return t = [].concat(Ve(t), [s]),
        s
    }
    ,
    function() {
        return t.forEach(function(n) {
            return e.clearInterval(n)
        }),
        e.setInterval = Ai,
        e.clearInterval = Ti,
        Ir
    }
}
var Oi = window.addEventListener
  , Ci = window.removeEventListener;
function fS(e) {
    var t = new Map;
    return e.addEventListener = function(r, n, a) {
        var o = t.get(r) || [];
        return t.set(r, [].concat(Ve(o), [n])),
        Oi.call(window, r, n, a)
    }
    ,
    e.removeEventListener = function(r, n, a) {
        var o = t.get(r);
        return o && o.length && o.indexOf(n) !== -1 && o.splice(o.indexOf(n), 1),
        Ci.call(window, r, n, a)
    }
    ,
    function() {
        return t.forEach(function(n, a) {
            return Ve(n).forEach(function(o) {
                return e.removeEventListener(a, o)
            })
        }),
        e.addEventListener = Oi,
        e.removeEventListener = Ci,
        Ir
    }
}
function pS(e, t, r, n, a, o) {
    var i, s, c = [function() {
        return dS(r.proxy)
    }
    , function() {
        return fS(r.proxy)
    }
    , function() {
        return lS()
    }
    ], g = (i = {},
    Le(i, Se.LegacyProxy, [].concat(c, [function() {
        return Gr(e, t, r.proxy, !0, n, a)
    }
    ])),
    Le(i, Se.Proxy, [].concat(c, [function() {
        return rc(e, t, r.proxy, !0, n, a, o)
    }
    ])),
    Le(i, Se.Snapshot, [].concat(c, [function() {
        return Gr(e, t, r.proxy, !0, n, a)
    }
    ])),
    i);
    return (s = g[r.type]) === null || s === void 0 ? void 0 : s.map(function(f) {
        return f()
    })
}
function gS(e, t, r, n, a, o) {
    var i, s, c = (i = {},
    Le(i, Se.LegacyProxy, [function() {
        return Gr(e, t, r.proxy, !1, n, a)
    }
    ]),
    Le(i, Se.Proxy, [function() {
        return rc(e, t, r.proxy, !1, n, a, o)
    }
    ]),
    Le(i, Se.Snapshot, [function() {
        return Gr(e, t, r.proxy, !1, n, a)
    }
    ]),
    i);
    return (s = c[r.type]) === null || s === void 0 ? void 0 : s.map(function(g) {
        return g()
    })
}
function mS(e, t, r, n) {
    for (var a = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < a; )
        if (t(e[o], o, e))
            return o;
    return -1
}
var hS = mS;
function vS(e) {
    return e !== e
}
var wS = vS;
function yS(e, t, r) {
    for (var n = r - 1, a = e.length; ++n < a; )
        if (e[n] === t)
            return n;
    return -1
}
var bS = yS
  , _S = hS
  , ES = wS
  , SS = bS;
function PS(e, t, r) {
    return t === t ? SS(e, t, r) : _S(e, ES, r)
}
var AS = PS
  , TS = AS;
function OS(e, t) {
    var r = e == null ? 0 : e.length;
    return !!r && TS(e, t, 0) > -1
}
var CS = OS;
function xS(e, t, r) {
    for (var n = -1, a = e == null ? 0 : e.length; ++n < a; )
        if (r(t, e[n]))
            return !0;
    return !1
}
var IS = xS
  , $S = Ji
  , RS = CS
  , LS = IS
  , MS = wu
  , kS = Wr
  , DS = Qi
  , GS = 200;
function NS(e, t, r, n) {
    var a = -1
      , o = RS
      , i = !0
      , s = e.length
      , c = []
      , g = t.length;
    if (!s)
        return c;
    r && (t = MS(t, kS(r))),
    n ? (o = LS,
    i = !1) : t.length >= GS && (o = DS,
    i = !1,
    t = new $S(t));
    e: for (; ++a < s; ) {
        var f = e[a]
          , m = r == null ? f : r(f);
        if (f = n || f !== 0 ? f : 0,
        i && m === m) {
            for (var u = g; u--; )
                if (t[u] === m)
                    continue e;
            c.push(f)
        } else
            o(t, m, n) || c.push(f)
    }
    return c
}
var US = NS
  , jS = US
  , FS = iu
  , BS = tu
  , HS = FS(function(e, t) {
    return BS(e) ? jS(e, t) : []
})
  , WS = HS;
const VS = ge(WS);
function qS(e) {
    return e.filter(function(r) {
        return r in this ? !1 : this[r] = !0
    }, Object.create(null))
}
var KS = Object.defineProperty
  , YS = window.__QIANKUN_DEVELOPMENT__ ? ["__REACT_ERROR_OVERLAY_GLOBAL_HOOK__"] : []
  , zS = ["System", "__cjsWrapper"].concat(YS)
  , XS = ["document", "top", "parent", "hasOwnProperty", "eval"]
  , xi = VS.apply(void 0, [Gu].concat(XS, Ve(ju))).reduce(function(e, t) {
    return Q(Q({}, e), {}, Le({}, t, !0))
}, {
    __proto__: null
})
  , JS = new Map([["fetch", !0], ["mockDomAPIInBlackList", !1]]);
function QS(e) {
    var t = new Map
      , r = {};
    return Object.getOwnPropertyNames(e).filter(function(n) {
        var a = Object.getOwnPropertyDescriptor(e, n);
        return !a?.configurable
    }).forEach(function(n) {
        var a = Object.getOwnPropertyDescriptor(e, n);
        if (a) {
            var o = Object.prototype.hasOwnProperty.call(a, "get");
            (n === "top" || n === "parent" || n === "self" || n === "window") && (a.configurable = !0,
            o || (a.writable = !0)),
            o && t.set(n, !0),
            KS(r, n, Object.freeze(a))
        }
    }),
    {
        fakeWindow: r,
        propertiesWithGetter: t
    }
}
var _n = 0
  , ZS = function() {
    function e(t) {
        var r = this
          , n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : window;
        wt(this, e),
        this.updatedValueSet = new Set,
        this.name = void 0,
        this.type = void 0,
        this.proxy = void 0,
        this.sandboxRunning = !0,
        this.latestSetProp = null,
        this.globalWhitelistPrevDescriptor = {},
        this.globalContext = void 0,
        this.name = t,
        this.globalContext = n,
        this.type = Se.Proxy;
        var a = this.updatedValueSet
          , o = QS(n)
          , i = o.fakeWindow
          , s = o.propertiesWithGetter
          , c = new Map
          , g = function(u) {
            return i.hasOwnProperty(u) || n.hasOwnProperty(u)
        }
          , f = new Proxy(i,{
            set: function(u, l, d) {
                if (r.sandboxRunning) {
                    if (r.registerRunningApp(t, f),
                    !u.hasOwnProperty(l) && n.hasOwnProperty(l)) {
                        var p = Object.getOwnPropertyDescriptor(n, l)
                          , h = p.writable
                          , v = p.configurable
                          , A = p.enumerable
                          , b = p.set;
                        (h || b) && Object.defineProperty(u, l, {
                            configurable: v,
                            enumerable: A,
                            writable: !0,
                            value: d
                        })
                    } else
                        u[l] = d;
                    return typeof l == "string" && zS.indexOf(l) !== -1 && (r.globalWhitelistPrevDescriptor[l] = Object.getOwnPropertyDescriptor(n, l),
                    n[l] = d),
                    a.add(l),
                    r.latestSetProp = l,
                    !0
                }
                return !0
            },
            get: function(u, l) {
                if (r.registerRunningApp(t, f),
                l === Symbol.unscopables)
                    return xi;
                if (l === "window" || l === "self" || l === "globalThis")
                    return f;
                if (l === "top" || l === "parent")
                    return n === n.parent ? f : n[l];
                if (l === "hasOwnProperty")
                    return g;
                if (l === "document")
                    return document;
                if (l === "eval")
                    return eval;
                var d = s.has(l) ? n : l in u ? u : n
                  , p = d[l];
                if (z1(d, l))
                    return p;
                var h = JS.get(l) ? Me : n;
                return Bu(h, p)
            },
            has: function(u, l) {
                return l in xi || l in u || l in n
            },
            getOwnPropertyDescriptor: function(u, l) {
                if (u.hasOwnProperty(l)) {
                    var d = Object.getOwnPropertyDescriptor(u, l);
                    return c.set(l, "target"),
                    d
                }
                if (n.hasOwnProperty(l)) {
                    var p = Object.getOwnPropertyDescriptor(n, l);
                    return c.set(l, "globalContext"),
                    p && !p.configurable && (p.configurable = !0),
                    p
                }
            },
            ownKeys: function(u) {
                return qS(Reflect.ownKeys(n).concat(Reflect.ownKeys(u)))
            },
            defineProperty: function(u, l, d) {
                var p = c.get(l);
                switch (p) {
                case "globalContext":
                    return Reflect.defineProperty(n, l, d);
                default:
                    return Reflect.defineProperty(u, l, d)
                }
            },
            deleteProperty: function(u, l) {
                return r.registerRunningApp(t, f),
                u.hasOwnProperty(l) && (delete u[l],
                a.delete(l)),
                !0
            },
            getPrototypeOf: function() {
                return Reflect.getPrototypeOf(n)
            }
        });
        this.proxy = f,
        _n++
    }
    return yt(e, [{
        key: "active",
        value: function() {
            this.sandboxRunning || _n++,
            this.sandboxRunning = !0
        }
    }, {
        key: "inactive",
        value: function() {
            var r = this;
            --_n === 0 && Object.keys(this.globalWhitelistPrevDescriptor).forEach(function(n) {
                var a = r.globalWhitelistPrevDescriptor[n];
                a ? Object.defineProperty(r.globalContext, n, a) : delete r.globalContext[n]
            }),
            this.sandboxRunning = !1
        }
    }, {
        key: "registerRunningApp",
        value: function(r, n) {
            if (this.sandboxRunning) {
                var a = Uu();
                (!a || a.name !== r) && _i({
                    name: r,
                    window: n
                }),
                V1(function() {
                    _i(null)
                })
            }
        }
    }]),
    e
}();
function Ii(e, t) {
    for (var r in e)
        (e.hasOwnProperty(r) || r === "clearInterval") && t(r)
}
var eP = function() {
    function e(t) {
        wt(this, e),
        this.proxy = void 0,
        this.name = void 0,
        this.type = void 0,
        this.sandboxRunning = !0,
        this.windowSnapshot = void 0,
        this.modifyPropsMap = {},
        this.name = t,
        this.proxy = window,
        this.type = Se.Snapshot
    }
    return yt(e, [{
        key: "active",
        value: function() {
            var r = this;
            this.windowSnapshot = {},
            Ii(window, function(n) {
                r.windowSnapshot[n] = window[n]
            }),
            Object.keys(this.modifyPropsMap).forEach(function(n) {
                window[n] = r.modifyPropsMap[n]
            }),
            this.sandboxRunning = !0
        }
    }, {
        key: "inactive",
        value: function() {
            var r = this;
            this.modifyPropsMap = {},
            Ii(window, function(n) {
                window[n] !== r.windowSnapshot[n] && (r.modifyPropsMap[n] = window[n],
                window[n] = r.windowSnapshot[n])
            }),
            this.sandboxRunning = !1
        }
    }]),
    e
}();
function tP(e, t, r, n, a, o, i) {
    var s;
    window.Proxy ? s = n ? new aS(e,o) : new ZS(e,o) : s = new eP(e);
    var c = gS(e, t, s, r, a, i)
      , g = []
      , f = [];
    return {
        instance: s,
        mount: function() {
            return H($.mark(function u() {
                var l, d;
                return $.wrap(function(h) {
                    for (; ; )
                        switch (h.prev = h.next) {
                        case 0:
                            s.active(),
                            l = f.slice(0, c.length),
                            d = f.slice(c.length),
                            l.length && l.forEach(function(v) {
                                return v()
                            }),
                            g = pS(e, t, s, r, a, i),
                            d.length && d.forEach(function(v) {
                                return v()
                            }),
                            f = [];
                        case 7:
                        case "end":
                            return h.stop()
                        }
                }, u)
            }))()
        },
        unmount: function() {
            return H($.mark(function u() {
                return $.wrap(function(d) {
                    for (; ; )
                        switch (d.prev = d.next) {
                        case 0:
                            f = [].concat(Ve(c), Ve(g)).map(function(p) {
                                return p()
                            }),
                            s.inactive();
                        case 2:
                        case "end":
                            return d.stop()
                        }
                }, u)
            }))()
        }
    }
}
var rP = ["singular", "sandbox", "excludeAssetFilter", "globalContext"];
function Qn(e, t) {
    if (!e)
        throw t ? new jt(t) : new jt("element not existed!")
}
function Ct(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : window;
    return e.length ? e.reduce(function(n, a) {
        return n.then(function() {
            return a(t, r)
        })
    }, Promise.resolve()) : Promise.resolve()
}
function ur(e, t) {
    return Zn.apply(this, arguments)
}
function Zn() {
    return Zn = H($.mark(function e(t, r) {
        return $.wrap(function(a) {
            for (; ; )
                switch (a.prev = a.next) {
                case 0:
                    return a.abrupt("return", typeof t == "function" ? t(r) : !!t);
                case 1:
                case "end":
                    return a.stop()
                }
        }, e)
    })),
    Zn.apply(this, arguments)
}
var nc = !!document.head.attachShadow || !!document.head.createShadowRoot;
function $i(e, t, r, n) {
    var a = document.createElement("div");
    a.innerHTML = e;
    var o = a.firstChild;
    if (t)
        if (!nc)
            console.warn("[qiankun]: As current browser not support shadow dom, your strictStyleIsolation configuration will be ignored!");
        else {
            var i = o.innerHTML;
            o.innerHTML = "";
            var s;
            o.attachShadow ? s = o.attachShadow({
                mode: "open"
            }) : s = o.createShadowRoot(),
            s.innerHTML = i
        }
    if (r) {
        var c = o.getAttribute(qn);
        c || o.setAttribute(qn, n);
        var g = o.querySelectorAll("style") || [];
        xw(g, function(f) {
            Kn(o, f, n)
        })
    }
    return o
}
function Ri(e, t, r, n, a) {
    return function() {
        if (t) {
            if (r)
                throw new jt("strictStyleIsolation can not be used with legacy render!");
            if (n)
                throw new jt("experimentalStyleIsolation can not be used with legacy render!");
            var o = document.getElementById(Mu(e));
            return Qn(o, "Wrapper element for ".concat(e, " is not existed!")),
            o
        }
        var i = a();
        return Qn(i, "Wrapper element for ".concat(e, " is not existed!")),
        r && nc ? i.shadowRoot : i
    }
}
var nP = HTMLElement.prototype.appendChild
  , aP = HTMLElement.prototype.removeChild;
function oP(e, t, r) {
    var n = function(o, i) {
        var s = o.element
          , c = o.loading
          , g = o.container;
        if (r)
            return r({
                loading: c,
                appContent: s ? t : ""
            });
        var f = Du(g);
        if (i !== "unmounted") {
            var m = function() {
                switch (i) {
                case "loading":
                case "mounting":
                    return "Target container with ".concat(g, " not existed while ").concat(e, " ").concat(i, "!");
                case "mounted":
                    return "Target container with ".concat(g, " not existed after ").concat(e, " ").concat(i, "!");
                default:
                    return "Target container with ".concat(g, " not existed while ").concat(e, " rendering!")
                }
            }();
            Qn(f, m)
        }
        if (f && !f.contains(s)) {
            for (; f.firstChild; )
                aP.call(f, f.firstChild);
            s && nP.call(f, s)
        }
    };
    return n
}
function iP(e, t, r, n) {
    if (gn(e))
        return e;
    if (n) {
        var a = r[n];
        if (gn(a))
            return a
    }
    var o = r[t];
    if (gn(o))
        return o;
    throw new jt("You need to export lifecycle functions in ".concat(t, " entry"))
}
var Je;
function sP(e) {
    return ea.apply(this, arguments)
}
function ea() {
    return ea = H($.mark(function e(t) {
        var r, n, a, o, i, s, c, g, f, m, u, l, d, p, h, v, A, b, S, O, y, k, G, N, X, le, re, oe, V, xe, ne, te, me, P, w, _, x, R, I, B, z, q, de, ae, fe, Zt, Ae, Pt, Ue, er, ze, Te, it, tr, At, st, ie, he = arguments;
        return $.wrap(function(M) {
            for (; ; )
                switch (M.prev = M.next) {
                case 0:
                    return a = he.length > 1 && he[1] !== void 0 ? he[1] : {},
                    o = he.length > 2 ? he[2] : void 0,
                    i = t.entry,
                    s = t.name,
                    c = Z1(s),
                    g = a.singular,
                    f = g === void 0 ? !1 : g,
                    m = a.sandbox,
                    u = m === void 0 ? !0 : m,
                    l = a.excludeAssetFilter,
                    d = a.globalContext,
                    p = d === void 0 ? window : d,
                    h = dm(a, rP),
                    M.next = 9,
                    oy(i, h);
                case 9:
                    return v = M.sent,
                    A = v.template,
                    b = v.execScripts,
                    S = v.assetPublicPath,
                    O = v.getExternalScripts,
                    M.next = 16,
                    O();
                case 16:
                    return M.next = 18,
                    ur(f, t);
                case 18:
                    if (!M.sent) {
                        M.next = 21;
                        break
                    }
                    return M.next = 21,
                    Je && Je.promise;
                case 21:
                    return y = J1(c, u)(A),
                    k = tt(u) === "object" && !!u.strictStyleIsolation,
                    G = eS(u),
                    N = $i(y, k, G, c),
                    X = "container"in t ? t.container : void 0,
                    le = "render"in t ? t.render : void 0,
                    re = oP(c, y, le),
                    re({
                        element: N,
                        loading: !0,
                        container: X
                    }, "loading"),
                    oe = Ri(c, !!le, k, G, function() {
                        return N
                    }),
                    V = p,
                    xe = function() {
                        return Promise.resolve()
                    }
                    ,
                    ne = function() {
                        return Promise.resolve()
                    }
                    ,
                    te = tt(u) === "object" && !!u.loose,
                    me = tt(u) === "object" ? u.speedy !== !1 : !0,
                    u && (P = tP(c, oe, G, te, l, V, me),
                    V = P.instance.proxy,
                    xe = P.mount,
                    ne = P.unmount),
                    w = su({}, uy(V, S), o, function(U, L) {
                        return Ys(U ?? [], L ?? [])
                    }),
                    _ = w.beforeUnmount,
                    x = _ === void 0 ? [] : _,
                    R = w.afterUnmount,
                    I = R === void 0 ? [] : R,
                    B = w.afterMount,
                    z = B === void 0 ? [] : B,
                    q = w.beforeMount,
                    de = q === void 0 ? [] : q,
                    ae = w.beforeLoad,
                    fe = ae === void 0 ? [] : ae,
                    M.next = 40,
                    Ct(lt(fe), t, V);
                case 40:
                    return M.next = 42,
                    b(V, u && !te, {
                        scopedGlobalVariables: me ? Fu : []
                    });
                case 42:
                    return Zt = M.sent,
                    Ae = iP(Zt, s, V, (r = P) === null || r === void 0 || (n = r.instance) === null || n === void 0 ? void 0 : n.latestSetProp),
                    Pt = Ae.bootstrap,
                    Ue = Ae.mount,
                    er = Ae.unmount,
                    ze = Ae.update,
                    Te = B_(c),
                    it = Te.onGlobalStateChange,
                    tr = Te.setGlobalState,
                    At = Te.offGlobalStateChange,
                    st = function(L) {
                        return N = L
                    }
                    ,
                    ie = function() {
                        var L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : X, j, ve, pe = {
                            name: c,
                            bootstrap: Pt,
                            mount: [H($.mark(function C() {
                                return $.wrap(function(E) {
                                    for (; ; )
                                        switch (E.prev = E.next) {
                                        case 0:
                                        case 1:
                                        case "end":
                                            return E.stop()
                                        }
                                }, C)
                            })), H($.mark(function C() {
                                return $.wrap(function(E) {
                                    for (; ; )
                                        switch (E.prev = E.next) {
                                        case 0:
                                            return E.next = 2,
                                            ur(f, t);
                                        case 2:
                                            if (E.t0 = E.sent,
                                            !E.t0) {
                                                E.next = 5;
                                                break
                                            }
                                            E.t0 = Je;
                                        case 5:
                                            if (!E.t0) {
                                                E.next = 7;
                                                break
                                            }
                                            return E.abrupt("return", Je.promise);
                                        case 7:
                                            return E.abrupt("return", void 0);
                                        case 8:
                                        case "end":
                                            return E.stop()
                                        }
                                }, C)
                            })), H($.mark(function C() {
                                return $.wrap(function(E) {
                                    for (; ; )
                                        switch (E.prev = E.next) {
                                        case 0:
                                            j = N,
                                            ve = Ri(c, !!le, k, G, function() {
                                                return j
                                            });
                                        case 2:
                                        case "end":
                                            return E.stop()
                                        }
                                }, C)
                            })), H($.mark(function C() {
                                var T;
                                return $.wrap(function(Ie) {
                                    for (; ; )
                                        switch (Ie.prev = Ie.next) {
                                        case 0:
                                            T = L !== X,
                                            (T || !j) && (j = $i(y, k, G, c),
                                            st(j)),
                                            re({
                                                element: j,
                                                loading: !0,
                                                container: L
                                            }, "mounting");
                                        case 3:
                                        case "end":
                                            return Ie.stop()
                                        }
                                }, C)
                            })), xe, H($.mark(function C() {
                                return $.wrap(function(E) {
                                    for (; ; )
                                        switch (E.prev = E.next) {
                                        case 0:
                                            return E.abrupt("return", Ct(lt(de), t, V));
                                        case 1:
                                        case "end":
                                            return E.stop()
                                        }
                                }, C)
                            })), function() {
                                var C = H($.mark(function T(E) {
                                    return $.wrap(function(we) {
                                        for (; ; )
                                            switch (we.prev = we.next) {
                                            case 0:
                                                return we.abrupt("return", Ue(Q(Q({}, E), {}, {
                                                    container: ve(),
                                                    setGlobalState: tr,
                                                    onGlobalStateChange: it
                                                })));
                                            case 1:
                                            case "end":
                                                return we.stop()
                                            }
                                    }, T)
                                }));
                                return function(T) {
                                    return C.apply(this, arguments)
                                }
                            }(), H($.mark(function C() {
                                return $.wrap(function(E) {
                                    for (; ; )
                                        switch (E.prev = E.next) {
                                        case 0:
                                            return E.abrupt("return", re({
                                                element: j,
                                                loading: !1,
                                                container: L
                                            }, "mounted"));
                                        case 1:
                                        case "end":
                                            return E.stop()
                                        }
                                }, C)
                            })), H($.mark(function C() {
                                return $.wrap(function(E) {
                                    for (; ; )
                                        switch (E.prev = E.next) {
                                        case 0:
                                            return E.abrupt("return", Ct(lt(z), t, V));
                                        case 1:
                                        case "end":
                                            return E.stop()
                                        }
                                }, C)
                            })), H($.mark(function C() {
                                return $.wrap(function(E) {
                                    for (; ; )
                                        switch (E.prev = E.next) {
                                        case 0:
                                            return E.next = 2,
                                            ur(f, t);
                                        case 2:
                                            if (!E.sent) {
                                                E.next = 4;
                                                break
                                            }
                                            Je = new ku;
                                        case 4:
                                        case "end":
                                            return E.stop()
                                        }
                                }, C)
                            })), H($.mark(function C() {
                                return $.wrap(function(E) {
                                    for (; ; )
                                        switch (E.prev = E.next) {
                                        case 0:
                                        case 1:
                                        case "end":
                                            return E.stop()
                                        }
                                }, C)
                            }))],
                            unmount: [H($.mark(function C() {
                                return $.wrap(function(E) {
                                    for (; ; )
                                        switch (E.prev = E.next) {
                                        case 0:
                                            return E.abrupt("return", Ct(lt(x), t, V));
                                        case 1:
                                        case "end":
                                            return E.stop()
                                        }
                                }, C)
                            })), function() {
                                var C = H($.mark(function T(E) {
                                    return $.wrap(function(we) {
                                        for (; ; )
                                            switch (we.prev = we.next) {
                                            case 0:
                                                return we.abrupt("return", er(Q(Q({}, E), {}, {
                                                    container: ve()
                                                })));
                                            case 1:
                                            case "end":
                                                return we.stop()
                                            }
                                    }, T)
                                }));
                                return function(T) {
                                    return C.apply(this, arguments)
                                }
                            }(), ne, H($.mark(function C() {
                                return $.wrap(function(E) {
                                    for (; ; )
                                        switch (E.prev = E.next) {
                                        case 0:
                                            return E.abrupt("return", Ct(lt(I), t, V));
                                        case 1:
                                        case "end":
                                            return E.stop()
                                        }
                                }, C)
                            })), H($.mark(function C() {
                                return $.wrap(function(E) {
                                    for (; ; )
                                        switch (E.prev = E.next) {
                                        case 0:
                                            re({
                                                element: null,
                                                loading: !1,
                                                container: L
                                            }, "unmounted"),
                                            At(c),
                                            j = null,
                                            st(j);
                                        case 4:
                                        case "end":
                                            return E.stop()
                                        }
                                }, C)
                            })), H($.mark(function C() {
                                return $.wrap(function(E) {
                                    for (; ; )
                                        switch (E.prev = E.next) {
                                        case 0:
                                            return E.next = 2,
                                            ur(f, t);
                                        case 2:
                                            if (E.t0 = E.sent,
                                            !E.t0) {
                                                E.next = 5;
                                                break
                                            }
                                            E.t0 = Je;
                                        case 5:
                                            if (!E.t0) {
                                                E.next = 7;
                                                break
                                            }
                                            Je.resolve();
                                        case 7:
                                        case "end":
                                            return E.stop()
                                        }
                                }, C)
                            }))]
                        };
                        return typeof ze == "function" && (pe.update = ze),
                        pe
                    }
                    ,
                    M.abrupt("return", ie);
                case 48:
                case "end":
                    return M.stop()
                }
        }, e)
    })),
    ea.apply(this, arguments)
}
var dt = {}
  , uP = !0;
new ku;
var cP = function(t) {
    var r = t.sandbox
      , n = t.singular;
    return r && !window.Proxy ? (console.warn("[qiankun] Miss window.Proxy, proxySandbox will degenerate into snapshotSandbox"),
    n === !1 && console.warn("[qiankun] Setting singular as false may cause unexpected behavior while your browser not support window.Proxy"),
    Q(Q({}, t), {}, {
        sandbox: tt(r) === "object" ? Q(Q({}, r), {}, {
            loose: !0
        }) : {
            loose: !0
        }
    })) : t
}
  , cr = new Map
  , En = new Map;
function lP(e, t, r) {
    var n = e.props, a = e.name, o = "container"in e ? e.container : void 0, i = rS(o), s = "".concat(a, "-").concat(i), c, g = function(p) {
        var h = p;
        if (o && i) {
            var v = En.get(s);
            if (v?.length) {
                var A = [H($.mark(function b() {
                    var S, O;
                    return $.wrap(function(k) {
                        for (; ; )
                            switch (k.prev = k.next) {
                            case 0:
                                return S = v.slice(0, v.indexOf(c)),
                                O = S.filter(function(G) {
                                    return G.getStatus() !== "LOAD_ERROR" && G.getStatus() !== "SKIP_BECAUSE_BROKEN"
                                }),
                                k.next = 4,
                                Promise.all(O.map(function(G) {
                                    return G.unmountPromise
                                }));
                            case 4:
                            case "end":
                                return k.stop()
                            }
                    }, b)
                }))].concat(Ve(lt(h.mount)));
                h = Q(Q({}, p), {}, {
                    mount: A
                })
            }
        }
        return Q(Q({}, h), {}, {
            bootstrap: function() {
                return Promise.resolve()
            }
        })
    }, f = function() {
        var d = H($.mark(function p() {
            var h, v, A, b, S;
            return $.wrap(function(y) {
                for (; ; )
                    switch (y.prev = y.next) {
                    case 0:
                        if (h = cP(t ?? Q(Q({}, dt), {}, {
                            singular: !1
                        })),
                        v = h.$$cacheLifecycleByAppName,
                        !o) {
                            y.next = 21;
                            break
                        }
                        if (!v) {
                            y.next = 12;
                            break
                        }
                        if (A = cr.get(a),
                        !A) {
                            y.next = 12;
                            break
                        }
                        return y.t0 = g,
                        y.next = 9,
                        A;
                    case 9:
                        return y.t1 = y.sent,
                        y.t2 = (0,
                        y.t1)(o),
                        y.abrupt("return", (0,
                        y.t0)(y.t2));
                    case 12:
                        if (!i) {
                            y.next = 21;
                            break
                        }
                        if (b = cr.get(s),
                        !b) {
                            y.next = 21;
                            break
                        }
                        return y.t3 = g,
                        y.next = 18,
                        b;
                    case 18:
                        return y.t4 = y.sent,
                        y.t5 = (0,
                        y.t4)(o),
                        y.abrupt("return", (0,
                        y.t3)(y.t5));
                    case 21:
                        return S = sP(e, h, r),
                        o && (v ? cr.set(a, S) : i && cr.set(s, S)),
                        y.next = 25,
                        S;
                    case 25:
                        return y.t6 = y.sent,
                        y.abrupt("return", (0,
                        y.t6)(o));
                    case 27:
                    case "end":
                        return y.stop()
                    }
            }, p)
        }));
        return function() {
            return d.apply(this, arguments)
        }
    }();
    if (t?.autoStart !== !1) {
        var m;
        Vs({
            urlRerouteOnly: (m = dt.urlRerouteOnly) !== null && m !== void 0 ? m : uP
        })
    }
    if (c = $s(f, Q({
        domElement: document.createElement("div")
    }, n)),
    o && i) {
        var u = En.get(s) || [];
        u.push(c),
        En.set(s, u);
        var l = function() {
            var p = u.indexOf(c);
            u.splice(p, 1),
            c = null
        };
        c.unmountPromise.then(l).catch(l)
    }
    return c
}
const dP = "g123";
let Sn;
function fP(e) {
    return Sn || (Sn = vc({
        config: {
            lang: e.lang,
            appId: dP,
            disableAuthRefresh: !0
        },
        onAuthStateChanged: (t, r) => {
            console.log("[CS_APP]: auth state changed", t, r)
        }
    })),
    Sn
}
async function pP() {
    const {lang: e} = window.option;
    return fP({
        lang: e
    }).currentSession()
}
const vr = "friday-app"
  , gP = J.SHD_G123_CUSTOMER_SVC;
let Mt, Ze;
async function mP(e) {
    const t = Mt?.getStatus();
    if (t === "LOADING_SOURCE_CODE" || t === "BOOTSTRAPPING" || t === "MOUNTING") {
        Mt?.unmount();
        return
    }
    const {lang: r} = window.option
      , n = window.option.appId
      , {appTitle: a} = window.option
      , {appVersion: o} = window.option
      , i = await pP()
      , s = i.userId
      , c = i.code
      , g = F.getState().inGameAccount
      , f = window.option.providers
      , {ua: m, ...u} = new Vi().getResult()
      , l = JSON.stringify(u)
      , d = {
        appCode: n,
        appVersion: o,
        appTitle: a,
        g123Id: s,
        platformCode: c,
        deviceInfo: l,
        lang: r || "unknown",
        sns: f || [],
        inGameUserAccount: {
            gameServerID: g?.game_server || "unknown",
            gameUserName: g?.role_name || "unknown",
            gameUserId: g?.role_id || "unknown",
            tags: g?.tags || []
        },
        gameUserStore: Mn,
        openSetting: e?.openSetting
    };
    Mt = lP({
        name: "g123-friday",
        entry: gP,
        container: `#${vr}`,
        props: d
    }, {
        sandbox: {
            experimentalStyleIsolation: !0
        }
    }),
    Ze.style.display = "block"
}
function hP() {
    document.getElementById(vr) && document.getElementById(vr)?.remove(),
    Ze = document.createElement("div"),
    Ze.setAttribute("id", vr),
    Ze.setAttribute("class", "CustomerSupportBox"),
    Ze.style.display = "none",
    document.body.append(Ze)
}
const vP = e => {
    mP(e)
}
;
function wP(e) {
    return typeof e == "object" && e?.data?.type === "customer-service-close"
}
function yP(e) {
    if (!wP(e))
        return;
    const {data: t} = e;
    t.type === "customer-service-close" && (Ze.style.display = "none",
    Mt.unmount())
}
const bP = bt(async () => {
    try {
        console.log("[CS_APP]: init fridayapp"),
        hP(),
        window.addEventListener("message", yP, !1)
    } catch (e) {
        window.Sentry?.captureException(e)
    }
}
)
  , Ra = () => Mt?.getStatus()
  , h0 = Object.freeze(Object.defineProperty({
    __proto__: null,
    getFridayAppStatus: Ra,
    initFridayApp: bP,
    showFridayApp: vP
}, Symbol.toStringTag, {
    value: "Module"
}))
  , _P = async () => {
    const t = await Bt().currentSession();
    if (!t)
        throw new Error("Session is unavailable");
    const {code: r} = t
      , n = new URLSearchParams({
        appid: window.option.appId,
        code: r
    }).toString();
    return `${J.SHD_G123_WEB_SOCKET_ENDPOINT}?${n}`
}
  , $e = {
    socket: null,
    interval: void 0,
    currConnId: ""
};
function EP(e) {
    return typeof e == "object" && e !== null && "message_type"in e
}
const We = {
    lastConfirmedAt: Date.now(),
    interval: void 0
};
function ta(e, t) {
    const r = Date.now();
    (t || r - We.lastConfirmedAt >= 60 * 1e3) && (We.lastConfirmedAt = r,
    F.dispatch(rl(e)))
}
function SP() {
    We.interval || (We.interval = setInterval( () => {
        ta("websocket_disconnected", !1)
    }
    , 10 * 1e3))
}
function PP() {
    We.interval && (clearInterval(We.interval),
    We.interval = void 0)
}
const ac = async () => {
    setTimeout( () => {
        ta("force_check", !0)
    }
    , 5 * 60 * 1e3);
    const e = await _P();
    $e.socket && ($e.socket.close(),
    $e.socket = null),
    $e.socket = new WebSocket(e);
    const {socket: t} = $e;
    t && (t.addEventListener("open", () => {
        console.log("websocket open"),
        PP()
    }
    ),
    t.addEventListener("close", () => {
        console.log("websocket close"),
        SP(),
        window.setTimeout( () => {
            ac()
        }
        , 10 * 1e3)
    }
    ),
    t.addEventListener("error", () => {
        console.log("websocket error"),
        t.close()
    }
    ),
    t.addEventListener("message", r => {
        if (r.data === "+h") {
            We.lastConfirmedAt = Date.now();
            return
        }
        console.log("websocket message: ", r.data);
        try {
            const n = JSON.parse(r.data);
            if (n === null || !EP(n)) {
                console.error("[websocket] message is not a CourierEvent", r.data);
                return
            }
            if (n.message_type === "CONN_INFO") {
                const {conn_id: a, timeout: o} = n.data;
                $e.currConnId = a,
                $e.interval && window.clearInterval($e.interval),
                $e.interval = window.setInterval( () => {
                    t.send("h")
                }
                , o * 1e3),
                ta("websocket_connected", !1);
                return
            }
            if (n.message_type === "INMAIL")
                return;
            if (n.message_type === "CS_REPLIED") {
                if (Ra() === "MOUNTED")
                    return;
                F.dispatch(Wi({
                    isUnread: !0
                }));
                return
            }
            if (n.message_type === "AUTH_EVENT") {
                const a = JSON.parse(n.data);
                if (!a || typeof a != "object") {
                    console.error("[websocket] Invalid message", n);
                    return
                }
                if (a.targetAppCode && a.targetAppCode !== window.option.appId)
                    return;
                window.postMessage(a, "*");
                return
            }
        } catch (n) {
            console.log("websocket message error: ", n)
        }
    }
    ))
}
;
window.addCSMessage = () => {
    Ra() !== "MOUNTED" && F.dispatch(Wi({
        isUnread: !0
    }))
}
;
const oc = {
    platform: !0,
    pwa: !0,
    psp: !0,
    auxin: !0,
    gameErrorTrace: !0,
    cs: !0,
    jobConsole: !0,
    vconsole: !0,
    mainApp: !0,
    gtm: !0,
    websocket: !0
}
  , AP = "platform";
function TP(e) {
    const t = {};
    try {
        const n = (new URL(e).searchParams.get("disableFeatures") || "").split(",").map(a => a.trim()).filter(Boolean);
        if (n.length < 1)
            return t;
        if (n.indexOf(AP) !== -1)
            for (const a of Object.keys(oc))
                t[a] = !1;
        else
            for (const a of n)
                t[a] = !1
    } catch (r) {
        console.log("getStorage error", r)
    }
    return t
}
const OP = typeof window < "u" && window.location ? TP(window.location.href) : {}
  , wr = {
    ...oc,
    ...OP
};
function yr(e, t) {
    window.postMessage({
        type: "gp_global_actions/show_toast",
        payload: {
            type: e,
            content: t
        }
    })
}
function CP() {
    window.postMessage({
        type: "gp_global_actions/dismiss_toast"
    })
}
function xP() {
    window.postMessage({
        type: "gp_global_actions/reload_cshelp"
    })
}
const ic = F.getState();
window.option.inGameAccount = ic.inGameAccount;
F.subscribe( () => {
    const e = F.getState();
    ic.inGameAccount !== e.inGameAccount && (window.option.inGameAccount = e.inGameAccount,
    xP())
}
);
/*! clipboard-copy. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var IP = LP;
function La() {
    return new DOMException("The request is not allowed","NotAllowedError")
}
async function $P(e) {
    if (!navigator.clipboard)
        throw La();
    return navigator.clipboard.writeText(e)
}
async function RP(e) {
    const t = document.createElement("span");
    t.textContent = e,
    t.style.whiteSpace = "pre",
    t.style.webkitUserSelect = "auto",
    t.style.userSelect = "all",
    document.body.appendChild(t);
    const r = window.getSelection()
      , n = window.document.createRange();
    r.removeAllRanges(),
    n.selectNode(t),
    r.addRange(n);
    let a = !1;
    try {
        a = window.document.execCommand("copy")
    } finally {
        r.removeAllRanges(),
        window.document.body.removeChild(t)
    }
    if (!a)
        throw La()
}
async function LP(e) {
    try {
        await $P(e)
    } catch (t) {
        try {
            await RP(e)
        } catch (r) {
            throw r || t || La()
        }
    }
}
const MP = ge(IP)
  , v0 = e => e && e === Er.Login || e === Er.Link;
function kP(e) {
    F.dispatch(Pe.actions.toggleMainPopup({
        isOpen: e
    })),
    !e && F.getState().blockedUser.blocked && F.dispatch(oa.actions.showDialog())
}
function DP(e) {
    F.dispatch(Pe.actions.switchMainPopupRoute({
        tab: e
    }))
}
function w0() {
    kP(!1),
    DP(Er.Recommends),
    CP()
}
function y0(e=!0) {
    F.dispatch(Pe.actions.setIsGuestClicked({
        clicked: e
    }))
}
async function b0(e) {
    const t = await Ce()
      , r = await ee.get(`${J.SHD_G123_WEB_URL}/api/v2/game/${e}`, {
        params: {
            lang: ue.language,
            region: t.region
        }
    });
    return F.dispatch(Pe.actions.updateCurrentAppInfo({
        appInfo: r.data
    })),
    r.data
}
async function _0() {
    const e = await Ce()
      , {data: {games: t}} = await ee.get(`${J.SHD_G123_GAME_URL}/api/recommends`, {
        params: {
            lang: ue.language,
            region: e.region,
            appCode: e.aud
        }
    })
      , r = ue.language && e.sub && e.aud;
    let n;
    if (r)
        try {
            const {data: {appid_list: i}} = await ee.post(`${J.SHD_G123_GC3A_URL}/v1/recommendation/g-button/rank`, {
                metadata: {
                    labels: "string",
                    name: "gbutton"
                },
                payload: {
                    abtest: !1,
                    language: ue.language,
                    ctwid: e.sub,
                    appid: e.aud
                }
            });
            n = i
        } catch (i) {
            window?.Sentry?.captureException(i),
            n = []
        }
    else
        window?.Sentry?.captureException(new Error("Language, ctwid, or appid is null or empty. Skipping axios post request.")),
        n = [];
    const a = t.filter(i => i.appId !== e.aud)
      , o = n?.length > 3 ? a.filter(i => n.includes(i.appId)).sort( (i, s) => {
        const c = n.indexOf(i.appId)
          , g = n.indexOf(s.appId);
        return c - g
    }
    ) : a;
    return F.dispatch(Pe.actions.updateRecommendGames({
        recommendGames: o
    })),
    o
}
async function E0() {
    try {
        const e = await ee.get(`${J.SHD_G123_WEB_URL}/api/v2/game_tag/hotgames/game_codes`, {
            params: {
                lang: ue.language
            }
        });
        return F.dispatch(Pe.actions.updateHotGameCodes({
            hotGameCodes: e.data.content
        })),
        e.data.content
    } catch (e) {
        return window?.Sentry?.captureException(e),
        []
    }
}
async function S0() {
    try {
        const e = await ee.get(`${J.SHD_G123_WEB_URL}/api/v2/game_tag/newgames/game_codes`, {
            params: {
                lang: ue.language
            }
        });
        return F.dispatch(Pe.actions.updateNewGameCodes({
            newGameCodes: e.data.content
        })),
        e.data.content
    } catch (e) {
        return window?.Sentry?.captureException(e),
        []
    }
}
async function P0() {
    const e = await ee.get(`${J.SHD_G123_WEB_URL}/api/v2/game_tag/pre-registration/games`, {
        params: {
            lang: ue.language,
            offset: 0,
            limit: 100
        }
    });
    return F.dispatch(Pe.actions.updatePreregists({
        preregists: e.data.content
    })),
    e.data.content
}
async function Li(e) {
    F.dispatch(Pe.actions.updateAuthProviders({
        authProviders: e
    }))
}
function A0() {
    MP(window.option.userId),
    yr("success", ue.t("common.actions.copy.success"))
}
async function T0() {
    const e = await ee.get(`${J.SHD_G123_GAME_URL}/api/v1/user_ranking/${window.option.userId}`);
    return F.dispatch(Pe.actions.updateVipRank({
        vipRank: e?.data?.ranking || 0
    })),
    e?.data?.ranking || 0
}
function GP(e) {
    if (!J.SHD_PARTNER_TTD_ENDPOINT)
        return;
    const t = new URL(J.SHD_PARTNER_TTD_ENDPOINT);
    t.searchParams.set("ttd_puid", e),
    t.searchParams.set("ttd_pid", J.SHD_PARTNER_TTD_PID),
    t.searchParams.set("ttd_tpi", "1"),
    t.searchParams.set("gdpr", "0");
    const r = new Image;
    r.src = t.href
}
om();
const Ft = window.option.appId
  , NP = () => /line/i.test(navigator.userAgent);
function UP() {
    if (!/iPad|iPhone|iPod/.test(navigator.userAgent))
        return;
    const e = t => {
        const r = t.originalEvent || t;
        "scale"in r && r.scale !== 1 && (r.preventDefault(),
        document.body.style.transform = "scale(1)")
    }
    ;
    document.addEventListener("touchmove", e, {
        passive: !1
    }),
    document.addEventListener("gesturestart", e, {
        passive: !1
    })
}
window.perf?.start && (window.perf.app_start = Nt(),
setTimeout( () => {
    window.perf.app_start === void 0 || window.perf.start === void 0 || Yr(`/stats?k=perf&t=app_start&a=${Ft}&d=${window.perf.app_start - window.perf.start}&img=1`)
}
));
window.addEventListener("beforeinstallprompt", e => {
    console.log("[SW] BeforeIntallPrompt", e),
    be({
        event: "PWA",
        pwa_event: "prompt",
        appid: Ft
    }),
    window.pwaInstallPrompt = e,
    F.dispatch(mg({
        isPwaInstallPromptReady: !0
    })),
    e.userChoice.then(t => {
        console.log("[SW] UserChoice", t.outcome)
    }
    ).catch(t => {
        console.error("[SW] Error", t)
    }
    )
}
);
window.addEventListener("appinstalled", e => {
    console.log("[SW] AppInstalled", e),
    be({
        event: "PWA",
        pwa_event: "install",
        appid: Ft
    })
}
);
function jP(e, t) {
    return Math.floor(Math.random() * (t + 1 - e)) + e
}
function FP() {
    try {
        const e = document.querySelector("#splash-progress span") || document.createElement("span");
        let t = 0;
        const r = () => {
            e.style.width = `${t}%`
        }
          , n = () => {
            if (t > 90)
                return;
            let o = jP(5, 9);
            try {
                const i = window.navigator && navigator.connection && navigator.connection.downlink ? navigator.connection.downlink : 0;
                i && i < 1 && (o = Math.floor(o * i),
                o < 3 && (o = 3))
            } catch {}
            t += o,
            r(),
            setTimeout(n, 1e3)
        }
        ;
        let a = setTimeout( () => {
            const o = document.querySelector("#splash-progress-container");
            o && (o.style.display = "flex"),
            n()
        }
        , 3e3);
        return () => {
            try {
                a && (clearTimeout(a),
                a = null),
                t = 100,
                e.style.width = "100%",
                e.style.transition = "width 0.2s"
            } catch (o) {
                console.error(o)
            }
        }
    } catch (e) {
        return console.error(e),
        null
    }
}
const ra = typeof requestIdleCallback == "function" ? requestIdleCallback : setTimeout
  , Pn = bt(async () => {
    if (wr.platform) {
        console.log("[PLATFORM] Waiting for idle", Date.now());
        try {
            typeof Promise.race == "function" && await Promise.race([new Promise(e => ra(e)), new Promise(e => setTimeout(e, 1e4))])
        } catch (e) {
            console.error(e)
        }
        console.log("[PLATFORM] Loading app", Date.now()),
        kt( () => Nr( () => import("./game-7608d275-6734f92a.js").then(e => e.d), ["assets/game-7608d275-6734f92a.js", "assets/game-7d3aeba4-9663a940.js", "assets/index-a2552029.css", "assets/game-6284db59-e69f3d6c.js", "assets/game-d8b296a6-de833af9.js", "assets/game-4b47e701-fc24af7d.js"]), {
            retries: 3
        }).then(e => e.initApp()).catch(e => {
            console.error("[PLATFORM] LOADING_APP_ERROR", e),
            window.Sentry?.captureException(e)
        }
        )
    }
}
);
function BP() {
    try {
        if (window.innerHeight < document.documentElement.clientHeight) {
            const e = Math.min(window.innerHeight, document.documentElement.clientHeight);
            document.documentElement.style.height = `${e}px`,
            window.addEventListener("orientationchange", () => {
                document.documentElement.style.height = ""
            }
            )
        }
    } catch (e) {
        console.error(e)
    }
}
async function HP() {
    const e = await Ce()
      , t = {
        appCode: e.aud,
        userId: e.sub,
        country: e.country,
        region: e.region,
        lang: e.lang,
        appUrl: window.option.idCallback,
        onpaymentcompleted: r => {
            console.info("[Payment] completed with", r),
            Ss({
                type: "PspCommand",
                action: "PaymentStatusChanged",
                orderNo: r
            })
        }
    };
    await xg(t)
}
async function WP() {
    const e = _s();
    qg(e),
    ra( () => {
        Mi()
    }
    ),
    UP();
    const t = FP()
      , {prefetchSession: r} = window;
    r && (window.prefetchSession = void 0);
    const n = wc({
        config: {
            appId: Ft,
            zIndex: 9997
        },
        onAuthStateChanged: (f, m) => {
            if (!f) {
                console.error(new Error("Fetch user error"), {
                    user: f,
                    prevUser: m
                });
                return
            }
            if (f.code === Ni && F.dispatch(oa.actions.showDialog()),
            F.dispatch(bg()),
            !m) {
                window.option.userId = f.userId,
                window.option.providers = f.providers,
                Li(f.providers),
                window.option.code = f.code;
                return
            }
            if ((f.providers.length !== m.providers.length || f.providers.slice().sort().join(",") !== m.providers.slice().sort().join(",")) && (console.info(`Providers changed [${m.providers}] -> [${f.providers}], re-render template`),
            Li(f.providers),
            Ss({
                category: "g123_auth_event",
                action: "p_sns_bind_changed"
            })),
            f.userId !== m.userId) {
                console.info(`User changed [${m.userId}] -> [${f.userId}], reload page`),
                Ga("USER_ID_CHANGED", !0);
                return
            }
            f.code !== m.code && (console.info(`Code changed [${m.code}] -> [${f.code}], reload game`),
            Ga("USER_APP_CODE_CHANGED", !0))
        }
        ,
        onAuthResult: f => {
            switch (f.level) {
            case "success":
                yr("login", f.message);
                break;
            case "warning":
                yr("warning", f.message);
                break;
            case "error":
                yr("error", f.message);
                break
            }
        }
        ,
        prefetch: r
    });
    Qg(Ft);
    const a = bs() === ys.CHANNEL_ONLY ? sn(!0) : void 0;
    try {
        await n.currentSession()
    } catch (f) {
        console.error(f)
    }
    n.currentUser() || await kt( () => n.reload(), {
        retries: 5
    });
    const o = n.currentUser();
    if (!o)
        throw new Error("Fetching user error");
    typeof window.Sentry?.setUser == "function" && window.Sentry.setUser({
        id: o.userId
    });
    const i = await n.currentSession();
    if (!i)
        throw new Error("Fetching session error");
    const {isPlatformNewUser: s} = i;
    if (zi({
        action: s ? "p_register" : "p_login",
        data: {
            display_name: o.userId,
            providers: o.providers
        }
    }),
    console.info("[PLATFORM] reloadGame in game mode"),
    wr.psp && HP(),
    wr.auxin && ra( () => {
        Nr( () => import("./game-74aa2de1-b97bedf2.js"), ["assets/game-74aa2de1-b97bedf2.js", "assets/game-6284db59-e69f3d6c.js", "assets/game-d8b296a6-de833af9.js", "assets/game-7d3aeba4-9663a940.js", "assets/index-a2552029.css"]).then( ({initMicroApplications: f}) => {
            f()
        }
        )
    }
    ),
    wr.websocket && ac(),
    GP(o.userId),
    window.option.mode !== "app") {
        if (yc() && NP())
            try {
                const m = Da.getItem(br.lineAppAuthRequestedAt)
                  , u = m ? Number.parseInt(m, 10) : void 0;
                (!u || Oc(new Date, new Date(u)) > 7) && (Da.setItem(br.lineAppAuthRequestedAt, `${Date.now()}`),
                n.login("line"))
            } catch (m) {
                console.error(m)
            }
        setTimeout(Pn, 3e3);
        const f = Nt();
        await new Promise(m => {
            const u = setTimeout(m, 3e4);
            (a || sn(!0)).then( () => {
                clearTimeout(u),
                m()
            }
            )
        }
        ),
        Pn(),
        Nt() - f > 1e4 && await new Promise(m => setTimeout(m, 2e3))
    } else
        console.info("[PLATFORM] reloadGame in app mode"),
        document.body.style.backgroundColor = "#fff",
        a || sn(!0),
        Pn();
    t && t(),
    BP();
    const c = document.getElementById("splash");
    c && (c.style.opacity = "0",
    c.style.transition = "opacity 0.5s ease-in");
    const g = document.getElementById("iframe-game");
    g && (g.style.opacity = "1",
    g.style.transition = "opacity 0.5s ease-out 1s"),
    setTimeout(sm, 1e3)
}
WP();
const O0 = Object.freeze(Object.defineProperty({
    __proto__: null
}, Symbol.toStringTag, {
    value: "Module"
}));
export {_0 as $, DP as A, ag as B, a0 as C, g0 as D, e0 as E, Vt as F, sa as G, wr as H, dl as I, Wi as J, YP as K, d0 as L, Er as M, zP as N, f0 as O, c0 as P, y0 as Q, w0 as R, T0 as S, A0 as T, yr as U, ug as V, cg as W, Dt as X, v0 as Y, b0 as Z, lm as _, F as a, E0 as a0, S0 as a1, P0 as a2, r0 as a3, n0 as a4, i0 as a5, o0 as a6, h0 as a7, O0 as a8, oa as b, zi as c, On as d, MP as e, m0 as f, Mn as g, qi as h, XP as i, qc as j, Ki as k, lP as l, Yi as m, jc as n, t0 as o, sg as p, l0 as q, Fr as r, Pr as s, JP as t, ZP as u, Eg as v, Pg as w, QP as x, Gt as y, kP as z};
