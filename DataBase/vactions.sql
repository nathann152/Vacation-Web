-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2022 at 02:08 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vactions`
--
CREATE DATABASE IF NOT EXISTS `vactions` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vactions`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(2, 1),
(2, 2),
(2, 3),
(3, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `rold` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `userName`, `password`, `rold`) VALUES
(1, 'nathan', 'natanov', 'nathan152', '1234', 'admin'),
(2, 'bart', 'simpson', 'bart1234', '1234', 'user'),
(3, 'lisa', 'simpson', 'lisa1234', '1234', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `destination` varchar(20) NOT NULL,
  `imageName` varchar(30) NOT NULL,
  `fromDate` date NOT NULL,
  `untilDate` date NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `description`, `destination`, `imageName`, `fromDate`, `untilDate`, `price`) VALUES
(1, 'Thailand offers a wide range of paradisaical islands to choose from. It is the perfect destination to enjoy warm sunshine, while combining the opportunity to experience a different culture. It boasts of world class beach towns like Koh Pha Ngan, Koh Samui, Krabi, Phuket, and Phi Phi Island. Stay in one place on a Thai beach escape or go island hopping. Both promise some of the best beaches in the world!', 'Thailand', '', '2022-07-15', '2022-07-30', 10000),
(2, 'Barcelona is a fantastic holiday destination. It\'s one of the top travel destinations for a good reason. You\'ll love the food, the architecture and the overall atmosphere of the city. Besides, Barcelona has a seaside too, which allows you to combine a city holiday with a beach vacation.', 'Barcelona', '', '2022-07-01', '2022-07-09', 5000),
(3, 'With fabulous beaches, ancient ruins, alluring culture, dynamic cities brimming with colonial architecture, and feisty mouthwatering cuisine, Mexico truly is a tropical treasure trove. Here is our selection of 25 of the best reasons to go to Mexico. Mexico is a destination that has something special for everyone.', 'Mexico', '', '2022-07-01', '2022-08-01', 20000),
(4, 'The subject of countless love songs and the star of stage and screen, there are so many things to see and do in ever-inspiring New York City. Whether you want to muse at museums, feast at some of the very best restaurants in the world, or drink your way around atmospheric dive bars, our list of the best things to do in New York City will steer you to celebrated sites and invite you to look beyond the beaten path a little, too. Here are just a few of the best reasons to visit New York.', 'New York, USA', '', '2022-08-01', '2022-08-31', 30000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
