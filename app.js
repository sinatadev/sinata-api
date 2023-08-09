require('dotenv').config();

var express = require('express');
var sequelize = require('./config/connection');
var cors = require('cors');

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCZZaRSoTURn9EoIeCYoO8fNMnF0s7lQI8',
	authDomain: 'sinata-api.firebaseapp.com',
	projectId: 'sinata-api',
	storageBucket: 'sinata-api.appspot.com',
	messagingSenderId: '942728719486',
	appId: '1:942728719486:web:a59377d654c155afb9bc2f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const authRouter = require('./routes/auth.route');
const accountsRouter = require('./routes/accounts.route');
const dataKegiatanRouter = require('./routes/dataKegiatan.route');
const publikasiAgendaRouter = require('./routes/publikasiAgenda.route');
const konpersRouter = require('./routes/konpers.route');
const peminformasiRouter = require('./routes/peminformasi.route');
const arsipDesainRouter = require('./routes/arsipDesain.route');
const opiniRouter = require('./routes/opini.route');
const balihoRouter = require('./routes/baliho.route');
const videotronRouter = require('./routes/videotron.route');
const liveStreamingRouter = require('./routes/livestreaming.route');
const majalahRouter = require('./routes/majalah.route');
const peliputanRouter = require('./routes/peliputan.route');
const arsipPersRouter = require('./routes/arsipPers.route');
const dokumentasiRouter = require('./routes/dokumentasi.route');
const filedocRouter = require('./routes/filedoc.route');
const pengumumanRouter = require('./routes/pengumuman.route');

const express = express();
const port = process.env.PORT || 3030;
const URL = '/api/v1';

express.use(cors());
express.use(express.json());
express.use(express.urlencoded({ extended: false }));

express.get('/', async (req, res) => {
	try {
		await sequelize.authenticate();
		res
			.status(200)
			.send('Connection to database has been established successfully.');
	} catch (error) {
		res.status(500).json('Unable to connect to the database: ' + error.message);
	}
});
express.use('/uploads', express.static('uploads'));
express.use(`${URL}/auth`, authRouter);
express.use(`${URL}/users`, accountsRouter);
express.use(`${URL}/data-kegiatan`, dataKegiatanRouter);
express.use(`${URL}/publikasi-agenda`, publikasiAgendaRouter);
express.use(`${URL}/konpers`, konpersRouter);
express.use(`${URL}/pembaruan-informasi`, peminformasiRouter);
express.use(`${URL}/arsip-desain`, arsipDesainRouter);
express.use(`${URL}/opini`, opiniRouter);
express.use(`${URL}/baliho`, balihoRouter);
express.use(`${URL}/videotron`, videotronRouter);
express.use(`${URL}/live-streaming`, liveStreamingRouter);
express.use(`${URL}/majalah`, majalahRouter);
express.use(`${URL}/peliputan`, peliputanRouter);
express.use(`${URL}/arsip-pers`, arsipPersRouter);
express.use(`${URL}/dokumentasi`, dokumentasiRouter);
express.use(`${URL}/file-doc`, filedocRouter);
express.use(`${URL}/pengumuman`, pengumumanRouter);

express.listen(port, () => {
	console.log(
		`\nSistem Informasi Manajemen Pelayanan dan Berita API's \nSuccessfully listening the app on http://localhost:${port}`,
	);
});
