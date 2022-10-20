import {
  AccessTime,
  Block,
  Cached,
  Close,
  Done,
  InsertDriveFileOutlined,
  WarningAmber
} from "@mui/icons-material";
import { amber, green, grey, indigo, red, teal } from "@mui/material/colors";

/**
 * Single source of truth for status definitons
 */
const statuses = {
  cancelled: {
    icon: {
      color: grey[500],
      type: Block
    },
    label: {
      color: grey[500],
      text: "Cancelled"
    }
  },
  completed: {
    icon: {
      color: green[800],
      type: Done
    },
    label: {
      color: green[800],
      text: "Completed"
    }
  },
  failed: {
    icon: {
      color: red[700],
      type: Close
    },
    label: {
      color: red[700],
      text: "Failed"
    }
  },
  "not-ready": {
    icon: {
      color: amber[800],
      type: WarningAmber
    },
    label: {
      color: amber[800],
      text: "Not Ready"
    }
  },
  ready: {
    icon: {
      color: teal[500],
      type: InsertDriveFileOutlined
    },
    label: {
      color: teal[500],
      text: "Ready"
    }
  },
  running: {
    icon: {
      color: indigo[400],
      type: Cached
    },
    label: {
      color: indigo[500],
      text: "Running"
    }
  },
  submitted: {
    icon: {
      color: amber[400],
      type: AccessTime
    },
    label: {
      color: amber[500],
      text: "Submitted"
    }
  }
};

export default statuses;

export const statusTypes = Object.keys(statuses);
