<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BlogPost;
use App\Models\User;
use Faker\Factory as Faker;

class BlogPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $userIds = User::role(['agent', 'admin'])->pluck('id')->toArray();
        if (empty($userIds)) return;
        
        $blogTitles = [
            'Top 10 Tips for First-Time Homebuyers',
            'Understanding the Real Estate Market Trends in 2024',
            'How to Stage Your Home for Maximum Sale Value',
            'Investment Properties: A Complete Guide for Beginners',
            'The Benefits of Working with a Professional Real Estate Agent',
            'Mortgage Rates and How They Affect Your Home Purchase',
            'Sustainable Living: Eco-Friendly Homes on the Rise',
            'Neighborhood Spotlight: The Best Areas to Live in 2024'
        ];
        
        $blogExcerpts = [
            'Essential advice for navigating your first home purchase with confidence and success.',
            'Stay ahead of the curve with our comprehensive analysis of current market conditions.',
            'Transform your property into a buyer\'s dream with these proven staging techniques.',
            'Everything you need to know about building wealth through real estate investment.',
            'Discover why professional expertise can make all the difference in your real estate journey.',
            'Navigate the complex world of mortgage rates and find the best deal for your situation.',
            'Explore the growing trend of environmentally conscious home design and living.',
            'Find your perfect neighborhood with our detailed guide to the most desirable areas.'
        ];
        
        $blogContent = [
            'Buying your first home is an exciting milestone, but it can also be overwhelming. Here are our top 10 tips to help you navigate the process with confidence. First, get pre-approved for a mortgage before you start looking. This will give you a clear budget and show sellers you\'re serious. Second, research neighborhoods thoroughly - visit at different times of day and talk to residents. Third, don\'t skip the home inspection - it\'s worth every penny. Fourth, consider future resale value when choosing a property. Fifth, factor in all costs including property taxes, insurance, and maintenance. Sixth, be patient and don\'t rush into a decision. Seventh, work with a trusted real estate agent who understands your needs. Eighth, negotiate wisely but don\'t be afraid to walk away. Ninth, read all documents carefully before signing. Finally, plan for the unexpected - homeownership comes with surprises!',
            
            'The real estate market is constantly evolving, and staying informed is crucial for making smart decisions. In 2024, we\'re seeing several key trends that buyers and sellers should understand. Remote work continues to influence housing preferences, with more people seeking homes with dedicated office spaces. Urban areas are experiencing a resurgence as companies implement hybrid work models. Interest rates remain a significant factor, though they\'ve stabilized compared to previous years. Inventory levels vary by region, creating opportunities in some markets while others remain competitive. Sustainability features are increasingly important to buyers, with energy-efficient homes commanding premium prices. Technology is transforming the buying process, with virtual tours and digital transactions becoming standard. Understanding these trends can help you make informed decisions whether you\'re buying, selling, or investing in real estate.',
            
            'Staging your home effectively can significantly increase its sale value and reduce time on the market. Start by decluttering and depersonalizing - potential buyers need to envision themselves living in the space. Remove family photos, personal items, and excess furniture. Clean thoroughly, including carpets, windows, and appliances. Make necessary repairs and consider fresh paint in neutral colors. Enhance curb appeal with landscaping, a clean exterior, and an inviting entrance. Inside, create focal points in each room and ensure proper lighting. Use neutral decor that appeals to a broad audience. Consider professional staging for vacant homes or difficult-to-sell properties. Don\'t forget about smells - bake cookies or use subtle air fresheners. Finally, take high-quality photos that showcase your home\'s best features. Remember, staging is about creating an emotional connection with potential buyers.',
            
            'Real estate investment can be a powerful wealth-building tool when approached correctly. Start by understanding the different types of investment properties: residential rentals, commercial properties, vacation rentals, and fix-and-flip opportunities. Each has its own risks and rewards. Research your target market thoroughly, including rental rates, vacancy rates, and property appreciation trends. Calculate all costs including mortgage payments, property taxes, insurance, maintenance, and property management fees. Consider starting with a single-family home or small multi-family property. Build a team of professionals including a real estate agent, accountant, and property manager. Understand local landlord-tenant laws and regulations. Plan for vacancies and unexpected expenses. Consider the benefits of different financing options including conventional loans, FHA loans, and private financing. Remember that real estate investment is a long-term strategy that requires patience and careful planning.',
            
            'Working with a professional real estate agent provides numerous advantages that can make your buying or selling experience much smoother. Agents have extensive market knowledge and can provide valuable insights about neighborhoods, property values, and market conditions. They handle complex paperwork and ensure all legal requirements are met. Agents have access to the Multiple Listing Service (MLS) and other resources that give them information about properties before they\'re widely available. They can negotiate effectively on your behalf, potentially saving you thousands of dollars. Professional agents have established networks of inspectors, contractors, and other service providers. They understand the emotional aspects of real estate transactions and can provide objective guidance. Most importantly, they work to protect your interests throughout the entire process. When choosing an agent, look for experience, local expertise, and a track record of successful transactions.',
            
            'Mortgage rates are one of the most important factors affecting home affordability and the overall real estate market. Understanding how rates work and what influences them can help you make better decisions. Mortgage rates are influenced by various factors including the Federal Reserve\'s monetary policy, inflation expectations, economic growth, and global market conditions. Fixed-rate mortgages offer stability with consistent payments, while adjustable-rate mortgages may start with lower rates but can increase over time. Your credit score, down payment amount, and loan term all affect the rate you\'ll receive. Consider the total cost of the loan, not just the monthly payment. Refinancing can be beneficial when rates drop significantly. Monitor rate trends but don\'t try to time the market perfectly. Work with a mortgage professional who can explain your options and help you find the best rate for your situation.',
            
            'Sustainable living is becoming increasingly important to homebuyers, and eco-friendly homes are commanding premium prices in many markets. Energy-efficient features like solar panels, high-efficiency HVAC systems, and smart thermostats can significantly reduce utility costs while increasing property value. Sustainable building materials and construction methods are creating homes that are both environmentally friendly and durable. Water conservation features like low-flow fixtures and drought-resistant landscaping are popular in many areas. Indoor air quality is improved through proper ventilation, non-toxic materials, and air purification systems. Many buyers are willing to pay more for homes with green certifications like LEED or Energy Star. Sustainable homes often have lower maintenance costs and better resale value. Consider both the environmental and financial benefits when evaluating sustainable features for your home.',
            
            'Choosing the right neighborhood is just as important as choosing the right home. The best neighborhoods offer a combination of location, amenities, safety, and community. Consider proximity to work, schools, shopping, and public transportation. Research crime rates and school ratings. Visit the neighborhood at different times to get a feel for the community. Look for signs of investment and development that indicate a growing area. Consider the neighborhood\'s character and whether it matches your lifestyle. Check for planned infrastructure improvements or developments that could affect property values. Talk to residents to get insider perspectives. Consider the neighborhood\'s history and future potential. Remember that neighborhood preferences can change over time, so think about long-term trends. A great neighborhood can make even an average home feel like a dream come true.'
        ];
        
        foreach (range(0, 7) as $i) {
            BlogPost::create([
                'title' => $blogTitles[$i],
                'content' => $blogContent[$i],
                'excerpt' => $blogExcerpts[$i],
                'created_at' => $faker->dateTimeThisYear(),
                'user_id' => $faker->randomElement($userIds),
            ]);
        }
    }
}
