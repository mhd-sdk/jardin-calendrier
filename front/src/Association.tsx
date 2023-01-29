import { Typography } from "@mui/material";
import React from "react";
import { theme } from "./components/Theme";

type Props = {};

export default function Association({}: Props) {
  return (
    <div
      style={{
        padding: "3rem 3rem 2rem 3rem",
        backgroundColor: theme.palette.primary.main,
        height: "calc(100vh - 138px)",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <img
        style={{
          display: "block",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
          marginRight: "2rem",
        }}
        src="graine-et-nature.png"
        alt=""
      />
      <Typography
        style={{
          display: "block",
          overflow: "auto",
        }}
        variant="body1"
        color="white"
        gutterBottom
      >
        <Typography variant="h5">Historique</Typography>
        L’association Graines et Nature émane du Jardin d’Herbaliste. En effet
        c’est au sein du groupe jardin qu’a pris forme l’idée d’une association
        ou, les élèves des différentes années pourraient partager les
        connaissances nouvellement acquises et leur mise en application. Peu à
        peu le projet a pris forme et a été soumis à la direction de l’ELPM. En
        décembre 2014, l’association est née en partenariat avec l’ELPM. Elle
        est ouverte à tous les élèves herbalistes, nouveaux et anciens.
        <br />
        <br />
        <Typography variant="h5">Objectifs</Typography>
        <ul
          style={{
            marginTop: "0",
            marginBottom: "0",
          }}
        >
          <li>
            Proposer des activités spécifiques par année de formation
            d’Herbaliste,
          </li>
          <li>
            Réaliser des animations après de diverses institutions (EHPAD, MJC,
            écoles…),
          </li>
        </ul>
        <br />
        <Typography variant="h5">En pratique</Typography>
        Pour cela, nous nous rencontrons régulièrement et intervenons auprès de
        diverses institutions (EHPAD, MJC, écoles…) pour des animations autour
        des plantes médicinales tout au long de l’année. Le principe consiste à
        ce que les adhérents les plus expérimentés encadrent les plus novices
        pour progresser dans la pratique. Nous pensons qu’il est indispensable
        de passer à la pratique le plus souvent possible, et cette association
        en est un moyen.
        <br />
        <br />
        <Typography variant="h5">Animations proposées:</Typography>
        <ul
          style={{
            marginTop: "0",
            marginBottom: "0",
          }}
        >
          <li>Distillation</li>
          <li>
            Ateliers divers : sels aux herbes, tisanes, odeurs et parfums,
            cosmétiques et produits d’hygiène
          </li>
          <li>
            Visites commentées de plantes médicinales au parc de Gerland et dans
            les serres du parc de la Tête d’Or
          </li>
          <li>Découverte botanique pour les écoliers</li>
          <li>
            Tenue d’un stand aux « Rendez-vous de la biodiversité » à Lyon au
            printemps ;
          </li>
          <li>
            Tenue d’un stand à la fête de la Courge au parc de la Tête d’Or en
            automne,
          </li>
          <li>
            Participation à la Quinzaine du développement durable de Dardilly :
            distillation, atelier tisanes, sirop, sel aux herbes, macérations
          </li>
          <li>
            Participation au « Troc de graines » organisée par le Lycée
            Horticole de Dardilly.
          </li>
        </ul>
        <br />
        Nous vous attendons nombreux pour venir partager avec nous une
        expérience enrichissante de rencontre et de partage avec les enfants,
        les personnes âgées les personnes de tout bord qui sont de plus en plus
        curieuses et attirées par les plantes médicinales. Pour plus de
        renseignements, contacter Marie Claire par mail : mc.parizot@orange.fr
      </Typography>
    </div>
  );
}
