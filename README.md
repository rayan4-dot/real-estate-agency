# 🏠 Real Estate Agency

A modern, full-featured real estate agency web application built with Laravel, React, and Inertia.js. This application provides a complete solution for managing properties, users, appointments, and real estate operations.

## ✨ Features

### 🏘️ Property Management
- **Property Listings**: Browse and search properties with advanced filtering
- **Property Details**: Comprehensive property information with photos and descriptions
- **Property Categories**: Organized property listings by categories
- **Property Submissions**: Users can submit new properties for review
- **Photo Management**: Multiple photos per property with drag-and-drop upload

### 👥 User Management
- **Multi-Role System**: Admin and Client roles with different permissions
- **User Authentication**: Secure login/registration with email verification
- **Profile Management**: Users can update their profiles and preferences
- **Favorites System**: Users can save and manage favorite properties

### 📅 Appointment System
- **Appointment Booking**: Schedule property viewings and consultations
- **Appointment Management**: Admin can manage and track all appointments
- **Calendar Integration**: Visual calendar for appointment scheduling

### 📝 Blog System
- **Blog Posts**: Publish and manage real estate articles and news
- **Content Management**: Rich text editor for blog content
- **SEO Optimization**: Meta descriptions and SEO-friendly URLs

### 📞 Contact Management
- **Contact Requests**: Handle inquiries from potential clients
- **Request Tracking**: Monitor and respond to contact requests
- **Email Notifications**: Automated email responses

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Components**: Smooth animations with Framer Motion
- **Dashboard Analytics**: Charts and statistics for data visualization
- **Real-time Updates**: Live data updates without page refresh

## 🛠️ Technology Stack

### Backend
- **Laravel 12**: PHP framework for robust backend development
- **Inertia.js**: Modern monolith approach with SPA-like experience
- **Laravel Sanctum**: API authentication for secure user sessions
- **Spatie Laravel Permission**: Role and permission management
- **MySQL/PostgreSQL**: Database support

### Frontend
- **React 18**: Modern JavaScript library for UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Headless UI**: Accessible UI components
- **Framer Motion**: Animation library for smooth transitions
- **Chart.js**: Data visualization and analytics

### Development Tools
- **Vite**: Fast build tool and development server
- **Laravel Breeze**: Authentication scaffolding
- **PHPUnit**: Testing framework
- **Laravel Sail**: Docker development environment

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **PHP 8.2+** with extensions: BCMath, Ctype, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML
- **Composer** (PHP package manager)
- **Node.js 18+** and **npm**
- **MySQL 8.0+** or **PostgreSQL 13+**
- **Git**

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/rayan4-dot/real-estate-agency.git
cd real-estate-agency
```

### 2. Install PHP Dependencies
```bash
composer install
```

### 3. Install Node.js Dependencies
```bash
npm install
```

### 4. Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 5. Configure Database
Edit your `.env` file with your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=real_estate_agency
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 6. Run Database Migrations
```bash
php artisan migrate
```

### 7. Seed the Database (Optional)
```bash
php artisan db:seed
```

### 8. Build Frontend Assets
```bash
# For development
npm run dev

# For production
npm run build
```

### 9. Start the Development Server
```bash
# Using Laravel's built-in server
php artisan serve

# Or using the combined development script
composer run dev
```

The application will be available at `http://localhost:8000`

## 🔧 Configuration

### Mail Configuration
Configure your mail settings in `.env` for email notifications:
```env
MAIL_MAILER=smtp
MAIL_HOST=your_smtp_host
MAIL_PORT=587
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@youragency.com
MAIL_FROM_NAME="${APP_NAME}"
```

### File Storage
Configure file storage for property photos:
```env
FILESYSTEM_DISK=public
```

### Queue Configuration (Optional)
For background job processing:
```env
QUEUE_CONNECTION=database
```

## 👤 Default Users

After running the database seeder, you'll have these default users:

### Admin User
- **Email**: admin@example.com
- **Password**: password
- **Role**: Admin

### Client User
- **Email**: client@example.com
- **Password**: password
- **Role**: Client

## 📁 Project Structure

```
rayan-immobilier/
├── app/
│   ├── Http/Controllers/     # Application controllers
│   ├── Models/              # Eloquent models
│   ├── Providers/           # Service providers
│   └── Exceptions/          # Exception handlers
├── database/
│   ├── migrations/          # Database migrations
│   ├── seeders/            # Database seeders
│   └── factories/          # Model factories
├── resources/
│   ├── js/
│   │   ├── Components/     # React components
│   │   ├── Pages/          # Inertia pages
│   │   └── Layouts/        # Layout components
│   └── css/               # Stylesheets
├── routes/                 # Application routes
├── storage/               # File storage
└── tests/                 # Application tests
```

## 🧪 Testing

Run the test suite:
```bash
# Run all tests
php artisan test

# Run tests with coverage
php artisan test --coverage
```

## 🚀 Deployment

### Production Build
```bash
# Install production dependencies
composer install --optimize-autoloader --no-dev

# Build frontend assets
npm run build

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Server Requirements
- **Web Server**: Apache/Nginx
- **PHP**: 8.2+ with required extensions
- **Database**: MySQL 8.0+
- **SSL Certificate**: For HTTPS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/rayan4-dot/real-estate-agency/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- [Laravel](https://laravel.com/) - The PHP framework
- [Inertia.js](https://inertiajs.com/) - Modern monolith approach
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Spatie](https://spatie.be/) - Laravel Permission package

---

**Built with ❤️ using Laravel and React** 