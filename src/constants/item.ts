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

export const DEFAULT_ITEM: Item[] = [
	{
		id: 1,
		name: 'single',
		isBooster: false,
	},
	{ id: 2, name: 'commercial mv (single)', isBooster: false },
	{
		id: 3,
		name: 'mini album (2 à 4 chansons)',
		isBooster: false,
	},
	{
		id: 4,
		name: 'mini album (5 à 7 chansons)',
		isBooster: false,
	},
	{
		id: 5,
		name: 'full album (8 à 12 chansons)',
		isBooster: false,
	},
	{
		id: 6,
		name: 'repack album',
		isBooster: false,
	},
	{
		id: 7,
		name: 'double release',
		isBooster: false,
	},
	{
		id: 8,
		name: "conversion jpn ou chn d'un single kr",
		bonusStatus: [AgenciesEnum.XY],
		isBooster: false,
	},
	{
		id: 9,
		name: 'single jpn ou chn',
		bonusStatus: [AgenciesEnum.XY],
		isBooster: false,
	},
	{
		id: 10,
		name: 'single anglais',
		isBooster: false,
	},
	{
		id: 11,
		name: 'featuring',
		isBooster: false,
	},
	{
		id: 12,
		name: 'collaboration',
		isBooster: false,
	},
	{
		id: 13,
		name: 'ost',
		isBooster: false,
	},
	{
		id: 14,
		name: 'expérience',
		isBooster: false,
	},
	{
		id: 15,
		name: 'faire une dance practice',
		isBooster: false,
	},
	{
		id: 16,
		name: 'photoshoot',
		bonusStatus: [AgenciesEnum.WM],
		isBooster: false,
	},
	{
		id: 17,
		name: 'couverture de magazine (3★)',
		bonusStatus: [AgenciesEnum.WM],
		isBooster: false,
	},
	{
		id: 18,
		name: 'interview magazine',
		isBooster: false,
	},
	{
		id: 19,
		name: 'interview vidéo (ex. elle)',
		isBooster: false,
	},
	{
		id: 20,
		name: 'commercials',
		bonusStatus: [AgenciesEnum.WM],
		isBooster: false,
	},
	{
		id: 21,
		name: 'bonus égérie: participer à un photoshoot / cf',
		isBooster: false,
	},
	{
		id: 22,
		name: "face d'une marque kr (2★)",
		isBooster: false,
	},
	{
		id: 23,
		name: "face d'une marque inter (3★)",
		isBooster: false,
	},
	{
		id: 24,
		name: "ambassadeur d'une marque kr (3★)",
		isBooster: false,
	},
	{
		id: 25,
		name: "ambassadeur d'une marque internationale (4★)",
		isBooster: false,
	},
	{
		id: 26,
		name: 'réaliser des campagnes publicitaires',
		isBooster: false,
	},
	{
		id: 27,
		name: 'bonus égérie: post sur les réseaux en partenariat avec une marque',
		isBooster: false,
	},
	{
		id: 28,
		name: "être mc d'une émission",
		bonusStatus: [AgenciesEnum.MC],
		isBooster: false,
	},
	{
		id: 29,
		name: "faire partie du casting d'une émission",
		isBooster: false,
	},
	{
		id: 30,
		name: 'apparition dans une émission',
		isBooster: false,
	},
	{
		id: 31,
		name: 'bonus skill face: émission',
		isBooster: false,
	},
	{
		id: 32,
		name: "être mc d'un music show",
		isBooster: false,
	},
	{
		id: 33,
		name: 'avoir son talk show (radio)',
		isBooster: false,
	},
	{
		id: 34,
		name: 'nouvelle saison talk show',
		isBooster: false,
	},
	{
		id: 35,
		name: 'participer à un radio show',
		isBooster: false,
	},
	{
		id: 36,
		name: 'apparaître dans un m/v',
		isBooster: false,
	},
	{
		id: 37,
		name: 'youtube (1 mois)',
		isBooster: false,
	},
	{
		id: 38,
		name: 'youtube (15jrs)',
		isBooster: false,
	},
	{
		id: 39,
		name: 'bonus gnation: poster sur youtube',
		isBooster: false,
	},
	{
		id: 40,
		name: 'faire certifier ses réseaux',
		isBooster: false,
	},
	{
		id: 41,
		name: 'réaliser des teasers pour son cb',
		isBooster: true,
	},
	{
		id: 42,
		name: 'vlive countdown',
		isBooster: true,
	},
	{
		id: 43,
		name: 'fans meetings',
		isBooster: true,
	},
	{
		id: 44,
		name: 'instagram live promotionnel',
		isBooster: true,
	},
	{
		id: 45,
		name: 'showcase',
		isBooster: true,
	},
	{
		id: 46,
		name: 'promotions (studio choom, relay dance, live…)',
		isBooster: true,
	},
	{
		id: 47,
		name: 'inscription music show (petit budget)',
		isBooster: true,
	},
	{
		id: 48,
		name: 'inscription music show (gros budget)',
		isBooster: true,
	},
	{
		id: 49,
		name: 'radio',
		isBooster: true,
	},
	{
		id: 50,
		name: 'promotion télévisé (weekly idoles...)',
		isBooster: true,
	},
	{
		id: 51,
		name: 'affiches promotionnelles station métro/bus',
		isBooster: true,
	},
	{
		id: 52,
		name: 'affiches promotionnelles coex kpop square (2★)',
		isBooster: true,
	},
	{
		id: 53,
		name: 'production d’une tt (crédité)',
		bonusStatus: [AgenciesEnum.MT],
		isBooster: false,
	},
	{
		id: 54,
		name: 'production d’une tt (non crédité)',
		isBooster: false,
	},
	{
		id: 55,
		name: 'production d’une b-side',
		bonusStatus: [AgenciesEnum.MT],
		isBooster: false,
	},
	{
		id: 56,
		name: 'production 3 b-sides',
		bonusStatus: [AgenciesEnum.MT],
		isBooster: false,
	},
	{
		id: 57,
		name: 'production d’une ost',
		isBooster: false,
	},
	{
		id: 58,
		name: "participer à la chorégraphie d'une émission",
		isBooster: false,
	},
	{
		id: 59,
		name: 'chorégraphie',
		isBooster: false,
	},
	{
		id: 60,
		name: 'direction artistique',
		isBooster: false,
	},
	{
		id: 61,
		name: '2nd rôle (drama)',
		bonusStatus: [AgenciesEnum.A7],
		isBooster: false,
	},
	{
		id: 62,
		name: 'lead rôle (drama)',
		bonusStatus: [AgenciesEnum.A7],
		isBooster: false,
	},
	{
		id: 63,
		name: '2nd rôle (film)',
		bonusStatus: [AgenciesEnum.A7],
		isBooster: false,
	},
	{
		id: 64,
		name: 'lead rôle (film)',
		bonusStatus: [AgenciesEnum.A7],
		isBooster: false,
	},
	{
		id: 65,
		name: 'caméo (drama ou film)',
		bonusStatus: [AgenciesEnum.A7],
		isBooster: false,
	},
	{
		id: 66,
		name: 'participer à un masterclass (1jr)',
		isBooster: false,
	},
	{
		id: 67,
		name: 'participer à un séminaire (2 à 3 jrs)',
		isBooster: false,
	},
	{
		id: 68,
		name: 'album physique (simple)',
		isBooster: false,
	},
	{
		id: 69,
		name: 'album physique (différentes versions)',
		isBooster: false,
	},
	{
		id: 70,
		name: 'album physique (members versions)',
		isBooster: false,
	},
	{
		id: 71,
		name: 'photobook & concert dvd',
		isBooster: false,
	},
	{
		id: 72,
		name: 'photobook',
		isBooster: false,
	},
	{
		id: 73,
		name: 'season’s greetings',
		isBooster: false,
	},
	{
		id: 74,
		name: 'official fanclub membership',
		isBooster: false,
	},
	{
		id: 75,
		name: 'lightstick',
		isBooster: false,
	},
	{
		id: 76,
		name: 'goodies divers',
		isBooster: false,
	},
	{
		id: 77,
		name: 'vlive solo',
		isBooster: false,
	},
	{
		id: 78,
		name: 'vlive groupe',
		isBooster: false,
	},
	{
		id: 79,
		name: 'vlive anniversaire',
		isBooster: false,
	},
	{
		id: 80,
		name: 'affiches anniversaire',
		isBooster: false,
	},
	{
		id: 81,
		name: 'coffee event (anniversaire ou cb)',
		isBooster: false,
	},
	{
		id: 82,
		name: 'envoi food truck',
		isBooster: false,
	},
	{
		id: 83,
		name: 'organiser un concert (corée)',
		bonusStatus: [AgenciesEnum.HR],
		isBooster: false,
	},
	{
		id: 84,
		name: 'organiser un fancon',
		bonusStatus: [AgenciesEnum.HR],
		isBooster: false,
	},
	{
		id: 85,
		name: 'participer à un festival',
		bonusStatus: [AgenciesEnum.HR],
		isBooster: false,
	},
	{
		id: 86,
		name: 'tournée de concerts/festivals (asie)',
		bonusStatus: [AgenciesEnum.HR],
		isBooster: false,
	},
	{
		id: 87,
		name: 'tournée de concerts/festivals (us & eu)',
		bonusStatus: [AgenciesEnum.HR],
		isBooster: false,
	},
	{
		id: 88,
		name: 'tournée mondiale',
		bonusStatus: [AgenciesEnum.HR],
		isBooster: false,
	},
	{
		id: 89,
		name: "participer au concert d'un artiste",
		isBooster: false,
	},
	{
		id: 90,
		name: 'performer dans un night club',
		isBooster: false,
	},
	{
		id: 91,
		name: 'réaliser/participer à un showcase',
		isBooster: false,
	},
	{
		id: 92,
		name: "faire partie de la tournée d'un artiste",
		isBooster: false,
	},
	{
		id: 93,
		name: "participer à un concert d'artiste",
		isBooster: false,
	},
	{
		id: 95,
		name: 'faire du busking',
		isBooster: false,
	},
	{
		id: 96,
		name: "booster l'impact d'une chanson",
		isBooster: false,
	},
	{
		id: 97,
		name: 'participation à un bootcamp (2 à 3 semaines)',
		isBooster: false,
	},
	{
		id: 98,
		name: 'poser sa voix sur une démo',
		isBooster: false,
	},
	{
		id: 99,
		name: 'ouvrir son insta officiel',
		isBooster: false,
	},
	{
		id: 100,
		name: 'prédebut solo (members intro)',
		isBooster: false,
	},
	{
		id: 101,
		name: 'prédebut single',
		isBooster: false,
	},
	{
		id: 102,
		name: 'émission survival pré-debut',
		isBooster: false,
	},
	{
		id: 103,
		name: 'participer à une pièce de théâtre',
		isBooster: false,
	},
	{
		id: 104,
		name: 'participer à une comédie musicale',
		isBooster: false,
	},
	{
		id: 105,
		name: 'caméo (drama)',
		bonusStatus: [AgenciesEnum.A7],
		isBooster: false,
	},
	{
		id: 106,
		name: 'caméo (film)',
		bonusStatus: [AgenciesEnum.A7],
		isBooster: false,
	},
	{
		id: 111,
		name: 'conférence de presse',
		isBooster: false,
	},
	{
		id: 112,
		name: 'interview lié à un projet',
		isBooster: false,
	},
	{
		id: 113,
		name: "licence netflix pour la diffusion d'un drama",
		isBooster: false,
	},
	{
		id: 114,
		name: 'dvd drama',
		isBooster: false,
	},
	{
		id: 115,
		name: 'youtube (7jrs)',
		isBooster: false,
	},
	{
		id: 116,
		name: 'publier sur sa chaîne/son compte',
		isBooster: false,

		bonusStatus: [AgenciesEnum.GN],
	},
	{
		id: 117,
		name: 'faire une collab. avec un.e autre influenceur.euse',
		isBooster: false,
	},
	{
		id: 118,
		name: 'faire une collab. avec une célébrité',
		isBooster: false,
	},
	{
		id: 119,
		name: 'avoir un partenariat rémunéré',
		isBooster: false,
	},
	{
		id: 120,
		name: 'communiqué sur une marque/un produit',
		isBooster: false,
	},
	{
		id: 121,
		name: 'organiser un concours',
		isBooster: false,
	},
	{
		id: 122,
		name: 'réaliser/participer à un podcast',
		isBooster: false,
	},
	{
		id: 123,
		name: 'participer à un mediaday',
		isBooster: false,
	},
	{
		id: 124,
		name: 'participer à un séminaire relation-presse',
		isBooster: false,
	},
	{
		id: 125,
		name: 'faire un livestream',
		isBooster: false,
	},
	{
		id: 126,
		name: 'participer à un tournoi sol coréen',
		isBooster: false,
	},
	{
		id: 127,
		name: 'participer à un match sol coréen',
		isBooster: false,
	},
	{
		id: 128,
		name: 'participer à un tournoi asiatique',
		isBooster: false,
	},
	{
		id: 129,
		name: 'participer à un match sol asiatique',
		isBooster: false,
	},
	{
		id: 130,
		name: 'participer à un match inter. amical',
		isBooster: false,
	},
	{
		id: 131,
		name: 'participer à la coupe du monde',
		isBooster: false,
	},
	{
		id: 132,
		name: 'participer à un match de coupe du monde',
		isBooster: false,
	},
	{
		id: 133,
		name: 'signer avec un club coréen',
		isBooster: false,
	},
	{
		id: 134,
		name: 'saison dans un club coréen (prêt)',
		isBooster: false,
	},
	{
		id: 135,
		name: 'saison dans un club asiatique (prêt)',
		isBooster: false,
	},
	{
		id: 136,
		name: 'participer à un entraînement',
		isBooster: false,
	},
	{
		id: 137,
		name: "partir en session de training à l'étranger",
		isBooster: false,
	},
	{
		id: 138,
		name: 'donner une interview pré-match',
		isBooster: false,
	},
	{
		id: 139,
		name: 'donner une interview post-match',
		isBooster: false,
	},
	{
		id: 140,
		name: 'être capitaine de son équipe',
		isBooster: false,
	},
	{
		id: 141,
		name: "s'acheter des followers",
		isBooster: false,
	},
	{
		id: 142,
		name: 'booster sa visibilité sur les réseaux',
		isBooster: false,
	},
	{
		id: 143,
		name: 'être sponsorisé par une marque',
		isBooster: false,
	},
	{
		id: 144,
		name: 'faire une vidéo virale sur les réseaux',
		isBooster: false,
		bonusStatus: [AgenciesEnum.XY],
	},
	{
		id: 145,
		name: 'meet-up',
		isBooster: false,
	},
	{
		id: 146,
		name: 'instagram live',
		isBooster: false,
	},
	{
		id: 147,
		name: 'réaliser une publicité',
		isBooster: false,
	},
	{
		id: 148,
		name: 'réaliser un photoshoot',
		isBooster: false,
	},
	{
		id: 149,
		name: 'réaliser une couverture de magazine',
		isBooster: false,
	},
	{
		id: 150,
		name: 'stylisme',
		isBooster: false,
	},
	{
		id: 151,
		name: 'make-up artist',
		isBooster: false,
	},
	{
		id: 152,
		name: "participation à la réalisation d'un mv",
		isBooster: false,
	},
	{
		id: 153,
		name: "participation à la réalisation d'un drama",
		isBooster: false,
	},
	{
		id: 154,
		name: "participation à la réalisation d'un film",
		isBooster: false,
	},
	{
		id: 155,
		name: "participer au graphisme d'un album",
		isBooster: false,
	},
	{
		id: 156,
		name: 'avoir la mention (prod. by x) sur un cb',
		isBooster: false,
	},
	{
		id: 157,
		name: 'offrir des vacances à son artiste ou groupe',
		isBooster: false,
	},
	{
		id: 158,
		name: 'avoir un van de taille normal (5 places)',
		isBooster: false,
	},
	{
		id: 159,
		name: 'avoir un van luxueux (8 places)',
		isBooster: false,
	},
	{
		id: 160,
		name: 'avoir un stagiaire (pendant un mois)',
		isBooster: false,
	},
	{
		id: 161,
		name: 'louer un dortoir de taille normale',
		isBooster: false,
	},
	{
		id: 162,
		name: 'louer un dortoir de grande taille',
		isBooster: false,
	},
	{
		id: 163,
		name: 'louer un dortoir de luxe',
		isBooster: false,
	},
	{
		id: 164,
		name: 'louer des appartements séparés',
		isBooster: false,
	},
	{
		id: 165,
		name: 'ouvrir son studio photo',
		isBooster: false,
	},
	{
		id: 166,
		name: 'sortir un photobook',
		isBooster: false,
	},
	{
		id: 167,
		name: 'organiser une exposition',
		isBooster: false,
	},
	{
		id: 168,
		name: 'réaliser une masterclass',
		isBooster: false,
	},
	{
		id: 169,
		name: 'réaliser un reportage',
		isBooster: false,
	},
	{
		id: 170,
		name: 'réaliser un programme remise en forme',
		isBooster: false,
	},
	{
		id: 171,
		name: "participer à l'entraînement post comeback",
		isBooster: false,
	},
	{
		id: 172,
		name: 'devenir coach personnel d’un artiste',
		isBooster: false,
	},
	{
		id: 173,
		name: 'lancer sa marque',
		isBooster: false,
	},
	{
		id: 174,
		name: 'bosser pour une marque',
		isBooster: false,
	},
	{
		id: 175,
		name: 'créer une gamme en collaboration',
		isBooster: false,
	},
	{
		id: 176,
		name: 'influencer une tendance',
		isBooster: false,
	},
	{
		id: 177,
		name: 'ouvrir sa boutique',
		isBooster: false,
	},
	{
		id: 178,
		name: 'participer à la fashion week',
		isBooster: false,
	},
	{
		id: 179,
		name: 'devenir le styliste/make-up officiel d’un artiste',
		isBooster: false,
	},
	{
		id: 180,
		name: "devenir chorégraphe d'un studio",
		isBooster: false,
	},
	{
		id: 181,
		name: "participer à la chorégraphie d'un stage",
		isBooster: false,
	},
	{
		id: 182,
		name: 'chorégraphie (cb ou vidéo ytb)',
		isBooster: false,
	},
	{
		id: 183,
		name: 'chorégraphie (non crédité)',
		isBooster: false,
	},
	{
		id: 184,
		name: 'ouvrir son studio de danse',
		isBooster: false,
	},
	{
		id: 185,
		name: 'gérer une masterclass',
		isBooster: false,
	},
	{
		id: 186,
		name: 'gérer un séminaire',
		isBooster: false,
	},
	{
		id: 187,
		name: 'gérer un bootcamp',
		isBooster: false,
	},
	{
		id: 188,
		name: 'bosser officiellement pour une agence',
		isBooster: false,
	},
	{
		id: 189,
		name: 'apparaître dans un mv (danseur·euse)',
		isBooster: false,
	},
	{
		id: 190,
		name: 'commercial cf danse',
		isBooster: false,
	},
]
