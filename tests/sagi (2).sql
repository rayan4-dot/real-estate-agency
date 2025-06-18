-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 18, 2025 at 12:09 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sagi`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `property_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `name`, `email`, `phone`, `date`, `time`, `property_id`, `user_id`, `updated_at`, `created_at`) VALUES
(1, 'Rayan', 'rayan@gmail.com', NULL, NULL, NULL, 3, 4, '2025-06-17 20:27:27', '2025-06-17 20:26:45');

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `title`, `content`, `created_at`, `user_id`, `updated_at`) VALUES
(1, 'Test Blog', 'Some content', '2025-06-17 20:58:53', 2, '2025-06-17 19:58:53');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_spatie.permission.cache', 'a:3:{s:5:\"alias\";a:4:{s:1:\"a\";s:2:\"id\";s:1:\"b\";s:4:\"name\";s:1:\"c\";s:10:\"guard_name\";s:1:\"r\";s:5:\"roles\";}s:11:\"permissions\";a:26:{i:0;a:4:{s:1:\"a\";i:1;s:1:\"b\";s:17:\"search properties\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:4;}}i:1;a:4:{s:1:\"a\";i:2;s:1:\"b\";s:13:\"view property\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:4;}}i:2;a:4:{s:1:\"a\";i:3;s:1:\"b\";s:20:\"send contact request\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:4;}}i:3;a:4:{s:1:\"a\";i:4;s:1:\"b\";s:19:\"request appointment\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:4;}}i:4;a:4:{s:1:\"a\";i:5;s:1:\"b\";s:12:\"add favorite\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:4;}}i:5;a:4:{s:1:\"a\";i:6;s:1:\"b\";s:9:\"read blog\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:4;}}i:6;a:4:{s:1:\"a\";i:7;s:1:\"b\";s:8:\"register\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:4;}}i:7;a:4:{s:1:\"a\";i:8;s:1:\"b\";s:5:\"login\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:4;}}i:8;a:4:{s:1:\"a\";i:9;s:1:\"b\";s:15:\"submit property\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:2;i:1;i:4;}}i:9;a:4:{s:1:\"a\";i:10;s:1:\"b\";s:27:\"receive submission feedback\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:2;i:1;i:4;}}i:10;a:4:{s:1:\"a\";i:11;s:1:\"b\";s:15:\"create property\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:3;i:1;i:4;}}i:11;a:4:{s:1:\"a\";i:12;s:1:\"b\";s:13:\"edit property\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:3;i:1;i:4;}}i:12;a:4:{s:1:\"a\";i:13;s:1:\"b\";s:15:\"delete property\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:3;i:1;i:4;}}i:13;a:4:{s:1:\"a\";i:14;s:1:\"b\";s:13:\"manage photos\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:3;i:1;i:4;}}i:14;a:4:{s:1:\"a\";i:15;s:1:\"b\";s:19:\"manage appointments\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:3;i:1;i:4;}}i:15;a:4:{s:1:\"a\";i:16;s:1:\"b\";s:21:\"view contact requests\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:3;i:1;i:4;}}i:16;a:4:{s:1:\"a\";i:17;s:1:\"b\";s:10:\"write blog\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:3;i:1;i:4;}}i:17;a:4:{s:1:\"a\";i:18;s:1:\"b\";s:12:\"publish blog\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:3;i:1;i:4;}}i:18;a:4:{s:1:\"a\";i:19;s:1:\"b\";s:10:\"view users\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:3;i:1;i:4;}}i:19;a:4:{s:1:\"a\";i:20;s:1:\"b\";s:12:\"manage users\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:4;}}i:20;a:4:{s:1:\"a\";i:21;s:1:\"b\";s:21:\"manage all properties\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:4;}}i:21;a:4:{s:1:\"a\";i:22;s:1:\"b\";s:11:\"delete blog\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:4;}}i:22;a:4:{s:1:\"a\";i:23;s:1:\"b\";s:10:\"view stats\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:4;}}i:23;a:4:{s:1:\"a\";i:24;s:1:\"b\";s:20:\"moderate submissions\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:4;}}i:24;a:4:{s:1:\"a\";i:25;s:1:\"b\";s:12:\"manage roles\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:4;}}i:25;a:4:{s:1:\"a\";i:26;s:1:\"b\";s:18:\"manage permissions\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:4;}}}s:5:\"roles\";a:4:{i:0;a:3:{s:1:\"a\";i:1;s:1:\"b\";s:6:\"client\";s:1:\"c\";s:3:\"web\";}i:1;a:3:{s:1:\"a\";i:4;s:1:\"b\";s:5:\"admin\";s:1:\"c\";s:3:\"web\";}i:2;a:3:{s:1:\"a\";i:2;s:1:\"b\";s:12:\"proprietaire\";s:1:\"c\";s:3:\"web\";}i:3;a:3:{s:1:\"a\";i:3;s:1:\"b\";s:5:\"agent\";s:1:\"c\";s:3:\"web\";}}}', 1750279395);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(2, 'Test Category', 'Demo', '2025-06-17 20:24:24', '2025-06-17 20:24:24'),
(3, 'repudiandae', 'Quidem sed voluptates eum sed.', '2025-06-17 21:05:24', '2025-06-17 21:05:24'),
(4, 'enim', 'Harum qui et maiores.', '2025-06-17 21:05:24', '2025-06-17 21:05:24'),
(5, 'iusto', 'Quas ut nihil totam repellat.', '2025-06-17 21:05:24', '2025-06-17 21:05:24'),
(6, 'porro', 'Voluptas suscipit reprehenderit quia expedita est.', '2025-06-17 21:05:24', '2025-06-17 21:05:24'),
(7, 'occaecati', 'Et et ratione ipsam dicta saepe corporis earum.', '2025-06-17 21:05:24', '2025-06-17 21:05:24'),
(8, 'aspernatur', 'Itaque aut quisquam in numquam veritatis sapiente nihil assumenda.', '2025-06-17 21:05:24', '2025-06-17 21:05:24'),
(9, 'illum', 'Assumenda et qui quibusdam rem id et.', '2025-06-17 21:05:24', '2025-06-17 21:05:24');

-- --------------------------------------------------------

--
-- Table structure for table `contact_requests`
--

CREATE TABLE `contact_requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `property_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_requests`
--

INSERT INTO `contact_requests` (`id`, `name`, `email`, `message`, `created_at`, `property_id`, `user_id`, `updated_at`) VALUES
(1, 'Interested Buyer', 'buyer@example.com', 'I would like more info about this property.', '2025-06-17 21:44:03', 2, 4, '2025-06-17 20:44:03');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favorite_properties`
--

CREATE TABLE `favorite_properties` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `property_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `favorite_properties`
--

INSERT INTO `favorite_properties` (`user_id`, `property_id`, `created_at`, `updated_at`) VALUES
(4, 2, '2025-06-17 20:42:36', '2025-06-17 20:42:36');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000001_create_cache_table', 1),
(2, '0001_01_01_000001_create_users_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_06_17_180306_create_categories_table', 1),
(5, '2025_06_17_180307_create_properties_table', 1),
(6, '2025_06_17_180317_create_photos_table', 1),
(7, '2025_06_17_180438_create_appointments_table', 1),
(8, '2025_06_17_180457_create_blog_posts_table', 1),
(9, '2025_06_17_180513_create_contact_requests_table', 1),
(10, '2025_06_17_180539_create_favorite_properties_table', 1),
(11, '2025_06_17_180551_create_property_submissions_table', 1),
(12, '2025_06_17_193253_create_permission_tables', 1);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 4),
(2, 'App\\Models\\User', 3),
(3, 'App\\Models\\User', 2),
(4, 'App\\Models\\User', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'search properties', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(2, 'view property', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(3, 'send contact request', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(4, 'request appointment', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(5, 'add favorite', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(6, 'read blog', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(7, 'register', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(8, 'login', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(9, 'submit property', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(10, 'receive submission feedback', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(11, 'create property', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(12, 'edit property', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(13, 'delete property', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(14, 'manage photos', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(15, 'manage appointments', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(16, 'view contact requests', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(17, 'write blog', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(18, 'publish blog', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(19, 'view users', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(20, 'manage users', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(21, 'manage all properties', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(22, 'delete blog', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(23, 'view stats', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(24, 'moderate submissions', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(25, 'manage roles', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(26, 'manage permissions', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `url` varchar(255) NOT NULL,
  `property_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `surface` double DEFAULT NULL,
  `rooms` int(11) DEFAULT NULL,
  `bedrooms` int(11) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `type` enum('house','apartment','studio','villa') NOT NULL,
  `status` enum('available','sold','rented') NOT NULL DEFAULT 'available',
  `published_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `title`, `description`, `surface`, `rooms`, `bedrooms`, `price`, `address`, `city`, `type`, `status`, `published_at`, `user_id`, `category_id`, `created_at`, `updated_at`) VALUES
(2, 'Test Property', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'house', 'available', '2025-06-17 22:19:16', 2, NULL, '2025-06-17 20:19:16', '2025-06-17 20:19:16'),
(3, 'Rayan', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'house', 'available', '2025-06-17 22:24:34', 2, 2, '2025-06-17 20:24:34', '2025-06-17 20:24:34'),
(4, 'Roxanne Land', 'Maiores aspernatur fugiat id enim. Doloribus dignissimos velit omnis sapiente omnis nihil optio. Consequatur ab id dolorem placeat.', 194, 2, 2, 624836, '853 Graciela Trafficway\nWest Hopemouth, TN 51974', 'Dewaynefurt', 'house', 'sold', '2025-02-13 23:11:16', 1, 4, '2025-06-17 21:05:25', '2025-06-17 21:05:25'),
(5, 'Burnice Inlet', 'Voluptas sed blanditiis necessitatibus consequatur quo. Laboriosam temporibus dolorum ut qui quasi. Inventore quo dolores consequuntur quaerat. Sit quia illo et impedit beatae in.', 233, 6, 6, 223485, '9216 Letha Square\nMohrfort, ND 41626-1245', 'Lorenzview', 'villa', 'rented', '2025-01-14 09:25:38', 1, 8, '2025-06-17 21:05:25', '2025-06-17 21:05:25'),
(6, 'Ward Prairie', 'Praesentium corrupti iusto necessitatibus. Dignissimos recusandae esse tempora ipsam. Delectus vel est ratione aperiam minus autem deserunt autem. Voluptatem mollitia minus voluptas soluta iure qui ipsum sapiente.', 88, 4, 4, 410211, '9955 Leannon Keys Apt. 932\nLake Imeldatown, MA 17260', 'North Cecelia', 'studio', 'sold', '2025-03-14 19:18:32', 2, 7, '2025-06-17 21:05:25', '2025-06-17 21:05:25'),
(7, 'Schultz Shoal', 'Voluptatem qui exercitationem nobis excepturi. Facere odit voluptate architecto corrupti autem. Eos debitis unde aliquid sit ipsum at voluptatem consequatur. Sint pariatur assumenda est consequatur rerum sed vitae accusantium.', 219, 5, 3, 444022, '6081 Herzog Court\nWest Jordi, NV 88845', 'Lake Gudrun', 'studio', 'sold', '2025-03-28 03:49:50', 2, 3, '2025-06-17 21:05:25', '2025-06-17 21:05:25'),
(8, 'Julianne Burgs', 'Beatae similique dolor repellat aut quo perspiciatis. Quo sunt omnis eum saepe maxime dolor. Quibusdam esse sint molestiae corrupti voluptatum.', 90, 4, 5, 63507, '9492 Cummerata Trail Apt. 563\nMargaritaborough, TN 24549', 'Favianmouth', 'house', 'available', '2025-01-14 14:28:24', 2, 6, '2025-06-17 21:05:25', '2025-06-17 21:05:25'),
(9, 'Hahn Plains', 'Non iusto omnis consequuntur aperiam explicabo. Ullam sunt ut ut nobis. Vitae voluptas nihil dolorum recusandae. Vero et eius et laudantium a magnam.', 59, 8, 1, 220322, '7846 Ines Inlet\nNew Wilhelmineside, LA 60560-4973', 'Robertsmouth', 'villa', 'available', '2025-01-06 17:03:57', 2, 9, '2025-06-17 21:05:25', '2025-06-17 21:05:25'),
(10, 'Lorena Squares', 'Facere sit quam aut voluptate eveniet aut dignissimos. Occaecati et ut in optio quo. Reprehenderit dolor commodi enim ducimus quisquam nostrum similique enim.', 171, 4, 1, 552253, '51037 Terence Way Apt. 806\nNorth Alyce, SD 77320', 'Mitchellton', 'studio', 'available', '2025-02-27 17:39:31', 2, 2, '2025-06-17 21:05:25', '2025-06-17 21:05:25');

-- --------------------------------------------------------

--
-- Table structure for table `property_submissions`
--

CREATE TABLE `property_submissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `owner_name` varchar(100) DEFAULT NULL,
  `owner_email` varchar(100) DEFAULT NULL,
  `property_details` text DEFAULT NULL,
  `status` enum('pending','validated','rejected') NOT NULL DEFAULT 'pending',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `property_id` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `property_submissions`
--

INSERT INTO `property_submissions` (`id`, `owner_name`, `owner_email`, `property_details`, `status`, `created_at`, `property_id`, `updated_at`) VALUES
(1, 'Owner Name', 'owner@example.com', 'Nice house', 'pending', '2025-06-17 21:28:16', NULL, '2025-06-17 20:28:16');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'client', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(2, 'proprietaire', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(3, 'agent', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00'),
(4, 'admin', 'web', '2025-06-17 18:54:00', '2025-06-17 18:54:00');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(1, 4),
(2, 1),
(2, 4),
(3, 1),
(3, 4),
(4, 1),
(4, 4),
(5, 1),
(5, 4),
(6, 1),
(6, 4),
(7, 1),
(7, 4),
(8, 1),
(8, 4),
(9, 2),
(9, 4),
(10, 2),
(10, 4),
(11, 3),
(11, 4),
(12, 3),
(12, 4),
(13, 3),
(13, 4),
(14, 3),
(14, 4),
(15, 3),
(15, 4),
(16, 3),
(16, 4),
(17, 3),
(17, 4),
(18, 3),
(18, 4),
(19, 3),
(19, 4),
(20, 4),
(21, 4),
(22, 4),
(23, 4),
(24, 4),
(25, 4),
(26, 4);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `created_at`, `updated_at`, `remember_token`) VALUES
(1, 'Admin User', 'admin@example.com', '$2y$12$q5X.sO50AeUeU74sV3Zj/O8YQsdEjfQSb8/JuzjMvqco0g3r/tbVu', NULL, '2025-06-17 20:21:13', '2025-06-17 19:21:13', NULL),
(2, 'Agent User', 'agent@example.com', '$2y$12$2zVIyXK4sqk9mwcjPxJCSOCOD6DCX3GPN5ZMuAfm1E7rkeOylmEge', NULL, '2025-06-17 20:42:33', '2025-06-17 19:42:33', NULL),
(3, 'Owner User', 'owner@example.com', '$2y$12$AxVymvIR3cp7AZLpK3XKuORjZG67eSZk3imcODnEQ/2PeNRF7iVI.', NULL, '2025-06-17 20:42:34', '2025-06-17 19:42:34', NULL),
(4, 'Client User', 'client@example.com', '$2y$12$7a9TsKR1JaIlzaocmf/o1eoEWJ9WvHE4vicHD.WAqMi194zAJAGm6', NULL, '2025-06-17 20:42:34', '2025-06-17 19:42:34', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointments_property_id_foreign` (`property_id`),
  ADD KEY `appointments_user_id_foreign` (`user_id`);

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_posts_user_id_foreign` (`user_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_requests`
--
ALTER TABLE `contact_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contact_requests_property_id_foreign` (`property_id`),
  ADD KEY `contact_requests_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `favorite_properties`
--
ALTER TABLE `favorite_properties`
  ADD PRIMARY KEY (`user_id`,`property_id`),
  ADD KEY `favorite_properties_property_id_foreign` (`property_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `photos_property_id_foreign` (`property_id`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `properties_user_id_foreign` (`user_id`),
  ADD KEY `properties_category_id_foreign` (`category_id`);

--
-- Indexes for table `property_submissions`
--
ALTER TABLE `property_submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_submissions_property_id_foreign` (`property_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `contact_requests`
--
ALTER TABLE `contact_requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `property_submissions`
--
ALTER TABLE `property_submissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_property_id_foreign` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD CONSTRAINT `blog_posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `contact_requests`
--
ALTER TABLE `contact_requests`
  ADD CONSTRAINT `contact_requests_property_id_foreign` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `contact_requests_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `favorite_properties`
--
ALTER TABLE `favorite_properties`
  ADD CONSTRAINT `favorite_properties_property_id_foreign` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorite_properties_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_property_id_foreign` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `properties_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `property_submissions`
--
ALTER TABLE `property_submissions`
  ADD CONSTRAINT `property_submissions_property_id_foreign` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
