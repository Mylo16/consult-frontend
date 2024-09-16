import React from "react";
import images from "./images";

const Matches = [
  {
    matchday: 1,
    home: "Kotoko",
    home_logo: images.kotoko,
    away: "Medeama",
    kickoff: "12:30",
    away_logo: images.medeama,
    date: "14 September 2024"
  },
  {
    matchday: 1,
    home: "Hearts",
    home_logo: images.hearts,
    away: "Karela",
    kickoff: "13:00",
    away_logo: images.karela,
    date: "15 September 2024"
  },
  {
    matchday: 1,
    home: "Nations",
    home_logo: images.nations,
    away: "Berekum CHE",
    kickoff: "13:00",
    away_logo: images.berekum,
    date: "15 September 2024",
  },
  {
    matchday: 1,
    home: "Samartex",
    home_logo: images.samartex,
    away: "Nsoatreman",
    kickoff: "15:00",
    away_logo: images.nsoatreman,
    date: "14 September 2024",
  },
  {
    matchday: 1,
    home: "Legon Cities",
    home_logo: images.legon,
    away: "Bechem Utd",
    kickoff: "15:00",
    away_logo: images.bechem,
    date: "14 September 2024",
  },
  {
    matchday: 1,
    home: "Aduana",
    home_logo: images.aduana,
    away: "Dreams",
    kickoff: "15:00",
    away_logo: images.dreams,
    date: "14 September 2024",
  },
  {
    matchday: 1,
    home: "Accra Lions",
    home_logo: images.lions,
    away: "Hrts. of Lions",
    kickoff: "16:30",
    away_logo: images.heartsOfLions,
    date: "15 September 2024",
  },
  {
    matchday: 1,
    home: "Bofoakwa",
    home_logo: images.bofoakwa,
    away: "RTU",
    kickoff: "16:30",
    away_logo: images.rtu,
    date: "15 September 2024",
  },
  {
    matchday: 1,
    home: "Goldstars",
    home_logo: images.goldstars,
    away: "Olympics",
    kickoff: "15:00",
    away_logo: images.olympics,
    date: "14 September 2024",
  },
];

// Helper function to format and compare dates
const parseDateAndTime = (match) => {
  const [day, month, year] = match.date.split(" ");
  const months = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
  };
  const fullDate = new Date(year, months[month], day);

  // Split kickoff time into hours and minutes
  const [hours, minutes] = match.kickoff.split(":").map(Number);

  // Combine the date and time into one Date object
  fullDate.setHours(hours);
  fullDate.setMinutes(minutes);

  return fullDate;
};

// Sort the matches based on date and kickoff
const sortedMatches = Matches.sort((a, b) => {
  const dateA = parseDateAndTime(a);
  const dateB = parseDateAndTime(b);
  return dateA - dateB;
});

// Group matches by date
const groupedMatches = sortedMatches.reduce((acc, match) => {
  if (!acc[match.date]) {
    acc[match.date] = [];
  }
  acc[match.date].push(match);
  return acc;
}, {});

export default groupedMatches;
