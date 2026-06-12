// Foundation
export { cn } from "./lib/cn";
export {
  ThemeProvider,
  useTheme,
  type ThemeProviderProps,
  type ThemeContextValue,
  type ThemeState,
  type Theme,
  type Personality,
  type Density,
  type Direction,
} from "./lib/theme-provider";

// Components — Batch 1
export { Button, buttonVariants, type ButtonProps } from "./components/button/button";
export { Badge, badgeVariants, type BadgeProps } from "./components/badge/badge";
export {
  Card,
  CardMedia,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
} from "./components/card/card";
export {
  Input,
  TextField,
  inputVariants,
  type InputProps,
  type TextFieldProps,
} from "./components/input/input";

// Components — Batch 2 (rest of Inputs)
export { Checkbox, type CheckboxProps } from "./components/checkbox/checkbox";
export { Radio, RadioGroup, type RadioProps } from "./components/radio/radio";
export { Switch, type SwitchProps } from "./components/switch/switch";
export { Select, type SelectProps } from "./components/select/select";
export { Slider, type SliderProps } from "./components/slider/slider";
export { Fab, fabVariants, type FabProps } from "./components/fab/fab";
export {
  ButtonGroup,
  ButtonGroupItem,
} from "./components/button-group/button-group";
export {
  ToggleButtons,
  ToggleButtonsItem,
} from "./components/toggle-buttons/toggle-buttons";
export { Rating, type RatingProps } from "./components/rating/rating";

// Components — Batch 3 (Data display)
export {
  Avatar,
  AvatarGroup,
  avatarVariants,
  type AvatarProps,
} from "./components/avatar/avatar";
export { Divider, type DividerProps } from "./components/divider/divider";
export { Kbd, KbdCombo } from "./components/kbd/kbd";
export { List, ListItem, type ListItemProps } from "./components/list/list";
export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
} from "./components/table/table";
export { Tooltip, TooltipProvider, type TooltipProps } from "./components/tooltip/tooltip";
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverAnchor,
  PopoverBody,
  PopoverTitle,
} from "./components/popover/popover";

// Components — Batch 4 (Feedback)
export { Alert, alertVariants, type AlertProps } from "./components/alert/alert";
export { Banner, bannerVariants, type BannerProps } from "./components/banner/banner";
export {
  Progress,
  CircularProgress,
  Spinner,
  type ProgressProps,
  type CircularProgressProps,
} from "./components/progress/progress";
export {
  Skeleton,
  skeletonVariants,
  type SkeletonProps,
} from "./components/skeleton/skeleton";
export {
  ToastProvider,
  useToast,
  type ToastProviderProps,
  type ToastOptions,
  type ToastVariant,
} from "./components/toast/toast";
export {
  EmptyState,
  type EmptyStateProps,
} from "./components/empty-state/empty-state";

// Components — Batch 5 (Navigation + Dialog)
export { Link, linkVariants, type LinkProps } from "./components/link/link";
export {
  Breadcrumbs,
  type BreadcrumbsProps,
  type Crumb,
} from "./components/breadcrumbs/breadcrumbs";
export { Pagination, type PaginationProps } from "./components/pagination/pagination";
export { Stepper, type StepperProps, type Step } from "./components/stepper/stepper";
export {
  BottomNav,
  type BottomNavProps,
  type BottomNavItem,
} from "./components/bottom-nav/bottom-nav";
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsListProps,
} from "./components/tabs/tabs";
export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuLabel,
  MenuGroup,
  type MenuItemProps,
} from "./components/menu/menu";
export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogBody,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./components/dialog/dialog";
export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  drawerVariants,
  type DrawerContentProps,
} from "./components/drawer/drawer";

// Components — Batch 6 (Surfaces + Advanced)
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/accordion/accordion";
export { Paper, paperVariants, type PaperProps } from "./components/paper/paper";
export {
  AppBar,
  AppBarTitle,
  AppBarIcon,
  AppBarSpacer,
} from "./components/app-bar/app-bar";
export { Carousel, type CarouselProps } from "./components/carousel/carousel";
export {
  CommandPalette,
  useCommandPaletteShortcut,
  type CommandPaletteProps,
  type CommandItem,
} from "./components/command-palette/command-palette";

// Components — Stretch (rich inputs + advanced pickers)
export { NumberField, type NumberFieldProps } from "./components/number-field/number-field";
export { OTPInput, type OTPInputProps } from "./components/otp-input/otp-input";
export { TagInput, type TagInputProps } from "./components/tag-input/tag-input";
export {
  FileDropzone,
  type FileDropzoneProps,
} from "./components/file-dropzone/file-dropzone";
export {
  DatePicker,
  Calendar,
  type DatePickerProps,
  type CalendarProps,
} from "./components/date-picker/date-picker";
export { ColorPicker, type ColorPickerProps } from "./components/color-picker/color-picker";

// Components — Remaining set
export {
  Autocomplete,
  type AutocompleteProps,
} from "./components/autocomplete/autocomplete";
export {
  Combobox,
  type ComboboxProps,
  type ComboboxOption,
} from "./components/combobox/combobox";
export { TreeView, type TreeViewProps, type TreeNode } from "./components/tree-view/tree-view";
export { Timeline, type TimelineProps, type TimelineItem } from "./components/timeline/timeline";
export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  type MenubarItemProps,
} from "./components/menubar/menubar";
export {
  SpeedDial,
  type SpeedDialProps,
  type SpeedDialAction,
} from "./components/speed-dial/speed-dial";
export {
  TimePicker,
  type TimePickerProps,
  type TimeValue,
} from "./components/time-picker/time-picker";
export {
  DateRangePicker,
  RangeCalendar,
  type DateRangePickerProps,
  type RangeCalendarProps,
  type DateRange,
} from "./components/date-range/date-range";
