# Data Format Specification

This document outlines the expected data format for messages sent to the MQTT broker. The data should be a semicolon-separated string.

## Topics and Data Fields

### Topic: `0x186455F4` - System Status and Warnings

| Index | Field               | Type   | Description                                                                                                                                                             |
|-------|---------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 2     | Warning Flags       | String | A string of 8 binary flags (e.g., "10101010"). Each character represents a specific warning status.                                                                      |
| 3     | Power               | Number | The current power consumption in Watts.                                                                                                                                 |

**Warning Flags (Index 2):**
- **`[0]`**: Over Temperature (High) - `1` for active, `0` for inactive.
- **`[1]`**: Over Temperature (Low) - `1` for active, `0` for inactive.
- **`[2]`**: Over Current (High) - `1` for active, `0` for inactive.
- **`[3]`**: Over Current (Low) - `1` for active, `0` for inactive.
- **`[4]`**: CHG (Charge) - `1` for active, `0` for inactive.
- **`[5]`**: DSG (Discharge) - `1` for active, `0` for inactive.
- **`[6]`**: Over Voltage - `1` for active, `0` for inactive.
- **`[7]`**: Under Voltage - `1` for active, `0` for inactive.

### Topic: `0x186555F4` - Battery Pack Info

| Index | Field       | Type    | Description                                       |
|-------|-------------|---------|---------------------------------------------------|
| 0     | vPack       | Integer | The battery pack voltage, in tenths of a Volt.    |
| 1     | cPack Part 1| Integer | Part 1 of the battery pack capacity calculation.  |
| 2     | cPack Part 2| Integer | Part 2 of the battery pack capacity calculation.  |
| 3     | SoC         | Integer | State of Charge of the battery, as a percentage.  |

### Topic: `0x186655F4` - Cell Temperatures (Cells 1-4)

| Index | Field       | Type    | Description                                    |
|-------|-------------|---------|------------------------------------------------|
| 0     | Cell 1 Temp | Integer | Temperature of cell 1, in tenths of a degree Celsius. |
| 1     | Cell 2 Temp | Integer | Temperature of cell 2, in tenths of a degree Celsius. |
| 2     | Cell 3 Temp | Integer | Temperature of cell 3, in tenths of a degree Celsius. |
| 3     | Cell 4 Temp | Integer | Temperature of cell 4, in tenths of a degree Celsius. |

### Topic: `0x186755F4` - Cell Temperatures (Cells 5-8)

| Index | Field       | Type    | Description                                    |
|-------|-------------|---------|------------------------------------------------|
| 0     | Cell 5 Temp | Integer | Temperature of cell 5, in tenths of a degree Celsius. |
| 1     | Cell 6 Temp | Integer | Temperature of cell 6, in tenths of a degree Celsius. |
| 2     | Cell 7 Temp | Integer | Temperature of cell 7, in tenths of a degree Celsius. |
| 3     | Cell 8 Temp | Integer | Temperature of cell 8, in tenths of a degree Celsius. |
