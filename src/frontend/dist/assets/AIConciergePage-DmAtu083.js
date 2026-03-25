import { c as createLucideIcon, r as reactExports, I as useControllableState, j as jsxRuntimeExports, J as createContextScope, K as createCollection, L as composeEventHandlers, Q as Primitive, V as useComposedRefs, W as useDirection, Y as clamp, Z as useSize, _ as usePrevious, a as cn, m as motion, $ as Sparkles, e as Card, f as CardContent, a0 as Input, l as Button, B as Badge, z as Select, D as SelectTrigger, E as SelectValue, F as SelectContent, H as SelectItem, A as AnimatePresence, t as CircleCheck, i as ue, a1 as Zap, a2 as Wind, M as MapPin } from "./index-CFF4uHgs.js";
import { S as Switch } from "./switch-D9c-TZDo.js";
import { F as FileText } from "./file-text-DZ8AFrO3.js";
import { U as Upload } from "./upload-DsoXpUpi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
];
const Bot = createLucideIcon("bot", __iconNode);
var PAGE_KEYS = ["PageUp", "PageDown"];
var ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
var BACK_KEYS = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
};
var SLIDER_NAME = "Slider";
var [Collection, useCollection, createCollectionScope] = createCollection(SLIDER_NAME);
var [createSliderContext] = createContextScope(SLIDER_NAME, [
  createCollectionScope
]);
var [SliderProvider, useSliderContext] = createSliderContext(SLIDER_NAME);
var Slider$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      name,
      min = 0,
      max = 100,
      step = 1,
      orientation = "horizontal",
      disabled = false,
      minStepsBetweenThumbs = 0,
      defaultValue = [min],
      value,
      onValueChange = () => {
      },
      onValueCommit = () => {
      },
      inverted = false,
      form,
      ...sliderProps
    } = props;
    const thumbRefs = reactExports.useRef(/* @__PURE__ */ new Set());
    const valueIndexToChangeRef = reactExports.useRef(0);
    const isHorizontal = orientation === "horizontal";
    const SliderOrientation = isHorizontal ? SliderHorizontal : SliderVertical;
    const [values = [], setValues] = useControllableState({
      prop: value,
      defaultProp: defaultValue,
      onChange: (value2) => {
        var _a;
        const thumbs = [...thumbRefs.current];
        (_a = thumbs[valueIndexToChangeRef.current]) == null ? void 0 : _a.focus();
        onValueChange(value2);
      }
    });
    const valuesBeforeSlideStartRef = reactExports.useRef(values);
    function handleSlideStart(value2) {
      const closestIndex = getClosestValueIndex(values, value2);
      updateValues(value2, closestIndex);
    }
    function handleSlideMove(value2) {
      updateValues(value2, valueIndexToChangeRef.current);
    }
    function handleSlideEnd() {
      const prevValue = valuesBeforeSlideStartRef.current[valueIndexToChangeRef.current];
      const nextValue = values[valueIndexToChangeRef.current];
      const hasChanged = nextValue !== prevValue;
      if (hasChanged) onValueCommit(values);
    }
    function updateValues(value2, atIndex, { commit } = { commit: false }) {
      const decimalCount = getDecimalCount(step);
      const snapToStep = roundValue(Math.round((value2 - min) / step) * step + min, decimalCount);
      const nextValue = clamp(snapToStep, [min, max]);
      setValues((prevValues = []) => {
        const nextValues = getNextSortedValues(prevValues, nextValue, atIndex);
        if (hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs * step)) {
          valueIndexToChangeRef.current = nextValues.indexOf(nextValue);
          const hasChanged = String(nextValues) !== String(prevValues);
          if (hasChanged && commit) onValueCommit(nextValues);
          return hasChanged ? nextValues : prevValues;
        } else {
          return prevValues;
        }
      });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SliderProvider,
      {
        scope: props.__scopeSlider,
        name,
        disabled,
        min,
        max,
        valueIndexToChangeRef,
        thumbs: thumbRefs.current,
        values,
        orientation,
        form,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeSlider, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeSlider, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SliderOrientation,
          {
            "aria-disabled": disabled,
            "data-disabled": disabled ? "" : void 0,
            ...sliderProps,
            ref: forwardedRef,
            onPointerDown: composeEventHandlers(sliderProps.onPointerDown, () => {
              if (!disabled) valuesBeforeSlideStartRef.current = values;
            }),
            min,
            max,
            inverted,
            onSlideStart: disabled ? void 0 : handleSlideStart,
            onSlideMove: disabled ? void 0 : handleSlideMove,
            onSlideEnd: disabled ? void 0 : handleSlideEnd,
            onHomeKeyDown: () => !disabled && updateValues(min, 0, { commit: true }),
            onEndKeyDown: () => !disabled && updateValues(max, values.length - 1, { commit: true }),
            onStepKeyDown: ({ event, direction: stepDirection }) => {
              if (!disabled) {
                const isPageKey = PAGE_KEYS.includes(event.key);
                const isSkipKey = isPageKey || event.shiftKey && ARROW_KEYS.includes(event.key);
                const multiplier = isSkipKey ? 10 : 1;
                const atIndex = valueIndexToChangeRef.current;
                const value2 = values[atIndex];
                const stepInDirection = step * multiplier * stepDirection;
                updateValues(value2 + stepInDirection, atIndex, { commit: true });
              }
            }
          }
        ) }) })
      }
    );
  }
);
Slider$1.displayName = SLIDER_NAME;
var [SliderOrientationProvider, useSliderOrientationContext] = createSliderContext(SLIDER_NAME, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
});
var SliderHorizontal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      min,
      max,
      dir,
      inverted,
      onSlideStart,
      onSlideMove,
      onSlideEnd,
      onStepKeyDown,
      ...sliderProps
    } = props;
    const [slider, setSlider] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setSlider(node));
    const rectRef = reactExports.useRef(void 0);
    const direction = useDirection(dir);
    const isDirectionLTR = direction === "ltr";
    const isSlidingFromLeft = isDirectionLTR && !inverted || !isDirectionLTR && inverted;
    function getValueFromPointer(pointerPosition) {
      const rect = rectRef.current || slider.getBoundingClientRect();
      const input = [0, rect.width];
      const output = isSlidingFromLeft ? [min, max] : [max, min];
      const value = linearScale(input, output);
      rectRef.current = rect;
      return value(pointerPosition - rect.left);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SliderOrientationProvider,
      {
        scope: props.__scopeSlider,
        startEdge: isSlidingFromLeft ? "left" : "right",
        endEdge: isSlidingFromLeft ? "right" : "left",
        direction: isSlidingFromLeft ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SliderImpl,
          {
            dir: direction,
            "data-orientation": "horizontal",
            ...sliderProps,
            ref: composedRefs,
            style: {
              ...sliderProps.style,
              ["--radix-slider-thumb-transform"]: "translateX(-50%)"
            },
            onSlideStart: (event) => {
              const value = getValueFromPointer(event.clientX);
              onSlideStart == null ? void 0 : onSlideStart(value);
            },
            onSlideMove: (event) => {
              const value = getValueFromPointer(event.clientX);
              onSlideMove == null ? void 0 : onSlideMove(value);
            },
            onSlideEnd: () => {
              rectRef.current = void 0;
              onSlideEnd == null ? void 0 : onSlideEnd();
            },
            onStepKeyDown: (event) => {
              const slideDirection = isSlidingFromLeft ? "from-left" : "from-right";
              const isBackKey = BACK_KEYS[slideDirection].includes(event.key);
              onStepKeyDown == null ? void 0 : onStepKeyDown({ event, direction: isBackKey ? -1 : 1 });
            }
          }
        )
      }
    );
  }
);
var SliderVertical = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      min,
      max,
      inverted,
      onSlideStart,
      onSlideMove,
      onSlideEnd,
      onStepKeyDown,
      ...sliderProps
    } = props;
    const sliderRef = reactExports.useRef(null);
    const ref = useComposedRefs(forwardedRef, sliderRef);
    const rectRef = reactExports.useRef(void 0);
    const isSlidingFromBottom = !inverted;
    function getValueFromPointer(pointerPosition) {
      const rect = rectRef.current || sliderRef.current.getBoundingClientRect();
      const input = [0, rect.height];
      const output = isSlidingFromBottom ? [max, min] : [min, max];
      const value = linearScale(input, output);
      rectRef.current = rect;
      return value(pointerPosition - rect.top);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SliderOrientationProvider,
      {
        scope: props.__scopeSlider,
        startEdge: isSlidingFromBottom ? "bottom" : "top",
        endEdge: isSlidingFromBottom ? "top" : "bottom",
        size: "height",
        direction: isSlidingFromBottom ? 1 : -1,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SliderImpl,
          {
            "data-orientation": "vertical",
            ...sliderProps,
            ref,
            style: {
              ...sliderProps.style,
              ["--radix-slider-thumb-transform"]: "translateY(50%)"
            },
            onSlideStart: (event) => {
              const value = getValueFromPointer(event.clientY);
              onSlideStart == null ? void 0 : onSlideStart(value);
            },
            onSlideMove: (event) => {
              const value = getValueFromPointer(event.clientY);
              onSlideMove == null ? void 0 : onSlideMove(value);
            },
            onSlideEnd: () => {
              rectRef.current = void 0;
              onSlideEnd == null ? void 0 : onSlideEnd();
            },
            onStepKeyDown: (event) => {
              const slideDirection = isSlidingFromBottom ? "from-bottom" : "from-top";
              const isBackKey = BACK_KEYS[slideDirection].includes(event.key);
              onStepKeyDown == null ? void 0 : onStepKeyDown({ event, direction: isBackKey ? -1 : 1 });
            }
          }
        )
      }
    );
  }
);
var SliderImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSlider,
      onSlideStart,
      onSlideMove,
      onSlideEnd,
      onHomeKeyDown,
      onEndKeyDown,
      onStepKeyDown,
      ...sliderProps
    } = props;
    const context = useSliderContext(SLIDER_NAME, __scopeSlider);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        ...sliderProps,
        ref: forwardedRef,
        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
          if (event.key === "Home") {
            onHomeKeyDown(event);
            event.preventDefault();
          } else if (event.key === "End") {
            onEndKeyDown(event);
            event.preventDefault();
          } else if (PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
            onStepKeyDown(event);
            event.preventDefault();
          }
        }),
        onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
          const target = event.target;
          target.setPointerCapture(event.pointerId);
          event.preventDefault();
          if (context.thumbs.has(target)) {
            target.focus();
          } else {
            onSlideStart(event);
          }
        }),
        onPointerMove: composeEventHandlers(props.onPointerMove, (event) => {
          const target = event.target;
          if (target.hasPointerCapture(event.pointerId)) onSlideMove(event);
        }),
        onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
          const target = event.target;
          if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
            onSlideEnd(event);
          }
        })
      }
    );
  }
);
var TRACK_NAME = "SliderTrack";
var SliderTrack = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSlider, ...trackProps } = props;
    const context = useSliderContext(TRACK_NAME, __scopeSlider);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-disabled": context.disabled ? "" : void 0,
        "data-orientation": context.orientation,
        ...trackProps,
        ref: forwardedRef
      }
    );
  }
);
SliderTrack.displayName = TRACK_NAME;
var RANGE_NAME = "SliderRange";
var SliderRange = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSlider, ...rangeProps } = props;
    const context = useSliderContext(RANGE_NAME, __scopeSlider);
    const orientation = useSliderOrientationContext(RANGE_NAME, __scopeSlider);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const valuesCount = context.values.length;
    const percentages = context.values.map(
      (value) => convertValueToPercentage(value, context.min, context.max)
    );
    const offsetStart = valuesCount > 1 ? Math.min(...percentages) : 0;
    const offsetEnd = 100 - Math.max(...percentages);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-orientation": context.orientation,
        "data-disabled": context.disabled ? "" : void 0,
        ...rangeProps,
        ref: composedRefs,
        style: {
          ...props.style,
          [orientation.startEdge]: offsetStart + "%",
          [orientation.endEdge]: offsetEnd + "%"
        }
      }
    );
  }
);
SliderRange.displayName = RANGE_NAME;
var THUMB_NAME = "SliderThumb";
var SliderThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const getItems = useCollection(props.__scopeSlider);
    const [thumb, setThumb] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setThumb(node));
    const index = reactExports.useMemo(
      () => thumb ? getItems().findIndex((item) => item.ref.current === thumb) : -1,
      [getItems, thumb]
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SliderThumbImpl, { ...props, ref: composedRefs, index });
  }
);
var SliderThumbImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSlider, index, name, ...thumbProps } = props;
    const context = useSliderContext(THUMB_NAME, __scopeSlider);
    const orientation = useSliderOrientationContext(THUMB_NAME, __scopeSlider);
    const [thumb, setThumb] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setThumb(node));
    const isFormControl = thumb ? context.form || !!thumb.closest("form") : true;
    const size = useSize(thumb);
    const value = context.values[index];
    const percent = value === void 0 ? 0 : convertValueToPercentage(value, context.min, context.max);
    const label = getLabel(index, context.values.length);
    const orientationSize = size == null ? void 0 : size[orientation.size];
    const thumbInBoundsOffset = orientationSize ? getThumbInBoundsOffset(orientationSize, percent, orientation.direction) : 0;
    reactExports.useEffect(() => {
      if (thumb) {
        context.thumbs.add(thumb);
        return () => {
          context.thumbs.delete(thumb);
        };
      }
    }, [thumb, context.thumbs]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [orientation.startEdge]: `calc(${percent}% + ${thumbInBoundsOffset}px)`
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.ItemSlot, { scope: props.__scopeSlider, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Primitive.span,
            {
              role: "slider",
              "aria-label": props["aria-label"] || label,
              "aria-valuemin": context.min,
              "aria-valuenow": value,
              "aria-valuemax": context.max,
              "aria-orientation": context.orientation,
              "data-orientation": context.orientation,
              "data-disabled": context.disabled ? "" : void 0,
              tabIndex: context.disabled ? void 0 : 0,
              ...thumbProps,
              ref: composedRefs,
              style: value === void 0 ? { display: "none" } : props.style,
              onFocus: composeEventHandlers(props.onFocus, () => {
                context.valueIndexToChangeRef.current = index;
              })
            }
          ) }),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            SliderBubbleInput,
            {
              name: name ?? (context.name ? context.name + (context.values.length > 1 ? "[]" : "") : void 0),
              form: context.form,
              value
            },
            index
          )
        ]
      }
    );
  }
);
SliderThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var SliderBubbleInput = reactExports.forwardRef(
  ({ __scopeSlider, value, ...props }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevValue = usePrevious(value);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(inputProto, "value");
      const setValue = descriptor.set;
      if (prevValue !== value && setValue) {
        const event = new Event("input", { bubbles: true });
        setValue.call(input, value);
        input.dispatchEvent(event);
      }
    }, [prevValue, value]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        style: { display: "none" },
        ...props,
        ref: composedRefs,
        defaultValue: value
      }
    );
  }
);
SliderBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getNextSortedValues(prevValues = [], nextValue, atIndex) {
  const nextValues = [...prevValues];
  nextValues[atIndex] = nextValue;
  return nextValues.sort((a, b) => a - b);
}
function convertValueToPercentage(value, min, max) {
  const maxSteps = max - min;
  const percentPerStep = 100 / maxSteps;
  const percentage = percentPerStep * (value - min);
  return clamp(percentage, [0, 100]);
}
function getLabel(index, totalValues) {
  if (totalValues > 2) {
    return `Value ${index + 1} of ${totalValues}`;
  } else if (totalValues === 2) {
    return ["Minimum", "Maximum"][index];
  } else {
    return void 0;
  }
}
function getClosestValueIndex(values, nextValue) {
  if (values.length === 1) return 0;
  const distances = values.map((value) => Math.abs(value - nextValue));
  const closestDistance = Math.min(...distances);
  return distances.indexOf(closestDistance);
}
function getThumbInBoundsOffset(width, left, direction) {
  const halfWidth = width / 2;
  const halfPercent = 50;
  const offset = linearScale([0, halfPercent], [0, halfWidth]);
  return (halfWidth - offset(left) * direction) * direction;
}
function getStepsBetweenValues(values) {
  return values.slice(0, -1).map((value, index) => values[index + 1] - value);
}
function hasMinStepsBetweenValues(values, minStepsBetweenValues) {
  if (minStepsBetweenValues > 0) {
    const stepsBetweenValues = getStepsBetweenValues(values);
    const actualMinStepsBetweenValues = Math.min(...stepsBetweenValues);
    return actualMinStepsBetweenValues >= minStepsBetweenValues;
  }
  return true;
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function getDecimalCount(value) {
  return (String(value).split(".")[1] || "").length;
}
function roundValue(value, decimalCount) {
  const rounder = Math.pow(10, decimalCount);
  return Math.round(value * rounder) / rounder;
}
var Root = Slider$1;
var Track = SliderTrack;
var Range = SliderRange;
var Thumb = SliderThumb;
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const _values = reactExports.useMemo(
    () => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max],
    [value, defaultValue, min, max]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Root,
    {
      "data-slot": "slider",
      defaultValue,
      value,
      min,
      max,
      className: cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Track,
          {
            "data-slot": "slider-track",
            className: cn(
              "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Range,
              {
                "data-slot": "slider-range",
                className: cn(
                  "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: _values.length }, (value2, _) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Thumb,
          {
            "data-slot": "slider-thumb",
            className: "border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          },
          `${value2}`
        ))
      ]
    }
  );
}
const vibeItineraries = {
  "🌿 Quiet & Misty": {
    title: "Misty Retreats of Kumaon",
    days: [
      {
        dest: "Mukteshwar",
        desc: "Arrive, check into a pine-nestled homestay. Watch clouds roll over the valley from your balcony."
      },
      {
        dest: "Binsar Wildlife Sanctuary",
        desc: "Early morning bird-watching walk. 300+ Himalayan species. Absolute silence, just birdsong."
      },
      {
        dest: "Pangot",
        desc: "Village walk, local Pahadi lunch, depart rejuvenated."
      }
    ]
  },
  "⛰️ Adventure Seeker": {
    title: "Adrenaline in the Garhwal",
    days: [
      {
        dest: "Rishikesh",
        desc: "River rafting on Class IV rapids of Ganga. High-adrenaline, professional guides."
      },
      {
        dest: "Har Ki Dun",
        desc: "Trek through ancient glacial valley. Camp under 5,000m peaks."
      },
      {
        dest: "Auli",
        desc: "Asia's highest ski resort. Cable car ride with panoramic Himalaya views."
      }
    ]
  },
  "🙏 Pilgrimage": {
    title: "Devbhoomi Char Dham Circuit",
    days: [
      {
        dest: "Yamunotri",
        desc: "First of the Char Dhams. Sacred hot springs, Divya Shila rock worship."
      },
      {
        dest: "Gangotri",
        desc: "Source of the Holy Ganga. Sunrise aarti with mountain backdrop."
      },
      {
        dest: "Kedarnath",
        desc: "Most sacred Shiva shrine. Helicopter available. Profound spiritual energy."
      }
    ]
  },
  "🍛 Local Food Trail": {
    title: "Pahadi Flavours Journey",
    days: [
      {
        dest: "Almora",
        desc: "Bal Mithai and Singori sweets. Local market exploration. Dal-bhaat-roti at a village kitchen."
      },
      {
        dest: "Lansdowne",
        desc: "Kafuli (spinach gravy), Jhangora kheer, and Rhododendron juice at a forest café."
      },
      {
        dest: "Chakrata",
        desc: "Wild mushroom curry, fresh trout, and Buransh sharbat at sunset."
      }
    ]
  }
};
const modalRoutes = {
  "Milam Glacier": {
    steps: [
      { mode: "Car", route: "Dehradun → Munsiari", dist: "310 km", icon: "🚗" },
      {
        mode: "Drone",
        route: "Munsiari → Base Camp",
        dist: "18 km",
        icon: "🚁"
      },
      { mode: "Mule", route: "Base Camp → Milam", dist: "5 km", icon: "🫏" }
    ]
  },
  "Har Ki Dun": {
    steps: [
      { mode: "Car", route: "Dehradun → Sankri", dist: "195 km", icon: "🚗" },
      { mode: "Drone", route: "Sankri → Osla", dist: "14 km", icon: "🚁" },
      { mode: "Trek", route: "Osla → Har Ki Dun", dist: "6 km", icon: "🥾" }
    ]
  },
  Pangarchulla: {
    steps: [
      {
        mode: "Car",
        route: "Rishikesh → Joshimath",
        dist: "265 km",
        icon: "🚗"
      },
      { mode: "Drone", route: "Joshimath → Tugasi", dist: "9 km", icon: "🚁" },
      { mode: "Trek", route: "Tugasi → Summit", dist: "8 km", icon: "🥾" }
    ]
  },
  "Niti Valley": {
    steps: [
      { mode: "Car", route: "Haridwar → Chamoli", dist: "220 km", icon: "🚗" },
      {
        mode: "Drone",
        route: "Chamoli → Inner Zone",
        dist: "22 km",
        icon: "🚁"
      },
      { mode: "Mule", route: "Inner Zone → Niti", dist: "4 km", icon: "🫏" }
    ]
  }
};
function AIConciergePage() {
  const [messages, setMessages] = reactExports.useState([
    {
      role: "ai",
      text: "Namaste! 🙏 I'm your AI Mountain Concierge. Tell me your travel vibe, or choose a quick option below, and I'll craft your perfect Uttarakhand itinerary."
    }
  ]);
  const [typing, setTyping] = reactExports.useState(false);
  const [customVibe, setCustomVibe] = reactExports.useState("");
  const [curvinessMode, setCurvinessMode] = reactExports.useState(null);
  const [selectedDest, setSelectedDest] = reactExports.useState("Milam Glacier");
  const [revealedSteps, setRevealedSteps] = reactExports.useState(0);
  const [permitScanning, setPermitScanning] = reactExports.useState(false);
  const [permitDone, setPermitDone] = reactExports.useState(false);
  const [permitNum, setPermitNum] = reactExports.useState("");
  const [memoryDrone, setMemoryDrone] = reactExports.useState(false);
  const [windSpeed, setWindSpeed] = reactExports.useState([35]);
  const [altitude, setAltitude] = reactExports.useState([2500]);
  const chatEndRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = chatEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleVibeChip = (vibe) => {
    const userMsg = { role: "user", text: vibe };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const itinerary = vibeItineraries[vibe];
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `Perfect! Based on your "${vibe}" vibe, here's your personalised Uttarakhand itinerary:`,
          itinerary
        }
      ]);
    }, 1800);
  };
  const handleCustomVibe = () => {
    if (!customVibe.trim()) return;
    const userMsg = { role: "user", text: customVibe };
    setMessages((prev) => [...prev, userMsg]);
    setCustomVibe("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `I love your vibe! Based on "${userMsg.text}", I'd recommend exploring Chopta (mini Switzerland of India), Lansdowne (colonial hill station), and the ancient Jageshwar temple complex. Want a detailed 3-day itinerary?`
        }
      ]);
    }, 2e3);
  };
  const handleRevealRoute = () => {
    setRevealedSteps(0);
    const steps = modalRoutes[selectedDest].steps;
    steps.forEach((_, i) => {
      setTimeout(() => setRevealedSteps(i + 1), i * 600 + 200);
    });
  };
  const handlePermitScan = () => {
    setPermitScanning(true);
    setPermitDone(false);
    setTimeout(() => {
      setPermitScanning(false);
      setPermitDone(true);
      const num = `ILP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-2026`;
      setPermitNum(num);
      ue.success("Inner Line Permit applied successfully!");
    }, 3e3);
  };
  const batteryUsage = Math.min(
    100,
    Math.round(windSpeed[0] / 80 * 60 + altitude[0] / 5e3 * 40)
  );
  const isNoGo = windSpeed[0] > 60;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-muted pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-purple-900 via-indigo-900 to-brand-blue-dark py-16 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 opacity-5",
          style: {
            backgroundImage: "url('/assets/generated/hero-uttarakhand.dim_1400x700.jpg')",
            backgroundSize: "cover"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6 text-purple-300" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-purple-300 font-montserrat font-bold uppercase tracking-[0.2em] text-xs", children: "PITTHU AI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-montserrat font-black text-white text-3xl uppercase", children: "AI Concierge" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm max-w-lg", children: "Plan your mountain journey by vibe, not just destinations. AI-powered, hyper-local, Uttarakhand-obsessed." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-montserrat font-extrabold uppercase text-xl text-foreground mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-5 h-5 text-purple-500" }),
          " Trip Architect"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "h-64 overflow-y-auto p-4 space-y-3 bg-muted/30",
              id: "chat-box",
              children: [
                messages.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: `max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-none" : "bg-card text-foreground border border-border rounded-bl-none"}`,
                        children: [
                          msg.role === "ai" && /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-3.5 h-3.5 inline mr-1.5 text-purple-500 -mt-0.5" }),
                          msg.text,
                          msg.itinerary && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-montserrat font-bold text-xs uppercase tracking-wide", children: msg.itinerary.title }),
                            msg.itinerary.days.map((day, di) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "bg-muted/50 rounded-lg p-2.5",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-xs", children: [
                                    "Day ",
                                    di + 1,
                                    " — ",
                                    day.dest
                                  ] }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: day.desc })
                                ]
                              },
                              day.dest
                            ))
                          ] })
                        ]
                      }
                    )
                  },
                  i
                )),
                typing && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    className: "flex justify-start",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl rounded-bl-none px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [0, 1, 2].map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.span,
                      {
                        className: "w-2 h-2 rounded-full bg-purple-400 inline-block",
                        animate: { y: [0, -5, 0] },
                        transition: {
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 0.8,
                          delay: j * 0.15
                        }
                      },
                      j
                    )) }) })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: chatEndRef })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Choose your vibe:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: Object.keys(vibeItineraries).map((vibe) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => handleVibeChip(vibe),
                className: "px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium border border-purple-200 dark:border-purple-700 hover:bg-purple-200 dark:hover:bg-purple-800/40 transition-colors",
                "data-ocid": "ai.vibe.tab",
                children: vibe
              },
              vibe
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Describe your vibe... (e.g. solo trek, no crowds)",
                  value: customVibe,
                  onChange: (e) => setCustomVibe(e.target.value),
                  onKeyDown: (e) => e.key === "Enter" && handleCustomVibe(),
                  className: "flex-1 text-sm",
                  "data-ocid": "ai.chat.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleCustomVibe,
                  className: "bg-purple-600 hover:bg-purple-700 text-white font-montserrat font-bold uppercase text-xs rounded-full px-4",
                  "data-ocid": "ai.chat.submit_button",
                  children: "Send"
                }
              )
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-montserrat font-extrabold uppercase text-xl text-foreground mb-4", children: "🌀 Route Curviness Filter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          {
            id: "scenic",
            icon: "🌀",
            title: "Scenic / Curvy Route",
            desc: "Enjoy the bends, hairpin turns, mountain vistas. Made for those who love the journey.",
            badge: "Recommended for travelers"
          },
          {
            id: "tunnel",
            icon: "🚇",
            title: "Fast / Tunnel Route",
            desc: "Bypass mountain curves via tunnels. Efficient, less scenic, motion-sickness friendly.",
            badge: "Best for motion sickness"
          }
        ].map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            whileTap: { scale: 0.97 },
            onClick: () => setCurvinessMode(option.id),
            className: `p-5 rounded-2xl border-2 text-left transition-all ${curvinessMode === option.id ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40"}`,
            "data-ocid": `ai.route.${option.id}.toggle`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: option.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-montserrat font-black text-base text-foreground mb-1", children: option.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: option.desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: curvinessMode === option.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  children: option.badge
                }
              )
            ]
          },
          option.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-montserrat font-extrabold uppercase text-xl text-foreground mb-4", children: "🗺️ Multi-Modal Route Planner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-5 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: selectedDest,
                onValueChange: (v) => {
                  setSelectedDest(v);
                  setRevealedSteps(0);
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "w-48",
                      "data-ocid": "ai.destination.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(modalRoutes).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d)) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleRevealRoute,
                className: "bg-primary text-primary-foreground font-montserrat font-bold uppercase text-xs rounded-full",
                "data-ocid": "ai.route.primary_button",
                children: "Plan Route"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: modalRoutes[selectedDest].steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: revealedSteps > i && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
              className: "flex items-center gap-4 p-3 bg-muted rounded-xl border border-border",
              "data-ocid": `ai.route.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: step.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary text-xs", children: step.mode }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: step.route })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: step.dist })
                ] }),
                i < modalRoutes[selectedDest].steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "→" })
              ]
            }
          ) }, step.route)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-montserrat font-extrabold uppercase text-xl text-foreground mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 inline mr-2 text-amber-500" }),
          "Inner Line Permit Manager"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Required for border areas like Milam, Niti Valley, and Munsiari. Upload your Aadhaar ID and we'll apply automatically." }),
          !permitDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors relative overflow-hidden w-full",
              onClick: handlePermitScan,
              "data-ocid": "ai.permit.upload_button",
              children: permitScanning ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-montserrat font-bold text-sm text-foreground mb-3", children: "Scanning ID..." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative bg-muted rounded-lg h-2 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-transparent via-primary to-transparent",
                    animate: { x: [-48, 300] },
                    transition: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.2,
                      ease: "linear"
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "AI analysing document..." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-montserrat font-bold text-sm text-foreground", children: "Upload Aadhaar / Passport" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Click to scan and auto-apply for Inner Line Permit" })
              ] })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              className: "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 rounded-xl p-5 text-center",
              "data-ocid": "ai.permit.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-emerald-500 mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-montserrat font-bold text-emerald-700 dark:text-emerald-400", children: "Permit Applied ✓" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                  "Permit No:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-foreground", children: permitNum })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mt-2 bg-emerald-100 text-emerald-700", children: "Processing: 24-48 hours" })
              ]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "relative rounded-2xl overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 opacity-20",
                style: {
                  backgroundImage: "url('/assets/generated/hero-uttarakhand.dim_1400x700.jpg')",
                  backgroundSize: "cover"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-3 bg-purple-500/20 text-purple-300 border border-purple-500/30", children: "NEW · Post-Trip Experience" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-montserrat font-black text-white text-2xl uppercase mb-2", children: "Memory Drone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm mb-6 max-w-md", children: "A drone follows your car for 2 minutes at a scenic mountain spot and captures cinematic 4K footage of your drive. Delivered to your phone within the hour." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    checked: memoryDrone,
                    onCheckedChange: (v) => {
                      setMemoryDrone(v);
                      if (v) ue.success("Memory Drone added to your booking!");
                    },
                    id: "memory-drone",
                    "data-ocid": "ai.memory_drone.switch"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-montserrat font-bold text-sm cursor-pointer", children: memoryDrone ? "✓ Added to booking" : "Add to my trip" }),
                memoryDrone && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-purple-500 text-white", children: "+₹999" })
              ] })
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-montserrat font-extrabold uppercase text-xl text-foreground mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 inline mr-2 text-yellow-500" }),
          "Drone Battery Predictor"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { className: "w-4 h-4" }),
                  " Wind Speed"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-montserrat font-black text-foreground", children: [
                  windSpeed[0],
                  " km/h"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Slider,
                {
                  min: 0,
                  max: 80,
                  step: 1,
                  value: windSpeed,
                  onValueChange: setWindSpeed,
                  className: "w-full",
                  "data-ocid": "ai.wind.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Calm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Storm" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
                  " Altitude"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-montserrat font-black text-foreground", children: [
                  altitude[0],
                  "m"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Slider,
                {
                  min: 0,
                  max: 5e3,
                  step: 100,
                  value: altitude,
                  onValueChange: setAltitude,
                  className: "w-full",
                  "data-ocid": "ai.altitude.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0m" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "5,000m" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-32 h-32", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  viewBox: "0 0 100 100",
                  className: "w-full h-full",
                  role: "img",
                  "aria-label": "Illustration",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        cx: "50",
                        cy: "50",
                        r: "42",
                        fill: "none",
                        stroke: "#e2e8f0",
                        strokeWidth: "10"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        cx: "50",
                        cy: "50",
                        r: "42",
                        fill: "none",
                        stroke: isNoGo ? "#ef4444" : batteryUsage > 60 ? "#f59e0b" : "#10b981",
                        strokeWidth: "10",
                        strokeDasharray: `${batteryUsage / 100 * 264} 264`,
                        strokeLinecap: "round",
                        transform: "rotate(-90 50 50)"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-montserrat font-black text-2xl text-foreground", children: [
                  batteryUsage,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "usage" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `mt-4 px-5 py-2 rounded-full font-montserrat font-black text-sm uppercase tracking-wider ${isNoGo ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"}`,
                "data-ocid": isNoGo ? "ai.battery.error_state" : "ai.battery.success_state",
                children: isNoGo ? "🚫 NO-GO" : "✅ GO"
              }
            ),
            isNoGo && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500 mt-2 text-center", children: "Wind speed exceeds 60 km/h. Drone flight unsafe." })
          ] })
        ] }) }) })
      ] })
    ] })
  ] });
}
export {
  AIConciergePage as default
};
