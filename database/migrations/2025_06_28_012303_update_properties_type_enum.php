<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, we need to drop the enum constraint and recreate it
        DB::statement("ALTER TABLE properties MODIFY COLUMN type VARCHAR(20)");
        
        // Update any existing values that might not be in the new enum
        DB::statement("UPDATE properties SET type = 'house' WHERE type NOT IN ('house', 'apartment', 'studio', 'villa', 'land', 'commercial', 'office')");
        
        // Now recreate the enum with all the values we need
        DB::statement("ALTER TABLE properties MODIFY COLUMN type ENUM('house', 'apartment', 'studio', 'villa', 'land', 'commercial', 'office')");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert to original enum values
        DB::statement("ALTER TABLE properties MODIFY COLUMN type VARCHAR(20)");
        DB::statement("UPDATE properties SET type = 'house' WHERE type NOT IN ('house', 'apartment', 'studio', 'villa')");
        DB::statement("ALTER TABLE properties MODIFY COLUMN type ENUM('house', 'apartment', 'studio', 'villa')");
    }
};
