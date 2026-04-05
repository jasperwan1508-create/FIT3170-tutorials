var require = meteorInstall({"imports":{"api":{"links.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/links.js                                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({LinksCollection:()=>LinksCollection},true);let Mongo;module.link('meteor/mongo',{Mongo(v){Mongo=v}},0);
const LinksCollection = new Mongo.Collection('links');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"ui":{"App.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/App.jsx                                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({App:()=>App},true);let _jsx,_jsxs;module.link("react/jsx-runtime",{jsx(v){_jsx=v},jsxs(v){_jsxs=v}},0);let Counter;module.link("./Counter.jsx",{Counter(v){Counter=v}},1);let Header;module.link("./Header.jsx",{Header(v){Header=v}},2);let Info;module.link("./Info.jsx",{Info(v){Info=v}},3);



const App = ()=>/*#__PURE__*/ _jsxs("div", {
        className: "page",
        children: [
            /*#__PURE__*/ _jsx(Header, {}),
            /*#__PURE__*/ _jsxs("main", {
                className: "main",
                children: [
                    /*#__PURE__*/ _jsx(Counter, {}),
                    /*#__PURE__*/ _jsx(Info, {})
                ]
            })
        ]
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Counter.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/Counter.jsx                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({Counter:()=>Counter},true);let _jsx,_jsxs;module.link("react/jsx-runtime",{jsx(v){_jsx=v},jsxs(v){_jsxs=v}},0);let useState;module.link("react",{useState(v){useState=v}},1);

const Counter = ()=>{
    const [counter, setCounter] = useState(0);
    const increment = ()=>{
        setCounter(counter + 1);
    };
    return /*#__PURE__*/ _jsx("div", {
        className: "card counter-card",
        children: /*#__PURE__*/ _jsxs("div", {
            className: "counter-content",
            children: [
                /*#__PURE__*/ _jsx("button", {
                    className: "button",
                    onClick: increment,
                    children: "Click Me"
                }),
                /*#__PURE__*/ _jsxs("p", {
                    className: "counter-text",
                    children: [
                        "You've pressed the button",
                        " ",
                        /*#__PURE__*/ _jsx("span", {
                            className: "counter-value",
                            children: counter
                        }),
                        " ",
                        counter === 1 ? "time" : "times",
                        "."
                    ]
                })
            ]
        })
    });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Header.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/Header.jsx                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({Header:()=>Header},true);let _jsx,_jsxs;module.link("react/jsx-runtime",{jsx(v){_jsx=v},jsxs(v){_jsxs=v}},0);let MeteorLogo;module.link("./meteor-logo.svg",{default(v){MeteorLogo=v}},1);

const Header = ()=>{
    return /*#__PURE__*/ _jsx("div", {
        className: "header",
        children: /*#__PURE__*/ _jsxs("nav", {
            className: "nav container",
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: "logo-container",
                    children: /*#__PURE__*/ _jsx(MeteorLogo, {
                        className: "logo"
                    })
                }),
                /*#__PURE__*/ _jsx("h1", {
                    className: "page-title",
                    children: "Welcome to Meteor!"
                })
            ]
        })
    });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Info.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/Info.jsx                                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({Info:()=>Info},true);let _jsx,_jsxs;module.link("react/jsx-runtime",{jsx(v){_jsx=v},jsxs(v){_jsxs=v}},0);let useFind,useSubscribe;module.link("meteor/react-meteor-data",{useFind(v){useFind=v},useSubscribe(v){useSubscribe=v}},1);let LinksCollection;module.link("../api/links",{LinksCollection(v){LinksCollection=v}},2);


const Info = ()=>{
    const isLoading = useSubscribe("links");
    const links = useFind(()=>LinksCollection.find());
    if (isLoading()) {
        return /*#__PURE__*/ _jsx("div", {
            children: "Loading..."
        });
    }
    return /*#__PURE__*/ _jsxs("section", {
        children: [
            /*#__PURE__*/ _jsx("h2", {
                className: "section-title",
                children: "Learn Meteor!"
            }),
            /*#__PURE__*/ _jsx("ul", {
                className: "resources-grid",
                children: links.map((link)=>/*#__PURE__*/ _jsx("li", {
                        className: "section",
                        children: /*#__PURE__*/ _jsx("a", {
                            href: link.url,
                            className: "resource-link",
                            target: "_blank",
                            children: /*#__PURE__*/ _jsx("div", {
                                className: "card resource-card",
                                children: /*#__PURE__*/ _jsx("div", {
                                    className: "resource-content",
                                    children: /*#__PURE__*/ _jsx("span", {
                                        className: "resource-title",
                                        children: link.title
                                    })
                                })
                            })
                        })
                    }, link._id))
            })
        ]
    });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"styles.css":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/styles.css                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = require("meteor/modules").addStyles(
  "/* this file is imported in client/main.jsx */\r\n\r\n:root {\r\n  /* Colors */\r\n  --color-background: hsl(210, 20%, 98%);\r\n  --color-foreground: hsl(220, 20%, 15%);\r\n  --color-card: hsl(0, 0%, 100%);\r\n  --color-primary: hsl(4, 70%, 55%);\r\n  --color-primary-hover: hsl(4, 70%, 45%);\r\n  --color-muted: hsl(220, 10%, 50%);\r\n  --color-border: hsl(220, 14%, 90%);\r\n\r\n  /* Shadows */\r\n  --shadow-card: 0 1px 3px 0 hsl(220 20% 15% / 0.04),\r\n    0 1px 2px -1px hsl(220 20% 15% / 0.04);\r\n  --shadow-card-hover: 0 10px 15px -3px hsl(220 20% 15% / 0.08),\r\n    0 4px 6px -4px hsl(220 20% 15% / 0.04);\r\n\r\n  /* Spacing */\r\n  --spacing-xs: 0.25rem;\r\n  --spacing-sm: 0.5rem;\r\n  --spacing-md: 1rem;\r\n  --spacing-lg: 1.5rem;\r\n  --spacing-xl: 2rem;\r\n  --spacing-2xl: 3rem;\r\n\r\n  /* Border radius */\r\n  --radius: 0.75rem;\r\n  --radius-sm: 0.5rem;\r\n\r\n  /* Transitions */\r\n  --transition-fast: 150ms ease;\r\n  --transition-normal: 200ms ease;\r\n  --transition-slow: 250ms ease;\r\n}\r\n\r\n/* ============ Reset & Base Styles ============ */\r\n*,\r\n*::before,\r\n*::after {\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\nbody {\r\n  font-family: \"Inter\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto,\r\n    sans-serif;\r\n  background-color: var(--color-background);\r\n  color: var(--color-foreground);\r\n  line-height: 1.5;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n  color: inherit;\r\n}\r\n\r\n/* ============ Layout ============ */\r\n.page {\r\n  min-height: 100vh;\r\n  background-color: var(--color-background);\r\n}\r\n\r\n.container {\r\n  width: 100%;\r\n  max-width: 1280px;\r\n  margin: 0 auto;\r\n  padding-left: var(--spacing-md);\r\n  padding-right: var(--spacing-md);\r\n}\r\n\r\n@media (min-width: 768px) {\r\n  .container {\r\n    padding-left: var(--spacing-lg);\r\n    padding-right: var(--spacing-lg);\r\n  }\r\n}\r\n\r\n/* ============ Header / Navigation ============ */\r\n.header {\r\n  border-bottom: 1px solid var(--color-border);\r\n  background-color: var(--color-card);\r\n  border-radius: var(--radius);\r\n}\r\n\r\n.nav {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  height: 4rem;\r\n}\r\n\r\n.logo-container {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: var(--spacing-sm);\r\n}\r\n\r\n.logo {\r\n  width: 4rem;\r\n  height: 4rem;\r\n}\r\n\r\n.logo-text {\r\n  font-weight: 600;\r\n  color: var(--color-foreground);\r\n  display: none;\r\n}\r\n\r\n@media (min-width: 640px) {\r\n  .logo-text {\r\n    display: inline;\r\n  }\r\n}\r\n\r\n.page-title {\r\n  font-size: 1.25rem;\r\n  font-weight: 700;\r\n  color: var(--color-foreground);\r\n  letter-spacing: -0.025em;\r\n}\r\n\r\n@media (min-width: 768px) {\r\n  .page-title {\r\n    font-size: 1.5rem;\r\n  }\r\n}\r\n\r\n.nav-link {\r\n  font-size: 0.875rem;\r\n  font-weight: 500;\r\n  color: var(--color-primary);\r\n  transition: opacity var(--transition-fast);\r\n}\r\n\r\n.nav-link:hover {\r\n  opacity: 0.8;\r\n}\r\n\r\n/* ============ Main Content ============ */\r\n.main {\r\n  padding-top: var(--spacing-xl);\r\n  padding-bottom: var(--spacing-xl);\r\n}\r\n\r\n@media (min-width: 768px) {\r\n  .main {\r\n    padding-top: var(--spacing-2xl);\r\n    padding-bottom: var(--spacing-2xl);\r\n  }\r\n}\r\n\r\n/* ============ Card Component ============ */\r\n.card {\r\n  background-color: var(--color-card);\r\n  border-radius: var(--radius);\r\n  box-shadow: var(--shadow-card);\r\n  border: 1px solid var(--color-border);\r\n}\r\n\r\n/* ============ Counter Section ============ */\r\n.counter-card {\r\n  padding: var(--spacing-lg);\r\n  margin-bottom: 2.5rem;\r\n}\r\n\r\n@media (min-width: 768px) {\r\n  .counter-card {\r\n    padding: var(--spacing-xl);\r\n    margin-bottom: var(--spacing-2xl);\r\n  }\r\n}\r\n\r\n.counter-content {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: var(--spacing-md);\r\n}\r\n\r\n@media (min-width: 640px) {\r\n  .counter-content {\r\n    flex-direction: row;\r\n  }\r\n}\r\n\r\n.counter-text {\r\n  color: var(--color-muted);\r\n  text-align: center;\r\n}\r\n\r\n@media (min-width: 640px) {\r\n  .counter-text {\r\n    text-align: left;\r\n  }\r\n}\r\n\r\n.counter-value {\r\n  font-weight: 600;\r\n  color: var(--color-foreground);\r\n}\r\n\r\n/* ============ Button Component ============ */\r\n.button {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  min-width: 120px;\r\n  padding: 0.625rem 1.5rem;\r\n  font-size: 0.875rem;\r\n  font-weight: 500;\r\n  font-family: inherit;\r\n  color: white;\r\n  background-color: var(--color-primary);\r\n  border: none;\r\n  border-radius: var(--radius-sm);\r\n  cursor: pointer;\r\n  transition: background-color var(--transition-normal),\r\n    transform var(--transition-fast);\r\n}\r\n\r\n.button:hover {\r\n  background-color: var(--color-primary-hover);\r\n}\r\n\r\n.button:active {\r\n  transform: scale(0.98);\r\n}\r\n\r\n.button:focus-visible {\r\n  outline: 2px solid var(--color-primary);\r\n  outline-offset: 2px;\r\n}\r\n\r\n/* ============ Resources Section ============ */\r\n.section-title {\r\n  font-size: 1.5rem;\r\n  font-weight: 700;\r\n  color: var(--color-foreground);\r\n  margin-bottom: var(--spacing-lg);\r\n  letter-spacing: -0.025em;\r\n}\r\n\r\n.resources-grid {\r\n  list-style-type: none;\r\n  display: grid;\r\n  grid-template-columns: 1fr;\r\n  gap: var(--spacing-md);\r\n}\r\n\r\n@media (min-width: 640px) {\r\n  .resources-grid {\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n}\r\n\r\n/* ============ Resource Card ============ */\r\n.resource-link {\r\n  display: block;\r\n}\r\n\r\n.resource-card {\r\n  padding: 1.25rem;\r\n  transition: box-shadow var(--transition-slow),\r\n    transform var(--transition-slow);\r\n}\r\n\r\n.resource-card:hover {\r\n  box-shadow: var(--shadow-card-hover);\r\n  transform: translateY(-2px);\r\n}\r\n\r\n.resource-content {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n}\r\n\r\n.resource-title {\r\n  font-weight: 500;\r\n  color: var(--color-foreground);\r\n  transition: color var(--transition-fast);\r\n}\r\n\r\n.resource-link:hover .resource-title {\r\n  color: var(--color-primary);\r\n}\r\n\r\n.resource-icon {\r\n  width: 1rem;\r\n  height: 1rem;\r\n  color: var(--color-muted);\r\n  opacity: 0;\r\n  transition: opacity var(--transition-fast), color var(--transition-fast);\r\n}\r\n\r\n.resource-link:hover .resource-icon {\r\n  opacity: 1;\r\n  color: var(--color-primary);\r\n}"
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"client":{"main.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/main.jsx                                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let _jsx;module.link("react/jsx-runtime",{jsx(v){_jsx=v}},0);let createRoot;module.link("react-dom/client",{createRoot(v){createRoot=v}},1);let Meteor;module.link("meteor/meteor",{Meteor(v){Meteor=v}},2);let App;module.link("/imports/ui/App",{App(v){App=v}},3);module.link("/imports/ui/styles.css");




Meteor.startup(()=>{
    const container = document.getElementById("react-target");
    const root = createRoot(container);
    root.render(/*#__PURE__*/ _jsx(App, {}));
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".ts",
    ".mjs",
    ".css",
    ".jsx"
  ]
});

require("/client/main.jsx");