require('dotenv').config();

var express = require('express');
var sequelize = require('./config/connection');
var cors = require('cors');

// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const functions = require('firebase-functions');
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

const sinata = express();
const port = process.env.PORT || 3030;
const URL = '/api/v1';

sinata.use(cors());
sinata.use(express.json());
sinata.use(express.urlencoded({ extended: false }));

sinata.get('/', async (req, res) => {
	try {
		await sequelize.authenticate();
		res
			.status(200)
			.send('Connection to database has been established successfully.');
	} catch (error) {
		res.status(500).json('Unable to connect to the database: ' + error.message);
	}
});
sinata.use('/uploads', express.static('uploads'));
sinata.use(`${URL}/auth`, authRouter);
sinata.use(`${URL}/users`, accountsRouter);
sinata.use(`${URL}/data-kegiatan`, dataKegiatanRouter);
sinata.use(`${URL}/publikasi-agenda`, publikasiAgendaRouter);
sinata.use(`${URL}/konpers`, konpersRouter);
sinata.use(`${URL}/pembaruan-informasi`, peminformasiRouter);
sinata.use(`${URL}/arsip-desain`, arsipDesainRouter);
sinata.use(`${URL}/opini`, opiniRouter);
sinata.use(`${URL}/baliho`, balihoRouter);
sinata.use(`${URL}/videotron`, videotronRouter);
sinata.use(`${URL}/live-streaming`, liveStreamingRouter);
sinata.use(`${URL}/majalah`, majalahRouter);
sinata.use(`${URL}/peliputan`, peliputanRouter);
sinata.use(`${URL}/arsip-pers`, arsipPersRouter);
sinata.use(`${URL}/dokumentasi`, dokumentasiRouter);
sinata.use(`${URL}/file-doc`, filedocRouter);
sinata.use(`${URL}/pengumuman`, pengumumanRouter);

sinata.listen(port, () => {
	console.log(
		`\nSistem Informasi Manajemen Pelayanan dan Berita API's \nSuccessfully listening the app on http://localhost:${port}`,
	);
});

exports.app = functions.https.onRequest(sinata);
