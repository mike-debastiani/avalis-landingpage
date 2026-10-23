// Echtes Logo-Symbol aus Figma (Avalis-Landingpage, Node 10067:2052):
// drei überlappende Formen, je ein Gradient in den drei Rollenfarben.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M25.56 0V4.48979H11.8727C7.95153 4.48979 4.77291 7.66959 4.77291 11.5922V26.99H0V7.10246C0 3.1798 3.17861 0 7.09981 0H25.56Z"
        fill="url(#avalis-logo-blue)"
      />
      <path
        d="M36 8.93V35.92H10.44V16.0329C10.44 12.1104 13.6185 8.93067 17.5396 8.93067H35.9993L36 8.93Z"
        fill="url(#avalis-logo-green)"
      />
      <path
        d="M30.33 4.49V8.93253H17.529C13.6078 8.93253 10.4292 12.1123 10.4292 16.035V31.48H4.77V11.5925C4.77 7.6698 7.94862 4.49 11.8698 4.49H30.33Z"
        fill="url(#avalis-logo-purple)"
      />
      <defs>
        <linearGradient id="avalis-logo-blue" x1="12.78" y1="26.99" x2="12.78" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2662EA" />
          <stop offset="1" stopColor="#BFDBFE" />
        </linearGradient>
        <linearGradient id="avalis-logo-green" x1="23.22" y1="8.93" x2="23.22" y2="35.92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DCFCE9" />
          <stop offset="1" stopColor="#86EFB0" />
        </linearGradient>
        <linearGradient id="avalis-logo-purple" x1="17.55" y1="31.48" x2="17.55" y2="4.49" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B68BFA" />
          <stop offset="1" stopColor="#F8F3FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
