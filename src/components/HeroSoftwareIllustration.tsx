import './HeroSoftwareIllustration.css';

/**
 * SettingsGear: Precision isometric cogwheel with slow, elegant rotation.
 */
function SettingsGear() {
  const gearPath =
    'M 114.0,205.0 L 122.4,210.7 L 120.5,216.1 L 110.0,216.7 L 107.0,219.9 ' +
    'L 108.3,229.1 L 102.6,231.8 L 94.7,225.7 L 90.0,226.1 L 83.6,233.5 ' +
    'L 77.4,231.8 L 76.7,222.6 L 73.0,219.9 L 62.6,221.1 L 59.5,216.1 ' +
    'L 66.5,209.1 L 66.0,205.0 L 57.6,199.3 L 59.5,193.9 L 70.0,193.3 ' +
    'L 73.0,190.1 L 71.7,180.9 L 77.4,178.2 L 85.3,184.3 L 90.0,183.9 ' +
    'L 96.4,176.5 L 102.6,178.2 L 103.3,187.4 L 107.0,190.1 L 117.4,188.9 ' +
    'L 120.5,193.9 L 113.5,200.9 Z';

  return (
    <g className="hero-illustration__gear-group">
      {/* Vertical support column & floor ring */}
      <line x1="90" y1="240" x2="90" y2="305" stroke="#D9DCDA" strokeWidth="1.5" />
      <ellipse cx="90" cy="305" rx="14" ry="6" fill="#E8EBE9" stroke="#6F7475" strokeWidth="1" />

      {/* Rotating gear body */}
      <g className="hero-illustration__gear">
        <path
          d={gearPath}
          fill="#DDE1DF"
          stroke="#25282A"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        {/* Gear center hub cutout */}
        <ellipse cx="90" cy="205" rx="11" ry="9.5" fill="#F5F6F5" stroke="#25282A" strokeWidth="1.25" />
        <ellipse cx="90" cy="205" rx="4" ry="3.5" fill="#25282A" />
      </g>
    </g>
  );
}

/**
 * DashboardPanel: The large isometric software terminal featuring code editor,
 * metric bar charts, polar/radar technical diagram, and system status metrics.
 */
function DashboardPanel() {
  return (
    <g className="hero-illustration__dashboard">
      {/* ─── Monitor Stand & Ground Base ─── */}
      <g className="hero-illustration__stand">
        {/* Isometric base on floor */}
        <polygon points="210,395 280,380 320,395 250,410" fill="#25282A" />
        <polygon points="210,395 250,410 250,415 210,400" fill="#1C1E20" />
        <polygon points="250,410 320,395 320,400 250,415" fill="#3A3E40" />

        {/* Curved metal neck supporting monitor */}
        <path
          d="M 265,395 C 265,360 290,340 310,315"
          stroke="#25282A"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 267,395 C 267,362 291,342 310,317"
          stroke="#6F7475"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* ─── 3D Monitor Bezel & Frame ─── */}
      {/* Top 3D extrusion */}
      <polygon
        points="180,50 192,45 462,150 450,155"
        fill="#DDE1DF"
        stroke="#25282A"
        strokeWidth="1"
      />
      {/* Right 3D extrusion */}
      <polygon
        points="450,155 462,150 462,345 450,350"
        fill="#25282A"
        stroke="#25282A"
        strokeWidth="1"
      />
      {/* Front bezel face */}
      <polygon
        points="180,50 450,155 450,350 180,245"
        fill="#25282A"
        stroke="#25282A"
        strokeWidth="1.5"
      />

      {/* Inner display surface (high-contrast cool off-white canvas) */}
      <polygon
        points="188,62 442,161 442,341 188,242"
        fill="#FFFFFF"
        stroke="#D9DCDA"
        strokeWidth="1"
      />

      {/* ─── Top Window Bar (Navigation Strip & Traffic Controls) ─── */}
      <polygon points="188,62 442,161 442,186 188,87" fill="#F5F6F5" />
      <line x1="188" y1="87" x2="442" y2="186" stroke="#D9DCDA" strokeWidth="1" />

      {/* Window traffic controls */}
      <circle cx="204" cy="74" r="3" fill="#25282A" />
      <circle cx="214" cy="78" r="3" fill="#6F7475" />
      <circle cx="224" cy="82" r="3" fill="#D9DCDA" />

      {/* Search / URL placeholder bar */}
      <polygon points="245,86 350,127 350,135 245,94" fill="#E8EBE9" />

      {/* Right-side user profile badge icon */}
      <circle cx="425" cy="168" r="4" fill="#DDE1DF" stroke="#25282A" strokeWidth="0.75" />

      {/* ─── Pane 1: Upper Left — Code Editor / System Architecture ─── */}
      <polygon
        points="201,99 320,146 320,211 201,164"
        fill="#F5F6F5"
        stroke="#E8EBE9"
        strokeWidth="1"
      />
      {/* Tab bar header */}
      <polygon points="201,99 240,114 240,122 201,107" fill="#E8EBE9" />
      <line x1="207" y1="109" x2="225" y2="116" stroke="#6F7475" strokeWidth="2" strokeLinecap="round" />

      {/* Indented syntax code lines */}
      <line x1="212" y1="120" x2="265" y2="141" stroke="#25282A" strokeWidth="3" strokeLinecap="round" />
      <line x1="222" y1="130" x2="285" y2="155" stroke="#6F7475" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="222" y1="140" x2="255" y2="153" stroke="#DDE1DF" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="222" y1="150" x2="305" y2="182" stroke="#25282A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="232" y1="160" x2="275" y2="177" stroke="#6F7475" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="212" y1="170" x2="245" y2="183" stroke="#25282A" strokeWidth="3" strokeLinecap="round" />

      {/* ─── Pane 2: Lower Left — Triple Metric Bar Charts ─── */}
      <polygon
        points="201,171 320,218 320,283 201,236"
        fill="#FFFFFF"
        stroke="#D9DCDA"
        strokeWidth="1"
      />
      {/* Baseline & horizontal grid guides */}
      <line x1="208" y1="230" x2="312" y2="271" stroke="#D9DCDA" strokeWidth="1" />
      <line x1="208" y1="210" x2="312" y2="251" stroke="#E8EBE9" strokeWidth="0.75" strokeDasharray="2 2" />
      <line x1="208" y1="190" x2="312" y2="231" stroke="#E8EBE9" strokeWidth="0.75" strokeDasharray="2 2" />

      {/* Group A bars */}
      <polygon points="220,210 226,212 226,236 220,234" fill="#25282A" />
      <polygon points="229,202 235,204 235,240 229,238" fill="#6F7475" />
      <polygon points="238,223 244,225 244,243 238,241" fill="#DDE1DF" />

      {/* Group B bars */}
      <polygon points="258,219 264,221 264,251 258,249" fill="#25282A" />
      <polygon points="267,211 273,213 273,255 267,253" fill="#6F7475" />
      <polygon points="276,234 282,236 282,258 276,256" fill="#DDE1DF" />

      {/* Group C bars */}
      <polygon points="294,225 300,227 300,265 294,263" fill="#25282A" />
      <polygon points="303,241 309,243 309,269 303,267" fill="#6F7475" />

      {/* ─── Pane 3: Upper Right — Polar / Radar Architecture Widget ─── */}
      <polygon
        points="330,150 429,189 429,257 330,218"
        fill="#F5F6F5"
        stroke="#D9DCDA"
        strokeWidth="1"
      />
      {/* Concentric radar rings */}
      <ellipse cx="380" cy="203" rx="38" ry="18" fill="none" stroke="#D9DCDA" strokeWidth="0.75" strokeDasharray="3 3" />
      <ellipse cx="380" cy="203" rx="22" ry="10" fill="none" stroke="#D9DCDA" strokeWidth="0.75" />

      {/* Radar crosshairs */}
      <line x1="342" y1="203" x2="418" y2="203" stroke="#D9DCDA" strokeWidth="0.75" />
      <line x1="380" y1="185" x2="380" y2="221" stroke="#D9DCDA" strokeWidth="0.75" />
      <line x1="355" y1="192" x2="405" y2="214" stroke="#D9DCDA" strokeWidth="0.75" />

      {/* Faceted Radar Polygon (Technical System Metric) */}
      <polygon
        points="380,188 406,197 398,213 372,216 358,204 366,193"
        fill="#25282A"
        fillOpacity="0.85"
        stroke="#25282A"
        strokeWidth="1.25"
      />
      {/* Radar node vertices */}
      <circle cx="380" cy="188" r="2.5" fill="#FFFFFF" stroke="#25282A" strokeWidth="1" />
      <circle cx="406" cy="197" r="2.5" fill="#FFFFFF" stroke="#25282A" strokeWidth="1" />
      <circle cx="398" cy="213" r="2.5" fill="#FFFFFF" stroke="#25282A" strokeWidth="1" />
      <circle cx="372" cy="216" r="2.5" fill="#FFFFFF" stroke="#25282A" strokeWidth="1" />
      <circle cx="358" cy="204" r="2.5" fill="#FFFFFF" stroke="#25282A" strokeWidth="1" />
      <circle cx="366" cy="193" r="2.5" fill="#FFFFFF" stroke="#25282A" strokeWidth="1" />

      {/* ─── Pane 4: Lower Right — System Status & Performance ─── */}
      <polygon
        points="330,225 429,264 429,325 330,287"
        fill="#FFFFFF"
        stroke="#D9DCDA"
        strokeWidth="1"
      />
      {/* Progress Bar 1 */}
      <line x1="342" y1="245" x2="375" y2="258" stroke="#6F7475" strokeWidth="2" strokeLinecap="round" />
      <line x1="342" y1="256" x2="415" y2="284" stroke="#E8EBE9" strokeWidth="4" strokeLinecap="round" />
      <line x1="342" y1="256" x2="395" y2="276" stroke="#25282A" strokeWidth="4" strokeLinecap="round" />

      {/* Progress Bar 2 */}
      <line x1="342" y1="272" x2="385" y2="289" stroke="#6F7475" strokeWidth="2" strokeLinecap="round" />
      <line x1="342" y1="283" x2="415" y2="311" stroke="#E8EBE9" strokeWidth="4" strokeLinecap="round" />
      <line x1="342" y1="283" x2="402" y2="306" stroke="#6F7475" strokeWidth="4" strokeLinecap="round" />

      {/* Status indicator row */}
      <circle cx="347" cy="299" r="4" fill="#25282A" />
      <line x1="358" y1="303" x2="395" y2="317" stroke="#25282A" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/**
 * FloatingInterfaceCard: The translucent, layered secondary panel hovering in front-left.
 * Features subtle vertical float animation.
 */
function FloatingInterfaceCard() {
  return (
    <g className="hero-illustration__floating-panel">
      {/* Soft isometric drop shadow */}
      <polygon
        points="115,310 210,346 195,358 100,322"
        fill="#25282A"
        opacity="0.08"
      />

      {/* Floating panel background */}
      <polygon
        points="110,110 205,147 205,305 110,268"
        fill="#FFFFFF"
        fillOpacity="0.96"
        stroke="#25282A"
        strokeWidth="1.25"
      />

      {/* Top header tab */}
      <polygon points="110,110 155,127 155,140 110,123" fill="#25282A" />
      <line x1="116" y1="120" x2="145" y2="131" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

      {/* Content wireframe text lines */}
      <line x1="122" y1="145" x2="185" y2="169" stroke="#25282A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="122" y1="158" x2="165" y2="175" stroke="#6F7475" strokeWidth="2" strokeLinecap="round" />
      <line x1="122" y1="171" x2="195" y2="199" stroke="#6F7475" strokeWidth="2" strokeLinecap="round" />
      <line x1="122" y1="184" x2="155" y2="197" stroke="#DDE1DF" strokeWidth="2" strokeLinecap="round" />
      <line x1="122" y1="197" x2="175" y2="218" stroke="#25282A" strokeWidth="2" strokeLinecap="round" />
      <line x1="122" y1="210" x2="190" y2="236" stroke="#6F7475" strokeWidth="2" strokeLinecap="round" />
      <line x1="122" y1="223" x2="160" y2="238" stroke="#DDE1DF" strokeWidth="2" strokeLinecap="round" />

      {/* Bottom status badge widget */}
      <polygon points="122,238 185,262 185,282 122,258" fill="#F5F6F5" stroke="#D9DCDA" strokeWidth="1" />
      <circle cx="134" cy="254" r="3" fill="#25282A" />
      <line x1="144" y1="258" x2="172" y2="269" stroke="#6F7475" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/**
 * MiniAnalyticsPanel: The compact floating analytics card hovering off the right edge.
 */
function MiniAnalyticsPanel() {
  return (
    <g className="hero-illustration__mini-panel">
      {/* Drop shadow */}
      <polygon
        points="440,325 510,352 498,362 428,335"
        fill="#25282A"
        opacity="0.06"
      />

      {/* Card body */}
      <polygon
        points="435,260 505,287 505,348 435,321"
        fill="#FFFFFF"
        fillOpacity="0.96"
        stroke="#25282A"
        strokeWidth="1.25"
      />

      {/* Header status dot & metric title */}
      <circle cx="447" cy="274" r="3" fill="#25282A" />
      <line x1="455" y1="277" x2="485" y2="288" stroke="#6F7475" strokeWidth="2" strokeLinecap="round" />

      {/* Sparkline polyline */}
      <polyline
        points="445,302 460,296 475,300 492,286"
        fill="none"
        stroke="#25282A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="445" cy="302" r="1.5" fill="#25282A" />
      <circle cx="460" cy="296" r="1.5" fill="#25282A" />
      <circle cx="475" cy="300" r="1.5" fill="#25282A" />
      <circle cx="492" cy="286" r="2" fill="#25282A" />

      {/* Micro metric bars */}
      <polygon points="450,307 455,309 455,317 450,315" fill="#6F7475" />
      <polygon points="463,312 468,314 468,322 463,320" fill="#25282A" />
      <polygon points="476,317 481,319 481,327 476,325" fill="#DDE1DF" />

      {/* Dashed connector line */}
      <path d="M 435,290 L 415,282" stroke="#6F7475" strokeWidth="1" strokeDasharray="3 3" />
    </g>
  );
}

/**
 * SecurityDataCard: Isometric security folder, stacked documentation, and 3D data cubes.
 */
function SecurityDataCard() {
  return (
    <g className="hero-illustration__security">
      {/* ─── Security Lock Folder ─── */}
      {/* Back folder flap */}
      <polygon
        points="275,354 335,377 335,425 275,402"
        fill="#E8EBE9"
        stroke="#25282A"
        strokeWidth="1.25"
      />
      {/* Top folder tab */}
      <polygon points="275,348 298,357 298,363 275,354" fill="#25282A" />
      {/* Front pocket */}
      <polygon
        points="275,370 335,393 335,430 275,407"
        fill="#FFFFFF"
        stroke="#25282A"
        strokeWidth="1.25"
      />
      {/* Security padlock emblem */}
      <polygon points="300,396 312,401 312,412 300,407" fill="#25282A" />
      <path
        d="M 303,397 C 303,391 309,393 309,399"
        fill="none"
        stroke="#6F7475"
        strokeWidth="1.75"
      />

      {/* ─── Stacked Isometric Documentation Sheets ─── */}
      <polygon points="215,444 250,430 270,438 235,452" fill="#DDE1DF" stroke="#25282A" strokeWidth="0.75" />
      <polygon points="215,440 250,426 270,434 235,448" fill="#E8EBE9" stroke="#25282A" strokeWidth="0.75" />
      <polygon points="215,435 250,421 270,429 235,443" fill="#FFFFFF" stroke="#25282A" strokeWidth="1" />
      {/* Wireframe text lines on top sheet */}
      <line x1="223" y1="435" x2="245" y2="426" stroke="#25282A" strokeWidth="1.5" />
      <line x1="227" y1="440" x2="255" y2="429" stroke="#6F7475" strokeWidth="1.5" />
      <line x1="231" y1="445" x2="250" y2="437" stroke="#DDE1DF" strokeWidth="1.5" />

      {/* ─── 3D Isometric Data Cubes ─── */}
      {/* Cube 1 */}
      <g className="hero-illustration__cube-1">
        <polygon points="180,335 192,330 204,335 192,340" fill="#E8EBE9" stroke="#25282A" strokeWidth="1" />
        <polygon points="180,335 192,340 192,354 180,349" fill="#DDE1DF" stroke="#25282A" strokeWidth="1" />
        <polygon points="192,340 204,335 204,349 192,354" fill="#25282A" stroke="#25282A" strokeWidth="1" />
      </g>
      {/* Cube 2 */}
      <g className="hero-illustration__cube-2">
        <polygon points="198,390 208,386 218,390 208,394" fill="#E8EBE9" stroke="#25282A" strokeWidth="1" />
        <polygon points="198,390 208,394 208,406 198,402" fill="#DDE1DF" stroke="#25282A" strokeWidth="1" />
        <polygon points="208,394 218,390 218,402 208,406" fill="#25282A" stroke="#25282A" strokeWidth="1" />
      </g>
    </g>
  );
}

/**
 * ConnectionLines: Floor plane isometric grid, engineer workstation, and pulsing junction nodes.
 */
function ConnectionLines() {
  return (
    <g className="hero-illustration__connections">
      {/* Ambient floor wash */}
      <ellipse cx="270" cy="425" rx="230" ry="85" fill="#E8EBE9" fillOpacity="0.45" />

      {/* Isometric alignment guides */}
      <line x1="50" y1="360" x2="330" y2="470" stroke="#D9DCDA" strokeWidth="0.75" strokeDasharray="4 4" />
      <line x1="160" y1="480" x2="490" y2="350" stroke="#D9DCDA" strokeWidth="0.75" strokeDasharray="4 4" />
      <line x1="120" y1="280" x2="420" y2="400" stroke="#E8EBE9" strokeWidth="0.75" strokeDasharray="3 3" />

      {/* Floating Engineer Workstation (Bottom Left) */}
      <polygon points="110,365 155,382 145,392 100,375" fill="#FFFFFF" stroke="#25282A" strokeWidth="1" />
      {/* Stylized geometric engineer figure & laptop */}
      <circle cx="130" cy="353" r="5" fill="#6F7475" />
      <path d="M 125,360 L 135,364 L 132,380 L 122,376 Z" fill="#25282A" />
      <polygon points="138,362 148,366 147,372 137,368" fill="#25282A" />
      <polygon points="144,354 148,366 142,367 138,355" fill="#6F7475" />

      {/* Flexible routing cable connecting station to dashboard */}
      <path
        d="M 148,370 C 175,395 210,385 245,365 L 270,350"
        fill="none"
        stroke="#25282A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Animated Breathing Pulse Nodes */}
      <g className="hero-illustration__pulse-node">
        <circle cx="185" cy="383" r="4.5" fill="#25282A" />
        <circle cx="185" cy="383" r="2" fill="#FFFFFF" />
      </g>
      <g className="hero-illustration__pulse-node hero-illustration__pulse-node--delay">
        <circle cx="245" cy="365" r="4.5" fill="#25282A" />
        <circle cx="245" cy="365" r="2" fill="#FFFFFF" />
      </g>

      {/* Technical coordinate labels */}
      <text x="40" y="475" fill="#6F7475" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="500">
        SYS // 0x48
      </text>
      <text x="440" y="115" fill="#6F7475" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="500">
        CORE // V2
      </text>
    </g>
  );
}

/**
 * HeroSoftwareIllustration: Coded isometric software-engineering illustration
 * matching the Evostackr cool-white and graphite design system.
 */
export function HeroSoftwareIllustration() {
  return (
    <svg
      className="hero-illustration hero__graphic"
      viewBox="0 0 520 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Evostackr software engineering workspace illustration"
    >
      <ConnectionLines />
      <DashboardPanel />
      <SettingsGear />
      <FloatingInterfaceCard />
      <MiniAnalyticsPanel />
      <SecurityDataCard />
    </svg>
  );
}
export default HeroSoftwareIllustration;
