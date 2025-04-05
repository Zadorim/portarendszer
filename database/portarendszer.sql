-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 05. 03:46
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `portarendszer`
--
CREATE DATABASE IF NOT EXISTS `portarendszer` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `portarendszer`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `belepes`
--

CREATE TABLE `belepes` (
  `id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `belepesi_ido` timestamp NOT NULL DEFAULT current_timestamp(),
  `kilepesi_ido` timestamp NULL DEFAULT NULL,
  `utolso_aktivitas` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `beosztas` enum('igazgato','igazgatohelyettes','osztalyfonok','tanar','napkozis','pedasszisztens','portas') NOT NULL,
  `felhasznalonev` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `jelszo_hash` blob NOT NULL,
  `jelszo_salt` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`id`, `nev`, `beosztas`, `felhasznalonev`, `email`, `jelszo_hash`, `jelszo_salt`) VALUES
(1, 'Pataki Sándor', 'igazgato', 'patakisandor', 'igazgato@szidi.hu', '', ''),
(2, 'Gál Hajnalka', 'igazgatohelyettes', 'galhajnalka', 'galhajnalka@szidi.hu', '', ''),
(3, 'Kisgyörgy Beatrix', 'tanar', 'kisgyorgybea', 'kisgyorgybeatrix@szidi.hu', '', ''),
(4, 'Kovács Anna', 'tanar', 'kovacsanna', 'kovacs.a@szidi.hu', '', ''),
(5, 'Németh Gábor', 'tanar', 'nemethgabor', 'nemeth.g@szidi.hu', '', ''),
(6, 'Szabó Éva', 'igazgatohelyettes', 'szaboeva', 'szabo.e@szidi.hu', '', ''),
(7, 'Tóth László', 'tanar', 'tothlaszlo', 'toth.l@szidi.hu', '', ''),
(8, 'Farkas Zsuzsanna', 'tanar', 'farkaszsuzsanna', 'farkas.z@szidi.hu', '', ''),
(9, 'Varga István', 'tanar', 'vargaisztvan', 'varga.i@szidi.hu', '', ''),
(10, 'Papp Rita', 'pedasszisztens', 'papprita', 'papp.r@szidi.hu', '', ''),
(11, 'Simon Tamás', 'tanar', 'simontamas', 'simon.t@szidi.hu', '', ''),
(12, 'Balogh Márton', 'tanar', 'baloghmarton', 'balogh.m@szidi.hu', '', ''),
(13, 'Kiss Eszter', 'tanar', 'kisseszer', 'kiss.e@szidi.hu', '', ''),
(14, 'Nagy Péter', 'tanar', 'nagypeter', 'nagy.p@szidi.hu', '', ''),
(15, 'Orsós Mária', 'portas', 'orsosmaria', 'orsos.m@szidi.hu', '', ''),
(16, 'Fazekas János', 'tanar', 'fazekasjanos', 'fazekas.j@szidi.hu', '', ''),
(17, 'Galambos Alice', 'tanar', 'galambosalice', 'galambos.a@szidi.hu', '', ''),
(18, 'Bodnar Bernadett', 'tanar', 'bodnarbernadett', 'bodnar.b@szidi.hu', '', ''),
(19, 'Illes Robert', 'tanar', 'illesrobert', 'illes.r@szidi.hu', '', ''),
(20, 'Lengyel Zsanett', 'tanar', 'lengyelzsanett', 'lengyel.zs@szidi.hu', '', ''),
(21, 'Kocsis Mihaly', 'tanar', 'kocsismihaly', 'kocsis.m@szidi.hu', '', ''),
(22, 'Vigh Viktor', 'tanar', 'vighviktor', 'vigh.v@szidi.hu', '', ''),
(23, 'Csapo Erika', 'tanar', 'csapoerika', 'csapo.e@szidi.hu', '', ''),
(24, 'Gulyas Geza', 'tanar', 'gulyasgeza', 'gulyas.g@szidi.hu', '', ''),
(25, 'Oláh Zsófia', 'osztalyfonok', 'olahzsofia', 'olahzsofia@szidi.hu', '', ''),
(26, 'Fazekas Gergő', 'napkozis', 'fazekasgergo', 'fazekasgergo@szidi.hu', '', ''),
(27, 'Varga Balázs', 'osztalyfonok', 'vargabalazs', 'vargabalazs@szidi.hu', '', ''),
(28, 'Fazekas Katalin', 'napkozis', 'fazekaskatalin', 'fazekaskatalin@szidi.hu', '', ''),
(29, 'Simon Anna', 'osztalyfonok', 'simonanna', 'simonanna@szidi.hu', '', ''),
(30, 'Kovács Patrik', 'napkozis', 'kovacspatrik', 'kovacspatrik@szidi.hu', '', ''),
(31, 'Bognár Tamás', 'osztalyfonok', 'bognartamas', 'bognartamas@szidi.hu', '', ''),
(32, 'Fazekas Eszter', 'napkozis', 'fazekaseszter', 'fazekaseszter@szidi.hu', '', ''),
(33, 'Fazekas Anna', 'osztalyfonok', 'fazekasanna', 'fazekasanna@szidi.hu', '', ''),
(34, 'Tóth Gergő', 'napkozis', 'tothgergo', 'tothgergo@szidi.hu', '', ''),
(35, 'Kovács Zoltán', 'osztalyfonok', 'kovacszoltan', 'kovacszoltan@szidi.hu', '', ''),
(36, 'Fekete Réka', 'napkozis', 'feketereka', 'feketereka@szidi.hu', '', ''),
(37, 'Nagy Nóra', 'osztalyfonok', 'nagynora', 'nagynora@szidi.hu', '', ''),
(38, 'Tóth Zoltán', 'napkozis', 'tothzoltan', 'tothzoltan@szidi.hu', '', ''),
(39, 'Simon Levente', 'osztalyfonok', 'simonlevente', 'simonlevente@szidi.hu', '', ''),
(40, 'Fazekas Emma', 'napkozis', 'fazekasemma', 'fazekasemma@szidi.hu', '', ''),
(41, 'Nagy Zsófia', 'osztalyfonok', 'nagyzsofia', 'nagyzsofia@szidi.hu', '', ''),
(42, 'Simon Máté', 'napkozis', 'simonmate', 'simonmate@szidi.hu', '', ''),
(43, 'Oláh Zoltán', 'osztalyfonok', 'olahzoltan', 'olahzoltan@szidi.hu', '', ''),
(44, 'Oláh Eszter', 'napkozis', 'olaheszter', 'olaheszter@szidi.hu', '', ''),
(45, 'Kiss Lili', 'osztalyfonok', 'kisslili', 'kisslili@szidi.hu', '', ''),
(46, 'Fekete Balázs', 'napkozis', 'feketebalazs', 'feketebalazs@szidi.hu', '', ''),
(47, 'Bognár Zoltán', 'osztalyfonok', 'bognarzoltan', 'bognarzoltan@szidi.hu', '', ''),
(48, 'Kiss Anna', 'napkozis', 'kissanna', 'kissanna@szidi.hu', '', ''),
(49, 'Nagy Emma', 'osztalyfonok', 'nagyemma', 'nagyemma@szidi.hu', '', ''),
(50, 'Tóth Ádám', 'napkozis', 'tothadam', 'tothadam@szidi.hu', '', ''),
(51, 'Bognár Ádám', 'osztalyfonok', 'bognaradam', 'bognaradam@szidi.hu', '', ''),
(52, 'Tóth Noémi', 'napkozis', 'tothnoemi', 'tothnoemi@szidi.hu', '', ''),
(53, 'Teszt Felhasználó', 'portas', 'tesztuser', 'teszt@example.com', 0xa0fe2ad5fd6890e58f085c07b78a275d15c0f5e4962db950b4cbe3e4dbaeaebf0fce99d70ea50837c0b887aabeee63c9a6f924222cfbaa17534acc3f847bdeaa, 0x148b41258d8f7100f51d8fffb82f8e2592a18f2a97637cd3b7d27c32a1dd19618b1f4a78c9f85fcaf36eb5f0164a9860c468fcaebbcbbbdd126c69ebe12257d0df197ca92ee2513a8e07ebf560c8e8126234c370b10b720cc08390aafeed03ad9c8f209557c93fc5cce02c7908098382b75a4d509fca3ca1d0cddd39d0df1c66),
(54, 'Teszt Osztályfőnök', 'osztalyfonok', 'tesztosztalyfonok', 'teszt@iskola.hu', 0xe15b0872c5c2a4213c5409fa54a6a2f500514f7255e88cadc3bd18b4adb6f0ff5b26959c9050dbff4e708419cffec07332322502394c40d5be55a6f49d0e8d41, 0x1dbb354e2dcc68b985022a237bb265ebba3b21d4fceb988e8bb514889191eacad5264a9e2b634c7151047cdbcab0a72984d93caf97bc30ab8be5fcc8be7a63d20126e3c747063eda92d82d6b93becfec3739dcd7cc1e7f0b73a30e04a8e1f7867c6334f63234a584db06a42bb26bf9215b282ac0490db96d3a6d392c06b99422);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `osztaly`
--

CREATE TABLE `osztaly` (
  `id` int(11) NOT NULL,
  `nev` varchar(10) NOT NULL,
  `egyedi_azonosito` varchar(20) DEFAULT NULL,
  `osztalyfonok_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `osztaly`
--

INSERT INTO `osztaly` (`id`, `nev`, `egyedi_azonosito`, `osztalyfonok_id`) VALUES
(1, '1.a', NULL, NULL),
(2, '1.b', NULL, NULL),
(3, '1.c', NULL, NULL),
(4, '2.a', NULL, NULL),
(5, '2.b', NULL, NULL),
(6, '3.a', NULL, NULL),
(7, '3.b', NULL, NULL),
(8, '4.a', NULL, NULL),
(9, '4.b', NULL, NULL),
(10, '5.a', NULL, NULL),
(11, '5.b', NULL, NULL),
(12, '5.c', NULL, NULL),
(13, '6.a', NULL, NULL),
(14, '6.b', NULL, NULL),
(15, '1.a', NULL, NULL),
(16, '1.b', NULL, NULL),
(17, '1.c', NULL, NULL),
(18, '2.a', NULL, NULL),
(19, '2.b', NULL, NULL),
(20, '3.a', NULL, NULL),
(21, '3.b', NULL, NULL),
(22, '4.a', NULL, NULL),
(23, '4.b', NULL, NULL),
(24, '5.a', NULL, NULL),
(25, '5.b', NULL, NULL),
(26, '5.c', NULL, NULL),
(27, '6.a', NULL, NULL),
(28, '6.b', NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `osztaly_felhasznalo`
--

CREATE TABLE `osztaly_felhasznalo` (
  `osztaly_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `szerepkor` enum('osztalyfonok','napkozis') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `osztaly_felhasznalo`
--

INSERT INTO `osztaly_felhasznalo` (`osztaly_id`, `felhasznalo_id`, `szerepkor`) VALUES
(1, 25, 'osztalyfonok'),
(1, 26, 'napkozis'),
(2, 27, 'osztalyfonok'),
(2, 28, 'napkozis'),
(3, 29, 'osztalyfonok'),
(3, 30, 'napkozis'),
(4, 31, 'osztalyfonok'),
(4, 32, 'napkozis'),
(5, 33, 'osztalyfonok'),
(5, 34, 'napkozis'),
(6, 35, 'osztalyfonok'),
(6, 36, 'napkozis'),
(7, 37, 'osztalyfonok'),
(7, 38, 'napkozis'),
(8, 39, 'osztalyfonok'),
(8, 40, 'napkozis'),
(9, 41, 'osztalyfonok'),
(9, 42, 'napkozis'),
(10, 43, 'osztalyfonok'),
(10, 44, 'napkozis'),
(11, 45, 'osztalyfonok'),
(11, 46, 'napkozis'),
(12, 47, 'osztalyfonok'),
(12, 48, 'napkozis'),
(13, 49, 'osztalyfonok'),
(13, 50, 'napkozis'),
(14, 51, 'osztalyfonok'),
(14, 52, 'napkozis');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `porta_uzenet`
--

CREATE TABLE `porta_uzenet` (
  `id` int(11) NOT NULL,
  `tanulo_id` int(11) NOT NULL,
  `uzenet` text NOT NULL,
  `statusz` enum('Jelen_van','Hianyzo','Kulon_foglalkozas','Hazament') DEFAULT 'Jelen_van',
  `idopont` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tanterem`
--

CREATE TABLE `tanterem` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) NOT NULL,
  `aktiv` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `tanterem`
--

INSERT INTO `tanterem` (`id`, `nev`, `aktiv`) VALUES
(1, '1.', 1),
(2, '2.', 1),
(3, '3.', 1),
(4, '4.', 1),
(5, '5.', 1),
(6, '6.', 1),
(7, '7.', 1),
(8, '8.', 1),
(9, '9.', 1),
(10, '10.', 1),
(11, '11.', 1),
(12, '12.', 1),
(13, '13.', 1),
(14, '14.', 1),
(15, '15.', 1),
(16, 'informatika', 1),
(17, 'könyvtár', 1),
(18, 'technika', 1),
(19, 'tornaterem', 1),
(20, 'foglalkoztató', 1),
(21, '1.', 1),
(22, '2.', 1),
(23, '3.', 1),
(24, '4.', 1),
(25, '5.', 1),
(26, '6.', 1),
(27, '7.', 1),
(28, '8.', 1),
(29, '9.', 1),
(30, '10.', 1),
(31, '11.', 1),
(32, '12.', 1),
(33, '13.', 1),
(34, '14.', 1),
(35, '15.', 1),
(36, 'informatika', 1),
(37, 'könyvtár', 1),
(38, 'technika', 1),
(39, 'tornaterem', 1),
(40, 'foglalkoztató', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tanterem_hasznalat`
--

CREATE TABLE `tanterem_hasznalat` (
  `id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `tanterem_id` int(11) NOT NULL,
  `osztaly_id` int(11) DEFAULT NULL,
  `idopont` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tanulo`
--

CREATE TABLE `tanulo` (
  `id` int(11) NOT NULL,
  `okt_azonosito` varchar(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `osztaly_id` int(11) DEFAULT NULL,
  `tanszobas` tinyint(1) DEFAULT 1,
  `spec_hazavitel` tinyint(1) DEFAULT 0,
  `gondviselo_nev` varchar(100) DEFAULT NULL,
  `gondviselo_statusz` varchar(50) DEFAULT NULL,
  `aktiv_evben` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `tanulo`
--

INSERT INTO `tanulo` (`id`, `okt_azonosito`, `nev`, `osztaly_id`, `tanszobas`, `spec_hazavitel`, `gondviselo_nev`, `gondviselo_statusz`, `aktiv_evben`) VALUES
(841, '76187282598', 'Lakatos Levente', 1, 1, 0, NULL, NULL, 1),
(842, '76103180598', 'Varga Bence', 1, 1, 0, NULL, NULL, 1),
(843, '76409040459', 'Takács Nóra', 1, 1, 0, NULL, NULL, 1),
(844, '75940867758', 'Szabó Zoltán', 1, 1, 0, NULL, NULL, 1),
(845, '77261009013', 'Farkas Noémi', 1, 1, 0, NULL, NULL, 1),
(846, '74181990999', 'Farkas Patrik', 1, 1, 0, NULL, NULL, 1),
(847, '74707485969', 'Kovács Lili', 1, 1, 0, NULL, NULL, 1),
(848, '74326723248', 'Kovács Gergő', 1, 1, 0, NULL, NULL, 1),
(849, '74391886174', 'Kiss Zoltán', 1, 1, 0, NULL, NULL, 1),
(850, '73447617299', 'Lakatos Dániel', 1, 1, 0, NULL, NULL, 1),
(851, '73335590099', 'Farkas Anna', 1, 1, 0, NULL, NULL, 1),
(852, '76066911349', 'Szabó Noémi', 1, 1, 0, NULL, NULL, 1),
(853, '79748673172', 'Molnár Nóra', 1, 1, 0, NULL, NULL, 1),
(854, '79403751157', 'Kovács Nóra', 1, 1, 0, NULL, NULL, 1),
(855, '76492125234', 'Takács Viktória', 1, 1, 0, NULL, NULL, 1),
(856, '76226648003', 'Varga Balázs', 2, 1, 0, NULL, NULL, 1),
(857, '78373641860', 'Lakatos Jázmin', 2, 1, 0, NULL, NULL, 1),
(858, '78057976365', 'Nagy Patrik', 2, 1, 0, NULL, NULL, 1),
(859, '71251683168', 'Kovács Lili', 2, 1, 0, NULL, NULL, 1),
(860, '77857431567', 'Lakatos Bence', 2, 1, 0, NULL, NULL, 1),
(861, '78111203575', 'Kovács Levente', 2, 1, 0, NULL, NULL, 1),
(862, '75939770170', 'Nagy Levente', 2, 1, 0, NULL, NULL, 1),
(863, '76066021566', 'Szabó Levente', 2, 1, 0, NULL, NULL, 1),
(864, '76220807611', 'Tóth Máté', 2, 1, 0, NULL, NULL, 1),
(865, '76142417394', 'Kovács Dániel', 2, 1, 0, NULL, NULL, 1),
(866, '79894269862', 'Kovács Emma', 2, 1, 0, NULL, NULL, 1),
(867, '78273628507', 'Kiss Jázmin', 2, 1, 0, NULL, NULL, 1),
(868, '77576088622', 'Kiss Emma', 2, 1, 0, NULL, NULL, 1),
(869, '76505756037', 'Kiss Jázmin', 2, 1, 0, NULL, NULL, 1),
(870, '70180076514', 'Kovács Eszter', 2, 1, 0, NULL, NULL, 1),
(871, '78472299455', 'Nagy Gergő', 3, 1, 0, NULL, NULL, 1),
(872, '71813141913', 'Szabó Nóra', 3, 1, 0, NULL, NULL, 1),
(873, '71544979915', 'Nagy Lili', 3, 1, 0, NULL, NULL, 1),
(874, '71663145214', 'Farkas Eszter', 3, 1, 0, NULL, NULL, 1),
(875, '78033020658', 'Kovács Bence', 3, 1, 0, NULL, NULL, 1),
(876, '78542986747', 'Molnár Noémi', 3, 1, 0, NULL, NULL, 1),
(877, '78508830837', 'Farkas Zoltán', 3, 1, 0, NULL, NULL, 1),
(878, '79725002042', 'Kiss Viktória', 3, 1, 0, NULL, NULL, 1),
(879, '72939483301', 'Takács Anna', 3, 1, 0, NULL, NULL, 1),
(880, '79105420179', 'Kiss Bence', 3, 1, 0, NULL, NULL, 1),
(881, '75249647754', 'Farkas Balázs', 3, 1, 0, NULL, NULL, 1),
(882, '78405052785', 'Kiss Dániel', 3, 1, 0, NULL, NULL, 1),
(883, '76510587774', 'Kiss Eszter', 3, 1, 0, NULL, NULL, 1),
(884, '79298616542', 'Farkas Bence', 3, 1, 0, NULL, NULL, 1),
(885, '78441677477', 'Tóth Levente', 3, 1, 0, NULL, NULL, 1),
(886, '77893702625', 'Tóth Balázs', 4, 1, 0, NULL, NULL, 1),
(887, '74053921310', 'Farkas Zsófia', 4, 1, 0, NULL, NULL, 1),
(888, '74110208413', 'Molnár Ádám', 4, 1, 0, NULL, NULL, 1),
(889, '77016170841', 'Tóth Ádám', 4, 1, 0, NULL, NULL, 1),
(890, '75477273524', 'Molnár Máté', 4, 1, 0, NULL, NULL, 1),
(891, '78222365605', 'Farkas Patrik', 4, 1, 0, NULL, NULL, 1),
(892, '73133382519', 'Molnár Máté', 4, 1, 0, NULL, NULL, 1),
(893, '72622203623', 'Farkas Zoltán', 4, 1, 0, NULL, NULL, 1),
(894, '78488050945', 'Takács Emma', 4, 1, 0, NULL, NULL, 1),
(895, '76343488391', 'Takács Patrik', 4, 1, 1, 'Bognár Béla', 'apa', 1),
(896, '70108827667', 'Kovács Máté', 4, 1, 0, NULL, NULL, 1),
(897, '79866001977', 'Kovács Nóra', 4, 1, 0, NULL, NULL, 1),
(898, '79661471619', 'Lakatos Eszter', 4, 1, 0, NULL, NULL, 1),
(899, '78892274883', 'Kovács Anna', 4, 1, 0, NULL, NULL, 1),
(900, '73505364417', 'Kiss Gergő', 4, 1, 0, NULL, NULL, 1),
(901, '72347208001', 'Molnár Emma', 5, 1, 0, NULL, NULL, 1),
(902, '76589862538', 'Varga Lili', 5, 1, 0, NULL, NULL, 1),
(903, '79865012946', 'Szabó Ádám', 5, 1, 0, NULL, NULL, 1),
(904, '76513082398', 'Tóth Anna', 5, 1, 0, NULL, NULL, 1),
(905, '74053738161', 'Tóth Dániel', 5, 1, 0, NULL, NULL, 1),
(906, '74753428877', 'Takács Nóra', 5, 1, 0, NULL, NULL, 1),
(907, '78310653068', 'Szabó Noémi', 5, 1, 0, NULL, NULL, 1),
(908, '77720975379', 'Szabó Dániel', 5, 1, 0, NULL, NULL, 1),
(909, '78954534784', 'Szabó Nóra', 5, 1, 0, NULL, NULL, 1),
(910, '70188631097', 'Szabó Ádám', 5, 1, 0, NULL, NULL, 1),
(911, '74208176767', 'Szabó Nóra', 5, 1, 0, NULL, NULL, 1),
(912, '79694942733', 'Kiss Gergő', 5, 1, 1, 'Varga Réka', 'gyám', 1),
(913, '79164912787', 'Farkas Gergő', 5, 1, 0, NULL, NULL, 1),
(914, '78436384938', 'Nagy Ádám', 5, 1, 0, NULL, NULL, 1),
(915, '78544671329', 'Nagy Jázmin', 5, 1, 0, NULL, NULL, 1),
(916, '78941725362', 'Kiss Levente', 6, 1, 0, NULL, NULL, 1),
(917, '71671234348', 'Nagy Zsófia', 6, 1, 0, NULL, NULL, 1),
(918, '72140814566', 'Lakatos Viktória', 6, 1, 0, NULL, NULL, 1),
(919, '77030772477', 'Kiss Zsófia', 6, 1, 1, 'Kiss Istvánné', 'nagyszülő', 1),
(920, '74170212048', 'Takács Patrik', 6, 1, 0, NULL, NULL, 1),
(921, '75006314985', 'Szabó Nóra', 6, 1, 0, NULL, NULL, 1),
(922, '74906302110', 'Lakatos Ádám', 6, 1, 0, NULL, NULL, 1),
(923, '71257332605', 'Varga Lili', 6, 1, 0, NULL, NULL, 1),
(924, '70944799783', 'Farkas Patrik', 6, 1, 0, NULL, NULL, 1),
(925, '70618180267', 'Takács Lili', 6, 1, 0, NULL, NULL, 1),
(926, '73669324602', 'Molnár Nóra', 6, 1, 0, NULL, NULL, 1),
(927, '77215579905', 'Varga Eszter', 6, 1, 0, NULL, NULL, 1),
(928, '70225195065', 'Nagy Jázmin', 6, 1, 0, NULL, NULL, 1),
(929, '74960582177', 'Lakatos Levente', 6, 1, 0, NULL, NULL, 1),
(930, '73847146481', 'Tóth Máté', 6, 1, 0, NULL, NULL, 1),
(931, '71696614378', 'Lakatos Zoltán', 7, 1, 0, NULL, NULL, 1),
(932, '77962274109', 'Kiss Noémi', 7, 1, 0, NULL, NULL, 1),
(933, '71588799210', 'Farkas Máté', 7, 1, 0, NULL, NULL, 1),
(934, '78710592699', 'Molnár Eszter', 7, 1, 0, NULL, NULL, 1),
(935, '77217267872', 'Kovács Bence', 7, 1, 0, NULL, NULL, 1),
(936, '71793116196', 'Molnár Anna', 7, 1, 0, NULL, NULL, 1),
(937, '78984003304', 'Szabó Zoltán', 7, 1, 0, NULL, NULL, 1),
(938, '77770311791', 'Nagy Zsófia', 7, 1, 0, NULL, NULL, 1),
(939, '79821906730', 'Tóth Gergő', 7, 1, 0, NULL, NULL, 1),
(940, '79921975530', 'Lakatos Anna', 7, 1, 0, NULL, NULL, 1),
(941, '79074332908', 'Kovács Dániel', 7, 1, 0, NULL, NULL, 1),
(942, '78868125504', 'Takács Zsófia', 7, 1, 0, NULL, NULL, 1),
(943, '73892488171', 'Kovács Emma', 7, 1, 0, NULL, NULL, 1),
(944, '77480499006', 'Takács Bence', 7, 1, 0, NULL, NULL, 1),
(945, '74720488314', 'Farkas Levente', 7, 1, 0, NULL, NULL, 1),
(946, '75880422485', 'Szabó Ádám', 8, 1, 0, NULL, NULL, 1),
(947, '71587014897', 'Farkas Lili', 8, 1, 0, NULL, NULL, 1),
(948, '77658865447', 'Molnár Patrik', 8, 1, 0, NULL, NULL, 1),
(949, '75092717247', 'Nagy Dániel', 8, 1, 0, NULL, NULL, 1),
(950, '72064660718', 'Kiss Levente', 8, 1, 0, NULL, NULL, 1),
(951, '79233068982', 'Kiss Anna', 8, 1, 0, NULL, NULL, 1),
(952, '76613508152', 'Farkas Emma', 8, 1, 0, NULL, NULL, 1),
(953, '71443857260', 'Varga Balázs', 8, 1, 0, NULL, NULL, 1),
(954, '71518013103', 'Lakatos Zoltán', 8, 1, 0, NULL, NULL, 1),
(955, '78545254029', 'Takács Jázmin', 8, 1, 0, NULL, NULL, 1),
(956, '78783437112', 'Nagy Bence', 8, 1, 0, NULL, NULL, 1),
(957, '74539288818', 'Molnár Zoltán', 8, 1, 0, NULL, NULL, 1),
(958, '76194692754', 'Lakatos Máté', 8, 1, 0, NULL, NULL, 1),
(959, '72675742802', 'Szabó Levente', 8, 1, 0, NULL, NULL, 1),
(960, '74077796155', 'Szabó Balázs', 8, 1, 0, NULL, NULL, 1),
(961, '72310172558', 'Takács Anna', 9, 1, 0, NULL, NULL, 1),
(962, '74703706088', 'Molnár Viktória', 9, 1, 0, NULL, NULL, 1),
(963, '72132824128', 'Lakatos Zsófia', 9, 1, 0, NULL, NULL, 1),
(964, '74471209440', 'Kiss Viktória', 9, 1, 0, NULL, NULL, 1),
(965, '72900854196', 'Kiss Bence', 9, 1, 0, NULL, NULL, 1),
(966, '73977815744', 'Kovács Dániel', 9, 1, 0, NULL, NULL, 1),
(967, '78787896106', 'Varga Zsófia', 9, 1, 0, NULL, NULL, 1),
(968, '74447124254', 'Tóth Nóra', 9, 1, 1, 'Nagy Zsófia', 'nevelőszülő', 1),
(969, '71366284749', 'Molnár Ádám', 9, 1, 0, NULL, NULL, 1),
(970, '77452597827', 'Nagy Dániel', 9, 1, 0, NULL, NULL, 1),
(971, '78491136780', 'Szabó Lili', 9, 1, 0, NULL, NULL, 1),
(972, '70735676515', 'Varga Bence', 9, 1, 0, NULL, NULL, 1),
(973, '75043578923', 'Molnár Patrik', 9, 1, 0, NULL, NULL, 1),
(974, '76599239019', 'Varga Emma', 9, 1, 0, NULL, NULL, 1),
(975, '77452470624', 'Kovács Balázs', 9, 1, 0, NULL, NULL, 1),
(976, '78334499004', 'Lakatos Zoltán', 10, 1, 0, NULL, NULL, 1),
(977, '72054281160', 'Szabó Gergő', 10, 1, 0, NULL, NULL, 1),
(978, '73401081825', 'Takács Eszter', 10, 1, 0, NULL, NULL, 1),
(979, '77478861644', 'Kiss Levente', 10, 1, 0, NULL, NULL, 1),
(980, '70653750822', 'Kovács Jázmin', 10, 1, 0, NULL, NULL, 1),
(981, '79937255953', 'Tóth Noémi', 10, 1, 0, NULL, NULL, 1),
(982, '70840301413', 'Kiss Eszter', 10, 1, 0, NULL, NULL, 1),
(983, '72998121435', 'Lakatos Viktória', 10, 1, 0, NULL, NULL, 1),
(984, '75913779330', 'Tóth Nóra', 10, 1, 0, NULL, NULL, 1),
(985, '77026496390', 'Molnár Gergő', 10, 1, 0, NULL, NULL, 1),
(986, '76174530146', 'Molnár Dániel', 10, 1, 0, NULL, NULL, 1),
(987, '74789131057', 'Varga Noémi', 10, 1, 0, NULL, NULL, 1),
(988, '78935480203', 'Varga Lili', 10, 1, 0, NULL, NULL, 1),
(989, '73552028180', 'Lakatos Dániel', 10, 1, 0, NULL, NULL, 1),
(990, '79161760744', 'Takács Eszter', 10, 1, 0, NULL, NULL, 1),
(991, '75373315817', 'Kiss Máté', 11, 1, 0, NULL, NULL, 1),
(992, '71520163684', 'Farkas Noémi', 11, 1, 0, NULL, NULL, 1),
(993, '75429402076', 'Molnár Zoltán', 11, 1, 0, NULL, NULL, 1),
(994, '75776284401', 'Tóth Gergő', 11, 1, 0, NULL, NULL, 1),
(995, '71385384680', 'Nagy Zoltán', 11, 1, 0, NULL, NULL, 1),
(996, '75737941965', 'Molnár Dániel', 11, 1, 0, NULL, NULL, 1),
(997, '77412144016', 'Lakatos Emma', 11, 1, 0, NULL, NULL, 1),
(998, '78975240911', 'Szabó Gergő', 11, 1, 0, NULL, NULL, 1),
(999, '73972879475', 'Nagy Patrik', 11, 1, 0, NULL, NULL, 1),
(1000, '79641129105', 'Farkas Noémi', 11, 1, 0, NULL, NULL, 1),
(1001, '72696359043', 'Varga Jázmin', 11, 1, 0, NULL, NULL, 1),
(1002, '79706409019', 'Tóth Lili', 11, 1, 0, NULL, NULL, 1),
(1003, '72933425890', 'Varga Lili', 11, 1, 0, NULL, NULL, 1),
(1004, '76881349931', 'Farkas Nóra', 11, 1, 0, NULL, NULL, 1),
(1005, '74393261412', 'Nagy Levente', 11, 1, 0, NULL, NULL, 1),
(1006, '72546887832', 'Nagy Ádám', 12, 1, 1, 'Pintér Réka', 'anya', 1),
(1007, '79466672474', 'Kovács Noémi', 12, 1, 0, NULL, NULL, 1),
(1008, '70717576149', 'Tóth Zoltán', 12, 1, 0, NULL, NULL, 1),
(1009, '70577899230', 'Farkas Emma', 12, 1, 0, NULL, NULL, 1),
(1010, '74474666793', 'Lakatos Eszter', 12, 1, 0, NULL, NULL, 1),
(1011, '79175434005', 'Tóth Viktória', 12, 1, 0, NULL, NULL, 1),
(1012, '75739160641', 'Szabó Máté', 12, 1, 0, NULL, NULL, 1),
(1013, '79234005810', 'Kiss Lili', 12, 1, 0, NULL, NULL, 1),
(1014, '75303796435', 'Farkas Patrik', 12, 1, 0, NULL, NULL, 1),
(1015, '76253220389', 'Varga Ádám', 12, 1, 0, NULL, NULL, 1),
(1016, '75281458971', 'Varga Anna', 12, 1, 0, NULL, NULL, 1),
(1017, '73369983781', 'Szabó Nóra', 12, 1, 0, NULL, NULL, 1),
(1018, '75508595732', 'Nagy Anna', 12, 1, 0, NULL, NULL, 1),
(1019, '72576996852', 'Nagy Zoltán', 12, 1, 0, NULL, NULL, 1),
(1020, '71607183427', 'Kiss Zsófia', 12, 1, 0, NULL, NULL, 1),
(1021, '77110415737', 'Kiss Emma', 13, 1, 0, NULL, NULL, 1),
(1022, '71815774678', 'Takács Balázs', 13, 1, 0, NULL, NULL, 1),
(1023, '71988995740', 'Varga Dániel', 13, 1, 0, NULL, NULL, 1),
(1024, '76914580964', 'Kiss Zoltán', 13, 1, 0, NULL, NULL, 1),
(1025, '73843858742', 'Tóth Dániel', 13, 1, 0, NULL, NULL, 1),
(1026, '79321992017', 'Nagy Jázmin', 13, 1, 0, NULL, NULL, 1),
(1027, '75044995438', 'Lakatos Bence', 13, 1, 0, NULL, NULL, 1),
(1028, '71703122762', 'Nagy Emma', 13, 1, 0, NULL, NULL, 1),
(1029, '74866978907', 'Kovács Zsófia', 13, 1, 0, NULL, NULL, 1),
(1030, '73688646534', 'Szabó Balázs', 13, 1, 0, NULL, NULL, 1),
(1031, '72605481850', 'Varga Patrik', 13, 1, 0, NULL, NULL, 1),
(1032, '70410253816', 'Molnár Nóra', 13, 1, 0, NULL, NULL, 1),
(1033, '76220454722', 'Kovács Eszter', 13, 1, 0, NULL, NULL, 1),
(1034, '76960019893', 'Kovács Noémi', 13, 1, 0, NULL, NULL, 1),
(1035, '77667649528', 'Kiss Patrik', 13, 1, 0, NULL, NULL, 1),
(1036, '73317324071', 'Molnár Nóra', 14, 1, 0, NULL, NULL, 1),
(1037, '74398947781', 'Tóth Anna', 14, 1, 0, NULL, NULL, 1),
(1038, '74291208608', 'Tóth Ádám', 14, 1, 0, NULL, NULL, 1),
(1039, '77778551340', 'Lakatos Gergő', 14, 1, 0, NULL, NULL, 1),
(1040, '78303152331', 'Nagy Patrik', 14, 1, 0, NULL, NULL, 1),
(1041, '71949452470', 'Varga Levente', 14, 1, 0, NULL, NULL, 1),
(1042, '70882726322', 'Nagy Máté', 14, 1, 0, NULL, NULL, 1),
(1043, '77989611637', 'Takács Levente', 14, 1, 0, NULL, NULL, 1),
(1044, '78802263475', 'Farkas Zoltán', 14, 1, 0, NULL, NULL, 1),
(1045, '76539583317', 'Kiss Noémi', 14, 1, 0, NULL, NULL, 1),
(1046, '75794189994', 'Farkas Zsófia', 14, 1, 0, NULL, NULL, 1),
(1047, '74064184501', 'Molnár Zsófia', 14, 1, 0, NULL, NULL, 1),
(1048, '71274944257', 'Farkas Ádám', 14, 1, 0, NULL, NULL, 1),
(1049, '72729288709', 'Nagy Máté', 14, 1, 0, NULL, NULL, 1),
(1050, '73350301729', 'Takács Bence', 14, 1, 0, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tanulo_archiv`
--

CREATE TABLE `tanulo_archiv` (
  `id` int(11) NOT NULL,
  `okt_azonosito` varchar(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `osztaly_nev` varchar(10) DEFAULT NULL,
  `torles_idopont` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `belepes`
--
ALTER TABLE `belepes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `felhasznalonev` (`felhasznalonev`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_felhasznalonev` (`felhasznalonev`),
  ADD KEY `idx_email` (`email`);

--
-- A tábla indexei `osztaly`
--
ALTER TABLE `osztaly`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `egyedi_azonosito` (`egyedi_azonosito`),
  ADD KEY `osztalyfonok_id` (`osztalyfonok_id`);

--
-- A tábla indexei `osztaly_felhasznalo`
--
ALTER TABLE `osztaly_felhasznalo`
  ADD PRIMARY KEY (`osztaly_id`,`szerepkor`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `porta_uzenet`
--
ALTER TABLE `porta_uzenet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tanulo_id` (`tanulo_id`);

--
-- A tábla indexei `tanterem`
--
ALTER TABLE `tanterem`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `tanterem_hasznalat`
--
ALTER TABLE `tanterem_hasznalat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `tanterem_id` (`tanterem_id`),
  ADD KEY `osztaly_id` (`osztaly_id`);

--
-- A tábla indexei `tanulo`
--
ALTER TABLE `tanulo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `okt_azonosito` (`okt_azonosito`),
  ADD KEY `osztaly_id` (`osztaly_id`),
  ADD KEY `idx_okt_azonosito` (`okt_azonosito`);

--
-- A tábla indexei `tanulo_archiv`
--
ALTER TABLE `tanulo_archiv`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `belepes`
--
ALTER TABLE `belepes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT a táblához `osztaly`
--
ALTER TABLE `osztaly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT a táblához `porta_uzenet`
--
ALTER TABLE `porta_uzenet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `tanterem`
--
ALTER TABLE `tanterem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT a táblához `tanterem_hasznalat`
--
ALTER TABLE `tanterem_hasznalat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `tanulo`
--
ALTER TABLE `tanulo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1051;

--
-- AUTO_INCREMENT a táblához `tanulo_archiv`
--
ALTER TABLE `tanulo_archiv`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `belepes`
--
ALTER TABLE `belepes`
  ADD CONSTRAINT `belepes_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `osztaly`
--
ALTER TABLE `osztaly`
  ADD CONSTRAINT `osztaly_ibfk_1` FOREIGN KEY (`osztalyfonok_id`) REFERENCES `felhasznalo` (`id`) ON DELETE SET NULL;

--
-- Megkötések a táblához `osztaly_felhasznalo`
--
ALTER TABLE `osztaly_felhasznalo`
  ADD CONSTRAINT `osztaly_felhasznalo_ibfk_1` FOREIGN KEY (`osztaly_id`) REFERENCES `osztaly` (`id`),
  ADD CONSTRAINT `osztaly_felhasznalo_ibfk_2` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`id`);

--
-- Megkötések a táblához `porta_uzenet`
--
ALTER TABLE `porta_uzenet`
  ADD CONSTRAINT `porta_uzenet_ibfk_1` FOREIGN KEY (`tanulo_id`) REFERENCES `tanulo` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `tanterem_hasznalat`
--
ALTER TABLE `tanterem_hasznalat`
  ADD CONSTRAINT `tanterem_hasznalat_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tanterem_hasznalat_ibfk_2` FOREIGN KEY (`tanterem_id`) REFERENCES `tanterem` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tanterem_hasznalat_ibfk_3` FOREIGN KEY (`osztaly_id`) REFERENCES `osztaly` (`id`) ON DELETE SET NULL;

--
-- Megkötések a táblához `tanulo`
--
ALTER TABLE `tanulo`
  ADD CONSTRAINT `tanulo_ibfk_1` FOREIGN KEY (`osztaly_id`) REFERENCES `osztaly` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
