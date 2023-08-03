import {
  AccessTimeFilled,
  Block,
  Cancel,
  ChangeCircle,
  CheckCircle,
  Task,
  Timelapse,
  Warning
} from "@mui/icons-material";
import { amber, green, grey, indigo, red, teal } from "@mui/material/colors";

/**
 * Single source of truth for status definitions
 */
const statuses = {
  Failed: {
    icon: {
      color: red[700],
      type: Cancel
    },
    label: {
      text: "Failed"
    }
  },
  "Not Run": {
    icon: {
      color: amber[800],
      type: Warning
    },
    label: {
      text: "Not Run"
    }
  },
  Passed: {
    icon: {
      color: green[800],
      type: CheckCircle
    },
    label: {
      text: "Passed"
    }
  },
  Pending: {
    icon: {
      color: grey[400],
      type: Timelapse
    },
    label: {
      text: "Pending"
    }
  },
  cancelled: {
    icon: {
      color: grey[500],
      type: Block
    },
    label: {
      text: "Cancelled"
    }
  },
  completed: {
    icon: {
      color: green[800],
      type: CheckCircle
    },
    label: {
      text: "Completed"
    }
  },
  failed: {
    icon: {
      color: red[700],
      type: Cancel
    },
    label: {
      text: "Failed"
    }
  },
  "not-ready": {
    icon: {
      color: amber[800],
      type: Warning
    },
    label: {
      text: "Not Ready"
    }
  },
  ready: {
    icon: {
      color: teal[500],
      type: Task
    },
    label: {
      text: "Ready"
    }
  },
  running: {
    icon: {
      color: indigo[400],
      type: ChangeCircle
    },
    label: {
      text: "Running"
    }
  },
  submitted: {
    icon: {
      color: amber[800],
      type: AccessTimeFilled
    },
    label: {
      text: "Submitted"
    }
  }
} as const;

export default statuses;

export const statusTypes = Object.keys(statuses) as Array<
  keyof typeof statuses
>;
