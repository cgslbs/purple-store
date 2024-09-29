'use client'
import axios from 'axios'

export const axiosInstance = axios.create({
	baseURL: 'http://purplestore-api.hybrid-games.fr',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	validateStatus: (status) => status >= 200 && status < 300,
})
