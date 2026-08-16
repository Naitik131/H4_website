export const NETWORK_CONFIG = {
  proxy: {
    host: "netmon.iitb.ac.in",
    port: "80",
    pacUrl: "http://www.cc.iitb.ac.in/ldap.pac",
    description: "Required for web browsing outside institute subnet"
  },
  dns: {
    primary: "10.200.1.11",
    secondary: "10.200.1.12",
    fallback: "1.1.1.1"
  },
  wifi: {
    ssid: "IITB-Wireless",
    security: "WPA2/WPA3 Enterprise (802.1X)",
    eapMethod: "PEAP",
    phase2Auth: "MSCHAPV2",
    caCert: "Do not validate / Trust root",
    identity: "<your_ldap_username>",
    anonymousIdentity: "anonymous@iitb.ac.in"
  },
  gateway: "10.104.X.1 (Varies by Wing/Floor)"
};

export const OS_LAN_GUIDES = [
  {
    id: "windows",
    os: "Windows 11 / 10",
    icon: "Monitor",
    steps: [
      {
        title: "Ethernet Hardware Setup",
        detail: "Plug your RJ-45 LAN cable securely into your room's wall port and PC Ethernet port."
      },
      {
        title: "Configure Automatic DHCP & DNS",
        detail: "Open Settings > Network & Internet > Ethernet. Ensure 'IP assignment' is set to 'Automatic (DHCP)' and DNS is set to 10.200.1.11 / 10.200.1.12."
      },
      {
        title: "Set Institute Proxy",
        detail: "Open Settings > Network & Internet > Proxy. Enable 'Use a proxy server', enter Address: netmon.iitb.ac.in and Port: 80. Or turn on 'Use setup script' and paste: http://www.cc.iitb.ac.in/ldap.pac"
      },
      {
        title: "Authenticate with LDAP",
        detail: "Open any web browser and navigate to internet.iitb.ac.in or campreg.iitb.ac.in. Enter your LDAP username and password to start your session."
      }
    ],
    troubleshooting: "If you get 'Unidentified Network', open Command Prompt as admin and run `ipconfig /release && ipconfig /renew && ipconfig /flushdns`."
  },
  {
    id: "macos",
    os: "macOS (Apple Silicon & Intel)",
    icon: "Laptop",
    steps: [
      {
        title: "Ethernet / Thunderbolt Adapter",
        detail: "Connect your USB-C / Ethernet adapter to the H4 LAN wall port."
      },
      {
        title: "Network Preferences",
        detail: "Go to System Settings > Network > USB/Ethernet Adapter. Select Details > TCP/IP > Configure IPv4: 'Using DHCP'."
      },
      {
        title: "Configure DNS & Proxies",
        detail: "In DNS tab, add 10.200.1.11 and 10.200.1.12. In Proxies tab, check 'Web Proxy (HTTP)' and enter netmon.iitb.ac.in:80, or check 'Auto Proxy URL' with http://www.cc.iitb.ac.in/ldap.pac"
      },
      {
        title: "Browser & CLI Proxy",
        detail: "For Terminal usage, add `export http_proxy=http://netmon.iitb.ac.in:80` and `export https_proxy=http://netmon.iitb.ac.in:80` in your ~/.zshrc."
      }
    ],
    troubleshooting: "If connection drops, toggle the interface off/on in System Settings or run `sudo ifconfig en0 down && sudo ifconfig en0 up`."
  },
  {
    id: "linux",
    os: "Linux (Ubuntu / Fedora / Arch)",
    icon: "Terminal",
    steps: [
      {
        title: "NetworkManager Setup",
        detail: "Check connection with `nmcli device status`. Ethernet interface usually binds automatically via DHCP."
      },
      {
        title: "Environment Variables for Proxy",
        detail: "Add to /etc/environment or ~/.bashrc:\nexport http_proxy=\"http://netmon.iitb.ac.in:80/\"\nexport https_proxy=\"http://netmon.iitb.ac.in:80/\"\nexport no_proxy=\"localhost,127.0.0.1,*.iitb.ac.in\""
      },
      {
        title: "APT / DNF Package Manager Proxy",
        detail: "For APT, create /etc/apt/apt.conf.d/proxy.conf with:\nAcquire::http::Proxy \"http://netmon.iitb.ac.in:80/\";\nAcquire::https::Proxy \"http://netmon.iitb.ac.in:80/\";"
      },
      {
        title: "LDAP Autologin Daemon (Python / Bash)",
        detail: "Use the H4 student open-source LDAP auto-login script or `curl -d 'uname=LDAP_USER&passwd=PASSWORD' https://internet.iitb.ac.in/`"
      }
    ],
    troubleshooting: "Use `dig @10.200.1.11 google.com` or `curl -I -x http://netmon.iitb.ac.in:80 https://www.google.com` to test connectivity."
  },
  {
    id: "mobile",
    os: "Android & iOS Wi-Fi (IITB-Wireless)",
    icon: "Smartphone",
    steps: [
      {
        title: "Connect to 'IITB-Wireless'",
        detail: "Select IITB-Wireless in Wi-Fi settings."
      },
      {
        title: "EAP Settings for Android",
        detail: "EAP Method: PEAP | Phase 2 Authentication: MSCHAPV2 | CA Certificate: 'Don't validate' or 'Trust system certs' | Identity: Your LDAP username | Password: Your LDAP password."
      },
      {
        title: "iOS Configuration",
        detail: "Enter your LDAP username & password, then tap 'Trust' for the IITB network security certificate."
      },
      {
        title: "Mobile Proxy Settings",
        detail: "In Wi-Fi network settings, set HTTP Proxy to Manual: Host: netmon.iitb.ac.in, Port: 80 (or Auto PAC: http://www.cc.iitb.ac.in/ldap.pac)."
      }
    ],
    troubleshooting: "Forget the network and reconnect if authentication fails after an LDAP password update."
  }
];

export const HOSTEL_RULES_DATA = [
  {
    category: "General Discipline",
    items: [
      "Residents must always carry their Institute ID card when entering the hostel premises.",
      "Quiet hours are strictly observed between 12:00 Midnight and 06:00 AM in all corridors and common study zones.",
      "Defacing walls, doors, or hostel infrastructure with graffiti or vandalism is strictly punishable as per Disciplinary Committee bylaws."
    ]
  },
  {
    category: "Guest & Visitor Policy",
    items: [
      "Non-resident guests (students/parents) must be registered in the Security Logbook at the main gate.",
      "Overnight stay of guests requires prior written permission from the Warden / Hall Manager with requisite guest charges.",
      "Visiting hours for non-hostelites are strictly between 08:00 AM and 10:00 PM."
    ]
  },
  {
    category: "Electrical Appliances & Safety",
    items: [
      "High wattage heating appliances (immersion rods, induction stoves, electric heaters) are strictly forbidden in resident rooms due to fire safety codes.",
      "Ensure all fans, lights, and laptop chargers are turned off when vacating rooms to save energy.",
      "Tampering with corridor emergency lights, fire extinguishers, or LAN distribution boxes will attract heavy penalties."
    ]
  },
  {
    category: "Mess & Dining Etiquette",
    items: [
      "Entry to Dr. Pramod Chaudhari Mess is through biometric/RFID scan or ID verification.",
      "Taking utensils, plates, spoons, or glassware outside the mess premises is strictly banned.",
      "Sick meal trays can be issued only upon submitting a written doctor slip to the Mess Manager desk."
    ]
  }
];
