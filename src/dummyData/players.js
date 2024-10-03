import images from "../utils/images";

  const playersData = [
    { "id": 1, "name": "O. Evans", "full_name":"Evans Owusu", "image":images.evans, "team": "FCS", "jersey":images.nsoatremanKit, "position": "MID", "price": 9.5, "points": 120, "availaility": "100%", "isCaptain": false },
    { "id": 2, "name": "Asare", "full_name":"Frederick Asare", "team": "AKS", "jersey":images.aduanaKit, "image":images.asare, "position": "GK", "price": 5.5, "points": 33, "availaility": "100%", "isCaptain": false },
    { "id": 3, "name": "D. Awuni", "full_name":"Daniel Awuni", "team": "AHL", "jersey":images.heartOfLionsKit, "image":images.awuni, "position": "MID", "price": 7.5, "points": 88, "availaility": "100%", "isCaptain": false },
    { "id": 5, "name": "A. Okrah", "full_name":"Augustine Okrah", "team": "BUN", "jersey":images.nsoatremanKit, "image":images.evans, "position": "MID", "price": 8.0, "points": 60, "availaility": "100%", "isCaptain": false },
    { "id": 4, "name": "E. Baffour", "full_name":"Emmanuel Baffour", "team": "AKS", "jersey":images.aduanaKit, "image":images.evans, "position": "MID", "price": 7.5, "points": 63, "availaility": "100%", "isCaptain": false },
    { "id": 6, "name": "F. Zakaria", "full_name":"Fuseini Zakaria", "team": "BRE", "jersey":images.nsoatremanKit, "image":images.evans, "position": "DEF", "price": 4.5, "points": 43, "availaility": "100%", "isCaptain": false },
    { "id": 7, "name": "K. Baah", "full_name":"Kofi Baah", "team": "FCS", "jersey":images.nsoatremanKit, "image":images.asare, "position": "GK", "price": 4.5, "points": 24, "availaility": "100%", "isCaptain": false },
    { "id": 8, "name": "M. Ali", "full_name":"Muhammed Ali", "team": "AHL", "jersey":images.heartOfLionsKit, "image":images.evans, "position": "DEF", "price": 4.5, "points": 45, "availaility": "100%", "isCaptain": false },
    { "id": 9, "name": "S. Apiiga", "full_name":"Salifu Apiiga", "team": "AHL", "jersey":images.heartOfLionsKit, "image":images.evans, "position": "DEF", "price": 4.5, "points": 47, "availaility": "100%", "isCaptain": false },
    { "id": 10, "name": "K. Yiadom", "full_name":"Konadu Yiadom", "team": "AHO", "jersey":images.heartsKit, "image":images.evans, "position": "DEF", "price": 5.0, "points": 40, "availaility": "100%", "isCaptain": false },
    { "id": 11, "name": "E. Annor", "full_name":"Emmanuel Annor", "team": "BUN", "jersey":images.aduanaKit, "image":images.evans, "position": "MID", "price": 6.5, "points": 43, "availaility": "100%", "isCaptain": false },
    { "id": 12, "name": "Kuka", "full_name":"Issah Kuka", "team": "AKS", "image":images.evans, "position": "FWD", "jersey":images.aduanaKit, "price": 9.5, "points": 98, "availaility": "100%", "isCaptain": false },
    { "id": 13, "name": "D. Fordjour", "full_name":"Daniel Fordjour", "team": "MSC", "jersey":images.aduanaKit, "image":images.evans, "position": "MID", "price": 7.5, "points": 82, "availaility": "100%", "isCaptain": false },
    { "id": 14, "name": "H. Issah", "full_name":"Hamza Issah", "team": "AHO", "jersey":images.heartsKit, "image":images.evans, "position": "FWD", "price": 8.0, "points": 72, "availaility": "100%", "isCaptain": false },
    { "id": 15, "name": "M. Afriyie", "full_name":"Micheal Afriyie", "team": "BRE", "jersey":images.heartsKit, "image":images.awuni, "position": "FWD", "price": 8.5, "points": 88, "availaility": "100%", "isCaptain": false },
    { "id": 16, "name": "Esso", "full_name":"Joseph Esso", "team": "DFC", "jersey":images.heartsKit, "image":images.awuni, "position": "FWD", "price": 9.5, "points": 95, "availaility": "75%", "isCaptain": false },
    { "id": 17, "name": "D. Taylor", "full_name":"Diawusi Taylor", "team": "MSC", "jersey":images.heartOfLionsKit, "image":images.awuni, "position": "FWD", "price": 9.5, "points": 115, "availaility": "50%", "isCaptain": false },
    { "id": 18, "name": "J. Antwi", "full_name":"John Antwi", "team": "DFC", "jersey":images.heartsKit, "image":images.awuni, "position": "FWD", "price": 9.5, "points": 98, "availaility": "25%", "isCaptain": false },
    { "id": 19, "name": "R. Frimpong", "full_name":"Ronald Frimpong", "team": "GSC", "jersey":images.goldstarsKit, "image":images.awuni, "position": "FWD", "price": 8.5, "points": 100, "availaility": "100%", "isCaptain": false },
    { "id": 20, "name": "K. Osae", "full_name":"Kwadwo Osae", "team": "AHL", "jersey":images.heartOfLionsKit, "image":images.asare, "position": "GK", "price": 4.5, "points": 36, "availaility": "75%", "isCaptain": false },
    { "id": 21, "name": "B. Asare", "full_name":"Benjamin Asare", "team": "AHO", "jersey":images.heartsKit, "image":images.asare, "position": "GK", "price": 5.5, "points": 40, "availaility": "50%", "isCaptain": false },
    { "id": 22, "name": "Y. Ansah", "full_name":"Yaw Ansah", "team": "ADS", "jersey":images.aduanaKit, "image":images.asare, "position": "GK", "price": 5.5, "points": 43, "availaility": "25%", "isCaptain": false },
    { "id": 23, "name": "L. Amoah", "full_name":"Lord Amoah", "team": "AKS", "jersey":images.aduanaKit, "image":images.awuni, "position": "DEF", "price": 6.5, "points": 83, "availaility": "50%", "isCaptain": false },
    { "id": 24, "name": "M. Fuseini", "full_name":"Mohamed Fuseini", "team": "LEG", "jersey":images.goldstarsKit, "image":images.awuni, "position": "DEF", "price": 4.5, "points": 35, "availaility": "75%", "isCaptain": false },
    { "id": 25, "name": "R. Acquaah", "full_name":"Ruben Acquaah", "team": "NSO", "jersey":images.nsoatremanKit, "image":images.awuni, "position": "DEF", "price": 5.5, "points": 55, "availaility": "50%", "isCaptain": false },
    { "id": 26, "name": "Manaf", "full_name":"Abdul Manaf", "team": "NSO", "jersey":images.nsoatremanKit, "image":images.awuni, "position": "MID", "price": 7.5, "points": 80, "availaility": "100%", "isCaptain": false },
    { "id": 27, "name": "Blay", "full_name":"Justice Blay", "team": "AKS", "jersey":images.aduanaKit, "image":images.awuni, "position": "MID", "price": 8.0, "points": 79, "availaility": "100%", "isCaptain": false },
    { "id": 28, "name": "K. Seth", "full_name":"Kwadwo Seth", "team": "BUN", "jersey":images.goldstarsKit, "image":images.awuni, "position": "MID", "price": 6.5, "points": 56, "availaility": "100%", "isCaptain": false },
    { "id": 29, "name": "E. Antwi", "full_name":"Emmanuel Antwi", "team": "AKS", "jersey":images.aduanaKit, "image":images.awuni, "position": "MID", "price": 7.0, "points": 63, "availaility": "100%", "isCaptain": false }
  ]

  export default playersData;