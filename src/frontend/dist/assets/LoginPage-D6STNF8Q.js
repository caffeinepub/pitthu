import { r as reactExports, V as useDirection, H as useControllableState, j as jsxRuntimeExports, J as createContextScope, a1 as useId, Q as Primitive, a2 as createRovingFocusGroupScope, a3 as Root, a4 as Item, N as composeEventHandlers, a5 as Presence, a as cn, a6 as useNavigate, m as motion, a7 as Mountain, L as Link, a8 as Label, I as Input, l as Button, a9 as LoaderCircle, A as AnimatePresence, aa as ShieldCheck, i as ue } from "./index-hZrb6ubp.js";
import { P as Phone } from "./phone-Whwi7IBs.js";
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function LoginPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = reactExports.useState("");
  const [otp, setOtp] = reactExports.useState("");
  const [otpSent, setOtpSent] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [verifying, setVerifying] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("rider");
  const confirmationRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const fb = window.firebase;
    if (!fb) return;
    try {
      window.recaptchaVerifier = new fb.auth.RecaptchaVerifier(
        "login-recaptcha",
        { size: "invisible" }
      );
    } catch (_) {
    }
  }, []);
  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      ue.error("Enter a valid 10-digit phone number");
      return;
    }
    setLoading(true);
    try {
      const fb = window.firebase;
      if (!fb) throw new Error("Firebase not loaded");
      const fullPhone = `+91${phone.replace(/\D/g, "")}`;
      const result = await fb.auth().signInWithPhoneNumber(fullPhone, window.recaptchaVerifier);
      confirmationRef.current = result;
      setOtpSent(true);
      ue.success(`OTP sent to +91${phone}`);
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      ue.error("Enter the 6-digit OTP");
      return;
    }
    setVerifying(true);
    try {
      if (!confirmationRef.current)
        throw new Error("Session expired. Resend OTP.");
      await confirmationRef.current.confirm(otp);
      ue.success("Login successful! Welcome to PITTHU 🎉");
      navigate({ to: activeTab === "driver" ? "/driver-dashboard" : "/" });
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Wrong OTP. Please try again.");
    } finally {
      setVerifying(false);
    }
  };
  const handleGoogle = () => {
    ue.info("Google login coming soon");
  };
  const PhoneOtpForm = ({ isDriver }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -16 },
      transition: { duration: 0.3 },
      className: "space-y-4",
      children: [
        isDriver && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-orange-500/20 border border-orange-400/30 p-3 text-sm text-orange-200 text-center", children: [
          "Not registered yet?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/driver-register",
              className: "font-semibold underline underline-offset-2 text-orange-300",
              children: "Register as Driver →"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "login-recaptcha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/80 text-sm", children: "Phone Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center bg-white/10 border border-white/20 rounded-xl px-3 text-white/60 text-sm font-medium shrink-0", children: "+91" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "login.input",
                type: "tel",
                inputMode: "numeric",
                maxLength: 10,
                placeholder: "9876543210",
                value: phone,
                onChange: (e) => setPhone(e.target.value.replace(/\D/g, "")),
                className: "bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus:border-blue-400 focus:ring-blue-400/20"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "login.primary_button",
            onClick: handleSendOTP,
            disabled: loading || phone.length < 10,
            className: "w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-11 font-semibold transition-all",
            children: [
              loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 mr-2" }),
              loading ? "Sending OTP..." : "Send OTP"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: otpSent && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            className: "space-y-3 overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/80 text-sm", children: "Enter 6-digit OTP" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "login.otp_input",
                    type: "text",
                    inputMode: "numeric",
                    maxLength: 6,
                    placeholder: "123456",
                    value: otp,
                    onChange: (e) => setOtp(e.target.value.replace(/\D/g, "")),
                    className: "bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus:border-blue-400 tracking-[0.5em] text-center text-lg font-bold"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "login.submit_button",
                  onClick: handleVerifyOTP,
                  disabled: verifying || otp.length !== 6,
                  className: "w-full bg-orange-500 hover:bg-orange-400 text-white rounded-xl h-11 font-semibold",
                  children: [
                    verifying ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 mr-2" }),
                    verifying ? "Verifying..." : "Verify & Login"
                  ]
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-t border-white/20" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-transparent px-3 text-white/40 text-xs", children: "OR" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "login.secondary_button",
            variant: "outline",
            onClick: handleGoogle,
            className: "w-full border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-xl h-11",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  className: "w-4 h-4 mr-2",
                  viewBox: "0 0 24 24",
                  "aria-label": "Google",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Google" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        fill: "#4285F4",
                        d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        fill: "#34A853",
                        d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        fill: "#FBBC05",
                        d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        fill: "#EA4335",
                        d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      }
                    )
                  ]
                }
              ),
              "Continue with Google"
            ]
          }
        )
      ]
    },
    isDriver ? "driver" : "rider"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 flex flex-col items-center justify-center px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 overflow-hidden pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "w-full max-w-sm relative z-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-orange-500 shadow-2xl mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "w-8 h-8 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-white tracking-tight", children: "PITTHU" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm mt-1", children: "Travel Across Uttarakhand" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Tabs,
            {
              defaultValue: "rider",
              onValueChange: (v) => setActiveTab(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full bg-white/10 rounded-xl mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TabsTrigger,
                    {
                      "data-ocid": "login.tab",
                      value: "rider",
                      className: "flex-1 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white text-white/60",
                      children: "Rider Login"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TabsTrigger,
                    {
                      "data-ocid": "login.driver_tab",
                      value: "driver",
                      className: "flex-1 rounded-lg data-[state=active]:bg-orange-500 data-[state=active]:text-white text-white/60",
                      children: "Driver Login"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "rider", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneOtpForm, { isDriver: false }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "driver", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneOtpForm, { isDriver: true }) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-white/40 text-sm mt-6", children: [
            "New driver?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/driver-register",
                "data-ocid": "login.link",
                className: "text-orange-400 font-medium hover:text-orange-300 transition-colors",
                children: "Register here →"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  LoginPage as default
};
