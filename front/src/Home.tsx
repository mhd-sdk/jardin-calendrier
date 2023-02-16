import { ThemeProvider } from "@emotion/react";
import { theme } from "./components/Theme";
import { Swiper, SwiperSlide } from "swiper/react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import "swiper/css";
import { Paper, Typography } from "@mui/material";
import { PersonAddDisabled } from "@mui/icons-material";
export function Home(props: {
  activeTab: number;
  setActiveTab: (value: number) => void;
}) {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          overflow: "auto",
        }}
      >
        <Paper
          id="scrollableHome"
          style={{
            padding: "0rem 10rem 0rem 10rem",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Typography
            variant="h4"
            style={{
              textAlign: "center",
            }}
            gutterBottom
            color="white"
          >
            <br />
            Venez partager un moment convivial, à la rencontre des plantes
            médicinales
          </Typography>
          <br />
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                marginRight: "2rem",
              }}
            >
              <Typography
                variant="body1"
                align="justify"
                color="white"
                gutterBottom
              >
                <Typography align="justify" variant="h5">
                  Historique
                </Typography>
                L’activité jardin de l’École Lyonnaise des plantes médicinales a
                été impulsé en 2011 par Cathy Skipper, d’abord dans le
                Beaujolais puis en 2012 au parc de Gerland où nous avons 3
                plates-bandes mises à notre disposition par les espaces verts de
                la ville de Lyon. Depuis 2019 les cours de l’Elpm ayant lieu au
                Lycée horticole de Dardilly nous y avons installé une grande
                plate-bande de 120m². Plus de 100 espèces vues pendant les cours
                sont présentes tant à Gerland qu’au lycée horticole. Ces
                journées jardin offrent aux élèves des différentes années et à
                quelques anciens élèves, la possibilité de se rencontrer pour
                partager, échanger, mutualiser leurs connaissances autour des
                plantes.
                <br />
                <br />
                <Typography variant="h5">Objectifs</Typography>
                <ul
                  style={{
                    marginTop: "0",
                  }}
                >
                  <li>
                    Proposer aux élèves Herbalistes une expérience pratique de
                    jardin de plantes médicinales : mieux connaître les plantes,
                    leurs usages, les modes de récoltes, les préparations… 
                  </li>
                  <li>
                    Se retrouver entre Herbalistes en cours de formation et
                    Herbalistes ayant terminé le cursus pour partager, échanger
                    et mutualiser leurs connaissances autour des plantes 
                  </li>
                  <li>
                    Présenter au grand public tous les bienfaits des plantes
                    médicinales.
                  </li>
                </ul>
              </Typography>
            </div>

            <div
              style={{
                // center vertically content
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                textAlign: "center",
              }}
            >
              <img
                alt="activite jardin"
                style={{
                  display: "block",
                  boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
                }}
                width="100%"
                src="./activite.jpg"
              />
            </div>
          </div>
          <Typography
            style={{
              color: "white",
              // paddingLeft: "15rem",
              paddingRight: "25rem",
            }}
            align="justify"
          >
            <Typography color="white" variant="h5">
              En pratique
            </Typography>
            Des journées sont organisées toutes au long de l’année (voir
            Calendrier) pour entretenir le jardin. Nous avons à notre
            disposition tout le matériel nécessaire pour semer, planter, tailler
            et arroser. 3 journées par an sont réservées par année de formation.
            Une activité différente est proposée en fonction de l’année de
            formation. <br />
            Exemples d’activités proposées:
            <ul
              style={{
                marginTop: "0",
                textAlign: "justify",
              }}
            >
              <li>
                Pour les 1ères années: découverte de la flore de Jeanne Covillot
                (disponible en vente à l’ELPM)
              </li>
              <li>
                Pour les 2èmes années: atelier fabrication* d’un baume avec
                utilisation des plantes du jardin
              </li>
              <li>
                Visite commentée de plantes médicinales au Parc de Gerland, dans
                les serres du parc de la Tête d’or
              </li>
              <li>Pour les 3èmes années: atelier fabrication* d’un savon.</li>
            </ul>
            * il s’agit d’une démonstration. Les participants ne repartent pas
            avec les produits préparés.
            <br /> Pour permettre à l’équipe des Jardins d’Herbaliste
            d’organiser ces journées, merci de bien vouloir vous inscrire via la{" "}
            <span
              onClick={() => props.setActiveTab(2)}
              style={{
                // link
                color: "white",
                textDecoration: "underline",
                cursor: "pointer",
                margin: "0px",
              }}
            >
              page Activités
            </span>{" "}
            en cliquant sur l’icône
            <span
              style={{
                marginLeft: "0.5rem",
              }}
            >
              <PersonAddIcon />
            </span>
          </Typography>
          <br />
          <Typography
            style={{
              color: "white",
              // paddingLeft: "15rem",
              paddingRight: "25rem",
            }}
            align="justify"
          >
            <Typography color="white" variant="h5">
              Les points positifs des jardins d'herbalistes
            </Typography>
            <ul
              style={{
                marginTop: "0",
                textAlign: "justify",
              }}
            >
              <li>
                L’attrait du public à Gerland, l’intérêt du personnel et
                professeurs du lycée horticole de Dardilly et les échanges que
                nous avons avec ces différentes personnes lors de nos journées
                d’activités valorisent l’engagement des participant(e)s pour
                donner vie et entretenir ces 2 espaces.
              </li>
              <li>
                Participer à l’activité jardin c’est aussi l’occasion de
                participer, préparer et animer des interventions auprès du
                public lors de diverses manifestations via l’association Graines
                et Nature{" "}
                <span
                  style={{
                    // link
                    color: "white",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => props.setActiveTab(1)}
                >
                  (voir page dédiée)
                </span>
                :
              </li>
            </ul>
            N’hésitez pas à venir nous rejoindre pour une ou plusieurs séances
            selon vos disponibilités, l’activité de jardin est volontaire,
            gratuite, sans engagement dans le temps.
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2rem",
              marginTop: "2rem",
              alignItems: "top",
            }}
          >
            <div
              style={{
                width: "45%",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  textAlign: "center",
                }}
                color="white"
                gutterBottom
              >
                Jardin à DARDILLY
              </Typography>
              <Typography
                variant="body1"
                style={{
                  textAlign: "center",
                }}
                color="white"
                gutterBottom
              >
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      width="100%"
                      height="400px"
                      src="https://maps.google.com/maps?q=26%20chemin%20de%20la%20Bruy%C3%A8re%20-%2069570%20DARDILLY&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    />
                  </div>
                </div>
                Lycée Horticole de l’Environnement & Paysage <br />
                26 chemin de la Bruyère - 69570 DARDILLY <br />
              </Typography>
            </div>
            <div
              style={{
                width: "45%",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  textAlign: "center",
                }}
                color="white"
                gutterBottom
              >
                Jardin à GERLAND
              </Typography>

              <Typography
                style={{
                  textAlign: "center",
                }}
                variant="body1"
                color="white"
                gutterBottom
              >
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      width="100%"
                      height="400px"
                      src="https://maps.google.com/maps?q=24%20all%C3%A9e%20Pierre%20de%20Coubertin%2069007%20Lyon&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    />
                  </div>
                </div>
                La Maison des fleurs : située Allée des Iris : Entrée la plus
                proche du parc Rue Coubertin. 24 allée Pierre de Coubertin 69007
                Lyon <br />
              </Typography>
            </div>
          </div>
        </Paper>
      </div>
    </ThemeProvider>
  );
}
