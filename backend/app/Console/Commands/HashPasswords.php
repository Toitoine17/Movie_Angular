<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class HashPasswords extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'passwords:hash';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Hash passwords stored in the database';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Retrieve all users
        $users = User::all();

        // Iterate through each user and hash their password
        foreach ($users as $user) {
            $user->password = Hash::make($user->password);
            $user->save();
        }

        $this->info('Passwords hashed successfully.');

        return 0;
    }
}
