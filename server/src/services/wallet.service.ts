export interface WalletMethod {
  name: string;
  type: 'MetaMask' | 'WalletConnect';
  description: string;
  connectionFlow: string[];
  securityFeatures: string[];
  pros: string[];
  cons: string[];
}

const WALLET_METHODS: WalletMethod[] = [
  {
    name: 'MetaMask',
    type: 'MetaMask',
    description:
      'A popular "injected" wallet that injects a JavaScript object (window.ethereum) into a web page, allowing the dApp to directly request the wallet to perform actions.',
    connectionFlow: [
      'User installs MetaMask browser extension',
      'dApp calls ethereum.request({ method: "eth_requestAccounts" })',
      'MetaMask pops up asking user for permission',
      'User approves — dApp receives public address',
      'dApp can now request signatures or transaction approvals',
    ],
    securityFeatures: [
      'EIP-712 human-readable transaction display',
      'Hardware wallet support (Ledger, Trezor)',
      'Token approval management',
      'Phishing detection',
    ],
    pros: [
      'Direct browser integration',
      'Wide developer tooling (web3-react, InjectedConnector)',
      'Large user base',
      'Simple integration API',
    ],
    cons: [
      'Hot wallet in browser (less secure)',
      'Desktop/browser only',
      'Single wallet dependency',
    ],
  },
  {
    name: 'WalletConnect',
    type: 'WalletConnect',
    description:
      'An open-source protocol that creates a secure, encrypted link between a dApp and a mobile wallet via a relay server.',
    connectionFlow: [
      'User clicks "Connect Wallet" and selects WalletConnect',
      'QR code is displayed on screen',
      'User opens mobile wallet and scans QR code',
      'Secure peer-to-peer connection established via relay server',
      'Mobile wallet shows connection request — user approves',
      'All future requests are sent to mobile wallet for confirmation',
    ],
    securityFeatures: [
      'Private keys never leave mobile wallet',
      'Signing happens in separate, controlled environment',
      'Encrypted relay communication',
      'Hardware wallet compatibility',
    ],
    pros: [
      'More secure (keys stay on mobile)',
      'Supports many wallets (Trust, Rainbow, etc.)',
      'Cross-platform (desktop dApp + mobile wallet)',
      'Open-source protocol',
    ],
    cons: [
      'Requires mobile wallet app',
      'QR code scanning step',
      'Relay server dependency',
    ],
  },
];

export function getAllWalletMethods(): WalletMethod[] {
  return WALLET_METHODS;
}

export function getWalletMethod(type: string): WalletMethod | undefined {
  return WALLET_METHODS.find(
    (w) => w.type.toLowerCase() === type.toLowerCase()
  );
}

export function getSecurityBestPractices(): { title: string; description: string }[] {
  return [
    {
      title: 'Revoke Approvals',
      description:
        'Many attacks happen due to malicious approve() functions. Use tools like Revoke.cash to review and cancel token allowances granted to dApps.',
    },
    {
      title: 'Verify Transactions',
      description:
        'Use standards like EIP-712 to display transaction details in a human-readable format, helping avoid signing malicious payloads.',
    },
    {
      title: 'Use Hardware Wallets',
      description:
        'For high-value assets, use hardware wallets (Ledger, Trezor) where the private key is stored on an offline device for highest security.',
    },
    {
      title: 'Check Contract Addresses',
      description:
        'Always verify the smart contract address before interacting. Use block explorers to confirm legitimacy.',
    },
  ];
}
