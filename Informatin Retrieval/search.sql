-- phpMyAdmin SQL Dump
-- version 2.11.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 03, 2013 at 12:49 AM
-- Server version: 5.0.51
-- PHP Version: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ser_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `cpt_search_crawl`
--

CREATE TABLE `cpt_search_crawl` (
  `DOCUMENT_URL` varchar(255) collate latin1_general_cs NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;

--
-- Dumping data for table `cpt_search_crawl`
--

INSERT INTO `cpt_search_crawl` (`DOCUMENT_URL`) VALUES
('http://localhost/hresdbms/index.html');

-- --------------------------------------------------------

--
-- Table structure for table `cpt_search_document`
--

CREATE TABLE `cpt_search_document` (
  `DOCUMENT_ID` int(10) unsigned NOT NULL auto_increment,
  `DOCUMENT_URL` varchar(255) collate latin1_general_cs NOT NULL,
  `DOCUMENT_TITLE` varchar(255) collate latin1_general_cs default NULL,
  `DESCRIPTION` varchar(255) collate latin1_general_cs default NULL,
  PRIMARY KEY  (`DOCUMENT_ID`),
  UNIQUE KEY `DOCUMENT_URL` (`DOCUMENT_URL`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs AUTO_INCREMENT=2 ;

--
-- Dumping data for table `cpt_search_document`
--

INSERT INTO `cpt_search_document` (`DOCUMENT_ID`, `DOCUMENT_URL`, `DOCUMENT_TITLE`, `DESCRIPTION`) VALUES
(1, 'http://localhost/hresdbms/index.html', 'index.html', 'No description provided.');

-- --------------------------------------------------------

--
-- Table structure for table `cpt_search_index`
--

CREATE TABLE `cpt_search_index` (
  `TERM_ID` int(10) unsigned NOT NULL,
  `DOCUMENT_ID` int(10) unsigned NOT NULL,
  `OFFSET` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`DOCUMENT_ID`,`OFFSET`),
  KEY `TERM_ID` (`TERM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;

--
-- Dumping data for table `cpt_search_index`
--

INSERT INTO `cpt_search_index` (`TERM_ID`, `DOCUMENT_ID`, `OFFSET`) VALUES
(1, 1, 1),
(1, 1, 3),
(1, 1, 12),
(2, 1, 5),
(3, 1, 6),
(4, 1, 7),
(5, 1, 8),
(6, 1, 9),
(7, 1, 15);

-- --------------------------------------------------------

--
-- Table structure for table `cpt_search_stop_word`
--

CREATE TABLE `cpt_search_stop_word` (
  `TERM_VALUE` varchar(255) collate latin1_general_cs NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;

--
-- Dumping data for table `cpt_search_stop_word`
--

INSERT INTO `cpt_search_stop_word` (`TERM_VALUE`) VALUES
('about'),
('above'),
('after'),
('again'),
('against'),
('all'),
('am'),
('an'),
('and'),
('any'),
('are'),
('aren''t'),
('as'),
('at'),
('be'),
('because'),
('been'),
('before'),
('being'),
('below'),
('between'),
('both'),
('but'),
('by'),
('can''t'),
('cannot'),
('could'),
('couldn''t'),
('did'),
('didn''t'),
('do'),
('does'),
('doesn''t'),
('doing'),
('don''t'),
('down'),
('during'),
('each'),
('few'),
('for'),
('from'),
('further'),
('had'),
('hadn''t'),
('has'),
('hasn''t'),
('have'),
('haven''t'),
('having'),
('he'),
('he''d'),
('he''ll'),
('he''s'),
('her'),
('here'),
('here''s'),
('hers'),
('herself'),
('him'),
('himself'),
('his'),
('how'),
('how''s'),
('i'),
('i''d'),
('i''ll'),
('i''m'),
('i''ve'),
('if'),
('in'),
('into'),
('is'),
('isn''t'),
('it'),
('it''s'),
('its'),
('itself'),
('let''s'),
('me'),
('more'),
('most'),
('mustn''t'),
('my'),
('myself'),
('no'),
('nor'),
('not'),
('of'),
('off'),
('on'),
('once'),
('only'),
('or'),
('other'),
('ought'),
('our'),
('ours'),
('ourselves'),
('out'),
('over'),
('own'),
('same'),
('shan''t'),
('she'),
('she''d'),
('she''ll'),
('she''s'),
('should'),
('shouldn''t'),
('so'),
('some'),
('such'),
('than'),
('that'),
('that''s'),
('the'),
('their'),
('theirs'),
('them'),
('themselves'),
('then'),
('there'),
('there''s'),
('these'),
('they'),
('they''d'),
('they''ll'),
('they''re'),
('they''ve'),
('this'),
('those'),
('through'),
('to'),
('too'),
('under'),
('until'),
('up'),
('very'),
('was'),
('wasn''t'),
('we'),
('we''d'),
('we''ll'),
('we''re'),
('we''ve'),
('were'),
('weren''t'),
('what'),
('what''s'),
('when'),
('when''s'),
('where'),
('where''s'),
('which'),
('while'),
('who'),
('who''s'),
('whom'),
('why'),
('why''s'),
('with'),
('won''t'),
('would'),
('wouldn''t'),
('you'),
('you''d'),
('you''ll'),
('you''re'),
('you''ve'),
('your'),
('yours'),
('yourself'),
('yourselves');

-- --------------------------------------------------------

--
-- Table structure for table `cpt_search_term`
--

CREATE TABLE `cpt_search_term` (
  `TERM_ID` int(10) unsigned NOT NULL auto_increment,
  `TERM_VALUE` varchar(255) collate latin1_general_cs NOT NULL,
  PRIMARY KEY  (`TERM_ID`),
  UNIQUE KEY `TERM_VALUE` (`TERM_VALUE`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs AUTO_INCREMENT=8 ;

--
-- Dumping data for table `cpt_search_term`
--

INSERT INTO `cpt_search_term` (`TERM_ID`, `TERM_VALUE`) VALUES
(1, 'found'),
(4, 'hresdbms'),
(6, 'html'),
(5, 'index'),
(2, 'requested'),
(7, 'server'),
(3, 'url');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` tinyint(10) unsigned NOT NULL auto_increment,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY  (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `username`, `password`) VALUES
(1, 'scott', 'tiger', 'admin', 'e3a7fce121d19f4b2b645cd344d8a2318e2601c2');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cpt_search_index`
--
ALTER TABLE `cpt_search_index`
  ADD CONSTRAINT `cpt_search_index_ibfk_1` FOREIGN KEY (`TERM_ID`) REFERENCES `cpt_search_term` (`TERM_ID`),
  ADD CONSTRAINT `cpt_search_index_ibfk_2` FOREIGN KEY (`DOCUMENT_ID`) REFERENCES `cpt_search_document` (`DOCUMENT_ID`);
