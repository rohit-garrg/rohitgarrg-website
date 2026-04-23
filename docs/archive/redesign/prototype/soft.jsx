/* global React */
const { useState: useStateA } = React;

/* Lead image component — inline SVG illustrations per post cover key.
   Periwinkle / sage / butter, organic blobs + one glyph. */
function SoftCover({ k, className='', tall=false }){
  const common = {
    width:'100%', height:'100%',
    viewBox: tall ? '0 0 400 500' : '0 0 500 360',
    preserveAspectRatio:'xMidYMid slice',
    style:{display:'block'}
  };
  const covers = {
    'ai-coworker': (
      <svg {...common} xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="oklch(0.94 0.03 270)"/>
        <ellipse cx="120" cy="200" rx="140" ry="120" fill="oklch(0.68 0.13 270)" opacity=".55"/>
        <ellipse cx="360" cy="260" rx="160" ry="130" fill="oklch(0.78 0.08 160)" opacity=".55"/>
        <g stroke="oklch(0.22 0.02 250)" strokeWidth="1.6" fill="none">
          <circle cx="170" cy="160" r="32"/>
          <circle cx="300" cy="190" r="32" strokeDasharray="3 4"/>
          <path d="M202 160 H268"/>
          <path d="M170 192 V260"/>
          <path d="M300 222 V260"/>
          <rect x="140" y="260" width="200" height="50" rx="10"/>
        </g>
        <circle cx="170" cy="160" r="5" fill="oklch(0.22 0.02 250)"/>
        <circle cx="300" cy="190" r="5" fill="oklch(0.62 0.18 25)"/>
      </svg>
    ),
    'books': (
      <svg {...common} xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="oklch(0.95 0.02 165)"/>
        <ellipse cx="360" cy="80" rx="180" ry="90" fill="oklch(0.92 0.06 90)" opacity=".7"/>
        <g>
          {[0,1,2,3,4,5].map(i => (
            <rect key={i} x={90+i*42} y={160+(i%2)*10} width="34" height={150-(i%3)*14} rx="2"
              fill={['oklch(0.68 0.13 270)','oklch(0.78 0.08 160)','oklch(0.92 0.06 90)','oklch(0.22 0.02 250)','oklch(0.68 0.13 270)','oklch(0.78 0.08 160)'][i]}/>
          ))}
          <g stroke="oklch(0.22 0.02 250)" strokeWidth="1.4" fill="none" opacity=".4">
            {[0,1,2,3,4,5].map(i => (
              <line key={i} x1={98+i*42} y1={190+(i%2)*10} x2={116+i*42} y2={190+(i%2)*10}/>
            ))}
          </g>
        </g>
      </svg>
    ),
    'intuition': (
      <svg {...common} xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="oklch(0.96 0.008 250)"/>
        <g stroke="oklch(0.88 0.01 250)" strokeWidth="1">
          {[0,1,2,3,4,5,6,7].map(i => <line key={'h'+i} x1="0" y1={45*i+20} x2="500" y2={45*i+20}/>)}
        </g>
        <path d="M20 280 Q 120 240, 180 200 T 340 120 T 480 60"
          stroke="oklch(0.45 0.15 270)" strokeWidth="3" fill="none"/>
        <path d="M20 280 Q 120 240, 180 200 T 340 120 T 480 60 L 480 340 L 20 340 Z"
          fill="oklch(0.68 0.13 270)" opacity=".15"/>
        {[[20,280],[180,200],[340,120],[480,60]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="7" fill="oklch(0.68 0.13 270)" stroke="oklch(0.985 0.005 245)" strokeWidth="2"/>
        ))}
        <circle cx="340" cy="120" r="16" fill="none" stroke="oklch(0.62 0.18 25)" strokeWidth="2" strokeDasharray="3 4"/>
      </svg>
    ),
    'planetia': (
      <svg {...common} xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="oklch(0.22 0.02 250)"/>
        <g fill="oklch(0.985 0.005 245)" opacity=".7">
          {Array.from({length:60}).map((_,i) => (
            <circle key={i} cx={(i*73)%500} cy={(i*41)%360} r={(i%5===0)?1.8:0.8}/>
          ))}
        </g>
        <circle cx="120" cy="180" r="60" fill="oklch(0.92 0.06 90)"/>
        <circle cx="260" cy="180" r="18" fill="oklch(0.68 0.13 270)"/>
        <circle cx="320" cy="180" r="28" fill="oklch(0.78 0.08 160)"/>
        <ellipse cx="320" cy="180" rx="44" ry="6" fill="none" stroke="oklch(0.78 0.08 160)" strokeWidth="1.4"/>
        <circle cx="410" cy="180" r="14" fill="oklch(0.70 0.12 15)"/>
        <circle cx="460" cy="180" r="10" fill="oklch(0.68 0.13 270)"/>
        <g stroke="oklch(0.985 0.005 245)" strokeWidth="1" strokeDasharray="2 4" opacity=".4">
          <ellipse cx="120" cy="180" rx="140" ry="40" fill="none"/>
          <ellipse cx="120" cy="180" rx="200" ry="52" fill="none"/>
          <ellipse cx="120" cy="180" rx="260" ry="64" fill="none"/>
          <ellipse cx="120" cy="180" rx="320" ry="78" fill="none"/>
        </g>
      </svg>
    ),
    'unaccountability': (
      <svg {...common} xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="oklch(0.96 0.008 250)"/>
        <rect x="130" y="50" width="240" height="270" rx="4" fill="oklch(0.22 0.02 250)"/>
        <rect x="135" y="55" width="230" height="260" rx="3" fill="oklch(0.985 0.005 245)"/>
        <g fill="oklch(0.22 0.02 250)">
          <rect x="160" y="110" width="170" height="10" rx="1"/>
          <rect x="160" y="130" width="140" height="10" rx="1"/>
          <rect x="160" y="150" width="180" height="10" rx="1"/>
        </g>
        <rect x="160" y="185" width="170" height="2" fill="oklch(0.88 0.01 250)"/>
        <g fill="oklch(0.62 0.18 25)" opacity=".85">
          <rect x="160" y="200" width="170" height="8"/>
        </g>
        <rect x="160" y="218" width="170" height="2" fill="oklch(0.88 0.01 250)"/>
        <rect x="160" y="226" width="120" height="8" fill="oklch(0.55 0.01 250)" opacity=".5"/>
        <rect x="160" y="244" width="170" height="2" fill="oklch(0.88 0.01 250)"/>
        <text x="160" y="285" fontFamily="Newsreader, serif" fontSize="14" fontStyle="italic" fill="oklch(0.22 0.02 250)">a review</text>
      </svg>
    ),
    'metric': (
      <svg {...common} xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="oklch(0.94 0.03 270)"/>
        <circle cx="250" cy="180" r="120" fill="none" stroke="oklch(0.22 0.02 250)" strokeWidth="1.5" strokeDasharray="4 4"/>
        <circle cx="250" cy="180" r="70" fill="oklch(0.78 0.08 160)" opacity=".6"/>
        <circle cx="250" cy="180" r="32" fill="oklch(0.68 0.13 270)"/>
        <circle cx="150" cy="120" r="16" fill="oklch(0.92 0.06 90)"/>
        <circle cx="360" cy="140" r="14" fill="oklch(0.70 0.12 15)"/>
        <circle cx="370" cy="240" r="18" fill="oklch(0.78 0.08 160)"/>
        <circle cx="140" cy="240" r="12" fill="oklch(0.68 0.13 270)"/>
        <text x="250" y="186" textAnchor="middle" fontFamily="Newsreader, serif" fontSize="22" fontStyle="italic" fill="oklch(0.985 0.005 245)">OMTM</text>
      </svg>
    ),
    'writing': (
      <svg {...common} xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="oklch(0.985 0.005 245)"/>
        <rect x="60" y="40" width="380" height="280" rx="6" fill="oklch(0.985 0.005 245)" stroke="oklch(0.88 0.01 250)"/>
        <g fill="oklch(0.22 0.02 250)" opacity=".8">
          <rect x="90" y="70" width="220" height="14" rx="2"/>
          <rect x="90" y="100" width="320" height="6" rx="1" opacity=".4"/>
          <rect x="90" y="112" width="300" height="6" rx="1" opacity=".4"/>
          <rect x="90" y="124" width="280" height="6" rx="1" opacity=".4"/>
          <rect x="90" y="150" width="320" height="6" rx="1" opacity=".4"/>
          <rect x="90" y="162" width="260" height="6" rx="1" opacity=".4"/>
        </g>
        <path d="M320 200 Q 380 190, 400 250" stroke="oklch(0.45 0.15 270)" strokeWidth="2" fill="none"/>
        <path d="M395 244 L 400 250 L 406 244" stroke="oklch(0.45 0.15 270)" strokeWidth="2" fill="none"/>
        <rect x="90" y="210" width="180" height="80" rx="4" fill="oklch(0.94 0.03 270)"/>
        <rect x="100" y="224" width="160" height="6" rx="1" fill="oklch(0.45 0.15 270)"/>
        <rect x="100" y="236" width="120" height="6" rx="1" fill="oklch(0.45 0.15 270)" opacity=".5"/>
      </svg>
    ),
    'reviews': (
      <svg {...common} xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="oklch(0.95 0.02 165)"/>
        <g>
          {[[80,80,'oklch(0.68 0.13 270)'],[200,120,'oklch(0.78 0.08 160)'],[340,90,'oklch(0.92 0.06 90)'],[130,220,'oklch(0.78 0.08 160)'],[280,240,'oklch(0.68 0.13 270)'],[400,220,'oklch(0.70 0.12 15)']].map(([x,y,c],i) => (
            <g key={i}>
              <rect x={x} y={y} width="70" height="50" rx="14" fill={c} opacity=".7"/>
              <rect x={x+8} y={y+10} width="40" height="4" rx="2" fill="oklch(0.22 0.02 250)" opacity=".4"/>
              <rect x={x+8} y={y+20} width="30" height="4" rx="2" fill="oklch(0.22 0.02 250)" opacity=".4"/>
              <rect x={x+8} y={y+30} width="46" height="4" rx="2" fill="oklch(0.22 0.02 250)" opacity=".4"/>
            </g>
          ))}
        </g>
      </svg>
    )
  };
  return <div className={className} style={{width:'100%',height:'100%',overflow:'hidden'}}>{covers[k] || covers['ai-coworker']}</div>;
}

/* Project visuals */
function ProjectVisual({ kind }){
  const common = { width:'100%', height:'100%', viewBox:'0 0 500 320', preserveAspectRatio:'xMidYMid slice', style:{display:'block'} };
  if(kind==='planetia') return (
    <svg {...common} xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="oklch(0.18 0.03 260)"/>
      <g fill="#fff" opacity=".7">{Array.from({length:80}).map((_,i)=><circle key={i} cx={(i*71)%500} cy={(i*43)%320} r={(i%7===0)?1.8:0.7}/>)}</g>
      <circle cx="90" cy="160" r="50" fill="oklch(0.92 0.06 90)"/>
      <circle cx="200" cy="160" r="14" fill="oklch(0.68 0.13 270)"/>
      <circle cx="260" cy="160" r="22" fill="oklch(0.78 0.08 160)"/>
      <ellipse cx="260" cy="160" rx="36" ry="5" stroke="oklch(0.78 0.08 160)" strokeWidth="1.2" fill="none"/>
      <circle cx="340" cy="160" r="12" fill="oklch(0.70 0.12 15)"/>
      <circle cx="400" cy="160" r="9" fill="oklch(0.68 0.13 270)"/>
      <circle cx="450" cy="160" r="7" fill="oklch(0.78 0.08 160)"/>
      <g stroke="#fff" strokeWidth="0.8" opacity=".2" fill="none">
        <ellipse cx="90" cy="160" rx="120" ry="30"/>
        <ellipse cx="90" cy="160" rx="180" ry="44"/>
        <ellipse cx="90" cy="160" rx="260" ry="62"/>
        <ellipse cx="90" cy="160" rx="340" ry="80"/>
      </g>
    </svg>
  );
  if(kind==='office') return (
    <svg {...common} xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="oklch(0.85 0.06 80)"/>
      <rect x="0" y="220" width="500" height="100" fill="oklch(0.65 0.08 80)"/>
      <g shapeRendering="crispEdges">
        <rect x="60" y="200" width="110" height="20" fill="oklch(0.40 0.03 60)"/>
        <rect x="60" y="220" width="10" height="40" fill="oklch(0.30 0.03 60)"/>
        <rect x="160" y="220" width="10" height="40" fill="oklch(0.30 0.03 60)"/>
        <rect x="80" y="160" width="60" height="40" fill="oklch(0.22 0.02 250)"/>
        <rect x="84" y="164" width="52" height="32" fill="oklch(0.68 0.13 270)"/>
        <rect x="88" y="170" width="30" height="4" fill="oklch(0.985 0.005 245)"/>
        <rect x="88" y="178" width="44" height="4" fill="oklch(0.985 0.005 245)"/>
        <rect x="88" y="186" width="22" height="4" fill="oklch(0.985 0.005 245)"/>
        <rect x="100" y="126" width="20" height="20" fill="oklch(0.78 0.10 60)"/>
        <rect x="104" y="132" width="4" height="4" fill="oklch(0.22 0.02 250)"/>
        <rect x="112" y="132" width="4" height="4" fill="oklch(0.22 0.02 250)"/>
        <rect x="104" y="140" width="12" height="2" fill="oklch(0.22 0.02 250)"/>
        <rect x="220" y="200" width="110" height="20" fill="oklch(0.40 0.03 60)"/>
        <rect x="240" y="160" width="60" height="40" fill="oklch(0.22 0.02 250)"/>
        <rect x="244" y="164" width="52" height="32" fill="oklch(0.78 0.08 160)"/>
        <rect x="370" y="180" width="30" height="30" fill="oklch(0.45 0.09 140)"/>
        <rect x="374" y="160" width="22" height="22" fill="oklch(0.55 0.12 150)"/>
        <rect x="382" y="148" width="10" height="12" fill="oklch(0.62 0.12 150)"/>
        <rect x="60" y="40" width="380" height="80" fill="oklch(0.80 0.05 220)"/>
        <rect x="60" y="40" width="380" height="4" fill="oklch(0.22 0.02 250)"/>
        <rect x="246" y="40" width="4" height="80" fill="oklch(0.22 0.02 250)"/>
      </g>
      <text x="250" y="300" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill="oklch(0.22 0.02 250)" fontWeight="700">DAYS WITHOUT INCIDENT: 0</text>
    </svg>
  );
  // explorer
  return (
    <svg {...common} xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="oklch(0.22 0.02 250)"/>
      <g fill="#fff" opacity=".5">{Array.from({length:50}).map((_,i)=><circle key={i} cx={(i*87)%500} cy={(i*53)%320} r={0.8}/>)}</g>
      <circle cx="250" cy="160" r="60" fill="oklch(0.92 0.06 90)"/>
      <g stroke="oklch(0.985 0.005 245)" strokeWidth="0.8" fill="none" opacity=".4">
        {[90,130,180,230,280].map(r => <circle key={r} cx="250" cy="160" r={r}/>)}
      </g>
      <circle cx="160" cy="160" r="6" fill="oklch(0.78 0.08 160)"/>
      <circle cx="120" cy="160" r="8" fill="oklch(0.70 0.12 15)"/>
      <circle cx="340" cy="160" r="12" fill="oklch(0.68 0.13 270)"/>
      <circle cx="80" cy="160" r="5" fill="oklch(0.78 0.08 160)"/>
      <circle cx="420" cy="160" r="10" fill="oklch(0.70 0.12 15)"/>
      <circle cx="470" cy="160" r="7" fill="oklch(0.68 0.13 270)"/>
    </svg>
  );
}

function SoftRoot({ screen, device }){
  return (
    <div className={`dir-soft device-${device}`} data-screen-label={`A·${screen}`}>
      <style>{`
        .dir-soft{
          --ink: oklch(0.22 0.02 250);
          --ink-2: oklch(0.34 0.02 250);
          --mute: oklch(0.52 0.015 250);
          --line: oklch(0.90 0.01 245);
          --paper: oklch(0.985 0.005 245);
          --paper-2: oklch(0.965 0.008 245);
          --paper-3: oklch(0.94 0.01 245);
          --peri: oklch(0.68 0.13 270);
          --peri-ink: oklch(0.45 0.15 270);
          --peri-pale: oklch(0.94 0.03 270);
          --sage: oklch(0.78 0.08 160);
          --sage-pale: oklch(0.95 0.02 165);
          --butter: oklch(0.92 0.06 90);
          --berry: oklch(0.70 0.12 15);
          --clay: oklch(0.72 0.09 55);
          --slate: oklch(0.65 0.04 230);
          font-family: 'Geist', system-ui, sans-serif;
          color: var(--ink); background: var(--paper);
          font-size: 17px; line-height: 1.55;
        }
        .dir-soft .serif{ font-family:'Newsreader', Georgia, serif; font-weight:500; letter-spacing:-0.012em;}
        .dir-soft h1,.dir-soft h2,.dir-soft h3,.dir-soft h4{margin:0; font-weight:500; letter-spacing:-0.02em;}

        /* NAV */
        .soft-nav{display:flex; align-items:center; gap:28px; padding:22px 40px; border-bottom:1px solid var(--line); background:color-mix(in oklch, var(--paper) 88%, transparent); position:sticky; top:0; z-index:10; backdrop-filter:blur(10px);}
        .soft-nav .brand{display:flex; align-items:center; gap:10px; font-weight:500; font-size:15px; cursor:pointer;}
        .soft-nav .brand .mark{width:28px; height:28px; border-radius:10px 14px 10px 14px; background:linear-gradient(135deg, var(--peri), var(--sage)); display:grid; place-items:center; color:#fff; font-family:'Newsreader',serif; font-size:14px; font-style:italic;}
        .soft-nav .links{display:flex; gap:22px; font-size:14px; color:var(--ink-2);}
        .soft-nav .links a{text-decoration:none; cursor:pointer;}
        .soft-nav .links a.on{color:var(--peri-ink); position:relative;}
        .soft-nav .links a.on::after{content:''; position:absolute; left:0; right:0; bottom:-6px; height:6px; background:var(--sage); border-radius:4px; opacity:.55;}
        .soft-nav .spacer{flex:1;}
        .soft-nav .cta{display:inline-flex; align-items:center; gap:8px; background:var(--ink); color:var(--paper); padding:10px 16px; border-radius:999px; font-size:13.5px; border:0; cursor:pointer;}

        /* HERO */
        .soft-hero{position:relative; display:grid; grid-template-columns:1.2fr .9fr; gap:60px; padding:80px 80px 90px; overflow:hidden;}
        .soft-hero .eyebrow{display:inline-flex; align-items:center; gap:10px; font-family:'Geist Mono', monospace; font-size:11px; letter-spacing:.1em; color:var(--peri-ink); text-transform:uppercase; margin-bottom:28px;}
        .soft-hero .eyebrow .dot{width:8px; height:8px; border-radius:50%; background:var(--peri);}
        .soft-hero h1{font-family:'Newsreader', serif; font-weight:500; font-size:clamp(44px, 5.4vw, 72px); line-height:1.02; letter-spacing:-0.025em; max-width:14ch;}
        .soft-hero h1 em{font-style:italic; color:var(--peri-ink);}
        .soft-hero h1 .blob{display:inline-block; position:relative;}
        .soft-hero h1 .blob::before{content:''; position:absolute; inset:-10px -14px; z-index:-1; background:var(--peri-pale); border-radius:60% 70% 50% 80% / 60% 55% 70% 50%;}
        .soft-hero .lede{margin-top:28px; max-width:46ch; font-size:19px; color:var(--ink-2); line-height:1.55;}
        .soft-hero .meta{margin-top:36px; display:flex; gap:26px; flex-wrap:wrap; font-size:13px; color:var(--mute);}
        .soft-hero .meta b{color:var(--ink); font-weight:500;}
        .soft-hero .actions{margin-top:40px; display:flex; gap:14px; flex-wrap:wrap;}
        .soft-hero .btn-primary{display:inline-flex; align-items:center; gap:10px; background:var(--ink); color:var(--paper); padding:14px 22px; border-radius:999px; font-size:14.5px; border:0; cursor:pointer;}
        .soft-hero .btn-ghost{display:inline-flex; align-items:center; gap:10px; background:transparent; color:var(--ink); padding:14px 22px; border-radius:999px; border:1px solid var(--line); font-size:14.5px;}

        .soft-portrait{position:relative; align-self:center;}
        .soft-portrait .frame{position:relative; width:100%; aspect-ratio:4/5; border-radius:46% 54% 48% 52% / 40% 58% 42% 60%; overflow:hidden; background:var(--peri-pale); box-shadow:0 30px 60px -30px oklch(0.45 0.15 270 / .35);}
        .soft-portrait .frame img{width:100%; height:100%; object-fit:cover; object-position:50% 15%;}
        .soft-portrait .tag{position:absolute; left:-22px; bottom:22px; background:var(--paper); border:1px solid var(--line); border-radius:20px; padding:12px 16px; display:flex; align-items:center; gap:10px; font-size:13px; box-shadow:0 20px 40px -24px oklch(0.45 0.15 270 / .28); max-width:280px;}
        .soft-portrait .tag .blob-ico{width:34px; height:34px; border-radius:40% 60% 55% 45% / 55% 40% 60% 45%; background:var(--sage); display:grid; place-items:center; color:oklch(0.30 0.06 160); flex:0 0 auto;}
        .soft-portrait .tag small{display:block; color:var(--mute); font-size:11px; letter-spacing:.06em; text-transform:uppercase; margin-bottom:2px;}

        .soft-hero .deco{position:absolute; pointer-events:none;}
        .soft-hero .deco.a{width:280px; height:280px; left:-80px; top:-40px; background:var(--sage-pale); border-radius:60% 40% 55% 45% / 50% 60% 40% 50%; opacity:.7; z-index:-1;}
        .soft-hero .deco.b{width:200px; height:200px; right:-50px; bottom:-60px; background:var(--peri-pale); border-radius:50% 50% 40% 60% / 60% 50% 50% 40%; z-index:-1; opacity:.8;}

        /* STRIP */
        .soft-strip{display:flex; align-items:center; gap:24px; padding:22px 80px; border-top:1px solid var(--line); border-bottom:1px solid var(--line); font-size:13px; color:var(--mute); background:var(--paper-2);}
        .soft-strip .label{font-family:'Geist Mono', monospace; font-size:10.5px; letter-spacing:.14em; text-transform:uppercase; color:var(--ink);}
        .soft-strip .item{display:flex; align-items:center; gap:10px;}
        .soft-strip .item .chip{width:22px; height:22px; border-radius:40% 60% 50% 50% / 55% 45% 55% 45%;}
        .soft-strip .sep{width:4px; height:4px; border-radius:50%; background:var(--line);}

        /* SECTION */
        .soft-section{padding:90px 80px;}
        .soft-sh{display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:40px; gap:24px;}
        .soft-sh .eyebrow{font-family:'Geist Mono', monospace; font-size:10.5px; letter-spacing:.14em; color:var(--peri-ink); text-transform:uppercase; margin-bottom:12px; display:flex; align-items:center; gap:10px;}
        .soft-sh .eyebrow .pebble{width:10px; height:10px; border-radius:40% 60% 50% 50% / 60% 40% 55% 45%; background:var(--peri);}
        .soft-sh h2{font-family:'Newsreader', serif; font-size:40px; line-height:1.1; letter-spacing:-0.02em; max-width:22ch;}
        .soft-sh .see{font-size:13.5px; color:var(--ink); display:inline-flex; align-items:center; gap:8px; padding:10px 16px; border:1px solid var(--line); border-radius:999px; background:var(--paper); text-decoration:none;}

        /* WRITING — cards with lead image */
        .soft-writing-home{display:grid; grid-template-columns: 1.3fr 1fr 1fr; gap:24px;}
        .soft-wc{
          background:var(--paper); border:1px solid var(--line); border-radius:22px; overflow:hidden;
          display:flex; flex-direction:column; transition:transform .2s ease, box-shadow .2s;
          text-decoration:none; color:inherit;
        }
        .soft-wc:hover{ transform: translateY(-2px); box-shadow: 0 20px 40px -28px oklch(0.45 0.15 270 / 0.28);}
        .soft-wc .cover{ aspect-ratio: 5/4; background: var(--paper-2); position:relative;}
        .soft-wc .body{ padding: 22px 22px 24px; display:flex; flex-direction:column; gap:10px; flex:1;}
        .soft-wc .meta{ font-family:'Geist Mono', monospace; font-size:10.5px; color:var(--mute); letter-spacing:.08em; text-transform:uppercase;}
        .soft-wc h3{ font-family:'Newsreader', serif; font-size:22px; line-height:1.18; letter-spacing:-0.012em; font-weight:500;}
        .soft-wc p{ margin:0; color:var(--ink-2); font-size:14.5px;}
        .soft-wc .tag{ display:inline-flex; align-items:center; gap:8px; font-size:12px; padding:4px 10px; border-radius:999px; background:var(--paper-2); border:1px solid var(--line); color:var(--ink-2); margin-top:auto; align-self:flex-start;}
        .soft-wc .tag .bead{ width:8px; height:8px; border-radius:40% 60% 55% 45% / 60% 40% 55% 45%;}
        .soft-wc .tag.Leadership .bead{ background: var(--peri);}
        .soft-wc .tag.AI .bead{ background: var(--sage);}
        .soft-wc .tag.Product .bead{ background: var(--butter);}
        .soft-wc .tag.Design .bead{ background: var(--berry);}
        .soft-wc .tag.Books .bead{ background: var(--clay);}
        .soft-wc .tag.Projects .bead{ background: var(--slate);}

        /* Home — featured card spans taller cover */
        .soft-writing-home .soft-wc.featured{ grid-row: span 1;}
        .soft-writing-home .soft-wc.featured .cover{ aspect-ratio: 16/11;}
        .soft-writing-home .soft-wc.featured h3{ font-size:28px;}

        /* PROJECTS teaser on home */
        .soft-projects-home{display:grid; grid-template-columns: repeat(3, 1fr); gap: 24px;}
        .soft-ph{
          background:var(--paper); border:1px solid var(--line); border-radius:22px; overflow:hidden; display:flex; flex-direction:column; text-decoration:none; color:inherit;
        }
        .soft-ph .v{ aspect-ratio: 5/3; background: var(--paper-2);}
        .soft-ph .b{ padding: 20px 22px 22px; display:flex; flex-direction:column; gap:10px;}
        .soft-ph h3{ font-family:'Newsreader', serif; font-size:22px; line-height:1.18; letter-spacing:-0.012em; font-weight:500;}
        .soft-ph p{ margin:0; font-size:14px; color:var(--ink-2);}
        .soft-ph .stack{ display:flex; gap:6px; flex-wrap:wrap;}
        .soft-ph .pill{ display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:999px; font-size:11.5px; border:1px solid var(--line); background:var(--paper-2); color:var(--ink-2); font-family:'Geist Mono', monospace;}

        /* NEWSLETTER */
        .soft-news{margin:30px 80px 100px; background:linear-gradient(145deg, var(--peri-pale) 0%, var(--sage-pale) 120%); border-radius:40px 48px 44px 52px / 44px 52px 40px 48px; padding:70px; position:relative; overflow:hidden; border:1px solid oklch(0.90 0.04 260);}
        .soft-news .deco-s{position:absolute; right:-40px; top:-60px; width:260px; height:260px; background:var(--peri); opacity:.12; border-radius:50% 55% 45% 50% / 60% 40% 55% 45%;}
        .soft-news .deco-s2{position:absolute; left:-60px; bottom:-80px; width:300px; height:300px; background:var(--sage); opacity:.18; border-radius:60% 40% 55% 45% / 45% 55% 50% 50%;}
        .soft-news .wrap{position:relative; max-width:760px;}
        .soft-news .eyebrow{font-family:'Geist Mono', monospace; font-size:11px; letter-spacing:.14em; color:var(--peri-ink); text-transform:uppercase; display:flex; align-items:center; gap:10px; margin-bottom:22px;}
        .soft-news h2{font-family:'Newsreader', serif; font-size:46px; line-height:1.05; letter-spacing:-0.02em; max-width:20ch;}
        .soft-news h2 em{font-style:italic; color:var(--peri-ink);}
        .soft-news p{color:var(--ink-2); font-size:17px; max-width:56ch; margin:20px 0 32px;}
        .soft-news .form{display:flex; gap:8px; background:var(--paper); border-radius:999px; padding:6px; max-width:520px; box-shadow:0 20px 40px -24px oklch(0.40 0.15 270 / .4); border:1px solid rgba(255,255,255,.5);}
        .soft-news input{flex:1; border:0; outline:0; padding:14px 18px; border-radius:999px; background:transparent; font:inherit; font-size:15px; color:var(--ink);}
        .soft-news button{background:var(--ink); color:var(--paper); border:0; border-radius:999px; padding:0 22px; font:inherit; font-size:14px; cursor:pointer; display:inline-flex; align-items:center; gap:8px;}
        .soft-news .proof{margin-top:20px; font-size:13px; color:var(--ink-2);}

        /* FOOTER */
        .soft-foot{border-top:1px solid var(--line); padding:48px 80px 40px; display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:40px; color:var(--ink-2); font-size:14px;}
        .soft-foot h4{font-family:'Geist Mono', monospace; font-size:10.5px; letter-spacing:.14em; text-transform:uppercase; color:var(--mute); margin:0 0 14px;}
        .soft-foot ul{list-style:none; padding:0; margin:0; display:grid; gap:8px;}
        .soft-foot .sig{font-family:'Newsreader', serif; font-size:20px; line-height:1.3; max-width:34ch; color:var(--ink);}
        .soft-foot .meta{grid-column:1/-1; display:flex; justify-content:space-between; padding-top:24px; margin-top:24px; border-top:1px solid var(--line); color:var(--mute); font-size:12px; font-family:'Geist Mono', monospace;}

        /* PAGE HEADER */
        .soft-page{padding:70px 80px;}
        .soft-page .ph-head{display:flex; align-items:flex-end; justify-content:space-between; gap:30px; padding-bottom:36px; border-bottom:1px solid var(--line); margin-bottom:40px;}
        .soft-page h1{font-family:'Newsreader', serif; font-size:64px; line-height:1.02; letter-spacing:-0.025em; font-weight:500;}
        .soft-page h1 em{font-style:italic; color:var(--peri-ink);}
        .soft-page .sub{margin-top:16px; color:var(--ink-2); font-size:18px; max-width:54ch;}

        /* WRITING INDEX */
        .soft-index-feature{ display:grid; grid-template-columns: 1.2fr 1fr; gap:40px; margin-bottom:40px; padding-bottom:40px; border-bottom:1px solid var(--line);}
        .soft-index-feature .cover{ aspect-ratio:5/4; border-radius:30px 40px 32px 44px / 40px 32px 44px 30px; overflow:hidden; background: var(--paper-2);}
        .soft-index-feature .meta{ font-family:'Geist Mono', monospace; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--mute); margin-bottom:18px;}
        .soft-index-feature h2{ font-family:'Newsreader', serif; font-size:44px; line-height:1.05; letter-spacing:-.02em;}
        .soft-index-feature p{ font-size:17px; color:var(--ink-2); margin:20px 0 28px; max-width:46ch;}
        .soft-index-feature .read{ display:inline-flex; align-items:center; gap:10px; padding:12px 20px; background:var(--ink); color:var(--paper); border-radius:999px; font-size:14px; text-decoration:none;}

        .soft-bar{display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:28px; padding:14px 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
        .soft-bar .group{display:inline-flex; gap:8px; flex-wrap:wrap;}
        .soft-bar .chip{padding:7px 14px; border-radius:999px; font-size:13px; background:var(--paper-2); border:1px solid var(--line); color:var(--ink-2); cursor:pointer; display:inline-flex; align-items:center; gap:8px;}
        .soft-bar .chip.on{background:var(--ink); color:var(--paper); border-color:var(--ink);}
        .soft-bar .search{flex:1; display:flex; align-items:center; gap:8px; padding:8px 14px; border-radius:999px; background:var(--paper-2); border:1px solid var(--line); color:var(--mute); min-width:240px;}
        .soft-bar .search input{border:0; background:transparent; outline:0; font:inherit; font-size:13.5px; flex:1; color:var(--ink);}

        .soft-index-list{display:grid; grid-template-columns: 1fr 1fr; gap:28px;}

        /* BLOG POST */
        .soft-post-hero{padding:70px 80px 40px; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; border-bottom:1px solid var(--line);}
        .soft-post-hero .meta{font-family:'Geist Mono', monospace; font-size:11px; letter-spacing:.12em; color:var(--peri-ink); text-transform:uppercase; display:flex; align-items:center; gap:10px; margin-bottom:22px;}
        .soft-post-hero h1{font-family:'Newsreader', serif; font-size:56px; line-height:1.03; letter-spacing:-0.025em; font-weight:500;}
        .soft-post-hero .by{margin-top:28px; display:flex; align-items:center; gap:12px; font-size:14px; color:var(--ink-2);}
        .soft-post-hero .by .av{width:42px; height:42px; border-radius:40% 60% 50% 50% / 55% 45% 55% 45%; overflow:hidden; background:var(--peri-pale);}
        .soft-post-hero .by .av img{width:100%; height:100%; object-fit:cover; object-position:50% 15%;}
        .soft-post-hero .cover{aspect-ratio:4/5; border-radius:44% 56% 52% 48% / 40% 60% 40% 60%; overflow:hidden; background:var(--peri-pale); box-shadow:0 30px 60px -30px oklch(0.45 0.15 270 / .3);}

        /* Post article grid — uses minmax so it doesn't break at narrow desktop widths */
        .soft-article{display:grid; grid-template-columns: minmax(160px, 200px) minmax(560px, 680px) minmax(160px, 200px); gap:40px; padding:60px 80px 40px; justify-content:center;}
        .soft-article .sticky{position:sticky; top:90px; align-self:start; max-height:calc(100vh - 140px); overflow-y:auto; font-family:'Geist Mono', monospace; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--mute); display:grid; gap:14px;}
        .soft-article .sticky .group{display:grid; gap:6px;}
        .soft-article .sticky .group b{color:var(--ink); font-weight:500;}
        .soft-article .sticky a{text-decoration:none; color:var(--ink-2); text-transform:none; letter-spacing:0; font-size:13px; font-family:'Geist', sans-serif;}
        .soft-article .sticky a.on{color:var(--peri-ink);}
        .soft-article .body{font-family:'Newsreader', serif; font-size:20px; line-height:1.62; color:var(--ink);}
        .soft-article .body p{margin:0 0 1.4em;}
        .soft-article .body .lede{font-size:24px; line-height:1.48; letter-spacing:-0.012em;}
        .soft-article .body h2{font-family:'Newsreader', serif; font-size:30px; line-height:1.15; letter-spacing:-0.02em; margin:2em 0 0.6em; font-weight:500;}
        .soft-article .body ul{padding-left:20px; margin:0 0 1.6em;}
        .soft-article .body ul li{margin:0 0 .6em;}
        .soft-article .body .pull{font-style:italic; font-size:28px; line-height:1.3; color:var(--peri-ink); margin:2em 0; padding-left:24px; border-left:3px solid var(--peri);}
        .soft-article .share{position:sticky; top:90px; align-self:start; display:grid; gap:10px;}
        .soft-article .share button{all:unset; cursor:pointer; width:40px; height:40px; border-radius:40% 60% 50% 50% / 55% 45% 55% 45%; display:grid; place-items:center; background:var(--paper-2); border:1px solid var(--line); color:var(--ink-2);}

        .soft-inline-cta{margin:2.4em 0; padding:28px 32px; border-radius:26px; background:var(--peri-pale); border:1px solid oklch(0.88 0.05 270); font-family:'Geist', sans-serif; font-size:16px; color:var(--ink); display:flex; gap:20px; align-items:center;}
        .soft-inline-cta .ico{width:44px; height:44px; border-radius:40% 60% 55% 45% / 60% 40% 55% 45%; background:var(--peri); color:#fff; display:grid; place-items:center; flex:0 0 auto;}
        .soft-inline-cta b{font-weight:500; letter-spacing:-0.01em;}
        .soft-inline-cta small{display:block; color:var(--ink-2); font-size:13.5px; margin-top:4px;}
        .soft-inline-cta button{margin-left:auto; background:var(--ink); color:var(--paper); border:0; padding:10px 16px; border-radius:999px; font:inherit; font-size:13px; cursor:pointer;}

        .soft-post-end{margin:20px 80px 60px; padding:56px 60px; border-radius:40px 48px 44px 52px / 44px 52px 40px 48px; background:var(--paper-2); display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; border:1px solid var(--line);}
        .soft-post-end h3{font-family:'Newsreader', serif; font-size:36px; line-height:1.1; letter-spacing:-0.02em; max-width:16ch;}
        .soft-post-end .sig{display:flex; gap:14px; align-items:center; margin-top:20px; font-size:14px; color:var(--ink-2);}
        .soft-post-end .av{width:44px; height:44px; border-radius:40% 60% 50% 50% / 55% 45% 55% 45%; overflow:hidden;}
        .soft-post-end .av img{width:100%; height:100%; object-fit:cover; object-position:50% 15%;}
        .soft-post-end .form{display:flex; gap:8px; background:var(--paper); border-radius:999px; padding:6px; box-shadow:0 20px 40px -24px oklch(0.40 0.15 270 / .35); border:1px solid var(--line);}
        .soft-post-end .form input{flex:1; border:0; outline:0; padding:14px 18px; background:transparent; font-size:15px;}
        .soft-post-end .form button{background:var(--ink); color:var(--paper); border:0; border-radius:999px; padding:0 22px; font-size:14px; display:inline-flex; align-items:center; gap:8px; cursor:pointer;}

        .soft-next{padding:40px 80px 100px; border-top:1px solid var(--line);}
        .soft-next .label{font-family:'Geist Mono', monospace; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--mute); margin-bottom:18px;}
        .soft-next-grid{display:grid; grid-template-columns:1fr 1fr; gap:40px;}
        .soft-next-card{padding:28px; border-radius:26px; border:1px solid var(--line); background:var(--paper-2); text-decoration:none; color:inherit;}
        .soft-next-card small{font-family:'Geist Mono', monospace; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--mute);}
        .soft-next-card h4{font-family:'Newsreader', serif; font-size:24px; line-height:1.15; margin:8px 0 0; font-weight:500;}

        /* PROJECTS page */
        .soft-proj-list{display:grid; gap: 28px;}
        .soft-proj-card{
          background:var(--paper); border:1px solid var(--line); border-radius:28px; overflow:hidden;
          display:grid; grid-template-columns: 1.1fr 1fr;
        }
        .soft-proj-card .v{ aspect-ratio: 16/11; background: var(--paper-2);}
        .soft-proj-card .b{ padding: 36px 40px; display:flex; flex-direction:column; gap:14px; justify-content:center;}
        .soft-proj-card .meta{ font-family:'Geist Mono', monospace; font-size:11px; letter-spacing:.1em; color:var(--mute); text-transform:uppercase;}
        .soft-proj-card h2{ font-family:'Newsreader', serif; font-size:34px; line-height:1.08; letter-spacing:-0.02em;}
        .soft-proj-card p{ margin:0; color:var(--ink-2); font-size:15.5px;}
        .soft-proj-card .stack{ display:flex; flex-wrap:wrap; gap:8px;}
        .soft-proj-card .stack span{ padding:5px 12px; border-radius:999px; font-size:12px; background:var(--paper-2); border:1px solid var(--line); color:var(--ink-2); font-family:'Geist Mono', monospace;}
        .soft-proj-card .actions{ margin-top:10px; display:flex; gap:10px;}
        .soft-proj-card .btn{ display:inline-flex; align-items:center; gap:8px; font-size:13.5px; padding:10px 16px; border-radius:999px; background:var(--ink); color:var(--paper); text-decoration:none;}
        .soft-proj-card .btn.ghost{ background:transparent; color:var(--ink); border:1px solid var(--line);}

        /* PLANETIA page */
        .soft-planetia .hero{ text-align:center; padding: 60px 0 40px; border-bottom:1px solid var(--line); margin-bottom: 40px;}
        .soft-planetia .hero h1{ font-family:'Newsreader', serif; font-size:60px; line-height:1.02; letter-spacing:-0.025em; font-weight:500; max-width:20ch; margin:0 auto;}
        .soft-planetia .hero .tag{ margin:18px auto 0; font-size:18px; color:var(--ink-2); max-width: 56ch;}
        .soft-planetia .hero .lede{ margin:28px auto 0; font-size:15.5px; color:var(--ink-2); max-width:60ch; padding:20px 24px; border-radius:20px; background:var(--paper-2); border:1px solid var(--line);}
        .soft-planetia .hero .app{ margin-top: 28px; display:inline-flex; align-items:center; gap:10px; padding:14px 22px; background:var(--ink); color:var(--paper); border-radius:14px; font-size:15px; text-decoration:none;}
        .soft-planetia .shots{ display:grid; grid-template-columns: repeat(3, 1fr); gap:18px;}
        .soft-planetia .shot{ aspect-ratio: 4/3; border-radius:20px; overflow:hidden; background:oklch(0.22 0.02 250);}
        .soft-planetia .feat{ margin-top: 70px; border-top:1px solid var(--line); padding-top:50px;}
        .soft-planetia .feat h2{ font-family:'Newsreader', serif; font-size:36px; letter-spacing:-0.02em; line-height:1.1; margin-bottom: 30px; font-weight:500;}
        .soft-planetia .feat-grid{ display:grid; grid-template-columns:1fr 1fr; gap: 30px 48px;}
        .soft-planetia .feat-item{ display:flex; gap:16px;}
        .soft-planetia .feat-item .chip{ width:42px; height:42px; border-radius:40% 60% 55% 45% / 55% 45% 60% 40%; background:var(--peri-pale); color:var(--peri-ink); display:grid; place-items:center; flex:0 0 auto; font-family:'Newsreader', serif; font-style:italic; font-size:18px;}
        .soft-planetia .feat-item h3{ font-size: 18px; font-weight:500; font-family:'Geist', sans-serif; letter-spacing:-0.01em;}
        .soft-planetia .feat-item p{ margin:6px 0 0; color:var(--ink-2); font-size:14.5px;}

        /* SPEAKING page — timeline */
        .soft-speaking .year{ font-family:'Newsreader', serif; font-size:34px; letter-spacing:-0.02em; font-weight:500; margin:40px 0 18px;}
        .soft-speaking .year:first-child{ margin-top:0;}
        .soft-speaking .timeline{ position:relative; padding-left: 32px;}
        .soft-speaking .timeline::before{ content:''; position:absolute; left:12px; top:10px; bottom:10px; width:1px; background:var(--line);}
        .soft-speaking .event{ position:relative; padding: 18px 0 30px;}
        .soft-speaking .event::before{ content:''; position:absolute; left:-24px; top:28px; width:10px; height:10px; border-radius:40% 60% 55% 45% / 55% 45% 60% 40%; background:var(--peri);}
        .soft-speaking .event .when{ font-family:'Geist Mono', monospace; font-size:11px; letter-spacing:.08em; color:var(--mute); text-transform:uppercase;}
        .soft-speaking .event .venue{ font-family:'Newsreader', serif; font-size:26px; line-height:1.12; letter-spacing:-0.012em; margin-top:6px; font-weight:500;}
        .soft-speaking .event .title{ font-size:16px; color:var(--peri-ink); margin-top:6px; font-weight:500;}
        .soft-speaking .event .blurb{ margin-top:10px; color:var(--ink-2); font-size:15px; max-width:64ch;}
        .soft-speaking .event .link{ display:inline-flex; align-items:center; gap:8px; margin-top:14px; font-size:13.5px; color:var(--peri-ink); text-decoration:none;}

        /* ABOUT page */
        .soft-about .head{ display:grid; grid-template-columns: 220px 1fr; gap: 36px; align-items:center; padding-bottom: 32px; border-bottom:1px solid var(--line); margin-bottom:36px;}
        .soft-about .head .frame{ width:220px; aspect-ratio:1/1; border-radius:44% 56% 50% 50% / 50% 45% 55% 50%; overflow:hidden; background:var(--peri-pale);}
        .soft-about .head .frame img{ width:100%; height:100%; object-fit:cover; object-position:50% 15%;}
        .soft-about .head h1{ font-family:'Newsreader', serif; font-size:60px; letter-spacing:-0.025em; line-height:1; font-weight:500;}
        .soft-about .head .sub{ color:var(--ink-2); font-size:18px; margin-top:10px; max-width:40ch;}
        .soft-about .body{ font-family:'Newsreader', serif; font-size:19px; line-height:1.62; color:var(--ink); max-width: 68ch;}
        .soft-about .body p{ margin:0 0 1.2em;}
        .soft-about .body .hl{ color:var(--peri-ink);}
        .soft-about .mentoring{ margin:36px 0; padding: 28px 32px; border-radius: 28px; background: var(--sage-pale); border:1px solid oklch(0.88 0.04 160);}
        .soft-about .mentoring h3{ font-family:'Newsreader', serif; font-size:26px; letter-spacing:-0.015em; font-weight:500;}
        .soft-about .mentoring p{ margin:12px 0 0; color:var(--ink-2); font-size:15.5px; max-width:60ch;}
        .soft-about .contact{ padding-top:30px; border-top:1px solid var(--line);}
        .soft-about .contact h3{ font-family:'Newsreader', serif; font-size:26px; letter-spacing:-0.015em; font-weight:500;}
        .soft-about .contact p{ color:var(--ink-2); font-size:15.5px; margin:10px 0 22px; max-width:54ch;}
        .soft-about .contact .actions{ display:flex; gap:10px; flex-wrap:wrap;}
        .soft-about .contact .btn{ display:inline-flex; align-items:center; gap:10px; padding:12px 18px; border-radius:14px; background:var(--ink); color:var(--paper); text-decoration:none; font-size:14px;}
        .soft-about .contact .btn.ghost{ background:transparent; color:var(--ink); border:1px solid var(--line);}

        /* TABLET breakpoint (768-1023px) — fixes the gap between mobile and desktop.
           Earlier spec only had a 768 break; the post article grid (1160px fixed) broke between 768 and 1160. */
        @media (min-width: 768px) and (max-width: 1023px) {
          .soft-nav { padding: 18px 32px; gap: 20px; }
          .soft-hero { grid-template-columns: 1fr; gap: 32px; padding: 60px 48px; }
          .soft-hero h1 { font-size: 48px; }
          .soft-strip { padding: 20px 48px; gap: 18px; flex-wrap: wrap; }
          .soft-section { padding: 70px 48px; }
          .soft-sh { flex-direction: column; align-items: flex-start; }
          .soft-writing-home { grid-template-columns: 1fr 1fr; }
          .soft-writing-home .soft-wc.featured { grid-column: 1 / -1; }
          .soft-projects-home { grid-template-columns: 1fr 1fr; }
          .soft-news { margin: 30px 48px 70px; padding: 56px 48px; }
          .soft-foot { padding: 40px 48px 32px; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 28px; }
          .soft-page { padding: 56px 48px; }
          .soft-index-feature { grid-template-columns: 1fr; gap: 28px; }
          .soft-index-list { grid-template-columns: 1fr 1fr; }
          .soft-post-hero { padding: 56px 48px 36px; grid-template-columns: 1fr; gap: 32px; }
          .soft-post-hero h1 { font-size: 44px; }
          /* Article becomes single-column on tablet; TOC becomes inline accordion at top, share hidden */
          .soft-article { grid-template-columns: 1fr; gap: 24px; padding: 48px 48px 32px; max-width: 720px; }
          .soft-article .sticky { position: static; max-height: none; overflow: visible; padding: 16px 0; border-bottom: 1px solid var(--line); }
          .soft-article .share { display: none; }
          .soft-post-end { margin: 20px 48px 50px; padding: 48px 48px; grid-template-columns: 1fr; gap: 32px; }
          .soft-next { padding: 36px 48px 72px; }
          .soft-proj-card { grid-template-columns: 1fr; }
          .soft-proj-card .b { padding: 28px 32px; }
          .soft-planetia .shots { grid-template-columns: repeat(2, 1fr); }
          .soft-planetia .feat-grid { grid-template-columns: 1fr; }
          .soft-about .head { grid-template-columns: 180px 1fr; gap: 28px; }
          .soft-about .head h1 { font-size: 48px; }
        }

        /* MOBILE — applied via the mock .device-mobile class in the prototype */
        .device-mobile.dir-soft{font-size:15px;}
        .device-mobile .soft-nav{padding:16px 20px; gap:12px;}
        .device-mobile .soft-nav .links{display:none;}
        .device-mobile .soft-nav .cta{padding:8px 14px; font-size:12.5px;}
        .device-mobile .soft-hero{grid-template-columns:1fr; gap:32px; padding:40px 24px 60px;}
        .device-mobile .soft-hero h1{font-size:40px;}
        .device-mobile .soft-hero .lede{font-size:16px;}
        .device-mobile .soft-strip{padding:18px 24px; overflow-x:auto; white-space:nowrap; flex-wrap:nowrap;}
        .device-mobile .soft-section{padding:56px 24px;}
        .device-mobile .soft-sh{flex-direction:column; align-items:flex-start;}
        .device-mobile .soft-sh h2{font-size:30px;}
        .device-mobile .soft-writing-home, .device-mobile .soft-projects-home{grid-template-columns:1fr;}
        .device-mobile .soft-index-list{grid-template-columns:1fr;}
        .device-mobile .soft-news{margin:20px 16px 60px; padding:36px 28px; border-radius:32px;}
        .device-mobile .soft-news h2{font-size:30px;}
        .device-mobile .soft-news p{font-size:15px;}
        .device-mobile .soft-news .form{flex-direction:column; padding:8px; border-radius:24px;}
        .device-mobile .soft-news .form input{padding:12px 14px;}
        .device-mobile .soft-news .form button{padding:12px 18px; border-radius:18px; justify-content:center;}
        .device-mobile .soft-foot{grid-template-columns:1fr 1fr; padding:40px 24px;}
        .device-mobile .soft-foot .sig{grid-column:1/-1;}
        .device-mobile .soft-page{padding:40px 24px;}
        .device-mobile .soft-page h1{font-size:40px;}
        .device-mobile .soft-page .sub{font-size:15px;}
        .device-mobile .soft-page .ph-head{flex-direction:column; align-items:flex-start;}
        .device-mobile .soft-index-feature{grid-template-columns:1fr; gap:22px;}
        .device-mobile .soft-index-feature h2{font-size:28px;}
        .device-mobile .soft-bar{flex-direction:column; align-items:stretch;}
        .device-mobile .soft-bar .search{min-width:0;}
        .device-mobile .soft-post-hero{grid-template-columns:1fr; gap:24px; padding:30px 24px;}
        .device-mobile .soft-post-hero h1{font-size:34px;}
        .device-mobile .soft-article{grid-template-columns:1fr; padding:40px 24px;}
        .device-mobile .soft-article .sticky, .device-mobile .soft-article .share{display:none;}
        .device-mobile .soft-article .body{font-size:17px;}
        .device-mobile .soft-article .body h2{font-size:24px;}
        .device-mobile .soft-article .body .pull{font-size:22px;}
        .device-mobile .soft-post-end{grid-template-columns:1fr; padding:36px 28px; margin:16px 16px 40px; border-radius:32px;}
        .device-mobile .soft-post-end h3{font-size:26px;}
        .device-mobile .soft-next{padding:30px 24px 80px;}
        .device-mobile .soft-next-grid{grid-template-columns:1fr;}
        .device-mobile .soft-proj-card{grid-template-columns:1fr;}
        .device-mobile .soft-proj-card .b{padding:24px;}
        .device-mobile .soft-proj-card h2{font-size:26px;}
        .device-mobile .soft-planetia .hero h1{font-size:34px;}
        .device-mobile .soft-planetia .shots{grid-template-columns:1fr;}
        .device-mobile .soft-planetia .feat-grid{grid-template-columns:1fr;}
        .device-mobile .soft-about .head{grid-template-columns:1fr; text-align:left;}
        .device-mobile .soft-about .head .frame{width:140px;}
        .device-mobile .soft-about .head h1{font-size:40px;}

        /* Reduced motion — disable hover lifts and transitions */
        @media (prefers-reduced-motion: reduce) {
          .dir-soft *,
          .dir-soft *::before,
          .dir-soft *::after {
            transition: none !important;
            animation: none !important;
          }
          .dir-soft .soft-wc:hover { transform: none !important; }
        }
      `}</style>

      <SoftNav screen={screen}/>
      { screen === 'home' && <SoftHome/> }
      { screen === 'index' && <SoftIndex/> }
      { screen === 'post' && <SoftPost/> }
      { screen === 'projects' && <SoftProjects/> }
      { screen === 'planetia' && <SoftPlanetia/> }
      { screen === 'speaking' && <SoftSpeaking/> }
      { screen === 'about' && <SoftAbout/> }
      <SoftFooter/>
    </div>
  );
}

function SoftNav({ screen }){
  // On Home, no link is active. Earlier guidance made Writing active on Home, which confused the signal.
  const isWriting = screen==='index' || screen==='post';
  return (
    <nav className="soft-nav">
      <div className="brand"><span className="mark">r</span> Rohit Garg</div>
      <div className="links">
        <a className={isWriting?'on':''}>Writing</a>
        <a className={screen==='projects'?'on':''}>Projects</a>
        <a className={screen==='planetia'?'on':''}>Planetia</a>
        <a className={screen==='speaking'?'on':''}>Speaking</a>
        <a className={screen==='about'?'on':''}>About</a>
      </div>
      <span className="spacer"/>
      <button className="cta"><window.Icon.Mail width="14" height="14"/> Subscribe</button>
    </nav>
  );
}

function SoftHome(){
  const [email, setEmail] = useStateA('');
  const featured = window.RG_POSTS[0];
  const secondary = window.RG_POSTS.slice(1,3);
  return (
    <>
      <section className="soft-hero">
        <div className="deco a"/><div className="deco b"/>
        <div>
          <div className="eyebrow"><span className="dot"/> Head of Product &amp; Design · Times of India</div>
          <h1>Building <span className="blob"><em>products</em></span> for 240M readers. Tinkering with AI at night.</h1>
          <p className="lede">
            I&rsquo;m Rohit. I lead Product and Design at Times of India, India&rsquo;s largest digital news publisher, with a team of 60+. On the side I build little things, read a lot, and write here about what actually happens inside a product org at scale.
          </p>
          <div className="meta">
            <span><b>14+ years</b> shipping product</span>
            <span><b>60+ person</b> team</span>
            <span><b>38 books</b> in three years</span>
          </div>
          <div className="actions">
            <button className="btn-primary"><window.Icon.Mail width="16" height="16"/> Read the writing</button>
            <button className="btn-ghost"><window.Icon.App width="16" height="16"/> See Planetia</button>
          </div>
        </div>
        <div className="soft-portrait">
          <div className="frame"><img src="assets/rohit-portrait.png" alt="Rohit Garg"/></div>
          <div className="tag">
            <div className="blob-ico"><window.Icon.Spark width="18" height="18"/></div>
            <div><small>Currently</small><span>Shipping Planetia for iPad and drafting essay #43.</span></div>
          </div>
        </div>
      </section>

      <div className="soft-strip">
        <span className="label">Currently</span>
        <span className="item"><span className="chip" style={{background:'var(--peri)'}}/> Head of P&amp;D · Times of India</span>
        <span className="sep"/>
        <span className="item"><span className="chip" style={{background:'var(--sage)'}}/> Shipping <i>Planetia</i> on the App Store</span>
        <span className="sep"/>
        <span className="item"><span className="chip" style={{background:'var(--clay)'}}/> Reading <i>The Unaccountability Machine</i></span>
      </div>

      <section className="soft-section">
        <div className="soft-sh">
          <div>
            <div className="eyebrow"><span className="pebble"/> Writing</div>
            <h2>Essays on product, AI, leadership, and the occasional book review.</h2>
          </div>
          <a className="see">See all writing <window.Icon.Arrow width="14" height="14"/></a>
        </div>

        <div className="soft-writing-home">
          <a className="soft-wc featured">
            <div className="cover"><SoftCover k={featured.cover}/></div>
            <div className="body">
              <div className="meta">{featured.dateLabel} · {featured.readMin} min read</div>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <span className={`tag ${featured.tag}`}><span className="bead"/>{featured.tag}</span>
            </div>
          </a>
          {secondary.map(p => (
            <a key={p.id} className="soft-wc">
              <div className="cover"><SoftCover k={p.cover}/></div>
              <div className="body">
                <div className="meta">{p.dateLabel} · {p.readMin} min</div>
                <h3>{p.title}</h3>
                <p style={{fontSize:'13.5px'}}>{p.excerpt}</p>
                <span className={`tag ${p.tag}`}><span className="bead"/>{p.tag}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="soft-section" style={{paddingTop:0}}>
        <div className="soft-sh">
          <div>
            <div className="eyebrow"><span className="pebble" style={{background:'var(--sage)'}}/> Projects</div>
            <h2>Side projects, experiments, and things I&rsquo;m tinkering with.</h2>
          </div>
          <a className="see">All projects <window.Icon.Arrow width="14" height="14"/></a>
        </div>

        <div className="soft-projects-home">
          {window.RG_PROJECTS.map(p => (
            <a key={p.name} className="soft-ph">
              <div className="v"><ProjectVisual kind={p.visual}/></div>
              <div className="b">
                <h3>{p.name.split(',')[0].trim()}</h3>
                <p>{p.blurb}</p>
                <div className="stack">
                  {p.stack.map(s => <span key={s} className="pill">{s}</span>)}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="soft-news">
        <div className="deco-s"/><div className="deco-s2"/>
        <div className="wrap">
          <div className="eyebrow"><window.Icon.Mail width="14" height="14"/> The newsletter</div>
          <h2>A short note in your inbox most <em>Sundays</em>.</h2>
          <p>
            One essay, roughly weekly. Product, AI, leadership, and the occasional book I could not shut up about. No ads, no course funnels, no five-part email sequences. Unsubscribe with one click.
          </p>
          <form className="form" onSubmit={e=>e.preventDefault()}>
            <input placeholder="you@work.com" value={email} onChange={e=>setEmail(e.target.value)}/>
            <button type="submit">Subscribe <window.Icon.Arrow width="14" height="14"/></button>
          </form>
          <div className="proof">Free forever. One click to unsubscribe.</div>
        </div>
      </section>
    </>
  );
}

function SoftIndex(){
  const featured = window.RG_POSTS[0];
  const rest = window.RG_POSTS.slice(1);
  const [q, setQ] = useStateA('');
  const [tag, setTag] = useStateA('All');
  const tags = ['All','AI','Leadership','Product','Books','Design','Projects'];
  return (
    <section className="soft-page">
      <div className="ph-head">
        <div style={{maxWidth:'900px'}}>
          <h1>Notes on <em>product</em>, AI, leadership, and the occasional book review.</h1>
          <p className="sub">Roughly weekly essays. A mix of the craft of product management, AI as a coworker, and whatever audiobook I finished that week.</p>
        </div>
      </div>

      <div className="soft-bar">
        <div className="group">
          {tags.map(t => (
            <span key={t} className={`chip ${tag===t?'on':''}`} onClick={()=>setTag(t)}>
              {t==='All' ? 'All writing' : t}
              {t!=='All' && <span style={{opacity:.6, fontSize:11}}>· {window.RG_POSTS.filter(p=>p.tag===t).length}</span>}
            </span>
          ))}
        </div>
        <div className="search">
          <window.Icon.Search width="14" height="14"/>
          <input placeholder="Search essays…" value={q} onChange={e=>setQ(e.target.value)}/>
        </div>
      </div>

      <div className="soft-index-feature">
        <div className="cover"><SoftCover k={featured.cover}/></div>
        <div>
          <div className="meta">Featured · {featured.tag} · {featured.dateLabel}</div>
          <h2>{featured.title}</h2>
          <p>{featured.excerpt} The first AI-coworker essay I actually believe, after three months of daily use.</p>
          <a className="read">Read the essay <window.Icon.Arrow width="14" height="14"/></a>
        </div>
      </div>

      <div style={{fontFamily:"'Geist Mono', monospace", fontSize:11, letterSpacing:'.14em', color:'var(--mute)', textTransform:'uppercase', marginBottom:18}}>
        2026 · {rest.filter(p => p.date.startsWith('2026')).length} essays
      </div>
      <div className="soft-index-list">
        {rest.filter(p=>p.date.startsWith('2026')).map(p => (
          <a key={p.id} className="soft-wc">
            <div className="cover"><SoftCover k={p.cover}/></div>
            <div className="body">
              <div className="meta">{p.dateLabel} · {p.readMin} min</div>
              <h3>{p.title}</h3>
              <p style={{fontSize:'13.5px'}}>{p.excerpt}</p>
              <span className={`tag ${p.tag}`}><span className="bead"/>{p.tag}</span>
            </div>
          </a>
        ))}
      </div>

      <div style={{fontFamily:"'Geist Mono', monospace", fontSize:11, letterSpacing:'.14em', color:'var(--mute)', textTransform:'uppercase', margin:'36px 0 18px'}}>
        2025 · {rest.filter(p => p.date.startsWith('2025')).length} essays
      </div>
      <div className="soft-index-list">
        {rest.filter(p=>p.date.startsWith('2025')).map(p => (
          <a key={p.id} className="soft-wc">
            <div className="cover"><SoftCover k={p.cover}/></div>
            <div className="body">
              <div className="meta">{p.dateLabel} · {p.readMin} min</div>
              <h3>{p.title}</h3>
              <p style={{fontSize:'13.5px'}}>{p.excerpt}</p>
              <span className={`tag ${p.tag}`}><span className="bead"/>{p.tag}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function SoftPost(){
  const post = window.RG_POSTS[0];
  return (
    <>
      <section className="soft-post-hero">
        <div>
          <div className="meta"><window.Icon.Dot width="8" height="8"/> {post.tag} · {post.dateLabel} · {post.readMin} min read</div>
          <h1>{post.title}</h1>
          <p style={{marginTop:18, color:'var(--ink-2)', fontSize:18, maxWidth:'44ch'}}>
            The AI coworker that lives in my editor is capable. It is also, every morning, a stranger. Here&rsquo;s the onboarding ritual I wish I&rsquo;d started three months earlier.
          </p>
          <div className="by">
            <div className="av"><img src="assets/rohit-portrait.png" alt=""/></div>
            <div>
              <div style={{color:'var(--ink)', fontWeight:500}}>Rohit Garg</div>
              <div style={{fontSize:13, color:'var(--mute)'}}>Head of Product &amp; Design · Times of India</div>
            </div>
          </div>
        </div>
        <div className="cover"><SoftCover k={post.cover} tall/></div>
      </section>

      <article className="soft-article">
        <aside className="sticky">
          <div className="group">
            <b>On this page</b>
            <a className="on">The three things I wish I&rsquo;d done sooner</a>
            <a>What this looks like on a Tuesday</a>
          </div>
          <div className="group" style={{marginTop:20}}>
            <b>Reading time</b>
            <a style={{color:'var(--ink-2)'}}>{post.readMin} minutes · 1,840 words</a>
          </div>
        </aside>

        <div className="body">
          {window.RG_POST_BODY.map((b,i) => {
            if(b.type==='lede') return <p key={i} className="lede">{b.text}</p>;
            if(b.type==='p') return <p key={i}>{b.text}</p>;
            if(b.type==='h2') return <h2 key={i}>{b.text}</h2>;
            if(b.type==='pull') return <blockquote key={i} className="pull">{b.text}</blockquote>;
            if(b.type==='list') return <ul key={i}>{b.items.map((it,j)=><li key={j}>{it}</li>)}</ul>;
            return null;
          }).slice(0,5)}

          <div className="soft-inline-cta">
            <div className="ico"><window.Icon.Mail width="20" height="20"/></div>
            <div>
              <b>Enjoying this?</b>
              <small>Get the next essay in your inbox, most Sundays.</small>
            </div>
            <button>Subscribe</button>
          </div>

          {window.RG_POST_BODY.slice(5).map((b,i) => {
            if(b.type==='p') return <p key={i}>{b.text}</p>;
            if(b.type==='h2') return <h2 key={i}>{b.text}</h2>;
            if(b.type==='pull') return <blockquote key={i} className="pull">{b.text}</blockquote>;
            if(b.type==='list') return <ul key={i}>{b.items.map((it,j)=><li key={j}>{it}</li>)}</ul>;
            return null;
          })}
        </div>

        <aside className="share">
          <button title="Copy link"><window.Icon.Arrow width="16" height="16"/></button>
          <button title="RSS"><window.Icon.Rss width="16" height="16"/></button>
          <button title="Bookmark"><window.Icon.Book width="16" height="16"/></button>
        </aside>
      </article>

      <section className="soft-post-end">
        <div>
          <div style={{fontFamily:"'Geist Mono', monospace", fontSize:11, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--peri-ink)', marginBottom:14}}>Before you go</div>
          <h3>One essay like this. Most Sundays. Nothing else.</h3>
          <div className="sig">
            <div className="av"><img src="assets/rohit-portrait.png" alt=""/></div>
            <span>I write one post a week, send it on Sunday, and never more than that.</span>
          </div>
        </div>
        <form className="form" onSubmit={e=>e.preventDefault()}>
          <input placeholder="you@work.com"/>
          <button>Subscribe <window.Icon.Arrow width="14" height="14"/></button>
        </form>
      </section>

      <section className="soft-next">
        <div className="label">Keep reading</div>
        <div className="soft-next-grid">
          {window.RG_POSTS.slice(1,3).map(p => (
            <a key={p.id} className="soft-next-card">
              <small>{p.tag} · {p.dateLabel}</small>
              <h4>{p.title}</h4>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function SoftProjects(){
  return (
    <section className="soft-page">
      <div className="ph-head">
        <div>
          <h1><em>Projects</em></h1>
          <p className="sub">Side projects, experiments, and things I&rsquo;m tinkering with. Mostly built in evenings and weekends, most with an AI coworker over my shoulder.</p>
        </div>
      </div>
      <div className="soft-proj-list">
        {window.RG_PROJECTS.map(p => (
          <article key={p.name} className="soft-proj-card">
            <div className="v"><ProjectVisual kind={p.visual}/></div>
            <div className="b">
              <div className="meta">{p.kind} · {p.year}</div>
              <h2>{p.name}</h2>
              <p>{p.blurb}</p>
              <div className="stack">
                {p.stack.map(s => <span key={s}>{s}</span>)}
              </div>
              <div className="actions">
                <a className="btn">{p.stat} <window.Icon.Arrow width="12" height="12"/></a>
                <a className="btn ghost">Read the story</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SoftPlanetia(){
  const p = window.RG_PLANETIA;
  return (
    <section className="soft-page soft-planetia">
      <div className="hero">
        <h1>{p.title}</h1>
        <p className="tag">{p.tagline}</p>
        <p className="lede">{p.lede}</p>
        <a className="app">
          <svg width="16" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.5 19.1c-.9 1.3-1.8 2.6-3.3 2.6-1.4 0-1.9-.9-3.5-.9-1.6 0-2.1.9-3.4.9C6.8 21.8 5.7 20.4 4.8 19c-2-2.9-3.5-8.1-1.4-11.6 1-1.7 2.8-2.8 4.7-2.8 1.5 0 2.8.9 3.7.9.8 0 2.4-1.1 4.1-.9.7 0 2.7.3 4 2.2-.1.1-2.4 1.4-2.4 4.2 0 3.2 2.8 4.3 2.8 4.3 0 .1-.4 1.5-1.4 3zM13.5 3.6C14.3 2.7 15 1.4 14.8 0c-1.2 0-2.6.7-3.4 1.7-.8.8-1.4 2.1-1.2 3.5 1.4.1 2.7-.7 3.3-1.6z"/></svg>
          Download on the App Store
        </a>
      </div>

      <div className="shots">
        {[0,1,2].map(i => (
          <div key={i} className="shot"><ProjectVisual kind="planetia"/></div>
        ))}
      </div>
      <div className="shots" style={{marginTop:18, gridTemplateColumns: 'repeat(2, 1fr)'}}>
        {[0,1].map(i => <div key={i} className="shot"><ProjectVisual kind="planetia"/></div>)}
      </div>

      <div className="feat">
        <h2>What kids can do</h2>
        <div className="feat-grid">
          {p.features.map((f, i) => (
            <div key={f.k} className="feat-item">
              <div className="chip">{String.fromCharCode(65+i)}</div>
              <div>
                <h3>{f.k}</h3>
                <p>{f.v}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SoftSpeaking(){
  const byYear = window.RG_SPEAKING.reduce((acc, e) => {
    (acc[e.year] = acc[e.year] || []).push(e); return acc;
  }, {});
  return (
    <section className="soft-page soft-speaking">
      <div className="ph-head">
        <div>
          <h1><em>Speaking</em></h1>
          <p className="sub">Talks and presentations at industry events and institutions. Usually about product, AI at scale, or news distribution.</p>
        </div>
      </div>
      {Object.entries(byYear).sort((a,b) => Number(b[0]) - Number(a[0])).map(([year, events]) => (
        <div key={year}>
          <h2 className="year">{year}</h2>
          <div className="timeline">
            {events.map((e, i) => (
              <article key={i} className="event">
                <div className="when">{e.month} · {e.date}</div>
                <div className="venue">{e.venue}</div>
                <div className="title">{e.title}</div>
                <p className="blurb">{e.blurb}</p>
                <a className="link">View details <window.Icon.Arrow width="12" height="12"/></a>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function SoftAbout(){
  const a = window.RG_ABOUT;
  return (
    <section className="soft-page soft-about">
      <div className="head">
        <div className="frame"><img src="assets/rohit-portrait.png" alt="Rohit Garg"/></div>
        <div>
          <h1>About</h1>
          <p className="sub">{a.title}</p>
        </div>
      </div>
      <div className="body">
        {a.paragraphs.map((p, i) => (
          <p key={i}>
            {i === 3 ? (
              <>
                Outside work, I&rsquo;m based in Delhi-NCR, usually stuck in traffic between Gurgaon and Noida. I have twin toddlers, which means my reading happens via audiobooks during that commute.{' '}
                <span className="hl">38 books in the last three years.</span> I wrote about it. When I&rsquo;m not doing any of that, I&rsquo;m probably tinkering with some side project that may or may not go anywhere.
              </>
            ) : p}
          </p>
        ))}
      </div>

      <div className="mentoring">
        <h3>Mentoring</h3>
        <p>{a.mentoring}</p>
      </div>

      <div className="contact">
        <h3>Get in touch</h3>
        <p>{a.contact}</p>
        <div className="actions">
          <a className="btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5.01 2.5 2.5 0 01.02-5.01zM3 9h4v12H3zM10 9h4v2.1c.8-1.3 2.3-2.3 4.3-2.3 4 0 4.7 2.3 4.7 5.7V21h-4v-5.8c0-1.4-.5-2.4-1.9-2.4-1.4 0-2.1.9-2.1 2.4V21h-4V9z"/></svg> LinkedIn</a>
          <a className="btn ghost"><window.Icon.Mail width="14" height="14"/> Email</a>
        </div>
      </div>
    </section>
  );
}

function SoftFooter(){
  return (
    <footer className="soft-foot">
      <div><div className="sig">Product and design at scale. Tinkering with AI. Notes from a product leader in Delhi-NCR.</div></div>
      <div><h4>Writing</h4><ul><li>All essays</li><li>AI</li><li>Leadership</li><li>Books</li></ul></div>
      <div><h4>Projects</h4><ul><li>Planetia · iPad</li><li>Office Survivors · game</li><li>Solar System Explorer</li></ul></div>
      <div><h4>Elsewhere</h4><ul><li>LinkedIn</li><li>Twitter / X</li><li>RSS feed</li><li>hello@rohitgarrg.com</li></ul></div>
      <div className="meta"><span>© 2026 Rohit Garg · Delhi-NCR</span><span>Built with Astro on Vercel</span></div>
    </footer>
  );
}

window.DirectionSoft = SoftRoot;
