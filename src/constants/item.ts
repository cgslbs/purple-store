import { Item } from '@/interfaces'
import { AgenciesEnum } from './agency'

//   {
//   name: string;
//   requirement?: string;
//   bonusStatus?: AgenciesEnum[];
//   section: StoreSectionEnum;
//   }

export enum SpecificItemEnum {
	INDIE,
	FOOTBALL,
	MANAGER,
	PHOTOGRAPH,
	DIET,
	MUA,
	CHOREO,
}

export const SPECFIC_SECTION = [
	{ label: 'Manager', value: SpecificItemEnum.MANAGER },
	{ label: 'PHOTOGRAPHE & CAMÉRAMAN', value: SpecificItemEnum.PHOTOGRAPH },
	{ label: 'DIÉTÉTICIEN & ENTRAÎNEUR', value: SpecificItemEnum.DIET },
	{ label: 'Styliste & Makeup Artist', value: SpecificItemEnum.MUA },
	{ label: 'Chorégraphe', value: SpecificItemEnum.CHOREO },
	{ label: 'Indépendants', value: SpecificItemEnum.INDIE },
	{ label: 'Footballeurs', value: SpecificItemEnum.FOOTBALL },
]

export const DEFAULT_ITEM: Item[] = [
	{
		id: 1,
		name: 'single',
	},
	{ id: 2, name: 'commercial mv (single)' },
	{
		id: 3,
		name: 'mini album (2 à 4 chansons)',
	},
	{
		id: 4,
		name: 'mini album (5 à 7 chansons)',
	},
	{
		id: 5,
		name: 'full album (8 à 12 chansons)',
	},
	{
		id: 6,
		name: 'repack album',
	},
	{
		id: 7,
		name: 'double release',
	},
	{
		id: 8,
		name: "conversion jpn ou chn d'un single kr",
		bonusStatus: [AgenciesEnum.XY],
	},
	{
		id: 9,
		name: 'single jpn ou chn',
		bonusStatus: [AgenciesEnum.XY],
	},
	{
		id: 10,
		name: 'single anglais',
	},
	{
		id: 11,
		name: 'featuring',
	},
	{
		id: 12,
		name: 'collaboration',
	},
	{
		id: 13,
		name: 'ost',
	},
	{
		id: 14,
		name: 'expérience',
	},
	{
		id: 15,
		name: 'faire une dance practice',
	},
	{
		id: 16,
		name: 'photoshoot',
		bonusStatus: [AgenciesEnum.WM],
	},
	{
		id: 17,
		name: 'couverture de magazine (3★)',
		bonusStatus: [AgenciesEnum.WM],
	},
	{
		id: 18,
		name: 'interview magazine',
	},
	{
		id: 19,
		name: 'interview vidéo (ex. elle)',
	},
	{
		id: 20,
		name: 'commercials',
		bonusStatus: [AgenciesEnum.WM],
	},
	{
		id: 21,
		name: 'bonus égérie: participer à un photoshoot / cf',
	},
	{
		id: 22,
		name: "face d'une marque kr (2★)",
	},
	{
		id: 23,
		name: "face d'une marque inter (3★)",
	},
	{
		id: 24,
		name: "ambassadeur d'une marque kr (3★)",
	},
	{
		id: 25,
		name: "ambassadeur d'une marque internationale (4★)",
	},
	{
		id: 26,
		name: 'réaliser des campagnes publicitaires',
	},
	{
		id: 27,
		name: 'bonus égérie: post sur les réseaux en partenariat avec une marque',
	},
	{
		id: 28,
		name: "être mc d'une émission",
		bonusStatus: [AgenciesEnum.MC],
	},
	{
		id: 29,
		name: "faire partie du casting d'une émission",
	},
	{
		id: 30,
		name: 'apparition dans une émission',
	},
	{
		id: 31,
		name: 'bonus skill face: émission',
	},
	{
		id: 32,
		name: "être mc d'un music show",
	},
	{
		id: 33,
		name: 'avoir son talk show (radio)',
	},
	{
		id: 34,
		name: 'nouvelle saison talk show',
	},
	{
		id: 35,
		name: 'participer à un radio show',
	},
	{
		id: 36,
		name: 'apparaître dans un m/v',
	},
	{
		id: 37,
		name: 'youtube (1 mois)',
	},
	{
		id: 38,
		name: 'youtube (15jrs)',
	},
	{
		id: 39,
		name: 'bonus gnation: poster sur youtube',
	},
	{
		id: 40,
		name: 'faire certifier ses réseaux',
	},
	{
		id: 41,
		name: 'réaliser des teasers pour son cb',
	},
	{
		id: 42,
		name: 'vlive countdown',
	},
	{
		id: 43,
		name: 'fans meetings',
	},
	{
		id: 44,
		name: 'instagram live promotionnel',
	},
	{
		id: 45,
		name: 'showcase',
	},
	{
		id: 46,
		name: 'promotions (studio choom, relay dance, live…)',
	},
	{
		id: 47,
		name: 'inscription music show (petit budget)',
	},
	{
		id: 48,
		name: 'inscription music show (gros budget)',
	},
	{
		id: 49,
		name: 'radio',
	},
	{
		id: 50,
		name: 'promotion télévisé (weekly idoles...)',
	},
	{
		id: 51,
		name: 'affiches promotionnelles station métro/bus',
	},
	{
		id: 52,
		name: 'affiches promotionnelles coex kpop square (2★)',
	},
	{
		id: 53,
		name: 'production d’une tt (crédité)',
		bonusStatus: [AgenciesEnum.MT],
	},
	{
		id: 54,
		name: 'production d’une tt (non crédité)',
	},
	{
		id: 55,
		name: 'production d’une b-side',
		bonusStatus: [AgenciesEnum.MT],
	},
	{
		id: 56,
		name: 'production 3 b-sides',
		bonusStatus: [AgenciesEnum.MT],
	},
	{
		id: 57,
		name: 'production d’une ost',
	},
	{
		id: 58,
		name: "participer à la chorégraphie d'une émission",
	},
	{
		id: 59,
		name: 'chorégraphie',
	},
	{
		id: 60,
		name: 'direction artistique',
	},
	{
		id: 61,
		name: '2nd rôle (drama)',
		bonusStatus: [AgenciesEnum.A7],
	},
	{
		id: 62,
		name: 'lead rôle (drama)',
		bonusStatus: [AgenciesEnum.A7],
	},
	{
		id: 63,
		name: '2nd rôle (film)',
		bonusStatus: [AgenciesEnum.A7],
	},
	{
		id: 64,
		name: 'lead rôle (film)',
		bonusStatus: [AgenciesEnum.A7],
	},
	{
		id: 65,
		name: 'caméo (drama ou film)',
		bonusStatus: [AgenciesEnum.A7],
	},
	{
		id: 66,
		name: 'participer à un masterclass (1jr)',
	},
	{
		id: 67,
		name: 'participer à un séminaire (2 à 3 jrs)',
	},
	{
		id: 68,
		name: 'album physique (simple)',
	},
	{
		id: 69,
		name: 'album physique (différentes versions)',
	},
	{
		id: 70,
		name: 'album physique (members versions)',
	},
	{
		id: 71,
		name: 'photobook & concert dvd',
	},
	{
		id: 72,
		name: 'photobook',
	},
	{
		id: 73,
		name: 'season’s greetings',
	},
	{
		id: 74,
		name: 'official fanclub membership',
	},
	{
		id: 75,
		name: 'lightstick',
	},
	{
		id: 76,
		name: 'goodies divers',
	},
	{
		id: 77,
		name: 'vlive solo',
	},
	{
		id: 78,
		name: 'vlive groupe',
	},
	{
		id: 79,
		name: 'vlive anniversaire',
	},
	{
		id: 80,
		name: 'affiches anniversaire',
	},
	{
		id: 81,
		name: 'coffee event (anniversaire ou cb)',
	},
	{
		id: 82,
		name: 'envoi food truck',
	},
	{
		id: 83,
		name: 'organiser un concert (corée)',
		bonusStatus: [AgenciesEnum.HR],
	},
	{
		id: 84,
		name: 'organiser un fancon',
		bonusStatus: [AgenciesEnum.HR],
	},
	{
		id: 85,
		name: 'participer à un festival',
		bonusStatus: [AgenciesEnum.HR],
	},
	{
		id: 86,
		name: 'tournée de concerts/festivals (asie)',
		bonusStatus: [AgenciesEnum.HR],
	},
	{
		id: 87,
		name: 'tournée de concerts/festivals (us & eu)',
		bonusStatus: [AgenciesEnum.HR],
	},
	{
		id: 88,
		name: 'tournée mondiale',
		bonusStatus: [AgenciesEnum.HR],
	},
	{
		id: 89,
		name: "participer au concert d'un artiste",
	},
	{
		id: 90,
		name: 'performer dans un night club',
	},
	{
		id: 91,
		name: 'réaliser/participer à un showcase',
	},
	{
		id: 92,
		name: "faire partie de la tournée d'un artiste",
	},
	{
		id: 93,
		name: "participer à un concert d'artiste",
	},
	{
		id: 95,
		name: 'faire du busking',
	},
	{
		id: 96,
		name: "booster l'impact d'une chanson",
	},
	{
		id: 97,
		name: 'participation à un bootcamp (2 à 3 semaines)',
	},
	{
		id: 98,
		name: 'poser sa voix sur une démo',
	},
	{
		id: 99,
		name: 'ouvrir son insta officiel',
	},
	{
		id: 100,
		name: 'prédebut solo (members intro)',
	},
	{
		id: 101,
		name: 'prédebut single',
	},
	{
		id: 102,
		name: 'émission survival pré-debut',
	},
	{
		id: 103,
		name: 'participer à une pièce de théâtre',
	},
	{
		id: 104,
		name: 'participer à une comédie musicale',
	},
	{
		id: 105,
		name: 'caméo (drama)',
		bonusStatus: [AgenciesEnum.A7],
	},
	{
		id: 106,
		name: 'caméo (film)',
		bonusStatus: [AgenciesEnum.A7],
	},
	{
		id: 111,
		name: 'conférence de presse',
	},
	{
		id: 112,
		name: 'interview lié à un projet',
	},
	{
		id: 113,
		name: "licence netflix pour la diffusion d'un drama",
	},
	{
		id: 114,
		name: 'dvd drama',
	},
	{
		id: 115,
		name: 'youtube (7jrs)',
	},
	{
		id: 116,
		name: 'publier sur sa chaîne/son compte',
		bonusStatus: [AgenciesEnum.GN],
	},
	{
		id: 117,
		name: 'faire une collab. avec un.e autre influenceur.euse',
	},
	{
		id: 118,
		name: 'faire une collab. avec une célébrité',
	},
	{
		id: 119,
		name: 'avoir un partenariat rémunéré',
	},
	{
		id: 120,
		name: 'communiqué sur une marque/un produit',
	},
	{
		id: 121,
		name: 'organiser un concours',
	},
	{
		id: 122,
		name: 'réaliser/participer à un podcast',
	},
	{
		id: 123,
		name: 'participer à un mediaday',
	},
	{
		id: 124,
		name: 'participer à un séminaire relation-presse',
	},
	{
		id: 125,
		name: 'faire un livestream',
	},
	{
		id: 126,
		name: 'participer à un tournoi sol coréen',
	},
	{
		id: 127,
		name: 'participer à un match sol coréen',
	},
	{
		id: 128,
		name: 'participer à un tournoi asiatique',
	},
	{
		id: 129,
		name: 'participer à un match sol asiatique',
	},
	{
		id: 130,
		name: 'participer à un match inter. amical',
	},
	{
		id: 131,
		name: 'participer à la coupe du monde',
	},
	{
		id: 132,
		name: 'participer à un match de coupe du monde',
	},
	{
		id: 133,
		name: 'signer avec un club coréen',
	},
	{
		id: 134,
		name: 'saison dans un club coréen (prêt)',
	},
	{
		id: 135,
		name: 'saison dans un club asiatique (prêt)',
	},
	{
		id: 136,
		name: 'participer à un entraînement',
	},
	{
		id: 137,
		name: "partir en session de training à l'étranger",
	},
	{
		id: 138,
		name: 'donner une interview pré-match',
	},
	{
		id: 139,
		name: 'donner une interview post-match',
	},
	{
		id: 140,
		name: 'être capitaine de son équipe',
	},
	{
		id: 141,
		name: "s'acheter des followers",
	},
	{
		id: 142,
		name: 'booster sa visibilité sur les réseaux',
	},
	{
		id: 143,
		name: 'être sponsorisé par une marque',
	},
	{
		id: 144,
		name: 'faire une vidéo virale sur les réseaux',
		bonusStatus: [AgenciesEnum.XY],
	},
	{
		id: 145,
		name: 'meet-up',
	},
	{
		id: 146,
		name: 'instagram live',
	},
	{
		id: 147,
		name: 'réaliser une publicité',
	},
	{
		id: 148,
		name: 'réaliser un photoshoot',
	},
	{
		id: 149,
		name: 'réaliser une couverture de magazine',
	},
	{
		id: 150,
		name: 'stylisme',
	},
	{
		id: 151,
		name: 'make-up artist',
	},
	{
		id: 152,
		name: "participation à la réalisation d'un mv",
	},
	{
		id: 153,
		name: "participation à la réalisation d'un drama",
	},
	{
		id: 154,
		name: "participation à la réalisation d'un film",
	},
	{
		id: 155,
		name: "participer au graphisme d'un album",
	},
	{
		id: 156,
		name: 'avoir la mention (prod. by x) sur un cb',
	},
	{
		id: 157,
		name: 'offrir des vacances à son artiste ou groupe',
	},
	{
		id: 158,
		name: 'avoir un van de taille normal (5 places)',
	},
	{
		id: 159,
		name: 'avoir un van luxueux (8 places)',
	},
	{
		id: 160,
		name: 'avoir un stagiaire (pendant un mois)',
	},
	{
		id: 161,
		name: 'louer un dortoir de taille normale',
	},
	{
		id: 162,
		name: 'louer un dortoir de grande taille',
	},
	{
		id: 163,
		name: 'louer un dortoir de luxe',
	},
	{
		id: 164,
		name: 'louer des appartements séparés',
	},
	{
		id: 165,
		name: 'ouvrir son studio photo',
	},
	{
		id: 166,
		name: 'sortir un photobook',
	},
	{
		id: 167,
		name: 'organiser une exposition',
	},
	{
		id: 168,
		name: 'réaliser une masterclass',
	},
	{
		id: 169,
		name: 'réaliser un reportage',
	},
	{
		id: 170,
		name: 'réaliser un programme remise en forme',
	},
	{
		id: 171,
		name: "participer à l'entraînement post comeback",
	},
	{
		id: 172,
		name: 'devenir coach personnel d’un artiste',
	},
	{
		id: 173,
		name: 'lancer sa marque',
	},
	{
		id: 174,
		name: 'bosser pour une marque',
	},
	{
		id: 175,
		name: 'créer une gamme en collaboration',
	},
	{
		id: 176,
		name: 'influencer une tendance',
	},
	{
		id: 177,
		name: 'ouvrir sa boutique',
	},
	{
		id: 178,
		name: 'participer à la fashion week',
	},
	{
		id: 179,
		name: 'devenir le styliste/make-up officiel d’un artiste',
	},
	{
		id: 180,
		name: "devenir chorégraphe d'un studio",
	},
	{
		id: 181,
		name: "participer à la chorégraphie d'un stage",
	},
	{
		id: 182,
		name: 'chorégraphie (cb ou vidéo ytb)',
	},
	{
		id: 183,
		name: 'chorégraphie (non crédité)',
	},
	{
		id: 184,
		name: 'ouvrir son studio de danse',
	},
	{
		id: 185,
		name: 'gérer une masterclass',
	},
	{
		id: 186,
		name: 'gérer un séminaire',
	},
	{
		id: 187,
		name: 'gérer un bootcamp',
	},
	{
		id: 188,
		name: 'bosser officiellement pour une agence',
	},
	{
		id: 189,
		name: 'apparaître dans un mv (danseur·euse)',
	},
	{
		id: 190,
		name: 'commercial cf danse',
	},
	{
		id: 191,
		name: 'backdance',
	},
	{
		id: 192,
		name: 'coffee event (anniversaire)',
	},
]
