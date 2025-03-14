import {
  AccessTimeFilled,
  Block,
  Cancel,
  ChangeCircle,
  CheckCircle,
  Error,
  Task,
  Timelapse,
  Warning
} from "@mui/icons-material";
import { amber, green, grey, indigo, red, teal } from "@mui/material/colors";

/**
 * Single source of truth for status definitions
 * Handles icon, colours and label for each status type
 */
const statuses = {
  aborted: {
    icon: {
      color: grey[500],
      type: Block
    },
    label: {
      text: "Aborted"
    }
  },
  aborting: {
    icon: {
      color: grey[300],
      type: Block
    },
    label: {
      text: "Aborting"
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
  disrupted: {
    icon: {
      color: red[700],
      type: Error
    },
    label: {
      text: "Disrupted"
    }
  },
  errored: {
    icon: {
      color: red[700],
      type: Error
    },
    label: {
      text: "Errored"
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
  "no-metrics": {
    icon: {
      color: grey[400],
      type: Error
    },
    label: {
      text: "No Metrics"
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
  "not-run": {
    icon: {
      color: amber[800],
      type: Warning
    },
    label: {
      text: "Not Run"
    }
  },
  operational: {
    icon: {
      color: green[800],
      type: CheckCircle
    },
    label: {
      text: "Operational"
    }
  },
  passed: {
    icon: {
      color: green[800],
      type: CheckCircle
    },
    label: {
      text: "Passed"
    }
  },
  pending: {
    icon: {
      color: grey[400],
      type: Timelapse
    },
    label: {
      text: "Pending"
    }
  },
  queued: {
    icon: {
      color: amber[900],
      type: AccessTimeFilled
    },
    label: {
      text: "Queued"
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
  }
} as const;

export default statuses;

export const statusTypes = Object.keys(statuses).sort() as Array<
  keyof typeof statuses
>;
