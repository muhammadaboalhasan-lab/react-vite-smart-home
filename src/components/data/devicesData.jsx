export const devicesData = [
  {
    id: 1,
    name: "Lighting",
    defaultColor: "blue",
    emoji: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 3-2 5-3 7H8c-1-2-3-4-3-7a7 7 0 0 1 7-7z"></path>
      </svg>
    ),
    action : "YELLOW",
    featur : "LED"

  },
  {
    id: 2,
    name: "AC",
    defaultColor: "blue",
    emoji: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
      </svg>
    ),
    action : "22°",
    featur : "Cold"
  },
  {
    id: 3,
    name: "TV",
    defaultColor: "purple",
    emoji: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="4" width="20" height="14" rx="2"></rect>
        <path d="M8 21h8M12 18v3"></path>
      </svg>
    ),
    action : "Kung Fu Panda",
    featur : "Movie"
  },
  {
    id: 4,
    name: "Smart Lock",
    defaultColor: "green",
    emoji: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="11" width="18" height="11" rx="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
    action : "On",
    featur : "Closed"
  },
  {
    id: 5,
    name: "Camera",
    defaultColor: "red",
    emoji: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M23 7l-7 5 7 5V7zM1 5h15v14H1z"></path>
      </svg>
    ),
    action : "Live",
    featur : "Steaming"
  },
  {
    id: 6,
    name: "Speaker",
    defaultColor: "purple",
    emoji: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      </svg>
    ),
    action : "On The Floor",
    featur : "Music"
  },
  {
    id: 7,
    name: "Curtains",
    defaultColor: "blue",
    emoji: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2"></rect>
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18"></path>
      </svg>
    ),
    action : "On",
    featur : "closed"
  },
  {
    id: 8,
    name: "Robot",
    defaultColor: "orange",
    emoji: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
    action : "Smiles",
    featur : "Fun"
  },
  {
    id: 9,
    name: "Smart Plug",
    defaultColor: "yellow",
    emoji: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    ),
    action : "Active",
    featur : "on"
  },
  {
    id: 10,
    name: "Sensor",
    defaultColor: "blue",
    emoji: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="6" x2="12" y2="12"></line>
        <line x1="12" y1="12" x2="16" y2="14"></line>
      </svg>
    ),
    action : "On",
    featur : "Detection"
  },
  {
    id: 11,
    name: "Fan",
    defaultColor: "green",
    emoji: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3"></path>
      </svg>
    ),
    action : "On",
    featur : "Cold"
  },
  {
    id: 12,
    name: "Other",
    defaultColor: "purple",
    emoji: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    ),
    action : "On",
    featur : "Unknow"
  },
];
