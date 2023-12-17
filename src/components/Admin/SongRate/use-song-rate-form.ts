'use client'

import { AgenciesEnum } from '@/constants/agency'
import { AgencyYtbProps, ParticipantCategory, SongRateStreams, SongRateType } from '@/interfaces'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const AgencyYtbValues: Record<AgenciesEnum, AgencyYtbProps> = {
	ACT7: { imgIcon: 'https://images2.imgbox.com/d8/98/B0xsyTBh_o.png', channelName: 'ACT.7', subscribers: '1.95M' },
	MOUNTAINTOP: {
		imgIcon: 'https://images2.imgbox.com/7c/90/bjh3rnkY_o.png',
		channelName: 'MOUNTAINTOP LABEL',
		subscribers: '1.6M',
	},
	MYSTIC: {
		imgIcon: 'https://zupimages.net/up/20/52/243i.png',
		channelName: 'MYSTIC ENTERTAINMENT',
		subscribers: '2.5M',
	},
	GNATION: {
		imgIcon: 'https://images2.imgbox.com/03/f8/jZVa75s4_o.png',
		channelName: 'G.NATION',
		subscribers: '22.3M',
	},
	WISHMAKER: {
		imgIcon: 'https://images2.imgbox.com/c6/9c/A6FIrBo2_o.png',
		channelName: 'WISHMAKER ENTERTAINMENT',
		subscribers: '26.5M',
	},
	XINGYUAN: {
		imgIcon: 'https://images2.imgbox.com/03/d6/sECMGiJN_o.png',
		channelName: 'XINGYUAN MUSIC',
		subscribers: '1.4M',
	},
	HORIZONRECORD: {
		imgIcon: 'https://i.imgur.com/1530NbJ.png',
		channelName: 'HORIZON RECORDS',
		subscribers: '2M',
	},
	INDIE: {
		imgIcon: 'https://i.imgur.com/eHvJ2li.png',
		channelName: 'NEW WAVE MUSIC',
		subscribers: '436k',
	},
}

export const RatingValues: Record<ParticipantCategory, number[]> = {
	'AUTO-PROD': [1500, 3000, 6000, 12000, 24000],
	IDOL: [1000, 2000, 4000, 8000, 16000],
	MT: [3000, 6000, 10000, 18000, 30000],
	STAFF: [4500, 8000, 12000, 24000, 48000],
	TRAINEE: [500],
}

export const useSongRateForm = () => {
	const [selectedAgency, setSelectedAgency] = useState<AgenciesEnum>(AgenciesEnum.A7)

	const updateAgency = (newAgenncy: AgenciesEnum) => {
		setSelectedAgency(newAgenncy)
	}

	const form = useForm<SongRateType>()

	const formStreams = useForm<SongRateStreams>({ defaultValues: { defaultStreams: 30000 } })

	const streamsCalculation = () => {
		const songValues = form.getValues()
		const streamValues = formStreams.getValues()

		const sousTotalStreams = () => {
			const totalByParticipant = songValues.participant?.reduce((prev, curr) => {
				const baseCurr = RatingValues[curr.category!][curr.rating - 1]
				if (curr.qty > 1) {
					const additional = (baseCurr / 2) * curr.qty
					return prev + additional + baseCurr
				}

				return prev + baseCurr
			}, 0)

			const byParticipant = totalByParticipant ? totalByParticipant : 0

			return streamValues.bonusStreams + streamValues.defaultStreams + byParticipant
		}

		return `<blockquote><i><u>artiste</u> : ${songValues.artist}
		<u>chanson</u> : ${songValues.songTitle}
		<u>streams <b>d'office</b></u> : ${streamValues.defaultStreams}
		<u>streams +</u> : ${streamValues.bonusStreams}
		<u>staffs</u> :
		${songValues.participant?.map((p) => {
			const totalStream = () => {
				const base = RatingValues[p.category!][p.rating - 1]

				if (p.qty > 1) {
					const additional = (base / 2) * p.qty
					return additional + base
				}
				return base
			}
			return `${p.fullname} ${p.rating} (${p.category}) : prod * ${p.qty} : ${totalStream()} streams`
		})}
		<u>sous-total</u> : ${sousTotalStreams()}
		
		<u>dé</u>:
		
		<b><u>TOTAL</u></b> :
		</i></blockquote>
		
		[code]<div style="border-bottom:1px solid #00000008;padding-bottom:10px;"></div>
		<table><td><i class="cp cp-new" style="color: orange;font-size:13px;"></i></td><td><img src="${
			songValues.img_url
		}" class="imgchart"></td><td><div class="song_info"><div class="song_chart">Titre</div><div class="art_chart">Artiste</div></div></td><td><div class="album_chart">nom album</div>
		<div class="date_chart">${
			songValues.releaseDate
		}</div></td><td><div class="streams"><i class="cp cp-heart-o" style="color:var(--c1);font-size:10px;"></i> XX,XXX</div></td><td style="100px;margin:auto 0;"><a href="https://www.youtube.com/watch?v=${
			songValues.ytb_code
		}"><i class="cp cp-youtube" style="color:var(--c4);font-size:20px;margin-left:10px;"></i></a></td></table>[/code]`
	}

	const agencyYtbCode = () => {
		return `[code]<div id="container"><div id="gauche"><span class="th th-youtube"></span> <span style="margin-top:7px;">YouTube</span></div></div><center><iframe width="462" height="260" src="https://www.youtube.com/embed/3ruHs2BKa9M" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center><div id="fdytb"><div class="hashtag">#TAG</div>
		<div class="titleytb">ARTISTE _ 'TITRE' M/V</div><div class="fdstat"><div class="sortie">00 MOIS 2023  · <i class="cp cp-star" style="color:#f60000"></i><i class="cp cp-star" style="color:#f60000"></i><i class="cp cp-star" style="color:#f60000"></i></i><i class="cp cp-star" style="color:#f60000"></i><i class="cp cp-star"></i></div></div><div class="infosytb"><div class="iconsytb" style="background-image:url(https://images2.imgbox.com/d8/98/B0xsyTBh_o.png);"></div><div class="dame"><div class="name"><name2>ACT7</name2> <img src="https://i.imgur.com/8w96Q0I.png" class="verifytb"></div><div class="ladate"><div class="das">758,8k abonnés</div></div></div></div><!--
		AJOUT CODE DEMANDE ICI --><!--
		FIN AJOUT CODE DEMANDE ICI -->
		</div></div>[/code]`
	}

	return { form, formStreams, updateAgency }
}
