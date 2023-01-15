import { ThemeProvider } from "@emotion/react";
import { theme } from "./components/Theme";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { List, ListItem, Paper, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
export function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          height: "calc(100vh - 56px)",
          overflow: "auto",
        }}
      >
        <Paper
          id="scrollableHome"
          style={{
            margin: "1rem 10rem 5rem 10rem ",
            padding: "1rem",
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
            Jardins de l'Ecole Lyonnaise des Plantes Médicinales & des Savoirs
            Naturels
          </Typography>

          <img
            alt="activite jardin"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "1rem",
              marginBottom: "1rem",
              borderRadius: "10px",
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
            }}
            width="70%"
            src="./activite.jpg"
          />
          <Typography variant="body1" color="white" gutterBottom>
            L’activité jardin de l’Ecole Lyonnaise de plantes médicinales a été
            impulsé en 2011 par Cathy Skipper, d’abord dans le Beaujolais puis
            en 2012 au parc de Gerland où nous avons 3 plates-bandes mises à
            notre disposition par les espaces verts de la ville de Lyon.
            <br />
            <br />
            Depuis 2019 les cours de l’Elpm ayant lieu au Lycée horticole de
            Dardilly nous y avons installé une grande plate-bande de 120m2. Plus
            de 100 espèces vues pendant les cours sont présentes tant à Gerland
            qu’au lycée horticole. Ces journées jardin offrent aux élèves des
            différentes années et à quelques anciens élèves, la possibilité de
            se rencontrer pour partager, échanger, mutualiser leurs
            connaissances autour des plantes.
            <br />
            <br /> L’attrait du public à Gerland, l’intérêt du personnel et
            professeurs du lycée horticole de Dardilly et les échanges que nous
            avons avec ces différentes personnes lors de nos journées
            d’activités valorisent l’engagement des participants.es. pour donner
            vie et entretenir ces 2 espaces. Participer à l’activité jardin
            c’est aussi l’occasion de participer, préparer et animer des
            interventions auprès du public lors de diverses manifestations :
            <List dense>
              <ListItem>
                <ArrowRightIcon />
                Distillation
              </ListItem>
              <ListItem>
                <ArrowRightIcon />
                Atelier : Sels aux herbes, Tisanes, Odeurs et parfums…
              </ListItem>
              <ListItem>
                <ArrowRightIcon />
                Visite commentée de plantes médicinales au Parc de Gerland, dans
                les serres du parc de la Tête d’or
              </ListItem>
              <ListItem>
                <ArrowRightIcon />
                Participation à la fête de la Biodiversité en mai, et la fête de
                la Courge en octobre au parc de la tête d’or
              </ListItem>
              <ListItem>
                <ArrowRightIcon />
                Participation au « troc de graines » organisée par le lycée
                horticole, distillation.
              </ListItem>
            </List>
            N’hésitez pas à venir nous rejoindre pour une ou plusieurs séances
            selon vos disponibilités, l’activitéde jardin est volontaire,
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
