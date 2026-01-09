import precisionpointPro from "@/assets/products/precisionpoint-pro.jpg";
import precisionpointBase from "@/assets/products/precisionpoint-base.jpg";
import precisionpointSe from "@/assets/products/precisionpoint-se.jpg";
import truenavPro from "@/assets/products/truenav-pro.jpg";
import truenavic from "@/assets/products/truenavic.jpg";
import truenavMini from "@/assets/products/truenav-mini.jpg";
import truespeedV2 from "@/assets/products/truespeed-v2.jpg";
import sierraF1Mini from "@/assets/products/sierra-f1-mini.jpg";
import truepilot from "@/assets/products/truepilot.jpg";
import navicore from "@/assets/products/navicore.jpg";
import smartBms from "@/assets/products/smart-bms.jpg";
import pulseEsc from "@/assets/products/pulse-esc.jpg";
import micronavFpv from "@/assets/products/micronav-fpv.jpg";

export type ProductCategory = "RTK GPS" | "GPS/GNSS" | "Autopilots" | "Sensors" | "Power" | "ESC";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  image: string;
  tagline: string;
  features: string[];
  specs: Record<string, string>;
}

export const products: Product[] = [
  {
    id: "precisionpoint-pro",
    name: "PrecisionPoint-Pro",
    category: "RTK GPS",
    image: precisionpointPro,
    tagline: "High-precision RTK GPS with DroneCAN",
    features: [
      "High-performance Cortex®-M4 core with FPU",
      "Ublox ZED-F9/F20/X20 with RF front-end design",
      "Built-in ICM42688 IMU, DPS368 Baro, IST8310 Magnetometer",
      "Support RTK Navigation",
      "UAVCAN/DroneCAN communication protocol",
      "Support for CAM_TRIGGER & CAM_FEEDBACK",
      "Seamless integration with Ardupilot and PX4"
    ],
    specs: {
      "RTK Accuracy": "±1cm XY, ±2cm Z",
      "Heading Accuracy": "0.1° via CAN",
      "Power": "5V, 250mA max",
      "Weight": "15g",
      "Dimensions": "33x45mm"
    }
  },
  {
    id: "precisionpoint-base",
    name: "PrecisionPoint-BASE",
    category: "RTK GPS",
    image: precisionpointBase,
    tagline: "RTK Base Station for precision navigation",
    features: [
      "Ublox ZED-F9/F20/X20 with RF front-end design",
      "Built-in DPS368 Baro, IST8310 Magnetometer",
      "Support RTK Navigation",
      "UART+I2C communication protocol",
      "Supports USB",
      "Seamless integration with Ardupilot and PX4",
      "Auto-config for BASE and ROVER usage"
    ],
    specs: {
      "RTK Accuracy": "±1cm XY, ±2cm Z",
      "Heading Accuracy": "0.1° via UART",
      "Power": "5V, 250mA max",
      "Weight": "15g",
      "Dimensions": "33x45mm"
    }
  },
  {
    id: "precisionpoint-se",
    name: "PrecisionPoint-SE",
    category: "RTK GPS",
    image: precisionpointSe,
    tagline: "Compact RTK GPS with integrated antenna",
    features: [
      "High-performance Cortex®-M4 core with FPU",
      "Ublox NEO-F9P with RF front-end design L1+L5",
      "Built-in ICM42688 IMU, DPS368 Baro, IST8310 Magnetometer",
      "UAVCAN/DroneCAN communication protocol",
      "Support for CAM_TRIGGER & CAM_FEEDBACK",
      "Moving Baseline feature with 0.1° heading accuracy",
      "5g Lighter antenna option available"
    ],
    specs: {
      "RTK Accuracy": "±1cm XY, ±2cm Z",
      "Power": "5V, 250mA max",
      "Weight": "35.5g",
      "Dimensions": "55x57mm"
    }
  },
  {
    id: "truenav-pro",
    name: "Sierra TrueNav Pro",
    category: "GPS/GNSS",
    image: truenavPro,
    tagline: "Ultra-low power GNSS with DroneCAN",
    features: [
      "Ultra low power consumption Cortex®-M4 core",
      "Ublox M9N with RF front-end design",
      "DPS310 Barometer",
      "RM3100 Magnetometer",
      "UAVCAN/DroneCAN communication protocol",
      "Optimized ground plane with LNA and SAW filters",
      "2x GPIO with individual timers"
    ],
    specs: {
      "Accuracy": "±0.75m",
      "Power": "5V, 100mA max",
      "Weight": "15-19g",
      "Dimensions": "50×47mm"
    }
  },
  {
    id: "truenavic",
    name: "Sierra TrueNavIC",
    category: "GPS/GNSS",
    image: truenavic,
    tagline: "NavIC-based GNSS system",
    features: [
      "Ultra low power consumption Cortex®-M4 core",
      "Ublox F10N with software upgrade ability",
      "Industrial PNICorp RM3100 Magnetometer",
      "DPS310 Barometer",
      "UAVCAN/DroneCAN communication protocol",
      "Optimized ground plane with LNA and SAW filters",
      "2x GPIO with individual timers"
    ],
    specs: {
      "Accuracy": "±0.75m XY",
      "Power": "5V, 100mA max",
      "Weight": "25g",
      "Dimensions": "50×47mm"
    }
  },
  {
    id: "truenav-mini",
    name: "Sierra TrueNav-Mini",
    category: "GPS/GNSS",
    image: truenavMini,
    tagline: "Compact GNSS module",
    features: [
      "Ultra low power consumption Cortex®-M4 core",
      "IST8310 Magnetometer",
      "DPS310 Barometer",
      "UAVCAN/DroneCAN communication protocol",
      "Optimized ground plane with LNA and SAW filters",
      "2x GPIO with individual timers"
    ],
    specs: {
      "Accuracy": "±0.75m XY",
      "Power": "5V, 100mA max",
      "Weight": "17g",
      "Dimensions": "41x43mm"
    }
  },
  {
    id: "truespeed-v2",
    name: "Sierra TrueSpeed V2",
    category: "Sensors",
    image: truespeedV2,
    tagline: "Next-gen airspeed sensor",
    features: [
      "Differential and absolute pressure outputs via DroneCAN",
      "-40 to +75°C temperature compensation",
      "Optional magnetometer",
      "700kmph option on request"
    ],
    specs: {
      "Pressure Range": "2500Pa (±10 inH2O)",
      "Burst Pressure": "75kPa",
      "Speed Range": "±250 km/h",
      "Operating Temp": "-40°C to +85°C",
      "Weight": "2.5g",
      "Dimensions": "23x25mm"
    }
  },
  {
    id: "sierra-f1-mini",
    name: "Sierra F1 Mini",
    category: "Autopilots",
    image: sierraF1Mini,
    tagline: "Compact flight controller",
    features: [
      "Cortex®-M7 core with double-precision FPU",
      "480 MHz CPU, 2MB Flash, 1MB RAM",
      "3x TDK ICM42688-P with heater",
      "2x DPS368 Barometers",
      "Dual CAN-FD drivers",
      "10x PWM channels with DSHOT capability",
      "USB-C",
      "Vibration resistant SD card holder"
    ],
    specs: {
      "CPU": "480 MHz Cortex-M7",
      "UARTs": "4x (2x with HW flow control)",
      "Weight": "10g",
      "Dimensions": "35x35mm"
    }
  },
  {
    id: "truepilot",
    name: "Sierra TruePilot",
    category: "Autopilots",
    image: truepilot,
    tagline: "All-in-one autopilot with integrated GNSS",
    features: [
      "Cortex®-M7 core with double-precision FPU",
      "280 MHz CPU, 2MB Flash, 1MB RAM",
      "3x TDK ICM42688-P with heater",
      "Built-in GNSS options: M9N/F10N/F9P",
      "IST8310 magnetometer",
      "9x PWM channels with DSHOT capability",
      "Built-in Neopixel notification LEDs",
      "GPIO based CAN termination switch"
    ],
    specs: {
      "CPU": "280 MHz Cortex-M7",
      "UARTs": "4x",
      "CAN": "1x CAN-FD",
      "Weight": "21-27g",
      "Dimensions": "45x47mm"
    }
  },
  {
    id: "navicore",
    name: "Sierra-NavICore",
    category: "Autopilots",
    image: navicore,
    tagline: "Cost-effective integrated autopilot",
    features: [
      "STM32F405 with 168 MHz CPU",
      "1MB Flash, 192KB RAM",
      "125Mbytes of black box",
      "1x TDK ICM4xxx with heater",
      "IST8310 compass",
      "GNSS options: M9N/F10N/F9P",
      "9x PWM channels with DSHOT capability",
      "Analog current and Voltage sensing"
    ],
    specs: {
      "CPU": "168 MHz STM32F405",
      "UARTs": "3x",
      "GPIO": "2x",
      "Weight": "19-27g",
      "Dimensions": "50x50mm"
    }
  },
  {
    id: "smart-bms",
    name: "Sierra 6S Smart BMS",
    category: "Power",
    image: smartBms,
    tagline: "Smart BMS with dual 5V 3A regulators",
    features: [
      "Supports 4S-6S Li-ion and Li-Po",
      "Auto-cell balancing with CC-CV adaptive charging",
      "Over-voltage, over-current protections",
      "Overcharge, over-discharge, short circuit protection",
      "SMBus and CANBus communication",
      "5x LED array with 10% SoC display",
      "SoC, SoH, sleep mode",
      "Pre-charge, Pre-discharge circuit"
    ],
    specs: {
      "Continuous Current": "30A",
      "Peak Current": "70A",
      "Battery": "4S-6S Li-ion/Li-Po",
      "Communication": "SMBus, CANBus"
    }
  },
  {
    id: "pulse-esc",
    name: "Sierra Pulse ESC",
    category: "ESC",
    image: pulseEsc,
    tagline: "High-performance DroneCAN ESC",
    features: [
      "DShot 150/300/600/1200, Proshot/PWM, UAVCAN/DroneCAN",
      "ESC telemetry via BDSHOT, DroneCAN or UART",
      "Onboard current sensor",
      "Firmware update via DroneCAN",
      "High quality ceramic capacitors",
      "Outputs for Navigation LEDs, Debug, spare UART"
    ],
    specs: {
      "12S Continuous": "35A",
      "12S Burst": "60A",
      "6S Continuous": "55A",
      "6S Burst": "70A",
      "Weight": "10g",
      "Dimensions": "27x45mm"
    }
  },
  {
    id: "micronav-fpv",
    name: "Sierra MicroNav FPV",
    category: "GPS/GNSS",
    image: micronavFpv,
    tagline: "Ultra-compact GPS for FPV",
    features: [
      "Ublox MAX-M10S",
      "IST8310 magnetometer",
      "UART+I2C interface"
    ],
    specs: {
      "Accuracy": "±1.5m",
      "Power": "5V, 100mA max",
      "Weight": "12.5g",
      "Dimensions": "25x33mm"
    }
  }
];

export const categories: ProductCategory[] = ["RTK GPS", "GPS/GNSS", "Autopilots", "Sensors", "Power", "ESC"];
