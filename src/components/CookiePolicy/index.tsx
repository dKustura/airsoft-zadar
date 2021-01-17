import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

// Components
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

// Helpers
import messages from './messages';
import { useStyles } from './styles';
import UnderlinedLink from 'components/UnderlinedLink';
import { browserCookieLinks } from './contants';

interface Props {}

const CookiePolicy = (props: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item>
          <Typography variant="h1">
            <FormattedMessage {...messages.pageTitle} />
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.contentContainer}>
        <Grid item className={classes.contentSection}>
          <Typography>
            Naša politika o kolačićima objašnjava što su kolačići, kako mi
            koristimo kolačiće, kakav izbor imate u vezi kolačića i kako možete
            pronaći dodatne informacije o kolačićima.
          </Typography>
        </Grid>
        <Grid container className={classes.contentSection}>
          <Grid item xs={12} style={{ paddingBottom: '1rem' }}>
            <Typography variant="h4" component="h2">
              Što su kolačići?
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography>
                Kolačić je informacija spremljena na vaše računalo od strane web
                stranice koju posjetite. Kolačići obično spremaju vaše postavke,
                postavke za web stranicu, kao što su preferirani jezik ili
                adresa. Kasnije, kada opet otvorite istu web stranicu,
                internetski preglednik šalje natrag kolačiće koji pripadaju toj
                stranici. Ovo omogućava stranici da prikaže informacije
                prilagođene vašim potrebama.
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                Kolačići mogu spremati širok raspon informacija uključujući
                osobne informacije (kao što je vaše ime ili adresa e-pošte).
                Ipak, ova informacija može biti spremljena jedino ako vi to
                omogućite – web stranice ne mogu dobiti pristup informacijama
                koji im niste dali i ne mogu pristupiti drugim datotekama na
                vašem računalu. Zadane aktivnosti spremanja i slanja kolačića
                nisu vam vidljive. Ipak, postavke internetskog preglednika
                možete promijeniti i tako sami izabrati hoćete li zahtjeve za
                spremanje kolačića odobriti ili odbiti, te pobrisati spremljene
                kolačiće automatski pri zatvaranju internetskog preglednika i
                slično.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.contentSection}>
          <Grid item xs={12} style={{ paddingBottom: '1rem' }}>
            <Typography variant="h4" component="h2">
              Kakve kolačiće koristimo i zašto?
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography>
                Privremeni kolačići ili kolačići sesije uklanjaju se s računala
                po zatvaranju internetskog preglednika. Pomoću njih web-mjesta
                pohranjuju privremene podatke, poput stavki u košarici za
                kupnju. Mi ih koristimo da omogućimo pristup sadržaju. Trajni
                ili spremljeni kolačići ostaju na računalu nakon zatvaranja
                internetskog preglednika. Pomoću njih web-mjesta pohranjuju
                podatke, kao što su ime za prijavu i zaporka, tako da se ne
                morate prijavljivati prilikom svakog posjeta određenom mjestu.
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                Trajni kolačići ostat će na računalu danima, mjesecima, čak i
                godinama. Mi koristimo trajne kolačiće kako bismo bolje
                razumjeli navike korisnika, tako da možemo poboljšati stranicu
                prema vašim navikama. Ova informacija je anonimna – ne vidimo
                individualne podatke korisnika.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.contentSection}>
          <Grid item xs={12} style={{ paddingBottom: '1rem' }}>
            <Typography variant="h4" component="h2">
              Popis kolačića
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="cookie table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Kolačić</TableCell>
                    <TableCell align="center">Ime</TableCell>
                    <TableCell align="center">Svrha</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Google Analytics
                    </TableCell>
                    <TableCell>_ga</TableCell>
                    <TableCell>
                      Ove kolačiće koristimo radi skupljanja informacija o tome
                      kako posjetitelji koriste našu web stranicu. Ove
                      informacije koristimo za izradu izvještaja i poboljšanje
                      stranice. Kolačići prikupljaju informacije u anonimnom
                      obliku, uključujući i broj posjetitelja web stranice, od
                      kuda posjetitelji dolaze na web stranicu i pojedinačne
                      stranice koje posjećuju. Ako ne dopustite ove kolačiće, mi
                      vaš posjet nećemo uključiti u našu statistiku.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid container className={classes.contentSection}>
          <Grid item xs={12} style={{ paddingBottom: '1rem' }}>
            <Typography variant="h4" component="h2">
              Kakav izbor imate u vezi kolačića
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography>
                Isključivanjem kolačića odlučujete da nećete dopustiti
                pohranjivanje kolačića na vašem računalu. Postavke kolačića mogu
                se kontrolirati i konfigurirati u vašem internet pregledniku. Za
                informacije o postavkama kolačića, odaberite Internet preglednik
                koji koristite.
              </Typography>
            </Grid>
            <Grid item>
              <ul>
                {browserCookieLinks.map((link) => (
                  <li key={link.label}>
                    <UnderlinedLink
                      isExternal
                      variant="body1"
                      to={intl.formatMessage(link.translation)}
                    >
                      {link.label}
                    </UnderlinedLink>
                  </li>
                ))}
              </ul>
              <Typography></Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.contentSection}>
          <Grid item xs={12} style={{ paddingBottom: '1rem' }}>
            <Typography variant="h4" component="h2">
              Izmjene naše politike o kolačićima
            </Typography>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography>
                Svaku buduću izmjenu naše politike o kolačićima objavit ćemo na
                ovoj stranici. Molimo vas da povremeno posjetite ovu stranicu
                radi informiranja o mogućim izmjenama naše politike o
                kolačićima. Ova politika o kolačićima posljednji put je
                izmijenjena 1. veljače 2021. godine i zamjenjuje svaku drugu
                politiku o kolačićima koja je važila prije tog datuma.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CookiePolicy;
