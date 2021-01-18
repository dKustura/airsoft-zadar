import { defineMessages } from 'react-intl';

const messages = defineMessages({
  pageTitle: 'Politika kolačića',
  cookiePolicyIntro: `Naša politika o kolačićima objašnjava što su kolačići, kako mi
  koristimo kolačiće, kakav izbor imate u vezi kolačića i kako možete
  pronaći dodatne informacije o kolačićima.`,
  whatAreCookies: 'Što su kolačići?',
  whatAreCookiesDescription1: `Kolačić je informacija spremljena na vaše računalo od strane web
  stranice koju posjetite. Kolačići obično spremaju vaše postavke,
  postavke za web stranicu, kao što su preferirani jezik ili
  adresa. Kasnije, kada opet otvorite istu web stranicu,
  internetski preglednik šalje natrag kolačiće koji pripadaju toj
  stranici. Ovo omogućava stranici da prikaže informacije
  prilagođene vašim potrebama.`,
  whatAreCookiesDescription2: `Kolačići mogu spremati širok raspon informacija uključujući
  osobne informacije (kao što je vaše ime ili adresa e-pošte).
  Ipak, ova informacija može biti spremljena jedino ako vi to
  omogućite – web stranice ne mogu dobiti pristup informacijama
  koji im niste dali i ne mogu pristupiti drugim datotekama na
  vašem računalu. Zadane aktivnosti spremanja i slanja kolačića
  nisu vam vidljive. Ipak, postavke internetskog preglednika
  možete promijeniti i tako sami izabrati hoćete li zahtjeve za
  spremanje kolačića odobriti ili odbiti, te pobrisati spremljene
  kolačiće automatski pri zatvaranju internetskog preglednika i
  slično.`,
  whichCookiesWeUse: 'Kakve kolačiće koristimo i zašto?',
  whichCookiesWeUseDescription1: `Privremeni kolačići ili kolačići sesije uklanjaju se s računala
  po zatvaranju internetskog preglednika. Pomoću njih web-mjesta
  pohranjuju privremene podatke, poput stavki u košarici za
  kupnju. Mi ih koristimo da omogućimo pristup sadržaju. Trajni
  ili spremljeni kolačići ostaju na računalu nakon zatvaranja
  internetskog preglednika. Pomoću njih web-mjesta pohranjuju
  podatke, kao što su ime za prijavu i zaporka, tako da se ne
  morate prijavljivati prilikom svakog posjeta određenom mjestu.`,
  whichCookiesWeUseDescription2: `Trajni kolačići ostat će na računalu danima, mjesecima, čak i
  godinama. Mi koristimo trajne kolačiće kako bismo bolje
  razumjeli navike korisnika, tako da možemo poboljšati stranicu
  prema vašim navikama. Ova informacija je anonimna – ne vidimo
  individualne podatke korisnika.`,
  cookiesList: 'Popis kolačića',
  tableHeaderCookie: 'Kolačić',
  tableHeaderName: 'Ime',
  tableHeaderPurpose: 'Svrha',
  googleAnalyticsCookie: 'Google Analytics',
  googleAnalyticsCookieName: '_ga',
  googleAnalyticsCookiePurpose: `Ove kolačiće koristimo radi skupljanja informacija o tome
  kako posjetitelji koriste našu web stranicu. Ove
  informacije koristimo za izradu izvještaja i poboljšanje
  stranice. Kolačići prikupljaju informacije u anonimnom
  obliku, uključujući i broj posjetitelja web stranice, od
  kuda posjetitelji dolaze na web stranicu i pojedinačne
  stranice koje posjećuju. Ako ne dopustite ove kolačiće, mi
  vaš posjet nećemo uključiti u našu statistiku.`,
  optionsRegardingCookies: 'Kakav izbor imate u vezi kolačića',
  optionsRegardingCookiesDescription1: `Isključivanjem kolačića odlučujete da nećete dopustiti
  pohranjivanje kolačića na vašem računalu. Postavke kolačića mogu
  se kontrolirati i konfigurirati u vašem internet pregledniku. Za
  informacije o postavkama kolačića, odaberite Internet preglednik
  koji koristite.`,
  optionsRegardingCookiesDescription2: `Imajte na umu, blokiranjem kolačića i dalje možete pregledavati
  ovu web stranicu, no neke njezine mogućnosti vam možda neće biti
  dostupne.`,
  optionsRegardingCookiesDescription3: `Ako želite saznati više o kolačićima, uključujući i informacije
  o tome kako se kolačići postavljaju te kako možete upravljati
  njima ili ih isključiti, posjetite `,
  optionsRegardingCookiesDescriptionLinkSeparator: ' ili ',
  optionsRegardingCookiesDescription4: ` Ako želite
  onemogućiti praćenje putem servisa Google Analytics na svim web
  smjestima, posjetite web stranicu `,
  changesToCookiePolicy: 'Izmjene naše politike o kolačićima',
  changesToCookiePolicyDescription: `Svaku buduću izmjenu naše politike o kolačićima objavit ćemo na
  ovoj stranici. Molimo vas da povremeno posjetite ovu stranicu
  radi informiranja o mogućim izmjenama naše politike o
  kolačićima. Ova politika o kolačićima posljednji put je
  izmijenjena 1. veljače 2021. godine i zamjenjuje svaku drugu
  politiku o kolačićima koja je važila prije tog datuma.`,
});

export const browserCookieLinkMessages = defineMessages({
  chrome: 'https://support.google.com/accounts/answer/61416?hl=hr',
  firefox:
    'https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US',
  internetExplorer:
    'https://support.microsoft.com/hr-hr/topic/upravljanje-kola%C4%8Di%C4%87ima-i-njihovo-brisanje-168dab11-0753-043d-7c16-ede5947fc64d',
  opera: 'https://help.opera.com/en/latest/web-preferences/',
  safari: 'https://support.apple.com/hr-hr/guide/safari/sfri11471/mac',
});

export default messages;
